'use strict';

var data, view;
var GridViewReact = require('./GridViewReact.js');

class GridView extends GLU.View {
  constructor(root, selector) {
    super(root, selector);

    data = [['asdf', 'mujo'],['bfs', 123]];
    view = this;
  }

  render() {
    React.render(<GridViewReact data={data} view={view} />,
      this.el);
  }
}

module.exports = GridView;