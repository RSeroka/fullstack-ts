

// https://www.blackjackapprenticeship.com/blackjack-strategy-charts/
// https://wizardofodds.com/games/blackjack/strategy/4-decks/
import type Strategy from "./strategy";
import { PlayerStrategyHitStandOrDouble } from "./decision";


// Double after split allowed
// Double on soft 18, 19 allowed
export const basicDealerHitsOnSoft17Strategy: Strategy = {
    dealerUpcards: [
        // ACE
        {
            hard: {
                "8AndUnder": PlayerStrategyHitStandOrDouble.HIT,
                "9": PlayerStrategyHitStandOrDouble.HIT, 
                "10": PlayerStrategyHitStandOrDouble.HIT,
                "11": PlayerStrategyHitStandOrDouble.DOUBLE,
                "12": PlayerStrategyHitStandOrDouble.HIT,
                "13": PlayerStrategyHitStandOrDouble.HIT,
                "14": PlayerStrategyHitStandOrDouble.HIT,
                "15": PlayerStrategyHitStandOrDouble.HIT,
                "16": PlayerStrategyHitStandOrDouble.HIT,
                "17AndOver": PlayerStrategyHitStandOrDouble.STAND
            },
            soft: {
                "13": PlayerStrategyHitStandOrDouble.HIT,
                "14": PlayerStrategyHitStandOrDouble.HIT,
                "15": PlayerStrategyHitStandOrDouble.HIT,
                "16": PlayerStrategyHitStandOrDouble.HIT,
                "17": PlayerStrategyHitStandOrDouble.HIT,        
                "18": PlayerStrategyHitStandOrDouble.HIT,        
                "19": PlayerStrategyHitStandOrDouble.STAND,        
                "20": PlayerStrategyHitStandOrDouble.STAND, 
            },
            split: {
                "A": true,
                "8": true,
            },
            surrender: {
                "15": true,
                "16": true,
                "17": true
            }
        }, 
        // 2 
        {
            hard: {
                "8AndUnder": PlayerStrategyHitStandOrDouble.HIT,
                "9": PlayerStrategyHitStandOrDouble.HIT, 
                "10": PlayerStrategyHitStandOrDouble.DOUBLE,
                "11": PlayerStrategyHitStandOrDouble.DOUBLE,
                "12": PlayerStrategyHitStandOrDouble.HIT,
                "13": PlayerStrategyHitStandOrDouble.STAND,
                "14": PlayerStrategyHitStandOrDouble.STAND,
                "15": PlayerStrategyHitStandOrDouble.STAND,
                "16": PlayerStrategyHitStandOrDouble.STAND,
                "17AndOver": PlayerStrategyHitStandOrDouble.STAND
            },
            soft: {
                "13": PlayerStrategyHitStandOrDouble.HIT,
                "14": PlayerStrategyHitStandOrDouble.HIT,
                "15": PlayerStrategyHitStandOrDouble.HIT,
                "16": PlayerStrategyHitStandOrDouble.HIT,
                "17": PlayerStrategyHitStandOrDouble.HIT,        
                "18": PlayerStrategyHitStandOrDouble.DOUBLE_OR_STAND,        
                "19": PlayerStrategyHitStandOrDouble.STAND,        
                "20": PlayerStrategyHitStandOrDouble.STAND, 
            },
            split: {
                "A": true,
                "2": true,
                "3": true,
                "6": true,
                "7": true,
                "8": true,
                "9": true,
            },
            surrender: {

            }
        }, 
        // 3
        {
            hard: {
                "8AndUnder": PlayerStrategyHitStandOrDouble.HIT,
                "9": PlayerStrategyHitStandOrDouble.DOUBLE, 
                "10": PlayerStrategyHitStandOrDouble.DOUBLE,
                "11": PlayerStrategyHitStandOrDouble.DOUBLE,
                "12": PlayerStrategyHitStandOrDouble.HIT,
                "13": PlayerStrategyHitStandOrDouble.STAND,
                "14": PlayerStrategyHitStandOrDouble.STAND,
                "15": PlayerStrategyHitStandOrDouble.STAND,
                "16": PlayerStrategyHitStandOrDouble.STAND,
                "17AndOver": PlayerStrategyHitStandOrDouble.STAND
            },
            soft: {
                "13": PlayerStrategyHitStandOrDouble.HIT,
                "14": PlayerStrategyHitStandOrDouble.HIT,
                "15": PlayerStrategyHitStandOrDouble.HIT,
                "16": PlayerStrategyHitStandOrDouble.HIT,
                "17": PlayerStrategyHitStandOrDouble.DOUBLE,        
                "18": PlayerStrategyHitStandOrDouble.DOUBLE_OR_STAND,        
                "19": PlayerStrategyHitStandOrDouble.STAND,        
                "20": PlayerStrategyHitStandOrDouble.STAND, 
            },
            split: {
                "A": true,
                "2": true,
                "3": true,
                "6": true,
                "7": true,
                "8": true,
                "9": true,
            },
            surrender: {

            }
        },     
        // 4
        {
            hard: {
                "8AndUnder": PlayerStrategyHitStandOrDouble.HIT,
                "9": PlayerStrategyHitStandOrDouble.DOUBLE, 
                "10": PlayerStrategyHitStandOrDouble.DOUBLE,
                "11": PlayerStrategyHitStandOrDouble.DOUBLE,
                "12": PlayerStrategyHitStandOrDouble.STAND,
                "13": PlayerStrategyHitStandOrDouble.STAND,
                "14": PlayerStrategyHitStandOrDouble.STAND,
                "15": PlayerStrategyHitStandOrDouble.STAND,
                "16": PlayerStrategyHitStandOrDouble.STAND,
                "17AndOver": PlayerStrategyHitStandOrDouble.STAND
            },
            soft: {
                "13": PlayerStrategyHitStandOrDouble.HIT,
                "14": PlayerStrategyHitStandOrDouble.HIT,
                "15": PlayerStrategyHitStandOrDouble.DOUBLE,
                "16": PlayerStrategyHitStandOrDouble.DOUBLE,
                "17": PlayerStrategyHitStandOrDouble.DOUBLE,        
                "18": PlayerStrategyHitStandOrDouble.DOUBLE_OR_STAND,        
                "19": PlayerStrategyHitStandOrDouble.STAND,        
                "20": PlayerStrategyHitStandOrDouble.STAND, 
            },
            split: {
                "A": true,
                "2": true,
                "3": true,
                "6": true,
                "7": true,
                "8": true,
                "9": true,
            },
            surrender: {

            }
        },     
        // 5
        {
            hard: {
                "8AndUnder": PlayerStrategyHitStandOrDouble.HIT,
                "9": PlayerStrategyHitStandOrDouble.DOUBLE, 
                "10": PlayerStrategyHitStandOrDouble.DOUBLE,
                "11": PlayerStrategyHitStandOrDouble.DOUBLE,
                "12": PlayerStrategyHitStandOrDouble.STAND,
                "13": PlayerStrategyHitStandOrDouble.STAND,
                "14": PlayerStrategyHitStandOrDouble.STAND,
                "15": PlayerStrategyHitStandOrDouble.STAND,
                "16": PlayerStrategyHitStandOrDouble.STAND,
                "17AndOver": PlayerStrategyHitStandOrDouble.STAND
            },
            soft: {
                "13": PlayerStrategyHitStandOrDouble.DOUBLE,
                "14": PlayerStrategyHitStandOrDouble.DOUBLE,
                "15": PlayerStrategyHitStandOrDouble.DOUBLE,
                "16": PlayerStrategyHitStandOrDouble.DOUBLE,
                "17": PlayerStrategyHitStandOrDouble.DOUBLE,        
                "18": PlayerStrategyHitStandOrDouble.DOUBLE_OR_STAND,        
                "19": PlayerStrategyHitStandOrDouble.STAND,        
                "20": PlayerStrategyHitStandOrDouble.STAND, 
            },
            split: {
                "A": true,
                "2": true,
                "3": true,
                "4": true,
                "6": true,
                "7": true,
                "8": true,
                "9": true,
            },
            surrender: {

            }
        },          
        
        // 6
        {
            hard: {
                "8AndUnder": PlayerStrategyHitStandOrDouble.HIT,
                "9": PlayerStrategyHitStandOrDouble.DOUBLE, 
                "10": PlayerStrategyHitStandOrDouble.DOUBLE,
                "11": PlayerStrategyHitStandOrDouble.DOUBLE,
                "12": PlayerStrategyHitStandOrDouble.STAND,
                "13": PlayerStrategyHitStandOrDouble.STAND,
                "14": PlayerStrategyHitStandOrDouble.STAND,
                "15": PlayerStrategyHitStandOrDouble.STAND,
                "16": PlayerStrategyHitStandOrDouble.STAND,
                "17AndOver": PlayerStrategyHitStandOrDouble.STAND
            },
            soft: {
                "13": PlayerStrategyHitStandOrDouble.DOUBLE,
                "14": PlayerStrategyHitStandOrDouble.DOUBLE,
                "15": PlayerStrategyHitStandOrDouble.DOUBLE,
                "16": PlayerStrategyHitStandOrDouble.DOUBLE,
                "17": PlayerStrategyHitStandOrDouble.DOUBLE,        
                "18": PlayerStrategyHitStandOrDouble.DOUBLE_OR_STAND,        
                "19": PlayerStrategyHitStandOrDouble.DOUBLE_OR_STAND,        
                "20": PlayerStrategyHitStandOrDouble.STAND, 
            },
            split: {
                "A": true,
                "2": true,
                "3": true,
                "4": true,
                "6": true,
                "7": true,
                "8": true,
                "9": true,
            },
            surrender: {

            }
        },     

        // 7 
        {
            hard: {
                "8AndUnder": PlayerStrategyHitStandOrDouble.HIT,
                "9": PlayerStrategyHitStandOrDouble.HIT, 
                "10": PlayerStrategyHitStandOrDouble.DOUBLE,
                "11": PlayerStrategyHitStandOrDouble.DOUBLE,
                "12": PlayerStrategyHitStandOrDouble.HIT,
                "13": PlayerStrategyHitStandOrDouble.HIT,
                "14": PlayerStrategyHitStandOrDouble.HIT,
                "15": PlayerStrategyHitStandOrDouble.HIT,
                "16": PlayerStrategyHitStandOrDouble.HIT,
                "17AndOver": PlayerStrategyHitStandOrDouble.STAND
            },
            soft: {
                "13": PlayerStrategyHitStandOrDouble.HIT,
                "14": PlayerStrategyHitStandOrDouble.HIT,
                "15": PlayerStrategyHitStandOrDouble.HIT,
                "16": PlayerStrategyHitStandOrDouble.HIT,
                "17": PlayerStrategyHitStandOrDouble.HIT,        
                "18": PlayerStrategyHitStandOrDouble.STAND,        
                "19": PlayerStrategyHitStandOrDouble.STAND,        
                "20": PlayerStrategyHitStandOrDouble.STAND, 
            },
            split: {
                "A": true,
                "8": true,
                "7": true,
                "3": true,
                "2": true,
            },
            surrender: {

            }
        }, 

        // 8
        {
            hard: {
                "8AndUnder": PlayerStrategyHitStandOrDouble.HIT,
                "9": PlayerStrategyHitStandOrDouble.HIT, 
                "10": PlayerStrategyHitStandOrDouble.DOUBLE,
                "11": PlayerStrategyHitStandOrDouble.DOUBLE,
                "12": PlayerStrategyHitStandOrDouble.HIT,
                "13": PlayerStrategyHitStandOrDouble.HIT,
                "14": PlayerStrategyHitStandOrDouble.HIT,
                "15": PlayerStrategyHitStandOrDouble.HIT,
                "16": PlayerStrategyHitStandOrDouble.HIT,
                "17AndOver": PlayerStrategyHitStandOrDouble.STAND
            },
            soft: {
                "13": PlayerStrategyHitStandOrDouble.HIT,
                "14": PlayerStrategyHitStandOrDouble.HIT,
                "15": PlayerStrategyHitStandOrDouble.HIT,
                "16": PlayerStrategyHitStandOrDouble.HIT,
                "17": PlayerStrategyHitStandOrDouble.HIT,        
                "18": PlayerStrategyHitStandOrDouble.STAND,        
                "19": PlayerStrategyHitStandOrDouble.STAND,        
                "20": PlayerStrategyHitStandOrDouble.STAND, 
            },
            split: {
                "A": true,
                "9": true, 
                "8": true,
            },
            surrender: {

            }
        }, 

        // 9
        {
            hard: {
                "8AndUnder": PlayerStrategyHitStandOrDouble.HIT,
                "9": PlayerStrategyHitStandOrDouble.HIT, 
                "10": PlayerStrategyHitStandOrDouble.DOUBLE,
                "11": PlayerStrategyHitStandOrDouble.DOUBLE,
                "12": PlayerStrategyHitStandOrDouble.HIT,
                "13": PlayerStrategyHitStandOrDouble.HIT,
                "14": PlayerStrategyHitStandOrDouble.HIT,
                "15": PlayerStrategyHitStandOrDouble.HIT,
                "16": PlayerStrategyHitStandOrDouble.HIT,
                "17AndOver": PlayerStrategyHitStandOrDouble.STAND
            },
            soft: {
                "13": PlayerStrategyHitStandOrDouble.HIT,
                "14": PlayerStrategyHitStandOrDouble.HIT,
                "15": PlayerStrategyHitStandOrDouble.HIT,
                "16": PlayerStrategyHitStandOrDouble.HIT,
                "17": PlayerStrategyHitStandOrDouble.HIT,        
                "18": PlayerStrategyHitStandOrDouble.HIT,        
                "19": PlayerStrategyHitStandOrDouble.STAND,        
                "20": PlayerStrategyHitStandOrDouble.STAND, 
            },
            split: {
                "A": true,
                "9": true, 
                "8": true,
            },
            surrender: {
                "16": true
            }
        }, 

        // 10
        {
            hard: {
                "8AndUnder": PlayerStrategyHitStandOrDouble.HIT,
                "9": PlayerStrategyHitStandOrDouble.HIT, 
                "10": PlayerStrategyHitStandOrDouble.HIT,
                "11": PlayerStrategyHitStandOrDouble.DOUBLE,
                "12": PlayerStrategyHitStandOrDouble.HIT,
                "13": PlayerStrategyHitStandOrDouble.HIT,
                "14": PlayerStrategyHitStandOrDouble.HIT,
                "15": PlayerStrategyHitStandOrDouble.HIT,
                "16": PlayerStrategyHitStandOrDouble.HIT,
                "17AndOver": PlayerStrategyHitStandOrDouble.STAND
            },
            soft: {
                "13": PlayerStrategyHitStandOrDouble.HIT,
                "14": PlayerStrategyHitStandOrDouble.HIT,
                "15": PlayerStrategyHitStandOrDouble.HIT,
                "16": PlayerStrategyHitStandOrDouble.HIT,
                "17": PlayerStrategyHitStandOrDouble.HIT,        
                "18": PlayerStrategyHitStandOrDouble.HIT,        
                "19": PlayerStrategyHitStandOrDouble.STAND,        
                "20": PlayerStrategyHitStandOrDouble.STAND, 
            },
            split: {
                "A": true,
                "8": true,
            },
            surrender: {
                "15": true,
                "16": true
            }
        }, 
    ]
}

/*
 * As I've said many times, the above strategy will be fine under any set of rules. However, for you perfectionists out there, here are the modifications to make if the dealer hits a soft 17.

    Surrender 15, a pair of 8s, and 17 vs. dealer A.
    Double 11 vs. dealer A.
    Double soft 18 vs. dealer 2.
    Double soft 19 vs. dealer 6.

 */

let _basicDealerStandsOn17Strategy: Strategy = structuredClone(basicDealerHitsOnSoft17Strategy);
delete _basicDealerStandsOn17Strategy.dealerUpcards[0]!.surrender["15"]; 
delete _basicDealerStandsOn17Strategy.dealerUpcards[0]!.surrender["17"]; 
_basicDealerStandsOn17Strategy.dealerUpcards[0]!.hard["11"] = PlayerStrategyHitStandOrDouble.HIT;
_basicDealerStandsOn17Strategy.dealerUpcards[1]!.soft["18"] = PlayerStrategyHitStandOrDouble.STAND; 
_basicDealerStandsOn17Strategy.dealerUpcards[5]!.soft["19"] = PlayerStrategyHitStandOrDouble.STAND; 


export const basicDealerStandsOnSoft17Strategy = _basicDealerStandsOn17Strategy;