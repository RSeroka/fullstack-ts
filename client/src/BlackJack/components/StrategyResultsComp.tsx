



import React, { ReactNode } from 'react';




import { StrategyResults, PerDealerUpcardStrategyResults } from '../interface-types/strategy-results';


import "./StrategyResultsComp.css";
import StrategyResultsStatsComp from './StrategyResultsStatsComp';


type StrategyResultsCompProperties = {
    strategyResults?: StrategyResults;
}

type StrategyResultsCompState = {

};




class StrategyResultsComp extends React.Component<StrategyResultsCompProperties, StrategyResultsCompState> {


    // private getHardStrategyResultComponentFirstColumn() : ReactNode {
    //     const columnContent = new Array<ReactNode>(11);
    //     columnContent.push(<div className="strategy-results__hard-cell">{firstRow}</div>);
    //     for (let row = 1; row <= 10; row++) {
    //         columnContent.push(this.getHardStrategyResultComponent(col, row));
    //     }

    //     return (
    //         <>
    //             { columnContent }  
    //         </>

    //     );

    // }

    private getHardStrategyResultComponentColumn(col: number): ReactNode {
        const columnContent = new Array<ReactNode>(11);
        const firstRow = col >= 10 ? "A" : "" + (col + 1);
        const headerId = "bj-hsrcc-" + col + "-0";
        columnContent.push(<div key={headerId} className="strategy-results__hard-cell">{firstRow}</div>);
        for (let row = 1; row <= 10; row++) {
            const id = "bj-hsrcc-" + col + "-" + row;
            columnContent.push(<div key={id} className="strategy-results__hard-cell">{this.getHardStrategyResultComponent(col, row)}</div>);
        }

        return (
            <>
                { columnContent }  
            </>

        );
    }

    private getHardStrategyResultComponent(col: number, row: number): ReactNode {
        const dealerUpcardArrayOffset = col >= 10 ? 0 : col;
        const playerTotal: keyof PerDealerUpcardStrategyResults["hard"]
            = row <= 1 ? "8AndUnder" : 
            row >= 10 ? "17AndOver" : 
            ("" + (row + 7)) as keyof PerDealerUpcardStrategyResults["hard"];

        const stats = this.props.strategyResults?.dealerUpcards ? this.props.strategyResults?.dealerUpcards[dealerUpcardArrayOffset]?.hard[playerTotal].single : undefined;

        // TODO - merge single and double
        return (
            <StrategyResultsStatsComp stats={stats} ></StrategyResultsStatsComp>
        );
    }

    render(): ReactNode {

        return (
            <>
                <div className="strategy-results__hard">
                    <div key="bj-hsrcc-0" className="strategy-results__hard-col">
                        <div key="bj-hsrcc-0-0" className="strategy-results__hard-cell">&nbsp;</div>
                        <div key="bj-hsrcc-0-1" className="strategy-results__hard-cell">&lt;= 8</div>
                        <div key="bj-hsrcc-0-2" className="strategy-results__hard-cell">9</div>
                        <div key="bj-hsrcc-0-3" className="strategy-results__hard-cell">10</div>
                        <div key="bj-hsrcc-0-4" className="strategy-results__hard-cell">11</div>
                        <div key="bj-hsrcc-0-5" className="strategy-results__hard-cell">12</div>
                        <div key="bj-hsrcc-0-6" className="strategy-results__hard-cell">13</div>
                        <div key="bj-hsrcc-0-7" className="strategy-results__hard-cell">14</div>
                        <div key="bj-hsrcc-0-8" className="strategy-results__hard-cell">15</div>
                        <div key="bj-hsrcc-0-9" className="strategy-results__hard-cell">16</div>
                        <div key="bj-hsrcc-0-10" className="strategy-results__hard-cell">&gt;=17</div>
                    </div>

                    <div key="bj-hsrcc-1" className="strategy-results__hard-col">
                        {this.getHardStrategyResultComponentColumn(1)}
                    </div>
                    <div key="bj-hsrcc-2" className="strategy-results__hard-col">
                        {this.getHardStrategyResultComponentColumn(2)}
                    </div>
                    <div key="bj-hsrcc-3" className="strategy-results__hard-col">
                        {this.getHardStrategyResultComponentColumn(3)}
                    </div>
                    <div key="bj-hsrcc-4" className="strategy-results__hard-col">
                        {this.getHardStrategyResultComponentColumn(4)}
                    </div>
                    <div key="bj-hsrcc-5" className="strategy-results__hard-col">
                        {this.getHardStrategyResultComponentColumn(5)}
                    </div>
                    <div key="bj-hsrcc-6" className="strategy-results__hard-col">
                        {this.getHardStrategyResultComponentColumn(6)}
                    </div>
                    <div key="bj-hsrcc-7" className="strategy-results__hard-col">
                        {this.getHardStrategyResultComponentColumn(7)}
                    </div>
                    <div key="bj-hsrcc-8" className="strategy-results__hard-col">
                        {this.getHardStrategyResultComponentColumn(8)}
                    </div>
                    <div key="bj-hsrcc-9" className="strategy-results__hard-col">
                        {this.getHardStrategyResultComponentColumn(9)}
                    </div>
                    <div key="bj-hsrcc-10" className="strategy-results__hard-col">
                        {this.getHardStrategyResultComponentColumn(10)}
                    </div>


    
                </div>

            </>


        );
    }
}


export default StrategyResultsComp;
