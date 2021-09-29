const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const fs = require('fs')
const path = require('path')
var indexRouter = require("./api")
var hear = require("./api/hear")
var DeleteRouter = require("./api/delete")
var PublicFodder = "./public"
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
app.use(express.static(path.join(__dirname, PublicFodder)))

app.use("/test",indexRouter)

app.use('/api/hear',hear)

app.use('/api/delete', DeleteRouter)

app.listen(process.env.PORT || 3000, function () {
  console.log(
    `Open url to hear Hallelujah http://localhost:${
      process.env.PORT || 3000
    }/hear`,
  )
})
