'use strict';
const md5 = require('md5');
const URL = require('url');
const validUrl = require('valid-url');

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

const hashUrl = url => {
    const parsedUrl = URL.parse(url);
    const urlPath = (parsedUrl.host || '') + parsedUrl.path;
    const hashTarget = removeWWW(urlPath).replace(/\/+$/, ''); // remove www and trailing slashes
    const hash = md5(hashTarget);

    return hash;
};

module.exports = {
    isValidUri,
    removeWWW,
    hashUrl
};
