
import React, { ReactNode, createRef } from 'react';
import Overlay from 'react-bootstrap/Overlay';
// import Button from 'react-bootstrap/Button';

import "./StrategyResultsStatsComp.css";
import { StrategyResultsStats } from '../interface-types/strategy-results';

type StrategyResultsStatsCompProperties = {
    stats?: StrategyResultsStats;
}

type StrategyResultsStatsCompState = {
    showOverlay: boolean;
};

class StrategyResultsStatsComp extends React.Component<StrategyResultsStatsCompProperties, StrategyResultsStatsCompState> {

    private static readonly MAX_OVERLAY_TIME = 20000;
    private overlayTarget = createRef<HTMLDivElement>();

    constructor(props: StrategyResultsStatsCompProperties) {
        super(props)
        this.state = { 
            showOverlay: false
        };
    }

    private onClickHandler() {
        if (!this.state.showOverlay) {
            setTimeout(() => {this.setState( { showOverlay: false });}, StrategyResultsStatsComp.MAX_OVERLAY_TIME);
        }
        this.setState( { showOverlay: !this.state.showOverlay } );
    }


    render(): ReactNode {

        const derived = {
            winPercent: (this.props.stats !== undefined && this.props.stats.numberHands > 0 ? Math.round(1000 * this.props.stats.numberWins / this.props.stats.numberHands) / 10 : 0),
            losePercent: (this.props.stats !== undefined && this.props.stats.numberHands > 0 ? Math.round(1000 * this.props.stats.numberLosses / this.props.stats.numberHands) / 10 : 0),
            pushPercent: (this.props.stats !== undefined && this.props.stats.numberHands > 0 ? Math.round(1000 * (this.props.stats.numberHands - this.props.stats.numberWins - this.props.stats.numberLosses) / this.props.stats.numberHands) / 10 : 0),
            netValuePercent: (this.props.stats !== undefined && this.props.stats.numberHands > 0 ? Math.round(10000 * this.props.stats.netValue / this.props.stats.numberHands) / 100: 0)
        };

        // const thing = JSON.stringify({...this.props.stats, ...derived});

        let heatMapClass = "strategy-results-stats-comp--push";
        if (derived.netValuePercent > 10) {
            heatMapClass = "strategy-results-stats-comp--deepwinner";
        }
        else if (derived.netValuePercent > 0.5) {
            heatMapClass = "strategy-results-stats-comp--winner";
        }
        else if (derived.netValuePercent < -10) {
            heatMapClass = "strategy-results-stats-comp--deeploser";
        }
        else if (derived.netValuePercent < -0.5) {
            heatMapClass = "strategy-results-stats-comp--loser";
        }

        return (
            <>
                <div className={`strategy-results-stats-comp ${heatMapClass}`} ref={this.overlayTarget} onClick={() => this.onClickHandler()}>
                    {Math.round(derived.netValuePercent)}%
                </div>

                <Overlay target={this.overlayTarget.current} show={this.state.showOverlay} placement='bottom' >
                    {/*                         Win: {derived.winPercent}%, Push: {derived.pushPercent}%, Lose: {derived.losePercent}%, Net: {derived.netValuePercent}% */}
                    <div className="strategy-results-stats-comp__overlay">
                        Wins: {this.props.stats?.numberWins}, Losses: {this.props.stats?.numberLosses}, Hands: {this.props.stats?.numberHands}, Net: {this.props.stats?.netValue}
                        <br />   
                        Win: {derived.winPercent}%, Push: {derived.pushPercent}%, Lose: {derived.losePercent}%, Net: {derived.netValuePercent}%
                    </div>
                </Overlay>
            </>

        );
    }
    
};

export default StrategyResultsStatsComp;