'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var urlSchema = new Schema({
    hash: String,
    urlPath: String,
    protocol: String,
    timeStamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('urls', urlSchema);