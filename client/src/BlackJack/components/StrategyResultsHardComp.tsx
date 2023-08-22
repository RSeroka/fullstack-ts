



import React, { ReactNode } from 'react';

import MediaQuery from 'react-responsive';


import { StrategyResults, PerDealerUpcardStrategyResults } from '../interface-types/strategy-results';


import "./strategy-results-grid.css";
import "./StrategyResultsHardComp.css";
import StrategyResultsStatsComp from './StrategyResultsStatsComp';



type StrategyResultsHardCompProperties = {
    strategyResults?: StrategyResults;
}

type StrategyResultsHardCompState = {

};


class StrategyResultsHardComp extends React.Component<StrategyResultsHardCompProperties, StrategyResultsHardCompState> {



    render() : ReactNode {
        return (
            <>
                <MediaQuery minWidth={660}>
                    <StrategyResultsHardPartialComp strategyResults={this.props.strategyResults}></StrategyResultsHardPartialComp>
                </MediaQuery>
                <MediaQuery maxWidth={659} minWidth={330}>
                    <StrategyResultsHardPartialComp strategyResults={this.props.strategyResults} highColumnNumber={5}></StrategyResultsHardPartialComp>
                    <br />                
                    <StrategyResultsHardPartialComp strategyResults={this.props.strategyResults} lowColumnNumber={6}></StrategyResultsHardPartialComp>                
                </MediaQuery>
                <MediaQuery minWidth={250} maxWidth={329}>
                    <StrategyResultsHardPartialComp strategyResults={this.props.strategyResults} highColumnNumber={3}></StrategyResultsHardPartialComp>
                    <br />                
                    <StrategyResultsHardPartialComp strategyResults={this.props.strategyResults} lowColumnNumber={4} highColumnNumber={7}></StrategyResultsHardPartialComp>  
                    <br />                
                    <StrategyResultsHardPartialComp strategyResults={this.props.strategyResults} lowColumnNumber={8} ></StrategyResultsHardPartialComp>  
                </MediaQuery>

            </>
        )
    }
}



type StrategyResultsHardPartialCompProperties = {
    strategyResults?: StrategyResults;
    lowColumnNumber?: number;
    highColumnNumber?: number;
}

type StrategyResultsHardPartialCompState = {

};





class StrategyResultsHardPartialComp extends React.Component<StrategyResultsHardPartialCompProperties, StrategyResultsHardPartialCompState> {


    private getHardStrategyResultComponentFirstColumn() : ReactNode {

        return (
            <div key="bj-hsrcc-0" className="strategy-results-grid__col strategy-results-hard__col">
                <div key="bj-hsrcc-0-0" className="strategy-results-grid__cell strategy-results-hard__cell strategy-results-grid__cell--left-col strategy-results-grid__cell--header strategy-results-hard__cell--header">&nbsp;</div>
                <div key="bj-hsrcc-0-1" className="strategy-results-grid__cell strategy-results-hard__cell strategy-results-grid__cell--left-col">&lt;= 8<br/>Dbl</div>
                <div key="bj-hsrcc-0-2" className="strategy-results-grid__cell strategy-results-hard__cell strategy-results-grid__cell--left-col">9<br/>Dbl</div>
                <div key="bj-hsrcc-0-3" className="strategy-results-grid__cell strategy-results-hard__cell strategy-results-grid__cell--left-col">10<br/>Dbl</div>
                <div key="bj-hsrcc-0-4" className="strategy-results-grid__cell strategy-results-hard__cell strategy-results-grid__cell--left-col">11<br/>Dbl</div>
                <div key="bj-hsrcc-0-5" className="strategy-results-grid__cell strategy-results-hard__cell strategy-results-grid__cell--left-col">12<br/>Dbl</div>
                <div key="bj-hsrcc-0-6" className="strategy-results-grid__cell strategy-results-hard__cell strategy-results-grid__cell--left-col">13<br/>Dbl</div>
                <div key="bj-hsrcc-0-7" className="strategy-results-grid__cell strategy-results-hard__cell strategy-results-grid__cell--left-col">14<br/>Dbl</div>
                <div key="bj-hsrcc-0-8" className="strategy-results-grid__cell strategy-results-hard__cell strategy-results-grid__cell--left-col">15<br/>Dbl</div>
                <div key="bj-hsrcc-0-9" className="strategy-results-grid__cell strategy-results-hard__cell strategy-results-grid__cell--left-col">16<br/>Dbl</div>
                <div key="bj-hsrcc-0-10" className="strategy-results-grid__cell strategy-results-hard__cell strategy-results-grid__cell--left-col">&gt;=17<br/>Dbl</div>
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
        columnContent.push(<div key={headerId} className="strategy-results-grid__cell strategy-results-hard__cell strategy-results-grid__cell--header strategy-results-hard__cell--header">{firstRow}</div>);
        for (let row = 1; row <= 10; row++) {
            const id = "bj-hsrcc-" + col + "-" + row;
            columnContent.push(<div key={id} className="strategy-results-grid__cell strategy-results-hard__cell">{this.getHardStrategyResultComponent(col, row)}</div>);
        }

        return (
            <>
                <div key={`bj-hsrcc-${col}`} className="strategy-results-grid__col strategy-results-hard__col">
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
                <div className="strategy-results-grid">
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


export default StrategyResultsHardComp;
