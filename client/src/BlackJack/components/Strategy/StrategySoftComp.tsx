
import React, { ReactNode } from 'react';


import { Strategy, PerDealerUpcard } from '../../interface-types/strategy';


import "./StrategySoftComp.css";

import StrategyGridComp, { StrategyGridSpecialization } from '../StrategyGrid';
import StrategyHitStandOrDoubleComp from './StrategyHitStandOrDoubleComp';
import { PlayerStrategyHitStandOrDouble } from '../../interface-types/decision';

class StrategySoftCompSpecialization extends StrategyGridSpecialization {
    private strategy: Strategy | undefined;
    private setStrategy: (updatedStrategy: Strategy) => void;

    constructor(strategy: Strategy | undefined, setStrategy: (updatedStrategy: Strategy) => void) {
        super();
        this.strategy = strategy;
        this.setStrategy = setStrategy;
    }

    public get columnClassName(): string {
        return "strategy-soft__col";
    }
    public get cellClassName(): string {
        return "strategy-soft__cell";
    }
    public get topCellClassName(): string {
        return "strategy-soft__cell--header";
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
        const playerTotal: string = "" + (rowNum + 12);

        return playerTotal;
    }

    private setHsod(dealerUpcardArrayOffset: number, playerTotal: keyof PerDealerUpcard["soft"], 
        hsod: PlayerStrategyHitStandOrDouble) {
        if (this.strategy?.dealerUpcards[dealerUpcardArrayOffset]?.soft[playerTotal] !== undefined) {
            this.strategy.dealerUpcards[dealerUpcardArrayOffset].soft[playerTotal] = hsod;
            this.setStrategy(this.strategy);
        }
    }

    public getCellContent(col: number, row: number): ReactNode {
        const dealerUpcardArrayOffset = col >= 10 ? 0 : col;
        const playerTotal // : keyof PerDealerUpcard["soft"]
            = ("" + (row + 12)) as keyof PerDealerUpcard["soft"];

        const psHSoD = this.strategy?.dealerUpcards ? this.strategy?.dealerUpcards[dealerUpcardArrayOffset]?.soft[playerTotal]: undefined;
        const dealerCard = col >= 10 ? "A" : "" + (col + 1);
        const playerNonAce = row + 1;
        const description = `Dealer: ${dealerCard}, Player: Ace + ${playerNonAce}`;
        return (
            <>
                <StrategyHitStandOrDoubleComp
                    description={description}
                    hsod={psHSoD} 
                    setHsod={(hsod: PlayerStrategyHitStandOrDouble) => {this.setHsod(dealerUpcardArrayOffset, playerTotal, hsod)}}
                    ></StrategyHitStandOrDoubleComp>

            </>
        );
    }
}


type StrategySoftCompProperties = {
    strategy?: Strategy;
    setStrategy: (updatedStrategy: Strategy) => void;
}

type StrategySoftCompState = {

};

class StrategySoftComp extends React.Component<StrategySoftCompProperties, StrategySoftCompState> {

    render() : ReactNode {
        const specialization = new StrategySoftCompSpecialization(this.props.strategy, this.props.setStrategy);
        return (
            <StrategyGridComp specialization={specialization}></StrategyGridComp>
        );

    }
}



export default StrategySoftComp;