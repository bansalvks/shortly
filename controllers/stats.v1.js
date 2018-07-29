'use strict';
const express = require('express');
const router = express.Router();
const path = '/url/stats';

const analyticsManager = require('../managers/analyticsManager.v1');

router.post(path + '/', async function (req, res) {
    try {
        const url = req.body.url;
        const response = await analyticsManager.urlStats(url);
        res.json(response);
    } catch (err) {
        res.status(err.code).json(err);
    }
});

module.exports = router;
