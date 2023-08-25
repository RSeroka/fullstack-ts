



import React, { ReactNode } from 'react';

import MediaQuery from 'react-responsive';




import "./StrategyResultsGrid.css";






export abstract class StrategyResultsGridSpecialization {
    abstract get columnClassName(): string;
    abstract get cellClassName(): string;
    abstract get topCellClassName(): string;
    abstract get leftColumnContent(): Array<ReactNode>;
    abstract getCellContent(col: number, row: number): ReactNode;
}



type StrategyResultsGridProperties = {

    specialization: StrategyResultsGridSpecialization;
}

type StrategyResultsGridState = {

};

class StrategyResultsGridComp extends React.Component<StrategyResultsGridProperties, StrategyResultsGridState> {


    render() : ReactNode {


        return (
            <>
                <MediaQuery minWidth={660}>
                    <StrategyResultsPartialGridComp  specialization={this.props.specialization}></StrategyResultsPartialGridComp>
                </MediaQuery>
                <MediaQuery maxWidth={659} minWidth={330}>
                    <StrategyResultsPartialGridComp highColumnNumber={5} specialization={this.props.specialization}></StrategyResultsPartialGridComp>
                    <br />                
                    <StrategyResultsPartialGridComp lowColumnNumber={6} specialization={this.props.specialization}></StrategyResultsPartialGridComp>                
                </MediaQuery>
                <MediaQuery minWidth={250} maxWidth={329}>
                    <StrategyResultsPartialGridComp highColumnNumber={3} specialization={this.props.specialization}></StrategyResultsPartialGridComp>
                    <br />                
                    <StrategyResultsPartialGridComp lowColumnNumber={4} highColumnNumber={7} specialization={this.props.specialization}></StrategyResultsPartialGridComp>  
                    <br />                
                    <StrategyResultsPartialGridComp lowColumnNumber={8} specialization={this.props.specialization}></StrategyResultsPartialGridComp>  
                </MediaQuery>

            </>
        )
    }
}


type StrategyResultsPartialGridProperties = {
    lowColumnNumber?: number;
    highColumnNumber?: number;

    specialization: StrategyResultsGridSpecialization;
}

type StrategyResultsPartialGridState = {

};

class StrategyResultsPartialGridComp extends React.Component<StrategyResultsPartialGridProperties, StrategyResultsPartialGridState> {


    private get columnClassName(): string {
        return `strategy-results-grid__col ${this.props.specialization.columnClassName}`;
    }

    private get cellClassName(): string {
        return `strategy-results-grid__cell ${this.props.specialization.cellClassName}`;
    }

    private get leftCellClassName(): string {
        return "strategy-results-grid__cell--left-col";
    }

    private get topCellClassName(): string {
        return `strategy-results-grid__cell--header ${this.props.specialization.topCellClassName}`;
    }

    private getFirstColumn() : ReactNode {

        const col = 0;
        const columnContent = new Array<ReactNode>(this.props.specialization.leftColumnContent.length);
        let row = 0;
        columnContent.push(<div key={`bj-sr-grid-0-${row}`} className={`${this.cellClassName} ${this.leftCellClassName} ${this.topCellClassName}`}>{this.props.specialization.leftColumnContent[row]}</div>);
        for (row = 1; row < this.props.specialization.leftColumnContent.length; row++) {
            columnContent.push(<div key={`bj-sr-grid-0-${row}`} className={`${this.cellClassName} ${this.leftCellClassName}`}>{this.props.specialization.leftColumnContent[row]}</div>);
        }

        return (
            <>
                <div key={`bj-sr-grid-${col}`} className={this.columnClassName}>
                    { columnContent }  
                </div>
            </>
        );
    }

    private getColumn(col: number): ReactNode | undefined {
        if ((this.props.lowColumnNumber && col < this.props.lowColumnNumber) 
            || (this.props.highColumnNumber && col > this.props.highColumnNumber)){
            return undefined;
        }
        const columnContent = new Array<ReactNode>(this.props.specialization.leftColumnContent.length);
        const firstRow = col >= 10 ? "A" : "" + (col + 1);
        const headerId = "bj-sr-grid-" + col + "-0";
        columnContent.push(<div key={headerId} className={`${this.cellClassName} ${this.topCellClassName}`}>{firstRow}</div>);
        for (let row = 1; row < this.props.specialization.leftColumnContent.length; row++) {
            const id = "bj-sr-grid-" + col + "-" + row;
            columnContent.push(<div key={id} className={this.cellClassName}>{this.props.specialization.getCellContent(col, row)}</div>);
        }

        return (
            <>
                <div key={`bj-sr-grid-${col}`} className={this.columnClassName}>
                    { columnContent }  
                </div>
            </>
        );
    }



    render(): ReactNode {
        return (
            <>
                <div className="strategy-results-grid">
                    {this.getFirstColumn()}
                    {this.getColumn(1)}
                    {this.getColumn(2)}
                    {this.getColumn(3)}
                    {this.getColumn(4)}
                    {this.getColumn(5)}
                    {this.getColumn(6)}
                    {this.getColumn(7)}
                    {this.getColumn(8)}
                    {this.getColumn(9)}
                    {this.getColumn(10)}
                </div>
            </>
        );
    }
}

export type {StrategyResultsPartialGridProperties};
export default StrategyResultsGridComp;
