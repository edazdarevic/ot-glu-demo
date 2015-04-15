'use strict';

var data, usersPosition, view;
var GridViewReact = require('./GridViewReact.js');
var GLU = require('glu.js');

class GridView extends GLU.View {
  constructor(root, selector) {
    super(root, selector);

    data = [];
    usersPosition = {};
    view = this;
  }

  render() {
    //this.routeHandler.view;
    //var template = "<div> some tekst {{nestedView}}<div>";

    //this.el.innerHTML = Mustache.render(template, this.routeHandler.view);
   /* console.log("Gridview render!!!!");*/
    //var div = document.createElement("div");
    //div.setAttribute("id", "subtemplate");

    //var react = document.createElement("div");

    //this.el.innerHTML = "";
    //this.el.appendChild(div);
    //this.el.appendChild(react);


      var component = React.render(<GridViewReact
              data={data}
              usersPosition={usersPosition}
              view={view}
              id={this.id}/>,
              this.el);
  }


  destroy() {
    React.unmountComponentAtNode(this.el);
  }

  updateState(d, up) {
      console.log('view updating state');
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

  set id(val) {
    this._id = val;
    this.render();
  }

  get id() {
    return this._id;
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
