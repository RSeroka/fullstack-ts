import { MouseEventHandler, useState } from 'react';
import './Sudoku.css';
import { SolveResponse as SudokuSolveResponse, HistoricalEntry, HistoricalGuess}  from './sudoku-service';

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
        <Square value={squares[row][column]} modifierClassList={squaresStyling[row][column]} onSquareClick={() => handleSquareClicked(column, row)} />
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
    onPlay: (nextSquares: Array<Array<string | undefined>>, nextSquaresStyling: Array<Array<Array<string>>>) => void;

}
// ...
function Board({squares, squaresStyling, onPlay }: BoardParams): JSX.Element {



    function handleSquareClicked(column: number, row: number) {

        const nextSquares = new Array<Array<string | undefined>>();
        for (let index = 0; index < squares.length; index++) {
            nextSquares[index] = squares[index].slice();      
        }

        const nextSquaresStyling = new Array<Array<Array<string>>>(squaresStyling.length);
        for (let cnt = 0; cnt < squaresStyling.length; cnt++) {
            nextSquaresStyling[cnt] = new Array<Array<string>>(squaresStyling[cnt].length);
            for (let inner = 0; inner < squaresStyling[cnt].length; inner++) {
                nextSquaresStyling[cnt][inner] = squaresStyling[cnt][inner].slice();
            }
        }
        nextSquares[row][column] = 'X';
        nextSquaresStyling[row][column] = ['square--modified'];
        onPlay(nextSquares, nextSquaresStyling);


    }

    return (
        <>
            {/* <div className="status">{status}</div> */}
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

type GameState = {
    values: Array<Array<string | undefined>>;
    styling: Array<Array<Array<string>>>;
    status: string;
};

export default function Game(): JSX.Element {
    const initialValues: Array<Array<string|undefined>> = new Array<Array<string|undefined>>(9);
    const initialStyling = new Array<Array<Array<string>>>(9);
    for (let row = 0; row < 9; row++) {
        initialValues[row] = new Array<string|undefined>(9);
        initialStyling[row] = new Array<Array<string>>(9);
        for (let col = 0; col < 9; col++) {
            initialStyling[row][col] = new Array<string>(0);
        }
    }
    // const [valuesHistory, setValuesHistory] = useState([initialValues]);
    // const [stylingHistory, setStylingHistory] = useState([initialStyling]);
    const initialGameState: GameState = {values: initialValues, styling: initialStyling, status: "empty board"};
    const [gameStateHistory, setGameStateHistory] = useState([initialGameState]);
    const [currentMove, setCurrentMove] = useState<number>(0);
    const [inSolveQuery, setInSolveQuery] = useState<boolean>(false);
    // const currentValues = valuesHistory[currentMove];
    // const currentStyling = stylingHistory[currentMove];
    const currentGameState = gameStateHistory[currentMove];

    function handlePlay(nextSquares: Array<Array<string | undefined>>, nextSquaresStyling: Array<Array<Array<string>>>): void {
        // const nextHistory = [...valuesHistory.slice(0, currentMove + 1), nextSquares];
        // const nextStyling = [...stylingHistory.slice(0, currentMove + 1), nextSquaresStyling]; 
        // setValuesHistory(nextHistory);
        // setStylingHistory(nextStyling);
        // setCurrentMove(nextHistory.length - 1);
    }

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

    async function handleStartBoard(initialValues: Array<Array<string|undefined>>) {
        if (inSolveQuery) {
            return;
        }
        setInSolveQuery(true);

        fetch('/sudoku/solve', {
            method: 'POST', 
            body: JSON.stringify(initialValues), 
            headers: { 'Content-Type': 'application/json'}
        }).then((response) => response.json())
        .then((solvedObject) => {
            console.log(`${JSON.stringify(solvedObject)}`);
            const solved = solvedObject.history as SudokuSolveResponse;

            let lastSquares = initialValues;
            let lastStyling = initialStyling;
            const additionalGameStateHistory: Array<GameState> = [{
                values: initialValues,
                styling: initialStyling,
                status: 'new game'
            } ];
            let lastEntry: HistoricalEntry|undefined;
            for (let index = 0; index < solved.length; index++) {
                const curr = solved[index];
                const entry = (curr as HistoricalEntry).entry;
                // const guess = (curr as HistoricalGuess).guess;
                if (entry) {
                    const nextGameState: GameState = {
                        values: new Array<Array<string|undefined>>(9),
                        styling: new Array<Array<Array<string>>>(9),
                        status: 'TBD'
                    }
                    for (let row = 0; row < 9; row++) {
                        nextGameState.values[row] = lastSquares[row].slice();
                        nextGameState.styling[row] = lastStyling[row].slice();
                        for (let col = 0; col < 9; col++) {
                            nextGameState.styling[row][col] = lastStyling[row][col].slice();
                        }
                    }
                    nextGameState.values[entry.row][entry.col] = entry.value;
                    switch (entry.why) {
                        case 'inferred':
                            nextGameState.styling[entry.row][entry.col].push("square--inferred", "square--last");
                            break;
                        case 'value complete':
                            nextGameState.styling[entry.row][entry.col].push("square--value-complete", "square--last");
                            break;
                        case 'row complete':
                            nextGameState.styling[entry.row][entry.col].push("square--row-complete", "square--last");
                            break;
                        case 'column complete':
                            nextGameState.styling[entry.row][entry.col].push("square--column-complete", "square--last");
                            break;
                        case 'section complete':
                            nextGameState.styling[entry.row][entry.col].push("square--section-complete", "square--last");
                            break;
                        default: 
                            // guess *
                            break;
                    }
                    if (lastEntry) {
                        nextGameState.styling[lastEntry.entry.row][lastEntry.entry.col].pop(); // remove "square--last"
                    }
                    lastEntry = curr as HistoricalEntry;
                    lastSquares = nextGameState.values;
                    lastStyling = nextGameState.styling;
                    additionalGameStateHistory.push(nextGameState);
                }              
            }

            const nextGameStateHistory = [...gameStateHistory, ...additionalGameStateHistory];
            setGameStateHistory(nextGameStateHistory);
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
                <Board squares={currentGameState.values} squaresStyling={currentGameState.styling} onPlay={handlePlay} />
            </div>
            <div className="game-info">
                <button className="game-nav-button" disabled={inSolveQuery || currentMove !== 0} onClick={() => start()}>Start</button>
                <button className="game-nav-button" disabled={currentMove < 2} onClick={() => jumpTo(1)}>Initial</button>
                <button className="game-nav-button" disabled={currentMove < 2} onClick={() => jumpTo(currentMove - 1)}>Prior</button>
                <button className="game-nav-button" disabled={currentMove === 0 || currentMove >= gameStateHistory.length - 1} onClick={() => jumpTo(currentMove + 1)}>Next</button>
            </div>
        </div>
    );
}


