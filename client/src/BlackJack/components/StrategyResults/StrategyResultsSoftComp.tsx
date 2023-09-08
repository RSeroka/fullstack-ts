




import React, { ReactNode } from 'react';


import { StrategyResults, PerDealerUpcardStrategyResults } from '../../interface-types/strategy-results';


import "./StrategyResultsSoftComp.css";
import StrategyResultsStatsComp from './StrategyResultsStatsComp';
import StrategyGridComp, { StrategyGridSpecialization } from '../StrategyGrid';





class StrategyResultsSoftCompSpecialization extends StrategyGridSpecialization {
    private strategyResults: StrategyResults | undefined;

    constructor(strategyResults: StrategyResults | undefined) {
        super();
        this.strategyResults = strategyResults;
    }

    public get columnClassName(): string {
        return "strategy-results-soft__col";
    }
    public get cellClassName(): string {
        return "strategy-results-soft__cell";
    }
    public get topCellClassName(): string {
        return "strategy-results-soft__cell--header";
    }

    public get leftColumnContent(): Array<ReactNode> {
        return [
            <>&nbsp;</>,
            <>13<br/>Dbl</>,
            <>14<br/>Dbl</>,
            <>15<br/>Dbl</>,
            <>16<br/>Dbl</>,
            <>17<br/>Dbl</>,
            <>18<br/>Dbl</>,
            <>19<br/>Dbl</>,
            <>20<br/>Dbl</>
        ];
    }

    public getCellContent(col: number, row: number): ReactNode {
        const dealerUpcardArrayOffset = col >= 10 ? 0 : col;
        const playerTotal: keyof PerDealerUpcardStrategyResults["soft"]
            = ("" + (row + 12)) as keyof PerDealerUpcardStrategyResults["soft"];

        const stats = this.strategyResults?.dealerUpcards ? this.strategyResults?.dealerUpcards[dealerUpcardArrayOffset]?.soft[playerTotal].single : undefined;
        const doubleStats = this.strategyResults?.dealerUpcards ? this.strategyResults?.dealerUpcards[dealerUpcardArrayOffset]?.soft[playerTotal].double : undefined;

        return (
            <>
                <StrategyResultsStatsComp stats={stats} ></StrategyResultsStatsComp>
                <StrategyResultsStatsComp stats={doubleStats} ></StrategyResultsStatsComp>
            </>

        );
    }

}

type StrategyResultsSoftCompProperties = {
    strategyResults?: StrategyResults;
}

type StrategyResultsSoftCompState = {

};

class StrategyResultsSoftComp extends React.Component<StrategyResultsSoftCompProperties, StrategyResultsSoftCompState> {

    render() : ReactNode {
        const specialization = new StrategyResultsSoftCompSpecialization(this.props.strategyResults);
        return (
            <StrategyGridComp specialization={specialization}></StrategyGridComp>
        );

    }
}



export default StrategyResultsSoftComp;


