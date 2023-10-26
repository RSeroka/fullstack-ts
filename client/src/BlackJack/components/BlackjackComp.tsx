

import React, { ReactNode } from 'react';

import Accordion from 'react-bootstrap/Accordion';

import { HouseRules } from '../interface-types/house-rules';
import { PlayManyHandsParams } from '../interface-types/rest-api';
import Strategy from '../interface-types/strategy';
import StrategyResults from '../interface-types/strategy-results';
import { getAllBlackjackHouseRules, getStrategyById, playManyHands } from '../service-interface/blackjack-client';
import './BlackjackComp.css';
import StrategyComp from './Strategy/StrategyComp';
import StrategyResultsComp from './StrategyResults/StrategyResultsComp';
import HouseRulesComp from './HouseRulesComp';



type BlackjackCompProperties = {

}

type BlackjackCompState = {
    houseRulesState: string;
    houseRules: undefined | HouseRules;
    strategyState: string;
    howManyHands: number | undefined;
    strategy: undefined | Strategy;
    playManyHandsState: string;
    strategyResults: undefined | StrategyResults;
}

class BlackjackComp extends React.Component<BlackjackCompProperties, BlackjackCompState> {

    private loadingDefaultHouseRules:boolean;
    private loadingDefaultStrategy:boolean;
    private static defaultHouseRules: undefined | HouseRules;
    private static defaultStrategy: undefined | Strategy;



    constructor(props: BlackjackCompProperties) {
        super(props);
        this.state = {
            houseRulesState: "not retrieved",
            strategyState: "not retrieved",
            playManyHandsState: "not retrieved",
            howManyHands: 100000,
            houseRules: structuredClone(BlackjackComp.defaultHouseRules),
            strategy: structuredClone(BlackjackComp.defaultStrategy),
            strategyResults: undefined
        }
        this.loadingDefaultHouseRules = false;
        this.loadingDefaultStrategy = false;
    }

    componentDidMount(): void {
        if (!this.loadingDefaultHouseRules) {
            if (BlackjackComp.defaultHouseRules !== undefined) {
                this.onUpdatedHouseRules(structuredClone(BlackjackComp.defaultHouseRules));
            }
            else if (this.state.houseRules === undefined) {
                this.onHouseRulesButtonClick();
            }
        }

        if (!this.loadingDefaultStrategy) {
            if (BlackjackComp.defaultStrategy !== undefined) {
                this.onUpdatedStrategy(structuredClone(BlackjackComp.defaultStrategy));
            }
            else if (this.state.strategy === undefined) {
                this.onStrategyButtonClick();
            }
        }
    }

    private onHouseRulesButtonClick() {
        if (BlackjackComp.defaultHouseRules !== undefined) {
            this.onUpdatedHouseRules(structuredClone(BlackjackComp.defaultHouseRules));
        }
        else {
            this.setState({houseRulesState: "in progress"});
            this.loadingDefaultHouseRules = true;
            getAllBlackjackHouseRules().then((value: HouseRules[])=> {
                this.loadingDefaultHouseRules = false;
                BlackjackComp.defaultHouseRules = structuredClone(value[0]);
                this.onUpdatedHouseRules(value[0]);
            }, (reasonRejected: any) => {
                this.loadingDefaultHouseRules = false;
                this.setState({houseRulesState: reasonRejected, houseRules: undefined});
            });
        }
    }

    private onStrategyButtonClick() {
        if (BlackjackComp.defaultStrategy !== undefined) {
            this.onUpdatedStrategy(structuredClone(BlackjackComp.defaultStrategy));
        }
        else {
            this.setState({strategyState: "in progress"});
            this.loadingDefaultStrategy = true;
            getStrategyById("basicDealerHitsOnSoft17").then((value: Strategy) => {
                this.loadingDefaultStrategy = false;
                BlackjackComp.defaultStrategy = structuredClone(value);
                this.onUpdatedStrategy(value);
            }, (reasonRejected: any) => {
                this.loadingDefaultStrategy = false;
                this.setState({strategyState: reasonRejected, strategy: undefined});
            });            
        }


    }

    private onPlayManyHandsButtonClick() {
        this.setState({playManyHandsState: "in progress"});

        let howManyHands = this.state.howManyHands;
        if (this.state.howManyHands === undefined || !Number.isInteger(this.state.howManyHands) 
            || this.state.howManyHands < 1 || this.state.howManyHands > 100000) {
                howManyHands = 100000; 
                this.setState({"howManyHands": howManyHands}); 
        }

        const parameters: PlayManyHandsParams = {
            numHands: howManyHands!, 
            playerStrategy: this.state.strategy!,
            houseRulesOverride: this.state.houseRules!        
        }
        
        playManyHands(parameters).then((value: StrategyResults) => {
            const strategyResultsString = JSON.stringify(value, undefined, 2);

            this.setState({playManyHandsState: strategyResultsString, strategyResults: value}); 
        }, (reasonRejected: any) => {
            let msg: string;
            if ( typeof(reasonRejected) === 'string') {
                msg = `playManyHands error: ${reasonRejected}`;
            }
            else if ( reasonRejected.message && typeof(reasonRejected === 'string')) {
                msg = `playManyHands error message: ${reasonRejected.message}`;
            }
            else {
                msg = `playManyHands unknown error: ${reasonRejected}`;
            }
            this.setState({playManyHandsState: msg, strategyResults: undefined});
        });
    }

    private onUpdatedStrategy(value: Strategy) {
        const strategyString = JSON.stringify(value, undefined, 2);
        this.setState({strategyState: strategyString, strategy: value});
    }

    private onUpdatedHouseRules(newHouseRules: HouseRules) {
        const houseRulesString = JSON.stringify(newHouseRules, undefined, 2);
        this.setState({houseRulesState: houseRulesString, houseRules: newHouseRules});
    };

    private onHowManyTimesChange(event: React.ChangeEvent<HTMLInputElement>) {
        const updatedValue = Number.parseInt(event.target.value);
        if (updatedValue >= 1 && updatedValue <= 100000) {
            this.setState({howManyHands: updatedValue});
        }
        else if (isNaN(updatedValue)) {
            this.setState({howManyHands: undefined})
        }
    }

    render(): ReactNode {
        const playManyHandsPrompt = this.state.strategyResults === undefined? "Run Strategy" : "Rerun Strategy";

        return (
            <>
            
            <Accordion defaultActiveKey={['0', '1', '2']} alwaysOpen>
                <Accordion.Item eventKey="2">
                    <Accordion.Header>Strategy Results&nbsp;
                        <span className="blackjack__accordian-button" onClick={(ev) => {ev.stopPropagation(); this.onPlayManyHandsButtonClick()}}>
                            {playManyHandsPrompt}</span>
                    </Accordion.Header>
                    <Accordion.Body>
                        <div className="blackjack__runstrategy-params">
                            <label className="blackjack__runstrategy-params__description">How Many Hands:&nbsp;</label>
                            <div className="blackjack__runstrategy-params__input-control">
                                <input className="blackjack__runstrategy-params__input-number" type="number" max={100000} min={1} step={1}
                                    value={this.state.howManyHands} 
                                    onChange={this.onHowManyTimesChange.bind(this)} /> 
                            </div>
                        </div>
                        <StrategyResultsComp strategyResults={this.state.strategyResults} ></StrategyResultsComp>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="0">
                    <Accordion.Header>House Rules Configuration&nbsp;
                        <span className="blackjack__accordian-button" onClick={(ev) => {ev.stopPropagation(); this.onHouseRulesButtonClick()}}>Reload Defaults</span>
                    </Accordion.Header>
                    <Accordion.Body>
                        <HouseRulesComp setHouseRules={this.onUpdatedHouseRules.bind(this)} 
                            houseRules={this.state.houseRules!}></HouseRulesComp>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                    <Accordion.Header>Strategy Configuration&nbsp;
                        <span className="blackjack__accordian-button" onClick={(ev) => {ev.stopPropagation(); this.onStrategyButtonClick()}}>Reload Defaults</span>
                    </Accordion.Header>
                    <Accordion.Body>
                        <StrategyComp setStrategy={this.onUpdatedStrategy.bind(this)}
                            strategy={this.state.strategy} ></StrategyComp>
                    </Accordion.Body>
                </Accordion.Item>

            </Accordion>



            {/* <p>houseRules: {this.state.houseRulesState}</p>
            <p>strategy: {this.state.strategyState}</p>
            <p>strategyResults: {this.state.playManyHandsState}</p> */}

            </>
        )
    }
}

export default BlackjackComp;