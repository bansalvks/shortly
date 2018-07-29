'use strict';
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let urlSchema = new Schema({
    hash: String,
    urlPath: String,
    protocol: String,
    timeStamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('urls', urlSchema);