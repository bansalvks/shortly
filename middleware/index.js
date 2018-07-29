'use strict';
const redirectorMiddleware = require('./redirector.v1');

module.exports = app => {
    redirectorMiddleware(app);
};
