const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const should = chai.should();
const expect = chai.expect;

chai.use(chaiHttp);

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