

import React, { ReactNode } from 'react';

import "./StrategyComp.css";

import Strategy from '../../interface-types/strategy';


type StrategyProperties = {
    strategy?: Strategy
    setStrategy: (updatedStrategy: Strategy) => void;
};

type StrategyState = {

};


class StrategyComp extends React.Component<StrategyProperties, StrategyState> {

    render() : ReactNode {
        return (
            <></>
        );
    }
}

export default StrategyComp;