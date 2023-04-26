
import type * as core from 'express-serve-static-core';
import express from 'express';
import SudokuSolver9 from '../sudoku/sudoku-solver';
import type { Board9 } from '../sudoku/board';
import type { Server } from 'http';

export default class SudokuExpressApp {
    private app: core.Express; 
    private server: Server | undefined;
    private httpPort: number | undefined;
    private static readonly DEFAULT_PORT = 8080;

    public constructor() {


        this.app = express();

        this.app.use(express.json());

        this.app.get('/', (req, res) => res.send('This is the sudoku-ts web app'));

        this.app.post('/echo', (req, res) => {
            res.json({...req.body,...{"added": true}});
        });

        this.app.post('/solve', (req, res) => {

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


 
    public get expressApp() : core.Express {
        return this.app;
    }

    public startHttpServer(port?: number) {
        if (this.server === undefined) {
            if (port === undefined) {
                this.httpPort = SudokuExpressApp.DEFAULT_PORT;
            }
            else {
                this.httpPort = port;
            }

            this.server = this.app.listen(this.httpPort, () => console.log(`Sudoku app listening on port ${this.httpPort}!`));
        }
    }

    public shutdown() {
        if (this.server !== undefined) {
            console.log(`Sudoku app shutting down HTTP server on port ${this.httpPort}`)
            this.server.close(() => `Sudoku app closed HTTP server on port ${this.httpPort}`);
        }
    }
    


}






