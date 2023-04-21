
import type * as core from 'express-serve-static-core';
import express from 'express';
import SudokuSolver9 from '../sudoku/sudoku-solver';
import type { Board9 } from '../sudoku/board';
import type { Server } from 'http';

export default class SudokuExpressApp {
    private app: core.Express; 
    private server: Server;
    private port: number;
    private static readonly DEFAULT_PORT = 8080;

    public constructor(port?: number) {
        if (port === undefined) {
            this.port = SudokuExpressApp.DEFAULT_PORT;
        }
        else {
            this.port = port;
        }

        this.app = express();

        this.app.use(express.json());

        this.app.get('/', (req, res) => res.send('This is the sudoku-ts web app'));

        this.app.post('/echo', (req, res) => {
            console.log('echo being called');
            res.json({...req.body,...{"added": true}});
        });

        this.app.post('/solve', (req, res) => {

            const board: Board9 = [
                ["5","3",".",".","7",".",".",".","."],
                ["6",".",".","1","9","5",".",".","."],
                [".","9","8",".",".",".",".","6","."],
                ["8",".",".",".","6",".",".",".","3"],
                ["4",".",".","8",".","3",".",".","1"],
                ["7",".",".",".","2",".",".",".","6"],
                [".","6",".",".",".",".","2","8","."],
                [".",".",".","4","1","9",".",".","5"],
                [".",".",".",".","8",".",".","7","9"]];
            const solver = new SudokuSolver9(board);
            solver.solve();
            res.json(board);
        });

        this.server = this.app.listen(this.port, () => console.log(`Sudoku app listening on port ${this.port}!`));
    }


 
    public get expressApp() : core.Express {
        return this.app;
    }

    public shutdown() {
        this.server.close(() => `Sudoku app closing HTTP server on port ${this.port}`);
    }
    


}






