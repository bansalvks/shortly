const urlSchema = require('../schemas/urls');

const addUrl = async data => {
    try {
        let record = new urlSchema(data);

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
        const result = await urlSchema.findOne(data);

        return result;
    } catch (error) {
        throw {
            code: 500,
            message: error.message
        };
    }
};

module.exports = {
    addUrl,
    find
};