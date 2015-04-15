'use strict';
var GLU = require('glu.js');

class TitleView extends GLU.View {
  constructor(root, selector) {
    super(root, selector);
  }

  render(force) {
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

      //React.unmountComponentAtNode(this.el);
    var date = new Date();
    this.el.innerHTML = `<div> I Am a TITLE view PARAM IS : ${this._val}</div>`;
  }

  setParam(val) {
    this._val = val;
  }

  getParam() {
    return this._val;
  }
}

module.exports = TitleView;
