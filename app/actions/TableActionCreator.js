'use strict';

var TableActions = require('./TableActions');

var GLU = require('glu.js');

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
  static userChangePosition(payload) {
    GLU.bus.emitAction(TableActions.USER_CHANGE_POSITION, payload);
  }
}

module.exports = TableActionCreator;
