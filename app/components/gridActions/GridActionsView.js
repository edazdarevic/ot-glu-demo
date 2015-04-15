'use strict';

var view;
var GridActionsViewReact = require('./GridActionsViewReact.js');
var GLU = require('glu.js');

class GridActionsView extends GLU.View {
  constructor(root, selector) {
    super(root, selector);
    view = this;
  }

  render() {
    React.render(<GridActionsViewReact view={view} />,
      this.el);
  }

  destroy() {
    React.unmountComponentAtNode(this.el);
    // this.el.innerHTML = "";
  }
}

module.exports = GridActionsView;
