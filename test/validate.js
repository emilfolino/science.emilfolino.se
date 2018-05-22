/* global it describe before */

process.env.NODE_ENV = 'test';

//Require the dev-dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app.js');

chai.should();

const db = require("../db/database.js");

chai.use(chaiHttp);

describe('validate', () => {
    before(() => {
        db.run("DELETE FROM validate", (err) => {
            if (err) {
                console.log("Could not empty test DB table products", err.message);
            }
        });
    });

    describe('GET /validate', () => {
        it('should get 200 with empty array of validates', (done) => {
            chai.request(server)
                .get("/validate")
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an("object");
                    res.body.data.should.be.an("array");
                    res.body.data.length.should.be.equal(0);

                    done();
                });
        });
    });

    describe('POST /product', () => {
        it('should get 500 as we do not provide aakronym', (done) => {
            let validate = {
                // aakronym: "6af120f0cbf2015d782ae631c64cbf73",
                kmom: 1,
                number_of_errors: 12
            };

            chai.request(server)
                .post("/validate")
                .send(validate)
                .end((err, res) => {
                    res.should.have.status(500);
                    res.body.should.be.an("object");
                    res.body.should.have.property("errors");
                    res.body.errors.should.have.property("status");
                    res.body.errors.status.should.be.equal(500);
                    res.body.errors.should.have.property("detail");

                    done();
                });
        });

        it('should get 500 as we do not provide kmom', (done) => {
            let validate = {
                aakronym: "6af120f0cbf2015d782ae631c64cbf73",
                // kmom: 1,
                number_of_errors: 12
            };

            chai.request(server)
                .post("/validate")
                .send(validate)
                .end((err, res) => {
                    res.should.have.status(500);
                    res.body.should.be.an("object");
                    res.body.should.have.property("errors");
                    res.body.errors.should.have.property("status");
                    res.body.errors.status.should.be.equal(500);
                    res.body.errors.should.have.property("detail");

                    done();
                });
        });

        it('should get 500 as we do not provide number_of_errors', (done) => {
            let validate = {
                aakronym: "6af120f0cbf2015d782ae631c64cbf73",
                kmom: 1,
                // number_of_errors: 12
            };

            chai.request(server)
                .post("/validate")
                .send(validate)
                .end((err, res) => {
                    res.should.have.status(500);
                    res.body.should.be.an("object");
                    res.body.should.have.property("errors");
                    res.body.errors.should.have.property("status");
                    res.body.errors.status.should.be.equal(500);
                    res.body.errors.should.have.property("detail");

                    done();
                });
        });

        it('should get 201 as we do create new validate', (done) => {
            let validate = {
                aakronym: "6af120f0cbf2015d782ae631c64cbf73",
                kmom: 1,
                number_of_errors: 12
            };

            chai.request(server)
                .post("/validate")
                .send(validate)
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.an("object");
                    res.body.should.have.property("data");

                    done();
                });
        });

        it('should get 200 with array of 1 items', (done) => {
            chai.request(server)
                .get("/validate")
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an("object");
                    res.body.data.should.be.an("array");
                    res.body.data.length.should.be.equal(1);

                    done();
                });
        });
    });
});
