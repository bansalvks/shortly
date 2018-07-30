'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../app');

chai.should();
chai.use(chaiHttp);

describe('enshorting url test', function () {

    // below urls must give same shorted url
    const urls = [
        'google.com',
        'www.google.com',
        'http://google.com',
        'http://www.google.com',
        'https://google.com',
        'https://www.google.com'];

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