'use strict';
const mongoose = require('mongoose');

module.exports = {
    init(config) {
        return new Promise((resolve, reject) => {
            const { db: { host, port, name } } = config;
            const connectionString = `mongodb://${host}:${port}/${name}`;
            mongoose.connect(connectionString);
            var db = mongoose.connection;
            db.on('error', (error) => {
                reject(error);
                console.error('mongod connection error:');
            });
            db.once('open', function callback() {
                console.log('mongo is connected');
                resolve();
            });
        });
    }
};