
import BlackJackCard from "../cards/blackjack-card";
import type Shoe from "../cards/shoe";
import type IShoeFactory from "../cards/shoe-factory";
import { CryptoRandomInt, MersenneTwisterRandomInt, type IRandomInt } from "../cards/shuffled-shoe";
import ShuffledShoeFactory from "../cards/shuffled-shoe-factory";
import DealerPlay from "../play/dealer-play";
import Hand from "../play/hand";
import { HouseRules, ShoeConfig, defaultHouseRules } from "../play/house-rules";
import PlayerPlay from "../play/player-play";
import { DealerPlayDecision, PlayerPlayDecision } from "../strategies/decision";
import type Strategy from "../strategies/strategy";
import type StrategyResults from "../strategies/strategy-results";
import StrategyResultsCollector from "./strategy-results-collector"; // circular import needs review....
import { BlackJackResult, PlayerSingleHandResult, DealtHandResult } from "./hand-result";



export default class TablePlay {

    private logging = false;
    private players: Array<PlayerPlay>;
    private dealer: DealerPlay;
    private shoe: Shoe;
    private shoeCnt: number;
    private shoeFactory: IShoeFactory;
    private strategyResultsCollectors: Array<StrategyResultsCollector>;
    private houseRules: HouseRules;

    public constructor(playersStrategies: Array<Strategy>, houseRules: HouseRules, shoeFactory?: IShoeFactory) {
        this.houseRules = houseRules;
        this.players = new Array<PlayerPlay>(playersStrategies.length);
        for (let playerCnt = 0; playerCnt < playersStrategies.length; playerCnt++) {
            this.players[playerCnt] = new PlayerPlay(playersStrategies[playerCnt], houseRules.playerPlayConfig);
        }
        this.dealer = new DealerPlay(houseRules.dealerPlayConfig);

        if (shoeFactory === undefined) {
            const shoeConfig: ShoeConfig = {
                ...defaultHouseRules.shoeConfig,
                ...houseRules.shoeConfig
            }
            let shoeRandomImpl: IRandomInt;
            if (shoeConfig.randomSeed !== undefined) {
                shoeRandomImpl = new MersenneTwisterRandomInt(shoeConfig.randomSeed);
            }
            else {
                shoeRandomImpl = new CryptoRandomInt();
            }
            this.shoeFactory = new ShuffledShoeFactory(shoeConfig.numDecks!, shoeConfig.cutoffPercent, shoeRandomImpl);
        }
        else {
            this.shoeFactory = shoeFactory;
        }
        this.shoe = this.shoeFactory.createShoe();
        this.shoeCnt = 1;

        this.strategyResultsCollectors = new Array<StrategyResultsCollector>(playersStrategies.length);
        for (let collectorCnt = 0; collectorCnt < playersStrategies.length; collectorCnt++) {
            this.strategyResultsCollectors[collectorCnt] = new StrategyResultsCollector(this.players[collectorCnt]?.playerStrategy!);
        }
    }

    public get strategyResults(): Array<StrategyResults> {
        const results = new Array<StrategyResults>(this.strategyResultsCollectors.length);
        for (let cnt = 0; cnt < this.strategyResultsCollectors.length; cnt++) {
            results[cnt] = this.strategyResultsCollectors[cnt]!.results;
        }
        return results;
    }


    public dealHand(): DealtHandResult {
        /* initialize */
        const playerHands: Array<Hand> = [];
        const handResult: DealtHandResult = {
            playerResults: new Array<Array<PlayerSingleHandResult>>(this.players.length),
            dealerHand: new Hand(),
            dealtHandNetChips: 0
        }

        for (let playerIdx = 0; playerIdx < handResult.playerResults.length; playerIdx++) {
            handResult.playerResults[playerIdx] = new Array<PlayerSingleHandResult>(1);
            handResult.playerResults[playerIdx]![0] = this.createInitialPlayerSingleHandResult();
            playerHands[playerIdx] = handResult.playerResults[playerIdx]![0]!.hand;
        }

        /* deal two cards each */
        this.twoCardsEach(playerHands, handResult.dealerHand);

        /* players get to play only if dealer doesn't have blackjack */
        if (!handResult.dealerHand.isBlackJack) {
            this.playerPlaying(handResult);
        }

        // players have played, now dealer flips card and plays
        this.dealerPlaying(handResult);

        // pay out winners and collect from losers. 
        const dealerTotal = handResult.dealerHand.total;
        for (let playerIdx = 0; playerIdx < handResult.playerResults.length; playerIdx++) {
            handResult.playerResults[playerIdx]!.forEach(playerSingleHandResult => {
                if (playerSingleHandResult.result !== BlackJackResult.BJ_LOSE) {
                    if (playerSingleHandResult.hand.isBlackJack && playerSingleHandResult.hand.splitNumber === 0 && !handResult.dealerHand.isBlackJack) {
                        // blackjack pays 3:2 or 6:5 if configured to do so
                        const payoutRatio = this.houseRules.payoutConfig?.blackjackPayout === '6:5' ? 6/5 : 3/2;
                        playerSingleHandResult.result = BlackJackResult.BJ_WIN;
                        playerSingleHandResult.singleHandNetChips = payoutRatio * BlackJackResult.BJ_WIN;
                    }
                    else if (handResult.dealerHand.isBlackJack && !playerSingleHandResult.hand.isBlackJack) {
                        playerSingleHandResult.result = BlackJackResult.BJ_LOSE;
                        playerSingleHandResult.singleHandNetChips = BlackJackResult.BJ_LOSE;
                    }
                    else if (dealerTotal > 21 || dealerTotal < playerSingleHandResult.hand.total) {
                        playerSingleHandResult.result = BlackJackResult.BJ_WIN;
                        playerSingleHandResult.singleHandNetChips = BlackJackResult.BJ_WIN;
                        if (playerSingleHandResult.lastPlayerDecision === PlayerPlayDecision.DOUBLE) {
                            playerSingleHandResult.singleHandNetChips *= 2;
                        }
                    }
                    else if (dealerTotal > playerSingleHandResult.hand.total) {
                        playerSingleHandResult.result = BlackJackResult.BJ_LOSE;
                        playerSingleHandResult.singleHandNetChips = BlackJackResult.BJ_LOSE;
                        if (playerSingleHandResult.lastPlayerDecision === PlayerPlayDecision.DOUBLE) {
                            playerSingleHandResult.singleHandNetChips *= 2;
                        }
                    }
                    // other permutation is a push which was initialization of the playerSingleHandResult
                }


                this.strategyResultsCollectors[playerIdx]?.applyHandResult(playerSingleHandResult, handResult.dealerHand.cards[0]!);

                handResult.dealtHandNetChips += playerSingleHandResult.singleHandNetChips;
            });
        }


        return handResult;
    }


    private twoCardsEach(playerHands: Array<Hand>, dealerHand: Hand): void {

        if (this.shoe.isPastCutoff() || this.shoe.cardsLeftInShoe < 5 * (playerHands.length + 1)) {
            if (this.logging) { console.debug("Shuffling...."); }
            this.shoeCnt++;
            this.shoe = this.shoeFactory.createShoe();
        }
        for (let cardNum = 0; cardNum < 2; cardNum++) {
            playerHands.forEach(playerHand => {
                playerHand.addCard(BlackJackCard.fromCard(this.shoe.nextCard()!));
            });
            if (cardNum % 2 == 0) {
                dealerHand.addDownCard(BlackJackCard.fromCard(this.shoe.nextCard()!));
            }
            else {
                dealerHand.addCard(BlackJackCard.fromCard(this.shoe.nextCard()!));
            }
        }
    }




    private createInitialPlayerSingleHandResult(): PlayerSingleHandResult {
        return {
            hand: new Hand(),
            lastPlayerDecision: PlayerPlayDecision.STAND,
            result: BlackJackResult.BJ_PUSH,
            singleHandNetChips: 0
        };
    }

    private createSplitPlayerSingleHandResult(card: BlackJackCard, priorSplitNumber: number): PlayerSingleHandResult {
        const shr = this.createInitialPlayerSingleHandResult();
        shr.hand.splitNumber = priorSplitNumber + 1;
        shr.hand.addCard(card);
        shr.lastPlayerDecision = PlayerPlayDecision.SPLIT;
        return shr;
    }

    private dealerPlaying(handResult: DealtHandResult) {
        handResult.dealerHand.flipDownCard();
        let dealerTakeCard = true;
        while (dealerTakeCard) {
            const dealerPlayDecision: DealerPlayDecision = this.dealer.play(handResult.dealerHand);
            switch (dealerPlayDecision) {
                case DealerPlayDecision.HIT:
                    dealerTakeCard = true;
                    if (this.logging) { console.debug(`dealer has ${handResult.dealerHand.total}, dealer hits`) };
                    handResult.dealerHand.addCard(BlackJackCard.fromCard(this.shoe.nextCard()!));
                    break;
                case DealerPlayDecision.STAND:
                default:
                    dealerTakeCard = false;
                    if (this.logging) { console.log(`dealer has ${handResult.dealerHand.total}, dealer stands`) };
                    break;
            }
        }
    }

    private playerPlaying(handResult: DealtHandResult) {

        /* players play until over 21 or STAND */
        for (let playerIdx = 0; playerIdx < handResult.playerResults.length; playerIdx++) {
            const singlePlayerResults = handResult.playerResults[playerIdx]!;

            // note that the number of hands may increase as splits occur...
            for (let handIdx = 0; handIdx < singlePlayerResults.length; handIdx++) {
                let playerChoose = true;
                while (playerChoose) {
                    const playerSingleHandResult = singlePlayerResults[handIdx]!;

                    if (playerSingleHandResult.hand.splitNumber > 0 && playerSingleHandResult.hand.cards.length === 1) {
                        this.applyPlayerCard(playerSingleHandResult);
                        // splitting Aces can only get one card unless 
                        // aces may be re-split 
                        if (playerSingleHandResult.hand.cards[0]!.value === 1 && (playerSingleHandResult.hand.total !== 12
                            || (Number.isInteger(this.houseRules.playerPlayConfig!.acesMayBeSplit)
                            && playerSingleHandResult.hand.splitNumber >= (this.houseRules.playerPlayConfig!.acesMayBeSplit as number)))) {
                            playerChoose = false; // break the loop
                            playerSingleHandResult.lastPlayerDecision = PlayerPlayDecision.STAND;
                            break;  // get out of while (playerChoose) loop
                        }
                    }
                    const lastPlayerDecision = this.players[playerIdx]!.play(handResult.dealerHand, playerSingleHandResult.hand);
                    playerSingleHandResult.lastPlayerDecision = lastPlayerDecision;

                    switch (lastPlayerDecision) {
                        case PlayerPlayDecision.DOUBLE:
                            playerChoose = false;
                            if (this.logging) { console.debug(`player has ${playerSingleHandResult.hand.total}, dealer has ${handResult.dealerHand.total}, player doubles`); }
                            this.applyPlayerCard(playerSingleHandResult);
                            break;
                        case PlayerPlayDecision.HIT:
                            playerChoose = true;
                            if (this.logging) { console.debug(`player has ${playerSingleHandResult.hand.total}, dealer has ${handResult.dealerHand.total}, player hits`); }
                            this.applyPlayerCard(playerSingleHandResult);
                            break;
                        case PlayerPlayDecision.SPLIT:
                            playerChoose = true;
                            if (this.logging) { console.debug(`player has ${playerSingleHandResult.hand.total}, dealer has ${handResult.dealerHand.total}, player splits`); }

                            const split1 = this.createSplitPlayerSingleHandResult(playerSingleHandResult.hand.cards[0]!, playerSingleHandResult.hand.splitNumber);
                            const split2 = this.createSplitPlayerSingleHandResult(playerSingleHandResult.hand.cards[1]!, playerSingleHandResult.hand.splitNumber);

                            singlePlayerResults[handIdx] = split1;
                            singlePlayerResults.splice(handIdx + 1, 0, split2);

                            break;

                        case PlayerPlayDecision.SURRENDER:
                            playerChoose = false;
                            if (this.logging) { console.debug(`player has ${playerSingleHandResult.hand.total}, dealer has ${handResult.dealerHand.total}, player surrenders`); }
                            playerSingleHandResult.result = BlackJackResult.BJ_LOSE;
                            playerSingleHandResult.singleHandNetChips = 0.5 * BlackJackResult.BJ_LOSE;
                            break;

                        case PlayerPlayDecision.STAND:
                        default:
                            playerChoose = false;
                            if (this.logging) { console.debug(`player has ${playerSingleHandResult.hand.total}, dealer has ${handResult.dealerHand.total}, player stands`); }
                            break;

                    }

                    // console.log(`DELETE ME ${handIdx}, ${playerChoose}, ${JSON.stringify(playerSingleHandResult)}`);
                }

            }
        }
    }

    private applyPlayerCard(playerSingleHandResult: PlayerSingleHandResult): void {
        playerSingleHandResult.hand.addCard(BlackJackCard.fromCard(this.shoe.nextCard()!));
        if (playerSingleHandResult.hand.total > 21) {
            playerSingleHandResult.result = BlackJackResult.BJ_LOSE;
            if (playerSingleHandResult.lastPlayerDecision === PlayerPlayDecision.DOUBLE) {
                playerSingleHandResult.singleHandNetChips = 2 * BlackJackResult.BJ_LOSE;
            }
            else {
                playerSingleHandResult.singleHandNetChips = 1 * BlackJackResult.BJ_LOSE;
            }
        }
    }


};