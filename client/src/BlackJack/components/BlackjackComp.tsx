

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
    strategy: undefined | Strategy;
    playManyHandsState: string;
    strategyResults: undefined | StrategyResults;
}

class BlackjackComp extends React.Component<BlackjackCompProperties, BlackjackCompState> {


    constructor(props: BlackjackCompProperties) {
        super(props);
        this.state = {
            houseRulesState: "not retrieved",
            strategyState: "not retrieved",
            playManyHandsState: "not retrieved",
            houseRules: undefined,
            strategy: undefined,
            strategyResults: undefined
        }

    }

    private onHouseRulesButtonClick() {
        this.setState({houseRulesState: "in progress"});
        getAllBlackjackHouseRules().then((value: HouseRules[])=> {
            this.onUpdatedHouseRules(value[0]);

        }, (reasonRejected: any) => {
            this.setState({houseRulesState: reasonRejected});
        })
    }

    private onStrategyButtonClick() {
        // this.context.setStrategy = this.onUpdatedStrategy.bind(this);

        this.setState({strategyState: "in progress"});
        
        getStrategyById("basicDealerHitsOnSoft17").then((value: Strategy) => {
            this.onUpdatedStrategy(value);

        }, (reasonRejected: any) => {
            this.setState({strategyState: reasonRejected});
        });
    }

    private onPlayManyHandsButtonClick() {
        this.setState({playManyHandsState: "in progress"});

        const parameters: PlayManyHandsParams = {
            numHands: 100000, 
            playerStrategy: this.state.strategy!,
            houseRulesOverride: this.state.houseRules!        
        }
        
        playManyHands(parameters).then((value: StrategyResults) => {
            const strategyResultsString = JSON.stringify(value, undefined, 2);

            this.setState({playManyHandsState: strategyResultsString, strategyResults: value}); 
        }, (reasonRejected: any) => {
            this.setState({playManyHandsState: reasonRejected});
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

    render(): ReactNode {
        return (
            <div>
            <button type="button" onClick={(ev) => this.onHouseRulesButtonClick()}>get House Rules</button>
            <button type="button" onClick={(ev) => this.onStrategyButtonClick()}>get Strategy</button>
            <button type="button" onClick={(ev) => this.onPlayManyHandsButtonClick()}>play many hands</button>
            {/* <StrategyResultsComp strategyResults={this.state.strategyResults} ></StrategyResultsComp> */}
            <Accordion defaultActiveKey={['0']} alwaysOpen>
                <Accordion.Item eventKey="0">
                    <Accordion.Header>House Rules Configuration</Accordion.Header>
                    <Accordion.Body>
                        <HouseRulesComp setHouseRules={this.onUpdatedHouseRules.bind(this)} 
                            houseRules={this.state.houseRules!}></HouseRulesComp>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                    <Accordion.Header>Strategy Configuration</Accordion.Header>
                    <Accordion.Body>
                        <StrategyComp setStrategy={this.onUpdatedStrategy.bind(this)}
                            strategy={this.state.strategy} ></StrategyComp>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2">
                    <Accordion.Header>Strategy Results</Accordion.Header>
                    <Accordion.Body>
                        <StrategyResultsComp strategyResults={this.state.strategyResults} ></StrategyResultsComp>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
            {/* <HouseRulesComp setHouseRules={this.onUpdatedHouseRules.bind(this)} houseRules={this.state.houseRules!}></HouseRulesComp>
            <StrategyResultsComp strategyResults={this.state.strategyResults} ></StrategyResultsComp> */}


            <p>houseRules: {this.state.houseRulesState}</p>
            <p>strategy: {this.state.strategyState}</p>
            <p>strategyResults: {this.state.playManyHandsState}</p>

            </div>
        )
    }
}

export default BlackjackComp;