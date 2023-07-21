

import getSortedRemainingTests from "./get-sorted-remaining.spec";
import getSectionNumberTests from "./sudoku-section.spec";
import sudokuSolver9Tests from "./sudoku-solver.spec";

describe("Sudoku Tests", () => {
    describe("Sudoku getSortedRemaining Tests", getSortedRemainingTests);
    describe("Sudoku getSectionNumber Tests", getSectionNumberTests);
    describe("Sudoku Solver9 tests", sudokuSolver9Tests);
})