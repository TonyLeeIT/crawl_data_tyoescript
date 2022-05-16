const router = require("express").Router();

const test = require("./test");



router.use("/data", test);

module.exports = router;
