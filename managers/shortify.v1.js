'use strict';
const validUrl = require('valid-url');
const URL = require('url');
const md5 = require('md5');
const shortfyService = require('../services/shortfy.v1');
const config = require('../config');
const analyticsService = require('../services/analytics.v1');

const removeWWW = url => {
    if (url.startsWith('www.')) {
        return url.replace('www.', '');
    }

    return url;
};

const isValidUri = url => {
    if (!url.startsWith('http://') || url.startsWith('https://')) {
        url = 'http://' + url;
    }

    return validUrl.isUri(url);
};

const enshort = async (req) => {
    const url = req.body.url;

    if (url && typeof url === 'string' && url.length > 0 && isValidUri(url)) {
        const parsedUrl = URL.parse(url);

        const urlPath = (parsedUrl.host || '') + parsedUrl.path;
        const hashTarget = removeWWW(urlPath).replace(/\/+$/, ''); // remove www and trailing slashes
        const hash = md5(hashTarget);

        const data = {
            hash,
            urlPath,
            protocol: parsedUrl.protocol
        };

        let record = await find(hash);

        if (!record || !record.urlPath) {
            record = await shortfyService.addUrl(data);
        }

        const shortedUrl = config.appHost + '/' + hash;

        // add analytics
        analyticsService.log(req, analyticsService.analyticsTypes[0], hash);

        return { shortedUrl };
    } else {
        throw {
            code: 422,
            message: 'Invalid Url'
        };
    }
};

const find = async (hash) => {
    if (hash && typeof hash === 'string' && hash.length > 0) {
        const data = {
            hash
        };

        const response = await shortfyService.find(data);
        if (response) {
            delete response._doc.__v;
            delete response._doc._id;
        }

        return response && response.toJSON();
    } else {
        throw {
            code: 422,
            message: 'Invalid Url'
        };
    }
};

const redirectUrl = async (req) => {
    const hash = req.params.hash;

    if (hash && typeof hash === 'string' && hash.length > 0) {
        const data = {
            hash
        };

        const response = await shortfyService.find(data);
        if (response) {
            const url = (response.protocol || 'http:') + '//' + response.urlPath;

            // add analytics
            analyticsService.log(req, analyticsService.analyticsTypes[1], hash);

            return url;
        } else {
            throw {
                code: 421,
                message: 'No mapped url'
            };
        }
    } else {
        throw {
            code: 422,
            message: 'Invalid Url'
        };
    }
};

module.exports = {
    enshort,
    find,
    redirectUrl
};