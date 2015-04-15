'use strict';
var TableActions = require('../../actions/TableActions.js');
var TableActionCreator = require('../../actions/TableActionCreator.js');
var TableStore = require('../../stores/TableStore.js');
var GLU = require('glu.js');

class GridController extends GLU.ViewController {
  constructor(view, params) {
    super(view);

    this.params = params;
    console.log("params are", this.params);
    TableStore.onChange(this.onStoreChange, this);

    this.view.on(TableActions.UPDATE_CELL, this.onCellUpdate);
    this.view.on(TableActions.USER_CHANGE_POSITION, this.userChangePosition);
    this.view.id = this.params.id;
    this.view.updateState(TableStore.data, TableStore.usersPosition);
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

  destroy() {
      console.log(`destroying ${this.constructor.name}`);
      this.view.off(TableActions.UPDATE_CELL, this.onCellUpdate);
      this.view.off(TableActions.USER_CHANGE_POSITION, this.userChangePosition);
      TableStore.offChange(this.onStoreChange, this);
  }
}

module.exports = GridController;
