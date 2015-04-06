'use strict';

var data, usersPosition, view;
var GridViewReact = require('./GridViewReact.js');

class GridView extends GLU.View {
  constructor(root, selector) {
    super(root, selector);

    data = [];
    usersPosition = {};
    view = this;
  }

  render() {
    React.render(<GridViewReact
      data={data}
      usersPosition={usersPosition}
      view={view}/>,
      this.el);
  }

  updateState(d, up) {
    data = d;
    usersPosition = up
    this.render();
  }

  get data() {
    return data;
  }

  set data(d) {
    data = d;
    this.render();
  }

  get usersPosition() {
    return usersPosition;
  }

  set usersPosition(up) {
    usersPosition = up;
    this.render();
  }
}

module.exports = GridView;