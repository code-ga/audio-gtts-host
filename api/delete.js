const express = require("express")
const router = express.Router()
const fs = require('fs')
const path = require('path')


var PublicFodder = "../public"

const searchFile = (Filename) => {
  const FileServer = fs.readdirSync(path.join(__dirname,PublicFodder))
  var result = false
  for (let index = 0; index < FileServer.length; index++) {
    const element = FileServer[index];
    if (String(Filename) == String(element)) {
      result = true
    }
  }
  return result
}

router.post('/',(req, res) => {
  const fileName = req.body.filename
  if (!fileName) {
    res.json({ success: false, message: 'filename is require' })
  }
  if (!searchFile(fileName)) {
    return res.json({success:false,message:`don't have file to delete`})
  }
  const pathToFile = path.join(__dirname,PublicFodder, './' + fileName)
  fs.unlinkSync(pathToFile)
  res.json({ success: true, message: `${fileName} is delete success` })
})
module.exports = router