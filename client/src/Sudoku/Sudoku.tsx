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



export default function Game(): JSX.Element {
    console.log('REMOVE ME Game');

    const initialValues: Array<Array<string|undefined>> = new Array<Array<string|undefined>>(9);
    const initialStyling = new Array<Array<Array<string>>>(9);
    for (let row = 0; row < 9; row++) {
        initialValues[row] = new Array<string|undefined>(9);
        initialStyling[row] = new Array<Array<string>>(9);
        for (let col = 0; col < 9; col++) {
            initialStyling[row][col] = new Array<string>(0);
        }
    }
    const [valuesHistory, setValuesHistory] = useState([initialValues]);
    const [stylingHistory, setStylingHistory] = useState([initialStyling]);
    const [currentMove, setCurrentMove] = useState<number>(0);
    const currentValues = valuesHistory[currentMove];
    const currentStyling = stylingHistory[currentMove];

    function handlePlay(nextSquares: Array<Array<string | undefined>>, nextSquaresStyling: Array<Array<Array<string>>>): void {
        const nextHistory = [...valuesHistory.slice(0, currentMove + 1), nextSquares];
        const nextStyling = [...stylingHistory.slice(0, currentMove + 1), nextSquaresStyling]; 
        setValuesHistory(nextHistory);
        setStylingHistory(nextStyling);
        setCurrentMove(nextHistory.length - 1);
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

        const nextHistory = [...valuesHistory.slice(0, 1), startValues];
        const nextStyling = [...stylingHistory.slice(0, 1), initialStyling]; 
        setValuesHistory(nextHistory);
        setStylingHistory(nextStyling);
        setCurrentMove(nextHistory.length - 1);
        handleStartBoard(startValues);
    }

    async function handleStartBoard(initial: Array<Array<string|undefined>>) {

        fetch('/sudoku/solve', {
            method: 'POST', 
            body: JSON.stringify(initial), 
            headers: { 'Content-Type': 'application/json'}
        }).then((response) => response.json())
        .then((solvedObject) => {
            console.log(`${JSON.stringify(solvedObject)}`);
            const solved = solvedObject.history as SudokuSolveResponse;

            let lastSquares = initial;
            let lastStyling = stylingHistory[0];
            const additionalValuesHistory: Array<Array<Array<string|undefined>>> = [];
            const additionalStylingHistory: Array<Array<Array<Array<string>>>> = [];
            for (let index = 0; index < solved.length; index++) {
                const curr = solved[index];
                const entry = (curr as HistoricalEntry).entry;
                // const guess = (curr as HistoricalGuess).guess;
                if (entry) {

                    const nextSquares = new Array<Array<string|undefined>>(9);
                    const nextStyling = new Array<Array<Array<string>>>(9);
                    for (let row = 0; row < 9; row++) {
                        nextSquares[row] = lastSquares[row].slice();
                        nextStyling[row] = lastStyling[row].slice();
                        for (let col = 0; col < 9; col++) {
                            nextStyling[row][col] = lastStyling[row][col].slice();
                        }
                    }
                    nextSquares[entry.row][entry.col] = entry.value;
                    // TODO nextStyling[entry.row][entry.col] = ....;
                    lastSquares = nextSquares;
                    lastStyling = nextStyling;
                    additionalValuesHistory.push(nextSquares);
                    additionalStylingHistory.push(nextStyling);
                }              
            }

            const nextHistory = [...valuesHistory, ...additionalValuesHistory];
            const nextStyling = [...stylingHistory, ...additionalStylingHistory]; 
            setValuesHistory(nextHistory);
            setStylingHistory(nextStyling);
        })
        .catch((reason:any) => {
            console.error(`Failed to retrieve solved sudoku reason:${reason}`);
        })
    }

    return (

        <div className="game">
            <div className="game-board">
                <Board squares={currentValues} squaresStyling={currentStyling} onPlay={handlePlay} />
            </div>
            <div className="game-info">
                <button className="game-nav-button" disabled={currentMove !== 0} onClick={() => start()}>Start</button>
                <button className="game-nav-button" disabled={currentMove < 2} onClick={() => jumpTo(1)}>Initial</button>
                <button className="game-nav-button" disabled={currentMove < 2} onClick={() => jumpTo(currentMove - 1)}>Prior</button>
                <button className="game-nav-button" disabled={currentMove === 0 || currentMove >= valuesHistory.length - 1} onClick={() => jumpTo(currentMove + 1)}>Next</button>
            </div>
        </div>
    );
}


