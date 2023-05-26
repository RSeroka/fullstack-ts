import React, { MouseEventHandler, useState } from 'react';
import './Sudoku.css';
import { SolveResponse as SudokuSolveResponse, HistoricalEntry, HistoricalGuess}  from './sudoku-service';
import FontAwesomeIconElementFactory from '../FontAwesomeFacade/FontAwesomeElementFactory';

type SquareParams = {
    value?: string;
    modifierClassList?: Array<String>;
    onSquareClick?: MouseEventHandler<HTMLElement>;
}

function Square({ value, modifierClassList, onSquareClick }: SquareParams): JSX.Element {
    const classes = `square ${modifierClassList ? modifierClassList.join(' ') : ''}`;
    return <div className={classes} onClick={onSquareClick}>{value}</div>;
}

type SquareCellParams = {
    column: number, 
    row: number,
    squares: Array<Array<string | undefined>>,
    squaresStyling: Array<Array<Array<string>>>,
    handleSquareClicked: (column: number, row: number) => void
}

function SquareCell({column, row, squares, squaresStyling, handleSquareClicked}: SquareCellParams): JSX.Element {
    return (
        <Square value={squares[row][column]} 
        modifierClassList={squaresStyling[row][column]} 
        onSquareClick={() => handleSquareClicked(column, row)} />
    )
}

type SectionParams = {
    colOffset: number,
    rowOffset: number,
    squares: Array<Array<string | undefined>>,
    squaresStyling: Array<Array<Array<string>>>,
    handleSquareClicked: (column: number, row: number) => void
}

function Section({ colOffset, rowOffset, squares, squaresStyling, handleSquareClicked }: SectionParams): JSX.Element {
    const columnStart = colOffset * 3;
    const rowStart = rowOffset * 3;


    return (
        <div className="section">
            <div className="square-row">
                <SquareCell column={columnStart + 0} row={rowStart + 0} squares={squares} squaresStyling={squaresStyling} handleSquareClicked={handleSquareClicked} />
                <SquareCell column={columnStart + 1} row={rowStart + 0} squares={squares} squaresStyling={squaresStyling} handleSquareClicked={handleSquareClicked} />
                <SquareCell column={columnStart + 2} row={rowStart + 0} squares={squares} squaresStyling={squaresStyling} handleSquareClicked={handleSquareClicked} />
            </div>
            <div className="square-row">
                <SquareCell column={columnStart + 0} row={rowStart + 1} squares={squares} squaresStyling={squaresStyling} handleSquareClicked={handleSquareClicked} />
                <SquareCell column={columnStart + 1} row={rowStart + 1} squares={squares} squaresStyling={squaresStyling} handleSquareClicked={handleSquareClicked} />
                <SquareCell column={columnStart + 2} row={rowStart + 1} squares={squares} squaresStyling={squaresStyling} handleSquareClicked={handleSquareClicked} />
            </div>
            <div className="square-row">
                <SquareCell column={columnStart + 0} row={rowStart + 2} squares={squares} squaresStyling={squaresStyling} handleSquareClicked={handleSquareClicked} />
                <SquareCell column={columnStart + 1} row={rowStart + 2} squares={squares} squaresStyling={squaresStyling} handleSquareClicked={handleSquareClicked} />
                <SquareCell column={columnStart + 2} row={rowStart + 2} squares={squares} squaresStyling={squaresStyling} handleSquareClicked={handleSquareClicked} />
            </div>
        </div>
    )
}

type BoardParams = {
    squares: Array<Array<string | undefined>>,
    squaresStyling: Array<Array<Array<string>>>,
    handleSquareClicked: (column: number, row: number) => void;
}
// ...
function Board({squares, squaresStyling, handleSquareClicked }: BoardParams): JSX.Element {



    return (
        <>
            <div className="board">
                <div className="section-row">
                    <Section colOffset={0} rowOffset={0} handleSquareClicked={handleSquareClicked} squares={squares} squaresStyling={squaresStyling} />
                    <Section colOffset={1} rowOffset={0} handleSquareClicked={handleSquareClicked} squares={squares} squaresStyling={squaresStyling} />
                    <Section colOffset={2} rowOffset={0} handleSquareClicked={handleSquareClicked} squares={squares} squaresStyling={squaresStyling} />
                </div>
                <div className="section-row">
                    <Section colOffset={0} rowOffset={1} handleSquareClicked={handleSquareClicked} squares={squares} squaresStyling={squaresStyling} />
                    <Section colOffset={1} rowOffset={1} handleSquareClicked={handleSquareClicked} squares={squares} squaresStyling={squaresStyling} />
                    <Section colOffset={2} rowOffset={1} handleSquareClicked={handleSquareClicked} squares={squares} squaresStyling={squaresStyling} />
                </div>
                <div className="section-row">
                    <Section colOffset={0} rowOffset={2} handleSquareClicked={handleSquareClicked} squares={squares} squaresStyling={squaresStyling} />
                    <Section colOffset={1} rowOffset={2} handleSquareClicked={handleSquareClicked} squares={squares} squaresStyling={squaresStyling} />
                    <Section colOffset={2} rowOffset={2} handleSquareClicked={handleSquareClicked} squares={squares} squaresStyling={squaresStyling} />
                </div>
            </div>
        </>
    );
}

type GameNavButtonState = {
    label?: string;
    faIconName?: string;
    clickHandler?: MouseEventHandler<HTMLElement>;
    disabled?: boolean;
}
class GameNavButton extends  React.Component<GameNavButtonState> {
    private renderFAIcon(): JSX.Element {
        if (this.props.faIconName) {
            return <>{FontAwesomeIconElementFactory.create(this.props.faIconName)}<br /></>;
        }
        else {
            return (<></>) ;
        }

    }
    render() {
        const buttonDisabled = this.props.disabled !== undefined ? this.props.disabled === true : this.props.disabled !== true;
        return (
            <button className="game__nav-button" disabled={buttonDisabled} onClick={this.props.clickHandler}>
                {this.renderFAIcon()}
                {this.props.label}
            </button>
        );
    }

}

type GameState = {
    values: Array<Array<string | undefined>>;
    valuesStyling: Array<Array<Array<string>>>;
    status: string;
    statusStyling: string;
};

export default function Game(): JSX.Element {
    const initialValues: Array<Array<string|undefined>> = new Array<Array<string|undefined>>(9);
    const initialStyling = new Array<Array<Array<string>>>(9);
    for (let row = 0; row < 9; row++) {
        initialValues[row] = new Array<string|undefined>(9);
        initialStyling[row] = new Array<Array<string>>(9);
        // gridToMoveNumMap[row] = new Array<number>(9);
        for (let col = 0; col < 9; col++) {
            initialStyling[row][col] = new Array<string>(0);
        }
    }

    const initialGameState: GameState = {
        values: initialValues, 
        valuesStyling: initialStyling, 
        status: "empty board", 
        statusStyling: ""
    };
    const [gameStateHistory, setGameStateHistory] = useState([initialGameState]);
    const [currentMove, setCurrentMove] = useState<number>(0);
    const [inSolveQuery, setInSolveQuery] = useState<boolean>(false);
    const [gridToMoveNumMap, setGridToMoveNumMap] = useState<Array<Array<number>>>(new Array<Array<number>>());
    const currentGameState = gameStateHistory[currentMove];



    function jumpTo(nextMove: number): void {
        setCurrentMove(nextMove);
    }

    function start(): void {
        console.log('Game Start');
        const startValues: Array<Array<string|undefined>> = [
            ["5", "3",    ,    , "7",    ,    ,    ,    ],// eslint-disable-line
            ["6",    ,    , "1", "9", "5",    ,    ,    ],// eslint-disable-line
            [   , "9", "8",    ,    ,    ,    , "6",    ],// eslint-disable-line
            ["8",    ,    ,    , "6",    ,    ,    , "3"],// eslint-disable-line
            ["4",    ,    , "8",    , "3",    ,    , "1"],// eslint-disable-line
            ["7",    ,    ,    , "2",    ,    ,    , "6"],// eslint-disable-line
            [   , "6",    ,    ,    ,    , "2", "8",    ],// eslint-disable-line
            [   ,    ,    , "4", "1", "9",    ,    , "5"],// eslint-disable-line
            [   ,    ,    ,    , "8",    ,    , "7", "9"]]; // eslint-disable-line

        handleStartBoard(startValues);
    }

    function handleSquareClicked(column: number, row: number) : void {
        const nextMove = gridToMoveNumMap[row]?.[column];

        if (nextMove !== undefined && nextMove !== currentMove) {
            console.log(`Game handleSquareClicked(${column}, ${row}) gridToMoveNumMap:${nextMove}`);
            setCurrentMove(nextMove);
        }
    }

    async function handleStartBoard(initialValues: Array<Array<string|undefined>>) {
        if (inSolveQuery) {
            return;
        }
        setInSolveQuery(true);

        fetch('/sudoku/solve', {
            method: 'POST', 
            body: JSON.stringify(initialValues), 
            headers: { 'Content-Type': 'application/json'}
        })
        .then((response) => response.json())
        .then((solvedObject) => {
            // reinitialize the gridToMoveNumMap
            const baseMoveNumber = 1;
            for (let row = 0; row < 9; row++) {
                gridToMoveNumMap[row] = new Array<number>(9);
                gridToMoveNumMap[row].fill(baseMoveNumber);
            }
            // console.log(`${JSON.stringify(solvedObject)}`);
            const solved = solvedObject.history as SudokuSolveResponse;

            let lastSquares = initialValues;
            let lastStyling = initialStyling;
            const additionalGameStateHistory: Array<GameState> = [{
                values: initialValues,
                valuesStyling: initialStyling,
                status: 'new game',
                statusStyling: ""
            } ];
            let lastEntry: HistoricalEntry|undefined;

            for (let index = 0; index < solved.length; index++) {
                const curr = solved[index];
                const entry = (curr as HistoricalEntry).entry;
                // const guess = (curr as HistoricalGuess).guess;
                if (entry) {
                    const nextGameState: GameState = {
                        values: new Array<Array<string|undefined>>(9),
                        valuesStyling: new Array<Array<Array<string>>>(9),
                        status: '',
                        statusStyling: ""
                    }
                    for (let row = 0; row < 9; row++) {
                        nextGameState.values[row] = lastSquares[row].slice();
                        nextGameState.valuesStyling[row] = lastStyling[row].slice();
                        for (let col = 0; col < 9; col++) {
                            nextGameState.valuesStyling[row][col] = lastStyling[row][col].slice();
                        }
                    }
                    gridToMoveNumMap[entry.row][entry.col] = baseMoveNumber + index + 1;
                    nextGameState.values[entry.row][entry.col] = entry.value;
                    nextGameState.status = entry.why;
                    switch (entry.why) {
                        case 'inferred':
                            nextGameState.valuesStyling[entry.row][entry.col].push("square--inferred", "square--last");
                            nextGameState.statusStyling = "status--inferred";
                            break;
                        case 'value complete':
                            nextGameState.valuesStyling[entry.row][entry.col].push("square--value-complete", "square--last");
                            nextGameState.statusStyling = "status--value-complete";
                            break;
                        case 'row complete':
                            nextGameState.valuesStyling[entry.row][entry.col].push("square--row-complete", "square--last");
                            nextGameState.statusStyling = "status--row-complete";
                            break;
                        case 'column complete':
                            nextGameState.valuesStyling[entry.row][entry.col].push("square--column-complete", "square--last");
                            nextGameState.statusStyling = "status--column-complete";
                            break;
                        case 'section complete':
                            nextGameState.valuesStyling[entry.row][entry.col].push("square--section-complete", "square--last");
                            nextGameState.statusStyling = "status--section-complete";
                            break;
                        default: 
                            // guess *
                            break;
                    }
                    if (lastEntry) {
                        nextGameState.valuesStyling[lastEntry.entry.row][lastEntry.entry.col].pop(); // remove "square--last"
                    }
                    lastEntry = curr as HistoricalEntry;
                    lastSquares = nextGameState.values;
                    lastStyling = nextGameState.valuesStyling;
                    additionalGameStateHistory.push(nextGameState);
                }              
            }

            const nextGameStateHistory = [...gameStateHistory, ...additionalGameStateHistory];
            setGameStateHistory(nextGameStateHistory);
            setGridToMoveNumMap(gridToMoveNumMap);
            setCurrentMove(1);

        })
        .catch((reason:any) => {
            console.error(`Failed to retrieve solved sudoku reason:${reason}`);
        })
        .finally(() => {
            setInSolveQuery(false);
        });
    }

    return (

        <div className="game">
            <div className="game-board">
                <Board squares={currentGameState.values} squaresStyling={currentGameState.valuesStyling} handleSquareClicked={handleSquareClicked} />
            </div>
            <div className="game-info">

                <div>
                    <GameNavButton disabled={inSolveQuery || currentMove !== 0} clickHandler={() => start()} label="Start" />
                    <GameNavButton disabled={currentMove < 2} clickHandler={() => jumpTo(1)} label="Initial" faIconName="backward-fast" />
                    <GameNavButton disabled={currentMove < 2} clickHandler={() => jumpTo(currentMove - 1)} label="Prior" faIconName="backward-step" />
                    <GameNavButton disabled={currentMove === 0 || currentMove >= gameStateHistory.length - 1} 
                        clickHandler={() => jumpTo(currentMove + 1)} label="Next" faIconName="forward-step" />
                </div>
                <div className={`status ${currentGameState.statusStyling}`}>{currentGameState.status}</div>
            </div>
        </div>
    );
}


