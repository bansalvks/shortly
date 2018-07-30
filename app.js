'use strict';
const config = require('./config');
const express = require('express');
const bodyParser = require('body-parser');

// initialize mongodb
require('./utils/db.v1').init(config);

// initialize express
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// initalize controllers
require('./controllers/index')(app);
require('./middleware/index')(app);

// start server
const server = app.listen(config.app.port, function () {
    console.info('Magic is happeing at http://localhost:' + config.app.port);
});

// export server for unit testing
module.exports = server;