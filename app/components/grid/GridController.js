'use strict';
var TableActions = require('../../actions/TableActions.js');
var TableActionCreator = require('../../actions/TableActionCreator.js');
var TableStore = require('../../stores/TableStore.js');

class GridController extends GLU.ViewController {
  constructor(view) {
    super(view);

    TableStore.onChange(this.onStoreChange, this);

    this.view.on(TableActions.UPDATE_CELL, this.onCellUpdate);
  }

  onStoreChange() {
    console.log(TableStore.data);
    this.view.data = TableStore.data;
  }

  onCellUpdate(payload) {
    TableActionCreator.updateCell(payload);
  }
}

module.exports = GridController;