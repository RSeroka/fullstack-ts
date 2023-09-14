
import React, { ReactNode, createRef } from 'react';
import Overlay from 'react-bootstrap/Overlay';

import "./StrategyResultsStatsComp.css";
import { StrategyResultsStats } from '../../interface-types/strategy-results';

type StrategyResultsStatsCompProperties = {
    description?: string,
    stats?: StrategyResultsStats;
    expanded?: true;
}

type StrategyResultsStatsCompState = {
    showOverlay: boolean;
};

class StrategyResultsStatsComp extends React.Component<StrategyResultsStatsCompProperties, StrategyResultsStatsCompState> {

    private static readonly MAX_OVERLAY_TIME = 10000;
    private overlayTarget = createRef<HTMLDivElement>();

    constructor(props: StrategyResultsStatsCompProperties) {
        super(props)
        this.state = { 
            showOverlay: false
        };
    }

    private onClickHandler() {
        if (!this.props.expanded) {
            if (!this.state.showOverlay) {
                setTimeout(() => {this.setState( { showOverlay: false });}, StrategyResultsStatsComp.MAX_OVERLAY_TIME);
            }
            this.setState( { showOverlay: !this.state.showOverlay } );
        }
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

        const compactContent = this.props.stats && this.props.stats.numberHands > 0 ? "" + Math.round(derived.netValuePercent) + "%" : "-" ;
        let unconditionalExpandedContent = `Win: ${derived.winPercent}%, Push: ${derived.pushPercent}%, Lose: ${derived.losePercent}%, Net: ${derived.netValuePercent}%`;
        let expandedContent: ReactNode;
        if (this.props.stats !== undefined) {
            expandedContent = <>&nbsp;Wins: {this.props.stats?.numberWins}, Losses: {this.props.stats?.numberLosses}, Hands: {this.props.stats?.numberHands}, Net: {this.props.stats?.netValue}&nbsp;
                <br />&nbsp;{unconditionalExpandedContent}&nbsp;</>;
        }
        else {
            expandedContent = <>&nbsp;{unconditionalExpandedContent}&nbsp;</>;
        }
        let descriptionContent: ReactNode;
        if (this.props.description) {
            descriptionContent = <div className="strategy-results-stats-comp__overlay--header">{this.props.description}</div>; 
        }


        let overlay: ReactNode | undefined;
        if (!this.props.expanded) {
            overlay = (
                <Overlay target={this.overlayTarget.current} show={this.state.showOverlay} placement='bottom'>
                {({           
                    placement: _placement,
                    arrowProps: _arrowProps,
                    show: _show,
                    popper: _popper,
                    hasDoneInitialMeasure: _hasDoneInitialMeasure,
                    ...props }) => (
                    <div {...props} className="strategy-results-stats-comp__overlay" onClick={() => this.onClickHandler()}>
                        {descriptionContent}
                        {expandedContent}
                    </div>
                )}

                </Overlay>
            );

        }

        return (
            <>
                <span className={`strategy-results-stats-comp ${heatMapClass}`} ref={this.overlayTarget} onClick={() => this.onClickHandler()}>
                    {!this.props.expanded ? compactContent : expandedContent}
                </span>
                {overlay}
            </>

        );
    }
    
};

export default StrategyResultsStatsComp;