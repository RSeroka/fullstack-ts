/**
 * define board type
 */
export type Sudoku9Char = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9';
export type Board9Char = Sudoku9Char | '.';
export type Board9 = Array<Array<Board9Char>>;

