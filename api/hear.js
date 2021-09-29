const express = require("express")
const router = express.Router()

const Gtts = require('gtts')

const { v4 } = require('uuid')

const path = require('path')

const fs = require('fs')

var PublicFodder = "../public"

router.post('/',function (req, res) {
  var lang = req.body.lang || 'vi'
  var text = req.body.text
  if (!text) {
    return res.json({
      success: false,
      message: 'you must to type the text for use',
    })
  }
  const gtts = new Gtts(text, lang)
  var fileName = v4() + 'output.mp4'
  const pathToFile = path.join(__dirname,PublicFodder, './' + fileName)
  gtts.save(pathToFile, (err, result) => {
    if (err) {
      fs.unlinkSync(pathToFile)
      res.json({ success: false, message: 'server has some error' })
    }
    res.sendFile(pathToFile)
    res.set({
      fileName,
    })
    // fs.unlinkSync(fileName)
  })
})
module.exports = router