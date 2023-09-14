

import React, { ReactNode, createRef } from 'react';
import Overlay from 'react-bootstrap/Overlay';

import './StrategyHitStandOrDoubleComp.css';

import type { PlayerStrategyHitStandOrDouble  } from "../../interface-types/decision";


type StrategyHitStandOrDoubleCompProperties = {
    description: string;
    hsod?: PlayerStrategyHitStandOrDouble;
    setHsod: (hsod: PlayerStrategyHitStandOrDouble) => void;
}

type StrategyHitStandOrDoubleCompState = {
    showOverlay: boolean;
};

class StrategyHitStandOrDoubleComp extends React.Component<StrategyHitStandOrDoubleCompProperties, StrategyHitStandOrDoubleCompState> {
    private static readonly MAX_OVERLAY_TIME = 10000;
    private overlayTarget = createRef<HTMLDivElement>();

    constructor(props: StrategyHitStandOrDoubleCompProperties) {
        super(props)
        this.state = { 
            showOverlay: false
        };
    }


    private onClickHandler() {

        if (!this.state.showOverlay) {
            setTimeout(() => {this.setState( { showOverlay: false });}, StrategyHitStandOrDoubleComp.MAX_OVERLAY_TIME);
        }
        this.setState( { showOverlay: !this.state.showOverlay } );

    }

    private onChangeHsod(event: React.ChangeEvent<HTMLInputElement>) {
        this.props.setHsod(event.target.value as PlayerStrategyHitStandOrDouble);
    }
    
    render(): ReactNode {
        let overlay: ReactNode | undefined = undefined;
        let heatMapClass = "strategy-hit-stand-or-double-comp--hit";
        let compactContent: string = '-';

        switch (this.props.hsod) {
            case "Stand":
                // case PlayerStrategyHitStandOrDouble.STAND:
                compactContent = "Stand";
                break;
            case "Hit":
                // case PlayerStrategyHitStandOrDouble.HIT:
                compactContent = "Hit";
                break;
            case "Double":
                // case PlayerStrategyHitStandOrDouble.DOUBLE:
                compactContent = "Dbl";
                break;
            case 'Double or Stand':
                // case PlayerStrategyHitStandOrDouble.DOUBLE_OR_STAND:
                compactContent = "D/S";
                break;
            case undefined: 
            default:
                compactContent = "-";
                break;
        }

        if (this.props.hsod !== undefined) {
            overlay = (
                <Overlay target={this.overlayTarget.current} show={this.state.showOverlay} placement='bottom-end'>
                {({           
                    placement: _placement,
                    arrowProps: _arrowProps,
                    show: _show,
                    popper: _popper,
                    hasDoneInitialMeasure: _hasDoneInitialMeasure,
                    ...props }) => (
                    <div {...props} className="strategy-hit-stand-or-double-comp__overlay" onClick={() => this.onClickHandler()}>
                        <div className="strategy-hit-stand-or-double-comp__overlay-row strategy-hit-stand-or-double-comp__overlay-row--header">
                            &nbsp;{this.props.description}&nbsp;
                        </div>
                        <div className="strategy-hit-stand-or-double-comp__overlay-row">
                            <label>
                                Stand:&nbsp;
                                <input type="radio"  onChange={this.onChangeHsod.bind(this)} 
                                    value="Stand" checked={this.props.hsod === 'Stand'}/>
                            </label>
                            &nbsp;
                        </div>
                        <div className="strategy-hit-stand-or-double-comp__overlay-row">
                            <label>
                                Hit:&nbsp;
                                <input type="radio"  onChange={this.onChangeHsod.bind(this)} 
                                    value="Hit" checked={this.props.hsod === 'Hit'}/>
                            </label>
                            &nbsp;
                        </div>
                        <div className="strategy-hit-stand-or-double-comp__overlay-row">
                            <label>
                                Double or Hit:&nbsp;
                                <input type="radio" onChange={this.onChangeHsod.bind(this)} 
                                    value="Double" checked={this.props.hsod === 'Double'} />
                            </label>
                            &nbsp;
                        </div>
                        <div className="strategy-hit-stand-or-double-comp__overlay-row">
                            <label>
                                Double or Stand:&nbsp;
                                <input type="radio" onChange={this.onChangeHsod.bind(this)} 
                                    value="Double or Stand" checked={this.props.hsod === 'Double or Stand'} />
                            </label>
                            &nbsp;
                        </div>

                    </div>
                )}
    
                </Overlay>
            );
        }



        return (
            <>
                <span className={`strategy-hit-stand-or-double-comp ${heatMapClass}`} ref={this.overlayTarget} onClick={() => this.onClickHandler()}>
                    {compactContent}
                </span>
                {overlay}
            </>
        );
    }
}


export default StrategyHitStandOrDoubleComp;