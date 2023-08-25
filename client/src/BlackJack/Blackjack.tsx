

import React, { ReactNode} from 'react';

import './Blackjack.css';
import { getAllBlackjackHouseRules, getStrategyById, playManyHands } from './service-interface/blackjack-client';
import { HouseRules } from './interface-types/house-rules';
import Strategy from './interface-types/strategy';
import { PlayManyHandsParams } from './interface-types/rest-api';
import StrategyResults from './interface-types/strategy-results';
import StrategyResultsHardComp from './components/StrategyResults/StrategyResultsHardComp';
import StrategyResultsSoftComp from './components/StrategyResults/StrategyResultsSoftComp';
import StrategyResultsSplitComp from './components/StrategyResults/StrategyResultsSplitComp';
import StrategyResultsSurrenderComp from './components/StrategyResults/StrategyResultsSurrenderComp';
import StrategyResultsComp from './components/StrategyResults/StrategyResultsComp';
import StrategyResultsStatsComp from './components/StrategyResults/StrategyResultsStatsComp';


type BlackjackProperties = {

}

type BlackJackState = {
    houseRulesState: string;
    houseRules: undefined | HouseRules;
    strategyState: string;
    strategy: undefined | Strategy;
    playManyHandsState: string;
    strategyResults: undefined | StrategyResults;
}

class Blackjack extends React.Component<BlackjackProperties, BlackJackState> {

    constructor(props: BlackjackProperties) {
        super(props);
        this.state = {
            houseRulesState: "not retrieved",
            houseRules: undefined,
            strategyState: "not retrieved",
            strategy: undefined,
            playManyHandsState: "not retrieved",
            strategyResults: undefined
        }
    }

    private onHouseRulesButtonClick() {
        this.setState({houseRulesState: "in progress"});
        getAllBlackjackHouseRules().then((value: HouseRules[])=> {
            const houseRulesString = JSON.stringify(value, undefined, 2);
            this.setState({houseRulesState: houseRulesString, houseRules: value[0]});
        }, (reasonRejected: any) => {
            this.setState({houseRulesState: reasonRejected});
        })
    }

    private onStrategyButtonClick() {
        this.setState({strategyState: "in progress"});
        
        getStrategyById("basicDealerHitsOnSoft17").then((value: Strategy) => {
            const strategyString = JSON.stringify(value, undefined, 2);
            this.setState({strategyState: strategyString, strategy: value});
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


    render(): ReactNode {
        return (
            <div>
            <button type="button" onClick={(ev) => this.onHouseRulesButtonClick()}>get House Rules</button>
            <button type="button" onClick={(ev) => this.onStrategyButtonClick()}>get Strategy</button>
            <button type="button" onClick={(ev) => this.onPlayManyHandsButtonClick()}>play many hands</button>
            <StrategyResultsComp strategyResults={this.state.strategyResults} ></StrategyResultsComp>


            <p>houseRules: {this.state.houseRulesState}</p>
            <p>strategy: {this.state.strategyState}</p>
            <p>strategyResults: {this.state.playManyHandsState}</p>

            </div>
        )
    }
}

export default Blackjack;