'use strict';

var GridView = require('./components/grid/GridView');
var GridController = require('./components/grid/GridController');

var App = {
  init: function () {
    var view = new GridView(document.body);
    new GridController(view);

    view.render();
  }
};

module.exports = App;