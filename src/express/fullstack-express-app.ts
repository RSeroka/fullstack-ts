

import type { Board9 } from '../sudoku/board';
import SudokuSolver9 from '../sudoku/sudoku-solver';
import { basicDealerHitsOnSoft17Strategy, basicDealerStandsOnSoft17Strategy } from '../blackjack/strategies/basic-strategy';
import { PlayManyHandsParams } from '../blackjack/interface-types/rest-api';
import { defaultHouseRules } from "../blackjack/play/default-house-rules";
import ExpressApp from './express-app';
import TablePlay from '../blackjack/deal/table-play';
import typia from 'typia';


export default class FullStackExpressApp extends ExpressApp {


    public constructor() {
        super("Richard Seroka Fullstack", [{folderName: './dist/client/build'}]);


        super.expressApp.post('/sudoku/solve', (req, res) => {

            const board = req.body as Board9;
            const solver = new SudokuSolver9(board);
            if (solver.solve()) {
                res.json({board: board, history: solver.history});
            }
            else {
                res.status(400).json({error: -1, errormsg: "input board not solvable"});
            }

        });


        /**
         * response is type Array<Strategy>
         */
        super.expressApp.get('/blackjack/strategies', (req, res) => {
            res.json([basicDealerHitsOnSoft17Strategy, basicDealerStandsOnSoft17Strategy]);
        });

        /**
         * success response is type Strategy
         * error response is type { error: number, errormsg: string }
         */
        super.expressApp.get('/blackjack/strategies/:strategyId', (req, res) => {
            console.log (`get strategies ${req.params.strategyId}`);
            const id = req.params.strategyId;
            if (id === basicDealerHitsOnSoft17Strategy.id) {
                res.json(basicDealerHitsOnSoft17Strategy);
            }
            else if (id === basicDealerStandsOnSoft17Strategy.id) {
                res.json(basicDealerStandsOnSoft17Strategy);
            }
            else {
                res.status(404).json({error: -1, errormsg: `Id ${id} is not valid strategy Id`});
            }
        });

        /**
         * response is type Array<HouseRules>
         */
        super.expressApp.get('/blackjack/houserules', (req, res) => {
            res.json([defaultHouseRules]);
        });

        /**
         * success response is type HouseRules
         * error response is type { error: number, errormsg: string }
         */
        super.expressApp.get('/blackjack/houserules/:houseRulesId', (req, res) => {
            const id = req.params.houseRulesId;
            if (id === defaultHouseRules.id) {
                res.json(defaultHouseRules);
            }
            else {
                res.status(404).json({error: -1, errormsg: `Id ${id} is not valid house rules Id`});
            }
        });




        /**
         * POST parameters are PlayManyHandsParams
         * Response is Array<StrategyResults>
         */
        super.expressApp.post("/blackjack/playmanyhands", (req, res) => {
            const validateParams = typia.createValidate<PlayManyHandsParams>();
            // validate 
            const reqParams = req.body;
            const validationResults = validateParams(reqParams);
            if (validationResults.success) {
                const params = validationResults.data; // reqParams as PlayManyHandsParams;

                const tablePlay = new TablePlay([params.playerStrategy], params.houseRulesOverride);
                tablePlay.dealHands(params.numHands);
    
                res.json(tablePlay.strategyResults);
            }
            else {
                res.status(404).json(validationResults.errors);
            }
            

        });

    }

}






