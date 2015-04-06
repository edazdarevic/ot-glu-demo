'use strict';

var GridView = require('./components/grid/GridView');
var GridController = require('./components/grid/GridController');

var GridActionsView = require('./components/gridActions/GridActionsView');
var GridActionsController = require('./components/gridActions/GridActionsController');

var App = {
  init: function () {
    var gridView = new GridView(document.body, '#grid');
    new GridController(gridView);

    var actionView = new GridActionsView(document.body, '#actions');
    new GridActionsController(actionView);

    gridView.render();
    actionView.render();
  }
};

module.exports = App;