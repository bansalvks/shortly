'use strict';
const shortifyManager = require('../managers/shortify.v1');

module.exports = app => {
    app.get('/:hash', async function (req, res) {
        try {
            const response = await shortifyManager.redirectUrl(req);
            res.redirect(response);
        } catch (err) {
            res.status(err.code).json(err);
        }
    });
};
