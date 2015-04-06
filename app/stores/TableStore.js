'use strict';

var TableActions = require('../actions/TableActions');
var OT = require('../ot/ot.js');
var tableChangeRules = require('../ot/tableChange.js');
var socket, ot;

class TableStore extends GLU.Store {
  constructor() {
    super();

    this.init();

    this.bindActions(
      TableActions.UPDATE_CELL, this.updateCell, [],
      TableActions.ADD_ROW, this.updateRow, [],
      TableActions.DELETE_ROW, this.deleteRow, []
    );
  }

  init() {
    socket = new WebSocket('ws://localhost:8080', 'protocolOne');
    var self = this;
    var emitChange = function () {
      self.emitChange();
    };

    ot = new OT({
      onInit: emitChange
    });
    tableChangeRules(ot);

    ot.onModelChange(TableActions.UPDATE_CELL, emitChange);
    ot.onModelChange(TableActions.ADD_ROW, emitChange);
    ot.onModelChange(TableActions.DELETE_ROW, emitChange);

    socket.onmessage = function (event) {
      ot.processRequest(event.data);
    };
  }

  get data() {
    return ot.getData();
  }

  triggerRequest(message) {
    var request = JSON.parse(message);
    ot.execute(request);
    socket.send(message);
  }

  updateCell(payload) {
    var message = ot.createMessage(TableActions.UPDATE_CELL, payload);
    this.triggerRequest(message);
    this.emitChange();
  }

  updateRow(payload) {
    var message = ot.createMessage(TableActions.ADD_ROW, payload);
    this.triggerRequest(message);
    this.emitChange();
  }

  deleteRow(payload) {
    var message = ot.createMessage(TableActions.DELETE_ROW, payload);
    this.triggerRequest(message);
    this.emitChange();
  }
}

module.exports = new TableStore();