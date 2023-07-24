
import BlackJackCard from "../cards/blackjack-card";
import type Shoe from "../cards/shoe";
import type IShoeFactory from "../cards/shoe-factory";
import type { DealerPlayConfiguration } from "../play/dealer-play";
import DealerPlay from "../play/dealer-play";
import Hand from "../play/hand";
import type { PlayerPlayConfiguration } from "../play/player-play";
import PlayerPlay from "../play/player-play";
import { DealerPlayDecision, PlayerPlayDecision } from "../strategies/decision";


export enum BlackJackResult {
    BJ_LOSE = -1,
    BJ_PUSH = 0, 
    BJ_WIN  = 1,
}

// splits would have more than one SingleHandResult
export type PlayerSingleHandResult = {  
    hand: Hand,
    lastPlayerDecision: PlayerPlayDecision,
    result: BlackJackResult, 
    singleHandNetChips: number
}

export type DealtHandResult = {
    playerResults: Array<Array<PlayerSingleHandResult>>; 
    dealerHand: Hand;
    dealtHandNetChips: number; // positive players win, negative house wins
};

// export type AggregateResultPerPlayer = {
//     numDeals: number;
//     numHands: number;
//     netResults: number; // positive players win, negative house wins
// }

// export type AggregateResult = {
//     playerResults: Array<AggregateResultPerPlayer>;
//     numDeals: number;
//     numHands: number;
//     netResults: number; // positive players win, negative house wins
// }

export default class TablePlay {

    private logging = false;
    private players: Array<PlayerPlay>;
    private dealer: DealerPlay;
    private shoe: Shoe;
    private shoeCnt: number;
    private shoeFactory: IShoeFactory;
    public constructor(playerPlayConfigs: Array<Partial<PlayerPlayConfiguration>>, dealerPlayConfiguration: DealerPlayConfiguration,
        shoeFact: IShoeFactory) {
        this.players = new Array<PlayerPlay>(playerPlayConfigs.length);
        for (let playerCnt = 0; playerCnt < playerPlayConfigs.length; playerCnt++) {
            this.players[playerCnt] = new PlayerPlay(playerPlayConfigs[playerCnt]!);
        }
        this.dealer = new DealerPlay(dealerPlayConfiguration);
        this.shoeFactory = shoeFact;
        this.shoe = this.shoeFactory.createShoe();  
        this.shoeCnt = 1;
    }


    private twoCardsEach(playerHands: Array<Hand>, dealerHand: Hand): void {
        
        if (this.shoe.isPastCutoff() || this.shoe.cardsLeftInShoe < 5 * (playerHands.length + 1))  {
            if (this.logging) {console.debug("Shuffling....");}
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


    public dealHand(): DealtHandResult {
        /* initialize */
        const playerHands: Array<Hand> = [];
        const handResult: DealtHandResult = {
            playerResults : new Array<Array<PlayerSingleHandResult>>(this.players.length),
            dealerHand: new Hand(), 
            dealtHandNetChips: 0
        }

        for (let playerIdx = 0; playerIdx < handResult.playerResults.length; playerIdx++) {
            handResult.playerResults[playerIdx] = new Array<PlayerSingleHandResult>(1);
            handResult.playerResults[playerIdx]![0] = {
                hand: new Hand(),
                lastPlayerDecision: PlayerPlayDecision.STAND, 
                result: BlackJackResult.BJ_PUSH,
                singleHandNetChips: 0
            }
            playerHands[playerIdx] = handResult.playerResults[playerIdx]![0]!.hand;
        }

        /* deal two cards each */
        this.twoCardsEach(playerHands, handResult.dealerHand);

        /* players get to play only if dealer doesn't have blackjack */
        if (! handResult.dealerHand.isBlackJack) {
            this.playerPlaying(handResult);
        }

        // players have played, now dealer flips card and plays
        this.dealerPlaying(handResult);

        // pay out winners and collect from losers. 
        const dealerTotal = handResult.dealerHand.total;
        for (let playerIdx = 0; playerIdx < handResult.playerResults.length; playerIdx++) {
            handResult.playerResults[playerIdx]!.forEach(playerSingleHandResult => {
                if (playerSingleHandResult.result !== BlackJackResult.BJ_LOSE) {
                    if (playerSingleHandResult.hand.isBlackJack && !handResult.dealerHand.isBlackJack) {
                        // blackjack pays 3:2 
                        // TODO make this configurable
                        playerSingleHandResult.result = BlackJackResult.BJ_WIN;
                        playerSingleHandResult.singleHandNetChips = 1.5 * BlackJackResult.BJ_WIN;
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

                handResult.dealtHandNetChips += playerSingleHandResult.singleHandNetChips;
    
 
            });
        }


        return handResult;
    }

    private dealerPlaying(handResult: DealtHandResult) {
        handResult.dealerHand.flipDownCard();
        let dealerTakeCard = true;
        while (dealerTakeCard) {
            const dealerPlayDecision: DealerPlayDecision = this.dealer.play(handResult.dealerHand);
            switch (dealerPlayDecision) {
                case DealerPlayDecision.HIT:
                    dealerTakeCard = true;
 //                   console.log(`dealer has ${handResult.dealerHand.total}, dealer hits`);
                    handResult.dealerHand.addCard(BlackJackCard.fromCard(this.shoe.nextCard()!));
                    break;
                case DealerPlayDecision.STAND:
                default:
                    dealerTakeCard = false;
 //                   console.log(`dealer has ${handResult.dealerHand.total}, dealer stands`);
                    break;
            }
        }
    }

    private playerPlaying(handResult: DealtHandResult) {

        /* players play until over 21 or STAND */
        for (let playerIdx = 0; playerIdx < handResult.playerResults.length; playerIdx++) {
            let playerChoose = true;
            while (playerChoose) {
                const lastPlayerDecision = this.players[playerIdx]!.play(handResult.dealerHand, handResult.playerResults[playerIdx]![0]!.hand);
                handResult.playerResults[playerIdx]![0]!.lastPlayerDecision = lastPlayerDecision;
                switch (lastPlayerDecision) {
                    case PlayerPlayDecision.DOUBLE:
                        playerChoose = false;
                        if (this.logging) {console.debug(`player has ${handResult.playerResults[playerIdx]![0]!.hand.total}, dealer has ${handResult.dealerHand.total}, player doubles}`);}
                        this.applyPlayerCard(handResult.playerResults[playerIdx]![0]!);
                        break;
                    case PlayerPlayDecision.HIT:
                        playerChoose = true;
                        if (this.logging) {console.debug(`player has ${handResult.playerResults[playerIdx]![0]!.hand.total}, dealer has ${handResult.dealerHand.total}, player hits}`);}
                        this.applyPlayerCard(handResult.playerResults[playerIdx]![0]!);
                        break;
                    case PlayerPlayDecision.SPLIT:
                        if (this.logging) {console.debug(`player has ${handResult.playerResults[playerIdx]![0]!.hand.total}, dealer has ${handResult.dealerHand.total}, player splits}`);}

                        // TODO figure out what to do for split!!
                        playerChoose = false;
                        break;

                    case PlayerPlayDecision.SURRENDER:
                        playerChoose = false;
                        if (this.logging) {console.debug(`player has ${handResult.playerResults[playerIdx]![0]!.hand.total}, dealer has ${handResult.dealerHand.total}, player surrenders}`);}
                        handResult.playerResults[playerIdx]![0]!.result = BlackJackResult.BJ_LOSE;
                        handResult.playerResults[playerIdx]![0]!.singleHandNetChips = 0.5 * BlackJackResult.BJ_LOSE;
                        break;

                    case PlayerPlayDecision.STAND:
                    default:
                        playerChoose = false;
                        break;

                }
            }
        }
    }

    private applyPlayerCard(playerSingleHandResult: PlayerSingleHandResult) : void {
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