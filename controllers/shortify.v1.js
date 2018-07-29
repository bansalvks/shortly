'use strict';
const express = require('express');
const router = express.Router();
const path = '/url/shortify';

const shortifyManager = require('../managers/shortify.v1');

router.post(path, async function (req, res) {
    try {
        const response = await shortifyManager.enshort(req);
        res.json(response);
    } catch (err) {
        res.status(err.code).json(err);
    }
});

router.get(path + '/', async function (req, res) {
    try {
        const url = req.query.url;
        const response = await shortifyManager.find(url);
        res.json(response);
    } catch (err) {
        res.status(err.code).json(err);
    }
});

module.exports = router;
