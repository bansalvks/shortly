'use strict';
const schema = require('../schemas/urls');

const addUrl = async data => {
    try {
        const record = new schema(data);

        return await record.save();
    } catch (error) {
        throw {
            code: 500,
            message: error.message
        };
    }
};

const find = async data => {
    try {
        const result = await schema.findOne(data);

        return result;
    } catch (error) {
        throw {
            code: 500,
            message: error.message
        };
    }
};

const remove = async data => {
    try {
        const result = await schema.remove(data);
        return result;
    } catch (error) {
        throw {
            code: 500,
            message: error.message
        };
    }
}

module.exports = {
    addUrl,
    find,
    remove
};