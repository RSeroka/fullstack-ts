
import React, { ReactNode } from 'react';


import { Strategy, PerDealerUpcard } from '../../interface-types/strategy';


import "./StrategyHardComp.css";

import StrategyGridComp, { StrategyGridSpecialization } from '../StrategyGrid';
import StrategyHitStandOrDoubleComp from './StrategyHitStandOrDoubleComp';
import { PlayerStrategyHitStandOrDouble } from '../../interface-types/decision';

class StrategyHardCompSpecialization extends StrategyGridSpecialization {
    private strategy: Strategy | undefined;
    private setStrategy: (updatedStrategy: Strategy) => void;

    constructor(strategy: Strategy | undefined, setStrategy: (updatedStrategy: Strategy) => void) {
        super();
        this.strategy = strategy;
        this.setStrategy = setStrategy;
    }

    public get columnClassName(): string {
        return "strategy-hard__col";
    }
    public get cellClassName(): string {
        return "strategy-hard__cell";
    }
    public get topCellClassName(): string {
        return "strategy-hard__cell--header";
    }

    public get leftColumnContent(): Array<ReactNode> {
        const retVal: Array<ReactNode> = [];
        retVal.push(<>&nbsp;</>);
        for (let rowNum = 1; rowNum < 11; rowNum++) {
            retVal.push(<>{this.getPlayerTotalDescription(rowNum)}</>)
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

    private setHsod(dealerUpcardArrayOffset: number, playerTotal: keyof PerDealerUpcard["hard"], 
        hsod: PlayerStrategyHitStandOrDouble) {
        if (this.strategy?.dealerUpcards[dealerUpcardArrayOffset]?.hard[playerTotal] !== undefined) {
            this.strategy!.dealerUpcards[dealerUpcardArrayOffset]!.hard[playerTotal] = hsod;
            this.setStrategy(this.strategy);
        }
    }

    public getCellContent(col: number, row: number): ReactNode {
        const dealerUpcardArrayOffset = col >= 10 ? 0 : col;
        const playerTotal: keyof PerDealerUpcard["hard"]
            = row <= 1 ? "8AndUnder" : 
            row >= 10 ? "17AndOver" : 
            ("" + (row + 7)) as keyof PerDealerUpcard["hard"];

        const psHSoD = this.strategy?.dealerUpcards ? this.strategy?.dealerUpcards[dealerUpcardArrayOffset]?.hard[playerTotal]: undefined;
        const dealerCard = col >= 10 ? "A" : "" + (col + 1);
        const description = `Dealer: ${dealerCard}, Player: ${this.getPlayerTotalDescription(row)}`;
        return (
            <>
                {/* 
                use overlay with radio buttons with listener for focusOut to no longer show 
                radio buttons
                                */}
                <StrategyHitStandOrDoubleComp
                    description={description}
                    hsod={psHSoD} 
                    setHsod={(hsod: PlayerStrategyHitStandOrDouble) => {this.setHsod(dealerUpcardArrayOffset, playerTotal, hsod)}}
                    ></StrategyHitStandOrDoubleComp>

            </>
        );
    }
}


type StrategyHardCompProperties = {
    strategy?: Strategy;
    setStrategy: (updatedStrategy: Strategy) => void;
}

type StrategyHardCompState = {

};

class StrategyHardComp extends React.Component<StrategyHardCompProperties, StrategyHardCompState> {

    render() : ReactNode {
        const specialization = new StrategyHardCompSpecialization(this.props.strategy, this.props.setStrategy);
        return (
            <StrategyGridComp specialization={specialization}></StrategyGridComp>
        );

    }
}



export default StrategyHardComp;