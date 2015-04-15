'use strict';
var GLU = require('glu.js');

class TitleController extends GLU.ViewController {
  constructor(view) {
    super(view);
  }

  destroy() {
      console.log(`destroying ${this.constructor.name}`);
  }
}

module.exports = TitleController;
