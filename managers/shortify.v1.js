const validUrl = require('valid-url');
const URL = require('url');
const md5 = require('md5');
const shortfyService = require('../services/shortfy.v1');
const config = require('../config');

const removeWWW = url => {
    if (url.startsWith('www.')) {
        return url.replace('www.', '');
    }

    return url;
};

const enshort = async (url) => {
    if (url && typeof url === 'string' && url.length > 0 && validUrl.isUri(url)) {
        const parsedUrl = URL.parse(url);

        const urlPath = parsedUrl.host + parsedUrl.path;
        const hash = md5(removeWWW(urlPath));

        const data = {
            hash,
            urlPath,
            protocol: parsedUrl.protocol
        };

        const existingRecord = await find(hash);

        if (!existingRecord || !existingRecord.urlPath) {
            await shortfyService.addUrl(data);
        }

        const shortedUrl = config.appHost + '/' + hash;

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

const redirectUrl = async (hash) => {
    if (hash && typeof hash === 'string' && hash.length > 0) {
        const data = {
            hash
        };

        const response = await shortfyService.find(data);
        if (response) {
            const url = response.protocol + '//' + response.urlPath;
            return url;
        }
        else {
            throw {
                code: 421,
                message: 'No mapped url'
            }
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