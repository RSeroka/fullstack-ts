

// https://www.blackjackapprenticeship.com/blackjack-strategy-charts/

import type Strategy from "./strategy";
import { PlayerDecisionHitStandOrDouble } from "./decsision";


// Double after split allowed
// Double on soft 18, 19 allowed
export const BasicStrategy: Strategy = {
    dealerUpcards: [
        // ACE
        {
            hard: {
                "8AndUnder": PlayerDecisionHitStandOrDouble.HIT,
                "9": PlayerDecisionHitStandOrDouble.HIT, 
                "10": PlayerDecisionHitStandOrDouble.HIT,
                "11": PlayerDecisionHitStandOrDouble.DOUBLE,
                "12": PlayerDecisionHitStandOrDouble.HIT,
                "13": PlayerDecisionHitStandOrDouble.HIT,
                "14": PlayerDecisionHitStandOrDouble.HIT,
                "15": PlayerDecisionHitStandOrDouble.HIT,
                "16": PlayerDecisionHitStandOrDouble.HIT,
                "17AndOver": PlayerDecisionHitStandOrDouble.STAND
            },
            soft: {
                "13": PlayerDecisionHitStandOrDouble.HIT,
                "14": PlayerDecisionHitStandOrDouble.HIT,
                "15": PlayerDecisionHitStandOrDouble.HIT,
                "16": PlayerDecisionHitStandOrDouble.HIT,
                "17": PlayerDecisionHitStandOrDouble.HIT,        
                "18": PlayerDecisionHitStandOrDouble.HIT,        
                "19": PlayerDecisionHitStandOrDouble.STAND,        
                "20": PlayerDecisionHitStandOrDouble.STAND, 
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
                "8AndUnder": PlayerDecisionHitStandOrDouble.HIT,
                "9": PlayerDecisionHitStandOrDouble.HIT, 
                "10": PlayerDecisionHitStandOrDouble.DOUBLE,
                "11": PlayerDecisionHitStandOrDouble.DOUBLE,
                "12": PlayerDecisionHitStandOrDouble.HIT,
                "13": PlayerDecisionHitStandOrDouble.STAND,
                "14": PlayerDecisionHitStandOrDouble.STAND,
                "15": PlayerDecisionHitStandOrDouble.STAND,
                "16": PlayerDecisionHitStandOrDouble.STAND,
                "17AndOver": PlayerDecisionHitStandOrDouble.STAND
            },
            soft: {
                "13": PlayerDecisionHitStandOrDouble.HIT,
                "14": PlayerDecisionHitStandOrDouble.HIT,
                "15": PlayerDecisionHitStandOrDouble.HIT,
                "16": PlayerDecisionHitStandOrDouble.HIT,
                "17": PlayerDecisionHitStandOrDouble.HIT,        
                "18": PlayerDecisionHitStandOrDouble.DOUBLE,        
                "19": PlayerDecisionHitStandOrDouble.STAND,        
                "20": PlayerDecisionHitStandOrDouble.STAND, 
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
                "8AndUnder": PlayerDecisionHitStandOrDouble.HIT,
                "9": PlayerDecisionHitStandOrDouble.DOUBLE, 
                "10": PlayerDecisionHitStandOrDouble.DOUBLE,
                "11": PlayerDecisionHitStandOrDouble.DOUBLE,
                "12": PlayerDecisionHitStandOrDouble.HIT,
                "13": PlayerDecisionHitStandOrDouble.STAND,
                "14": PlayerDecisionHitStandOrDouble.STAND,
                "15": PlayerDecisionHitStandOrDouble.STAND,
                "16": PlayerDecisionHitStandOrDouble.STAND,
                "17AndOver": PlayerDecisionHitStandOrDouble.STAND
            },
            soft: {
                "13": PlayerDecisionHitStandOrDouble.HIT,
                "14": PlayerDecisionHitStandOrDouble.HIT,
                "15": PlayerDecisionHitStandOrDouble.HIT,
                "16": PlayerDecisionHitStandOrDouble.HIT,
                "17": PlayerDecisionHitStandOrDouble.DOUBLE,        
                "18": PlayerDecisionHitStandOrDouble.DOUBLE,        
                "19": PlayerDecisionHitStandOrDouble.STAND,        
                "20": PlayerDecisionHitStandOrDouble.STAND, 
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
                "8AndUnder": PlayerDecisionHitStandOrDouble.HIT,
                "9": PlayerDecisionHitStandOrDouble.DOUBLE, 
                "10": PlayerDecisionHitStandOrDouble.DOUBLE,
                "11": PlayerDecisionHitStandOrDouble.DOUBLE,
                "12": PlayerDecisionHitStandOrDouble.STAND,
                "13": PlayerDecisionHitStandOrDouble.STAND,
                "14": PlayerDecisionHitStandOrDouble.STAND,
                "15": PlayerDecisionHitStandOrDouble.STAND,
                "16": PlayerDecisionHitStandOrDouble.STAND,
                "17AndOver": PlayerDecisionHitStandOrDouble.STAND
            },
            soft: {
                "13": PlayerDecisionHitStandOrDouble.HIT,
                "14": PlayerDecisionHitStandOrDouble.HIT,
                "15": PlayerDecisionHitStandOrDouble.DOUBLE,
                "16": PlayerDecisionHitStandOrDouble.DOUBLE,
                "17": PlayerDecisionHitStandOrDouble.DOUBLE,        
                "18": PlayerDecisionHitStandOrDouble.DOUBLE,        
                "19": PlayerDecisionHitStandOrDouble.STAND,        
                "20": PlayerDecisionHitStandOrDouble.STAND, 
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
                "8AndUnder": PlayerDecisionHitStandOrDouble.HIT,
                "9": PlayerDecisionHitStandOrDouble.DOUBLE, 
                "10": PlayerDecisionHitStandOrDouble.DOUBLE,
                "11": PlayerDecisionHitStandOrDouble.DOUBLE,
                "12": PlayerDecisionHitStandOrDouble.STAND,
                "13": PlayerDecisionHitStandOrDouble.STAND,
                "14": PlayerDecisionHitStandOrDouble.STAND,
                "15": PlayerDecisionHitStandOrDouble.STAND,
                "16": PlayerDecisionHitStandOrDouble.STAND,
                "17AndOver": PlayerDecisionHitStandOrDouble.STAND
            },
            soft: {
                "13": PlayerDecisionHitStandOrDouble.DOUBLE,
                "14": PlayerDecisionHitStandOrDouble.DOUBLE,
                "15": PlayerDecisionHitStandOrDouble.DOUBLE,
                "16": PlayerDecisionHitStandOrDouble.DOUBLE,
                "17": PlayerDecisionHitStandOrDouble.DOUBLE,        
                "18": PlayerDecisionHitStandOrDouble.DOUBLE,        
                "19": PlayerDecisionHitStandOrDouble.STAND,        
                "20": PlayerDecisionHitStandOrDouble.STAND, 
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
                "8AndUnder": PlayerDecisionHitStandOrDouble.HIT,
                "9": PlayerDecisionHitStandOrDouble.DOUBLE, 
                "10": PlayerDecisionHitStandOrDouble.DOUBLE,
                "11": PlayerDecisionHitStandOrDouble.DOUBLE,
                "12": PlayerDecisionHitStandOrDouble.STAND,
                "13": PlayerDecisionHitStandOrDouble.STAND,
                "14": PlayerDecisionHitStandOrDouble.STAND,
                "15": PlayerDecisionHitStandOrDouble.STAND,
                "16": PlayerDecisionHitStandOrDouble.STAND,
                "17AndOver": PlayerDecisionHitStandOrDouble.STAND
            },
            soft: {
                "13": PlayerDecisionHitStandOrDouble.DOUBLE,
                "14": PlayerDecisionHitStandOrDouble.DOUBLE,
                "15": PlayerDecisionHitStandOrDouble.DOUBLE,
                "16": PlayerDecisionHitStandOrDouble.DOUBLE,
                "17": PlayerDecisionHitStandOrDouble.DOUBLE,        
                "18": PlayerDecisionHitStandOrDouble.DOUBLE,        
                "19": PlayerDecisionHitStandOrDouble.DOUBLE,        
                "20": PlayerDecisionHitStandOrDouble.STAND, 
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
                "8AndUnder": PlayerDecisionHitStandOrDouble.HIT,
                "9": PlayerDecisionHitStandOrDouble.HIT, 
                "10": PlayerDecisionHitStandOrDouble.DOUBLE,
                "11": PlayerDecisionHitStandOrDouble.DOUBLE,
                "12": PlayerDecisionHitStandOrDouble.HIT,
                "13": PlayerDecisionHitStandOrDouble.HIT,
                "14": PlayerDecisionHitStandOrDouble.HIT,
                "15": PlayerDecisionHitStandOrDouble.HIT,
                "16": PlayerDecisionHitStandOrDouble.HIT,
                "17AndOver": PlayerDecisionHitStandOrDouble.STAND
            },
            soft: {
                "13": PlayerDecisionHitStandOrDouble.HIT,
                "14": PlayerDecisionHitStandOrDouble.HIT,
                "15": PlayerDecisionHitStandOrDouble.HIT,
                "16": PlayerDecisionHitStandOrDouble.HIT,
                "17": PlayerDecisionHitStandOrDouble.HIT,        
                "18": PlayerDecisionHitStandOrDouble.STAND,        
                "19": PlayerDecisionHitStandOrDouble.STAND,        
                "20": PlayerDecisionHitStandOrDouble.STAND, 
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
                "8AndUnder": PlayerDecisionHitStandOrDouble.HIT,
                "9": PlayerDecisionHitStandOrDouble.HIT, 
                "10": PlayerDecisionHitStandOrDouble.DOUBLE,
                "11": PlayerDecisionHitStandOrDouble.DOUBLE,
                "12": PlayerDecisionHitStandOrDouble.HIT,
                "13": PlayerDecisionHitStandOrDouble.HIT,
                "14": PlayerDecisionHitStandOrDouble.HIT,
                "15": PlayerDecisionHitStandOrDouble.HIT,
                "16": PlayerDecisionHitStandOrDouble.HIT,
                "17AndOver": PlayerDecisionHitStandOrDouble.STAND
            },
            soft: {
                "13": PlayerDecisionHitStandOrDouble.HIT,
                "14": PlayerDecisionHitStandOrDouble.HIT,
                "15": PlayerDecisionHitStandOrDouble.HIT,
                "16": PlayerDecisionHitStandOrDouble.HIT,
                "17": PlayerDecisionHitStandOrDouble.HIT,        
                "18": PlayerDecisionHitStandOrDouble.STAND,        
                "19": PlayerDecisionHitStandOrDouble.STAND,        
                "20": PlayerDecisionHitStandOrDouble.STAND, 
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
                "8AndUnder": PlayerDecisionHitStandOrDouble.HIT,
                "9": PlayerDecisionHitStandOrDouble.HIT, 
                "10": PlayerDecisionHitStandOrDouble.DOUBLE,
                "11": PlayerDecisionHitStandOrDouble.DOUBLE,
                "12": PlayerDecisionHitStandOrDouble.HIT,
                "13": PlayerDecisionHitStandOrDouble.HIT,
                "14": PlayerDecisionHitStandOrDouble.HIT,
                "15": PlayerDecisionHitStandOrDouble.HIT,
                "16": PlayerDecisionHitStandOrDouble.HIT,
                "17AndOver": PlayerDecisionHitStandOrDouble.STAND
            },
            soft: {
                "13": PlayerDecisionHitStandOrDouble.HIT,
                "14": PlayerDecisionHitStandOrDouble.HIT,
                "15": PlayerDecisionHitStandOrDouble.HIT,
                "16": PlayerDecisionHitStandOrDouble.HIT,
                "17": PlayerDecisionHitStandOrDouble.HIT,        
                "18": PlayerDecisionHitStandOrDouble.HIT,        
                "19": PlayerDecisionHitStandOrDouble.STAND,        
                "20": PlayerDecisionHitStandOrDouble.STAND, 
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
                "8AndUnder": PlayerDecisionHitStandOrDouble.HIT,
                "9": PlayerDecisionHitStandOrDouble.HIT, 
                "10": PlayerDecisionHitStandOrDouble.HIT,
                "11": PlayerDecisionHitStandOrDouble.DOUBLE,
                "12": PlayerDecisionHitStandOrDouble.HIT,
                "13": PlayerDecisionHitStandOrDouble.HIT,
                "14": PlayerDecisionHitStandOrDouble.HIT,
                "15": PlayerDecisionHitStandOrDouble.HIT,
                "16": PlayerDecisionHitStandOrDouble.HIT,
                "17AndOver": PlayerDecisionHitStandOrDouble.STAND
            },
            soft: {
                "13": PlayerDecisionHitStandOrDouble.HIT,
                "14": PlayerDecisionHitStandOrDouble.HIT,
                "15": PlayerDecisionHitStandOrDouble.HIT,
                "16": PlayerDecisionHitStandOrDouble.HIT,
                "17": PlayerDecisionHitStandOrDouble.HIT,        
                "18": PlayerDecisionHitStandOrDouble.HIT,        
                "19": PlayerDecisionHitStandOrDouble.STAND,        
                "20": PlayerDecisionHitStandOrDouble.STAND, 
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