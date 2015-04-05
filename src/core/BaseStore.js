'use strict';

var EventEmitter = require("eventemitter3"),
    _isFunction = require("lodash-node/modern/lang/isFunction");

class BaseStore extends EventEmitter {
    constructor() {
        super();
        this.dispatcher = GLU.dispatcher;
        this.__actions__ = {};

        this.dispatcher.addStore(this.constructor.name, this);
    }

    bindActions() {
        var actions = Array.prototype.slice.call(arguments);

        if (actions.length > 1 && actions.length % 3 !== 0) {
            throw new Error("bindActions number of arguments must be divisible with 3.");
        }

        var bindAction = function(type, handler, dependencies) {
            if (!handler) {
                throw new Error("The handler for action type " + type + " is falsy");
            }

            var dependencyNames = [];
            for (var i = 0; i < dependencies.length; i++) {
                dependencyNames.push(dependencies[i].constructor.name);
            }

            this.__actions__[type] = { handler: handler, dependencies: dependencyNames };

        }.bind(this);

        for (var i = 0; i < actions.length; i += 3) {
            var type = actions[i],
                handler = actions[i + 1],
                dependencies = actions[i + 2];

            if (!type) {
                throw new Error("Argument " + (i + 1) + " to bindActions is a falsy value");
            }

            bindAction(type, handler, dependencies);
        }
    }

    waitFor(stores, fn) {
        this.dispatcher.waitForStores(this, stores, fn.bind(this));
    }

    invokeHandler(handler, action) {
        if (_isFunction(handler)) {
            handler.call(this, action.payload, action.type);
        } else if (handler && _isFunction(this[handler])) {
            this[handler].call(this, action.payload, action.type);
        } else {
            throw new Error("The handler for action type " + action.type + " is not a function");
        }
        return true;
    }

    emitChange() {
        this.emit(GLU.constants.STORE_CHANGE);
    }

    onChange(fn, ctx) {
        this.on(GLU.constants.STORE_CHANGE, fn, ctx);
    }

    __handleAction__(action) {
        if (this.__actions__.hasOwnProperty(action.type)) {
            var handler = this.__actions__[action.type].handler;
            var dependencies = this.__actions__[action.type].dependencies;

            if ((dependencies !== undefined || dependencies !== null) && dependencies.length > 0) {
                this.waitFor(dependencies, function () {
                    return this.invokeHandler(handler, action);
                }.bind(this));
            } else {
                return this.invokeHandler(handler, action);
            }
        } else {
            return false;
        }
    }
}

module.exports = BaseStore;