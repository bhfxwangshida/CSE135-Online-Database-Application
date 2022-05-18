const express = require('express')
const app = express()
const port = 3001

var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false })

var mongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId; 
var url = "mongodb+srv://adam:cse135Go@cluster0.e5yaj.mongodb.net/?retryWrites=true&w=majority";

app.get('/static', (req, res) => {
  mongoClient.connect(url, (err, db) => {
    if (err) throw err;
    var dbo = db.db("hw3");
    dbo.collection("static").find({}).toArray(function(err, result) {
      if (err) throw err;
      db.close();
      res.json(result);
    });
  });
})

app.get('/static/:id', (req, res) => {
  mongoClient.connect(url, (err, db) => {
    if (err) throw err;
    var dbo = db.db("hw3");
    var o_id = new ObjectId(req.params.id);
    dbo.collection("static").find(
      {_id : o_id}).toArray(
      function(err, result) {
        if (err) throw err;
        res.json(result);
        db.close();
      }
    );
  });
})

app.delete('/static/:id', (req, res) => {
  mongoClient.connect(url, (err, db) => {
    if (err) throw err;
    var dbo = db.db("hw3");
    var o_id = new ObjectId(req.params.id);
    dbo.collection("static").deleteOne(
      {_id : o_id},
      function(err, result) {
        if (err) throw err;
        db.close();
        res.end(JSON.stringify(result));
        
      }
    );
  });
})

app.put('/static/:id', (req, res) => {
  mongoClient.connect(url, (err, db) => {
    if (err) throw err;
    var dbo = db.db("hw3");
    var o_id = new ObjectId(req.params.id);
    var updateStr = {$set: {
      cookieID: req.body.cookieID,
      language: req.body.language,
      img_enable: req.body.img_enable,
      cookie_enable: req.body.cookie_enable,
      user_agent: req.body.user_agent,
      user_screen_height: req.body.user_screen_height,
      user_screen_width: req.body.user_screen_width,
      user_window_height: req.body.user_window_height,
      user_window_width: req.body.user_window_width,
      user_conn_type: req.body.user_conn_type
    }};
    dbo.collection("static").updateOne(
      {_id : o_id}, updateStr, 
      function(err, result) {
        if (err) throw err;
        db.close();
        res.end(JSON.stringify(result));
      }
    );
  });
})


app.post('/static', urlencodedParser, function (req, res) {

  mongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db("hw3");
      var staticinfo = { 
        cookieID: req.body.cookieID,
        language: req.body.language,
        img_enable: req.body.img_enable,
        cookie_enable: req.body.cookie_enable,
        user_agent: req.body.user_agent,
        user_screen_height: req.body.user_screen_height,
        user_screen_width: req.body.user_screen_width,
        user_window_height: req.body.user_window_height,
        user_window_width: req.body.user_window_width,
        user_conn_type: req.body.user_conn_type
      };
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

app.get('/performance', (req, res) => {
  mongoClient.connect(url, (err, db) => {
    if (err) throw err;
    var dbo = db.db("hw3");
    dbo.collection("performance").find({}).toArray(function(err, result) {
      if (err) throw err;
      db.close();
      res.json(result);
    });
  });
})

app.get('/performance/:id', (req, res) => {
  mongoClient.connect(url, (err, db) => {
    if (err) throw err;
    var dbo = db.db("hw3");
    var o_id = new ObjectId(req.params.id);
    dbo.collection("performance").find(
      {_id : o_id}).toArray(
      function(err, result) {
        if (err) throw err;
        res.json(result);
        db.close();
      }
    );
  });
})

app.delete('/performance/:id', (req, res) => {
  mongoClient.connect(url, (err, db) => {
    if (err) throw err;
    var dbo = db.db("hw3");
    var o_id = new ObjectId(req.params.id);
    dbo.collection("performance").deleteOne(
      {_id : o_id},
      function(err, result) {
        if (err) throw err;
        db.close();
        res.end(JSON.stringify(result));
        
      }
    );
  });
})

app.put('/performance/:id', (req, res) => {
  mongoClient.connect(url, (err, db) => {
    if (err) throw err;
    var dbo = db.db("hw3");
    var o_id = new ObjectId(req.params.id);
    var updateStr = {$set: {        
      cookieID: req.body.cookieID,
      timing_obj: req.body.timing_obj,
      start_time: req.body.start_time,
      end_time: req.body.end_time,
      load_time: req.body.load_time
    }};
    dbo.collection("performance").updateOne(
      {_id : o_id}, updateStr, 
      function(err, result) {
        if (err) throw err;
        db.close();
        res.end(JSON.stringify(result));
      }
    );
  });
})

app.post('/performance', urlencodedParser, function (req, res) {
  console.log(req.cookieID);
  mongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db("hw3");
      var performanceinfo = {
        cookieID: req.body.cookieID,
        timing_obj: req.body.timing_obj,
        start_time: req.body.start_time,
        end_time: req.body.end_time,
        load_time: req.body.load_time
      };
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

app.get('/activity', (req, res) => {
  mongoClient.connect(url, (err, db) => {
    if (err) throw err;
    var dbo = db.db("hw3");
    dbo.collection("activity").find({}).toArray(function(err, result) {
      if (err) throw err;
      db.close();
      res.json(result);
    });
  });
})

app.get('/activity/:id', (req, res) => {
  mongoClient.connect(url, (err, db) => {
    if (err) throw err;
    var dbo = db.db("hw3");
    var o_id = new ObjectId(req.params.id);
    dbo.collection("activity").find(
      {_id : o_id}).toArray(
      function(err, result) {
        if (err) throw err;
        res.json(result);
        db.close();
      }
    );
  });
})

app.delete('/activity/:id', (req, res) => {
  mongoClient.connect(url, (err, db) => {
    if (err) throw err;
    var dbo = db.db("hw3");
    var o_id = new ObjectId(req.params.id);
    dbo.collection("activity").deleteOne(
      {_id : o_id},
      function(err, result) {
        if (err) throw err;
        db.close();
        res.end(JSON.stringify(result));
        
      }
    );
  });
})

app.put('/activity/:id', (req, res) => {
  mongoClient.connect(url, (err, db) => {
    if (err) throw err;
    var dbo = db.db("hw3");
    var o_id = new ObjectId(req.params.id);
    var updateStr = {$set: {        
      cookieID: req.body.cookieID,
      mousePos: req.body.mousePos,
      mouseScroll: req.body.mouseScroll,
      mouseClick: req.body.mouseClick,
      keyDown: req.body.keyDown,
      keyUp: req.body.keyUp,
      pageLoadTime: req.body.pageLoadTime,
      pageUnloadTime: req.body.pageUnloadTime,
      curPage: req.body.curPage,
      idle: req.body.idle
    }};
    dbo.collection("activity").updateOne(
      {_id : o_id}, updateStr, 
      function(err, result) {
        if (err) throw err;
        db.close();
        res.end(JSON.stringify(result));
      }
    );
  });
})

app.post('/activity', urlencodedParser, function (req, res) {
  console.log(req.cookieID);
  mongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db("hw3");
      var acto = {
        cookieID: req.body.cookieID,
        mousePos: req.body.mousePos,
        mouseScroll: req.body.mouseScroll,
        mouseClick: req.body.mouseClick,
        keyDown: req.body.keyDown,
        keyUp: req.body.keyUp,
        pageLoadTime: req.body.pageLoadTime,
        pageUnloadTime: req.body.pageUnloadTime,
        curPage: req.body.curPage,
        idle: req.body.idle
      };
      dbo.collection("activity").insertOne(acto, function(err, result) {
          if (err) throw err;
          var response = {
            "cookieID":req.body.cookieID,
            "result":result
          };
          db.close();
          res.end(JSON.stringify(response));
      });
  });
})

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})