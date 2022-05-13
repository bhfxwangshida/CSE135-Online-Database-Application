const express = require('express')
const app = express()
const port = 3001

var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false })

var mongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

/*app.get('/static', (req, res) => {
  mongoClient.connect(url, (err, db) => {
    if (err) throw err;
    var dbo = db.db("hw3");
    var whereStr = {"cookieID":req.query.cookieID};
    console.log(req.query.cookieID);
    dbo.collection("static").find(whereStr).toArray(function(err, result) {
      if (err) throw err;
      console.log(result);
      var response = {
        "cookieID":req.query.cookieID,
        "language":result[0].language
      };
      db.close();
      res.end(JSON.stringify(response));
    });
  });
})*/

app.get('/static/:cookieid', (req, res) => {
  mongoClient.connect(url, (err, db) => {
    if (err) throw err;
    var dbo = db.db("hw3");
    dbo.collection("customers").findOne({
      cookieID: cookieid
    },
    function(err, result) {
      if (err) throw err;
      res.json(result);
      db.close();
    });
  });
})

app.post('/static', urlencodedParser, function (req, res) {
  console.log(req.cookieID);
  mongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db("hw3");
      var staticinfo = { cookieID: req.body.cookieID, language: req.body.language, img_enable: req.body.img_enable,
      cookie_enable: req.body.cookie_enable, user_agent: req.body.user_agent, user_screen_height: req.body.user_screen_height,
      user_screen_width: req.body.user_screen_width, user_window_height: req.body.user_window_height,
      user_window_width: req.body.user_window_width, user_conn_type: req.body.user_conn_type};
      dbo.collection("static").insertOne(staticinfo, function(err, result) {
          if (err) throw err;
          var response = {
            "cookieID":req.body.cookieID,
            "language":req.body.language,
            "result":result
          };
          db.close();
          res.end(JSON.stringify(response));
      });
  });
})

app.post('/performance', urlencodedParser, function (req, res) {
  console.log(req.cookieID);
  mongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db("hw3");
      var performanceinfo = { cookieID: req.body.cookieID, timing_obj: req.body.timing_obj, start_time: req.body.start_time,
      end_time: req.body.end_time, load_time: req.body.load_time};
      dbo.collection("performance").insertOne(performanceinfo, function(err, result) {
          if (err) throw err;
          var response = {
            "cookieID":req.body.cookieID,
            "load_time":req.body.load_time,
            "result":result
          };
          db.close();
          res.end(JSON.stringify(response));
      });
  });
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})