



import React, { ReactNode } from 'react';


import { StrategyResults, PerDealerUpcardStrategyResults } from '../../interface-types/strategy-results';


import "./StrategyResultsHardComp.css";
import StrategyResultsStatsComp from './StrategyResultsStatsComp';
import StrategyGridComp, { StrategyGridSpecialization } from '../StrategyGrid';





class StrategyResultsHardCompSpecialization extends StrategyGridSpecialization {
    private strategyResults: StrategyResults | undefined;

    constructor(strategyResults: StrategyResults | undefined) {
        super();
        this.strategyResults = strategyResults;
    }

    public get columnClassName(): string {
        return "strategy-results-hard__col";
    }
    public get cellClassName(): string {
        return "strategy-results-hard__cell";
    }
    public get topCellClassName(): string {
        return "strategy-results-hard__cell--header";
    }

    public get leftColumnContent(): Array<ReactNode> {
        return [
            <>&nbsp;</>,
            <>&lt;= 8<br/>Dbl</>,
            <>9<br/>Dbl</>,
            <>10<br/>Dbl</>,
            <>11<br/>Dbl</>,
            <>12<br/>Dbl</>,
            <>13<br/>Dbl</>,
            <>14<br/>Dbl</>,
            <>15<br/>Dbl</>,
            <>16<br/>Dbl</>,
            <>&gt;=17<br/>Dbl</>
        ];
    }

    public getCellContent(col: number, row: number): ReactNode {
        const dealerUpcardArrayOffset = col >= 10 ? 0 : col;
        const playerTotal: keyof PerDealerUpcardStrategyResults["hard"]
            = row <= 1 ? "8AndUnder" : 
            row >= 10 ? "17AndOver" : 
            ("" + (row + 7)) as keyof PerDealerUpcardStrategyResults["hard"];

        const stats = this.strategyResults?.dealerUpcards ? this.strategyResults?.dealerUpcards[dealerUpcardArrayOffset]?.hard[playerTotal].single : undefined;
        const doubleStats = this.strategyResults?.dealerUpcards ? this.strategyResults?.dealerUpcards[dealerUpcardArrayOffset]?.hard[playerTotal].double : undefined;

        return (
            <>
                <StrategyResultsStatsComp stats={stats} ></StrategyResultsStatsComp>
                <StrategyResultsStatsComp stats={doubleStats} ></StrategyResultsStatsComp>
            </>

        );
    }

}

type StrategyResultsHardCompProperties = {
    strategyResults?: StrategyResults;
}

type StrategyResultsHardCompState = {

};

class StrategyResultsHardComp extends React.Component<StrategyResultsHardCompProperties, StrategyResultsHardCompState> {

    render() : ReactNode {
        const specialization = new StrategyResultsHardCompSpecialization(this.props.strategyResults);
        return (
            <StrategyGridComp specialization={specialization}></StrategyGridComp>
        );

    }
}



export default StrategyResultsHardComp;
