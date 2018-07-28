const express = require('express');
const router = express.Router();

const path = "url/shortify";

router.post(path, function (req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
});

module.exports = router;