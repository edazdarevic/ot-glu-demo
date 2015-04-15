!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.APP=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"/home/edin/projects/operation-transformation/app/actions/TableActionCreator.js":[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var TableActions = require("./TableActions");

var GLU = require("glu.js");

var TableActionCreator = (function () {
  function TableActionCreator() {
    _classCallCheck(this, TableActionCreator);
  }

  _createClass(TableActionCreator, null, {
    updateCell: {
      value: function updateCell(payload) {
        GLU.bus.emitAction(TableActions.UPDATE_CELL, payload);
      }
    },
    addRow: {
      value: function addRow(payload) {
        GLU.bus.emitAction(TableActions.ADD_ROW, payload);
      }
    },
    deleteRow: {
      value: function deleteRow(payload) {
        GLU.bus.emitAction(TableActions.DELETE_ROW, payload);
      }
    },
    userChangePosition: {
      value: function userChangePosition(payload) {
        GLU.bus.emitAction(TableActions.USER_CHANGE_POSITION, payload);
      }
    }
  });

  return TableActionCreator;
})();

module.exports = TableActionCreator;

},{"./TableActions":"/home/edin/projects/operation-transformation/app/actions/TableActions.js","glu.js":"/home/edin/projects/operation-transformation/node_modules/glu.js/dist/glu-dist.js"}],"/home/edin/projects/operation-transformation/app/actions/TableActions.js":[function(require,module,exports){
"use strict";

var TableActions = {
  UPDATE_CELL: "updateCell",
  ADD_ROW: "addRow",
  DELETE_ROW: "deleteRow",
  USER_CHANGE_POSITION: "user-change-position"
};

module.exports = TableActions;

},{}],"/home/edin/projects/operation-transformation/app/app.js":[function(require,module,exports){
"use strict";

var GridView = require("./components/grid/GridView");
var GridController = require("./components/grid/GridController");

var TitleView = require("./components/title/TitleView");
var TitleController = require("./components/title/TitleController");
var GridActionsView = require("./components/gridActions/GridActionsView");
var GridActionsController = require("./components/gridActions/GridActionsController");
var GLU = require("glu.js");

var App = {
  init: function init() {
    //var gridView = new GridView(document.body, '#grid');
    //new GridController(gridView);

    //var actionView = new GridActionsView(document.body, '#actions');
    //new GridActionsController(actionView);

    //gridView.render();
    //actionView.render();

    this.router = new GLU.Router();

    // meho -> hamo -> test
    // niz = [meho]
    // add niz to routes
    // niz = [meho , hamo]
    // add niz to routes
    // niz = [meho, hamo, test]
    // add niz to routes
    this.router.addRoute({
      path: "/category/:id",
      view: GridView,
      viewSelector: "#grid",
      controller: GridController,
      route: [{
        path: "/new",
        controller: GridActionsController,
        viewSelector: "#subtemplate",
        view: GridActionsView,
        route: {
          path: "/nested",
          controller: TitleController,
          viewSelector: "#titleView",
          view: TitleView
        }
      }, {
        path: "/hamo",
        controller: GridActionsController,
        viewSelector: "#grid",
        view: GridActionsView
      }]
    });

    this.router.start();
  }
};

module.exports = App;

},{"./components/grid/GridController":"/home/edin/projects/operation-transformation/app/components/grid/GridController.js","./components/grid/GridView":"/home/edin/projects/operation-transformation/app/components/grid/GridView.js","./components/gridActions/GridActionsController":"/home/edin/projects/operation-transformation/app/components/gridActions/GridActionsController.js","./components/gridActions/GridActionsView":"/home/edin/projects/operation-transformation/app/components/gridActions/GridActionsView.js","./components/title/TitleController":"/home/edin/projects/operation-transformation/app/components/title/TitleController.js","./components/title/TitleView":"/home/edin/projects/operation-transformation/app/components/title/TitleView.js","glu.js":"/home/edin/projects/operation-transformation/node_modules/glu.js/dist/glu-dist.js"}],"/home/edin/projects/operation-transformation/app/components/grid/CellViewReact.js":[function(require,module,exports){
"use strict";

var CellViewReact = React.createClass({
  displayName: "CellViewReact",

  onBlur: function onBlur(e) {
    this.props.updateCell(this.props.rowIndex, this.props.columnIndex, e.target.value, "change");
  },
  onChange: function onChange(e) {
    this.props.updateCell(this.props.rowIndex, this.props.columnIndex, e.target.value);
  },
  onFocus: function onFocus(e) {
    this.props.updateCell(this.props.rowIndex, this.props.columnIndex, e.target.value, "focus");
  },
  render: function render() {
    var _this = this;

    var up = this.props.usersPosition;
    var activeUsersHere = Object.keys(up).filter(function (userId) {
      return up[userId].rowIndex === _this.props.rowIndex && up[userId].columnIndex === _this.props.columnIndex;
    }).map(function (userId) {
      return React.createElement("div", { className: "user-" + userId });
    });
    return React.createElement(
      "td",
      null,
      React.createElement("input", { type: "text",
        value: this.props.value,
        ref: "value",
        onChange: this.onChange,
        onFocus: this.onFocus,
        onBlur: this.onBlur }),
      activeUsersHere
    );
  }
});

module.exports = CellViewReact;

},{}],"/home/edin/projects/operation-transformation/app/components/grid/GridController.js":[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var TableActions = require("../../actions/TableActions.js");
var TableActionCreator = require("../../actions/TableActionCreator.js");
var TableStore = require("../../stores/TableStore.js");
var GLU = require("glu.js");

var GridController = (function (_GLU$ViewController) {
  function GridController(view, params) {
    _classCallCheck(this, GridController);

    _get(Object.getPrototypeOf(GridController.prototype), "constructor", this).call(this, view);

    this.params = params;
    console.log("params are", this.params);
    TableStore.onChange(this.onStoreChange, this);

    this.view.on(TableActions.UPDATE_CELL, this.onCellUpdate);
    this.view.on(TableActions.USER_CHANGE_POSITION, this.userChangePosition);
    this.view.id = this.params.id;
    this.view.updateState(TableStore.data, TableStore.usersPosition);
  }

  _inherits(GridController, _GLU$ViewController);

  _createClass(GridController, {
    onStoreChange: {
      value: function onStoreChange() {
        this.view.updateState(TableStore.data, TableStore.usersPosition);
      }
    },
    onCellUpdate: {
      value: function onCellUpdate(payload) {
        TableActionCreator.updateCell(payload);
      }
    },
    userChangePosition: {
      value: function userChangePosition(payload) {
        TableActionCreator.userChangePosition(payload);
      }
    },
    destroy: {
      value: function destroy() {
        console.log("destroying " + this.constructor.name);
        this.view.off(TableActions.UPDATE_CELL, this.onCellUpdate);
        this.view.off(TableActions.USER_CHANGE_POSITION, this.userChangePosition);
        TableStore.offChange(this.onStoreChange, this);
      }
    }
  });

  return GridController;
})(GLU.ViewController);

module.exports = GridController;

},{"../../actions/TableActionCreator.js":"/home/edin/projects/operation-transformation/app/actions/TableActionCreator.js","../../actions/TableActions.js":"/home/edin/projects/operation-transformation/app/actions/TableActions.js","../../stores/TableStore.js":"/home/edin/projects/operation-transformation/app/stores/TableStore.js","glu.js":"/home/edin/projects/operation-transformation/node_modules/glu.js/dist/glu-dist.js"}],"/home/edin/projects/operation-transformation/app/components/grid/GridView.js":[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var data, usersPosition, view;
var GridViewReact = require("./GridViewReact.js");
var GLU = require("glu.js");

var GridView = (function (_GLU$View) {
  function GridView(root, selector) {
    _classCallCheck(this, GridView);

    _get(Object.getPrototypeOf(GridView.prototype), "constructor", this).call(this, root, selector);

    data = [];
    usersPosition = {};
    view = this;
  }

  _inherits(GridView, _GLU$View);

  _createClass(GridView, {
    render: {
      value: function render() {
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

        var component = React.render(React.createElement(GridViewReact, {
          data: data,
          usersPosition: usersPosition,
          view: view,
          id: this.id }), this.el);
      }
    },
    destroy: {
      value: function destroy() {
        React.unmountComponentAtNode(this.el);
      }
    },
    updateState: {
      value: function updateState(d, up) {
        console.log("view updating state");
        data = d;
        usersPosition = up;
        this.render();
      }
    },
    data: {
      get: function () {
        return data;
      },
      set: function (d) {
        data = d;
        this.render();
      }
    },
    id: {
      set: function (val) {
        this._id = val;
        this.render();
      },
      get: function () {
        return this._id;
      }
    },
    usersPosition: {
      get: function () {
        return usersPosition;
      },
      set: function (up) {
        usersPosition = up;
        this.render();
      }
    }
  });

  return GridView;
})(GLU.View);

module.exports = GridView;

},{"./GridViewReact.js":"/home/edin/projects/operation-transformation/app/components/grid/GridViewReact.js","glu.js":"/home/edin/projects/operation-transformation/node_modules/glu.js/dist/glu-dist.js"}],"/home/edin/projects/operation-transformation/app/components/grid/GridViewReact.js":[function(require,module,exports){
"use strict";

var RowViewReact = require("./RowViewReact.js");
var TableActions = require("../../actions/TableActions.js");
var TitleView = require("../title/TitleView");

var GridViewReact = React.createClass({
  displayName: "GridViewReact",

  getInitialState: function getInitialState() {
    return { data: this.props.data };
  },
  updateCell: function updateCell(rowIndex, columnIndex, value, action) {
    if (this.titleView) {
      this.titleView.setParam(parseInt(Math.random() * 100));
    }

    if (action === "focus") {
      this.props.view.emit(TableActions.USER_CHANGE_POSITION, {
        rowIndex: rowIndex,
        columnIndex: columnIndex
      });
      return;
    }
    this.props.data[rowIndex][columnIndex] = value;
    this.setState({ data: this.props.data });
    if (action) {
      this.props.view.emit(TableActions.UPDATE_CELL, {
        rowIndex: rowIndex,
        columnIndex: columnIndex,
        value: value
      });
    }
  },
  componentDidMount: function componentDidMount() {
    this.titleView = new TitleView(this.getDOMNode(), "#titleViewInReact");
  },
  onHamoClick: function onHamoClick(e) {
    APP.router.navigateTo("/category/new");
    e.preventDefault();
  },
  render: function render() {
    var _this = this;

    var headers = [];
    var rows = [];

    if (this.titleView) {
      this.titleView.render();
    }
    if (this.props.data && this.props.data[0]) {
      headers = this.props.data[0].map(function (name, index) {
        return React.createElement(
          "th",
          null,
          "Col ",
          index + 1
        );
      });
      rows = this.props.data.map(function (row, index) {
        return React.createElement(RowViewReact, {
          row: row,
          key: index,
          rowIndex: index,
          usersPosition: _this.props.usersPosition,
          updateCell: _this.updateCell });
      });
    }
    return React.createElement(
      "div",
      null,
      "ID IS : ",
      this.props.id,
      new Date().toString(),
      "Below is a title view :",
      React.createElement("div", { id: "titleViewInReact" }),
      React.createElement(
        "table",
        null,
        React.createElement(
          "thead",
          null,
          React.createElement(
            "tr",
            null,
            headers
          )
        ),
        React.createElement(
          "tbody",
          null,
          rows
        )
      ),
      React.createElement(
        "a",
        { href: "/mujo", onClick: this.onHamoClick },
        "New view(navigate)"
      ),
      React.createElement("div", { id: "subtemplate" })
    );
  }
});

module.exports = GridViewReact;

},{"../../actions/TableActions.js":"/home/edin/projects/operation-transformation/app/actions/TableActions.js","../title/TitleView":"/home/edin/projects/operation-transformation/app/components/title/TitleView.js","./RowViewReact.js":"/home/edin/projects/operation-transformation/app/components/grid/RowViewReact.js"}],"/home/edin/projects/operation-transformation/app/components/grid/RowViewReact.js":[function(require,module,exports){
"use strict";
var CellViewReact = require("./CellViewReact.js");

var RowViewReact = React.createClass({
  displayName: "RowViewReact",

  render: function render() {
    var _this = this;

    var cells = [];
    if (this.props.row.length) {
      cells = this.props.row.map(function (cell, index) {
        return React.createElement(CellViewReact, {
          value: cell,
          key: index,
          columnIndex: index,
          rowIndex: _this.props.rowIndex,
          usersPosition: _this.props.usersPosition,
          updateCell: _this.props.updateCell });
      });
    }
    return React.createElement(
      "tr",
      null,
      cells
    );
  }
});

module.exports = RowViewReact;

},{"./CellViewReact.js":"/home/edin/projects/operation-transformation/app/components/grid/CellViewReact.js"}],"/home/edin/projects/operation-transformation/app/components/gridActions/GridActionsController.js":[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var TableActions = require("../../actions/TableActions.js");
var TableActionCreator = require("../../actions/TableActionCreator.js");

var GLU = require("glu.js");

var GridActionsController = (function (_GLU$ViewController) {
  function GridActionsController(view) {
    _classCallCheck(this, GridActionsController);

    _get(Object.getPrototypeOf(GridActionsController.prototype), "constructor", this).call(this, view);

    this.view.on(TableActions.ADD_ROW, this.addRow);
    this.view.on(TableActions.DELETE_ROW, this.deleteRow);
  }

  _inherits(GridActionsController, _GLU$ViewController);

  _createClass(GridActionsController, {
    addRow: {
      value: function addRow(payload) {
        TableActionCreator.addRow(payload);
      }
    },
    deleteRow: {
      value: function deleteRow(payload) {
        TableActionCreator.deleteRow(payload);
      }
    },
    destroy: {
      value: function destroy() {
        console.log("destroying GridActionsController");
        this.view.destroy();
      }
    }
  });

  return GridActionsController;
})(GLU.ViewController);

module.exports = GridActionsController;

},{"../../actions/TableActionCreator.js":"/home/edin/projects/operation-transformation/app/actions/TableActionCreator.js","../../actions/TableActions.js":"/home/edin/projects/operation-transformation/app/actions/TableActions.js","glu.js":"/home/edin/projects/operation-transformation/node_modules/glu.js/dist/glu-dist.js"}],"/home/edin/projects/operation-transformation/app/components/gridActions/GridActionsView.js":[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var view;
var GridActionsViewReact = require("./GridActionsViewReact.js");
var GLU = require("glu.js");

var GridActionsView = (function (_GLU$View) {
  function GridActionsView(root, selector) {
    _classCallCheck(this, GridActionsView);

    _get(Object.getPrototypeOf(GridActionsView.prototype), "constructor", this).call(this, root, selector);
    view = this;
  }

  _inherits(GridActionsView, _GLU$View);

  _createClass(GridActionsView, {
    render: {
      value: function render() {
        React.render(React.createElement(GridActionsViewReact, { view: view }), this.el);
      }
    },
    destroy: {
      value: function destroy() {
        React.unmountComponentAtNode(this.el);
        // this.el.innerHTML = "";
      }
    }
  });

  return GridActionsView;
})(GLU.View);

module.exports = GridActionsView;

},{"./GridActionsViewReact.js":"/home/edin/projects/operation-transformation/app/components/gridActions/GridActionsViewReact.js","glu.js":"/home/edin/projects/operation-transformation/node_modules/glu.js/dist/glu-dist.js"}],"/home/edin/projects/operation-transformation/app/components/gridActions/GridActionsViewReact.js":[function(require,module,exports){
"use strict";
var TableActions = require("../../actions/TableActions.js");

var GridViewReact = React.createClass({
  displayName: "GridViewReact",

  addRow: function addRow() {
    this.props.view.emit(TableActions.ADD_ROW, {
      rowIndex: +React.findDOMNode(this.refs.rowPosition).value.trim()
    });
  },
  deleteRow: function deleteRow() {
    this.props.view.emit(TableActions.DELETE_ROW, {
      rowIndex: +React.findDOMNode(this.refs.rowPosition).value.trim()
    });
  },
  render: function render() {
    return React.createElement(
      "div",
      null,
      React.createElement(
        "button",
        { onClick: this.addRow },
        "Add new row"
      ),
      React.createElement(
        "button",
        { onClick: this.deleteRow },
        "Remove row"
      ),
      React.createElement("input", { type: "text", defaultValue: "1", ref: "rowPosition" }),
      React.createElement("div", { id: "titleView" })
    );
  }
});

module.exports = GridViewReact;

},{"../../actions/TableActions.js":"/home/edin/projects/operation-transformation/app/actions/TableActions.js"}],"/home/edin/projects/operation-transformation/app/components/title/TitleController.js":[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var GLU = require("glu.js");

var TitleController = (function (_GLU$ViewController) {
  function TitleController(view) {
    _classCallCheck(this, TitleController);

    _get(Object.getPrototypeOf(TitleController.prototype), "constructor", this).call(this, view);
  }

  _inherits(TitleController, _GLU$ViewController);

  _createClass(TitleController, {
    destroy: {
      value: function destroy() {
        console.log("destroying " + this.constructor.name);
      }
    }
  });

  return TitleController;
})(GLU.ViewController);

module.exports = TitleController;

},{"glu.js":"/home/edin/projects/operation-transformation/node_modules/glu.js/dist/glu-dist.js"}],"/home/edin/projects/operation-transformation/app/components/title/TitleView.js":[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var GLU = require("glu.js");

var TitleView = (function (_GLU$View) {
  function TitleView(root, selector) {
    _classCallCheck(this, TitleView);

    _get(Object.getPrototypeOf(TitleView.prototype), "constructor", this).call(this, root, selector);
  }

  _inherits(TitleView, _GLU$View);

  _createClass(TitleView, {
    render: {
      value: function render(force) {
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
        this.el.innerHTML = "<div> I Am a TITLE view PARAM IS : " + this._val + "</div>";
      }
    },
    setParam: {
      value: function setParam(val) {
        this._val = val;
      }
    },
    getParam: {
      value: function getParam() {
        return this._val;
      }
    }
  });

  return TitleView;
})(GLU.View);

module.exports = TitleView;

},{"glu.js":"/home/edin/projects/operation-transformation/node_modules/glu.js/dist/glu-dist.js"}],"/home/edin/projects/operation-transformation/app/ot/ot.js":[function(require,module,exports){
/*jshint devel:true*/
/*global OT:true*/
"use strict";
var OT = (function () {
  var priority, data;
  var states = [];
  var log = [];
  var executeActions = {};
  var transformationMatrix = {};
  var options;
  var onModelChangeEvents = {};
  var usersPosition = {};

  var OT = function OT(o) {
    options = o || {};
  };

  OT.prototype.setData = function (d) {
    data = d;
  };

  OT.prototype.getData = function () {
    return data;
  };

  OT.prototype.setStates = function (s) {
    states = s;
  };

  OT.prototype.getPriority = function () {
    return priority;
  };

  OT.prototype.getUsersPostion = function () {
    return usersPosition;
  };

  OT.prototype.setExecuteActions = function (actions) {
    executeActions = actions;
  };

  OT.prototype.setTransformationMatrix = function (matrix) {
    transformationMatrix = matrix;
  };

  OT.prototype.createMessage = function (action, value) {
    var json = {
      action: action,
      states: states,
      priority: priority,
      value: value
    };
    return JSON.stringify(json);
  };

  OT.prototype.onModelChange = function (action, callback) {
    if (typeof callback !== "function") {
      throw "Callback has to be a function";
    }
    if (!onModelChangeEvents[action]) {
      onModelChangeEvents[action] = [];
    }
    onModelChangeEvents[action].push(callback);
  };

  var execute = function execute(request) {
    var action = executeActions[request.action];
    if (action) {
      action(request);
    }
    var onModelChangeCallback = onModelChangeEvents[request.action];
    if (onModelChangeCallback) {
      onModelChangeCallback.forEach(function (callback) {
        callback(request);
      });
    }
    states[request.priority] += 1;
    log.push(request);
  };

  OT.prototype.execute = execute;

  OT.prototype.markAsNoOp = function (request) {
    request.originalAction = request.action;
    request.action = "no-op";
    return request;
  };

  var compareState = function compareState(requestState, currentState) {
    var shouldTransform = false;
    for (var i = 0; i < currentState.length; i += 1) {
      if (currentState[i] === requestState[i]) {
        continue;
      }
      if (currentState[i] > requestState[i]) {
        shouldTransform = true;
      } else {
        return 1;
      }
    }
    return shouldTransform ? -1 : 0;
  };

  var transform = function transform(newRequest, oldRequest) {
    if (newRequest && transformationMatrix[newRequest.action] && transformationMatrix[newRequest.action][oldRequest.action]) {
      return transformationMatrix[newRequest.action][oldRequest.action](newRequest, oldRequest);
    }
    return newRequest;
  };

  OT.prototype.processRequest = function (r) {
    var request = JSON.parse(r);
    switch (request.action) {
      case "init":
        data = request.value.data;
        priority = request.value.priority;
        states = request.value.states;
        if (typeof options.onInit === "function") {
          options.onInit(data);
        }
        break;
      case "new-user":
        states[request.value] = 0;
        if (typeof options.onNewUser === "function") {
          options.onNewUser(request);
        }
        break;
      case "user-change-position":
        usersPosition[request.priority] = request.value;
        if (typeof options.onUserPositionChange === "function") {
          options.onUserPositionChange(request);
        }
        break;
      case "no-op":
        execute(request);
        break;
      default:
        if (priority !== request.priority) {
          switch (compareState(request.states, states)) {
            case 0:
              // we can execute this action right away
              execute(request);
              break;
            case 1:
              // this action has to be put into que, and wait for other actions
              // but since we use web socket, this shouldn't happen anyway
              // que.push(request);
              // TODO: when to fire que?
              break;
            case -1:
              // create transformation for this action
              for (var i = log.length - 1; i >= 0; i -= 1) {
                // find all logs that happened after this request was craeted
                var compareStateStatus = compareState(log[i].states, request.states);
                if (compareStateStatus === -1) {
                  break;
                }
              }
              var transformedRequest = request;
              for (var j = i + 1; j < log.length; j += 1) {
                transformedRequest = transform(transformedRequest, log[j]);
              }
              execute(transformedRequest);
          }
        }
    }
    console.log(request.action, data, states, log);
  };

  return OT;
})();

module.exports = OT;

},{}],"/home/edin/projects/operation-transformation/app/ot/tableChange.js":[function(require,module,exports){
"use strict";
var tableChangeRules = (function () {
  var ot;

  var executeActions = {
    updateCell: function updateCell(request) {
      var value = request.value;
      var data = ot.getData();
      data[value.rowIndex][value.columnIndex] = request.value.value;
    },
    addRow: function addRow(request) {
      var value = request.value;
      var data = ot.getData();
      var someRow = data[0] || [];
      var row = someRow.map(function () {
        return "";
      });

      data.splice(value.rowIndex, 0, row);
    },
    deleteRow: function deleteRow(request) {
      var value = request.value;
      var data = ot.getData();
      data.splice(value.rowIndex, 1);
    }
  };

  var transformationMatrix = {
    updateCell: {
      updateCell: function updateCell(newRequest, oldRequest) {
        if (newRequest.value.rowIndex !== oldRequest.value.rowIndex || newRequest.value.columnIndex !== oldRequest.value.columnIndex) {
          return newRequest;
        }
        if (newRequest.priority < oldRequest.priority) {
          return newRequest;
        }
        var value = JSON.parse(JSON.stringify(oldRequest.value));
        newRequest.value = value;
        return newRequest;
      },
      addRow: function addRow(newRequest, oldRequest) {
        if (newRequest.value.rowIndex < oldRequest.value.rowIndex) {
          return newRequest;
        }
        newRequest.value.rowIndex += 1;
        return newRequest;
      },
      deleteRow: function deleteRow(newRequest, oldRequest) {
        if (newRequest.value.rowIndex < oldRequest.value.rowIndex) {
          return newRequest;
        }
        if (+newRequest.value.rowIndex === +oldRequest.value.rowIndex) {
          return ot.markAsNoOp(newRequest);
        }
        newRequest.value.rowIndex -= 1;
        return newRequest;
      }
    },
    addRow: {
      // no need for transformation
      // updateCell: function (newRequest, oldRequest) {}
      addRow: function addRow(newRequest, oldRequest) {
        if (newRequest.value.rowIndex !== oldRequest.value.rowIndex) {
          return newRequest;
        }
        return ot.markAsNoOp(newRequest);
      },
      deleteRow: function deleteRow(newRequest, oldRequest) {
        if (newRequest.value.rowIndex < oldRequest.value.rowIndex) {
          return newRequest;
        }
        newRequest.value.rowIndex -= 1;
        return newRequest;
      }
    },
    deleteRow: {
      // no need for transformation
      // updateCell: function (newRequest, oldRequest) {}
      addRow: function addRow(newRequest, oldRequest) {
        if (newRequest.value.rowIndex < oldRequest.value.rowIndex) {
          return newRequest;
        }
        newRequest.value.rowIndex += 1;
        return newRequest;
      },
      deleteRow: function deleteRow(newRequest, oldRequest) {
        if (newRequest.value.rowIndex !== oldRequest.value.rowIndex) {
          return newRequest;
        }
        return ot.markAsNoOp(newRequest);
      }
    }
  };

  return function (opearionTransformation) {
    ot = opearionTransformation;
    ot.setExecuteActions(executeActions);
    ot.setTransformationMatrix(transformationMatrix);
  };
})();

module.exports = tableChangeRules;

},{}],"/home/edin/projects/operation-transformation/app/stores/TableStore.js":[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var TableActions = require("../actions/TableActions");
var OT = require("../ot/ot.js");
var tableChangeRules = require("../ot/tableChange.js");
var socket, ot;
var GLU = require("glu.js");

var TableStore = (function (_GLU$Store) {
  function TableStore() {
    _classCallCheck(this, TableStore);

    _get(Object.getPrototypeOf(TableStore.prototype), "constructor", this).call(this);

    this.init();

    this.bindActions(TableActions.UPDATE_CELL, this.updateCell, [], TableActions.ADD_ROW, this.updateRow, [], TableActions.DELETE_ROW, this.deleteRow, [], TableActions.USER_CHANGE_POSITION, this.userChangePosition, []);
  }

  _inherits(TableStore, _GLU$Store);

  _createClass(TableStore, {
    init: {
      value: function init() {
        socket = new WebSocket("ws://localhost:8080", "protocolOne");
        var self = this;
        var emitChange = function emitChange() {
          self.emitChange();
        };

        ot = new OT({
          onInit: emitChange,
          onUserPositionChange: emitChange
        });
        tableChangeRules(ot);

        ot.onModelChange(TableActions.UPDATE_CELL, emitChange);
        ot.onModelChange(TableActions.ADD_ROW, emitChange);
        ot.onModelChange(TableActions.DELETE_ROW, emitChange);

        socket.onmessage = function (event) {
          ot.processRequest(event.data);
        };
      }
    },
    data: {
      get: function () {
        return ot.getData();
      }
    },
    usersPosition: {
      get: function () {
        return ot.getUsersPostion();
      }
    },
    triggerRequest: {
      value: function triggerRequest(action, payload) {
        var message = ot.createMessage(action, payload);
        var request = JSON.parse(message);
        ot.execute(request);
        socket.send(message);
        this.emitChange();
      }
    },
    updateCell: {
      value: function updateCell(payload) {
        this.triggerRequest(TableActions.UPDATE_CELL, payload);
      }
    },
    updateRow: {
      value: function updateRow(payload) {
        this.triggerRequest(TableActions.ADD_ROW, payload);
      }
    },
    deleteRow: {
      value: function deleteRow(payload) {
        this.triggerRequest(TableActions.DELETE_ROW, payload);
      }
    },
    userChangePosition: {
      value: function userChangePosition(payload) {
        this.triggerRequest(TableActions.USER_CHANGE_POSITION, payload);
      }
    }
  });

  return TableStore;
})(GLU.Store);

module.exports = new TableStore();

},{"../actions/TableActions":"/home/edin/projects/operation-transformation/app/actions/TableActions.js","../ot/ot.js":"/home/edin/projects/operation-transformation/app/ot/ot.js","../ot/tableChange.js":"/home/edin/projects/operation-transformation/app/ot/tableChange.js","glu.js":"/home/edin/projects/operation-transformation/node_modules/glu.js/dist/glu-dist.js"}],"/home/edin/projects/operation-transformation/node_modules/glu.js/dist/glu-dist.js":[function(require,module,exports){
var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('eventemitter3'), require('lodash-node/modern/lang/isFunction'), require('route-recognizer'), require('deep-equal'), require('lodash-node/modern/lang/clone'), require('lodash-node/modern/object/forOwn'), require('lodash-node/modern/object/mapValues'), require('lodash-node/modern/object/keys'), require('lodash-node/modern/object/findKey'), require('lodash-node/modern/collection/map'), require('lodash-node/modern/collection/forEach'), require('lodash-node/modern/collection/size'), require('lodash-node/modern/array/uniq'), require('lodash-node/modern/array/intersection')) : typeof define === 'function' && define.amd ? define(['eventemitter3', 'lodash-node/modern/lang/isFunction', 'route-recognizer', 'deep-equal', 'lodash-node/modern/lang/clone', 'lodash-node/modern/object/forOwn', 'lodash-node/modern/object/mapValues', 'lodash-node/modern/object/keys', 'lodash-node/modern/object/findKey', 'lodash-node/modern/collection/map', 'lodash-node/modern/collection/forEach', 'lodash-node/modern/collection/size', 'lodash-node/modern/array/uniq', 'lodash-node/modern/array/intersection'], factory) : global.GLU = factory(global.EventEmitter, global._isFunction, global.RouteRecognizer, global.deepEqual, global._clone, global._forOwn, global._mapValues, global._keys, global._findKey, global._map, global._each, global._size, global._uniq, global._intersection);
})(this, function (EventEmitter, _isFunction, RouteRecognizer, deepEqual, _clone, _forOwn, _mapValues, _keys, _findKey, _map, _each, _size, _uniq, _intersection) {
    'use strict';

    /**
     * Created by adnan on 4/9/15.
     */

    var Constants = {
        ACTION: '__GLU__ACTION__',
        STORE_CHANGE: '__STORE_CHANGE__'
    };

    var BaseAction = (function () {
        /**
         * Action constructor
         *
         * @param {string} type
         * @param {object} payload
         */

        function BaseAction(type, payload) {
            _classCallCheck(this, BaseAction);

            this._type = type;
            this._payload = payload;
        }

        _createClass(BaseAction, [{
            key: 'type',
            get: function () {
                return this._type;
            }
        }, {
            key: 'payload',
            get: function () {
                return this._payload;
            }
        }]);

        return BaseAction;
    })();

    var core_BaseAction = BaseAction;

    var EventBus = (function (_EventEmitter) {
        function EventBus() {
            _classCallCheck(this, EventBus);

            _get(Object.getPrototypeOf(EventBus.prototype), 'constructor', this).call(this);
        }

        _inherits(EventBus, _EventEmitter);

        _createClass(EventBus, [{
            key: 'emitAction',
            value: function emitAction(type, payload) {
                this.emit(Constants.ACTION, new core_BaseAction(type, payload));
            }
        }]);

        return EventBus;
    })(EventEmitter);

    var eventBus = new EventBus();

    var Eventbus = eventBus;

    var BaseView = (function (_EventEmitter2) {
        /**
         * BaseView constructor
         *
         * @param {DOMElement} root
         * @param {string} selector
         */

        function BaseView(root, selector) {
            _classCallCheck(this, BaseView);

            _get(Object.getPrototypeOf(BaseView.prototype), 'constructor', this).call(this);

            this._root = root;
            this._selector = selector;
        }

        _inherits(BaseView, _EventEmitter2);

        _createClass(BaseView, [{
            key: 'root',
            get: function () {
                return this._root;
            },
            set: function (v) {
                this._root = v;
            }
        }, {
            key: 'selector',
            get: function () {
                return this._selector;
            },
            set: function (v) {
                this._selector = v;
            }
        }, {
            key: 'render',
            value: function render() {
                return this;
            }
        }, {
            key: 'el',
            get: function () {
                return this.selector ? this.root.querySelector(this.selector) : this.root;
            }
        }]);

        return BaseView;
    })(EventEmitter);

    var core_BaseView = BaseView;

    var BaseViewController = (function () {
        function BaseViewController(view) {
            _classCallCheck(this, BaseViewController);

            this._view = view;
            this._eventBus = Eventbus;
        }

        _createClass(BaseViewController, [{
            key: 'view',
            get: function () {
                return this._view;
            },
            set: function (v) {
                this._view = v;
            }
        }, {
            key: 'Eventbus',
            get: function () {
                return this._eventBus;
            }
        }]);

        return BaseViewController;
    })();

    var core_BaseViewController = BaseViewController;

    var Dispatcher = function Dispatcher(stores) {
        this.stores = {};
        this.currentDispatch = null;
        this.currentActionType = null;
        this.waitingToDispatch = [];

        for (var key in stores) {
            if (stores.hasOwnProperty(key)) {
                this.addStore(key, stores[key]);
            }
        }

        Eventbus.on(Constants.ACTION, this.dispatch, this);
    };

    Dispatcher.prototype.addStore = function (name, store) {
        store.dispatcher = this;
        this.stores[name] = store;
    };

    Dispatcher.prototype.dispatch = function (action) {
        if (!action || !action.type) {
            throw new Error('Can only dispatch actions with a \'type\' property');
        }

        if (this.currentDispatch) {
            var complaint = 'Cannot dispatch an action (\'' + action.type + '\') while another action (\'' + this.currentActionType + '\') is being dispatched';
            throw new Error(complaint);
        }

        this.waitingToDispatch = _clone(this.stores);

        this.currentActionType = action.type;
        this.currentDispatch = _mapValues(this.stores, function () {
            return { resolved: false, waitingOn: [], waitCallback: null };
        });

        try {
            this.doDispatchLoop(action);
        } finally {
            this.currentActionType = null;
            this.currentDispatch = null;
        }
    };

    Dispatcher.prototype.doDispatchLoop = function (action) {
        var dispatch,
            canBeDispatchedTo,
            wasHandled = false,
            removeFromDispatchQueue = [],
            dispatchedThisLoop = [];

        _forOwn(this.waitingToDispatch, function (value, key) {
            dispatch = this.currentDispatch[key];
            canBeDispatchedTo = !dispatch.waitingOn.length || !_intersection(dispatch.waitingOn, _keys(this.waitingToDispatch)).length;
            if (canBeDispatchedTo) {
                if (dispatch.waitCallback) {
                    var stores = _map(dispatch.waitingOn, function (storeKey) {
                        return this.stores[storeKey];
                    }, this);
                    var fn = dispatch.waitCallback;
                    dispatch.waitCallback = null;
                    dispatch.waitingOn = [];
                    dispatch.resolved = true;
                    fn.apply(null, stores);
                    wasHandled = true;
                } else {
                    dispatch.resolved = true;
                    var handled = this.stores[key].__handleAction__(action);
                    if (handled) {
                        wasHandled = true;
                    }
                }

                dispatchedThisLoop.push(key);

                if (this.currentDispatch[key].resolved) {
                    removeFromDispatchQueue.push(key);
                }
            }
        }, this);

        if (_keys(this.waitingToDispatch).length && !dispatchedThisLoop.length) {
            var storesWithCircularWaits = _keys(this.waitingToDispatch).join(', ');
            throw new Error('Indirect circular wait detected among: ' + storesWithCircularWaits);
        }

        _each(removeFromDispatchQueue, function (key) {
            delete this.waitingToDispatch[key];
        }, this);

        if (_size(this.waitingToDispatch)) {
            this.doDispatchLoop(action);
        }

        if (!wasHandled && console && console.warn) {
            console.warn('An action of type ' + action.type + ' was dispatched, but no store handled it');
        }
    };

    Dispatcher.prototype.waitForStores = function (store, stores, fn) {
        if (!this.currentDispatch) {
            throw new Error('Cannot wait unless an action is being dispatched');
        }

        var waitingStoreName = _findKey(this.stores, function (val) {
            return val === store;
        });

        if (stores.indexOf(waitingStoreName) > -1) {
            throw new Error('A store cannot wait on itself');
        }

        var dispatch = this.currentDispatch[waitingStoreName];

        if (dispatch.waitingOn.length) {
            throw new Error(waitingStoreName + ' already waiting on stores');
        }

        _each(stores, function (storeName) {
            var storeDispatch = this.currentDispatch[storeName];
            if (!this.stores[storeName]) {
                throw new Error('Cannot wait for non-existent store ' + storeName);
            }
            if (storeDispatch.waitingOn.indexOf(waitingStoreName) > -1) {
                throw new Error('Circular wait detected between ' + waitingStoreName + ' and ' + storeName);
            }
        }, this);

        dispatch.resolved = false;
        dispatch.waitingOn = _uniq(dispatch.waitingOn.concat(stores));
        dispatch.waitCallback = fn;
    };

    var core_Dispatcher__dispatcher = new Dispatcher();
    var core_Dispatcher = core_Dispatcher__dispatcher;

    var BaseStore = (function (_EventEmitter3) {
        function BaseStore() {
            _classCallCheck(this, BaseStore);

            _get(Object.getPrototypeOf(BaseStore.prototype), 'constructor', this).call(this);

            this.__actions__ = {};
            core_Dispatcher.addStore(this.constructor.name, this);
        }

        _inherits(BaseStore, _EventEmitter3);

        _createClass(BaseStore, [{
            key: 'bindActions',
            value: function bindActions() {
                var actions = Array.prototype.slice.call(arguments);

                if (actions.length > 1 && actions.length % 3 !== 0) {
                    throw new Error('bindActions number of arguments must be divisible with 3.');
                }

                var bindAction = (function (type, handler, dependencies) {
                    if (!handler) {
                        throw new Error('The handler for action type ' + type + ' is falsy');
                    }

                    var dependencyNames = [];
                    for (var i = 0; i < dependencies.length; i++) {
                        dependencyNames.push(dependencies[i].constructor.name);
                    }

                    this.__actions__[type] = { handler: handler, dependencies: dependencyNames };
                }).bind(this);

                for (var i = 0; i < actions.length; i += 3) {
                    var type = actions[i],
                        handler = actions[i + 1],
                        dependencies = actions[i + 2];

                    if (!type) {
                        throw new Error('Argument ' + (i + 1) + ' to bindActions is a falsy value');
                    }

                    bindAction(type, handler, dependencies);
                }
            }
        }, {
            key: 'waitFor',
            value: function waitFor(stores, fn) {
                core_Dispatcher.waitForStores(this, stores, fn.bind(this));
            }
        }, {
            key: 'invokeHandler',
            value: function invokeHandler(handler, action) {
                if (_isFunction(handler)) {
                    handler.call(this, action.payload, action.type);
                } else if (handler && _isFunction(this[handler])) {
                    this[handler].call(this, action.payload, action.type);
                } else {
                    throw new Error('The handler for action type ' + action.type + ' is not a function');
                }
                return true;
            }
        }, {
            key: 'emitChange',
            value: function emitChange() {
                this.emit(Constants.STORE_CHANGE);
            }
        }, {
            key: 'onChange',
            value: function onChange(fn, ctx) {
                this.on(Constants.STORE_CHANGE, fn, ctx);
            }
        }, {
            key: 'offChange',
            value: function offChange(fn, ctx) {
                this.off(Constants.STORE_CHANGE, fn, ctx);
            }
        }, {
            key: '__handleAction__',
            value: function __handleAction__(action) {
                if (this.__actions__.hasOwnProperty(action.type)) {
                    var handler = this.__actions__[action.type].handler;
                    var dependencies = this.__actions__[action.type].dependencies;

                    if ((dependencies !== undefined || dependencies !== null) && dependencies.length > 0) {
                        this.waitFor(dependencies, (function () {
                            return this.invokeHandler(handler, action);
                        }).bind(this));
                    } else {
                        return this.invokeHandler(handler, action);
                    }
                } else {
                    return false;
                }
            }
        }]);

        return BaseStore;
    })(EventEmitter);

    var core_BaseStore = BaseStore;

    var RouterClass__Router = (function () {
        function RouterClass__Router() {
            var debug = arguments[0] === undefined ? true : arguments[0];

            _classCallCheck(this, RouterClass__Router);

            this._routeRecognizer = new RouteRecognizer();
            this.id = Math.random();
            this.debug = debug;
            this._log('creating a new router object NEW CODE:', this.id);
        }

        _createClass(RouterClass__Router, [{
            key: '_log',
            value: function _log() {
                for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                    args[_key] = arguments[_key];
                }

                if (this.debug) {
                    console.log.apply(console, args);
                }
            }
        }, {
            key: 'addDefaultRoute',
            value: function addDefaultRoute(route) {
                this._defaultRoute = route;
            }
        }, {
            key: 'addRoute',
            value: function addRoute(route) {
                this._addRouteRec(route, []);
            }
        }, {
            key: '_addRouteRec',
            value: function _addRouteRec(route, startArr) {
                if (!route) {
                    return;
                }

                var inputRoutes = Array.isArray(route) ? route : [route];

                for (var i = 0; i < inputRoutes.length; i++) {
                    var localStart = startArr.slice(0);
                    var r = inputRoutes[i];
                    localStart.push({ path: r.path, handler: r });
                    this._routeRecognizer.add(localStart);
                    this._addRouteRec(r.route, localStart);
                }
            }
        }, {
            key: 'start',
            value: function start() {
                this._log('Router started');

                window.addEventListener('popstate', this._onPopState.bind(this));
                this.handleNewState();
            }
        }, {
            key: '_onPopState',

            /*
            Glu.Router.addRoute({
              path: '/category',
              controller: MainHandler,
              view: MainView,
              route : [{
                  path: "/edit",
                  controller: HomeHandler,
                  view: HomeView,
                  route: [{
                    path: "settings",
                    controller : SettingsHandler
                    view: SettingsView,
                  },{
                    path: "inbox",
                    controller: InboxHandler,
                    view: InboxView
                }, {
                  path: '/new',
                  controller: NewController
                 }]
              }]
            });
               MainHandler -> HomeHandler -> SettingsHandler
             /home/settings
             Glu.Router.addRoute({ path: "/mobile"});
            */
            value: function _onPopState(e) {
                this.handleNewState(e);
            }
        }, {
            key: '_printHandlerTree',
            value: function _printHandlerTree(tree) {
                var str = '';
                var indent = '';
                for (var i = 0; i < tree.length; i++) {
                    str += '\n' + indent + '+[' + i + '] ' + tree[i].handler.controller.name;
                    indent += '   ';
                }

                return str;
            }
        }, {
            key: '_invokeHandlers',
            value: function _invokeHandlers(newHandlers, e) {
                if (!this._appliedHandlers) {
                    this._appliedHandlers = [];
                }

                var len = Math.min(this._appliedHandlers.length, newHandlers.length);
                var diffIndex = -1;
                var newAppliedControllers = [];

                this._log('Current handlers:', 123, 'are', 'something');
                this._log(this._printHandlerTree(this._appliedHandlers));
                this._log('New handlers:');
                this._log(this._printHandlerTree(newHandlers));

                for (var i = 0; i < len; i++) {
                    diffIndex = i;
                    var paramsEqual = !deepEqual(newHandlers[i].params, this._appliedHandlers[i].params);

                    if (newHandlers[i].handler.controller !== this._appliedHandlers[i].handler.controller || paramsEqual) {

                        if (paramsEqual) {
                            diffIndex -= 1;
                        }

                        break;
                    }
                }

                this._log('Diff index is ' + diffIndex + ' starting from ' + (diffIndex + 1));

                for (var i = diffIndex + 1; i < this._appliedHandlers.length; i++) {
                    if (this._appliedHandlers[i].controller.destroy) {
                        this._appliedHandlers[i].controller.destroy();
                    }
                }

                this._appliedHandlers.splice(diffIndex + 1);

                for (var i = diffIndex + 1; i < newHandlers.length; i++) {
                    var result = newHandlers[i].handler;
                    var params = newHandlers[i].params;
                    var controller = this.invokeHandler(result, e, params);

                    newAppliedControllers.push({ controller: controller, handler: result, params: params });
                }

                this._appliedHandlers = this._appliedHandlers.concat(newAppliedControllers);
            }
        }, {
            key: 'invokeHandler',
            value: function invokeHandler(handler, e, params) {
                var view = new handler.view(document.body, handler.viewSelector);
                var controller = new handler.controller(view, params);
                this._log('invoking handler', handler, e, controller);

                view.render();
                return controller;
            }
        }, {
            key: 'handleNewState',
            value: function handleNewState(e) {
                var results = this._routeRecognizer.recognize(window.location.pathname);

                if (results) {
                    this._invokeHandlers(results, e);
                } else {
                    this._log('no routes matched!');
                    if (this._defaultRoute) {
                        this.invokeHandler(this._defaultRoute);
                    }
                }
            }
        }, {
            key: 'navigateTo',
            value: function navigateTo(path) {
                window.history.pushState({ someState: 1 }, path, path);
                this.handleNewState();
            }
        }, {
            key: 'back',
            value: function back() {
                window.history.back();
            }
        }, {
            key: 'forward',
            value: function forward() {
                window.history.forward();
            }
        }]);

        return RouterClass__Router;
    })();

    var RouterClass = RouterClass__Router;

    var GLU = (function () {
        function GLU() {
            _classCallCheck(this, GLU);
        }

        _createClass(GLU, [{
            key: 'constants',
            get: function () {
                return Constants;
            }
        }, {
            key: 'bus',
            get: function () {
                return Eventbus;
            }
        }, {
            key: 'dispatcher',
            get: function () {
                return this._dispatcher;
            }
        }, {
            key: 'Router',
            get: function () {
                return RouterClass;
            }
        }, {
            key: 'View',
            get: function () {
                return core_BaseView;
            }
        }, {
            key: 'ViewController',
            get: function () {
                return core_BaseViewController;
            }
        }, {
            key: 'Action',
            get: function () {
                return core_BaseAction;
            }
        }, {
            key: 'Store',
            get: function () {
                return core_BaseStore;
            }
        }]);

        return GLU;
    })();

    var glu = new GLU();
    var index = glu;

    return index;
});
//# sourceMappingURL=./glu-dist.js.map
},{"deep-equal":"/home/edin/projects/operation-transformation/node_modules/glu.js/node_modules/deep-equal/index.js","eventemitter3":"/home/edin/projects/operation-transformation/node_modules/glu.js/node_modules/eventemitter3/index.js","lodash-node/modern/array/intersection":"/home/edin/projects/operation-transformation/node_modules/glu.js/node_modules/lodash-node/modern/array/intersection.js","lodash-node/modern/array/uniq":"/home/edin/projects/operation-transformation/node_modules/glu.js/node_modules/lodash-node/modern/array/uniq.js","lodash-node/modern/collection/forEach":"/home/edin/projects/operation-transformation/node_modules/glu.js/node_modules/lodash-node/modern/collection/forEach.js","lodash-node/modern/collection/map":"/home/edin/projects/operation-transformation/node_modules/glu.js/node_modules/lodash-node/modern/collection/map.js","lodash-node/modern/collection/size":"/home/edin/projects/operation-transformation/node_modules/glu.js/node_modules/lodash-node/modern/collection/size.js","lodash-node/modern/lang/clone":"/home/edin/projects/operation-transformation/node_modules/glu.js/node_modules/lodash-node/modern/lang/clone.js","lodash-node/modern/lang/isFunction":"/home/edin/projects/operation-transformation/node_modules/glu.js/node_modules/lodash-node/modern/lang/isFunction.js","lodash-node/modern/object/findKey":"/home/edin/projects/operation-transformation/node_modules/glu.js/node_modules/lodash-node/modern/object/findKey.js","lodash-node/modern/object/forOwn":"/home/edin/projects/operation-transformation/node_modules/glu.js/node_modules/lodash-node/modern/object/forOwn.js","lodash-node/modern/object/keys":"/home/edin/projects/operation-transformation/node_modules/glu.js/node_modules/lodash-node/modern/object/keys.js","lodash-node/modern/object/mapValues":"/home/edin/projects/operation-transformation/node_modules/glu.js/node_modules/lodash-node/modern/object/mapValues.js","route-recognizer":"/home/edin/projects/operation-transformation/node_modules/glu.js/node_modules/route-recognizer/dist/route-recognizer.js"}],"/home/edin/projects/operation-transformation/node_modules/glu.js/node_modules/deep-equal/index.js":[function(require,module,exports){
var pSlice = Array.prototype.slice;
var objectKeys = require('./lib/keys.js');
var isArguments = require('./lib/is_arguments.js');

var deepEqual = module.exports = function (actual, expected, opts) {
  if (!opts) opts = {};
  // 7.1. All identical values are equivalent, as determined by ===.
  if (actual === expected) {
    return true;

  } else if (actual instanceof Date && expected instanceof Date) {
    return actual.getTime() === expected.getTime();

  // 7.3. Other pairs that do not both pass typeof value == 'object',
  // equivalence is determined by ==.
  } else if (typeof actual != 'object' && typeof expected != 'object') {
    return opts.strict ? actual === expected : actual == expected;

  // 7.4. For all other Object pairs, including Array objects, equivalence is
  // determined by having the same number of owned properties (as verified
  // with Object.prototype.hasOwnProperty.call), the same set of keys
  // (although not necessarily the same order), equivalent values for every
  // corresponding key, and an identical 'prototype' property. Note: this
  // accounts for both named and indexed properties on Arrays.
  } else {
    return objEquiv(actual, expected, opts);
  }
}

function isUndefinedOrNull(value) {
  return value === null || value === undefined;
}

function isBuffer (x) {
  if (!x || typeof x !== 'object' || typeof x.length !== 'number') return false;
  if (typeof x.copy !== 'function' || typeof x.slice !== 'function') {
    return false;
  }
  if (x.length > 0 && typeof x[0] !== 'number') return false;
  return true;
}

function objEquiv(a, b, opts) {
  var i, key;
  if (isUndefinedOrNull(a) || isUndefinedOrNull(b))
    return false;
  // an identical 'prototype' property.
  if (a.prototype !== b.prototype) return false;
  //~~~I've managed to break Object.keys through screwy arguments passing.
  //   Converting to array solves the problem.
  if (isArguments(a)) {
    if (!isArguments(b)) {
      return false;
    }
    a = pSlice.call(a);
    b = pSlice.call(b);
    return deepEqual(a, b, opts);
  }
  if (isBuffer(a)) {
    if (!isBuffer(b)) {
      return false;
    }
    if (a.length !== b.length) return false;
    for (i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) return false;
    }
    return true;
  }
  try {
    var ka = objectKeys(a),
        kb = objectKeys(b);
  } catch (e) {//happens when one is a string literal and the other isn't
    return false;
  }
  // having the same number of owned properties (keys incorporates
  // hasOwnProperty)
  if (ka.length != kb.length)
    return false;
  //the same set of keys (although not necessarily the same order),
  ka.sort();
  kb.sort();
  //~~~cheap key test
  for (i = ka.length - 1; i >= 0; i--) {
    if (ka[i] != kb[i])
      return false;
  }
  //equivalent values for every corresponding key, and
  //~~~possibly expensive deep test
  for (i = ka.length - 1; i >= 0; i--) {
    key = ka[i];
    if (!deepEqual(a[key], b[key], opts)) return false;
  }
  return typeof a === typeof b;
}

},{"./lib/is_arguments.js":"/home/edin/projects/operation-transformation/node_modules/glu.js/node_modules/deep-equal/lib/is_arguments.js","./lib/keys.js":"/home/edin/projects/operation-transformation/node_modules/glu.js/node_modules/deep-equal/lib/keys.js"}],"/home/edin/projects/operation-transformation/node_modules/glu.js/node_modules/deep-equal/lib/is_arguments.js":[function(require,module,exports){
var supportsArgumentsClass = (function(){
  return Object.prototype.toString.call(arguments)
})() == '[object Arguments]';

exports = module.exports = supportsArgumentsClass ? supported : unsupported;

exports.supported = supported;
function supported(object) {
  return Object.prototype.toString.call(object) == '[object Arguments]';
};

exports.unsupported = unsupported;
function unsupported(object){
  return object &&
    typeof object == 'object' &&
    typeof object.length == 'number' &&
    Object.prototype.hasOwnProperty.call(object, 'callee') &&
    !Object.prototype.propertyIsEnumerable.call(object, 'callee') ||
    false;
};

},{}],"/home/edin/projects/operation-transformation/node_modules/glu.js/node_modules/deep-equal/lib/keys.js":[function(require,module,exports){
exports = module.exports = typeof Object.keys === 'function'
  ? Object.keys : shim;

exports.shim = shim;
function shim (obj) {
  var keys = [];
  for (var key in obj) keys.push(key);
  return keys;
}

},{}],"/home/edin/projects/operation-transformation/node_modules/glu.js/node_modules/eventemitter3/index.js":[function(require,module,exports){
'use strict';

/**
 * Representation of a single EventEmitter function.
 *
 * @param {Function} fn Event handler to be called.
 * @param {Mixed} context Context for function execution.
 * @param {Boolean} once Only emit once
 * @api private
 */
function EE(fn, context, once) {
  this.fn = fn;
  this.context = context;
  this.once = once || false;
}

/**
 * Minimal EventEmitter interface that is molded against the Node.js
 * EventEmitter interface.
 *
 * @constructor
 * @api public
 */
function EventEmitter() { /* Nothing to set */ }

/**
 * Holds the assigned EventEmitters by name.
 *
 * @type {Object}
 * @private
 */
EventEmitter.prototype._events = undefined;

/**
 * Return a list of assigned event listeners.
 *
 * @param {String} event The events that should be listed.
 * @returns {Array}
 * @api public
 */
EventEmitter.prototype.listeners = function listeners(event) {
  if (!this._events || !this._events[event]) return [];
  if (this._events[event].fn) return [this._events[event].fn];

  for (var i = 0, l = this._events[event].length, ee = new Array(l); i < l; i++) {
    ee[i] = this._events[event][i].fn;
  }

  return ee;
};

/**
 * Emit an event to all registered event listeners.
 *
 * @param {String} event The name of the event.
 * @returns {Boolean} Indication if we've emitted an event.
 * @api public
 */
EventEmitter.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {
  if (!this._events || !this._events[event]) return false;

  var listeners = this._events[event]
    , len = arguments.length
    , args
    , i;

  if ('function' === typeof listeners.fn) {
    if (listeners.once) this.removeListener(event, listeners.fn, true);

    switch (len) {
      case 1: return listeners.fn.call(listeners.context), true;
      case 2: return listeners.fn.call(listeners.context, a1), true;
      case 3: return listeners.fn.call(listeners.context, a1, a2), true;
      case 4: return listeners.fn.call(listeners.context, a1, a2, a3), true;
      case 5: return listeners.fn.call(listeners.context, a1, a2, a3, a4), true;
      case 6: return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), true;
    }

    for (i = 1, args = new Array(len -1); i < len; i++) {
      args[i - 1] = arguments[i];
    }

    listeners.fn.apply(listeners.context, args);
  } else {
    var length = listeners.length
      , j;

    for (i = 0; i < length; i++) {
      if (listeners[i].once) this.removeListener(event, listeners[i].fn, true);

      switch (len) {
        case 1: listeners[i].fn.call(listeners[i].context); break;
        case 2: listeners[i].fn.call(listeners[i].context, a1); break;
        case 3: listeners[i].fn.call(listeners[i].context, a1, a2); break;
        default:
          if (!args) for (j = 1, args = new Array(len -1); j < len; j++) {
            args[j - 1] = arguments[j];
          }

          listeners[i].fn.apply(listeners[i].context, args);
      }
    }
  }

  return true;
};

/**
 * Register a new EventListener for the given event.
 *
 * @param {String} event Name of the event.
 * @param {Functon} fn Callback function.
 * @param {Mixed} context The context of the function.
 * @api public
 */
EventEmitter.prototype.on = function on(event, fn, context) {
  var listener = new EE(fn, context || this);

  if (!this._events) this._events = {};
  if (!this._events[event]) this._events[event] = listener;
  else {
    if (!this._events[event].fn) this._events[event].push(listener);
    else this._events[event] = [
      this._events[event], listener
    ];
  }

  return this;
};

/**
 * Add an EventListener that's only called once.
 *
 * @param {String} event Name of the event.
 * @param {Function} fn Callback function.
 * @param {Mixed} context The context of the function.
 * @api public
 */
EventEmitter.prototype.once = function once(event, fn, context) {
  var listener = new EE(fn, context || this, true);

  if (!this._events) this._events = {};
  if (!this._events[event]) this._events[event] = listener;
  else {
    if (!this._events[event].fn) this._events[event].push(listener);
    else this._events[event] = [
      this._events[event], listener
    ];
  }

  return this;
};

/**
 * Remove event listeners.
 *
 * @param {String} event The event we want to remove.
 * @param {Function} fn The listener that we need to find.
 * @param {Boolean} once Only remove once listeners.
 * @api public
 */
EventEmitter.prototype.removeListener = function removeListener(event, fn, once) {
  if (!this._events || !this._events[event]) return this;

  var listeners = this._events[event]
    , events = [];

  if (fn) {
    if (listeners.fn && (listeners.fn !== fn || (once && !listeners.once))) {
      events.push(listeners);
    }
    if (!listeners.fn) for (var i = 0, length = listeners.length; i < length; i++) {
      if (listeners[i].fn !== fn || (once && !listeners[i].once)) {
        events.push(listeners[i]);
      }
    }
  }

  //
  // Reset the array, or remove it completely if we have no more listeners.
  //
  if (events.length) {
    this._events[event] = events.length === 1 ? events[0] : events;
  } else {
    delete this._events[event];
  }

  return this;
};

/**
 * Remove all listeners or only the listeners for the specified event.
 *
 * @param {String} event The event want to remove all listeners for.
 * @api public
 */
EventEmitter.prototype.removeAllListeners = function removeAllListeners(event) {
  if (!this._events) return this;

  if (event) delete this._events[event];
  else this._events = {};

  return this;
};

//
// Alias methods names because people roll like that.
//
EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
EventEmitter.prototype.addListener = EventEmitter.prototype.on;

//
// This function doesn't apply anymore.
//
EventEmitter.prototype.setMaxListeners = function setMaxListeners() {
  return this;
};

//
// Expose the module.
//
EventEmitter.EventEmitter = EventEmitter;
EventEmitter.EventEmitter2 = EventEmitter;
EventEmitter.EventEmitter3 = EventEmitter;

//
// Expose the module.
//
module.exports = EventEmitter;

},{}],"/home/edin/projects/operation-transformation/node_modules/glu.js/node_modules/lodash-node/modern/array/intersection.js":[function(require,module,exports){
var baseIndexOf = require('../internal/baseIndexOf'),
    cacheIndexOf = require('../internal/cacheIndexOf'),
    createCache = require('../internal/createCache'),
    isArguments = require('../lang/isArguments'),
    isArray = require('../lang/isArray');

/**
 * Creates an array of unique values in all provided arrays using `SameValueZero`
 * for equality comparisons.
 *
 * **Note:** [`SameValueZero`](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-samevaluezero)
 * comparisons are like strict equality comparisons, e.g. `===`, except that
 * `NaN` matches `NaN`.
 *
 * @static
 * @memberOf _
 * @category Array
 * @param {...Array} [arrays] The arrays to inspect.
 * @returns {Array} Returns the new array of shared values.
 * @example
 * _.intersection([1, 2], [4, 2], [2, 1]);
 * // => [2]
 */
function intersection() {
  var args = [],
      argsIndex = -1,
      argsLength = arguments.length,
      caches = [],
      indexOf = baseIndexOf,
      isCommon = true;

  while (++argsIndex < argsLength) {
    var value = arguments[argsIndex];
    if (isArray(value) || isArguments(value)) {
      args.push(value);
      caches.push((isCommon && value.length >= 120) ? createCache(argsIndex && value) : null);
    }
  }
  argsLength = args.length;
  var array = args[0],
      index = -1,
      length = array ? array.length : 0,
      result = [],
      seen = caches[0];

  outer:
  while (++index < length) {
    value = array[index];
    if ((seen ? cacheIndexOf(seen, value) : indexOf(result, value, 0)) < 0) {
      argsIndex = argsLength;
      while (--argsIndex) {
        var cache = caches[argsIndex];
        if ((cache ? cacheIndexOf(cache, value) : indexOf(args[argsIndex], value, 0)) < 0) {
          continue outer;
        }
      }
      if (seen) {
        seen.push(value);
      }
      result.push(value);
    }
  }
  return result;
}

module.exports = intersection;

},{"../internal/baseIndexOf":"/home/edin/projects/operation-transformation/node_modules/glu.js/node_modules/lodash-node/modern/internal/baseIndexOf.js","../internal/cacheIndexOf":"/home/edin/projects/operation-transformation/node_modules/glu.js/node_modules/lodash-node/modern/internal/cacheIndexOf.js","../internal/createCache":"/home/edin/projects/operation-transformation/node_modules/glu.js/node_modules/lodash-node/modern/internal/createCache.js","../lang/isArguments":"/home/edin/projects/operation-transformation/node_modules/glu.js/node_modules/lodash-node/modern/lang/isArguments.js","../lang/isArray":"/home/edin/projects/operation-transformation/node_modules/glu.js/node_modules/lodash-node/modern/lang/isArray.js"}],"/home/edin/projects/operation-transformation/node_modules/glu.js/node_modules/lodash-node/modern/array/uniq.js":[function(require,module,exports){
var baseCallback = require('../internal/baseCallback'),
    baseUniq = require('../internal/baseUniq'),
    isIterateeCall = require('../internal/isIterateeCall'),
    sortedUniq = require('../internal/sortedUniq');

/**
 * Creates a duplicate-value-free version of an array using `SameValueZero`
 * for equality comparisons. Providing `true` for `isSorted` performs a faster
 * search algorithm for sorted arrays. If an iteratee function is provided it
 * is invoked for each value in the array to generate the criterion by which
 * uniqueness is computed. The `iteratee` is bound to `thisArg` and invoked
 * with three arguments: (value, index, array).
 *
 * If a property name is provided for `iteratee` the created `_.property`
 * style callback returns the property value of the given element.
 *
 * If a value is also provided for `thisArg` the created `_.matchesProperty`
 * style callback returns `true` for elements that have a matching property
 * value, else `false`.
 *
 * If an object is provided for `iteratee` the created `_.matches` style
 * callback returns `true` for elements that have the properties of the given
 * object, else `false`.
 *
 * **Note:** [`SameValueZero`](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-samevaluezero)
 * comparisons are like strict equality comparisons, e.g. `===`, except that
 * `NaN` matches `NaN`.
 *
 * @static
 * @memberOf _
 * @alias unique
 * @category Array
 * @param {Array} array The array to inspect.
 * @param {boolean} [isSorted] Specify the array is sorted.
 * @param {Function|Object|string} [iteratee] The function invoked per iteration.
 * @param {*} [thisArg] The `this` binding of `iteratee`.
 * @returns {Array} Returns the new duplicate-value-free array.
 * @example
 *
 * _.uniq([1, 2, 1]);
 * // => [1, 2]
 *
 * // using `isSorted`
 * _.uniq([1, 1, 2], true);
 * // => [1, 2]
 *
 * // using an iteratee function
 * _.uniq([1, 2.5, 1.5, 2], function(n) {
 *   return this.floor(n);
 * }, Math);
 * // => [1, 2.5]
 *
 * // using the `_.property` callback shorthand
 * _.uniq([{ 'x': 1 }, { 'x': 2 }, { 'x': 1 }], 'x');
 * // => [{ 'x': 1 }, { 'x': 2 }]
 */
function uniq(array, isSorted, iteratee, thisArg) {
  var length = array ? array.length : 0;
  if (!length) {
    return [];
  }
  if (isSorted != null && typeof isSorted != 'boolean') {
    thisArg = iteratee;
    iteratee = isIterateeCall(array, isSorted, thisArg) ? null : isSorted;
    isSorted = false;
  }
  iteratee = iteratee == null ? iteratee : baseCallback(iteratee, thisArg, 3);
  return (isSorted)
    ? sortedUniq(array, iteratee)
    : baseUniq(array, iteratee);
}

module.exports = uniq;

},{"../internal/baseCallback":"/home/edin/projects/operation-transformation/node_modules/glu.js/node_modules/lodash-node/modern/internal/baseCallback.js","../internal/baseUniq":"/home/edin/projects/operation-transformation/node_modules/glu.js/node_modules/lodash-node/modern/internal/baseUniq.js","../internal/isIterateeCall":"/home/edin/projects/operation-transformation/node_modules/glu.js/node_modules/lodash-node/modern/internal/isIterateeCall.js","../internal/sortedUniq":"/home/edin/projects/operation-transformation/node_modules/glu.js/node_modules/lodash-node/modern/internal/sortedUniq.js"}],"/home/edin/projects/operation-transformation/node_modules/glu.js/node_modules/lodash-node/modern/collection/forEach.js":[function(require,module,exports){
var arrayEach = require('../internal/arrayEach'),
    baseEach = require('../internal/baseEach'),
    createForEach = require('../internal/createForEach');

/**
 * Iterates over elements of `collection` invoking `iteratee` for each element.
 * The `iteratee` is bound to `thisArg` and invoked with three arguments:
 * (value, index|key, collection). Iterator functions may exit iteration early
 * by explicitly returning `false`.
 *
 * **Note:** As with other "Collections" methods, objects with a `length` property
 * are iterated like arrays. To avoid this behavior `_.forIn` or `_.forOwn`
 * may be used for object iteration.
 *
 * @static
 * @memberOf _
 * @alias each
 * @category Collection
 * @param {Array|Object|string} collection The collection to iterate over.
 * @param {Function} [iteratee=_.identity] The function invoked per iteration.
 * @param {*} [thisArg] The `this` binding of `iteratee`.
 * @returns {Array|Object|string} Returns `collection`.
 * @example
 *
 * _([1, 2]).forEach(function(n) {
 *   console.log(n);
 * }).value();
 * // => logs each value from left to right and returns the array
 *
 * _.forEach({ 'a': 1, 'b': 2 }, function(n, key) {
 *   console.log(n, key);
 * });
 * // => logs each value-key pair and returns the object (iteration order is not guaranteed)
 */
var forEach = createForEach(arrayEach, baseEach);

module.exports = forEach;

},{"../internal/arrayEach":"/home/edin/projects/operation-transformation/node_modules/glu.js/node_modules/lodash-node/modern/internal/arrayEach.js","../internal/baseEach":"/home/edin/projects/operation-transformation/node_modules/glu.js/node_modules/lodash-node/modern/internal/baseEach.js","../internal/createForEach":"/home/edin/projects/operation-transformation/node_modules/glu.js/node_modules/lodash-node/modern/internal/createForEach.js"}],"/home/edin/projects/operation-transformation/node_modules/glu.js/node_modules/lodash-node/modern/collection/map.js":[function(require,module,exports){
var arrayMap = require('../internal/arrayMap'),
    baseCallback = require('../internal/baseCallback'),
    baseMap = require('../internal/baseMap'),
    isArray = require('../lang/isArray');

/**
 * Creates an array of values by running each element in `collection` through
 * `iteratee`. The `iteratee` is bound to `thisArg` and invoked with three
 * arguments: (value, index|key, collection).
 *
 * If a property name is provided for `iteratee` the created `_.property`
 * style callback returns the property value of the given element.
 *
 * If a value is also provided for `thisArg` the created `_.matchesProperty`
 * style callback returns `true` for elements that have a matching property
 * value, else `false`.
 *
 * If an object is provided for `iteratee` the created `_.matches` style
 * callback returns `true` for elements that have the properties of the given
 * object, else `false`.
 *
 * Many lodash methods are guarded to work as interatees for methods like
 * `_.every`, `_.filter`, `_.map`, `_.mapValues`, `_.reject`, and `_.some`.
 *
 * The guarded methods are:
 * `ary`, `callback`, `chunk`, `clone`, `create`, `curry`, `curryRight`, `drop`,
 * `dropRight`, `every`, `fill`, `flatten`, `invert`, `max`, `min`, `parseInt`,
 * `slice`, `sortBy`, `take`, `takeRight`, `template`, `trim`, `trimLeft`,
 * `trimRight`, `trunc`, `random`, `range`, `sample`, `some`, `uniq`, and `words`
 *
 * @static
 * @memberOf _
 * @alias collect
 * @category Collection
 * @param {Array|Object|string} collection The collection to iterate over.
 * @param {Function|Object|string} [iteratee=_.identity] The function invoked
 *  per iteration.
 *  create a `_.property` or `_.matches` style callback respectively.
 * @param {*} [thisArg] The `this` binding of `iteratee`.
 * @returns {Array} Returns the new mapped array.
 * @example
 *
 * function timesThree(n) {
 *   return n * 3;
 * }
 *
 * _.map([1, 2], timesThree);
 * // => [3, 6]
 *
 * _.map({ 'a': 1, 'b': 2 }, timesThree);
 * // => [3, 6] (iteration order is not guaranteed)
 *
 * var users = [
 *   { 'user': 'barney' },
 *   { 'user': 'fred' }
 * ];
 *
 * // using the `_.property` callback shorthand
 * _.map(users, 'user');
 * // => ['barney', 'fred']
 */
function map(collection, iteratee, thisArg) {
  var func = isArray(collection) ? arrayMap : baseMap;
  iteratee = baseCallback(iteratee, thisArg, 3);
  return func(collection, iteratee);
}

module.exports = map;

},{"../internal/arrayMap":"/home/edin/projects/operation-transformation/node_modules/glu.js/node_modules/lodash-node/modern/internal/arrayMap.js","../internal/baseCallback":"/home/edin/projects/operation-transformation/node_modules/glu.js/node_modules/lodash-node/modern/internal/baseCallback.js","../internal/baseMap":"/home/edin/projects/operation-transformation/node_modules/glu.js/node_modules/lodash-node/modern/internal/baseMap.js","../lang/isArray":"/home/edin/projects/operation-transformation/node_modules/glu.js/node_modules/lodash-node/modern/lang/isArray.js"}],"/home/edin/projects/operation-transformation/node_modules/glu.js/node_modules/lodash-node/modern/collection/size.js":[function(require,module,exports){
var isLength = require('../internal/isLength'),
    keys = require('../object/keys');

/**
 * Gets the size of `collection` by returning its length for array-like
 * values or the number of own enumerable properties for objects.
 *
 * @static
 * @memberOf _
 * @category Collection
 * @param {Array|Object|string} collection The collection to inspect.
 * @returns {number} Returns the size of `collection`.
 * @example
 *
 * _.size([1, 2, 3]);
 * // => 3
 *
 * _.size({ 'a': 1, 'b': 2 });
 * // => 2
 *
 * _.size('pebbles');
 * // => 7
 */
function size(collection) {
  var length = collection ? collection.length : 0;
  return isLength(length) ? length : keys(collection).length;
}

module.exports = size;

},{"../internal/isLength":"/home/edin/projects/operation-transformation/node_modules/glu.js/node_modules/lodash-node/modern/internal/isLength.js","../object/keys":"/home/edin/projects/operation-transformation/node_modules/glu.js/node_modules/lodash-node/modern/object/keys.js"}],"/home/edin/projects/operation-transformation/node_modules/glu.js/node_modules/lodash-node/modern/internal/SetCache.js":[function(require,module,exports){
(function (global){
var cachePush = require('./cachePush'),
    isNative = require('../lang/isNative');

/** Native method references. */
var Set = isNative(Set = global.Set) && Set;

/* Native method references for those with the same name as other `lodash` methods. */
var nativeCreate = isNative(nativeCreate = Object.create) && nativeCreate;

/**
 *
 * Creates a cache object to store unique values.
 *
 * @private
 * @param {Array} [values] The values to cache.
 */
function SetCache(values) {
  var length = values ? values.length : 0;

  this.data = { 'hash': nativeCreate(null), 'set': new Set };
  while (length--) {
    this.push(values[length]);
  }
}

// Add functions to the `Set` cache.
SetCache.prototype.push = cachePush;

module.exports = SetCache;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"../lang/isNative":"/home/edin/projects/operation-transformation/node_modules/glu.js/node_modules/lodash-node/modern/lang/isNative.js","./cachePush":"/home/edin/projects/operation-transformation/node_modules/glu.js/node_modules/lodash-node/modern/internal/cachePush.js"}],"/home/edin/projects/operation-transformation/node_modules/glu.js/node_modules/lodash-node/modern/internal/arrayCopy.js":[function(require,module,exports){
/**
 * Copies the values of `source` to `array`.
 *
 * @private
 * @param {Array} source The array to copy values from.
 * @param {Array} [array=[]] The array to copy values to.
 * @returns {Array} Returns `array`.
 */
function arrayCopy(source, array) {
  var index = -1,
      length = source.length;

  array || (array = Array(length));
  while (++index < length) {
    array[index] = source[index];
  }
  return array;
}

module.exports = arrayCopy;

},{}],"/home/edin/projects/operation-transformation/node_modules/glu.js/node_modules/lodash-node/modern/internal/arrayEach.js":[function(require,module,exports){
/**
 * A specialized version of `_.forEach` for arrays without support for callback
 * shorthands and `this` binding.
 *
 * @private
 * @param {Array} array The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns `array`.
 */
function arrayEach(array, iteratee) {
  var index = -1,
      length = array.length;

  while (++index < length) {
    if (iteratee(array[index], index, array) === false) {
      break;
    }
  }
  return array;
}

module.exports = arrayEach;

},{}],"/home/edin/projects/operation-transformation/node_modules/glu.js/node_modules/lodash-node/modern/internal/arrayMap.js":[function(require,module,exports){
/**
 * A specialized version of `_.map` for arrays without support for callback
 * shorthands and `this` binding.
 *
 * @private
 * @param {Array} array The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the new mapped array.
 */
function arrayMap(array, iteratee) {
  var index = -1,
      length = array.length,
      result = Array(length);

  while (++index < length) {
    result[index] = iteratee(array[index], index, array);
  }
  return result;
}

module.exports = arrayMap;

},{}],"/home/edin/projects/operation-transformation/node_modules/glu.js/node_modules/lodash-node/modern/internal/baseCallback.js":[function(require,module,exports){
var baseMatches = require('./baseMatches'),
    baseMatchesProperty = require('./baseMatchesProperty'),
    baseProperty = require('./baseProperty'),
    bindCallback = require('./bindCallback'),
    identity = require('../utility/identity');

/**
 * The base implementation of `_.callback` which supports specifying the
 * number of arguments to provide to `func`.
 *
 * @private
 * @param {*} [func=_.identity] The value to convert to a callback.
 * @param {*} [thisArg] The `this` binding of `func`.
 * @param {number} [argCount] The number of arguments to provide to `func`.
 * @returns {Function} Returns the callback.
 */
function baseCallback(func, thisArg, argCount) {
  var type = typeof func;
  if (type == 'function') {
    return typeof thisArg == 'undefined'
      ? func
      : bindCallback(func, thisArg, argCount);
  }
  if (func == null) {
    return identity;
  }
  if (type == 'object') {
    return baseMatches(func);
  }
  return typeof thisArg == 'undefined'
    ? baseProperty(func + '')
    : baseMatchesProperty(func + '', thisArg);
}

module.exports = baseCallback;

},{"../utility/identity":"/home/edin/projects/operation-transformation/node_modules/glu.js/node_modules/lodash-node/modern/utility/identity.js","./baseMatches":"/home/edin/projects/operation-transformation/node_modules/glu.js/node_modules/lodash-node/modern/internal/baseMatches.js","./baseMatchesProperty":"/home/edin/projects/operation-transformation/node_modules/glu.js/node_modules/lodash-node/modern/internal/baseMatchesProperty.js","./baseProperty":"/home/edin/projects/operation-transformation/node_modules/glu.js/node_modules/lodash-node/modern/internal/baseProperty.js","./bindCallback":"/home/edin/projects/operation-transformation/node_modules/glu.js/node_modules/lodash-node/modern/internal/bindCallback.js"}],"/home/edin/projects/operation-transformation/node_modules/glu.js/node_modules/lodash-node/modern/internal/baseClone.js":[function(require,module,exports){
var arrayCopy = require('./arrayCopy'),
    arrayEach = require('./arrayEach'),
    baseCopy = require('./baseCopy'),
    baseForOwn = require('./baseForOwn'),
    initCloneArray = require('./initCloneArray'),
    initCloneByTag = require('./initCloneByTag'),
    initCloneObject = require('./initCloneObject'),
    isArray = require('../lang/isArray'),
    isObject = require('../lang/isObject'),
    keys = require('../object/keys');

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    funcTag = '[object Function]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    objectTag = '[object Object]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    weakMapTag = '[object WeakMap]';

var arrayBufferTag = '[object ArrayBuffer]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';

/** Used to identify `toStringTag` values supported by `_.clone`. */
var cloneableTags = {};
cloneableTags[argsTag] = cloneableTags[arrayTag] =
cloneableTags[arrayBufferTag] = cloneableTags[boolTag] =
cloneableTags[dateTag] = cloneableTags[float32Tag] =
cloneableTags[float64Tag] = cloneableTags[int8Tag] =
cloneableTags[int16Tag] = cloneableTags[int32Tag] =
cloneableTags[numberTag] = cloneableTags[objectTag] =
cloneableTags[regexpTag] = cloneableTags[stringTag] =
cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] =
cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;
cloneableTags[errorTag] = cloneableTags[funcTag] =
cloneableTags[mapTag] = cloneableTags[setTag] =
cloneableTags[weakMapTag] = false;

/** Used for native method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the [`toStringTag`](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.prototype.tostring)
 * of values.
 */
var objToString = objectProto.toString;

/**
 * The base implementation of `_.clone` without support for argument juggling
 * and `this` binding `customizer` functions.
 *
 * @private
 * @param {*} value The value to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @param {Function} [customizer] The function to customize cloning values.
 * @param {string} [key] The key of `value`.
 * @param {Object} [object] The object `value` belongs to.
 * @param {Array} [stackA=[]] Tracks traversed source objects.
 * @param {Array} [stackB=[]] Associates clones with source counterparts.
 * @returns {*} Returns the cloned value.
 */
function baseClone(value, isDeep, customizer, key, object, stackA, stackB) {
  var result;
  if (customizer) {
    result = object ? customizer(value, key, object) : customizer(value);
  }
  if (typeof result != 'undefined') {
    return result;
  }
  if (!isObject(value)) {
    return value;
  }
  var isArr = isArray(value);
  if (isArr) {
    result = initCloneArray(value);
    if (!isDeep) {
      return arrayCopy(value, result);
    }
  } else {
    var tag = objToString.call(value),
        isFunc = tag == funcTag;

    if (tag == objectTag || tag == argsTag || (isFunc && !object)) {
      result = initCloneObject(isFunc ? {} : value);
      if (!isDeep) {
        return baseCopy(value, result, keys(value));
      }
    } else {
      return cloneableTags[tag]
        ? initCloneByTag(value, tag, isDeep)
        : (object ? value : {});
    }
  }
  // Check for circular references and return corresponding clone.
  stackA || (stackA = []);
  stackB || (stackB = []);

  var length = stackA.length;
  while (length--) {
    if (stackA[length] == value) {
      return stackB[length];
    }
  }
  // Add the source value to the stack of traversed objects and associate it with its clone.
  stackA.push(value);
  stackB.push(result);

  // Recursively populate clone (susceptible to call stack limits).
  (isArr ? arrayEach : baseForOwn)(value, function(subValue, key) {
    result[key] = baseClone(subValue, isDeep, customizer, key, value, stackA, stackB);
  });
  return result;
}

module.exports = baseClone;

},{"../lang/isArray":"/home/edin/projects/operation-transformation/node_modules/glu.js/node_modules/lodash-node/modern/lang/isArray.js","../lang/isObject":"/home/edin/projects/operation-transformation/node_modules/glu.js/node_modules/lodash-node/modern/lang/isObject.js","../object/keys":"/home/edin/projects/operation-transformation/node_modules/glu.js/node_modules/lodash-node/modern/object/keys.js","./arrayCopy":"/home/edin/projects/operation-transformation/node_modules/glu.js/node_modules/lodash-node/modern/internal/arrayCopy.js","./arrayEach":"/home/edin/projects/operation-transformation/node_modules/glu.js/node_modules/lodash-node/modern/internal/arrayEach.js","./baseCopy":"/home/edin/projects/operation-transformation/node_modules/glu.js/node_modules/lodash-node/modern/internal/baseCopy.js","./baseForOwn":"/home/edin/projects/operation-transformation/node_modules/glu.js/node_modules/lodash-node/modern/internal/baseForOwn.js","./initCloneArray":"/home/edin/projects/operation-transformation/node_modules/glu.js/node_modules/lodash-node/modern/internal/initCloneArray.js","./initCloneByTag":"/home/edin/projects/operation-transformation/node_modules/glu.js/node_modules/lodash-node/modern/internal/initCloneByTag.js","./initCloneObject":"/home/edin/projects/operation-transformation/node_modules/glu.js/node_modules/lodash-node/modern/internal/initCloneObject.js"}],"/home/edin/projects/operation-transformation/node_modules/glu.js/node_modules/lodash-node/modern/internal/baseCopy.js":[function(require,module,exports){
/**
 * Copies the properties of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy properties from.
 * @param {Object} [object={}] The object to copy properties to.
 * @param {Array} props The property names to copy.
 * @returns {Object} Returns `object`.
 */
function baseCopy(source, object, props) {
  if (!props) {
    props = object;
    object = {};
  }
  var index = -1,
      length = props.length;

  while (++index < length) {
    var key = props[index];
    object[key] = source[key];
  }
  return object;
}

module.exports = baseCopy;

},{}],"/home/edin/projects/operation-transformation/node_modules/glu.js/node_modules/lodash-node/modern/internal/baseEach.js":[function(require,module,exports){
var baseForOwn = require('./baseForOwn'),
    createBaseEach = require('./createBaseEach');

/**
 * The base implementation of `_.forEach` without support for callback
 * shorthands and `this` binding.
 *
 * @private
 * @param {Array|Object|string} collection The collection to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array|Object|string} Returns `collection`.
 */
var baseEach = createBaseEach(baseForOwn);

module.exports = baseEach;

},{"./baseForOwn":"/home/edin/projects/operation-transformation/node_modules/glu.js/node_modules/lodash-node/modern/internal/baseForOwn.js","./createBaseEach":"/home/edin/projects/operation-transformation/node_modules/glu.js/node_modules/lodash-node/modern/internal/createBaseEach.js"}],"/home/edin/projects/operation-transformation/node_modules/glu.js/node_modules/lodash-node/modern/internal/baseFind.js":[function(require,module,exports){
/**
 * The base implementation of `_.find`, `_.findLast`, `_.findKey`, and `_.findLastKey`,
 * without support for callback shorthands and `this` binding, which iterates
 * over `collection` using the provided `eachFunc`.
 *
 * @private
 * @param {Array|Object|string} collection The collection to search.
 * @param {Function} predicate The function invoked per iteration.
 * @param {Function} eachFunc The function to iterate over `collection`.
 * @param {boolean} [retKey] Specify returning the key of the found element
 *  instead of the element itself.
 * @returns {*} Returns the found element or its key, else `undefined`.
 */
function baseFind(collection, predicate, eachFunc, retKey) {
  var result;
  eachFunc(collection, function(value, key, collection) {
    if (predicate(value, key, collection)) {
      result = retKey ? key : value;
      return false;
    }
  });
  return result;
}

module.exports = baseFind;

},{}],"/home/edin/projects/operation-transformation/node_modules/glu.js/node_modules/lodash-node/modern/internal/baseFor.js":[function(require,module,exports){
var createBaseFor = require('./createBaseFor');

/**
 * The base implementation of `baseForIn` and `baseForOwn` which iterates
 * over `object` properties returned by `keysFunc` invoking `iteratee` for
 * each property. Iterator functions may exit iteration early by explicitly
 * returning `false`.
 *
 * @private
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @param {Function} keysFunc The function to get the keys of `object`.
 * @returns {Object} Returns `object`.
 */
var baseFor = createBaseFor();

module.exports = baseFor;

},{"./createBaseFor":"/home/edin/projects/operation-transformation/node_modules/glu.js/node_modules/lodash-node/modern/internal/createBaseFor.js"}],"/home/edin/projects/operation-transformation/node_modules/glu.js/node_modules/lodash-node/modern/internal/baseForOwn.js":[function(require,module,exports){
var baseFor = require('./baseFor'),
    keys = require('../object/keys');

/**
 * The base implementation of `_.forOwn` without support for callback
 * shorthands and `this` binding.
 *
 * @private
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Object} Returns `object`.
 */
function baseForOwn(object, iteratee) {
  return baseFor(object, iteratee, keys);
}

module.exports = baseForOwn;

},{"../object/keys":"/home/edin/projects/operation-transformation/node_modules/glu.js/node_modules/lodash-node/modern/object/keys.js","./baseFor":"/home/edin/projects/operation-transformation/node_modules/glu.js/node_modules/lodash-node/modern/internal/baseFor.js"}],"/home/edin/projects/operation-transformation/node_modules/glu.js/node_modules/lodash-node/modern/internal/baseIndexOf.js":[function(require,module,exports){
var indexOfNaN = require('./indexOfNaN');

/**
 * The base implementation of `_.indexOf` without support for binary searches.
 *
 * @private
 * @param {Array} array The array to search.
 * @param {*} value The value to search for.
 * @param {number} fromIndex The index to search from.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function baseIndexOf(array, value, fromIndex) {
  if (value !== value) {
    return indexOfNaN(array, fromIndex);
  }
  var index = fromIndex - 1,
      length = array.length;

  while (++index < length) {
    if (array[index] === value) {
      return index;
    }
  }
  return -1;
}

module.exports = baseIndexOf;

},{"./indexOfNaN":"/home/edin/projects/operation-transformation/node_modules/glu.js/node_modules/lodash-node/modern/internal/indexOfNaN.js"}],"/home/edin/projects/operation-transformation/node_modules/glu.js/node_modules/lodash-node/modern/internal/baseIsEqual.js":[function(require,module,exports){
var baseIsEqualDeep = require('./baseIsEqualDeep');

/**
 * The base implementation of `_.isEqual` without support for `this` binding
 * `customizer` functions.
 *
 * @private
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @param {Function} [customizer] The function to customize comparing values.
 * @param {boolean} [isLoose] Specify performing partial comparisons.
 * @param {Array} [stackA] Tracks traversed `value` objects.
 * @param {Array} [stackB] Tracks traversed `other` objects.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 */
function baseIsEqual(value, other, customizer, isLoose, stackA, stackB) {
  // Exit early for identical values.
  if (value === other) {
    // Treat `+0` vs. `-0` as not equal.
    return value !== 0 || (1 / value == 1 / other);
  }
  var valType = typeof value,
      othType = typeof other;

  // Exit early for unlike primitive values.
  if ((valType != 'function' && valType != 'object' && othType != 'function' && othType != 'object') ||
      value == null || other == null) {
    // Return `false` unless both values are `NaN`.
    return value !== value && other !== other;
  }
  return baseIsEqualDeep(value, other, baseIsEqual, customizer, isLoose, stackA, stackB);
}

module.exports = baseIsEqual;

},{"./baseIsEqualDeep":"/home/edin/projects/operation-transformation/node_modules/glu.js/node_modules/lodash-node/modern/internal/baseIsEqualDeep.js"}],"/home/edin/projects/operation-transformation/node_modules/glu.js/node_modules/lodash-node/modern/internal/baseIsEqualDeep.js":[function(require,module,exports){
var equalArrays = require('./equalArrays'),
    equalByTag = require('./equalByTag'),
    equalObjects = require('./equalObjects'),
    isArray = require('../lang/isArray'),
    isTypedArray = require('../lang/isTypedArray');

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    funcTag = '[object Function]',
    objectTag = '[object Object]';

/** Used for native method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the [`toStringTag`](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.prototype.tostring)
 * of values.
 */
var objToString = objectProto.toString;

/**
 * A specialized version of `baseIsEqual` for arrays and objects which performs
 * deep comparisons and tracks traversed objects enabling objects with circular
 * references to be compared.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Function} [customizer] The function to customize comparing objects.
 * @param {boolean} [isLoose] Specify performing partial comparisons.
 * @param {Array} [stackA=[]] Tracks traversed `value` objects.
 * @param {Array} [stackB=[]] Tracks traversed `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function baseIsEqualDeep(object, other, equalFunc, customizer, isLoose, stackA, stackB) {
  var objIsArr = isArray(object),
      othIsArr = isArray(other),
      objTag = arrayTag,
      othTag = arrayTag;

  if (!objIsArr) {
    objTag = objToString.call(object);
    if (objTag == argsTag) {
      objTag = objectTag;
    } else if (objTag != objectTag) {
      objIsArr = isTypedArray(object);
    }
  }
  if (!othIsArr) {
    othTag = objToString.call(other);
    if (othTag == argsTag) {
      othTag = objectTag;
    } else if (othTag != objectTag) {
      othIsArr = isTypedArray(other);
    }
  }
  var objIsObj = (objTag == objectTag || (isLoose && objTag == funcTag)),
      othIsObj = (othTag == objectTag || (isLoose && othTag == funcTag)),
      isSameTag = objTag == othTag;

  if (isSameTag && !(objIsArr || objIsObj)) {
    return equalByTag(object, other, objTag);
  }
  if (isLoose) {
    if (!isSameTag && !(objIsObj && othIsObj)) {
      return false;
    }
  } else {
    var valWrapped = objIsObj && hasOwnProperty.call(object, '__wrapped__'),
        othWrapped = othIsObj && hasOwnProperty.call(other, '__wrapped__');

    if (valWrapped || othWrapped) {
      return equalFunc(valWrapped ? object.value() : object, othWrapped ? other.value() : other, customizer, isLoose, stackA, stackB);
    }
    if (!isSameTag) {
      return false;
    }
  }
  // Assume cyclic values are equal.
  // For more information on detecting circular references see https://es5.github.io/#JO.
  stackA || (stackA = []);
  stackB || (stackB = []);

  var length = stackA.length;
  while (length--) {
    if (stackA[length] == object) {
      return stackB[length] == other;
    }
  }
  // Add `object` and `other` to the stack of traversed objects.
  stackA.push(object);
  stackB.push(other);

  var result = (objIsArr ? equalArrays : equalObjects)(object, other, equalFunc, customizer, isLoose, stackA, stackB);

  stackA.pop();
  stackB.pop();

  return result;
}

module.exports = baseIsEqualDeep;

},{"../lang/isArray":"/home/edin/projects/operation-transformation/node_modules/glu.js/node_modules/lodash-node/modern/lang/isArray.js","../lang/isTypedArray":"/home/edin/projects/operation-transformation/node_modules/glu.js/node_modules/lodash-node/modern/lang/isTypedArray.js","./equalArrays":"/home/edin/projects/operation-transformation/node_modules/glu.js/node_modules/lodash-node/modern/internal/equalArrays.js","./equalByTag":"/home/edin/projects/operation-transformation/node_modules/glu.js/node_modules/lodash-node/modern/internal/equalByTag.js","./equalObjects":"/home/edin/projects/operation-transformation/node_modules/glu.js/node_modules/lodash-node/modern/internal/equalObjects.js"}],"/home/edin/projects/operation-transformation/node_modules/glu.js/node_modules/lodash-node/modern/internal/baseIsFunction.js":[function(require,module,exports){
/**
 * The base implementation of `_.isFunction` without support for environments
 * with incorrect `typeof` results.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 */
function baseIsFunction(value) {
  // Avoid a Chakra JIT bug in compatibility modes of IE 11.
  // See https://github.com/jashkenas/underscore/issues/1621 for more details.
  return typeof value == 'function' || false;
}

module.exports = baseIsFunction;

},{}],"/home/edin/projects/operation-transformation/node_modules/glu.js/node_modules/lodash-node/modern/internal/baseIsMatch.js":[function(require,module,exports){
var baseIsEqual = require('./baseIsEqual');

/**
 * The base implementation of `_.isMatch` without support for callback
 * shorthands and `this` binding.
 *
 * @private
 * @param {Object} object The object to inspect.
 * @param {Array} props The source property names to match.
 * @param {Array} values The source values to match.
 * @param {Array} strictCompareFlags Strict comparison flags for source values.
 * @param {Function} [customizer] The function to customize comparing objects.
 * @returns {boolean} Returns `true` if `object` is a match, else `false`.
 */
function baseIsMatch(object, props, values, strictCompareFlags, customizer) {
  var index = -1,
      length = props.length,
      noCustomizer = !customizer;

  while (++index < length) {
    if ((noCustomizer && strictCompareFlags[index])
          ? values[index] !== object[props[index]]
          : !(props[index] in object)
        ) {
      return false;
    }
  }
  index = -1;
  while (++index < length) {
    var key = props[index],
        objValue = object[key],
        srcValue = values[index];

    if (noCustomizer && strictCompareFlags[index]) {
      var result = typeof objValue != 'undefined' || (key in object);
    } else {
      result = customizer ? customizer(objValue, srcValue, key) : undefined;
      if (typeof result == 'undefined') {
        result = baseIsEqual(srcValue, objValue, customizer, true);
      }
    }
    if (!result) {
      return false;
    }
  }
  return true;
}

module.exports = baseIsMatch;

},{"./baseIsEqual":"/home/edin/projects/operation-transformation/node_modules/glu.js/node_modules/lodash-node/modern/internal/baseIsEqual.js"}],"/home/edin/projects/operation-transformation/node_modules/glu.js/node_modules/lodash-node/modern/internal/baseMap.js":[function(require,module,exports){
var baseEach = require('./baseEach');

/**
 * The base implementation of `_.map` without support for callback shorthands
 * and `this` binding.
 *
 * @private
 * @param {Array|Object|string} collection The collection to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the new mapped array.
 */
function baseMap(collection, iteratee) {
  var result = [];
  baseEach(collection, function(value, key, collection) {
    result.push(iteratee(value, key, collection));
  });
  return result;
}

module.exports = baseMap;

},{"./baseEach":"/home/edin/projects/operation-transformation/node_modules/glu.js/node_modules/lodash-node/modern/internal/baseEach.js"}],"/home/edin/projects/operation-transformation/node_modules/glu.js/node_modules/lodash-node/modern/internal/baseMatches.js":[function(require,module,exports){
var baseIsMatch = require('./baseIsMatch'),
    constant = require('../utility/constant'),
    isStrictComparable = require('./isStrictComparable'),
    keys = require('../object/keys'),
    toObject = require('./toObject');

/**
 * The base implementation of `_.matches` which does not clone `source`.
 *
 * @private
 * @param {Object} source The object of property values to match.
 * @returns {Function} Returns the new function.
 */
function baseMatches(source) {
  var props = keys(source),
      length = props.length;

  if (!length) {
    return constant(true);
  }
  if (length == 1) {
    var key = props[0],
        value = source[key];

    if (isStrictComparable(value)) {
      return function(object) {
        return object != null && object[key] === value &&
          (typeof value != 'undefined' || (key in toObject(object)));
      };
    }
  }
  var values = Array(length),
      strictCompareFlags = Array(length);

  while (length--) {
    value = source[props[length]];
    values[length] = value;
    strictCompareFlags[length] = isStrictComparable(value);
  }
  return function(object) {
    return object != null && baseIsMatch(toObject(object), props, values, strictCompareFlags);
  };
}

module.exports = baseMatches;

},{"../object/keys":"/home/edin/projects/operation-transformation/node_modules/glu.js/node_modules/lodash-node/modern/object/keys.js","../utility/constant":"/home/edin/projects/operation-transformation/node_modules/glu.js/node_modules/lodash-node/modern/utility/constant.js","./baseIsMatch":"/home/edin/projects/operation-transformation/node_modules/glu.js/node_modules/lodash-node/modern/internal/baseIsMatch.js","./isStrictComparable":"/home/edin/projects/operation-transformation/node_modules/glu.js/node_modules/lodash-node/modern/internal/isStrictComparable.js","./toObject":"/home/edin/projects/operation-transformation/node_modules/glu.js/node_modules/lodash-node/modern/internal/toObject.js"}],"/home/edin/projects/operation-transformation/node_modules/glu.js/node_modules/lodash-node/modern/internal/baseMatchesProperty.js":[function(require,module,exports){
var baseIsEqual = require('./baseIsEqual'),
    isStrictComparable = require('./isStrictComparable'),
    toObject = require('./toObject');

/**
 * The base implementation of `_.matchesProperty` which does not coerce `key`
 * to a string.
 *
 * @private
 * @param {string} key The key of the property to get.
 * @param {*} value The value to compare.
 * @returns {Function} Returns the new function.
 */
function baseMatchesProperty(key, value) {
  if (isStrictComparable(value)) {
    return function(object) {
      return object != null && object[key] === value &&
        (typeof value != 'undefined' || (key in toObject(object)));
    };
  }
  return function(object) {
    return object != null && baseIsEqual(value, object[key], null, true);
  };
}

module.exports = baseMatchesProperty;

},{"./baseIsEqual":"/home/edin/projects/operation-transformation/node_modules/glu.js/node_modules/lodash-node/modern/internal/baseIsEqual.js","./isStrictComparable":"/home/edin/projects/operation-transformation/node_modules/glu.js/node_modules/lodash-node/modern/internal/isStrictComparable.js","./toObject":"/home/edin/projects/operation-transformation/node_modules/glu.js/node_modules/lodash-node/modern/internal/toObject.js"}],"/home/edin/projects/operation-transformation/node_modules/glu.js/node_modules/lodash-node/modern/internal/baseProperty.js":[function(require,module,exports){
/**
 * The base implementation of `_.property` which does not coerce `key` to a string.
 *
 * @private
 * @param {string} key The key of the property to get.
 * @returns {Function} Returns the new function.
 */
function baseProperty(key) {
  return function(object) {
    return object == null ? undefined : object[key];
  };
}

module.exports = baseProperty;

},{}],"/home/edin/projects/operation-transformation/node_modules/glu.js/node_modules/lodash-node/modern/internal/baseToString.js":[function(require,module,exports){
/**
 * Converts `value` to a string if it is not one. An empty string is returned
 * for `null` or `undefined` values.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 */
function baseToString(value) {
  if (typeof value == 'string') {
    return value;
  }
  return value == null ? '' : (value + '');
}

module.exports = baseToString;

},{}],"/home/edin/projects/operation-transformation/node_modules/glu.js/node_modules/lodash-node/modern/internal/baseUniq.js":[function(require,module,exports){
var baseIndexOf = require('./baseIndexOf'),
    cacheIndexOf = require('./cacheIndexOf'),
    createCache = require('./createCache');

/**
 * The base implementation of `_.uniq` without support for callback shorthands
 * and `this` binding.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {Function} [iteratee] The function invoked per iteration.
 * @returns {Array} Returns the new duplicate-value-free array.
 */
function baseUniq(array, iteratee) {
  var index = -1,
      indexOf = baseIndexOf,
      length = array.length,
      isCommon = true,
      isLarge = isCommon && length >= 200,
      seen = isLarge ? createCache() : null,
      result = [];

  if (seen) {
    indexOf = cacheIndexOf;
    isCommon = false;
  } else {
    isLarge = false;
    seen = iteratee ? [] : result;
  }
  outer:
  while (++index < length) {
    var value = array[index],
        computed = iteratee ? iteratee(value, index, array) : value;

    if (isCommon && value === value) {
      var seenIndex = seen.length;
      while (seenIndex--) {
        if (seen[seenIndex] === computed) {
          continue outer;
        }
      }
      if (iteratee) {
        seen.push(computed);
      }
      result.push(value);
    }
    else if (indexOf(seen, computed, 0) < 0) {
      if (iteratee || isLarge) {
        seen.push(computed);
      }
      result.push(value);
    }
  }
  return result;
}

module.exports = baseUniq;

},{"./baseIndexOf":"/home/edin/projects/operation-transformation/node_modules/glu.js/node_modules/lodash-node/modern/internal/baseIndexOf.js","./cacheIndexOf":"/home/edin/projects/operation-transformation/node_modules/glu.js/node_modules/lodash-node/modern/internal/cacheIndexOf.js","./createCache":"/home/edin/projects/operation-transformation/node_modules/glu.js/node_modules/lodash-node/modern/internal/createCache.js"}],"/home/edin/projects/operation-transformation/node_modules/glu.js/node_modules/lodash-node/modern/internal/bindCallback.js":[function(require,module,exports){
var identity = require('../utility/identity');

/**
 * A specialized version of `baseCallback` which only supports `this` binding
 * and specifying the number of arguments to provide to `func`.
 *
 * @private
 * @param {Function} func The function to bind.
 * @param {*} thisArg The `this` binding of `func`.
 * @param {number} [argCount] The number of arguments to provide to `func`.
 * @returns {Function} Returns the callback.
 */
function bindCallback(func, thisArg, argCount) {
  if (typeof func != 'function') {
    return identity;
  }
  if (typeof thisArg == 'undefined') {
    return func;
  }
  switch (argCount) {
    case 1: return function(value) {
      return func.call(thisArg, value);
    };
    case 3: return function(value, index, collection) {
      return func.call(thisArg, value, index, collection);
    };
    case 4: return function(accumulator, value, index, collection) {
      return func.call(thisArg, accumulator, value, index, collection);
    };
    case 5: return function(value, other, key, object, source) {
      return func.call(thisArg, value, other, key, object, source);
    };
  }
  return function() {
    return func.apply(thisArg, arguments);
  };
}

module.exports = bindCallback;

},{"../utility/identity":"/home/edin/projects/operation-transformation/node_modules/glu.js/node_modules/lodash-node/modern/utility/identity.js"}],"/home/edin/projects/operation-transformation/node_modules/glu.js/node_modules/lodash-node/modern/internal/bufferClone.js":[function(require,module,exports){
(function (global){
var constant = require('../utility/constant'),
    isNative = require('../lang/isNative');

/** Native method references. */
var ArrayBuffer = isNative(ArrayBuffer = global.ArrayBuffer) && ArrayBuffer,
    bufferSlice = isNative(bufferSlice = ArrayBuffer && new ArrayBuffer(0).slice) && bufferSlice,
    floor = Math.floor,
    Uint8Array = isNative(Uint8Array = global.Uint8Array) && Uint8Array;

/** Used to clone array buffers. */
var Float64Array = (function() {
  // Safari 5 errors when using an array buffer to initialize a typed array
  // where the array buffer's `byteLength` is not a multiple of the typed
  // array's `BYTES_PER_ELEMENT`.
  try {
    var func = isNative(func = global.Float64Array) && func,
        result = new func(new ArrayBuffer(10), 0, 1) && func;
  } catch(e) {}
  return result;
}());

/** Used as the size, in bytes, of each `Float64Array` element. */
var FLOAT64_BYTES_PER_ELEMENT = Float64Array ? Float64Array.BYTES_PER_ELEMENT : 0;

/**
 * Creates a clone of the given array buffer.
 *
 * @private
 * @param {ArrayBuffer} buffer The array buffer to clone.
 * @returns {ArrayBuffer} Returns the cloned array buffer.
 */
function bufferClone(buffer) {
  return bufferSlice.call(buffer, 0);
}
if (!bufferSlice) {
  // PhantomJS has `ArrayBuffer` and `Uint8Array` but not `Float64Array`.
  bufferClone = !(ArrayBuffer && Uint8Array) ? constant(null) : function(buffer) {
    var byteLength = buffer.byteLength,
        floatLength = Float64Array ? floor(byteLength / FLOAT64_BYTES_PER_ELEMENT) : 0,
        offset = floatLength * FLOAT64_BYTES_PER_ELEMENT,
        result = new ArrayBuffer(byteLength);

    if (floatLength) {
      var view = new Float64Array(result, 0, floatLength);
      view.set(new Float64Array(buffer, 0, floatLength));
    }
    if (byteLength != offset) {
      view = new Uint8Array(result, offset);
      view.set(new Uint8Array(buffer, offset));
    }
    return result;
  };
}

module.exports = bufferClone;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"../lang/isNative":"/home/edin/projects/operation-transformation/node_modules/glu.js/node_modules/lodash-node/modern/lang/isNative.js","../utility/constant":"/home/edin/projects/operation-transformation/node_modules/glu.js/node_modules/lodash-node/modern/utility/constant.js"}],"/home/edin/projects/operation-transformation/node_modules/glu.js/node_modules/lodash-node/modern/internal/cacheIndexOf.js":[function(require,module,exports){
var isObject = require('../lang/isObject');

/**
 * Checks if `value` is in `cache` mimicking the return signature of
 * `_.indexOf` by returning `0` if the value is found, else `-1`.
 *
 * @private
 * @param {Object} cache The cache to search.
 * @param {*} value The value to search for.
 * @returns {number} Returns `0` if `value` is found, else `-1`.
 */
function cacheIndexOf(cache, value) {
  var data = cache.data,
      result = (typeof value == 'string' || isObject(value)) ? data.set.has(value) : data.hash[value];

  return result ? 0 : -1;
}

module.exports = cacheIndexOf;

},{"../lang/isObject":"/home/edin/projects/operation-transformation/node_modules/glu.js/node_modules/lodash-node/modern/lang/isObject.js"}],"/home/edin/projects/operation-transformation/node_modules/glu.js/node_modules/lodash-node/modern/internal/cachePush.js":[function(require,module,exports){
var isObject = require('../lang/isObject');

/**
 * Adds `value` to the cache.
 *
 * @private
 * @name push
 * @memberOf SetCache
 * @param {*} value The value to cache.
 */
function cachePush(value) {
  var data = this.data;
  if (typeof value == 'string' || isObject(value)) {
    data.set.add(value);
  } else {
    data.hash[value] = true;
  }
}

module.exports = cachePush;

},{"../lang/isObject":"/home/edin/projects/operation-transformation/node_modules/glu.js/node_modules/lodash-node/modern/lang/isObject.js"}],"/home/edin/projects/operation-transformation/node_modules/glu.js/node_modules/lodash-node/modern/internal/createBaseEach.js":[function(require,module,exports){
var isLength = require('./isLength'),
    toObject = require('./toObject');

/**
 * Creates a `baseEach` or `baseEachRight` function.
 *
 * @private
 * @param {Function} eachFunc The function to iterate over a collection.
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {Function} Returns the new base function.
 */
function createBaseEach(eachFunc, fromRight) {
  return function(collection, iteratee) {
    var length = collection ? collection.length : 0;
    if (!isLength(length)) {
      return eachFunc(collection, iteratee);
    }
    var index = fromRight ? length : -1,
        iterable = toObject(collection);

    while ((fromRight ? index-- : ++index < length)) {
      if (iteratee(iterable[index], index, iterable) === false) {
        break;
      }
    }
    return collection;
  };
}

module.exports = createBaseEach;

},{"./isLength":"/home/edin/projects/operation-transformation/node_modules/glu.js/node_modules/lodash-node/modern/internal/isLength.js","./toObject":"/home/edin/projects/operation-transformation/node_modules/glu.js/node_modules/lodash-node/modern/internal/toObject.js"}],"/home/edin/projects/operation-transformation/node_modules/glu.js/node_modules/lodash-node/modern/internal/createBaseFor.js":[function(require,module,exports){
var toObject = require('./toObject');

/**
 * Creates a base function for `_.forIn` or `_.forInRight`.
 *
 * @private
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {Function} Returns the new base function.
 */
function createBaseFor(fromRight) {
  return function(object, iteratee, keysFunc) {
    var iterable = toObject(object),
        props = keysFunc(object),
        length = props.length,
        index = fromRight ? length : -1;

    while ((fromRight ? index-- : ++index < length)) {
      var key = props[index];
      if (iteratee(iterable[key], key, iterable) === false) {
        break;
      }
    }
    return object;
  };
}

module.exports = createBaseFor;

},{"./toObject":"/home/edin/projects/operation-transformation/node_modules/glu.js/node_modules/lodash-node/modern/internal/toObject.js"}],"/home/edin/projects/operation-transformation/node_modules/glu.js/node_modules/lodash-node/modern/internal/createCache.js":[function(require,module,exports){
(function (global){
var SetCache = require('./SetCache'),
    constant = require('../utility/constant'),
    isNative = require('../lang/isNative');

/** Native method references. */
var Set = isNative(Set = global.Set) && Set;

/* Native method references for those with the same name as other `lodash` methods. */
var nativeCreate = isNative(nativeCreate = Object.create) && nativeCreate;

/**
 * Creates a `Set` cache object to optimize linear searches of large arrays.
 *
 * @private
 * @param {Array} [values] The values to cache.
 * @returns {null|Object} Returns the new cache object if `Set` is supported, else `null`.
 */
var createCache = !(nativeCreate && Set) ? constant(null) : function(values) {
  return new SetCache(values);
};

module.exports = createCache;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"../lang/isNative":"/home/edin/projects/operation-transformation/node_modules/glu.js/node_modules/lodash-node/modern/lang/isNative.js","../utility/constant":"/home/edin/projects/operation-transformation/node_modules/glu.js/node_modules/lodash-node/modern/utility/constant.js","./SetCache":"/home/edin/projects/operation-transformation/node_modules/glu.js/node_modules/lodash-node/modern/internal/SetCache.js"}],"/home/edin/projects/operation-transformation/node_modules/glu.js/node_modules/lodash-node/modern/internal/createFindKey.js":[function(require,module,exports){
var baseCallback = require('./baseCallback'),
    baseFind = require('./baseFind');

/**
 * Creates a `_.findKey` or `_.findLastKey` function.
 *
 * @private
 * @param {Function} objectFunc The function to iterate over an object.
 * @returns {Function} Returns the new find function.
 */
function createFindKey(objectFunc) {
  return function(object, predicate, thisArg) {
    predicate = baseCallback(predicate, thisArg, 3);
    return baseFind(object, predicate, objectFunc, true);
  };
}

module.exports = createFindKey;

},{"./baseCallback":"/home/edin/projects/operation-transformation/node_modules/glu.js/node_modules/lodash-node/modern/internal/baseCallback.js","./baseFind":"/home/edin/projects/operation-transformation/node_modules/glu.js/node_modules/lodash-node/modern/internal/baseFind.js"}],"/home/edin/projects/operation-transformation/node_modules/glu.js/node_modules/lodash-node/modern/internal/createForEach.js":[function(require,module,exports){
var bindCallback = require('./bindCallback'),
    isArray = require('../lang/isArray');

/**
 * Creates a function for `_.forEach` or `_.forEachRight`.
 *
 * @private
 * @param {Function} arrayFunc The function to iterate over an array.
 * @param {Function} eachFunc The function to iterate over a collection.
 * @returns {Function} Returns the new each function.
 */
function createForEach(arrayFunc, eachFunc) {
  return function(collection, iteratee, thisArg) {
    return (typeof iteratee == 'function' && typeof thisArg == 'undefined' && isArray(collection))
      ? arrayFunc(collection, iteratee)
      : eachFunc(collection, bindCallback(iteratee, thisArg, 3));
  };
}

module.exports = createForEach;

},{"../lang/isArray":"/home/edin/projects/operation-transformation/node_modules/glu.js/node_modules/lodash-node/modern/lang/isArray.js","./bindCallback":"/home/edin/projects/operation-transformation/node_modules/glu.js/node_modules/lodash-node/modern/internal/bindCallback.js"}],"/home/edin/projects/operation-transformation/node_modules/glu.js/node_modules/lodash-node/modern/internal/createForOwn.js":[function(require,module,exports){
var bindCallback = require('./bindCallback');

/**
 * Creates a function for `_.forOwn` or `_.forOwnRight`.
 *
 * @private
 * @param {Function} objectFunc The function to iterate over an object.
 * @returns {Function} Returns the new each function.
 */
function createForOwn(objectFunc) {
  return function(object, iteratee, thisArg) {
    if (typeof iteratee != 'function' || typeof thisArg != 'undefined') {
      iteratee = bindCallback(iteratee, thisArg, 3);
    }
    return objectFunc(object, iteratee);
  };
}

module.exports = createForOwn;

},{"./bindCallback":"/home/edin/projects/operation-transformation/node_modules/glu.js/node_modules/lodash-node/modern/internal/bindCallback.js"}],"/home/edin/projects/operation-transformation/node_modules/glu.js/node_modules/lodash-node/modern/internal/equalArrays.js":[function(require,module,exports){
/**
 * A specialized version of `baseIsEqualDeep` for arrays with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Array} array The array to compare.
 * @param {Array} other The other array to compare.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Function} [customizer] The function to customize comparing arrays.
 * @param {boolean} [isLoose] Specify performing partial comparisons.
 * @param {Array} [stackA] Tracks traversed `value` objects.
 * @param {Array} [stackB] Tracks traversed `other` objects.
 * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
 */
function equalArrays(array, other, equalFunc, customizer, isLoose, stackA, stackB) {
  var index = -1,
      arrLength = array.length,
      othLength = other.length,
      result = true;

  if (arrLength != othLength && !(isLoose && othLength > arrLength)) {
    return false;
  }
  // Deep compare the contents, ignoring non-numeric properties.
  while (result && ++index < arrLength) {
    var arrValue = array[index],
        othValue = other[index];

    result = undefined;
    if (customizer) {
      result = isLoose
        ? customizer(othValue, arrValue, index)
        : customizer(arrValue, othValue, index);
    }
    if (typeof result == 'undefined') {
      // Recursively compare arrays (susceptible to call stack limits).
      if (isLoose) {
        var othIndex = othLength;
        while (othIndex--) {
          othValue = other[othIndex];
          result = (arrValue && arrValue === othValue) || equalFunc(arrValue, othValue, customizer, isLoose, stackA, stackB);
          if (result) {
            break;
          }
        }
      } else {
        result = (arrValue && arrValue === othValue) || equalFunc(arrValue, othValue, customizer, isLoose, stackA, stackB);
      }
    }
  }
  return !!result;
}

module.exports = equalArrays;

},{}],"/home/edin/projects/operation-transformation/node_modules/glu.js/node_modules/lodash-node/modern/internal/equalByTag.js":[function(require,module,exports){
/** `Object#toString` result references. */
var boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    numberTag = '[object Number]',
    regexpTag = '[object RegExp]',
    stringTag = '[object String]';

/**
 * A specialized version of `baseIsEqualDeep` for comparing objects of
 * the same `toStringTag`.
 *
 * **Note:** This function only supports comparing values with tags of
 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
 *
 * @private
 * @param {Object} value The object to compare.
 * @param {Object} other The other object to compare.
 * @param {string} tag The `toStringTag` of the objects to compare.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function equalByTag(object, other, tag) {
  switch (tag) {
    case boolTag:
    case dateTag:
      // Coerce dates and booleans to numbers, dates to milliseconds and booleans
      // to `1` or `0` treating invalid dates coerced to `NaN` as not equal.
      return +object == +other;

    case errorTag:
      return object.name == other.name && object.message == other.message;

    case numberTag:
      // Treat `NaN` vs. `NaN` as equal.
      return (object != +object)
        ? other != +other
        // But, treat `-0` vs. `+0` as not equal.
        : (object == 0 ? ((1 / object) == (1 / other)) : object == +other);

    case regexpTag:
    case stringTag:
      // Coerce regexes to strings and treat strings primitives and string
      // objects as equal. See https://es5.github.io/#x15.10.6.4 for more details.
      return object == (other + '');
  }
  return false;
}

module.exports = equalByTag;

},{}],"/home/edin/projects/operation-transformation/node_modules/glu.js/node_modules/lodash-node/modern/internal/equalObjects.js":[function(require,module,exports){
var keys = require('../object/keys');

/** Used for native method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * A specialized version of `baseIsEqualDeep` for objects with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Function} [customizer] The function to customize comparing values.
 * @param {boolean} [isLoose] Specify performing partial comparisons.
 * @param {Array} [stackA] Tracks traversed `value` objects.
 * @param {Array} [stackB] Tracks traversed `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function equalObjects(object, other, equalFunc, customizer, isLoose, stackA, stackB) {
  var objProps = keys(object),
      objLength = objProps.length,
      othProps = keys(other),
      othLength = othProps.length;

  if (objLength != othLength && !isLoose) {
    return false;
  }
  var skipCtor = isLoose,
      index = -1;

  while (++index < objLength) {
    var key = objProps[index],
        result = isLoose ? key in other : hasOwnProperty.call(other, key);

    if (result) {
      var objValue = object[key],
          othValue = other[key];

      result = undefined;
      if (customizer) {
        result = isLoose
          ? customizer(othValue, objValue, key)
          : customizer(objValue, othValue, key);
      }
      if (typeof result == 'undefined') {
        // Recursively compare objects (susceptible to call stack limits).
        result = (objValue && objValue === othValue) || equalFunc(objValue, othValue, customizer, isLoose, stackA, stackB);
      }
    }
    if (!result) {
      return false;
    }
    skipCtor || (skipCtor = key == 'constructor');
  }
  if (!skipCtor) {
    var objCtor = object.constructor,
        othCtor = other.constructor;

    // Non `Object` object instances with different constructors are not equal.
    if (objCtor != othCtor &&
        ('constructor' in object && 'constructor' in other) &&
        !(typeof objCtor == 'function' && objCtor instanceof objCtor &&
          typeof othCtor == 'function' && othCtor instanceof othCtor)) {
      return false;
    }
  }
  return true;
}

module.exports = equalObjects;

},{"../object/keys":"/home/edin/projects/operation-transformation/node_modules/glu.js/node_modules/lodash-node/modern/object/keys.js"}],"/home/edin/projects/operation-transformation/node_modules/glu.js/node_modules/lodash-node/modern/internal/indexOfNaN.js":[function(require,module,exports){
/**
 * Gets the index at which the first occurrence of `NaN` is found in `array`.
 *
 * @private
 * @param {Array} array The array to search.
 * @param {number} fromIndex The index to search from.
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {number} Returns the index of the matched `NaN`, else `-1`.
 */
function indexOfNaN(array, fromIndex, fromRight) {
  var length = array.length,
      index = fromIndex + (fromRight ? 0 : -1);

  while ((fromRight ? index-- : ++index < length)) {
    var other = array[index];
    if (other !== other) {
      return index;
    }
  }
  return -1;
}

module.exports = indexOfNaN;

},{}],"/home/edin/projects/operation-transformation/node_modules/glu.js/node_modules/lodash-node/modern/internal/initCloneArray.js":[function(require,module,exports){
/** Used for native method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Initializes an array clone.
 *
 * @private
 * @param {Array} array The array to clone.
 * @returns {Array} Returns the initialized clone.
 */
function initCloneArray(array) {
  var length = array.length,
      result = new array.constructor(length);

  // Add array properties assigned by `RegExp#exec`.
  if (length && typeof array[0] == 'string' && hasOwnProperty.call(array, 'index')) {
    result.index = array.index;
    result.input = array.input;
  }
  return result;
}

module.exports = initCloneArray;

},{}],"/home/edin/projects/operation-transformation/node_modules/glu.js/node_modules/lodash-node/modern/internal/initCloneByTag.js":[function(require,module,exports){
var bufferClone = require('./bufferClone');

/** `Object#toString` result references. */
var boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    numberTag = '[object Number]',
    regexpTag = '[object RegExp]',
    stringTag = '[object String]';

var arrayBufferTag = '[object ArrayBuffer]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';

/** Used to match `RegExp` flags from their coerced string values. */
var reFlags = /\w*$/;

/**
 * Initializes an object clone based on its `toStringTag`.
 *
 * **Note:** This function only supports cloning values with tags of
 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
 *
 *
 * @private
 * @param {Object} object The object to clone.
 * @param {string} tag The `toStringTag` of the object to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the initialized clone.
 */
function initCloneByTag(object, tag, isDeep) {
  var Ctor = object.constructor;
  switch (tag) {
    case arrayBufferTag:
      return bufferClone(object);

    case boolTag:
    case dateTag:
      return new Ctor(+object);

    case float32Tag: case float64Tag:
    case int8Tag: case int16Tag: case int32Tag:
    case uint8Tag: case uint8ClampedTag: case uint16Tag: case uint32Tag:
      var buffer = object.buffer;
      return new Ctor(isDeep ? bufferClone(buffer) : buffer, object.byteOffset, object.length);

    case numberTag:
    case stringTag:
      return new Ctor(object);

    case regexpTag:
      var result = new Ctor(object.source, reFlags.exec(object));
      result.lastIndex = object.lastIndex;
  }
  return result;
}

module.exports = initCloneByTag;

},{"./bufferClone":"/home/edin/projects/operation-transformation/node_modules/glu.js/node_modules/lodash-node/modern/internal/bufferClone.js"}],"/home/edin/projects/operation-transformation/node_modules/glu.js/node_modules/lodash-node/modern/internal/initCloneObject.js":[function(require,module,exports){
/**
 * Initializes an object clone.
 *
 * @private
 * @param {Object} object The object to clone.
 * @returns {Object} Returns the initialized clone.
 */
function initCloneObject(object) {
  var Ctor = object.constructor;
  if (!(typeof Ctor == 'function' && Ctor instanceof Ctor)) {
    Ctor = Object;
  }
  return new Ctor;
}

module.exports = initCloneObject;

},{}],"/home/edin/projects/operation-transformation/node_modules/glu.js/node_modules/lodash-node/modern/internal/isIndex.js":[function(require,module,exports){
/**
 * Used as the [maximum length](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-number.max_safe_integer)
 * of an array-like value.
 */
var MAX_SAFE_INTEGER = Math.pow(2, 53) - 1;

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
  value = +value;
  length = length == null ? MAX_SAFE_INTEGER : length;
  return value > -1 && value % 1 == 0 && value < length;
}

module.exports = isIndex;

},{}],"/home/edin/projects/operation-transformation/node_modules/glu.js/node_modules/lodash-node/modern/internal/isIterateeCall.js":[function(require,module,exports){
var isIndex = require('./isIndex'),
    isLength = require('./isLength'),
    isObject = require('../lang/isObject');

/**
 * Checks if the provided arguments are from an iteratee call.
 *
 * @private
 * @param {*} value The potential iteratee value argument.
 * @param {*} index The potential iteratee index or key argument.
 * @param {*} object The potential iteratee object argument.
 * @returns {boolean} Returns `true` if the arguments are from an iteratee call, else `false`.
 */
function isIterateeCall(value, index, object) {
  if (!isObject(object)) {
    return false;
  }
  var type = typeof index;
  if (type == 'number') {
    var length = object.length,
        prereq = isLength(length) && isIndex(index, length);
  } else {
    prereq = type == 'string' && index in object;
  }
  if (prereq) {
    var other = object[index];
    return value === value ? (value === other) : (other !== other);
  }
  return false;
}

module.exports = isIterateeCall;

},{"../lang/isObject":"/home/edin/projects/operation-transformation/node_modules/glu.js/node_modules/lodash-node/modern/lang/isObject.js","./isIndex":"/home/edin/projects/operation-transformation/node_modules/glu.js/node_modules/lodash-node/modern/internal/isIndex.js","./isLength":"/home/edin/projects/operation-transformation/node_modules/glu.js/node_modules/lodash-node/modern/internal/isLength.js"}],"/home/edin/projects/operation-transformation/node_modules/glu.js/node_modules/lodash-node/modern/internal/isLength.js":[function(require,module,exports){
/**
 * Used as the [maximum length](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-number.max_safe_integer)
 * of an array-like value.
 */
var MAX_SAFE_INTEGER = Math.pow(2, 53) - 1;

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This function is based on [`ToLength`](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength).
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 */
function isLength(value) {
  return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

module.exports = isLength;

},{}],"/home/edin/projects/operation-transformation/node_modules/glu.js/node_modules/lodash-node/modern/internal/isObjectLike.js":[function(require,module,exports){
/**
 * Checks if `value` is object-like.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

module.exports = isObjectLike;

},{}],"/home/edin/projects/operation-transformation/node_modules/glu.js/node_modules/lodash-node/modern/internal/isStrictComparable.js":[function(require,module,exports){
var isObject = require('../lang/isObject');

/**
 * Checks if `value` is suitable for strict equality comparisons, i.e. `===`.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` if suitable for strict
 *  equality comparisons, else `false`.
 */
function isStrictComparable(value) {
  return value === value && (value === 0 ? ((1 / value) > 0) : !isObject(value));
}

module.exports = isStrictComparable;

},{"../lang/isObject":"/home/edin/projects/operation-transformation/node_modules/glu.js/node_modules/lodash-node/modern/lang/isObject.js"}],"/home/edin/projects/operation-transformation/node_modules/glu.js/node_modules/lodash-node/modern/internal/shimKeys.js":[function(require,module,exports){
var isArguments = require('../lang/isArguments'),
    isArray = require('../lang/isArray'),
    isIndex = require('./isIndex'),
    isLength = require('./isLength'),
    keysIn = require('../object/keysIn'),
    support = require('../support');

/** Used for native method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * A fallback implementation of `Object.keys` which creates an array of the
 * own enumerable property names of `object`.
 *
 * @private
 * @param {Object} object The object to inspect.
 * @returns {Array} Returns the array of property names.
 */
function shimKeys(object) {
  var props = keysIn(object),
      propsLength = props.length,
      length = propsLength && object.length;

  var allowIndexes = length && isLength(length) &&
    (isArray(object) || (support.nonEnumArgs && isArguments(object)));

  var index = -1,
      result = [];

  while (++index < propsLength) {
    var key = props[index];
    if ((allowIndexes && isIndex(key, length)) || hasOwnProperty.call(object, key)) {
      result.push(key);
    }
  }
  return result;
}

module.exports = shimKeys;

},{"../lang/isArguments":"/home/edin/projects/operation-transformation/node_modules/glu.js/node_modules/lodash-node/modern/lang/isArguments.js","../lang/isArray":"/home/edin/projects/operation-transformation/node_modules/glu.js/node_modules/lodash-node/modern/lang/isArray.js","../object/keysIn":"/home/edin/projects/operation-transformation/node_modules/glu.js/node_modules/lodash-node/modern/object/keysIn.js","../support":"/home/edin/projects/operation-transformation/node_modules/glu.js/node_modules/lodash-node/modern/support.js","./isIndex":"/home/edin/projects/operation-transformation/node_modules/glu.js/node_modules/lodash-node/modern/internal/isIndex.js","./isLength":"/home/edin/projects/operation-transformation/node_modules/glu.js/node_modules/lodash-node/modern/internal/isLength.js"}],"/home/edin/projects/operation-transformation/node_modules/glu.js/node_modules/lodash-node/modern/internal/sortedUniq.js":[function(require,module,exports){
/**
 * An implementation of `_.uniq` optimized for sorted arrays without support
 * for callback shorthands and `this` binding.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {Function} [iteratee] The function invoked per iteration.
 * @returns {Array} Returns the new duplicate-value-free array.
 */
function sortedUniq(array, iteratee) {
  var seen,
      index = -1,
      length = array.length,
      resIndex = -1,
      result = [];

  while (++index < length) {
    var value = array[index],
        computed = iteratee ? iteratee(value, index, array) : value;

    if (!index || seen !== computed) {
      seen = computed;
      result[++resIndex] = value;
    }
  }
  return result;
}

module.exports = sortedUniq;

},{}],"/home/edin/projects/operation-transformation/node_modules/glu.js/node_modules/lodash-node/modern/internal/toObject.js":[function(require,module,exports){
var isObject = require('../lang/isObject');

/**
 * Converts `value` to an object if it is not one.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {Object} Returns the object.
 */
function toObject(value) {
  return isObject(value) ? value : Object(value);
}

module.exports = toObject;

},{"../lang/isObject":"/home/edin/projects/operation-transformation/node_modules/glu.js/node_modules/lodash-node/modern/lang/isObject.js"}],"/home/edin/projects/operation-transformation/node_modules/glu.js/node_modules/lodash-node/modern/lang/clone.js":[function(require,module,exports){
var baseClone = require('../internal/baseClone'),
    bindCallback = require('../internal/bindCallback'),
    isIterateeCall = require('../internal/isIterateeCall');

/**
 * Creates a clone of `value`. If `isDeep` is `true` nested objects are cloned,
 * otherwise they are assigned by reference. If `customizer` is provided it is
 * invoked to produce the cloned values. If `customizer` returns `undefined`
 * cloning is handled by the method instead. The `customizer` is bound to
 * `thisArg` and invoked with two argument; (value [, index|key, object]).
 *
 * **Note:** This method is loosely based on the
 * [structured clone algorithm](http://www.w3.org/TR/html5/infrastructure.html#internal-structured-cloning-algorithm).
 * The enumerable properties of `arguments` objects and objects created by
 * constructors other than `Object` are cloned to plain `Object` objects. An
 * empty object is returned for uncloneable values such as functions, DOM nodes,
 * Maps, Sets, and WeakMaps.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @param {Function} [customizer] The function to customize cloning values.
 * @param {*} [thisArg] The `this` binding of `customizer`.
 * @returns {*} Returns the cloned value.
 * @example
 *
 * var users = [
 *   { 'user': 'barney' },
 *   { 'user': 'fred' }
 * ];
 *
 * var shallow = _.clone(users);
 * shallow[0] === users[0];
 * // => true
 *
 * var deep = _.clone(users, true);
 * deep[0] === users[0];
 * // => false
 *
 * // using a customizer callback
 * var el = _.clone(document.body, function(value) {
 *   if (_.isElement(value)) {
 *     return value.cloneNode(false);
 *   }
 * });
 *
 * el === document.body
 * // => false
 * el.nodeName
 * // => BODY
 * el.childNodes.length;
 * // => 0
 */
function clone(value, isDeep, customizer, thisArg) {
  if (isDeep && typeof isDeep != 'boolean' && isIterateeCall(value, isDeep, customizer)) {
    isDeep = false;
  }
  else if (typeof isDeep == 'function') {
    thisArg = customizer;
    customizer = isDeep;
    isDeep = false;
  }
  customizer = typeof customizer == 'function' && bindCallback(customizer, thisArg, 1);
  return baseClone(value, isDeep, customizer);
}

module.exports = clone;

},{"../internal/baseClone":"/home/edin/projects/operation-transformation/node_modules/glu.js/node_modules/lodash-node/modern/internal/baseClone.js","../internal/bindCallback":"/home/edin/projects/operation-transformation/node_modules/glu.js/node_modules/lodash-node/modern/internal/bindCallback.js","../internal/isIterateeCall":"/home/edin/projects/operation-transformation/node_modules/glu.js/node_modules/lodash-node/modern/internal/isIterateeCall.js"}],"/home/edin/projects/operation-transformation/node_modules/glu.js/node_modules/lodash-node/modern/lang/isArguments.js":[function(require,module,exports){
var isLength = require('../internal/isLength'),
    isObjectLike = require('../internal/isObjectLike');

/** `Object#toString` result references. */
var argsTag = '[object Arguments]';

/** Used for native method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the [`toStringTag`](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.prototype.tostring)
 * of values.
 */
var objToString = objectProto.toString;

/**
 * Checks if `value` is classified as an `arguments` object.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
function isArguments(value) {
  var length = isObjectLike(value) ? value.length : undefined;
  return isLength(length) && objToString.call(value) == argsTag;
}

module.exports = isArguments;

},{"../internal/isLength":"/home/edin/projects/operation-transformation/node_modules/glu.js/node_modules/lodash-node/modern/internal/isLength.js","../internal/isObjectLike":"/home/edin/projects/operation-transformation/node_modules/glu.js/node_modules/lodash-node/modern/internal/isObjectLike.js"}],"/home/edin/projects/operation-transformation/node_modules/glu.js/node_modules/lodash-node/modern/lang/isArray.js":[function(require,module,exports){
var isLength = require('../internal/isLength'),
    isNative = require('./isNative'),
    isObjectLike = require('../internal/isObjectLike');

/** `Object#toString` result references. */
var arrayTag = '[object Array]';

/** Used for native method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the [`toStringTag`](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.prototype.tostring)
 * of values.
 */
var objToString = objectProto.toString;

/* Native method references for those with the same name as other `lodash` methods. */
var nativeIsArray = isNative(nativeIsArray = Array.isArray) && nativeIsArray;

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(function() { return arguments; }());
 * // => false
 */
var isArray = nativeIsArray || function(value) {
  return isObjectLike(value) && isLength(value.length) && objToString.call(value) == arrayTag;
};

module.exports = isArray;

},{"../internal/isLength":"/home/edin/projects/operation-transformation/node_modules/glu.js/node_modules/lodash-node/modern/internal/isLength.js","../internal/isObjectLike":"/home/edin/projects/operation-transformation/node_modules/glu.js/node_modules/lodash-node/modern/internal/isObjectLike.js","./isNative":"/home/edin/projects/operation-transformation/node_modules/glu.js/node_modules/lodash-node/modern/lang/isNative.js"}],"/home/edin/projects/operation-transformation/node_modules/glu.js/node_modules/lodash-node/modern/lang/isFunction.js":[function(require,module,exports){
(function (global){
var baseIsFunction = require('../internal/baseIsFunction'),
    isNative = require('./isNative');

/** `Object#toString` result references. */
var funcTag = '[object Function]';

/** Used for native method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the [`toStringTag`](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.prototype.tostring)
 * of values.
 */
var objToString = objectProto.toString;

/** Native method references. */
var Uint8Array = isNative(Uint8Array = global.Uint8Array) && Uint8Array;

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
var isFunction = !(baseIsFunction(/x/) || (Uint8Array && !baseIsFunction(Uint8Array))) ? baseIsFunction : function(value) {
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in older versions of Chrome and Safari which return 'function' for regexes
  // and Safari 8 equivalents which return 'object' for typed array constructors.
  return objToString.call(value) == funcTag;
};

module.exports = isFunction;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"../internal/baseIsFunction":"/home/edin/projects/operation-transformation/node_modules/glu.js/node_modules/lodash-node/modern/internal/baseIsFunction.js","./isNative":"/home/edin/projects/operation-transformation/node_modules/glu.js/node_modules/lodash-node/modern/lang/isNative.js"}],"/home/edin/projects/operation-transformation/node_modules/glu.js/node_modules/lodash-node/modern/lang/isNative.js":[function(require,module,exports){
var escapeRegExp = require('../string/escapeRegExp'),
    isObjectLike = require('../internal/isObjectLike');

/** `Object#toString` result references. */
var funcTag = '[object Function]';

/** Used to detect host constructors (Safari > 5). */
var reHostCtor = /^\[object .+?Constructor\]$/;

/** Used for native method references. */
var objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var fnToString = Function.prototype.toString;

/**
 * Used to resolve the [`toStringTag`](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.prototype.tostring)
 * of values.
 */
var objToString = objectProto.toString;

/** Used to detect if a method is native. */
var reNative = RegExp('^' +
  escapeRegExp(objToString)
  .replace(/toString|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/**
 * Checks if `value` is a native function.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function, else `false`.
 * @example
 *
 * _.isNative(Array.prototype.push);
 * // => true
 *
 * _.isNative(_);
 * // => false
 */
function isNative(value) {
  if (value == null) {
    return false;
  }
  if (objToString.call(value) == funcTag) {
    return reNative.test(fnToString.call(value));
  }
  return isObjectLike(value) && reHostCtor.test(value);
}

module.exports = isNative;

},{"../internal/isObjectLike":"/home/edin/projects/operation-transformation/node_modules/glu.js/node_modules/lodash-node/modern/internal/isObjectLike.js","../string/escapeRegExp":"/home/edin/projects/operation-transformation/node_modules/glu.js/node_modules/lodash-node/modern/string/escapeRegExp.js"}],"/home/edin/projects/operation-transformation/node_modules/glu.js/node_modules/lodash-node/modern/lang/isObject.js":[function(require,module,exports){
/**
 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(1);
 * // => false
 */
function isObject(value) {
  // Avoid a V8 JIT bug in Chrome 19-20.
  // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
  var type = typeof value;
  return type == 'function' || (!!value && type == 'object');
}

module.exports = isObject;

},{}],"/home/edin/projects/operation-transformation/node_modules/glu.js/node_modules/lodash-node/modern/lang/isTypedArray.js":[function(require,module,exports){
var isLength = require('../internal/isLength'),
    isObjectLike = require('../internal/isObjectLike');

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    funcTag = '[object Function]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    objectTag = '[object Object]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    weakMapTag = '[object WeakMap]';

var arrayBufferTag = '[object ArrayBuffer]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';

/** Used to identify `toStringTag` values of typed arrays. */
var typedArrayTags = {};
typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
typedArrayTags[uint32Tag] = true;
typedArrayTags[argsTag] = typedArrayTags[arrayTag] =
typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
typedArrayTags[dateTag] = typedArrayTags[errorTag] =
typedArrayTags[funcTag] = typedArrayTags[mapTag] =
typedArrayTags[numberTag] = typedArrayTags[objectTag] =
typedArrayTags[regexpTag] = typedArrayTags[setTag] =
typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = false;

/** Used for native method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the [`toStringTag`](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.prototype.tostring)
 * of values.
 */
var objToString = objectProto.toString;

/**
 * Checks if `value` is classified as a typed array.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isTypedArray(new Uint8Array);
 * // => true
 *
 * _.isTypedArray([]);
 * // => false
 */
function isTypedArray(value) {
  return isObjectLike(value) && isLength(value.length) && !!typedArrayTags[objToString.call(value)];
}

module.exports = isTypedArray;

},{"../internal/isLength":"/home/edin/projects/operation-transformation/node_modules/glu.js/node_modules/lodash-node/modern/internal/isLength.js","../internal/isObjectLike":"/home/edin/projects/operation-transformation/node_modules/glu.js/node_modules/lodash-node/modern/internal/isObjectLike.js"}],"/home/edin/projects/operation-transformation/node_modules/glu.js/node_modules/lodash-node/modern/object/findKey.js":[function(require,module,exports){
var baseForOwn = require('../internal/baseForOwn'),
    createFindKey = require('../internal/createFindKey');

/**
 * This method is like `_.find` except that it returns the key of the first
 * element `predicate` returns truthy for instead of the element itself.
 *
 * If a property name is provided for `predicate` the created `_.property`
 * style callback returns the property value of the given element.
 *
 * If a value is also provided for `thisArg` the created `_.matchesProperty`
 * style callback returns `true` for elements that have a matching property
 * value, else `false`.
 *
 * If an object is provided for `predicate` the created `_.matches` style
 * callback returns `true` for elements that have the properties of the given
 * object, else `false`.
 *
 * @static
 * @memberOf _
 * @category Object
 * @param {Object} object The object to search.
 * @param {Function|Object|string} [predicate=_.identity] The function invoked
 *  per iteration.
 * @param {*} [thisArg] The `this` binding of `predicate`.
 * @returns {string|undefined} Returns the key of the matched element, else `undefined`.
 * @example
 *
 * var users = {
 *   'barney':  { 'age': 36, 'active': true },
 *   'fred':    { 'age': 40, 'active': false },
 *   'pebbles': { 'age': 1,  'active': true }
 * };
 *
 * _.findKey(users, function(chr) {
 *   return chr.age < 40;
 * });
 * // => 'barney' (iteration order is not guaranteed)
 *
 * // using the `_.matches` callback shorthand
 * _.findKey(users, { 'age': 1, 'active': true });
 * // => 'pebbles'
 *
 * // using the `_.matchesProperty` callback shorthand
 * _.findKey(users, 'active', false);
 * // => 'fred'
 *
 * // using the `_.property` callback shorthand
 * _.findKey(users, 'active');
 * // => 'barney'
 */
var findKey = createFindKey(baseForOwn);

module.exports = findKey;

},{"../internal/baseForOwn":"/home/edin/projects/operation-transformation/node_modules/glu.js/node_modules/lodash-node/modern/internal/baseForOwn.js","../internal/createFindKey":"/home/edin/projects/operation-transformation/node_modules/glu.js/node_modules/lodash-node/modern/internal/createFindKey.js"}],"/home/edin/projects/operation-transformation/node_modules/glu.js/node_modules/lodash-node/modern/object/forOwn.js":[function(require,module,exports){
var baseForOwn = require('../internal/baseForOwn'),
    createForOwn = require('../internal/createForOwn');

/**
 * Iterates over own enumerable properties of an object invoking `iteratee`
 * for each property. The `iteratee` is bound to `thisArg` and invoked with
 * three arguments: (value, key, object). Iterator functions may exit iteration
 * early by explicitly returning `false`.
 *
 * @static
 * @memberOf _
 * @category Object
 * @param {Object} object The object to iterate over.
 * @param {Function} [iteratee=_.identity] The function invoked per iteration.
 * @param {*} [thisArg] The `this` binding of `iteratee`.
 * @returns {Object} Returns `object`.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.forOwn(new Foo, function(value, key) {
 *   console.log(key);
 * });
 * // => logs 'a' and 'b' (iteration order is not guaranteed)
 */
var forOwn = createForOwn(baseForOwn);

module.exports = forOwn;

},{"../internal/baseForOwn":"/home/edin/projects/operation-transformation/node_modules/glu.js/node_modules/lodash-node/modern/internal/baseForOwn.js","../internal/createForOwn":"/home/edin/projects/operation-transformation/node_modules/glu.js/node_modules/lodash-node/modern/internal/createForOwn.js"}],"/home/edin/projects/operation-transformation/node_modules/glu.js/node_modules/lodash-node/modern/object/keys.js":[function(require,module,exports){
var isLength = require('../internal/isLength'),
    isNative = require('../lang/isNative'),
    isObject = require('../lang/isObject'),
    shimKeys = require('../internal/shimKeys');

/* Native method references for those with the same name as other `lodash` methods. */
var nativeKeys = isNative(nativeKeys = Object.keys) && nativeKeys;

/**
 * Creates an array of the own enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects. See the
 * [ES spec](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.keys)
 * for more details.
 *
 * @static
 * @memberOf _
 * @category Object
 * @param {Object} object The object to inspect.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keys(new Foo);
 * // => ['a', 'b'] (iteration order is not guaranteed)
 *
 * _.keys('hi');
 * // => ['0', '1']
 */
var keys = !nativeKeys ? shimKeys : function(object) {
  if (object) {
    var Ctor = object.constructor,
        length = object.length;
  }
  if ((typeof Ctor == 'function' && Ctor.prototype === object) ||
      (typeof object != 'function' && (length && isLength(length)))) {
    return shimKeys(object);
  }
  return isObject(object) ? nativeKeys(object) : [];
};

module.exports = keys;

},{"../internal/isLength":"/home/edin/projects/operation-transformation/node_modules/glu.js/node_modules/lodash-node/modern/internal/isLength.js","../internal/shimKeys":"/home/edin/projects/operation-transformation/node_modules/glu.js/node_modules/lodash-node/modern/internal/shimKeys.js","../lang/isNative":"/home/edin/projects/operation-transformation/node_modules/glu.js/node_modules/lodash-node/modern/lang/isNative.js","../lang/isObject":"/home/edin/projects/operation-transformation/node_modules/glu.js/node_modules/lodash-node/modern/lang/isObject.js"}],"/home/edin/projects/operation-transformation/node_modules/glu.js/node_modules/lodash-node/modern/object/keysIn.js":[function(require,module,exports){
var isArguments = require('../lang/isArguments'),
    isArray = require('../lang/isArray'),
    isIndex = require('../internal/isIndex'),
    isLength = require('../internal/isLength'),
    isObject = require('../lang/isObject'),
    support = require('../support');

/** Used for native method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Creates an array of the own and inherited enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects.
 *
 * @static
 * @memberOf _
 * @category Object
 * @param {Object} object The object to inspect.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keysIn(new Foo);
 * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
 */
function keysIn(object) {
  if (object == null) {
    return [];
  }
  if (!isObject(object)) {
    object = Object(object);
  }
  var length = object.length;
  length = (length && isLength(length) &&
    (isArray(object) || (support.nonEnumArgs && isArguments(object))) && length) || 0;

  var Ctor = object.constructor,
      index = -1,
      isProto = typeof Ctor == 'function' && Ctor.prototype === object,
      result = Array(length),
      skipIndexes = length > 0;

  while (++index < length) {
    result[index] = (index + '');
  }
  for (var key in object) {
    if (!(skipIndexes && isIndex(key, length)) &&
        !(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
      result.push(key);
    }
  }
  return result;
}

module.exports = keysIn;

},{"../internal/isIndex":"/home/edin/projects/operation-transformation/node_modules/glu.js/node_modules/lodash-node/modern/internal/isIndex.js","../internal/isLength":"/home/edin/projects/operation-transformation/node_modules/glu.js/node_modules/lodash-node/modern/internal/isLength.js","../lang/isArguments":"/home/edin/projects/operation-transformation/node_modules/glu.js/node_modules/lodash-node/modern/lang/isArguments.js","../lang/isArray":"/home/edin/projects/operation-transformation/node_modules/glu.js/node_modules/lodash-node/modern/lang/isArray.js","../lang/isObject":"/home/edin/projects/operation-transformation/node_modules/glu.js/node_modules/lodash-node/modern/lang/isObject.js","../support":"/home/edin/projects/operation-transformation/node_modules/glu.js/node_modules/lodash-node/modern/support.js"}],"/home/edin/projects/operation-transformation/node_modules/glu.js/node_modules/lodash-node/modern/object/mapValues.js":[function(require,module,exports){
var baseCallback = require('../internal/baseCallback'),
    baseForOwn = require('../internal/baseForOwn');

/**
 * Creates an object with the same keys as `object` and values generated by
 * running each own enumerable property of `object` through `iteratee`. The
 * iteratee function is bound to `thisArg` and invoked with three arguments:
 * (value, key, object).
 *
 * If a property name is provided for `iteratee` the created `_.property`
 * style callback returns the property value of the given element.
 *
 * If a value is also provided for `thisArg` the created `_.matchesProperty`
 * style callback returns `true` for elements that have a matching property
 * value, else `false`.
 *
 * If an object is provided for `iteratee` the created `_.matches` style
 * callback returns `true` for elements that have the properties of the given
 * object, else `false`.
 *
 * @static
 * @memberOf _
 * @category Object
 * @param {Object} object The object to iterate over.
 * @param {Function|Object|string} [iteratee=_.identity] The function invoked
 *  per iteration.
 * @param {*} [thisArg] The `this` binding of `iteratee`.
 * @returns {Object} Returns the new mapped object.
 * @example
 *
 * _.mapValues({ 'a': 1, 'b': 2 }, function(n) {
 *   return n * 3;
 * });
 * // => { 'a': 3, 'b': 6 }
 *
 * var users = {
 *   'fred':    { 'user': 'fred',    'age': 40 },
 *   'pebbles': { 'user': 'pebbles', 'age': 1 }
 * };
 *
 * // using the `_.property` callback shorthand
 * _.mapValues(users, 'age');
 * // => { 'fred': 40, 'pebbles': 1 } (iteration order is not guaranteed)
 */
function mapValues(object, iteratee, thisArg) {
  var result = {};
  iteratee = baseCallback(iteratee, thisArg, 3);

  baseForOwn(object, function(value, key, object) {
    result[key] = iteratee(value, key, object);
  });
  return result;
}

module.exports = mapValues;

},{"../internal/baseCallback":"/home/edin/projects/operation-transformation/node_modules/glu.js/node_modules/lodash-node/modern/internal/baseCallback.js","../internal/baseForOwn":"/home/edin/projects/operation-transformation/node_modules/glu.js/node_modules/lodash-node/modern/internal/baseForOwn.js"}],"/home/edin/projects/operation-transformation/node_modules/glu.js/node_modules/lodash-node/modern/string/escapeRegExp.js":[function(require,module,exports){
var baseToString = require('../internal/baseToString');

/**
 * Used to match `RegExp` [special characters](http://www.regular-expressions.info/characters.html#special).
 * In addition to special characters the forward slash is escaped to allow for
 * easier `eval` use and `Function` compilation.
 */
var reRegExpChars = /[.*+?^${}()|[\]\/\\]/g,
    reHasRegExpChars = RegExp(reRegExpChars.source);

/**
 * Escapes the `RegExp` special characters "\", "/", "^", "$", ".", "|", "?",
 * "*", "+", "(", ")", "[", "]", "{" and "}" in `string`.
 *
 * @static
 * @memberOf _
 * @category String
 * @param {string} [string=''] The string to escape.
 * @returns {string} Returns the escaped string.
 * @example
 *
 * _.escapeRegExp('[lodash](https://lodash.com/)');
 * // => '\[lodash\]\(https:\/\/lodash\.com\/\)'
 */
function escapeRegExp(string) {
  string = baseToString(string);
  return (string && reHasRegExpChars.test(string))
    ? string.replace(reRegExpChars, '\\$&')
    : string;
}

module.exports = escapeRegExp;

},{"../internal/baseToString":"/home/edin/projects/operation-transformation/node_modules/glu.js/node_modules/lodash-node/modern/internal/baseToString.js"}],"/home/edin/projects/operation-transformation/node_modules/glu.js/node_modules/lodash-node/modern/support.js":[function(require,module,exports){
(function (global){
/** Used for native method references. */
var objectProto = Object.prototype;

/** Used to detect DOM support. */
var document = (document = global.window) && document.document;

/** Native method references. */
var propertyIsEnumerable = objectProto.propertyIsEnumerable;

/**
 * An object environment feature flags.
 *
 * @static
 * @memberOf _
 * @type Object
 */
var support = {};

(function(x) {

  /**
   * Detect if functions can be decompiled by `Function#toString`
   * (all but Firefox OS certified apps, older Opera mobile browsers, and
   * the PlayStation 3; forced `false` for Windows 8 apps).
   *
   * @memberOf _.support
   * @type boolean
   */
  support.funcDecomp = /\bthis\b/.test(function() { return this; });

  /**
   * Detect if `Function#name` is supported (all but IE).
   *
   * @memberOf _.support
   * @type boolean
   */
  support.funcNames = typeof Function.name == 'string';

  /**
   * Detect if the DOM is supported.
   *
   * @memberOf _.support
   * @type boolean
   */
  try {
    support.dom = document.createDocumentFragment().nodeType === 11;
  } catch(e) {
    support.dom = false;
  }

  /**
   * Detect if `arguments` object indexes are non-enumerable.
   *
   * In Firefox < 4, IE < 9, PhantomJS, and Safari < 5.1 `arguments` object
   * indexes are non-enumerable. Chrome < 25 and Node.js < 0.11.0 treat
   * `arguments` object indexes as non-enumerable and fail `hasOwnProperty`
   * checks for indexes that exceed their function's formal parameters with
   * associated values of `0`.
   *
   * @memberOf _.support
   * @type boolean
   */
  try {
    support.nonEnumArgs = !propertyIsEnumerable.call(arguments, 1);
  } catch(e) {
    support.nonEnumArgs = true;
  }
}(0, 0));

module.exports = support;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],"/home/edin/projects/operation-transformation/node_modules/glu.js/node_modules/lodash-node/modern/utility/constant.js":[function(require,module,exports){
/**
 * Creates a function that returns `value`.
 *
 * @static
 * @memberOf _
 * @category Utility
 * @param {*} value The value to return from the new function.
 * @returns {Function} Returns the new function.
 * @example
 *
 * var object = { 'user': 'fred' };
 * var getter = _.constant(object);
 *
 * getter() === object;
 * // => true
 */
function constant(value) {
  return function() {
    return value;
  };
}

module.exports = constant;

},{}],"/home/edin/projects/operation-transformation/node_modules/glu.js/node_modules/lodash-node/modern/utility/identity.js":[function(require,module,exports){
/**
 * This method returns the first argument provided to it.
 *
 * @static
 * @memberOf _
 * @category Utility
 * @param {*} value Any value.
 * @returns {*} Returns `value`.
 * @example
 *
 * var object = { 'user': 'fred' };
 *
 * _.identity(object) === object;
 * // => true
 */
function identity(value) {
  return value;
}

module.exports = identity;

},{}],"/home/edin/projects/operation-transformation/node_modules/glu.js/node_modules/route-recognizer/dist/route-recognizer.js":[function(require,module,exports){
(function() {
    "use strict";
    function $$route$recognizer$dsl$$Target(path, matcher, delegate) {
      this.path = path;
      this.matcher = matcher;
      this.delegate = delegate;
    }

    $$route$recognizer$dsl$$Target.prototype = {
      to: function(target, callback) {
        var delegate = this.delegate;

        if (delegate && delegate.willAddRoute) {
          target = delegate.willAddRoute(this.matcher.target, target);
        }

        this.matcher.add(this.path, target);

        if (callback) {
          if (callback.length === 0) { throw new Error("You must have an argument in the function passed to `to`"); }
          this.matcher.addChild(this.path, target, callback, this.delegate);
        }
        return this;
      }
    };

    function $$route$recognizer$dsl$$Matcher(target) {
      this.routes = {};
      this.children = {};
      this.target = target;
    }

    $$route$recognizer$dsl$$Matcher.prototype = {
      add: function(path, handler) {
        this.routes[path] = handler;
      },

      addChild: function(path, target, callback, delegate) {
        var matcher = new $$route$recognizer$dsl$$Matcher(target);
        this.children[path] = matcher;

        var match = $$route$recognizer$dsl$$generateMatch(path, matcher, delegate);

        if (delegate && delegate.contextEntered) {
          delegate.contextEntered(target, match);
        }

        callback(match);
      }
    };

    function $$route$recognizer$dsl$$generateMatch(startingPath, matcher, delegate) {
      return function(path, nestedCallback) {
        var fullPath = startingPath + path;

        if (nestedCallback) {
          nestedCallback($$route$recognizer$dsl$$generateMatch(fullPath, matcher, delegate));
        } else {
          return new $$route$recognizer$dsl$$Target(startingPath + path, matcher, delegate);
        }
      };
    }

    function $$route$recognizer$dsl$$addRoute(routeArray, path, handler) {
      var len = 0;
      for (var i=0, l=routeArray.length; i<l; i++) {
        len += routeArray[i].path.length;
      }

      path = path.substr(len);
      var route = { path: path, handler: handler };
      routeArray.push(route);
    }

    function $$route$recognizer$dsl$$eachRoute(baseRoute, matcher, callback, binding) {
      var routes = matcher.routes;

      for (var path in routes) {
        if (routes.hasOwnProperty(path)) {
          var routeArray = baseRoute.slice();
          $$route$recognizer$dsl$$addRoute(routeArray, path, routes[path]);

          if (matcher.children[path]) {
            $$route$recognizer$dsl$$eachRoute(routeArray, matcher.children[path], callback, binding);
          } else {
            callback.call(binding, routeArray);
          }
        }
      }
    }

    var $$route$recognizer$dsl$$default = function(callback, addRouteCallback) {
      var matcher = new $$route$recognizer$dsl$$Matcher();

      callback($$route$recognizer$dsl$$generateMatch("", matcher, this.delegate));

      $$route$recognizer$dsl$$eachRoute([], matcher, function(route) {
        if (addRouteCallback) { addRouteCallback(this, route); }
        else { this.add(route); }
      }, this);
    };

    var $$route$recognizer$$specials = [
      '/', '.', '*', '+', '?', '|',
      '(', ')', '[', ']', '{', '}', '\\'
    ];

    var $$route$recognizer$$escapeRegex = new RegExp('(\\' + $$route$recognizer$$specials.join('|\\') + ')', 'g');

    function $$route$recognizer$$isArray(test) {
      return Object.prototype.toString.call(test) === "[object Array]";
    }

    // A Segment represents a segment in the original route description.
    // Each Segment type provides an `eachChar` and `regex` method.
    //
    // The `eachChar` method invokes the callback with one or more character
    // specifications. A character specification consumes one or more input
    // characters.
    //
    // The `regex` method returns a regex fragment for the segment. If the
    // segment is a dynamic of star segment, the regex fragment also includes
    // a capture.
    //
    // A character specification contains:
    //
    // * `validChars`: a String with a list of all valid characters, or
    // * `invalidChars`: a String with a list of all invalid characters
    // * `repeat`: true if the character specification can repeat

    function $$route$recognizer$$StaticSegment(string) { this.string = string; }
    $$route$recognizer$$StaticSegment.prototype = {
      eachChar: function(callback) {
        var string = this.string, ch;

        for (var i=0, l=string.length; i<l; i++) {
          ch = string.charAt(i);
          callback({ validChars: ch });
        }
      },

      regex: function() {
        return this.string.replace($$route$recognizer$$escapeRegex, '\\$1');
      },

      generate: function() {
        return this.string;
      }
    };

    function $$route$recognizer$$DynamicSegment(name) { this.name = name; }
    $$route$recognizer$$DynamicSegment.prototype = {
      eachChar: function(callback) {
        callback({ invalidChars: "/", repeat: true });
      },

      regex: function() {
        return "([^/]+)";
      },

      generate: function(params) {
        return params[this.name];
      }
    };

    function $$route$recognizer$$StarSegment(name) { this.name = name; }
    $$route$recognizer$$StarSegment.prototype = {
      eachChar: function(callback) {
        callback({ invalidChars: "", repeat: true });
      },

      regex: function() {
        return "(.+)";
      },

      generate: function(params) {
        return params[this.name];
      }
    };

    function $$route$recognizer$$EpsilonSegment() {}
    $$route$recognizer$$EpsilonSegment.prototype = {
      eachChar: function() {},
      regex: function() { return ""; },
      generate: function() { return ""; }
    };

    function $$route$recognizer$$parse(route, names, types) {
      // normalize route as not starting with a "/". Recognition will
      // also normalize.
      if (route.charAt(0) === "/") { route = route.substr(1); }

      var segments = route.split("/"), results = [];

      for (var i=0, l=segments.length; i<l; i++) {
        var segment = segments[i], match;

        if (match = segment.match(/^:([^\/]+)$/)) {
          results.push(new $$route$recognizer$$DynamicSegment(match[1]));
          names.push(match[1]);
          types.dynamics++;
        } else if (match = segment.match(/^\*([^\/]+)$/)) {
          results.push(new $$route$recognizer$$StarSegment(match[1]));
          names.push(match[1]);
          types.stars++;
        } else if(segment === "") {
          results.push(new $$route$recognizer$$EpsilonSegment());
        } else {
          results.push(new $$route$recognizer$$StaticSegment(segment));
          types.statics++;
        }
      }

      return results;
    }

    // A State has a character specification and (`charSpec`) and a list of possible
    // subsequent states (`nextStates`).
    //
    // If a State is an accepting state, it will also have several additional
    // properties:
    //
    // * `regex`: A regular expression that is used to extract parameters from paths
    //   that reached this accepting state.
    // * `handlers`: Information on how to convert the list of captures into calls
    //   to registered handlers with the specified parameters
    // * `types`: How many static, dynamic or star segments in this route. Used to
    //   decide which route to use if multiple registered routes match a path.
    //
    // Currently, State is implemented naively by looping over `nextStates` and
    // comparing a character specification against a character. A more efficient
    // implementation would use a hash of keys pointing at one or more next states.

    function $$route$recognizer$$State(charSpec) {
      this.charSpec = charSpec;
      this.nextStates = [];
    }

    $$route$recognizer$$State.prototype = {
      get: function(charSpec) {
        var nextStates = this.nextStates;

        for (var i=0, l=nextStates.length; i<l; i++) {
          var child = nextStates[i];

          var isEqual = child.charSpec.validChars === charSpec.validChars;
          isEqual = isEqual && child.charSpec.invalidChars === charSpec.invalidChars;

          if (isEqual) { return child; }
        }
      },

      put: function(charSpec) {
        var state;

        // If the character specification already exists in a child of the current
        // state, just return that state.
        if (state = this.get(charSpec)) { return state; }

        // Make a new state for the character spec
        state = new $$route$recognizer$$State(charSpec);

        // Insert the new state as a child of the current state
        this.nextStates.push(state);

        // If this character specification repeats, insert the new state as a child
        // of itself. Note that this will not trigger an infinite loop because each
        // transition during recognition consumes a character.
        if (charSpec.repeat) {
          state.nextStates.push(state);
        }

        // Return the new state
        return state;
      },

      // Find a list of child states matching the next character
      match: function(ch) {
        // DEBUG "Processing `" + ch + "`:"
        var nextStates = this.nextStates,
            child, charSpec, chars;

        // DEBUG "  " + debugState(this)
        var returned = [];

        for (var i=0, l=nextStates.length; i<l; i++) {
          child = nextStates[i];

          charSpec = child.charSpec;

          if (typeof (chars = charSpec.validChars) !== 'undefined') {
            if (chars.indexOf(ch) !== -1) { returned.push(child); }
          } else if (typeof (chars = charSpec.invalidChars) !== 'undefined') {
            if (chars.indexOf(ch) === -1) { returned.push(child); }
          }
        }

        return returned;
      }

      /** IF DEBUG
      , debug: function() {
        var charSpec = this.charSpec,
            debug = "[",
            chars = charSpec.validChars || charSpec.invalidChars;

        if (charSpec.invalidChars) { debug += "^"; }
        debug += chars;
        debug += "]";

        if (charSpec.repeat) { debug += "+"; }

        return debug;
      }
      END IF **/
    };

    /** IF DEBUG
    function debug(log) {
      console.log(log);
    }

    function debugState(state) {
      return state.nextStates.map(function(n) {
        if (n.nextStates.length === 0) { return "( " + n.debug() + " [accepting] )"; }
        return "( " + n.debug() + " <then> " + n.nextStates.map(function(s) { return s.debug() }).join(" or ") + " )";
      }).join(", ")
    }
    END IF **/

    // This is a somewhat naive strategy, but should work in a lot of cases
    // A better strategy would properly resolve /posts/:id/new and /posts/edit/:id.
    //
    // This strategy generally prefers more static and less dynamic matching.
    // Specifically, it
    //
    //  * prefers fewer stars to more, then
    //  * prefers using stars for less of the match to more, then
    //  * prefers fewer dynamic segments to more, then
    //  * prefers more static segments to more
    function $$route$recognizer$$sortSolutions(states) {
      return states.sort(function(a, b) {
        if (a.types.stars !== b.types.stars) { return a.types.stars - b.types.stars; }

        if (a.types.stars) {
          if (a.types.statics !== b.types.statics) { return b.types.statics - a.types.statics; }
          if (a.types.dynamics !== b.types.dynamics) { return b.types.dynamics - a.types.dynamics; }
        }

        if (a.types.dynamics !== b.types.dynamics) { return a.types.dynamics - b.types.dynamics; }
        if (a.types.statics !== b.types.statics) { return b.types.statics - a.types.statics; }

        return 0;
      });
    }

    function $$route$recognizer$$recognizeChar(states, ch) {
      var nextStates = [];

      for (var i=0, l=states.length; i<l; i++) {
        var state = states[i];

        nextStates = nextStates.concat(state.match(ch));
      }

      return nextStates;
    }

    var $$route$recognizer$$oCreate = Object.create || function(proto) {
      function F() {}
      F.prototype = proto;
      return new F();
    };

    function $$route$recognizer$$RecognizeResults(queryParams) {
      this.queryParams = queryParams || {};
    }
    $$route$recognizer$$RecognizeResults.prototype = $$route$recognizer$$oCreate({
      splice: Array.prototype.splice,
      slice:  Array.prototype.slice,
      push:   Array.prototype.push,
      length: 0,
      queryParams: null
    });

    function $$route$recognizer$$findHandler(state, path, queryParams) {
      var handlers = state.handlers, regex = state.regex;
      var captures = path.match(regex), currentCapture = 1;
      var result = new $$route$recognizer$$RecognizeResults(queryParams);

      for (var i=0, l=handlers.length; i<l; i++) {
        var handler = handlers[i], names = handler.names, params = {};

        for (var j=0, m=names.length; j<m; j++) {
          params[names[j]] = captures[currentCapture++];
        }

        result.push({ handler: handler.handler, params: params, isDynamic: !!names.length });
      }

      return result;
    }

    function $$route$recognizer$$addSegment(currentState, segment) {
      segment.eachChar(function(ch) {
        var state;

        currentState = currentState.put(ch);
      });

      return currentState;
    }

    function $$route$recognizer$$decodeQueryParamPart(part) {
      // http://www.w3.org/TR/html401/interact/forms.html#h-17.13.4.1
      part = part.replace(/\+/gm, '%20');
      return decodeURIComponent(part);
    }

    // The main interface

    var $$route$recognizer$$RouteRecognizer = function() {
      this.rootState = new $$route$recognizer$$State();
      this.names = {};
    };


    $$route$recognizer$$RouteRecognizer.prototype = {
      add: function(routes, options) {
        var currentState = this.rootState, regex = "^",
            types = { statics: 0, dynamics: 0, stars: 0 },
            handlers = [], allSegments = [], name;

        var isEmpty = true;

        for (var i=0, l=routes.length; i<l; i++) {
          var route = routes[i], names = [];

          var segments = $$route$recognizer$$parse(route.path, names, types);

          allSegments = allSegments.concat(segments);

          for (var j=0, m=segments.length; j<m; j++) {
            var segment = segments[j];

            if (segment instanceof $$route$recognizer$$EpsilonSegment) { continue; }

            isEmpty = false;

            // Add a "/" for the new segment
            currentState = currentState.put({ validChars: "/" });
            regex += "/";

            // Add a representation of the segment to the NFA and regex
            currentState = $$route$recognizer$$addSegment(currentState, segment);
            regex += segment.regex();
          }

          var handler = { handler: route.handler, names: names };
          handlers.push(handler);
        }

        if (isEmpty) {
          currentState = currentState.put({ validChars: "/" });
          regex += "/";
        }

        currentState.handlers = handlers;
        currentState.regex = new RegExp(regex + "$");
        currentState.types = types;

        if (name = options && options.as) {
          this.names[name] = {
            segments: allSegments,
            handlers: handlers
          };
        }
      },

      handlersFor: function(name) {
        var route = this.names[name], result = [];
        if (!route) { throw new Error("There is no route named " + name); }

        for (var i=0, l=route.handlers.length; i<l; i++) {
          result.push(route.handlers[i]);
        }

        return result;
      },

      hasRoute: function(name) {
        return !!this.names[name];
      },

      generate: function(name, params) {
        var route = this.names[name], output = "";
        if (!route) { throw new Error("There is no route named " + name); }

        var segments = route.segments;

        for (var i=0, l=segments.length; i<l; i++) {
          var segment = segments[i];

          if (segment instanceof $$route$recognizer$$EpsilonSegment) { continue; }

          output += "/";
          output += segment.generate(params);
        }

        if (output.charAt(0) !== '/') { output = '/' + output; }

        if (params && params.queryParams) {
          output += this.generateQueryString(params.queryParams, route.handlers);
        }

        return output;
      },

      generateQueryString: function(params, handlers) {
        var pairs = [];
        var keys = [];
        for(var key in params) {
          if (params.hasOwnProperty(key)) {
            keys.push(key);
          }
        }
        keys.sort();
        for (var i = 0, len = keys.length; i < len; i++) {
          key = keys[i];
          var value = params[key];
          if (value == null) {
            continue;
          }
          var pair = encodeURIComponent(key);
          if ($$route$recognizer$$isArray(value)) {
            for (var j = 0, l = value.length; j < l; j++) {
              var arrayPair = key + '[]' + '=' + encodeURIComponent(value[j]);
              pairs.push(arrayPair);
            }
          } else {
            pair += "=" + encodeURIComponent(value);
            pairs.push(pair);
          }
        }

        if (pairs.length === 0) { return ''; }

        return "?" + pairs.join("&");
      },

      parseQueryString: function(queryString) {
        var pairs = queryString.split("&"), queryParams = {};
        for(var i=0; i < pairs.length; i++) {
          var pair      = pairs[i].split('='),
              key       = $$route$recognizer$$decodeQueryParamPart(pair[0]),
              keyLength = key.length,
              isArray = false,
              value;
          if (pair.length === 1) {
            value = 'true';
          } else {
            //Handle arrays
            if (keyLength > 2 && key.slice(keyLength -2) === '[]') {
              isArray = true;
              key = key.slice(0, keyLength - 2);
              if(!queryParams[key]) {
                queryParams[key] = [];
              }
            }
            value = pair[1] ? $$route$recognizer$$decodeQueryParamPart(pair[1]) : '';
          }
          if (isArray) {
            queryParams[key].push(value);
          } else {
            queryParams[key] = value;
          }
        }
        return queryParams;
      },

      recognize: function(path) {
        var states = [ this.rootState ],
            pathLen, i, l, queryStart, queryParams = {},
            isSlashDropped = false;

        queryStart = path.indexOf('?');
        if (queryStart !== -1) {
          var queryString = path.substr(queryStart + 1, path.length);
          path = path.substr(0, queryStart);
          queryParams = this.parseQueryString(queryString);
        }

        path = decodeURI(path);

        // DEBUG GROUP path

        if (path.charAt(0) !== "/") { path = "/" + path; }

        pathLen = path.length;
        if (pathLen > 1 && path.charAt(pathLen - 1) === "/") {
          path = path.substr(0, pathLen - 1);
          isSlashDropped = true;
        }

        for (i=0, l=path.length; i<l; i++) {
          states = $$route$recognizer$$recognizeChar(states, path.charAt(i));
          if (!states.length) { break; }
        }

        // END DEBUG GROUP

        var solutions = [];
        for (i=0, l=states.length; i<l; i++) {
          if (states[i].handlers) { solutions.push(states[i]); }
        }

        states = $$route$recognizer$$sortSolutions(solutions);

        var state = solutions[0];

        if (state && state.handlers) {
          // if a trailing slash was dropped and a star segment is the last segment
          // specified, put the trailing slash back
          if (isSlashDropped && state.regex.source.slice(-5) === "(.+)$") {
            path = path + "/";
          }
          return $$route$recognizer$$findHandler(state, path, queryParams);
        }
      }
    };

    $$route$recognizer$$RouteRecognizer.prototype.map = $$route$recognizer$dsl$$default;

    $$route$recognizer$$RouteRecognizer.VERSION = '0.1.5';

    var $$route$recognizer$$default = $$route$recognizer$$RouteRecognizer;

    /* global define:true module:true window: true */
    if (typeof define === 'function' && define['amd']) {
      define(function() { return $$route$recognizer$$default; });
    } else if (typeof module !== 'undefined' && module['exports']) {
      module['exports'] = $$route$recognizer$$default;
    } else if (typeof this !== 'undefined') {
      this['RouteRecognizer'] = $$route$recognizer$$default;
    }
}).call(this);

//# sourceMappingURL=route-recognizer.js.map
},{}]},{},["/home/edin/projects/operation-transformation/app/app.js"])("/home/edin/projects/operation-transformation/app/app.js")
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi9hcHAvYWN0aW9ucy9UYWJsZUFjdGlvbkNyZWF0b3IuanMiLCIuLi9hcHAvYWN0aW9ucy9UYWJsZUFjdGlvbnMuanMiLCIuLi9hcHAvYXBwLmpzIiwiLi4vYXBwL2NvbXBvbmVudHMvZ3JpZC9DZWxsVmlld1JlYWN0LmpzIiwiLi4vYXBwL2NvbXBvbmVudHMvZ3JpZC9HcmlkQ29udHJvbGxlci5qcyIsIi4uL2FwcC9jb21wb25lbnRzL2dyaWQvR3JpZFZpZXcuanMiLCIuLi9hcHAvY29tcG9uZW50cy9ncmlkL0dyaWRWaWV3UmVhY3QuanMiLCIuLi9hcHAvY29tcG9uZW50cy9ncmlkL1Jvd1ZpZXdSZWFjdC5qcyIsIi4uL2FwcC9jb21wb25lbnRzL2dyaWRBY3Rpb25zL0dyaWRBY3Rpb25zQ29udHJvbGxlci5qcyIsIi4uL2FwcC9jb21wb25lbnRzL2dyaWRBY3Rpb25zL0dyaWRBY3Rpb25zVmlldy5qcyIsIi4uL2FwcC9jb21wb25lbnRzL2dyaWRBY3Rpb25zL0dyaWRBY3Rpb25zVmlld1JlYWN0LmpzIiwiLi4vYXBwL2NvbXBvbmVudHMvdGl0bGUvVGl0bGVDb250cm9sbGVyLmpzIiwiLi4vYXBwL2NvbXBvbmVudHMvdGl0bGUvVGl0bGVWaWV3LmpzIiwiLi4vYXBwL290L290LmpzIiwiLi4vYXBwL290L3RhYmxlQ2hhbmdlLmpzIiwiLi4vYXBwL3N0b3Jlcy9UYWJsZVN0b3JlLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2dsdS5qcy9kaXN0L2dsdS1kaXN0LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2dsdS5qcy9ub2RlX21vZHVsZXMvZGVlcC1lcXVhbC9pbmRleC5qcyIsIi4uL25vZGVfbW9kdWxlcy9nbHUuanMvbm9kZV9tb2R1bGVzL2RlZXAtZXF1YWwvbGliL2lzX2FyZ3VtZW50cy5qcyIsIi4uL25vZGVfbW9kdWxlcy9nbHUuanMvbm9kZV9tb2R1bGVzL2RlZXAtZXF1YWwvbGliL2tleXMuanMiLCIuLi9ub2RlX21vZHVsZXMvZ2x1LmpzL25vZGVfbW9kdWxlcy9ldmVudGVtaXR0ZXIzL2luZGV4LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2dsdS5qcy9ub2RlX21vZHVsZXMvbG9kYXNoLW5vZGUvbW9kZXJuL2FycmF5L2ludGVyc2VjdGlvbi5qcyIsIi4uL25vZGVfbW9kdWxlcy9nbHUuanMvbm9kZV9tb2R1bGVzL2xvZGFzaC1ub2RlL21vZGVybi9hcnJheS91bmlxLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2dsdS5qcy9ub2RlX21vZHVsZXMvbG9kYXNoLW5vZGUvbW9kZXJuL2NvbGxlY3Rpb24vZm9yRWFjaC5qcyIsIi4uL25vZGVfbW9kdWxlcy9nbHUuanMvbm9kZV9tb2R1bGVzL2xvZGFzaC1ub2RlL21vZGVybi9jb2xsZWN0aW9uL21hcC5qcyIsIi4uL25vZGVfbW9kdWxlcy9nbHUuanMvbm9kZV9tb2R1bGVzL2xvZGFzaC1ub2RlL21vZGVybi9jb2xsZWN0aW9uL3NpemUuanMiLCIuLi9ub2RlX21vZHVsZXMvZ2x1LmpzL25vZGVfbW9kdWxlcy9sb2Rhc2gtbm9kZS9tb2Rlcm4vaW50ZXJuYWwvU2V0Q2FjaGUuanMiLCIuLi9ub2RlX21vZHVsZXMvZ2x1LmpzL25vZGVfbW9kdWxlcy9sb2Rhc2gtbm9kZS9tb2Rlcm4vaW50ZXJuYWwvYXJyYXlDb3B5LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2dsdS5qcy9ub2RlX21vZHVsZXMvbG9kYXNoLW5vZGUvbW9kZXJuL2ludGVybmFsL2FycmF5RWFjaC5qcyIsIi4uL25vZGVfbW9kdWxlcy9nbHUuanMvbm9kZV9tb2R1bGVzL2xvZGFzaC1ub2RlL21vZGVybi9pbnRlcm5hbC9hcnJheU1hcC5qcyIsIi4uL25vZGVfbW9kdWxlcy9nbHUuanMvbm9kZV9tb2R1bGVzL2xvZGFzaC1ub2RlL21vZGVybi9pbnRlcm5hbC9iYXNlQ2FsbGJhY2suanMiLCIuLi9ub2RlX21vZHVsZXMvZ2x1LmpzL25vZGVfbW9kdWxlcy9sb2Rhc2gtbm9kZS9tb2Rlcm4vaW50ZXJuYWwvYmFzZUNsb25lLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2dsdS5qcy9ub2RlX21vZHVsZXMvbG9kYXNoLW5vZGUvbW9kZXJuL2ludGVybmFsL2Jhc2VDb3B5LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2dsdS5qcy9ub2RlX21vZHVsZXMvbG9kYXNoLW5vZGUvbW9kZXJuL2ludGVybmFsL2Jhc2VFYWNoLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2dsdS5qcy9ub2RlX21vZHVsZXMvbG9kYXNoLW5vZGUvbW9kZXJuL2ludGVybmFsL2Jhc2VGaW5kLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2dsdS5qcy9ub2RlX21vZHVsZXMvbG9kYXNoLW5vZGUvbW9kZXJuL2ludGVybmFsL2Jhc2VGb3IuanMiLCIuLi9ub2RlX21vZHVsZXMvZ2x1LmpzL25vZGVfbW9kdWxlcy9sb2Rhc2gtbm9kZS9tb2Rlcm4vaW50ZXJuYWwvYmFzZUZvck93bi5qcyIsIi4uL25vZGVfbW9kdWxlcy9nbHUuanMvbm9kZV9tb2R1bGVzL2xvZGFzaC1ub2RlL21vZGVybi9pbnRlcm5hbC9iYXNlSW5kZXhPZi5qcyIsIi4uL25vZGVfbW9kdWxlcy9nbHUuanMvbm9kZV9tb2R1bGVzL2xvZGFzaC1ub2RlL21vZGVybi9pbnRlcm5hbC9iYXNlSXNFcXVhbC5qcyIsIi4uL25vZGVfbW9kdWxlcy9nbHUuanMvbm9kZV9tb2R1bGVzL2xvZGFzaC1ub2RlL21vZGVybi9pbnRlcm5hbC9iYXNlSXNFcXVhbERlZXAuanMiLCIuLi9ub2RlX21vZHVsZXMvZ2x1LmpzL25vZGVfbW9kdWxlcy9sb2Rhc2gtbm9kZS9tb2Rlcm4vaW50ZXJuYWwvYmFzZUlzRnVuY3Rpb24uanMiLCIuLi9ub2RlX21vZHVsZXMvZ2x1LmpzL25vZGVfbW9kdWxlcy9sb2Rhc2gtbm9kZS9tb2Rlcm4vaW50ZXJuYWwvYmFzZUlzTWF0Y2guanMiLCIuLi9ub2RlX21vZHVsZXMvZ2x1LmpzL25vZGVfbW9kdWxlcy9sb2Rhc2gtbm9kZS9tb2Rlcm4vaW50ZXJuYWwvYmFzZU1hcC5qcyIsIi4uL25vZGVfbW9kdWxlcy9nbHUuanMvbm9kZV9tb2R1bGVzL2xvZGFzaC1ub2RlL21vZGVybi9pbnRlcm5hbC9iYXNlTWF0Y2hlcy5qcyIsIi4uL25vZGVfbW9kdWxlcy9nbHUuanMvbm9kZV9tb2R1bGVzL2xvZGFzaC1ub2RlL21vZGVybi9pbnRlcm5hbC9iYXNlTWF0Y2hlc1Byb3BlcnR5LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2dsdS5qcy9ub2RlX21vZHVsZXMvbG9kYXNoLW5vZGUvbW9kZXJuL2ludGVybmFsL2Jhc2VQcm9wZXJ0eS5qcyIsIi4uL25vZGVfbW9kdWxlcy9nbHUuanMvbm9kZV9tb2R1bGVzL2xvZGFzaC1ub2RlL21vZGVybi9pbnRlcm5hbC9iYXNlVG9TdHJpbmcuanMiLCIuLi9ub2RlX21vZHVsZXMvZ2x1LmpzL25vZGVfbW9kdWxlcy9sb2Rhc2gtbm9kZS9tb2Rlcm4vaW50ZXJuYWwvYmFzZVVuaXEuanMiLCIuLi9ub2RlX21vZHVsZXMvZ2x1LmpzL25vZGVfbW9kdWxlcy9sb2Rhc2gtbm9kZS9tb2Rlcm4vaW50ZXJuYWwvYmluZENhbGxiYWNrLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2dsdS5qcy9ub2RlX21vZHVsZXMvbG9kYXNoLW5vZGUvbW9kZXJuL2ludGVybmFsL2J1ZmZlckNsb25lLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2dsdS5qcy9ub2RlX21vZHVsZXMvbG9kYXNoLW5vZGUvbW9kZXJuL2ludGVybmFsL2NhY2hlSW5kZXhPZi5qcyIsIi4uL25vZGVfbW9kdWxlcy9nbHUuanMvbm9kZV9tb2R1bGVzL2xvZGFzaC1ub2RlL21vZGVybi9pbnRlcm5hbC9jYWNoZVB1c2guanMiLCIuLi9ub2RlX21vZHVsZXMvZ2x1LmpzL25vZGVfbW9kdWxlcy9sb2Rhc2gtbm9kZS9tb2Rlcm4vaW50ZXJuYWwvY3JlYXRlQmFzZUVhY2guanMiLCIuLi9ub2RlX21vZHVsZXMvZ2x1LmpzL25vZGVfbW9kdWxlcy9sb2Rhc2gtbm9kZS9tb2Rlcm4vaW50ZXJuYWwvY3JlYXRlQmFzZUZvci5qcyIsIi4uL25vZGVfbW9kdWxlcy9nbHUuanMvbm9kZV9tb2R1bGVzL2xvZGFzaC1ub2RlL21vZGVybi9pbnRlcm5hbC9jcmVhdGVDYWNoZS5qcyIsIi4uL25vZGVfbW9kdWxlcy9nbHUuanMvbm9kZV9tb2R1bGVzL2xvZGFzaC1ub2RlL21vZGVybi9pbnRlcm5hbC9jcmVhdGVGaW5kS2V5LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2dsdS5qcy9ub2RlX21vZHVsZXMvbG9kYXNoLW5vZGUvbW9kZXJuL2ludGVybmFsL2NyZWF0ZUZvckVhY2guanMiLCIuLi9ub2RlX21vZHVsZXMvZ2x1LmpzL25vZGVfbW9kdWxlcy9sb2Rhc2gtbm9kZS9tb2Rlcm4vaW50ZXJuYWwvY3JlYXRlRm9yT3duLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2dsdS5qcy9ub2RlX21vZHVsZXMvbG9kYXNoLW5vZGUvbW9kZXJuL2ludGVybmFsL2VxdWFsQXJyYXlzLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2dsdS5qcy9ub2RlX21vZHVsZXMvbG9kYXNoLW5vZGUvbW9kZXJuL2ludGVybmFsL2VxdWFsQnlUYWcuanMiLCIuLi9ub2RlX21vZHVsZXMvZ2x1LmpzL25vZGVfbW9kdWxlcy9sb2Rhc2gtbm9kZS9tb2Rlcm4vaW50ZXJuYWwvZXF1YWxPYmplY3RzLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2dsdS5qcy9ub2RlX21vZHVsZXMvbG9kYXNoLW5vZGUvbW9kZXJuL2ludGVybmFsL2luZGV4T2ZOYU4uanMiLCIuLi9ub2RlX21vZHVsZXMvZ2x1LmpzL25vZGVfbW9kdWxlcy9sb2Rhc2gtbm9kZS9tb2Rlcm4vaW50ZXJuYWwvaW5pdENsb25lQXJyYXkuanMiLCIuLi9ub2RlX21vZHVsZXMvZ2x1LmpzL25vZGVfbW9kdWxlcy9sb2Rhc2gtbm9kZS9tb2Rlcm4vaW50ZXJuYWwvaW5pdENsb25lQnlUYWcuanMiLCIuLi9ub2RlX21vZHVsZXMvZ2x1LmpzL25vZGVfbW9kdWxlcy9sb2Rhc2gtbm9kZS9tb2Rlcm4vaW50ZXJuYWwvaW5pdENsb25lT2JqZWN0LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2dsdS5qcy9ub2RlX21vZHVsZXMvbG9kYXNoLW5vZGUvbW9kZXJuL2ludGVybmFsL2lzSW5kZXguanMiLCIuLi9ub2RlX21vZHVsZXMvZ2x1LmpzL25vZGVfbW9kdWxlcy9sb2Rhc2gtbm9kZS9tb2Rlcm4vaW50ZXJuYWwvaXNJdGVyYXRlZUNhbGwuanMiLCIuLi9ub2RlX21vZHVsZXMvZ2x1LmpzL25vZGVfbW9kdWxlcy9sb2Rhc2gtbm9kZS9tb2Rlcm4vaW50ZXJuYWwvaXNMZW5ndGguanMiLCIuLi9ub2RlX21vZHVsZXMvZ2x1LmpzL25vZGVfbW9kdWxlcy9sb2Rhc2gtbm9kZS9tb2Rlcm4vaW50ZXJuYWwvaXNPYmplY3RMaWtlLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2dsdS5qcy9ub2RlX21vZHVsZXMvbG9kYXNoLW5vZGUvbW9kZXJuL2ludGVybmFsL2lzU3RyaWN0Q29tcGFyYWJsZS5qcyIsIi4uL25vZGVfbW9kdWxlcy9nbHUuanMvbm9kZV9tb2R1bGVzL2xvZGFzaC1ub2RlL21vZGVybi9pbnRlcm5hbC9zaGltS2V5cy5qcyIsIi4uL25vZGVfbW9kdWxlcy9nbHUuanMvbm9kZV9tb2R1bGVzL2xvZGFzaC1ub2RlL21vZGVybi9pbnRlcm5hbC9zb3J0ZWRVbmlxLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2dsdS5qcy9ub2RlX21vZHVsZXMvbG9kYXNoLW5vZGUvbW9kZXJuL2ludGVybmFsL3RvT2JqZWN0LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2dsdS5qcy9ub2RlX21vZHVsZXMvbG9kYXNoLW5vZGUvbW9kZXJuL2xhbmcvY2xvbmUuanMiLCIuLi9ub2RlX21vZHVsZXMvZ2x1LmpzL25vZGVfbW9kdWxlcy9sb2Rhc2gtbm9kZS9tb2Rlcm4vbGFuZy9pc0FyZ3VtZW50cy5qcyIsIi4uL25vZGVfbW9kdWxlcy9nbHUuanMvbm9kZV9tb2R1bGVzL2xvZGFzaC1ub2RlL21vZGVybi9sYW5nL2lzQXJyYXkuanMiLCIuLi9ub2RlX21vZHVsZXMvZ2x1LmpzL25vZGVfbW9kdWxlcy9sb2Rhc2gtbm9kZS9tb2Rlcm4vbGFuZy9pc0Z1bmN0aW9uLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2dsdS5qcy9ub2RlX21vZHVsZXMvbG9kYXNoLW5vZGUvbW9kZXJuL2xhbmcvaXNOYXRpdmUuanMiLCIuLi9ub2RlX21vZHVsZXMvZ2x1LmpzL25vZGVfbW9kdWxlcy9sb2Rhc2gtbm9kZS9tb2Rlcm4vbGFuZy9pc09iamVjdC5qcyIsIi4uL25vZGVfbW9kdWxlcy9nbHUuanMvbm9kZV9tb2R1bGVzL2xvZGFzaC1ub2RlL21vZGVybi9sYW5nL2lzVHlwZWRBcnJheS5qcyIsIi4uL25vZGVfbW9kdWxlcy9nbHUuanMvbm9kZV9tb2R1bGVzL2xvZGFzaC1ub2RlL21vZGVybi9vYmplY3QvZmluZEtleS5qcyIsIi4uL25vZGVfbW9kdWxlcy9nbHUuanMvbm9kZV9tb2R1bGVzL2xvZGFzaC1ub2RlL21vZGVybi9vYmplY3QvZm9yT3duLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2dsdS5qcy9ub2RlX21vZHVsZXMvbG9kYXNoLW5vZGUvbW9kZXJuL29iamVjdC9rZXlzLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2dsdS5qcy9ub2RlX21vZHVsZXMvbG9kYXNoLW5vZGUvbW9kZXJuL29iamVjdC9rZXlzSW4uanMiLCIuLi9ub2RlX21vZHVsZXMvZ2x1LmpzL25vZGVfbW9kdWxlcy9sb2Rhc2gtbm9kZS9tb2Rlcm4vb2JqZWN0L21hcFZhbHVlcy5qcyIsIi4uL25vZGVfbW9kdWxlcy9nbHUuanMvbm9kZV9tb2R1bGVzL2xvZGFzaC1ub2RlL21vZGVybi9zdHJpbmcvZXNjYXBlUmVnRXhwLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2dsdS5qcy9ub2RlX21vZHVsZXMvbG9kYXNoLW5vZGUvbW9kZXJuL3N1cHBvcnQuanMiLCIuLi9ub2RlX21vZHVsZXMvZ2x1LmpzL25vZGVfbW9kdWxlcy9sb2Rhc2gtbm9kZS9tb2Rlcm4vdXRpbGl0eS9jb25zdGFudC5qcyIsIi4uL25vZGVfbW9kdWxlcy9nbHUuanMvbm9kZV9tb2R1bGVzL2xvZGFzaC1ub2RlL21vZGVybi91dGlsaXR5L2lkZW50aXR5LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2dsdS5qcy9ub2RlX21vZHVsZXMvcm91dGUtcmVjb2duaXplci9kaXN0L3JvdXRlLXJlY29nbml6ZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQSxZQUFZLENBQUM7Ozs7OztBQUViLElBQUksWUFBWSxHQUFHLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDOztBQUU3QyxJQUFJLEdBQUcsR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7O0lBRXRCLGtCQUFrQjtXQUFsQixrQkFBa0I7MEJBQWxCLGtCQUFrQjs7O2VBQWxCLGtCQUFrQjtBQUNmLGNBQVU7YUFBQSxvQkFBQyxPQUFPLEVBQUU7QUFDekIsV0FBRyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLFdBQVcsRUFBRSxPQUFPLENBQUMsQ0FBQztPQUN2RDs7QUFDTSxVQUFNO2FBQUEsZ0JBQUMsT0FBTyxFQUFFO0FBQ3JCLFdBQUcsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUM7T0FDbkQ7O0FBQ00sYUFBUzthQUFBLG1CQUFDLE9BQU8sRUFBRTtBQUN4QixXQUFHLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsVUFBVSxFQUFFLE9BQU8sQ0FBQyxDQUFDO09BQ3REOztBQUNNLHNCQUFrQjthQUFBLDRCQUFDLE9BQU8sRUFBRTtBQUNqQyxXQUFHLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsb0JBQW9CLEVBQUUsT0FBTyxDQUFDLENBQUM7T0FDaEU7Ozs7U0FaRyxrQkFBa0I7OztBQWV4QixNQUFNLENBQUMsT0FBTyxHQUFHLGtCQUFrQixDQUFDOzs7QUNyQnBDLFlBQVksQ0FBQzs7QUFFYixJQUFJLFlBQVksR0FBRztBQUNqQixhQUFXLEVBQUUsWUFBWTtBQUN6QixTQUFPLEVBQUUsUUFBUTtBQUNqQixZQUFVLEVBQUUsV0FBVztBQUN2QixzQkFBb0IsRUFBRSxzQkFBc0I7Q0FDN0MsQ0FBQzs7QUFFRixNQUFNLENBQUMsT0FBTyxHQUFHLFlBQVksQ0FBQzs7O0FDVDlCLFlBQVksQ0FBQzs7QUFFYixJQUFJLFFBQVEsR0FBRyxPQUFPLENBQUMsNEJBQTRCLENBQUMsQ0FBQztBQUNyRCxJQUFJLGNBQWMsR0FBRyxPQUFPLENBQUMsa0NBQWtDLENBQUMsQ0FBQzs7QUFFakUsSUFBSSxTQUFTLEdBQUcsT0FBTyxDQUFDLDhCQUE4QixDQUFDLENBQUM7QUFDeEQsSUFBSSxlQUFlLEdBQUcsT0FBTyxDQUFDLG9DQUFvQyxDQUFDLENBQUM7QUFDcEUsSUFBSSxlQUFlLEdBQUcsT0FBTyxDQUFDLDBDQUEwQyxDQUFDLENBQUM7QUFDMUUsSUFBSSxxQkFBcUIsR0FBRyxPQUFPLENBQUMsZ0RBQWdELENBQUMsQ0FBQztBQUN0RixJQUFJLEdBQUcsR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7O0FBRTVCLElBQUksR0FBRyxHQUFHO0FBQ1IsTUFBSSxFQUFFLGdCQUFZOzs7Ozs7Ozs7O0FBVWhCLFFBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUM7Ozs7Ozs7OztBQVUvQixRQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQztBQUNqQixVQUFJLEVBQUUsZUFBZTtBQUNyQixVQUFJLEVBQUUsUUFBUTtBQUNkLGtCQUFZLEVBQUUsT0FBTztBQUNyQixnQkFBVSxFQUFFLGNBQWM7QUFDMUIsV0FBSyxFQUFFLENBQUM7QUFDSixZQUFJLEVBQUUsTUFBTTtBQUNaLGtCQUFVLEVBQUUscUJBQXFCO0FBQ2pDLG9CQUFZLEVBQUUsY0FBYztBQUM1QixZQUFJLEVBQUUsZUFBZTtBQUNyQixhQUFLLEVBQUU7QUFDTCxjQUFJLEVBQUUsU0FBUztBQUNmLG9CQUFVLEVBQUUsZUFBZTtBQUMzQixzQkFBWSxFQUFFLFlBQVk7QUFDMUIsY0FBSSxFQUFFLFNBQVM7U0FDaEI7T0FDSixFQUNEO0FBQ0ksWUFBSSxFQUFFLE9BQU87QUFDYixrQkFBVSxFQUFFLHFCQUFxQjtBQUNqQyxvQkFBWSxFQUFFLE9BQU87QUFDckIsWUFBSSxFQUFFLGVBQWU7T0FDeEIsQ0FDQTtLQUNKLENBQUMsQ0FBQzs7QUFFSCxRQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDO0dBQ3JCO0NBQ0YsQ0FBQzs7QUFFRixNQUFNLENBQUMsT0FBTyxHQUFHLEdBQUcsQ0FBQzs7O0FDOURyQixZQUFZLENBQUM7O0FBRWIsSUFBSSxhQUFhLEdBQUcsS0FBSyxDQUFDLFdBQVcsQ0FBQzs7O0FBQ3BDLFFBQU0sRUFBQSxnQkFBQyxDQUFDLEVBQU87QUFDYixRQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxRQUFRLENBQUMsQ0FBQztHQUM5RjtBQUNELFVBQVEsRUFBQSxrQkFBQyxDQUFDLEVBQU07QUFDZCxRQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO0dBQ3BGO0FBQ0QsU0FBTyxFQUFBLGlCQUFDLENBQUMsRUFBTTtBQUNiLFFBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0dBQzdGO0FBQ0QsUUFBTSxFQUFBLGtCQUFROzs7QUFDWixRQUFJLEVBQUUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQztBQUNsQyxRQUFJLGVBQWUsR0FBRyxNQUFNLENBQ3pCLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FDUixNQUFNLENBQUMsVUFBQSxNQUFNO2FBQUksRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLFFBQVEsS0FBSyxNQUFLLEtBQUssQ0FBQyxRQUFRLElBQUksRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLFdBQVcsS0FBSyxNQUFLLEtBQUssQ0FBQyxXQUFXO0tBQUEsQ0FBQyxDQUNsSCxHQUFHLENBQUMsVUFBQSxNQUFNO2FBQUksNkJBQUssU0FBUyxFQUFFLE9BQU8sR0FBRyxNQUFNLEFBQUMsR0FBTztLQUFBLENBQUMsQ0FBQTtBQUMxRCxXQUFPOzs7TUFDTCwrQkFBTyxJQUFJLEVBQUMsTUFBTTtBQUNoQixhQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEFBQUM7QUFDeEIsV0FBRyxFQUFDLE9BQU87QUFDWCxnQkFBUSxFQUFFLElBQUksQ0FBQyxRQUFRLEFBQUM7QUFDeEIsZUFBTyxFQUFFLElBQUksQ0FBQyxPQUFPLEFBQUM7QUFDdEIsY0FBTSxFQUFFLElBQUksQ0FBQyxNQUFNLEFBQUMsR0FBRTtNQUN2QixlQUFlO0tBQ2IsQ0FBQztHQUNQO0NBQ0YsQ0FBQyxDQUFDOztBQUVILE1BQU0sQ0FBQyxPQUFPLEdBQUcsYUFBYSxDQUFDOzs7QUM5Qi9CLFlBQVksQ0FBQzs7Ozs7Ozs7OztBQUNiLElBQUksWUFBWSxHQUFHLE9BQU8sQ0FBQywrQkFBK0IsQ0FBQyxDQUFDO0FBQzVELElBQUksa0JBQWtCLEdBQUcsT0FBTyxDQUFDLHFDQUFxQyxDQUFDLENBQUM7QUFDeEUsSUFBSSxVQUFVLEdBQUcsT0FBTyxDQUFDLDRCQUE0QixDQUFDLENBQUM7QUFDdkQsSUFBSSxHQUFHLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDOztJQUV0QixjQUFjO0FBQ1AsV0FEUCxjQUFjLENBQ04sSUFBSSxFQUFFLE1BQU0sRUFBRTswQkFEdEIsY0FBYzs7QUFFaEIsK0JBRkUsY0FBYyw2Q0FFVixJQUFJLEVBQUU7O0FBRVosUUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7QUFDckIsV0FBTyxDQUFDLEdBQUcsQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQ3ZDLGNBQVUsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsQ0FBQzs7QUFFOUMsUUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsWUFBWSxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7QUFDMUQsUUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsWUFBWSxDQUFDLG9CQUFvQixFQUFFLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0FBQ3pFLFFBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDO0FBQzlCLFFBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsVUFBVSxDQUFDLGFBQWEsQ0FBQyxDQUFDO0dBQ2xFOztZQVpHLGNBQWM7O2VBQWQsY0FBYztBQWNsQixpQkFBYTthQUFBLHlCQUFHO0FBQ2QsWUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxVQUFVLENBQUMsYUFBYSxDQUFDLENBQUM7T0FDbEU7O0FBRUQsZ0JBQVk7YUFBQSxzQkFBQyxPQUFPLEVBQUU7QUFDcEIsMEJBQWtCLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDO09BQ3hDOztBQUVELHNCQUFrQjthQUFBLDRCQUFDLE9BQU8sRUFBRTtBQUMxQiwwQkFBa0IsQ0FBQyxrQkFBa0IsQ0FBQyxPQUFPLENBQUMsQ0FBQztPQUNoRDs7QUFFRCxXQUFPO2FBQUEsbUJBQUc7QUFDTixlQUFPLENBQUMsR0FBRyxpQkFBZSxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBRyxDQUFDO0FBQ25ELFlBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO0FBQzNELFlBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxvQkFBb0IsRUFBRSxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQztBQUMxRSxrQkFBVSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQyxDQUFDO09BQ2xEOzs7O1NBL0JHLGNBQWM7R0FBUyxHQUFHLENBQUMsY0FBYzs7QUFrQy9DLE1BQU0sQ0FBQyxPQUFPLEdBQUcsY0FBYyxDQUFDOzs7QUN4Q2hDLFlBQVksQ0FBQzs7Ozs7Ozs7OztBQUViLElBQUksSUFBSSxFQUFFLGFBQWEsRUFBRSxJQUFJLENBQUM7QUFDOUIsSUFBSSxhQUFhLEdBQUcsT0FBTyxDQUFDLG9CQUFvQixDQUFDLENBQUM7QUFDbEQsSUFBSSxHQUFHLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDOztJQUV0QixRQUFRO0FBQ0QsV0FEUCxRQUFRLENBQ0EsSUFBSSxFQUFFLFFBQVEsRUFBRTswQkFEeEIsUUFBUTs7QUFFViwrQkFGRSxRQUFRLDZDQUVKLElBQUksRUFBRSxRQUFRLEVBQUU7O0FBRXRCLFFBQUksR0FBRyxFQUFFLENBQUM7QUFDVixpQkFBYSxHQUFHLEVBQUUsQ0FBQztBQUNuQixRQUFJLEdBQUcsSUFBSSxDQUFDO0dBQ2I7O1lBUEcsUUFBUTs7ZUFBUixRQUFRO0FBU1osVUFBTTthQUFBLGtCQUFHOzs7Ozs7Ozs7Ozs7Ozs7QUFnQkwsWUFBSSxTQUFTLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxvQkFBQyxhQUFhO0FBQ25DLGNBQUksRUFBRSxJQUFJLEFBQUM7QUFDWCx1QkFBYSxFQUFFLGFBQWEsQUFBQztBQUM3QixjQUFJLEVBQUUsSUFBSSxBQUFDO0FBQ1gsWUFBRSxFQUFFLElBQUksQ0FBQyxFQUFFLEFBQUMsR0FBRSxFQUNkLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztPQUNwQjs7QUFHRCxXQUFPO2FBQUEsbUJBQUc7QUFDUixhQUFLLENBQUMsc0JBQXNCLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO09BQ3ZDOztBQUVELGVBQVc7YUFBQSxxQkFBQyxDQUFDLEVBQUUsRUFBRSxFQUFFO0FBQ2YsZUFBTyxDQUFDLEdBQUcsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO0FBQ3JDLFlBQUksR0FBRyxDQUFDLENBQUM7QUFDVCxxQkFBYSxHQUFHLEVBQUUsQ0FBQTtBQUNsQixZQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7T0FDZjs7QUFNRyxRQUFJO1dBSkEsWUFBRztBQUNULGVBQU8sSUFBSSxDQUFDO09BQ2I7V0FFTyxVQUFDLENBQUMsRUFBRTtBQUNWLFlBQUksR0FBRyxDQUFDLENBQUM7QUFDVCxZQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7T0FDZjs7QUFPRyxNQUFFO1dBTEEsVUFBQyxHQUFHLEVBQUU7QUFDVixZQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztBQUNmLFlBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztPQUNmO1dBRUssWUFBRztBQUNQLGVBQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQztPQUNqQjs7QUFNRyxpQkFBYTtXQUpBLFlBQUc7QUFDbEIsZUFBTyxhQUFhLENBQUM7T0FDdEI7V0FFZ0IsVUFBQyxFQUFFLEVBQUU7QUFDcEIscUJBQWEsR0FBRyxFQUFFLENBQUM7QUFDbkIsWUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO09BQ2Y7Ozs7U0F0RUcsUUFBUTtHQUFTLEdBQUcsQ0FBQyxJQUFJOztBQXlFL0IsTUFBTSxDQUFDLE9BQU8sR0FBRyxRQUFRLENBQUM7OztBQy9FMUIsWUFBWSxDQUFDOztBQUViLElBQUksWUFBWSxHQUFHLE9BQU8sQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO0FBQ2hELElBQUksWUFBWSxHQUFHLE9BQU8sQ0FBQywrQkFBK0IsQ0FBQyxDQUFDO0FBQzVELElBQUksU0FBUyxHQUFHLE9BQU8sQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDOztBQUU5QyxJQUFJLGFBQWEsR0FBRyxLQUFLLENBQUMsV0FBVyxDQUFDOzs7QUFDcEMsaUJBQWUsRUFBQSwyQkFBUTtBQUNyQixXQUFPLEVBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFDLENBQUM7R0FDaEM7QUFDRCxZQUFVLEVBQUEsb0JBQUMsUUFBUSxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFPO0FBQ3BELFFBQUksSUFBSSxDQUFDLFNBQVMsRUFBRTtBQUNsQixVQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUM7S0FDeEQ7O0FBRUQsUUFBSSxNQUFNLEtBQUssT0FBTyxFQUFFO0FBQ3RCLFVBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsb0JBQW9CLEVBQUU7QUFDdEQsZ0JBQVEsRUFBRSxRQUFRO0FBQ2xCLG1CQUFXLEVBQUUsV0FBVztPQUN6QixDQUFDLENBQUM7QUFDSCxhQUFPO0tBQ1I7QUFDRCxRQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxXQUFXLENBQUMsR0FBRyxLQUFLLENBQUM7QUFDL0MsUUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFDLElBQUksRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksRUFBQyxDQUFDLENBQUM7QUFDdkMsUUFBSSxNQUFNLEVBQUU7QUFDVixVQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsRUFBRTtBQUM3QyxnQkFBUSxFQUFFLFFBQVE7QUFDbEIsbUJBQVcsRUFBRSxXQUFXO0FBQ3hCLGFBQUssRUFBRSxLQUFLO09BQ2IsQ0FBQyxDQUFDO0tBQ0o7R0FDRjtBQUNELG1CQUFpQixFQUFFLDZCQUFXO0FBQzVCLFFBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxTQUFTLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxFQUFFLG1CQUFtQixDQUFDLENBQUM7R0FDeEU7QUFDQyxhQUFXLEVBQUUscUJBQVMsQ0FBQyxFQUFFO0FBQ3JCLE9BQUcsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLGVBQWUsQ0FBQyxDQUFDO0FBQ3ZDLEtBQUMsQ0FBQyxjQUFjLEVBQUUsQ0FBQztHQUN0QjtBQUNDLFFBQU0sRUFBQSxrQkFBUTs7O0FBQ1YsUUFBSSxPQUFPLEdBQUcsRUFBRSxDQUFDO0FBQ3ZCLFFBQUksSUFBSSxHQUFHLEVBQUUsQ0FBQzs7QUFFZCxRQUFHLElBQUksQ0FBQyxTQUFTLEVBQUU7QUFDakIsVUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztLQUN6QjtBQUNELFFBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUU7QUFDekMsYUFBTyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxVQUFDLElBQUksRUFBRSxLQUFLO2VBQUs7Ozs7VUFBUyxLQUFLLEdBQUcsQ0FBQztTQUFNO09BQUEsQ0FBQyxDQUFDO0FBQzVFLFVBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsVUFBQyxHQUFHLEVBQUUsS0FBSztlQUFLLG9CQUFDLFlBQVk7QUFDdEQsYUFBRyxFQUFFLEdBQUcsQUFBQztBQUNULGFBQUcsRUFBRSxLQUFLLEFBQUM7QUFDWCxrQkFBUSxFQUFFLEtBQUssQUFBQztBQUNoQix1QkFBYSxFQUFFLE1BQUssS0FBSyxDQUFDLGFBQWEsQUFBQztBQUN4QyxvQkFBVSxFQUFFLE1BQUssVUFBVSxBQUFDLEdBQUU7T0FBQSxDQUFDLENBQUM7S0FDbkM7QUFDRCxXQUNJOzs7O01BQ1MsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFO01BQ3JCLEFBQUMsSUFBSSxJQUFJLEVBQUUsQ0FBRSxRQUFRLEVBQUU7O01BRXhCLDZCQUFLLEVBQUUsRUFBQyxrQkFBa0IsR0FBTztNQUNqQzs7O1FBQ0Y7OztVQUNFOzs7WUFBSyxPQUFPO1dBQU07U0FDWjtRQUNSOzs7VUFDRyxJQUFJO1NBQ0M7T0FDRjtNQUNSOztVQUFHLElBQUksRUFBQyxPQUFPLEVBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxXQUFXLEFBQUM7O09BQXVCO01BQ2pFLDZCQUFLLEVBQUUsRUFBQyxhQUFhLEdBQU87S0FDdEIsQ0FBRTtHQUNUO0NBQ0YsQ0FBQyxDQUFDOztBQUVILE1BQU0sQ0FBQyxPQUFPLEdBQUcsYUFBYSxDQUFDOzs7QUMzRS9CLFlBQVksQ0FBQztBQUNiLElBQUksYUFBYSxHQUFHLE9BQU8sQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDOztBQUVsRCxJQUFJLFlBQVksR0FBRyxLQUFLLENBQUMsV0FBVyxDQUFDOzs7QUFDbkMsUUFBTSxFQUFBLGtCQUFROzs7QUFDWixRQUFJLEtBQUssR0FBRyxFQUFFLENBQUM7QUFDZixRQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRTtBQUN6QixXQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLFVBQUMsSUFBSSxFQUFFLEtBQUs7ZUFBSyxvQkFBQyxhQUFhO0FBQ3hELGVBQUssRUFBRSxJQUFJLEFBQUM7QUFDWixhQUFHLEVBQUUsS0FBSyxBQUFDO0FBQ1gscUJBQVcsRUFBRSxLQUFLLEFBQUM7QUFDbkIsa0JBQVEsRUFBRSxNQUFLLEtBQUssQ0FBQyxRQUFRLEFBQUM7QUFDOUIsdUJBQWEsRUFBRSxNQUFLLEtBQUssQ0FBQyxhQUFhLEFBQUM7QUFDeEMsb0JBQVUsRUFBRSxNQUFLLEtBQUssQ0FBQyxVQUFVLEFBQUMsR0FBRTtPQUFBLENBQUMsQ0FBQztLQUN6QztBQUNELFdBQU87OztNQUFLLEtBQUs7S0FBTSxDQUFDO0dBQ3pCO0NBQ0YsQ0FBQyxDQUFDOztBQUVILE1BQU0sQ0FBQyxPQUFPLEdBQUcsWUFBWSxDQUFDOzs7QUNuQjlCLFlBQVksQ0FBQzs7Ozs7Ozs7OztBQUNiLElBQUksWUFBWSxHQUFHLE9BQU8sQ0FBQywrQkFBK0IsQ0FBQyxDQUFDO0FBQzVELElBQUksa0JBQWtCLEdBQUcsT0FBTyxDQUFDLHFDQUFxQyxDQUFDLENBQUM7O0FBRXhFLElBQUksR0FBRyxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQzs7SUFDdEIscUJBQXFCO0FBQ2QsV0FEUCxxQkFBcUIsQ0FDYixJQUFJLEVBQUU7MEJBRGQscUJBQXFCOztBQUV2QiwrQkFGRSxxQkFBcUIsNkNBRWpCLElBQUksRUFBRTs7QUFFWixRQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUNoRCxRQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxZQUFZLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztHQUN2RDs7WUFORyxxQkFBcUI7O2VBQXJCLHFCQUFxQjtBQVF6QixVQUFNO2FBQUEsZ0JBQUMsT0FBTyxFQUFFO0FBQ2QsMEJBQWtCLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO09BQ3BDOztBQUVELGFBQVM7YUFBQSxtQkFBQyxPQUFPLEVBQUU7QUFDakIsMEJBQWtCLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDO09BQ3ZDOztBQUVELFdBQU87YUFBQSxtQkFBRztBQUNSLGVBQU8sQ0FBQyxHQUFHLENBQUMsa0NBQWtDLENBQUMsQ0FBQztBQUNoRCxZQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO09BQ3JCOzs7O1NBbkJHLHFCQUFxQjtHQUFTLEdBQUcsQ0FBQyxjQUFjOztBQXNCdEQsTUFBTSxDQUFDLE9BQU8sR0FBRyxxQkFBcUIsQ0FBQzs7O0FDM0J2QyxZQUFZLENBQUM7Ozs7Ozs7Ozs7QUFFYixJQUFJLElBQUksQ0FBQztBQUNULElBQUksb0JBQW9CLEdBQUcsT0FBTyxDQUFDLDJCQUEyQixDQUFDLENBQUM7QUFDaEUsSUFBSSxHQUFHLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDOztJQUV0QixlQUFlO0FBQ1IsV0FEUCxlQUFlLENBQ1AsSUFBSSxFQUFFLFFBQVEsRUFBRTswQkFEeEIsZUFBZTs7QUFFakIsK0JBRkUsZUFBZSw2Q0FFWCxJQUFJLEVBQUUsUUFBUSxFQUFFO0FBQ3RCLFFBQUksR0FBRyxJQUFJLENBQUM7R0FDYjs7WUFKRyxlQUFlOztlQUFmLGVBQWU7QUFNbkIsVUFBTTthQUFBLGtCQUFHO0FBQ1AsYUFBSyxDQUFDLE1BQU0sQ0FBQyxvQkFBQyxvQkFBb0IsSUFBQyxJQUFJLEVBQUUsSUFBSSxBQUFDLEdBQUcsRUFDL0MsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO09BQ1o7O0FBRUQsV0FBTzthQUFBLG1CQUFHO0FBQ1IsYUFBSyxDQUFDLHNCQUFzQixDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQzs7T0FFdkM7Ozs7U0FkRyxlQUFlO0dBQVMsR0FBRyxDQUFDLElBQUk7O0FBaUJ0QyxNQUFNLENBQUMsT0FBTyxHQUFHLGVBQWUsQ0FBQzs7O0FDdkJqQyxZQUFZLENBQUM7QUFDYixJQUFJLFlBQVksR0FBRyxPQUFPLENBQUMsK0JBQStCLENBQUMsQ0FBQzs7QUFFNUQsSUFBSSxhQUFhLEdBQUcsS0FBSyxDQUFDLFdBQVcsQ0FBQzs7O0FBQ3BDLFFBQU0sRUFBQSxrQkFBUTtBQUNaLFFBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUFFO0FBQ3pDLGNBQVEsRUFBRSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFO0tBQ2pFLENBQUMsQ0FBQztHQUNKO0FBQ0QsV0FBUyxFQUFBLHFCQUFRO0FBQ2YsUUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxVQUFVLEVBQUU7QUFDNUMsY0FBUSxFQUFFLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUU7S0FDakUsQ0FBQyxDQUFDO0dBQ0o7QUFDRCxRQUFNLEVBQUEsa0JBQVE7QUFDWixXQUFPOzs7TUFDTDs7VUFBUSxPQUFPLEVBQUUsSUFBSSxDQUFDLE1BQU0sQUFBQzs7T0FBcUI7TUFDbEQ7O1VBQVEsT0FBTyxFQUFFLElBQUksQ0FBQyxTQUFTLEFBQUM7O09BQW9CO01BQ3BELCtCQUFPLElBQUksRUFBQyxNQUFNLEVBQUMsWUFBWSxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsYUFBYSxHQUFHO01BQ3hELDZCQUFLLEVBQUUsRUFBQyxXQUFXLEdBQU87S0FDdEIsQ0FBQztHQUNSO0NBQ0YsQ0FBQyxDQUFDOztBQUVILE1BQU0sQ0FBQyxPQUFPLEdBQUcsYUFBYSxDQUFDOzs7QUN4Qi9CLFlBQVksQ0FBQzs7Ozs7Ozs7OztBQUNiLElBQUksR0FBRyxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQzs7SUFFdEIsZUFBZTtBQUNSLFdBRFAsZUFBZSxDQUNQLElBQUksRUFBRTswQkFEZCxlQUFlOztBQUVqQiwrQkFGRSxlQUFlLDZDQUVYLElBQUksRUFBRTtHQUNiOztZQUhHLGVBQWU7O2VBQWYsZUFBZTtBQUtuQixXQUFPO2FBQUEsbUJBQUc7QUFDTixlQUFPLENBQUMsR0FBRyxpQkFBZSxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBRyxDQUFDO09BQ3REOzs7O1NBUEcsZUFBZTtHQUFTLEdBQUcsQ0FBQyxjQUFjOztBQVVoRCxNQUFNLENBQUMsT0FBTyxHQUFHLGVBQWUsQ0FBQzs7O0FDYmpDLFlBQVksQ0FBQzs7Ozs7Ozs7OztBQUNiLElBQUksR0FBRyxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQzs7SUFFdEIsU0FBUztBQUNGLFdBRFAsU0FBUyxDQUNELElBQUksRUFBRSxRQUFRLEVBQUU7MEJBRHhCLFNBQVM7O0FBRVgsK0JBRkUsU0FBUyw2Q0FFTCxJQUFJLEVBQUUsUUFBUSxFQUFFO0dBQ3ZCOztZQUhHLFNBQVM7O2VBQVQsU0FBUztBQUtiLFVBQU07YUFBQSxnQkFBQyxLQUFLLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7QUFnQlosWUFBSSxJQUFJLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQztBQUN0QixZQUFJLENBQUMsRUFBRSxDQUFDLFNBQVMsMkNBQXlDLElBQUksQ0FBQyxJQUFJLFdBQVEsQ0FBQztPQUM3RTs7QUFFRCxZQUFRO2FBQUEsa0JBQUMsR0FBRyxFQUFFO0FBQ1osWUFBSSxDQUFDLElBQUksR0FBRyxHQUFHLENBQUM7T0FDakI7O0FBRUQsWUFBUTthQUFBLG9CQUFHO0FBQ1QsZUFBTyxJQUFJLENBQUMsSUFBSSxDQUFDO09BQ2xCOzs7O1NBL0JHLFNBQVM7R0FBUyxHQUFHLENBQUMsSUFBSTs7QUFrQ2hDLE1BQU0sQ0FBQyxPQUFPLEdBQUcsU0FBUyxDQUFDOzs7OztBQ25DM0IsWUFBWSxDQUFDO0FBQ2IsSUFBSSxFQUFFLEdBQUksQ0FBQSxZQUFZO0FBQ3BCLE1BQUksUUFBUSxFQUFFLElBQUksQ0FBQztBQUNuQixNQUFJLE1BQU0sR0FBRyxFQUFFLENBQUM7QUFDaEIsTUFBSSxHQUFHLEdBQUcsRUFBRSxDQUFDO0FBQ2IsTUFBSSxjQUFjLEdBQUcsRUFBRSxDQUFDO0FBQ3hCLE1BQUksb0JBQW9CLEdBQUcsRUFBRSxDQUFDO0FBQzlCLE1BQUksT0FBTyxDQUFDO0FBQ1osTUFBSSxtQkFBbUIsR0FBRyxFQUFFLENBQUM7QUFDN0IsTUFBSSxhQUFhLEdBQUcsRUFBRSxDQUFDOztBQUV2QixNQUFJLEVBQUUsR0FBRyxZQUFVLENBQUMsRUFBRTtBQUNwQixXQUFPLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztHQUNuQixDQUFDOztBQUVGLElBQUUsQ0FBQyxTQUFTLENBQUMsT0FBTyxHQUFHLFVBQVUsQ0FBQyxFQUFFO0FBQ2xDLFFBQUksR0FBRyxDQUFDLENBQUM7R0FDVixDQUFDOztBQUVGLElBQUUsQ0FBQyxTQUFTLENBQUMsT0FBTyxHQUFHLFlBQVk7QUFDakMsV0FBTyxJQUFJLENBQUM7R0FDYixDQUFDOztBQUVGLElBQUUsQ0FBQyxTQUFTLENBQUMsU0FBUyxHQUFHLFVBQVUsQ0FBQyxFQUFFO0FBQ3BDLFVBQU0sR0FBRyxDQUFDLENBQUM7R0FDWixDQUFDOztBQUVGLElBQUUsQ0FBQyxTQUFTLENBQUMsV0FBVyxHQUFHLFlBQVk7QUFDckMsV0FBTyxRQUFRLENBQUM7R0FDakIsQ0FBQzs7QUFHRixJQUFFLENBQUMsU0FBUyxDQUFDLGVBQWUsR0FBRyxZQUFZO0FBQ3pDLFdBQU8sYUFBYSxDQUFDO0dBQ3RCLENBQUM7O0FBRUYsSUFBRSxDQUFDLFNBQVMsQ0FBQyxpQkFBaUIsR0FBRyxVQUFVLE9BQU8sRUFBRTtBQUNsRCxrQkFBYyxHQUFHLE9BQU8sQ0FBQztHQUMxQixDQUFDOztBQUVGLElBQUUsQ0FBQyxTQUFTLENBQUMsdUJBQXVCLEdBQUcsVUFBVSxNQUFNLEVBQUU7QUFDdkQsd0JBQW9CLEdBQUcsTUFBTSxDQUFDO0dBQy9CLENBQUM7O0FBRUYsSUFBRSxDQUFDLFNBQVMsQ0FBQyxhQUFhLEdBQUcsVUFBVSxNQUFNLEVBQUUsS0FBSyxFQUFFO0FBQ3BELFFBQUksSUFBSSxHQUFHO0FBQ1QsWUFBTSxFQUFFLE1BQU07QUFDZCxZQUFNLEVBQUUsTUFBTTtBQUNkLGNBQVEsRUFBRSxRQUFRO0FBQ2xCLFdBQUssRUFBRSxLQUFLO0tBQ2IsQ0FBQztBQUNGLFdBQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztHQUM3QixDQUFDOztBQUVGLElBQUUsQ0FBQyxTQUFTLENBQUMsYUFBYSxHQUFHLFVBQVUsTUFBTSxFQUFFLFFBQVEsRUFBRTtBQUN2RCxRQUFJLE9BQU8sUUFBUSxLQUFLLFVBQVUsRUFBRTtBQUNsQyxZQUFNLCtCQUErQixDQUFDO0tBQ3ZDO0FBQ0QsUUFBSSxDQUFDLG1CQUFtQixDQUFDLE1BQU0sQ0FBQyxFQUFFO0FBQ2hDLHlCQUFtQixDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsQ0FBQztLQUNsQztBQUNELHVCQUFtQixDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztHQUM1QyxDQUFDOztBQUVGLE1BQUksT0FBTyxHQUFHLGlCQUFVLE9BQU8sRUFBRTtBQUMvQixRQUFJLE1BQU0sR0FBRyxjQUFjLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQzVDLFFBQUksTUFBTSxFQUFFO0FBQ1YsWUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0tBQ2pCO0FBQ0QsUUFBSSxxQkFBcUIsR0FBRyxtQkFBbUIsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDaEUsUUFBSSxxQkFBcUIsRUFBRTtBQUN6QiwyQkFBcUIsQ0FBQyxPQUFPLENBQUMsVUFBVSxRQUFRLEVBQUU7QUFDaEQsZ0JBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQztPQUNuQixDQUFDLENBQUM7S0FDSjtBQUNELFVBQU0sQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQzlCLE9BQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7R0FDbkIsQ0FBQzs7QUFFRixJQUFFLENBQUMsU0FBUyxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7O0FBRy9CLElBQUUsQ0FBQyxTQUFTLENBQUMsVUFBVSxHQUFHLFVBQVUsT0FBTyxFQUFFO0FBQzNDLFdBQU8sQ0FBQyxjQUFjLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQztBQUN4QyxXQUFPLENBQUMsTUFBTSxHQUFHLE9BQU8sQ0FBQztBQUN6QixXQUFPLE9BQU8sQ0FBQztHQUNoQixDQUFDOztBQUVGLE1BQUksWUFBWSxHQUFHLHNCQUFVLFlBQVksRUFBRSxZQUFZLEVBQUU7QUFDdkQsUUFBSSxlQUFlLEdBQUcsS0FBSyxDQUFDO0FBQzVCLFNBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxZQUFZLENBQUMsTUFBTSxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUU7QUFDL0MsVUFBSSxZQUFZLENBQUMsQ0FBQyxDQUFDLEtBQUssWUFBWSxDQUFDLENBQUMsQ0FBQyxFQUFFO0FBQ3ZDLGlCQUFTO09BQ1Y7QUFDRCxVQUFJLFlBQVksQ0FBQyxDQUFDLENBQUMsR0FBRyxZQUFZLENBQUMsQ0FBQyxDQUFDLEVBQUU7QUFDckMsdUJBQWUsR0FBRyxJQUFJLENBQUM7T0FDeEIsTUFBTTtBQUNMLGVBQU8sQ0FBQyxDQUFDO09BQ1Y7S0FDRjtBQUNELFdBQU8sQUFBQyxlQUFlLEdBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0dBQ25DLENBQUM7O0FBRUYsTUFBSSxTQUFTLEdBQUcsbUJBQVUsVUFBVSxFQUFFLFVBQVUsRUFBRTtBQUNoRCxRQUFJLFVBQVUsSUFBSSxvQkFBb0IsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLElBQUksb0JBQW9CLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsRUFBRTtBQUN2SCxhQUFPLG9CQUFvQixDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUMsVUFBVSxFQUFFLFVBQVUsQ0FBQyxDQUFDO0tBQzNGO0FBQ0QsV0FBTyxVQUFVLENBQUM7R0FDbkIsQ0FBQzs7QUFFRixJQUFFLENBQUMsU0FBUyxDQUFDLGNBQWMsR0FBRyxVQUFVLENBQUMsRUFBRTtBQUN6QyxRQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQzVCLFlBQVEsT0FBTyxDQUFDLE1BQU07QUFDdEIsV0FBSyxNQUFNO0FBQ1QsWUFBSSxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDO0FBQzFCLGdCQUFRLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUM7QUFDbEMsY0FBTSxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDO0FBQzlCLFlBQUksT0FBTyxPQUFPLENBQUMsTUFBTSxLQUFLLFVBQVUsRUFBRTtBQUN4QyxpQkFBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUN0QjtBQUNELGNBQU07QUFBQSxBQUNSLFdBQUssVUFBVTtBQUNiLGNBQU0sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQzFCLFlBQUksT0FBTyxPQUFPLENBQUMsU0FBUyxLQUFLLFVBQVUsRUFBRTtBQUMzQyxpQkFBTyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQztTQUM1QjtBQUNELGNBQU07QUFBQSxBQUNSLFdBQUssc0JBQXNCO0FBQ3pCLHFCQUFhLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUM7QUFDaEQsWUFBSSxPQUFPLE9BQU8sQ0FBQyxvQkFBb0IsS0FBSyxVQUFVLEVBQUU7QUFDdEQsaUJBQU8sQ0FBQyxvQkFBb0IsQ0FBQyxPQUFPLENBQUMsQ0FBQztTQUN2QztBQUNELGNBQU07QUFBQSxBQUNSLFdBQUssT0FBTztBQUNWLGVBQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUNqQixjQUFNO0FBQUEsQUFDUjtBQUNFLFlBQUksUUFBUSxLQUFLLE9BQU8sQ0FBQyxRQUFRLEVBQUU7QUFDakMsa0JBQVEsWUFBWSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDO0FBQzVDLGlCQUFLLENBQUM7O0FBRUoscUJBQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUNqQixvQkFBTTtBQUFBLEFBQ1IsaUJBQUssQ0FBQzs7Ozs7QUFLSixvQkFBTTtBQUFBLEFBQ1IsaUJBQUssQ0FBQyxDQUFDOztBQUVMLG1CQUFLLElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRTs7QUFFM0Msb0JBQUksa0JBQWtCLEdBQUcsWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLEVBQUUsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQ3JFLG9CQUFJLGtCQUFrQixLQUFLLENBQUMsQ0FBQyxFQUFFO0FBQzdCLHdCQUFNO2lCQUNQO2VBQ0Y7QUFDRCxrQkFBSSxrQkFBa0IsR0FBRyxPQUFPLENBQUM7QUFDakMsbUJBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFO0FBQzFDLGtDQUFrQixHQUFHLFNBQVMsQ0FBQyxrQkFBa0IsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztlQUM1RDtBQUNELHFCQUFPLENBQUMsa0JBQWtCLENBQUMsQ0FBQztBQUFBLFdBQzdCO1NBQ0Y7QUFBQSxLQUNGO0FBQ0QsV0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsR0FBRyxDQUFDLENBQUM7R0FDaEQsQ0FBQzs7QUFFRixTQUFPLEVBQUUsQ0FBQztDQUNYLENBQUEsRUFBRSxBQUFDLENBQUM7O0FBRUwsTUFBTSxDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUM7OztBQzlLcEIsWUFBWSxDQUFDO0FBQ2IsSUFBSSxnQkFBZ0IsR0FBSSxDQUFBLFlBQVk7QUFDbEMsTUFBSSxFQUFFLENBQUM7O0FBRVAsTUFBSSxjQUFjLEdBQUc7QUFDbkIsY0FBVSxFQUFFLG9CQUFVLE9BQU8sRUFBRTtBQUM3QixVQUFJLEtBQUssR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDO0FBQzFCLFVBQUksSUFBSSxHQUFHLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQztBQUN4QixVQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQztLQUMvRDtBQUNELFVBQU0sRUFBRSxnQkFBVSxPQUFPLEVBQUU7QUFDekIsVUFBSSxLQUFLLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQztBQUMxQixVQUFJLElBQUksR0FBRyxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUM7QUFDeEIsVUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztBQUM1QixVQUFJLEdBQUcsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLFlBQVk7QUFDaEMsZUFBTyxFQUFFLENBQUM7T0FDWCxDQUFDLENBQUM7O0FBRUgsVUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztLQUNyQztBQUNELGFBQVMsRUFBRSxtQkFBVSxPQUFPLEVBQUU7QUFDNUIsVUFBSSxLQUFLLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQztBQUMxQixVQUFJLElBQUksR0FBRyxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUM7QUFDeEIsVUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDO0tBQ2hDO0dBQ0YsQ0FBQzs7QUFFRixNQUFJLG9CQUFvQixHQUFHO0FBQ3pCLGNBQVUsRUFBRTtBQUNWLGdCQUFVLEVBQUUsb0JBQVUsVUFBVSxFQUFFLFVBQVUsRUFBRTtBQUM1QyxZQUFJLFVBQVUsQ0FBQyxLQUFLLENBQUMsUUFBUSxLQUFLLFVBQVUsQ0FBQyxLQUFLLENBQUMsUUFBUSxJQUFJLFVBQVUsQ0FBQyxLQUFLLENBQUMsV0FBVyxLQUFLLFVBQVUsQ0FBQyxLQUFLLENBQUMsV0FBVyxFQUFFO0FBQzVILGlCQUFPLFVBQVUsQ0FBQztTQUNuQjtBQUNELFlBQUksVUFBVSxDQUFDLFFBQVEsR0FBRyxVQUFVLENBQUMsUUFBUSxFQUFFO0FBQzdDLGlCQUFPLFVBQVUsQ0FBQztTQUNuQjtBQUNELFlBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztBQUN6RCxrQkFBVSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7QUFDekIsZUFBTyxVQUFVLENBQUM7T0FDbkI7QUFDRCxZQUFNLEVBQUUsZ0JBQVUsVUFBVSxFQUFFLFVBQVUsRUFBRTtBQUN4QyxZQUFJLFVBQVUsQ0FBQyxLQUFLLENBQUMsUUFBUSxHQUFHLFVBQVUsQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFO0FBQ3pELGlCQUFPLFVBQVUsQ0FBQztTQUNuQjtBQUNELGtCQUFVLENBQUMsS0FBSyxDQUFDLFFBQVEsSUFBSSxDQUFDLENBQUM7QUFDL0IsZUFBTyxVQUFVLENBQUM7T0FDbkI7QUFDRCxlQUFTLEVBQUUsbUJBQVUsVUFBVSxFQUFFLFVBQVUsRUFBRTtBQUMzQyxZQUFJLFVBQVUsQ0FBQyxLQUFLLENBQUMsUUFBUSxHQUFHLFVBQVUsQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFO0FBQ3pELGlCQUFPLFVBQVUsQ0FBQztTQUNuQjtBQUNELFlBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLFFBQVEsS0FBSyxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFO0FBQzdELGlCQUFPLEVBQUUsQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLENBQUM7U0FDbEM7QUFDRCxrQkFBVSxDQUFDLEtBQUssQ0FBQyxRQUFRLElBQUksQ0FBQyxDQUFDO0FBQy9CLGVBQU8sVUFBVSxDQUFDO09BQ25CO0tBQ0Y7QUFDRCxVQUFNLEVBQUU7OztBQUdOLFlBQU0sRUFBRSxnQkFBVSxVQUFVLEVBQUUsVUFBVSxFQUFFO0FBQ3hDLFlBQUksVUFBVSxDQUFDLEtBQUssQ0FBQyxRQUFRLEtBQUssVUFBVSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUU7QUFDM0QsaUJBQU8sVUFBVSxDQUFDO1NBQ25CO0FBQ0QsZUFBTyxFQUFFLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxDQUFDO09BQ2xDO0FBQ0QsZUFBUyxFQUFFLG1CQUFVLFVBQVUsRUFBRSxVQUFVLEVBQUU7QUFDM0MsWUFBSSxVQUFVLENBQUMsS0FBSyxDQUFDLFFBQVEsR0FBRyxVQUFVLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRTtBQUN6RCxpQkFBTyxVQUFVLENBQUM7U0FDbkI7QUFDRCxrQkFBVSxDQUFDLEtBQUssQ0FBQyxRQUFRLElBQUksQ0FBQyxDQUFDO0FBQy9CLGVBQU8sVUFBVSxDQUFDO09BQ25CO0tBQ0Y7QUFDRCxhQUFTLEVBQUU7OztBQUdULFlBQU0sRUFBRSxnQkFBVSxVQUFVLEVBQUUsVUFBVSxFQUFFO0FBQ3hDLFlBQUksVUFBVSxDQUFDLEtBQUssQ0FBQyxRQUFRLEdBQUcsVUFBVSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUU7QUFDekQsaUJBQU8sVUFBVSxDQUFDO1NBQ25CO0FBQ0Qsa0JBQVUsQ0FBQyxLQUFLLENBQUMsUUFBUSxJQUFJLENBQUMsQ0FBQztBQUMvQixlQUFPLFVBQVUsQ0FBQztPQUNuQjtBQUNELGVBQVMsRUFBRSxtQkFBVSxVQUFVLEVBQUUsVUFBVSxFQUFFO0FBQzNDLFlBQUksVUFBVSxDQUFDLEtBQUssQ0FBQyxRQUFRLEtBQUssVUFBVSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUU7QUFDM0QsaUJBQU8sVUFBVSxDQUFDO1NBQ25CO0FBQ0QsZUFBTyxFQUFFLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxDQUFDO09BQ2xDO0tBQ0Y7R0FDRixDQUFDOztBQUVGLFNBQU8sVUFBVSxzQkFBc0IsRUFBRTtBQUN2QyxNQUFFLEdBQUcsc0JBQXNCLENBQUM7QUFDNUIsTUFBRSxDQUFDLGlCQUFpQixDQUFDLGNBQWMsQ0FBQyxDQUFDO0FBQ3JDLE1BQUUsQ0FBQyx1QkFBdUIsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO0dBQ2xELENBQUM7Q0FDSCxDQUFBLEVBQUUsQUFBQyxDQUFDOztBQUVMLE1BQU0sQ0FBQyxPQUFPLEdBQUcsZ0JBQWdCLENBQUM7OztBQ3JHbEMsWUFBWSxDQUFDOzs7Ozs7Ozs7O0FBRWIsSUFBSSxZQUFZLEdBQUcsT0FBTyxDQUFDLHlCQUF5QixDQUFDLENBQUM7QUFDdEQsSUFBSSxFQUFFLEdBQUcsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDO0FBQ2hDLElBQUksZ0JBQWdCLEdBQUcsT0FBTyxDQUFDLHNCQUFzQixDQUFDLENBQUM7QUFDdkQsSUFBSSxNQUFNLEVBQUUsRUFBRSxDQUFDO0FBQ2YsSUFBSSxHQUFHLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDOztJQUV0QixVQUFVO0FBQ0gsV0FEUCxVQUFVLEdBQ0E7MEJBRFYsVUFBVTs7QUFFWiwrQkFGRSxVQUFVLDZDQUVKOztBQUVSLFFBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQzs7QUFFWixRQUFJLENBQUMsV0FBVyxDQUNkLFlBQVksQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLFVBQVUsRUFBRSxFQUFFLEVBQzdDLFlBQVksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLFNBQVMsRUFBRSxFQUFFLEVBQ3hDLFlBQVksQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLFNBQVMsRUFBRSxFQUFFLEVBQzNDLFlBQVksQ0FBQyxvQkFBb0IsRUFBRSxJQUFJLENBQUMsa0JBQWtCLEVBQUUsRUFBRSxDQUMvRCxDQUFDO0dBQ0g7O1lBWkcsVUFBVTs7ZUFBVixVQUFVO0FBY2QsUUFBSTthQUFBLGdCQUFHO0FBQ0wsY0FBTSxHQUFHLElBQUksU0FBUyxDQUFDLHFCQUFxQixFQUFFLGFBQWEsQ0FBQyxDQUFDO0FBQzdELFlBQUksSUFBSSxHQUFHLElBQUksQ0FBQztBQUNoQixZQUFJLFVBQVUsR0FBRyxzQkFBWTtBQUMzQixjQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7U0FDbkIsQ0FBQzs7QUFFRixVQUFFLEdBQUcsSUFBSSxFQUFFLENBQUM7QUFDVixnQkFBTSxFQUFFLFVBQVU7QUFDbEIsOEJBQW9CLEVBQUUsVUFBVTtTQUNqQyxDQUFDLENBQUM7QUFDSCx3QkFBZ0IsQ0FBQyxFQUFFLENBQUMsQ0FBQzs7QUFFckIsVUFBRSxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUMsV0FBVyxFQUFFLFVBQVUsQ0FBQyxDQUFDO0FBQ3ZELFVBQUUsQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLE9BQU8sRUFBRSxVQUFVLENBQUMsQ0FBQztBQUNuRCxVQUFFLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQyxVQUFVLEVBQUUsVUFBVSxDQUFDLENBQUM7O0FBRXRELGNBQU0sQ0FBQyxTQUFTLEdBQUcsVUFBVSxLQUFLLEVBQUU7QUFDbEMsWUFBRSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDL0IsQ0FBQztPQUNIOztBQUVHLFFBQUk7V0FBQSxZQUFHO0FBQ1QsZUFBTyxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUM7T0FDckI7O0FBRUcsaUJBQWE7V0FBQSxZQUFHO0FBQ2xCLGVBQU8sRUFBRSxDQUFDLGVBQWUsRUFBRSxDQUFDO09BQzdCOztBQUVELGtCQUFjO2FBQUEsd0JBQUMsTUFBTSxFQUFFLE9BQU8sRUFBRTtBQUM5QixZQUFJLE9BQU8sR0FBRyxFQUFFLENBQUMsYUFBYSxDQUFDLE1BQU0sRUFBRSxPQUFPLENBQUMsQ0FBQztBQUNoRCxZQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQ2xDLFVBQUUsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDcEIsY0FBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUNyQixZQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7T0FDbkI7O0FBRUQsY0FBVTthQUFBLG9CQUFDLE9BQU8sRUFBRTtBQUNsQixZQUFJLENBQUMsY0FBYyxDQUFDLFlBQVksQ0FBQyxXQUFXLEVBQUUsT0FBTyxDQUFDLENBQUM7T0FDeEQ7O0FBRUQsYUFBUzthQUFBLG1CQUFDLE9BQU8sRUFBRTtBQUNqQixZQUFJLENBQUMsY0FBYyxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUM7T0FDcEQ7O0FBRUQsYUFBUzthQUFBLG1CQUFDLE9BQU8sRUFBRTtBQUNqQixZQUFJLENBQUMsY0FBYyxDQUFDLFlBQVksQ0FBQyxVQUFVLEVBQUUsT0FBTyxDQUFDLENBQUM7T0FDdkQ7O0FBRUQsc0JBQWtCO2FBQUEsNEJBQUMsT0FBTyxFQUFFO0FBQzFCLFlBQUksQ0FBQyxjQUFjLENBQUMsWUFBWSxDQUFDLG9CQUFvQixFQUFFLE9BQU8sQ0FBQyxDQUFDO09BQ2pFOzs7O1NBbEVHLFVBQVU7R0FBUyxHQUFHLENBQUMsS0FBSzs7QUFxRWxDLE1BQU0sQ0FBQyxPQUFPLEdBQUcsSUFBSSxVQUFVLEVBQUUsQ0FBQzs7O0FDN0VsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVvQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5RkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JPQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQzdCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUM3QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25DQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0dBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDdkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUN2REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQzNCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDdEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3REQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNkQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDeENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDMUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3REQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3REQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUNoQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQ3RFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIid1c2Ugc3RyaWN0JztcblxudmFyIFRhYmxlQWN0aW9ucyA9IHJlcXVpcmUoJy4vVGFibGVBY3Rpb25zJyk7XG5cbnZhciBHTFUgPSByZXF1aXJlKCdnbHUuanMnKTtcblxuY2xhc3MgVGFibGVBY3Rpb25DcmVhdG9yIHtcbiAgc3RhdGljIHVwZGF0ZUNlbGwocGF5bG9hZCkge1xuICAgIEdMVS5idXMuZW1pdEFjdGlvbihUYWJsZUFjdGlvbnMuVVBEQVRFX0NFTEwsIHBheWxvYWQpO1xuICB9XG4gIHN0YXRpYyBhZGRSb3cocGF5bG9hZCkge1xuICAgIEdMVS5idXMuZW1pdEFjdGlvbihUYWJsZUFjdGlvbnMuQUREX1JPVywgcGF5bG9hZCk7XG4gIH1cbiAgc3RhdGljIGRlbGV0ZVJvdyhwYXlsb2FkKSB7XG4gICAgR0xVLmJ1cy5lbWl0QWN0aW9uKFRhYmxlQWN0aW9ucy5ERUxFVEVfUk9XLCBwYXlsb2FkKTtcbiAgfVxuICBzdGF0aWMgdXNlckNoYW5nZVBvc2l0aW9uKHBheWxvYWQpIHtcbiAgICBHTFUuYnVzLmVtaXRBY3Rpb24oVGFibGVBY3Rpb25zLlVTRVJfQ0hBTkdFX1BPU0lUSU9OLCBwYXlsb2FkKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFRhYmxlQWN0aW9uQ3JlYXRvcjtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIFRhYmxlQWN0aW9ucyA9IHtcbiAgVVBEQVRFX0NFTEw6ICd1cGRhdGVDZWxsJyxcbiAgQUREX1JPVzogJ2FkZFJvdycsXG4gIERFTEVURV9ST1c6ICdkZWxldGVSb3cnLFxuICBVU0VSX0NIQU5HRV9QT1NJVElPTjogJ3VzZXItY2hhbmdlLXBvc2l0aW9uJ1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBUYWJsZUFjdGlvbnM7IiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgR3JpZFZpZXcgPSByZXF1aXJlKCcuL2NvbXBvbmVudHMvZ3JpZC9HcmlkVmlldycpO1xudmFyIEdyaWRDb250cm9sbGVyID0gcmVxdWlyZSgnLi9jb21wb25lbnRzL2dyaWQvR3JpZENvbnRyb2xsZXInKTtcblxudmFyIFRpdGxlVmlldyA9IHJlcXVpcmUoJy4vY29tcG9uZW50cy90aXRsZS9UaXRsZVZpZXcnKTtcbnZhciBUaXRsZUNvbnRyb2xsZXIgPSByZXF1aXJlKCcuL2NvbXBvbmVudHMvdGl0bGUvVGl0bGVDb250cm9sbGVyJyk7XG52YXIgR3JpZEFjdGlvbnNWaWV3ID0gcmVxdWlyZSgnLi9jb21wb25lbnRzL2dyaWRBY3Rpb25zL0dyaWRBY3Rpb25zVmlldycpO1xudmFyIEdyaWRBY3Rpb25zQ29udHJvbGxlciA9IHJlcXVpcmUoJy4vY29tcG9uZW50cy9ncmlkQWN0aW9ucy9HcmlkQWN0aW9uc0NvbnRyb2xsZXInKTtcbnZhciBHTFUgPSByZXF1aXJlKCdnbHUuanMnKTtcblxudmFyIEFwcCA9IHtcbiAgaW5pdDogZnVuY3Rpb24gKCkge1xuICAgIC8vdmFyIGdyaWRWaWV3ID0gbmV3IEdyaWRWaWV3KGRvY3VtZW50LmJvZHksICcjZ3JpZCcpO1xuICAgIC8vbmV3IEdyaWRDb250cm9sbGVyKGdyaWRWaWV3KTtcblxuICAgIC8vdmFyIGFjdGlvblZpZXcgPSBuZXcgR3JpZEFjdGlvbnNWaWV3KGRvY3VtZW50LmJvZHksICcjYWN0aW9ucycpO1xuICAgIC8vbmV3IEdyaWRBY3Rpb25zQ29udHJvbGxlcihhY3Rpb25WaWV3KTtcblxuICAgIC8vZ3JpZFZpZXcucmVuZGVyKCk7XG4gICAgLy9hY3Rpb25WaWV3LnJlbmRlcigpO1xuXG4gICAgdGhpcy5yb3V0ZXIgPSBuZXcgR0xVLlJvdXRlcigpO1xuXG5cbiAgICAvLyBtZWhvIC0+IGhhbW8gLT4gdGVzdFxuICAgIC8vIG5peiA9IFttZWhvXVxuICAgIC8vIGFkZCBuaXogdG8gcm91dGVzXG4gICAgLy8gbml6ID0gW21laG8gLCBoYW1vXVxuICAgIC8vIGFkZCBuaXogdG8gcm91dGVzXG4gICAgLy8gbml6ID0gW21laG8sIGhhbW8sIHRlc3RdXG4gICAgLy8gYWRkIG5peiB0byByb3V0ZXNcbiAgICB0aGlzLnJvdXRlci5hZGRSb3V0ZSh7XG4gICAgICAgIHBhdGg6IFwiL2NhdGVnb3J5LzppZFwiLFxuICAgICAgICB2aWV3OiBHcmlkVmlldyxcbiAgICAgICAgdmlld1NlbGVjdG9yOiBcIiNncmlkXCIsXG4gICAgICAgIGNvbnRyb2xsZXI6IEdyaWRDb250cm9sbGVyLFxuICAgICAgICByb3V0ZTogW3tcbiAgICAgICAgICAgIHBhdGg6ICcvbmV3JyxcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6IEdyaWRBY3Rpb25zQ29udHJvbGxlcixcbiAgICAgICAgICAgIHZpZXdTZWxlY3RvcjogXCIjc3VidGVtcGxhdGVcIixcbiAgICAgICAgICAgIHZpZXc6IEdyaWRBY3Rpb25zVmlldyxcbiAgICAgICAgICAgIHJvdXRlOiB7XG4gICAgICAgICAgICAgIHBhdGg6ICcvbmVzdGVkJyxcbiAgICAgICAgICAgICAgY29udHJvbGxlcjogVGl0bGVDb250cm9sbGVyLFxuICAgICAgICAgICAgICB2aWV3U2VsZWN0b3I6IFwiI3RpdGxlVmlld1wiLFxuICAgICAgICAgICAgICB2aWV3OiBUaXRsZVZpZXdcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgcGF0aDogJy9oYW1vJyxcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6IEdyaWRBY3Rpb25zQ29udHJvbGxlcixcbiAgICAgICAgICAgIHZpZXdTZWxlY3RvcjogXCIjZ3JpZFwiLFxuICAgICAgICAgICAgdmlldzogR3JpZEFjdGlvbnNWaWV3XG4gICAgICAgIH1cbiAgICAgICAgXVxuICAgIH0pO1xuXG4gICAgdGhpcy5yb3V0ZXIuc3RhcnQoKTtcbiAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBBcHA7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBDZWxsVmlld1JlYWN0ID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICBvbkJsdXIoZSk6IGFueSB7XG4gICAgdGhpcy5wcm9wcy51cGRhdGVDZWxsKHRoaXMucHJvcHMucm93SW5kZXgsIHRoaXMucHJvcHMuY29sdW1uSW5kZXgsIGUudGFyZ2V0LnZhbHVlLCAnY2hhbmdlJyk7XG4gIH0sXG4gIG9uQ2hhbmdlKGUpOmFueSB7XG4gICAgdGhpcy5wcm9wcy51cGRhdGVDZWxsKHRoaXMucHJvcHMucm93SW5kZXgsIHRoaXMucHJvcHMuY29sdW1uSW5kZXgsIGUudGFyZ2V0LnZhbHVlKTtcbiAgfSxcbiAgb25Gb2N1cyhlKTphbnkge1xuICAgIHRoaXMucHJvcHMudXBkYXRlQ2VsbCh0aGlzLnByb3BzLnJvd0luZGV4LCB0aGlzLnByb3BzLmNvbHVtbkluZGV4LCBlLnRhcmdldC52YWx1ZSwgJ2ZvY3VzJyk7XG4gIH0sXG4gIHJlbmRlcigpOiBhbnkge1xuICAgIHZhciB1cCA9IHRoaXMucHJvcHMudXNlcnNQb3NpdGlvbjtcbiAgICB2YXIgYWN0aXZlVXNlcnNIZXJlID0gT2JqZWN0XG4gICAgICAua2V5cyh1cClcbiAgICAgIC5maWx0ZXIodXNlcklkID0+IHVwW3VzZXJJZF0ucm93SW5kZXggPT09IHRoaXMucHJvcHMucm93SW5kZXggJiYgdXBbdXNlcklkXS5jb2x1bW5JbmRleCA9PT0gdGhpcy5wcm9wcy5jb2x1bW5JbmRleClcbiAgICAgIC5tYXAodXNlcklkID0+IDxkaXYgY2xhc3NOYW1lPXsndXNlci0nICsgdXNlcklkfT48L2Rpdj4pXG4gICAgcmV0dXJuIDx0ZD5cbiAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiXG4gICAgICAgIHZhbHVlPXt0aGlzLnByb3BzLnZhbHVlfVxuICAgICAgICByZWY9XCJ2YWx1ZVwiXG4gICAgICAgIG9uQ2hhbmdlPXt0aGlzLm9uQ2hhbmdlfVxuICAgICAgICBvbkZvY3VzPXt0aGlzLm9uRm9jdXN9XG4gICAgICAgIG9uQmx1cj17dGhpcy5vbkJsdXJ9Lz5cbiAgICAgIHthY3RpdmVVc2Vyc0hlcmV9XG4gICAgPC90ZD47XG4gIH1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IENlbGxWaWV3UmVhY3Q7IiwiJ3VzZSBzdHJpY3QnO1xudmFyIFRhYmxlQWN0aW9ucyA9IHJlcXVpcmUoJy4uLy4uL2FjdGlvbnMvVGFibGVBY3Rpb25zLmpzJyk7XG52YXIgVGFibGVBY3Rpb25DcmVhdG9yID0gcmVxdWlyZSgnLi4vLi4vYWN0aW9ucy9UYWJsZUFjdGlvbkNyZWF0b3IuanMnKTtcbnZhciBUYWJsZVN0b3JlID0gcmVxdWlyZSgnLi4vLi4vc3RvcmVzL1RhYmxlU3RvcmUuanMnKTtcbnZhciBHTFUgPSByZXF1aXJlKCdnbHUuanMnKTtcblxuY2xhc3MgR3JpZENvbnRyb2xsZXIgZXh0ZW5kcyBHTFUuVmlld0NvbnRyb2xsZXIge1xuICBjb25zdHJ1Y3Rvcih2aWV3LCBwYXJhbXMpIHtcbiAgICBzdXBlcih2aWV3KTtcblxuICAgIHRoaXMucGFyYW1zID0gcGFyYW1zO1xuICAgIGNvbnNvbGUubG9nKFwicGFyYW1zIGFyZVwiLCB0aGlzLnBhcmFtcyk7XG4gICAgVGFibGVTdG9yZS5vbkNoYW5nZSh0aGlzLm9uU3RvcmVDaGFuZ2UsIHRoaXMpO1xuXG4gICAgdGhpcy52aWV3Lm9uKFRhYmxlQWN0aW9ucy5VUERBVEVfQ0VMTCwgdGhpcy5vbkNlbGxVcGRhdGUpO1xuICAgIHRoaXMudmlldy5vbihUYWJsZUFjdGlvbnMuVVNFUl9DSEFOR0VfUE9TSVRJT04sIHRoaXMudXNlckNoYW5nZVBvc2l0aW9uKTtcbiAgICB0aGlzLnZpZXcuaWQgPSB0aGlzLnBhcmFtcy5pZDtcbiAgICB0aGlzLnZpZXcudXBkYXRlU3RhdGUoVGFibGVTdG9yZS5kYXRhLCBUYWJsZVN0b3JlLnVzZXJzUG9zaXRpb24pO1xuICB9XG5cbiAgb25TdG9yZUNoYW5nZSgpIHtcbiAgICB0aGlzLnZpZXcudXBkYXRlU3RhdGUoVGFibGVTdG9yZS5kYXRhLCBUYWJsZVN0b3JlLnVzZXJzUG9zaXRpb24pO1xuICB9XG5cbiAgb25DZWxsVXBkYXRlKHBheWxvYWQpIHtcbiAgICBUYWJsZUFjdGlvbkNyZWF0b3IudXBkYXRlQ2VsbChwYXlsb2FkKTtcbiAgfVxuXG4gIHVzZXJDaGFuZ2VQb3NpdGlvbihwYXlsb2FkKSB7XG4gICAgVGFibGVBY3Rpb25DcmVhdG9yLnVzZXJDaGFuZ2VQb3NpdGlvbihwYXlsb2FkKTtcbiAgfVxuXG4gIGRlc3Ryb3koKSB7XG4gICAgICBjb25zb2xlLmxvZyhgZGVzdHJveWluZyAke3RoaXMuY29uc3RydWN0b3IubmFtZX1gKTtcbiAgICAgIHRoaXMudmlldy5vZmYoVGFibGVBY3Rpb25zLlVQREFURV9DRUxMLCB0aGlzLm9uQ2VsbFVwZGF0ZSk7XG4gICAgICB0aGlzLnZpZXcub2ZmKFRhYmxlQWN0aW9ucy5VU0VSX0NIQU5HRV9QT1NJVElPTiwgdGhpcy51c2VyQ2hhbmdlUG9zaXRpb24pO1xuICAgICAgVGFibGVTdG9yZS5vZmZDaGFuZ2UodGhpcy5vblN0b3JlQ2hhbmdlLCB0aGlzKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEdyaWRDb250cm9sbGVyO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgZGF0YSwgdXNlcnNQb3NpdGlvbiwgdmlldztcbnZhciBHcmlkVmlld1JlYWN0ID0gcmVxdWlyZSgnLi9HcmlkVmlld1JlYWN0LmpzJyk7XG52YXIgR0xVID0gcmVxdWlyZSgnZ2x1LmpzJyk7XG5cbmNsYXNzIEdyaWRWaWV3IGV4dGVuZHMgR0xVLlZpZXcge1xuICBjb25zdHJ1Y3Rvcihyb290LCBzZWxlY3Rvcikge1xuICAgIHN1cGVyKHJvb3QsIHNlbGVjdG9yKTtcblxuICAgIGRhdGEgPSBbXTtcbiAgICB1c2Vyc1Bvc2l0aW9uID0ge307XG4gICAgdmlldyA9IHRoaXM7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgLy90aGlzLnJvdXRlSGFuZGxlci52aWV3O1xuICAgIC8vdmFyIHRlbXBsYXRlID0gXCI8ZGl2PiBzb21lIHRla3N0IHt7bmVzdGVkVmlld319PGRpdj5cIjtcblxuICAgIC8vdGhpcy5lbC5pbm5lckhUTUwgPSBNdXN0YWNoZS5yZW5kZXIodGVtcGxhdGUsIHRoaXMucm91dGVIYW5kbGVyLnZpZXcpO1xuICAgLyogY29uc29sZS5sb2coXCJHcmlkdmlldyByZW5kZXIhISEhXCIpOyovXG4gICAgLy92YXIgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAvL2Rpdi5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBcInN1YnRlbXBsYXRlXCIpO1xuXG4gICAgLy92YXIgcmVhY3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuXG4gICAgLy90aGlzLmVsLmlubmVySFRNTCA9IFwiXCI7XG4gICAgLy90aGlzLmVsLmFwcGVuZENoaWxkKGRpdik7XG4gICAgLy90aGlzLmVsLmFwcGVuZENoaWxkKHJlYWN0KTtcblxuXG4gICAgICB2YXIgY29tcG9uZW50ID0gUmVhY3QucmVuZGVyKDxHcmlkVmlld1JlYWN0XG4gICAgICAgICAgICAgIGRhdGE9e2RhdGF9XG4gICAgICAgICAgICAgIHVzZXJzUG9zaXRpb249e3VzZXJzUG9zaXRpb259XG4gICAgICAgICAgICAgIHZpZXc9e3ZpZXd9XG4gICAgICAgICAgICAgIGlkPXt0aGlzLmlkfS8+LFxuICAgICAgICAgICAgICB0aGlzLmVsKTtcbiAgfVxuXG5cbiAgZGVzdHJveSgpIHtcbiAgICBSZWFjdC51bm1vdW50Q29tcG9uZW50QXROb2RlKHRoaXMuZWwpO1xuICB9XG5cbiAgdXBkYXRlU3RhdGUoZCwgdXApIHtcbiAgICAgIGNvbnNvbGUubG9nKCd2aWV3IHVwZGF0aW5nIHN0YXRlJyk7XG4gICAgZGF0YSA9IGQ7XG4gICAgdXNlcnNQb3NpdGlvbiA9IHVwXG4gICAgdGhpcy5yZW5kZXIoKTtcbiAgfVxuXG4gIGdldCBkYXRhKCkge1xuICAgIHJldHVybiBkYXRhO1xuICB9XG5cbiAgc2V0IGRhdGEoZCkge1xuICAgIGRhdGEgPSBkO1xuICAgIHRoaXMucmVuZGVyKCk7XG4gIH1cblxuICBzZXQgaWQodmFsKSB7XG4gICAgdGhpcy5faWQgPSB2YWw7XG4gICAgdGhpcy5yZW5kZXIoKTtcbiAgfVxuXG4gIGdldCBpZCgpIHtcbiAgICByZXR1cm4gdGhpcy5faWQ7XG4gIH1cblxuICBnZXQgdXNlcnNQb3NpdGlvbigpIHtcbiAgICByZXR1cm4gdXNlcnNQb3NpdGlvbjtcbiAgfVxuXG4gIHNldCB1c2Vyc1Bvc2l0aW9uKHVwKSB7XG4gICAgdXNlcnNQb3NpdGlvbiA9IHVwO1xuICAgIHRoaXMucmVuZGVyKCk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBHcmlkVmlldztcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIFJvd1ZpZXdSZWFjdCA9IHJlcXVpcmUoJy4vUm93Vmlld1JlYWN0LmpzJyk7XG52YXIgVGFibGVBY3Rpb25zID0gcmVxdWlyZSgnLi4vLi4vYWN0aW9ucy9UYWJsZUFjdGlvbnMuanMnKTtcbnZhciBUaXRsZVZpZXcgPSByZXF1aXJlKCcuLi90aXRsZS9UaXRsZVZpZXcnKTtcblxudmFyIEdyaWRWaWV3UmVhY3QgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gIGdldEluaXRpYWxTdGF0ZSgpOiBhbnkge1xuICAgIHJldHVybiB7ZGF0YTogdGhpcy5wcm9wcy5kYXRhfTtcbiAgfSxcbiAgdXBkYXRlQ2VsbChyb3dJbmRleCwgY29sdW1uSW5kZXgsIHZhbHVlLCBhY3Rpb24pOiBhbnkge1xuICAgIGlmICh0aGlzLnRpdGxlVmlldykge1xuICAgICAgdGhpcy50aXRsZVZpZXcuc2V0UGFyYW0ocGFyc2VJbnQoTWF0aC5yYW5kb20oKSAqIDEwMCkpO1xuICAgIH1cblxuICAgIGlmIChhY3Rpb24gPT09ICdmb2N1cycpIHtcbiAgICAgIHRoaXMucHJvcHMudmlldy5lbWl0KFRhYmxlQWN0aW9ucy5VU0VSX0NIQU5HRV9QT1NJVElPTiwge1xuICAgICAgICByb3dJbmRleDogcm93SW5kZXgsXG4gICAgICAgIGNvbHVtbkluZGV4OiBjb2x1bW5JbmRleFxuICAgICAgfSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMucHJvcHMuZGF0YVtyb3dJbmRleF1bY29sdW1uSW5kZXhdID0gdmFsdWU7XG4gICAgdGhpcy5zZXRTdGF0ZSh7ZGF0YTogdGhpcy5wcm9wcy5kYXRhfSk7XG4gICAgaWYgKGFjdGlvbikge1xuICAgICAgdGhpcy5wcm9wcy52aWV3LmVtaXQoVGFibGVBY3Rpb25zLlVQREFURV9DRUxMLCB7XG4gICAgICAgIHJvd0luZGV4OiByb3dJbmRleCxcbiAgICAgICAgY29sdW1uSW5kZXg6IGNvbHVtbkluZGV4LFxuICAgICAgICB2YWx1ZTogdmFsdWVcbiAgICAgIH0pO1xuICAgIH1cbiAgfSxcbiAgY29tcG9uZW50RGlkTW91bnQ6IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMudGl0bGVWaWV3ID0gbmV3IFRpdGxlVmlldyh0aGlzLmdldERPTU5vZGUoKSwgXCIjdGl0bGVWaWV3SW5SZWFjdFwiKTtcbiAgfSxcbiAgICBvbkhhbW9DbGljazogZnVuY3Rpb24oZSkge1xuICAgICAgICBBUFAucm91dGVyLm5hdmlnYXRlVG8oJy9jYXRlZ29yeS9uZXcnKTtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH0sXG4gICAgICByZW5kZXIoKTogYW55IHtcbiAgICAgICAgICB2YXIgaGVhZGVycyA9IFtdO1xuICAgIHZhciByb3dzID0gW107XG5cbiAgICBpZih0aGlzLnRpdGxlVmlldykge1xuICAgICAgdGhpcy50aXRsZVZpZXcucmVuZGVyKCk7XG4gICAgfVxuICAgIGlmICh0aGlzLnByb3BzLmRhdGEgJiYgdGhpcy5wcm9wcy5kYXRhWzBdKSB7XG4gICAgICBoZWFkZXJzID0gdGhpcy5wcm9wcy5kYXRhWzBdLm1hcCgobmFtZSwgaW5kZXgpID0+IDx0aD5Db2wge2luZGV4ICsgMX08L3RoPik7XG4gICAgICByb3dzID0gdGhpcy5wcm9wcy5kYXRhLm1hcCgocm93LCBpbmRleCkgPT4gPFJvd1ZpZXdSZWFjdFxuICAgICAgICByb3c9e3Jvd31cbiAgICAgICAga2V5PXtpbmRleH1cbiAgICAgICAgcm93SW5kZXg9e2luZGV4fVxuICAgICAgICB1c2Vyc1Bvc2l0aW9uPXt0aGlzLnByb3BzLnVzZXJzUG9zaXRpb259XG4gICAgICAgIHVwZGF0ZUNlbGw9e3RoaXMudXBkYXRlQ2VsbH0vPik7XG4gICAgfVxuICAgIHJldHVybiAoXG4gICAgICAgIDxkaXY+XG4gICAgICAgIElEIElTIDoge3RoaXMucHJvcHMuaWR9XG4gICAgICAgIHsobmV3IERhdGUoKSkudG9TdHJpbmcoKX1cbiAgICAgICAgQmVsb3cgaXMgYSB0aXRsZSB2aWV3IDpcbiAgICAgICAgPGRpdiBpZD1cInRpdGxlVmlld0luUmVhY3RcIj48L2Rpdj5cbiAgICAgICAgPHRhYmxlPlxuICAgICAgPHRoZWFkPlxuICAgICAgICA8dHI+e2hlYWRlcnN9PC90cj5cbiAgICAgIDwvdGhlYWQ+XG4gICAgICA8dGJvZHk+XG4gICAgICAgIHtyb3dzfVxuICAgICAgPC90Ym9keT5cbiAgICA8L3RhYmxlPlxuICAgIDxhIGhyZWY9XCIvbXVqb1wiIG9uQ2xpY2s9e3RoaXMub25IYW1vQ2xpY2t9Pk5ldyB2aWV3KG5hdmlnYXRlKTwvYT5cbiAgICA8ZGl2IGlkPVwic3VidGVtcGxhdGVcIj48L2Rpdj5cbiAgICA8L2Rpdj4pO1xuICB9XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBHcmlkVmlld1JlYWN0O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIENlbGxWaWV3UmVhY3QgPSByZXF1aXJlKCcuL0NlbGxWaWV3UmVhY3QuanMnKTtcblxudmFyIFJvd1ZpZXdSZWFjdCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgcmVuZGVyKCk6IGFueSB7XG4gICAgdmFyIGNlbGxzID0gW107XG4gICAgaWYgKHRoaXMucHJvcHMucm93Lmxlbmd0aCkge1xuICAgICAgY2VsbHMgPSB0aGlzLnByb3BzLnJvdy5tYXAoKGNlbGwsIGluZGV4KSA9PiA8Q2VsbFZpZXdSZWFjdFxuICAgICAgICB2YWx1ZT17Y2VsbH1cbiAgICAgICAga2V5PXtpbmRleH1cbiAgICAgICAgY29sdW1uSW5kZXg9e2luZGV4fVxuICAgICAgICByb3dJbmRleD17dGhpcy5wcm9wcy5yb3dJbmRleH1cbiAgICAgICAgdXNlcnNQb3NpdGlvbj17dGhpcy5wcm9wcy51c2Vyc1Bvc2l0aW9ufVxuICAgICAgICB1cGRhdGVDZWxsPXt0aGlzLnByb3BzLnVwZGF0ZUNlbGx9Lz4pO1xuICAgIH1cbiAgICByZXR1cm4gPHRyPntjZWxsc308L3RyPjtcbiAgfVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gUm93Vmlld1JlYWN0OyIsIid1c2Ugc3RyaWN0JztcbnZhciBUYWJsZUFjdGlvbnMgPSByZXF1aXJlKCcuLi8uLi9hY3Rpb25zL1RhYmxlQWN0aW9ucy5qcycpO1xudmFyIFRhYmxlQWN0aW9uQ3JlYXRvciA9IHJlcXVpcmUoJy4uLy4uL2FjdGlvbnMvVGFibGVBY3Rpb25DcmVhdG9yLmpzJyk7XG5cbnZhciBHTFUgPSByZXF1aXJlKCdnbHUuanMnKTtcbmNsYXNzIEdyaWRBY3Rpb25zQ29udHJvbGxlciBleHRlbmRzIEdMVS5WaWV3Q29udHJvbGxlciB7XG4gIGNvbnN0cnVjdG9yKHZpZXcpIHtcbiAgICBzdXBlcih2aWV3KTtcblxuICAgIHRoaXMudmlldy5vbihUYWJsZUFjdGlvbnMuQUREX1JPVywgdGhpcy5hZGRSb3cpO1xuICAgIHRoaXMudmlldy5vbihUYWJsZUFjdGlvbnMuREVMRVRFX1JPVywgdGhpcy5kZWxldGVSb3cpO1xuICB9XG5cbiAgYWRkUm93KHBheWxvYWQpIHtcbiAgICBUYWJsZUFjdGlvbkNyZWF0b3IuYWRkUm93KHBheWxvYWQpO1xuICB9XG5cbiAgZGVsZXRlUm93KHBheWxvYWQpIHtcbiAgICBUYWJsZUFjdGlvbkNyZWF0b3IuZGVsZXRlUm93KHBheWxvYWQpO1xuICB9XG5cbiAgZGVzdHJveSgpIHtcbiAgICBjb25zb2xlLmxvZyhcImRlc3Ryb3lpbmcgR3JpZEFjdGlvbnNDb250cm9sbGVyXCIpO1xuICAgIHRoaXMudmlldy5kZXN0cm95KCk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBHcmlkQWN0aW9uc0NvbnRyb2xsZXI7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB2aWV3O1xudmFyIEdyaWRBY3Rpb25zVmlld1JlYWN0ID0gcmVxdWlyZSgnLi9HcmlkQWN0aW9uc1ZpZXdSZWFjdC5qcycpO1xudmFyIEdMVSA9IHJlcXVpcmUoJ2dsdS5qcycpO1xuXG5jbGFzcyBHcmlkQWN0aW9uc1ZpZXcgZXh0ZW5kcyBHTFUuVmlldyB7XG4gIGNvbnN0cnVjdG9yKHJvb3QsIHNlbGVjdG9yKSB7XG4gICAgc3VwZXIocm9vdCwgc2VsZWN0b3IpO1xuICAgIHZpZXcgPSB0aGlzO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIFJlYWN0LnJlbmRlcig8R3JpZEFjdGlvbnNWaWV3UmVhY3Qgdmlldz17dmlld30gLz4sXG4gICAgICB0aGlzLmVsKTtcbiAgfVxuXG4gIGRlc3Ryb3koKSB7XG4gICAgUmVhY3QudW5tb3VudENvbXBvbmVudEF0Tm9kZSh0aGlzLmVsKTtcbiAgICAvLyB0aGlzLmVsLmlubmVySFRNTCA9IFwiXCI7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBHcmlkQWN0aW9uc1ZpZXc7XG4iLCIndXNlIHN0cmljdCc7XG52YXIgVGFibGVBY3Rpb25zID0gcmVxdWlyZSgnLi4vLi4vYWN0aW9ucy9UYWJsZUFjdGlvbnMuanMnKTtcblxudmFyIEdyaWRWaWV3UmVhY3QgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gIGFkZFJvdygpOiBhbnkge1xuICAgIHRoaXMucHJvcHMudmlldy5lbWl0KFRhYmxlQWN0aW9ucy5BRERfUk9XLCB7XG4gICAgICByb3dJbmRleDogK1JlYWN0LmZpbmRET01Ob2RlKHRoaXMucmVmcy5yb3dQb3NpdGlvbikudmFsdWUudHJpbSgpXG4gICAgfSk7XG4gIH0sXG4gIGRlbGV0ZVJvdygpOiBhbnkge1xuICAgIHRoaXMucHJvcHMudmlldy5lbWl0KFRhYmxlQWN0aW9ucy5ERUxFVEVfUk9XLCB7XG4gICAgICByb3dJbmRleDogK1JlYWN0LmZpbmRET01Ob2RlKHRoaXMucmVmcy5yb3dQb3NpdGlvbikudmFsdWUudHJpbSgpXG4gICAgfSk7XG4gIH0sXG4gIHJlbmRlcigpOiBhbnkge1xuICAgIHJldHVybiA8ZGl2PlxuICAgICAgPGJ1dHRvbiBvbkNsaWNrPXt0aGlzLmFkZFJvd30+QWRkIG5ldyByb3c8L2J1dHRvbj5cbiAgICAgIDxidXR0b24gb25DbGljaz17dGhpcy5kZWxldGVSb3d9PlJlbW92ZSByb3c8L2J1dHRvbj5cbiAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIGRlZmF1bHRWYWx1ZT1cIjFcIiByZWY9XCJyb3dQb3NpdGlvblwiIC8+XG4gICAgICA8ZGl2IGlkPVwidGl0bGVWaWV3XCI+PC9kaXY+XG4gICAgPC9kaXY+O1xuICB9XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBHcmlkVmlld1JlYWN0O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIEdMVSA9IHJlcXVpcmUoJ2dsdS5qcycpO1xuXG5jbGFzcyBUaXRsZUNvbnRyb2xsZXIgZXh0ZW5kcyBHTFUuVmlld0NvbnRyb2xsZXIge1xuICBjb25zdHJ1Y3Rvcih2aWV3KSB7XG4gICAgc3VwZXIodmlldyk7XG4gIH1cblxuICBkZXN0cm95KCkge1xuICAgICAgY29uc29sZS5sb2coYGRlc3Ryb3lpbmcgJHt0aGlzLmNvbnN0cnVjdG9yLm5hbWV9YCk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBUaXRsZUNvbnRyb2xsZXI7XG4iLCIndXNlIHN0cmljdCc7XG52YXIgR0xVID0gcmVxdWlyZSgnZ2x1LmpzJyk7XG5cbmNsYXNzIFRpdGxlVmlldyBleHRlbmRzIEdMVS5WaWV3IHtcbiAgY29uc3RydWN0b3Iocm9vdCwgc2VsZWN0b3IpIHtcbiAgICBzdXBlcihyb290LCBzZWxlY3Rvcik7XG4gIH1cblxuICByZW5kZXIoZm9yY2UpIHtcbiAgICAvL3RoaXMucm91dGVIYW5kbGVyLnZpZXc7XG4gICAgLy92YXIgdGVtcGxhdGUgPSBcIjxkaXY+IHNvbWUgdGVrc3Qge3tuZXN0ZWRWaWV3fX08ZGl2PlwiO1xuXG4gICAgLy90aGlzLmVsLmlubmVySFRNTCA9IE11c3RhY2hlLnJlbmRlcih0ZW1wbGF0ZSwgdGhpcy5yb3V0ZUhhbmRsZXIudmlldyk7XG4gICAvKiBjb25zb2xlLmxvZyhcIkdyaWR2aWV3IHJlbmRlciEhISFcIik7Ki9cbiAgICAvL3ZhciBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIC8vZGl2LnNldEF0dHJpYnV0ZShcImlkXCIsIFwic3VidGVtcGxhdGVcIik7XG5cbiAgICAvL3ZhciByZWFjdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG5cbiAgICAvL3RoaXMuZWwuaW5uZXJIVE1MID0gXCJcIjtcbiAgICAvL3RoaXMuZWwuYXBwZW5kQ2hpbGQoZGl2KTtcbiAgICAvL3RoaXMuZWwuYXBwZW5kQ2hpbGQocmVhY3QpO1xuXG4gICAgICAvL1JlYWN0LnVubW91bnRDb21wb25lbnRBdE5vZGUodGhpcy5lbCk7XG4gICAgdmFyIGRhdGUgPSBuZXcgRGF0ZSgpO1xuICAgIHRoaXMuZWwuaW5uZXJIVE1MID0gYDxkaXY+IEkgQW0gYSBUSVRMRSB2aWV3IFBBUkFNIElTIDogJHt0aGlzLl92YWx9PC9kaXY+YDtcbiAgfVxuXG4gIHNldFBhcmFtKHZhbCkge1xuICAgIHRoaXMuX3ZhbCA9IHZhbDtcbiAgfVxuXG4gIGdldFBhcmFtKCkge1xuICAgIHJldHVybiB0aGlzLl92YWw7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBUaXRsZVZpZXc7XG4iLCIvKmpzaGludCBkZXZlbDp0cnVlKi9cbi8qZ2xvYmFsIE9UOnRydWUqL1xuJ3VzZSBzdHJpY3QnO1xudmFyIE9UID0gKGZ1bmN0aW9uICgpIHtcbiAgdmFyIHByaW9yaXR5LCBkYXRhO1xuICB2YXIgc3RhdGVzID0gW107XG4gIHZhciBsb2cgPSBbXTtcbiAgdmFyIGV4ZWN1dGVBY3Rpb25zID0ge307XG4gIHZhciB0cmFuc2Zvcm1hdGlvbk1hdHJpeCA9IHt9O1xuICB2YXIgb3B0aW9ucztcbiAgdmFyIG9uTW9kZWxDaGFuZ2VFdmVudHMgPSB7fTtcbiAgdmFyIHVzZXJzUG9zaXRpb24gPSB7fTtcblxuICB2YXIgT1QgPSBmdW5jdGlvbiAobykge1xuICAgIG9wdGlvbnMgPSBvIHx8IHt9O1xuICB9O1xuXG4gIE9ULnByb3RvdHlwZS5zZXREYXRhID0gZnVuY3Rpb24gKGQpIHtcbiAgICBkYXRhID0gZDtcbiAgfTtcblxuICBPVC5wcm90b3R5cGUuZ2V0RGF0YSA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gZGF0YTtcbiAgfTtcblxuICBPVC5wcm90b3R5cGUuc2V0U3RhdGVzID0gZnVuY3Rpb24gKHMpIHtcbiAgICBzdGF0ZXMgPSBzO1xuICB9O1xuXG4gIE9ULnByb3RvdHlwZS5nZXRQcmlvcml0eSA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gcHJpb3JpdHk7XG4gIH07XG5cblxuICBPVC5wcm90b3R5cGUuZ2V0VXNlcnNQb3N0aW9uID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB1c2Vyc1Bvc2l0aW9uO1xuICB9O1xuXG4gIE9ULnByb3RvdHlwZS5zZXRFeGVjdXRlQWN0aW9ucyA9IGZ1bmN0aW9uIChhY3Rpb25zKSB7XG4gICAgZXhlY3V0ZUFjdGlvbnMgPSBhY3Rpb25zO1xuICB9O1xuXG4gIE9ULnByb3RvdHlwZS5zZXRUcmFuc2Zvcm1hdGlvbk1hdHJpeCA9IGZ1bmN0aW9uIChtYXRyaXgpIHtcbiAgICB0cmFuc2Zvcm1hdGlvbk1hdHJpeCA9IG1hdHJpeDtcbiAgfTtcblxuICBPVC5wcm90b3R5cGUuY3JlYXRlTWVzc2FnZSA9IGZ1bmN0aW9uIChhY3Rpb24sIHZhbHVlKSB7XG4gICAgdmFyIGpzb24gPSB7XG4gICAgICBhY3Rpb246IGFjdGlvbixcbiAgICAgIHN0YXRlczogc3RhdGVzLFxuICAgICAgcHJpb3JpdHk6IHByaW9yaXR5LFxuICAgICAgdmFsdWU6IHZhbHVlXG4gICAgfTtcbiAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkoanNvbik7XG4gIH07XG5cbiAgT1QucHJvdG90eXBlLm9uTW9kZWxDaGFuZ2UgPSBmdW5jdGlvbiAoYWN0aW9uLCBjYWxsYmFjaykge1xuICAgIGlmICh0eXBlb2YgY2FsbGJhY2sgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHRocm93ICdDYWxsYmFjayBoYXMgdG8gYmUgYSBmdW5jdGlvbic7XG4gICAgfVxuICAgIGlmICghb25Nb2RlbENoYW5nZUV2ZW50c1thY3Rpb25dKSB7XG4gICAgICBvbk1vZGVsQ2hhbmdlRXZlbnRzW2FjdGlvbl0gPSBbXTtcbiAgICB9XG4gICAgb25Nb2RlbENoYW5nZUV2ZW50c1thY3Rpb25dLnB1c2goY2FsbGJhY2spO1xuICB9O1xuXG4gIHZhciBleGVjdXRlID0gZnVuY3Rpb24gKHJlcXVlc3QpIHtcbiAgICB2YXIgYWN0aW9uID0gZXhlY3V0ZUFjdGlvbnNbcmVxdWVzdC5hY3Rpb25dO1xuICAgIGlmIChhY3Rpb24pIHtcbiAgICAgIGFjdGlvbihyZXF1ZXN0KTtcbiAgICB9XG4gICAgdmFyIG9uTW9kZWxDaGFuZ2VDYWxsYmFjayA9IG9uTW9kZWxDaGFuZ2VFdmVudHNbcmVxdWVzdC5hY3Rpb25dO1xuICAgIGlmIChvbk1vZGVsQ2hhbmdlQ2FsbGJhY2spIHtcbiAgICAgIG9uTW9kZWxDaGFuZ2VDYWxsYmFjay5mb3JFYWNoKGZ1bmN0aW9uIChjYWxsYmFjaykge1xuICAgICAgICBjYWxsYmFjayhyZXF1ZXN0KTtcbiAgICAgIH0pO1xuICAgIH1cbiAgICBzdGF0ZXNbcmVxdWVzdC5wcmlvcml0eV0gKz0gMTtcbiAgICBsb2cucHVzaChyZXF1ZXN0KTtcbiAgfTtcblxuICBPVC5wcm90b3R5cGUuZXhlY3V0ZSA9IGV4ZWN1dGU7XG5cblxuICBPVC5wcm90b3R5cGUubWFya0FzTm9PcCA9IGZ1bmN0aW9uIChyZXF1ZXN0KSB7XG4gICAgcmVxdWVzdC5vcmlnaW5hbEFjdGlvbiA9IHJlcXVlc3QuYWN0aW9uO1xuICAgIHJlcXVlc3QuYWN0aW9uID0gJ25vLW9wJztcbiAgICByZXR1cm4gcmVxdWVzdDtcbiAgfTtcblxuICB2YXIgY29tcGFyZVN0YXRlID0gZnVuY3Rpb24gKHJlcXVlc3RTdGF0ZSwgY3VycmVudFN0YXRlKSB7XG4gICAgdmFyIHNob3VsZFRyYW5zZm9ybSA9IGZhbHNlO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY3VycmVudFN0YXRlLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICBpZiAoY3VycmVudFN0YXRlW2ldID09PSByZXF1ZXN0U3RhdGVbaV0pIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICBpZiAoY3VycmVudFN0YXRlW2ldID4gcmVxdWVzdFN0YXRlW2ldKSB7XG4gICAgICAgIHNob3VsZFRyYW5zZm9ybSA9IHRydWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gMTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIChzaG91bGRUcmFuc2Zvcm0pID8gLTEgOiAwO1xuICB9O1xuXG4gIHZhciB0cmFuc2Zvcm0gPSBmdW5jdGlvbiAobmV3UmVxdWVzdCwgb2xkUmVxdWVzdCkge1xuICAgIGlmIChuZXdSZXF1ZXN0ICYmIHRyYW5zZm9ybWF0aW9uTWF0cml4W25ld1JlcXVlc3QuYWN0aW9uXSAmJiB0cmFuc2Zvcm1hdGlvbk1hdHJpeFtuZXdSZXF1ZXN0LmFjdGlvbl1bb2xkUmVxdWVzdC5hY3Rpb25dKSB7XG4gICAgICByZXR1cm4gdHJhbnNmb3JtYXRpb25NYXRyaXhbbmV3UmVxdWVzdC5hY3Rpb25dW29sZFJlcXVlc3QuYWN0aW9uXShuZXdSZXF1ZXN0LCBvbGRSZXF1ZXN0KTtcbiAgICB9XG4gICAgcmV0dXJuIG5ld1JlcXVlc3Q7XG4gIH07XG5cbiAgT1QucHJvdG90eXBlLnByb2Nlc3NSZXF1ZXN0ID0gZnVuY3Rpb24gKHIpIHtcbiAgICB2YXIgcmVxdWVzdCA9IEpTT04ucGFyc2Uocik7XG4gICAgc3dpdGNoIChyZXF1ZXN0LmFjdGlvbikge1xuICAgIGNhc2UgJ2luaXQnOlxuICAgICAgZGF0YSA9IHJlcXVlc3QudmFsdWUuZGF0YTtcbiAgICAgIHByaW9yaXR5ID0gcmVxdWVzdC52YWx1ZS5wcmlvcml0eTtcbiAgICAgIHN0YXRlcyA9IHJlcXVlc3QudmFsdWUuc3RhdGVzO1xuICAgICAgaWYgKHR5cGVvZiBvcHRpb25zLm9uSW5pdCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBvcHRpb25zLm9uSW5pdChkYXRhKTtcbiAgICAgIH1cbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ25ldy11c2VyJzpcbiAgICAgIHN0YXRlc1tyZXF1ZXN0LnZhbHVlXSA9IDA7XG4gICAgICBpZiAodHlwZW9mIG9wdGlvbnMub25OZXdVc2VyID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIG9wdGlvbnMub25OZXdVc2VyKHJlcXVlc3QpO1xuICAgICAgfVxuICAgICAgYnJlYWs7XG4gICAgY2FzZSAndXNlci1jaGFuZ2UtcG9zaXRpb24nOlxuICAgICAgdXNlcnNQb3NpdGlvbltyZXF1ZXN0LnByaW9yaXR5XSA9IHJlcXVlc3QudmFsdWU7XG4gICAgICBpZiAodHlwZW9mIG9wdGlvbnMub25Vc2VyUG9zaXRpb25DaGFuZ2UgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgb3B0aW9ucy5vblVzZXJQb3NpdGlvbkNoYW5nZShyZXF1ZXN0KTtcbiAgICAgIH1cbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ25vLW9wJzpcbiAgICAgIGV4ZWN1dGUocmVxdWVzdCk7XG4gICAgICBicmVhaztcbiAgICBkZWZhdWx0OlxuICAgICAgaWYgKHByaW9yaXR5ICE9PSByZXF1ZXN0LnByaW9yaXR5KSB7XG4gICAgICAgIHN3aXRjaCAoY29tcGFyZVN0YXRlKHJlcXVlc3Quc3RhdGVzLCBzdGF0ZXMpKSB7XG4gICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAvLyB3ZSBjYW4gZXhlY3V0ZSB0aGlzIGFjdGlvbiByaWdodCBhd2F5XG4gICAgICAgICAgZXhlY3V0ZShyZXF1ZXN0KTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAxOlxuICAgICAgICAgIC8vIHRoaXMgYWN0aW9uIGhhcyB0byBiZSBwdXQgaW50byBxdWUsIGFuZCB3YWl0IGZvciBvdGhlciBhY3Rpb25zXG4gICAgICAgICAgLy8gYnV0IHNpbmNlIHdlIHVzZSB3ZWIgc29ja2V0LCB0aGlzIHNob3VsZG4ndCBoYXBwZW4gYW55d2F5XG4gICAgICAgICAgLy8gcXVlLnB1c2gocmVxdWVzdCk7XG4gICAgICAgICAgLy8gVE9ETzogd2hlbiB0byBmaXJlIHF1ZT9cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAtMTpcbiAgICAgICAgICAvLyBjcmVhdGUgdHJhbnNmb3JtYXRpb24gZm9yIHRoaXMgYWN0aW9uXG4gICAgICAgICAgZm9yICh2YXIgaSA9IGxvZy5sZW5ndGggLSAxOyBpID49IDA7IGkgLT0gMSkge1xuICAgICAgICAgICAgLy8gZmluZCBhbGwgbG9ncyB0aGF0IGhhcHBlbmVkIGFmdGVyIHRoaXMgcmVxdWVzdCB3YXMgY3JhZXRlZFxuICAgICAgICAgICAgdmFyIGNvbXBhcmVTdGF0ZVN0YXR1cyA9IGNvbXBhcmVTdGF0ZShsb2dbaV0uc3RhdGVzLCByZXF1ZXN0LnN0YXRlcyk7XG4gICAgICAgICAgICBpZiAoY29tcGFyZVN0YXRlU3RhdHVzID09PSAtMSkge1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgdmFyIHRyYW5zZm9ybWVkUmVxdWVzdCA9IHJlcXVlc3Q7XG4gICAgICAgICAgZm9yICh2YXIgaiA9IGkgKyAxOyBqIDwgbG9nLmxlbmd0aDsgaiArPSAxKSB7XG4gICAgICAgICAgICB0cmFuc2Zvcm1lZFJlcXVlc3QgPSB0cmFuc2Zvcm0odHJhbnNmb3JtZWRSZXF1ZXN0LCBsb2dbal0pO1xuICAgICAgICAgIH1cbiAgICAgICAgICBleGVjdXRlKHRyYW5zZm9ybWVkUmVxdWVzdCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgY29uc29sZS5sb2cocmVxdWVzdC5hY3Rpb24sIGRhdGEsIHN0YXRlcywgbG9nKTtcbiAgfTtcblxuICByZXR1cm4gT1Q7XG59KCkpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IE9UOyIsIid1c2Ugc3RyaWN0JztcbnZhciB0YWJsZUNoYW5nZVJ1bGVzID0gKGZ1bmN0aW9uICgpIHtcbiAgdmFyIG90O1xuXG4gIHZhciBleGVjdXRlQWN0aW9ucyA9IHtcbiAgICB1cGRhdGVDZWxsOiBmdW5jdGlvbiAocmVxdWVzdCkge1xuICAgICAgdmFyIHZhbHVlID0gcmVxdWVzdC52YWx1ZTtcbiAgICAgIHZhciBkYXRhID0gb3QuZ2V0RGF0YSgpO1xuICAgICAgZGF0YVt2YWx1ZS5yb3dJbmRleF1bdmFsdWUuY29sdW1uSW5kZXhdID0gcmVxdWVzdC52YWx1ZS52YWx1ZTtcbiAgICB9LFxuICAgIGFkZFJvdzogZnVuY3Rpb24gKHJlcXVlc3QpIHtcbiAgICAgIHZhciB2YWx1ZSA9IHJlcXVlc3QudmFsdWU7XG4gICAgICB2YXIgZGF0YSA9IG90LmdldERhdGEoKTtcbiAgICAgIHZhciBzb21lUm93ID0gZGF0YVswXSB8fCBbXTtcbiAgICAgIHZhciByb3cgPSBzb21lUm93Lm1hcChmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiAnJztcbiAgICAgIH0pO1xuXG4gICAgICBkYXRhLnNwbGljZSh2YWx1ZS5yb3dJbmRleCwgMCwgcm93KTtcbiAgICB9LFxuICAgIGRlbGV0ZVJvdzogZnVuY3Rpb24gKHJlcXVlc3QpIHtcbiAgICAgIHZhciB2YWx1ZSA9IHJlcXVlc3QudmFsdWU7XG4gICAgICB2YXIgZGF0YSA9IG90LmdldERhdGEoKTtcbiAgICAgIGRhdGEuc3BsaWNlKHZhbHVlLnJvd0luZGV4LCAxKTtcbiAgICB9XG4gIH07XG5cbiAgdmFyIHRyYW5zZm9ybWF0aW9uTWF0cml4ID0ge1xuICAgIHVwZGF0ZUNlbGw6IHtcbiAgICAgIHVwZGF0ZUNlbGw6IGZ1bmN0aW9uIChuZXdSZXF1ZXN0LCBvbGRSZXF1ZXN0KSB7XG4gICAgICAgIGlmIChuZXdSZXF1ZXN0LnZhbHVlLnJvd0luZGV4ICE9PSBvbGRSZXF1ZXN0LnZhbHVlLnJvd0luZGV4IHx8IG5ld1JlcXVlc3QudmFsdWUuY29sdW1uSW5kZXggIT09IG9sZFJlcXVlc3QudmFsdWUuY29sdW1uSW5kZXgpIHtcbiAgICAgICAgICByZXR1cm4gbmV3UmVxdWVzdDtcbiAgICAgICAgfVxuICAgICAgICBpZiAobmV3UmVxdWVzdC5wcmlvcml0eSA8IG9sZFJlcXVlc3QucHJpb3JpdHkpIHtcbiAgICAgICAgICByZXR1cm4gbmV3UmVxdWVzdDtcbiAgICAgICAgfVxuICAgICAgICB2YXIgdmFsdWUgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KG9sZFJlcXVlc3QudmFsdWUpKTtcbiAgICAgICAgbmV3UmVxdWVzdC52YWx1ZSA9IHZhbHVlO1xuICAgICAgICByZXR1cm4gbmV3UmVxdWVzdDtcbiAgICAgIH0sXG4gICAgICBhZGRSb3c6IGZ1bmN0aW9uIChuZXdSZXF1ZXN0LCBvbGRSZXF1ZXN0KSB7XG4gICAgICAgIGlmIChuZXdSZXF1ZXN0LnZhbHVlLnJvd0luZGV4IDwgb2xkUmVxdWVzdC52YWx1ZS5yb3dJbmRleCkge1xuICAgICAgICAgIHJldHVybiBuZXdSZXF1ZXN0O1xuICAgICAgICB9XG4gICAgICAgIG5ld1JlcXVlc3QudmFsdWUucm93SW5kZXggKz0gMTtcbiAgICAgICAgcmV0dXJuIG5ld1JlcXVlc3Q7XG4gICAgICB9LFxuICAgICAgZGVsZXRlUm93OiBmdW5jdGlvbiAobmV3UmVxdWVzdCwgb2xkUmVxdWVzdCkge1xuICAgICAgICBpZiAobmV3UmVxdWVzdC52YWx1ZS5yb3dJbmRleCA8IG9sZFJlcXVlc3QudmFsdWUucm93SW5kZXgpIHtcbiAgICAgICAgICByZXR1cm4gbmV3UmVxdWVzdDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoK25ld1JlcXVlc3QudmFsdWUucm93SW5kZXggPT09ICtvbGRSZXF1ZXN0LnZhbHVlLnJvd0luZGV4KSB7XG4gICAgICAgICAgcmV0dXJuIG90Lm1hcmtBc05vT3AobmV3UmVxdWVzdCk7XG4gICAgICAgIH1cbiAgICAgICAgbmV3UmVxdWVzdC52YWx1ZS5yb3dJbmRleCAtPSAxO1xuICAgICAgICByZXR1cm4gbmV3UmVxdWVzdDtcbiAgICAgIH1cbiAgICB9LFxuICAgIGFkZFJvdzoge1xuICAgICAgLy8gbm8gbmVlZCBmb3IgdHJhbnNmb3JtYXRpb25cbiAgICAgIC8vIHVwZGF0ZUNlbGw6IGZ1bmN0aW9uIChuZXdSZXF1ZXN0LCBvbGRSZXF1ZXN0KSB7fVxuICAgICAgYWRkUm93OiBmdW5jdGlvbiAobmV3UmVxdWVzdCwgb2xkUmVxdWVzdCkge1xuICAgICAgICBpZiAobmV3UmVxdWVzdC52YWx1ZS5yb3dJbmRleCAhPT0gb2xkUmVxdWVzdC52YWx1ZS5yb3dJbmRleCkge1xuICAgICAgICAgIHJldHVybiBuZXdSZXF1ZXN0O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBvdC5tYXJrQXNOb09wKG5ld1JlcXVlc3QpO1xuICAgICAgfSxcbiAgICAgIGRlbGV0ZVJvdzogZnVuY3Rpb24gKG5ld1JlcXVlc3QsIG9sZFJlcXVlc3QpIHtcbiAgICAgICAgaWYgKG5ld1JlcXVlc3QudmFsdWUucm93SW5kZXggPCBvbGRSZXF1ZXN0LnZhbHVlLnJvd0luZGV4KSB7XG4gICAgICAgICAgcmV0dXJuIG5ld1JlcXVlc3Q7XG4gICAgICAgIH1cbiAgICAgICAgbmV3UmVxdWVzdC52YWx1ZS5yb3dJbmRleCAtPSAxO1xuICAgICAgICByZXR1cm4gbmV3UmVxdWVzdDtcbiAgICAgIH1cbiAgICB9LFxuICAgIGRlbGV0ZVJvdzoge1xuICAgICAgLy8gbm8gbmVlZCBmb3IgdHJhbnNmb3JtYXRpb25cbiAgICAgIC8vIHVwZGF0ZUNlbGw6IGZ1bmN0aW9uIChuZXdSZXF1ZXN0LCBvbGRSZXF1ZXN0KSB7fVxuICAgICAgYWRkUm93OiBmdW5jdGlvbiAobmV3UmVxdWVzdCwgb2xkUmVxdWVzdCkge1xuICAgICAgICBpZiAobmV3UmVxdWVzdC52YWx1ZS5yb3dJbmRleCA8IG9sZFJlcXVlc3QudmFsdWUucm93SW5kZXgpIHtcbiAgICAgICAgICByZXR1cm4gbmV3UmVxdWVzdDtcbiAgICAgICAgfVxuICAgICAgICBuZXdSZXF1ZXN0LnZhbHVlLnJvd0luZGV4ICs9IDE7XG4gICAgICAgIHJldHVybiBuZXdSZXF1ZXN0O1xuICAgICAgfSxcbiAgICAgIGRlbGV0ZVJvdzogZnVuY3Rpb24gKG5ld1JlcXVlc3QsIG9sZFJlcXVlc3QpIHtcbiAgICAgICAgaWYgKG5ld1JlcXVlc3QudmFsdWUucm93SW5kZXggIT09IG9sZFJlcXVlc3QudmFsdWUucm93SW5kZXgpIHtcbiAgICAgICAgICByZXR1cm4gbmV3UmVxdWVzdDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gb3QubWFya0FzTm9PcChuZXdSZXF1ZXN0KTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIGZ1bmN0aW9uIChvcGVhcmlvblRyYW5zZm9ybWF0aW9uKSB7XG4gICAgb3QgPSBvcGVhcmlvblRyYW5zZm9ybWF0aW9uO1xuICAgIG90LnNldEV4ZWN1dGVBY3Rpb25zKGV4ZWN1dGVBY3Rpb25zKTtcbiAgICBvdC5zZXRUcmFuc2Zvcm1hdGlvbk1hdHJpeCh0cmFuc2Zvcm1hdGlvbk1hdHJpeCk7XG4gIH07XG59KCkpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHRhYmxlQ2hhbmdlUnVsZXM7IiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgVGFibGVBY3Rpb25zID0gcmVxdWlyZSgnLi4vYWN0aW9ucy9UYWJsZUFjdGlvbnMnKTtcbnZhciBPVCA9IHJlcXVpcmUoJy4uL290L290LmpzJyk7XG52YXIgdGFibGVDaGFuZ2VSdWxlcyA9IHJlcXVpcmUoJy4uL290L3RhYmxlQ2hhbmdlLmpzJyk7XG52YXIgc29ja2V0LCBvdDtcbnZhciBHTFUgPSByZXF1aXJlKCdnbHUuanMnKTtcblxuY2xhc3MgVGFibGVTdG9yZSBleHRlbmRzIEdMVS5TdG9yZSB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG5cbiAgICB0aGlzLmluaXQoKTtcblxuICAgIHRoaXMuYmluZEFjdGlvbnMoXG4gICAgICBUYWJsZUFjdGlvbnMuVVBEQVRFX0NFTEwsIHRoaXMudXBkYXRlQ2VsbCwgW10sXG4gICAgICBUYWJsZUFjdGlvbnMuQUREX1JPVywgdGhpcy51cGRhdGVSb3csIFtdLFxuICAgICAgVGFibGVBY3Rpb25zLkRFTEVURV9ST1csIHRoaXMuZGVsZXRlUm93LCBbXSxcbiAgICAgIFRhYmxlQWN0aW9ucy5VU0VSX0NIQU5HRV9QT1NJVElPTiwgdGhpcy51c2VyQ2hhbmdlUG9zaXRpb24sIFtdXG4gICAgKTtcbiAgfVxuXG4gIGluaXQoKSB7XG4gICAgc29ja2V0ID0gbmV3IFdlYlNvY2tldCgnd3M6Ly9sb2NhbGhvc3Q6ODA4MCcsICdwcm90b2NvbE9uZScpO1xuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICB2YXIgZW1pdENoYW5nZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHNlbGYuZW1pdENoYW5nZSgpO1xuICAgIH07XG5cbiAgICBvdCA9IG5ldyBPVCh7XG4gICAgICBvbkluaXQ6IGVtaXRDaGFuZ2UsXG4gICAgICBvblVzZXJQb3NpdGlvbkNoYW5nZTogZW1pdENoYW5nZVxuICAgIH0pO1xuICAgIHRhYmxlQ2hhbmdlUnVsZXMob3QpO1xuXG4gICAgb3Qub25Nb2RlbENoYW5nZShUYWJsZUFjdGlvbnMuVVBEQVRFX0NFTEwsIGVtaXRDaGFuZ2UpO1xuICAgIG90Lm9uTW9kZWxDaGFuZ2UoVGFibGVBY3Rpb25zLkFERF9ST1csIGVtaXRDaGFuZ2UpO1xuICAgIG90Lm9uTW9kZWxDaGFuZ2UoVGFibGVBY3Rpb25zLkRFTEVURV9ST1csIGVtaXRDaGFuZ2UpO1xuXG4gICAgc29ja2V0Lm9ubWVzc2FnZSA9IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgb3QucHJvY2Vzc1JlcXVlc3QoZXZlbnQuZGF0YSk7XG4gICAgfTtcbiAgfVxuXG4gIGdldCBkYXRhKCkge1xuICAgIHJldHVybiBvdC5nZXREYXRhKCk7XG4gIH1cblxuICBnZXQgdXNlcnNQb3NpdGlvbigpIHtcbiAgICByZXR1cm4gb3QuZ2V0VXNlcnNQb3N0aW9uKCk7XG4gIH1cblxuICB0cmlnZ2VyUmVxdWVzdChhY3Rpb24sIHBheWxvYWQpIHtcbiAgICB2YXIgbWVzc2FnZSA9IG90LmNyZWF0ZU1lc3NhZ2UoYWN0aW9uLCBwYXlsb2FkKTtcbiAgICB2YXIgcmVxdWVzdCA9IEpTT04ucGFyc2UobWVzc2FnZSk7XG4gICAgb3QuZXhlY3V0ZShyZXF1ZXN0KTtcbiAgICBzb2NrZXQuc2VuZChtZXNzYWdlKTtcbiAgICB0aGlzLmVtaXRDaGFuZ2UoKTtcbiAgfVxuXG4gIHVwZGF0ZUNlbGwocGF5bG9hZCkge1xuICAgIHRoaXMudHJpZ2dlclJlcXVlc3QoVGFibGVBY3Rpb25zLlVQREFURV9DRUxMLCBwYXlsb2FkKTtcbiAgfVxuXG4gIHVwZGF0ZVJvdyhwYXlsb2FkKSB7XG4gICAgdGhpcy50cmlnZ2VyUmVxdWVzdChUYWJsZUFjdGlvbnMuQUREX1JPVywgcGF5bG9hZCk7XG4gIH1cblxuICBkZWxldGVSb3cocGF5bG9hZCkge1xuICAgIHRoaXMudHJpZ2dlclJlcXVlc3QoVGFibGVBY3Rpb25zLkRFTEVURV9ST1csIHBheWxvYWQpO1xuICB9XG5cbiAgdXNlckNoYW5nZVBvc2l0aW9uKHBheWxvYWQpIHtcbiAgICB0aGlzLnRyaWdnZXJSZXF1ZXN0KFRhYmxlQWN0aW9ucy5VU0VSX0NIQU5HRV9QT1NJVElPTiwgcGF5bG9hZCk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBuZXcgVGFibGVTdG9yZSgpO1xuIiwidmFyIF9nZXQgPSBmdW5jdGlvbiBnZXQob2JqZWN0LCBwcm9wZXJ0eSwgcmVjZWl2ZXIpIHsgdmFyIGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG9iamVjdCwgcHJvcGVydHkpOyBpZiAoZGVzYyA9PT0gdW5kZWZpbmVkKSB7IHZhciBwYXJlbnQgPSBPYmplY3QuZ2V0UHJvdG90eXBlT2Yob2JqZWN0KTsgaWYgKHBhcmVudCA9PT0gbnVsbCkgeyByZXR1cm4gdW5kZWZpbmVkOyB9IGVsc2UgeyByZXR1cm4gZ2V0KHBhcmVudCwgcHJvcGVydHksIHJlY2VpdmVyKTsgfSB9IGVsc2UgaWYgKCd2YWx1ZScgaW4gZGVzYykgeyByZXR1cm4gZGVzYy52YWx1ZTsgfSBlbHNlIHsgdmFyIGdldHRlciA9IGRlc2MuZ2V0OyBpZiAoZ2V0dGVyID09PSB1bmRlZmluZWQpIHsgcmV0dXJuIHVuZGVmaW5lZDsgfSByZXR1cm4gZ2V0dGVyLmNhbGwocmVjZWl2ZXIpOyB9IH07XG5cbnZhciBfaW5oZXJpdHMgPSBmdW5jdGlvbiAoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHsgaWYgKHR5cGVvZiBzdXBlckNsYXNzICE9PSAnZnVuY3Rpb24nICYmIHN1cGVyQ2xhc3MgIT09IG51bGwpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcignU3VwZXIgZXhwcmVzc2lvbiBtdXN0IGVpdGhlciBiZSBudWxsIG9yIGEgZnVuY3Rpb24sIG5vdCAnICsgdHlwZW9mIHN1cGVyQ2xhc3MpOyB9IHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcyAmJiBzdXBlckNsYXNzLnByb3RvdHlwZSwgeyBjb25zdHJ1Y3RvcjogeyB2YWx1ZTogc3ViQ2xhc3MsIGVudW1lcmFibGU6IGZhbHNlLCB3cml0YWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlIH0gfSk7IGlmIChzdXBlckNsYXNzKSBzdWJDbGFzcy5fX3Byb3RvX18gPSBzdXBlckNsYXNzOyB9O1xuXG52YXIgX2NsYXNzQ2FsbENoZWNrID0gZnVuY3Rpb24gKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKCdDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb24nKTsgfSB9O1xuXG52YXIgX2NyZWF0ZUNsYXNzID0gKGZ1bmN0aW9uICgpIHsgZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7IGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHsgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTsgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlOyBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7IGlmICgndmFsdWUnIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlOyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7IH0gfSByZXR1cm4gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykgeyBpZiAocHJvdG9Qcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpOyBpZiAoc3RhdGljUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTsgcmV0dXJuIENvbnN0cnVjdG9yOyB9OyB9KSgpO1xuXG4oZnVuY3Rpb24gKGdsb2JhbCwgZmFjdG9yeSkge1xuICAgIHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyA/IG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeShyZXF1aXJlKCdldmVudGVtaXR0ZXIzJyksIHJlcXVpcmUoJ2xvZGFzaC1ub2RlL21vZGVybi9sYW5nL2lzRnVuY3Rpb24nKSwgcmVxdWlyZSgncm91dGUtcmVjb2duaXplcicpLCByZXF1aXJlKCdkZWVwLWVxdWFsJyksIHJlcXVpcmUoJ2xvZGFzaC1ub2RlL21vZGVybi9sYW5nL2Nsb25lJyksIHJlcXVpcmUoJ2xvZGFzaC1ub2RlL21vZGVybi9vYmplY3QvZm9yT3duJyksIHJlcXVpcmUoJ2xvZGFzaC1ub2RlL21vZGVybi9vYmplY3QvbWFwVmFsdWVzJyksIHJlcXVpcmUoJ2xvZGFzaC1ub2RlL21vZGVybi9vYmplY3Qva2V5cycpLCByZXF1aXJlKCdsb2Rhc2gtbm9kZS9tb2Rlcm4vb2JqZWN0L2ZpbmRLZXknKSwgcmVxdWlyZSgnbG9kYXNoLW5vZGUvbW9kZXJuL2NvbGxlY3Rpb24vbWFwJyksIHJlcXVpcmUoJ2xvZGFzaC1ub2RlL21vZGVybi9jb2xsZWN0aW9uL2ZvckVhY2gnKSwgcmVxdWlyZSgnbG9kYXNoLW5vZGUvbW9kZXJuL2NvbGxlY3Rpb24vc2l6ZScpLCByZXF1aXJlKCdsb2Rhc2gtbm9kZS9tb2Rlcm4vYXJyYXkvdW5pcScpLCByZXF1aXJlKCdsb2Rhc2gtbm9kZS9tb2Rlcm4vYXJyYXkvaW50ZXJzZWN0aW9uJykpIDogdHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kID8gZGVmaW5lKFsnZXZlbnRlbWl0dGVyMycsICdsb2Rhc2gtbm9kZS9tb2Rlcm4vbGFuZy9pc0Z1bmN0aW9uJywgJ3JvdXRlLXJlY29nbml6ZXInLCAnZGVlcC1lcXVhbCcsICdsb2Rhc2gtbm9kZS9tb2Rlcm4vbGFuZy9jbG9uZScsICdsb2Rhc2gtbm9kZS9tb2Rlcm4vb2JqZWN0L2Zvck93bicsICdsb2Rhc2gtbm9kZS9tb2Rlcm4vb2JqZWN0L21hcFZhbHVlcycsICdsb2Rhc2gtbm9kZS9tb2Rlcm4vb2JqZWN0L2tleXMnLCAnbG9kYXNoLW5vZGUvbW9kZXJuL29iamVjdC9maW5kS2V5JywgJ2xvZGFzaC1ub2RlL21vZGVybi9jb2xsZWN0aW9uL21hcCcsICdsb2Rhc2gtbm9kZS9tb2Rlcm4vY29sbGVjdGlvbi9mb3JFYWNoJywgJ2xvZGFzaC1ub2RlL21vZGVybi9jb2xsZWN0aW9uL3NpemUnLCAnbG9kYXNoLW5vZGUvbW9kZXJuL2FycmF5L3VuaXEnLCAnbG9kYXNoLW5vZGUvbW9kZXJuL2FycmF5L2ludGVyc2VjdGlvbiddLCBmYWN0b3J5KSA6IGdsb2JhbC5HTFUgPSBmYWN0b3J5KGdsb2JhbC5FdmVudEVtaXR0ZXIsIGdsb2JhbC5faXNGdW5jdGlvbiwgZ2xvYmFsLlJvdXRlUmVjb2duaXplciwgZ2xvYmFsLmRlZXBFcXVhbCwgZ2xvYmFsLl9jbG9uZSwgZ2xvYmFsLl9mb3JPd24sIGdsb2JhbC5fbWFwVmFsdWVzLCBnbG9iYWwuX2tleXMsIGdsb2JhbC5fZmluZEtleSwgZ2xvYmFsLl9tYXAsIGdsb2JhbC5fZWFjaCwgZ2xvYmFsLl9zaXplLCBnbG9iYWwuX3VuaXEsIGdsb2JhbC5faW50ZXJzZWN0aW9uKTtcbn0pKHRoaXMsIGZ1bmN0aW9uIChFdmVudEVtaXR0ZXIsIF9pc0Z1bmN0aW9uLCBSb3V0ZVJlY29nbml6ZXIsIGRlZXBFcXVhbCwgX2Nsb25lLCBfZm9yT3duLCBfbWFwVmFsdWVzLCBfa2V5cywgX2ZpbmRLZXksIF9tYXAsIF9lYWNoLCBfc2l6ZSwgX3VuaXEsIF9pbnRlcnNlY3Rpb24pIHtcbiAgICAndXNlIHN0cmljdCc7XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVkIGJ5IGFkbmFuIG9uIDQvOS8xNS5cbiAgICAgKi9cblxuICAgIHZhciBDb25zdGFudHMgPSB7XG4gICAgICAgIEFDVElPTjogJ19fR0xVX19BQ1RJT05fXycsXG4gICAgICAgIFNUT1JFX0NIQU5HRTogJ19fU1RPUkVfQ0hBTkdFX18nXG4gICAgfTtcblxuICAgIHZhciBCYXNlQWN0aW9uID0gKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEFjdGlvbiBjb25zdHJ1Y3RvclxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0ge3N0cmluZ30gdHlwZVxuICAgICAgICAgKiBAcGFyYW0ge29iamVjdH0gcGF5bG9hZFxuICAgICAgICAgKi9cblxuICAgICAgICBmdW5jdGlvbiBCYXNlQWN0aW9uKHR5cGUsIHBheWxvYWQpIHtcbiAgICAgICAgICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBCYXNlQWN0aW9uKTtcblxuICAgICAgICAgICAgdGhpcy5fdHlwZSA9IHR5cGU7XG4gICAgICAgICAgICB0aGlzLl9wYXlsb2FkID0gcGF5bG9hZDtcbiAgICAgICAgfVxuXG4gICAgICAgIF9jcmVhdGVDbGFzcyhCYXNlQWN0aW9uLCBbe1xuICAgICAgICAgICAga2V5OiAndHlwZScsXG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fdHlwZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwge1xuICAgICAgICAgICAga2V5OiAncGF5bG9hZCcsXG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fcGF5bG9hZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfV0pO1xuXG4gICAgICAgIHJldHVybiBCYXNlQWN0aW9uO1xuICAgIH0pKCk7XG5cbiAgICB2YXIgY29yZV9CYXNlQWN0aW9uID0gQmFzZUFjdGlvbjtcblxuICAgIHZhciBFdmVudEJ1cyA9IChmdW5jdGlvbiAoX0V2ZW50RW1pdHRlcikge1xuICAgICAgICBmdW5jdGlvbiBFdmVudEJ1cygpIHtcbiAgICAgICAgICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBFdmVudEJ1cyk7XG5cbiAgICAgICAgICAgIF9nZXQoT2JqZWN0LmdldFByb3RvdHlwZU9mKEV2ZW50QnVzLnByb3RvdHlwZSksICdjb25zdHJ1Y3RvcicsIHRoaXMpLmNhbGwodGhpcyk7XG4gICAgICAgIH1cblxuICAgICAgICBfaW5oZXJpdHMoRXZlbnRCdXMsIF9FdmVudEVtaXR0ZXIpO1xuXG4gICAgICAgIF9jcmVhdGVDbGFzcyhFdmVudEJ1cywgW3tcbiAgICAgICAgICAgIGtleTogJ2VtaXRBY3Rpb24nLFxuICAgICAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIGVtaXRBY3Rpb24odHlwZSwgcGF5bG9hZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuZW1pdChDb25zdGFudHMuQUNUSU9OLCBuZXcgY29yZV9CYXNlQWN0aW9uKHR5cGUsIHBheWxvYWQpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfV0pO1xuXG4gICAgICAgIHJldHVybiBFdmVudEJ1cztcbiAgICB9KShFdmVudEVtaXR0ZXIpO1xuXG4gICAgdmFyIGV2ZW50QnVzID0gbmV3IEV2ZW50QnVzKCk7XG5cbiAgICB2YXIgRXZlbnRidXMgPSBldmVudEJ1cztcblxuICAgIHZhciBCYXNlVmlldyA9IChmdW5jdGlvbiAoX0V2ZW50RW1pdHRlcjIpIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEJhc2VWaWV3IGNvbnN0cnVjdG9yXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSB7RE9NRWxlbWVudH0gcm9vdFxuICAgICAgICAgKiBAcGFyYW0ge3N0cmluZ30gc2VsZWN0b3JcbiAgICAgICAgICovXG5cbiAgICAgICAgZnVuY3Rpb24gQmFzZVZpZXcocm9vdCwgc2VsZWN0b3IpIHtcbiAgICAgICAgICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBCYXNlVmlldyk7XG5cbiAgICAgICAgICAgIF9nZXQoT2JqZWN0LmdldFByb3RvdHlwZU9mKEJhc2VWaWV3LnByb3RvdHlwZSksICdjb25zdHJ1Y3RvcicsIHRoaXMpLmNhbGwodGhpcyk7XG5cbiAgICAgICAgICAgIHRoaXMuX3Jvb3QgPSByb290O1xuICAgICAgICAgICAgdGhpcy5fc2VsZWN0b3IgPSBzZWxlY3RvcjtcbiAgICAgICAgfVxuXG4gICAgICAgIF9pbmhlcml0cyhCYXNlVmlldywgX0V2ZW50RW1pdHRlcjIpO1xuXG4gICAgICAgIF9jcmVhdGVDbGFzcyhCYXNlVmlldywgW3tcbiAgICAgICAgICAgIGtleTogJ3Jvb3QnLFxuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3Jvb3Q7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0OiBmdW5jdGlvbiAodikge1xuICAgICAgICAgICAgICAgIHRoaXMuX3Jvb3QgPSB2O1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBrZXk6ICdzZWxlY3RvcicsXG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fc2VsZWN0b3I7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0OiBmdW5jdGlvbiAodikge1xuICAgICAgICAgICAgICAgIHRoaXMuX3NlbGVjdG9yID0gdjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwge1xuICAgICAgICAgICAga2V5OiAncmVuZGVyJyxcbiAgICAgICAgICAgIHZhbHVlOiBmdW5jdGlvbiByZW5kZXIoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGtleTogJ2VsJyxcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnNlbGVjdG9yID8gdGhpcy5yb290LnF1ZXJ5U2VsZWN0b3IodGhpcy5zZWxlY3RvcikgOiB0aGlzLnJvb3Q7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1dKTtcblxuICAgICAgICByZXR1cm4gQmFzZVZpZXc7XG4gICAgfSkoRXZlbnRFbWl0dGVyKTtcblxuICAgIHZhciBjb3JlX0Jhc2VWaWV3ID0gQmFzZVZpZXc7XG5cbiAgICB2YXIgQmFzZVZpZXdDb250cm9sbGVyID0gKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZnVuY3Rpb24gQmFzZVZpZXdDb250cm9sbGVyKHZpZXcpIHtcbiAgICAgICAgICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBCYXNlVmlld0NvbnRyb2xsZXIpO1xuXG4gICAgICAgICAgICB0aGlzLl92aWV3ID0gdmlldztcbiAgICAgICAgICAgIHRoaXMuX2V2ZW50QnVzID0gRXZlbnRidXM7XG4gICAgICAgIH1cblxuICAgICAgICBfY3JlYXRlQ2xhc3MoQmFzZVZpZXdDb250cm9sbGVyLCBbe1xuICAgICAgICAgICAga2V5OiAndmlldycsXG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fdmlldztcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uICh2KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fdmlldyA9IHY7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGtleTogJ0V2ZW50YnVzJyxcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9ldmVudEJ1cztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfV0pO1xuXG4gICAgICAgIHJldHVybiBCYXNlVmlld0NvbnRyb2xsZXI7XG4gICAgfSkoKTtcblxuICAgIHZhciBjb3JlX0Jhc2VWaWV3Q29udHJvbGxlciA9IEJhc2VWaWV3Q29udHJvbGxlcjtcblxuICAgIHZhciBEaXNwYXRjaGVyID0gZnVuY3Rpb24gRGlzcGF0Y2hlcihzdG9yZXMpIHtcbiAgICAgICAgdGhpcy5zdG9yZXMgPSB7fTtcbiAgICAgICAgdGhpcy5jdXJyZW50RGlzcGF0Y2ggPSBudWxsO1xuICAgICAgICB0aGlzLmN1cnJlbnRBY3Rpb25UeXBlID0gbnVsbDtcbiAgICAgICAgdGhpcy53YWl0aW5nVG9EaXNwYXRjaCA9IFtdO1xuXG4gICAgICAgIGZvciAodmFyIGtleSBpbiBzdG9yZXMpIHtcbiAgICAgICAgICAgIGlmIChzdG9yZXMuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICAgICAgICAgIHRoaXMuYWRkU3RvcmUoa2V5LCBzdG9yZXNba2V5XSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBFdmVudGJ1cy5vbihDb25zdGFudHMuQUNUSU9OLCB0aGlzLmRpc3BhdGNoLCB0aGlzKTtcbiAgICB9O1xuXG4gICAgRGlzcGF0Y2hlci5wcm90b3R5cGUuYWRkU3RvcmUgPSBmdW5jdGlvbiAobmFtZSwgc3RvcmUpIHtcbiAgICAgICAgc3RvcmUuZGlzcGF0Y2hlciA9IHRoaXM7XG4gICAgICAgIHRoaXMuc3RvcmVzW25hbWVdID0gc3RvcmU7XG4gICAgfTtcblxuICAgIERpc3BhdGNoZXIucHJvdG90eXBlLmRpc3BhdGNoID0gZnVuY3Rpb24gKGFjdGlvbikge1xuICAgICAgICBpZiAoIWFjdGlvbiB8fCAhYWN0aW9uLnR5cGUpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignQ2FuIG9ubHkgZGlzcGF0Y2ggYWN0aW9ucyB3aXRoIGEgXFwndHlwZVxcJyBwcm9wZXJ0eScpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuY3VycmVudERpc3BhdGNoKSB7XG4gICAgICAgICAgICB2YXIgY29tcGxhaW50ID0gJ0Nhbm5vdCBkaXNwYXRjaCBhbiBhY3Rpb24gKFxcJycgKyBhY3Rpb24udHlwZSArICdcXCcpIHdoaWxlIGFub3RoZXIgYWN0aW9uIChcXCcnICsgdGhpcy5jdXJyZW50QWN0aW9uVHlwZSArICdcXCcpIGlzIGJlaW5nIGRpc3BhdGNoZWQnO1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGNvbXBsYWludCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLndhaXRpbmdUb0Rpc3BhdGNoID0gX2Nsb25lKHRoaXMuc3RvcmVzKTtcblxuICAgICAgICB0aGlzLmN1cnJlbnRBY3Rpb25UeXBlID0gYWN0aW9uLnR5cGU7XG4gICAgICAgIHRoaXMuY3VycmVudERpc3BhdGNoID0gX21hcFZhbHVlcyh0aGlzLnN0b3JlcywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHsgcmVzb2x2ZWQ6IGZhbHNlLCB3YWl0aW5nT246IFtdLCB3YWl0Q2FsbGJhY2s6IG51bGwgfTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHRoaXMuZG9EaXNwYXRjaExvb3AoYWN0aW9uKTtcbiAgICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgICAgIHRoaXMuY3VycmVudEFjdGlvblR5cGUgPSBudWxsO1xuICAgICAgICAgICAgdGhpcy5jdXJyZW50RGlzcGF0Y2ggPSBudWxsO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIERpc3BhdGNoZXIucHJvdG90eXBlLmRvRGlzcGF0Y2hMb29wID0gZnVuY3Rpb24gKGFjdGlvbikge1xuICAgICAgICB2YXIgZGlzcGF0Y2gsXG4gICAgICAgICAgICBjYW5CZURpc3BhdGNoZWRUbyxcbiAgICAgICAgICAgIHdhc0hhbmRsZWQgPSBmYWxzZSxcbiAgICAgICAgICAgIHJlbW92ZUZyb21EaXNwYXRjaFF1ZXVlID0gW10sXG4gICAgICAgICAgICBkaXNwYXRjaGVkVGhpc0xvb3AgPSBbXTtcblxuICAgICAgICBfZm9yT3duKHRoaXMud2FpdGluZ1RvRGlzcGF0Y2gsIGZ1bmN0aW9uICh2YWx1ZSwga2V5KSB7XG4gICAgICAgICAgICBkaXNwYXRjaCA9IHRoaXMuY3VycmVudERpc3BhdGNoW2tleV07XG4gICAgICAgICAgICBjYW5CZURpc3BhdGNoZWRUbyA9ICFkaXNwYXRjaC53YWl0aW5nT24ubGVuZ3RoIHx8ICFfaW50ZXJzZWN0aW9uKGRpc3BhdGNoLndhaXRpbmdPbiwgX2tleXModGhpcy53YWl0aW5nVG9EaXNwYXRjaCkpLmxlbmd0aDtcbiAgICAgICAgICAgIGlmIChjYW5CZURpc3BhdGNoZWRUbykge1xuICAgICAgICAgICAgICAgIGlmIChkaXNwYXRjaC53YWl0Q2FsbGJhY2spIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHN0b3JlcyA9IF9tYXAoZGlzcGF0Y2gud2FpdGluZ09uLCBmdW5jdGlvbiAoc3RvcmVLZXkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnN0b3Jlc1tzdG9yZUtleV07XG4gICAgICAgICAgICAgICAgICAgIH0sIHRoaXMpO1xuICAgICAgICAgICAgICAgICAgICB2YXIgZm4gPSBkaXNwYXRjaC53YWl0Q2FsbGJhY2s7XG4gICAgICAgICAgICAgICAgICAgIGRpc3BhdGNoLndhaXRDYWxsYmFjayA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgIGRpc3BhdGNoLndhaXRpbmdPbiA9IFtdO1xuICAgICAgICAgICAgICAgICAgICBkaXNwYXRjaC5yZXNvbHZlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIGZuLmFwcGx5KG51bGwsIHN0b3Jlcyk7XG4gICAgICAgICAgICAgICAgICAgIHdhc0hhbmRsZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGRpc3BhdGNoLnJlc29sdmVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGhhbmRsZWQgPSB0aGlzLnN0b3Jlc1trZXldLl9faGFuZGxlQWN0aW9uX18oYWN0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGhhbmRsZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHdhc0hhbmRsZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgZGlzcGF0Y2hlZFRoaXNMb29wLnB1c2goa2V5KTtcblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmN1cnJlbnREaXNwYXRjaFtrZXldLnJlc29sdmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlbW92ZUZyb21EaXNwYXRjaFF1ZXVlLnB1c2goa2V5KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIHRoaXMpO1xuXG4gICAgICAgIGlmIChfa2V5cyh0aGlzLndhaXRpbmdUb0Rpc3BhdGNoKS5sZW5ndGggJiYgIWRpc3BhdGNoZWRUaGlzTG9vcC5sZW5ndGgpIHtcbiAgICAgICAgICAgIHZhciBzdG9yZXNXaXRoQ2lyY3VsYXJXYWl0cyA9IF9rZXlzKHRoaXMud2FpdGluZ1RvRGlzcGF0Y2gpLmpvaW4oJywgJyk7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0luZGlyZWN0IGNpcmN1bGFyIHdhaXQgZGV0ZWN0ZWQgYW1vbmc6ICcgKyBzdG9yZXNXaXRoQ2lyY3VsYXJXYWl0cyk7XG4gICAgICAgIH1cblxuICAgICAgICBfZWFjaChyZW1vdmVGcm9tRGlzcGF0Y2hRdWV1ZSwgZnVuY3Rpb24gKGtleSkge1xuICAgICAgICAgICAgZGVsZXRlIHRoaXMud2FpdGluZ1RvRGlzcGF0Y2hba2V5XTtcbiAgICAgICAgfSwgdGhpcyk7XG5cbiAgICAgICAgaWYgKF9zaXplKHRoaXMud2FpdGluZ1RvRGlzcGF0Y2gpKSB7XG4gICAgICAgICAgICB0aGlzLmRvRGlzcGF0Y2hMb29wKGFjdGlvbik7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIXdhc0hhbmRsZWQgJiYgY29uc29sZSAmJiBjb25zb2xlLndhcm4pIHtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybignQW4gYWN0aW9uIG9mIHR5cGUgJyArIGFjdGlvbi50eXBlICsgJyB3YXMgZGlzcGF0Y2hlZCwgYnV0IG5vIHN0b3JlIGhhbmRsZWQgaXQnKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBEaXNwYXRjaGVyLnByb3RvdHlwZS53YWl0Rm9yU3RvcmVzID0gZnVuY3Rpb24gKHN0b3JlLCBzdG9yZXMsIGZuKSB7XG4gICAgICAgIGlmICghdGhpcy5jdXJyZW50RGlzcGF0Y2gpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignQ2Fubm90IHdhaXQgdW5sZXNzIGFuIGFjdGlvbiBpcyBiZWluZyBkaXNwYXRjaGVkJyk7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgd2FpdGluZ1N0b3JlTmFtZSA9IF9maW5kS2V5KHRoaXMuc3RvcmVzLCBmdW5jdGlvbiAodmFsKSB7XG4gICAgICAgICAgICByZXR1cm4gdmFsID09PSBzdG9yZTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKHN0b3Jlcy5pbmRleE9mKHdhaXRpbmdTdG9yZU5hbWUpID4gLTEpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignQSBzdG9yZSBjYW5ub3Qgd2FpdCBvbiBpdHNlbGYnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBkaXNwYXRjaCA9IHRoaXMuY3VycmVudERpc3BhdGNoW3dhaXRpbmdTdG9yZU5hbWVdO1xuXG4gICAgICAgIGlmIChkaXNwYXRjaC53YWl0aW5nT24ubGVuZ3RoKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3Iod2FpdGluZ1N0b3JlTmFtZSArICcgYWxyZWFkeSB3YWl0aW5nIG9uIHN0b3JlcycpO1xuICAgICAgICB9XG5cbiAgICAgICAgX2VhY2goc3RvcmVzLCBmdW5jdGlvbiAoc3RvcmVOYW1lKSB7XG4gICAgICAgICAgICB2YXIgc3RvcmVEaXNwYXRjaCA9IHRoaXMuY3VycmVudERpc3BhdGNoW3N0b3JlTmFtZV07XG4gICAgICAgICAgICBpZiAoIXRoaXMuc3RvcmVzW3N0b3JlTmFtZV0pIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0Nhbm5vdCB3YWl0IGZvciBub24tZXhpc3RlbnQgc3RvcmUgJyArIHN0b3JlTmFtZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoc3RvcmVEaXNwYXRjaC53YWl0aW5nT24uaW5kZXhPZih3YWl0aW5nU3RvcmVOYW1lKSA+IC0xKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdDaXJjdWxhciB3YWl0IGRldGVjdGVkIGJldHdlZW4gJyArIHdhaXRpbmdTdG9yZU5hbWUgKyAnIGFuZCAnICsgc3RvcmVOYW1lKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgdGhpcyk7XG5cbiAgICAgICAgZGlzcGF0Y2gucmVzb2x2ZWQgPSBmYWxzZTtcbiAgICAgICAgZGlzcGF0Y2gud2FpdGluZ09uID0gX3VuaXEoZGlzcGF0Y2gud2FpdGluZ09uLmNvbmNhdChzdG9yZXMpKTtcbiAgICAgICAgZGlzcGF0Y2gud2FpdENhbGxiYWNrID0gZm47XG4gICAgfTtcblxuICAgIHZhciBjb3JlX0Rpc3BhdGNoZXJfX2Rpc3BhdGNoZXIgPSBuZXcgRGlzcGF0Y2hlcigpO1xuICAgIHZhciBjb3JlX0Rpc3BhdGNoZXIgPSBjb3JlX0Rpc3BhdGNoZXJfX2Rpc3BhdGNoZXI7XG5cbiAgICB2YXIgQmFzZVN0b3JlID0gKGZ1bmN0aW9uIChfRXZlbnRFbWl0dGVyMykge1xuICAgICAgICBmdW5jdGlvbiBCYXNlU3RvcmUoKSB7XG4gICAgICAgICAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgQmFzZVN0b3JlKTtcblxuICAgICAgICAgICAgX2dldChPYmplY3QuZ2V0UHJvdG90eXBlT2YoQmFzZVN0b3JlLnByb3RvdHlwZSksICdjb25zdHJ1Y3RvcicsIHRoaXMpLmNhbGwodGhpcyk7XG5cbiAgICAgICAgICAgIHRoaXMuX19hY3Rpb25zX18gPSB7fTtcbiAgICAgICAgICAgIGNvcmVfRGlzcGF0Y2hlci5hZGRTdG9yZSh0aGlzLmNvbnN0cnVjdG9yLm5hbWUsIHRoaXMpO1xuICAgICAgICB9XG5cbiAgICAgICAgX2luaGVyaXRzKEJhc2VTdG9yZSwgX0V2ZW50RW1pdHRlcjMpO1xuXG4gICAgICAgIF9jcmVhdGVDbGFzcyhCYXNlU3RvcmUsIFt7XG4gICAgICAgICAgICBrZXk6ICdiaW5kQWN0aW9ucycsXG4gICAgICAgICAgICB2YWx1ZTogZnVuY3Rpb24gYmluZEFjdGlvbnMoKSB7XG4gICAgICAgICAgICAgICAgdmFyIGFjdGlvbnMgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMpO1xuXG4gICAgICAgICAgICAgICAgaWYgKGFjdGlvbnMubGVuZ3RoID4gMSAmJiBhY3Rpb25zLmxlbmd0aCAlIDMgIT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdiaW5kQWN0aW9ucyBudW1iZXIgb2YgYXJndW1lbnRzIG11c3QgYmUgZGl2aXNpYmxlIHdpdGggMy4nKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB2YXIgYmluZEFjdGlvbiA9IChmdW5jdGlvbiAodHlwZSwgaGFuZGxlciwgZGVwZW5kZW5jaWVzKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghaGFuZGxlcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGUgaGFuZGxlciBmb3IgYWN0aW9uIHR5cGUgJyArIHR5cGUgKyAnIGlzIGZhbHN5Jyk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICB2YXIgZGVwZW5kZW5jeU5hbWVzID0gW107XG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZGVwZW5kZW5jaWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkZXBlbmRlbmN5TmFtZXMucHVzaChkZXBlbmRlbmNpZXNbaV0uY29uc3RydWN0b3IubmFtZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9fYWN0aW9uc19fW3R5cGVdID0geyBoYW5kbGVyOiBoYW5kbGVyLCBkZXBlbmRlbmNpZXM6IGRlcGVuZGVuY3lOYW1lcyB9O1xuICAgICAgICAgICAgICAgIH0pLmJpbmQodGhpcyk7XG5cbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFjdGlvbnMubGVuZ3RoOyBpICs9IDMpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHR5cGUgPSBhY3Rpb25zW2ldLFxuICAgICAgICAgICAgICAgICAgICAgICAgaGFuZGxlciA9IGFjdGlvbnNbaSArIDFdLFxuICAgICAgICAgICAgICAgICAgICAgICAgZGVwZW5kZW5jaWVzID0gYWN0aW9uc1tpICsgMl07XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKCF0eXBlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0FyZ3VtZW50ICcgKyAoaSArIDEpICsgJyB0byBiaW5kQWN0aW9ucyBpcyBhIGZhbHN5IHZhbHVlJyk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBiaW5kQWN0aW9uKHR5cGUsIGhhbmRsZXIsIGRlcGVuZGVuY2llcyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBrZXk6ICd3YWl0Rm9yJyxcbiAgICAgICAgICAgIHZhbHVlOiBmdW5jdGlvbiB3YWl0Rm9yKHN0b3JlcywgZm4pIHtcbiAgICAgICAgICAgICAgICBjb3JlX0Rpc3BhdGNoZXIud2FpdEZvclN0b3Jlcyh0aGlzLCBzdG9yZXMsIGZuLmJpbmQodGhpcykpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBrZXk6ICdpbnZva2VIYW5kbGVyJyxcbiAgICAgICAgICAgIHZhbHVlOiBmdW5jdGlvbiBpbnZva2VIYW5kbGVyKGhhbmRsZXIsIGFjdGlvbikge1xuICAgICAgICAgICAgICAgIGlmIChfaXNGdW5jdGlvbihoYW5kbGVyKSkge1xuICAgICAgICAgICAgICAgICAgICBoYW5kbGVyLmNhbGwodGhpcywgYWN0aW9uLnBheWxvYWQsIGFjdGlvbi50eXBlKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGhhbmRsZXIgJiYgX2lzRnVuY3Rpb24odGhpc1toYW5kbGVyXSkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpc1toYW5kbGVyXS5jYWxsKHRoaXMsIGFjdGlvbi5wYXlsb2FkLCBhY3Rpb24udHlwZSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGUgaGFuZGxlciBmb3IgYWN0aW9uIHR5cGUgJyArIGFjdGlvbi50eXBlICsgJyBpcyBub3QgYSBmdW5jdGlvbicpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwge1xuICAgICAgICAgICAga2V5OiAnZW1pdENoYW5nZScsXG4gICAgICAgICAgICB2YWx1ZTogZnVuY3Rpb24gZW1pdENoYW5nZSgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmVtaXQoQ29uc3RhbnRzLlNUT1JFX0NIQU5HRSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGtleTogJ29uQ2hhbmdlJyxcbiAgICAgICAgICAgIHZhbHVlOiBmdW5jdGlvbiBvbkNoYW5nZShmbiwgY3R4KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5vbihDb25zdGFudHMuU1RPUkVfQ0hBTkdFLCBmbiwgY3R4KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwge1xuICAgICAgICAgICAga2V5OiAnb2ZmQ2hhbmdlJyxcbiAgICAgICAgICAgIHZhbHVlOiBmdW5jdGlvbiBvZmZDaGFuZ2UoZm4sIGN0eCkge1xuICAgICAgICAgICAgICAgIHRoaXMub2ZmKENvbnN0YW50cy5TVE9SRV9DSEFOR0UsIGZuLCBjdHgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBrZXk6ICdfX2hhbmRsZUFjdGlvbl9fJyxcbiAgICAgICAgICAgIHZhbHVlOiBmdW5jdGlvbiBfX2hhbmRsZUFjdGlvbl9fKGFjdGlvbikge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9fYWN0aW9uc19fLmhhc093blByb3BlcnR5KGFjdGlvbi50eXBlKSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgaGFuZGxlciA9IHRoaXMuX19hY3Rpb25zX19bYWN0aW9uLnR5cGVdLmhhbmRsZXI7XG4gICAgICAgICAgICAgICAgICAgIHZhciBkZXBlbmRlbmNpZXMgPSB0aGlzLl9fYWN0aW9uc19fW2FjdGlvbi50eXBlXS5kZXBlbmRlbmNpZXM7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKChkZXBlbmRlbmNpZXMgIT09IHVuZGVmaW5lZCB8fCBkZXBlbmRlbmNpZXMgIT09IG51bGwpICYmIGRlcGVuZGVuY2llcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLndhaXRGb3IoZGVwZW5kZW5jaWVzLCAoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmludm9rZUhhbmRsZXIoaGFuZGxlciwgYWN0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pLmJpbmQodGhpcykpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuaW52b2tlSGFuZGxlcihoYW5kbGVyLCBhY3Rpb24pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfV0pO1xuXG4gICAgICAgIHJldHVybiBCYXNlU3RvcmU7XG4gICAgfSkoRXZlbnRFbWl0dGVyKTtcblxuICAgIHZhciBjb3JlX0Jhc2VTdG9yZSA9IEJhc2VTdG9yZTtcblxuICAgIHZhciBSb3V0ZXJDbGFzc19fUm91dGVyID0gKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZnVuY3Rpb24gUm91dGVyQ2xhc3NfX1JvdXRlcigpIHtcbiAgICAgICAgICAgIHZhciBkZWJ1ZyA9IGFyZ3VtZW50c1swXSA9PT0gdW5kZWZpbmVkID8gdHJ1ZSA6IGFyZ3VtZW50c1swXTtcblxuICAgICAgICAgICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIFJvdXRlckNsYXNzX19Sb3V0ZXIpO1xuXG4gICAgICAgICAgICB0aGlzLl9yb3V0ZVJlY29nbml6ZXIgPSBuZXcgUm91dGVSZWNvZ25pemVyKCk7XG4gICAgICAgICAgICB0aGlzLmlkID0gTWF0aC5yYW5kb20oKTtcbiAgICAgICAgICAgIHRoaXMuZGVidWcgPSBkZWJ1ZztcbiAgICAgICAgICAgIHRoaXMuX2xvZygnY3JlYXRpbmcgYSBuZXcgcm91dGVyIG9iamVjdCBORVcgQ09ERTonLCB0aGlzLmlkKTtcbiAgICAgICAgfVxuXG4gICAgICAgIF9jcmVhdGVDbGFzcyhSb3V0ZXJDbGFzc19fUm91dGVyLCBbe1xuICAgICAgICAgICAga2V5OiAnX2xvZycsXG4gICAgICAgICAgICB2YWx1ZTogZnVuY3Rpb24gX2xvZygpIHtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBfbGVuID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IEFycmF5KF9sZW4pLCBfa2V5ID0gMDsgX2tleSA8IF9sZW47IF9rZXkrKykge1xuICAgICAgICAgICAgICAgICAgICBhcmdzW19rZXldID0gYXJndW1lbnRzW19rZXldO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmRlYnVnKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nLmFwcGx5KGNvbnNvbGUsIGFyZ3MpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwge1xuICAgICAgICAgICAga2V5OiAnYWRkRGVmYXVsdFJvdXRlJyxcbiAgICAgICAgICAgIHZhbHVlOiBmdW5jdGlvbiBhZGREZWZhdWx0Um91dGUocm91dGUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9kZWZhdWx0Um91dGUgPSByb3V0ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwge1xuICAgICAgICAgICAga2V5OiAnYWRkUm91dGUnLFxuICAgICAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIGFkZFJvdXRlKHJvdXRlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fYWRkUm91dGVSZWMocm91dGUsIFtdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwge1xuICAgICAgICAgICAga2V5OiAnX2FkZFJvdXRlUmVjJyxcbiAgICAgICAgICAgIHZhbHVlOiBmdW5jdGlvbiBfYWRkUm91dGVSZWMocm91dGUsIHN0YXJ0QXJyKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFyb3V0ZSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdmFyIGlucHV0Um91dGVzID0gQXJyYXkuaXNBcnJheShyb3V0ZSkgPyByb3V0ZSA6IFtyb3V0ZV07XG5cbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGlucHV0Um91dGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBsb2NhbFN0YXJ0ID0gc3RhcnRBcnIuc2xpY2UoMCk7XG4gICAgICAgICAgICAgICAgICAgIHZhciByID0gaW5wdXRSb3V0ZXNbaV07XG4gICAgICAgICAgICAgICAgICAgIGxvY2FsU3RhcnQucHVzaCh7IHBhdGg6IHIucGF0aCwgaGFuZGxlcjogciB9KTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fcm91dGVSZWNvZ25pemVyLmFkZChsb2NhbFN0YXJ0KTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fYWRkUm91dGVSZWMoci5yb3V0ZSwgbG9jYWxTdGFydCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBrZXk6ICdzdGFydCcsXG4gICAgICAgICAgICB2YWx1ZTogZnVuY3Rpb24gc3RhcnQoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fbG9nKCdSb3V0ZXIgc3RhcnRlZCcpO1xuXG4gICAgICAgICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3BvcHN0YXRlJywgdGhpcy5fb25Qb3BTdGF0ZS5iaW5kKHRoaXMpKTtcbiAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZU5ld1N0YXRlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGtleTogJ19vblBvcFN0YXRlJyxcblxuICAgICAgICAgICAgLypcbiAgICAgICAgICAgIEdsdS5Sb3V0ZXIuYWRkUm91dGUoe1xuICAgICAgICAgICAgICBwYXRoOiAnL2NhdGVnb3J5JyxcbiAgICAgICAgICAgICAgY29udHJvbGxlcjogTWFpbkhhbmRsZXIsXG4gICAgICAgICAgICAgIHZpZXc6IE1haW5WaWV3LFxuICAgICAgICAgICAgICByb3V0ZSA6IFt7XG4gICAgICAgICAgICAgICAgICBwYXRoOiBcIi9lZGl0XCIsXG4gICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiBIb21lSGFuZGxlcixcbiAgICAgICAgICAgICAgICAgIHZpZXc6IEhvbWVWaWV3LFxuICAgICAgICAgICAgICAgICAgcm91dGU6IFt7XG4gICAgICAgICAgICAgICAgICAgIHBhdGg6IFwic2V0dGluZ3NcIixcbiAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlciA6IFNldHRpbmdzSGFuZGxlclxuICAgICAgICAgICAgICAgICAgICB2aWV3OiBTZXR0aW5nc1ZpZXcsXG4gICAgICAgICAgICAgICAgICB9LHtcbiAgICAgICAgICAgICAgICAgICAgcGF0aDogXCJpbmJveFwiLFxuICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiBJbmJveEhhbmRsZXIsXG4gICAgICAgICAgICAgICAgICAgIHZpZXc6IEluYm94Vmlld1xuICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgIHBhdGg6ICcvbmV3JyxcbiAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6IE5ld0NvbnRyb2xsZXJcbiAgICAgICAgICAgICAgICAgfV1cbiAgICAgICAgICAgICAgfV1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgTWFpbkhhbmRsZXIgLT4gSG9tZUhhbmRsZXIgLT4gU2V0dGluZ3NIYW5kbGVyXG4gICAgICAgICAgICAgL2hvbWUvc2V0dGluZ3NcbiAgICAgICAgICAgICBHbHUuUm91dGVyLmFkZFJvdXRlKHsgcGF0aDogXCIvbW9iaWxlXCJ9KTtcbiAgICAgICAgICAgICovXG4gICAgICAgICAgICB2YWx1ZTogZnVuY3Rpb24gX29uUG9wU3RhdGUoZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuaGFuZGxlTmV3U3RhdGUoZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGtleTogJ19wcmludEhhbmRsZXJUcmVlJyxcbiAgICAgICAgICAgIHZhbHVlOiBmdW5jdGlvbiBfcHJpbnRIYW5kbGVyVHJlZSh0cmVlKSB7XG4gICAgICAgICAgICAgICAgdmFyIHN0ciA9ICcnO1xuICAgICAgICAgICAgICAgIHZhciBpbmRlbnQgPSAnJztcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRyZWUubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgc3RyICs9ICdcXG4nICsgaW5kZW50ICsgJytbJyArIGkgKyAnXSAnICsgdHJlZVtpXS5oYW5kbGVyLmNvbnRyb2xsZXIubmFtZTtcbiAgICAgICAgICAgICAgICAgICAgaW5kZW50ICs9ICcgICAnO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJldHVybiBzdHI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGtleTogJ19pbnZva2VIYW5kbGVycycsXG4gICAgICAgICAgICB2YWx1ZTogZnVuY3Rpb24gX2ludm9rZUhhbmRsZXJzKG5ld0hhbmRsZXJzLCBlKSB7XG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLl9hcHBsaWVkSGFuZGxlcnMpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fYXBwbGllZEhhbmRsZXJzID0gW107XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdmFyIGxlbiA9IE1hdGgubWluKHRoaXMuX2FwcGxpZWRIYW5kbGVycy5sZW5ndGgsIG5ld0hhbmRsZXJzLmxlbmd0aCk7XG4gICAgICAgICAgICAgICAgdmFyIGRpZmZJbmRleCA9IC0xO1xuICAgICAgICAgICAgICAgIHZhciBuZXdBcHBsaWVkQ29udHJvbGxlcnMgPSBbXTtcblxuICAgICAgICAgICAgICAgIHRoaXMuX2xvZygnQ3VycmVudCBoYW5kbGVyczonLCAxMjMsICdhcmUnLCAnc29tZXRoaW5nJyk7XG4gICAgICAgICAgICAgICAgdGhpcy5fbG9nKHRoaXMuX3ByaW50SGFuZGxlclRyZWUodGhpcy5fYXBwbGllZEhhbmRsZXJzKSk7XG4gICAgICAgICAgICAgICAgdGhpcy5fbG9nKCdOZXcgaGFuZGxlcnM6Jyk7XG4gICAgICAgICAgICAgICAgdGhpcy5fbG9nKHRoaXMuX3ByaW50SGFuZGxlclRyZWUobmV3SGFuZGxlcnMpKTtcblxuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgZGlmZkluZGV4ID0gaTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHBhcmFtc0VxdWFsID0gIWRlZXBFcXVhbChuZXdIYW5kbGVyc1tpXS5wYXJhbXMsIHRoaXMuX2FwcGxpZWRIYW5kbGVyc1tpXS5wYXJhbXMpO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChuZXdIYW5kbGVyc1tpXS5oYW5kbGVyLmNvbnRyb2xsZXIgIT09IHRoaXMuX2FwcGxpZWRIYW5kbGVyc1tpXS5oYW5kbGVyLmNvbnRyb2xsZXIgfHwgcGFyYW1zRXF1YWwpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHBhcmFtc0VxdWFsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlmZkluZGV4IC09IDE7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdGhpcy5fbG9nKCdEaWZmIGluZGV4IGlzICcgKyBkaWZmSW5kZXggKyAnIHN0YXJ0aW5nIGZyb20gJyArIChkaWZmSW5kZXggKyAxKSk7XG5cbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gZGlmZkluZGV4ICsgMTsgaSA8IHRoaXMuX2FwcGxpZWRIYW5kbGVycy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fYXBwbGllZEhhbmRsZXJzW2ldLmNvbnRyb2xsZXIuZGVzdHJveSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fYXBwbGllZEhhbmRsZXJzW2ldLmNvbnRyb2xsZXIuZGVzdHJveSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdGhpcy5fYXBwbGllZEhhbmRsZXJzLnNwbGljZShkaWZmSW5kZXggKyAxKTtcblxuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSBkaWZmSW5kZXggKyAxOyBpIDwgbmV3SGFuZGxlcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHJlc3VsdCA9IG5ld0hhbmRsZXJzW2ldLmhhbmRsZXI7XG4gICAgICAgICAgICAgICAgICAgIHZhciBwYXJhbXMgPSBuZXdIYW5kbGVyc1tpXS5wYXJhbXM7XG4gICAgICAgICAgICAgICAgICAgIHZhciBjb250cm9sbGVyID0gdGhpcy5pbnZva2VIYW5kbGVyKHJlc3VsdCwgZSwgcGFyYW1zKTtcblxuICAgICAgICAgICAgICAgICAgICBuZXdBcHBsaWVkQ29udHJvbGxlcnMucHVzaCh7IGNvbnRyb2xsZXI6IGNvbnRyb2xsZXIsIGhhbmRsZXI6IHJlc3VsdCwgcGFyYW1zOiBwYXJhbXMgfSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdGhpcy5fYXBwbGllZEhhbmRsZXJzID0gdGhpcy5fYXBwbGllZEhhbmRsZXJzLmNvbmNhdChuZXdBcHBsaWVkQ29udHJvbGxlcnMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBrZXk6ICdpbnZva2VIYW5kbGVyJyxcbiAgICAgICAgICAgIHZhbHVlOiBmdW5jdGlvbiBpbnZva2VIYW5kbGVyKGhhbmRsZXIsIGUsIHBhcmFtcykge1xuICAgICAgICAgICAgICAgIHZhciB2aWV3ID0gbmV3IGhhbmRsZXIudmlldyhkb2N1bWVudC5ib2R5LCBoYW5kbGVyLnZpZXdTZWxlY3Rvcik7XG4gICAgICAgICAgICAgICAgdmFyIGNvbnRyb2xsZXIgPSBuZXcgaGFuZGxlci5jb250cm9sbGVyKHZpZXcsIHBhcmFtcyk7XG4gICAgICAgICAgICAgICAgdGhpcy5fbG9nKCdpbnZva2luZyBoYW5kbGVyJywgaGFuZGxlciwgZSwgY29udHJvbGxlcik7XG5cbiAgICAgICAgICAgICAgICB2aWV3LnJlbmRlcigpO1xuICAgICAgICAgICAgICAgIHJldHVybiBjb250cm9sbGVyO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBrZXk6ICdoYW5kbGVOZXdTdGF0ZScsXG4gICAgICAgICAgICB2YWx1ZTogZnVuY3Rpb24gaGFuZGxlTmV3U3RhdGUoZSkge1xuICAgICAgICAgICAgICAgIHZhciByZXN1bHRzID0gdGhpcy5fcm91dGVSZWNvZ25pemVyLnJlY29nbml6ZSh3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUpO1xuXG4gICAgICAgICAgICAgICAgaWYgKHJlc3VsdHMpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5faW52b2tlSGFuZGxlcnMocmVzdWx0cywgZSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fbG9nKCdubyByb3V0ZXMgbWF0Y2hlZCEnKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX2RlZmF1bHRSb3V0ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pbnZva2VIYW5kbGVyKHRoaXMuX2RlZmF1bHRSb3V0ZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGtleTogJ25hdmlnYXRlVG8nLFxuICAgICAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIG5hdmlnYXRlVG8ocGF0aCkge1xuICAgICAgICAgICAgICAgIHdpbmRvdy5oaXN0b3J5LnB1c2hTdGF0ZSh7IHNvbWVTdGF0ZTogMSB9LCBwYXRoLCBwYXRoKTtcbiAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZU5ld1N0YXRlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGtleTogJ2JhY2snLFxuICAgICAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIGJhY2soKSB7XG4gICAgICAgICAgICAgICAgd2luZG93Lmhpc3RvcnkuYmFjaygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBrZXk6ICdmb3J3YXJkJyxcbiAgICAgICAgICAgIHZhbHVlOiBmdW5jdGlvbiBmb3J3YXJkKCkge1xuICAgICAgICAgICAgICAgIHdpbmRvdy5oaXN0b3J5LmZvcndhcmQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfV0pO1xuXG4gICAgICAgIHJldHVybiBSb3V0ZXJDbGFzc19fUm91dGVyO1xuICAgIH0pKCk7XG5cbiAgICB2YXIgUm91dGVyQ2xhc3MgPSBSb3V0ZXJDbGFzc19fUm91dGVyO1xuXG4gICAgdmFyIEdMVSA9IChmdW5jdGlvbiAoKSB7XG4gICAgICAgIGZ1bmN0aW9uIEdMVSgpIHtcbiAgICAgICAgICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBHTFUpO1xuICAgICAgICB9XG5cbiAgICAgICAgX2NyZWF0ZUNsYXNzKEdMVSwgW3tcbiAgICAgICAgICAgIGtleTogJ2NvbnN0YW50cycsXG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gQ29uc3RhbnRzO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBrZXk6ICdidXMnLFxuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIEV2ZW50YnVzO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBrZXk6ICdkaXNwYXRjaGVyJyxcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9kaXNwYXRjaGVyO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBrZXk6ICdSb3V0ZXInLFxuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFJvdXRlckNsYXNzO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBrZXk6ICdWaWV3JyxcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBjb3JlX0Jhc2VWaWV3O1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBrZXk6ICdWaWV3Q29udHJvbGxlcicsXG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gY29yZV9CYXNlVmlld0NvbnRyb2xsZXI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGtleTogJ0FjdGlvbicsXG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gY29yZV9CYXNlQWN0aW9uO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBrZXk6ICdTdG9yZScsXG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gY29yZV9CYXNlU3RvcmU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1dKTtcblxuICAgICAgICByZXR1cm4gR0xVO1xuICAgIH0pKCk7XG5cbiAgICB2YXIgZ2x1ID0gbmV3IEdMVSgpO1xuICAgIHZhciBpbmRleCA9IGdsdTtcblxuICAgIHJldHVybiBpbmRleDtcbn0pO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Li9nbHUtZGlzdC5qcy5tYXAiLCJ2YXIgcFNsaWNlID0gQXJyYXkucHJvdG90eXBlLnNsaWNlO1xudmFyIG9iamVjdEtleXMgPSByZXF1aXJlKCcuL2xpYi9rZXlzLmpzJyk7XG52YXIgaXNBcmd1bWVudHMgPSByZXF1aXJlKCcuL2xpYi9pc19hcmd1bWVudHMuanMnKTtcblxudmFyIGRlZXBFcXVhbCA9IG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGFjdHVhbCwgZXhwZWN0ZWQsIG9wdHMpIHtcbiAgaWYgKCFvcHRzKSBvcHRzID0ge307XG4gIC8vIDcuMS4gQWxsIGlkZW50aWNhbCB2YWx1ZXMgYXJlIGVxdWl2YWxlbnQsIGFzIGRldGVybWluZWQgYnkgPT09LlxuICBpZiAoYWN0dWFsID09PSBleHBlY3RlZCkge1xuICAgIHJldHVybiB0cnVlO1xuXG4gIH0gZWxzZSBpZiAoYWN0dWFsIGluc3RhbmNlb2YgRGF0ZSAmJiBleHBlY3RlZCBpbnN0YW5jZW9mIERhdGUpIHtcbiAgICByZXR1cm4gYWN0dWFsLmdldFRpbWUoKSA9PT0gZXhwZWN0ZWQuZ2V0VGltZSgpO1xuXG4gIC8vIDcuMy4gT3RoZXIgcGFpcnMgdGhhdCBkbyBub3QgYm90aCBwYXNzIHR5cGVvZiB2YWx1ZSA9PSAnb2JqZWN0JyxcbiAgLy8gZXF1aXZhbGVuY2UgaXMgZGV0ZXJtaW5lZCBieSA9PS5cbiAgfSBlbHNlIGlmICh0eXBlb2YgYWN0dWFsICE9ICdvYmplY3QnICYmIHR5cGVvZiBleHBlY3RlZCAhPSAnb2JqZWN0Jykge1xuICAgIHJldHVybiBvcHRzLnN0cmljdCA/IGFjdHVhbCA9PT0gZXhwZWN0ZWQgOiBhY3R1YWwgPT0gZXhwZWN0ZWQ7XG5cbiAgLy8gNy40LiBGb3IgYWxsIG90aGVyIE9iamVjdCBwYWlycywgaW5jbHVkaW5nIEFycmF5IG9iamVjdHMsIGVxdWl2YWxlbmNlIGlzXG4gIC8vIGRldGVybWluZWQgYnkgaGF2aW5nIHRoZSBzYW1lIG51bWJlciBvZiBvd25lZCBwcm9wZXJ0aWVzIChhcyB2ZXJpZmllZFxuICAvLyB3aXRoIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbCksIHRoZSBzYW1lIHNldCBvZiBrZXlzXG4gIC8vIChhbHRob3VnaCBub3QgbmVjZXNzYXJpbHkgdGhlIHNhbWUgb3JkZXIpLCBlcXVpdmFsZW50IHZhbHVlcyBmb3IgZXZlcnlcbiAgLy8gY29ycmVzcG9uZGluZyBrZXksIGFuZCBhbiBpZGVudGljYWwgJ3Byb3RvdHlwZScgcHJvcGVydHkuIE5vdGU6IHRoaXNcbiAgLy8gYWNjb3VudHMgZm9yIGJvdGggbmFtZWQgYW5kIGluZGV4ZWQgcHJvcGVydGllcyBvbiBBcnJheXMuXG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIG9iakVxdWl2KGFjdHVhbCwgZXhwZWN0ZWQsIG9wdHMpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGlzVW5kZWZpbmVkT3JOdWxsKHZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZSA9PT0gbnVsbCB8fCB2YWx1ZSA9PT0gdW5kZWZpbmVkO1xufVxuXG5mdW5jdGlvbiBpc0J1ZmZlciAoeCkge1xuICBpZiAoIXggfHwgdHlwZW9mIHggIT09ICdvYmplY3QnIHx8IHR5cGVvZiB4Lmxlbmd0aCAhPT0gJ251bWJlcicpIHJldHVybiBmYWxzZTtcbiAgaWYgKHR5cGVvZiB4LmNvcHkgIT09ICdmdW5jdGlvbicgfHwgdHlwZW9mIHguc2xpY2UgIT09ICdmdW5jdGlvbicpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgaWYgKHgubGVuZ3RoID4gMCAmJiB0eXBlb2YgeFswXSAhPT0gJ251bWJlcicpIHJldHVybiBmYWxzZTtcbiAgcmV0dXJuIHRydWU7XG59XG5cbmZ1bmN0aW9uIG9iakVxdWl2KGEsIGIsIG9wdHMpIHtcbiAgdmFyIGksIGtleTtcbiAgaWYgKGlzVW5kZWZpbmVkT3JOdWxsKGEpIHx8IGlzVW5kZWZpbmVkT3JOdWxsKGIpKVxuICAgIHJldHVybiBmYWxzZTtcbiAgLy8gYW4gaWRlbnRpY2FsICdwcm90b3R5cGUnIHByb3BlcnR5LlxuICBpZiAoYS5wcm90b3R5cGUgIT09IGIucHJvdG90eXBlKSByZXR1cm4gZmFsc2U7XG4gIC8vfn5+SSd2ZSBtYW5hZ2VkIHRvIGJyZWFrIE9iamVjdC5rZXlzIHRocm91Z2ggc2NyZXd5IGFyZ3VtZW50cyBwYXNzaW5nLlxuICAvLyAgIENvbnZlcnRpbmcgdG8gYXJyYXkgc29sdmVzIHRoZSBwcm9ibGVtLlxuICBpZiAoaXNBcmd1bWVudHMoYSkpIHtcbiAgICBpZiAoIWlzQXJndW1lbnRzKGIpKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGEgPSBwU2xpY2UuY2FsbChhKTtcbiAgICBiID0gcFNsaWNlLmNhbGwoYik7XG4gICAgcmV0dXJuIGRlZXBFcXVhbChhLCBiLCBvcHRzKTtcbiAgfVxuICBpZiAoaXNCdWZmZXIoYSkpIHtcbiAgICBpZiAoIWlzQnVmZmVyKGIpKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGlmIChhLmxlbmd0aCAhPT0gYi5sZW5ndGgpIHJldHVybiBmYWxzZTtcbiAgICBmb3IgKGkgPSAwOyBpIDwgYS5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKGFbaV0gIT09IGJbaV0pIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgdHJ5IHtcbiAgICB2YXIga2EgPSBvYmplY3RLZXlzKGEpLFxuICAgICAgICBrYiA9IG9iamVjdEtleXMoYik7XG4gIH0gY2F0Y2ggKGUpIHsvL2hhcHBlbnMgd2hlbiBvbmUgaXMgYSBzdHJpbmcgbGl0ZXJhbCBhbmQgdGhlIG90aGVyIGlzbid0XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIC8vIGhhdmluZyB0aGUgc2FtZSBudW1iZXIgb2Ygb3duZWQgcHJvcGVydGllcyAoa2V5cyBpbmNvcnBvcmF0ZXNcbiAgLy8gaGFzT3duUHJvcGVydHkpXG4gIGlmIChrYS5sZW5ndGggIT0ga2IubGVuZ3RoKVxuICAgIHJldHVybiBmYWxzZTtcbiAgLy90aGUgc2FtZSBzZXQgb2Yga2V5cyAoYWx0aG91Z2ggbm90IG5lY2Vzc2FyaWx5IHRoZSBzYW1lIG9yZGVyKSxcbiAga2Euc29ydCgpO1xuICBrYi5zb3J0KCk7XG4gIC8vfn5+Y2hlYXAga2V5IHRlc3RcbiAgZm9yIChpID0ga2EubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICBpZiAoa2FbaV0gIT0ga2JbaV0pXG4gICAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgLy9lcXVpdmFsZW50IHZhbHVlcyBmb3IgZXZlcnkgY29ycmVzcG9uZGluZyBrZXksIGFuZFxuICAvL35+fnBvc3NpYmx5IGV4cGVuc2l2ZSBkZWVwIHRlc3RcbiAgZm9yIChpID0ga2EubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICBrZXkgPSBrYVtpXTtcbiAgICBpZiAoIWRlZXBFcXVhbChhW2tleV0sIGJba2V5XSwgb3B0cykpIHJldHVybiBmYWxzZTtcbiAgfVxuICByZXR1cm4gdHlwZW9mIGEgPT09IHR5cGVvZiBiO1xufVxuIiwidmFyIHN1cHBvcnRzQXJndW1lbnRzQ2xhc3MgPSAoZnVuY3Rpb24oKXtcbiAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChhcmd1bWVudHMpXG59KSgpID09ICdbb2JqZWN0IEFyZ3VtZW50c10nO1xuXG5leHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSBzdXBwb3J0c0FyZ3VtZW50c0NsYXNzID8gc3VwcG9ydGVkIDogdW5zdXBwb3J0ZWQ7XG5cbmV4cG9ydHMuc3VwcG9ydGVkID0gc3VwcG9ydGVkO1xuZnVuY3Rpb24gc3VwcG9ydGVkKG9iamVjdCkge1xuICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG9iamVjdCkgPT0gJ1tvYmplY3QgQXJndW1lbnRzXSc7XG59O1xuXG5leHBvcnRzLnVuc3VwcG9ydGVkID0gdW5zdXBwb3J0ZWQ7XG5mdW5jdGlvbiB1bnN1cHBvcnRlZChvYmplY3Qpe1xuICByZXR1cm4gb2JqZWN0ICYmXG4gICAgdHlwZW9mIG9iamVjdCA9PSAnb2JqZWN0JyAmJlxuICAgIHR5cGVvZiBvYmplY3QubGVuZ3RoID09ICdudW1iZXInICYmXG4gICAgT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgJ2NhbGxlZScpICYmXG4gICAgIU9iamVjdC5wcm90b3R5cGUucHJvcGVydHlJc0VudW1lcmFibGUuY2FsbChvYmplY3QsICdjYWxsZWUnKSB8fFxuICAgIGZhbHNlO1xufTtcbiIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHR5cGVvZiBPYmplY3Qua2V5cyA9PT0gJ2Z1bmN0aW9uJ1xuICA/IE9iamVjdC5rZXlzIDogc2hpbTtcblxuZXhwb3J0cy5zaGltID0gc2hpbTtcbmZ1bmN0aW9uIHNoaW0gKG9iaikge1xuICB2YXIga2V5cyA9IFtdO1xuICBmb3IgKHZhciBrZXkgaW4gb2JqKSBrZXlzLnB1c2goa2V5KTtcbiAgcmV0dXJuIGtleXM7XG59XG4iLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogUmVwcmVzZW50YXRpb24gb2YgYSBzaW5nbGUgRXZlbnRFbWl0dGVyIGZ1bmN0aW9uLlxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIEV2ZW50IGhhbmRsZXIgdG8gYmUgY2FsbGVkLlxuICogQHBhcmFtIHtNaXhlZH0gY29udGV4dCBDb250ZXh0IGZvciBmdW5jdGlvbiBleGVjdXRpb24uXG4gKiBAcGFyYW0ge0Jvb2xlYW59IG9uY2UgT25seSBlbWl0IG9uY2VcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBFRShmbiwgY29udGV4dCwgb25jZSkge1xuICB0aGlzLmZuID0gZm47XG4gIHRoaXMuY29udGV4dCA9IGNvbnRleHQ7XG4gIHRoaXMub25jZSA9IG9uY2UgfHwgZmFsc2U7XG59XG5cbi8qKlxuICogTWluaW1hbCBFdmVudEVtaXR0ZXIgaW50ZXJmYWNlIHRoYXQgaXMgbW9sZGVkIGFnYWluc3QgdGhlIE5vZGUuanNcbiAqIEV2ZW50RW1pdHRlciBpbnRlcmZhY2UuXG4gKlxuICogQGNvbnN0cnVjdG9yXG4gKiBAYXBpIHB1YmxpY1xuICovXG5mdW5jdGlvbiBFdmVudEVtaXR0ZXIoKSB7IC8qIE5vdGhpbmcgdG8gc2V0ICovIH1cblxuLyoqXG4gKiBIb2xkcyB0aGUgYXNzaWduZWQgRXZlbnRFbWl0dGVycyBieSBuYW1lLlxuICpcbiAqIEB0eXBlIHtPYmplY3R9XG4gKiBAcHJpdmF0ZVxuICovXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLl9ldmVudHMgPSB1bmRlZmluZWQ7XG5cbi8qKlxuICogUmV0dXJuIGEgbGlzdCBvZiBhc3NpZ25lZCBldmVudCBsaXN0ZW5lcnMuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50IFRoZSBldmVudHMgdGhhdCBzaG91bGQgYmUgbGlzdGVkLlxuICogQHJldHVybnMge0FycmF5fVxuICogQGFwaSBwdWJsaWNcbiAqL1xuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5saXN0ZW5lcnMgPSBmdW5jdGlvbiBsaXN0ZW5lcnMoZXZlbnQpIHtcbiAgaWYgKCF0aGlzLl9ldmVudHMgfHwgIXRoaXMuX2V2ZW50c1tldmVudF0pIHJldHVybiBbXTtcbiAgaWYgKHRoaXMuX2V2ZW50c1tldmVudF0uZm4pIHJldHVybiBbdGhpcy5fZXZlbnRzW2V2ZW50XS5mbl07XG5cbiAgZm9yICh2YXIgaSA9IDAsIGwgPSB0aGlzLl9ldmVudHNbZXZlbnRdLmxlbmd0aCwgZWUgPSBuZXcgQXJyYXkobCk7IGkgPCBsOyBpKyspIHtcbiAgICBlZVtpXSA9IHRoaXMuX2V2ZW50c1tldmVudF1baV0uZm47XG4gIH1cblxuICByZXR1cm4gZWU7XG59O1xuXG4vKipcbiAqIEVtaXQgYW4gZXZlbnQgdG8gYWxsIHJlZ2lzdGVyZWQgZXZlbnQgbGlzdGVuZXJzLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudCBUaGUgbmFtZSBvZiB0aGUgZXZlbnQuXG4gKiBAcmV0dXJucyB7Qm9vbGVhbn0gSW5kaWNhdGlvbiBpZiB3ZSd2ZSBlbWl0dGVkIGFuIGV2ZW50LlxuICogQGFwaSBwdWJsaWNcbiAqL1xuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5lbWl0ID0gZnVuY3Rpb24gZW1pdChldmVudCwgYTEsIGEyLCBhMywgYTQsIGE1KSB7XG4gIGlmICghdGhpcy5fZXZlbnRzIHx8ICF0aGlzLl9ldmVudHNbZXZlbnRdKSByZXR1cm4gZmFsc2U7XG5cbiAgdmFyIGxpc3RlbmVycyA9IHRoaXMuX2V2ZW50c1tldmVudF1cbiAgICAsIGxlbiA9IGFyZ3VtZW50cy5sZW5ndGhcbiAgICAsIGFyZ3NcbiAgICAsIGk7XG5cbiAgaWYgKCdmdW5jdGlvbicgPT09IHR5cGVvZiBsaXN0ZW5lcnMuZm4pIHtcbiAgICBpZiAobGlzdGVuZXJzLm9uY2UpIHRoaXMucmVtb3ZlTGlzdGVuZXIoZXZlbnQsIGxpc3RlbmVycy5mbiwgdHJ1ZSk7XG5cbiAgICBzd2l0Y2ggKGxlbikge1xuICAgICAgY2FzZSAxOiByZXR1cm4gbGlzdGVuZXJzLmZuLmNhbGwobGlzdGVuZXJzLmNvbnRleHQpLCB0cnVlO1xuICAgICAgY2FzZSAyOiByZXR1cm4gbGlzdGVuZXJzLmZuLmNhbGwobGlzdGVuZXJzLmNvbnRleHQsIGExKSwgdHJ1ZTtcbiAgICAgIGNhc2UgMzogcmV0dXJuIGxpc3RlbmVycy5mbi5jYWxsKGxpc3RlbmVycy5jb250ZXh0LCBhMSwgYTIpLCB0cnVlO1xuICAgICAgY2FzZSA0OiByZXR1cm4gbGlzdGVuZXJzLmZuLmNhbGwobGlzdGVuZXJzLmNvbnRleHQsIGExLCBhMiwgYTMpLCB0cnVlO1xuICAgICAgY2FzZSA1OiByZXR1cm4gbGlzdGVuZXJzLmZuLmNhbGwobGlzdGVuZXJzLmNvbnRleHQsIGExLCBhMiwgYTMsIGE0KSwgdHJ1ZTtcbiAgICAgIGNhc2UgNjogcmV0dXJuIGxpc3RlbmVycy5mbi5jYWxsKGxpc3RlbmVycy5jb250ZXh0LCBhMSwgYTIsIGEzLCBhNCwgYTUpLCB0cnVlO1xuICAgIH1cblxuICAgIGZvciAoaSA9IDEsIGFyZ3MgPSBuZXcgQXJyYXkobGVuIC0xKTsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICBhcmdzW2kgLSAxXSA9IGFyZ3VtZW50c1tpXTtcbiAgICB9XG5cbiAgICBsaXN0ZW5lcnMuZm4uYXBwbHkobGlzdGVuZXJzLmNvbnRleHQsIGFyZ3MpO1xuICB9IGVsc2Uge1xuICAgIHZhciBsZW5ndGggPSBsaXN0ZW5lcnMubGVuZ3RoXG4gICAgICAsIGo7XG5cbiAgICBmb3IgKGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmIChsaXN0ZW5lcnNbaV0ub25jZSkgdGhpcy5yZW1vdmVMaXN0ZW5lcihldmVudCwgbGlzdGVuZXJzW2ldLmZuLCB0cnVlKTtcblxuICAgICAgc3dpdGNoIChsZW4pIHtcbiAgICAgICAgY2FzZSAxOiBsaXN0ZW5lcnNbaV0uZm4uY2FsbChsaXN0ZW5lcnNbaV0uY29udGV4dCk7IGJyZWFrO1xuICAgICAgICBjYXNlIDI6IGxpc3RlbmVyc1tpXS5mbi5jYWxsKGxpc3RlbmVyc1tpXS5jb250ZXh0LCBhMSk7IGJyZWFrO1xuICAgICAgICBjYXNlIDM6IGxpc3RlbmVyc1tpXS5mbi5jYWxsKGxpc3RlbmVyc1tpXS5jb250ZXh0LCBhMSwgYTIpOyBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICBpZiAoIWFyZ3MpIGZvciAoaiA9IDEsIGFyZ3MgPSBuZXcgQXJyYXkobGVuIC0xKTsgaiA8IGxlbjsgaisrKSB7XG4gICAgICAgICAgICBhcmdzW2ogLSAxXSA9IGFyZ3VtZW50c1tqXTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBsaXN0ZW5lcnNbaV0uZm4uYXBwbHkobGlzdGVuZXJzW2ldLmNvbnRleHQsIGFyZ3MpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0cnVlO1xufTtcblxuLyoqXG4gKiBSZWdpc3RlciBhIG5ldyBFdmVudExpc3RlbmVyIGZvciB0aGUgZ2l2ZW4gZXZlbnQuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50IE5hbWUgb2YgdGhlIGV2ZW50LlxuICogQHBhcmFtIHtGdW5jdG9ufSBmbiBDYWxsYmFjayBmdW5jdGlvbi5cbiAqIEBwYXJhbSB7TWl4ZWR9IGNvbnRleHQgVGhlIGNvbnRleHQgb2YgdGhlIGZ1bmN0aW9uLlxuICogQGFwaSBwdWJsaWNcbiAqL1xuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5vbiA9IGZ1bmN0aW9uIG9uKGV2ZW50LCBmbiwgY29udGV4dCkge1xuICB2YXIgbGlzdGVuZXIgPSBuZXcgRUUoZm4sIGNvbnRleHQgfHwgdGhpcyk7XG5cbiAgaWYgKCF0aGlzLl9ldmVudHMpIHRoaXMuX2V2ZW50cyA9IHt9O1xuICBpZiAoIXRoaXMuX2V2ZW50c1tldmVudF0pIHRoaXMuX2V2ZW50c1tldmVudF0gPSBsaXN0ZW5lcjtcbiAgZWxzZSB7XG4gICAgaWYgKCF0aGlzLl9ldmVudHNbZXZlbnRdLmZuKSB0aGlzLl9ldmVudHNbZXZlbnRdLnB1c2gobGlzdGVuZXIpO1xuICAgIGVsc2UgdGhpcy5fZXZlbnRzW2V2ZW50XSA9IFtcbiAgICAgIHRoaXMuX2V2ZW50c1tldmVudF0sIGxpc3RlbmVyXG4gICAgXTtcbiAgfVxuXG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBBZGQgYW4gRXZlbnRMaXN0ZW5lciB0aGF0J3Mgb25seSBjYWxsZWQgb25jZS5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnQgTmFtZSBvZiB0aGUgZXZlbnQuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBDYWxsYmFjayBmdW5jdGlvbi5cbiAqIEBwYXJhbSB7TWl4ZWR9IGNvbnRleHQgVGhlIGNvbnRleHQgb2YgdGhlIGZ1bmN0aW9uLlxuICogQGFwaSBwdWJsaWNcbiAqL1xuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5vbmNlID0gZnVuY3Rpb24gb25jZShldmVudCwgZm4sIGNvbnRleHQpIHtcbiAgdmFyIGxpc3RlbmVyID0gbmV3IEVFKGZuLCBjb250ZXh0IHx8IHRoaXMsIHRydWUpO1xuXG4gIGlmICghdGhpcy5fZXZlbnRzKSB0aGlzLl9ldmVudHMgPSB7fTtcbiAgaWYgKCF0aGlzLl9ldmVudHNbZXZlbnRdKSB0aGlzLl9ldmVudHNbZXZlbnRdID0gbGlzdGVuZXI7XG4gIGVsc2Uge1xuICAgIGlmICghdGhpcy5fZXZlbnRzW2V2ZW50XS5mbikgdGhpcy5fZXZlbnRzW2V2ZW50XS5wdXNoKGxpc3RlbmVyKTtcbiAgICBlbHNlIHRoaXMuX2V2ZW50c1tldmVudF0gPSBbXG4gICAgICB0aGlzLl9ldmVudHNbZXZlbnRdLCBsaXN0ZW5lclxuICAgIF07XG4gIH1cblxuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogUmVtb3ZlIGV2ZW50IGxpc3RlbmVycy5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnQgVGhlIGV2ZW50IHdlIHdhbnQgdG8gcmVtb3ZlLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGxpc3RlbmVyIHRoYXQgd2UgbmVlZCB0byBmaW5kLlxuICogQHBhcmFtIHtCb29sZWFufSBvbmNlIE9ubHkgcmVtb3ZlIG9uY2UgbGlzdGVuZXJzLlxuICogQGFwaSBwdWJsaWNcbiAqL1xuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVMaXN0ZW5lciA9IGZ1bmN0aW9uIHJlbW92ZUxpc3RlbmVyKGV2ZW50LCBmbiwgb25jZSkge1xuICBpZiAoIXRoaXMuX2V2ZW50cyB8fCAhdGhpcy5fZXZlbnRzW2V2ZW50XSkgcmV0dXJuIHRoaXM7XG5cbiAgdmFyIGxpc3RlbmVycyA9IHRoaXMuX2V2ZW50c1tldmVudF1cbiAgICAsIGV2ZW50cyA9IFtdO1xuXG4gIGlmIChmbikge1xuICAgIGlmIChsaXN0ZW5lcnMuZm4gJiYgKGxpc3RlbmVycy5mbiAhPT0gZm4gfHwgKG9uY2UgJiYgIWxpc3RlbmVycy5vbmNlKSkpIHtcbiAgICAgIGV2ZW50cy5wdXNoKGxpc3RlbmVycyk7XG4gICAgfVxuICAgIGlmICghbGlzdGVuZXJzLmZuKSBmb3IgKHZhciBpID0gMCwgbGVuZ3RoID0gbGlzdGVuZXJzLmxlbmd0aDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAobGlzdGVuZXJzW2ldLmZuICE9PSBmbiB8fCAob25jZSAmJiAhbGlzdGVuZXJzW2ldLm9uY2UpKSB7XG4gICAgICAgIGV2ZW50cy5wdXNoKGxpc3RlbmVyc1tpXSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLy9cbiAgLy8gUmVzZXQgdGhlIGFycmF5LCBvciByZW1vdmUgaXQgY29tcGxldGVseSBpZiB3ZSBoYXZlIG5vIG1vcmUgbGlzdGVuZXJzLlxuICAvL1xuICBpZiAoZXZlbnRzLmxlbmd0aCkge1xuICAgIHRoaXMuX2V2ZW50c1tldmVudF0gPSBldmVudHMubGVuZ3RoID09PSAxID8gZXZlbnRzWzBdIDogZXZlbnRzO1xuICB9IGVsc2Uge1xuICAgIGRlbGV0ZSB0aGlzLl9ldmVudHNbZXZlbnRdO1xuICB9XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIFJlbW92ZSBhbGwgbGlzdGVuZXJzIG9yIG9ubHkgdGhlIGxpc3RlbmVycyBmb3IgdGhlIHNwZWNpZmllZCBldmVudC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnQgVGhlIGV2ZW50IHdhbnQgdG8gcmVtb3ZlIGFsbCBsaXN0ZW5lcnMgZm9yLlxuICogQGFwaSBwdWJsaWNcbiAqL1xuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVBbGxMaXN0ZW5lcnMgPSBmdW5jdGlvbiByZW1vdmVBbGxMaXN0ZW5lcnMoZXZlbnQpIHtcbiAgaWYgKCF0aGlzLl9ldmVudHMpIHJldHVybiB0aGlzO1xuXG4gIGlmIChldmVudCkgZGVsZXRlIHRoaXMuX2V2ZW50c1tldmVudF07XG4gIGVsc2UgdGhpcy5fZXZlbnRzID0ge307XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vL1xuLy8gQWxpYXMgbWV0aG9kcyBuYW1lcyBiZWNhdXNlIHBlb3BsZSByb2xsIGxpa2UgdGhhdC5cbi8vXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLm9mZiA9IEV2ZW50RW1pdHRlci5wcm90b3R5cGUucmVtb3ZlTGlzdGVuZXI7XG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmFkZExpc3RlbmVyID0gRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5vbjtcblxuLy9cbi8vIFRoaXMgZnVuY3Rpb24gZG9lc24ndCBhcHBseSBhbnltb3JlLlxuLy9cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuc2V0TWF4TGlzdGVuZXJzID0gZnVuY3Rpb24gc2V0TWF4TGlzdGVuZXJzKCkge1xuICByZXR1cm4gdGhpcztcbn07XG5cbi8vXG4vLyBFeHBvc2UgdGhlIG1vZHVsZS5cbi8vXG5FdmVudEVtaXR0ZXIuRXZlbnRFbWl0dGVyID0gRXZlbnRFbWl0dGVyO1xuRXZlbnRFbWl0dGVyLkV2ZW50RW1pdHRlcjIgPSBFdmVudEVtaXR0ZXI7XG5FdmVudEVtaXR0ZXIuRXZlbnRFbWl0dGVyMyA9IEV2ZW50RW1pdHRlcjtcblxuLy9cbi8vIEV4cG9zZSB0aGUgbW9kdWxlLlxuLy9cbm1vZHVsZS5leHBvcnRzID0gRXZlbnRFbWl0dGVyO1xuIiwidmFyIGJhc2VJbmRleE9mID0gcmVxdWlyZSgnLi4vaW50ZXJuYWwvYmFzZUluZGV4T2YnKSxcbiAgICBjYWNoZUluZGV4T2YgPSByZXF1aXJlKCcuLi9pbnRlcm5hbC9jYWNoZUluZGV4T2YnKSxcbiAgICBjcmVhdGVDYWNoZSA9IHJlcXVpcmUoJy4uL2ludGVybmFsL2NyZWF0ZUNhY2hlJyksXG4gICAgaXNBcmd1bWVudHMgPSByZXF1aXJlKCcuLi9sYW5nL2lzQXJndW1lbnRzJyksXG4gICAgaXNBcnJheSA9IHJlcXVpcmUoJy4uL2xhbmcvaXNBcnJheScpO1xuXG4vKipcbiAqIENyZWF0ZXMgYW4gYXJyYXkgb2YgdW5pcXVlIHZhbHVlcyBpbiBhbGwgcHJvdmlkZWQgYXJyYXlzIHVzaW5nIGBTYW1lVmFsdWVaZXJvYFxuICogZm9yIGVxdWFsaXR5IGNvbXBhcmlzb25zLlxuICpcbiAqICoqTm90ZToqKiBbYFNhbWVWYWx1ZVplcm9gXShodHRwczovL3Blb3BsZS5tb3ppbGxhLm9yZy9+am9yZW5kb3JmZi9lczYtZHJhZnQuaHRtbCNzZWMtc2FtZXZhbHVlemVybylcbiAqIGNvbXBhcmlzb25zIGFyZSBsaWtlIHN0cmljdCBlcXVhbGl0eSBjb21wYXJpc29ucywgZS5nLiBgPT09YCwgZXhjZXB0IHRoYXRcbiAqIGBOYU5gIG1hdGNoZXMgYE5hTmAuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBBcnJheVxuICogQHBhcmFtIHsuLi5BcnJheX0gW2FycmF5c10gVGhlIGFycmF5cyB0byBpbnNwZWN0LlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBuZXcgYXJyYXkgb2Ygc2hhcmVkIHZhbHVlcy5cbiAqIEBleGFtcGxlXG4gKiBfLmludGVyc2VjdGlvbihbMSwgMl0sIFs0LCAyXSwgWzIsIDFdKTtcbiAqIC8vID0+IFsyXVxuICovXG5mdW5jdGlvbiBpbnRlcnNlY3Rpb24oKSB7XG4gIHZhciBhcmdzID0gW10sXG4gICAgICBhcmdzSW5kZXggPSAtMSxcbiAgICAgIGFyZ3NMZW5ndGggPSBhcmd1bWVudHMubGVuZ3RoLFxuICAgICAgY2FjaGVzID0gW10sXG4gICAgICBpbmRleE9mID0gYmFzZUluZGV4T2YsXG4gICAgICBpc0NvbW1vbiA9IHRydWU7XG5cbiAgd2hpbGUgKCsrYXJnc0luZGV4IDwgYXJnc0xlbmd0aCkge1xuICAgIHZhciB2YWx1ZSA9IGFyZ3VtZW50c1thcmdzSW5kZXhdO1xuICAgIGlmIChpc0FycmF5KHZhbHVlKSB8fCBpc0FyZ3VtZW50cyh2YWx1ZSkpIHtcbiAgICAgIGFyZ3MucHVzaCh2YWx1ZSk7XG4gICAgICBjYWNoZXMucHVzaCgoaXNDb21tb24gJiYgdmFsdWUubGVuZ3RoID49IDEyMCkgPyBjcmVhdGVDYWNoZShhcmdzSW5kZXggJiYgdmFsdWUpIDogbnVsbCk7XG4gICAgfVxuICB9XG4gIGFyZ3NMZW5ndGggPSBhcmdzLmxlbmd0aDtcbiAgdmFyIGFycmF5ID0gYXJnc1swXSxcbiAgICAgIGluZGV4ID0gLTEsXG4gICAgICBsZW5ndGggPSBhcnJheSA/IGFycmF5Lmxlbmd0aCA6IDAsXG4gICAgICByZXN1bHQgPSBbXSxcbiAgICAgIHNlZW4gPSBjYWNoZXNbMF07XG5cbiAgb3V0ZXI6XG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgdmFsdWUgPSBhcnJheVtpbmRleF07XG4gICAgaWYgKChzZWVuID8gY2FjaGVJbmRleE9mKHNlZW4sIHZhbHVlKSA6IGluZGV4T2YocmVzdWx0LCB2YWx1ZSwgMCkpIDwgMCkge1xuICAgICAgYXJnc0luZGV4ID0gYXJnc0xlbmd0aDtcbiAgICAgIHdoaWxlICgtLWFyZ3NJbmRleCkge1xuICAgICAgICB2YXIgY2FjaGUgPSBjYWNoZXNbYXJnc0luZGV4XTtcbiAgICAgICAgaWYgKChjYWNoZSA/IGNhY2hlSW5kZXhPZihjYWNoZSwgdmFsdWUpIDogaW5kZXhPZihhcmdzW2FyZ3NJbmRleF0sIHZhbHVlLCAwKSkgPCAwKSB7XG4gICAgICAgICAgY29udGludWUgb3V0ZXI7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChzZWVuKSB7XG4gICAgICAgIHNlZW4ucHVzaCh2YWx1ZSk7XG4gICAgICB9XG4gICAgICByZXN1bHQucHVzaCh2YWx1ZSk7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaW50ZXJzZWN0aW9uO1xuIiwidmFyIGJhc2VDYWxsYmFjayA9IHJlcXVpcmUoJy4uL2ludGVybmFsL2Jhc2VDYWxsYmFjaycpLFxuICAgIGJhc2VVbmlxID0gcmVxdWlyZSgnLi4vaW50ZXJuYWwvYmFzZVVuaXEnKSxcbiAgICBpc0l0ZXJhdGVlQ2FsbCA9IHJlcXVpcmUoJy4uL2ludGVybmFsL2lzSXRlcmF0ZWVDYWxsJyksXG4gICAgc29ydGVkVW5pcSA9IHJlcXVpcmUoJy4uL2ludGVybmFsL3NvcnRlZFVuaXEnKTtcblxuLyoqXG4gKiBDcmVhdGVzIGEgZHVwbGljYXRlLXZhbHVlLWZyZWUgdmVyc2lvbiBvZiBhbiBhcnJheSB1c2luZyBgU2FtZVZhbHVlWmVyb2BcbiAqIGZvciBlcXVhbGl0eSBjb21wYXJpc29ucy4gUHJvdmlkaW5nIGB0cnVlYCBmb3IgYGlzU29ydGVkYCBwZXJmb3JtcyBhIGZhc3RlclxuICogc2VhcmNoIGFsZ29yaXRobSBmb3Igc29ydGVkIGFycmF5cy4gSWYgYW4gaXRlcmF0ZWUgZnVuY3Rpb24gaXMgcHJvdmlkZWQgaXRcbiAqIGlzIGludm9rZWQgZm9yIGVhY2ggdmFsdWUgaW4gdGhlIGFycmF5IHRvIGdlbmVyYXRlIHRoZSBjcml0ZXJpb24gYnkgd2hpY2hcbiAqIHVuaXF1ZW5lc3MgaXMgY29tcHV0ZWQuIFRoZSBgaXRlcmF0ZWVgIGlzIGJvdW5kIHRvIGB0aGlzQXJnYCBhbmQgaW52b2tlZFxuICogd2l0aCB0aHJlZSBhcmd1bWVudHM6ICh2YWx1ZSwgaW5kZXgsIGFycmF5KS5cbiAqXG4gKiBJZiBhIHByb3BlcnR5IG5hbWUgaXMgcHJvdmlkZWQgZm9yIGBpdGVyYXRlZWAgdGhlIGNyZWF0ZWQgYF8ucHJvcGVydHlgXG4gKiBzdHlsZSBjYWxsYmFjayByZXR1cm5zIHRoZSBwcm9wZXJ0eSB2YWx1ZSBvZiB0aGUgZ2l2ZW4gZWxlbWVudC5cbiAqXG4gKiBJZiBhIHZhbHVlIGlzIGFsc28gcHJvdmlkZWQgZm9yIGB0aGlzQXJnYCB0aGUgY3JlYXRlZCBgXy5tYXRjaGVzUHJvcGVydHlgXG4gKiBzdHlsZSBjYWxsYmFjayByZXR1cm5zIGB0cnVlYCBmb3IgZWxlbWVudHMgdGhhdCBoYXZlIGEgbWF0Y2hpbmcgcHJvcGVydHlcbiAqIHZhbHVlLCBlbHNlIGBmYWxzZWAuXG4gKlxuICogSWYgYW4gb2JqZWN0IGlzIHByb3ZpZGVkIGZvciBgaXRlcmF0ZWVgIHRoZSBjcmVhdGVkIGBfLm1hdGNoZXNgIHN0eWxlXG4gKiBjYWxsYmFjayByZXR1cm5zIGB0cnVlYCBmb3IgZWxlbWVudHMgdGhhdCBoYXZlIHRoZSBwcm9wZXJ0aWVzIG9mIHRoZSBnaXZlblxuICogb2JqZWN0LCBlbHNlIGBmYWxzZWAuXG4gKlxuICogKipOb3RlOioqIFtgU2FtZVZhbHVlWmVyb2BdKGh0dHBzOi8vcGVvcGxlLm1vemlsbGEub3JnL35qb3JlbmRvcmZmL2VzNi1kcmFmdC5odG1sI3NlYy1zYW1ldmFsdWV6ZXJvKVxuICogY29tcGFyaXNvbnMgYXJlIGxpa2Ugc3RyaWN0IGVxdWFsaXR5IGNvbXBhcmlzb25zLCBlLmcuIGA9PT1gLCBleGNlcHQgdGhhdFxuICogYE5hTmAgbWF0Y2hlcyBgTmFOYC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQGFsaWFzIHVuaXF1ZVxuICogQGNhdGVnb3J5IEFycmF5XG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheSBUaGUgYXJyYXkgdG8gaW5zcGVjdC5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW2lzU29ydGVkXSBTcGVjaWZ5IHRoZSBhcnJheSBpcyBzb3J0ZWQuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufE9iamVjdHxzdHJpbmd9IFtpdGVyYXRlZV0gVGhlIGZ1bmN0aW9uIGludm9rZWQgcGVyIGl0ZXJhdGlvbi5cbiAqIEBwYXJhbSB7Kn0gW3RoaXNBcmddIFRoZSBgdGhpc2AgYmluZGluZyBvZiBgaXRlcmF0ZWVgLlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBuZXcgZHVwbGljYXRlLXZhbHVlLWZyZWUgYXJyYXkuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8udW5pcShbMSwgMiwgMV0pO1xuICogLy8gPT4gWzEsIDJdXG4gKlxuICogLy8gdXNpbmcgYGlzU29ydGVkYFxuICogXy51bmlxKFsxLCAxLCAyXSwgdHJ1ZSk7XG4gKiAvLyA9PiBbMSwgMl1cbiAqXG4gKiAvLyB1c2luZyBhbiBpdGVyYXRlZSBmdW5jdGlvblxuICogXy51bmlxKFsxLCAyLjUsIDEuNSwgMl0sIGZ1bmN0aW9uKG4pIHtcbiAqICAgcmV0dXJuIHRoaXMuZmxvb3Iobik7XG4gKiB9LCBNYXRoKTtcbiAqIC8vID0+IFsxLCAyLjVdXG4gKlxuICogLy8gdXNpbmcgdGhlIGBfLnByb3BlcnR5YCBjYWxsYmFjayBzaG9ydGhhbmRcbiAqIF8udW5pcShbeyAneCc6IDEgfSwgeyAneCc6IDIgfSwgeyAneCc6IDEgfV0sICd4Jyk7XG4gKiAvLyA9PiBbeyAneCc6IDEgfSwgeyAneCc6IDIgfV1cbiAqL1xuZnVuY3Rpb24gdW5pcShhcnJheSwgaXNTb3J0ZWQsIGl0ZXJhdGVlLCB0aGlzQXJnKSB7XG4gIHZhciBsZW5ndGggPSBhcnJheSA/IGFycmF5Lmxlbmd0aCA6IDA7XG4gIGlmICghbGVuZ3RoKSB7XG4gICAgcmV0dXJuIFtdO1xuICB9XG4gIGlmIChpc1NvcnRlZCAhPSBudWxsICYmIHR5cGVvZiBpc1NvcnRlZCAhPSAnYm9vbGVhbicpIHtcbiAgICB0aGlzQXJnID0gaXRlcmF0ZWU7XG4gICAgaXRlcmF0ZWUgPSBpc0l0ZXJhdGVlQ2FsbChhcnJheSwgaXNTb3J0ZWQsIHRoaXNBcmcpID8gbnVsbCA6IGlzU29ydGVkO1xuICAgIGlzU29ydGVkID0gZmFsc2U7XG4gIH1cbiAgaXRlcmF0ZWUgPSBpdGVyYXRlZSA9PSBudWxsID8gaXRlcmF0ZWUgOiBiYXNlQ2FsbGJhY2soaXRlcmF0ZWUsIHRoaXNBcmcsIDMpO1xuICByZXR1cm4gKGlzU29ydGVkKVxuICAgID8gc29ydGVkVW5pcShhcnJheSwgaXRlcmF0ZWUpXG4gICAgOiBiYXNlVW5pcShhcnJheSwgaXRlcmF0ZWUpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHVuaXE7XG4iLCJ2YXIgYXJyYXlFYWNoID0gcmVxdWlyZSgnLi4vaW50ZXJuYWwvYXJyYXlFYWNoJyksXG4gICAgYmFzZUVhY2ggPSByZXF1aXJlKCcuLi9pbnRlcm5hbC9iYXNlRWFjaCcpLFxuICAgIGNyZWF0ZUZvckVhY2ggPSByZXF1aXJlKCcuLi9pbnRlcm5hbC9jcmVhdGVGb3JFYWNoJyk7XG5cbi8qKlxuICogSXRlcmF0ZXMgb3ZlciBlbGVtZW50cyBvZiBgY29sbGVjdGlvbmAgaW52b2tpbmcgYGl0ZXJhdGVlYCBmb3IgZWFjaCBlbGVtZW50LlxuICogVGhlIGBpdGVyYXRlZWAgaXMgYm91bmQgdG8gYHRoaXNBcmdgIGFuZCBpbnZva2VkIHdpdGggdGhyZWUgYXJndW1lbnRzOlxuICogKHZhbHVlLCBpbmRleHxrZXksIGNvbGxlY3Rpb24pLiBJdGVyYXRvciBmdW5jdGlvbnMgbWF5IGV4aXQgaXRlcmF0aW9uIGVhcmx5XG4gKiBieSBleHBsaWNpdGx5IHJldHVybmluZyBgZmFsc2VgLlxuICpcbiAqICoqTm90ZToqKiBBcyB3aXRoIG90aGVyIFwiQ29sbGVjdGlvbnNcIiBtZXRob2RzLCBvYmplY3RzIHdpdGggYSBgbGVuZ3RoYCBwcm9wZXJ0eVxuICogYXJlIGl0ZXJhdGVkIGxpa2UgYXJyYXlzLiBUbyBhdm9pZCB0aGlzIGJlaGF2aW9yIGBfLmZvckluYCBvciBgXy5mb3JPd25gXG4gKiBtYXkgYmUgdXNlZCBmb3Igb2JqZWN0IGl0ZXJhdGlvbi5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQGFsaWFzIGVhY2hcbiAqIEBjYXRlZ29yeSBDb2xsZWN0aW9uXG4gKiBAcGFyYW0ge0FycmF5fE9iamVjdHxzdHJpbmd9IGNvbGxlY3Rpb24gVGhlIGNvbGxlY3Rpb24gdG8gaXRlcmF0ZSBvdmVyLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gW2l0ZXJhdGVlPV8uaWRlbnRpdHldIFRoZSBmdW5jdGlvbiBpbnZva2VkIHBlciBpdGVyYXRpb24uXG4gKiBAcGFyYW0geyp9IFt0aGlzQXJnXSBUaGUgYHRoaXNgIGJpbmRpbmcgb2YgYGl0ZXJhdGVlYC5cbiAqIEByZXR1cm5zIHtBcnJheXxPYmplY3R8c3RyaW5nfSBSZXR1cm5zIGBjb2xsZWN0aW9uYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXyhbMSwgMl0pLmZvckVhY2goZnVuY3Rpb24obikge1xuICogICBjb25zb2xlLmxvZyhuKTtcbiAqIH0pLnZhbHVlKCk7XG4gKiAvLyA9PiBsb2dzIGVhY2ggdmFsdWUgZnJvbSBsZWZ0IHRvIHJpZ2h0IGFuZCByZXR1cm5zIHRoZSBhcnJheVxuICpcbiAqIF8uZm9yRWFjaCh7ICdhJzogMSwgJ2InOiAyIH0sIGZ1bmN0aW9uKG4sIGtleSkge1xuICogICBjb25zb2xlLmxvZyhuLCBrZXkpO1xuICogfSk7XG4gKiAvLyA9PiBsb2dzIGVhY2ggdmFsdWUta2V5IHBhaXIgYW5kIHJldHVybnMgdGhlIG9iamVjdCAoaXRlcmF0aW9uIG9yZGVyIGlzIG5vdCBndWFyYW50ZWVkKVxuICovXG52YXIgZm9yRWFjaCA9IGNyZWF0ZUZvckVhY2goYXJyYXlFYWNoLCBiYXNlRWFjaCk7XG5cbm1vZHVsZS5leHBvcnRzID0gZm9yRWFjaDtcbiIsInZhciBhcnJheU1hcCA9IHJlcXVpcmUoJy4uL2ludGVybmFsL2FycmF5TWFwJyksXG4gICAgYmFzZUNhbGxiYWNrID0gcmVxdWlyZSgnLi4vaW50ZXJuYWwvYmFzZUNhbGxiYWNrJyksXG4gICAgYmFzZU1hcCA9IHJlcXVpcmUoJy4uL2ludGVybmFsL2Jhc2VNYXAnKSxcbiAgICBpc0FycmF5ID0gcmVxdWlyZSgnLi4vbGFuZy9pc0FycmF5Jyk7XG5cbi8qKlxuICogQ3JlYXRlcyBhbiBhcnJheSBvZiB2YWx1ZXMgYnkgcnVubmluZyBlYWNoIGVsZW1lbnQgaW4gYGNvbGxlY3Rpb25gIHRocm91Z2hcbiAqIGBpdGVyYXRlZWAuIFRoZSBgaXRlcmF0ZWVgIGlzIGJvdW5kIHRvIGB0aGlzQXJnYCBhbmQgaW52b2tlZCB3aXRoIHRocmVlXG4gKiBhcmd1bWVudHM6ICh2YWx1ZSwgaW5kZXh8a2V5LCBjb2xsZWN0aW9uKS5cbiAqXG4gKiBJZiBhIHByb3BlcnR5IG5hbWUgaXMgcHJvdmlkZWQgZm9yIGBpdGVyYXRlZWAgdGhlIGNyZWF0ZWQgYF8ucHJvcGVydHlgXG4gKiBzdHlsZSBjYWxsYmFjayByZXR1cm5zIHRoZSBwcm9wZXJ0eSB2YWx1ZSBvZiB0aGUgZ2l2ZW4gZWxlbWVudC5cbiAqXG4gKiBJZiBhIHZhbHVlIGlzIGFsc28gcHJvdmlkZWQgZm9yIGB0aGlzQXJnYCB0aGUgY3JlYXRlZCBgXy5tYXRjaGVzUHJvcGVydHlgXG4gKiBzdHlsZSBjYWxsYmFjayByZXR1cm5zIGB0cnVlYCBmb3IgZWxlbWVudHMgdGhhdCBoYXZlIGEgbWF0Y2hpbmcgcHJvcGVydHlcbiAqIHZhbHVlLCBlbHNlIGBmYWxzZWAuXG4gKlxuICogSWYgYW4gb2JqZWN0IGlzIHByb3ZpZGVkIGZvciBgaXRlcmF0ZWVgIHRoZSBjcmVhdGVkIGBfLm1hdGNoZXNgIHN0eWxlXG4gKiBjYWxsYmFjayByZXR1cm5zIGB0cnVlYCBmb3IgZWxlbWVudHMgdGhhdCBoYXZlIHRoZSBwcm9wZXJ0aWVzIG9mIHRoZSBnaXZlblxuICogb2JqZWN0LCBlbHNlIGBmYWxzZWAuXG4gKlxuICogTWFueSBsb2Rhc2ggbWV0aG9kcyBhcmUgZ3VhcmRlZCB0byB3b3JrIGFzIGludGVyYXRlZXMgZm9yIG1ldGhvZHMgbGlrZVxuICogYF8uZXZlcnlgLCBgXy5maWx0ZXJgLCBgXy5tYXBgLCBgXy5tYXBWYWx1ZXNgLCBgXy5yZWplY3RgLCBhbmQgYF8uc29tZWAuXG4gKlxuICogVGhlIGd1YXJkZWQgbWV0aG9kcyBhcmU6XG4gKiBgYXJ5YCwgYGNhbGxiYWNrYCwgYGNodW5rYCwgYGNsb25lYCwgYGNyZWF0ZWAsIGBjdXJyeWAsIGBjdXJyeVJpZ2h0YCwgYGRyb3BgLFxuICogYGRyb3BSaWdodGAsIGBldmVyeWAsIGBmaWxsYCwgYGZsYXR0ZW5gLCBgaW52ZXJ0YCwgYG1heGAsIGBtaW5gLCBgcGFyc2VJbnRgLFxuICogYHNsaWNlYCwgYHNvcnRCeWAsIGB0YWtlYCwgYHRha2VSaWdodGAsIGB0ZW1wbGF0ZWAsIGB0cmltYCwgYHRyaW1MZWZ0YCxcbiAqIGB0cmltUmlnaHRgLCBgdHJ1bmNgLCBgcmFuZG9tYCwgYHJhbmdlYCwgYHNhbXBsZWAsIGBzb21lYCwgYHVuaXFgLCBhbmQgYHdvcmRzYFxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAYWxpYXMgY29sbGVjdFxuICogQGNhdGVnb3J5IENvbGxlY3Rpb25cbiAqIEBwYXJhbSB7QXJyYXl8T2JqZWN0fHN0cmluZ30gY29sbGVjdGlvbiBUaGUgY29sbGVjdGlvbiB0byBpdGVyYXRlIG92ZXIuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufE9iamVjdHxzdHJpbmd9IFtpdGVyYXRlZT1fLmlkZW50aXR5XSBUaGUgZnVuY3Rpb24gaW52b2tlZFxuICogIHBlciBpdGVyYXRpb24uXG4gKiAgY3JlYXRlIGEgYF8ucHJvcGVydHlgIG9yIGBfLm1hdGNoZXNgIHN0eWxlIGNhbGxiYWNrIHJlc3BlY3RpdmVseS5cbiAqIEBwYXJhbSB7Kn0gW3RoaXNBcmddIFRoZSBgdGhpc2AgYmluZGluZyBvZiBgaXRlcmF0ZWVgLlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBuZXcgbWFwcGVkIGFycmF5LlxuICogQGV4YW1wbGVcbiAqXG4gKiBmdW5jdGlvbiB0aW1lc1RocmVlKG4pIHtcbiAqICAgcmV0dXJuIG4gKiAzO1xuICogfVxuICpcbiAqIF8ubWFwKFsxLCAyXSwgdGltZXNUaHJlZSk7XG4gKiAvLyA9PiBbMywgNl1cbiAqXG4gKiBfLm1hcCh7ICdhJzogMSwgJ2InOiAyIH0sIHRpbWVzVGhyZWUpO1xuICogLy8gPT4gWzMsIDZdIChpdGVyYXRpb24gb3JkZXIgaXMgbm90IGd1YXJhbnRlZWQpXG4gKlxuICogdmFyIHVzZXJzID0gW1xuICogICB7ICd1c2VyJzogJ2Jhcm5leScgfSxcbiAqICAgeyAndXNlcic6ICdmcmVkJyB9XG4gKiBdO1xuICpcbiAqIC8vIHVzaW5nIHRoZSBgXy5wcm9wZXJ0eWAgY2FsbGJhY2sgc2hvcnRoYW5kXG4gKiBfLm1hcCh1c2VycywgJ3VzZXInKTtcbiAqIC8vID0+IFsnYmFybmV5JywgJ2ZyZWQnXVxuICovXG5mdW5jdGlvbiBtYXAoY29sbGVjdGlvbiwgaXRlcmF0ZWUsIHRoaXNBcmcpIHtcbiAgdmFyIGZ1bmMgPSBpc0FycmF5KGNvbGxlY3Rpb24pID8gYXJyYXlNYXAgOiBiYXNlTWFwO1xuICBpdGVyYXRlZSA9IGJhc2VDYWxsYmFjayhpdGVyYXRlZSwgdGhpc0FyZywgMyk7XG4gIHJldHVybiBmdW5jKGNvbGxlY3Rpb24sIGl0ZXJhdGVlKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBtYXA7XG4iLCJ2YXIgaXNMZW5ndGggPSByZXF1aXJlKCcuLi9pbnRlcm5hbC9pc0xlbmd0aCcpLFxuICAgIGtleXMgPSByZXF1aXJlKCcuLi9vYmplY3Qva2V5cycpO1xuXG4vKipcbiAqIEdldHMgdGhlIHNpemUgb2YgYGNvbGxlY3Rpb25gIGJ5IHJldHVybmluZyBpdHMgbGVuZ3RoIGZvciBhcnJheS1saWtlXG4gKiB2YWx1ZXMgb3IgdGhlIG51bWJlciBvZiBvd24gZW51bWVyYWJsZSBwcm9wZXJ0aWVzIGZvciBvYmplY3RzLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAY2F0ZWdvcnkgQ29sbGVjdGlvblxuICogQHBhcmFtIHtBcnJheXxPYmplY3R8c3RyaW5nfSBjb2xsZWN0aW9uIFRoZSBjb2xsZWN0aW9uIHRvIGluc3BlY3QuXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBSZXR1cm5zIHRoZSBzaXplIG9mIGBjb2xsZWN0aW9uYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5zaXplKFsxLCAyLCAzXSk7XG4gKiAvLyA9PiAzXG4gKlxuICogXy5zaXplKHsgJ2EnOiAxLCAnYic6IDIgfSk7XG4gKiAvLyA9PiAyXG4gKlxuICogXy5zaXplKCdwZWJibGVzJyk7XG4gKiAvLyA9PiA3XG4gKi9cbmZ1bmN0aW9uIHNpemUoY29sbGVjdGlvbikge1xuICB2YXIgbGVuZ3RoID0gY29sbGVjdGlvbiA/IGNvbGxlY3Rpb24ubGVuZ3RoIDogMDtcbiAgcmV0dXJuIGlzTGVuZ3RoKGxlbmd0aCkgPyBsZW5ndGggOiBrZXlzKGNvbGxlY3Rpb24pLmxlbmd0aDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzaXplO1xuIiwidmFyIGNhY2hlUHVzaCA9IHJlcXVpcmUoJy4vY2FjaGVQdXNoJyksXG4gICAgaXNOYXRpdmUgPSByZXF1aXJlKCcuLi9sYW5nL2lzTmF0aXZlJyk7XG5cbi8qKiBOYXRpdmUgbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgU2V0ID0gaXNOYXRpdmUoU2V0ID0gZ2xvYmFsLlNldCkgJiYgU2V0O1xuXG4vKiBOYXRpdmUgbWV0aG9kIHJlZmVyZW5jZXMgZm9yIHRob3NlIHdpdGggdGhlIHNhbWUgbmFtZSBhcyBvdGhlciBgbG9kYXNoYCBtZXRob2RzLiAqL1xudmFyIG5hdGl2ZUNyZWF0ZSA9IGlzTmF0aXZlKG5hdGl2ZUNyZWF0ZSA9IE9iamVjdC5jcmVhdGUpICYmIG5hdGl2ZUNyZWF0ZTtcblxuLyoqXG4gKlxuICogQ3JlYXRlcyBhIGNhY2hlIG9iamVjdCB0byBzdG9yZSB1bmlxdWUgdmFsdWVzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fSBbdmFsdWVzXSBUaGUgdmFsdWVzIHRvIGNhY2hlLlxuICovXG5mdW5jdGlvbiBTZXRDYWNoZSh2YWx1ZXMpIHtcbiAgdmFyIGxlbmd0aCA9IHZhbHVlcyA/IHZhbHVlcy5sZW5ndGggOiAwO1xuXG4gIHRoaXMuZGF0YSA9IHsgJ2hhc2gnOiBuYXRpdmVDcmVhdGUobnVsbCksICdzZXQnOiBuZXcgU2V0IH07XG4gIHdoaWxlIChsZW5ndGgtLSkge1xuICAgIHRoaXMucHVzaCh2YWx1ZXNbbGVuZ3RoXSk7XG4gIH1cbn1cblxuLy8gQWRkIGZ1bmN0aW9ucyB0byB0aGUgYFNldGAgY2FjaGUuXG5TZXRDYWNoZS5wcm90b3R5cGUucHVzaCA9IGNhY2hlUHVzaDtcblxubW9kdWxlLmV4cG9ydHMgPSBTZXRDYWNoZTtcbiIsIi8qKlxuICogQ29waWVzIHRoZSB2YWx1ZXMgb2YgYHNvdXJjZWAgdG8gYGFycmF5YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheX0gc291cmNlIFRoZSBhcnJheSB0byBjb3B5IHZhbHVlcyBmcm9tLlxuICogQHBhcmFtIHtBcnJheX0gW2FycmF5PVtdXSBUaGUgYXJyYXkgdG8gY29weSB2YWx1ZXMgdG8uXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgYGFycmF5YC5cbiAqL1xuZnVuY3Rpb24gYXJyYXlDb3B5KHNvdXJjZSwgYXJyYXkpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBsZW5ndGggPSBzb3VyY2UubGVuZ3RoO1xuXG4gIGFycmF5IHx8IChhcnJheSA9IEFycmF5KGxlbmd0aCkpO1xuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIGFycmF5W2luZGV4XSA9IHNvdXJjZVtpbmRleF07XG4gIH1cbiAgcmV0dXJuIGFycmF5O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGFycmF5Q29weTtcbiIsIi8qKlxuICogQSBzcGVjaWFsaXplZCB2ZXJzaW9uIG9mIGBfLmZvckVhY2hgIGZvciBhcnJheXMgd2l0aG91dCBzdXBwb3J0IGZvciBjYWxsYmFja1xuICogc2hvcnRoYW5kcyBhbmQgYHRoaXNgIGJpbmRpbmcuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IFRoZSBhcnJheSB0byBpdGVyYXRlIG92ZXIuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBpdGVyYXRlZSBUaGUgZnVuY3Rpb24gaW52b2tlZCBwZXIgaXRlcmF0aW9uLlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIGBhcnJheWAuXG4gKi9cbmZ1bmN0aW9uIGFycmF5RWFjaChhcnJheSwgaXRlcmF0ZWUpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBsZW5ndGggPSBhcnJheS5sZW5ndGg7XG5cbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICBpZiAoaXRlcmF0ZWUoYXJyYXlbaW5kZXhdLCBpbmRleCwgYXJyYXkpID09PSBmYWxzZSkge1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG4gIHJldHVybiBhcnJheTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBhcnJheUVhY2g7XG4iLCIvKipcbiAqIEEgc3BlY2lhbGl6ZWQgdmVyc2lvbiBvZiBgXy5tYXBgIGZvciBhcnJheXMgd2l0aG91dCBzdXBwb3J0IGZvciBjYWxsYmFja1xuICogc2hvcnRoYW5kcyBhbmQgYHRoaXNgIGJpbmRpbmcuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IFRoZSBhcnJheSB0byBpdGVyYXRlIG92ZXIuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBpdGVyYXRlZSBUaGUgZnVuY3Rpb24gaW52b2tlZCBwZXIgaXRlcmF0aW9uLlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBuZXcgbWFwcGVkIGFycmF5LlxuICovXG5mdW5jdGlvbiBhcnJheU1hcChhcnJheSwgaXRlcmF0ZWUpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBsZW5ndGggPSBhcnJheS5sZW5ndGgsXG4gICAgICByZXN1bHQgPSBBcnJheShsZW5ndGgpO1xuXG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgcmVzdWx0W2luZGV4XSA9IGl0ZXJhdGVlKGFycmF5W2luZGV4XSwgaW5kZXgsIGFycmF5KTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGFycmF5TWFwO1xuIiwidmFyIGJhc2VNYXRjaGVzID0gcmVxdWlyZSgnLi9iYXNlTWF0Y2hlcycpLFxuICAgIGJhc2VNYXRjaGVzUHJvcGVydHkgPSByZXF1aXJlKCcuL2Jhc2VNYXRjaGVzUHJvcGVydHknKSxcbiAgICBiYXNlUHJvcGVydHkgPSByZXF1aXJlKCcuL2Jhc2VQcm9wZXJ0eScpLFxuICAgIGJpbmRDYWxsYmFjayA9IHJlcXVpcmUoJy4vYmluZENhbGxiYWNrJyksXG4gICAgaWRlbnRpdHkgPSByZXF1aXJlKCcuLi91dGlsaXR5L2lkZW50aXR5Jyk7XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8uY2FsbGJhY2tgIHdoaWNoIHN1cHBvcnRzIHNwZWNpZnlpbmcgdGhlXG4gKiBudW1iZXIgb2YgYXJndW1lbnRzIHRvIHByb3ZpZGUgdG8gYGZ1bmNgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IFtmdW5jPV8uaWRlbnRpdHldIFRoZSB2YWx1ZSB0byBjb252ZXJ0IHRvIGEgY2FsbGJhY2suXG4gKiBAcGFyYW0geyp9IFt0aGlzQXJnXSBUaGUgYHRoaXNgIGJpbmRpbmcgb2YgYGZ1bmNgLlxuICogQHBhcmFtIHtudW1iZXJ9IFthcmdDb3VudF0gVGhlIG51bWJlciBvZiBhcmd1bWVudHMgdG8gcHJvdmlkZSB0byBgZnVuY2AuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIGNhbGxiYWNrLlxuICovXG5mdW5jdGlvbiBiYXNlQ2FsbGJhY2soZnVuYywgdGhpc0FyZywgYXJnQ291bnQpIHtcbiAgdmFyIHR5cGUgPSB0eXBlb2YgZnVuYztcbiAgaWYgKHR5cGUgPT0gJ2Z1bmN0aW9uJykge1xuICAgIHJldHVybiB0eXBlb2YgdGhpc0FyZyA9PSAndW5kZWZpbmVkJ1xuICAgICAgPyBmdW5jXG4gICAgICA6IGJpbmRDYWxsYmFjayhmdW5jLCB0aGlzQXJnLCBhcmdDb3VudCk7XG4gIH1cbiAgaWYgKGZ1bmMgPT0gbnVsbCkge1xuICAgIHJldHVybiBpZGVudGl0eTtcbiAgfVxuICBpZiAodHlwZSA9PSAnb2JqZWN0Jykge1xuICAgIHJldHVybiBiYXNlTWF0Y2hlcyhmdW5jKTtcbiAgfVxuICByZXR1cm4gdHlwZW9mIHRoaXNBcmcgPT0gJ3VuZGVmaW5lZCdcbiAgICA/IGJhc2VQcm9wZXJ0eShmdW5jICsgJycpXG4gICAgOiBiYXNlTWF0Y2hlc1Byb3BlcnR5KGZ1bmMgKyAnJywgdGhpc0FyZyk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYmFzZUNhbGxiYWNrO1xuIiwidmFyIGFycmF5Q29weSA9IHJlcXVpcmUoJy4vYXJyYXlDb3B5JyksXG4gICAgYXJyYXlFYWNoID0gcmVxdWlyZSgnLi9hcnJheUVhY2gnKSxcbiAgICBiYXNlQ29weSA9IHJlcXVpcmUoJy4vYmFzZUNvcHknKSxcbiAgICBiYXNlRm9yT3duID0gcmVxdWlyZSgnLi9iYXNlRm9yT3duJyksXG4gICAgaW5pdENsb25lQXJyYXkgPSByZXF1aXJlKCcuL2luaXRDbG9uZUFycmF5JyksXG4gICAgaW5pdENsb25lQnlUYWcgPSByZXF1aXJlKCcuL2luaXRDbG9uZUJ5VGFnJyksXG4gICAgaW5pdENsb25lT2JqZWN0ID0gcmVxdWlyZSgnLi9pbml0Q2xvbmVPYmplY3QnKSxcbiAgICBpc0FycmF5ID0gcmVxdWlyZSgnLi4vbGFuZy9pc0FycmF5JyksXG4gICAgaXNPYmplY3QgPSByZXF1aXJlKCcuLi9sYW5nL2lzT2JqZWN0JyksXG4gICAga2V5cyA9IHJlcXVpcmUoJy4uL29iamVjdC9rZXlzJyk7XG5cbi8qKiBgT2JqZWN0I3RvU3RyaW5nYCByZXN1bHQgcmVmZXJlbmNlcy4gKi9cbnZhciBhcmdzVGFnID0gJ1tvYmplY3QgQXJndW1lbnRzXScsXG4gICAgYXJyYXlUYWcgPSAnW29iamVjdCBBcnJheV0nLFxuICAgIGJvb2xUYWcgPSAnW29iamVjdCBCb29sZWFuXScsXG4gICAgZGF0ZVRhZyA9ICdbb2JqZWN0IERhdGVdJyxcbiAgICBlcnJvclRhZyA9ICdbb2JqZWN0IEVycm9yXScsXG4gICAgZnVuY1RhZyA9ICdbb2JqZWN0IEZ1bmN0aW9uXScsXG4gICAgbWFwVGFnID0gJ1tvYmplY3QgTWFwXScsXG4gICAgbnVtYmVyVGFnID0gJ1tvYmplY3QgTnVtYmVyXScsXG4gICAgb2JqZWN0VGFnID0gJ1tvYmplY3QgT2JqZWN0XScsXG4gICAgcmVnZXhwVGFnID0gJ1tvYmplY3QgUmVnRXhwXScsXG4gICAgc2V0VGFnID0gJ1tvYmplY3QgU2V0XScsXG4gICAgc3RyaW5nVGFnID0gJ1tvYmplY3QgU3RyaW5nXScsXG4gICAgd2Vha01hcFRhZyA9ICdbb2JqZWN0IFdlYWtNYXBdJztcblxudmFyIGFycmF5QnVmZmVyVGFnID0gJ1tvYmplY3QgQXJyYXlCdWZmZXJdJyxcbiAgICBmbG9hdDMyVGFnID0gJ1tvYmplY3QgRmxvYXQzMkFycmF5XScsXG4gICAgZmxvYXQ2NFRhZyA9ICdbb2JqZWN0IEZsb2F0NjRBcnJheV0nLFxuICAgIGludDhUYWcgPSAnW29iamVjdCBJbnQ4QXJyYXldJyxcbiAgICBpbnQxNlRhZyA9ICdbb2JqZWN0IEludDE2QXJyYXldJyxcbiAgICBpbnQzMlRhZyA9ICdbb2JqZWN0IEludDMyQXJyYXldJyxcbiAgICB1aW50OFRhZyA9ICdbb2JqZWN0IFVpbnQ4QXJyYXldJyxcbiAgICB1aW50OENsYW1wZWRUYWcgPSAnW29iamVjdCBVaW50OENsYW1wZWRBcnJheV0nLFxuICAgIHVpbnQxNlRhZyA9ICdbb2JqZWN0IFVpbnQxNkFycmF5XScsXG4gICAgdWludDMyVGFnID0gJ1tvYmplY3QgVWludDMyQXJyYXldJztcblxuLyoqIFVzZWQgdG8gaWRlbnRpZnkgYHRvU3RyaW5nVGFnYCB2YWx1ZXMgc3VwcG9ydGVkIGJ5IGBfLmNsb25lYC4gKi9cbnZhciBjbG9uZWFibGVUYWdzID0ge307XG5jbG9uZWFibGVUYWdzW2FyZ3NUYWddID0gY2xvbmVhYmxlVGFnc1thcnJheVRhZ10gPVxuY2xvbmVhYmxlVGFnc1thcnJheUJ1ZmZlclRhZ10gPSBjbG9uZWFibGVUYWdzW2Jvb2xUYWddID1cbmNsb25lYWJsZVRhZ3NbZGF0ZVRhZ10gPSBjbG9uZWFibGVUYWdzW2Zsb2F0MzJUYWddID1cbmNsb25lYWJsZVRhZ3NbZmxvYXQ2NFRhZ10gPSBjbG9uZWFibGVUYWdzW2ludDhUYWddID1cbmNsb25lYWJsZVRhZ3NbaW50MTZUYWddID0gY2xvbmVhYmxlVGFnc1tpbnQzMlRhZ10gPVxuY2xvbmVhYmxlVGFnc1tudW1iZXJUYWddID0gY2xvbmVhYmxlVGFnc1tvYmplY3RUYWddID1cbmNsb25lYWJsZVRhZ3NbcmVnZXhwVGFnXSA9IGNsb25lYWJsZVRhZ3Nbc3RyaW5nVGFnXSA9XG5jbG9uZWFibGVUYWdzW3VpbnQ4VGFnXSA9IGNsb25lYWJsZVRhZ3NbdWludDhDbGFtcGVkVGFnXSA9XG5jbG9uZWFibGVUYWdzW3VpbnQxNlRhZ10gPSBjbG9uZWFibGVUYWdzW3VpbnQzMlRhZ10gPSB0cnVlO1xuY2xvbmVhYmxlVGFnc1tlcnJvclRhZ10gPSBjbG9uZWFibGVUYWdzW2Z1bmNUYWddID1cbmNsb25lYWJsZVRhZ3NbbWFwVGFnXSA9IGNsb25lYWJsZVRhZ3Nbc2V0VGFnXSA9XG5jbG9uZWFibGVUYWdzW3dlYWtNYXBUYWddID0gZmFsc2U7XG5cbi8qKiBVc2VkIGZvciBuYXRpdmUgbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKipcbiAqIFVzZWQgdG8gcmVzb2x2ZSB0aGUgW2B0b1N0cmluZ1RhZ2BdKGh0dHBzOi8vcGVvcGxlLm1vemlsbGEub3JnL35qb3JlbmRvcmZmL2VzNi1kcmFmdC5odG1sI3NlYy1vYmplY3QucHJvdG90eXBlLnRvc3RyaW5nKVxuICogb2YgdmFsdWVzLlxuICovXG52YXIgb2JqVG9TdHJpbmcgPSBvYmplY3RQcm90by50b1N0cmluZztcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5jbG9uZWAgd2l0aG91dCBzdXBwb3J0IGZvciBhcmd1bWVudCBqdWdnbGluZ1xuICogYW5kIGB0aGlzYCBiaW5kaW5nIGBjdXN0b21pemVyYCBmdW5jdGlvbnMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNsb25lLlxuICogQHBhcmFtIHtib29sZWFufSBbaXNEZWVwXSBTcGVjaWZ5IGEgZGVlcCBjbG9uZS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtjdXN0b21pemVyXSBUaGUgZnVuY3Rpb24gdG8gY3VzdG9taXplIGNsb25pbmcgdmFsdWVzLlxuICogQHBhcmFtIHtzdHJpbmd9IFtrZXldIFRoZSBrZXkgb2YgYHZhbHVlYC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbb2JqZWN0XSBUaGUgb2JqZWN0IGB2YWx1ZWAgYmVsb25ncyB0by5cbiAqIEBwYXJhbSB7QXJyYXl9IFtzdGFja0E9W11dIFRyYWNrcyB0cmF2ZXJzZWQgc291cmNlIG9iamVjdHMuXG4gKiBAcGFyYW0ge0FycmF5fSBbc3RhY2tCPVtdXSBBc3NvY2lhdGVzIGNsb25lcyB3aXRoIHNvdXJjZSBjb3VudGVycGFydHMuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgY2xvbmVkIHZhbHVlLlxuICovXG5mdW5jdGlvbiBiYXNlQ2xvbmUodmFsdWUsIGlzRGVlcCwgY3VzdG9taXplciwga2V5LCBvYmplY3QsIHN0YWNrQSwgc3RhY2tCKSB7XG4gIHZhciByZXN1bHQ7XG4gIGlmIChjdXN0b21pemVyKSB7XG4gICAgcmVzdWx0ID0gb2JqZWN0ID8gY3VzdG9taXplcih2YWx1ZSwga2V5LCBvYmplY3QpIDogY3VzdG9taXplcih2YWx1ZSk7XG4gIH1cbiAgaWYgKHR5cGVvZiByZXN1bHQgIT0gJ3VuZGVmaW5lZCcpIHtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG4gIGlmICghaXNPYmplY3QodmFsdWUpKSB7XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG4gIHZhciBpc0FyciA9IGlzQXJyYXkodmFsdWUpO1xuICBpZiAoaXNBcnIpIHtcbiAgICByZXN1bHQgPSBpbml0Q2xvbmVBcnJheSh2YWx1ZSk7XG4gICAgaWYgKCFpc0RlZXApIHtcbiAgICAgIHJldHVybiBhcnJheUNvcHkodmFsdWUsIHJlc3VsdCk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHZhciB0YWcgPSBvYmpUb1N0cmluZy5jYWxsKHZhbHVlKSxcbiAgICAgICAgaXNGdW5jID0gdGFnID09IGZ1bmNUYWc7XG5cbiAgICBpZiAodGFnID09IG9iamVjdFRhZyB8fCB0YWcgPT0gYXJnc1RhZyB8fCAoaXNGdW5jICYmICFvYmplY3QpKSB7XG4gICAgICByZXN1bHQgPSBpbml0Q2xvbmVPYmplY3QoaXNGdW5jID8ge30gOiB2YWx1ZSk7XG4gICAgICBpZiAoIWlzRGVlcCkge1xuICAgICAgICByZXR1cm4gYmFzZUNvcHkodmFsdWUsIHJlc3VsdCwga2V5cyh2YWx1ZSkpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gY2xvbmVhYmxlVGFnc1t0YWddXG4gICAgICAgID8gaW5pdENsb25lQnlUYWcodmFsdWUsIHRhZywgaXNEZWVwKVxuICAgICAgICA6IChvYmplY3QgPyB2YWx1ZSA6IHt9KTtcbiAgICB9XG4gIH1cbiAgLy8gQ2hlY2sgZm9yIGNpcmN1bGFyIHJlZmVyZW5jZXMgYW5kIHJldHVybiBjb3JyZXNwb25kaW5nIGNsb25lLlxuICBzdGFja0EgfHwgKHN0YWNrQSA9IFtdKTtcbiAgc3RhY2tCIHx8IChzdGFja0IgPSBbXSk7XG5cbiAgdmFyIGxlbmd0aCA9IHN0YWNrQS5sZW5ndGg7XG4gIHdoaWxlIChsZW5ndGgtLSkge1xuICAgIGlmIChzdGFja0FbbGVuZ3RoXSA9PSB2YWx1ZSkge1xuICAgICAgcmV0dXJuIHN0YWNrQltsZW5ndGhdO1xuICAgIH1cbiAgfVxuICAvLyBBZGQgdGhlIHNvdXJjZSB2YWx1ZSB0byB0aGUgc3RhY2sgb2YgdHJhdmVyc2VkIG9iamVjdHMgYW5kIGFzc29jaWF0ZSBpdCB3aXRoIGl0cyBjbG9uZS5cbiAgc3RhY2tBLnB1c2godmFsdWUpO1xuICBzdGFja0IucHVzaChyZXN1bHQpO1xuXG4gIC8vIFJlY3Vyc2l2ZWx5IHBvcHVsYXRlIGNsb25lIChzdXNjZXB0aWJsZSB0byBjYWxsIHN0YWNrIGxpbWl0cykuXG4gIChpc0FyciA/IGFycmF5RWFjaCA6IGJhc2VGb3JPd24pKHZhbHVlLCBmdW5jdGlvbihzdWJWYWx1ZSwga2V5KSB7XG4gICAgcmVzdWx0W2tleV0gPSBiYXNlQ2xvbmUoc3ViVmFsdWUsIGlzRGVlcCwgY3VzdG9taXplciwga2V5LCB2YWx1ZSwgc3RhY2tBLCBzdGFja0IpO1xuICB9KTtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBiYXNlQ2xvbmU7XG4iLCIvKipcbiAqIENvcGllcyB0aGUgcHJvcGVydGllcyBvZiBgc291cmNlYCB0byBgb2JqZWN0YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IHNvdXJjZSBUaGUgb2JqZWN0IHRvIGNvcHkgcHJvcGVydGllcyBmcm9tLlxuICogQHBhcmFtIHtPYmplY3R9IFtvYmplY3Q9e31dIFRoZSBvYmplY3QgdG8gY29weSBwcm9wZXJ0aWVzIHRvLlxuICogQHBhcmFtIHtBcnJheX0gcHJvcHMgVGhlIHByb3BlcnR5IG5hbWVzIHRvIGNvcHkuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIGBvYmplY3RgLlxuICovXG5mdW5jdGlvbiBiYXNlQ29weShzb3VyY2UsIG9iamVjdCwgcHJvcHMpIHtcbiAgaWYgKCFwcm9wcykge1xuICAgIHByb3BzID0gb2JqZWN0O1xuICAgIG9iamVjdCA9IHt9O1xuICB9XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgbGVuZ3RoID0gcHJvcHMubGVuZ3RoO1xuXG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgdmFyIGtleSA9IHByb3BzW2luZGV4XTtcbiAgICBvYmplY3Rba2V5XSA9IHNvdXJjZVtrZXldO1xuICB9XG4gIHJldHVybiBvYmplY3Q7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYmFzZUNvcHk7XG4iLCJ2YXIgYmFzZUZvck93biA9IHJlcXVpcmUoJy4vYmFzZUZvck93bicpLFxuICAgIGNyZWF0ZUJhc2VFYWNoID0gcmVxdWlyZSgnLi9jcmVhdGVCYXNlRWFjaCcpO1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLmZvckVhY2hgIHdpdGhvdXQgc3VwcG9ydCBmb3IgY2FsbGJhY2tcbiAqIHNob3J0aGFuZHMgYW5kIGB0aGlzYCBiaW5kaW5nLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fE9iamVjdHxzdHJpbmd9IGNvbGxlY3Rpb24gVGhlIGNvbGxlY3Rpb24gdG8gaXRlcmF0ZSBvdmVyLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gaXRlcmF0ZWUgVGhlIGZ1bmN0aW9uIGludm9rZWQgcGVyIGl0ZXJhdGlvbi5cbiAqIEByZXR1cm5zIHtBcnJheXxPYmplY3R8c3RyaW5nfSBSZXR1cm5zIGBjb2xsZWN0aW9uYC5cbiAqL1xudmFyIGJhc2VFYWNoID0gY3JlYXRlQmFzZUVhY2goYmFzZUZvck93bik7XG5cbm1vZHVsZS5leHBvcnRzID0gYmFzZUVhY2g7XG4iLCIvKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLmZpbmRgLCBgXy5maW5kTGFzdGAsIGBfLmZpbmRLZXlgLCBhbmQgYF8uZmluZExhc3RLZXlgLFxuICogd2l0aG91dCBzdXBwb3J0IGZvciBjYWxsYmFjayBzaG9ydGhhbmRzIGFuZCBgdGhpc2AgYmluZGluZywgd2hpY2ggaXRlcmF0ZXNcbiAqIG92ZXIgYGNvbGxlY3Rpb25gIHVzaW5nIHRoZSBwcm92aWRlZCBgZWFjaEZ1bmNgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fE9iamVjdHxzdHJpbmd9IGNvbGxlY3Rpb24gVGhlIGNvbGxlY3Rpb24gdG8gc2VhcmNoLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gcHJlZGljYXRlIFRoZSBmdW5jdGlvbiBpbnZva2VkIHBlciBpdGVyYXRpb24uXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBlYWNoRnVuYyBUaGUgZnVuY3Rpb24gdG8gaXRlcmF0ZSBvdmVyIGBjb2xsZWN0aW9uYC5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW3JldEtleV0gU3BlY2lmeSByZXR1cm5pbmcgdGhlIGtleSBvZiB0aGUgZm91bmQgZWxlbWVudFxuICogIGluc3RlYWQgb2YgdGhlIGVsZW1lbnQgaXRzZWxmLlxuICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIGZvdW5kIGVsZW1lbnQgb3IgaXRzIGtleSwgZWxzZSBgdW5kZWZpbmVkYC5cbiAqL1xuZnVuY3Rpb24gYmFzZUZpbmQoY29sbGVjdGlvbiwgcHJlZGljYXRlLCBlYWNoRnVuYywgcmV0S2V5KSB7XG4gIHZhciByZXN1bHQ7XG4gIGVhY2hGdW5jKGNvbGxlY3Rpb24sIGZ1bmN0aW9uKHZhbHVlLCBrZXksIGNvbGxlY3Rpb24pIHtcbiAgICBpZiAocHJlZGljYXRlKHZhbHVlLCBrZXksIGNvbGxlY3Rpb24pKSB7XG4gICAgICByZXN1bHQgPSByZXRLZXkgPyBrZXkgOiB2YWx1ZTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH0pO1xuICByZXR1cm4gcmVzdWx0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJhc2VGaW5kO1xuIiwidmFyIGNyZWF0ZUJhc2VGb3IgPSByZXF1aXJlKCcuL2NyZWF0ZUJhc2VGb3InKTtcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgYmFzZUZvckluYCBhbmQgYGJhc2VGb3JPd25gIHdoaWNoIGl0ZXJhdGVzXG4gKiBvdmVyIGBvYmplY3RgIHByb3BlcnRpZXMgcmV0dXJuZWQgYnkgYGtleXNGdW5jYCBpbnZva2luZyBgaXRlcmF0ZWVgIGZvclxuICogZWFjaCBwcm9wZXJ0eS4gSXRlcmF0b3IgZnVuY3Rpb25zIG1heSBleGl0IGl0ZXJhdGlvbiBlYXJseSBieSBleHBsaWNpdGx5XG4gKiByZXR1cm5pbmcgYGZhbHNlYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIGl0ZXJhdGUgb3Zlci5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGl0ZXJhdGVlIFRoZSBmdW5jdGlvbiBpbnZva2VkIHBlciBpdGVyYXRpb24uXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBrZXlzRnVuYyBUaGUgZnVuY3Rpb24gdG8gZ2V0IHRoZSBrZXlzIG9mIGBvYmplY3RgLlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyBgb2JqZWN0YC5cbiAqL1xudmFyIGJhc2VGb3IgPSBjcmVhdGVCYXNlRm9yKCk7XG5cbm1vZHVsZS5leHBvcnRzID0gYmFzZUZvcjtcbiIsInZhciBiYXNlRm9yID0gcmVxdWlyZSgnLi9iYXNlRm9yJyksXG4gICAga2V5cyA9IHJlcXVpcmUoJy4uL29iamVjdC9rZXlzJyk7XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8uZm9yT3duYCB3aXRob3V0IHN1cHBvcnQgZm9yIGNhbGxiYWNrXG4gKiBzaG9ydGhhbmRzIGFuZCBgdGhpc2AgYmluZGluZy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIGl0ZXJhdGUgb3Zlci5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGl0ZXJhdGVlIFRoZSBmdW5jdGlvbiBpbnZva2VkIHBlciBpdGVyYXRpb24uXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIGBvYmplY3RgLlxuICovXG5mdW5jdGlvbiBiYXNlRm9yT3duKG9iamVjdCwgaXRlcmF0ZWUpIHtcbiAgcmV0dXJuIGJhc2VGb3Iob2JqZWN0LCBpdGVyYXRlZSwga2V5cyk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYmFzZUZvck93bjtcbiIsInZhciBpbmRleE9mTmFOID0gcmVxdWlyZSgnLi9pbmRleE9mTmFOJyk7XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8uaW5kZXhPZmAgd2l0aG91dCBzdXBwb3J0IGZvciBiaW5hcnkgc2VhcmNoZXMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IFRoZSBhcnJheSB0byBzZWFyY2guXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBzZWFyY2ggZm9yLlxuICogQHBhcmFtIHtudW1iZXJ9IGZyb21JbmRleCBUaGUgaW5kZXggdG8gc2VhcmNoIGZyb20uXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBSZXR1cm5zIHRoZSBpbmRleCBvZiB0aGUgbWF0Y2hlZCB2YWx1ZSwgZWxzZSBgLTFgLlxuICovXG5mdW5jdGlvbiBiYXNlSW5kZXhPZihhcnJheSwgdmFsdWUsIGZyb21JbmRleCkge1xuICBpZiAodmFsdWUgIT09IHZhbHVlKSB7XG4gICAgcmV0dXJuIGluZGV4T2ZOYU4oYXJyYXksIGZyb21JbmRleCk7XG4gIH1cbiAgdmFyIGluZGV4ID0gZnJvbUluZGV4IC0gMSxcbiAgICAgIGxlbmd0aCA9IGFycmF5Lmxlbmd0aDtcblxuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIGlmIChhcnJheVtpbmRleF0gPT09IHZhbHVlKSB7XG4gICAgICByZXR1cm4gaW5kZXg7XG4gICAgfVxuICB9XG4gIHJldHVybiAtMTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBiYXNlSW5kZXhPZjtcbiIsInZhciBiYXNlSXNFcXVhbERlZXAgPSByZXF1aXJlKCcuL2Jhc2VJc0VxdWFsRGVlcCcpO1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLmlzRXF1YWxgIHdpdGhvdXQgc3VwcG9ydCBmb3IgYHRoaXNgIGJpbmRpbmdcbiAqIGBjdXN0b21pemVyYCBmdW5jdGlvbnMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNvbXBhcmUuXG4gKiBAcGFyYW0geyp9IG90aGVyIFRoZSBvdGhlciB2YWx1ZSB0byBjb21wYXJlLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gW2N1c3RvbWl6ZXJdIFRoZSBmdW5jdGlvbiB0byBjdXN0b21pemUgY29tcGFyaW5nIHZhbHVlcy5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW2lzTG9vc2VdIFNwZWNpZnkgcGVyZm9ybWluZyBwYXJ0aWFsIGNvbXBhcmlzb25zLlxuICogQHBhcmFtIHtBcnJheX0gW3N0YWNrQV0gVHJhY2tzIHRyYXZlcnNlZCBgdmFsdWVgIG9iamVjdHMuXG4gKiBAcGFyYW0ge0FycmF5fSBbc3RhY2tCXSBUcmFja3MgdHJhdmVyc2VkIGBvdGhlcmAgb2JqZWN0cy5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgdmFsdWVzIGFyZSBlcXVpdmFsZW50LCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGJhc2VJc0VxdWFsKHZhbHVlLCBvdGhlciwgY3VzdG9taXplciwgaXNMb29zZSwgc3RhY2tBLCBzdGFja0IpIHtcbiAgLy8gRXhpdCBlYXJseSBmb3IgaWRlbnRpY2FsIHZhbHVlcy5cbiAgaWYgKHZhbHVlID09PSBvdGhlcikge1xuICAgIC8vIFRyZWF0IGArMGAgdnMuIGAtMGAgYXMgbm90IGVxdWFsLlxuICAgIHJldHVybiB2YWx1ZSAhPT0gMCB8fCAoMSAvIHZhbHVlID09IDEgLyBvdGhlcik7XG4gIH1cbiAgdmFyIHZhbFR5cGUgPSB0eXBlb2YgdmFsdWUsXG4gICAgICBvdGhUeXBlID0gdHlwZW9mIG90aGVyO1xuXG4gIC8vIEV4aXQgZWFybHkgZm9yIHVubGlrZSBwcmltaXRpdmUgdmFsdWVzLlxuICBpZiAoKHZhbFR5cGUgIT0gJ2Z1bmN0aW9uJyAmJiB2YWxUeXBlICE9ICdvYmplY3QnICYmIG90aFR5cGUgIT0gJ2Z1bmN0aW9uJyAmJiBvdGhUeXBlICE9ICdvYmplY3QnKSB8fFxuICAgICAgdmFsdWUgPT0gbnVsbCB8fCBvdGhlciA9PSBudWxsKSB7XG4gICAgLy8gUmV0dXJuIGBmYWxzZWAgdW5sZXNzIGJvdGggdmFsdWVzIGFyZSBgTmFOYC5cbiAgICByZXR1cm4gdmFsdWUgIT09IHZhbHVlICYmIG90aGVyICE9PSBvdGhlcjtcbiAgfVxuICByZXR1cm4gYmFzZUlzRXF1YWxEZWVwKHZhbHVlLCBvdGhlciwgYmFzZUlzRXF1YWwsIGN1c3RvbWl6ZXIsIGlzTG9vc2UsIHN0YWNrQSwgc3RhY2tCKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBiYXNlSXNFcXVhbDtcbiIsInZhciBlcXVhbEFycmF5cyA9IHJlcXVpcmUoJy4vZXF1YWxBcnJheXMnKSxcbiAgICBlcXVhbEJ5VGFnID0gcmVxdWlyZSgnLi9lcXVhbEJ5VGFnJyksXG4gICAgZXF1YWxPYmplY3RzID0gcmVxdWlyZSgnLi9lcXVhbE9iamVjdHMnKSxcbiAgICBpc0FycmF5ID0gcmVxdWlyZSgnLi4vbGFuZy9pc0FycmF5JyksXG4gICAgaXNUeXBlZEFycmF5ID0gcmVxdWlyZSgnLi4vbGFuZy9pc1R5cGVkQXJyYXknKTtcblxuLyoqIGBPYmplY3QjdG9TdHJpbmdgIHJlc3VsdCByZWZlcmVuY2VzLiAqL1xudmFyIGFyZ3NUYWcgPSAnW29iamVjdCBBcmd1bWVudHNdJyxcbiAgICBhcnJheVRhZyA9ICdbb2JqZWN0IEFycmF5XScsXG4gICAgZnVuY1RhZyA9ICdbb2JqZWN0IEZ1bmN0aW9uXScsXG4gICAgb2JqZWN0VGFnID0gJ1tvYmplY3QgT2JqZWN0XSc7XG5cbi8qKiBVc2VkIGZvciBuYXRpdmUgbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKiogVXNlZCB0byBjaGVjayBvYmplY3RzIGZvciBvd24gcHJvcGVydGllcy4gKi9cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IG9iamVjdFByb3RvLmhhc093blByb3BlcnR5O1xuXG4vKipcbiAqIFVzZWQgdG8gcmVzb2x2ZSB0aGUgW2B0b1N0cmluZ1RhZ2BdKGh0dHBzOi8vcGVvcGxlLm1vemlsbGEub3JnL35qb3JlbmRvcmZmL2VzNi1kcmFmdC5odG1sI3NlYy1vYmplY3QucHJvdG90eXBlLnRvc3RyaW5nKVxuICogb2YgdmFsdWVzLlxuICovXG52YXIgb2JqVG9TdHJpbmcgPSBvYmplY3RQcm90by50b1N0cmluZztcblxuLyoqXG4gKiBBIHNwZWNpYWxpemVkIHZlcnNpb24gb2YgYGJhc2VJc0VxdWFsYCBmb3IgYXJyYXlzIGFuZCBvYmplY3RzIHdoaWNoIHBlcmZvcm1zXG4gKiBkZWVwIGNvbXBhcmlzb25zIGFuZCB0cmFja3MgdHJhdmVyc2VkIG9iamVjdHMgZW5hYmxpbmcgb2JqZWN0cyB3aXRoIGNpcmN1bGFyXG4gKiByZWZlcmVuY2VzIHRvIGJlIGNvbXBhcmVkLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gY29tcGFyZS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBvdGhlciBUaGUgb3RoZXIgb2JqZWN0IHRvIGNvbXBhcmUuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBlcXVhbEZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGRldGVybWluZSBlcXVpdmFsZW50cyBvZiB2YWx1ZXMuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY3VzdG9taXplcl0gVGhlIGZ1bmN0aW9uIHRvIGN1c3RvbWl6ZSBjb21wYXJpbmcgb2JqZWN0cy5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW2lzTG9vc2VdIFNwZWNpZnkgcGVyZm9ybWluZyBwYXJ0aWFsIGNvbXBhcmlzb25zLlxuICogQHBhcmFtIHtBcnJheX0gW3N0YWNrQT1bXV0gVHJhY2tzIHRyYXZlcnNlZCBgdmFsdWVgIG9iamVjdHMuXG4gKiBAcGFyYW0ge0FycmF5fSBbc3RhY2tCPVtdXSBUcmFja3MgdHJhdmVyc2VkIGBvdGhlcmAgb2JqZWN0cy5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgb2JqZWN0cyBhcmUgZXF1aXZhbGVudCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBiYXNlSXNFcXVhbERlZXAob2JqZWN0LCBvdGhlciwgZXF1YWxGdW5jLCBjdXN0b21pemVyLCBpc0xvb3NlLCBzdGFja0EsIHN0YWNrQikge1xuICB2YXIgb2JqSXNBcnIgPSBpc0FycmF5KG9iamVjdCksXG4gICAgICBvdGhJc0FyciA9IGlzQXJyYXkob3RoZXIpLFxuICAgICAgb2JqVGFnID0gYXJyYXlUYWcsXG4gICAgICBvdGhUYWcgPSBhcnJheVRhZztcblxuICBpZiAoIW9iaklzQXJyKSB7XG4gICAgb2JqVGFnID0gb2JqVG9TdHJpbmcuY2FsbChvYmplY3QpO1xuICAgIGlmIChvYmpUYWcgPT0gYXJnc1RhZykge1xuICAgICAgb2JqVGFnID0gb2JqZWN0VGFnO1xuICAgIH0gZWxzZSBpZiAob2JqVGFnICE9IG9iamVjdFRhZykge1xuICAgICAgb2JqSXNBcnIgPSBpc1R5cGVkQXJyYXkob2JqZWN0KTtcbiAgICB9XG4gIH1cbiAgaWYgKCFvdGhJc0Fycikge1xuICAgIG90aFRhZyA9IG9ialRvU3RyaW5nLmNhbGwob3RoZXIpO1xuICAgIGlmIChvdGhUYWcgPT0gYXJnc1RhZykge1xuICAgICAgb3RoVGFnID0gb2JqZWN0VGFnO1xuICAgIH0gZWxzZSBpZiAob3RoVGFnICE9IG9iamVjdFRhZykge1xuICAgICAgb3RoSXNBcnIgPSBpc1R5cGVkQXJyYXkob3RoZXIpO1xuICAgIH1cbiAgfVxuICB2YXIgb2JqSXNPYmogPSAob2JqVGFnID09IG9iamVjdFRhZyB8fCAoaXNMb29zZSAmJiBvYmpUYWcgPT0gZnVuY1RhZykpLFxuICAgICAgb3RoSXNPYmogPSAob3RoVGFnID09IG9iamVjdFRhZyB8fCAoaXNMb29zZSAmJiBvdGhUYWcgPT0gZnVuY1RhZykpLFxuICAgICAgaXNTYW1lVGFnID0gb2JqVGFnID09IG90aFRhZztcblxuICBpZiAoaXNTYW1lVGFnICYmICEob2JqSXNBcnIgfHwgb2JqSXNPYmopKSB7XG4gICAgcmV0dXJuIGVxdWFsQnlUYWcob2JqZWN0LCBvdGhlciwgb2JqVGFnKTtcbiAgfVxuICBpZiAoaXNMb29zZSkge1xuICAgIGlmICghaXNTYW1lVGFnICYmICEob2JqSXNPYmogJiYgb3RoSXNPYmopKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHZhciB2YWxXcmFwcGVkID0gb2JqSXNPYmogJiYgaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsICdfX3dyYXBwZWRfXycpLFxuICAgICAgICBvdGhXcmFwcGVkID0gb3RoSXNPYmogJiYgaGFzT3duUHJvcGVydHkuY2FsbChvdGhlciwgJ19fd3JhcHBlZF9fJyk7XG5cbiAgICBpZiAodmFsV3JhcHBlZCB8fCBvdGhXcmFwcGVkKSB7XG4gICAgICByZXR1cm4gZXF1YWxGdW5jKHZhbFdyYXBwZWQgPyBvYmplY3QudmFsdWUoKSA6IG9iamVjdCwgb3RoV3JhcHBlZCA/IG90aGVyLnZhbHVlKCkgOiBvdGhlciwgY3VzdG9taXplciwgaXNMb29zZSwgc3RhY2tBLCBzdGFja0IpO1xuICAgIH1cbiAgICBpZiAoIWlzU2FtZVRhZykge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuICAvLyBBc3N1bWUgY3ljbGljIHZhbHVlcyBhcmUgZXF1YWwuXG4gIC8vIEZvciBtb3JlIGluZm9ybWF0aW9uIG9uIGRldGVjdGluZyBjaXJjdWxhciByZWZlcmVuY2VzIHNlZSBodHRwczovL2VzNS5naXRodWIuaW8vI0pPLlxuICBzdGFja0EgfHwgKHN0YWNrQSA9IFtdKTtcbiAgc3RhY2tCIHx8IChzdGFja0IgPSBbXSk7XG5cbiAgdmFyIGxlbmd0aCA9IHN0YWNrQS5sZW5ndGg7XG4gIHdoaWxlIChsZW5ndGgtLSkge1xuICAgIGlmIChzdGFja0FbbGVuZ3RoXSA9PSBvYmplY3QpIHtcbiAgICAgIHJldHVybiBzdGFja0JbbGVuZ3RoXSA9PSBvdGhlcjtcbiAgICB9XG4gIH1cbiAgLy8gQWRkIGBvYmplY3RgIGFuZCBgb3RoZXJgIHRvIHRoZSBzdGFjayBvZiB0cmF2ZXJzZWQgb2JqZWN0cy5cbiAgc3RhY2tBLnB1c2gob2JqZWN0KTtcbiAgc3RhY2tCLnB1c2gob3RoZXIpO1xuXG4gIHZhciByZXN1bHQgPSAob2JqSXNBcnIgPyBlcXVhbEFycmF5cyA6IGVxdWFsT2JqZWN0cykob2JqZWN0LCBvdGhlciwgZXF1YWxGdW5jLCBjdXN0b21pemVyLCBpc0xvb3NlLCBzdGFja0EsIHN0YWNrQik7XG5cbiAgc3RhY2tBLnBvcCgpO1xuICBzdGFja0IucG9wKCk7XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBiYXNlSXNFcXVhbERlZXA7XG4iLCIvKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLmlzRnVuY3Rpb25gIHdpdGhvdXQgc3VwcG9ydCBmb3IgZW52aXJvbm1lbnRzXG4gKiB3aXRoIGluY29ycmVjdCBgdHlwZW9mYCByZXN1bHRzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGNvcnJlY3RseSBjbGFzc2lmaWVkLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGJhc2VJc0Z1bmN0aW9uKHZhbHVlKSB7XG4gIC8vIEF2b2lkIGEgQ2hha3JhIEpJVCBidWcgaW4gY29tcGF0aWJpbGl0eSBtb2RlcyBvZiBJRSAxMS5cbiAgLy8gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9qYXNoa2VuYXMvdW5kZXJzY29yZS9pc3N1ZXMvMTYyMSBmb3IgbW9yZSBkZXRhaWxzLlxuICByZXR1cm4gdHlwZW9mIHZhbHVlID09ICdmdW5jdGlvbicgfHwgZmFsc2U7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYmFzZUlzRnVuY3Rpb247XG4iLCJ2YXIgYmFzZUlzRXF1YWwgPSByZXF1aXJlKCcuL2Jhc2VJc0VxdWFsJyk7XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8uaXNNYXRjaGAgd2l0aG91dCBzdXBwb3J0IGZvciBjYWxsYmFja1xuICogc2hvcnRoYW5kcyBhbmQgYHRoaXNgIGJpbmRpbmcuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBpbnNwZWN0LlxuICogQHBhcmFtIHtBcnJheX0gcHJvcHMgVGhlIHNvdXJjZSBwcm9wZXJ0eSBuYW1lcyB0byBtYXRjaC5cbiAqIEBwYXJhbSB7QXJyYXl9IHZhbHVlcyBUaGUgc291cmNlIHZhbHVlcyB0byBtYXRjaC5cbiAqIEBwYXJhbSB7QXJyYXl9IHN0cmljdENvbXBhcmVGbGFncyBTdHJpY3QgY29tcGFyaXNvbiBmbGFncyBmb3Igc291cmNlIHZhbHVlcy5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtjdXN0b21pemVyXSBUaGUgZnVuY3Rpb24gdG8gY3VzdG9taXplIGNvbXBhcmluZyBvYmplY3RzLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGBvYmplY3RgIGlzIGEgbWF0Y2gsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gYmFzZUlzTWF0Y2gob2JqZWN0LCBwcm9wcywgdmFsdWVzLCBzdHJpY3RDb21wYXJlRmxhZ3MsIGN1c3RvbWl6ZXIpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBsZW5ndGggPSBwcm9wcy5sZW5ndGgsXG4gICAgICBub0N1c3RvbWl6ZXIgPSAhY3VzdG9taXplcjtcblxuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIGlmICgobm9DdXN0b21pemVyICYmIHN0cmljdENvbXBhcmVGbGFnc1tpbmRleF0pXG4gICAgICAgICAgPyB2YWx1ZXNbaW5kZXhdICE9PSBvYmplY3RbcHJvcHNbaW5kZXhdXVxuICAgICAgICAgIDogIShwcm9wc1tpbmRleF0gaW4gb2JqZWN0KVxuICAgICAgICApIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cbiAgaW5kZXggPSAtMTtcbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICB2YXIga2V5ID0gcHJvcHNbaW5kZXhdLFxuICAgICAgICBvYmpWYWx1ZSA9IG9iamVjdFtrZXldLFxuICAgICAgICBzcmNWYWx1ZSA9IHZhbHVlc1tpbmRleF07XG5cbiAgICBpZiAobm9DdXN0b21pemVyICYmIHN0cmljdENvbXBhcmVGbGFnc1tpbmRleF0pIHtcbiAgICAgIHZhciByZXN1bHQgPSB0eXBlb2Ygb2JqVmFsdWUgIT0gJ3VuZGVmaW5lZCcgfHwgKGtleSBpbiBvYmplY3QpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXN1bHQgPSBjdXN0b21pemVyID8gY3VzdG9taXplcihvYmpWYWx1ZSwgc3JjVmFsdWUsIGtleSkgOiB1bmRlZmluZWQ7XG4gICAgICBpZiAodHlwZW9mIHJlc3VsdCA9PSAndW5kZWZpbmVkJykge1xuICAgICAgICByZXN1bHQgPSBiYXNlSXNFcXVhbChzcmNWYWx1ZSwgb2JqVmFsdWUsIGN1c3RvbWl6ZXIsIHRydWUpO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoIXJlc3VsdCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuICByZXR1cm4gdHJ1ZTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBiYXNlSXNNYXRjaDtcbiIsInZhciBiYXNlRWFjaCA9IHJlcXVpcmUoJy4vYmFzZUVhY2gnKTtcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5tYXBgIHdpdGhvdXQgc3VwcG9ydCBmb3IgY2FsbGJhY2sgc2hvcnRoYW5kc1xuICogYW5kIGB0aGlzYCBiaW5kaW5nLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fE9iamVjdHxzdHJpbmd9IGNvbGxlY3Rpb24gVGhlIGNvbGxlY3Rpb24gdG8gaXRlcmF0ZSBvdmVyLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gaXRlcmF0ZWUgVGhlIGZ1bmN0aW9uIGludm9rZWQgcGVyIGl0ZXJhdGlvbi5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgbmV3IG1hcHBlZCBhcnJheS5cbiAqL1xuZnVuY3Rpb24gYmFzZU1hcChjb2xsZWN0aW9uLCBpdGVyYXRlZSkge1xuICB2YXIgcmVzdWx0ID0gW107XG4gIGJhc2VFYWNoKGNvbGxlY3Rpb24sIGZ1bmN0aW9uKHZhbHVlLCBrZXksIGNvbGxlY3Rpb24pIHtcbiAgICByZXN1bHQucHVzaChpdGVyYXRlZSh2YWx1ZSwga2V5LCBjb2xsZWN0aW9uKSk7XG4gIH0pO1xuICByZXR1cm4gcmVzdWx0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJhc2VNYXA7XG4iLCJ2YXIgYmFzZUlzTWF0Y2ggPSByZXF1aXJlKCcuL2Jhc2VJc01hdGNoJyksXG4gICAgY29uc3RhbnQgPSByZXF1aXJlKCcuLi91dGlsaXR5L2NvbnN0YW50JyksXG4gICAgaXNTdHJpY3RDb21wYXJhYmxlID0gcmVxdWlyZSgnLi9pc1N0cmljdENvbXBhcmFibGUnKSxcbiAgICBrZXlzID0gcmVxdWlyZSgnLi4vb2JqZWN0L2tleXMnKSxcbiAgICB0b09iamVjdCA9IHJlcXVpcmUoJy4vdG9PYmplY3QnKTtcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5tYXRjaGVzYCB3aGljaCBkb2VzIG5vdCBjbG9uZSBgc291cmNlYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IHNvdXJjZSBUaGUgb2JqZWN0IG9mIHByb3BlcnR5IHZhbHVlcyB0byBtYXRjaC5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiBiYXNlTWF0Y2hlcyhzb3VyY2UpIHtcbiAgdmFyIHByb3BzID0ga2V5cyhzb3VyY2UpLFxuICAgICAgbGVuZ3RoID0gcHJvcHMubGVuZ3RoO1xuXG4gIGlmICghbGVuZ3RoKSB7XG4gICAgcmV0dXJuIGNvbnN0YW50KHRydWUpO1xuICB9XG4gIGlmIChsZW5ndGggPT0gMSkge1xuICAgIHZhciBrZXkgPSBwcm9wc1swXSxcbiAgICAgICAgdmFsdWUgPSBzb3VyY2Vba2V5XTtcblxuICAgIGlmIChpc1N0cmljdENvbXBhcmFibGUodmFsdWUpKSB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24ob2JqZWN0KSB7XG4gICAgICAgIHJldHVybiBvYmplY3QgIT0gbnVsbCAmJiBvYmplY3Rba2V5XSA9PT0gdmFsdWUgJiZcbiAgICAgICAgICAodHlwZW9mIHZhbHVlICE9ICd1bmRlZmluZWQnIHx8IChrZXkgaW4gdG9PYmplY3Qob2JqZWN0KSkpO1xuICAgICAgfTtcbiAgICB9XG4gIH1cbiAgdmFyIHZhbHVlcyA9IEFycmF5KGxlbmd0aCksXG4gICAgICBzdHJpY3RDb21wYXJlRmxhZ3MgPSBBcnJheShsZW5ndGgpO1xuXG4gIHdoaWxlIChsZW5ndGgtLSkge1xuICAgIHZhbHVlID0gc291cmNlW3Byb3BzW2xlbmd0aF1dO1xuICAgIHZhbHVlc1tsZW5ndGhdID0gdmFsdWU7XG4gICAgc3RyaWN0Q29tcGFyZUZsYWdzW2xlbmd0aF0gPSBpc1N0cmljdENvbXBhcmFibGUodmFsdWUpO1xuICB9XG4gIHJldHVybiBmdW5jdGlvbihvYmplY3QpIHtcbiAgICByZXR1cm4gb2JqZWN0ICE9IG51bGwgJiYgYmFzZUlzTWF0Y2godG9PYmplY3Qob2JqZWN0KSwgcHJvcHMsIHZhbHVlcywgc3RyaWN0Q29tcGFyZUZsYWdzKTtcbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBiYXNlTWF0Y2hlcztcbiIsInZhciBiYXNlSXNFcXVhbCA9IHJlcXVpcmUoJy4vYmFzZUlzRXF1YWwnKSxcbiAgICBpc1N0cmljdENvbXBhcmFibGUgPSByZXF1aXJlKCcuL2lzU3RyaWN0Q29tcGFyYWJsZScpLFxuICAgIHRvT2JqZWN0ID0gcmVxdWlyZSgnLi90b09iamVjdCcpO1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLm1hdGNoZXNQcm9wZXJ0eWAgd2hpY2ggZG9lcyBub3QgY29lcmNlIGBrZXlgXG4gKiB0byBhIHN0cmluZy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSBwcm9wZXJ0eSB0byBnZXQuXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjb21wYXJlLlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIGJhc2VNYXRjaGVzUHJvcGVydHkoa2V5LCB2YWx1ZSkge1xuICBpZiAoaXNTdHJpY3RDb21wYXJhYmxlKHZhbHVlKSkge1xuICAgIHJldHVybiBmdW5jdGlvbihvYmplY3QpIHtcbiAgICAgIHJldHVybiBvYmplY3QgIT0gbnVsbCAmJiBvYmplY3Rba2V5XSA9PT0gdmFsdWUgJiZcbiAgICAgICAgKHR5cGVvZiB2YWx1ZSAhPSAndW5kZWZpbmVkJyB8fCAoa2V5IGluIHRvT2JqZWN0KG9iamVjdCkpKTtcbiAgICB9O1xuICB9XG4gIHJldHVybiBmdW5jdGlvbihvYmplY3QpIHtcbiAgICByZXR1cm4gb2JqZWN0ICE9IG51bGwgJiYgYmFzZUlzRXF1YWwodmFsdWUsIG9iamVjdFtrZXldLCBudWxsLCB0cnVlKTtcbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBiYXNlTWF0Y2hlc1Byb3BlcnR5O1xuIiwiLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5wcm9wZXJ0eWAgd2hpY2ggZG9lcyBub3QgY29lcmNlIGBrZXlgIHRvIGEgc3RyaW5nLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHByb3BlcnR5IHRvIGdldC5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiBiYXNlUHJvcGVydHkoa2V5KSB7XG4gIHJldHVybiBmdW5jdGlvbihvYmplY3QpIHtcbiAgICByZXR1cm4gb2JqZWN0ID09IG51bGwgPyB1bmRlZmluZWQgOiBvYmplY3Rba2V5XTtcbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBiYXNlUHJvcGVydHk7XG4iLCIvKipcbiAqIENvbnZlcnRzIGB2YWx1ZWAgdG8gYSBzdHJpbmcgaWYgaXQgaXMgbm90IG9uZS4gQW4gZW1wdHkgc3RyaW5nIGlzIHJldHVybmVkXG4gKiBmb3IgYG51bGxgIG9yIGB1bmRlZmluZWRgIHZhbHVlcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gcHJvY2Vzcy5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIHN0cmluZy5cbiAqL1xuZnVuY3Rpb24gYmFzZVRvU3RyaW5nKHZhbHVlKSB7XG4gIGlmICh0eXBlb2YgdmFsdWUgPT0gJ3N0cmluZycpIHtcbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cbiAgcmV0dXJuIHZhbHVlID09IG51bGwgPyAnJyA6ICh2YWx1ZSArICcnKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBiYXNlVG9TdHJpbmc7XG4iLCJ2YXIgYmFzZUluZGV4T2YgPSByZXF1aXJlKCcuL2Jhc2VJbmRleE9mJyksXG4gICAgY2FjaGVJbmRleE9mID0gcmVxdWlyZSgnLi9jYWNoZUluZGV4T2YnKSxcbiAgICBjcmVhdGVDYWNoZSA9IHJlcXVpcmUoJy4vY3JlYXRlQ2FjaGUnKTtcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy51bmlxYCB3aXRob3V0IHN1cHBvcnQgZm9yIGNhbGxiYWNrIHNob3J0aGFuZHNcbiAqIGFuZCBgdGhpc2AgYmluZGluZy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheX0gYXJyYXkgVGhlIGFycmF5IHRvIGluc3BlY3QuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbaXRlcmF0ZWVdIFRoZSBmdW5jdGlvbiBpbnZva2VkIHBlciBpdGVyYXRpb24uXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIG5ldyBkdXBsaWNhdGUtdmFsdWUtZnJlZSBhcnJheS5cbiAqL1xuZnVuY3Rpb24gYmFzZVVuaXEoYXJyYXksIGl0ZXJhdGVlKSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgaW5kZXhPZiA9IGJhc2VJbmRleE9mLFxuICAgICAgbGVuZ3RoID0gYXJyYXkubGVuZ3RoLFxuICAgICAgaXNDb21tb24gPSB0cnVlLFxuICAgICAgaXNMYXJnZSA9IGlzQ29tbW9uICYmIGxlbmd0aCA+PSAyMDAsXG4gICAgICBzZWVuID0gaXNMYXJnZSA/IGNyZWF0ZUNhY2hlKCkgOiBudWxsLFxuICAgICAgcmVzdWx0ID0gW107XG5cbiAgaWYgKHNlZW4pIHtcbiAgICBpbmRleE9mID0gY2FjaGVJbmRleE9mO1xuICAgIGlzQ29tbW9uID0gZmFsc2U7XG4gIH0gZWxzZSB7XG4gICAgaXNMYXJnZSA9IGZhbHNlO1xuICAgIHNlZW4gPSBpdGVyYXRlZSA/IFtdIDogcmVzdWx0O1xuICB9XG4gIG91dGVyOlxuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIHZhciB2YWx1ZSA9IGFycmF5W2luZGV4XSxcbiAgICAgICAgY29tcHV0ZWQgPSBpdGVyYXRlZSA/IGl0ZXJhdGVlKHZhbHVlLCBpbmRleCwgYXJyYXkpIDogdmFsdWU7XG5cbiAgICBpZiAoaXNDb21tb24gJiYgdmFsdWUgPT09IHZhbHVlKSB7XG4gICAgICB2YXIgc2VlbkluZGV4ID0gc2Vlbi5sZW5ndGg7XG4gICAgICB3aGlsZSAoc2VlbkluZGV4LS0pIHtcbiAgICAgICAgaWYgKHNlZW5bc2VlbkluZGV4XSA9PT0gY29tcHV0ZWQpIHtcbiAgICAgICAgICBjb250aW51ZSBvdXRlcjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKGl0ZXJhdGVlKSB7XG4gICAgICAgIHNlZW4ucHVzaChjb21wdXRlZCk7XG4gICAgICB9XG4gICAgICByZXN1bHQucHVzaCh2YWx1ZSk7XG4gICAgfVxuICAgIGVsc2UgaWYgKGluZGV4T2Yoc2VlbiwgY29tcHV0ZWQsIDApIDwgMCkge1xuICAgICAgaWYgKGl0ZXJhdGVlIHx8IGlzTGFyZ2UpIHtcbiAgICAgICAgc2Vlbi5wdXNoKGNvbXB1dGVkKTtcbiAgICAgIH1cbiAgICAgIHJlc3VsdC5wdXNoKHZhbHVlKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBiYXNlVW5pcTtcbiIsInZhciBpZGVudGl0eSA9IHJlcXVpcmUoJy4uL3V0aWxpdHkvaWRlbnRpdHknKTtcblxuLyoqXG4gKiBBIHNwZWNpYWxpemVkIHZlcnNpb24gb2YgYGJhc2VDYWxsYmFja2Agd2hpY2ggb25seSBzdXBwb3J0cyBgdGhpc2AgYmluZGluZ1xuICogYW5kIHNwZWNpZnlpbmcgdGhlIG51bWJlciBvZiBhcmd1bWVudHMgdG8gcHJvdmlkZSB0byBgZnVuY2AuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGJpbmQuXG4gKiBAcGFyYW0geyp9IHRoaXNBcmcgVGhlIGB0aGlzYCBiaW5kaW5nIG9mIGBmdW5jYC5cbiAqIEBwYXJhbSB7bnVtYmVyfSBbYXJnQ291bnRdIFRoZSBudW1iZXIgb2YgYXJndW1lbnRzIHRvIHByb3ZpZGUgdG8gYGZ1bmNgLlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBjYWxsYmFjay5cbiAqL1xuZnVuY3Rpb24gYmluZENhbGxiYWNrKGZ1bmMsIHRoaXNBcmcsIGFyZ0NvdW50KSB7XG4gIGlmICh0eXBlb2YgZnVuYyAhPSAnZnVuY3Rpb24nKSB7XG4gICAgcmV0dXJuIGlkZW50aXR5O1xuICB9XG4gIGlmICh0eXBlb2YgdGhpc0FyZyA9PSAndW5kZWZpbmVkJykge1xuICAgIHJldHVybiBmdW5jO1xuICB9XG4gIHN3aXRjaCAoYXJnQ291bnQpIHtcbiAgICBjYXNlIDE6IHJldHVybiBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgcmV0dXJuIGZ1bmMuY2FsbCh0aGlzQXJnLCB2YWx1ZSk7XG4gICAgfTtcbiAgICBjYXNlIDM6IHJldHVybiBmdW5jdGlvbih2YWx1ZSwgaW5kZXgsIGNvbGxlY3Rpb24pIHtcbiAgICAgIHJldHVybiBmdW5jLmNhbGwodGhpc0FyZywgdmFsdWUsIGluZGV4LCBjb2xsZWN0aW9uKTtcbiAgICB9O1xuICAgIGNhc2UgNDogcmV0dXJuIGZ1bmN0aW9uKGFjY3VtdWxhdG9yLCB2YWx1ZSwgaW5kZXgsIGNvbGxlY3Rpb24pIHtcbiAgICAgIHJldHVybiBmdW5jLmNhbGwodGhpc0FyZywgYWNjdW11bGF0b3IsIHZhbHVlLCBpbmRleCwgY29sbGVjdGlvbik7XG4gICAgfTtcbiAgICBjYXNlIDU6IHJldHVybiBmdW5jdGlvbih2YWx1ZSwgb3RoZXIsIGtleSwgb2JqZWN0LCBzb3VyY2UpIHtcbiAgICAgIHJldHVybiBmdW5jLmNhbGwodGhpc0FyZywgdmFsdWUsIG90aGVyLCBrZXksIG9iamVjdCwgc291cmNlKTtcbiAgICB9O1xuICB9XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gZnVuYy5hcHBseSh0aGlzQXJnLCBhcmd1bWVudHMpO1xuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJpbmRDYWxsYmFjaztcbiIsInZhciBjb25zdGFudCA9IHJlcXVpcmUoJy4uL3V0aWxpdHkvY29uc3RhbnQnKSxcbiAgICBpc05hdGl2ZSA9IHJlcXVpcmUoJy4uL2xhbmcvaXNOYXRpdmUnKTtcblxuLyoqIE5hdGl2ZSBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBBcnJheUJ1ZmZlciA9IGlzTmF0aXZlKEFycmF5QnVmZmVyID0gZ2xvYmFsLkFycmF5QnVmZmVyKSAmJiBBcnJheUJ1ZmZlcixcbiAgICBidWZmZXJTbGljZSA9IGlzTmF0aXZlKGJ1ZmZlclNsaWNlID0gQXJyYXlCdWZmZXIgJiYgbmV3IEFycmF5QnVmZmVyKDApLnNsaWNlKSAmJiBidWZmZXJTbGljZSxcbiAgICBmbG9vciA9IE1hdGguZmxvb3IsXG4gICAgVWludDhBcnJheSA9IGlzTmF0aXZlKFVpbnQ4QXJyYXkgPSBnbG9iYWwuVWludDhBcnJheSkgJiYgVWludDhBcnJheTtcblxuLyoqIFVzZWQgdG8gY2xvbmUgYXJyYXkgYnVmZmVycy4gKi9cbnZhciBGbG9hdDY0QXJyYXkgPSAoZnVuY3Rpb24oKSB7XG4gIC8vIFNhZmFyaSA1IGVycm9ycyB3aGVuIHVzaW5nIGFuIGFycmF5IGJ1ZmZlciB0byBpbml0aWFsaXplIGEgdHlwZWQgYXJyYXlcbiAgLy8gd2hlcmUgdGhlIGFycmF5IGJ1ZmZlcidzIGBieXRlTGVuZ3RoYCBpcyBub3QgYSBtdWx0aXBsZSBvZiB0aGUgdHlwZWRcbiAgLy8gYXJyYXkncyBgQllURVNfUEVSX0VMRU1FTlRgLlxuICB0cnkge1xuICAgIHZhciBmdW5jID0gaXNOYXRpdmUoZnVuYyA9IGdsb2JhbC5GbG9hdDY0QXJyYXkpICYmIGZ1bmMsXG4gICAgICAgIHJlc3VsdCA9IG5ldyBmdW5jKG5ldyBBcnJheUJ1ZmZlcigxMCksIDAsIDEpICYmIGZ1bmM7XG4gIH0gY2F0Y2goZSkge31cbiAgcmV0dXJuIHJlc3VsdDtcbn0oKSk7XG5cbi8qKiBVc2VkIGFzIHRoZSBzaXplLCBpbiBieXRlcywgb2YgZWFjaCBgRmxvYXQ2NEFycmF5YCBlbGVtZW50LiAqL1xudmFyIEZMT0FUNjRfQllURVNfUEVSX0VMRU1FTlQgPSBGbG9hdDY0QXJyYXkgPyBGbG9hdDY0QXJyYXkuQllURVNfUEVSX0VMRU1FTlQgOiAwO1xuXG4vKipcbiAqIENyZWF0ZXMgYSBjbG9uZSBvZiB0aGUgZ2l2ZW4gYXJyYXkgYnVmZmVyLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5QnVmZmVyfSBidWZmZXIgVGhlIGFycmF5IGJ1ZmZlciB0byBjbG9uZS5cbiAqIEByZXR1cm5zIHtBcnJheUJ1ZmZlcn0gUmV0dXJucyB0aGUgY2xvbmVkIGFycmF5IGJ1ZmZlci5cbiAqL1xuZnVuY3Rpb24gYnVmZmVyQ2xvbmUoYnVmZmVyKSB7XG4gIHJldHVybiBidWZmZXJTbGljZS5jYWxsKGJ1ZmZlciwgMCk7XG59XG5pZiAoIWJ1ZmZlclNsaWNlKSB7XG4gIC8vIFBoYW50b21KUyBoYXMgYEFycmF5QnVmZmVyYCBhbmQgYFVpbnQ4QXJyYXlgIGJ1dCBub3QgYEZsb2F0NjRBcnJheWAuXG4gIGJ1ZmZlckNsb25lID0gIShBcnJheUJ1ZmZlciAmJiBVaW50OEFycmF5KSA/IGNvbnN0YW50KG51bGwpIDogZnVuY3Rpb24oYnVmZmVyKSB7XG4gICAgdmFyIGJ5dGVMZW5ndGggPSBidWZmZXIuYnl0ZUxlbmd0aCxcbiAgICAgICAgZmxvYXRMZW5ndGggPSBGbG9hdDY0QXJyYXkgPyBmbG9vcihieXRlTGVuZ3RoIC8gRkxPQVQ2NF9CWVRFU19QRVJfRUxFTUVOVCkgOiAwLFxuICAgICAgICBvZmZzZXQgPSBmbG9hdExlbmd0aCAqIEZMT0FUNjRfQllURVNfUEVSX0VMRU1FTlQsXG4gICAgICAgIHJlc3VsdCA9IG5ldyBBcnJheUJ1ZmZlcihieXRlTGVuZ3RoKTtcblxuICAgIGlmIChmbG9hdExlbmd0aCkge1xuICAgICAgdmFyIHZpZXcgPSBuZXcgRmxvYXQ2NEFycmF5KHJlc3VsdCwgMCwgZmxvYXRMZW5ndGgpO1xuICAgICAgdmlldy5zZXQobmV3IEZsb2F0NjRBcnJheShidWZmZXIsIDAsIGZsb2F0TGVuZ3RoKSk7XG4gICAgfVxuICAgIGlmIChieXRlTGVuZ3RoICE9IG9mZnNldCkge1xuICAgICAgdmlldyA9IG5ldyBVaW50OEFycmF5KHJlc3VsdCwgb2Zmc2V0KTtcbiAgICAgIHZpZXcuc2V0KG5ldyBVaW50OEFycmF5KGJ1ZmZlciwgb2Zmc2V0KSk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYnVmZmVyQ2xvbmU7XG4iLCJ2YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuLi9sYW5nL2lzT2JqZWN0Jyk7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgaW4gYGNhY2hlYCBtaW1pY2tpbmcgdGhlIHJldHVybiBzaWduYXR1cmUgb2ZcbiAqIGBfLmluZGV4T2ZgIGJ5IHJldHVybmluZyBgMGAgaWYgdGhlIHZhbHVlIGlzIGZvdW5kLCBlbHNlIGAtMWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBjYWNoZSBUaGUgY2FjaGUgdG8gc2VhcmNoLlxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gc2VhcmNoIGZvci5cbiAqIEByZXR1cm5zIHtudW1iZXJ9IFJldHVybnMgYDBgIGlmIGB2YWx1ZWAgaXMgZm91bmQsIGVsc2UgYC0xYC5cbiAqL1xuZnVuY3Rpb24gY2FjaGVJbmRleE9mKGNhY2hlLCB2YWx1ZSkge1xuICB2YXIgZGF0YSA9IGNhY2hlLmRhdGEsXG4gICAgICByZXN1bHQgPSAodHlwZW9mIHZhbHVlID09ICdzdHJpbmcnIHx8IGlzT2JqZWN0KHZhbHVlKSkgPyBkYXRhLnNldC5oYXModmFsdWUpIDogZGF0YS5oYXNoW3ZhbHVlXTtcblxuICByZXR1cm4gcmVzdWx0ID8gMCA6IC0xO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGNhY2hlSW5kZXhPZjtcbiIsInZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4uL2xhbmcvaXNPYmplY3QnKTtcblxuLyoqXG4gKiBBZGRzIGB2YWx1ZWAgdG8gdGhlIGNhY2hlLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBwdXNoXG4gKiBAbWVtYmVyT2YgU2V0Q2FjaGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNhY2hlLlxuICovXG5mdW5jdGlvbiBjYWNoZVB1c2godmFsdWUpIHtcbiAgdmFyIGRhdGEgPSB0aGlzLmRhdGE7XG4gIGlmICh0eXBlb2YgdmFsdWUgPT0gJ3N0cmluZycgfHwgaXNPYmplY3QodmFsdWUpKSB7XG4gICAgZGF0YS5zZXQuYWRkKHZhbHVlKTtcbiAgfSBlbHNlIHtcbiAgICBkYXRhLmhhc2hbdmFsdWVdID0gdHJ1ZTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGNhY2hlUHVzaDtcbiIsInZhciBpc0xlbmd0aCA9IHJlcXVpcmUoJy4vaXNMZW5ndGgnKSxcbiAgICB0b09iamVjdCA9IHJlcXVpcmUoJy4vdG9PYmplY3QnKTtcblxuLyoqXG4gKiBDcmVhdGVzIGEgYGJhc2VFYWNoYCBvciBgYmFzZUVhY2hSaWdodGAgZnVuY3Rpb24uXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGVhY2hGdW5jIFRoZSBmdW5jdGlvbiB0byBpdGVyYXRlIG92ZXIgYSBjb2xsZWN0aW9uLlxuICogQHBhcmFtIHtib29sZWFufSBbZnJvbVJpZ2h0XSBTcGVjaWZ5IGl0ZXJhdGluZyBmcm9tIHJpZ2h0IHRvIGxlZnQuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBiYXNlIGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiBjcmVhdGVCYXNlRWFjaChlYWNoRnVuYywgZnJvbVJpZ2h0KSB7XG4gIHJldHVybiBmdW5jdGlvbihjb2xsZWN0aW9uLCBpdGVyYXRlZSkge1xuICAgIHZhciBsZW5ndGggPSBjb2xsZWN0aW9uID8gY29sbGVjdGlvbi5sZW5ndGggOiAwO1xuICAgIGlmICghaXNMZW5ndGgobGVuZ3RoKSkge1xuICAgICAgcmV0dXJuIGVhY2hGdW5jKGNvbGxlY3Rpb24sIGl0ZXJhdGVlKTtcbiAgICB9XG4gICAgdmFyIGluZGV4ID0gZnJvbVJpZ2h0ID8gbGVuZ3RoIDogLTEsXG4gICAgICAgIGl0ZXJhYmxlID0gdG9PYmplY3QoY29sbGVjdGlvbik7XG5cbiAgICB3aGlsZSAoKGZyb21SaWdodCA/IGluZGV4LS0gOiArK2luZGV4IDwgbGVuZ3RoKSkge1xuICAgICAgaWYgKGl0ZXJhdGVlKGl0ZXJhYmxlW2luZGV4XSwgaW5kZXgsIGl0ZXJhYmxlKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBjb2xsZWN0aW9uO1xuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGNyZWF0ZUJhc2VFYWNoO1xuIiwidmFyIHRvT2JqZWN0ID0gcmVxdWlyZSgnLi90b09iamVjdCcpO1xuXG4vKipcbiAqIENyZWF0ZXMgYSBiYXNlIGZ1bmN0aW9uIGZvciBgXy5mb3JJbmAgb3IgYF8uZm9ySW5SaWdodGAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW2Zyb21SaWdodF0gU3BlY2lmeSBpdGVyYXRpbmcgZnJvbSByaWdodCB0byBsZWZ0LlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgYmFzZSBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gY3JlYXRlQmFzZUZvcihmcm9tUmlnaHQpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKG9iamVjdCwgaXRlcmF0ZWUsIGtleXNGdW5jKSB7XG4gICAgdmFyIGl0ZXJhYmxlID0gdG9PYmplY3Qob2JqZWN0KSxcbiAgICAgICAgcHJvcHMgPSBrZXlzRnVuYyhvYmplY3QpLFxuICAgICAgICBsZW5ndGggPSBwcm9wcy5sZW5ndGgsXG4gICAgICAgIGluZGV4ID0gZnJvbVJpZ2h0ID8gbGVuZ3RoIDogLTE7XG5cbiAgICB3aGlsZSAoKGZyb21SaWdodCA/IGluZGV4LS0gOiArK2luZGV4IDwgbGVuZ3RoKSkge1xuICAgICAgdmFyIGtleSA9IHByb3BzW2luZGV4XTtcbiAgICAgIGlmIChpdGVyYXRlZShpdGVyYWJsZVtrZXldLCBrZXksIGl0ZXJhYmxlKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBvYmplY3Q7XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gY3JlYXRlQmFzZUZvcjtcbiIsInZhciBTZXRDYWNoZSA9IHJlcXVpcmUoJy4vU2V0Q2FjaGUnKSxcbiAgICBjb25zdGFudCA9IHJlcXVpcmUoJy4uL3V0aWxpdHkvY29uc3RhbnQnKSxcbiAgICBpc05hdGl2ZSA9IHJlcXVpcmUoJy4uL2xhbmcvaXNOYXRpdmUnKTtcblxuLyoqIE5hdGl2ZSBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBTZXQgPSBpc05hdGl2ZShTZXQgPSBnbG9iYWwuU2V0KSAmJiBTZXQ7XG5cbi8qIE5hdGl2ZSBtZXRob2QgcmVmZXJlbmNlcyBmb3IgdGhvc2Ugd2l0aCB0aGUgc2FtZSBuYW1lIGFzIG90aGVyIGBsb2Rhc2hgIG1ldGhvZHMuICovXG52YXIgbmF0aXZlQ3JlYXRlID0gaXNOYXRpdmUobmF0aXZlQ3JlYXRlID0gT2JqZWN0LmNyZWF0ZSkgJiYgbmF0aXZlQ3JlYXRlO1xuXG4vKipcbiAqIENyZWF0ZXMgYSBgU2V0YCBjYWNoZSBvYmplY3QgdG8gb3B0aW1pemUgbGluZWFyIHNlYXJjaGVzIG9mIGxhcmdlIGFycmF5cy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheX0gW3ZhbHVlc10gVGhlIHZhbHVlcyB0byBjYWNoZS5cbiAqIEByZXR1cm5zIHtudWxsfE9iamVjdH0gUmV0dXJucyB0aGUgbmV3IGNhY2hlIG9iamVjdCBpZiBgU2V0YCBpcyBzdXBwb3J0ZWQsIGVsc2UgYG51bGxgLlxuICovXG52YXIgY3JlYXRlQ2FjaGUgPSAhKG5hdGl2ZUNyZWF0ZSAmJiBTZXQpID8gY29uc3RhbnQobnVsbCkgOiBmdW5jdGlvbih2YWx1ZXMpIHtcbiAgcmV0dXJuIG5ldyBTZXRDYWNoZSh2YWx1ZXMpO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBjcmVhdGVDYWNoZTtcbiIsInZhciBiYXNlQ2FsbGJhY2sgPSByZXF1aXJlKCcuL2Jhc2VDYWxsYmFjaycpLFxuICAgIGJhc2VGaW5kID0gcmVxdWlyZSgnLi9iYXNlRmluZCcpO1xuXG4vKipcbiAqIENyZWF0ZXMgYSBgXy5maW5kS2V5YCBvciBgXy5maW5kTGFzdEtleWAgZnVuY3Rpb24uXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IG9iamVjdEZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGl0ZXJhdGUgb3ZlciBhbiBvYmplY3QuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBmaW5kIGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiBjcmVhdGVGaW5kS2V5KG9iamVjdEZ1bmMpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKG9iamVjdCwgcHJlZGljYXRlLCB0aGlzQXJnKSB7XG4gICAgcHJlZGljYXRlID0gYmFzZUNhbGxiYWNrKHByZWRpY2F0ZSwgdGhpc0FyZywgMyk7XG4gICAgcmV0dXJuIGJhc2VGaW5kKG9iamVjdCwgcHJlZGljYXRlLCBvYmplY3RGdW5jLCB0cnVlKTtcbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBjcmVhdGVGaW5kS2V5O1xuIiwidmFyIGJpbmRDYWxsYmFjayA9IHJlcXVpcmUoJy4vYmluZENhbGxiYWNrJyksXG4gICAgaXNBcnJheSA9IHJlcXVpcmUoJy4uL2xhbmcvaXNBcnJheScpO1xuXG4vKipcbiAqIENyZWF0ZXMgYSBmdW5jdGlvbiBmb3IgYF8uZm9yRWFjaGAgb3IgYF8uZm9yRWFjaFJpZ2h0YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gYXJyYXlGdW5jIFRoZSBmdW5jdGlvbiB0byBpdGVyYXRlIG92ZXIgYW4gYXJyYXkuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBlYWNoRnVuYyBUaGUgZnVuY3Rpb24gdG8gaXRlcmF0ZSBvdmVyIGEgY29sbGVjdGlvbi5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IGVhY2ggZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZUZvckVhY2goYXJyYXlGdW5jLCBlYWNoRnVuYykge1xuICByZXR1cm4gZnVuY3Rpb24oY29sbGVjdGlvbiwgaXRlcmF0ZWUsIHRoaXNBcmcpIHtcbiAgICByZXR1cm4gKHR5cGVvZiBpdGVyYXRlZSA9PSAnZnVuY3Rpb24nICYmIHR5cGVvZiB0aGlzQXJnID09ICd1bmRlZmluZWQnICYmIGlzQXJyYXkoY29sbGVjdGlvbikpXG4gICAgICA/IGFycmF5RnVuYyhjb2xsZWN0aW9uLCBpdGVyYXRlZSlcbiAgICAgIDogZWFjaEZ1bmMoY29sbGVjdGlvbiwgYmluZENhbGxiYWNrKGl0ZXJhdGVlLCB0aGlzQXJnLCAzKSk7XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gY3JlYXRlRm9yRWFjaDtcbiIsInZhciBiaW5kQ2FsbGJhY2sgPSByZXF1aXJlKCcuL2JpbmRDYWxsYmFjaycpO1xuXG4vKipcbiAqIENyZWF0ZXMgYSBmdW5jdGlvbiBmb3IgYF8uZm9yT3duYCBvciBgXy5mb3JPd25SaWdodGAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IG9iamVjdEZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGl0ZXJhdGUgb3ZlciBhbiBvYmplY3QuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBlYWNoIGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiBjcmVhdGVGb3JPd24ob2JqZWN0RnVuYykge1xuICByZXR1cm4gZnVuY3Rpb24ob2JqZWN0LCBpdGVyYXRlZSwgdGhpc0FyZykge1xuICAgIGlmICh0eXBlb2YgaXRlcmF0ZWUgIT0gJ2Z1bmN0aW9uJyB8fCB0eXBlb2YgdGhpc0FyZyAhPSAndW5kZWZpbmVkJykge1xuICAgICAgaXRlcmF0ZWUgPSBiaW5kQ2FsbGJhY2soaXRlcmF0ZWUsIHRoaXNBcmcsIDMpO1xuICAgIH1cbiAgICByZXR1cm4gb2JqZWN0RnVuYyhvYmplY3QsIGl0ZXJhdGVlKTtcbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBjcmVhdGVGb3JPd247XG4iLCIvKipcbiAqIEEgc3BlY2lhbGl6ZWQgdmVyc2lvbiBvZiBgYmFzZUlzRXF1YWxEZWVwYCBmb3IgYXJyYXlzIHdpdGggc3VwcG9ydCBmb3JcbiAqIHBhcnRpYWwgZGVlcCBjb21wYXJpc29ucy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheX0gYXJyYXkgVGhlIGFycmF5IHRvIGNvbXBhcmUuXG4gKiBAcGFyYW0ge0FycmF5fSBvdGhlciBUaGUgb3RoZXIgYXJyYXkgdG8gY29tcGFyZS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGVxdWFsRnVuYyBUaGUgZnVuY3Rpb24gdG8gZGV0ZXJtaW5lIGVxdWl2YWxlbnRzIG9mIHZhbHVlcy5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtjdXN0b21pemVyXSBUaGUgZnVuY3Rpb24gdG8gY3VzdG9taXplIGNvbXBhcmluZyBhcnJheXMuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtpc0xvb3NlXSBTcGVjaWZ5IHBlcmZvcm1pbmcgcGFydGlhbCBjb21wYXJpc29ucy5cbiAqIEBwYXJhbSB7QXJyYXl9IFtzdGFja0FdIFRyYWNrcyB0cmF2ZXJzZWQgYHZhbHVlYCBvYmplY3RzLlxuICogQHBhcmFtIHtBcnJheX0gW3N0YWNrQl0gVHJhY2tzIHRyYXZlcnNlZCBgb3RoZXJgIG9iamVjdHMuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIGFycmF5cyBhcmUgZXF1aXZhbGVudCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBlcXVhbEFycmF5cyhhcnJheSwgb3RoZXIsIGVxdWFsRnVuYywgY3VzdG9taXplciwgaXNMb29zZSwgc3RhY2tBLCBzdGFja0IpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBhcnJMZW5ndGggPSBhcnJheS5sZW5ndGgsXG4gICAgICBvdGhMZW5ndGggPSBvdGhlci5sZW5ndGgsXG4gICAgICByZXN1bHQgPSB0cnVlO1xuXG4gIGlmIChhcnJMZW5ndGggIT0gb3RoTGVuZ3RoICYmICEoaXNMb29zZSAmJiBvdGhMZW5ndGggPiBhcnJMZW5ndGgpKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIC8vIERlZXAgY29tcGFyZSB0aGUgY29udGVudHMsIGlnbm9yaW5nIG5vbi1udW1lcmljIHByb3BlcnRpZXMuXG4gIHdoaWxlIChyZXN1bHQgJiYgKytpbmRleCA8IGFyckxlbmd0aCkge1xuICAgIHZhciBhcnJWYWx1ZSA9IGFycmF5W2luZGV4XSxcbiAgICAgICAgb3RoVmFsdWUgPSBvdGhlcltpbmRleF07XG5cbiAgICByZXN1bHQgPSB1bmRlZmluZWQ7XG4gICAgaWYgKGN1c3RvbWl6ZXIpIHtcbiAgICAgIHJlc3VsdCA9IGlzTG9vc2VcbiAgICAgICAgPyBjdXN0b21pemVyKG90aFZhbHVlLCBhcnJWYWx1ZSwgaW5kZXgpXG4gICAgICAgIDogY3VzdG9taXplcihhcnJWYWx1ZSwgb3RoVmFsdWUsIGluZGV4KTtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiByZXN1bHQgPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIC8vIFJlY3Vyc2l2ZWx5IGNvbXBhcmUgYXJyYXlzIChzdXNjZXB0aWJsZSB0byBjYWxsIHN0YWNrIGxpbWl0cykuXG4gICAgICBpZiAoaXNMb29zZSkge1xuICAgICAgICB2YXIgb3RoSW5kZXggPSBvdGhMZW5ndGg7XG4gICAgICAgIHdoaWxlIChvdGhJbmRleC0tKSB7XG4gICAgICAgICAgb3RoVmFsdWUgPSBvdGhlcltvdGhJbmRleF07XG4gICAgICAgICAgcmVzdWx0ID0gKGFyclZhbHVlICYmIGFyclZhbHVlID09PSBvdGhWYWx1ZSkgfHwgZXF1YWxGdW5jKGFyclZhbHVlLCBvdGhWYWx1ZSwgY3VzdG9taXplciwgaXNMb29zZSwgc3RhY2tBLCBzdGFja0IpO1xuICAgICAgICAgIGlmIChyZXN1bHQpIHtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVzdWx0ID0gKGFyclZhbHVlICYmIGFyclZhbHVlID09PSBvdGhWYWx1ZSkgfHwgZXF1YWxGdW5jKGFyclZhbHVlLCBvdGhWYWx1ZSwgY3VzdG9taXplciwgaXNMb29zZSwgc3RhY2tBLCBzdGFja0IpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gISFyZXN1bHQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZXF1YWxBcnJheXM7XG4iLCIvKiogYE9iamVjdCN0b1N0cmluZ2AgcmVzdWx0IHJlZmVyZW5jZXMuICovXG52YXIgYm9vbFRhZyA9ICdbb2JqZWN0IEJvb2xlYW5dJyxcbiAgICBkYXRlVGFnID0gJ1tvYmplY3QgRGF0ZV0nLFxuICAgIGVycm9yVGFnID0gJ1tvYmplY3QgRXJyb3JdJyxcbiAgICBudW1iZXJUYWcgPSAnW29iamVjdCBOdW1iZXJdJyxcbiAgICByZWdleHBUYWcgPSAnW29iamVjdCBSZWdFeHBdJyxcbiAgICBzdHJpbmdUYWcgPSAnW29iamVjdCBTdHJpbmddJztcblxuLyoqXG4gKiBBIHNwZWNpYWxpemVkIHZlcnNpb24gb2YgYGJhc2VJc0VxdWFsRGVlcGAgZm9yIGNvbXBhcmluZyBvYmplY3RzIG9mXG4gKiB0aGUgc2FtZSBgdG9TdHJpbmdUYWdgLlxuICpcbiAqICoqTm90ZToqKiBUaGlzIGZ1bmN0aW9uIG9ubHkgc3VwcG9ydHMgY29tcGFyaW5nIHZhbHVlcyB3aXRoIHRhZ3Mgb2ZcbiAqIGBCb29sZWFuYCwgYERhdGVgLCBgRXJyb3JgLCBgTnVtYmVyYCwgYFJlZ0V4cGAsIG9yIGBTdHJpbmdgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsdWUgVGhlIG9iamVjdCB0byBjb21wYXJlLlxuICogQHBhcmFtIHtPYmplY3R9IG90aGVyIFRoZSBvdGhlciBvYmplY3QgdG8gY29tcGFyZS5cbiAqIEBwYXJhbSB7c3RyaW5nfSB0YWcgVGhlIGB0b1N0cmluZ1RhZ2Agb2YgdGhlIG9iamVjdHMgdG8gY29tcGFyZS5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgb2JqZWN0cyBhcmUgZXF1aXZhbGVudCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBlcXVhbEJ5VGFnKG9iamVjdCwgb3RoZXIsIHRhZykge1xuICBzd2l0Y2ggKHRhZykge1xuICAgIGNhc2UgYm9vbFRhZzpcbiAgICBjYXNlIGRhdGVUYWc6XG4gICAgICAvLyBDb2VyY2UgZGF0ZXMgYW5kIGJvb2xlYW5zIHRvIG51bWJlcnMsIGRhdGVzIHRvIG1pbGxpc2Vjb25kcyBhbmQgYm9vbGVhbnNcbiAgICAgIC8vIHRvIGAxYCBvciBgMGAgdHJlYXRpbmcgaW52YWxpZCBkYXRlcyBjb2VyY2VkIHRvIGBOYU5gIGFzIG5vdCBlcXVhbC5cbiAgICAgIHJldHVybiArb2JqZWN0ID09ICtvdGhlcjtcblxuICAgIGNhc2UgZXJyb3JUYWc6XG4gICAgICByZXR1cm4gb2JqZWN0Lm5hbWUgPT0gb3RoZXIubmFtZSAmJiBvYmplY3QubWVzc2FnZSA9PSBvdGhlci5tZXNzYWdlO1xuXG4gICAgY2FzZSBudW1iZXJUYWc6XG4gICAgICAvLyBUcmVhdCBgTmFOYCB2cy4gYE5hTmAgYXMgZXF1YWwuXG4gICAgICByZXR1cm4gKG9iamVjdCAhPSArb2JqZWN0KVxuICAgICAgICA/IG90aGVyICE9ICtvdGhlclxuICAgICAgICAvLyBCdXQsIHRyZWF0IGAtMGAgdnMuIGArMGAgYXMgbm90IGVxdWFsLlxuICAgICAgICA6IChvYmplY3QgPT0gMCA/ICgoMSAvIG9iamVjdCkgPT0gKDEgLyBvdGhlcikpIDogb2JqZWN0ID09ICtvdGhlcik7XG5cbiAgICBjYXNlIHJlZ2V4cFRhZzpcbiAgICBjYXNlIHN0cmluZ1RhZzpcbiAgICAgIC8vIENvZXJjZSByZWdleGVzIHRvIHN0cmluZ3MgYW5kIHRyZWF0IHN0cmluZ3MgcHJpbWl0aXZlcyBhbmQgc3RyaW5nXG4gICAgICAvLyBvYmplY3RzIGFzIGVxdWFsLiBTZWUgaHR0cHM6Ly9lczUuZ2l0aHViLmlvLyN4MTUuMTAuNi40IGZvciBtb3JlIGRldGFpbHMuXG4gICAgICByZXR1cm4gb2JqZWN0ID09IChvdGhlciArICcnKTtcbiAgfVxuICByZXR1cm4gZmFsc2U7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZXF1YWxCeVRhZztcbiIsInZhciBrZXlzID0gcmVxdWlyZSgnLi4vb2JqZWN0L2tleXMnKTtcblxuLyoqIFVzZWQgZm9yIG5hdGl2ZSBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKiBVc2VkIHRvIGNoZWNrIG9iamVjdHMgZm9yIG93biBwcm9wZXJ0aWVzLiAqL1xudmFyIGhhc093blByb3BlcnR5ID0gb2JqZWN0UHJvdG8uaGFzT3duUHJvcGVydHk7XG5cbi8qKlxuICogQSBzcGVjaWFsaXplZCB2ZXJzaW9uIG9mIGBiYXNlSXNFcXVhbERlZXBgIGZvciBvYmplY3RzIHdpdGggc3VwcG9ydCBmb3JcbiAqIHBhcnRpYWwgZGVlcCBjb21wYXJpc29ucy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIGNvbXBhcmUuXG4gKiBAcGFyYW0ge09iamVjdH0gb3RoZXIgVGhlIG90aGVyIG9iamVjdCB0byBjb21wYXJlLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZXF1YWxGdW5jIFRoZSBmdW5jdGlvbiB0byBkZXRlcm1pbmUgZXF1aXZhbGVudHMgb2YgdmFsdWVzLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gW2N1c3RvbWl6ZXJdIFRoZSBmdW5jdGlvbiB0byBjdXN0b21pemUgY29tcGFyaW5nIHZhbHVlcy5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW2lzTG9vc2VdIFNwZWNpZnkgcGVyZm9ybWluZyBwYXJ0aWFsIGNvbXBhcmlzb25zLlxuICogQHBhcmFtIHtBcnJheX0gW3N0YWNrQV0gVHJhY2tzIHRyYXZlcnNlZCBgdmFsdWVgIG9iamVjdHMuXG4gKiBAcGFyYW0ge0FycmF5fSBbc3RhY2tCXSBUcmFja3MgdHJhdmVyc2VkIGBvdGhlcmAgb2JqZWN0cy5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgb2JqZWN0cyBhcmUgZXF1aXZhbGVudCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBlcXVhbE9iamVjdHMob2JqZWN0LCBvdGhlciwgZXF1YWxGdW5jLCBjdXN0b21pemVyLCBpc0xvb3NlLCBzdGFja0EsIHN0YWNrQikge1xuICB2YXIgb2JqUHJvcHMgPSBrZXlzKG9iamVjdCksXG4gICAgICBvYmpMZW5ndGggPSBvYmpQcm9wcy5sZW5ndGgsXG4gICAgICBvdGhQcm9wcyA9IGtleXMob3RoZXIpLFxuICAgICAgb3RoTGVuZ3RoID0gb3RoUHJvcHMubGVuZ3RoO1xuXG4gIGlmIChvYmpMZW5ndGggIT0gb3RoTGVuZ3RoICYmICFpc0xvb3NlKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHZhciBza2lwQ3RvciA9IGlzTG9vc2UsXG4gICAgICBpbmRleCA9IC0xO1xuXG4gIHdoaWxlICgrK2luZGV4IDwgb2JqTGVuZ3RoKSB7XG4gICAgdmFyIGtleSA9IG9ialByb3BzW2luZGV4XSxcbiAgICAgICAgcmVzdWx0ID0gaXNMb29zZSA/IGtleSBpbiBvdGhlciA6IGhhc093blByb3BlcnR5LmNhbGwob3RoZXIsIGtleSk7XG5cbiAgICBpZiAocmVzdWx0KSB7XG4gICAgICB2YXIgb2JqVmFsdWUgPSBvYmplY3Rba2V5XSxcbiAgICAgICAgICBvdGhWYWx1ZSA9IG90aGVyW2tleV07XG5cbiAgICAgIHJlc3VsdCA9IHVuZGVmaW5lZDtcbiAgICAgIGlmIChjdXN0b21pemVyKSB7XG4gICAgICAgIHJlc3VsdCA9IGlzTG9vc2VcbiAgICAgICAgICA/IGN1c3RvbWl6ZXIob3RoVmFsdWUsIG9ialZhbHVlLCBrZXkpXG4gICAgICAgICAgOiBjdXN0b21pemVyKG9ialZhbHVlLCBvdGhWYWx1ZSwga2V5KTtcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlb2YgcmVzdWx0ID09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIC8vIFJlY3Vyc2l2ZWx5IGNvbXBhcmUgb2JqZWN0cyAoc3VzY2VwdGlibGUgdG8gY2FsbCBzdGFjayBsaW1pdHMpLlxuICAgICAgICByZXN1bHQgPSAob2JqVmFsdWUgJiYgb2JqVmFsdWUgPT09IG90aFZhbHVlKSB8fCBlcXVhbEZ1bmMob2JqVmFsdWUsIG90aFZhbHVlLCBjdXN0b21pemVyLCBpc0xvb3NlLCBzdGFja0EsIHN0YWNrQik7XG4gICAgICB9XG4gICAgfVxuICAgIGlmICghcmVzdWx0KSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHNraXBDdG9yIHx8IChza2lwQ3RvciA9IGtleSA9PSAnY29uc3RydWN0b3InKTtcbiAgfVxuICBpZiAoIXNraXBDdG9yKSB7XG4gICAgdmFyIG9iakN0b3IgPSBvYmplY3QuY29uc3RydWN0b3IsXG4gICAgICAgIG90aEN0b3IgPSBvdGhlci5jb25zdHJ1Y3RvcjtcblxuICAgIC8vIE5vbiBgT2JqZWN0YCBvYmplY3QgaW5zdGFuY2VzIHdpdGggZGlmZmVyZW50IGNvbnN0cnVjdG9ycyBhcmUgbm90IGVxdWFsLlxuICAgIGlmIChvYmpDdG9yICE9IG90aEN0b3IgJiZcbiAgICAgICAgKCdjb25zdHJ1Y3RvcicgaW4gb2JqZWN0ICYmICdjb25zdHJ1Y3RvcicgaW4gb3RoZXIpICYmXG4gICAgICAgICEodHlwZW9mIG9iakN0b3IgPT0gJ2Z1bmN0aW9uJyAmJiBvYmpDdG9yIGluc3RhbmNlb2Ygb2JqQ3RvciAmJlxuICAgICAgICAgIHR5cGVvZiBvdGhDdG9yID09ICdmdW5jdGlvbicgJiYgb3RoQ3RvciBpbnN0YW5jZW9mIG90aEN0b3IpKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG4gIHJldHVybiB0cnVlO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGVxdWFsT2JqZWN0cztcbiIsIi8qKlxuICogR2V0cyB0aGUgaW5kZXggYXQgd2hpY2ggdGhlIGZpcnN0IG9jY3VycmVuY2Ugb2YgYE5hTmAgaXMgZm91bmQgaW4gYGFycmF5YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheX0gYXJyYXkgVGhlIGFycmF5IHRvIHNlYXJjaC5cbiAqIEBwYXJhbSB7bnVtYmVyfSBmcm9tSW5kZXggVGhlIGluZGV4IHRvIHNlYXJjaCBmcm9tLlxuICogQHBhcmFtIHtib29sZWFufSBbZnJvbVJpZ2h0XSBTcGVjaWZ5IGl0ZXJhdGluZyBmcm9tIHJpZ2h0IHRvIGxlZnQuXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBSZXR1cm5zIHRoZSBpbmRleCBvZiB0aGUgbWF0Y2hlZCBgTmFOYCwgZWxzZSBgLTFgLlxuICovXG5mdW5jdGlvbiBpbmRleE9mTmFOKGFycmF5LCBmcm9tSW5kZXgsIGZyb21SaWdodCkge1xuICB2YXIgbGVuZ3RoID0gYXJyYXkubGVuZ3RoLFxuICAgICAgaW5kZXggPSBmcm9tSW5kZXggKyAoZnJvbVJpZ2h0ID8gMCA6IC0xKTtcblxuICB3aGlsZSAoKGZyb21SaWdodCA/IGluZGV4LS0gOiArK2luZGV4IDwgbGVuZ3RoKSkge1xuICAgIHZhciBvdGhlciA9IGFycmF5W2luZGV4XTtcbiAgICBpZiAob3RoZXIgIT09IG90aGVyKSB7XG4gICAgICByZXR1cm4gaW5kZXg7XG4gICAgfVxuICB9XG4gIHJldHVybiAtMTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpbmRleE9mTmFOO1xuIiwiLyoqIFVzZWQgZm9yIG5hdGl2ZSBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKiBVc2VkIHRvIGNoZWNrIG9iamVjdHMgZm9yIG93biBwcm9wZXJ0aWVzLiAqL1xudmFyIGhhc093blByb3BlcnR5ID0gb2JqZWN0UHJvdG8uaGFzT3duUHJvcGVydHk7XG5cbi8qKlxuICogSW5pdGlhbGl6ZXMgYW4gYXJyYXkgY2xvbmUuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IFRoZSBhcnJheSB0byBjbG9uZS5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgaW5pdGlhbGl6ZWQgY2xvbmUuXG4gKi9cbmZ1bmN0aW9uIGluaXRDbG9uZUFycmF5KGFycmF5KSB7XG4gIHZhciBsZW5ndGggPSBhcnJheS5sZW5ndGgsXG4gICAgICByZXN1bHQgPSBuZXcgYXJyYXkuY29uc3RydWN0b3IobGVuZ3RoKTtcblxuICAvLyBBZGQgYXJyYXkgcHJvcGVydGllcyBhc3NpZ25lZCBieSBgUmVnRXhwI2V4ZWNgLlxuICBpZiAobGVuZ3RoICYmIHR5cGVvZiBhcnJheVswXSA9PSAnc3RyaW5nJyAmJiBoYXNPd25Qcm9wZXJ0eS5jYWxsKGFycmF5LCAnaW5kZXgnKSkge1xuICAgIHJlc3VsdC5pbmRleCA9IGFycmF5LmluZGV4O1xuICAgIHJlc3VsdC5pbnB1dCA9IGFycmF5LmlucHV0O1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaW5pdENsb25lQXJyYXk7XG4iLCJ2YXIgYnVmZmVyQ2xvbmUgPSByZXF1aXJlKCcuL2J1ZmZlckNsb25lJyk7XG5cbi8qKiBgT2JqZWN0I3RvU3RyaW5nYCByZXN1bHQgcmVmZXJlbmNlcy4gKi9cbnZhciBib29sVGFnID0gJ1tvYmplY3QgQm9vbGVhbl0nLFxuICAgIGRhdGVUYWcgPSAnW29iamVjdCBEYXRlXScsXG4gICAgbnVtYmVyVGFnID0gJ1tvYmplY3QgTnVtYmVyXScsXG4gICAgcmVnZXhwVGFnID0gJ1tvYmplY3QgUmVnRXhwXScsXG4gICAgc3RyaW5nVGFnID0gJ1tvYmplY3QgU3RyaW5nXSc7XG5cbnZhciBhcnJheUJ1ZmZlclRhZyA9ICdbb2JqZWN0IEFycmF5QnVmZmVyXScsXG4gICAgZmxvYXQzMlRhZyA9ICdbb2JqZWN0IEZsb2F0MzJBcnJheV0nLFxuICAgIGZsb2F0NjRUYWcgPSAnW29iamVjdCBGbG9hdDY0QXJyYXldJyxcbiAgICBpbnQ4VGFnID0gJ1tvYmplY3QgSW50OEFycmF5XScsXG4gICAgaW50MTZUYWcgPSAnW29iamVjdCBJbnQxNkFycmF5XScsXG4gICAgaW50MzJUYWcgPSAnW29iamVjdCBJbnQzMkFycmF5XScsXG4gICAgdWludDhUYWcgPSAnW29iamVjdCBVaW50OEFycmF5XScsXG4gICAgdWludDhDbGFtcGVkVGFnID0gJ1tvYmplY3QgVWludDhDbGFtcGVkQXJyYXldJyxcbiAgICB1aW50MTZUYWcgPSAnW29iamVjdCBVaW50MTZBcnJheV0nLFxuICAgIHVpbnQzMlRhZyA9ICdbb2JqZWN0IFVpbnQzMkFycmF5XSc7XG5cbi8qKiBVc2VkIHRvIG1hdGNoIGBSZWdFeHBgIGZsYWdzIGZyb20gdGhlaXIgY29lcmNlZCBzdHJpbmcgdmFsdWVzLiAqL1xudmFyIHJlRmxhZ3MgPSAvXFx3KiQvO1xuXG4vKipcbiAqIEluaXRpYWxpemVzIGFuIG9iamVjdCBjbG9uZSBiYXNlZCBvbiBpdHMgYHRvU3RyaW5nVGFnYC5cbiAqXG4gKiAqKk5vdGU6KiogVGhpcyBmdW5jdGlvbiBvbmx5IHN1cHBvcnRzIGNsb25pbmcgdmFsdWVzIHdpdGggdGFncyBvZlxuICogYEJvb2xlYW5gLCBgRGF0ZWAsIGBFcnJvcmAsIGBOdW1iZXJgLCBgUmVnRXhwYCwgb3IgYFN0cmluZ2AuXG4gKlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gY2xvbmUuXG4gKiBAcGFyYW0ge3N0cmluZ30gdGFnIFRoZSBgdG9TdHJpbmdUYWdgIG9mIHRoZSBvYmplY3QgdG8gY2xvbmUuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtpc0RlZXBdIFNwZWNpZnkgYSBkZWVwIGNsb25lLlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyB0aGUgaW5pdGlhbGl6ZWQgY2xvbmUuXG4gKi9cbmZ1bmN0aW9uIGluaXRDbG9uZUJ5VGFnKG9iamVjdCwgdGFnLCBpc0RlZXApIHtcbiAgdmFyIEN0b3IgPSBvYmplY3QuY29uc3RydWN0b3I7XG4gIHN3aXRjaCAodGFnKSB7XG4gICAgY2FzZSBhcnJheUJ1ZmZlclRhZzpcbiAgICAgIHJldHVybiBidWZmZXJDbG9uZShvYmplY3QpO1xuXG4gICAgY2FzZSBib29sVGFnOlxuICAgIGNhc2UgZGF0ZVRhZzpcbiAgICAgIHJldHVybiBuZXcgQ3Rvcigrb2JqZWN0KTtcblxuICAgIGNhc2UgZmxvYXQzMlRhZzogY2FzZSBmbG9hdDY0VGFnOlxuICAgIGNhc2UgaW50OFRhZzogY2FzZSBpbnQxNlRhZzogY2FzZSBpbnQzMlRhZzpcbiAgICBjYXNlIHVpbnQ4VGFnOiBjYXNlIHVpbnQ4Q2xhbXBlZFRhZzogY2FzZSB1aW50MTZUYWc6IGNhc2UgdWludDMyVGFnOlxuICAgICAgdmFyIGJ1ZmZlciA9IG9iamVjdC5idWZmZXI7XG4gICAgICByZXR1cm4gbmV3IEN0b3IoaXNEZWVwID8gYnVmZmVyQ2xvbmUoYnVmZmVyKSA6IGJ1ZmZlciwgb2JqZWN0LmJ5dGVPZmZzZXQsIG9iamVjdC5sZW5ndGgpO1xuXG4gICAgY2FzZSBudW1iZXJUYWc6XG4gICAgY2FzZSBzdHJpbmdUYWc6XG4gICAgICByZXR1cm4gbmV3IEN0b3Iob2JqZWN0KTtcblxuICAgIGNhc2UgcmVnZXhwVGFnOlxuICAgICAgdmFyIHJlc3VsdCA9IG5ldyBDdG9yKG9iamVjdC5zb3VyY2UsIHJlRmxhZ3MuZXhlYyhvYmplY3QpKTtcbiAgICAgIHJlc3VsdC5sYXN0SW5kZXggPSBvYmplY3QubGFzdEluZGV4O1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaW5pdENsb25lQnlUYWc7XG4iLCIvKipcbiAqIEluaXRpYWxpemVzIGFuIG9iamVjdCBjbG9uZS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIGNsb25lLlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyB0aGUgaW5pdGlhbGl6ZWQgY2xvbmUuXG4gKi9cbmZ1bmN0aW9uIGluaXRDbG9uZU9iamVjdChvYmplY3QpIHtcbiAgdmFyIEN0b3IgPSBvYmplY3QuY29uc3RydWN0b3I7XG4gIGlmICghKHR5cGVvZiBDdG9yID09ICdmdW5jdGlvbicgJiYgQ3RvciBpbnN0YW5jZW9mIEN0b3IpKSB7XG4gICAgQ3RvciA9IE9iamVjdDtcbiAgfVxuICByZXR1cm4gbmV3IEN0b3I7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaW5pdENsb25lT2JqZWN0O1xuIiwiLyoqXG4gKiBVc2VkIGFzIHRoZSBbbWF4aW11bSBsZW5ndGhdKGh0dHBzOi8vcGVvcGxlLm1vemlsbGEub3JnL35qb3JlbmRvcmZmL2VzNi1kcmFmdC5odG1sI3NlYy1udW1iZXIubWF4X3NhZmVfaW50ZWdlcilcbiAqIG9mIGFuIGFycmF5LWxpa2UgdmFsdWUuXG4gKi9cbnZhciBNQVhfU0FGRV9JTlRFR0VSID0gTWF0aC5wb3coMiwgNTMpIC0gMTtcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBhIHZhbGlkIGFycmF5LWxpa2UgaW5kZXguXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHBhcmFtIHtudW1iZXJ9IFtsZW5ndGg9TUFYX1NBRkVfSU5URUdFUl0gVGhlIHVwcGVyIGJvdW5kcyBvZiBhIHZhbGlkIGluZGV4LlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSB2YWxpZCBpbmRleCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBpc0luZGV4KHZhbHVlLCBsZW5ndGgpIHtcbiAgdmFsdWUgPSArdmFsdWU7XG4gIGxlbmd0aCA9IGxlbmd0aCA9PSBudWxsID8gTUFYX1NBRkVfSU5URUdFUiA6IGxlbmd0aDtcbiAgcmV0dXJuIHZhbHVlID4gLTEgJiYgdmFsdWUgJSAxID09IDAgJiYgdmFsdWUgPCBsZW5ndGg7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNJbmRleDtcbiIsInZhciBpc0luZGV4ID0gcmVxdWlyZSgnLi9pc0luZGV4JyksXG4gICAgaXNMZW5ndGggPSByZXF1aXJlKCcuL2lzTGVuZ3RoJyksXG4gICAgaXNPYmplY3QgPSByZXF1aXJlKCcuLi9sYW5nL2lzT2JqZWN0Jyk7XG5cbi8qKlxuICogQ2hlY2tzIGlmIHRoZSBwcm92aWRlZCBhcmd1bWVudHMgYXJlIGZyb20gYW4gaXRlcmF0ZWUgY2FsbC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgcG90ZW50aWFsIGl0ZXJhdGVlIHZhbHVlIGFyZ3VtZW50LlxuICogQHBhcmFtIHsqfSBpbmRleCBUaGUgcG90ZW50aWFsIGl0ZXJhdGVlIGluZGV4IG9yIGtleSBhcmd1bWVudC5cbiAqIEBwYXJhbSB7Kn0gb2JqZWN0IFRoZSBwb3RlbnRpYWwgaXRlcmF0ZWUgb2JqZWN0IGFyZ3VtZW50LlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIHRoZSBhcmd1bWVudHMgYXJlIGZyb20gYW4gaXRlcmF0ZWUgY2FsbCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBpc0l0ZXJhdGVlQ2FsbCh2YWx1ZSwgaW5kZXgsIG9iamVjdCkge1xuICBpZiAoIWlzT2JqZWN0KG9iamVjdCkpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgdmFyIHR5cGUgPSB0eXBlb2YgaW5kZXg7XG4gIGlmICh0eXBlID09ICdudW1iZXInKSB7XG4gICAgdmFyIGxlbmd0aCA9IG9iamVjdC5sZW5ndGgsXG4gICAgICAgIHByZXJlcSA9IGlzTGVuZ3RoKGxlbmd0aCkgJiYgaXNJbmRleChpbmRleCwgbGVuZ3RoKTtcbiAgfSBlbHNlIHtcbiAgICBwcmVyZXEgPSB0eXBlID09ICdzdHJpbmcnICYmIGluZGV4IGluIG9iamVjdDtcbiAgfVxuICBpZiAocHJlcmVxKSB7XG4gICAgdmFyIG90aGVyID0gb2JqZWN0W2luZGV4XTtcbiAgICByZXR1cm4gdmFsdWUgPT09IHZhbHVlID8gKHZhbHVlID09PSBvdGhlcikgOiAob3RoZXIgIT09IG90aGVyKTtcbiAgfVxuICByZXR1cm4gZmFsc2U7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNJdGVyYXRlZUNhbGw7XG4iLCIvKipcbiAqIFVzZWQgYXMgdGhlIFttYXhpbXVtIGxlbmd0aF0oaHR0cHM6Ly9wZW9wbGUubW96aWxsYS5vcmcvfmpvcmVuZG9yZmYvZXM2LWRyYWZ0Lmh0bWwjc2VjLW51bWJlci5tYXhfc2FmZV9pbnRlZ2VyKVxuICogb2YgYW4gYXJyYXktbGlrZSB2YWx1ZS5cbiAqL1xudmFyIE1BWF9TQUZFX0lOVEVHRVIgPSBNYXRoLnBvdygyLCA1MykgLSAxO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGEgdmFsaWQgYXJyYXktbGlrZSBsZW5ndGguXG4gKlxuICogKipOb3RlOioqIFRoaXMgZnVuY3Rpb24gaXMgYmFzZWQgb24gW2BUb0xlbmd0aGBdKGh0dHBzOi8vcGVvcGxlLm1vemlsbGEub3JnL35qb3JlbmRvcmZmL2VzNi1kcmFmdC5odG1sI3NlYy10b2xlbmd0aCkuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSB2YWxpZCBsZW5ndGgsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNMZW5ndGgodmFsdWUpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PSAnbnVtYmVyJyAmJiB2YWx1ZSA+IC0xICYmIHZhbHVlICUgMSA9PSAwICYmIHZhbHVlIDw9IE1BWF9TQUZFX0lOVEVHRVI7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNMZW5ndGg7XG4iLCIvKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIG9iamVjdC1saWtlLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIG9iamVjdC1saWtlLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGlzT2JqZWN0TGlrZSh2YWx1ZSkge1xuICByZXR1cm4gISF2YWx1ZSAmJiB0eXBlb2YgdmFsdWUgPT0gJ29iamVjdCc7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNPYmplY3RMaWtlO1xuIiwidmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi4vbGFuZy9pc09iamVjdCcpO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIHN1aXRhYmxlIGZvciBzdHJpY3QgZXF1YWxpdHkgY29tcGFyaXNvbnMsIGkuZS4gYD09PWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaWYgc3VpdGFibGUgZm9yIHN0cmljdFxuICogIGVxdWFsaXR5IGNvbXBhcmlzb25zLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGlzU3RyaWN0Q29tcGFyYWJsZSh2YWx1ZSkge1xuICByZXR1cm4gdmFsdWUgPT09IHZhbHVlICYmICh2YWx1ZSA9PT0gMCA/ICgoMSAvIHZhbHVlKSA+IDApIDogIWlzT2JqZWN0KHZhbHVlKSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNTdHJpY3RDb21wYXJhYmxlO1xuIiwidmFyIGlzQXJndW1lbnRzID0gcmVxdWlyZSgnLi4vbGFuZy9pc0FyZ3VtZW50cycpLFxuICAgIGlzQXJyYXkgPSByZXF1aXJlKCcuLi9sYW5nL2lzQXJyYXknKSxcbiAgICBpc0luZGV4ID0gcmVxdWlyZSgnLi9pc0luZGV4JyksXG4gICAgaXNMZW5ndGggPSByZXF1aXJlKCcuL2lzTGVuZ3RoJyksXG4gICAga2V5c0luID0gcmVxdWlyZSgnLi4vb2JqZWN0L2tleXNJbicpLFxuICAgIHN1cHBvcnQgPSByZXF1aXJlKCcuLi9zdXBwb3J0Jyk7XG5cbi8qKiBVc2VkIGZvciBuYXRpdmUgbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKiogVXNlZCB0byBjaGVjayBvYmplY3RzIGZvciBvd24gcHJvcGVydGllcy4gKi9cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IG9iamVjdFByb3RvLmhhc093blByb3BlcnR5O1xuXG4vKipcbiAqIEEgZmFsbGJhY2sgaW1wbGVtZW50YXRpb24gb2YgYE9iamVjdC5rZXlzYCB3aGljaCBjcmVhdGVzIGFuIGFycmF5IG9mIHRoZVxuICogb3duIGVudW1lcmFibGUgcHJvcGVydHkgbmFtZXMgb2YgYG9iamVjdGAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBpbnNwZWN0LlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBhcnJheSBvZiBwcm9wZXJ0eSBuYW1lcy5cbiAqL1xuZnVuY3Rpb24gc2hpbUtleXMob2JqZWN0KSB7XG4gIHZhciBwcm9wcyA9IGtleXNJbihvYmplY3QpLFxuICAgICAgcHJvcHNMZW5ndGggPSBwcm9wcy5sZW5ndGgsXG4gICAgICBsZW5ndGggPSBwcm9wc0xlbmd0aCAmJiBvYmplY3QubGVuZ3RoO1xuXG4gIHZhciBhbGxvd0luZGV4ZXMgPSBsZW5ndGggJiYgaXNMZW5ndGgobGVuZ3RoKSAmJlxuICAgIChpc0FycmF5KG9iamVjdCkgfHwgKHN1cHBvcnQubm9uRW51bUFyZ3MgJiYgaXNBcmd1bWVudHMob2JqZWN0KSkpO1xuXG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgcmVzdWx0ID0gW107XG5cbiAgd2hpbGUgKCsraW5kZXggPCBwcm9wc0xlbmd0aCkge1xuICAgIHZhciBrZXkgPSBwcm9wc1tpbmRleF07XG4gICAgaWYgKChhbGxvd0luZGV4ZXMgJiYgaXNJbmRleChrZXksIGxlbmd0aCkpIHx8IGhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBrZXkpKSB7XG4gICAgICByZXN1bHQucHVzaChrZXkpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHNoaW1LZXlzO1xuIiwiLyoqXG4gKiBBbiBpbXBsZW1lbnRhdGlvbiBvZiBgXy51bmlxYCBvcHRpbWl6ZWQgZm9yIHNvcnRlZCBhcnJheXMgd2l0aG91dCBzdXBwb3J0XG4gKiBmb3IgY2FsbGJhY2sgc2hvcnRoYW5kcyBhbmQgYHRoaXNgIGJpbmRpbmcuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IFRoZSBhcnJheSB0byBpbnNwZWN0LlxuICogQHBhcmFtIHtGdW5jdGlvbn0gW2l0ZXJhdGVlXSBUaGUgZnVuY3Rpb24gaW52b2tlZCBwZXIgaXRlcmF0aW9uLlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBuZXcgZHVwbGljYXRlLXZhbHVlLWZyZWUgYXJyYXkuXG4gKi9cbmZ1bmN0aW9uIHNvcnRlZFVuaXEoYXJyYXksIGl0ZXJhdGVlKSB7XG4gIHZhciBzZWVuLFxuICAgICAgaW5kZXggPSAtMSxcbiAgICAgIGxlbmd0aCA9IGFycmF5Lmxlbmd0aCxcbiAgICAgIHJlc0luZGV4ID0gLTEsXG4gICAgICByZXN1bHQgPSBbXTtcblxuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIHZhciB2YWx1ZSA9IGFycmF5W2luZGV4XSxcbiAgICAgICAgY29tcHV0ZWQgPSBpdGVyYXRlZSA/IGl0ZXJhdGVlKHZhbHVlLCBpbmRleCwgYXJyYXkpIDogdmFsdWU7XG5cbiAgICBpZiAoIWluZGV4IHx8IHNlZW4gIT09IGNvbXB1dGVkKSB7XG4gICAgICBzZWVuID0gY29tcHV0ZWQ7XG4gICAgICByZXN1bHRbKytyZXNJbmRleF0gPSB2YWx1ZTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzb3J0ZWRVbmlxO1xuIiwidmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi4vbGFuZy9pc09iamVjdCcpO1xuXG4vKipcbiAqIENvbnZlcnRzIGB2YWx1ZWAgdG8gYW4gb2JqZWN0IGlmIGl0IGlzIG5vdCBvbmUuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHByb2Nlc3MuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIHRoZSBvYmplY3QuXG4gKi9cbmZ1bmN0aW9uIHRvT2JqZWN0KHZhbHVlKSB7XG4gIHJldHVybiBpc09iamVjdCh2YWx1ZSkgPyB2YWx1ZSA6IE9iamVjdCh2YWx1ZSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gdG9PYmplY3Q7XG4iLCJ2YXIgYmFzZUNsb25lID0gcmVxdWlyZSgnLi4vaW50ZXJuYWwvYmFzZUNsb25lJyksXG4gICAgYmluZENhbGxiYWNrID0gcmVxdWlyZSgnLi4vaW50ZXJuYWwvYmluZENhbGxiYWNrJyksXG4gICAgaXNJdGVyYXRlZUNhbGwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbC9pc0l0ZXJhdGVlQ2FsbCcpO1xuXG4vKipcbiAqIENyZWF0ZXMgYSBjbG9uZSBvZiBgdmFsdWVgLiBJZiBgaXNEZWVwYCBpcyBgdHJ1ZWAgbmVzdGVkIG9iamVjdHMgYXJlIGNsb25lZCxcbiAqIG90aGVyd2lzZSB0aGV5IGFyZSBhc3NpZ25lZCBieSByZWZlcmVuY2UuIElmIGBjdXN0b21pemVyYCBpcyBwcm92aWRlZCBpdCBpc1xuICogaW52b2tlZCB0byBwcm9kdWNlIHRoZSBjbG9uZWQgdmFsdWVzLiBJZiBgY3VzdG9taXplcmAgcmV0dXJucyBgdW5kZWZpbmVkYFxuICogY2xvbmluZyBpcyBoYW5kbGVkIGJ5IHRoZSBtZXRob2QgaW5zdGVhZC4gVGhlIGBjdXN0b21pemVyYCBpcyBib3VuZCB0b1xuICogYHRoaXNBcmdgIGFuZCBpbnZva2VkIHdpdGggdHdvIGFyZ3VtZW50OyAodmFsdWUgWywgaW5kZXh8a2V5LCBvYmplY3RdKS5cbiAqXG4gKiAqKk5vdGU6KiogVGhpcyBtZXRob2QgaXMgbG9vc2VseSBiYXNlZCBvbiB0aGVcbiAqIFtzdHJ1Y3R1cmVkIGNsb25lIGFsZ29yaXRobV0oaHR0cDovL3d3dy53My5vcmcvVFIvaHRtbDUvaW5mcmFzdHJ1Y3R1cmUuaHRtbCNpbnRlcm5hbC1zdHJ1Y3R1cmVkLWNsb25pbmctYWxnb3JpdGhtKS5cbiAqIFRoZSBlbnVtZXJhYmxlIHByb3BlcnRpZXMgb2YgYGFyZ3VtZW50c2Agb2JqZWN0cyBhbmQgb2JqZWN0cyBjcmVhdGVkIGJ5XG4gKiBjb25zdHJ1Y3RvcnMgb3RoZXIgdGhhbiBgT2JqZWN0YCBhcmUgY2xvbmVkIHRvIHBsYWluIGBPYmplY3RgIG9iamVjdHMuIEFuXG4gKiBlbXB0eSBvYmplY3QgaXMgcmV0dXJuZWQgZm9yIHVuY2xvbmVhYmxlIHZhbHVlcyBzdWNoIGFzIGZ1bmN0aW9ucywgRE9NIG5vZGVzLFxuICogTWFwcywgU2V0cywgYW5kIFdlYWtNYXBzLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2xvbmUuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtpc0RlZXBdIFNwZWNpZnkgYSBkZWVwIGNsb25lLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gW2N1c3RvbWl6ZXJdIFRoZSBmdW5jdGlvbiB0byBjdXN0b21pemUgY2xvbmluZyB2YWx1ZXMuXG4gKiBAcGFyYW0geyp9IFt0aGlzQXJnXSBUaGUgYHRoaXNgIGJpbmRpbmcgb2YgYGN1c3RvbWl6ZXJgLlxuICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIGNsb25lZCB2YWx1ZS5cbiAqIEBleGFtcGxlXG4gKlxuICogdmFyIHVzZXJzID0gW1xuICogICB7ICd1c2VyJzogJ2Jhcm5leScgfSxcbiAqICAgeyAndXNlcic6ICdmcmVkJyB9XG4gKiBdO1xuICpcbiAqIHZhciBzaGFsbG93ID0gXy5jbG9uZSh1c2Vycyk7XG4gKiBzaGFsbG93WzBdID09PSB1c2Vyc1swXTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiB2YXIgZGVlcCA9IF8uY2xvbmUodXNlcnMsIHRydWUpO1xuICogZGVlcFswXSA9PT0gdXNlcnNbMF07XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIC8vIHVzaW5nIGEgY3VzdG9taXplciBjYWxsYmFja1xuICogdmFyIGVsID0gXy5jbG9uZShkb2N1bWVudC5ib2R5LCBmdW5jdGlvbih2YWx1ZSkge1xuICogICBpZiAoXy5pc0VsZW1lbnQodmFsdWUpKSB7XG4gKiAgICAgcmV0dXJuIHZhbHVlLmNsb25lTm9kZShmYWxzZSk7XG4gKiAgIH1cbiAqIH0pO1xuICpcbiAqIGVsID09PSBkb2N1bWVudC5ib2R5XG4gKiAvLyA9PiBmYWxzZVxuICogZWwubm9kZU5hbWVcbiAqIC8vID0+IEJPRFlcbiAqIGVsLmNoaWxkTm9kZXMubGVuZ3RoO1xuICogLy8gPT4gMFxuICovXG5mdW5jdGlvbiBjbG9uZSh2YWx1ZSwgaXNEZWVwLCBjdXN0b21pemVyLCB0aGlzQXJnKSB7XG4gIGlmIChpc0RlZXAgJiYgdHlwZW9mIGlzRGVlcCAhPSAnYm9vbGVhbicgJiYgaXNJdGVyYXRlZUNhbGwodmFsdWUsIGlzRGVlcCwgY3VzdG9taXplcikpIHtcbiAgICBpc0RlZXAgPSBmYWxzZTtcbiAgfVxuICBlbHNlIGlmICh0eXBlb2YgaXNEZWVwID09ICdmdW5jdGlvbicpIHtcbiAgICB0aGlzQXJnID0gY3VzdG9taXplcjtcbiAgICBjdXN0b21pemVyID0gaXNEZWVwO1xuICAgIGlzRGVlcCA9IGZhbHNlO1xuICB9XG4gIGN1c3RvbWl6ZXIgPSB0eXBlb2YgY3VzdG9taXplciA9PSAnZnVuY3Rpb24nICYmIGJpbmRDYWxsYmFjayhjdXN0b21pemVyLCB0aGlzQXJnLCAxKTtcbiAgcmV0dXJuIGJhc2VDbG9uZSh2YWx1ZSwgaXNEZWVwLCBjdXN0b21pemVyKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBjbG9uZTtcbiIsInZhciBpc0xlbmd0aCA9IHJlcXVpcmUoJy4uL2ludGVybmFsL2lzTGVuZ3RoJyksXG4gICAgaXNPYmplY3RMaWtlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWwvaXNPYmplY3RMaWtlJyk7XG5cbi8qKiBgT2JqZWN0I3RvU3RyaW5nYCByZXN1bHQgcmVmZXJlbmNlcy4gKi9cbnZhciBhcmdzVGFnID0gJ1tvYmplY3QgQXJndW1lbnRzXSc7XG5cbi8qKiBVc2VkIGZvciBuYXRpdmUgbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKipcbiAqIFVzZWQgdG8gcmVzb2x2ZSB0aGUgW2B0b1N0cmluZ1RhZ2BdKGh0dHBzOi8vcGVvcGxlLm1vemlsbGEub3JnL35qb3JlbmRvcmZmL2VzNi1kcmFmdC5odG1sI3NlYy1vYmplY3QucHJvdG90eXBlLnRvc3RyaW5nKVxuICogb2YgdmFsdWVzLlxuICovXG52YXIgb2JqVG9TdHJpbmcgPSBvYmplY3RQcm90by50b1N0cmluZztcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBjbGFzc2lmaWVkIGFzIGFuIGBhcmd1bWVudHNgIG9iamVjdC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgY29ycmVjdGx5IGNsYXNzaWZpZWQsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc0FyZ3VtZW50cyhmdW5jdGlvbigpIHsgcmV0dXJuIGFyZ3VtZW50czsgfSgpKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzQXJndW1lbnRzKFsxLCAyLCAzXSk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0FyZ3VtZW50cyh2YWx1ZSkge1xuICB2YXIgbGVuZ3RoID0gaXNPYmplY3RMaWtlKHZhbHVlKSA/IHZhbHVlLmxlbmd0aCA6IHVuZGVmaW5lZDtcbiAgcmV0dXJuIGlzTGVuZ3RoKGxlbmd0aCkgJiYgb2JqVG9TdHJpbmcuY2FsbCh2YWx1ZSkgPT0gYXJnc1RhZztcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc0FyZ3VtZW50cztcbiIsInZhciBpc0xlbmd0aCA9IHJlcXVpcmUoJy4uL2ludGVybmFsL2lzTGVuZ3RoJyksXG4gICAgaXNOYXRpdmUgPSByZXF1aXJlKCcuL2lzTmF0aXZlJyksXG4gICAgaXNPYmplY3RMaWtlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWwvaXNPYmplY3RMaWtlJyk7XG5cbi8qKiBgT2JqZWN0I3RvU3RyaW5nYCByZXN1bHQgcmVmZXJlbmNlcy4gKi9cbnZhciBhcnJheVRhZyA9ICdbb2JqZWN0IEFycmF5XSc7XG5cbi8qKiBVc2VkIGZvciBuYXRpdmUgbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKipcbiAqIFVzZWQgdG8gcmVzb2x2ZSB0aGUgW2B0b1N0cmluZ1RhZ2BdKGh0dHBzOi8vcGVvcGxlLm1vemlsbGEub3JnL35qb3JlbmRvcmZmL2VzNi1kcmFmdC5odG1sI3NlYy1vYmplY3QucHJvdG90eXBlLnRvc3RyaW5nKVxuICogb2YgdmFsdWVzLlxuICovXG52YXIgb2JqVG9TdHJpbmcgPSBvYmplY3RQcm90by50b1N0cmluZztcblxuLyogTmF0aXZlIG1ldGhvZCByZWZlcmVuY2VzIGZvciB0aG9zZSB3aXRoIHRoZSBzYW1lIG5hbWUgYXMgb3RoZXIgYGxvZGFzaGAgbWV0aG9kcy4gKi9cbnZhciBuYXRpdmVJc0FycmF5ID0gaXNOYXRpdmUobmF0aXZlSXNBcnJheSA9IEFycmF5LmlzQXJyYXkpICYmIG5hdGl2ZUlzQXJyYXk7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgY2xhc3NpZmllZCBhcyBhbiBgQXJyYXlgIG9iamVjdC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgY29ycmVjdGx5IGNsYXNzaWZpZWQsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc0FycmF5KFsxLCAyLCAzXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0FycmF5KGZ1bmN0aW9uKCkgeyByZXR1cm4gYXJndW1lbnRzOyB9KCkpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xudmFyIGlzQXJyYXkgPSBuYXRpdmVJc0FycmF5IHx8IGZ1bmN0aW9uKHZhbHVlKSB7XG4gIHJldHVybiBpc09iamVjdExpa2UodmFsdWUpICYmIGlzTGVuZ3RoKHZhbHVlLmxlbmd0aCkgJiYgb2JqVG9TdHJpbmcuY2FsbCh2YWx1ZSkgPT0gYXJyYXlUYWc7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGlzQXJyYXk7XG4iLCJ2YXIgYmFzZUlzRnVuY3Rpb24gPSByZXF1aXJlKCcuLi9pbnRlcm5hbC9iYXNlSXNGdW5jdGlvbicpLFxuICAgIGlzTmF0aXZlID0gcmVxdWlyZSgnLi9pc05hdGl2ZScpO1xuXG4vKiogYE9iamVjdCN0b1N0cmluZ2AgcmVzdWx0IHJlZmVyZW5jZXMuICovXG52YXIgZnVuY1RhZyA9ICdbb2JqZWN0IEZ1bmN0aW9uXSc7XG5cbi8qKiBVc2VkIGZvciBuYXRpdmUgbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKipcbiAqIFVzZWQgdG8gcmVzb2x2ZSB0aGUgW2B0b1N0cmluZ1RhZ2BdKGh0dHBzOi8vcGVvcGxlLm1vemlsbGEub3JnL35qb3JlbmRvcmZmL2VzNi1kcmFmdC5odG1sI3NlYy1vYmplY3QucHJvdG90eXBlLnRvc3RyaW5nKVxuICogb2YgdmFsdWVzLlxuICovXG52YXIgb2JqVG9TdHJpbmcgPSBvYmplY3RQcm90by50b1N0cmluZztcblxuLyoqIE5hdGl2ZSBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBVaW50OEFycmF5ID0gaXNOYXRpdmUoVWludDhBcnJheSA9IGdsb2JhbC5VaW50OEFycmF5KSAmJiBVaW50OEFycmF5O1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGNsYXNzaWZpZWQgYXMgYSBgRnVuY3Rpb25gIG9iamVjdC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgY29ycmVjdGx5IGNsYXNzaWZpZWQsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc0Z1bmN0aW9uKF8pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNGdW5jdGlvbigvYWJjLyk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG52YXIgaXNGdW5jdGlvbiA9ICEoYmFzZUlzRnVuY3Rpb24oL3gvKSB8fCAoVWludDhBcnJheSAmJiAhYmFzZUlzRnVuY3Rpb24oVWludDhBcnJheSkpKSA/IGJhc2VJc0Z1bmN0aW9uIDogZnVuY3Rpb24odmFsdWUpIHtcbiAgLy8gVGhlIHVzZSBvZiBgT2JqZWN0I3RvU3RyaW5nYCBhdm9pZHMgaXNzdWVzIHdpdGggdGhlIGB0eXBlb2ZgIG9wZXJhdG9yXG4gIC8vIGluIG9sZGVyIHZlcnNpb25zIG9mIENocm9tZSBhbmQgU2FmYXJpIHdoaWNoIHJldHVybiAnZnVuY3Rpb24nIGZvciByZWdleGVzXG4gIC8vIGFuZCBTYWZhcmkgOCBlcXVpdmFsZW50cyB3aGljaCByZXR1cm4gJ29iamVjdCcgZm9yIHR5cGVkIGFycmF5IGNvbnN0cnVjdG9ycy5cbiAgcmV0dXJuIG9ialRvU3RyaW5nLmNhbGwodmFsdWUpID09IGZ1bmNUYWc7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGlzRnVuY3Rpb247XG4iLCJ2YXIgZXNjYXBlUmVnRXhwID0gcmVxdWlyZSgnLi4vc3RyaW5nL2VzY2FwZVJlZ0V4cCcpLFxuICAgIGlzT2JqZWN0TGlrZSA9IHJlcXVpcmUoJy4uL2ludGVybmFsL2lzT2JqZWN0TGlrZScpO1xuXG4vKiogYE9iamVjdCN0b1N0cmluZ2AgcmVzdWx0IHJlZmVyZW5jZXMuICovXG52YXIgZnVuY1RhZyA9ICdbb2JqZWN0IEZ1bmN0aW9uXSc7XG5cbi8qKiBVc2VkIHRvIGRldGVjdCBob3N0IGNvbnN0cnVjdG9ycyAoU2FmYXJpID4gNSkuICovXG52YXIgcmVIb3N0Q3RvciA9IC9eXFxbb2JqZWN0IC4rP0NvbnN0cnVjdG9yXFxdJC87XG5cbi8qKiBVc2VkIGZvciBuYXRpdmUgbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKiogVXNlZCB0byByZXNvbHZlIHRoZSBkZWNvbXBpbGVkIHNvdXJjZSBvZiBmdW5jdGlvbnMuICovXG52YXIgZm5Ub1N0cmluZyA9IEZ1bmN0aW9uLnByb3RvdHlwZS50b1N0cmluZztcblxuLyoqXG4gKiBVc2VkIHRvIHJlc29sdmUgdGhlIFtgdG9TdHJpbmdUYWdgXShodHRwczovL3Blb3BsZS5tb3ppbGxhLm9yZy9+am9yZW5kb3JmZi9lczYtZHJhZnQuaHRtbCNzZWMtb2JqZWN0LnByb3RvdHlwZS50b3N0cmluZylcbiAqIG9mIHZhbHVlcy5cbiAqL1xudmFyIG9ialRvU3RyaW5nID0gb2JqZWN0UHJvdG8udG9TdHJpbmc7XG5cbi8qKiBVc2VkIHRvIGRldGVjdCBpZiBhIG1ldGhvZCBpcyBuYXRpdmUuICovXG52YXIgcmVOYXRpdmUgPSBSZWdFeHAoJ14nICtcbiAgZXNjYXBlUmVnRXhwKG9ialRvU3RyaW5nKVxuICAucmVwbGFjZSgvdG9TdHJpbmd8KGZ1bmN0aW9uKS4qPyg/PVxcXFxcXCgpfCBmb3IgLis/KD89XFxcXFxcXSkvZywgJyQxLio/JykgKyAnJCdcbik7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgYSBuYXRpdmUgZnVuY3Rpb24uXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgbmF0aXZlIGZ1bmN0aW9uLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNOYXRpdmUoQXJyYXkucHJvdG90eXBlLnB1c2gpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNOYXRpdmUoXyk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc05hdGl2ZSh2YWx1ZSkge1xuICBpZiAodmFsdWUgPT0gbnVsbCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBpZiAob2JqVG9TdHJpbmcuY2FsbCh2YWx1ZSkgPT0gZnVuY1RhZykge1xuICAgIHJldHVybiByZU5hdGl2ZS50ZXN0KGZuVG9TdHJpbmcuY2FsbCh2YWx1ZSkpO1xuICB9XG4gIHJldHVybiBpc09iamVjdExpa2UodmFsdWUpICYmIHJlSG9zdEN0b3IudGVzdCh2YWx1ZSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNOYXRpdmU7XG4iLCIvKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIHRoZSBbbGFuZ3VhZ2UgdHlwZV0oaHR0cHM6Ly9lczUuZ2l0aHViLmlvLyN4OCkgb2YgYE9iamVjdGAuXG4gKiAoZS5nLiBhcnJheXMsIGZ1bmN0aW9ucywgb2JqZWN0cywgcmVnZXhlcywgYG5ldyBOdW1iZXIoMClgLCBhbmQgYG5ldyBTdHJpbmcoJycpYClcbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYW4gb2JqZWN0LCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNPYmplY3Qoe30pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3QoWzEsIDIsIDNdKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0KDEpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNPYmplY3QodmFsdWUpIHtcbiAgLy8gQXZvaWQgYSBWOCBKSVQgYnVnIGluIENocm9tZSAxOS0yMC5cbiAgLy8gU2VlIGh0dHBzOi8vY29kZS5nb29nbGUuY29tL3AvdjgvaXNzdWVzL2RldGFpbD9pZD0yMjkxIGZvciBtb3JlIGRldGFpbHMuXG4gIHZhciB0eXBlID0gdHlwZW9mIHZhbHVlO1xuICByZXR1cm4gdHlwZSA9PSAnZnVuY3Rpb24nIHx8ICghIXZhbHVlICYmIHR5cGUgPT0gJ29iamVjdCcpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzT2JqZWN0O1xuIiwidmFyIGlzTGVuZ3RoID0gcmVxdWlyZSgnLi4vaW50ZXJuYWwvaXNMZW5ndGgnKSxcbiAgICBpc09iamVjdExpa2UgPSByZXF1aXJlKCcuLi9pbnRlcm5hbC9pc09iamVjdExpa2UnKTtcblxuLyoqIGBPYmplY3QjdG9TdHJpbmdgIHJlc3VsdCByZWZlcmVuY2VzLiAqL1xudmFyIGFyZ3NUYWcgPSAnW29iamVjdCBBcmd1bWVudHNdJyxcbiAgICBhcnJheVRhZyA9ICdbb2JqZWN0IEFycmF5XScsXG4gICAgYm9vbFRhZyA9ICdbb2JqZWN0IEJvb2xlYW5dJyxcbiAgICBkYXRlVGFnID0gJ1tvYmplY3QgRGF0ZV0nLFxuICAgIGVycm9yVGFnID0gJ1tvYmplY3QgRXJyb3JdJyxcbiAgICBmdW5jVGFnID0gJ1tvYmplY3QgRnVuY3Rpb25dJyxcbiAgICBtYXBUYWcgPSAnW29iamVjdCBNYXBdJyxcbiAgICBudW1iZXJUYWcgPSAnW29iamVjdCBOdW1iZXJdJyxcbiAgICBvYmplY3RUYWcgPSAnW29iamVjdCBPYmplY3RdJyxcbiAgICByZWdleHBUYWcgPSAnW29iamVjdCBSZWdFeHBdJyxcbiAgICBzZXRUYWcgPSAnW29iamVjdCBTZXRdJyxcbiAgICBzdHJpbmdUYWcgPSAnW29iamVjdCBTdHJpbmddJyxcbiAgICB3ZWFrTWFwVGFnID0gJ1tvYmplY3QgV2Vha01hcF0nO1xuXG52YXIgYXJyYXlCdWZmZXJUYWcgPSAnW29iamVjdCBBcnJheUJ1ZmZlcl0nLFxuICAgIGZsb2F0MzJUYWcgPSAnW29iamVjdCBGbG9hdDMyQXJyYXldJyxcbiAgICBmbG9hdDY0VGFnID0gJ1tvYmplY3QgRmxvYXQ2NEFycmF5XScsXG4gICAgaW50OFRhZyA9ICdbb2JqZWN0IEludDhBcnJheV0nLFxuICAgIGludDE2VGFnID0gJ1tvYmplY3QgSW50MTZBcnJheV0nLFxuICAgIGludDMyVGFnID0gJ1tvYmplY3QgSW50MzJBcnJheV0nLFxuICAgIHVpbnQ4VGFnID0gJ1tvYmplY3QgVWludDhBcnJheV0nLFxuICAgIHVpbnQ4Q2xhbXBlZFRhZyA9ICdbb2JqZWN0IFVpbnQ4Q2xhbXBlZEFycmF5XScsXG4gICAgdWludDE2VGFnID0gJ1tvYmplY3QgVWludDE2QXJyYXldJyxcbiAgICB1aW50MzJUYWcgPSAnW29iamVjdCBVaW50MzJBcnJheV0nO1xuXG4vKiogVXNlZCB0byBpZGVudGlmeSBgdG9TdHJpbmdUYWdgIHZhbHVlcyBvZiB0eXBlZCBhcnJheXMuICovXG52YXIgdHlwZWRBcnJheVRhZ3MgPSB7fTtcbnR5cGVkQXJyYXlUYWdzW2Zsb2F0MzJUYWddID0gdHlwZWRBcnJheVRhZ3NbZmxvYXQ2NFRhZ10gPVxudHlwZWRBcnJheVRhZ3NbaW50OFRhZ10gPSB0eXBlZEFycmF5VGFnc1tpbnQxNlRhZ10gPVxudHlwZWRBcnJheVRhZ3NbaW50MzJUYWddID0gdHlwZWRBcnJheVRhZ3NbdWludDhUYWddID1cbnR5cGVkQXJyYXlUYWdzW3VpbnQ4Q2xhbXBlZFRhZ10gPSB0eXBlZEFycmF5VGFnc1t1aW50MTZUYWddID1cbnR5cGVkQXJyYXlUYWdzW3VpbnQzMlRhZ10gPSB0cnVlO1xudHlwZWRBcnJheVRhZ3NbYXJnc1RhZ10gPSB0eXBlZEFycmF5VGFnc1thcnJheVRhZ10gPVxudHlwZWRBcnJheVRhZ3NbYXJyYXlCdWZmZXJUYWddID0gdHlwZWRBcnJheVRhZ3NbYm9vbFRhZ10gPVxudHlwZWRBcnJheVRhZ3NbZGF0ZVRhZ10gPSB0eXBlZEFycmF5VGFnc1tlcnJvclRhZ10gPVxudHlwZWRBcnJheVRhZ3NbZnVuY1RhZ10gPSB0eXBlZEFycmF5VGFnc1ttYXBUYWddID1cbnR5cGVkQXJyYXlUYWdzW251bWJlclRhZ10gPSB0eXBlZEFycmF5VGFnc1tvYmplY3RUYWddID1cbnR5cGVkQXJyYXlUYWdzW3JlZ2V4cFRhZ10gPSB0eXBlZEFycmF5VGFnc1tzZXRUYWddID1cbnR5cGVkQXJyYXlUYWdzW3N0cmluZ1RhZ10gPSB0eXBlZEFycmF5VGFnc1t3ZWFrTWFwVGFnXSA9IGZhbHNlO1xuXG4vKiogVXNlZCBmb3IgbmF0aXZlIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqXG4gKiBVc2VkIHRvIHJlc29sdmUgdGhlIFtgdG9TdHJpbmdUYWdgXShodHRwczovL3Blb3BsZS5tb3ppbGxhLm9yZy9+am9yZW5kb3JmZi9lczYtZHJhZnQuaHRtbCNzZWMtb2JqZWN0LnByb3RvdHlwZS50b3N0cmluZylcbiAqIG9mIHZhbHVlcy5cbiAqL1xudmFyIG9ialRvU3RyaW5nID0gb2JqZWN0UHJvdG8udG9TdHJpbmc7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgY2xhc3NpZmllZCBhcyBhIHR5cGVkIGFycmF5LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBjb3JyZWN0bHkgY2xhc3NpZmllZCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzVHlwZWRBcnJheShuZXcgVWludDhBcnJheSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc1R5cGVkQXJyYXkoW10pO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNUeXBlZEFycmF5KHZhbHVlKSB7XG4gIHJldHVybiBpc09iamVjdExpa2UodmFsdWUpICYmIGlzTGVuZ3RoKHZhbHVlLmxlbmd0aCkgJiYgISF0eXBlZEFycmF5VGFnc1tvYmpUb1N0cmluZy5jYWxsKHZhbHVlKV07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNUeXBlZEFycmF5O1xuIiwidmFyIGJhc2VGb3JPd24gPSByZXF1aXJlKCcuLi9pbnRlcm5hbC9iYXNlRm9yT3duJyksXG4gICAgY3JlYXRlRmluZEtleSA9IHJlcXVpcmUoJy4uL2ludGVybmFsL2NyZWF0ZUZpbmRLZXknKTtcblxuLyoqXG4gKiBUaGlzIG1ldGhvZCBpcyBsaWtlIGBfLmZpbmRgIGV4Y2VwdCB0aGF0IGl0IHJldHVybnMgdGhlIGtleSBvZiB0aGUgZmlyc3RcbiAqIGVsZW1lbnQgYHByZWRpY2F0ZWAgcmV0dXJucyB0cnV0aHkgZm9yIGluc3RlYWQgb2YgdGhlIGVsZW1lbnQgaXRzZWxmLlxuICpcbiAqIElmIGEgcHJvcGVydHkgbmFtZSBpcyBwcm92aWRlZCBmb3IgYHByZWRpY2F0ZWAgdGhlIGNyZWF0ZWQgYF8ucHJvcGVydHlgXG4gKiBzdHlsZSBjYWxsYmFjayByZXR1cm5zIHRoZSBwcm9wZXJ0eSB2YWx1ZSBvZiB0aGUgZ2l2ZW4gZWxlbWVudC5cbiAqXG4gKiBJZiBhIHZhbHVlIGlzIGFsc28gcHJvdmlkZWQgZm9yIGB0aGlzQXJnYCB0aGUgY3JlYXRlZCBgXy5tYXRjaGVzUHJvcGVydHlgXG4gKiBzdHlsZSBjYWxsYmFjayByZXR1cm5zIGB0cnVlYCBmb3IgZWxlbWVudHMgdGhhdCBoYXZlIGEgbWF0Y2hpbmcgcHJvcGVydHlcbiAqIHZhbHVlLCBlbHNlIGBmYWxzZWAuXG4gKlxuICogSWYgYW4gb2JqZWN0IGlzIHByb3ZpZGVkIGZvciBgcHJlZGljYXRlYCB0aGUgY3JlYXRlZCBgXy5tYXRjaGVzYCBzdHlsZVxuICogY2FsbGJhY2sgcmV0dXJucyBgdHJ1ZWAgZm9yIGVsZW1lbnRzIHRoYXQgaGF2ZSB0aGUgcHJvcGVydGllcyBvZiB0aGUgZ2l2ZW5cbiAqIG9iamVjdCwgZWxzZSBgZmFsc2VgLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAY2F0ZWdvcnkgT2JqZWN0XG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gc2VhcmNoLlxuICogQHBhcmFtIHtGdW5jdGlvbnxPYmplY3R8c3RyaW5nfSBbcHJlZGljYXRlPV8uaWRlbnRpdHldIFRoZSBmdW5jdGlvbiBpbnZva2VkXG4gKiAgcGVyIGl0ZXJhdGlvbi5cbiAqIEBwYXJhbSB7Kn0gW3RoaXNBcmddIFRoZSBgdGhpc2AgYmluZGluZyBvZiBgcHJlZGljYXRlYC5cbiAqIEByZXR1cm5zIHtzdHJpbmd8dW5kZWZpbmVkfSBSZXR1cm5zIHRoZSBrZXkgb2YgdGhlIG1hdGNoZWQgZWxlbWVudCwgZWxzZSBgdW5kZWZpbmVkYC5cbiAqIEBleGFtcGxlXG4gKlxuICogdmFyIHVzZXJzID0ge1xuICogICAnYmFybmV5JzogIHsgJ2FnZSc6IDM2LCAnYWN0aXZlJzogdHJ1ZSB9LFxuICogICAnZnJlZCc6ICAgIHsgJ2FnZSc6IDQwLCAnYWN0aXZlJzogZmFsc2UgfSxcbiAqICAgJ3BlYmJsZXMnOiB7ICdhZ2UnOiAxLCAgJ2FjdGl2ZSc6IHRydWUgfVxuICogfTtcbiAqXG4gKiBfLmZpbmRLZXkodXNlcnMsIGZ1bmN0aW9uKGNocikge1xuICogICByZXR1cm4gY2hyLmFnZSA8IDQwO1xuICogfSk7XG4gKiAvLyA9PiAnYmFybmV5JyAoaXRlcmF0aW9uIG9yZGVyIGlzIG5vdCBndWFyYW50ZWVkKVxuICpcbiAqIC8vIHVzaW5nIHRoZSBgXy5tYXRjaGVzYCBjYWxsYmFjayBzaG9ydGhhbmRcbiAqIF8uZmluZEtleSh1c2VycywgeyAnYWdlJzogMSwgJ2FjdGl2ZSc6IHRydWUgfSk7XG4gKiAvLyA9PiAncGViYmxlcydcbiAqXG4gKiAvLyB1c2luZyB0aGUgYF8ubWF0Y2hlc1Byb3BlcnR5YCBjYWxsYmFjayBzaG9ydGhhbmRcbiAqIF8uZmluZEtleSh1c2VycywgJ2FjdGl2ZScsIGZhbHNlKTtcbiAqIC8vID0+ICdmcmVkJ1xuICpcbiAqIC8vIHVzaW5nIHRoZSBgXy5wcm9wZXJ0eWAgY2FsbGJhY2sgc2hvcnRoYW5kXG4gKiBfLmZpbmRLZXkodXNlcnMsICdhY3RpdmUnKTtcbiAqIC8vID0+ICdiYXJuZXknXG4gKi9cbnZhciBmaW5kS2V5ID0gY3JlYXRlRmluZEtleShiYXNlRm9yT3duKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmaW5kS2V5O1xuIiwidmFyIGJhc2VGb3JPd24gPSByZXF1aXJlKCcuLi9pbnRlcm5hbC9iYXNlRm9yT3duJyksXG4gICAgY3JlYXRlRm9yT3duID0gcmVxdWlyZSgnLi4vaW50ZXJuYWwvY3JlYXRlRm9yT3duJyk7XG5cbi8qKlxuICogSXRlcmF0ZXMgb3ZlciBvd24gZW51bWVyYWJsZSBwcm9wZXJ0aWVzIG9mIGFuIG9iamVjdCBpbnZva2luZyBgaXRlcmF0ZWVgXG4gKiBmb3IgZWFjaCBwcm9wZXJ0eS4gVGhlIGBpdGVyYXRlZWAgaXMgYm91bmQgdG8gYHRoaXNBcmdgIGFuZCBpbnZva2VkIHdpdGhcbiAqIHRocmVlIGFyZ3VtZW50czogKHZhbHVlLCBrZXksIG9iamVjdCkuIEl0ZXJhdG9yIGZ1bmN0aW9ucyBtYXkgZXhpdCBpdGVyYXRpb25cbiAqIGVhcmx5IGJ5IGV4cGxpY2l0bHkgcmV0dXJuaW5nIGBmYWxzZWAuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBPYmplY3RcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBpdGVyYXRlIG92ZXIuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbaXRlcmF0ZWU9Xy5pZGVudGl0eV0gVGhlIGZ1bmN0aW9uIGludm9rZWQgcGVyIGl0ZXJhdGlvbi5cbiAqIEBwYXJhbSB7Kn0gW3RoaXNBcmddIFRoZSBgdGhpc2AgYmluZGluZyBvZiBgaXRlcmF0ZWVgLlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyBgb2JqZWN0YC5cbiAqIEBleGFtcGxlXG4gKlxuICogZnVuY3Rpb24gRm9vKCkge1xuICogICB0aGlzLmEgPSAxO1xuICogICB0aGlzLmIgPSAyO1xuICogfVxuICpcbiAqIEZvby5wcm90b3R5cGUuYyA9IDM7XG4gKlxuICogXy5mb3JPd24obmV3IEZvbywgZnVuY3Rpb24odmFsdWUsIGtleSkge1xuICogICBjb25zb2xlLmxvZyhrZXkpO1xuICogfSk7XG4gKiAvLyA9PiBsb2dzICdhJyBhbmQgJ2InIChpdGVyYXRpb24gb3JkZXIgaXMgbm90IGd1YXJhbnRlZWQpXG4gKi9cbnZhciBmb3JPd24gPSBjcmVhdGVGb3JPd24oYmFzZUZvck93bik7XG5cbm1vZHVsZS5leHBvcnRzID0gZm9yT3duO1xuIiwidmFyIGlzTGVuZ3RoID0gcmVxdWlyZSgnLi4vaW50ZXJuYWwvaXNMZW5ndGgnKSxcbiAgICBpc05hdGl2ZSA9IHJlcXVpcmUoJy4uL2xhbmcvaXNOYXRpdmUnKSxcbiAgICBpc09iamVjdCA9IHJlcXVpcmUoJy4uL2xhbmcvaXNPYmplY3QnKSxcbiAgICBzaGltS2V5cyA9IHJlcXVpcmUoJy4uL2ludGVybmFsL3NoaW1LZXlzJyk7XG5cbi8qIE5hdGl2ZSBtZXRob2QgcmVmZXJlbmNlcyBmb3IgdGhvc2Ugd2l0aCB0aGUgc2FtZSBuYW1lIGFzIG90aGVyIGBsb2Rhc2hgIG1ldGhvZHMuICovXG52YXIgbmF0aXZlS2V5cyA9IGlzTmF0aXZlKG5hdGl2ZUtleXMgPSBPYmplY3Qua2V5cykgJiYgbmF0aXZlS2V5cztcblxuLyoqXG4gKiBDcmVhdGVzIGFuIGFycmF5IG9mIHRoZSBvd24gZW51bWVyYWJsZSBwcm9wZXJ0eSBuYW1lcyBvZiBgb2JqZWN0YC5cbiAqXG4gKiAqKk5vdGU6KiogTm9uLW9iamVjdCB2YWx1ZXMgYXJlIGNvZXJjZWQgdG8gb2JqZWN0cy4gU2VlIHRoZVxuICogW0VTIHNwZWNdKGh0dHBzOi8vcGVvcGxlLm1vemlsbGEub3JnL35qb3JlbmRvcmZmL2VzNi1kcmFmdC5odG1sI3NlYy1vYmplY3Qua2V5cylcbiAqIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBPYmplY3RcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBpbnNwZWN0LlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBhcnJheSBvZiBwcm9wZXJ0eSBuYW1lcy5cbiAqIEBleGFtcGxlXG4gKlxuICogZnVuY3Rpb24gRm9vKCkge1xuICogICB0aGlzLmEgPSAxO1xuICogICB0aGlzLmIgPSAyO1xuICogfVxuICpcbiAqIEZvby5wcm90b3R5cGUuYyA9IDM7XG4gKlxuICogXy5rZXlzKG5ldyBGb28pO1xuICogLy8gPT4gWydhJywgJ2InXSAoaXRlcmF0aW9uIG9yZGVyIGlzIG5vdCBndWFyYW50ZWVkKVxuICpcbiAqIF8ua2V5cygnaGknKTtcbiAqIC8vID0+IFsnMCcsICcxJ11cbiAqL1xudmFyIGtleXMgPSAhbmF0aXZlS2V5cyA/IHNoaW1LZXlzIDogZnVuY3Rpb24ob2JqZWN0KSB7XG4gIGlmIChvYmplY3QpIHtcbiAgICB2YXIgQ3RvciA9IG9iamVjdC5jb25zdHJ1Y3RvcixcbiAgICAgICAgbGVuZ3RoID0gb2JqZWN0Lmxlbmd0aDtcbiAgfVxuICBpZiAoKHR5cGVvZiBDdG9yID09ICdmdW5jdGlvbicgJiYgQ3Rvci5wcm90b3R5cGUgPT09IG9iamVjdCkgfHxcbiAgICAgICh0eXBlb2Ygb2JqZWN0ICE9ICdmdW5jdGlvbicgJiYgKGxlbmd0aCAmJiBpc0xlbmd0aChsZW5ndGgpKSkpIHtcbiAgICByZXR1cm4gc2hpbUtleXMob2JqZWN0KTtcbiAgfVxuICByZXR1cm4gaXNPYmplY3Qob2JqZWN0KSA/IG5hdGl2ZUtleXMob2JqZWN0KSA6IFtdO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBrZXlzO1xuIiwidmFyIGlzQXJndW1lbnRzID0gcmVxdWlyZSgnLi4vbGFuZy9pc0FyZ3VtZW50cycpLFxuICAgIGlzQXJyYXkgPSByZXF1aXJlKCcuLi9sYW5nL2lzQXJyYXknKSxcbiAgICBpc0luZGV4ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWwvaXNJbmRleCcpLFxuICAgIGlzTGVuZ3RoID0gcmVxdWlyZSgnLi4vaW50ZXJuYWwvaXNMZW5ndGgnKSxcbiAgICBpc09iamVjdCA9IHJlcXVpcmUoJy4uL2xhbmcvaXNPYmplY3QnKSxcbiAgICBzdXBwb3J0ID0gcmVxdWlyZSgnLi4vc3VwcG9ydCcpO1xuXG4vKiogVXNlZCBmb3IgbmF0aXZlIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqIFVzZWQgdG8gY2hlY2sgb2JqZWN0cyBmb3Igb3duIHByb3BlcnRpZXMuICovXG52YXIgaGFzT3duUHJvcGVydHkgPSBvYmplY3RQcm90by5oYXNPd25Qcm9wZXJ0eTtcblxuLyoqXG4gKiBDcmVhdGVzIGFuIGFycmF5IG9mIHRoZSBvd24gYW5kIGluaGVyaXRlZCBlbnVtZXJhYmxlIHByb3BlcnR5IG5hbWVzIG9mIGBvYmplY3RgLlxuICpcbiAqICoqTm90ZToqKiBOb24tb2JqZWN0IHZhbHVlcyBhcmUgY29lcmNlZCB0byBvYmplY3RzLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAY2F0ZWdvcnkgT2JqZWN0XG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gaW5zcGVjdC5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgYXJyYXkgb2YgcHJvcGVydHkgbmFtZXMuXG4gKiBAZXhhbXBsZVxuICpcbiAqIGZ1bmN0aW9uIEZvbygpIHtcbiAqICAgdGhpcy5hID0gMTtcbiAqICAgdGhpcy5iID0gMjtcbiAqIH1cbiAqXG4gKiBGb28ucHJvdG90eXBlLmMgPSAzO1xuICpcbiAqIF8ua2V5c0luKG5ldyBGb28pO1xuICogLy8gPT4gWydhJywgJ2InLCAnYyddIChpdGVyYXRpb24gb3JkZXIgaXMgbm90IGd1YXJhbnRlZWQpXG4gKi9cbmZ1bmN0aW9uIGtleXNJbihvYmplY3QpIHtcbiAgaWYgKG9iamVjdCA9PSBudWxsKSB7XG4gICAgcmV0dXJuIFtdO1xuICB9XG4gIGlmICghaXNPYmplY3Qob2JqZWN0KSkge1xuICAgIG9iamVjdCA9IE9iamVjdChvYmplY3QpO1xuICB9XG4gIHZhciBsZW5ndGggPSBvYmplY3QubGVuZ3RoO1xuICBsZW5ndGggPSAobGVuZ3RoICYmIGlzTGVuZ3RoKGxlbmd0aCkgJiZcbiAgICAoaXNBcnJheShvYmplY3QpIHx8IChzdXBwb3J0Lm5vbkVudW1BcmdzICYmIGlzQXJndW1lbnRzKG9iamVjdCkpKSAmJiBsZW5ndGgpIHx8IDA7XG5cbiAgdmFyIEN0b3IgPSBvYmplY3QuY29uc3RydWN0b3IsXG4gICAgICBpbmRleCA9IC0xLFxuICAgICAgaXNQcm90byA9IHR5cGVvZiBDdG9yID09ICdmdW5jdGlvbicgJiYgQ3Rvci5wcm90b3R5cGUgPT09IG9iamVjdCxcbiAgICAgIHJlc3VsdCA9IEFycmF5KGxlbmd0aCksXG4gICAgICBza2lwSW5kZXhlcyA9IGxlbmd0aCA+IDA7XG5cbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICByZXN1bHRbaW5kZXhdID0gKGluZGV4ICsgJycpO1xuICB9XG4gIGZvciAodmFyIGtleSBpbiBvYmplY3QpIHtcbiAgICBpZiAoIShza2lwSW5kZXhlcyAmJiBpc0luZGV4KGtleSwgbGVuZ3RoKSkgJiZcbiAgICAgICAgIShrZXkgPT0gJ2NvbnN0cnVjdG9yJyAmJiAoaXNQcm90byB8fCAhaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIGtleSkpKSkge1xuICAgICAgcmVzdWx0LnB1c2goa2V5KTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBrZXlzSW47XG4iLCJ2YXIgYmFzZUNhbGxiYWNrID0gcmVxdWlyZSgnLi4vaW50ZXJuYWwvYmFzZUNhbGxiYWNrJyksXG4gICAgYmFzZUZvck93biA9IHJlcXVpcmUoJy4uL2ludGVybmFsL2Jhc2VGb3JPd24nKTtcblxuLyoqXG4gKiBDcmVhdGVzIGFuIG9iamVjdCB3aXRoIHRoZSBzYW1lIGtleXMgYXMgYG9iamVjdGAgYW5kIHZhbHVlcyBnZW5lcmF0ZWQgYnlcbiAqIHJ1bm5pbmcgZWFjaCBvd24gZW51bWVyYWJsZSBwcm9wZXJ0eSBvZiBgb2JqZWN0YCB0aHJvdWdoIGBpdGVyYXRlZWAuIFRoZVxuICogaXRlcmF0ZWUgZnVuY3Rpb24gaXMgYm91bmQgdG8gYHRoaXNBcmdgIGFuZCBpbnZva2VkIHdpdGggdGhyZWUgYXJndW1lbnRzOlxuICogKHZhbHVlLCBrZXksIG9iamVjdCkuXG4gKlxuICogSWYgYSBwcm9wZXJ0eSBuYW1lIGlzIHByb3ZpZGVkIGZvciBgaXRlcmF0ZWVgIHRoZSBjcmVhdGVkIGBfLnByb3BlcnR5YFxuICogc3R5bGUgY2FsbGJhY2sgcmV0dXJucyB0aGUgcHJvcGVydHkgdmFsdWUgb2YgdGhlIGdpdmVuIGVsZW1lbnQuXG4gKlxuICogSWYgYSB2YWx1ZSBpcyBhbHNvIHByb3ZpZGVkIGZvciBgdGhpc0FyZ2AgdGhlIGNyZWF0ZWQgYF8ubWF0Y2hlc1Byb3BlcnR5YFxuICogc3R5bGUgY2FsbGJhY2sgcmV0dXJucyBgdHJ1ZWAgZm9yIGVsZW1lbnRzIHRoYXQgaGF2ZSBhIG1hdGNoaW5nIHByb3BlcnR5XG4gKiB2YWx1ZSwgZWxzZSBgZmFsc2VgLlxuICpcbiAqIElmIGFuIG9iamVjdCBpcyBwcm92aWRlZCBmb3IgYGl0ZXJhdGVlYCB0aGUgY3JlYXRlZCBgXy5tYXRjaGVzYCBzdHlsZVxuICogY2FsbGJhY2sgcmV0dXJucyBgdHJ1ZWAgZm9yIGVsZW1lbnRzIHRoYXQgaGF2ZSB0aGUgcHJvcGVydGllcyBvZiB0aGUgZ2l2ZW5cbiAqIG9iamVjdCwgZWxzZSBgZmFsc2VgLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAY2F0ZWdvcnkgT2JqZWN0XG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gaXRlcmF0ZSBvdmVyLlxuICogQHBhcmFtIHtGdW5jdGlvbnxPYmplY3R8c3RyaW5nfSBbaXRlcmF0ZWU9Xy5pZGVudGl0eV0gVGhlIGZ1bmN0aW9uIGludm9rZWRcbiAqICBwZXIgaXRlcmF0aW9uLlxuICogQHBhcmFtIHsqfSBbdGhpc0FyZ10gVGhlIGB0aGlzYCBiaW5kaW5nIG9mIGBpdGVyYXRlZWAuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIHRoZSBuZXcgbWFwcGVkIG9iamVjdC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5tYXBWYWx1ZXMoeyAnYSc6IDEsICdiJzogMiB9LCBmdW5jdGlvbihuKSB7XG4gKiAgIHJldHVybiBuICogMztcbiAqIH0pO1xuICogLy8gPT4geyAnYSc6IDMsICdiJzogNiB9XG4gKlxuICogdmFyIHVzZXJzID0ge1xuICogICAnZnJlZCc6ICAgIHsgJ3VzZXInOiAnZnJlZCcsICAgICdhZ2UnOiA0MCB9LFxuICogICAncGViYmxlcyc6IHsgJ3VzZXInOiAncGViYmxlcycsICdhZ2UnOiAxIH1cbiAqIH07XG4gKlxuICogLy8gdXNpbmcgdGhlIGBfLnByb3BlcnR5YCBjYWxsYmFjayBzaG9ydGhhbmRcbiAqIF8ubWFwVmFsdWVzKHVzZXJzLCAnYWdlJyk7XG4gKiAvLyA9PiB7ICdmcmVkJzogNDAsICdwZWJibGVzJzogMSB9IChpdGVyYXRpb24gb3JkZXIgaXMgbm90IGd1YXJhbnRlZWQpXG4gKi9cbmZ1bmN0aW9uIG1hcFZhbHVlcyhvYmplY3QsIGl0ZXJhdGVlLCB0aGlzQXJnKSB7XG4gIHZhciByZXN1bHQgPSB7fTtcbiAgaXRlcmF0ZWUgPSBiYXNlQ2FsbGJhY2soaXRlcmF0ZWUsIHRoaXNBcmcsIDMpO1xuXG4gIGJhc2VGb3JPd24ob2JqZWN0LCBmdW5jdGlvbih2YWx1ZSwga2V5LCBvYmplY3QpIHtcbiAgICByZXN1bHRba2V5XSA9IGl0ZXJhdGVlKHZhbHVlLCBrZXksIG9iamVjdCk7XG4gIH0pO1xuICByZXR1cm4gcmVzdWx0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IG1hcFZhbHVlcztcbiIsInZhciBiYXNlVG9TdHJpbmcgPSByZXF1aXJlKCcuLi9pbnRlcm5hbC9iYXNlVG9TdHJpbmcnKTtcblxuLyoqXG4gKiBVc2VkIHRvIG1hdGNoIGBSZWdFeHBgIFtzcGVjaWFsIGNoYXJhY3RlcnNdKGh0dHA6Ly93d3cucmVndWxhci1leHByZXNzaW9ucy5pbmZvL2NoYXJhY3RlcnMuaHRtbCNzcGVjaWFsKS5cbiAqIEluIGFkZGl0aW9uIHRvIHNwZWNpYWwgY2hhcmFjdGVycyB0aGUgZm9yd2FyZCBzbGFzaCBpcyBlc2NhcGVkIHRvIGFsbG93IGZvclxuICogZWFzaWVyIGBldmFsYCB1c2UgYW5kIGBGdW5jdGlvbmAgY29tcGlsYXRpb24uXG4gKi9cbnZhciByZVJlZ0V4cENoYXJzID0gL1suKis/XiR7fSgpfFtcXF1cXC9cXFxcXS9nLFxuICAgIHJlSGFzUmVnRXhwQ2hhcnMgPSBSZWdFeHAocmVSZWdFeHBDaGFycy5zb3VyY2UpO1xuXG4vKipcbiAqIEVzY2FwZXMgdGhlIGBSZWdFeHBgIHNwZWNpYWwgY2hhcmFjdGVycyBcIlxcXCIsIFwiL1wiLCBcIl5cIiwgXCIkXCIsIFwiLlwiLCBcInxcIiwgXCI/XCIsXG4gKiBcIipcIiwgXCIrXCIsIFwiKFwiLCBcIilcIiwgXCJbXCIsIFwiXVwiLCBcIntcIiBhbmQgXCJ9XCIgaW4gYHN0cmluZ2AuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBTdHJpbmdcbiAqIEBwYXJhbSB7c3RyaW5nfSBbc3RyaW5nPScnXSBUaGUgc3RyaW5nIHRvIGVzY2FwZS5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIGVzY2FwZWQgc3RyaW5nLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmVzY2FwZVJlZ0V4cCgnW2xvZGFzaF0oaHR0cHM6Ly9sb2Rhc2guY29tLyknKTtcbiAqIC8vID0+ICdcXFtsb2Rhc2hcXF1cXChodHRwczpcXC9cXC9sb2Rhc2hcXC5jb21cXC9cXCknXG4gKi9cbmZ1bmN0aW9uIGVzY2FwZVJlZ0V4cChzdHJpbmcpIHtcbiAgc3RyaW5nID0gYmFzZVRvU3RyaW5nKHN0cmluZyk7XG4gIHJldHVybiAoc3RyaW5nICYmIHJlSGFzUmVnRXhwQ2hhcnMudGVzdChzdHJpbmcpKVxuICAgID8gc3RyaW5nLnJlcGxhY2UocmVSZWdFeHBDaGFycywgJ1xcXFwkJicpXG4gICAgOiBzdHJpbmc7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZXNjYXBlUmVnRXhwO1xuIiwiLyoqIFVzZWQgZm9yIG5hdGl2ZSBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKiBVc2VkIHRvIGRldGVjdCBET00gc3VwcG9ydC4gKi9cbnZhciBkb2N1bWVudCA9IChkb2N1bWVudCA9IGdsb2JhbC53aW5kb3cpICYmIGRvY3VtZW50LmRvY3VtZW50O1xuXG4vKiogTmF0aXZlIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIHByb3BlcnR5SXNFbnVtZXJhYmxlID0gb2JqZWN0UHJvdG8ucHJvcGVydHlJc0VudW1lcmFibGU7XG5cbi8qKlxuICogQW4gb2JqZWN0IGVudmlyb25tZW50IGZlYXR1cmUgZmxhZ3MuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEB0eXBlIE9iamVjdFxuICovXG52YXIgc3VwcG9ydCA9IHt9O1xuXG4oZnVuY3Rpb24oeCkge1xuXG4gIC8qKlxuICAgKiBEZXRlY3QgaWYgZnVuY3Rpb25zIGNhbiBiZSBkZWNvbXBpbGVkIGJ5IGBGdW5jdGlvbiN0b1N0cmluZ2BcbiAgICogKGFsbCBidXQgRmlyZWZveCBPUyBjZXJ0aWZpZWQgYXBwcywgb2xkZXIgT3BlcmEgbW9iaWxlIGJyb3dzZXJzLCBhbmRcbiAgICogdGhlIFBsYXlTdGF0aW9uIDM7IGZvcmNlZCBgZmFsc2VgIGZvciBXaW5kb3dzIDggYXBwcykuXG4gICAqXG4gICAqIEBtZW1iZXJPZiBfLnN1cHBvcnRcbiAgICogQHR5cGUgYm9vbGVhblxuICAgKi9cbiAgc3VwcG9ydC5mdW5jRGVjb21wID0gL1xcYnRoaXNcXGIvLnRlc3QoZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzOyB9KTtcblxuICAvKipcbiAgICogRGV0ZWN0IGlmIGBGdW5jdGlvbiNuYW1lYCBpcyBzdXBwb3J0ZWQgKGFsbCBidXQgSUUpLlxuICAgKlxuICAgKiBAbWVtYmVyT2YgXy5zdXBwb3J0XG4gICAqIEB0eXBlIGJvb2xlYW5cbiAgICovXG4gIHN1cHBvcnQuZnVuY05hbWVzID0gdHlwZW9mIEZ1bmN0aW9uLm5hbWUgPT0gJ3N0cmluZyc7XG5cbiAgLyoqXG4gICAqIERldGVjdCBpZiB0aGUgRE9NIGlzIHN1cHBvcnRlZC5cbiAgICpcbiAgICogQG1lbWJlck9mIF8uc3VwcG9ydFxuICAgKiBAdHlwZSBib29sZWFuXG4gICAqL1xuICB0cnkge1xuICAgIHN1cHBvcnQuZG9tID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpLm5vZGVUeXBlID09PSAxMTtcbiAgfSBjYXRjaChlKSB7XG4gICAgc3VwcG9ydC5kb20gPSBmYWxzZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZXRlY3QgaWYgYGFyZ3VtZW50c2Agb2JqZWN0IGluZGV4ZXMgYXJlIG5vbi1lbnVtZXJhYmxlLlxuICAgKlxuICAgKiBJbiBGaXJlZm94IDwgNCwgSUUgPCA5LCBQaGFudG9tSlMsIGFuZCBTYWZhcmkgPCA1LjEgYGFyZ3VtZW50c2Agb2JqZWN0XG4gICAqIGluZGV4ZXMgYXJlIG5vbi1lbnVtZXJhYmxlLiBDaHJvbWUgPCAyNSBhbmQgTm9kZS5qcyA8IDAuMTEuMCB0cmVhdFxuICAgKiBgYXJndW1lbnRzYCBvYmplY3QgaW5kZXhlcyBhcyBub24tZW51bWVyYWJsZSBhbmQgZmFpbCBgaGFzT3duUHJvcGVydHlgXG4gICAqIGNoZWNrcyBmb3IgaW5kZXhlcyB0aGF0IGV4Y2VlZCB0aGVpciBmdW5jdGlvbidzIGZvcm1hbCBwYXJhbWV0ZXJzIHdpdGhcbiAgICogYXNzb2NpYXRlZCB2YWx1ZXMgb2YgYDBgLlxuICAgKlxuICAgKiBAbWVtYmVyT2YgXy5zdXBwb3J0XG4gICAqIEB0eXBlIGJvb2xlYW5cbiAgICovXG4gIHRyeSB7XG4gICAgc3VwcG9ydC5ub25FbnVtQXJncyA9ICFwcm9wZXJ0eUlzRW51bWVyYWJsZS5jYWxsKGFyZ3VtZW50cywgMSk7XG4gIH0gY2F0Y2goZSkge1xuICAgIHN1cHBvcnQubm9uRW51bUFyZ3MgPSB0cnVlO1xuICB9XG59KDAsIDApKTtcblxubW9kdWxlLmV4cG9ydHMgPSBzdXBwb3J0O1xuIiwiLyoqXG4gKiBDcmVhdGVzIGEgZnVuY3Rpb24gdGhhdCByZXR1cm5zIGB2YWx1ZWAuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBVdGlsaXR5XG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byByZXR1cm4gZnJvbSB0aGUgbmV3IGZ1bmN0aW9uLlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgZnVuY3Rpb24uXG4gKiBAZXhhbXBsZVxuICpcbiAqIHZhciBvYmplY3QgPSB7ICd1c2VyJzogJ2ZyZWQnIH07XG4gKiB2YXIgZ2V0dGVyID0gXy5jb25zdGFudChvYmplY3QpO1xuICpcbiAqIGdldHRlcigpID09PSBvYmplY3Q7XG4gKiAvLyA9PiB0cnVlXG4gKi9cbmZ1bmN0aW9uIGNvbnN0YW50KHZhbHVlKSB7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdmFsdWU7XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gY29uc3RhbnQ7XG4iLCIvKipcbiAqIFRoaXMgbWV0aG9kIHJldHVybnMgdGhlIGZpcnN0IGFyZ3VtZW50IHByb3ZpZGVkIHRvIGl0LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAY2F0ZWdvcnkgVXRpbGl0eVxuICogQHBhcmFtIHsqfSB2YWx1ZSBBbnkgdmFsdWUuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyBgdmFsdWVgLlxuICogQGV4YW1wbGVcbiAqXG4gKiB2YXIgb2JqZWN0ID0geyAndXNlcic6ICdmcmVkJyB9O1xuICpcbiAqIF8uaWRlbnRpdHkob2JqZWN0KSA9PT0gb2JqZWN0O1xuICogLy8gPT4gdHJ1ZVxuICovXG5mdW5jdGlvbiBpZGVudGl0eSh2YWx1ZSkge1xuICByZXR1cm4gdmFsdWU7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaWRlbnRpdHk7XG4iLCIoZnVuY3Rpb24oKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgZnVuY3Rpb24gJCRyb3V0ZSRyZWNvZ25pemVyJGRzbCQkVGFyZ2V0KHBhdGgsIG1hdGNoZXIsIGRlbGVnYXRlKSB7XG4gICAgICB0aGlzLnBhdGggPSBwYXRoO1xuICAgICAgdGhpcy5tYXRjaGVyID0gbWF0Y2hlcjtcbiAgICAgIHRoaXMuZGVsZWdhdGUgPSBkZWxlZ2F0ZTtcbiAgICB9XG5cbiAgICAkJHJvdXRlJHJlY29nbml6ZXIkZHNsJCRUYXJnZXQucHJvdG90eXBlID0ge1xuICAgICAgdG86IGZ1bmN0aW9uKHRhcmdldCwgY2FsbGJhY2spIHtcbiAgICAgICAgdmFyIGRlbGVnYXRlID0gdGhpcy5kZWxlZ2F0ZTtcblxuICAgICAgICBpZiAoZGVsZWdhdGUgJiYgZGVsZWdhdGUud2lsbEFkZFJvdXRlKSB7XG4gICAgICAgICAgdGFyZ2V0ID0gZGVsZWdhdGUud2lsbEFkZFJvdXRlKHRoaXMubWF0Y2hlci50YXJnZXQsIHRhcmdldCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLm1hdGNoZXIuYWRkKHRoaXMucGF0aCwgdGFyZ2V0KTtcblxuICAgICAgICBpZiAoY2FsbGJhY2spIHtcbiAgICAgICAgICBpZiAoY2FsbGJhY2subGVuZ3RoID09PSAwKSB7IHRocm93IG5ldyBFcnJvcihcIllvdSBtdXN0IGhhdmUgYW4gYXJndW1lbnQgaW4gdGhlIGZ1bmN0aW9uIHBhc3NlZCB0byBgdG9gXCIpOyB9XG4gICAgICAgICAgdGhpcy5tYXRjaGVyLmFkZENoaWxkKHRoaXMucGF0aCwgdGFyZ2V0LCBjYWxsYmFjaywgdGhpcy5kZWxlZ2F0ZSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICB9XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uICQkcm91dGUkcmVjb2duaXplciRkc2wkJE1hdGNoZXIodGFyZ2V0KSB7XG4gICAgICB0aGlzLnJvdXRlcyA9IHt9O1xuICAgICAgdGhpcy5jaGlsZHJlbiA9IHt9O1xuICAgICAgdGhpcy50YXJnZXQgPSB0YXJnZXQ7XG4gICAgfVxuXG4gICAgJCRyb3V0ZSRyZWNvZ25pemVyJGRzbCQkTWF0Y2hlci5wcm90b3R5cGUgPSB7XG4gICAgICBhZGQ6IGZ1bmN0aW9uKHBhdGgsIGhhbmRsZXIpIHtcbiAgICAgICAgdGhpcy5yb3V0ZXNbcGF0aF0gPSBoYW5kbGVyO1xuICAgICAgfSxcblxuICAgICAgYWRkQ2hpbGQ6IGZ1bmN0aW9uKHBhdGgsIHRhcmdldCwgY2FsbGJhY2ssIGRlbGVnYXRlKSB7XG4gICAgICAgIHZhciBtYXRjaGVyID0gbmV3ICQkcm91dGUkcmVjb2duaXplciRkc2wkJE1hdGNoZXIodGFyZ2V0KTtcbiAgICAgICAgdGhpcy5jaGlsZHJlbltwYXRoXSA9IG1hdGNoZXI7XG5cbiAgICAgICAgdmFyIG1hdGNoID0gJCRyb3V0ZSRyZWNvZ25pemVyJGRzbCQkZ2VuZXJhdGVNYXRjaChwYXRoLCBtYXRjaGVyLCBkZWxlZ2F0ZSk7XG5cbiAgICAgICAgaWYgKGRlbGVnYXRlICYmIGRlbGVnYXRlLmNvbnRleHRFbnRlcmVkKSB7XG4gICAgICAgICAgZGVsZWdhdGUuY29udGV4dEVudGVyZWQodGFyZ2V0LCBtYXRjaCk7XG4gICAgICAgIH1cblxuICAgICAgICBjYWxsYmFjayhtYXRjaCk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uICQkcm91dGUkcmVjb2duaXplciRkc2wkJGdlbmVyYXRlTWF0Y2goc3RhcnRpbmdQYXRoLCBtYXRjaGVyLCBkZWxlZ2F0ZSkge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uKHBhdGgsIG5lc3RlZENhbGxiYWNrKSB7XG4gICAgICAgIHZhciBmdWxsUGF0aCA9IHN0YXJ0aW5nUGF0aCArIHBhdGg7XG5cbiAgICAgICAgaWYgKG5lc3RlZENhbGxiYWNrKSB7XG4gICAgICAgICAgbmVzdGVkQ2FsbGJhY2soJCRyb3V0ZSRyZWNvZ25pemVyJGRzbCQkZ2VuZXJhdGVNYXRjaChmdWxsUGF0aCwgbWF0Y2hlciwgZGVsZWdhdGUpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gbmV3ICQkcm91dGUkcmVjb2duaXplciRkc2wkJFRhcmdldChzdGFydGluZ1BhdGggKyBwYXRoLCBtYXRjaGVyLCBkZWxlZ2F0ZSk7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gJCRyb3V0ZSRyZWNvZ25pemVyJGRzbCQkYWRkUm91dGUocm91dGVBcnJheSwgcGF0aCwgaGFuZGxlcikge1xuICAgICAgdmFyIGxlbiA9IDA7XG4gICAgICBmb3IgKHZhciBpPTAsIGw9cm91dGVBcnJheS5sZW5ndGg7IGk8bDsgaSsrKSB7XG4gICAgICAgIGxlbiArPSByb3V0ZUFycmF5W2ldLnBhdGgubGVuZ3RoO1xuICAgICAgfVxuXG4gICAgICBwYXRoID0gcGF0aC5zdWJzdHIobGVuKTtcbiAgICAgIHZhciByb3V0ZSA9IHsgcGF0aDogcGF0aCwgaGFuZGxlcjogaGFuZGxlciB9O1xuICAgICAgcm91dGVBcnJheS5wdXNoKHJvdXRlKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiAkJHJvdXRlJHJlY29nbml6ZXIkZHNsJCRlYWNoUm91dGUoYmFzZVJvdXRlLCBtYXRjaGVyLCBjYWxsYmFjaywgYmluZGluZykge1xuICAgICAgdmFyIHJvdXRlcyA9IG1hdGNoZXIucm91dGVzO1xuXG4gICAgICBmb3IgKHZhciBwYXRoIGluIHJvdXRlcykge1xuICAgICAgICBpZiAocm91dGVzLmhhc093blByb3BlcnR5KHBhdGgpKSB7XG4gICAgICAgICAgdmFyIHJvdXRlQXJyYXkgPSBiYXNlUm91dGUuc2xpY2UoKTtcbiAgICAgICAgICAkJHJvdXRlJHJlY29nbml6ZXIkZHNsJCRhZGRSb3V0ZShyb3V0ZUFycmF5LCBwYXRoLCByb3V0ZXNbcGF0aF0pO1xuXG4gICAgICAgICAgaWYgKG1hdGNoZXIuY2hpbGRyZW5bcGF0aF0pIHtcbiAgICAgICAgICAgICQkcm91dGUkcmVjb2duaXplciRkc2wkJGVhY2hSb3V0ZShyb3V0ZUFycmF5LCBtYXRjaGVyLmNoaWxkcmVuW3BhdGhdLCBjYWxsYmFjaywgYmluZGluZyk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhbGxiYWNrLmNhbGwoYmluZGluZywgcm91dGVBcnJheSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgdmFyICQkcm91dGUkcmVjb2duaXplciRkc2wkJGRlZmF1bHQgPSBmdW5jdGlvbihjYWxsYmFjaywgYWRkUm91dGVDYWxsYmFjaykge1xuICAgICAgdmFyIG1hdGNoZXIgPSBuZXcgJCRyb3V0ZSRyZWNvZ25pemVyJGRzbCQkTWF0Y2hlcigpO1xuXG4gICAgICBjYWxsYmFjaygkJHJvdXRlJHJlY29nbml6ZXIkZHNsJCRnZW5lcmF0ZU1hdGNoKFwiXCIsIG1hdGNoZXIsIHRoaXMuZGVsZWdhdGUpKTtcblxuICAgICAgJCRyb3V0ZSRyZWNvZ25pemVyJGRzbCQkZWFjaFJvdXRlKFtdLCBtYXRjaGVyLCBmdW5jdGlvbihyb3V0ZSkge1xuICAgICAgICBpZiAoYWRkUm91dGVDYWxsYmFjaykgeyBhZGRSb3V0ZUNhbGxiYWNrKHRoaXMsIHJvdXRlKTsgfVxuICAgICAgICBlbHNlIHsgdGhpcy5hZGQocm91dGUpOyB9XG4gICAgICB9LCB0aGlzKTtcbiAgICB9O1xuXG4gICAgdmFyICQkcm91dGUkcmVjb2duaXplciQkc3BlY2lhbHMgPSBbXG4gICAgICAnLycsICcuJywgJyonLCAnKycsICc/JywgJ3wnLFxuICAgICAgJygnLCAnKScsICdbJywgJ10nLCAneycsICd9JywgJ1xcXFwnXG4gICAgXTtcblxuICAgIHZhciAkJHJvdXRlJHJlY29nbml6ZXIkJGVzY2FwZVJlZ2V4ID0gbmV3IFJlZ0V4cCgnKFxcXFwnICsgJCRyb3V0ZSRyZWNvZ25pemVyJCRzcGVjaWFscy5qb2luKCd8XFxcXCcpICsgJyknLCAnZycpO1xuXG4gICAgZnVuY3Rpb24gJCRyb3V0ZSRyZWNvZ25pemVyJCRpc0FycmF5KHRlc3QpIHtcbiAgICAgIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodGVzdCkgPT09IFwiW29iamVjdCBBcnJheV1cIjtcbiAgICB9XG5cbiAgICAvLyBBIFNlZ21lbnQgcmVwcmVzZW50cyBhIHNlZ21lbnQgaW4gdGhlIG9yaWdpbmFsIHJvdXRlIGRlc2NyaXB0aW9uLlxuICAgIC8vIEVhY2ggU2VnbWVudCB0eXBlIHByb3ZpZGVzIGFuIGBlYWNoQ2hhcmAgYW5kIGByZWdleGAgbWV0aG9kLlxuICAgIC8vXG4gICAgLy8gVGhlIGBlYWNoQ2hhcmAgbWV0aG9kIGludm9rZXMgdGhlIGNhbGxiYWNrIHdpdGggb25lIG9yIG1vcmUgY2hhcmFjdGVyXG4gICAgLy8gc3BlY2lmaWNhdGlvbnMuIEEgY2hhcmFjdGVyIHNwZWNpZmljYXRpb24gY29uc3VtZXMgb25lIG9yIG1vcmUgaW5wdXRcbiAgICAvLyBjaGFyYWN0ZXJzLlxuICAgIC8vXG4gICAgLy8gVGhlIGByZWdleGAgbWV0aG9kIHJldHVybnMgYSByZWdleCBmcmFnbWVudCBmb3IgdGhlIHNlZ21lbnQuIElmIHRoZVxuICAgIC8vIHNlZ21lbnQgaXMgYSBkeW5hbWljIG9mIHN0YXIgc2VnbWVudCwgdGhlIHJlZ2V4IGZyYWdtZW50IGFsc28gaW5jbHVkZXNcbiAgICAvLyBhIGNhcHR1cmUuXG4gICAgLy9cbiAgICAvLyBBIGNoYXJhY3RlciBzcGVjaWZpY2F0aW9uIGNvbnRhaW5zOlxuICAgIC8vXG4gICAgLy8gKiBgdmFsaWRDaGFyc2A6IGEgU3RyaW5nIHdpdGggYSBsaXN0IG9mIGFsbCB2YWxpZCBjaGFyYWN0ZXJzLCBvclxuICAgIC8vICogYGludmFsaWRDaGFyc2A6IGEgU3RyaW5nIHdpdGggYSBsaXN0IG9mIGFsbCBpbnZhbGlkIGNoYXJhY3RlcnNcbiAgICAvLyAqIGByZXBlYXRgOiB0cnVlIGlmIHRoZSBjaGFyYWN0ZXIgc3BlY2lmaWNhdGlvbiBjYW4gcmVwZWF0XG5cbiAgICBmdW5jdGlvbiAkJHJvdXRlJHJlY29nbml6ZXIkJFN0YXRpY1NlZ21lbnQoc3RyaW5nKSB7IHRoaXMuc3RyaW5nID0gc3RyaW5nOyB9XG4gICAgJCRyb3V0ZSRyZWNvZ25pemVyJCRTdGF0aWNTZWdtZW50LnByb3RvdHlwZSA9IHtcbiAgICAgIGVhY2hDaGFyOiBmdW5jdGlvbihjYWxsYmFjaykge1xuICAgICAgICB2YXIgc3RyaW5nID0gdGhpcy5zdHJpbmcsIGNoO1xuXG4gICAgICAgIGZvciAodmFyIGk9MCwgbD1zdHJpbmcubGVuZ3RoOyBpPGw7IGkrKykge1xuICAgICAgICAgIGNoID0gc3RyaW5nLmNoYXJBdChpKTtcbiAgICAgICAgICBjYWxsYmFjayh7IHZhbGlkQ2hhcnM6IGNoIH0pO1xuICAgICAgICB9XG4gICAgICB9LFxuXG4gICAgICByZWdleDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnN0cmluZy5yZXBsYWNlKCQkcm91dGUkcmVjb2duaXplciQkZXNjYXBlUmVnZXgsICdcXFxcJDEnKTtcbiAgICAgIH0sXG5cbiAgICAgIGdlbmVyYXRlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RyaW5nO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBmdW5jdGlvbiAkJHJvdXRlJHJlY29nbml6ZXIkJER5bmFtaWNTZWdtZW50KG5hbWUpIHsgdGhpcy5uYW1lID0gbmFtZTsgfVxuICAgICQkcm91dGUkcmVjb2duaXplciQkRHluYW1pY1NlZ21lbnQucHJvdG90eXBlID0ge1xuICAgICAgZWFjaENoYXI6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gICAgICAgIGNhbGxiYWNrKHsgaW52YWxpZENoYXJzOiBcIi9cIiwgcmVwZWF0OiB0cnVlIH0pO1xuICAgICAgfSxcblxuICAgICAgcmVnZXg6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gXCIoW14vXSspXCI7XG4gICAgICB9LFxuXG4gICAgICBnZW5lcmF0ZTogZnVuY3Rpb24ocGFyYW1zKSB7XG4gICAgICAgIHJldHVybiBwYXJhbXNbdGhpcy5uYW1lXTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gJCRyb3V0ZSRyZWNvZ25pemVyJCRTdGFyU2VnbWVudChuYW1lKSB7IHRoaXMubmFtZSA9IG5hbWU7IH1cbiAgICAkJHJvdXRlJHJlY29nbml6ZXIkJFN0YXJTZWdtZW50LnByb3RvdHlwZSA9IHtcbiAgICAgIGVhY2hDaGFyOiBmdW5jdGlvbihjYWxsYmFjaykge1xuICAgICAgICBjYWxsYmFjayh7IGludmFsaWRDaGFyczogXCJcIiwgcmVwZWF0OiB0cnVlIH0pO1xuICAgICAgfSxcblxuICAgICAgcmVnZXg6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gXCIoLispXCI7XG4gICAgICB9LFxuXG4gICAgICBnZW5lcmF0ZTogZnVuY3Rpb24ocGFyYW1zKSB7XG4gICAgICAgIHJldHVybiBwYXJhbXNbdGhpcy5uYW1lXTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gJCRyb3V0ZSRyZWNvZ25pemVyJCRFcHNpbG9uU2VnbWVudCgpIHt9XG4gICAgJCRyb3V0ZSRyZWNvZ25pemVyJCRFcHNpbG9uU2VnbWVudC5wcm90b3R5cGUgPSB7XG4gICAgICBlYWNoQ2hhcjogZnVuY3Rpb24oKSB7fSxcbiAgICAgIHJlZ2V4OiBmdW5jdGlvbigpIHsgcmV0dXJuIFwiXCI7IH0sXG4gICAgICBnZW5lcmF0ZTogZnVuY3Rpb24oKSB7IHJldHVybiBcIlwiOyB9XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uICQkcm91dGUkcmVjb2duaXplciQkcGFyc2Uocm91dGUsIG5hbWVzLCB0eXBlcykge1xuICAgICAgLy8gbm9ybWFsaXplIHJvdXRlIGFzIG5vdCBzdGFydGluZyB3aXRoIGEgXCIvXCIuIFJlY29nbml0aW9uIHdpbGxcbiAgICAgIC8vIGFsc28gbm9ybWFsaXplLlxuICAgICAgaWYgKHJvdXRlLmNoYXJBdCgwKSA9PT0gXCIvXCIpIHsgcm91dGUgPSByb3V0ZS5zdWJzdHIoMSk7IH1cblxuICAgICAgdmFyIHNlZ21lbnRzID0gcm91dGUuc3BsaXQoXCIvXCIpLCByZXN1bHRzID0gW107XG5cbiAgICAgIGZvciAodmFyIGk9MCwgbD1zZWdtZW50cy5sZW5ndGg7IGk8bDsgaSsrKSB7XG4gICAgICAgIHZhciBzZWdtZW50ID0gc2VnbWVudHNbaV0sIG1hdGNoO1xuXG4gICAgICAgIGlmIChtYXRjaCA9IHNlZ21lbnQubWF0Y2goL146KFteXFwvXSspJC8pKSB7XG4gICAgICAgICAgcmVzdWx0cy5wdXNoKG5ldyAkJHJvdXRlJHJlY29nbml6ZXIkJER5bmFtaWNTZWdtZW50KG1hdGNoWzFdKSk7XG4gICAgICAgICAgbmFtZXMucHVzaChtYXRjaFsxXSk7XG4gICAgICAgICAgdHlwZXMuZHluYW1pY3MrKztcbiAgICAgICAgfSBlbHNlIGlmIChtYXRjaCA9IHNlZ21lbnQubWF0Y2goL15cXCooW15cXC9dKykkLykpIHtcbiAgICAgICAgICByZXN1bHRzLnB1c2gobmV3ICQkcm91dGUkcmVjb2duaXplciQkU3RhclNlZ21lbnQobWF0Y2hbMV0pKTtcbiAgICAgICAgICBuYW1lcy5wdXNoKG1hdGNoWzFdKTtcbiAgICAgICAgICB0eXBlcy5zdGFycysrO1xuICAgICAgICB9IGVsc2UgaWYoc2VnbWVudCA9PT0gXCJcIikge1xuICAgICAgICAgIHJlc3VsdHMucHVzaChuZXcgJCRyb3V0ZSRyZWNvZ25pemVyJCRFcHNpbG9uU2VnbWVudCgpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXN1bHRzLnB1c2gobmV3ICQkcm91dGUkcmVjb2duaXplciQkU3RhdGljU2VnbWVudChzZWdtZW50KSk7XG4gICAgICAgICAgdHlwZXMuc3RhdGljcysrO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiByZXN1bHRzO1xuICAgIH1cblxuICAgIC8vIEEgU3RhdGUgaGFzIGEgY2hhcmFjdGVyIHNwZWNpZmljYXRpb24gYW5kIChgY2hhclNwZWNgKSBhbmQgYSBsaXN0IG9mIHBvc3NpYmxlXG4gICAgLy8gc3Vic2VxdWVudCBzdGF0ZXMgKGBuZXh0U3RhdGVzYCkuXG4gICAgLy9cbiAgICAvLyBJZiBhIFN0YXRlIGlzIGFuIGFjY2VwdGluZyBzdGF0ZSwgaXQgd2lsbCBhbHNvIGhhdmUgc2V2ZXJhbCBhZGRpdGlvbmFsXG4gICAgLy8gcHJvcGVydGllczpcbiAgICAvL1xuICAgIC8vICogYHJlZ2V4YDogQSByZWd1bGFyIGV4cHJlc3Npb24gdGhhdCBpcyB1c2VkIHRvIGV4dHJhY3QgcGFyYW1ldGVycyBmcm9tIHBhdGhzXG4gICAgLy8gICB0aGF0IHJlYWNoZWQgdGhpcyBhY2NlcHRpbmcgc3RhdGUuXG4gICAgLy8gKiBgaGFuZGxlcnNgOiBJbmZvcm1hdGlvbiBvbiBob3cgdG8gY29udmVydCB0aGUgbGlzdCBvZiBjYXB0dXJlcyBpbnRvIGNhbGxzXG4gICAgLy8gICB0byByZWdpc3RlcmVkIGhhbmRsZXJzIHdpdGggdGhlIHNwZWNpZmllZCBwYXJhbWV0ZXJzXG4gICAgLy8gKiBgdHlwZXNgOiBIb3cgbWFueSBzdGF0aWMsIGR5bmFtaWMgb3Igc3RhciBzZWdtZW50cyBpbiB0aGlzIHJvdXRlLiBVc2VkIHRvXG4gICAgLy8gICBkZWNpZGUgd2hpY2ggcm91dGUgdG8gdXNlIGlmIG11bHRpcGxlIHJlZ2lzdGVyZWQgcm91dGVzIG1hdGNoIGEgcGF0aC5cbiAgICAvL1xuICAgIC8vIEN1cnJlbnRseSwgU3RhdGUgaXMgaW1wbGVtZW50ZWQgbmFpdmVseSBieSBsb29waW5nIG92ZXIgYG5leHRTdGF0ZXNgIGFuZFxuICAgIC8vIGNvbXBhcmluZyBhIGNoYXJhY3RlciBzcGVjaWZpY2F0aW9uIGFnYWluc3QgYSBjaGFyYWN0ZXIuIEEgbW9yZSBlZmZpY2llbnRcbiAgICAvLyBpbXBsZW1lbnRhdGlvbiB3b3VsZCB1c2UgYSBoYXNoIG9mIGtleXMgcG9pbnRpbmcgYXQgb25lIG9yIG1vcmUgbmV4dCBzdGF0ZXMuXG5cbiAgICBmdW5jdGlvbiAkJHJvdXRlJHJlY29nbml6ZXIkJFN0YXRlKGNoYXJTcGVjKSB7XG4gICAgICB0aGlzLmNoYXJTcGVjID0gY2hhclNwZWM7XG4gICAgICB0aGlzLm5leHRTdGF0ZXMgPSBbXTtcbiAgICB9XG5cbiAgICAkJHJvdXRlJHJlY29nbml6ZXIkJFN0YXRlLnByb3RvdHlwZSA9IHtcbiAgICAgIGdldDogZnVuY3Rpb24oY2hhclNwZWMpIHtcbiAgICAgICAgdmFyIG5leHRTdGF0ZXMgPSB0aGlzLm5leHRTdGF0ZXM7XG5cbiAgICAgICAgZm9yICh2YXIgaT0wLCBsPW5leHRTdGF0ZXMubGVuZ3RoOyBpPGw7IGkrKykge1xuICAgICAgICAgIHZhciBjaGlsZCA9IG5leHRTdGF0ZXNbaV07XG5cbiAgICAgICAgICB2YXIgaXNFcXVhbCA9IGNoaWxkLmNoYXJTcGVjLnZhbGlkQ2hhcnMgPT09IGNoYXJTcGVjLnZhbGlkQ2hhcnM7XG4gICAgICAgICAgaXNFcXVhbCA9IGlzRXF1YWwgJiYgY2hpbGQuY2hhclNwZWMuaW52YWxpZENoYXJzID09PSBjaGFyU3BlYy5pbnZhbGlkQ2hhcnM7XG5cbiAgICAgICAgICBpZiAoaXNFcXVhbCkgeyByZXR1cm4gY2hpbGQ7IH1cbiAgICAgICAgfVxuICAgICAgfSxcblxuICAgICAgcHV0OiBmdW5jdGlvbihjaGFyU3BlYykge1xuICAgICAgICB2YXIgc3RhdGU7XG5cbiAgICAgICAgLy8gSWYgdGhlIGNoYXJhY3RlciBzcGVjaWZpY2F0aW9uIGFscmVhZHkgZXhpc3RzIGluIGEgY2hpbGQgb2YgdGhlIGN1cnJlbnRcbiAgICAgICAgLy8gc3RhdGUsIGp1c3QgcmV0dXJuIHRoYXQgc3RhdGUuXG4gICAgICAgIGlmIChzdGF0ZSA9IHRoaXMuZ2V0KGNoYXJTcGVjKSkgeyByZXR1cm4gc3RhdGU7IH1cblxuICAgICAgICAvLyBNYWtlIGEgbmV3IHN0YXRlIGZvciB0aGUgY2hhcmFjdGVyIHNwZWNcbiAgICAgICAgc3RhdGUgPSBuZXcgJCRyb3V0ZSRyZWNvZ25pemVyJCRTdGF0ZShjaGFyU3BlYyk7XG5cbiAgICAgICAgLy8gSW5zZXJ0IHRoZSBuZXcgc3RhdGUgYXMgYSBjaGlsZCBvZiB0aGUgY3VycmVudCBzdGF0ZVxuICAgICAgICB0aGlzLm5leHRTdGF0ZXMucHVzaChzdGF0ZSk7XG5cbiAgICAgICAgLy8gSWYgdGhpcyBjaGFyYWN0ZXIgc3BlY2lmaWNhdGlvbiByZXBlYXRzLCBpbnNlcnQgdGhlIG5ldyBzdGF0ZSBhcyBhIGNoaWxkXG4gICAgICAgIC8vIG9mIGl0c2VsZi4gTm90ZSB0aGF0IHRoaXMgd2lsbCBub3QgdHJpZ2dlciBhbiBpbmZpbml0ZSBsb29wIGJlY2F1c2UgZWFjaFxuICAgICAgICAvLyB0cmFuc2l0aW9uIGR1cmluZyByZWNvZ25pdGlvbiBjb25zdW1lcyBhIGNoYXJhY3Rlci5cbiAgICAgICAgaWYgKGNoYXJTcGVjLnJlcGVhdCkge1xuICAgICAgICAgIHN0YXRlLm5leHRTdGF0ZXMucHVzaChzdGF0ZSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBSZXR1cm4gdGhlIG5ldyBzdGF0ZVxuICAgICAgICByZXR1cm4gc3RhdGU7XG4gICAgICB9LFxuXG4gICAgICAvLyBGaW5kIGEgbGlzdCBvZiBjaGlsZCBzdGF0ZXMgbWF0Y2hpbmcgdGhlIG5leHQgY2hhcmFjdGVyXG4gICAgICBtYXRjaDogZnVuY3Rpb24oY2gpIHtcbiAgICAgICAgLy8gREVCVUcgXCJQcm9jZXNzaW5nIGBcIiArIGNoICsgXCJgOlwiXG4gICAgICAgIHZhciBuZXh0U3RhdGVzID0gdGhpcy5uZXh0U3RhdGVzLFxuICAgICAgICAgICAgY2hpbGQsIGNoYXJTcGVjLCBjaGFycztcblxuICAgICAgICAvLyBERUJVRyBcIiAgXCIgKyBkZWJ1Z1N0YXRlKHRoaXMpXG4gICAgICAgIHZhciByZXR1cm5lZCA9IFtdO1xuXG4gICAgICAgIGZvciAodmFyIGk9MCwgbD1uZXh0U3RhdGVzLmxlbmd0aDsgaTxsOyBpKyspIHtcbiAgICAgICAgICBjaGlsZCA9IG5leHRTdGF0ZXNbaV07XG5cbiAgICAgICAgICBjaGFyU3BlYyA9IGNoaWxkLmNoYXJTcGVjO1xuXG4gICAgICAgICAgaWYgKHR5cGVvZiAoY2hhcnMgPSBjaGFyU3BlYy52YWxpZENoYXJzKSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIGlmIChjaGFycy5pbmRleE9mKGNoKSAhPT0gLTEpIHsgcmV0dXJuZWQucHVzaChjaGlsZCk7IH1cbiAgICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiAoY2hhcnMgPSBjaGFyU3BlYy5pbnZhbGlkQ2hhcnMpICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgaWYgKGNoYXJzLmluZGV4T2YoY2gpID09PSAtMSkgeyByZXR1cm5lZC5wdXNoKGNoaWxkKTsgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiByZXR1cm5lZDtcbiAgICAgIH1cblxuICAgICAgLyoqIElGIERFQlVHXG4gICAgICAsIGRlYnVnOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGNoYXJTcGVjID0gdGhpcy5jaGFyU3BlYyxcbiAgICAgICAgICAgIGRlYnVnID0gXCJbXCIsXG4gICAgICAgICAgICBjaGFycyA9IGNoYXJTcGVjLnZhbGlkQ2hhcnMgfHwgY2hhclNwZWMuaW52YWxpZENoYXJzO1xuXG4gICAgICAgIGlmIChjaGFyU3BlYy5pbnZhbGlkQ2hhcnMpIHsgZGVidWcgKz0gXCJeXCI7IH1cbiAgICAgICAgZGVidWcgKz0gY2hhcnM7XG4gICAgICAgIGRlYnVnICs9IFwiXVwiO1xuXG4gICAgICAgIGlmIChjaGFyU3BlYy5yZXBlYXQpIHsgZGVidWcgKz0gXCIrXCI7IH1cblxuICAgICAgICByZXR1cm4gZGVidWc7XG4gICAgICB9XG4gICAgICBFTkQgSUYgKiovXG4gICAgfTtcblxuICAgIC8qKiBJRiBERUJVR1xuICAgIGZ1bmN0aW9uIGRlYnVnKGxvZykge1xuICAgICAgY29uc29sZS5sb2cobG9nKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBkZWJ1Z1N0YXRlKHN0YXRlKSB7XG4gICAgICByZXR1cm4gc3RhdGUubmV4dFN0YXRlcy5tYXAoZnVuY3Rpb24obikge1xuICAgICAgICBpZiAobi5uZXh0U3RhdGVzLmxlbmd0aCA9PT0gMCkgeyByZXR1cm4gXCIoIFwiICsgbi5kZWJ1ZygpICsgXCIgW2FjY2VwdGluZ10gKVwiOyB9XG4gICAgICAgIHJldHVybiBcIiggXCIgKyBuLmRlYnVnKCkgKyBcIiA8dGhlbj4gXCIgKyBuLm5leHRTdGF0ZXMubWFwKGZ1bmN0aW9uKHMpIHsgcmV0dXJuIHMuZGVidWcoKSB9KS5qb2luKFwiIG9yIFwiKSArIFwiIClcIjtcbiAgICAgIH0pLmpvaW4oXCIsIFwiKVxuICAgIH1cbiAgICBFTkQgSUYgKiovXG5cbiAgICAvLyBUaGlzIGlzIGEgc29tZXdoYXQgbmFpdmUgc3RyYXRlZ3ksIGJ1dCBzaG91bGQgd29yayBpbiBhIGxvdCBvZiBjYXNlc1xuICAgIC8vIEEgYmV0dGVyIHN0cmF0ZWd5IHdvdWxkIHByb3Blcmx5IHJlc29sdmUgL3Bvc3RzLzppZC9uZXcgYW5kIC9wb3N0cy9lZGl0LzppZC5cbiAgICAvL1xuICAgIC8vIFRoaXMgc3RyYXRlZ3kgZ2VuZXJhbGx5IHByZWZlcnMgbW9yZSBzdGF0aWMgYW5kIGxlc3MgZHluYW1pYyBtYXRjaGluZy5cbiAgICAvLyBTcGVjaWZpY2FsbHksIGl0XG4gICAgLy9cbiAgICAvLyAgKiBwcmVmZXJzIGZld2VyIHN0YXJzIHRvIG1vcmUsIHRoZW5cbiAgICAvLyAgKiBwcmVmZXJzIHVzaW5nIHN0YXJzIGZvciBsZXNzIG9mIHRoZSBtYXRjaCB0byBtb3JlLCB0aGVuXG4gICAgLy8gICogcHJlZmVycyBmZXdlciBkeW5hbWljIHNlZ21lbnRzIHRvIG1vcmUsIHRoZW5cbiAgICAvLyAgKiBwcmVmZXJzIG1vcmUgc3RhdGljIHNlZ21lbnRzIHRvIG1vcmVcbiAgICBmdW5jdGlvbiAkJHJvdXRlJHJlY29nbml6ZXIkJHNvcnRTb2x1dGlvbnMoc3RhdGVzKSB7XG4gICAgICByZXR1cm4gc3RhdGVzLnNvcnQoZnVuY3Rpb24oYSwgYikge1xuICAgICAgICBpZiAoYS50eXBlcy5zdGFycyAhPT0gYi50eXBlcy5zdGFycykgeyByZXR1cm4gYS50eXBlcy5zdGFycyAtIGIudHlwZXMuc3RhcnM7IH1cblxuICAgICAgICBpZiAoYS50eXBlcy5zdGFycykge1xuICAgICAgICAgIGlmIChhLnR5cGVzLnN0YXRpY3MgIT09IGIudHlwZXMuc3RhdGljcykgeyByZXR1cm4gYi50eXBlcy5zdGF0aWNzIC0gYS50eXBlcy5zdGF0aWNzOyB9XG4gICAgICAgICAgaWYgKGEudHlwZXMuZHluYW1pY3MgIT09IGIudHlwZXMuZHluYW1pY3MpIHsgcmV0dXJuIGIudHlwZXMuZHluYW1pY3MgLSBhLnR5cGVzLmR5bmFtaWNzOyB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoYS50eXBlcy5keW5hbWljcyAhPT0gYi50eXBlcy5keW5hbWljcykgeyByZXR1cm4gYS50eXBlcy5keW5hbWljcyAtIGIudHlwZXMuZHluYW1pY3M7IH1cbiAgICAgICAgaWYgKGEudHlwZXMuc3RhdGljcyAhPT0gYi50eXBlcy5zdGF0aWNzKSB7IHJldHVybiBiLnR5cGVzLnN0YXRpY3MgLSBhLnR5cGVzLnN0YXRpY3M7IH1cblxuICAgICAgICByZXR1cm4gMDtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uICQkcm91dGUkcmVjb2duaXplciQkcmVjb2duaXplQ2hhcihzdGF0ZXMsIGNoKSB7XG4gICAgICB2YXIgbmV4dFN0YXRlcyA9IFtdO1xuXG4gICAgICBmb3IgKHZhciBpPTAsIGw9c3RhdGVzLmxlbmd0aDsgaTxsOyBpKyspIHtcbiAgICAgICAgdmFyIHN0YXRlID0gc3RhdGVzW2ldO1xuXG4gICAgICAgIG5leHRTdGF0ZXMgPSBuZXh0U3RhdGVzLmNvbmNhdChzdGF0ZS5tYXRjaChjaCkpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gbmV4dFN0YXRlcztcbiAgICB9XG5cbiAgICB2YXIgJCRyb3V0ZSRyZWNvZ25pemVyJCRvQ3JlYXRlID0gT2JqZWN0LmNyZWF0ZSB8fCBmdW5jdGlvbihwcm90bykge1xuICAgICAgZnVuY3Rpb24gRigpIHt9XG4gICAgICBGLnByb3RvdHlwZSA9IHByb3RvO1xuICAgICAgcmV0dXJuIG5ldyBGKCk7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uICQkcm91dGUkcmVjb2duaXplciQkUmVjb2duaXplUmVzdWx0cyhxdWVyeVBhcmFtcykge1xuICAgICAgdGhpcy5xdWVyeVBhcmFtcyA9IHF1ZXJ5UGFyYW1zIHx8IHt9O1xuICAgIH1cbiAgICAkJHJvdXRlJHJlY29nbml6ZXIkJFJlY29nbml6ZVJlc3VsdHMucHJvdG90eXBlID0gJCRyb3V0ZSRyZWNvZ25pemVyJCRvQ3JlYXRlKHtcbiAgICAgIHNwbGljZTogQXJyYXkucHJvdG90eXBlLnNwbGljZSxcbiAgICAgIHNsaWNlOiAgQXJyYXkucHJvdG90eXBlLnNsaWNlLFxuICAgICAgcHVzaDogICBBcnJheS5wcm90b3R5cGUucHVzaCxcbiAgICAgIGxlbmd0aDogMCxcbiAgICAgIHF1ZXJ5UGFyYW1zOiBudWxsXG4gICAgfSk7XG5cbiAgICBmdW5jdGlvbiAkJHJvdXRlJHJlY29nbml6ZXIkJGZpbmRIYW5kbGVyKHN0YXRlLCBwYXRoLCBxdWVyeVBhcmFtcykge1xuICAgICAgdmFyIGhhbmRsZXJzID0gc3RhdGUuaGFuZGxlcnMsIHJlZ2V4ID0gc3RhdGUucmVnZXg7XG4gICAgICB2YXIgY2FwdHVyZXMgPSBwYXRoLm1hdGNoKHJlZ2V4KSwgY3VycmVudENhcHR1cmUgPSAxO1xuICAgICAgdmFyIHJlc3VsdCA9IG5ldyAkJHJvdXRlJHJlY29nbml6ZXIkJFJlY29nbml6ZVJlc3VsdHMocXVlcnlQYXJhbXMpO1xuXG4gICAgICBmb3IgKHZhciBpPTAsIGw9aGFuZGxlcnMubGVuZ3RoOyBpPGw7IGkrKykge1xuICAgICAgICB2YXIgaGFuZGxlciA9IGhhbmRsZXJzW2ldLCBuYW1lcyA9IGhhbmRsZXIubmFtZXMsIHBhcmFtcyA9IHt9O1xuXG4gICAgICAgIGZvciAodmFyIGo9MCwgbT1uYW1lcy5sZW5ndGg7IGo8bTsgaisrKSB7XG4gICAgICAgICAgcGFyYW1zW25hbWVzW2pdXSA9IGNhcHR1cmVzW2N1cnJlbnRDYXB0dXJlKytdO1xuICAgICAgICB9XG5cbiAgICAgICAgcmVzdWx0LnB1c2goeyBoYW5kbGVyOiBoYW5kbGVyLmhhbmRsZXIsIHBhcmFtczogcGFyYW1zLCBpc0R5bmFtaWM6ICEhbmFtZXMubGVuZ3RoIH0pO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uICQkcm91dGUkcmVjb2duaXplciQkYWRkU2VnbWVudChjdXJyZW50U3RhdGUsIHNlZ21lbnQpIHtcbiAgICAgIHNlZ21lbnQuZWFjaENoYXIoZnVuY3Rpb24oY2gpIHtcbiAgICAgICAgdmFyIHN0YXRlO1xuXG4gICAgICAgIGN1cnJlbnRTdGF0ZSA9IGN1cnJlbnRTdGF0ZS5wdXQoY2gpO1xuICAgICAgfSk7XG5cbiAgICAgIHJldHVybiBjdXJyZW50U3RhdGU7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gJCRyb3V0ZSRyZWNvZ25pemVyJCRkZWNvZGVRdWVyeVBhcmFtUGFydChwYXJ0KSB7XG4gICAgICAvLyBodHRwOi8vd3d3LnczLm9yZy9UUi9odG1sNDAxL2ludGVyYWN0L2Zvcm1zLmh0bWwjaC0xNy4xMy40LjFcbiAgICAgIHBhcnQgPSBwYXJ0LnJlcGxhY2UoL1xcKy9nbSwgJyUyMCcpO1xuICAgICAgcmV0dXJuIGRlY29kZVVSSUNvbXBvbmVudChwYXJ0KTtcbiAgICB9XG5cbiAgICAvLyBUaGUgbWFpbiBpbnRlcmZhY2VcblxuICAgIHZhciAkJHJvdXRlJHJlY29nbml6ZXIkJFJvdXRlUmVjb2duaXplciA9IGZ1bmN0aW9uKCkge1xuICAgICAgdGhpcy5yb290U3RhdGUgPSBuZXcgJCRyb3V0ZSRyZWNvZ25pemVyJCRTdGF0ZSgpO1xuICAgICAgdGhpcy5uYW1lcyA9IHt9O1xuICAgIH07XG5cblxuICAgICQkcm91dGUkcmVjb2duaXplciQkUm91dGVSZWNvZ25pemVyLnByb3RvdHlwZSA9IHtcbiAgICAgIGFkZDogZnVuY3Rpb24ocm91dGVzLCBvcHRpb25zKSB7XG4gICAgICAgIHZhciBjdXJyZW50U3RhdGUgPSB0aGlzLnJvb3RTdGF0ZSwgcmVnZXggPSBcIl5cIixcbiAgICAgICAgICAgIHR5cGVzID0geyBzdGF0aWNzOiAwLCBkeW5hbWljczogMCwgc3RhcnM6IDAgfSxcbiAgICAgICAgICAgIGhhbmRsZXJzID0gW10sIGFsbFNlZ21lbnRzID0gW10sIG5hbWU7XG5cbiAgICAgICAgdmFyIGlzRW1wdHkgPSB0cnVlO1xuXG4gICAgICAgIGZvciAodmFyIGk9MCwgbD1yb3V0ZXMubGVuZ3RoOyBpPGw7IGkrKykge1xuICAgICAgICAgIHZhciByb3V0ZSA9IHJvdXRlc1tpXSwgbmFtZXMgPSBbXTtcblxuICAgICAgICAgIHZhciBzZWdtZW50cyA9ICQkcm91dGUkcmVjb2duaXplciQkcGFyc2Uocm91dGUucGF0aCwgbmFtZXMsIHR5cGVzKTtcblxuICAgICAgICAgIGFsbFNlZ21lbnRzID0gYWxsU2VnbWVudHMuY29uY2F0KHNlZ21lbnRzKTtcblxuICAgICAgICAgIGZvciAodmFyIGo9MCwgbT1zZWdtZW50cy5sZW5ndGg7IGo8bTsgaisrKSB7XG4gICAgICAgICAgICB2YXIgc2VnbWVudCA9IHNlZ21lbnRzW2pdO1xuXG4gICAgICAgICAgICBpZiAoc2VnbWVudCBpbnN0YW5jZW9mICQkcm91dGUkcmVjb2duaXplciQkRXBzaWxvblNlZ21lbnQpIHsgY29udGludWU7IH1cblxuICAgICAgICAgICAgaXNFbXB0eSA9IGZhbHNlO1xuXG4gICAgICAgICAgICAvLyBBZGQgYSBcIi9cIiBmb3IgdGhlIG5ldyBzZWdtZW50XG4gICAgICAgICAgICBjdXJyZW50U3RhdGUgPSBjdXJyZW50U3RhdGUucHV0KHsgdmFsaWRDaGFyczogXCIvXCIgfSk7XG4gICAgICAgICAgICByZWdleCArPSBcIi9cIjtcblxuICAgICAgICAgICAgLy8gQWRkIGEgcmVwcmVzZW50YXRpb24gb2YgdGhlIHNlZ21lbnQgdG8gdGhlIE5GQSBhbmQgcmVnZXhcbiAgICAgICAgICAgIGN1cnJlbnRTdGF0ZSA9ICQkcm91dGUkcmVjb2duaXplciQkYWRkU2VnbWVudChjdXJyZW50U3RhdGUsIHNlZ21lbnQpO1xuICAgICAgICAgICAgcmVnZXggKz0gc2VnbWVudC5yZWdleCgpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHZhciBoYW5kbGVyID0geyBoYW5kbGVyOiByb3V0ZS5oYW5kbGVyLCBuYW1lczogbmFtZXMgfTtcbiAgICAgICAgICBoYW5kbGVycy5wdXNoKGhhbmRsZXIpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGlzRW1wdHkpIHtcbiAgICAgICAgICBjdXJyZW50U3RhdGUgPSBjdXJyZW50U3RhdGUucHV0KHsgdmFsaWRDaGFyczogXCIvXCIgfSk7XG4gICAgICAgICAgcmVnZXggKz0gXCIvXCI7XG4gICAgICAgIH1cblxuICAgICAgICBjdXJyZW50U3RhdGUuaGFuZGxlcnMgPSBoYW5kbGVycztcbiAgICAgICAgY3VycmVudFN0YXRlLnJlZ2V4ID0gbmV3IFJlZ0V4cChyZWdleCArIFwiJFwiKTtcbiAgICAgICAgY3VycmVudFN0YXRlLnR5cGVzID0gdHlwZXM7XG5cbiAgICAgICAgaWYgKG5hbWUgPSBvcHRpb25zICYmIG9wdGlvbnMuYXMpIHtcbiAgICAgICAgICB0aGlzLm5hbWVzW25hbWVdID0ge1xuICAgICAgICAgICAgc2VnbWVudHM6IGFsbFNlZ21lbnRzLFxuICAgICAgICAgICAgaGFuZGxlcnM6IGhhbmRsZXJzXG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgfSxcblxuICAgICAgaGFuZGxlcnNGb3I6IGZ1bmN0aW9uKG5hbWUpIHtcbiAgICAgICAgdmFyIHJvdXRlID0gdGhpcy5uYW1lc1tuYW1lXSwgcmVzdWx0ID0gW107XG4gICAgICAgIGlmICghcm91dGUpIHsgdGhyb3cgbmV3IEVycm9yKFwiVGhlcmUgaXMgbm8gcm91dGUgbmFtZWQgXCIgKyBuYW1lKTsgfVxuXG4gICAgICAgIGZvciAodmFyIGk9MCwgbD1yb3V0ZS5oYW5kbGVycy5sZW5ndGg7IGk8bDsgaSsrKSB7XG4gICAgICAgICAgcmVzdWx0LnB1c2gocm91dGUuaGFuZGxlcnNbaV0pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgIH0sXG5cbiAgICAgIGhhc1JvdXRlOiBmdW5jdGlvbihuYW1lKSB7XG4gICAgICAgIHJldHVybiAhIXRoaXMubmFtZXNbbmFtZV07XG4gICAgICB9LFxuXG4gICAgICBnZW5lcmF0ZTogZnVuY3Rpb24obmFtZSwgcGFyYW1zKSB7XG4gICAgICAgIHZhciByb3V0ZSA9IHRoaXMubmFtZXNbbmFtZV0sIG91dHB1dCA9IFwiXCI7XG4gICAgICAgIGlmICghcm91dGUpIHsgdGhyb3cgbmV3IEVycm9yKFwiVGhlcmUgaXMgbm8gcm91dGUgbmFtZWQgXCIgKyBuYW1lKTsgfVxuXG4gICAgICAgIHZhciBzZWdtZW50cyA9IHJvdXRlLnNlZ21lbnRzO1xuXG4gICAgICAgIGZvciAodmFyIGk9MCwgbD1zZWdtZW50cy5sZW5ndGg7IGk8bDsgaSsrKSB7XG4gICAgICAgICAgdmFyIHNlZ21lbnQgPSBzZWdtZW50c1tpXTtcblxuICAgICAgICAgIGlmIChzZWdtZW50IGluc3RhbmNlb2YgJCRyb3V0ZSRyZWNvZ25pemVyJCRFcHNpbG9uU2VnbWVudCkgeyBjb250aW51ZTsgfVxuXG4gICAgICAgICAgb3V0cHV0ICs9IFwiL1wiO1xuICAgICAgICAgIG91dHB1dCArPSBzZWdtZW50LmdlbmVyYXRlKHBhcmFtcyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAob3V0cHV0LmNoYXJBdCgwKSAhPT0gJy8nKSB7IG91dHB1dCA9ICcvJyArIG91dHB1dDsgfVxuXG4gICAgICAgIGlmIChwYXJhbXMgJiYgcGFyYW1zLnF1ZXJ5UGFyYW1zKSB7XG4gICAgICAgICAgb3V0cHV0ICs9IHRoaXMuZ2VuZXJhdGVRdWVyeVN0cmluZyhwYXJhbXMucXVlcnlQYXJhbXMsIHJvdXRlLmhhbmRsZXJzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBvdXRwdXQ7XG4gICAgICB9LFxuXG4gICAgICBnZW5lcmF0ZVF1ZXJ5U3RyaW5nOiBmdW5jdGlvbihwYXJhbXMsIGhhbmRsZXJzKSB7XG4gICAgICAgIHZhciBwYWlycyA9IFtdO1xuICAgICAgICB2YXIga2V5cyA9IFtdO1xuICAgICAgICBmb3IodmFyIGtleSBpbiBwYXJhbXMpIHtcbiAgICAgICAgICBpZiAocGFyYW1zLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICAgIGtleXMucHVzaChrZXkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBrZXlzLnNvcnQoKTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IGtleXMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICBrZXkgPSBrZXlzW2ldO1xuICAgICAgICAgIHZhciB2YWx1ZSA9IHBhcmFtc1trZXldO1xuICAgICAgICAgIGlmICh2YWx1ZSA9PSBudWxsKSB7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdmFyIHBhaXIgPSBlbmNvZGVVUklDb21wb25lbnQoa2V5KTtcbiAgICAgICAgICBpZiAoJCRyb3V0ZSRyZWNvZ25pemVyJCRpc0FycmF5KHZhbHVlKSkge1xuICAgICAgICAgICAgZm9yICh2YXIgaiA9IDAsIGwgPSB2YWx1ZS5sZW5ndGg7IGogPCBsOyBqKyspIHtcbiAgICAgICAgICAgICAgdmFyIGFycmF5UGFpciA9IGtleSArICdbXScgKyAnPScgKyBlbmNvZGVVUklDb21wb25lbnQodmFsdWVbal0pO1xuICAgICAgICAgICAgICBwYWlycy5wdXNoKGFycmF5UGFpcik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHBhaXIgKz0gXCI9XCIgKyBlbmNvZGVVUklDb21wb25lbnQodmFsdWUpO1xuICAgICAgICAgICAgcGFpcnMucHVzaChwYWlyKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocGFpcnMubGVuZ3RoID09PSAwKSB7IHJldHVybiAnJzsgfVxuXG4gICAgICAgIHJldHVybiBcIj9cIiArIHBhaXJzLmpvaW4oXCImXCIpO1xuICAgICAgfSxcblxuICAgICAgcGFyc2VRdWVyeVN0cmluZzogZnVuY3Rpb24ocXVlcnlTdHJpbmcpIHtcbiAgICAgICAgdmFyIHBhaXJzID0gcXVlcnlTdHJpbmcuc3BsaXQoXCImXCIpLCBxdWVyeVBhcmFtcyA9IHt9O1xuICAgICAgICBmb3IodmFyIGk9MDsgaSA8IHBhaXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgdmFyIHBhaXIgICAgICA9IHBhaXJzW2ldLnNwbGl0KCc9JyksXG4gICAgICAgICAgICAgIGtleSAgICAgICA9ICQkcm91dGUkcmVjb2duaXplciQkZGVjb2RlUXVlcnlQYXJhbVBhcnQocGFpclswXSksXG4gICAgICAgICAgICAgIGtleUxlbmd0aCA9IGtleS5sZW5ndGgsXG4gICAgICAgICAgICAgIGlzQXJyYXkgPSBmYWxzZSxcbiAgICAgICAgICAgICAgdmFsdWU7XG4gICAgICAgICAgaWYgKHBhaXIubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgICB2YWx1ZSA9ICd0cnVlJztcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy9IYW5kbGUgYXJyYXlzXG4gICAgICAgICAgICBpZiAoa2V5TGVuZ3RoID4gMiAmJiBrZXkuc2xpY2Uoa2V5TGVuZ3RoIC0yKSA9PT0gJ1tdJykge1xuICAgICAgICAgICAgICBpc0FycmF5ID0gdHJ1ZTtcbiAgICAgICAgICAgICAga2V5ID0ga2V5LnNsaWNlKDAsIGtleUxlbmd0aCAtIDIpO1xuICAgICAgICAgICAgICBpZighcXVlcnlQYXJhbXNba2V5XSkge1xuICAgICAgICAgICAgICAgIHF1ZXJ5UGFyYW1zW2tleV0gPSBbXTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFsdWUgPSBwYWlyWzFdID8gJCRyb3V0ZSRyZWNvZ25pemVyJCRkZWNvZGVRdWVyeVBhcmFtUGFydChwYWlyWzFdKSA6ICcnO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoaXNBcnJheSkge1xuICAgICAgICAgICAgcXVlcnlQYXJhbXNba2V5XS5wdXNoKHZhbHVlKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcXVlcnlQYXJhbXNba2V5XSA9IHZhbHVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcXVlcnlQYXJhbXM7XG4gICAgICB9LFxuXG4gICAgICByZWNvZ25pemU6IGZ1bmN0aW9uKHBhdGgpIHtcbiAgICAgICAgdmFyIHN0YXRlcyA9IFsgdGhpcy5yb290U3RhdGUgXSxcbiAgICAgICAgICAgIHBhdGhMZW4sIGksIGwsIHF1ZXJ5U3RhcnQsIHF1ZXJ5UGFyYW1zID0ge30sXG4gICAgICAgICAgICBpc1NsYXNoRHJvcHBlZCA9IGZhbHNlO1xuXG4gICAgICAgIHF1ZXJ5U3RhcnQgPSBwYXRoLmluZGV4T2YoJz8nKTtcbiAgICAgICAgaWYgKHF1ZXJ5U3RhcnQgIT09IC0xKSB7XG4gICAgICAgICAgdmFyIHF1ZXJ5U3RyaW5nID0gcGF0aC5zdWJzdHIocXVlcnlTdGFydCArIDEsIHBhdGgubGVuZ3RoKTtcbiAgICAgICAgICBwYXRoID0gcGF0aC5zdWJzdHIoMCwgcXVlcnlTdGFydCk7XG4gICAgICAgICAgcXVlcnlQYXJhbXMgPSB0aGlzLnBhcnNlUXVlcnlTdHJpbmcocXVlcnlTdHJpbmcpO1xuICAgICAgICB9XG5cbiAgICAgICAgcGF0aCA9IGRlY29kZVVSSShwYXRoKTtcblxuICAgICAgICAvLyBERUJVRyBHUk9VUCBwYXRoXG5cbiAgICAgICAgaWYgKHBhdGguY2hhckF0KDApICE9PSBcIi9cIikgeyBwYXRoID0gXCIvXCIgKyBwYXRoOyB9XG5cbiAgICAgICAgcGF0aExlbiA9IHBhdGgubGVuZ3RoO1xuICAgICAgICBpZiAocGF0aExlbiA+IDEgJiYgcGF0aC5jaGFyQXQocGF0aExlbiAtIDEpID09PSBcIi9cIikge1xuICAgICAgICAgIHBhdGggPSBwYXRoLnN1YnN0cigwLCBwYXRoTGVuIC0gMSk7XG4gICAgICAgICAgaXNTbGFzaERyb3BwZWQgPSB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yIChpPTAsIGw9cGF0aC5sZW5ndGg7IGk8bDsgaSsrKSB7XG4gICAgICAgICAgc3RhdGVzID0gJCRyb3V0ZSRyZWNvZ25pemVyJCRyZWNvZ25pemVDaGFyKHN0YXRlcywgcGF0aC5jaGFyQXQoaSkpO1xuICAgICAgICAgIGlmICghc3RhdGVzLmxlbmd0aCkgeyBicmVhazsgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gRU5EIERFQlVHIEdST1VQXG5cbiAgICAgICAgdmFyIHNvbHV0aW9ucyA9IFtdO1xuICAgICAgICBmb3IgKGk9MCwgbD1zdGF0ZXMubGVuZ3RoOyBpPGw7IGkrKykge1xuICAgICAgICAgIGlmIChzdGF0ZXNbaV0uaGFuZGxlcnMpIHsgc29sdXRpb25zLnB1c2goc3RhdGVzW2ldKTsgfVxuICAgICAgICB9XG5cbiAgICAgICAgc3RhdGVzID0gJCRyb3V0ZSRyZWNvZ25pemVyJCRzb3J0U29sdXRpb25zKHNvbHV0aW9ucyk7XG5cbiAgICAgICAgdmFyIHN0YXRlID0gc29sdXRpb25zWzBdO1xuXG4gICAgICAgIGlmIChzdGF0ZSAmJiBzdGF0ZS5oYW5kbGVycykge1xuICAgICAgICAgIC8vIGlmIGEgdHJhaWxpbmcgc2xhc2ggd2FzIGRyb3BwZWQgYW5kIGEgc3RhciBzZWdtZW50IGlzIHRoZSBsYXN0IHNlZ21lbnRcbiAgICAgICAgICAvLyBzcGVjaWZpZWQsIHB1dCB0aGUgdHJhaWxpbmcgc2xhc2ggYmFja1xuICAgICAgICAgIGlmIChpc1NsYXNoRHJvcHBlZCAmJiBzdGF0ZS5yZWdleC5zb3VyY2Uuc2xpY2UoLTUpID09PSBcIiguKykkXCIpIHtcbiAgICAgICAgICAgIHBhdGggPSBwYXRoICsgXCIvXCI7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiAkJHJvdXRlJHJlY29nbml6ZXIkJGZpbmRIYW5kbGVyKHN0YXRlLCBwYXRoLCBxdWVyeVBhcmFtcyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuXG4gICAgJCRyb3V0ZSRyZWNvZ25pemVyJCRSb3V0ZVJlY29nbml6ZXIucHJvdG90eXBlLm1hcCA9ICQkcm91dGUkcmVjb2duaXplciRkc2wkJGRlZmF1bHQ7XG5cbiAgICAkJHJvdXRlJHJlY29nbml6ZXIkJFJvdXRlUmVjb2duaXplci5WRVJTSU9OID0gJzAuMS41JztcblxuICAgIHZhciAkJHJvdXRlJHJlY29nbml6ZXIkJGRlZmF1bHQgPSAkJHJvdXRlJHJlY29nbml6ZXIkJFJvdXRlUmVjb2duaXplcjtcblxuICAgIC8qIGdsb2JhbCBkZWZpbmU6dHJ1ZSBtb2R1bGU6dHJ1ZSB3aW5kb3c6IHRydWUgKi9cbiAgICBpZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmVbJ2FtZCddKSB7XG4gICAgICBkZWZpbmUoZnVuY3Rpb24oKSB7IHJldHVybiAkJHJvdXRlJHJlY29nbml6ZXIkJGRlZmF1bHQ7IH0pO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcgJiYgbW9kdWxlWydleHBvcnRzJ10pIHtcbiAgICAgIG1vZHVsZVsnZXhwb3J0cyddID0gJCRyb3V0ZSRyZWNvZ25pemVyJCRkZWZhdWx0O1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIHRoaXMgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICB0aGlzWydSb3V0ZVJlY29nbml6ZXInXSA9ICQkcm91dGUkcmVjb2duaXplciQkZGVmYXVsdDtcbiAgICB9XG59KS5jYWxsKHRoaXMpO1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1yb3V0ZS1yZWNvZ25pemVyLmpzLm1hcCJdfQ==
