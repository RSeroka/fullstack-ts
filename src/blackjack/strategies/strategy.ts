


import type { PlayerStrategyHitStandOrDouble } from "./decision";

export type PerDealerUpcard = {
    hard: {
        "8AndUnder": PlayerStrategyHitStandOrDouble;
        "9": PlayerStrategyHitStandOrDouble;
        "10": PlayerStrategyHitStandOrDouble;
        "11": PlayerStrategyHitStandOrDouble;
        "12": PlayerStrategyHitStandOrDouble;
        "13": PlayerStrategyHitStandOrDouble;
        "14": PlayerStrategyHitStandOrDouble;
        "15": PlayerStrategyHitStandOrDouble;
        "16": PlayerStrategyHitStandOrDouble;
        "17AndOver": PlayerStrategyHitStandOrDouble;
    },
    soft: {
        "13": PlayerStrategyHitStandOrDouble;
        "14": PlayerStrategyHitStandOrDouble;
        "15": PlayerStrategyHitStandOrDouble;
        "16": PlayerStrategyHitStandOrDouble;
        "17": PlayerStrategyHitStandOrDouble;        
        "18": PlayerStrategyHitStandOrDouble;        
        "19": PlayerStrategyHitStandOrDouble;        
        "20": PlayerStrategyHitStandOrDouble;        
    },
    "split": {
        "A"?: boolean;
        "2"?: boolean;
        "3"?: boolean;
        "4"?: boolean;
        "5"?: boolean;
        "6"?: boolean;
        "7"?: boolean;
        "8"?: boolean;
        "9"?: boolean;
    }, 
    "surrender": {
        "15"?: boolean;
        "16"?: boolean;
        "17"?: boolean;
    }
}


export type Strategy = {
    dealerUpcards: Array<PerDealerUpcard>;
}


export default Strategy;