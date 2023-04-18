/**
 * ISudukoSolver interface 
 */

import type { Board9 } from "./board";

export default interface ISudokuSolver {
    (board: Board9): void;
}