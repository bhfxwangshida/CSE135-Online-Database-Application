const express = require('express')
const app = express()
const port = 3000

var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.get('/get/demo', (req, res) => {
  var response = {
    "first_name":req.query.first_name,
    "last_name":req.query.last_name
};
res.end(JSON.stringify(response));
})

app.post('/api/static/language', urlencodedParser, function (req, res) {
 
    var response = {
        "first_name":req.body.first_name,
        "language":req.body.language
    };
    res.end(JSON.stringify(response));
 })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})