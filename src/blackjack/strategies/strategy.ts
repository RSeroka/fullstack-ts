


import type { PlayerDecisionHitStandOrDouble } from "./decsision";

type PerDealerUpcard = {
    hard: {
        "8AndUnder": PlayerDecisionHitStandOrDouble;
        "9": PlayerDecisionHitStandOrDouble;
        "10": PlayerDecisionHitStandOrDouble;
        "11": PlayerDecisionHitStandOrDouble;
        "12": PlayerDecisionHitStandOrDouble;
        "13": PlayerDecisionHitStandOrDouble;
        "14": PlayerDecisionHitStandOrDouble;
        "15": PlayerDecisionHitStandOrDouble;
        "16": PlayerDecisionHitStandOrDouble;
        "17AndOver": PlayerDecisionHitStandOrDouble;
    },
    soft: {
        "13": PlayerDecisionHitStandOrDouble;
        "14": PlayerDecisionHitStandOrDouble;
        "15": PlayerDecisionHitStandOrDouble;
        "16": PlayerDecisionHitStandOrDouble;
        "17": PlayerDecisionHitStandOrDouble;        
        "18": PlayerDecisionHitStandOrDouble;        
        "19": PlayerDecisionHitStandOrDouble;        
        "20": PlayerDecisionHitStandOrDouble;        
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
        "10"?: boolean;
    }, 
    "surrender": {
        "15"?: boolean;
        "16"?: boolean;
    }
}


export type Strategy = {
    dealerUpcards: Array<PerDealerUpcard>;
}


export default Strategy;