'use strict';
const shortifyController = require('./shortify.v1');
const statsController = require('./stats.v1');

module.exports = app => {
    app.use('/api', shortifyController);
    app.use('/api', statsController);
};
