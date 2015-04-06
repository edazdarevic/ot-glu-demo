'use strict';

var TableActions = require('./TableActions');

class TableActionCreator {
  static updateCell(payload) {
    GLU.bus.emitAction(TableActions.UPDATE_CELL, payload);
  }
  static addRow(payload) {
    GLU.bus.emitAction(TableActions.ADD_ROW, payload);
  }
  static deleteRow(payload) {
    GLU.bus.emitAction(TableActions.DELETE_ROW, payload);
  }
}

module.exports = TableActionCreator;