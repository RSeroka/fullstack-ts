

import type { Board9 } from '../sudoku/board';
import SudokuSolver9 from '../sudoku/sudoku-solver';
import ExpressApp from './express-app';


export default class SudokuExpressApp extends ExpressApp {


    public constructor() {
        super("Sudoku");

        super.expressApp.post('/solve', (req, res) => {

            const board = req.body as Board9;
            const solver = new SudokuSolver9(board);
            if (solver.solve()) {
                res.json(board);
            }
            else {
                res.status(400).json({error: -1, errormsg: "input board not solvable"});
            }

        });


    }

}






