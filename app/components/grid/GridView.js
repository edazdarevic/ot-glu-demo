'use strict';

var data, view;
var GridViewReact = require('./GridViewReact.js');

class GridView extends GLU.View {
  constructor(root, selector) {
    super(root, selector);

    data = [];
    view = this;
  }

  render() {
    React.render(<GridViewReact data={data} view={view} />,
      this.el);
  }
  get data() {
    return data;
  }

  set data(d) {
    data = d;
    this.render();
  }
}

module.exports = GridView;