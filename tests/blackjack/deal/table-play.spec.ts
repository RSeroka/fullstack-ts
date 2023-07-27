
import { assert } from "chai"; 
import TablePlay, {BlackJackResult, PlayerSingleHandResult, DealtHandResult} from "../../../src/blackjack/deal/table-play";
import ShoeFactory from "../../../src/blackjack/cards/shoe-factory";
import Shoe from "../../../src/blackjack/cards/shoe";
import Card from "../../../src/blackjack/cards/card";


type ZeroBasedCardValue = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
type Scenario = {
    name: string,
    cards: {
        player: Array<ZeroBasedCardValue>;
        dealer: Array<ZeroBasedCardValue>;
    }

    expect: {
        playerSingleHands: Array<{
            total: number;
            result: BlackJackResult;
            netChips: number;
        }>;
        dealer: {
            total: number;
        }
        dealtHandNetChips: number; // positive players win, negative house wins
    }
}

export default function tablePlayTests()  {

    const scenarios: Array<Scenario> = [
        {
            name: "Player BlackJack",
            cards: {
                player: [0, 12], // Ace, King
                dealer: [1, 7, 0] //  Two, Eight, Ace
            },
            expect: {
                playerSingleHands: [
                    {total: 21, result: BlackJackResult.BJ_WIN, netChips: 1.5}
                ],
                dealer: {
                    total: 21
                },
                dealtHandNetChips: 1.5
            }
        },
        {
            name: "Player Double and Win",
            cards: {
                player: [5, 4, 11], // 6, 5, Queen
                dealer: [9, 5, 10] //  10 in hole, 6 showing, Jack
            },
            expect: {
                playerSingleHands: [
                    {total: 21, result: BlackJackResult.BJ_WIN, netChips: 2}
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
                    {total: 13, result: BlackJackResult.BJ_LOSE, netChips: -2}
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
                    {total: 17, result: BlackJackResult.BJ_PUSH, netChips: 0}
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
                    {total: 18, result: BlackJackResult.BJ_PUSH, netChips: 0},
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
                    {total: 18, result: BlackJackResult.BJ_PUSH, netChips: 0}
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
                    {total: 21, result: BlackJackResult.BJ_PUSH, netChips: 0}
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
                    {total: 11, result: BlackJackResult.BJ_LOSE, netChips: -1}
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
                    {total: 20, result: BlackJackResult.BJ_WIN, netChips: 2}
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
                    {total: 16, result: BlackJackResult.BJ_LOSE, netChips: -2}
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
                dealer: [5, 0, 2] //  6 in the hole, Ace showing, 3
            },
            expect: {
                playerSingleHands: [
                    {total: 16, result: BlackJackResult.BJ_LOSE, netChips: -0.5}
                ],
                dealer: {
                    total: 20
                },
                dealtHandNetChips: -0.5
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
                    {total: 18, result: BlackJackResult.BJ_WIN, netChips: 1},
                    {total: 18, result: BlackJackResult.BJ_WIN, netChips: 1}
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
                    {total: 13, result: BlackJackResult.BJ_LOSE, netChips: -1},
                    {total: 16, result: BlackJackResult.BJ_LOSE, netChips: -1}
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
                    {total: 21, result: BlackJackResult.BJ_WIN, netChips: 1},
                    {total: 16, result: BlackJackResult.BJ_LOSE, netChips: -1}
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
                    {total: 18, result: BlackJackResult.BJ_PUSH, netChips: 0},
                    {total: 19, result: BlackJackResult.BJ_WIN, netChips: 2},
                    {total: 15, result: BlackJackResult.BJ_LOSE, netChips: -1},
                ],
                dealer: {
                    total: 18
                },
                dealtHandNetChips: 1
            }
        },
        


    ];


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



    describe("scenarios", () => {
        let shoeFactory: TablePlayTestShoeFactory;
        let tablePlay: TablePlay;
        let expectedOffset = 0;
    
        before(() => {
            shoeFactory = new TablePlayTestShoeFactory(1, .98);// .98 should require resuffle every table play 
            tablePlay = new TablePlay([{}], {dealerHitsOnSoft17: true}, shoeFactory);
        });


        for (let scenarioOffset = 0; scenarioOffset < scenarios.length; scenarioOffset++) {
            const scenario = scenarios[scenarioOffset]!;


            it(scenario.name, () => {
                const dealtHandResult = tablePlay.dealHand();
                // console.log(`XXX DELETE ME ${JSON.stringify(dealtHandResult)}`);

                assert.equal(shoeFactory.currScenarioOffset, scenarioOffset + 1, "shoe shuffled for test correctly");
                assert.equal(dealtHandResult.playerResults[0]!.length,  scenario.expect.playerSingleHands.length, "number of player hands correct");
                assert.equal(dealtHandResult.dealerHand.cards.length, scenario.cards.dealer.length, "Dealer has correct number of cards");

                let actualNumberOfPlayerCards = 0;

                for (let expectedPlayerHandCnt = 0; expectedPlayerHandCnt < scenario.expect.playerSingleHands.length; expectedPlayerHandCnt++) {
                    const actualPlayerHand = dealtHandResult.playerResults[0]![expectedPlayerHandCnt]!;
                    const expectedPlayerHand = scenario.expect.playerSingleHands[expectedPlayerHandCnt]!;

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

            });

        }


    })
}