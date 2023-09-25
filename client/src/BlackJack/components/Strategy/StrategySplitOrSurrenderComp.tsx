

import React, { ReactNode, createRef } from 'react';
import Overlay from 'react-bootstrap/Overlay';

import './StrategySplitOrSurrenderComp.css';


type StrategySplitOrSurrenderCompProperties = {
    description: string;
    compactTitle: string;
    expandedTitle: string;
    value?: true;
    setValue: (value: true | undefined) => void;
}

type StrategySplitOrSurrenderCompState = {
    showOverlay: boolean;
};

class StrategySplitOrSurrenderComp extends React.Component<StrategySplitOrSurrenderCompProperties, StrategySplitOrSurrenderCompState> {
    private static readonly MAX_OVERLAY_TIME = 10000;
    private overlayTarget = createRef<HTMLDivElement>();

    constructor(props: StrategySplitOrSurrenderCompProperties) {
        super(props)
        this.state = { 
            showOverlay: false
        };
    }


    private onClickHandler() {

        if (!this.state.showOverlay) {
            setTimeout(() => {this.setState( { showOverlay: false });}, StrategySplitOrSurrenderComp.MAX_OVERLAY_TIME);
        }
        this.setState( { showOverlay: !this.state.showOverlay } );

    }

    private onChangdValue(event: React.ChangeEvent<HTMLInputElement>) {
        let newValue: true | undefined = undefined;
        if (event.target.value === "true") {
            newValue = true;
        }
        this.props.setValue(newValue);
    }
    
    render(): ReactNode {
        const compactContent = this.props.value === true ? this.props.compactTitle : '-';

        const overlay = (
            <Overlay target={this.overlayTarget.current} show={this.state.showOverlay} placement='bottom-end'>
            {({           
                placement: _placement,
                arrowProps: _arrowProps,
                show: _show,
                popper: _popper,
                hasDoneInitialMeasure: _hasDoneInitialMeasure,
                ...props }) => (
                <div {...props} className="strategy-split-or-surrender-comp__overlay" onClick={() => this.onClickHandler()}>
                    <div className="strategy-split-or-surrender-comp__overlay-row strategy-split-or-surrender-comp__overlay-row--header">
                        &nbsp;{this.props.description}&nbsp;
                    </div>
                    <div className="strategy-split-or-surrender-comp__overlay-row">
                        <label>
                            {this.props.expandedTitle}:&nbsp;
                            <input type="radio"  onChange={this.onChangdValue.bind(this)} 
                                value="true" checked={this.props.value === true}/>
                        </label>
                        &nbsp;
                    </div>
                    <div className="strategy-split-or-surrender-comp__overlay-row">
                        <label>
                            Don't&nbsp;{this.props.expandedTitle}:&nbsp;
                            <input type="radio"  onChange={this.onChangdValue.bind(this)} 
                                value="undefined" checked={this.props.value === undefined}/>
                        </label>
                        &nbsp;
                    </div>

                </div>
            )}

            </Overlay>
        );

        return (
            <>
                <span className={`strategy-split-or-surrender-comp`} ref={this.overlayTarget} onClick={() => this.onClickHandler()}>
                    {compactContent}
                </span>
                {overlay}
            </>
        );
    }
}


export default StrategySplitOrSurrenderComp;