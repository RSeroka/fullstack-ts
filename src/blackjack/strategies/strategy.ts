

export enum PlayerPlay {
    HIT,
    STAND,
    DOUBLE,
}

type PerDealerUpcard = {
    hard: {
        "8AndUnder": PlayerPlay;
        "9": PlayerPlay;
        "10": PlayerPlay;
        "11": PlayerPlay;
        "12": PlayerPlay;
        "13": PlayerPlay;
        "14": PlayerPlay;
        "15": PlayerPlay;
        "16": PlayerPlay;
        "17AndOver": PlayerPlay;
    },
    soft: {
        "13": PlayerPlay;
        "14": PlayerPlay;
        "15": PlayerPlay;
        "16": PlayerPlay;
        "17": PlayerPlay;        
        "18": PlayerPlay;        
        "19": PlayerPlay;        
        "20": PlayerPlay;        
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