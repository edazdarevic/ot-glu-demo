'use strict';

var Dispatcher = require('./core/Dispatcher');
var EventBus = require('./core/eventbus');

var BaseView = require('./core/BaseView');
var BaseViewController = require('./core/BaseViewController');
var BaseAction = require('./core/BaseAction');
var BaseStore = require('./core/BaseStore');

//var MainController = require('./controllers/MainController');
//var MainView = require('./views/MainView');
//var RouteRecognizer = require('route-recognizer');

//var TodoController = require('./controllers/TodoController');
//var TodoView = require('./views/TodoView');

//var ReactTodoController = require('./controllers/ReactTodoController');
//var ReactTodoView = require('./views/ReactTodoView');

class GLU {
    constructor() {
        this.constants = {
            ACTION: '__GLU__ACTION__',
            STORE_CHANGE: '__STORE_CHANGE__'
        };

        this._dispatcher = new Dispatcher(this);
    }

    get bus() {
        return EventBus;
    }

    get dispatcher() {
        return this._dispatcher;
    }

    get View() {
        return BaseView;
    }

    get ViewController() {
        return BaseViewController;
    }

    get Action() {
        return BaseAction;
    }

    get Store() {
        return BaseStore;
    }
}

module.exports = new GLU();
