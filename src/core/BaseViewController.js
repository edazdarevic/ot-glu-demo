'use strict'

var eventBus = require('../core/eventbus');

class BaseViewController {
    constructor(view) {
        this._view = view;
        this._eventBus = eventBus;
    }

    get view() {
        return this._view;
    }

    set view(v) {
        this._view = v;
    }

    get eventBus() {
        return this._eventBus;
    }
}

module.exports = BaseViewController;
