

// https://www.blackjackapprenticeship.com/blackjack-strategy-charts/

import Strategy, { PlayerPlay } from "./strategy";


// Double after split allowed
// Double on soft 18, 19 allowed
const BasicStrategy: Strategy = {
    dealerUpcards: [
        // ACE
        {
            hard: {
                "8AndUnder": PlayerPlay.HIT,
                "9": PlayerPlay.HIT, 
                "10": PlayerPlay.HIT,
                "11": PlayerPlay.DOUBLE,
                "12": PlayerPlay.HIT,
                "13": PlayerPlay.HIT,
                "14": PlayerPlay.HIT,
                "15": PlayerPlay.HIT,
                "16": PlayerPlay.HIT,
                "17AndOver": PlayerPlay.STAND
            },
            soft: {
                "13": PlayerPlay.HIT,
                "14": PlayerPlay.HIT,
                "15": PlayerPlay.HIT,
                "16": PlayerPlay.HIT,
                "17": PlayerPlay.HIT,        
                "18": PlayerPlay.HIT,        
                "19": PlayerPlay.STAND,        
                "20": PlayerPlay.STAND, 
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
                "8AndUnder": PlayerPlay.HIT,
                "9": PlayerPlay.HIT, 
                "10": PlayerPlay.DOUBLE,
                "11": PlayerPlay.DOUBLE,
                "12": PlayerPlay.HIT,
                "13": PlayerPlay.STAND,
                "14": PlayerPlay.STAND,
                "15": PlayerPlay.STAND,
                "16": PlayerPlay.STAND,
                "17AndOver": PlayerPlay.STAND
            },
            soft: {
                "13": PlayerPlay.HIT,
                "14": PlayerPlay.HIT,
                "15": PlayerPlay.HIT,
                "16": PlayerPlay.HIT,
                "17": PlayerPlay.HIT,        
                "18": PlayerPlay.DOUBLE,        
                "19": PlayerPlay.STAND,        
                "20": PlayerPlay.STAND, 
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
                "8AndUnder": PlayerPlay.HIT,
                "9": PlayerPlay.DOUBLE, 
                "10": PlayerPlay.DOUBLE,
                "11": PlayerPlay.DOUBLE,
                "12": PlayerPlay.HIT,
                "13": PlayerPlay.STAND,
                "14": PlayerPlay.STAND,
                "15": PlayerPlay.STAND,
                "16": PlayerPlay.STAND,
                "17AndOver": PlayerPlay.STAND
            },
            soft: {
                "13": PlayerPlay.HIT,
                "14": PlayerPlay.HIT,
                "15": PlayerPlay.HIT,
                "16": PlayerPlay.HIT,
                "17": PlayerPlay.DOUBLE,        
                "18": PlayerPlay.DOUBLE,        
                "19": PlayerPlay.STAND,        
                "20": PlayerPlay.STAND, 
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
                "8AndUnder": PlayerPlay.HIT,
                "9": PlayerPlay.DOUBLE, 
                "10": PlayerPlay.DOUBLE,
                "11": PlayerPlay.DOUBLE,
                "12": PlayerPlay.STAND,
                "13": PlayerPlay.STAND,
                "14": PlayerPlay.STAND,
                "15": PlayerPlay.STAND,
                "16": PlayerPlay.STAND,
                "17AndOver": PlayerPlay.STAND
            },
            soft: {
                "13": PlayerPlay.HIT,
                "14": PlayerPlay.HIT,
                "15": PlayerPlay.DOUBLE,
                "16": PlayerPlay.DOUBLE,
                "17": PlayerPlay.DOUBLE,        
                "18": PlayerPlay.DOUBLE,        
                "19": PlayerPlay.STAND,        
                "20": PlayerPlay.STAND, 
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
                "8AndUnder": PlayerPlay.HIT,
                "9": PlayerPlay.DOUBLE, 
                "10": PlayerPlay.DOUBLE,
                "11": PlayerPlay.DOUBLE,
                "12": PlayerPlay.STAND,
                "13": PlayerPlay.STAND,
                "14": PlayerPlay.STAND,
                "15": PlayerPlay.STAND,
                "16": PlayerPlay.STAND,
                "17AndOver": PlayerPlay.STAND
            },
            soft: {
                "13": PlayerPlay.DOUBLE,
                "14": PlayerPlay.DOUBLE,
                "15": PlayerPlay.DOUBLE,
                "16": PlayerPlay.DOUBLE,
                "17": PlayerPlay.DOUBLE,        
                "18": PlayerPlay.DOUBLE,        
                "19": PlayerPlay.STAND,        
                "20": PlayerPlay.STAND, 
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
                "8AndUnder": PlayerPlay.HIT,
                "9": PlayerPlay.DOUBLE, 
                "10": PlayerPlay.DOUBLE,
                "11": PlayerPlay.DOUBLE,
                "12": PlayerPlay.STAND,
                "13": PlayerPlay.STAND,
                "14": PlayerPlay.STAND,
                "15": PlayerPlay.STAND,
                "16": PlayerPlay.STAND,
                "17AndOver": PlayerPlay.STAND
            },
            soft: {
                "13": PlayerPlay.DOUBLE,
                "14": PlayerPlay.DOUBLE,
                "15": PlayerPlay.DOUBLE,
                "16": PlayerPlay.DOUBLE,
                "17": PlayerPlay.DOUBLE,        
                "18": PlayerPlay.DOUBLE,        
                "19": PlayerPlay.DOUBLE,        
                "20": PlayerPlay.STAND, 
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
                "8AndUnder": PlayerPlay.HIT,
                "9": PlayerPlay.HIT, 
                "10": PlayerPlay.DOUBLE,
                "11": PlayerPlay.DOUBLE,
                "12": PlayerPlay.HIT,
                "13": PlayerPlay.HIT,
                "14": PlayerPlay.HIT,
                "15": PlayerPlay.HIT,
                "16": PlayerPlay.HIT,
                "17AndOver": PlayerPlay.STAND
            },
            soft: {
                "13": PlayerPlay.HIT,
                "14": PlayerPlay.HIT,
                "15": PlayerPlay.HIT,
                "16": PlayerPlay.HIT,
                "17": PlayerPlay.HIT,        
                "18": PlayerPlay.STAND,        
                "19": PlayerPlay.STAND,        
                "20": PlayerPlay.STAND, 
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
                "8AndUnder": PlayerPlay.HIT,
                "9": PlayerPlay.HIT, 
                "10": PlayerPlay.DOUBLE,
                "11": PlayerPlay.DOUBLE,
                "12": PlayerPlay.HIT,
                "13": PlayerPlay.HIT,
                "14": PlayerPlay.HIT,
                "15": PlayerPlay.HIT,
                "16": PlayerPlay.HIT,
                "17AndOver": PlayerPlay.STAND
            },
            soft: {
                "13": PlayerPlay.HIT,
                "14": PlayerPlay.HIT,
                "15": PlayerPlay.HIT,
                "16": PlayerPlay.HIT,
                "17": PlayerPlay.HIT,        
                "18": PlayerPlay.STAND,        
                "19": PlayerPlay.STAND,        
                "20": PlayerPlay.STAND, 
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
                "8AndUnder": PlayerPlay.HIT,
                "9": PlayerPlay.HIT, 
                "10": PlayerPlay.DOUBLE,
                "11": PlayerPlay.DOUBLE,
                "12": PlayerPlay.HIT,
                "13": PlayerPlay.HIT,
                "14": PlayerPlay.HIT,
                "15": PlayerPlay.HIT,
                "16": PlayerPlay.HIT,
                "17AndOver": PlayerPlay.STAND
            },
            soft: {
                "13": PlayerPlay.HIT,
                "14": PlayerPlay.HIT,
                "15": PlayerPlay.HIT,
                "16": PlayerPlay.HIT,
                "17": PlayerPlay.HIT,        
                "18": PlayerPlay.HIT,        
                "19": PlayerPlay.STAND,        
                "20": PlayerPlay.STAND, 
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
                "8AndUnder": PlayerPlay.HIT,
                "9": PlayerPlay.HIT, 
                "10": PlayerPlay.HIT,
                "11": PlayerPlay.DOUBLE,
                "12": PlayerPlay.HIT,
                "13": PlayerPlay.HIT,
                "14": PlayerPlay.HIT,
                "15": PlayerPlay.HIT,
                "16": PlayerPlay.HIT,
                "17AndOver": PlayerPlay.STAND
            },
            soft: {
                "13": PlayerPlay.HIT,
                "14": PlayerPlay.HIT,
                "15": PlayerPlay.HIT,
                "16": PlayerPlay.HIT,
                "17": PlayerPlay.HIT,        
                "18": PlayerPlay.HIT,        
                "19": PlayerPlay.STAND,        
                "20": PlayerPlay.STAND, 
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