'use strict';

var GridView = require('./components/grid/GridView');
var GridController = require('./components/grid/GridController');

var TitleView = require('./components/title/TitleView');
var TitleController = require('./components/title/TitleController');
var GridActionsView = require('./components/gridActions/GridActionsView');
var GridActionsController = require('./components/gridActions/GridActionsController');
var GLU = require('glu.js');

var App = {
  init: function () {
    //var gridView = new GridView(document.body, '#grid');
    //new GridController(gridView);

    //var actionView = new GridActionsView(document.body, '#actions');
    //new GridActionsController(actionView);

    //gridView.render();
    //actionView.render();

    this.router = new GLU.Router();


    // meho -> hamo -> test
    // niz = [meho]
    // add niz to routes
    // niz = [meho , hamo]
    // add niz to routes
    // niz = [meho, hamo, test]
    // add niz to routes
    this.router.addRoute({
        path: "/category/:id",
        view: GridView,
        viewSelector: "#grid",
        controller: GridController,
        route: [{
            path: '/new',
            controller: GridActionsController,
            viewSelector: "#subtemplate",
            view: GridActionsView,
            route: {
              path: '/nested',
              controller: TitleController,
              viewSelector: "#titleView",
              view: TitleView
            }
        },
        {
            path: '/hamo',
            controller: GridActionsController,
            viewSelector: "#grid",
            view: GridActionsView
        }
        ]
    });

    this.router.start();
  }
};

module.exports = App;
