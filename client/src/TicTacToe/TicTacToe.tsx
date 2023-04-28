import { MouseEventHandler, useState } from 'react';
import './TicTacToe.css';

type SquareParams = {
    value?: string;
    onSquareClick?: MouseEventHandler<HTMLElement>;
}

function Square({ value, onSquareClick }: SquareParams): JSX.Element {
    return <button className="square" onClick={onSquareClick}>{value}</button>;
}

type BoardParams = {
    xIsNext: boolean,
    squares: Array<string | undefined>,
    onPlay: (nextSquares: Array<string | undefined>) => void;

}
// ...
function Board({xIsNext, squares, onPlay}: BoardParams): JSX.Element {
    // const [xIsNext, setXIsNext] = useState<boolean>(true);
    // const [squares, setSquares] = useState<Array<string | undefined>>(new Array(9));


    function handleSquareClicked(squareOffset: number) {
        if (!winner && squares[squareOffset] === undefined) {
            const nextSquares = squares.slice();
            nextSquares[squareOffset] = xIsNext ? 'X' : 'O';
            onPlay(nextSquares);
        }

    }

    const winner = calculateWinner(squares); 
    const status = winner ? winner + " Wins!" : (xIsNext ? 'X' : 'O') + "'s turn";

    return (
        <>
            <div className="status">{status}</div>
            <div className="board-row">
                <Square value={squares[0]} onSquareClick={() => handleSquareClicked(0)} />
                <Square value={squares[1]} onSquareClick={() => handleSquareClicked(1)} />
                <Square value={squares[2]} onSquareClick={() => handleSquareClicked(2)} />
            </div>
            <div className="board-row">
                <Square value={squares[3]} onSquareClick={() => handleSquareClicked(3)} />
                <Square value={squares[4]} onSquareClick={() => handleSquareClicked(4)} />
                <Square value={squares[5]} onSquareClick={() => handleSquareClicked(5)} />
            </div>
            <div className="board-row">
                <Square value={squares[6]} onSquareClick={() => handleSquareClicked(6)} />
                <Square value={squares[7]} onSquareClick={() => handleSquareClicked(7)} />
                <Square value={squares[8]} onSquareClick={() => handleSquareClicked(8)} />
            </div>
        </>
    );
}

function calculateWinner(squares: Array<string|undefined>) : string|undefined {

    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }

    if (!squares.includes(undefined)) {
        return 'Noone'
    }
    return undefined;
}
  
export default function Game() {
    const [history, setHistory] = useState([new Array<string|undefined>(9)]);
    const [currentMove, setCurrentMove] = useState<number>(0);
    const currentSquares = history[currentMove];
    const xIsNext = currentMove % 2 === 0;

    function handlePlay(nextSquares: Array<string | undefined>) : void {
        const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
        setHistory(nextHistory);
        setCurrentMove(nextHistory.length - 1);
    }

    function jumpTo(nextMove:number): void {
        setCurrentMove(nextMove);
    }

    const moves = history.map((_squares: Array<string|undefined>, move: number) => {
        const description = move > 0 ? `Go to move ${move}` : 'Go to game start';

        return (
            <li key={`move${move}`}> 
                <button onClick={() => jumpTo(move)}>{description}</button>
            </li>
        )
    });

    return (
        <div className="game">
            <div className="game-board">
                <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay}/>
            </div>
            <div className="game-info">
                <ol>{ moves }</ol>
            </div>
        </div>
    );
}

