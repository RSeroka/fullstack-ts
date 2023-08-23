



import React, { ReactNode } from 'react';

import MediaQuery from 'react-responsive';


import { StrategyResults, PerDealerUpcardStrategyResults } from '../interface-types/strategy-results';


import "./strategy-results-grid.css";
import "./StrategyResultsSplitComp.css";
import StrategyResultsStatsComp from './StrategyResultsStatsComp';



type StrategyResultsSplitCompProperties = {
    strategyResults?: StrategyResults;
}

type StrategyResultsSplitCompState = {

};


class StrategyResultsSplitComp extends React.Component<StrategyResultsSplitCompProperties, StrategyResultsSplitCompState> {



    render() : ReactNode {
        return (
            <>
                <MediaQuery minWidth={660}>
                    <StrategyResultsSplitPartialComp strategyResults={this.props.strategyResults}></StrategyResultsSplitPartialComp>
                </MediaQuery>
                <MediaQuery maxWidth={659} minWidth={330}>
                    <StrategyResultsSplitPartialComp strategyResults={this.props.strategyResults} highColumnNumber={5}></StrategyResultsSplitPartialComp>
                    <br />                
                    <StrategyResultsSplitPartialComp strategyResults={this.props.strategyResults} lowColumnNumber={6}></StrategyResultsSplitPartialComp>                
                </MediaQuery>
                <MediaQuery minWidth={250} maxWidth={329}>
                    <StrategyResultsSplitPartialComp strategyResults={this.props.strategyResults} highColumnNumber={3}></StrategyResultsSplitPartialComp>
                    <br />                
                    <StrategyResultsSplitPartialComp strategyResults={this.props.strategyResults} lowColumnNumber={4} highColumnNumber={7}></StrategyResultsSplitPartialComp>  
                    <br />                
                    <StrategyResultsSplitPartialComp strategyResults={this.props.strategyResults} lowColumnNumber={8} ></StrategyResultsSplitPartialComp>  
                </MediaQuery>

            </>
        )
    }
}



type StrategyResultsSplitPartialCompProperties = {
    strategyResults?: StrategyResults;
    lowColumnNumber?: number;
    highColumnNumber?: number;
}

type StrategyResultsSplitPartialCompState = {

};





class StrategyResultsSplitPartialComp extends React.Component<StrategyResultsSplitPartialCompProperties, StrategyResultsSplitPartialCompState> {


    private getSplitStrategyResultComponentFirstColumn() : ReactNode {

        return (
            <div key="bj-splitsrcc-0" className="strategy-results-grid__col strategy-results-split__col">
                <div key="bj-splitsrcc-0-0" className="strategy-results-grid__cell strategy-results-split__cell strategy-results-grid__cell--left-col strategy-results-grid__cell--header strategy-results-split__cell--header">&nbsp;</div>
                <div key="bj-splitsrcc-0-1" className="strategy-results-grid__cell strategy-results-split__cell strategy-results-grid__cell--left-col">2s</div>
                <div key="bj-splitsrcc-0-2" className="strategy-results-grid__cell strategy-results-split__cell strategy-results-grid__cell--left-col">3s</div>
                <div key="bj-splitsrcc-0-3" className="strategy-results-grid__cell strategy-results-split__cell strategy-results-grid__cell--left-col">4s</div>
                <div key="bj-splitsrcc-0-4" className="strategy-results-grid__cell strategy-results-split__cell strategy-results-grid__cell--left-col">6s</div>
                <div key="bj-splitsrcc-0-5" className="strategy-results-grid__cell strategy-results-split__cell strategy-results-grid__cell--left-col">7s</div>
                <div key="bj-splitsrcc-0-6" className="strategy-results-grid__cell strategy-results-split__cell strategy-results-grid__cell--left-col">8s</div>
                <div key="bj-splitsrcc-0-7" className="strategy-results-grid__cell strategy-results-split__cell strategy-results-grid__cell--left-col">9s</div>
                <div key="bj-splitsrcc-0-8" className="strategy-results-grid__cell strategy-results-split__cell strategy-results-grid__cell--left-col">Aces</div>
            </div>
        );
    }

    private getSplitStrategyResultComponentColumn(col: number): ReactNode | undefined {
        if ((this.props.lowColumnNumber && col < this.props.lowColumnNumber) 
            || (this.props.highColumnNumber && col > this.props.highColumnNumber)){
            return undefined;
        }
        const columnContent = new Array<ReactNode>(11);
        const firstRow = col >= 10 ? "A" : "" + (col + 1);
        const headerId = "bj-splitsrcc-" + col + "-0";
        columnContent.push(<div key={headerId} className="strategy-results-grid__cell strategy-results-split__cell strategy-results-grid__cell--header strategy-results-split__cell--header">{firstRow}</div>);
        for (let row = 1; row <= 8; row++) {
            const id = "bj-splitsrcc-" + col + "-" + row;
            columnContent.push(<div key={id} className="strategy-results-grid__cell strategy-results-split__cell">{this.getSplitStrategyResultComponent(col, row)}</div>);
        }

        return (
            <>
                <div key={`bj-splitsrcc-${col}`} className="strategy-results-grid__col strategy-results-split__col">
                    { columnContent }  
                </div>
            </>
        );
    }

    private getSplitStrategyResultComponent(col: number, row: number): ReactNode {
        const dealerUpcardArrayOffset = col >= 10 ? 0 : col;
        const playerTotal: keyof PerDealerUpcardStrategyResults["split"]
            = row >= 1 && row <= 3 ? ("" + (row + 1)) as keyof PerDealerUpcardStrategyResults["split"]
            : row >= 4 && row <= 7 ? ("" + (row + 2)) as keyof PerDealerUpcardStrategyResults["split"]
            : "A";

        const stats = this.props.strategyResults?.dealerUpcards ? this.props.strategyResults?.dealerUpcards[dealerUpcardArrayOffset]?.split[playerTotal]: undefined;

        return (
            <>
                <StrategyResultsStatsComp stats={stats} ></StrategyResultsStatsComp>
            </>

        );
    }

    render(): ReactNode {
        return (
            <>
                <div className="strategy-results-grid">
                    {this.getSplitStrategyResultComponentFirstColumn()}
                    {this.getSplitStrategyResultComponentColumn(1)}
                    {this.getSplitStrategyResultComponentColumn(2)}
                    {this.getSplitStrategyResultComponentColumn(3)}
                    {this.getSplitStrategyResultComponentColumn(4)}
                    {this.getSplitStrategyResultComponentColumn(5)}
                    {this.getSplitStrategyResultComponentColumn(6)}
                    {this.getSplitStrategyResultComponentColumn(7)}
                    {this.getSplitStrategyResultComponentColumn(8)}
                    {this.getSplitStrategyResultComponentColumn(9)}
                    {this.getSplitStrategyResultComponentColumn(10)}
                </div>
            </>
        );
    }
}


export default StrategyResultsSplitComp;
