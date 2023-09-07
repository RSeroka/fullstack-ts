

import React, { ReactNode } from 'react';

import "./HouseRulesComp.css";
import { HouseRules } from '../interface-types/house-rules';
import type { PayoutConfig } from '../interface-types/house-rules';


type HouseRulesProperties = {
    houseRules?: HouseRules
    setHouseRules: (houseRules: HouseRules) => void;
};

type HouseRulesState = {
    updatedHouseRules: HouseRules
};


class HouseRulesComp extends React.Component<HouseRulesProperties, HouseRulesState> {
    // use this pattern 
    // https://itnext.io/react-context-and-hooks-an-excellent-way-to-pass-data-26c3f48b9bf5 
    // https://itnext.io/react-context-and-hooks-pass-data-and-update-it-easily-d2f659cceab  


    constructor(props: HouseRulesProperties) {
        super(props);
        if (this.props.houseRules) {
            this.state = { updatedHouseRules : {...this.props.houseRules} }
        } 
 
    }

    componentDidUpdate(prevProps: Readonly<HouseRulesProperties>, prevState: Readonly<HouseRulesState>, snapshot?: any): void {
        if (this.props.houseRules && (!this.state?.updatedHouseRules || 
            JSON.stringify(this.props) !== JSON.stringify(prevProps))) {
            this.setState({ updatedHouseRules : {...this.props.houseRules} });
        } 
    }


    private onSubmit() {
        this.props.setHouseRules(this.state.updatedHouseRules);
    }

    private onNumDecksChange(event: React.ChangeEvent<HTMLSelectElement>) {
        const updatedState = {...this.state!};
        updatedState.updatedHouseRules.shoeConfig.numDecks = Number.parseInt(event.target.value);
        this.setState(updatedState);
        
    }

    private onBlackjackPayoutChange(event: React.ChangeEvent<HTMLInputElement>) {
        if (!this.state?.updatedHouseRules) {
            return;
        }
        const updatedState = {...this.state!};
        updatedState.updatedHouseRules.payoutConfig.blackjackPayout = event.target.value as PayoutConfig['blackjackPayout'];
        this.setState(updatedState);
        
    }

    private onShufflePercentChange(event: React.ChangeEvent<HTMLInputElement>) {
        if (!this.state?.updatedHouseRules) {
            return;
        }
        const updatedState = {...this.state!};
        let updatedValue = Number.parseInt(event.target.value);
        if (this.props.houseRules && (isNaN(updatedValue) || updatedValue <= 1 || updatedValue >= 100)) {
            updatedValue = Math.round(this.props.houseRules.shoeConfig.cutoffPercent * 100);
        }

        updatedState.updatedHouseRules.shoeConfig.cutoffPercent= updatedValue / 100;
        this.setState(updatedState);
    }

    private onRandomSeedChange(event: React.ChangeEvent<HTMLInputElement>) {
        if (!this.state?.updatedHouseRules) {
            return;
        }
        const updatedState = {...this.state!};
        let updatedValue: number | undefined = Number.parseInt(event.target.value);
        if (isNaN(updatedValue)) {
            updatedValue = undefined;
        }
        updatedState.updatedHouseRules.shoeConfig.randomSeed = updatedValue;
        this.setState(updatedState);
    }

    private onDealerHitsOnSoft17Change(event: React.ChangeEvent<HTMLInputElement>) {
        if (!this.state?.updatedHouseRules) {
            return;
        }
        const updatedState = {...this.state!};
        updatedState.updatedHouseRules.dealerPlayConfig.dealerHitsOnSoft17 = event.target.value === "true" ;
        this.setState(updatedState);
        
    }

    private onPlayerLateSurrenderAllowedChange(event: React.ChangeEvent<HTMLInputElement>) {
        if (!this.state?.updatedHouseRules) {
            return;
        }
        const updatedState = {...this.state!};
        updatedState.updatedHouseRules.playerPlayConfig.lateSurrenderAllowed = event.target.value === "true" ;
        this.setState(updatedState);
    }

    private onPlayerDoubleOnSoft18and19AllowedChange(event: React.ChangeEvent<HTMLInputElement>) {
        if (!this.state?.updatedHouseRules) {
            return;
        }
        const updatedState = {...this.state!};
        updatedState.updatedHouseRules.playerPlayConfig.doubleOnSoft18and19Allowed = event.target.value === "true" ;
        this.setState(updatedState);
    }

    private onPlayerDoubleAfterSplitAllowedChange(event: React.ChangeEvent<HTMLInputElement>) {
        if (!this.state?.updatedHouseRules) {
            return;
        }
        const updatedState = {...this.state!};
        updatedState.updatedHouseRules.playerPlayConfig.doubleAfterSplitAllowed = event.target.value === "true" ;
        this.setState(updatedState);
    }    

    private onPlayerAcesResplitBooleanChange(event: React.ChangeEvent<HTMLInputElement>) {
        if (!this.state?.updatedHouseRules) {
            return;
        }
        const updatedState = {...this.state!};
        if (event.target.checked) {
            updatedState.updatedHouseRules.playerPlayConfig.acesMayBeReSplit = true;
        }
        else {
            updatedState.updatedHouseRules.playerPlayConfig.acesMayBeReSplit = 1;
        }
        this.setState(updatedState);
    }

    private onPlayerAcesResplitNumberChange(event: React.ChangeEvent<HTMLInputElement>) {
        if (!this.state?.updatedHouseRules) {
            return;
        }
        const updatedState = {...this.state!};

        if (Number.isInteger(event.target.valueAsNumber)) {
            updatedState.updatedHouseRules.playerPlayConfig.acesMayBeReSplit = event.target.valueAsNumber;
        }
        else {
            updatedState.updatedHouseRules.playerPlayConfig.acesMayBeReSplit = 1;
        }
        this.setState(updatedState);
    }



    private renderPayoutConfig(): ReactNode {
        return (
            <div>
                <label>Blackjack Payout:&nbsp;
                    {/* <select value={this.state?.updatedHouseRules ? this.state.updatedHouseRules.payoutConfig.blackjackPayout : undefined}
                    onChange={this.onBlackjackPayoutChange.bind(this)}>
                    <option value="3:2">3 to 2</option>
                    <option value="6:5">6 to 5</option>
                </select> */}
                    <label>
                        <input type="radio" onChange={this.onBlackjackPayoutChange.bind(this)}
                            value="3:2" checked={this.state?.updatedHouseRules?.payoutConfig.blackjackPayout === "3:2"} />
                        &nbsp;3:2&nbsp;
                    </label>

                    <label>
                        <input type="radio" onChange={this.onBlackjackPayoutChange.bind(this)}
                            value="6:5" checked={this.state?.updatedHouseRules?.payoutConfig.blackjackPayout === "6:5"} />
                        &nbsp;6:5&nbsp;
                    </label>
                </label>

            </div>

        );
    }


    private renderShoeConfig() : ReactNode {
        return (
            <>
                <label style={{display: 'block'}}>
                    Number of Decks: &nbsp;
                    <select value={this.state?.updatedHouseRules?.shoeConfig.numDecks}
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
                </label>
                <label style={{display: 'block'}}>
                    Reshuffle Percent: &nbsp;
                    <input type="number" max={90} min={1} step={1}
                        value={this.state?.updatedHouseRules?.shoeConfig.cutoffPercent ? 
                            Math.round(this.state?.updatedHouseRules?.shoeConfig.cutoffPercent * 100) : ""}
                        onChange={this.onShufflePercentChange.bind(this)} />
                </label>
                <label style={{display: 'block'}}>
                    randomSeed: &nbsp;
                    <input type="number"  
                        value={this.state?.updatedHouseRules?.shoeConfig.randomSeed ? this.state?.updatedHouseRules?.shoeConfig.randomSeed : ""}
                        onChange={this.onRandomSeedChange.bind(this)} />
                </label>
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
            <div>
                {description}:&nbsp;
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
            </div>

        );

    }


    private renderDealerAndPlayerPlayConfig(): ReactNode {
        return (
            <div>
                {this.renderTrueFalseRadio("Dealer Soft 17", false, "Dealer Sticks", "Dealer Hits", 
                    this.state?.updatedHouseRules?.dealerPlayConfig.dealerHitsOnSoft17, 
                    this.onDealerHitsOnSoft17Change)}

                {this.renderTrueFalseRadio("Player Late Surrender", false, "Not Allowed", "Allowed", 
                    this.state?.updatedHouseRules?.playerPlayConfig.lateSurrenderAllowed, 
                    this.onPlayerLateSurrenderAllowedChange)}


                {this.renderTrueFalseRadio("Player Double on Soft 18/19", false, "Not Allowed", "Allowed", 
                    this.state?.updatedHouseRules?.playerPlayConfig.doubleOnSoft18and19Allowed, 
                    this.onPlayerDoubleOnSoft18and19AllowedChange)}

                    
                {this.renderTrueFalseRadio("Player Double after Split", false, "Not Allowed", "Allowed", 
                    this.state?.updatedHouseRules?.playerPlayConfig.doubleAfterSplitAllowed, 
                    this.onPlayerDoubleAfterSplitAllowedChange)}

                <div>
                    Player Split Aces:&nbsp;
                    <label>
                        <input type="checkbox" onChange={this.onPlayerAcesResplitBooleanChange.bind(this)}
                            checked={this.state?.updatedHouseRules?.playerPlayConfig.acesMayBeReSplit === true} />
                        &nbsp;Unlimited Splits&nbsp;
                    </label>
                    {Number.isInteger(this.state?.updatedHouseRules?.playerPlayConfig.acesMayBeReSplit) ?
                        (
                            <label>
                            &nbsp;Limited Number of Splits&nbsp;
                            <input type="number" min={1} max={8} onChange={this.onPlayerAcesResplitNumberChange.bind(this)}
                                value={this.state?.updatedHouseRules?.playerPlayConfig.acesMayBeReSplit as number} />
                            </label>
                        ) :
                        (<></>)
                    }

                </div>

            </div>
        );

    }
    render() : ReactNode {

        return (
            <div>
                <button onClick={this.onSubmit.bind(this)}>Submit</button>
                {this.renderPayoutConfig()}
                {this.renderShoeConfig()}
                {this.renderDealerAndPlayerPlayConfig()}
            </div>
        );
    }
}

export default HouseRulesComp;