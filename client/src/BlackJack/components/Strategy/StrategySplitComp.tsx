
import React, { ReactNode } from 'react';


import { Strategy, PerDealerUpcard } from '../../interface-types/strategy';


import "./StrategySplitComp.css";

import StrategyGridComp, { StrategyGridSpecialization } from '../StrategyGrid';
import StrategySplitOrSurrenderComp from './StrategySplitOrSurrenderComp';


class StrategySplitCompSpecialization extends StrategyGridSpecialization {
    private strategy: Strategy | undefined;
    private setStrategy: (updatedStrategy: Strategy) => void;

    constructor(strategy: Strategy | undefined, setStrategy: (updatedStrategy: Strategy) => void) {
        super();
        this.strategy = strategy;
        this.setStrategy = setStrategy;
    }

    public get columnClassName(): string {
        return "strategy-split__col";
    }
    public get cellClassName(): string {
        return "strategy-split__cell";
    }
    public get topCellClassName(): string {
        return "strategy-split__cell--header";
    }

    public get leftColumnContent(): Array<ReactNode> {
        const retVal: Array<ReactNode> = [];
        retVal.push(<>&nbsp;</>);
        for (let rowNum = 1; rowNum < 9; rowNum++) {
            retVal.push(<>{this.getPlayerTotalDescription(rowNum)}</>)
        }
        return retVal;
    }

    private getPlayerTotalDescription(rowNum: number): string {
        const playerTotal: string
            = rowNum <= 3 ? "" + (rowNum + 1) + "s" : 
            rowNum <= 7 ? "" + (rowNum + 2) + "s" : 
            "Aces";

        return playerTotal;
    }

    private setValue(dealerUpcardArrayOffset: number, playerTotal: keyof PerDealerUpcard["split"], 
        value: true | undefined) {
        if (this.strategy?.dealerUpcards[dealerUpcardArrayOffset] !== undefined) {
            this.strategy.dealerUpcards[dealerUpcardArrayOffset].split[playerTotal] = value;
            this.setStrategy(this.strategy);
        }
    }

    public getCellContent(col: number, row: number): ReactNode {
        const dealerUpcardArrayOffset = col >= 10 ? 0 : col;
        const playerTotal: keyof PerDealerUpcard["split"]
            = row <= 3 ? "" + (row + 1) as keyof PerDealerUpcard["split"]: 
            row <= 7 ? "" + (row + 2) as keyof PerDealerUpcard["split"] : 
            "A";

        const value = this.strategy?.dealerUpcards[dealerUpcardArrayOffset]?.split[playerTotal] === true ? true : undefined;
        const dealerCard = col >= 10 ? "A" : "" + (col + 1);
        const description = `Dealer: ${dealerCard}, Player: ${this.getPlayerTotalDescription(row)}`;
        return (
            <>
                <StrategySplitOrSurrenderComp
                    description={description}
                    compactTitle='Split' expandedTitle='Split'
                    value={value} 
                    setValue={(value: true | undefined) => {this.setValue(dealerUpcardArrayOffset, playerTotal, value)}}
                    ></StrategySplitOrSurrenderComp>

            </>
        );
    }
}


type StrategySplitCompProperties = {
    strategy?: Strategy;
    setStrategy: (updatedStrategy: Strategy) => void;
}

type StrategySplitCompState = {

};

class StrategySplitComp extends React.Component<StrategySplitCompProperties, StrategySplitCompState> {

    render() : ReactNode {
        const specialization = new StrategySplitCompSpecialization(this.props.strategy, this.props.setStrategy);
        return (
            <StrategyGridComp specialization={specialization}></StrategyGridComp>
        );

    }
}



export default StrategySplitComp;