const router = require("express").Router();
const {find} = require("../controllers/index.js")

router.get('/datas', find)

module.exports = router