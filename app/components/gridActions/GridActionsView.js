'use strict';

var view;
var GridActionsViewReact = require('./GridActionsViewReact.js');

class GridView extends GLU.View {
  constructor(root, selector) {
    super(root, selector);
    view = this;
  }

  render() {
    React.render(<GridActionsViewReact view={view} />,
      this.el);
  }
}

module.exports = GridView;