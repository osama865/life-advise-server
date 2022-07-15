const { random_advice , multiple_advice } = require("../services/advice.services")

// controllers for advice routes
const random = async (req, res) => {
    try {
        const advice = await random_advice()
        res.send(advice)
    } catch (error) {
        console.log(error)
        res.send(error)
    }
}

const multiple = async (req, res) => {
    const filter = req.body.filter
    const options = req.body.options

    console.log("multiple controller" , filter, options);
    try {
        const data = await multiple_advice(filter , options)
        res.send(data)
    } catch (error) {
        console.log(error)
        res.send(error)
    }
}

const root = async (req, res) => {
    console.log('Hello From root!')
}

const notFound = async (req, res) => {
    res.sendStatus(404)
}

module.exports = {
    controllers: {
        random,
        multiple,
        root,
        notFound
    }

}