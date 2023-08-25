

import React, { ReactNode } from 'react';


import { StrategyResults, PerDealerUpcardStrategyResults } from '../../interface-types/strategy-results';

import "./StrategyResultsSurrenderComp.css";
import StrategyResultsStatsComp from './StrategyResultsStatsComp';
import StrategyResultsGridComp, { StrategyResultsGridSpecialization } from './StrategyResultsGrid';


class StrategyResultsSurrenderCompSpecialization extends StrategyResultsGridSpecialization {
    private strategyResults: StrategyResults | undefined;

    constructor(strategyResults: StrategyResults | undefined) {
        super();
        this.strategyResults = strategyResults;
    }

    public get columnClassName(): string {
        return "strategy-results-surrender__col";
    }
    public get cellClassName(): string {
        return "strategy-results-surrender__cell";
    }
    public get topCellClassName(): string {
        return "strategy-results-surrender__cell--header";
    }

    public get leftColumnContent(): Array<ReactNode> {
        return [
            <>&nbsp;</>,
            <>15</>,
            <>16</>,
            <>17</>
        ];
    }

    public getCellContent(col: number, row: number): ReactNode {
        const dealerUpcardArrayOffset = col >= 10 ? 0 : col;
        const playerTotal: keyof PerDealerUpcardStrategyResults["surrender"]
            = ("" + (row + 14)) as keyof PerDealerUpcardStrategyResults["surrender"];


        const stats = this.strategyResults?.dealerUpcards ? this.strategyResults?.dealerUpcards[dealerUpcardArrayOffset]?.surrender[playerTotal] : undefined;


        return (
            <>
                <StrategyResultsStatsComp stats={stats} ></StrategyResultsStatsComp>
            </>

        );
    }

}

type StrategyResultsSurrenderCompProperties = {
    strategyResults?: StrategyResults;
}

type StrategyResultsSurrenderCompState = {

};

class StrategyResultsSurrenderComp extends React.Component<StrategyResultsSurrenderCompProperties, StrategyResultsSurrenderCompState> {

    render() : ReactNode {
        const specialization = new StrategyResultsSurrenderCompSpecialization(this.props.strategyResults);
        return (
            <StrategyResultsGridComp specialization={specialization}></StrategyResultsGridComp>
        );

    }
}



export default StrategyResultsSurrenderComp;



