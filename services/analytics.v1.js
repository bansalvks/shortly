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
            device: isIpad ? 'apple' : isAndroid ? 'android' : 'windows',
            urlHash
        };

        const record = new schema(data);

        return await record.save();
    } catch (error) {
        console.error(error);
    }
};

const urlStats = async (hash) => {
    try {
        const groupByType = await schema.aggregate(
            [
                { $match: { urlHash: hash } },

                {
                    $group: {
                        _id: { type: '$type' },
                        hits: { $sum: 1 },
                        userAgents: { $addToSet: '$userAgent' },
                        device: { $addToSet: '$device' },
                        ip: { $addToSet: '$ip' },
                        host: { $addToSet: '$host' },
                        origin: { $addToSet: '$origin' },
                        referer: { $addToSet: '$referer' }
                    }
                },

                {
                    $project: {
                        _id: 0,
                        type: '$_id.type',
                        hits: 1,
                        userAgents: 1,
                        device: 1,
                        ip: { $size: '$ip' },
                        host: { $size: '$host' },
                        origin: { $size: '$origin' },
                        referer: { $size: '$referer' }
                    }
                }
            ]
        );

        return groupByType;
    } catch (error) {
        throw {
            code: 500,
            message: error.message
        };
    }
};

module.exports = {
    log,
    analyticsTypes,
    urlStats
};