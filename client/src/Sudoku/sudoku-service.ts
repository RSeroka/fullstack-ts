

type Sudoku9Char = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9';
type ColOrRowNum = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
export type HistoricalEntry = {
    entry: {
        col: ColOrRowNum;
        row: ColOrRowNum;
        value: Sudoku9Char;
        why: string; 
    }
};
export type HistoricalGuess = {
    guess: {
        pushOrPop: 'push' | 'pop';
        stack: number;
    }
}
export type SolveResponse = Array<HistoricalEntry|HistoricalGuess>;
