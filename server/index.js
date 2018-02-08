var express = require('express');
var bodyParser = require('body-parser');
var db = require('../mysql');

var app = express();
app.use(express.static(__dirname + '/../react/dist'));
app.use(bodyParser.json());
var port = process.env.PORT || 3000;

app.listen(port, function() {
  console.log('listening on port 3000!');
});

app.get('/channels', function(req, res) {
  db.getPublicChannels(function(err, publicData) {
    if (err) {
      console.log('WE ARE SCREWED AT /channels');
      res.sendStatus(500);
    } else {
      res.json(publicData.channels);
    }
  });
});

app.get('/messages', function(req, res) {
  var channel = req.query.channel;
  db.getMessages(channel, function(err, data) {
    if (err) {
      console.log('WE ARE SCREWED AT /messages');
      res.sendStatus(500);
    } else {
      res.json(data.messages);
    }
  });
});

app.post('/memeIt', function(req, res) {
  var messages = req.body.messages;
  var channel = req.body.channel;
  db.memeIt(channel, messages, function(err, data) {
    if (err) {
      console.log('WE ARE SCREWED AT /memeIt');
      res.sendStatus(500);
    } else {
      res.json('ez');
    }
  });
});
