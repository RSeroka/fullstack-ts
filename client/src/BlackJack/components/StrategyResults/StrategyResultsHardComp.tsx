



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
        const retVal: Array<ReactNode> = [];
        retVal.push(<>&nbsp;</>);
        for (let rowNum = 1; rowNum < 11; rowNum++) {
            retVal.push(<>{this.getPlayerTotalDescription(rowNum)}<br/>Dbl</>)
        }
        return retVal;
    }

    public getPlayerTotalDescription(rowNum: number): string {
        const playerTotal: string
            = rowNum <= 1 ? "<= 8" : 
            rowNum >= 10 ? ">=17" : 
            ("" + (rowNum + 7));

        return playerTotal;
    }

    public getCellContent(col: number, row: number): ReactNode {
        const dealerUpcardArrayOffset = col >= 10 ? 0 : col;
        const playerTotal: keyof PerDealerUpcardStrategyResults["hard"]
            = row <= 1 ? "8AndUnder" : 
            row >= 10 ? "17AndOver" : 
            ("" + (row + 7)) as keyof PerDealerUpcardStrategyResults["hard"];

        const stats = this.strategyResults?.dealerUpcards ? this.strategyResults?.dealerUpcards[dealerUpcardArrayOffset]?.hard[playerTotal].single : undefined;
        const doubleStats = this.strategyResults?.dealerUpcards ? this.strategyResults?.dealerUpcards[dealerUpcardArrayOffset]?.hard[playerTotal].double : undefined;
        const dealerCard = col >= 10 ? "A" : "" + (col + 1);
        const singleDesc = `Dealer: ${dealerCard}, Player: ${this.getPlayerTotalDescription(row)}`;
        const doubleDesc = singleDesc + ", Double";


        return (
            <>
                <StrategyResultsStatsComp description={singleDesc} stats={stats} ></StrategyResultsStatsComp>
                <StrategyResultsStatsComp description={doubleDesc} stats={doubleStats} ></StrategyResultsStatsComp>
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
