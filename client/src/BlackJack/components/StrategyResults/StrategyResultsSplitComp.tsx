

import React, { ReactNode } from 'react';


import { StrategyResults, PerDealerUpcardStrategyResults } from '../../interface-types/strategy-results';

import "./StrategyResultsSplitComp.css";
import StrategyResultsStatsComp from './StrategyResultsStatsComp';
import StrategyGridComp, { StrategyGridSpecialization } from '../StrategyGrid';


class StrategyResultsSplitCompSpecialization extends StrategyGridSpecialization {
    private strategyResults: StrategyResults | undefined;

    constructor(strategyResults: StrategyResults | undefined) {
        super();
        this.strategyResults = strategyResults;
    }

    public get columnClassName(): string {
        return "strategy-results-split__col";
    }
    public get cellClassName(): string {
        return "strategy-results-split__cell";
    }
    public get topCellClassName(): string {
        return "strategy-results-split__cell--header";
    }

    public get leftColumnContent(): Array<ReactNode> {
        return [
            <>&nbsp;</>,
            <>2s</>,
            <>3s</>,
            <>4s</>,
            <>6s</>,
            <>7s</>,
            <>8s</>,
            <>9s</>,
            <>Aces</>
        ];
    }

    public getCellContent(col: number, row: number): ReactNode {
        const dealerUpcardArrayOffset = col >= 10 ? 0 : col;
        const playerTotal: keyof PerDealerUpcardStrategyResults["split"]
            = row >= 1 && row <= 3 ? ("" + (row + 1)) as keyof PerDealerUpcardStrategyResults["split"]
            : row >= 4 && row <= 7 ? ("" + (row + 2)) as keyof PerDealerUpcardStrategyResults["split"]
            : "A";


        const stats = this.strategyResults?.dealerUpcards ? this.strategyResults?.dealerUpcards[dealerUpcardArrayOffset]?.split[playerTotal] : undefined;


        return (
            <>
                <StrategyResultsStatsComp stats={stats} ></StrategyResultsStatsComp>
            </>

        );
    }

}

type StrategyResultsSplitCompProperties = {
    strategyResults?: StrategyResults;
}

type StrategyResultsSplitCompState = {

};

class StrategyResultsSplitComp extends React.Component<StrategyResultsSplitCompProperties, StrategyResultsSplitCompState> {

    render() : ReactNode {
        const specialization = new StrategyResultsSplitCompSpecialization(this.props.strategyResults);
        return (
            <StrategyGridComp specialization={specialization}></StrategyGridComp>
        );

    }
}



export default StrategyResultsSplitComp;



