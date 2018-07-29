'use strict';
const shortifyController = require('./shortify.v1');

module.exports = app => {
    app.use('/api', shortifyController);
};
