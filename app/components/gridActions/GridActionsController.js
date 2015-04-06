'use strict';
var TableActions = require('../../actions/TableActions.js');
var TableActionCreator = require('../../actions/TableActionCreator.js');

class GridActionsController extends GLU.ViewController {
  constructor(view) {
    super(view);

    this.view.on(TableActions.ADD_ROW, this.addRow);
    this.view.on(TableActions.DELETE_ROW, this.deleteRow);
  }

  addRow(payload) {
    TableActionCreator.addRow(payload);
  }

  deleteRow(payload) {
    TableActionCreator.deleteRow(payload);
  }
}

module.exports = GridActionsController;