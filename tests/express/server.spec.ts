

import type * as core from 'express-serve-static-core';
import chai from 'chai';
import {  assert, should } from 'chai';
import chaiHttp from 'chai-http';
import SudokuExpressApp from '../../src/express/sudoku-express-app';
import { after, before } from 'mocha';


chai.use(chaiHttp);

describe('Sudoku Express App', () => {
    let sudokuExpressApp: SudokuExpressApp;
    let server: core.Express;

    before((done) => {
        sudokuExpressApp = new SudokuExpressApp();
        server = sudokuExpressApp.expressApp; 
        // setTimeout(() => {
        //     done();
        // }, 1000);  // TODO REMOVE ME
        done();
    })

    describe('test echo route', () => {
        it('it should have added:true and provided property', (done) => {
            chai.request(server)
                .post('/echo')
                .send({'echoTest': 1})
                .end( (err, res) => {
                    assert.equal(res.status, 200, "echo response status is not 200"); // should.have.status(200);
                    assert.equal(res.type, "application/json", "echo response type is not application/json");
                    const respContent: {echoTest: number, added: boolean} = res.body;
                    assert.isTrue(respContent.hasOwnProperty('added'), "echo response does not include added property");
                    assert.isTrue(respContent.hasOwnProperty('echoTest'), "echo response does not include provided property");
                    assert.equal(respContent.added, true, "echo response added property is not true");
                    assert.equal(respContent.echoTest, 1, "echo response provided property not same");
                    done();
                });
        })
    });

    describe('test valid input', () => {
        it('valid input', (done) => {
            const input = [
                ["5","3",".",".","7",".",".",".","."],
                ["6",".",".","1","9","5",".",".","."],
                [".","9","8",".",".",".",".","6","."],
                ["8",".",".",".","6",".",".",".","3"],
                ["4",".",".","8",".","3",".",".","1"],
                ["7",".",".",".","2",".",".",".","6"],
                [".","6",".",".",".",".","2","8","."],
                [".",".",".","4","1","9",".",".","5"],
                [".",".",".",".","8",".",".","7","9"]];
            const expectedResult = [
                    ["5","3","4","6","7","8","9","1","2"],
                    ["6","7","2","1","9","5","3","4","8"],
                    ["1","9","8","3","4","2","5","6","7"],
                    ["8","5","9","7","6","1","4","2","3"],
                    ["4","2","6","8","5","3","7","9","1"],
                    ["7","1","3","9","2","4","8","5","6"],
                    ["9","6","1","5","3","7","2","8","4"],
                    ["2","8","7","4","1","9","6","3","5"],
                    ["3","4","5","2","8","6","1","7","9"]];
            chai.request(server)
                .post('/solve')
                .send(input)
                .end( (err, res) => {
                    assert.equal(res.status, 200, "solve response status is not 200"); // should.have.status(200);
                    assert.equal(res.type, "application/json", "solve response type is not application/json");
                    const respContent = res.body;
                    assert.deepEqual(respContent, expectedResult, "solve response content not expected");
                    done();
                });
        });
    });

    after(() => {
        sudokuExpressApp.shutdown();
    });

});