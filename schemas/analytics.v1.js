'use strict';
let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let analyticsTypes = ['create', 'access'];

let analyticsSchema = new Schema({
    type: { type: String, enum: analyticsTypes },
    ip: String,
    host: String,
    origin: String,
    referer: String,
    userAgent: String,
    timeStamp: { type: Date, default: Date.now },
    isIpad: String,
    isAndroid: String,
    urlHash: String
});

module.exports = {
    schema: mongoose.model('analytics', analyticsSchema),
    analyticsTypes
};