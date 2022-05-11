const express = require('express')
const app = express()
const port = 3000

var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false })

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017";

app.get('/get/language', (req, res) => {
  MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db("hw3");
      var whereStr = {"session":req.body.session};
      console.log(req.body.session);
      dbo.collection("static").find(whereStr).toArray(function(err, result) {
        if (err) throw err;
        console.log(result);
        db.close();
    });
  });
    var response = {
        "session":req.query.session,
        "language":result
    };
    res.end(JSON.stringify(response));

})


app.post('/api/static/language', urlencodedParser, function (req, res) {
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("hw3");
        var lango = { session: req.body.session, url: req.body.language };
        dbo.collection("static").insertOne(lango, function(err, res) {
            if (err) throw err;
            db.close();
        });
    });

    var response = {
        "session":req.body.session,
        "language":req.body.language,
        "result":"success"
    };

    res.end(JSON.stringify(response));
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})