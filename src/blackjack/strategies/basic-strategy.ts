

// https://www.blackjackapprenticeship.com/blackjack-strategy-charts/

import type Strategy from "./strategy";
import { PlayerStrategyHitStandOrDouble } from "./decision";


// Double after split allowed
// Double on soft 18, 19 allowed
export const basicStrategy: Strategy = {
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
                "16": true
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