const express = require('express');
const app = express();
const Gtts = require('gtts');

app.get('/hear', function (req, res) {
  const gtts = new Gtts(req.query.text, req.query.lang);
  gtts.stream().pipe(res);
});

app.listen(process.env.PORT|| 3000, function () {
  console.log(`Open url to hear Hallelujah http://localhost:${process.env.PORT|| 3000}/hear?lang=en&text=Hallelujah`);
});
