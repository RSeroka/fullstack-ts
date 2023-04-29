

import chai, { assert } from 'chai';
import chaiHttp from 'chai-http';
import type * as core from 'express-serve-static-core';
import { after, before } from 'mocha';
import ExpressApp from '../../src/express/express-app';


chai.use(chaiHttp);

describe('Base Express App', () => {
    let expressApp: ExpressApp;
    let server: core.Express;

    before((done) => {
        expressApp = new ExpressApp();
        server = expressApp.expressApp;

        done();
    })

    describe('test echo route', () => {
        it('it should have added:true and provided property', (done) => {
            chai.request(server)
                .post('/echo')
                .send({ 'echoTest': 1 })
                .end((err, res) => {
                    assert.equal(res.status, 200, "echo response status is not 200"); // should.have.status(200);
                    assert.equal(res.type, "application/json", "echo response type is not application/json");
                    const respContent: { echoTest: number, added: boolean } = res.body;
                    assert.isTrue(respContent.hasOwnProperty('added'), "echo response does not include added property");
                    assert.isTrue(respContent.hasOwnProperty('echoTest'), "echo response does not include provided property");
                    assert.equal(respContent.added, true, "echo response added property is not true");
                    assert.equal(respContent.echoTest, 1, "echo response provided property not same");
                    done();
                });
        })
    });



    after(() => {
        expressApp.shutdown();
    });

});