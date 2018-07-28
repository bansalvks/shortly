const config = require('./config');
const mongoose = require('mongoose');

const { db: { host, port, name } } = config;

const connectionString = `mongodb://${host}:${port}/${name}`;
mongoose.connect(connectionString);
