const { v4 } = require('uuid');
const uuid = () => {
    return v4()
}

module.exports = {
    uuid
}