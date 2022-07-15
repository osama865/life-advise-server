const Advice = require("../models/advice.schema");
require("../models")


const random_advice = async () => {
    try {
        const result = await Advice.aggregate([
            { $sample: { size: 1 } }
        ])
        return result[0];
    } catch (error) {
        console.log(error);
        return error;
    }
}

const multiple_advice = async (filter = {} , options = {}) => {
    try {
        const result = await Advice.find(filter, null , options)
        return result;
    } catch (error) {
        console.log(error);
        return error;
    }
}


module.exports = {
    random_advice,
    multiple_advice,
}