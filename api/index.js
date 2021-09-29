const express = require('express')
const app = express()
const Gtts = require('gtts')
const bodyParser = require('body-parser')
const { v4 } = require('uuid')
const fs = require('fs')
const path = require('path')
var PublicFodder = "../public"
if(!fs.existsSync(PublicFodder)){
    fs.mkdirSync(PublicFodder, 0766, function(err){
        if(err){
            console.log(err);
        }
    });
}
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname,PublicFodder)))

app.post('/api/hear', function (req, res) {
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
  const pathTofile = path.join(__dirname,PublicFodder, './' + fileName)
  gtts.save(pathTofile, (err, result) => {
    if (err) {
      fs.unlinkSync(pathTofile)
      res.json({ success: false, message: 'server has some error' })
    }
    res.sendFile(pathTofile)
    res.setHeader({
      fileName,
    })
    // fs.unlinkSync(fileName)
  })
})
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
app.post('/api/delete', (req, res) => {
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

app.listen(process.env.PORT || 3000, function () {
  console.log(
    `Open url to hear Hallelujah http://localhost:${
      process.env.PORT || 3000
    }/hear`,
  )
})
