

import React, { ReactNode } from 'react';

import "./HouseRulesComp.css";
import { HouseRules } from '../interface-types/house-rules';
import type { PayoutConfig } from '../interface-types/house-rules';


type HouseRulesProperties = {
    houseRules?: HouseRules
    setHouseRules: (houseRules: HouseRules) => void;
};

type HouseRulesState = {

};


class HouseRulesComp extends React.Component<HouseRulesProperties, HouseRulesState> {


    private onNumDecksChange(event: React.ChangeEvent<HTMLSelectElement>) {

        if (!this.props.houseRules) {
            return;
        }

        const updated = {...this.props.houseRules};
        updated.shoeConfig.numDecks = Number.parseInt(event.target.value);
        this.props.setHouseRules(updated);
    }

    private onBlackjackPayoutChange(event: React.ChangeEvent<HTMLInputElement>) {

        if (!this.props.houseRules) {
            return;
        }

        const updated = {...this.props.houseRules};
        updated.payoutConfig.blackjackPayout = event.target.value as PayoutConfig['blackjackPayout'];
        this.props.setHouseRules(updated);
    }

    private onShufflePercentChange(event: React.ChangeEvent<HTMLInputElement>) {

        if (!this.props.houseRules) {
            return;
        }

        const updated = {...this.props.houseRules};
        let updatedValue = Number.parseInt(event.target.value);
        if (this.props.houseRules && (isNaN(updatedValue) || updatedValue <= 1 || updatedValue >= 100)) {
            updatedValue = Math.round(this.props.houseRules.shoeConfig.cutoffPercent * 100);
        }

        updated.shoeConfig.cutoffPercent= updatedValue / 100;
        this.props.setHouseRules(updated);
    }

    private onRandomSeedChange(event: React.ChangeEvent<HTMLInputElement>) {

        if (!this.props.houseRules) {
            return;
        }

        const updated = {...this.props.houseRules};
        let updatedValue: number | undefined = Number.parseInt(event.target.value);
        if (isNaN(updatedValue)) {
            updatedValue = undefined;
        }
        updated.shoeConfig.randomSeed = updatedValue;
        this.props.setHouseRules(updated);
    }

    private onDealerHitsOnSoft17Change(event: React.ChangeEvent<HTMLInputElement>) {
        
        if (!this.props.houseRules) {
            return;
        }

        const updated = {...this.props.houseRules};
        updated.dealerPlayConfig.dealerHitsOnSoft17 = event.target.value === "true" ;
        this.props.setHouseRules(updated);
    }

    private onPlayerLateSurrenderAllowedChange(event: React.ChangeEvent<HTMLInputElement>) {

        if (!this.props.houseRules) {
            return;
        }

        const updated = {...this.props.houseRules};
        updated.playerPlayConfig.lateSurrenderAllowed = event.target.value === "true" ;
        this.props.setHouseRules(updated);
    }

    private onPlayerDoubleOnSoft18and19AllowedChange(event: React.ChangeEvent<HTMLInputElement>) {

        if (!this.props.houseRules) {
            return;
        }

        const updated = {...this.props.houseRules};
        updated.playerPlayConfig.doubleOnSoft18and19Allowed = event.target.value === "true" ;
        this.props.setHouseRules(updated);
    }

    private onPlayerDoubleAfterSplitAllowedChange(event: React.ChangeEvent<HTMLInputElement>) {
        
        if (!this.props.houseRules) {
            return;
        }

        const updated = {...this.props.houseRules};
        updated.playerPlayConfig.doubleAfterSplitAllowed = event.target.value === "true" ;
        this.props.setHouseRules(updated);
    }    

    private onPlayerAcesResplitBooleanChange(event: React.ChangeEvent<HTMLInputElement>) {


        if (!this.props.houseRules) {
            return;
        }

        const updated = {...this.props.houseRules};
        if (event.target.checked) {
            updated.playerPlayConfig.acesMayBeReSplit = true;
        }
        else {
            updated.playerPlayConfig.acesMayBeReSplit = 1;
        }
        this.props.setHouseRules(updated);
    }

    private onPlayerAcesResplitNumberChange(event: React.ChangeEvent<HTMLInputElement>) {


        if (!this.props.houseRules) {
            return;
        }

        const updated = {...this.props.houseRules};
        if (Number.isInteger(event.target.valueAsNumber)) {
            updated.playerPlayConfig.acesMayBeReSplit = event.target.valueAsNumber;
        }
        else {
            updated.playerPlayConfig.acesMayBeReSplit = 1;
        }
        this.props.setHouseRules(updated);
    }



    private renderPayoutConfig(): ReactNode {
        return (
            <div className="house-rules-comp__control">

                <label className="house-rules-comp__description">Blackjack Payout:&nbsp;</label>
                <span className="house-rules-comp__input-control">
                    <label>
                        <input type="radio" onChange={this.onBlackjackPayoutChange.bind(this)}
                            value="3:2" checked={this.props.houseRules?.payoutConfig.blackjackPayout === "3:2"} />
                        &nbsp;3:2&nbsp;
                    </label>

                    <label>
                        <input type="radio" onChange={this.onBlackjackPayoutChange.bind(this)}
                            value="6:5" checked={this.props.houseRules?.payoutConfig.blackjackPayout === "6:5"} />
                        &nbsp;6:5&nbsp;
                    </label>
                </span>

            </div>

        );
    }


    private renderShoeConfig() : ReactNode {
        return (
            <>
               <div className="house-rules-comp__control">
                    <label className="house-rules-comp__description">Number of Decks:&nbsp;</label>
                    <div className="house-rules-comp__input-control">
                            <select value={this.props.houseRules?.shoeConfig.numDecks}
                                onChange={this.onNumDecksChange.bind(this)}>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                            </select>
                        </div>
                </div>
                <div className="house-rules-comp__control">
                    <label className="house-rules-comp__description">Reshuffle Percent:&nbsp;</label>
                    <div className="house-rules-comp__input-control">
                        <input className="house-rules-comp__input-number" type="number" max={90} min={1} step={1}
                            value={this.props.houseRules?.shoeConfig.cutoffPercent ? 
                                Math.round(this.props.houseRules?.shoeConfig.cutoffPercent * 100) : ""}
                            onChange={this.onShufflePercentChange.bind(this)} />
                    </div>
                </div>
                <div className="house-rules-comp__control">
                    <label className="house-rules-comp__description">Random Seed:&nbsp;</label>
                    <div className="house-rules-comp__input-control">
                        <input className="house-rules-comp__input-number" type="number" 
                            value={this.props.houseRules?.shoeConfig.randomSeed ? this.props.houseRules?.shoeConfig.randomSeed : ""}
                            onChange={this.onRandomSeedChange.bind(this)} />
                    </div>
                </div>
            </>
        );
    }

    private renderTrueFalseRadio(description:string, leftFilledInWhenTrue: boolean, leftDescription:string, 
        rightDescription: string, propertyValue: boolean | undefined, 
        onChangeFn: (event: React.ChangeEvent<HTMLInputElement>) => void) {
        const rightFilledInWhenTrue = !leftFilledInWhenTrue;
        const leftValue = leftFilledInWhenTrue ? "true" : "false";
        const rightValue = rightFilledInWhenTrue ? "true" : "false";

        return (

            <div className="house-rules-comp__control">

                <label className="house-rules-comp__description">{description}:&nbsp;</label>
                <span className="house-rules-comp__input-control">
                    <label>
                        <input type="radio" onChange={onChangeFn.bind(this)}
                            value={leftValue} checked={propertyValue === leftFilledInWhenTrue} />
                        &nbsp;{leftDescription}&nbsp;
                    </label>

                    <label>
                        <input type="radio" onChange={onChangeFn.bind(this)}
                            value={rightValue} checked={propertyValue === rightFilledInWhenTrue} />
                        &nbsp;{rightDescription}&nbsp;
                    </label>
                </span>

            </div>

        );

    }


    private renderDealerAndPlayerPlayConfig(): ReactNode {
        return (
            <div>
                {this.renderTrueFalseRadio("Dealer Soft 17", false, "Dealer Sticks", "Dealer Hits", 
                    this.props.houseRules?.dealerPlayConfig.dealerHitsOnSoft17, 
                    this.onDealerHitsOnSoft17Change)}

                {this.renderTrueFalseRadio("Player Late Surrender", false, "Not Allowed", "Allowed", 
                    this.props.houseRules?.playerPlayConfig.lateSurrenderAllowed, 
                    this.onPlayerLateSurrenderAllowedChange)}


                {this.renderTrueFalseRadio("Player Double on Soft 18/19", false, "Not Allowed", "Allowed", 
                    this.props.houseRules?.playerPlayConfig.doubleOnSoft18and19Allowed, 
                    this.onPlayerDoubleOnSoft18and19AllowedChange)}

                    
                {this.renderTrueFalseRadio("Player Double after Split", false, "Not Allowed", "Allowed", 
                    this.props.houseRules?.playerPlayConfig.doubleAfterSplitAllowed, 
                    this.onPlayerDoubleAfterSplitAllowedChange)}

                <div className="house-rules-comp__control">
                    <label className="house-rules-comp__description">Player Split Aces:&nbsp;</label>
                    <div className="house-rules-comp__input-control">
                        <input type="checkbox" 
                            checked={this.props.houseRules?.playerPlayConfig.acesMayBeReSplit === true}
                            onChange={this.onPlayerAcesResplitBooleanChange.bind(this)} />
                        &nbsp;Unlimited Splits&nbsp;
                    </div>
                </div>
                {Number.isInteger(this.props.houseRules?.playerPlayConfig.acesMayBeReSplit) ?
                    (
                        <div className="house-rules-comp__control">
                            <label className="house-rules-comp__description">Max Player Ace Splits:&nbsp;</label>
                            <div className="house-rules-comp__input-control">
                                <input className="house-rules-comp__input-number" type="number" 
                                    min={1} max={8} onChange={this.onPlayerAcesResplitNumberChange.bind(this)}
                                    value={this.props.houseRules?.playerPlayConfig.acesMayBeReSplit as number} />
                            </div>
                        </div>
                    ) :
                    (<></>)
                }

            </div>
        );

    }
    render() : ReactNode {

        return (
            <div>
                {this.renderPayoutConfig()}
                {this.renderShoeConfig()}
                {this.renderDealerAndPlayerPlayConfig()}
            </div>
        );
    }
}

export default HouseRulesComp;