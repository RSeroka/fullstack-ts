

import chai, { assert } from 'chai';
import chaiHttp from 'chai-http';
import type * as core from 'express-serve-static-core';
import { after, before } from 'mocha';
import FullStackExpressApp from '../../src/express/fullstack-express-app';


chai.use(chaiHttp);

describe('Sudoku Express App', () => {
    let sudokuExpressApp: FullStackExpressApp;
    let server: core.Express;

    before((done) => {
        sudokuExpressApp = new FullStackExpressApp();
        server = sudokuExpressApp.expressApp;
        // setTimeout(() => {
        //     done();
        // }, 1000);  // TODO REMOVE ME
        done();
    })



    describe('test valid input', () => {
        it('valid input', (done) => {
            const input = [
                ["5", "3", ".", ".", "7", ".", ".", ".", "."],
                ["6", ".", ".", "1", "9", "5", ".", ".", "."],
                [".", "9", "8", ".", ".", ".", ".", "6", "."],
                ["8", ".", ".", ".", "6", ".", ".", ".", "3"],
                ["4", ".", ".", "8", ".", "3", ".", ".", "1"],
                ["7", ".", ".", ".", "2", ".", ".", ".", "6"],
                [".", "6", ".", ".", ".", ".", "2", "8", "."],
                [".", ".", ".", "4", "1", "9", ".", ".", "5"],
                [".", ".", ".", ".", "8", ".", ".", "7", "9"]];
            const expectedResult = [
                ["5", "3", "4", "6", "7", "8", "9", "1", "2"],
                ["6", "7", "2", "1", "9", "5", "3", "4", "8"],
                ["1", "9", "8", "3", "4", "2", "5", "6", "7"],
                ["8", "5", "9", "7", "6", "1", "4", "2", "3"],
                ["4", "2", "6", "8", "5", "3", "7", "9", "1"],
                ["7", "1", "3", "9", "2", "4", "8", "5", "6"],
                ["9", "6", "1", "5", "3", "7", "2", "8", "4"],
                ["2", "8", "7", "4", "1", "9", "6", "3", "5"],
                ["3", "4", "5", "2", "8", "6", "1", "7", "9"]];
            chai.request(server)
                .post('/sudoku/solve')
                .send(input)
                .end((err, res) => {
                    assert.equal(res.status, 200, "solve response status is not 200"); // should.have.status(200);
                    assert.equal(res.type, "application/json", "solve response type is not application/json");
                    const respContent = res.body;
                    assert.deepEqual(respContent.board, expectedResult, "solve response content not expected");
                    done();
                });
        });
    });

    after(() => {
        sudokuExpressApp.shutdown();
    });

});