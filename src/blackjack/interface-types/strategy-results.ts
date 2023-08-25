



export type StrategyResultsStats = {
    numberWins: number;
    numberLosses: number;
    numberHands: number;
    netValue: number;
}

export type PerIndividualStrategyResults = {
    double: StrategyResultsStats;
    single: StrategyResultsStats;
};

export type PerDealerUpcardStrategyResults = {
    hard: {
        "8AndUnder": PerIndividualStrategyResults;
        "9": PerIndividualStrategyResults;
        "10": PerIndividualStrategyResults;
        "11": PerIndividualStrategyResults;
        "12": PerIndividualStrategyResults;
        "13": PerIndividualStrategyResults;
        "14": PerIndividualStrategyResults;
        "15": PerIndividualStrategyResults;
        "16": PerIndividualStrategyResults;
        "17AndOver": PerIndividualStrategyResults;
    },
    soft: {
        "13": PerIndividualStrategyResults;
        "14": PerIndividualStrategyResults;
        "15": PerIndividualStrategyResults;
        "16": PerIndividualStrategyResults;
        "17": PerIndividualStrategyResults;        
        "18": PerIndividualStrategyResults;        
        "19": PerIndividualStrategyResults;        
        "20": PerIndividualStrategyResults;        
    },
    split: {
        "A"?: StrategyResultsStats;
        "2"?: StrategyResultsStats;
        "3"?: StrategyResultsStats;
        "4"?: StrategyResultsStats;
        "6"?: StrategyResultsStats;
        "7"?: StrategyResultsStats;
        "8"?: StrategyResultsStats;
        "9"?: StrategyResultsStats;
    }, 
    surrender: {
        "15"?: StrategyResultsStats;
        "16"?: StrategyResultsStats;
        "17"?: StrategyResultsStats;
    }
};


export type StrategyResults = {
    dealerUpcards: Array<PerDealerUpcardStrategyResults>;
    blackjack: StrategyResultsStats;
    overall: StrategyResultsStats;  
    // Note: overall should be sum of hard, soft, and surrender.  
    // individual hands of a split put into hard, soft and surrender.   
    // the results stored for split keeps track of that split strategy, but is not added to overall
};


export default StrategyResults;