import { MouseEventHandler, useState } from 'react';
import './Sudoku.css';

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



export default function Game() {

    const initialValues = [
        ["5", "3",    ,    , "7",    ,    ,    ,    ],// eslint-disable-line
        ["6",    ,    , "1", "9", "5",    ,    ,    ],// eslint-disable-line
        [   , "9", "8",    ,    ,    ,    , "6",    ],// eslint-disable-line
        ["8",    ,    ,    , "6",    ,    ,    , "3"],// eslint-disable-line
        ["4",    ,    , "8",    , "3",    ,    , "1"],// eslint-disable-line
        ["7",    ,    ,    , "2",    ,    ,    , "6"],// eslint-disable-line
        [   , "6",    ,    ,    ,    , "2", "8",    ],// eslint-disable-line
        [   ,    ,    , "4", "1", "9",    ,    , "5"],// eslint-disable-line
        [   ,    ,    ,    , "8",    ,    , "7", "9"]]; // eslint-disable-line

    const initialStyling = new Array<Array<Array<string>>>(9);
    for (let row = 0; row < 9; row++) {
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



    return (

        <div className="game">
            <div className="game-board">
                <Board squares={currentValues} squaresStyling={currentStyling} onPlay={handlePlay} />
            </div>
            <div className="game-info">
                <button className="game-nav-button" disabled={currentMove === 0} onClick={() => jumpTo(0)}>Initial</button>
                <button className="game-nav-button" disabled={currentMove === 0} onClick={() => jumpTo(currentMove - 1)}>Prior</button>
            </div>
        </div>
    );
}


