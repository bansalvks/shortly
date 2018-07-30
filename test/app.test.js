'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');

chai.should();
chai.use(chaiHttp);

describe('app initial tests', function () {
    it('should check if the server is up', function (done) {
        chai.request(server)
            .get('/api/health-checkup')
            .end(function (err, res) {
                res.should.have.status(200);
                res.body.should.have.property('status');
                res.body.status.should.equal('up');
                done();
            });
    });
});