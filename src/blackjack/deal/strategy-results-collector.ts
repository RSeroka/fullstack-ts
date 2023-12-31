
import type BlackJackCard from "../cards/blackjack-card";
import Hand from "../play/hand";
import { PlayerPlayDecision } from "../interface-types/decision";
import type Strategy from "../interface-types/strategy";
import type { PerDealerUpcard } from "../interface-types/strategy";
import type StrategyResults from "../interface-types/strategy-results";
import { PerDealerUpcardStrategyResults, PerIndividualStrategyResults, StrategyResultsStats } from "../interface-types/strategy-results";
import { BlackJackResult, PlayerSingleHandResult } from "./hand-result"; 



export default class StrategyResultsCollector {
    private _results: StrategyResults;

    private createEmptyStats(): StrategyResultsStats {
        return {
            numberWins: 0, 
            numberLosses: 0, 
            numberHands: 0, 
            netValue: 0
        }
    }

    private createEmptyPerIndividualStrategyResults(): PerIndividualStrategyResults {
        const empty: PerIndividualStrategyResults = {
            double: this.createEmptyStats(),
            single: this.createEmptyStats()
        }
        return empty;
    }

    private createPerDealerUpcardStrategyResults(strategyPerDealerUpdCard : PerDealerUpcard): PerDealerUpcardStrategyResults {
        const empty: PerDealerUpcardStrategyResults = {
            hard: {
                "8AndUnder": this.createEmptyPerIndividualStrategyResults(),
                "9": this.createEmptyPerIndividualStrategyResults(),
                "10": this.createEmptyPerIndividualStrategyResults(),
                "11": this.createEmptyPerIndividualStrategyResults(),
                "12": this.createEmptyPerIndividualStrategyResults(),
                "13": this.createEmptyPerIndividualStrategyResults(),
                "14": this.createEmptyPerIndividualStrategyResults(),
                "15": this.createEmptyPerIndividualStrategyResults(),
                "16": this.createEmptyPerIndividualStrategyResults(),
                "17AndOver": this.createEmptyPerIndividualStrategyResults(),
            },

            soft: {
                "13": this.createEmptyPerIndividualStrategyResults(),
                "14": this.createEmptyPerIndividualStrategyResults(),
                "15": this.createEmptyPerIndividualStrategyResults(),
                "16": this.createEmptyPerIndividualStrategyResults(),
                "17": this.createEmptyPerIndividualStrategyResults(),        
                "18": this.createEmptyPerIndividualStrategyResults(),        
                "19": this.createEmptyPerIndividualStrategyResults(),        
                "20": this.createEmptyPerIndividualStrategyResults(),        
            },
            split: {
            }, 
            surrender: {
            }
        }

        for (const splitKey in strategyPerDealerUpdCard.split) {
            const targetKey = splitKey as keyof typeof strategyPerDealerUpdCard.split;
            empty.split[targetKey] = this.createEmptyStats();
        }

        for (const surrenderKey in strategyPerDealerUpdCard.surrender) {
            const targetKey = surrenderKey as keyof typeof strategyPerDealerUpdCard.surrender;
            empty.surrender[targetKey] = this.createEmptyStats();
        }

        return empty;
    }




    public constructor(strategy: Strategy) {
        const dealerUpcards = new Array<PerDealerUpcardStrategyResults>(strategy.dealerUpcards.length);
        for (let idx = 0; idx < strategy.dealerUpcards.length; idx++) {
            dealerUpcards[idx] = this.createPerDealerUpcardStrategyResults(strategy.dealerUpcards[idx]!);
        }
        this._results = {
            dealerUpcards,
            blackjack: this.createEmptyStats(),
            overall: this.createEmptyStats()
        }
    }


    private applyToStatsBucket(handResult: PlayerSingleHandResult, target: StrategyResultsStats) {
        switch (handResult.result) {
            case BlackJackResult.BJ_WIN:
                target.numberWins++;
                break;
            case BlackJackResult.BJ_LOSE:
                target.numberLosses++;
                break;
            case BlackJackResult.BJ_PUSH:
                break;
        }
        target.numberHands++;
        target.netValue += handResult.singleHandNetChips;
    }

    public applyHandResult(handResult: PlayerSingleHandResult, dealerHand: Hand): void {
        const dealerUpCard = dealerHand.cards[0]!;
        const dealerUpcardsOffset = dealerUpCard.value - 1;
        const perDealerUpcardStrategyResults = this._results.dealerUpcards[dealerUpcardsOffset]!;

        //#region begin hardSoftSurrender Bucket 
        let hardSoftSurrenderOrBlackjackBucket: StrategyResultsStats | undefined = undefined;
        if (handResult.hand.isBlackJack || dealerHand.isBlackJack) {
            hardSoftSurrenderOrBlackjackBucket = this._results.blackjack; 
        }
        else if (handResult.lastPlayerDecision == PlayerPlayDecision.SURRENDER) {
            const surrenderTotal = "" + handResult.hand.total as keyof typeof perDealerUpcardStrategyResults.surrender;
            hardSoftSurrenderOrBlackjackBucket = perDealerUpcardStrategyResults.surrender[surrenderTotal];
        }
        if (hardSoftSurrenderOrBlackjackBucket === undefined) {
            const pseudoHand = new Hand(); // pseudoHand is created to determine if hand was soft before adding more cards
            pseudoHand.addCard(handResult.hand.cards[0]!);
            pseudoHand.addCard(handResult.hand.cards[1]!);

            const doubleOrSingle: keyof PerIndividualStrategyResults = 
                handResult.lastPlayerDecision == PlayerPlayDecision.DOUBLE ? "double" : "single"; 

            if (pseudoHand.isSoft && (handResult.hand.splitNumber === 0 || handResult.hand.cards[0]?.name != 'A')) {
                // post Aces split can not take more cards, so treat as hard
                const softTotal = "" + pseudoHand.total as keyof typeof perDealerUpcardStrategyResults.soft;
                if (perDealerUpcardStrategyResults.soft[softTotal] !== undefined) {
                    hardSoftSurrenderOrBlackjackBucket = perDealerUpcardStrategyResults.soft[softTotal][doubleOrSingle];
                }
            }
            if (hardSoftSurrenderOrBlackjackBucket === undefined) {
                let hardTotalKey: keyof typeof perDealerUpcardStrategyResults.hard;
                const hardTotal = pseudoHand.total;
                if (hardTotal <= 8) {
                    hardTotalKey = "8AndUnder";
                }
                else if (hardTotal >= 17) {
                    hardTotalKey = "17AndOver"
                }
                else {
                    hardTotalKey = "" + hardTotal as keyof typeof perDealerUpcardStrategyResults.hard;
                }

                hardSoftSurrenderOrBlackjackBucket = perDealerUpcardStrategyResults.hard[hardTotalKey][doubleOrSingle];
            }
        }
        this.applyToStatsBucket(handResult, hardSoftSurrenderOrBlackjackBucket);
        //#endregion hardSoftSurrender Bucket

        if (handResult.hand.splitNumber > 0) {
            const splitCard = handResult.hand.cards[0]!.name;
            const splitKey = "" + splitCard as keyof typeof perDealerUpcardStrategyResults.split;
            const splitBucketTarget = perDealerUpcardStrategyResults.split[splitKey];
            if (splitBucketTarget !== undefined) {
                this.applyToStatsBucket(handResult, splitBucketTarget);
            }
        }


        // overall 
        this.applyToStatsBucket(handResult, this._results.overall);

    }


    public get results(): StrategyResults {
        return this._results;
    }

};