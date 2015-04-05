'use strict';

class BaseAction {
    /**
     * Action constructor
     *
     * @param {string} type
     * @param {object} payload
     */
    constructor(type, payload) {
        this._type = type;
        this._payload = payload;
    }

    get type() {
        return this._type;
    }

    get payload() {
        return this._payload;
    }
}

module.exports = BaseAction;
