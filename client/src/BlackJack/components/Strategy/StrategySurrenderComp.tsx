
import React, { ReactNode } from 'react';


import { Strategy, PerDealerUpcard } from '../../interface-types/strategy';


import "./StrategySurrenderComp.css";

import StrategyGridComp, { StrategyGridSpecialization } from '../StrategyGrid';
import StrategySplitOrSurrenderComp from './StrategySplitOrSurrenderComp';


class StrategySurrenderCompSpecialization extends StrategyGridSpecialization {
    private strategy: Strategy | undefined;
    private setStrategy: (updatedStrategy: Strategy) => void;

    constructor(strategy: Strategy | undefined, setStrategy: (updatedStrategy: Strategy) => void) {
        super();
        this.strategy = strategy;
        this.setStrategy = setStrategy;
    }

    public get columnClassName(): string {
        return "strategy-surrender__col";
    }
    public get cellClassName(): string {
        return "strategy-surrender__cell";
    }
    public get topCellClassName(): string {
        return "strategy-surrender__cell--header";
    }

    public get leftColumnContent(): Array<ReactNode> {
        const retVal: Array<ReactNode> = [];
        retVal.push(<>&nbsp;</>);
        for (let rowNum = 1; rowNum < 4; rowNum++) {
            retVal.push(<>{this.getPlayerTotalDescription(rowNum)}</>)
        }
        return retVal;
    }

    private getPlayerTotalDescription(rowNum: number): string {
        const playerTotal =  "" + (rowNum + 14);
        return playerTotal;
    }

    private setValue(dealerUpcardArrayOffset: number, playerTotal: keyof PerDealerUpcard["surrender"], 
        value: true | undefined) {
        if (this.strategy?.dealerUpcards[dealerUpcardArrayOffset] !== undefined) {
            this.strategy.dealerUpcards[dealerUpcardArrayOffset].surrender[playerTotal] = value;
            this.setStrategy(this.strategy);
        }
    }

    public getCellContent(col: number, row: number): ReactNode {
        const dealerUpcardArrayOffset = col >= 10 ? 0 : col;
        const playerTotal: keyof PerDealerUpcard["surrender"] =  "" + (row + 14) as keyof PerDealerUpcard["surrender"];

        const value = this.strategy?.dealerUpcards[dealerUpcardArrayOffset]?.surrender[playerTotal] === true ? true : undefined;
        const dealerCard = col >= 10 ? "A" : "" + (col + 1);
        const description = `Dealer: ${dealerCard}, Player: ${this.getPlayerTotalDescription(row)}`;
        return (
            <>
                <StrategySplitOrSurrenderComp
                    description={description}
                    compactTitle='Sndr' expandedTitle='Surrender'
                    value={value} 
                    setValue={(value: true | undefined) => {this.setValue(dealerUpcardArrayOffset, playerTotal, value)}}
                    ></StrategySplitOrSurrenderComp>

            </>
        );
    }
}


type StrategySurrenderCompProperties = {
    strategy?: Strategy;
    setStrategy: (updatedStrategy: Strategy) => void;
}

type StrategySurrenderCompState = {

};

class StrategySurrenderComp extends React.Component<StrategySurrenderCompProperties, StrategySurrenderCompState> {

    render() : ReactNode {
        const specialization = new StrategySurrenderCompSpecialization(this.props.strategy, this.props.setStrategy);
        return (
            <StrategyGridComp specialization={specialization}></StrategyGridComp>
        );

    }
}



export default StrategySurrenderComp;