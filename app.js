'use strict';
const config = require('./config');
const express = require('express');
const bodyParser = require('body-parser');

const db = require('./utils/db.v1');

async function init() {
    try {
        await db.init(config);

        const app = express();

        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(bodyParser.json());

        require('./controllers/index')(app);
        require('./middleware/index')(app);

        await app.listen(config.app.port);
        console.log('Magic is happeing at http://localhost:' + config.app.port);
    } catch (error) {
        console.error('fatal error:', error);
    }
}

init();