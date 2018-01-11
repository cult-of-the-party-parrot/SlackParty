var express = require('express');
var bodyParser = require('body-parser');

var items = require('../database-mysql');

var app = express();

app.use(express.static(__dirname + '/../react-client/dist'));

app.get('/items', function (req, res) {
  items.selectAll(function(err, data) {
    if(err) {
      res.sendStatus(500);
    } else {
      res.json(data);
    }
  });
});

app.listen(3000, function() {
  console.log('listening on port 3000!');
});

app.get('/channels', function(req, res) {
  console.log('GOT INTO CHANNELS');
  items.getChannels(function(err, data) {
    if(err) {
      console.log(err);
      res.sendStatus(500);
    } else {
      console.log(data);
      res.json(data);
    }
  });
});
