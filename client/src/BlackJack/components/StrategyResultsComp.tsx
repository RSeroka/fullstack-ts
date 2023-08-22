



import React, { ReactNode } from 'react';

import MediaQuery from 'react-responsive';


import { StrategyResults, PerDealerUpcardStrategyResults } from '../interface-types/strategy-results';


import "./StrategyResultsComp.css";
import StrategyResultsStatsComp from './StrategyResultsStatsComp';



type StrategyResultsCompProperties = {
    strategyResults?: StrategyResults;
}

type StrategyResultsCompState = {

};


class StrategyResultsComp extends React.Component<StrategyResultsCompProperties, StrategyResultsCompState> {



    render() : ReactNode {
        return (
            <>
                <MediaQuery minWidth={660}>
                    <StrategyResultsPartialComp strategyResults={this.props.strategyResults}></StrategyResultsPartialComp>
                </MediaQuery>
                <MediaQuery maxWidth={659} minWidth={330}>
                    <StrategyResultsPartialComp strategyResults={this.props.strategyResults} highColumnNumber={5}></StrategyResultsPartialComp>
                    <br />                
                    <StrategyResultsPartialComp strategyResults={this.props.strategyResults} lowColumnNumber={6}></StrategyResultsPartialComp>                
                </MediaQuery>
                <MediaQuery minWidth={250} maxWidth={329}>
                    <StrategyResultsPartialComp strategyResults={this.props.strategyResults} highColumnNumber={3}></StrategyResultsPartialComp>
                    <br />                
                    <StrategyResultsPartialComp strategyResults={this.props.strategyResults} lowColumnNumber={4} highColumnNumber={7}></StrategyResultsPartialComp>  
                    <br />                
                    <StrategyResultsPartialComp strategyResults={this.props.strategyResults} lowColumnNumber={8} ></StrategyResultsPartialComp>  
                </MediaQuery>

            </>
        )
    }
}



type StrategyResultsPartialCompProperties = {
    strategyResults?: StrategyResults;
    lowColumnNumber?: number;
    highColumnNumber?: number;
}

type StrategyResultsPartialCompState = {

};





class StrategyResultsPartialComp extends React.Component<StrategyResultsPartialCompProperties, StrategyResultsPartialCompState> {


    private getHardStrategyResultComponentFirstColumn() : ReactNode {

        return (
            <div key="bj-hsrcc-0" className="strategy-results__hard-col">
                <div key="bj-hsrcc-0-0" className="strategy-results__hard-cell strategy-results__hard-cell--left-col strategy-results__hard-cell--header">&nbsp;</div>
                <div key="bj-hsrcc-0-1" className="strategy-results__hard-cell strategy-results__hard-cell--left-col">&lt;= 8<br/>Dbl</div>
                <div key="bj-hsrcc-0-2" className="strategy-results__hard-cell strategy-results__hard-cell--left-col">9<br/>Dbl</div>
                <div key="bj-hsrcc-0-3" className="strategy-results__hard-cell strategy-results__hard-cell--left-col">10<br/>Dbl</div>
                <div key="bj-hsrcc-0-4" className="strategy-results__hard-cell strategy-results__hard-cell--left-col">11<br/>Dbl</div>
                <div key="bj-hsrcc-0-5" className="strategy-results__hard-cell strategy-results__hard-cell--left-col">12<br/>Dbl</div>
                <div key="bj-hsrcc-0-6" className="strategy-results__hard-cell strategy-results__hard-cell--left-col">13<br/>Dbl</div>
                <div key="bj-hsrcc-0-7" className="strategy-results__hard-cell strategy-results__hard-cell--left-col">14<br/>Dbl</div>
                <div key="bj-hsrcc-0-8" className="strategy-results__hard-cell strategy-results__hard-cell--left-col">15<br/>Dbl</div>
                <div key="bj-hsrcc-0-9" className="strategy-results__hard-cell strategy-results__hard-cell--left-col">16<br/>Dbl</div>
                <div key="bj-hsrcc-0-10" className="strategy-results__hard-cell strategy-results__hard-cell--left-col">&gt;=17<br/>Dbl</div>
            </div>
        );
    }

    private getHardStrategyResultComponentColumn(col: number): ReactNode | undefined {
        if ((this.props.lowColumnNumber && col < this.props.lowColumnNumber) 
            || (this.props.highColumnNumber && col > this.props.highColumnNumber)){
            return undefined;
        }
        const columnContent = new Array<ReactNode>(11);
        const firstRow = col >= 10 ? "A" : "" + (col + 1);
        const headerId = "bj-hsrcc-" + col + "-0";
        columnContent.push(<div key={headerId} className="strategy-results__hard-cell strategy-results__hard-cell--header">{firstRow}</div>);
        for (let row = 1; row <= 10; row++) {
            const id = "bj-hsrcc-" + col + "-" + row;
            columnContent.push(<div key={id} className="strategy-results__hard-cell">{this.getHardStrategyResultComponent(col, row)}</div>);
        }

        return (
            <>
                <div key={`bj-hsrcc-${col}`} className="strategy-results__hard-col">
                    { columnContent }  
                </div>
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
        const doubleStats = this.props.strategyResults?.dealerUpcards ? this.props.strategyResults?.dealerUpcards[dealerUpcardArrayOffset]?.hard[playerTotal].double : undefined;

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
                <div className="strategy-results__hard-partial">
                    {this.getHardStrategyResultComponentFirstColumn()}
                    {this.getHardStrategyResultComponentColumn(1)}
                    {this.getHardStrategyResultComponentColumn(2)}
                    {this.getHardStrategyResultComponentColumn(3)}
                    {this.getHardStrategyResultComponentColumn(4)}
                    {this.getHardStrategyResultComponentColumn(5)}
                    {this.getHardStrategyResultComponentColumn(6)}
                    {this.getHardStrategyResultComponentColumn(7)}
                    {this.getHardStrategyResultComponentColumn(8)}
                    {this.getHardStrategyResultComponentColumn(9)}
                    {this.getHardStrategyResultComponentColumn(10)}
                </div>
            </>
        );
    }
}


export default StrategyResultsComp;
