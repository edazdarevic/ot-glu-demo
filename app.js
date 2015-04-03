/*global OT, tableChangeRules*/
/*jslint node:true*/
'use strict';
var WebSocketServer = require('ws').Server;
var wss = new WebSocketServer({
  port: 8080
});

// load OT
var fs = require('fs');
var vm = require('vm');
var includeInThisContext = function (path) {
  var code = fs.readFileSync(path);
  vm.runInThisContext(code, path);
}.bind(this);
includeInThisContext(__dirname + '/public/ot.js');
includeInThisContext(__dirname + '/public/tableChange.js');

var data = require('./database/data.json');
var priority = 0;
var states = [];

var ot = new OT();
tableChangeRules(ot);
ot.setData(data);
ot.setStates(states);

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
    }, 2000);
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