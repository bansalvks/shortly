'use strict';
const shortifyManager = require('../managers/shortify.v1');

module.exports = app => {
    app.get('/:hash', async function (req, res) {
        try {
            const hash = req.params.hash;
            const response = await shortifyManager.redirectUrl(hash);
            res.redirect(response);
        } catch (err) {
            res.status(err.code).json(err);
        }
    });
};
