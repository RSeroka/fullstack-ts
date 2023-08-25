


import React, { ReactNode } from 'react';

import Accordion from 'react-bootstrap/Accordion';



import { StrategyResults } from '../../interface-types/strategy-results';
import "./StrategyResultsComp.css";

import StrategyResultsStatsComp from './StrategyResultsStatsComp';
import StrategyResultsHardComp from './StrategyResultsHardComp';
import StrategyResultsSoftComp from './StrategyResultsSoftComp';
import StrategyResultsSplitComp from './StrategyResultsSplitComp';
import StrategyResultsSurrenderComp from './StrategyResultsSurrenderComp';


type StrategyResultsProperties = {
    strategyResults?: StrategyResults;
}

type StrategyResultsState = {

}

class StrategyResultsComp extends React.Component<StrategyResultsProperties, StrategyResultsState> {
    render() : ReactNode {
        return (
            <div className="strategy-results">
                <Accordion defaultActiveKey={['0']} alwaysOpen>
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>Overall Strategy Results</Accordion.Header>
                        <Accordion.Body className="strategy-results__item-body"><StrategyResultsStatsComp expanded stats={this.props.strategyResults?.overall} ></StrategyResultsStatsComp></Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="1">
                        <Accordion.Header>Player or Dealer Blackjack</Accordion.Header>
                        <Accordion.Body className="strategy-results__item-body"><StrategyResultsStatsComp expanded stats={this.props.strategyResults?.blackjack} ></StrategyResultsStatsComp></Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="2">
                        <Accordion.Header>Hard Total Strategy Attribution</Accordion.Header>
                        <Accordion.Body className="strategy-results__item-body">
                            <StrategyResultsHardComp strategyResults={this.props.strategyResults} ></StrategyResultsHardComp>
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="3">
                        <Accordion.Header>Soft Total Strategy Attribution</Accordion.Header>
                        <Accordion.Body className="strategy-results__item-body">
                            <StrategyResultsSoftComp strategyResults={this.props.strategyResults} ></StrategyResultsSoftComp>
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="4">
                        <Accordion.Header>Split Pairs Strategy Attribution</Accordion.Header>
                        <Accordion.Body className="strategy-results__item-body">
                            <StrategyResultsSplitComp strategyResults={this.props.strategyResults} ></StrategyResultsSplitComp>
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="5">
                        <Accordion.Header>Late Surrender Strategy Attribution</Accordion.Header>
                        <Accordion.Body className="strategy-results__item-body">
                            <StrategyResultsSurrenderComp strategyResults={this.props.strategyResults} ></StrategyResultsSurrenderComp>
                        </Accordion.Body>
                    </Accordion.Item>
                    
                </Accordion>
            </div>
        );
    }

}

export default StrategyResultsComp;
