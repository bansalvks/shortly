'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../app');
const common = require('../../utils/common');

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

describe('redirect test', function () {
    let shortUrl = '';
    // step 1. create a short url
    it('it should give short url', function (done) {
        chai.request(server)
            .post('/api/url/shortify')
            .set('content-type', 'application/json')
            .send({ url: urls[0] })
            .then(res => {
                res.should.have.status(200);
                res.body.should.have.property('shortedUrl');
                shortUrl = res.body.shortedUrl;
                done();
            });
    });

    // step 2. get the details of the short url
    it('it should redirect to the orignal url', function (done) {
        const hash = shortUrl.substr(shortUrl.lastIndexOf('/') + 1);
        chai.request(server)
            .get('/' + hash)
            .redirects(0)
            .send()
            .then(res => {
                // check redirection status code
                res.should.have.status(302);
                // match the hash of the redirected url with the target url
                const redirectedToHash = common.hashUrl(res.header.location);
                hash.should.be.eql(redirectedToHash);
                done();
            });
    });
});