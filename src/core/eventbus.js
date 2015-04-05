'use strict';

var EventEmitter = require('eventemitter3').EventEmitter;

class EventBus extends EventEmitter {
    constructor() {
        super();
    }

    emitAction(type, payload) {
        this.emit(GLU.constants.ACTION, new GLU.Action(type, payload));
    }
}

var eventBus = new EventBus();

module.exports = eventBus;
