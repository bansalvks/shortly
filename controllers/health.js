'use strict';
const express = require('express');
const router = express.Router();
const path = '/health-checkup';

router.get(path, async function (req, res) {
    try {
        res.json({ status: 'up' });
    } catch (err) {
        res.status(err.code).json(err);
    }
});

module.exports = router;
