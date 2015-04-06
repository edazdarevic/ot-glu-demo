/*jslint node:true*/
'use strict';
var database = './database/data.json';
var WebSocketServer = require('ws').Server;
var wss = new WebSocketServer({
  port: 8080
});

// load OT
var OT = require('./app/ot/ot.js');
var tableChangeRules = require('./app/ot/tableChange.js');
var data = require(database);
var priority = 0;
var states = [];

var ot = new OT();
tableChangeRules(ot);
ot.setData(data);
ot.setStates(states);

var fs = require('fs');
var save = function (data) {
  fs.writeFile(database, JSON.stringify(data, null, 2), function (err) {
    if (err) {
      return console.log(err);
    }

    console.log('The file was saved!');
  });
};

wss.on('connection', function (ws) {
  states[priority] = 0;
  ws.send(ot.createMessage('init', {
    data: data,
    states: states,
    priority: priority
  }));

  wss.clients.forEach(function (client) {
    client.send(ot.createMessage('new-user', priority));
  });

  priority += 1;

  ws.on('message', function (message) {
    setTimeout(function () {
      ot.processRequest(message);
      wss.clients.forEach(function (client) {
        client.send(message);
      });
      save(data);
    }, 1);
  });
});

var express = require('express');
var app = express();

app.use('/', express.static(__dirname + '/public'));

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});