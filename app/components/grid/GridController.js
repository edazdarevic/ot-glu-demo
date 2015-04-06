'use strict';
var TableActions = require('../../actions/TableActions.js');
var TableActionCreator = require('../../actions/TableActionCreator.js');
var TableStore = require('../../stores/TableStore.js');

class GridController extends GLU.ViewController {
  constructor(view) {
    super(view);

    TableStore.onChange(this.onStoreChange, this);

    this.view.on(TableActions.UPDATE_CELL, this.onCellUpdate);
    this.view.on(TableActions.USER_CHANGE_POSITION, this.userChangePosition);
  }

  onStoreChange() {
    this.view.updateState(TableStore.data, TableStore.usersPosition);
  }

  onCellUpdate(payload) {
    TableActionCreator.updateCell(payload);
  }

  userChangePosition(payload) {
    TableActionCreator.userChangePosition(payload);
  }
}

module.exports = GridController;