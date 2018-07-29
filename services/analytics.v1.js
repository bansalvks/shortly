'use strict';
let { analyticsTypes, schema } = require('../schemas/analytics.v1');

const log = async (req, type, urlHash) => {
    try {
        let isIpad = !!req.headers['user-agent'].match(/iPad/);
        let isAndroid = !!req.headers['user-agent'].match(/Android/);

        let data = {
            type,
            ip: req.headers['cf-connecting-ip'] || req.headers['x-forwarded-for'] || req.connection.remoteAddress,
            host: req.headers.host,
            origin: req.headers.origin,
            referer: req.headers.referrer || req.headers.referer,
            userAgent: req.headers['user-agent'],
            isIpad,
            isAndroid,
            urlHash
        };

        const record = new schema(data);

        return await record.save();
    } catch (error) {
        console.error(error);
    }
};

module.exports = {
    log,
    analyticsTypes
};