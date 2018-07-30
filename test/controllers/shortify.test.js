'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const { step } = require('mocha-steps');
const server = require('../../app');

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

describe('enshorting url test', function () {

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

    it('it should get the short url for a domain in different formats', function (done) {
        let promiseList = [];
        urls.forEach(url => {
            promiseList.push(
                chai.request(server)
                    .post('/api/url/shortify')
                    .set('content-type', 'application/json')
                    .send({ url })
            );
        });

        Promise.all(promiseList)
            .then(responses => {

                // making request to create short url of in all formats of a domain
                responses.forEach((res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('shortedUrl');
                });

                // checking if all short urls are same
                const allUrlSame = !!responses.reduce(function (a, b) {
                    return (a.body.shortedUrl === b.body.shortedUrl) ? a : NaN;
                });
                allUrlSame.should.equal(true);

                done();
            });
    });

    it('it should give error', function (done) {
        chai.request(server)
            .post('/api/url/shortify')
            .set('content-type', 'application/json')
            .send({ url: '' })
            .then(res => {
                res.should.have.status(422);
                res.body.should.have.property('code');
                res.body.should.have.property('message');
                done();
            });
    });
});

describe('delete url test', function () {

    // step 1: create a short url
    step('create a short url', function (done) {
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

    // step 2: delete the short url
    step('delete a short url', function (done) {
        chai.request(server)
            .delete('/api/url/shortify')
            .set('content-type', 'application/json')
            .send({ url: urls[0] })
            .then(res => {
                res.should.have.status(200);
                res.body.should.have.property('count');
                res.body.count.should.equal(1);
                done();
            });
    });


    // step 3: delete the same short url
    step('delete a non existing short url', function (done) {
        chai.request(server)
            .delete('/api/url/shortify')
            .set('content-type', 'application/json')
            .send({ url: urls[0] })
            .then(res => {
                res.should.have.status(200);
                res.body.should.have.property('count');
                res.body.count.should.equal(0);
                done();
            });
    });
});