'use strict';
const shortifyController = require('./shortify.v1');
const statsController = require('./stats.v1');
const healthController = require('./health');

module.exports = app => {
    app.use('/api', shortifyController);
    app.use('/api', statsController);
    app.use('/api', healthController);
};
