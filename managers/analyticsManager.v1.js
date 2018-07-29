'use strict';
const common = require('../utils/common');
const analyticsService = require('../services/analytics.v1');

const urlStats = async (url) => {
    if (url && typeof url === 'string' && url.length > 0 && common.isValidUri(url)) {
        const hash = common.hashUrl(url);

        return await analyticsService.urlStats(hash);
    } else {
        throw {
            code: 422,
            message: 'Invalid Url'
        };
    }
};

module.exports = {
    urlStats
};