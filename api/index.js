const express = require("express")
const router = express.Router()

router.get('/',(req, res) => {
  res.json({
    serverStatus: "tritranduc audio host is running"})
})
module.exports = router