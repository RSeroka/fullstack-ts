/**
 * ISudokuSolver interface 
 */

import type { Board9 } from "./board";

export default interface ISudokuSolver {
    solve(board: Board9): void;
}