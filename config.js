'use strict';
const env = process.env.SHORTY_ENV || 'dev';

const configs = {
    dev: {
        app: {
            port: 3000
        },
        db: {
            host: 'localhost',
            port: 27017,
            name: 'shortly'
        },
        appHost: 'http://localhost:3000'
    },
    prod: {
        app: {
            port: 3900
        },
        db: {
            host: 'localhost',
            port: 27017,
            name: 'shortly'
        },
        appHost: 'http://localhost:3000'

    }
};

module.exports = configs[env];
