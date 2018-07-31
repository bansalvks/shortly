'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../app');

// const expect = chai.expect;

chai.should();
chai.use(chaiHttp);

// below urls must give same shorted url
const urls = [
    'google.com',
    'www.google.com',
    'http://google.com',
    'http://www.google.com',
    'https://google.com',
    'https://www.google.com'];

describe('stats test', function () {
    // step 1. create a short url
    it('it should give short url', function (done) {
        chai.request(server)
            .post('/api/url/shortify')
            .set('content-type', 'application/json')
            .send({ url: urls[0] })
            .then(res => {
                res.should.have.status(200);
                res.body.should.have.property('shortedUrl');
                done();
            });
    });

    // step 2. get the stats of the short url
    it('it should get stats of the short url', function (done) {
        chai.request(server)
            .post('/api/url/stats')
            .set('content-type', 'application/json')
            .send({ url: urls[0] })
            .then(res => {
                res.body.should.be.an('array');
                res.should.have.status(200);
                done();
            });
    });
});