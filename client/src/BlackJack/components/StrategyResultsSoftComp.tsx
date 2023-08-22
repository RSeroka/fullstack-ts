



import React, { ReactNode } from 'react';

import MediaQuery from 'react-responsive';


import { StrategyResults, PerDealerUpcardStrategyResults } from '../interface-types/strategy-results';


import "./strategy-results-grid.css";
import "./StrategyResultsSoftComp.css";
import StrategyResultsStatsComp from './StrategyResultsStatsComp';



type StrategyResultsSoftCompProperties = {
    strategyResults?: StrategyResults;
}

type StrategyResultsSoftCompState = {

};


class StrategyResultsSoftComp extends React.Component<StrategyResultsSoftCompProperties, StrategyResultsSoftCompState> {



    render() : ReactNode {
        return (
            <>
                <MediaQuery minWidth={660}>
                    <StrategyResultsSoftPartialComp strategyResults={this.props.strategyResults}></StrategyResultsSoftPartialComp>
                </MediaQuery>
                <MediaQuery maxWidth={659} minWidth={330}>
                    <StrategyResultsSoftPartialComp strategyResults={this.props.strategyResults} highColumnNumber={5}></StrategyResultsSoftPartialComp>
                    <br />                
                    <StrategyResultsSoftPartialComp strategyResults={this.props.strategyResults} lowColumnNumber={6}></StrategyResultsSoftPartialComp>                
                </MediaQuery>
                <MediaQuery minWidth={250} maxWidth={329}>
                    <StrategyResultsSoftPartialComp strategyResults={this.props.strategyResults} highColumnNumber={3}></StrategyResultsSoftPartialComp>
                    <br />                
                    <StrategyResultsSoftPartialComp strategyResults={this.props.strategyResults} lowColumnNumber={4} highColumnNumber={7}></StrategyResultsSoftPartialComp>  
                    <br />                
                    <StrategyResultsSoftPartialComp strategyResults={this.props.strategyResults} lowColumnNumber={8} ></StrategyResultsSoftPartialComp>  
                </MediaQuery>

            </>
        )
    }
}



type StrategyResultsSoftPartialCompProperties = {
    strategyResults?: StrategyResults;
    lowColumnNumber?: number;
    highColumnNumber?: number;
}

type StrategyResultsSoftPartialCompState = {

};





class StrategyResultsSoftPartialComp extends React.Component<StrategyResultsSoftPartialCompProperties, StrategyResultsSoftPartialCompState> {


    private getSoftStrategyResultComponentFirstColumn() : ReactNode {

        return (
            <div key="bj-ssrcc-0" className="strategy-results-grid__col strategy-results-soft__col">
                <div key="bj-ssrcc-0-0" className="strategy-results-grid__cell strategy-results-soft__cell strategy-results-grid__cell--left-col strategy-results-grid__cell--header strategy-results-soft__cell--header">&nbsp;</div>
                <div key="bj-ssrcc-0-1" className="strategy-results-grid__cell strategy-results-soft__cell strategy-results-grid__cell--left-col">13<br/>Dbl</div>
                <div key="bj-ssrcc-0-2" className="strategy-results-grid__cell strategy-results-soft__cell strategy-results-grid__cell--left-col">14<br/>Dbl</div>
                <div key="bj-ssrcc-0-3" className="strategy-results-grid__cell strategy-results-soft__cell strategy-results-grid__cell--left-col">15<br/>Dbl</div>
                <div key="bj-ssrcc-0-4" className="strategy-results-grid__cell strategy-results-soft__cell strategy-results-grid__cell--left-col">16<br/>Dbl</div>
                <div key="bj-ssrcc-0-5" className="strategy-results-grid__cell strategy-results-soft__cell strategy-results-grid__cell--left-col">17<br/>Dbl</div>
                <div key="bj-ssrcc-0-6" className="strategy-results-grid__cell strategy-results-soft__cell strategy-results-grid__cell--left-col">18<br/>Dbl</div>
                <div key="bj-ssrcc-0-7" className="strategy-results-grid__cell strategy-results-soft__cell strategy-results-grid__cell--left-col">19<br/>Dbl</div>
                <div key="bj-ssrcc-0-8" className="strategy-results-grid__cell strategy-results-soft__cell strategy-results-grid__cell--left-col">20<br/>Dbl</div>
            </div>
        );
    }

    private getSoftStrategyResultComponentColumn(col: number): ReactNode | undefined {
        if ((this.props.lowColumnNumber && col < this.props.lowColumnNumber) 
            || (this.props.highColumnNumber && col > this.props.highColumnNumber)){
            return undefined;
        }
        const columnContent = new Array<ReactNode>(11);
        const firstRow = col >= 10 ? "A" : "" + (col + 1);
        const headerId = "bj-ssrcc-" + col + "-0";
        columnContent.push(<div key={headerId} className="strategy-results-grid__cell strategy-results-soft__cell strategy-results-grid__cell--header strategy-results-soft__cell--header">{firstRow}</div>);
        for (let row = 1; row <= 8; row++) {
            const id = "bj-ssrcc-" + col + "-" + row;
            columnContent.push(<div key={id} className="strategy-results-grid__cell strategy-results-soft__cell">{this.getSoftStrategyResultComponent(col, row)}</div>);
        }

        return (
            <>
                <div key={`bj-ssrcc-${col}`} className="strategy-results-grid__col strategy-results-soft__col">
                    { columnContent }  
                </div>
            </>
        );
    }

    private getSoftStrategyResultComponent(col: number, row: number): ReactNode {
        const dealerUpcardArrayOffset = col >= 10 ? 0 : col;
        const playerTotal: keyof PerDealerUpcardStrategyResults["soft"]
            = ("" + (row + 12)) as keyof PerDealerUpcardStrategyResults["soft"];

        const stats = this.props.strategyResults?.dealerUpcards ? this.props.strategyResults?.dealerUpcards[dealerUpcardArrayOffset]?.soft[playerTotal].single : undefined;
        const doubleStats = this.props.strategyResults?.dealerUpcards ? this.props.strategyResults?.dealerUpcards[dealerUpcardArrayOffset]?.soft[playerTotal].double : undefined;

        return (
            <>
                <StrategyResultsStatsComp stats={stats} ></StrategyResultsStatsComp>
                <StrategyResultsStatsComp stats={doubleStats} ></StrategyResultsStatsComp>
            </>

        );
    }

    render(): ReactNode {
        return (
            <>
                <div className="strategy-results-grid">
                    {this.getSoftStrategyResultComponentFirstColumn()}
                    {this.getSoftStrategyResultComponentColumn(1)}
                    {this.getSoftStrategyResultComponentColumn(2)}
                    {this.getSoftStrategyResultComponentColumn(3)}
                    {this.getSoftStrategyResultComponentColumn(4)}
                    {this.getSoftStrategyResultComponentColumn(5)}
                    {this.getSoftStrategyResultComponentColumn(6)}
                    {this.getSoftStrategyResultComponentColumn(7)}
                    {this.getSoftStrategyResultComponentColumn(8)}
                    {this.getSoftStrategyResultComponentColumn(9)}
                    {this.getSoftStrategyResultComponentColumn(10)}
                </div>
            </>
        );
    }
}


export default StrategyResultsSoftComp;
