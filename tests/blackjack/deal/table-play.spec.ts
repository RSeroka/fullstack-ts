
import { assert } from "chai"; 
import TablePlay from "../../../src/blackjack/deal/table-play";
import {BlackJackResult} from "../../../src/blackjack/deal/hand-result";
import ShoeFactory from "../../../src/blackjack/cards/shoe-factory";
import Shoe from "../../../src/blackjack/cards/shoe";
import Card from "../../../src/blackjack/cards/card";
import type {PerDealerUpcardStrategyResults, PerIndividualStrategyResults, StrategyResultsStats} from "../../../src/blackjack/interface-types/strategy-results";
import { PlayerPlayDecision } from "../../../src/blackjack/interface-types/decision";
import BlackJackCard from "../../../src/blackjack/cards/blackjack-card";
import { HouseRules } from "../../../src/blackjack/interface-types/house-rules";
import { defaultHouseRules } from "../../../src/blackjack/play/default-house-rules";
import { basicDealerHitsOnSoft17Strategy } from "../../../src/blackjack/strategies/basic-strategy";
import type Strategy from "../../../src/blackjack/interface-types/strategy";



type ZeroBasedCardValue = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
type Scenario = {
    name: string;
    cards: {
        player: Array<ZeroBasedCardValue>;
        dealer: Array<ZeroBasedCardValue>;
    };

    expect: {
        playerSingleHands: Array<{
            total: number;
            result: BlackJackResult;
            netChips: number;

            bucket: {
                surrender?: keyof PerDealerUpcardStrategyResults["surrender"];
                soft?: keyof PerDealerUpcardStrategyResults["soft"];
                hard?: keyof PerDealerUpcardStrategyResults["hard"];
                blackjack?: true; 
            }

        }>;
        dealer: {
            total: number;
        }
        dealtHandNetChips: number; // positive players win, negative house wins
    };

}

const generalScenarios: Array<Scenario> = [

    {
        name: "Player Double and Win",
        cards: {
            player: [5, 4, 11], // 6, 5, Queen
            dealer: [9, 5, 10] //  10 in hole, 6 showing, Jack
        },
        expect: {
            playerSingleHands: [
                {total: 21, result: BlackJackResult.BJ_WIN, netChips: 2, bucket: {"hard": "11"}}
            ],
            dealer: {
                total: 26
            },
            dealtHandNetChips: 2
        }
    },
    {
        name: "Player Double and Lose",
        cards: {
            player: [5, 4, 1], // 6, 5, 2
            dealer: [4, 5, 10] //  5 in hole, 6 showing, Jack
        },
        expect: {
            playerSingleHands: [
                {total: 13, result: BlackJackResult.BJ_LOSE, netChips: -2, bucket:{"hard": "11"}}
            ],
            dealer: {
                total: 21
            },
            dealtHandNetChips: -2
        }
    },
    {
        name: "Push",
        cards: {
            player: [6, 12], // 7, Jack
            dealer: [6, 9] //  7 in hole, 10 showing
        },
        expect: {
            playerSingleHands: [
                {total: 17, result: BlackJackResult.BJ_PUSH, netChips: 0, bucket: {"hard": "17AndOver"}}
            ],
            dealer: {
                total: 17
            },
            dealtHandNetChips: 0
        }
    },
    {
        name: "Push Again",
        cards: {
            player: [7, 12], // 8,  and King (18 hand 1)
            dealer: [3, 5, 7] //  4 in the hole, 6 showing, 8 (total 18)
        },
        expect: {
            playerSingleHands: [
                {total: 18, result: BlackJackResult.BJ_PUSH, netChips: 0, bucket: {"hard": "17AndOver"}},
            ],
            dealer: {
                total: 18
            },
            dealtHandNetChips: 0
        }
    },
    {
        name: "Push multicard",
        cards: {
            player: [6, 5, 4], // 7, 6, 5
            dealer: [6, 8, 1] //  7 in hole, 9 showing, 2
        },
        expect: {
            playerSingleHands: [
                {total: 18, result: BlackJackResult.BJ_PUSH, netChips: 0, bucket: {"hard": "13"}}
            ],
            dealer: {
                total: 18
            },
            dealtHandNetChips: 0
        }
    },
    {
        name: "BlackJack Push",
        cards: {
            player: [0, 12], // Ace, King
            dealer: [11, 0] //  Queen in hole, Ace showing
        },
        expect: {
            playerSingleHands: [
                {total: 21, result: BlackJackResult.BJ_PUSH, netChips: 0, bucket: {"blackjack": true}}
            ],
            dealer: {
                total: 21
            },
            dealtHandNetChips: 0
        }
    },
    {
        name: "Dealer BlackJack Wins right away",
        cards: {
            player: [4, 5], // 5, 6, next card not pulled, no double 
            dealer: [11, 0] //  Queen in hole, Ace showing
        },
        expect: {
            playerSingleHands: [
                {total: 11, result: BlackJackResult.BJ_LOSE, netChips: -1, bucket:{"blackjack": true}}
            ],
            dealer: {
                total: 21
            },
            dealtHandNetChips: -1
        }
    },
    {
        name: "Soft 17 goes well",
        cards: {
            player: [5, 0, 2], // 6, A, 3
            dealer: [6, 5, 3] //  7 in the hole, 6 showing, 4
        },
        expect: {
            playerSingleHands: [
                {total: 20, result: BlackJackResult.BJ_WIN, netChips: 2, bucket: {"soft": "17"}}
            ],
            dealer: {
                total: 17
            },
            dealtHandNetChips: 2
        }
    },
    {
        name: "Soft 17 goes badly",
        cards: {
            player: [5, 0, 8], // 6, A, 9
            dealer: [6, 5, 3] //  7 in the hole, 6 showing, 4
        },
        expect: {
            playerSingleHands: [
                {total: 16, result: BlackJackResult.BJ_LOSE, netChips: -2, bucket: {"soft": "17"}}
            ],
            dealer: {
                total: 17
            },
            dealtHandNetChips: -2
        }
    },
    {
        name: "Surrender",
        cards: {
            player: [5, 9], // 6, 10
            dealer: [5, 0] //  6 in the hole, Ace showing
        },
        expect: {
            playerSingleHands: [
                {total: 16, result: BlackJackResult.BJ_LOSE, netChips: -0.5, bucket: {"surrender": "16"}}
            ],
            dealer: {
                total: 17
            },
            dealtHandNetChips: -0.5
        }
    },
    {
        name: "Don't Surrender on Soft 16",
        cards: {
            player: [0, 4, 5, 7], // A, 5 (soft 16), 6 and 8
            dealer: [3, 0, 3] //  4 in the hole, Ace showing, 4 
        },
        expect: {
            playerSingleHands: [
                {total: 20, result: BlackJackResult.BJ_WIN, netChips: 1, bucket: {"soft": "16"}}
            ],
            dealer: {
                total: 19
            },
            dealtHandNetChips: 1
        }
    },
    {
        name: "Don't Surrender on Pair of 8s",
        cards: {
            player: [7, 7, 9, 4, 9], // 8, 8, 10 (first split 18), 5, 10 (2nd bust)
            dealer: [3, 9, 9] //  4 in the hole, 10 showing, 10
        },
        expect: {
            playerSingleHands: [
                {total: 18, result: BlackJackResult.BJ_WIN, netChips: 1, bucket: {"hard": "17AndOver"}},
                {total: 23, result: BlackJackResult.BJ_LOSE, netChips: -1, bucket: {"hard": "13"}}
            ],
            dealer: {
                total: 24
            },
            dealtHandNetChips: 0
        }
    },
    {
        name: "split 8s and win both",
        cards: {
            player: [7, 7, 10, 12], // 8, 8 (split), add Jack and King
            dealer: [10, 5, 8] //  Jack in the hole, 6 showing, 9
        },
        expect: {
            playerSingleHands: [
                {total: 18, result: BlackJackResult.BJ_WIN, netChips: 1, bucket: {"hard": "17AndOver"}},
                {total: 18, result: BlackJackResult.BJ_WIN, netChips: 1, bucket: {"hard": "17AndOver"}}
            ],
            dealer: {
                total: 25
            },
            dealtHandNetChips: 2
        }
    },
    {
        name: "split Aces get only one card each",
        cards: {
            player: [0, 0, 1, 4], // A, A (split), add 2 and 5 for each hand
            dealer: [4, 5, 8] //  5 in the hole, 6 showing, and 9 
        },
        expect: {
            playerSingleHands: [
                {total: 13, result: BlackJackResult.BJ_LOSE, netChips: -1, bucket: {"hard": "13"}},
                {total: 16, result: BlackJackResult.BJ_LOSE, netChips: -1, bucket: {"hard": "16"}}
            ],
            dealer: {
                total: 20
            },
            dealtHandNetChips: -2
        }
    },
    {
        name: "split Aces get blackjack only pays 1:1",
        cards: {
            player: [0, 0, 10, 4], // A, A (split), add jack and 5 for each hand
            dealer: [4, 5, 8] //  5 in the hole, 6 showing, and 9 
        },
        expect: {
            playerSingleHands: [
                {total: 21, result: BlackJackResult.BJ_WIN, netChips: 1, bucket: {hard: "17AndOver"}},
                {total: 16, result: BlackJackResult.BJ_LOSE, netChips: -1, bucket: {hard: "16"}}
            ],
            dealer: {
                total: 20
            },
            dealtHandNetChips: 0
        }
    },
    {
        name: "split 8s twice, total of three hands",
        cards: {
            player: [7, 7, 7, 12, 2, 7, 6], // 8, 8 (split), add 8 (split) and King (18 hand 1), 3 (double), 8 (19 hand 2), 7 (15 hand 3)
            dealer: [3, 5, 2, 4] //  4 in the hole, 6 showing, 3, 5 (total 18)
        },
        expect: {
            playerSingleHands: [
                {total: 18, result: BlackJackResult.BJ_PUSH, netChips: 0, bucket: {hard: "17AndOver"}},
                {total: 19, result: BlackJackResult.BJ_WIN, netChips: 2, bucket:{hard: "11"}},
                {total: 15, result: BlackJackResult.BJ_LOSE, netChips: -1, bucket: {hard: "15"}},
            ],
            dealer: {
                total: 18
            },
            dealtHandNetChips: 1
        }
    },

];

const splitAcesMoreThanOnceAllowedScenarios: Array<Scenario> = [
    {
        name: "can split aces more than once by default",
        cards: {
            player: [0, 0, 0, 10, 4, 7], // A, A (split), A (split 2), add jack (hand 1 21), 5 (hand 2 16) and 8 (hand 3 19) 
            dealer: [4, 5, 8] //  5 in the hole, 6 showing, and 9 
        },
        expect: {
            playerSingleHands: [
                {total: 21, result: BlackJackResult.BJ_WIN, netChips: 1, bucket: {hard: "17AndOver"}},
                {total: 16, result: BlackJackResult.BJ_LOSE, netChips: -1, bucket: {hard: "16"}},
                {total: 19, result: BlackJackResult.BJ_LOSE, netChips: -1, bucket: {hard: "17AndOver"}}
            ],
            dealer: {
                total: 20
            },
            dealtHandNetChips: -1
        }
    },
]


const splitAcesMoreThanOnceNOTAllowedScenarios: Array<Scenario> = [
    {
        name: "can NOT split aces more than once",
        cards: {
            player: [0, 0, 0, 10], // A, A (split), A (hand 1 12), add jack (hand 2 21)
            dealer: [4, 5, 8] //  5 in the hole, 6 showing, and 9 
        },
        expect: {
            playerSingleHands: [
                {total: 12, result: BlackJackResult.BJ_LOSE, netChips: -1, bucket: {hard: "12"}},
                {total: 21, result: BlackJackResult.BJ_WIN, netChips: 1, bucket: {hard: "17AndOver"}},
   
            ],
            dealer: {
                total: 20
            },
            dealtHandNetChips: 0
        }
    },
]

const blackJackPays3To2Scenarios: Array<Scenario> = [
    {
        name: "Player BlackJack Pays 3:2",
        cards: {
            player: [0, 12], // Ace, King
            dealer: [1, 7, 0] //  Two, Eight, Ace
        },
        expect: {
            playerSingleHands: [
                {total: 21, result: BlackJackResult.BJ_WIN, netChips: 1.5, bucket: {"blackjack": true}}
            ],
            dealer: {
                total: 21
            },
            dealtHandNetChips: 1.5
        }
    },
]

const blackJackPays6To5Scenarios: Array<Scenario> = [
    {
        name: "Player BlackJack Pays 6.5",
        cards: {
            player: [0, 12], // Ace, King
            dealer: [1, 7, 0] //  Two, Eight, Ace
        },
        expect: {
            playerSingleHands: [
                {total: 21, result: BlackJackResult.BJ_WIN, netChips: 1.2, bucket: {blackjack: true}}
            ],
            dealer: {
                total: 21
            },
            dealtHandNetChips: 1.2
        }
    },
]


export default function tablePlayTests()  {
    const defaultHouseRulesScenarios = generalScenarios.concat(splitAcesMoreThanOnceAllowedScenarios)
        .concat(blackJackPays3To2Scenarios);
    runTablePlayScenarios("default house rules scenarios", defaultHouseRulesScenarios, 
        basicDealerHitsOnSoft17Strategy, defaultHouseRules);

    const alternateHouseRulesScenarios = generalScenarios.concat(splitAcesMoreThanOnceNOTAllowedScenarios)
        .concat(blackJackPays6To5Scenarios);
    const alternateHouseRules = structuredClone(defaultHouseRules);
    alternateHouseRules.playerPlayConfig!.acesMayBeSplit = 1;
    alternateHouseRules.payoutConfig!.blackjackPayout = '6:5';
    runTablePlayScenarios("alternate house rules scenarios", alternateHouseRulesScenarios, 
        basicDealerHitsOnSoft17Strategy, alternateHouseRules);
}

function runTablePlayScenarios(suiteDescription: string, scenarios : Array<Scenario>, 
    playerStrategy: Strategy, houseRules: HouseRules)  {

    /**
     * Mock implementation of shoe factory for testing purposes
     */
    class TablePlayTestShoeFactory extends ShoeFactory {
        private _currScenarioOffset: number;


        constructor(numDecks: number, cutoffFraction: number) {
            super(numDecks, cutoffFraction);
            this._currScenarioOffset = 0;
        }

        public get currScenarioOffset(): number {
            return this._currScenarioOffset;
        }


        createShoe(): Shoe {
            return new TablePlayTestShoe(this.numDecks, this.cutoffFraction!, this._currScenarioOffset++);  
        }
    }

    /**
     * Mock implementation of Shoe for testing purposes
     * 
     */
    class TablePlayTestShoe extends Shoe {
        private scenarioOffset: number;

        public constructor(numDecks: number, cutoffFraction: number, scenarioOffset: number) {
            super(numDecks, cutoffFraction);
            this.scenarioOffset = scenarioOffset;
        }

        private retrieveCard(unsuffledCards: number[], zeroBasedOffsetOf13: ZeroBasedCardValue): Card {
            for (let suit = 0; suit < 4; suit++) {
                const offsetIntoDeck = suit * 13 + zeroBasedOffsetOf13;
                if (unsuffledCards[offsetIntoDeck] !== undefined) {
                    delete unsuffledCards[offsetIntoDeck];
                    return new Card(offsetIntoDeck);
                }
            }
            console.error(`test error retrieveCard() could not provide card ${zeroBasedOffsetOf13}`);
            return new Card(51);  // if not founc return King of Spades?
        }

        protected override shuffleCards(unsuffledCards: number[]): void {
            const scenario = scenarios[this.scenarioOffset];
            if (scenario !== undefined) {
                for (let initialCardsCnt = 0; initialCardsCnt < 2; initialCardsCnt++) {
                    const playerCard = this.retrieveCard(unsuffledCards, scenario!.cards.player[initialCardsCnt]!);
                    const dealerCard = this.retrieveCard(unsuffledCards, scenario!.cards.dealer[initialCardsCnt]!);
                    this.cards.unshift(playerCard);
                    this.cards.unshift(dealerCard);
                }
    
                for (let restPlayerCardsIdx = 2; restPlayerCardsIdx < scenario!.cards.player.length; restPlayerCardsIdx++) {
                    this.cards.unshift(this.retrieveCard(unsuffledCards, scenario!.cards.player[restPlayerCardsIdx]!));
                }
    
                for (let restDealerCardsIdx = 2; restDealerCardsIdx < scenario!.cards.dealer.length; restDealerCardsIdx++) {
                    this.cards.unshift(this.retrieveCard(unsuffledCards, scenario!.cards.dealer[restDealerCardsIdx]!));
                }
            }

            for (let restIdx = 0; restIdx < unsuffledCards.length; restIdx++) {
                if (unsuffledCards[restIdx] !== undefined) {
                    this.cards.unshift(new Card(unsuffledCards[restIdx]!));
                }
            }
        }
    }



    describe(suiteDescription, () => {
        let shoeFactory: TablePlayTestShoeFactory;
        let tablePlay: TablePlay;
        // let houseRuleOnlyOneAceSplitTablePlay: TablePlay;
    
        before(() => {
            shoeFactory = new TablePlayTestShoeFactory(1, .98);// .98 should require resuffle every table play 
            tablePlay = new TablePlay([playerStrategy], houseRules, shoeFactory);
        });

        after(() => {
            // console.log(`DELETE ME ... ${JSON.stringify(tablePlay.strategyResults)}`)

        });


        for (let scenarioOffset = 0; scenarioOffset < scenarios.length; scenarioOffset++) {
            const scenario = scenarios[scenarioOffset]!;


            it(scenario.name, () => {
            const expectedStrategyResults = structuredClone(tablePlay.strategyResults[0])!;
            const dealtHandResult = tablePlay.dealHand();
            // console.log(`XXX DELETE ME ${JSON.stringify(dealtHandResult)}`);

            assert.equal(shoeFactory.currScenarioOffset, scenarioOffset + 1, "shoe shuffled for test correctly");
            assert.equal(dealtHandResult.playerResults[0]!.length,  scenario.expect.playerSingleHands.length, "number of player hands correct");
            assert.equal(dealtHandResult.dealerHand.cards.length, scenario.cards.dealer.length, "Dealer has correct number of cards");

            let actualNumberOfPlayerCards = 0;

            
            const expectedBucketsDealerUpCard = expectedStrategyResults.dealerUpcards[scenario.cards.dealer[1]!];
            const overallBucket = expectedStrategyResults.overall; 
            let splitBucket: StrategyResultsStats | undefined = undefined;
            if (scenario.expect.playerSingleHands.length > 1) {
                // assume the good assumption that all the hands are splits
                const splitBucketKey 
                    = BlackJackCard.fromCard(new Card(scenario.cards.player[0]!)).name as keyof PerDealerUpcardStrategyResults["split"] 
                splitBucket = expectedBucketsDealerUpCard?.split[splitBucketKey];
            }
            for (let expectedPlayerHandCnt = 0; expectedPlayerHandCnt < scenario.expect.playerSingleHands.length; expectedPlayerHandCnt++) {
                const actualPlayerHand = dealtHandResult.playerResults[0]![expectedPlayerHandCnt]!;
                const expectedPlayerHand = scenario.expect.playerSingleHands[expectedPlayerHandCnt]!;
                let expectedBucket: StrategyResultsStats;

                if (expectedPlayerHand.bucket.hasOwnProperty("surrender")) {
                    expectedBucket = expectedBucketsDealerUpCard!.surrender[expectedPlayerHand.bucket.surrender]!;
                }
                else if (expectedPlayerHand.bucket.hasOwnProperty("hard") || expectedPlayerHand.bucket.hasOwnProperty("soft") ) {
                    let doubleOrSingle: keyof PerIndividualStrategyResults = "single";
                    if (expectedPlayerHand.netChips == 2 || expectedPlayerHand.netChips == -2 || 
                        (expectedPlayerHand.netChips == 0 && actualPlayerHand.lastPlayerDecision == PlayerPlayDecision.DOUBLE)) {
                        doubleOrSingle = "double";
                    }
                    if (expectedPlayerHand.bucket.hasOwnProperty("hard")) {
                        expectedBucket = expectedBucketsDealerUpCard!.hard[expectedPlayerHand.bucket.hard][doubleOrSingle];
                    }
                    else { //soft 
                        expectedBucket = expectedBucketsDealerUpCard!.soft[expectedPlayerHand.bucket.soft!][doubleOrSingle];
                    }      
                }
                else if (expectedPlayerHand.bucket.hasOwnProperty("blackjack") && expectedPlayerHand.bucket.blackjack === true) {
                    expectedBucket = expectedStrategyResults.blackjack;
                }
                expectedBucket!.netValue += expectedPlayerHand.netChips;
                expectedBucket!.numberHands++;
                expectedBucket!.numberWins += expectedPlayerHand.result == BlackJackResult.BJ_WIN ? 1 : 0;
                expectedBucket!.numberLosses += expectedPlayerHand.result == BlackJackResult.BJ_LOSE ? 1 : 0;

                overallBucket.netValue += expectedPlayerHand.netChips;
                overallBucket.numberHands++;
                overallBucket.numberWins += expectedPlayerHand.result == BlackJackResult.BJ_WIN ? 1 : 0;
                overallBucket.numberLosses += expectedPlayerHand.result == BlackJackResult.BJ_LOSE ? 1 : 0;

                if (splitBucket !== undefined) {
                    splitBucket.netValue += expectedPlayerHand.netChips;
                    splitBucket.numberHands++;
                    splitBucket.numberWins += expectedPlayerHand.result == BlackJackResult.BJ_WIN ? 1 : 0;
                    splitBucket.numberLosses += expectedPlayerHand.result == BlackJackResult.BJ_LOSE ? 1 : 0;
                }

                actualNumberOfPlayerCards += actualPlayerHand.hand.cards.length;
                assert.equal(actualPlayerHand.hand.total, expectedPlayerHand.total, 
                    `Player hand ${expectedPlayerHandCnt} total is correct`);
                assert.equal(actualPlayerHand.result, expectedPlayerHand.result, 
                    `Player hand ${expectedPlayerHandCnt} results correct`);
                assert.equal(actualPlayerHand.singleHandNetChips, expectedPlayerHand.netChips, 
                    `Player hand ${expectedPlayerHandCnt} chips correct`);
            }


            assert.equal(actualNumberOfPlayerCards, scenario.cards.player.length, "Players have correct number of cards");
            assert.equal(dealtHandResult.dealerHand.total, scenario.expect.dealer.total, "Dealer value is correct");
            assert.equal(dealtHandResult.dealtHandNetChips, scenario.expect.dealtHandNetChips, "All hands net chips correct");

            const afterStrategyResults = tablePlay.strategyResults[0]!;
           //  console.log(`DELETE ME ... ${JSON.stringify(afterStrategyResults)}`);

            assert.deepEqual(afterStrategyResults.dealerUpcards[scenario.cards.dealer[1]!], expectedStrategyResults.dealerUpcards[scenario.cards.dealer[1]!], 
                "specific buckets updated correctly");

            assert.deepEqual(afterStrategyResults.overall, expectedStrategyResults.overall, 
                    "overall buckets updated correctly");


            });

        }


    })
}