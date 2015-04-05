'use strict'

var EventEmitter = require('eventemitter3').EventEmitter;

class BaseView extends EventEmitter {
    /**
     * BaseView constructor
     *
     * @param {DOMElement} root
     * @param {string} selector
     */
    constructor(root, selector) {
        this._root = root;
        this._selector = selector;
    }

    get root() {
        return this._root;
    }

    set root(v) {
        this._root = v;
    }

    get selector() {
        return this._selector;
    }

    set selector(v) {
        this._selector = v;
    }

    render() {
        return this;
    }

    get el() {
        return (this.selector ? this.root.querySelector(this.selector) : this.root);
    }

}

module.exports = BaseView;
