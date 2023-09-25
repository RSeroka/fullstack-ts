

import React, { ReactNode } from 'react';

import Accordion from 'react-bootstrap/Accordion';


import "./StrategyComp.css";

import Strategy from '../../interface-types/strategy';

import StrategyHardComp from './StrategyHardComp';
import StrategySoftComp from './StrategySoftComp';
import StrategySplitComp from './StrategySplitComp';
import StrategySurrenderComp from './StrategySurrenderComp';


type StrategyProperties = {
    strategy?: Strategy
    setStrategy: (updatedStrategy: Strategy) => void;
};

type StrategyState = {

};


class StrategyComp extends React.Component<StrategyProperties, StrategyState> {

    render() : ReactNode {
        return (
            <div className="strategy-results">
                <Accordion defaultActiveKey={['0']} alwaysOpen>
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>Hard Total Strategy</Accordion.Header>
                        <Accordion.Body className="strategy__item-body">
                            <StrategyHardComp strategy={this.props.strategy} 
                                setStrategy={this.props.setStrategy} ></StrategyHardComp>
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="1">
                        <Accordion.Header>Soft Total Strategy</Accordion.Header>
                        <Accordion.Body className="strategy__item-body"> 
                            <StrategySoftComp strategy={this.props.strategy} 
                                setStrategy={this.props.setStrategy} ></StrategySoftComp>
                        </Accordion.Body>                   
                    </Accordion.Item>
                    <Accordion.Item eventKey="2">
                        <Accordion.Header>Split Pairs Strategy</Accordion.Header>
                        <Accordion.Body className="strategy__item-body">
                            <StrategySplitComp strategy={this.props.strategy} 
                                setStrategy={this.props.setStrategy} ></StrategySplitComp>
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="3">
                        <Accordion.Header>Late Surrender Strategy</Accordion.Header>
                        <Accordion.Body className="strategy__item-body">
                            <StrategySurrenderComp strategy={this.props.strategy} 
                                setStrategy={this.props.setStrategy} ></StrategySurrenderComp>
                        </Accordion.Body>
                    </Accordion.Item>
                    
                </Accordion>
            </div>
        );
    }
}

export default StrategyComp;