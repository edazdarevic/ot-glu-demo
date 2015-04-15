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

var GridViewReact = React.createClass({
  displayName: "GridViewReact",

  getInitialState: function getInitialState() {
    return { data: this.props.data };
  },
  updateCell: function updateCell(rowIndex, columnIndex, value, action) {
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
  onHamoClick: function onHamoClick(e) {
    APP.router.navigateTo("/category/new");
    e.preventDefault();
  },
  render: function render() {
    var _this = this;

    var headers = [];
    var rows = [];

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

},{"../../actions/TableActions.js":"/home/edin/projects/operation-transformation/app/actions/TableActions.js","./RowViewReact.js":"/home/edin/projects/operation-transformation/app/components/grid/RowViewReact.js"}],"/home/edin/projects/operation-transformation/app/components/grid/RowViewReact.js":[function(require,module,exports){
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
        this.el.innerHTML = "<div> I Am a title view " + date.toString() + "</div>";
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
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('eventemitter3'), require('lodash-node/modern/lang/isFunction'), require('route-recognizer'), require('deep-equal'), require('lodash-node/modern/lang/clone'), require('lodash-node/modern/object/mapValues'), require('lodash-node/modern/object/forOwn'), require('lodash-node/modern/object/keys'), require('lodash-node/modern/object/findKey'), require('lodash-node/modern/collection/map'), require('lodash-node/modern/collection/forEach'), require('lodash-node/modern/collection/size'), require('lodash-node/modern/array/uniq'), require('lodash-node/modern/array/intersection')) : typeof define === 'function' && define.amd ? define(['eventemitter3', 'lodash-node/modern/lang/isFunction', 'route-recognizer', 'deep-equal', 'lodash-node/modern/lang/clone', 'lodash-node/modern/object/mapValues', 'lodash-node/modern/object/forOwn', 'lodash-node/modern/object/keys', 'lodash-node/modern/object/findKey', 'lodash-node/modern/collection/map', 'lodash-node/modern/collection/forEach', 'lodash-node/modern/collection/size', 'lodash-node/modern/array/uniq', 'lodash-node/modern/array/intersection'], factory) : global.GLU = factory(global.EventEmitter, global._isFunction, global.RouteRecognizer, global.deepEqual, global._clone, global._mapValues, global._forOwn, global._keys, global._findKey, global._map, global._each, global._size, global._uniq, global._intersection);
})(this, function (EventEmitter, _isFunction, RouteRecognizer, deepEqual, _clone, _mapValues, _forOwn, _keys, _findKey, _map, _each, _size, _uniq, _intersection) {
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
                var diffIndex = 0;
                var newAppliedControllers = [];

                this._log('Current handlers:', 123, 'are', 'something');
                this._log(this._printHandlerTree(this._appliedHandlers));
                this._log('New handlers:');
                this._log(this._printHandlerTree(newHandlers));

                for (var i = 0; i < len; i++) {
                    diffIndex = i;
                    if (newHandlers[i].handler.controller !== this._appliedHandlers[i].handler.controller || !deepEqual(newHandlers[i].params, this._appliedHandlers[i].params)) {
                        break;
                    }
                }

                this._log('Diff index is ' + diffIndex + ' starting from ' + diffIndex);

                for (var i = diffIndex; i < this._appliedHandlers.length; i++) {
                    if (this._appliedHandlers[i].controller.destroy) {
                        this._appliedHandlers[i].controller.destroy();
                    }
                }

                this._appliedHandlers.splice(diffIndex);

                for (var i = diffIndex; i < newHandlers.length; i++) {
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
            value: function back() {}
        }, {
            key: 'forward',
            value: function forward() {}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi9hcHAvYWN0aW9ucy9UYWJsZUFjdGlvbkNyZWF0b3IuanMiLCIuLi9hcHAvYWN0aW9ucy9UYWJsZUFjdGlvbnMuanMiLCIuLi9hcHAvYXBwLmpzIiwiLi4vYXBwL2NvbXBvbmVudHMvZ3JpZC9DZWxsVmlld1JlYWN0LmpzIiwiLi4vYXBwL2NvbXBvbmVudHMvZ3JpZC9HcmlkQ29udHJvbGxlci5qcyIsIi4uL2FwcC9jb21wb25lbnRzL2dyaWQvR3JpZFZpZXcuanMiLCIuLi9hcHAvY29tcG9uZW50cy9ncmlkL0dyaWRWaWV3UmVhY3QuanMiLCIuLi9hcHAvY29tcG9uZW50cy9ncmlkL1Jvd1ZpZXdSZWFjdC5qcyIsIi4uL2FwcC9jb21wb25lbnRzL2dyaWRBY3Rpb25zL0dyaWRBY3Rpb25zQ29udHJvbGxlci5qcyIsIi4uL2FwcC9jb21wb25lbnRzL2dyaWRBY3Rpb25zL0dyaWRBY3Rpb25zVmlldy5qcyIsIi4uL2FwcC9jb21wb25lbnRzL2dyaWRBY3Rpb25zL0dyaWRBY3Rpb25zVmlld1JlYWN0LmpzIiwiLi4vYXBwL2NvbXBvbmVudHMvdGl0bGUvVGl0bGVDb250cm9sbGVyLmpzIiwiLi4vYXBwL2NvbXBvbmVudHMvdGl0bGUvVGl0bGVWaWV3LmpzIiwiLi4vYXBwL290L290LmpzIiwiLi4vYXBwL290L3RhYmxlQ2hhbmdlLmpzIiwiLi4vYXBwL3N0b3Jlcy9UYWJsZVN0b3JlLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2dsdS5qcy9kaXN0L2dsdS1kaXN0LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2dsdS5qcy9ub2RlX21vZHVsZXMvZGVlcC1lcXVhbC9pbmRleC5qcyIsIi4uL25vZGVfbW9kdWxlcy9nbHUuanMvbm9kZV9tb2R1bGVzL2RlZXAtZXF1YWwvbGliL2lzX2FyZ3VtZW50cy5qcyIsIi4uL25vZGVfbW9kdWxlcy9nbHUuanMvbm9kZV9tb2R1bGVzL2RlZXAtZXF1YWwvbGliL2tleXMuanMiLCIuLi9ub2RlX21vZHVsZXMvZ2x1LmpzL25vZGVfbW9kdWxlcy9ldmVudGVtaXR0ZXIzL2luZGV4LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2dsdS5qcy9ub2RlX21vZHVsZXMvbG9kYXNoLW5vZGUvbW9kZXJuL2FycmF5L2ludGVyc2VjdGlvbi5qcyIsIi4uL25vZGVfbW9kdWxlcy9nbHUuanMvbm9kZV9tb2R1bGVzL2xvZGFzaC1ub2RlL21vZGVybi9hcnJheS91bmlxLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2dsdS5qcy9ub2RlX21vZHVsZXMvbG9kYXNoLW5vZGUvbW9kZXJuL2NvbGxlY3Rpb24vZm9yRWFjaC5qcyIsIi4uL25vZGVfbW9kdWxlcy9nbHUuanMvbm9kZV9tb2R1bGVzL2xvZGFzaC1ub2RlL21vZGVybi9jb2xsZWN0aW9uL21hcC5qcyIsIi4uL25vZGVfbW9kdWxlcy9nbHUuanMvbm9kZV9tb2R1bGVzL2xvZGFzaC1ub2RlL21vZGVybi9jb2xsZWN0aW9uL3NpemUuanMiLCIuLi9ub2RlX21vZHVsZXMvZ2x1LmpzL25vZGVfbW9kdWxlcy9sb2Rhc2gtbm9kZS9tb2Rlcm4vaW50ZXJuYWwvU2V0Q2FjaGUuanMiLCIuLi9ub2RlX21vZHVsZXMvZ2x1LmpzL25vZGVfbW9kdWxlcy9sb2Rhc2gtbm9kZS9tb2Rlcm4vaW50ZXJuYWwvYXJyYXlDb3B5LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2dsdS5qcy9ub2RlX21vZHVsZXMvbG9kYXNoLW5vZGUvbW9kZXJuL2ludGVybmFsL2FycmF5RWFjaC5qcyIsIi4uL25vZGVfbW9kdWxlcy9nbHUuanMvbm9kZV9tb2R1bGVzL2xvZGFzaC1ub2RlL21vZGVybi9pbnRlcm5hbC9hcnJheU1hcC5qcyIsIi4uL25vZGVfbW9kdWxlcy9nbHUuanMvbm9kZV9tb2R1bGVzL2xvZGFzaC1ub2RlL21vZGVybi9pbnRlcm5hbC9iYXNlQ2FsbGJhY2suanMiLCIuLi9ub2RlX21vZHVsZXMvZ2x1LmpzL25vZGVfbW9kdWxlcy9sb2Rhc2gtbm9kZS9tb2Rlcm4vaW50ZXJuYWwvYmFzZUNsb25lLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2dsdS5qcy9ub2RlX21vZHVsZXMvbG9kYXNoLW5vZGUvbW9kZXJuL2ludGVybmFsL2Jhc2VDb3B5LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2dsdS5qcy9ub2RlX21vZHVsZXMvbG9kYXNoLW5vZGUvbW9kZXJuL2ludGVybmFsL2Jhc2VFYWNoLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2dsdS5qcy9ub2RlX21vZHVsZXMvbG9kYXNoLW5vZGUvbW9kZXJuL2ludGVybmFsL2Jhc2VGaW5kLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2dsdS5qcy9ub2RlX21vZHVsZXMvbG9kYXNoLW5vZGUvbW9kZXJuL2ludGVybmFsL2Jhc2VGb3IuanMiLCIuLi9ub2RlX21vZHVsZXMvZ2x1LmpzL25vZGVfbW9kdWxlcy9sb2Rhc2gtbm9kZS9tb2Rlcm4vaW50ZXJuYWwvYmFzZUZvck93bi5qcyIsIi4uL25vZGVfbW9kdWxlcy9nbHUuanMvbm9kZV9tb2R1bGVzL2xvZGFzaC1ub2RlL21vZGVybi9pbnRlcm5hbC9iYXNlSW5kZXhPZi5qcyIsIi4uL25vZGVfbW9kdWxlcy9nbHUuanMvbm9kZV9tb2R1bGVzL2xvZGFzaC1ub2RlL21vZGVybi9pbnRlcm5hbC9iYXNlSXNFcXVhbC5qcyIsIi4uL25vZGVfbW9kdWxlcy9nbHUuanMvbm9kZV9tb2R1bGVzL2xvZGFzaC1ub2RlL21vZGVybi9pbnRlcm5hbC9iYXNlSXNFcXVhbERlZXAuanMiLCIuLi9ub2RlX21vZHVsZXMvZ2x1LmpzL25vZGVfbW9kdWxlcy9sb2Rhc2gtbm9kZS9tb2Rlcm4vaW50ZXJuYWwvYmFzZUlzRnVuY3Rpb24uanMiLCIuLi9ub2RlX21vZHVsZXMvZ2x1LmpzL25vZGVfbW9kdWxlcy9sb2Rhc2gtbm9kZS9tb2Rlcm4vaW50ZXJuYWwvYmFzZUlzTWF0Y2guanMiLCIuLi9ub2RlX21vZHVsZXMvZ2x1LmpzL25vZGVfbW9kdWxlcy9sb2Rhc2gtbm9kZS9tb2Rlcm4vaW50ZXJuYWwvYmFzZU1hcC5qcyIsIi4uL25vZGVfbW9kdWxlcy9nbHUuanMvbm9kZV9tb2R1bGVzL2xvZGFzaC1ub2RlL21vZGVybi9pbnRlcm5hbC9iYXNlTWF0Y2hlcy5qcyIsIi4uL25vZGVfbW9kdWxlcy9nbHUuanMvbm9kZV9tb2R1bGVzL2xvZGFzaC1ub2RlL21vZGVybi9pbnRlcm5hbC9iYXNlTWF0Y2hlc1Byb3BlcnR5LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2dsdS5qcy9ub2RlX21vZHVsZXMvbG9kYXNoLW5vZGUvbW9kZXJuL2ludGVybmFsL2Jhc2VQcm9wZXJ0eS5qcyIsIi4uL25vZGVfbW9kdWxlcy9nbHUuanMvbm9kZV9tb2R1bGVzL2xvZGFzaC1ub2RlL21vZGVybi9pbnRlcm5hbC9iYXNlVG9TdHJpbmcuanMiLCIuLi9ub2RlX21vZHVsZXMvZ2x1LmpzL25vZGVfbW9kdWxlcy9sb2Rhc2gtbm9kZS9tb2Rlcm4vaW50ZXJuYWwvYmFzZVVuaXEuanMiLCIuLi9ub2RlX21vZHVsZXMvZ2x1LmpzL25vZGVfbW9kdWxlcy9sb2Rhc2gtbm9kZS9tb2Rlcm4vaW50ZXJuYWwvYmluZENhbGxiYWNrLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2dsdS5qcy9ub2RlX21vZHVsZXMvbG9kYXNoLW5vZGUvbW9kZXJuL2ludGVybmFsL2J1ZmZlckNsb25lLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2dsdS5qcy9ub2RlX21vZHVsZXMvbG9kYXNoLW5vZGUvbW9kZXJuL2ludGVybmFsL2NhY2hlSW5kZXhPZi5qcyIsIi4uL25vZGVfbW9kdWxlcy9nbHUuanMvbm9kZV9tb2R1bGVzL2xvZGFzaC1ub2RlL21vZGVybi9pbnRlcm5hbC9jYWNoZVB1c2guanMiLCIuLi9ub2RlX21vZHVsZXMvZ2x1LmpzL25vZGVfbW9kdWxlcy9sb2Rhc2gtbm9kZS9tb2Rlcm4vaW50ZXJuYWwvY3JlYXRlQmFzZUVhY2guanMiLCIuLi9ub2RlX21vZHVsZXMvZ2x1LmpzL25vZGVfbW9kdWxlcy9sb2Rhc2gtbm9kZS9tb2Rlcm4vaW50ZXJuYWwvY3JlYXRlQmFzZUZvci5qcyIsIi4uL25vZGVfbW9kdWxlcy9nbHUuanMvbm9kZV9tb2R1bGVzL2xvZGFzaC1ub2RlL21vZGVybi9pbnRlcm5hbC9jcmVhdGVDYWNoZS5qcyIsIi4uL25vZGVfbW9kdWxlcy9nbHUuanMvbm9kZV9tb2R1bGVzL2xvZGFzaC1ub2RlL21vZGVybi9pbnRlcm5hbC9jcmVhdGVGaW5kS2V5LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2dsdS5qcy9ub2RlX21vZHVsZXMvbG9kYXNoLW5vZGUvbW9kZXJuL2ludGVybmFsL2NyZWF0ZUZvckVhY2guanMiLCIuLi9ub2RlX21vZHVsZXMvZ2x1LmpzL25vZGVfbW9kdWxlcy9sb2Rhc2gtbm9kZS9tb2Rlcm4vaW50ZXJuYWwvY3JlYXRlRm9yT3duLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2dsdS5qcy9ub2RlX21vZHVsZXMvbG9kYXNoLW5vZGUvbW9kZXJuL2ludGVybmFsL2VxdWFsQXJyYXlzLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2dsdS5qcy9ub2RlX21vZHVsZXMvbG9kYXNoLW5vZGUvbW9kZXJuL2ludGVybmFsL2VxdWFsQnlUYWcuanMiLCIuLi9ub2RlX21vZHVsZXMvZ2x1LmpzL25vZGVfbW9kdWxlcy9sb2Rhc2gtbm9kZS9tb2Rlcm4vaW50ZXJuYWwvZXF1YWxPYmplY3RzLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2dsdS5qcy9ub2RlX21vZHVsZXMvbG9kYXNoLW5vZGUvbW9kZXJuL2ludGVybmFsL2luZGV4T2ZOYU4uanMiLCIuLi9ub2RlX21vZHVsZXMvZ2x1LmpzL25vZGVfbW9kdWxlcy9sb2Rhc2gtbm9kZS9tb2Rlcm4vaW50ZXJuYWwvaW5pdENsb25lQXJyYXkuanMiLCIuLi9ub2RlX21vZHVsZXMvZ2x1LmpzL25vZGVfbW9kdWxlcy9sb2Rhc2gtbm9kZS9tb2Rlcm4vaW50ZXJuYWwvaW5pdENsb25lQnlUYWcuanMiLCIuLi9ub2RlX21vZHVsZXMvZ2x1LmpzL25vZGVfbW9kdWxlcy9sb2Rhc2gtbm9kZS9tb2Rlcm4vaW50ZXJuYWwvaW5pdENsb25lT2JqZWN0LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2dsdS5qcy9ub2RlX21vZHVsZXMvbG9kYXNoLW5vZGUvbW9kZXJuL2ludGVybmFsL2lzSW5kZXguanMiLCIuLi9ub2RlX21vZHVsZXMvZ2x1LmpzL25vZGVfbW9kdWxlcy9sb2Rhc2gtbm9kZS9tb2Rlcm4vaW50ZXJuYWwvaXNJdGVyYXRlZUNhbGwuanMiLCIuLi9ub2RlX21vZHVsZXMvZ2x1LmpzL25vZGVfbW9kdWxlcy9sb2Rhc2gtbm9kZS9tb2Rlcm4vaW50ZXJuYWwvaXNMZW5ndGguanMiLCIuLi9ub2RlX21vZHVsZXMvZ2x1LmpzL25vZGVfbW9kdWxlcy9sb2Rhc2gtbm9kZS9tb2Rlcm4vaW50ZXJuYWwvaXNPYmplY3RMaWtlLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2dsdS5qcy9ub2RlX21vZHVsZXMvbG9kYXNoLW5vZGUvbW9kZXJuL2ludGVybmFsL2lzU3RyaWN0Q29tcGFyYWJsZS5qcyIsIi4uL25vZGVfbW9kdWxlcy9nbHUuanMvbm9kZV9tb2R1bGVzL2xvZGFzaC1ub2RlL21vZGVybi9pbnRlcm5hbC9zaGltS2V5cy5qcyIsIi4uL25vZGVfbW9kdWxlcy9nbHUuanMvbm9kZV9tb2R1bGVzL2xvZGFzaC1ub2RlL21vZGVybi9pbnRlcm5hbC9zb3J0ZWRVbmlxLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2dsdS5qcy9ub2RlX21vZHVsZXMvbG9kYXNoLW5vZGUvbW9kZXJuL2ludGVybmFsL3RvT2JqZWN0LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2dsdS5qcy9ub2RlX21vZHVsZXMvbG9kYXNoLW5vZGUvbW9kZXJuL2xhbmcvY2xvbmUuanMiLCIuLi9ub2RlX21vZHVsZXMvZ2x1LmpzL25vZGVfbW9kdWxlcy9sb2Rhc2gtbm9kZS9tb2Rlcm4vbGFuZy9pc0FyZ3VtZW50cy5qcyIsIi4uL25vZGVfbW9kdWxlcy9nbHUuanMvbm9kZV9tb2R1bGVzL2xvZGFzaC1ub2RlL21vZGVybi9sYW5nL2lzQXJyYXkuanMiLCIuLi9ub2RlX21vZHVsZXMvZ2x1LmpzL25vZGVfbW9kdWxlcy9sb2Rhc2gtbm9kZS9tb2Rlcm4vbGFuZy9pc0Z1bmN0aW9uLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2dsdS5qcy9ub2RlX21vZHVsZXMvbG9kYXNoLW5vZGUvbW9kZXJuL2xhbmcvaXNOYXRpdmUuanMiLCIuLi9ub2RlX21vZHVsZXMvZ2x1LmpzL25vZGVfbW9kdWxlcy9sb2Rhc2gtbm9kZS9tb2Rlcm4vbGFuZy9pc09iamVjdC5qcyIsIi4uL25vZGVfbW9kdWxlcy9nbHUuanMvbm9kZV9tb2R1bGVzL2xvZGFzaC1ub2RlL21vZGVybi9sYW5nL2lzVHlwZWRBcnJheS5qcyIsIi4uL25vZGVfbW9kdWxlcy9nbHUuanMvbm9kZV9tb2R1bGVzL2xvZGFzaC1ub2RlL21vZGVybi9vYmplY3QvZmluZEtleS5qcyIsIi4uL25vZGVfbW9kdWxlcy9nbHUuanMvbm9kZV9tb2R1bGVzL2xvZGFzaC1ub2RlL21vZGVybi9vYmplY3QvZm9yT3duLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2dsdS5qcy9ub2RlX21vZHVsZXMvbG9kYXNoLW5vZGUvbW9kZXJuL29iamVjdC9rZXlzLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2dsdS5qcy9ub2RlX21vZHVsZXMvbG9kYXNoLW5vZGUvbW9kZXJuL29iamVjdC9rZXlzSW4uanMiLCIuLi9ub2RlX21vZHVsZXMvZ2x1LmpzL25vZGVfbW9kdWxlcy9sb2Rhc2gtbm9kZS9tb2Rlcm4vb2JqZWN0L21hcFZhbHVlcy5qcyIsIi4uL25vZGVfbW9kdWxlcy9nbHUuanMvbm9kZV9tb2R1bGVzL2xvZGFzaC1ub2RlL21vZGVybi9zdHJpbmcvZXNjYXBlUmVnRXhwLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2dsdS5qcy9ub2RlX21vZHVsZXMvbG9kYXNoLW5vZGUvbW9kZXJuL3N1cHBvcnQuanMiLCIuLi9ub2RlX21vZHVsZXMvZ2x1LmpzL25vZGVfbW9kdWxlcy9sb2Rhc2gtbm9kZS9tb2Rlcm4vdXRpbGl0eS9jb25zdGFudC5qcyIsIi4uL25vZGVfbW9kdWxlcy9nbHUuanMvbm9kZV9tb2R1bGVzL2xvZGFzaC1ub2RlL21vZGVybi91dGlsaXR5L2lkZW50aXR5LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2dsdS5qcy9ub2RlX21vZHVsZXMvcm91dGUtcmVjb2duaXplci9kaXN0L3JvdXRlLXJlY29nbml6ZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQSxZQUFZLENBQUM7Ozs7OztBQUViLElBQUksWUFBWSxHQUFHLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDOztBQUU3QyxJQUFJLEdBQUcsR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7O0lBRXRCLGtCQUFrQjtXQUFsQixrQkFBa0I7MEJBQWxCLGtCQUFrQjs7O2VBQWxCLGtCQUFrQjtBQUNmLGNBQVU7YUFBQSxvQkFBQyxPQUFPLEVBQUU7QUFDekIsV0FBRyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLFdBQVcsRUFBRSxPQUFPLENBQUMsQ0FBQztPQUN2RDs7QUFDTSxVQUFNO2FBQUEsZ0JBQUMsT0FBTyxFQUFFO0FBQ3JCLFdBQUcsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUM7T0FDbkQ7O0FBQ00sYUFBUzthQUFBLG1CQUFDLE9BQU8sRUFBRTtBQUN4QixXQUFHLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsVUFBVSxFQUFFLE9BQU8sQ0FBQyxDQUFDO09BQ3REOztBQUNNLHNCQUFrQjthQUFBLDRCQUFDLE9BQU8sRUFBRTtBQUNqQyxXQUFHLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsb0JBQW9CLEVBQUUsT0FBTyxDQUFDLENBQUM7T0FDaEU7Ozs7U0FaRyxrQkFBa0I7OztBQWV4QixNQUFNLENBQUMsT0FBTyxHQUFHLGtCQUFrQixDQUFDOzs7QUNyQnBDLFlBQVksQ0FBQzs7QUFFYixJQUFJLFlBQVksR0FBRztBQUNq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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqb0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOUZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyT0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbEVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUM3QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDN0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaklBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNkQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQ3ZDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDdkRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUMzQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQ3RCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNaQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQ3hDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQzFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDaENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUN0RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIndXNlIHN0cmljdCc7XG5cbnZhciBUYWJsZUFjdGlvbnMgPSByZXF1aXJlKCcuL1RhYmxlQWN0aW9ucycpO1xuXG52YXIgR0xVID0gcmVxdWlyZSgnZ2x1LmpzJyk7XG5cbmNsYXNzIFRhYmxlQWN0aW9uQ3JlYXRvciB7XG4gIHN0YXRpYyB1cGRhdGVDZWxsKHBheWxvYWQpIHtcbiAgICBHTFUuYnVzLmVtaXRBY3Rpb24oVGFibGVBY3Rpb25zLlVQREFURV9DRUxMLCBwYXlsb2FkKTtcbiAgfVxuICBzdGF0aWMgYWRkUm93KHBheWxvYWQpIHtcbiAgICBHTFUuYnVzLmVtaXRBY3Rpb24oVGFibGVBY3Rpb25zLkFERF9ST1csIHBheWxvYWQpO1xuICB9XG4gIHN0YXRpYyBkZWxldGVSb3cocGF5bG9hZCkge1xuICAgIEdMVS5idXMuZW1pdEFjdGlvbihUYWJsZUFjdGlvbnMuREVMRVRFX1JPVywgcGF5bG9hZCk7XG4gIH1cbiAgc3RhdGljIHVzZXJDaGFuZ2VQb3NpdGlvbihwYXlsb2FkKSB7XG4gICAgR0xVLmJ1cy5lbWl0QWN0aW9uKFRhYmxlQWN0aW9ucy5VU0VSX0NIQU5HRV9QT1NJVElPTiwgcGF5bG9hZCk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBUYWJsZUFjdGlvbkNyZWF0b3I7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBUYWJsZUFjdGlvbnMgPSB7XG4gIFVQREFURV9DRUxMOiAndXBkYXRlQ2VsbCcsXG4gIEFERF9ST1c6ICdhZGRSb3cnLFxuICBERUxFVEVfUk9XOiAnZGVsZXRlUm93JyxcbiAgVVNFUl9DSEFOR0VfUE9TSVRJT046ICd1c2VyLWNoYW5nZS1wb3NpdGlvbidcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gVGFibGVBY3Rpb25zOyIsIid1c2Ugc3RyaWN0JztcblxudmFyIEdyaWRWaWV3ID0gcmVxdWlyZSgnLi9jb21wb25lbnRzL2dyaWQvR3JpZFZpZXcnKTtcbnZhciBHcmlkQ29udHJvbGxlciA9IHJlcXVpcmUoJy4vY29tcG9uZW50cy9ncmlkL0dyaWRDb250cm9sbGVyJyk7XG5cbnZhciBUaXRsZVZpZXcgPSByZXF1aXJlKCcuL2NvbXBvbmVudHMvdGl0bGUvVGl0bGVWaWV3Jyk7XG52YXIgVGl0bGVDb250cm9sbGVyID0gcmVxdWlyZSgnLi9jb21wb25lbnRzL3RpdGxlL1RpdGxlQ29udHJvbGxlcicpO1xudmFyIEdyaWRBY3Rpb25zVmlldyA9IHJlcXVpcmUoJy4vY29tcG9uZW50cy9ncmlkQWN0aW9ucy9HcmlkQWN0aW9uc1ZpZXcnKTtcbnZhciBHcmlkQWN0aW9uc0NvbnRyb2xsZXIgPSByZXF1aXJlKCcuL2NvbXBvbmVudHMvZ3JpZEFjdGlvbnMvR3JpZEFjdGlvbnNDb250cm9sbGVyJyk7XG52YXIgR0xVID0gcmVxdWlyZSgnZ2x1LmpzJyk7XG5cbnZhciBBcHAgPSB7XG4gIGluaXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAvL3ZhciBncmlkVmlldyA9IG5ldyBHcmlkVmlldyhkb2N1bWVudC5ib2R5LCAnI2dyaWQnKTtcbiAgICAvL25ldyBHcmlkQ29udHJvbGxlcihncmlkVmlldyk7XG5cbiAgICAvL3ZhciBhY3Rpb25WaWV3ID0gbmV3IEdyaWRBY3Rpb25zVmlldyhkb2N1bWVudC5ib2R5LCAnI2FjdGlvbnMnKTtcbiAgICAvL25ldyBHcmlkQWN0aW9uc0NvbnRyb2xsZXIoYWN0aW9uVmlldyk7XG5cbiAgICAvL2dyaWRWaWV3LnJlbmRlcigpO1xuICAgIC8vYWN0aW9uVmlldy5yZW5kZXIoKTtcblxuICAgIHRoaXMucm91dGVyID0gbmV3IEdMVS5Sb3V0ZXIoKTtcblxuXG4gICAgLy8gbWVobyAtPiBoYW1vIC0+IHRlc3RcbiAgICAvLyBuaXogPSBbbWVob11cbiAgICAvLyBhZGQgbml6IHRvIHJvdXRlc1xuICAgIC8vIG5peiA9IFttZWhvICwgaGFtb11cbiAgICAvLyBhZGQgbml6IHRvIHJvdXRlc1xuICAgIC8vIG5peiA9IFttZWhvLCBoYW1vLCB0ZXN0XVxuICAgIC8vIGFkZCBuaXogdG8gcm91dGVzXG4gICAgdGhpcy5yb3V0ZXIuYWRkUm91dGUoe1xuICAgICAgICBwYXRoOiBcIi9jYXRlZ29yeS86aWRcIixcbiAgICAgICAgdmlldzogR3JpZFZpZXcsXG4gICAgICAgIHZpZXdTZWxlY3RvcjogXCIjZ3JpZFwiLFxuICAgICAgICBjb250cm9sbGVyOiBHcmlkQ29udHJvbGxlcixcbiAgICAgICAgcm91dGU6IFt7XG4gICAgICAgICAgICBwYXRoOiAnL25ldycsXG4gICAgICAgICAgICBjb250cm9sbGVyOiBHcmlkQWN0aW9uc0NvbnRyb2xsZXIsXG4gICAgICAgICAgICB2aWV3U2VsZWN0b3I6IFwiI3N1YnRlbXBsYXRlXCIsXG4gICAgICAgICAgICB2aWV3OiBHcmlkQWN0aW9uc1ZpZXcsXG4gICAgICAgICAgICByb3V0ZToge1xuICAgICAgICAgICAgICBwYXRoOiAnL25lc3RlZCcsXG4gICAgICAgICAgICAgIGNvbnRyb2xsZXI6IFRpdGxlQ29udHJvbGxlcixcbiAgICAgICAgICAgICAgdmlld1NlbGVjdG9yOiBcIiN0aXRsZVZpZXdcIixcbiAgICAgICAgICAgICAgdmlldzogVGl0bGVWaWV3XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIHBhdGg6ICcvaGFtbycsXG4gICAgICAgICAgICBjb250cm9sbGVyOiBHcmlkQWN0aW9uc0NvbnRyb2xsZXIsXG4gICAgICAgICAgICB2aWV3U2VsZWN0b3I6IFwiI2dyaWRcIixcbiAgICAgICAgICAgIHZpZXc6IEdyaWRBY3Rpb25zVmlld1xuICAgICAgICB9XG4gICAgICAgIF1cbiAgICB9KTtcblxuICAgIHRoaXMucm91dGVyLnN0YXJ0KCk7XG4gIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gQXBwO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgQ2VsbFZpZXdSZWFjdCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgb25CbHVyKGUpOiBhbnkge1xuICAgIHRoaXMucHJvcHMudXBkYXRlQ2VsbCh0aGlzLnByb3BzLnJvd0luZGV4LCB0aGlzLnByb3BzLmNvbHVtbkluZGV4LCBlLnRhcmdldC52YWx1ZSwgJ2NoYW5nZScpO1xuICB9LFxuICBvbkNoYW5nZShlKTphbnkge1xuICAgIHRoaXMucHJvcHMudXBkYXRlQ2VsbCh0aGlzLnByb3BzLnJvd0luZGV4LCB0aGlzLnByb3BzLmNvbHVtbkluZGV4LCBlLnRhcmdldC52YWx1ZSk7XG4gIH0sXG4gIG9uRm9jdXMoZSk6YW55IHtcbiAgICB0aGlzLnByb3BzLnVwZGF0ZUNlbGwodGhpcy5wcm9wcy5yb3dJbmRleCwgdGhpcy5wcm9wcy5jb2x1bW5JbmRleCwgZS50YXJnZXQudmFsdWUsICdmb2N1cycpO1xuICB9LFxuICByZW5kZXIoKTogYW55IHtcbiAgICB2YXIgdXAgPSB0aGlzLnByb3BzLnVzZXJzUG9zaXRpb247XG4gICAgdmFyIGFjdGl2ZVVzZXJzSGVyZSA9IE9iamVjdFxuICAgICAgLmtleXModXApXG4gICAgICAuZmlsdGVyKHVzZXJJZCA9PiB1cFt1c2VySWRdLnJvd0luZGV4ID09PSB0aGlzLnByb3BzLnJvd0luZGV4ICYmIHVwW3VzZXJJZF0uY29sdW1uSW5kZXggPT09IHRoaXMucHJvcHMuY29sdW1uSW5kZXgpXG4gICAgICAubWFwKHVzZXJJZCA9PiA8ZGl2IGNsYXNzTmFtZT17J3VzZXItJyArIHVzZXJJZH0+PC9kaXY+KVxuICAgIHJldHVybiA8dGQ+XG4gICAgICA8aW5wdXQgdHlwZT1cInRleHRcIlxuICAgICAgICB2YWx1ZT17dGhpcy5wcm9wcy52YWx1ZX1cbiAgICAgICAgcmVmPVwidmFsdWVcIlxuICAgICAgICBvbkNoYW5nZT17dGhpcy5vbkNoYW5nZX1cbiAgICAgICAgb25Gb2N1cz17dGhpcy5vbkZvY3VzfVxuICAgICAgICBvbkJsdXI9e3RoaXMub25CbHVyfS8+XG4gICAgICB7YWN0aXZlVXNlcnNIZXJlfVxuICAgIDwvdGQ+O1xuICB9XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBDZWxsVmlld1JlYWN0OyIsIid1c2Ugc3RyaWN0JztcbnZhciBUYWJsZUFjdGlvbnMgPSByZXF1aXJlKCcuLi8uLi9hY3Rpb25zL1RhYmxlQWN0aW9ucy5qcycpO1xudmFyIFRhYmxlQWN0aW9uQ3JlYXRvciA9IHJlcXVpcmUoJy4uLy4uL2FjdGlvbnMvVGFibGVBY3Rpb25DcmVhdG9yLmpzJyk7XG52YXIgVGFibGVTdG9yZSA9IHJlcXVpcmUoJy4uLy4uL3N0b3Jlcy9UYWJsZVN0b3JlLmpzJyk7XG52YXIgR0xVID0gcmVxdWlyZSgnZ2x1LmpzJyk7XG5cbmNsYXNzIEdyaWRDb250cm9sbGVyIGV4dGVuZHMgR0xVLlZpZXdDb250cm9sbGVyIHtcbiAgY29uc3RydWN0b3IodmlldywgcGFyYW1zKSB7XG4gICAgc3VwZXIodmlldyk7XG5cbiAgICB0aGlzLnBhcmFtcyA9IHBhcmFtcztcbiAgICBjb25zb2xlLmxvZyhcInBhcmFtcyBhcmVcIiwgdGhpcy5wYXJhbXMpO1xuICAgIFRhYmxlU3RvcmUub25DaGFuZ2UodGhpcy5vblN0b3JlQ2hhbmdlLCB0aGlzKTtcblxuICAgIHRoaXMudmlldy5vbihUYWJsZUFjdGlvbnMuVVBEQVRFX0NFTEwsIHRoaXMub25DZWxsVXBkYXRlKTtcbiAgICB0aGlzLnZpZXcub24oVGFibGVBY3Rpb25zLlVTRVJfQ0hBTkdFX1BPU0lUSU9OLCB0aGlzLnVzZXJDaGFuZ2VQb3NpdGlvbik7XG4gICAgdGhpcy52aWV3LmlkID0gdGhpcy5wYXJhbXMuaWQ7XG4gICAgdGhpcy52aWV3LnVwZGF0ZVN0YXRlKFRhYmxlU3RvcmUuZGF0YSwgVGFibGVTdG9yZS51c2Vyc1Bvc2l0aW9uKTtcbiAgfVxuXG4gIG9uU3RvcmVDaGFuZ2UoKSB7XG4gICAgdGhpcy52aWV3LnVwZGF0ZVN0YXRlKFRhYmxlU3RvcmUuZGF0YSwgVGFibGVTdG9yZS51c2Vyc1Bvc2l0aW9uKTtcbiAgfVxuXG4gIG9uQ2VsbFVwZGF0ZShwYXlsb2FkKSB7XG4gICAgVGFibGVBY3Rpb25DcmVhdG9yLnVwZGF0ZUNlbGwocGF5bG9hZCk7XG4gIH1cblxuICB1c2VyQ2hhbmdlUG9zaXRpb24ocGF5bG9hZCkge1xuICAgIFRhYmxlQWN0aW9uQ3JlYXRvci51c2VyQ2hhbmdlUG9zaXRpb24ocGF5bG9hZCk7XG4gIH1cblxuICBkZXN0cm95KCkge1xuICAgICAgY29uc29sZS5sb2coYGRlc3Ryb3lpbmcgJHt0aGlzLmNvbnN0cnVjdG9yLm5hbWV9YCk7XG4gICAgICB0aGlzLnZpZXcub2ZmKFRhYmxlQWN0aW9ucy5VUERBVEVfQ0VMTCwgdGhpcy5vbkNlbGxVcGRhdGUpO1xuICAgICAgdGhpcy52aWV3Lm9mZihUYWJsZUFjdGlvbnMuVVNFUl9DSEFOR0VfUE9TSVRJT04sIHRoaXMudXNlckNoYW5nZVBvc2l0aW9uKTtcbiAgICAgIFRhYmxlU3RvcmUub2ZmQ2hhbmdlKHRoaXMub25TdG9yZUNoYW5nZSwgdGhpcyk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBHcmlkQ29udHJvbGxlcjtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGRhdGEsIHVzZXJzUG9zaXRpb24sIHZpZXc7XG52YXIgR3JpZFZpZXdSZWFjdCA9IHJlcXVpcmUoJy4vR3JpZFZpZXdSZWFjdC5qcycpO1xudmFyIEdMVSA9IHJlcXVpcmUoJ2dsdS5qcycpO1xuXG5jbGFzcyBHcmlkVmlldyBleHRlbmRzIEdMVS5WaWV3IHtcbiAgY29uc3RydWN0b3Iocm9vdCwgc2VsZWN0b3IpIHtcbiAgICBzdXBlcihyb290LCBzZWxlY3Rvcik7XG5cbiAgICBkYXRhID0gW107XG4gICAgdXNlcnNQb3NpdGlvbiA9IHt9O1xuICAgIHZpZXcgPSB0aGlzO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIC8vdGhpcy5yb3V0ZUhhbmRsZXIudmlldztcbiAgICAvL3ZhciB0ZW1wbGF0ZSA9IFwiPGRpdj4gc29tZSB0ZWtzdCB7e25lc3RlZFZpZXd9fTxkaXY+XCI7XG5cbiAgICAvL3RoaXMuZWwuaW5uZXJIVE1MID0gTXVzdGFjaGUucmVuZGVyKHRlbXBsYXRlLCB0aGlzLnJvdXRlSGFuZGxlci52aWV3KTtcbiAgIC8qIGNvbnNvbGUubG9nKFwiR3JpZHZpZXcgcmVuZGVyISEhIVwiKTsqL1xuICAgIC8vdmFyIGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgLy9kaXYuc2V0QXR0cmlidXRlKFwiaWRcIiwgXCJzdWJ0ZW1wbGF0ZVwiKTtcblxuICAgIC8vdmFyIHJlYWN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcblxuICAgIC8vdGhpcy5lbC5pbm5lckhUTUwgPSBcIlwiO1xuICAgIC8vdGhpcy5lbC5hcHBlbmRDaGlsZChkaXYpO1xuICAgIC8vdGhpcy5lbC5hcHBlbmRDaGlsZChyZWFjdCk7XG5cblxuICAgICAgdmFyIGNvbXBvbmVudCA9IFJlYWN0LnJlbmRlcig8R3JpZFZpZXdSZWFjdFxuICAgICAgICAgICAgICBkYXRhPXtkYXRhfVxuICAgICAgICAgICAgICB1c2Vyc1Bvc2l0aW9uPXt1c2Vyc1Bvc2l0aW9ufVxuICAgICAgICAgICAgICB2aWV3PXt2aWV3fVxuICAgICAgICAgICAgICBpZD17dGhpcy5pZH0vPixcbiAgICAgICAgICAgICAgdGhpcy5lbCk7XG4gIH1cblxuXG4gIGRlc3Ryb3koKSB7XG4gICAgUmVhY3QudW5tb3VudENvbXBvbmVudEF0Tm9kZSh0aGlzLmVsKTtcbiAgfVxuXG4gIHVwZGF0ZVN0YXRlKGQsIHVwKSB7XG4gICAgICBjb25zb2xlLmxvZygndmlldyB1cGRhdGluZyBzdGF0ZScpO1xuICAgIGRhdGEgPSBkO1xuICAgIHVzZXJzUG9zaXRpb24gPSB1cFxuICAgIHRoaXMucmVuZGVyKCk7XG4gIH1cblxuICBnZXQgZGF0YSgpIHtcbiAgICByZXR1cm4gZGF0YTtcbiAgfVxuXG4gIHNldCBkYXRhKGQpIHtcbiAgICBkYXRhID0gZDtcbiAgICB0aGlzLnJlbmRlcigpO1xuICB9XG5cbiAgc2V0IGlkKHZhbCkge1xuICAgIHRoaXMuX2lkID0gdmFsO1xuICAgIHRoaXMucmVuZGVyKCk7XG4gIH1cblxuICBnZXQgaWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2lkO1xuICB9XG5cbiAgZ2V0IHVzZXJzUG9zaXRpb24oKSB7XG4gICAgcmV0dXJuIHVzZXJzUG9zaXRpb247XG4gIH1cblxuICBzZXQgdXNlcnNQb3NpdGlvbih1cCkge1xuICAgIHVzZXJzUG9zaXRpb24gPSB1cDtcbiAgICB0aGlzLnJlbmRlcigpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gR3JpZFZpZXc7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBSb3dWaWV3UmVhY3QgPSByZXF1aXJlKCcuL1Jvd1ZpZXdSZWFjdC5qcycpO1xudmFyIFRhYmxlQWN0aW9ucyA9IHJlcXVpcmUoJy4uLy4uL2FjdGlvbnMvVGFibGVBY3Rpb25zLmpzJyk7XG5cbnZhciBHcmlkVmlld1JlYWN0ID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICBnZXRJbml0aWFsU3RhdGUoKTogYW55IHtcbiAgICByZXR1cm4ge2RhdGE6IHRoaXMucHJvcHMuZGF0YX07XG4gIH0sXG4gIHVwZGF0ZUNlbGwocm93SW5kZXgsIGNvbHVtbkluZGV4LCB2YWx1ZSwgYWN0aW9uKTogYW55IHtcbiAgICBpZiAoYWN0aW9uID09PSAnZm9jdXMnKSB7XG4gICAgICB0aGlzLnByb3BzLnZpZXcuZW1pdChUYWJsZUFjdGlvbnMuVVNFUl9DSEFOR0VfUE9TSVRJT04sIHtcbiAgICAgICAgcm93SW5kZXg6IHJvd0luZGV4LFxuICAgICAgICBjb2x1bW5JbmRleDogY29sdW1uSW5kZXhcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLnByb3BzLmRhdGFbcm93SW5kZXhdW2NvbHVtbkluZGV4XSA9IHZhbHVlO1xuICAgIHRoaXMuc2V0U3RhdGUoe2RhdGE6IHRoaXMucHJvcHMuZGF0YX0pO1xuICAgIGlmIChhY3Rpb24pIHtcbiAgICAgIHRoaXMucHJvcHMudmlldy5lbWl0KFRhYmxlQWN0aW9ucy5VUERBVEVfQ0VMTCwge1xuICAgICAgICByb3dJbmRleDogcm93SW5kZXgsXG4gICAgICAgIGNvbHVtbkluZGV4OiBjb2x1bW5JbmRleCxcbiAgICAgICAgdmFsdWU6IHZhbHVlXG4gICAgICB9KTtcbiAgICB9XG4gIH0sXG4gICAgb25IYW1vQ2xpY2s6IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgQVBQLnJvdXRlci5uYXZpZ2F0ZVRvKCcvY2F0ZWdvcnkvbmV3Jyk7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICB9LFxuICAgICAgcmVuZGVyKCk6IGFueSB7XG4gICAgICAgICAgdmFyIGhlYWRlcnMgPSBbXTtcbiAgICB2YXIgcm93cyA9IFtdO1xuXG4gICAgaWYgKHRoaXMucHJvcHMuZGF0YSAmJiB0aGlzLnByb3BzLmRhdGFbMF0pIHtcbiAgICAgIGhlYWRlcnMgPSB0aGlzLnByb3BzLmRhdGFbMF0ubWFwKChuYW1lLCBpbmRleCkgPT4gPHRoPkNvbCB7aW5kZXggKyAxfTwvdGg+KTtcbiAgICAgIHJvd3MgPSB0aGlzLnByb3BzLmRhdGEubWFwKChyb3csIGluZGV4KSA9PiA8Um93Vmlld1JlYWN0XG4gICAgICAgIHJvdz17cm93fVxuICAgICAgICBrZXk9e2luZGV4fVxuICAgICAgICByb3dJbmRleD17aW5kZXh9XG4gICAgICAgIHVzZXJzUG9zaXRpb249e3RoaXMucHJvcHMudXNlcnNQb3NpdGlvbn1cbiAgICAgICAgdXBkYXRlQ2VsbD17dGhpcy51cGRhdGVDZWxsfS8+KTtcbiAgICB9XG4gICAgcmV0dXJuIChcbiAgICAgICAgPGRpdj5cbiAgICAgICAgSUQgSVMgOiB7dGhpcy5wcm9wcy5pZH1cbiAgICAgICAgeyhuZXcgRGF0ZSgpKS50b1N0cmluZygpfVxuICAgICAgICA8dGFibGU+XG4gICAgICA8dGhlYWQ+XG4gICAgICAgIDx0cj57aGVhZGVyc308L3RyPlxuICAgICAgPC90aGVhZD5cbiAgICAgIDx0Ym9keT5cbiAgICAgICAge3Jvd3N9XG4gICAgICA8L3Rib2R5PlxuICAgIDwvdGFibGU+XG4gICAgPGEgaHJlZj1cIi9tdWpvXCIgb25DbGljaz17dGhpcy5vbkhhbW9DbGlja30+TmV3IHZpZXcobmF2aWdhdGUpPC9hPlxuICAgIDxkaXYgaWQ9XCJzdWJ0ZW1wbGF0ZVwiPjwvZGl2PlxuICAgIDwvZGl2Pik7XG4gIH1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEdyaWRWaWV3UmVhY3Q7XG4iLCIndXNlIHN0cmljdCc7XG52YXIgQ2VsbFZpZXdSZWFjdCA9IHJlcXVpcmUoJy4vQ2VsbFZpZXdSZWFjdC5qcycpO1xuXG52YXIgUm93Vmlld1JlYWN0ID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICByZW5kZXIoKTogYW55IHtcbiAgICB2YXIgY2VsbHMgPSBbXTtcbiAgICBpZiAodGhpcy5wcm9wcy5yb3cubGVuZ3RoKSB7XG4gICAgICBjZWxscyA9IHRoaXMucHJvcHMucm93Lm1hcCgoY2VsbCwgaW5kZXgpID0+IDxDZWxsVmlld1JlYWN0XG4gICAgICAgIHZhbHVlPXtjZWxsfVxuICAgICAgICBrZXk9e2luZGV4fVxuICAgICAgICBjb2x1bW5JbmRleD17aW5kZXh9XG4gICAgICAgIHJvd0luZGV4PXt0aGlzLnByb3BzLnJvd0luZGV4fVxuICAgICAgICB1c2Vyc1Bvc2l0aW9uPXt0aGlzLnByb3BzLnVzZXJzUG9zaXRpb259XG4gICAgICAgIHVwZGF0ZUNlbGw9e3RoaXMucHJvcHMudXBkYXRlQ2VsbH0vPik7XG4gICAgfVxuICAgIHJldHVybiA8dHI+e2NlbGxzfTwvdHI+O1xuICB9XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBSb3dWaWV3UmVhY3Q7IiwiJ3VzZSBzdHJpY3QnO1xudmFyIFRhYmxlQWN0aW9ucyA9IHJlcXVpcmUoJy4uLy4uL2FjdGlvbnMvVGFibGVBY3Rpb25zLmpzJyk7XG52YXIgVGFibGVBY3Rpb25DcmVhdG9yID0gcmVxdWlyZSgnLi4vLi4vYWN0aW9ucy9UYWJsZUFjdGlvbkNyZWF0b3IuanMnKTtcblxudmFyIEdMVSA9IHJlcXVpcmUoJ2dsdS5qcycpO1xuY2xhc3MgR3JpZEFjdGlvbnNDb250cm9sbGVyIGV4dGVuZHMgR0xVLlZpZXdDb250cm9sbGVyIHtcbiAgY29uc3RydWN0b3Iodmlldykge1xuICAgIHN1cGVyKHZpZXcpO1xuXG4gICAgdGhpcy52aWV3Lm9uKFRhYmxlQWN0aW9ucy5BRERfUk9XLCB0aGlzLmFkZFJvdyk7XG4gICAgdGhpcy52aWV3Lm9uKFRhYmxlQWN0aW9ucy5ERUxFVEVfUk9XLCB0aGlzLmRlbGV0ZVJvdyk7XG4gIH1cblxuICBhZGRSb3cocGF5bG9hZCkge1xuICAgIFRhYmxlQWN0aW9uQ3JlYXRvci5hZGRSb3cocGF5bG9hZCk7XG4gIH1cblxuICBkZWxldGVSb3cocGF5bG9hZCkge1xuICAgIFRhYmxlQWN0aW9uQ3JlYXRvci5kZWxldGVSb3cocGF5bG9hZCk7XG4gIH1cblxuICBkZXN0cm95KCkge1xuICAgIGNvbnNvbGUubG9nKFwiZGVzdHJveWluZyBHcmlkQWN0aW9uc0NvbnRyb2xsZXJcIik7XG4gICAgdGhpcy52aWV3LmRlc3Ryb3koKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEdyaWRBY3Rpb25zQ29udHJvbGxlcjtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHZpZXc7XG52YXIgR3JpZEFjdGlvbnNWaWV3UmVhY3QgPSByZXF1aXJlKCcuL0dyaWRBY3Rpb25zVmlld1JlYWN0LmpzJyk7XG52YXIgR0xVID0gcmVxdWlyZSgnZ2x1LmpzJyk7XG5cbmNsYXNzIEdyaWRBY3Rpb25zVmlldyBleHRlbmRzIEdMVS5WaWV3IHtcbiAgY29uc3RydWN0b3Iocm9vdCwgc2VsZWN0b3IpIHtcbiAgICBzdXBlcihyb290LCBzZWxlY3Rvcik7XG4gICAgdmlldyA9IHRoaXM7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgUmVhY3QucmVuZGVyKDxHcmlkQWN0aW9uc1ZpZXdSZWFjdCB2aWV3PXt2aWV3fSAvPixcbiAgICAgIHRoaXMuZWwpO1xuICB9XG5cbiAgZGVzdHJveSgpIHtcbiAgICBSZWFjdC51bm1vdW50Q29tcG9uZW50QXROb2RlKHRoaXMuZWwpO1xuICAgIC8vIHRoaXMuZWwuaW5uZXJIVE1MID0gXCJcIjtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEdyaWRBY3Rpb25zVmlldztcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBUYWJsZUFjdGlvbnMgPSByZXF1aXJlKCcuLi8uLi9hY3Rpb25zL1RhYmxlQWN0aW9ucy5qcycpO1xuXG52YXIgR3JpZFZpZXdSZWFjdCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgYWRkUm93KCk6IGFueSB7XG4gICAgdGhpcy5wcm9wcy52aWV3LmVtaXQoVGFibGVBY3Rpb25zLkFERF9ST1csIHtcbiAgICAgIHJvd0luZGV4OiArUmVhY3QuZmluZERPTU5vZGUodGhpcy5yZWZzLnJvd1Bvc2l0aW9uKS52YWx1ZS50cmltKClcbiAgICB9KTtcbiAgfSxcbiAgZGVsZXRlUm93KCk6IGFueSB7XG4gICAgdGhpcy5wcm9wcy52aWV3LmVtaXQoVGFibGVBY3Rpb25zLkRFTEVURV9ST1csIHtcbiAgICAgIHJvd0luZGV4OiArUmVhY3QuZmluZERPTU5vZGUodGhpcy5yZWZzLnJvd1Bvc2l0aW9uKS52YWx1ZS50cmltKClcbiAgICB9KTtcbiAgfSxcbiAgcmVuZGVyKCk6IGFueSB7XG4gICAgcmV0dXJuIDxkaXY+XG4gICAgICA8YnV0dG9uIG9uQ2xpY2s9e3RoaXMuYWRkUm93fT5BZGQgbmV3IHJvdzwvYnV0dG9uPlxuICAgICAgPGJ1dHRvbiBvbkNsaWNrPXt0aGlzLmRlbGV0ZVJvd30+UmVtb3ZlIHJvdzwvYnV0dG9uPlxuICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgZGVmYXVsdFZhbHVlPVwiMVwiIHJlZj1cInJvd1Bvc2l0aW9uXCIgLz5cbiAgICAgIDxkaXYgaWQ9XCJ0aXRsZVZpZXdcIj48L2Rpdj5cbiAgICA8L2Rpdj47XG4gIH1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEdyaWRWaWV3UmVhY3Q7XG4iLCIndXNlIHN0cmljdCc7XG52YXIgR0xVID0gcmVxdWlyZSgnZ2x1LmpzJyk7XG5cbmNsYXNzIFRpdGxlQ29udHJvbGxlciBleHRlbmRzIEdMVS5WaWV3Q29udHJvbGxlciB7XG4gIGNvbnN0cnVjdG9yKHZpZXcpIHtcbiAgICBzdXBlcih2aWV3KTtcbiAgfVxuXG4gIGRlc3Ryb3koKSB7XG4gICAgICBjb25zb2xlLmxvZyhgZGVzdHJveWluZyAke3RoaXMuY29uc3RydWN0b3IubmFtZX1gKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFRpdGxlQ29udHJvbGxlcjtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBHTFUgPSByZXF1aXJlKCdnbHUuanMnKTtcblxuY2xhc3MgVGl0bGVWaWV3IGV4dGVuZHMgR0xVLlZpZXcge1xuICBjb25zdHJ1Y3Rvcihyb290LCBzZWxlY3Rvcikge1xuICAgIHN1cGVyKHJvb3QsIHNlbGVjdG9yKTtcbiAgfVxuXG4gIHJlbmRlcihmb3JjZSkge1xuICAgIC8vdGhpcy5yb3V0ZUhhbmRsZXIudmlldztcbiAgICAvL3ZhciB0ZW1wbGF0ZSA9IFwiPGRpdj4gc29tZSB0ZWtzdCB7e25lc3RlZFZpZXd9fTxkaXY+XCI7XG5cbiAgICAvL3RoaXMuZWwuaW5uZXJIVE1MID0gTXVzdGFjaGUucmVuZGVyKHRlbXBsYXRlLCB0aGlzLnJvdXRlSGFuZGxlci52aWV3KTtcbiAgIC8qIGNvbnNvbGUubG9nKFwiR3JpZHZpZXcgcmVuZGVyISEhIVwiKTsqL1xuICAgIC8vdmFyIGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgLy9kaXYuc2V0QXR0cmlidXRlKFwiaWRcIiwgXCJzdWJ0ZW1wbGF0ZVwiKTtcblxuICAgIC8vdmFyIHJlYWN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcblxuICAgIC8vdGhpcy5lbC5pbm5lckhUTUwgPSBcIlwiO1xuICAgIC8vdGhpcy5lbC5hcHBlbmRDaGlsZChkaXYpO1xuICAgIC8vdGhpcy5lbC5hcHBlbmRDaGlsZChyZWFjdCk7XG5cbiAgICAgIC8vUmVhY3QudW5tb3VudENvbXBvbmVudEF0Tm9kZSh0aGlzLmVsKTtcbiAgICB2YXIgZGF0ZSA9IG5ldyBEYXRlKCk7XG4gICAgdGhpcy5lbC5pbm5lckhUTUwgPSBgPGRpdj4gSSBBbSBhIHRpdGxlIHZpZXcgJHtkYXRlLnRvU3RyaW5nKCl9PC9kaXY+YDtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFRpdGxlVmlldztcbiIsIi8qanNoaW50IGRldmVsOnRydWUqL1xuLypnbG9iYWwgT1Q6dHJ1ZSovXG4ndXNlIHN0cmljdCc7XG52YXIgT1QgPSAoZnVuY3Rpb24gKCkge1xuICB2YXIgcHJpb3JpdHksIGRhdGE7XG4gIHZhciBzdGF0ZXMgPSBbXTtcbiAgdmFyIGxvZyA9IFtdO1xuICB2YXIgZXhlY3V0ZUFjdGlvbnMgPSB7fTtcbiAgdmFyIHRyYW5zZm9ybWF0aW9uTWF0cml4ID0ge307XG4gIHZhciBvcHRpb25zO1xuICB2YXIgb25Nb2RlbENoYW5nZUV2ZW50cyA9IHt9O1xuICB2YXIgdXNlcnNQb3NpdGlvbiA9IHt9O1xuXG4gIHZhciBPVCA9IGZ1bmN0aW9uIChvKSB7XG4gICAgb3B0aW9ucyA9IG8gfHwge307XG4gIH07XG5cbiAgT1QucHJvdG90eXBlLnNldERhdGEgPSBmdW5jdGlvbiAoZCkge1xuICAgIGRhdGEgPSBkO1xuICB9O1xuXG4gIE9ULnByb3RvdHlwZS5nZXREYXRhID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBkYXRhO1xuICB9O1xuXG4gIE9ULnByb3RvdHlwZS5zZXRTdGF0ZXMgPSBmdW5jdGlvbiAocykge1xuICAgIHN0YXRlcyA9IHM7XG4gIH07XG5cbiAgT1QucHJvdG90eXBlLmdldFByaW9yaXR5ID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBwcmlvcml0eTtcbiAgfTtcblxuXG4gIE9ULnByb3RvdHlwZS5nZXRVc2Vyc1Bvc3Rpb24gPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHVzZXJzUG9zaXRpb247XG4gIH07XG5cbiAgT1QucHJvdG90eXBlLnNldEV4ZWN1dGVBY3Rpb25zID0gZnVuY3Rpb24gKGFjdGlvbnMpIHtcbiAgICBleGVjdXRlQWN0aW9ucyA9IGFjdGlvbnM7XG4gIH07XG5cbiAgT1QucHJvdG90eXBlLnNldFRyYW5zZm9ybWF0aW9uTWF0cml4ID0gZnVuY3Rpb24gKG1hdHJpeCkge1xuICAgIHRyYW5zZm9ybWF0aW9uTWF0cml4ID0gbWF0cml4O1xuICB9O1xuXG4gIE9ULnByb3RvdHlwZS5jcmVhdGVNZXNzYWdlID0gZnVuY3Rpb24gKGFjdGlvbiwgdmFsdWUpIHtcbiAgICB2YXIganNvbiA9IHtcbiAgICAgIGFjdGlvbjogYWN0aW9uLFxuICAgICAgc3RhdGVzOiBzdGF0ZXMsXG4gICAgICBwcmlvcml0eTogcHJpb3JpdHksXG4gICAgICB2YWx1ZTogdmFsdWVcbiAgICB9O1xuICAgIHJldHVybiBKU09OLnN0cmluZ2lmeShqc29uKTtcbiAgfTtcblxuICBPVC5wcm90b3R5cGUub25Nb2RlbENoYW5nZSA9IGZ1bmN0aW9uIChhY3Rpb24sIGNhbGxiYWNrKSB7XG4gICAgaWYgKHR5cGVvZiBjYWxsYmFjayAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgdGhyb3cgJ0NhbGxiYWNrIGhhcyB0byBiZSBhIGZ1bmN0aW9uJztcbiAgICB9XG4gICAgaWYgKCFvbk1vZGVsQ2hhbmdlRXZlbnRzW2FjdGlvbl0pIHtcbiAgICAgIG9uTW9kZWxDaGFuZ2VFdmVudHNbYWN0aW9uXSA9IFtdO1xuICAgIH1cbiAgICBvbk1vZGVsQ2hhbmdlRXZlbnRzW2FjdGlvbl0ucHVzaChjYWxsYmFjayk7XG4gIH07XG5cbiAgdmFyIGV4ZWN1dGUgPSBmdW5jdGlvbiAocmVxdWVzdCkge1xuICAgIHZhciBhY3Rpb24gPSBleGVjdXRlQWN0aW9uc1tyZXF1ZXN0LmFjdGlvbl07XG4gICAgaWYgKGFjdGlvbikge1xuICAgICAgYWN0aW9uKHJlcXVlc3QpO1xuICAgIH1cbiAgICB2YXIgb25Nb2RlbENoYW5nZUNhbGxiYWNrID0gb25Nb2RlbENoYW5nZUV2ZW50c1tyZXF1ZXN0LmFjdGlvbl07XG4gICAgaWYgKG9uTW9kZWxDaGFuZ2VDYWxsYmFjaykge1xuICAgICAgb25Nb2RlbENoYW5nZUNhbGxiYWNrLmZvckVhY2goZnVuY3Rpb24gKGNhbGxiYWNrKSB7XG4gICAgICAgIGNhbGxiYWNrKHJlcXVlc3QpO1xuICAgICAgfSk7XG4gICAgfVxuICAgIHN0YXRlc1tyZXF1ZXN0LnByaW9yaXR5XSArPSAxO1xuICAgIGxvZy5wdXNoKHJlcXVlc3QpO1xuICB9O1xuXG4gIE9ULnByb3RvdHlwZS5leGVjdXRlID0gZXhlY3V0ZTtcblxuXG4gIE9ULnByb3RvdHlwZS5tYXJrQXNOb09wID0gZnVuY3Rpb24gKHJlcXVlc3QpIHtcbiAgICByZXF1ZXN0Lm9yaWdpbmFsQWN0aW9uID0gcmVxdWVzdC5hY3Rpb247XG4gICAgcmVxdWVzdC5hY3Rpb24gPSAnbm8tb3AnO1xuICAgIHJldHVybiByZXF1ZXN0O1xuICB9O1xuXG4gIHZhciBjb21wYXJlU3RhdGUgPSBmdW5jdGlvbiAocmVxdWVzdFN0YXRlLCBjdXJyZW50U3RhdGUpIHtcbiAgICB2YXIgc2hvdWxkVHJhbnNmb3JtID0gZmFsc2U7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjdXJyZW50U3RhdGUubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgIGlmIChjdXJyZW50U3RhdGVbaV0gPT09IHJlcXVlc3RTdGF0ZVtpXSkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIGlmIChjdXJyZW50U3RhdGVbaV0gPiByZXF1ZXN0U3RhdGVbaV0pIHtcbiAgICAgICAgc2hvdWxkVHJhbnNmb3JtID0gdHJ1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiAxO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gKHNob3VsZFRyYW5zZm9ybSkgPyAtMSA6IDA7XG4gIH07XG5cbiAgdmFyIHRyYW5zZm9ybSA9IGZ1bmN0aW9uIChuZXdSZXF1ZXN0LCBvbGRSZXF1ZXN0KSB7XG4gICAgaWYgKG5ld1JlcXVlc3QgJiYgdHJhbnNmb3JtYXRpb25NYXRyaXhbbmV3UmVxdWVzdC5hY3Rpb25dICYmIHRyYW5zZm9ybWF0aW9uTWF0cml4W25ld1JlcXVlc3QuYWN0aW9uXVtvbGRSZXF1ZXN0LmFjdGlvbl0pIHtcbiAgICAgIHJldHVybiB0cmFuc2Zvcm1hdGlvbk1hdHJpeFtuZXdSZXF1ZXN0LmFjdGlvbl1bb2xkUmVxdWVzdC5hY3Rpb25dKG5ld1JlcXVlc3QsIG9sZFJlcXVlc3QpO1xuICAgIH1cbiAgICByZXR1cm4gbmV3UmVxdWVzdDtcbiAgfTtcblxuICBPVC5wcm90b3R5cGUucHJvY2Vzc1JlcXVlc3QgPSBmdW5jdGlvbiAocikge1xuICAgIHZhciByZXF1ZXN0ID0gSlNPTi5wYXJzZShyKTtcbiAgICBzd2l0Y2ggKHJlcXVlc3QuYWN0aW9uKSB7XG4gICAgY2FzZSAnaW5pdCc6XG4gICAgICBkYXRhID0gcmVxdWVzdC52YWx1ZS5kYXRhO1xuICAgICAgcHJpb3JpdHkgPSByZXF1ZXN0LnZhbHVlLnByaW9yaXR5O1xuICAgICAgc3RhdGVzID0gcmVxdWVzdC52YWx1ZS5zdGF0ZXM7XG4gICAgICBpZiAodHlwZW9mIG9wdGlvbnMub25Jbml0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIG9wdGlvbnMub25Jbml0KGRhdGEpO1xuICAgICAgfVxuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnbmV3LXVzZXInOlxuICAgICAgc3RhdGVzW3JlcXVlc3QudmFsdWVdID0gMDtcbiAgICAgIGlmICh0eXBlb2Ygb3B0aW9ucy5vbk5ld1VzZXIgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgb3B0aW9ucy5vbk5ld1VzZXIocmVxdWVzdCk7XG4gICAgICB9XG4gICAgICBicmVhaztcbiAgICBjYXNlICd1c2VyLWNoYW5nZS1wb3NpdGlvbic6XG4gICAgICB1c2Vyc1Bvc2l0aW9uW3JlcXVlc3QucHJpb3JpdHldID0gcmVxdWVzdC52YWx1ZTtcbiAgICAgIGlmICh0eXBlb2Ygb3B0aW9ucy5vblVzZXJQb3NpdGlvbkNoYW5nZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBvcHRpb25zLm9uVXNlclBvc2l0aW9uQ2hhbmdlKHJlcXVlc3QpO1xuICAgICAgfVxuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnbm8tb3AnOlxuICAgICAgZXhlY3V0ZShyZXF1ZXN0KTtcbiAgICAgIGJyZWFrO1xuICAgIGRlZmF1bHQ6XG4gICAgICBpZiAocHJpb3JpdHkgIT09IHJlcXVlc3QucHJpb3JpdHkpIHtcbiAgICAgICAgc3dpdGNoIChjb21wYXJlU3RhdGUocmVxdWVzdC5zdGF0ZXMsIHN0YXRlcykpIHtcbiAgICAgICAgY2FzZSAwOlxuICAgICAgICAgIC8vIHdlIGNhbiBleGVjdXRlIHRoaXMgYWN0aW9uIHJpZ2h0IGF3YXlcbiAgICAgICAgICBleGVjdXRlKHJlcXVlc3QpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgLy8gdGhpcyBhY3Rpb24gaGFzIHRvIGJlIHB1dCBpbnRvIHF1ZSwgYW5kIHdhaXQgZm9yIG90aGVyIGFjdGlvbnNcbiAgICAgICAgICAvLyBidXQgc2luY2Ugd2UgdXNlIHdlYiBzb2NrZXQsIHRoaXMgc2hvdWxkbid0IGhhcHBlbiBhbnl3YXlcbiAgICAgICAgICAvLyBxdWUucHVzaChyZXF1ZXN0KTtcbiAgICAgICAgICAvLyBUT0RPOiB3aGVuIHRvIGZpcmUgcXVlP1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIC0xOlxuICAgICAgICAgIC8vIGNyZWF0ZSB0cmFuc2Zvcm1hdGlvbiBmb3IgdGhpcyBhY3Rpb25cbiAgICAgICAgICBmb3IgKHZhciBpID0gbG9nLmxlbmd0aCAtIDE7IGkgPj0gMDsgaSAtPSAxKSB7XG4gICAgICAgICAgICAvLyBmaW5kIGFsbCBsb2dzIHRoYXQgaGFwcGVuZWQgYWZ0ZXIgdGhpcyByZXF1ZXN0IHdhcyBjcmFldGVkXG4gICAgICAgICAgICB2YXIgY29tcGFyZVN0YXRlU3RhdHVzID0gY29tcGFyZVN0YXRlKGxvZ1tpXS5zdGF0ZXMsIHJlcXVlc3Quc3RhdGVzKTtcbiAgICAgICAgICAgIGlmIChjb21wYXJlU3RhdGVTdGF0dXMgPT09IC0xKSB7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICB2YXIgdHJhbnNmb3JtZWRSZXF1ZXN0ID0gcmVxdWVzdDtcbiAgICAgICAgICBmb3IgKHZhciBqID0gaSArIDE7IGogPCBsb2cubGVuZ3RoOyBqICs9IDEpIHtcbiAgICAgICAgICAgIHRyYW5zZm9ybWVkUmVxdWVzdCA9IHRyYW5zZm9ybSh0cmFuc2Zvcm1lZFJlcXVlc3QsIGxvZ1tqXSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGV4ZWN1dGUodHJhbnNmb3JtZWRSZXF1ZXN0KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBjb25zb2xlLmxvZyhyZXF1ZXN0LmFjdGlvbiwgZGF0YSwgc3RhdGVzLCBsb2cpO1xuICB9O1xuXG4gIHJldHVybiBPVDtcbn0oKSk7XG5cbm1vZHVsZS5leHBvcnRzID0gT1Q7IiwiJ3VzZSBzdHJpY3QnO1xudmFyIHRhYmxlQ2hhbmdlUnVsZXMgPSAoZnVuY3Rpb24gKCkge1xuICB2YXIgb3Q7XG5cbiAgdmFyIGV4ZWN1dGVBY3Rpb25zID0ge1xuICAgIHVwZGF0ZUNlbGw6IGZ1bmN0aW9uIChyZXF1ZXN0KSB7XG4gICAgICB2YXIgdmFsdWUgPSByZXF1ZXN0LnZhbHVlO1xuICAgICAgdmFyIGRhdGEgPSBvdC5nZXREYXRhKCk7XG4gICAgICBkYXRhW3ZhbHVlLnJvd0luZGV4XVt2YWx1ZS5jb2x1bW5JbmRleF0gPSByZXF1ZXN0LnZhbHVlLnZhbHVlO1xuICAgIH0sXG4gICAgYWRkUm93OiBmdW5jdGlvbiAocmVxdWVzdCkge1xuICAgICAgdmFyIHZhbHVlID0gcmVxdWVzdC52YWx1ZTtcbiAgICAgIHZhciBkYXRhID0gb3QuZ2V0RGF0YSgpO1xuICAgICAgdmFyIHNvbWVSb3cgPSBkYXRhWzBdIHx8IFtdO1xuICAgICAgdmFyIHJvdyA9IHNvbWVSb3cubWFwKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuICcnO1xuICAgICAgfSk7XG5cbiAgICAgIGRhdGEuc3BsaWNlKHZhbHVlLnJvd0luZGV4LCAwLCByb3cpO1xuICAgIH0sXG4gICAgZGVsZXRlUm93OiBmdW5jdGlvbiAocmVxdWVzdCkge1xuICAgICAgdmFyIHZhbHVlID0gcmVxdWVzdC52YWx1ZTtcbiAgICAgIHZhciBkYXRhID0gb3QuZ2V0RGF0YSgpO1xuICAgICAgZGF0YS5zcGxpY2UodmFsdWUucm93SW5kZXgsIDEpO1xuICAgIH1cbiAgfTtcblxuICB2YXIgdHJhbnNmb3JtYXRpb25NYXRyaXggPSB7XG4gICAgdXBkYXRlQ2VsbDoge1xuICAgICAgdXBkYXRlQ2VsbDogZnVuY3Rpb24gKG5ld1JlcXVlc3QsIG9sZFJlcXVlc3QpIHtcbiAgICAgICAgaWYgKG5ld1JlcXVlc3QudmFsdWUucm93SW5kZXggIT09IG9sZFJlcXVlc3QudmFsdWUucm93SW5kZXggfHwgbmV3UmVxdWVzdC52YWx1ZS5jb2x1bW5JbmRleCAhPT0gb2xkUmVxdWVzdC52YWx1ZS5jb2x1bW5JbmRleCkge1xuICAgICAgICAgIHJldHVybiBuZXdSZXF1ZXN0O1xuICAgICAgICB9XG4gICAgICAgIGlmIChuZXdSZXF1ZXN0LnByaW9yaXR5IDwgb2xkUmVxdWVzdC5wcmlvcml0eSkge1xuICAgICAgICAgIHJldHVybiBuZXdSZXF1ZXN0O1xuICAgICAgICB9XG4gICAgICAgIHZhciB2YWx1ZSA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkob2xkUmVxdWVzdC52YWx1ZSkpO1xuICAgICAgICBuZXdSZXF1ZXN0LnZhbHVlID0gdmFsdWU7XG4gICAgICAgIHJldHVybiBuZXdSZXF1ZXN0O1xuICAgICAgfSxcbiAgICAgIGFkZFJvdzogZnVuY3Rpb24gKG5ld1JlcXVlc3QsIG9sZFJlcXVlc3QpIHtcbiAgICAgICAgaWYgKG5ld1JlcXVlc3QudmFsdWUucm93SW5kZXggPCBvbGRSZXF1ZXN0LnZhbHVlLnJvd0luZGV4KSB7XG4gICAgICAgICAgcmV0dXJuIG5ld1JlcXVlc3Q7XG4gICAgICAgIH1cbiAgICAgICAgbmV3UmVxdWVzdC52YWx1ZS5yb3dJbmRleCArPSAxO1xuICAgICAgICByZXR1cm4gbmV3UmVxdWVzdDtcbiAgICAgIH0sXG4gICAgICBkZWxldGVSb3c6IGZ1bmN0aW9uIChuZXdSZXF1ZXN0LCBvbGRSZXF1ZXN0KSB7XG4gICAgICAgIGlmIChuZXdSZXF1ZXN0LnZhbHVlLnJvd0luZGV4IDwgb2xkUmVxdWVzdC52YWx1ZS5yb3dJbmRleCkge1xuICAgICAgICAgIHJldHVybiBuZXdSZXF1ZXN0O1xuICAgICAgICB9XG4gICAgICAgIGlmICgrbmV3UmVxdWVzdC52YWx1ZS5yb3dJbmRleCA9PT0gK29sZFJlcXVlc3QudmFsdWUucm93SW5kZXgpIHtcbiAgICAgICAgICByZXR1cm4gb3QubWFya0FzTm9PcChuZXdSZXF1ZXN0KTtcbiAgICAgICAgfVxuICAgICAgICBuZXdSZXF1ZXN0LnZhbHVlLnJvd0luZGV4IC09IDE7XG4gICAgICAgIHJldHVybiBuZXdSZXF1ZXN0O1xuICAgICAgfVxuICAgIH0sXG4gICAgYWRkUm93OiB7XG4gICAgICAvLyBubyBuZWVkIGZvciB0cmFuc2Zvcm1hdGlvblxuICAgICAgLy8gdXBkYXRlQ2VsbDogZnVuY3Rpb24gKG5ld1JlcXVlc3QsIG9sZFJlcXVlc3QpIHt9XG4gICAgICBhZGRSb3c6IGZ1bmN0aW9uIChuZXdSZXF1ZXN0LCBvbGRSZXF1ZXN0KSB7XG4gICAgICAgIGlmIChuZXdSZXF1ZXN0LnZhbHVlLnJvd0luZGV4ICE9PSBvbGRSZXF1ZXN0LnZhbHVlLnJvd0luZGV4KSB7XG4gICAgICAgICAgcmV0dXJuIG5ld1JlcXVlc3Q7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG90Lm1hcmtBc05vT3AobmV3UmVxdWVzdCk7XG4gICAgICB9LFxuICAgICAgZGVsZXRlUm93OiBmdW5jdGlvbiAobmV3UmVxdWVzdCwgb2xkUmVxdWVzdCkge1xuICAgICAgICBpZiAobmV3UmVxdWVzdC52YWx1ZS5yb3dJbmRleCA8IG9sZFJlcXVlc3QudmFsdWUucm93SW5kZXgpIHtcbiAgICAgICAgICByZXR1cm4gbmV3UmVxdWVzdDtcbiAgICAgICAgfVxuICAgICAgICBuZXdSZXF1ZXN0LnZhbHVlLnJvd0luZGV4IC09IDE7XG4gICAgICAgIHJldHVybiBuZXdSZXF1ZXN0O1xuICAgICAgfVxuICAgIH0sXG4gICAgZGVsZXRlUm93OiB7XG4gICAgICAvLyBubyBuZWVkIGZvciB0cmFuc2Zvcm1hdGlvblxuICAgICAgLy8gdXBkYXRlQ2VsbDogZnVuY3Rpb24gKG5ld1JlcXVlc3QsIG9sZFJlcXVlc3QpIHt9XG4gICAgICBhZGRSb3c6IGZ1bmN0aW9uIChuZXdSZXF1ZXN0LCBvbGRSZXF1ZXN0KSB7XG4gICAgICAgIGlmIChuZXdSZXF1ZXN0LnZhbHVlLnJvd0luZGV4IDwgb2xkUmVxdWVzdC52YWx1ZS5yb3dJbmRleCkge1xuICAgICAgICAgIHJldHVybiBuZXdSZXF1ZXN0O1xuICAgICAgICB9XG4gICAgICAgIG5ld1JlcXVlc3QudmFsdWUucm93SW5kZXggKz0gMTtcbiAgICAgICAgcmV0dXJuIG5ld1JlcXVlc3Q7XG4gICAgICB9LFxuICAgICAgZGVsZXRlUm93OiBmdW5jdGlvbiAobmV3UmVxdWVzdCwgb2xkUmVxdWVzdCkge1xuICAgICAgICBpZiAobmV3UmVxdWVzdC52YWx1ZS5yb3dJbmRleCAhPT0gb2xkUmVxdWVzdC52YWx1ZS5yb3dJbmRleCkge1xuICAgICAgICAgIHJldHVybiBuZXdSZXF1ZXN0O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBvdC5tYXJrQXNOb09wKG5ld1JlcXVlc3QpO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICByZXR1cm4gZnVuY3Rpb24gKG9wZWFyaW9uVHJhbnNmb3JtYXRpb24pIHtcbiAgICBvdCA9IG9wZWFyaW9uVHJhbnNmb3JtYXRpb247XG4gICAgb3Quc2V0RXhlY3V0ZUFjdGlvbnMoZXhlY3V0ZUFjdGlvbnMpO1xuICAgIG90LnNldFRyYW5zZm9ybWF0aW9uTWF0cml4KHRyYW5zZm9ybWF0aW9uTWF0cml4KTtcbiAgfTtcbn0oKSk7XG5cbm1vZHVsZS5leHBvcnRzID0gdGFibGVDaGFuZ2VSdWxlczsiLCIndXNlIHN0cmljdCc7XG5cbnZhciBUYWJsZUFjdGlvbnMgPSByZXF1aXJlKCcuLi9hY3Rpb25zL1RhYmxlQWN0aW9ucycpO1xudmFyIE9UID0gcmVxdWlyZSgnLi4vb3Qvb3QuanMnKTtcbnZhciB0YWJsZUNoYW5nZVJ1bGVzID0gcmVxdWlyZSgnLi4vb3QvdGFibGVDaGFuZ2UuanMnKTtcbnZhciBzb2NrZXQsIG90O1xudmFyIEdMVSA9IHJlcXVpcmUoJ2dsdS5qcycpO1xuXG5jbGFzcyBUYWJsZVN0b3JlIGV4dGVuZHMgR0xVLlN0b3JlIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMuaW5pdCgpO1xuXG4gICAgdGhpcy5iaW5kQWN0aW9ucyhcbiAgICAgIFRhYmxlQWN0aW9ucy5VUERBVEVfQ0VMTCwgdGhpcy51cGRhdGVDZWxsLCBbXSxcbiAgICAgIFRhYmxlQWN0aW9ucy5BRERfUk9XLCB0aGlzLnVwZGF0ZVJvdywgW10sXG4gICAgICBUYWJsZUFjdGlvbnMuREVMRVRFX1JPVywgdGhpcy5kZWxldGVSb3csIFtdLFxuICAgICAgVGFibGVBY3Rpb25zLlVTRVJfQ0hBTkdFX1BPU0lUSU9OLCB0aGlzLnVzZXJDaGFuZ2VQb3NpdGlvbiwgW11cbiAgICApO1xuICB9XG5cbiAgaW5pdCgpIHtcbiAgICBzb2NrZXQgPSBuZXcgV2ViU29ja2V0KCd3czovL2xvY2FsaG9zdDo4MDgwJywgJ3Byb3RvY29sT25lJyk7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIHZhciBlbWl0Q2hhbmdlID0gZnVuY3Rpb24gKCkge1xuICAgICAgc2VsZi5lbWl0Q2hhbmdlKCk7XG4gICAgfTtcblxuICAgIG90ID0gbmV3IE9UKHtcbiAgICAgIG9uSW5pdDogZW1pdENoYW5nZSxcbiAgICAgIG9uVXNlclBvc2l0aW9uQ2hhbmdlOiBlbWl0Q2hhbmdlXG4gICAgfSk7XG4gICAgdGFibGVDaGFuZ2VSdWxlcyhvdCk7XG5cbiAgICBvdC5vbk1vZGVsQ2hhbmdlKFRhYmxlQWN0aW9ucy5VUERBVEVfQ0VMTCwgZW1pdENoYW5nZSk7XG4gICAgb3Qub25Nb2RlbENoYW5nZShUYWJsZUFjdGlvbnMuQUREX1JPVywgZW1pdENoYW5nZSk7XG4gICAgb3Qub25Nb2RlbENoYW5nZShUYWJsZUFjdGlvbnMuREVMRVRFX1JPVywgZW1pdENoYW5nZSk7XG5cbiAgICBzb2NrZXQub25tZXNzYWdlID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICBvdC5wcm9jZXNzUmVxdWVzdChldmVudC5kYXRhKTtcbiAgICB9O1xuICB9XG5cbiAgZ2V0IGRhdGEoKSB7XG4gICAgcmV0dXJuIG90LmdldERhdGEoKTtcbiAgfVxuXG4gIGdldCB1c2Vyc1Bvc2l0aW9uKCkge1xuICAgIHJldHVybiBvdC5nZXRVc2Vyc1Bvc3Rpb24oKTtcbiAgfVxuXG4gIHRyaWdnZXJSZXF1ZXN0KGFjdGlvbiwgcGF5bG9hZCkge1xuICAgIHZhciBtZXNzYWdlID0gb3QuY3JlYXRlTWVzc2FnZShhY3Rpb24sIHBheWxvYWQpO1xuICAgIHZhciByZXF1ZXN0ID0gSlNPTi5wYXJzZShtZXNzYWdlKTtcbiAgICBvdC5leGVjdXRlKHJlcXVlc3QpO1xuICAgIHNvY2tldC5zZW5kKG1lc3NhZ2UpO1xuICAgIHRoaXMuZW1pdENoYW5nZSgpO1xuICB9XG5cbiAgdXBkYXRlQ2VsbChwYXlsb2FkKSB7XG4gICAgdGhpcy50cmlnZ2VyUmVxdWVzdChUYWJsZUFjdGlvbnMuVVBEQVRFX0NFTEwsIHBheWxvYWQpO1xuICB9XG5cbiAgdXBkYXRlUm93KHBheWxvYWQpIHtcbiAgICB0aGlzLnRyaWdnZXJSZXF1ZXN0KFRhYmxlQWN0aW9ucy5BRERfUk9XLCBwYXlsb2FkKTtcbiAgfVxuXG4gIGRlbGV0ZVJvdyhwYXlsb2FkKSB7XG4gICAgdGhpcy50cmlnZ2VyUmVxdWVzdChUYWJsZUFjdGlvbnMuREVMRVRFX1JPVywgcGF5bG9hZCk7XG4gIH1cblxuICB1c2VyQ2hhbmdlUG9zaXRpb24ocGF5bG9hZCkge1xuICAgIHRoaXMudHJpZ2dlclJlcXVlc3QoVGFibGVBY3Rpb25zLlVTRVJfQ0hBTkdFX1BPU0lUSU9OLCBwYXlsb2FkKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IG5ldyBUYWJsZVN0b3JlKCk7XG4iLCJ2YXIgX2dldCA9IGZ1bmN0aW9uIGdldChvYmplY3QsIHByb3BlcnR5LCByZWNlaXZlcikgeyB2YXIgZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iob2JqZWN0LCBwcm9wZXJ0eSk7IGlmIChkZXNjID09PSB1bmRlZmluZWQpIHsgdmFyIHBhcmVudCA9IE9iamVjdC5nZXRQcm90b3R5cGVPZihvYmplY3QpOyBpZiAocGFyZW50ID09PSBudWxsKSB7IHJldHVybiB1bmRlZmluZWQ7IH0gZWxzZSB7IHJldHVybiBnZXQocGFyZW50LCBwcm9wZXJ0eSwgcmVjZWl2ZXIpOyB9IH0gZWxzZSBpZiAoJ3ZhbHVlJyBpbiBkZXNjKSB7IHJldHVybiBkZXNjLnZhbHVlOyB9IGVsc2UgeyB2YXIgZ2V0dGVyID0gZGVzYy5nZXQ7IGlmIChnZXR0ZXIgPT09IHVuZGVmaW5lZCkgeyByZXR1cm4gdW5kZWZpbmVkOyB9IHJldHVybiBnZXR0ZXIuY2FsbChyZWNlaXZlcik7IH0gfTtcblxudmFyIF9pbmhlcml0cyA9IGZ1bmN0aW9uIChzdWJDbGFzcywgc3VwZXJDbGFzcykgeyBpZiAodHlwZW9mIHN1cGVyQ2xhc3MgIT09ICdmdW5jdGlvbicgJiYgc3VwZXJDbGFzcyAhPT0gbnVsbCkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKCdTdXBlciBleHByZXNzaW9uIG11c3QgZWl0aGVyIGJlIG51bGwgb3IgYSBmdW5jdGlvbiwgbm90ICcgKyB0eXBlb2Ygc3VwZXJDbGFzcyk7IH0gc3ViQ2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzICYmIHN1cGVyQ2xhc3MucHJvdG90eXBlLCB7IGNvbnN0cnVjdG9yOiB7IHZhbHVlOiBzdWJDbGFzcywgZW51bWVyYWJsZTogZmFsc2UsIHdyaXRhYmxlOiB0cnVlLCBjb25maWd1cmFibGU6IHRydWUgfSB9KTsgaWYgKHN1cGVyQ2xhc3MpIHN1YkNsYXNzLl9fcHJvdG9fXyA9IHN1cGVyQ2xhc3M7IH07XG5cbnZhciBfY2xhc3NDYWxsQ2hlY2sgPSBmdW5jdGlvbiAoaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoJ0Nhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvbicpOyB9IH07XG5cbnZhciBfY3JlYXRlQ2xhc3MgPSAoZnVuY3Rpb24gKCkgeyBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHsgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykgeyB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldOyBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7IGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTsgaWYgKCd2YWx1ZScgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTsgfSB9IHJldHVybiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7IGlmIChwcm90b1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7IGlmIChzdGF0aWNQcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpOyByZXR1cm4gQ29uc3RydWN0b3I7IH07IH0pKCk7XG5cbihmdW5jdGlvbiAoZ2xvYmFsLCBmYWN0b3J5KSB7XG4gICAgdHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnID8gbW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KHJlcXVpcmUoJ2V2ZW50ZW1pdHRlcjMnKSwgcmVxdWlyZSgnbG9kYXNoLW5vZGUvbW9kZXJuL2xhbmcvaXNGdW5jdGlvbicpLCByZXF1aXJlKCdyb3V0ZS1yZWNvZ25pemVyJyksIHJlcXVpcmUoJ2RlZXAtZXF1YWwnKSwgcmVxdWlyZSgnbG9kYXNoLW5vZGUvbW9kZXJuL2xhbmcvY2xvbmUnKSwgcmVxdWlyZSgnbG9kYXNoLW5vZGUvbW9kZXJuL29iamVjdC9tYXBWYWx1ZXMnKSwgcmVxdWlyZSgnbG9kYXNoLW5vZGUvbW9kZXJuL29iamVjdC9mb3JPd24nKSwgcmVxdWlyZSgnbG9kYXNoLW5vZGUvbW9kZXJuL29iamVjdC9rZXlzJyksIHJlcXVpcmUoJ2xvZGFzaC1ub2RlL21vZGVybi9vYmplY3QvZmluZEtleScpLCByZXF1aXJlKCdsb2Rhc2gtbm9kZS9tb2Rlcm4vY29sbGVjdGlvbi9tYXAnKSwgcmVxdWlyZSgnbG9kYXNoLW5vZGUvbW9kZXJuL2NvbGxlY3Rpb24vZm9yRWFjaCcpLCByZXF1aXJlKCdsb2Rhc2gtbm9kZS9tb2Rlcm4vY29sbGVjdGlvbi9zaXplJyksIHJlcXVpcmUoJ2xvZGFzaC1ub2RlL21vZGVybi9hcnJheS91bmlxJyksIHJlcXVpcmUoJ2xvZGFzaC1ub2RlL21vZGVybi9hcnJheS9pbnRlcnNlY3Rpb24nKSkgOiB0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQgPyBkZWZpbmUoWydldmVudGVtaXR0ZXIzJywgJ2xvZGFzaC1ub2RlL21vZGVybi9sYW5nL2lzRnVuY3Rpb24nLCAncm91dGUtcmVjb2duaXplcicsICdkZWVwLWVxdWFsJywgJ2xvZGFzaC1ub2RlL21vZGVybi9sYW5nL2Nsb25lJywgJ2xvZGFzaC1ub2RlL21vZGVybi9vYmplY3QvbWFwVmFsdWVzJywgJ2xvZGFzaC1ub2RlL21vZGVybi9vYmplY3QvZm9yT3duJywgJ2xvZGFzaC1ub2RlL21vZGVybi9vYmplY3Qva2V5cycsICdsb2Rhc2gtbm9kZS9tb2Rlcm4vb2JqZWN0L2ZpbmRLZXknLCAnbG9kYXNoLW5vZGUvbW9kZXJuL2NvbGxlY3Rpb24vbWFwJywgJ2xvZGFzaC1ub2RlL21vZGVybi9jb2xsZWN0aW9uL2ZvckVhY2gnLCAnbG9kYXNoLW5vZGUvbW9kZXJuL2NvbGxlY3Rpb24vc2l6ZScsICdsb2Rhc2gtbm9kZS9tb2Rlcm4vYXJyYXkvdW5pcScsICdsb2Rhc2gtbm9kZS9tb2Rlcm4vYXJyYXkvaW50ZXJzZWN0aW9uJ10sIGZhY3RvcnkpIDogZ2xvYmFsLkdMVSA9IGZhY3RvcnkoZ2xvYmFsLkV2ZW50RW1pdHRlciwgZ2xvYmFsLl9pc0Z1bmN0aW9uLCBnbG9iYWwuUm91dGVSZWNvZ25pemVyLCBnbG9iYWwuZGVlcEVxdWFsLCBnbG9iYWwuX2Nsb25lLCBnbG9iYWwuX21hcFZhbHVlcywgZ2xvYmFsLl9mb3JPd24sIGdsb2JhbC5fa2V5cywgZ2xvYmFsLl9maW5kS2V5LCBnbG9iYWwuX21hcCwgZ2xvYmFsLl9lYWNoLCBnbG9iYWwuX3NpemUsIGdsb2JhbC5fdW5pcSwgZ2xvYmFsLl9pbnRlcnNlY3Rpb24pO1xufSkodGhpcywgZnVuY3Rpb24gKEV2ZW50RW1pdHRlciwgX2lzRnVuY3Rpb24sIFJvdXRlUmVjb2duaXplciwgZGVlcEVxdWFsLCBfY2xvbmUsIF9tYXBWYWx1ZXMsIF9mb3JPd24sIF9rZXlzLCBfZmluZEtleSwgX21hcCwgX2VhY2gsIF9zaXplLCBfdW5pcSwgX2ludGVyc2VjdGlvbikge1xuICAgICd1c2Ugc3RyaWN0JztcblxuICAgIC8qKlxuICAgICAqIENyZWF0ZWQgYnkgYWRuYW4gb24gNC85LzE1LlxuICAgICAqL1xuXG4gICAgdmFyIENvbnN0YW50cyA9IHtcbiAgICAgICAgQUNUSU9OOiAnX19HTFVfX0FDVElPTl9fJyxcbiAgICAgICAgU1RPUkVfQ0hBTkdFOiAnX19TVE9SRV9DSEFOR0VfXydcbiAgICB9O1xuXG4gICAgdmFyIEJhc2VBY3Rpb24gPSAoZnVuY3Rpb24gKCkge1xuICAgICAgICAvKipcbiAgICAgICAgICogQWN0aW9uIGNvbnN0cnVjdG9yXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSB7c3RyaW5nfSB0eXBlXG4gICAgICAgICAqIEBwYXJhbSB7b2JqZWN0fSBwYXlsb2FkXG4gICAgICAgICAqL1xuXG4gICAgICAgIGZ1bmN0aW9uIEJhc2VBY3Rpb24odHlwZSwgcGF5bG9hZCkge1xuICAgICAgICAgICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIEJhc2VBY3Rpb24pO1xuXG4gICAgICAgICAgICB0aGlzLl90eXBlID0gdHlwZTtcbiAgICAgICAgICAgIHRoaXMuX3BheWxvYWQgPSBwYXlsb2FkO1xuICAgICAgICB9XG5cbiAgICAgICAgX2NyZWF0ZUNsYXNzKEJhc2VBY3Rpb24sIFt7XG4gICAgICAgICAgICBrZXk6ICd0eXBlJyxcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl90eXBlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBrZXk6ICdwYXlsb2FkJyxcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9wYXlsb2FkO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XSk7XG5cbiAgICAgICAgcmV0dXJuIEJhc2VBY3Rpb247XG4gICAgfSkoKTtcblxuICAgIHZhciBjb3JlX0Jhc2VBY3Rpb24gPSBCYXNlQWN0aW9uO1xuXG4gICAgdmFyIEV2ZW50QnVzID0gKGZ1bmN0aW9uIChfRXZlbnRFbWl0dGVyKSB7XG4gICAgICAgIGZ1bmN0aW9uIEV2ZW50QnVzKCkge1xuICAgICAgICAgICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIEV2ZW50QnVzKTtcblxuICAgICAgICAgICAgX2dldChPYmplY3QuZ2V0UHJvdG90eXBlT2YoRXZlbnRCdXMucHJvdG90eXBlKSwgJ2NvbnN0cnVjdG9yJywgdGhpcykuY2FsbCh0aGlzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIF9pbmhlcml0cyhFdmVudEJ1cywgX0V2ZW50RW1pdHRlcik7XG5cbiAgICAgICAgX2NyZWF0ZUNsYXNzKEV2ZW50QnVzLCBbe1xuICAgICAgICAgICAga2V5OiAnZW1pdEFjdGlvbicsXG4gICAgICAgICAgICB2YWx1ZTogZnVuY3Rpb24gZW1pdEFjdGlvbih0eXBlLCBwYXlsb2FkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5lbWl0KENvbnN0YW50cy5BQ1RJT04sIG5ldyBjb3JlX0Jhc2VBY3Rpb24odHlwZSwgcGF5bG9hZCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XSk7XG5cbiAgICAgICAgcmV0dXJuIEV2ZW50QnVzO1xuICAgIH0pKEV2ZW50RW1pdHRlcik7XG5cbiAgICB2YXIgZXZlbnRCdXMgPSBuZXcgRXZlbnRCdXMoKTtcblxuICAgIHZhciBFdmVudGJ1cyA9IGV2ZW50QnVzO1xuXG4gICAgdmFyIEJhc2VWaWV3ID0gKGZ1bmN0aW9uIChfRXZlbnRFbWl0dGVyMikge1xuICAgICAgICAvKipcbiAgICAgICAgICogQmFzZVZpZXcgY29uc3RydWN0b3JcbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHtET01FbGVtZW50fSByb290XG4gICAgICAgICAqIEBwYXJhbSB7c3RyaW5nfSBzZWxlY3RvclxuICAgICAgICAgKi9cblxuICAgICAgICBmdW5jdGlvbiBCYXNlVmlldyhyb290LCBzZWxlY3Rvcikge1xuICAgICAgICAgICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIEJhc2VWaWV3KTtcblxuICAgICAgICAgICAgX2dldChPYmplY3QuZ2V0UHJvdG90eXBlT2YoQmFzZVZpZXcucHJvdG90eXBlKSwgJ2NvbnN0cnVjdG9yJywgdGhpcykuY2FsbCh0aGlzKTtcblxuICAgICAgICAgICAgdGhpcy5fcm9vdCA9IHJvb3Q7XG4gICAgICAgICAgICB0aGlzLl9zZWxlY3RvciA9IHNlbGVjdG9yO1xuICAgICAgICB9XG5cbiAgICAgICAgX2luaGVyaXRzKEJhc2VWaWV3LCBfRXZlbnRFbWl0dGVyMik7XG5cbiAgICAgICAgX2NyZWF0ZUNsYXNzKEJhc2VWaWV3LCBbe1xuICAgICAgICAgICAga2V5OiAncm9vdCcsXG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fcm9vdDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uICh2KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fcm9vdCA9IHY7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGtleTogJ3NlbGVjdG9yJyxcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9zZWxlY3RvcjtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uICh2KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fc2VsZWN0b3IgPSB2O1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBrZXk6ICdyZW5kZXInLFxuICAgICAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIHJlbmRlcigpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwge1xuICAgICAgICAgICAga2V5OiAnZWwnLFxuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2VsZWN0b3IgPyB0aGlzLnJvb3QucXVlcnlTZWxlY3Rvcih0aGlzLnNlbGVjdG9yKSA6IHRoaXMucm9vdDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfV0pO1xuXG4gICAgICAgIHJldHVybiBCYXNlVmlldztcbiAgICB9KShFdmVudEVtaXR0ZXIpO1xuXG4gICAgdmFyIGNvcmVfQmFzZVZpZXcgPSBCYXNlVmlldztcblxuICAgIHZhciBCYXNlVmlld0NvbnRyb2xsZXIgPSAoZnVuY3Rpb24gKCkge1xuICAgICAgICBmdW5jdGlvbiBCYXNlVmlld0NvbnRyb2xsZXIodmlldykge1xuICAgICAgICAgICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIEJhc2VWaWV3Q29udHJvbGxlcik7XG5cbiAgICAgICAgICAgIHRoaXMuX3ZpZXcgPSB2aWV3O1xuICAgICAgICAgICAgdGhpcy5fZXZlbnRCdXMgPSBFdmVudGJ1cztcbiAgICAgICAgfVxuXG4gICAgICAgIF9jcmVhdGVDbGFzcyhCYXNlVmlld0NvbnRyb2xsZXIsIFt7XG4gICAgICAgICAgICBrZXk6ICd2aWV3JyxcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl92aWV3O1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldDogZnVuY3Rpb24gKHYpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl92aWV3ID0gdjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwge1xuICAgICAgICAgICAga2V5OiAnRXZlbnRidXMnLFxuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2V2ZW50QnVzO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XSk7XG5cbiAgICAgICAgcmV0dXJuIEJhc2VWaWV3Q29udHJvbGxlcjtcbiAgICB9KSgpO1xuXG4gICAgdmFyIGNvcmVfQmFzZVZpZXdDb250cm9sbGVyID0gQmFzZVZpZXdDb250cm9sbGVyO1xuXG4gICAgdmFyIERpc3BhdGNoZXIgPSBmdW5jdGlvbiBEaXNwYXRjaGVyKHN0b3Jlcykge1xuICAgICAgICB0aGlzLnN0b3JlcyA9IHt9O1xuICAgICAgICB0aGlzLmN1cnJlbnREaXNwYXRjaCA9IG51bGw7XG4gICAgICAgIHRoaXMuY3VycmVudEFjdGlvblR5cGUgPSBudWxsO1xuICAgICAgICB0aGlzLndhaXRpbmdUb0Rpc3BhdGNoID0gW107XG5cbiAgICAgICAgZm9yICh2YXIga2V5IGluIHN0b3Jlcykge1xuICAgICAgICAgICAgaWYgKHN0b3Jlcy5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5hZGRTdG9yZShrZXksIHN0b3Jlc1trZXldKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIEV2ZW50YnVzLm9uKENvbnN0YW50cy5BQ1RJT04sIHRoaXMuZGlzcGF0Y2gsIHRoaXMpO1xuICAgIH07XG5cbiAgICBEaXNwYXRjaGVyLnByb3RvdHlwZS5hZGRTdG9yZSA9IGZ1bmN0aW9uIChuYW1lLCBzdG9yZSkge1xuICAgICAgICBzdG9yZS5kaXNwYXRjaGVyID0gdGhpcztcbiAgICAgICAgdGhpcy5zdG9yZXNbbmFtZV0gPSBzdG9yZTtcbiAgICB9O1xuXG4gICAgRGlzcGF0Y2hlci5wcm90b3R5cGUuZGlzcGF0Y2ggPSBmdW5jdGlvbiAoYWN0aW9uKSB7XG4gICAgICAgIGlmICghYWN0aW9uIHx8ICFhY3Rpb24udHlwZSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdDYW4gb25seSBkaXNwYXRjaCBhY3Rpb25zIHdpdGggYSBcXCd0eXBlXFwnIHByb3BlcnR5Jyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5jdXJyZW50RGlzcGF0Y2gpIHtcbiAgICAgICAgICAgIHZhciBjb21wbGFpbnQgPSAnQ2Fubm90IGRpc3BhdGNoIGFuIGFjdGlvbiAoXFwnJyArIGFjdGlvbi50eXBlICsgJ1xcJykgd2hpbGUgYW5vdGhlciBhY3Rpb24gKFxcJycgKyB0aGlzLmN1cnJlbnRBY3Rpb25UeXBlICsgJ1xcJykgaXMgYmVpbmcgZGlzcGF0Y2hlZCc7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoY29tcGxhaW50KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMud2FpdGluZ1RvRGlzcGF0Y2ggPSBfY2xvbmUodGhpcy5zdG9yZXMpO1xuXG4gICAgICAgIHRoaXMuY3VycmVudEFjdGlvblR5cGUgPSBhY3Rpb24udHlwZTtcbiAgICAgICAgdGhpcy5jdXJyZW50RGlzcGF0Y2ggPSBfbWFwVmFsdWVzKHRoaXMuc3RvcmVzLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4geyByZXNvbHZlZDogZmFsc2UsIHdhaXRpbmdPbjogW10sIHdhaXRDYWxsYmFjazogbnVsbCB9O1xuICAgICAgICB9KTtcblxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgdGhpcy5kb0Rpc3BhdGNoTG9vcChhY3Rpb24pO1xuICAgICAgICB9IGZpbmFsbHkge1xuICAgICAgICAgICAgdGhpcy5jdXJyZW50QWN0aW9uVHlwZSA9IG51bGw7XG4gICAgICAgICAgICB0aGlzLmN1cnJlbnREaXNwYXRjaCA9IG51bGw7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgRGlzcGF0Y2hlci5wcm90b3R5cGUuZG9EaXNwYXRjaExvb3AgPSBmdW5jdGlvbiAoYWN0aW9uKSB7XG4gICAgICAgIHZhciBkaXNwYXRjaCxcbiAgICAgICAgICAgIGNhbkJlRGlzcGF0Y2hlZFRvLFxuICAgICAgICAgICAgd2FzSGFuZGxlZCA9IGZhbHNlLFxuICAgICAgICAgICAgcmVtb3ZlRnJvbURpc3BhdGNoUXVldWUgPSBbXSxcbiAgICAgICAgICAgIGRpc3BhdGNoZWRUaGlzTG9vcCA9IFtdO1xuXG4gICAgICAgIF9mb3JPd24odGhpcy53YWl0aW5nVG9EaXNwYXRjaCwgZnVuY3Rpb24gKHZhbHVlLCBrZXkpIHtcbiAgICAgICAgICAgIGRpc3BhdGNoID0gdGhpcy5jdXJyZW50RGlzcGF0Y2hba2V5XTtcbiAgICAgICAgICAgIGNhbkJlRGlzcGF0Y2hlZFRvID0gIWRpc3BhdGNoLndhaXRpbmdPbi5sZW5ndGggfHwgIV9pbnRlcnNlY3Rpb24oZGlzcGF0Y2gud2FpdGluZ09uLCBfa2V5cyh0aGlzLndhaXRpbmdUb0Rpc3BhdGNoKSkubGVuZ3RoO1xuICAgICAgICAgICAgaWYgKGNhbkJlRGlzcGF0Y2hlZFRvKSB7XG4gICAgICAgICAgICAgICAgaWYgKGRpc3BhdGNoLndhaXRDYWxsYmFjaykge1xuICAgICAgICAgICAgICAgICAgICB2YXIgc3RvcmVzID0gX21hcChkaXNwYXRjaC53YWl0aW5nT24sIGZ1bmN0aW9uIChzdG9yZUtleSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuc3RvcmVzW3N0b3JlS2V5XTtcbiAgICAgICAgICAgICAgICAgICAgfSwgdGhpcyk7XG4gICAgICAgICAgICAgICAgICAgIHZhciBmbiA9IGRpc3BhdGNoLndhaXRDYWxsYmFjaztcbiAgICAgICAgICAgICAgICAgICAgZGlzcGF0Y2gud2FpdENhbGxiYWNrID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgZGlzcGF0Y2gud2FpdGluZ09uID0gW107XG4gICAgICAgICAgICAgICAgICAgIGRpc3BhdGNoLnJlc29sdmVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgZm4uYXBwbHkobnVsbCwgc3RvcmVzKTtcbiAgICAgICAgICAgICAgICAgICAgd2FzSGFuZGxlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgZGlzcGF0Y2gucmVzb2x2ZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB2YXIgaGFuZGxlZCA9IHRoaXMuc3RvcmVzW2tleV0uX19oYW5kbGVBY3Rpb25fXyhhY3Rpb24pO1xuICAgICAgICAgICAgICAgICAgICBpZiAoaGFuZGxlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgd2FzSGFuZGxlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBkaXNwYXRjaGVkVGhpc0xvb3AucHVzaChrZXkpO1xuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuY3VycmVudERpc3BhdGNoW2tleV0ucmVzb2x2ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVtb3ZlRnJvbURpc3BhdGNoUXVldWUucHVzaChrZXkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgdGhpcyk7XG5cbiAgICAgICAgaWYgKF9rZXlzKHRoaXMud2FpdGluZ1RvRGlzcGF0Y2gpLmxlbmd0aCAmJiAhZGlzcGF0Y2hlZFRoaXNMb29wLmxlbmd0aCkge1xuICAgICAgICAgICAgdmFyIHN0b3Jlc1dpdGhDaXJjdWxhcldhaXRzID0gX2tleXModGhpcy53YWl0aW5nVG9EaXNwYXRjaCkuam9pbignLCAnKTtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignSW5kaXJlY3QgY2lyY3VsYXIgd2FpdCBkZXRlY3RlZCBhbW9uZzogJyArIHN0b3Jlc1dpdGhDaXJjdWxhcldhaXRzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIF9lYWNoKHJlbW92ZUZyb21EaXNwYXRjaFF1ZXVlLCBmdW5jdGlvbiAoa2V5KSB7XG4gICAgICAgICAgICBkZWxldGUgdGhpcy53YWl0aW5nVG9EaXNwYXRjaFtrZXldO1xuICAgICAgICB9LCB0aGlzKTtcblxuICAgICAgICBpZiAoX3NpemUodGhpcy53YWl0aW5nVG9EaXNwYXRjaCkpIHtcbiAgICAgICAgICAgIHRoaXMuZG9EaXNwYXRjaExvb3AoYWN0aW9uKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghd2FzSGFuZGxlZCAmJiBjb25zb2xlICYmIGNvbnNvbGUud2Fybikge1xuICAgICAgICAgICAgY29uc29sZS53YXJuKCdBbiBhY3Rpb24gb2YgdHlwZSAnICsgYWN0aW9uLnR5cGUgKyAnIHdhcyBkaXNwYXRjaGVkLCBidXQgbm8gc3RvcmUgaGFuZGxlZCBpdCcpO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIERpc3BhdGNoZXIucHJvdG90eXBlLndhaXRGb3JTdG9yZXMgPSBmdW5jdGlvbiAoc3RvcmUsIHN0b3JlcywgZm4pIHtcbiAgICAgICAgaWYgKCF0aGlzLmN1cnJlbnREaXNwYXRjaCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdDYW5ub3Qgd2FpdCB1bmxlc3MgYW4gYWN0aW9uIGlzIGJlaW5nIGRpc3BhdGNoZWQnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciB3YWl0aW5nU3RvcmVOYW1lID0gX2ZpbmRLZXkodGhpcy5zdG9yZXMsIGZ1bmN0aW9uICh2YWwpIHtcbiAgICAgICAgICAgIHJldHVybiB2YWwgPT09IHN0b3JlO1xuICAgICAgICB9KTtcblxuICAgICAgICBpZiAoc3RvcmVzLmluZGV4T2Yod2FpdGluZ1N0b3JlTmFtZSkgPiAtMSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdBIHN0b3JlIGNhbm5vdCB3YWl0IG9uIGl0c2VsZicpO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGRpc3BhdGNoID0gdGhpcy5jdXJyZW50RGlzcGF0Y2hbd2FpdGluZ1N0b3JlTmFtZV07XG5cbiAgICAgICAgaWYgKGRpc3BhdGNoLndhaXRpbmdPbi5sZW5ndGgpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcih3YWl0aW5nU3RvcmVOYW1lICsgJyBhbHJlYWR5IHdhaXRpbmcgb24gc3RvcmVzJyk7XG4gICAgICAgIH1cblxuICAgICAgICBfZWFjaChzdG9yZXMsIGZ1bmN0aW9uIChzdG9yZU5hbWUpIHtcbiAgICAgICAgICAgIHZhciBzdG9yZURpc3BhdGNoID0gdGhpcy5jdXJyZW50RGlzcGF0Y2hbc3RvcmVOYW1lXTtcbiAgICAgICAgICAgIGlmICghdGhpcy5zdG9yZXNbc3RvcmVOYW1lXSkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignQ2Fubm90IHdhaXQgZm9yIG5vbi1leGlzdGVudCBzdG9yZSAnICsgc3RvcmVOYW1lKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChzdG9yZURpc3BhdGNoLndhaXRpbmdPbi5pbmRleE9mKHdhaXRpbmdTdG9yZU5hbWUpID4gLTEpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0NpcmN1bGFyIHdhaXQgZGV0ZWN0ZWQgYmV0d2VlbiAnICsgd2FpdGluZ1N0b3JlTmFtZSArICcgYW5kICcgKyBzdG9yZU5hbWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCB0aGlzKTtcblxuICAgICAgICBkaXNwYXRjaC5yZXNvbHZlZCA9IGZhbHNlO1xuICAgICAgICBkaXNwYXRjaC53YWl0aW5nT24gPSBfdW5pcShkaXNwYXRjaC53YWl0aW5nT24uY29uY2F0KHN0b3JlcykpO1xuICAgICAgICBkaXNwYXRjaC53YWl0Q2FsbGJhY2sgPSBmbjtcbiAgICB9O1xuXG4gICAgdmFyIGNvcmVfRGlzcGF0Y2hlcl9fZGlzcGF0Y2hlciA9IG5ldyBEaXNwYXRjaGVyKCk7XG4gICAgdmFyIGNvcmVfRGlzcGF0Y2hlciA9IGNvcmVfRGlzcGF0Y2hlcl9fZGlzcGF0Y2hlcjtcblxuICAgIHZhciBCYXNlU3RvcmUgPSAoZnVuY3Rpb24gKF9FdmVudEVtaXR0ZXIzKSB7XG4gICAgICAgIGZ1bmN0aW9uIEJhc2VTdG9yZSgpIHtcbiAgICAgICAgICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBCYXNlU3RvcmUpO1xuXG4gICAgICAgICAgICBfZ2V0KE9iamVjdC5nZXRQcm90b3R5cGVPZihCYXNlU3RvcmUucHJvdG90eXBlKSwgJ2NvbnN0cnVjdG9yJywgdGhpcykuY2FsbCh0aGlzKTtcblxuICAgICAgICAgICAgdGhpcy5fX2FjdGlvbnNfXyA9IHt9O1xuICAgICAgICAgICAgY29yZV9EaXNwYXRjaGVyLmFkZFN0b3JlKHRoaXMuY29uc3RydWN0b3IubmFtZSwgdGhpcyk7XG4gICAgICAgIH1cblxuICAgICAgICBfaW5oZXJpdHMoQmFzZVN0b3JlLCBfRXZlbnRFbWl0dGVyMyk7XG5cbiAgICAgICAgX2NyZWF0ZUNsYXNzKEJhc2VTdG9yZSwgW3tcbiAgICAgICAgICAgIGtleTogJ2JpbmRBY3Rpb25zJyxcbiAgICAgICAgICAgIHZhbHVlOiBmdW5jdGlvbiBiaW5kQWN0aW9ucygpIHtcbiAgICAgICAgICAgICAgICB2YXIgYWN0aW9ucyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cyk7XG5cbiAgICAgICAgICAgICAgICBpZiAoYWN0aW9ucy5sZW5ndGggPiAxICYmIGFjdGlvbnMubGVuZ3RoICUgMyAhPT0gMCkge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2JpbmRBY3Rpb25zIG51bWJlciBvZiBhcmd1bWVudHMgbXVzdCBiZSBkaXZpc2libGUgd2l0aCAzLicpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHZhciBiaW5kQWN0aW9uID0gKGZ1bmN0aW9uICh0eXBlLCBoYW5kbGVyLCBkZXBlbmRlbmNpZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFoYW5kbGVyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RoZSBoYW5kbGVyIGZvciBhY3Rpb24gdHlwZSAnICsgdHlwZSArICcgaXMgZmFsc3knKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHZhciBkZXBlbmRlbmN5TmFtZXMgPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBkZXBlbmRlbmNpZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlcGVuZGVuY3lOYW1lcy5wdXNoKGRlcGVuZGVuY2llc1tpXS5jb25zdHJ1Y3Rvci5uYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX19hY3Rpb25zX19bdHlwZV0gPSB7IGhhbmRsZXI6IGhhbmRsZXIsIGRlcGVuZGVuY2llczogZGVwZW5kZW5jeU5hbWVzIH07XG4gICAgICAgICAgICAgICAgfSkuYmluZCh0aGlzKTtcblxuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYWN0aW9ucy5sZW5ndGg7IGkgKz0gMykge1xuICAgICAgICAgICAgICAgICAgICB2YXIgdHlwZSA9IGFjdGlvbnNbaV0sXG4gICAgICAgICAgICAgICAgICAgICAgICBoYW5kbGVyID0gYWN0aW9uc1tpICsgMV0sXG4gICAgICAgICAgICAgICAgICAgICAgICBkZXBlbmRlbmNpZXMgPSBhY3Rpb25zW2kgKyAyXTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoIXR5cGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignQXJndW1lbnQgJyArIChpICsgMSkgKyAnIHRvIGJpbmRBY3Rpb25zIGlzIGEgZmFsc3kgdmFsdWUnKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGJpbmRBY3Rpb24odHlwZSwgaGFuZGxlciwgZGVwZW5kZW5jaWVzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGtleTogJ3dhaXRGb3InLFxuICAgICAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIHdhaXRGb3Ioc3RvcmVzLCBmbikge1xuICAgICAgICAgICAgICAgIGNvcmVfRGlzcGF0Y2hlci53YWl0Rm9yU3RvcmVzKHRoaXMsIHN0b3JlcywgZm4uYmluZCh0aGlzKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGtleTogJ2ludm9rZUhhbmRsZXInLFxuICAgICAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIGludm9rZUhhbmRsZXIoaGFuZGxlciwgYWN0aW9uKSB7XG4gICAgICAgICAgICAgICAgaWYgKF9pc0Z1bmN0aW9uKGhhbmRsZXIpKSB7XG4gICAgICAgICAgICAgICAgICAgIGhhbmRsZXIuY2FsbCh0aGlzLCBhY3Rpb24ucGF5bG9hZCwgYWN0aW9uLnR5cGUpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoaGFuZGxlciAmJiBfaXNGdW5jdGlvbih0aGlzW2hhbmRsZXJdKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzW2hhbmRsZXJdLmNhbGwodGhpcywgYWN0aW9uLnBheWxvYWQsIGFjdGlvbi50eXBlKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RoZSBoYW5kbGVyIGZvciBhY3Rpb24gdHlwZSAnICsgYWN0aW9uLnR5cGUgKyAnIGlzIG5vdCBhIGZ1bmN0aW9uJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBrZXk6ICdlbWl0Q2hhbmdlJyxcbiAgICAgICAgICAgIHZhbHVlOiBmdW5jdGlvbiBlbWl0Q2hhbmdlKCkge1xuICAgICAgICAgICAgICAgIHRoaXMuZW1pdChDb25zdGFudHMuU1RPUkVfQ0hBTkdFKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwge1xuICAgICAgICAgICAga2V5OiAnb25DaGFuZ2UnLFxuICAgICAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIG9uQ2hhbmdlKGZuLCBjdHgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm9uKENvbnN0YW50cy5TVE9SRV9DSEFOR0UsIGZuLCBjdHgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBrZXk6ICdvZmZDaGFuZ2UnLFxuICAgICAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIG9mZkNoYW5nZShmbiwgY3R4KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5vZmYoQ29uc3RhbnRzLlNUT1JFX0NIQU5HRSwgZm4sIGN0eCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGtleTogJ19faGFuZGxlQWN0aW9uX18nLFxuICAgICAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIF9faGFuZGxlQWN0aW9uX18oYWN0aW9uKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX19hY3Rpb25zX18uaGFzT3duUHJvcGVydHkoYWN0aW9uLnR5cGUpKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBoYW5kbGVyID0gdGhpcy5fX2FjdGlvbnNfX1thY3Rpb24udHlwZV0uaGFuZGxlcjtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGRlcGVuZGVuY2llcyA9IHRoaXMuX19hY3Rpb25zX19bYWN0aW9uLnR5cGVdLmRlcGVuZGVuY2llcztcblxuICAgICAgICAgICAgICAgICAgICBpZiAoKGRlcGVuZGVuY2llcyAhPT0gdW5kZWZpbmVkIHx8IGRlcGVuZGVuY2llcyAhPT0gbnVsbCkgJiYgZGVwZW5kZW5jaWVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMud2FpdEZvcihkZXBlbmRlbmNpZXMsIChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuaW52b2tlSGFuZGxlcihoYW5kbGVyLCBhY3Rpb24pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSkuYmluZCh0aGlzKSk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5pbnZva2VIYW5kbGVyKGhhbmRsZXIsIGFjdGlvbik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XSk7XG5cbiAgICAgICAgcmV0dXJuIEJhc2VTdG9yZTtcbiAgICB9KShFdmVudEVtaXR0ZXIpO1xuXG4gICAgdmFyIGNvcmVfQmFzZVN0b3JlID0gQmFzZVN0b3JlO1xuXG4gICAgdmFyIFJvdXRlckNsYXNzX19Sb3V0ZXIgPSAoZnVuY3Rpb24gKCkge1xuICAgICAgICBmdW5jdGlvbiBSb3V0ZXJDbGFzc19fUm91dGVyKCkge1xuICAgICAgICAgICAgdmFyIGRlYnVnID0gYXJndW1lbnRzWzBdID09PSB1bmRlZmluZWQgPyB0cnVlIDogYXJndW1lbnRzWzBdO1xuXG4gICAgICAgICAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgUm91dGVyQ2xhc3NfX1JvdXRlcik7XG5cbiAgICAgICAgICAgIHRoaXMuX3JvdXRlUmVjb2duaXplciA9IG5ldyBSb3V0ZVJlY29nbml6ZXIoKTtcbiAgICAgICAgICAgIHRoaXMuaWQgPSBNYXRoLnJhbmRvbSgpO1xuICAgICAgICAgICAgdGhpcy5kZWJ1ZyA9IGRlYnVnO1xuICAgICAgICAgICAgdGhpcy5fbG9nKCdjcmVhdGluZyBhIG5ldyByb3V0ZXIgb2JqZWN0IE5FVyBDT0RFOicsIHRoaXMuaWQpO1xuICAgICAgICB9XG5cbiAgICAgICAgX2NyZWF0ZUNsYXNzKFJvdXRlckNsYXNzX19Sb3V0ZXIsIFt7XG4gICAgICAgICAgICBrZXk6ICdfbG9nJyxcbiAgICAgICAgICAgIHZhbHVlOiBmdW5jdGlvbiBfbG9nKCkge1xuICAgICAgICAgICAgICAgIGZvciAodmFyIF9sZW4gPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gQXJyYXkoX2xlbiksIF9rZXkgPSAwOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGFyZ3NbX2tleV0gPSBhcmd1bWVudHNbX2tleV07XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZGVidWcpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cuYXBwbHkoY29uc29sZSwgYXJncyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBrZXk6ICdhZGREZWZhdWx0Um91dGUnLFxuICAgICAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIGFkZERlZmF1bHRSb3V0ZShyb3V0ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2RlZmF1bHRSb3V0ZSA9IHJvdXRlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBrZXk6ICdhZGRSb3V0ZScsXG4gICAgICAgICAgICB2YWx1ZTogZnVuY3Rpb24gYWRkUm91dGUocm91dGUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9hZGRSb3V0ZVJlYyhyb3V0ZSwgW10pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBrZXk6ICdfYWRkUm91dGVSZWMnLFxuICAgICAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIF9hZGRSb3V0ZVJlYyhyb3V0ZSwgc3RhcnRBcnIpIHtcbiAgICAgICAgICAgICAgICBpZiAoIXJvdXRlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB2YXIgaW5wdXRSb3V0ZXMgPSBBcnJheS5pc0FycmF5KHJvdXRlKSA/IHJvdXRlIDogW3JvdXRlXTtcblxuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgaW5wdXRSb3V0ZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGxvY2FsU3RhcnQgPSBzdGFydEFyci5zbGljZSgwKTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHIgPSBpbnB1dFJvdXRlc1tpXTtcbiAgICAgICAgICAgICAgICAgICAgbG9jYWxTdGFydC5wdXNoKHsgcGF0aDogci5wYXRoLCBoYW5kbGVyOiByIH0pO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9yb3V0ZVJlY29nbml6ZXIuYWRkKGxvY2FsU3RhcnQpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9hZGRSb3V0ZVJlYyhyLnJvdXRlLCBsb2NhbFN0YXJ0KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGtleTogJ3N0YXJ0JyxcbiAgICAgICAgICAgIHZhbHVlOiBmdW5jdGlvbiBzdGFydCgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9sb2coJ1JvdXRlciBzdGFydGVkJyk7XG5cbiAgICAgICAgICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncG9wc3RhdGUnLCB0aGlzLl9vblBvcFN0YXRlLmJpbmQodGhpcykpO1xuICAgICAgICAgICAgICAgIHRoaXMuaGFuZGxlTmV3U3RhdGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwge1xuICAgICAgICAgICAga2V5OiAnX29uUG9wU3RhdGUnLFxuXG4gICAgICAgICAgICAvKlxuICAgICAgICAgICAgR2x1LlJvdXRlci5hZGRSb3V0ZSh7XG4gICAgICAgICAgICAgIHBhdGg6ICcvY2F0ZWdvcnknLFxuICAgICAgICAgICAgICBjb250cm9sbGVyOiBNYWluSGFuZGxlcixcbiAgICAgICAgICAgICAgdmlldzogTWFpblZpZXcsXG4gICAgICAgICAgICAgIHJvdXRlIDogW3tcbiAgICAgICAgICAgICAgICAgIHBhdGg6IFwiL2VkaXRcIixcbiAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6IEhvbWVIYW5kbGVyLFxuICAgICAgICAgICAgICAgICAgdmlldzogSG9tZVZpZXcsXG4gICAgICAgICAgICAgICAgICByb3V0ZTogW3tcbiAgICAgICAgICAgICAgICAgICAgcGF0aDogXCJzZXR0aW5nc1wiLFxuICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyIDogU2V0dGluZ3NIYW5kbGVyXG4gICAgICAgICAgICAgICAgICAgIHZpZXc6IFNldHRpbmdzVmlldyxcbiAgICAgICAgICAgICAgICAgIH0se1xuICAgICAgICAgICAgICAgICAgICBwYXRoOiBcImluYm94XCIsXG4gICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6IEluYm94SGFuZGxlcixcbiAgICAgICAgICAgICAgICAgICAgdmlldzogSW5ib3hWaWV3XG4gICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgcGF0aDogJy9uZXcnLFxuICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjogTmV3Q29udHJvbGxlclxuICAgICAgICAgICAgICAgICB9XVxuICAgICAgICAgICAgICB9XVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICBNYWluSGFuZGxlciAtPiBIb21lSGFuZGxlciAtPiBTZXR0aW5nc0hhbmRsZXJcbiAgICAgICAgICAgICAvaG9tZS9zZXR0aW5nc1xuICAgICAgICAgICAgIEdsdS5Sb3V0ZXIuYWRkUm91dGUoeyBwYXRoOiBcIi9tb2JpbGVcIn0pO1xuICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIHZhbHVlOiBmdW5jdGlvbiBfb25Qb3BTdGF0ZShlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5oYW5kbGVOZXdTdGF0ZShlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwge1xuICAgICAgICAgICAga2V5OiAnX3ByaW50SGFuZGxlclRyZWUnLFxuICAgICAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIF9wcmludEhhbmRsZXJUcmVlKHRyZWUpIHtcbiAgICAgICAgICAgICAgICB2YXIgc3RyID0gJyc7XG4gICAgICAgICAgICAgICAgdmFyIGluZGVudCA9ICcnO1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdHJlZS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBzdHIgKz0gJ1xcbicgKyBpbmRlbnQgKyAnK1snICsgaSArICddICcgKyB0cmVlW2ldLmhhbmRsZXIuY29udHJvbGxlci5uYW1lO1xuICAgICAgICAgICAgICAgICAgICBpbmRlbnQgKz0gJyAgICc7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHN0cjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwge1xuICAgICAgICAgICAga2V5OiAnX2ludm9rZUhhbmRsZXJzJyxcbiAgICAgICAgICAgIHZhbHVlOiBmdW5jdGlvbiBfaW52b2tlSGFuZGxlcnMobmV3SGFuZGxlcnMsIGUpIHtcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuX2FwcGxpZWRIYW5kbGVycykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9hcHBsaWVkSGFuZGxlcnMgPSBbXTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB2YXIgbGVuID0gTWF0aC5taW4odGhpcy5fYXBwbGllZEhhbmRsZXJzLmxlbmd0aCwgbmV3SGFuZGxlcnMubGVuZ3RoKTtcbiAgICAgICAgICAgICAgICB2YXIgZGlmZkluZGV4ID0gMDtcbiAgICAgICAgICAgICAgICB2YXIgbmV3QXBwbGllZENvbnRyb2xsZXJzID0gW107XG5cbiAgICAgICAgICAgICAgICB0aGlzLl9sb2coJ0N1cnJlbnQgaGFuZGxlcnM6JywgMTIzLCAnYXJlJywgJ3NvbWV0aGluZycpO1xuICAgICAgICAgICAgICAgIHRoaXMuX2xvZyh0aGlzLl9wcmludEhhbmRsZXJUcmVlKHRoaXMuX2FwcGxpZWRIYW5kbGVycykpO1xuICAgICAgICAgICAgICAgIHRoaXMuX2xvZygnTmV3IGhhbmRsZXJzOicpO1xuICAgICAgICAgICAgICAgIHRoaXMuX2xvZyh0aGlzLl9wcmludEhhbmRsZXJUcmVlKG5ld0hhbmRsZXJzKSk7XG5cbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGRpZmZJbmRleCA9IGk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChuZXdIYW5kbGVyc1tpXS5oYW5kbGVyLmNvbnRyb2xsZXIgIT09IHRoaXMuX2FwcGxpZWRIYW5kbGVyc1tpXS5oYW5kbGVyLmNvbnRyb2xsZXIgfHwgIWRlZXBFcXVhbChuZXdIYW5kbGVyc1tpXS5wYXJhbXMsIHRoaXMuX2FwcGxpZWRIYW5kbGVyc1tpXS5wYXJhbXMpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRoaXMuX2xvZygnRGlmZiBpbmRleCBpcyAnICsgZGlmZkluZGV4ICsgJyBzdGFydGluZyBmcm9tICcgKyBkaWZmSW5kZXgpO1xuXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IGRpZmZJbmRleDsgaSA8IHRoaXMuX2FwcGxpZWRIYW5kbGVycy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fYXBwbGllZEhhbmRsZXJzW2ldLmNvbnRyb2xsZXIuZGVzdHJveSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fYXBwbGllZEhhbmRsZXJzW2ldLmNvbnRyb2xsZXIuZGVzdHJveSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdGhpcy5fYXBwbGllZEhhbmRsZXJzLnNwbGljZShkaWZmSW5kZXgpO1xuXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IGRpZmZJbmRleDsgaSA8IG5ld0hhbmRsZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciByZXN1bHQgPSBuZXdIYW5kbGVyc1tpXS5oYW5kbGVyO1xuICAgICAgICAgICAgICAgICAgICB2YXIgcGFyYW1zID0gbmV3SGFuZGxlcnNbaV0ucGFyYW1zO1xuICAgICAgICAgICAgICAgICAgICB2YXIgY29udHJvbGxlciA9IHRoaXMuaW52b2tlSGFuZGxlcihyZXN1bHQsIGUsIHBhcmFtcyk7XG5cbiAgICAgICAgICAgICAgICAgICAgbmV3QXBwbGllZENvbnRyb2xsZXJzLnB1c2goeyBjb250cm9sbGVyOiBjb250cm9sbGVyLCBoYW5kbGVyOiByZXN1bHQsIHBhcmFtczogcGFyYW1zIH0pO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRoaXMuX2FwcGxpZWRIYW5kbGVycyA9IHRoaXMuX2FwcGxpZWRIYW5kbGVycy5jb25jYXQobmV3QXBwbGllZENvbnRyb2xsZXJzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwge1xuICAgICAgICAgICAga2V5OiAnaW52b2tlSGFuZGxlcicsXG4gICAgICAgICAgICB2YWx1ZTogZnVuY3Rpb24gaW52b2tlSGFuZGxlcihoYW5kbGVyLCBlLCBwYXJhbXMpIHtcbiAgICAgICAgICAgICAgICB2YXIgdmlldyA9IG5ldyBoYW5kbGVyLnZpZXcoZG9jdW1lbnQuYm9keSwgaGFuZGxlci52aWV3U2VsZWN0b3IpO1xuICAgICAgICAgICAgICAgIHZhciBjb250cm9sbGVyID0gbmV3IGhhbmRsZXIuY29udHJvbGxlcih2aWV3LCBwYXJhbXMpO1xuICAgICAgICAgICAgICAgIHRoaXMuX2xvZygnaW52b2tpbmcgaGFuZGxlcicsIGhhbmRsZXIsIGUsIGNvbnRyb2xsZXIpO1xuXG4gICAgICAgICAgICAgICAgdmlldy5yZW5kZXIoKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gY29udHJvbGxlcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwge1xuICAgICAgICAgICAga2V5OiAnaGFuZGxlTmV3U3RhdGUnLFxuICAgICAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIGhhbmRsZU5ld1N0YXRlKGUpIHtcbiAgICAgICAgICAgICAgICB2YXIgcmVzdWx0cyA9IHRoaXMuX3JvdXRlUmVjb2duaXplci5yZWNvZ25pemUod2luZG93LmxvY2F0aW9uLnBhdGhuYW1lKTtcblxuICAgICAgICAgICAgICAgIGlmIChyZXN1bHRzKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2ludm9rZUhhbmRsZXJzKHJlc3VsdHMsIGUpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2xvZygnbm8gcm91dGVzIG1hdGNoZWQhJyk7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9kZWZhdWx0Um91dGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaW52b2tlSGFuZGxlcih0aGlzLl9kZWZhdWx0Um91dGUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBrZXk6ICduYXZpZ2F0ZVRvJyxcbiAgICAgICAgICAgIHZhbHVlOiBmdW5jdGlvbiBuYXZpZ2F0ZVRvKHBhdGgpIHtcbiAgICAgICAgICAgICAgICB3aW5kb3cuaGlzdG9yeS5wdXNoU3RhdGUoeyBzb21lU3RhdGU6IDEgfSwgcGF0aCwgcGF0aCk7XG4gICAgICAgICAgICAgICAgdGhpcy5oYW5kbGVOZXdTdGF0ZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBrZXk6ICdiYWNrJyxcbiAgICAgICAgICAgIHZhbHVlOiBmdW5jdGlvbiBiYWNrKCkge31cbiAgICAgICAgfSwge1xuICAgICAgICAgICAga2V5OiAnZm9yd2FyZCcsXG4gICAgICAgICAgICB2YWx1ZTogZnVuY3Rpb24gZm9yd2FyZCgpIHt9XG4gICAgICAgIH1dKTtcblxuICAgICAgICByZXR1cm4gUm91dGVyQ2xhc3NfX1JvdXRlcjtcbiAgICB9KSgpO1xuXG4gICAgdmFyIFJvdXRlckNsYXNzID0gUm91dGVyQ2xhc3NfX1JvdXRlcjtcblxuICAgIHZhciBHTFUgPSAoZnVuY3Rpb24gKCkge1xuICAgICAgICBmdW5jdGlvbiBHTFUoKSB7XG4gICAgICAgICAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgR0xVKTtcbiAgICAgICAgfVxuXG4gICAgICAgIF9jcmVhdGVDbGFzcyhHTFUsIFt7XG4gICAgICAgICAgICBrZXk6ICdjb25zdGFudHMnLFxuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIENvbnN0YW50cztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwge1xuICAgICAgICAgICAga2V5OiAnYnVzJyxcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBFdmVudGJ1cztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwge1xuICAgICAgICAgICAga2V5OiAnZGlzcGF0Y2hlcicsXG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fZGlzcGF0Y2hlcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwge1xuICAgICAgICAgICAga2V5OiAnUm91dGVyJyxcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBSb3V0ZXJDbGFzcztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwge1xuICAgICAgICAgICAga2V5OiAnVmlldycsXG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gY29yZV9CYXNlVmlldztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwge1xuICAgICAgICAgICAga2V5OiAnVmlld0NvbnRyb2xsZXInLFxuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvcmVfQmFzZVZpZXdDb250cm9sbGVyO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBrZXk6ICdBY3Rpb24nLFxuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvcmVfQmFzZUFjdGlvbjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwge1xuICAgICAgICAgICAga2V5OiAnU3RvcmUnLFxuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvcmVfQmFzZVN0b3JlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XSk7XG5cbiAgICAgICAgcmV0dXJuIEdMVTtcbiAgICB9KSgpO1xuXG4gICAgdmFyIGdsdSA9IG5ldyBHTFUoKTtcbiAgICB2YXIgaW5kZXggPSBnbHU7XG5cbiAgICByZXR1cm4gaW5kZXg7XG59KTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPS4vZ2x1LWRpc3QuanMubWFwIiwidmFyIHBTbGljZSA9IEFycmF5LnByb3RvdHlwZS5zbGljZTtcbnZhciBvYmplY3RLZXlzID0gcmVxdWlyZSgnLi9saWIva2V5cy5qcycpO1xudmFyIGlzQXJndW1lbnRzID0gcmVxdWlyZSgnLi9saWIvaXNfYXJndW1lbnRzLmpzJyk7XG5cbnZhciBkZWVwRXF1YWwgPSBtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChhY3R1YWwsIGV4cGVjdGVkLCBvcHRzKSB7XG4gIGlmICghb3B0cykgb3B0cyA9IHt9O1xuICAvLyA3LjEuIEFsbCBpZGVudGljYWwgdmFsdWVzIGFyZSBlcXVpdmFsZW50LCBhcyBkZXRlcm1pbmVkIGJ5ID09PS5cbiAgaWYgKGFjdHVhbCA9PT0gZXhwZWN0ZWQpIHtcbiAgICByZXR1cm4gdHJ1ZTtcblxuICB9IGVsc2UgaWYgKGFjdHVhbCBpbnN0YW5jZW9mIERhdGUgJiYgZXhwZWN0ZWQgaW5zdGFuY2VvZiBEYXRlKSB7XG4gICAgcmV0dXJuIGFjdHVhbC5nZXRUaW1lKCkgPT09IGV4cGVjdGVkLmdldFRpbWUoKTtcblxuICAvLyA3LjMuIE90aGVyIHBhaXJzIHRoYXQgZG8gbm90IGJvdGggcGFzcyB0eXBlb2YgdmFsdWUgPT0gJ29iamVjdCcsXG4gIC8vIGVxdWl2YWxlbmNlIGlzIGRldGVybWluZWQgYnkgPT0uXG4gIH0gZWxzZSBpZiAodHlwZW9mIGFjdHVhbCAhPSAnb2JqZWN0JyAmJiB0eXBlb2YgZXhwZWN0ZWQgIT0gJ29iamVjdCcpIHtcbiAgICByZXR1cm4gb3B0cy5zdHJpY3QgPyBhY3R1YWwgPT09IGV4cGVjdGVkIDogYWN0dWFsID09IGV4cGVjdGVkO1xuXG4gIC8vIDcuNC4gRm9yIGFsbCBvdGhlciBPYmplY3QgcGFpcnMsIGluY2x1ZGluZyBBcnJheSBvYmplY3RzLCBlcXVpdmFsZW5jZSBpc1xuICAvLyBkZXRlcm1pbmVkIGJ5IGhhdmluZyB0aGUgc2FtZSBudW1iZXIgb2Ygb3duZWQgcHJvcGVydGllcyAoYXMgdmVyaWZpZWRcbiAgLy8gd2l0aCBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwpLCB0aGUgc2FtZSBzZXQgb2Yga2V5c1xuICAvLyAoYWx0aG91Z2ggbm90IG5lY2Vzc2FyaWx5IHRoZSBzYW1lIG9yZGVyKSwgZXF1aXZhbGVudCB2YWx1ZXMgZm9yIGV2ZXJ5XG4gIC8vIGNvcnJlc3BvbmRpbmcga2V5LCBhbmQgYW4gaWRlbnRpY2FsICdwcm90b3R5cGUnIHByb3BlcnR5LiBOb3RlOiB0aGlzXG4gIC8vIGFjY291bnRzIGZvciBib3RoIG5hbWVkIGFuZCBpbmRleGVkIHByb3BlcnRpZXMgb24gQXJyYXlzLlxuICB9IGVsc2Uge1xuICAgIHJldHVybiBvYmpFcXVpdihhY3R1YWwsIGV4cGVjdGVkLCBvcHRzKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBpc1VuZGVmaW5lZE9yTnVsbCh2YWx1ZSkge1xuICByZXR1cm4gdmFsdWUgPT09IG51bGwgfHwgdmFsdWUgPT09IHVuZGVmaW5lZDtcbn1cblxuZnVuY3Rpb24gaXNCdWZmZXIgKHgpIHtcbiAgaWYgKCF4IHx8IHR5cGVvZiB4ICE9PSAnb2JqZWN0JyB8fCB0eXBlb2YgeC5sZW5ndGggIT09ICdudW1iZXInKSByZXR1cm4gZmFsc2U7XG4gIGlmICh0eXBlb2YgeC5jb3B5ICE9PSAnZnVuY3Rpb24nIHx8IHR5cGVvZiB4LnNsaWNlICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIGlmICh4Lmxlbmd0aCA+IDAgJiYgdHlwZW9mIHhbMF0gIT09ICdudW1iZXInKSByZXR1cm4gZmFsc2U7XG4gIHJldHVybiB0cnVlO1xufVxuXG5mdW5jdGlvbiBvYmpFcXVpdihhLCBiLCBvcHRzKSB7XG4gIHZhciBpLCBrZXk7XG4gIGlmIChpc1VuZGVmaW5lZE9yTnVsbChhKSB8fCBpc1VuZGVmaW5lZE9yTnVsbChiKSlcbiAgICByZXR1cm4gZmFsc2U7XG4gIC8vIGFuIGlkZW50aWNhbCAncHJvdG90eXBlJyBwcm9wZXJ0eS5cbiAgaWYgKGEucHJvdG90eXBlICE9PSBiLnByb3RvdHlwZSkgcmV0dXJuIGZhbHNlO1xuICAvL35+fkkndmUgbWFuYWdlZCB0byBicmVhayBPYmplY3Qua2V5cyB0aHJvdWdoIHNjcmV3eSBhcmd1bWVudHMgcGFzc2luZy5cbiAgLy8gICBDb252ZXJ0aW5nIHRvIGFycmF5IHNvbHZlcyB0aGUgcHJvYmxlbS5cbiAgaWYgKGlzQXJndW1lbnRzKGEpKSB7XG4gICAgaWYgKCFpc0FyZ3VtZW50cyhiKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBhID0gcFNsaWNlLmNhbGwoYSk7XG4gICAgYiA9IHBTbGljZS5jYWxsKGIpO1xuICAgIHJldHVybiBkZWVwRXF1YWwoYSwgYiwgb3B0cyk7XG4gIH1cbiAgaWYgKGlzQnVmZmVyKGEpKSB7XG4gICAgaWYgKCFpc0J1ZmZlcihiKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBpZiAoYS5sZW5ndGggIT09IGIubGVuZ3RoKSByZXR1cm4gZmFsc2U7XG4gICAgZm9yIChpID0gMDsgaSA8IGEubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmIChhW2ldICE9PSBiW2ldKSByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIHRyeSB7XG4gICAgdmFyIGthID0gb2JqZWN0S2V5cyhhKSxcbiAgICAgICAga2IgPSBvYmplY3RLZXlzKGIpO1xuICB9IGNhdGNoIChlKSB7Ly9oYXBwZW5zIHdoZW4gb25lIGlzIGEgc3RyaW5nIGxpdGVyYWwgYW5kIHRoZSBvdGhlciBpc24ndFxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICAvLyBoYXZpbmcgdGhlIHNhbWUgbnVtYmVyIG9mIG93bmVkIHByb3BlcnRpZXMgKGtleXMgaW5jb3Jwb3JhdGVzXG4gIC8vIGhhc093blByb3BlcnR5KVxuICBpZiAoa2EubGVuZ3RoICE9IGtiLmxlbmd0aClcbiAgICByZXR1cm4gZmFsc2U7XG4gIC8vdGhlIHNhbWUgc2V0IG9mIGtleXMgKGFsdGhvdWdoIG5vdCBuZWNlc3NhcmlseSB0aGUgc2FtZSBvcmRlciksXG4gIGthLnNvcnQoKTtcbiAga2Iuc29ydCgpO1xuICAvL35+fmNoZWFwIGtleSB0ZXN0XG4gIGZvciAoaSA9IGthLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgaWYgKGthW2ldICE9IGtiW2ldKVxuICAgICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIC8vZXF1aXZhbGVudCB2YWx1ZXMgZm9yIGV2ZXJ5IGNvcnJlc3BvbmRpbmcga2V5LCBhbmRcbiAgLy9+fn5wb3NzaWJseSBleHBlbnNpdmUgZGVlcCB0ZXN0XG4gIGZvciAoaSA9IGthLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAga2V5ID0ga2FbaV07XG4gICAgaWYgKCFkZWVwRXF1YWwoYVtrZXldLCBiW2tleV0sIG9wdHMpKSByZXR1cm4gZmFsc2U7XG4gIH1cbiAgcmV0dXJuIHR5cGVvZiBhID09PSB0eXBlb2YgYjtcbn1cbiIsInZhciBzdXBwb3J0c0FyZ3VtZW50c0NsYXNzID0gKGZ1bmN0aW9uKCl7XG4gIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoYXJndW1lbnRzKVxufSkoKSA9PSAnW29iamVjdCBBcmd1bWVudHNdJztcblxuZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gc3VwcG9ydHNBcmd1bWVudHNDbGFzcyA/IHN1cHBvcnRlZCA6IHVuc3VwcG9ydGVkO1xuXG5leHBvcnRzLnN1cHBvcnRlZCA9IHN1cHBvcnRlZDtcbmZ1bmN0aW9uIHN1cHBvcnRlZChvYmplY3QpIHtcbiAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvYmplY3QpID09ICdbb2JqZWN0IEFyZ3VtZW50c10nO1xufTtcblxuZXhwb3J0cy51bnN1cHBvcnRlZCA9IHVuc3VwcG9ydGVkO1xuZnVuY3Rpb24gdW5zdXBwb3J0ZWQob2JqZWN0KXtcbiAgcmV0dXJuIG9iamVjdCAmJlxuICAgIHR5cGVvZiBvYmplY3QgPT0gJ29iamVjdCcgJiZcbiAgICB0eXBlb2Ygb2JqZWN0Lmxlbmd0aCA9PSAnbnVtYmVyJyAmJlxuICAgIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsICdjYWxsZWUnKSAmJlxuICAgICFPYmplY3QucHJvdG90eXBlLnByb3BlcnR5SXNFbnVtZXJhYmxlLmNhbGwob2JqZWN0LCAnY2FsbGVlJykgfHxcbiAgICBmYWxzZTtcbn07XG4iLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSB0eXBlb2YgT2JqZWN0LmtleXMgPT09ICdmdW5jdGlvbidcbiAgPyBPYmplY3Qua2V5cyA6IHNoaW07XG5cbmV4cG9ydHMuc2hpbSA9IHNoaW07XG5mdW5jdGlvbiBzaGltIChvYmopIHtcbiAgdmFyIGtleXMgPSBbXTtcbiAgZm9yICh2YXIga2V5IGluIG9iaikga2V5cy5wdXNoKGtleSk7XG4gIHJldHVybiBrZXlzO1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIFJlcHJlc2VudGF0aW9uIG9mIGEgc2luZ2xlIEV2ZW50RW1pdHRlciBmdW5jdGlvbi5cbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBFdmVudCBoYW5kbGVyIHRvIGJlIGNhbGxlZC5cbiAqIEBwYXJhbSB7TWl4ZWR9IGNvbnRleHQgQ29udGV4dCBmb3IgZnVuY3Rpb24gZXhlY3V0aW9uLlxuICogQHBhcmFtIHtCb29sZWFufSBvbmNlIE9ubHkgZW1pdCBvbmNlXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gRUUoZm4sIGNvbnRleHQsIG9uY2UpIHtcbiAgdGhpcy5mbiA9IGZuO1xuICB0aGlzLmNvbnRleHQgPSBjb250ZXh0O1xuICB0aGlzLm9uY2UgPSBvbmNlIHx8IGZhbHNlO1xufVxuXG4vKipcbiAqIE1pbmltYWwgRXZlbnRFbWl0dGVyIGludGVyZmFjZSB0aGF0IGlzIG1vbGRlZCBhZ2FpbnN0IHRoZSBOb2RlLmpzXG4gKiBFdmVudEVtaXR0ZXIgaW50ZXJmYWNlLlxuICpcbiAqIEBjb25zdHJ1Y3RvclxuICogQGFwaSBwdWJsaWNcbiAqL1xuZnVuY3Rpb24gRXZlbnRFbWl0dGVyKCkgeyAvKiBOb3RoaW5nIHRvIHNldCAqLyB9XG5cbi8qKlxuICogSG9sZHMgdGhlIGFzc2lnbmVkIEV2ZW50RW1pdHRlcnMgYnkgbmFtZS5cbiAqXG4gKiBAdHlwZSB7T2JqZWN0fVxuICogQHByaXZhdGVcbiAqL1xuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5fZXZlbnRzID0gdW5kZWZpbmVkO1xuXG4vKipcbiAqIFJldHVybiBhIGxpc3Qgb2YgYXNzaWduZWQgZXZlbnQgbGlzdGVuZXJzLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudCBUaGUgZXZlbnRzIHRoYXQgc2hvdWxkIGJlIGxpc3RlZC5cbiAqIEByZXR1cm5zIHtBcnJheX1cbiAqIEBhcGkgcHVibGljXG4gKi9cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUubGlzdGVuZXJzID0gZnVuY3Rpb24gbGlzdGVuZXJzKGV2ZW50KSB7XG4gIGlmICghdGhpcy5fZXZlbnRzIHx8ICF0aGlzLl9ldmVudHNbZXZlbnRdKSByZXR1cm4gW107XG4gIGlmICh0aGlzLl9ldmVudHNbZXZlbnRdLmZuKSByZXR1cm4gW3RoaXMuX2V2ZW50c1tldmVudF0uZm5dO1xuXG4gIGZvciAodmFyIGkgPSAwLCBsID0gdGhpcy5fZXZlbnRzW2V2ZW50XS5sZW5ndGgsIGVlID0gbmV3IEFycmF5KGwpOyBpIDwgbDsgaSsrKSB7XG4gICAgZWVbaV0gPSB0aGlzLl9ldmVudHNbZXZlbnRdW2ldLmZuO1xuICB9XG5cbiAgcmV0dXJuIGVlO1xufTtcblxuLyoqXG4gKiBFbWl0IGFuIGV2ZW50IHRvIGFsbCByZWdpc3RlcmVkIGV2ZW50IGxpc3RlbmVycy5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnQgVGhlIG5hbWUgb2YgdGhlIGV2ZW50LlxuICogQHJldHVybnMge0Jvb2xlYW59IEluZGljYXRpb24gaWYgd2UndmUgZW1pdHRlZCBhbiBldmVudC5cbiAqIEBhcGkgcHVibGljXG4gKi9cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuZW1pdCA9IGZ1bmN0aW9uIGVtaXQoZXZlbnQsIGExLCBhMiwgYTMsIGE0LCBhNSkge1xuICBpZiAoIXRoaXMuX2V2ZW50cyB8fCAhdGhpcy5fZXZlbnRzW2V2ZW50XSkgcmV0dXJuIGZhbHNlO1xuXG4gIHZhciBsaXN0ZW5lcnMgPSB0aGlzLl9ldmVudHNbZXZlbnRdXG4gICAgLCBsZW4gPSBhcmd1bWVudHMubGVuZ3RoXG4gICAgLCBhcmdzXG4gICAgLCBpO1xuXG4gIGlmICgnZnVuY3Rpb24nID09PSB0eXBlb2YgbGlzdGVuZXJzLmZuKSB7XG4gICAgaWYgKGxpc3RlbmVycy5vbmNlKSB0aGlzLnJlbW92ZUxpc3RlbmVyKGV2ZW50LCBsaXN0ZW5lcnMuZm4sIHRydWUpO1xuXG4gICAgc3dpdGNoIChsZW4pIHtcbiAgICAgIGNhc2UgMTogcmV0dXJuIGxpc3RlbmVycy5mbi5jYWxsKGxpc3RlbmVycy5jb250ZXh0KSwgdHJ1ZTtcbiAgICAgIGNhc2UgMjogcmV0dXJuIGxpc3RlbmVycy5mbi5jYWxsKGxpc3RlbmVycy5jb250ZXh0LCBhMSksIHRydWU7XG4gICAgICBjYXNlIDM6IHJldHVybiBsaXN0ZW5lcnMuZm4uY2FsbChsaXN0ZW5lcnMuY29udGV4dCwgYTEsIGEyKSwgdHJ1ZTtcbiAgICAgIGNhc2UgNDogcmV0dXJuIGxpc3RlbmVycy5mbi5jYWxsKGxpc3RlbmVycy5jb250ZXh0LCBhMSwgYTIsIGEzKSwgdHJ1ZTtcbiAgICAgIGNhc2UgNTogcmV0dXJuIGxpc3RlbmVycy5mbi5jYWxsKGxpc3RlbmVycy5jb250ZXh0LCBhMSwgYTIsIGEzLCBhNCksIHRydWU7XG4gICAgICBjYXNlIDY6IHJldHVybiBsaXN0ZW5lcnMuZm4uY2FsbChsaXN0ZW5lcnMuY29udGV4dCwgYTEsIGEyLCBhMywgYTQsIGE1KSwgdHJ1ZTtcbiAgICB9XG5cbiAgICBmb3IgKGkgPSAxLCBhcmdzID0gbmV3IEFycmF5KGxlbiAtMSk7IGkgPCBsZW47IGkrKykge1xuICAgICAgYXJnc1tpIC0gMV0gPSBhcmd1bWVudHNbaV07XG4gICAgfVxuXG4gICAgbGlzdGVuZXJzLmZuLmFwcGx5KGxpc3RlbmVycy5jb250ZXh0LCBhcmdzKTtcbiAgfSBlbHNlIHtcbiAgICB2YXIgbGVuZ3RoID0gbGlzdGVuZXJzLmxlbmd0aFxuICAgICAgLCBqO1xuXG4gICAgZm9yIChpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAobGlzdGVuZXJzW2ldLm9uY2UpIHRoaXMucmVtb3ZlTGlzdGVuZXIoZXZlbnQsIGxpc3RlbmVyc1tpXS5mbiwgdHJ1ZSk7XG5cbiAgICAgIHN3aXRjaCAobGVuKSB7XG4gICAgICAgIGNhc2UgMTogbGlzdGVuZXJzW2ldLmZuLmNhbGwobGlzdGVuZXJzW2ldLmNvbnRleHQpOyBicmVhaztcbiAgICAgICAgY2FzZSAyOiBsaXN0ZW5lcnNbaV0uZm4uY2FsbChsaXN0ZW5lcnNbaV0uY29udGV4dCwgYTEpOyBicmVhaztcbiAgICAgICAgY2FzZSAzOiBsaXN0ZW5lcnNbaV0uZm4uY2FsbChsaXN0ZW5lcnNbaV0uY29udGV4dCwgYTEsIGEyKTsgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgaWYgKCFhcmdzKSBmb3IgKGogPSAxLCBhcmdzID0gbmV3IEFycmF5KGxlbiAtMSk7IGogPCBsZW47IGorKykge1xuICAgICAgICAgICAgYXJnc1tqIC0gMV0gPSBhcmd1bWVudHNbal07XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgbGlzdGVuZXJzW2ldLmZuLmFwcGx5KGxpc3RlbmVyc1tpXS5jb250ZXh0LCBhcmdzKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gdHJ1ZTtcbn07XG5cbi8qKlxuICogUmVnaXN0ZXIgYSBuZXcgRXZlbnRMaXN0ZW5lciBmb3IgdGhlIGdpdmVuIGV2ZW50LlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudCBOYW1lIG9mIHRoZSBldmVudC5cbiAqIEBwYXJhbSB7RnVuY3Rvbn0gZm4gQ2FsbGJhY2sgZnVuY3Rpb24uXG4gKiBAcGFyYW0ge01peGVkfSBjb250ZXh0IFRoZSBjb250ZXh0IG9mIHRoZSBmdW5jdGlvbi5cbiAqIEBhcGkgcHVibGljXG4gKi9cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUub24gPSBmdW5jdGlvbiBvbihldmVudCwgZm4sIGNvbnRleHQpIHtcbiAgdmFyIGxpc3RlbmVyID0gbmV3IEVFKGZuLCBjb250ZXh0IHx8IHRoaXMpO1xuXG4gIGlmICghdGhpcy5fZXZlbnRzKSB0aGlzLl9ldmVudHMgPSB7fTtcbiAgaWYgKCF0aGlzLl9ldmVudHNbZXZlbnRdKSB0aGlzLl9ldmVudHNbZXZlbnRdID0gbGlzdGVuZXI7XG4gIGVsc2Uge1xuICAgIGlmICghdGhpcy5fZXZlbnRzW2V2ZW50XS5mbikgdGhpcy5fZXZlbnRzW2V2ZW50XS5wdXNoKGxpc3RlbmVyKTtcbiAgICBlbHNlIHRoaXMuX2V2ZW50c1tldmVudF0gPSBbXG4gICAgICB0aGlzLl9ldmVudHNbZXZlbnRdLCBsaXN0ZW5lclxuICAgIF07XG4gIH1cblxuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogQWRkIGFuIEV2ZW50TGlzdGVuZXIgdGhhdCdzIG9ubHkgY2FsbGVkIG9uY2UuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50IE5hbWUgb2YgdGhlIGV2ZW50LlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gQ2FsbGJhY2sgZnVuY3Rpb24uXG4gKiBAcGFyYW0ge01peGVkfSBjb250ZXh0IFRoZSBjb250ZXh0IG9mIHRoZSBmdW5jdGlvbi5cbiAqIEBhcGkgcHVibGljXG4gKi9cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUub25jZSA9IGZ1bmN0aW9uIG9uY2UoZXZlbnQsIGZuLCBjb250ZXh0KSB7XG4gIHZhciBsaXN0ZW5lciA9IG5ldyBFRShmbiwgY29udGV4dCB8fCB0aGlzLCB0cnVlKTtcblxuICBpZiAoIXRoaXMuX2V2ZW50cykgdGhpcy5fZXZlbnRzID0ge307XG4gIGlmICghdGhpcy5fZXZlbnRzW2V2ZW50XSkgdGhpcy5fZXZlbnRzW2V2ZW50XSA9IGxpc3RlbmVyO1xuICBlbHNlIHtcbiAgICBpZiAoIXRoaXMuX2V2ZW50c1tldmVudF0uZm4pIHRoaXMuX2V2ZW50c1tldmVudF0ucHVzaChsaXN0ZW5lcik7XG4gICAgZWxzZSB0aGlzLl9ldmVudHNbZXZlbnRdID0gW1xuICAgICAgdGhpcy5fZXZlbnRzW2V2ZW50XSwgbGlzdGVuZXJcbiAgICBdO1xuICB9XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIFJlbW92ZSBldmVudCBsaXN0ZW5lcnMuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50IFRoZSBldmVudCB3ZSB3YW50IHRvIHJlbW92ZS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBsaXN0ZW5lciB0aGF0IHdlIG5lZWQgdG8gZmluZC5cbiAqIEBwYXJhbSB7Qm9vbGVhbn0gb25jZSBPbmx5IHJlbW92ZSBvbmNlIGxpc3RlbmVycy5cbiAqIEBhcGkgcHVibGljXG4gKi9cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUucmVtb3ZlTGlzdGVuZXIgPSBmdW5jdGlvbiByZW1vdmVMaXN0ZW5lcihldmVudCwgZm4sIG9uY2UpIHtcbiAgaWYgKCF0aGlzLl9ldmVudHMgfHwgIXRoaXMuX2V2ZW50c1tldmVudF0pIHJldHVybiB0aGlzO1xuXG4gIHZhciBsaXN0ZW5lcnMgPSB0aGlzLl9ldmVudHNbZXZlbnRdXG4gICAgLCBldmVudHMgPSBbXTtcblxuICBpZiAoZm4pIHtcbiAgICBpZiAobGlzdGVuZXJzLmZuICYmIChsaXN0ZW5lcnMuZm4gIT09IGZuIHx8IChvbmNlICYmICFsaXN0ZW5lcnMub25jZSkpKSB7XG4gICAgICBldmVudHMucHVzaChsaXN0ZW5lcnMpO1xuICAgIH1cbiAgICBpZiAoIWxpc3RlbmVycy5mbikgZm9yICh2YXIgaSA9IDAsIGxlbmd0aCA9IGxpc3RlbmVycy5sZW5ndGg7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgaWYgKGxpc3RlbmVyc1tpXS5mbiAhPT0gZm4gfHwgKG9uY2UgJiYgIWxpc3RlbmVyc1tpXS5vbmNlKSkge1xuICAgICAgICBldmVudHMucHVzaChsaXN0ZW5lcnNbaV0pO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8vXG4gIC8vIFJlc2V0IHRoZSBhcnJheSwgb3IgcmVtb3ZlIGl0IGNvbXBsZXRlbHkgaWYgd2UgaGF2ZSBubyBtb3JlIGxpc3RlbmVycy5cbiAgLy9cbiAgaWYgKGV2ZW50cy5sZW5ndGgpIHtcbiAgICB0aGlzLl9ldmVudHNbZXZlbnRdID0gZXZlbnRzLmxlbmd0aCA9PT0gMSA/IGV2ZW50c1swXSA6IGV2ZW50cztcbiAgfSBlbHNlIHtcbiAgICBkZWxldGUgdGhpcy5fZXZlbnRzW2V2ZW50XTtcbiAgfVxuXG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBSZW1vdmUgYWxsIGxpc3RlbmVycyBvciBvbmx5IHRoZSBsaXN0ZW5lcnMgZm9yIHRoZSBzcGVjaWZpZWQgZXZlbnQuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50IFRoZSBldmVudCB3YW50IHRvIHJlbW92ZSBhbGwgbGlzdGVuZXJzIGZvci5cbiAqIEBhcGkgcHVibGljXG4gKi9cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUucmVtb3ZlQWxsTGlzdGVuZXJzID0gZnVuY3Rpb24gcmVtb3ZlQWxsTGlzdGVuZXJzKGV2ZW50KSB7XG4gIGlmICghdGhpcy5fZXZlbnRzKSByZXR1cm4gdGhpcztcblxuICBpZiAoZXZlbnQpIGRlbGV0ZSB0aGlzLl9ldmVudHNbZXZlbnRdO1xuICBlbHNlIHRoaXMuX2V2ZW50cyA9IHt9O1xuXG4gIHJldHVybiB0aGlzO1xufTtcblxuLy9cbi8vIEFsaWFzIG1ldGhvZHMgbmFtZXMgYmVjYXVzZSBwZW9wbGUgcm9sbCBsaWtlIHRoYXQuXG4vL1xuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5vZmYgPSBFdmVudEVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUxpc3RlbmVyO1xuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5hZGRMaXN0ZW5lciA9IEV2ZW50RW1pdHRlci5wcm90b3R5cGUub247XG5cbi8vXG4vLyBUaGlzIGZ1bmN0aW9uIGRvZXNuJ3QgYXBwbHkgYW55bW9yZS5cbi8vXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnNldE1heExpc3RlbmVycyA9IGZ1bmN0aW9uIHNldE1heExpc3RlbmVycygpIHtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vL1xuLy8gRXhwb3NlIHRoZSBtb2R1bGUuXG4vL1xuRXZlbnRFbWl0dGVyLkV2ZW50RW1pdHRlciA9IEV2ZW50RW1pdHRlcjtcbkV2ZW50RW1pdHRlci5FdmVudEVtaXR0ZXIyID0gRXZlbnRFbWl0dGVyO1xuRXZlbnRFbWl0dGVyLkV2ZW50RW1pdHRlcjMgPSBFdmVudEVtaXR0ZXI7XG5cbi8vXG4vLyBFeHBvc2UgdGhlIG1vZHVsZS5cbi8vXG5tb2R1bGUuZXhwb3J0cyA9IEV2ZW50RW1pdHRlcjtcbiIsInZhciBiYXNlSW5kZXhPZiA9IHJlcXVpcmUoJy4uL2ludGVybmFsL2Jhc2VJbmRleE9mJyksXG4gICAgY2FjaGVJbmRleE9mID0gcmVxdWlyZSgnLi4vaW50ZXJuYWwvY2FjaGVJbmRleE9mJyksXG4gICAgY3JlYXRlQ2FjaGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbC9jcmVhdGVDYWNoZScpLFxuICAgIGlzQXJndW1lbnRzID0gcmVxdWlyZSgnLi4vbGFuZy9pc0FyZ3VtZW50cycpLFxuICAgIGlzQXJyYXkgPSByZXF1aXJlKCcuLi9sYW5nL2lzQXJyYXknKTtcblxuLyoqXG4gKiBDcmVhdGVzIGFuIGFycmF5IG9mIHVuaXF1ZSB2YWx1ZXMgaW4gYWxsIHByb3ZpZGVkIGFycmF5cyB1c2luZyBgU2FtZVZhbHVlWmVyb2BcbiAqIGZvciBlcXVhbGl0eSBjb21wYXJpc29ucy5cbiAqXG4gKiAqKk5vdGU6KiogW2BTYW1lVmFsdWVaZXJvYF0oaHR0cHM6Ly9wZW9wbGUubW96aWxsYS5vcmcvfmpvcmVuZG9yZmYvZXM2LWRyYWZ0Lmh0bWwjc2VjLXNhbWV2YWx1ZXplcm8pXG4gKiBjb21wYXJpc29ucyBhcmUgbGlrZSBzdHJpY3QgZXF1YWxpdHkgY29tcGFyaXNvbnMsIGUuZy4gYD09PWAsIGV4Y2VwdCB0aGF0XG4gKiBgTmFOYCBtYXRjaGVzIGBOYU5gLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAY2F0ZWdvcnkgQXJyYXlcbiAqIEBwYXJhbSB7Li4uQXJyYXl9IFthcnJheXNdIFRoZSBhcnJheXMgdG8gaW5zcGVjdC5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgbmV3IGFycmF5IG9mIHNoYXJlZCB2YWx1ZXMuXG4gKiBAZXhhbXBsZVxuICogXy5pbnRlcnNlY3Rpb24oWzEsIDJdLCBbNCwgMl0sIFsyLCAxXSk7XG4gKiAvLyA9PiBbMl1cbiAqL1xuZnVuY3Rpb24gaW50ZXJzZWN0aW9uKCkge1xuICB2YXIgYXJncyA9IFtdLFxuICAgICAgYXJnc0luZGV4ID0gLTEsXG4gICAgICBhcmdzTGVuZ3RoID0gYXJndW1lbnRzLmxlbmd0aCxcbiAgICAgIGNhY2hlcyA9IFtdLFxuICAgICAgaW5kZXhPZiA9IGJhc2VJbmRleE9mLFxuICAgICAgaXNDb21tb24gPSB0cnVlO1xuXG4gIHdoaWxlICgrK2FyZ3NJbmRleCA8IGFyZ3NMZW5ndGgpIHtcbiAgICB2YXIgdmFsdWUgPSBhcmd1bWVudHNbYXJnc0luZGV4XTtcbiAgICBpZiAoaXNBcnJheSh2YWx1ZSkgfHwgaXNBcmd1bWVudHModmFsdWUpKSB7XG4gICAgICBhcmdzLnB1c2godmFsdWUpO1xuICAgICAgY2FjaGVzLnB1c2goKGlzQ29tbW9uICYmIHZhbHVlLmxlbmd0aCA+PSAxMjApID8gY3JlYXRlQ2FjaGUoYXJnc0luZGV4ICYmIHZhbHVlKSA6IG51bGwpO1xuICAgIH1cbiAgfVxuICBhcmdzTGVuZ3RoID0gYXJncy5sZW5ndGg7XG4gIHZhciBhcnJheSA9IGFyZ3NbMF0sXG4gICAgICBpbmRleCA9IC0xLFxuICAgICAgbGVuZ3RoID0gYXJyYXkgPyBhcnJheS5sZW5ndGggOiAwLFxuICAgICAgcmVzdWx0ID0gW10sXG4gICAgICBzZWVuID0gY2FjaGVzWzBdO1xuXG4gIG91dGVyOlxuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIHZhbHVlID0gYXJyYXlbaW5kZXhdO1xuICAgIGlmICgoc2VlbiA/IGNhY2hlSW5kZXhPZihzZWVuLCB2YWx1ZSkgOiBpbmRleE9mKHJlc3VsdCwgdmFsdWUsIDApKSA8IDApIHtcbiAgICAgIGFyZ3NJbmRleCA9IGFyZ3NMZW5ndGg7XG4gICAgICB3aGlsZSAoLS1hcmdzSW5kZXgpIHtcbiAgICAgICAgdmFyIGNhY2hlID0gY2FjaGVzW2FyZ3NJbmRleF07XG4gICAgICAgIGlmICgoY2FjaGUgPyBjYWNoZUluZGV4T2YoY2FjaGUsIHZhbHVlKSA6IGluZGV4T2YoYXJnc1thcmdzSW5kZXhdLCB2YWx1ZSwgMCkpIDwgMCkge1xuICAgICAgICAgIGNvbnRpbnVlIG91dGVyO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoc2Vlbikge1xuICAgICAgICBzZWVuLnB1c2godmFsdWUpO1xuICAgICAgfVxuICAgICAgcmVzdWx0LnB1c2godmFsdWUpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGludGVyc2VjdGlvbjtcbiIsInZhciBiYXNlQ2FsbGJhY2sgPSByZXF1aXJlKCcuLi9pbnRlcm5hbC9iYXNlQ2FsbGJhY2snKSxcbiAgICBiYXNlVW5pcSA9IHJlcXVpcmUoJy4uL2ludGVybmFsL2Jhc2VVbmlxJyksXG4gICAgaXNJdGVyYXRlZUNhbGwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbC9pc0l0ZXJhdGVlQ2FsbCcpLFxuICAgIHNvcnRlZFVuaXEgPSByZXF1aXJlKCcuLi9pbnRlcm5hbC9zb3J0ZWRVbmlxJyk7XG5cbi8qKlxuICogQ3JlYXRlcyBhIGR1cGxpY2F0ZS12YWx1ZS1mcmVlIHZlcnNpb24gb2YgYW4gYXJyYXkgdXNpbmcgYFNhbWVWYWx1ZVplcm9gXG4gKiBmb3IgZXF1YWxpdHkgY29tcGFyaXNvbnMuIFByb3ZpZGluZyBgdHJ1ZWAgZm9yIGBpc1NvcnRlZGAgcGVyZm9ybXMgYSBmYXN0ZXJcbiAqIHNlYXJjaCBhbGdvcml0aG0gZm9yIHNvcnRlZCBhcnJheXMuIElmIGFuIGl0ZXJhdGVlIGZ1bmN0aW9uIGlzIHByb3ZpZGVkIGl0XG4gKiBpcyBpbnZva2VkIGZvciBlYWNoIHZhbHVlIGluIHRoZSBhcnJheSB0byBnZW5lcmF0ZSB0aGUgY3JpdGVyaW9uIGJ5IHdoaWNoXG4gKiB1bmlxdWVuZXNzIGlzIGNvbXB1dGVkLiBUaGUgYGl0ZXJhdGVlYCBpcyBib3VuZCB0byBgdGhpc0FyZ2AgYW5kIGludm9rZWRcbiAqIHdpdGggdGhyZWUgYXJndW1lbnRzOiAodmFsdWUsIGluZGV4LCBhcnJheSkuXG4gKlxuICogSWYgYSBwcm9wZXJ0eSBuYW1lIGlzIHByb3ZpZGVkIGZvciBgaXRlcmF0ZWVgIHRoZSBjcmVhdGVkIGBfLnByb3BlcnR5YFxuICogc3R5bGUgY2FsbGJhY2sgcmV0dXJucyB0aGUgcHJvcGVydHkgdmFsdWUgb2YgdGhlIGdpdmVuIGVsZW1lbnQuXG4gKlxuICogSWYgYSB2YWx1ZSBpcyBhbHNvIHByb3ZpZGVkIGZvciBgdGhpc0FyZ2AgdGhlIGNyZWF0ZWQgYF8ubWF0Y2hlc1Byb3BlcnR5YFxuICogc3R5bGUgY2FsbGJhY2sgcmV0dXJucyBgdHJ1ZWAgZm9yIGVsZW1lbnRzIHRoYXQgaGF2ZSBhIG1hdGNoaW5nIHByb3BlcnR5XG4gKiB2YWx1ZSwgZWxzZSBgZmFsc2VgLlxuICpcbiAqIElmIGFuIG9iamVjdCBpcyBwcm92aWRlZCBmb3IgYGl0ZXJhdGVlYCB0aGUgY3JlYXRlZCBgXy5tYXRjaGVzYCBzdHlsZVxuICogY2FsbGJhY2sgcmV0dXJucyBgdHJ1ZWAgZm9yIGVsZW1lbnRzIHRoYXQgaGF2ZSB0aGUgcHJvcGVydGllcyBvZiB0aGUgZ2l2ZW5cbiAqIG9iamVjdCwgZWxzZSBgZmFsc2VgLlxuICpcbiAqICoqTm90ZToqKiBbYFNhbWVWYWx1ZVplcm9gXShodHRwczovL3Blb3BsZS5tb3ppbGxhLm9yZy9+am9yZW5kb3JmZi9lczYtZHJhZnQuaHRtbCNzZWMtc2FtZXZhbHVlemVybylcbiAqIGNvbXBhcmlzb25zIGFyZSBsaWtlIHN0cmljdCBlcXVhbGl0eSBjb21wYXJpc29ucywgZS5nLiBgPT09YCwgZXhjZXB0IHRoYXRcbiAqIGBOYU5gIG1hdGNoZXMgYE5hTmAuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBhbGlhcyB1bmlxdWVcbiAqIEBjYXRlZ29yeSBBcnJheVxuICogQHBhcmFtIHtBcnJheX0gYXJyYXkgVGhlIGFycmF5IHRvIGluc3BlY3QuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtpc1NvcnRlZF0gU3BlY2lmeSB0aGUgYXJyYXkgaXMgc29ydGVkLlxuICogQHBhcmFtIHtGdW5jdGlvbnxPYmplY3R8c3RyaW5nfSBbaXRlcmF0ZWVdIFRoZSBmdW5jdGlvbiBpbnZva2VkIHBlciBpdGVyYXRpb24uXG4gKiBAcGFyYW0geyp9IFt0aGlzQXJnXSBUaGUgYHRoaXNgIGJpbmRpbmcgb2YgYGl0ZXJhdGVlYC5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgbmV3IGR1cGxpY2F0ZS12YWx1ZS1mcmVlIGFycmF5LlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLnVuaXEoWzEsIDIsIDFdKTtcbiAqIC8vID0+IFsxLCAyXVxuICpcbiAqIC8vIHVzaW5nIGBpc1NvcnRlZGBcbiAqIF8udW5pcShbMSwgMSwgMl0sIHRydWUpO1xuICogLy8gPT4gWzEsIDJdXG4gKlxuICogLy8gdXNpbmcgYW4gaXRlcmF0ZWUgZnVuY3Rpb25cbiAqIF8udW5pcShbMSwgMi41LCAxLjUsIDJdLCBmdW5jdGlvbihuKSB7XG4gKiAgIHJldHVybiB0aGlzLmZsb29yKG4pO1xuICogfSwgTWF0aCk7XG4gKiAvLyA9PiBbMSwgMi41XVxuICpcbiAqIC8vIHVzaW5nIHRoZSBgXy5wcm9wZXJ0eWAgY2FsbGJhY2sgc2hvcnRoYW5kXG4gKiBfLnVuaXEoW3sgJ3gnOiAxIH0sIHsgJ3gnOiAyIH0sIHsgJ3gnOiAxIH1dLCAneCcpO1xuICogLy8gPT4gW3sgJ3gnOiAxIH0sIHsgJ3gnOiAyIH1dXG4gKi9cbmZ1bmN0aW9uIHVuaXEoYXJyYXksIGlzU29ydGVkLCBpdGVyYXRlZSwgdGhpc0FyZykge1xuICB2YXIgbGVuZ3RoID0gYXJyYXkgPyBhcnJheS5sZW5ndGggOiAwO1xuICBpZiAoIWxlbmd0aCkge1xuICAgIHJldHVybiBbXTtcbiAgfVxuICBpZiAoaXNTb3J0ZWQgIT0gbnVsbCAmJiB0eXBlb2YgaXNTb3J0ZWQgIT0gJ2Jvb2xlYW4nKSB7XG4gICAgdGhpc0FyZyA9IGl0ZXJhdGVlO1xuICAgIGl0ZXJhdGVlID0gaXNJdGVyYXRlZUNhbGwoYXJyYXksIGlzU29ydGVkLCB0aGlzQXJnKSA/IG51bGwgOiBpc1NvcnRlZDtcbiAgICBpc1NvcnRlZCA9IGZhbHNlO1xuICB9XG4gIGl0ZXJhdGVlID0gaXRlcmF0ZWUgPT0gbnVsbCA/IGl0ZXJhdGVlIDogYmFzZUNhbGxiYWNrKGl0ZXJhdGVlLCB0aGlzQXJnLCAzKTtcbiAgcmV0dXJuIChpc1NvcnRlZClcbiAgICA/IHNvcnRlZFVuaXEoYXJyYXksIGl0ZXJhdGVlKVxuICAgIDogYmFzZVVuaXEoYXJyYXksIGl0ZXJhdGVlKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB1bmlxO1xuIiwidmFyIGFycmF5RWFjaCA9IHJlcXVpcmUoJy4uL2ludGVybmFsL2FycmF5RWFjaCcpLFxuICAgIGJhc2VFYWNoID0gcmVxdWlyZSgnLi4vaW50ZXJuYWwvYmFzZUVhY2gnKSxcbiAgICBjcmVhdGVGb3JFYWNoID0gcmVxdWlyZSgnLi4vaW50ZXJuYWwvY3JlYXRlRm9yRWFjaCcpO1xuXG4vKipcbiAqIEl0ZXJhdGVzIG92ZXIgZWxlbWVudHMgb2YgYGNvbGxlY3Rpb25gIGludm9raW5nIGBpdGVyYXRlZWAgZm9yIGVhY2ggZWxlbWVudC5cbiAqIFRoZSBgaXRlcmF0ZWVgIGlzIGJvdW5kIHRvIGB0aGlzQXJnYCBhbmQgaW52b2tlZCB3aXRoIHRocmVlIGFyZ3VtZW50czpcbiAqICh2YWx1ZSwgaW5kZXh8a2V5LCBjb2xsZWN0aW9uKS4gSXRlcmF0b3IgZnVuY3Rpb25zIG1heSBleGl0IGl0ZXJhdGlvbiBlYXJseVxuICogYnkgZXhwbGljaXRseSByZXR1cm5pbmcgYGZhbHNlYC5cbiAqXG4gKiAqKk5vdGU6KiogQXMgd2l0aCBvdGhlciBcIkNvbGxlY3Rpb25zXCIgbWV0aG9kcywgb2JqZWN0cyB3aXRoIGEgYGxlbmd0aGAgcHJvcGVydHlcbiAqIGFyZSBpdGVyYXRlZCBsaWtlIGFycmF5cy4gVG8gYXZvaWQgdGhpcyBiZWhhdmlvciBgXy5mb3JJbmAgb3IgYF8uZm9yT3duYFxuICogbWF5IGJlIHVzZWQgZm9yIG9iamVjdCBpdGVyYXRpb24uXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBhbGlhcyBlYWNoXG4gKiBAY2F0ZWdvcnkgQ29sbGVjdGlvblxuICogQHBhcmFtIHtBcnJheXxPYmplY3R8c3RyaW5nfSBjb2xsZWN0aW9uIFRoZSBjb2xsZWN0aW9uIHRvIGl0ZXJhdGUgb3Zlci5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtpdGVyYXRlZT1fLmlkZW50aXR5XSBUaGUgZnVuY3Rpb24gaW52b2tlZCBwZXIgaXRlcmF0aW9uLlxuICogQHBhcmFtIHsqfSBbdGhpc0FyZ10gVGhlIGB0aGlzYCBiaW5kaW5nIG9mIGBpdGVyYXRlZWAuXG4gKiBAcmV0dXJucyB7QXJyYXl8T2JqZWN0fHN0cmluZ30gUmV0dXJucyBgY29sbGVjdGlvbmAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8oWzEsIDJdKS5mb3JFYWNoKGZ1bmN0aW9uKG4pIHtcbiAqICAgY29uc29sZS5sb2cobik7XG4gKiB9KS52YWx1ZSgpO1xuICogLy8gPT4gbG9ncyBlYWNoIHZhbHVlIGZyb20gbGVmdCB0byByaWdodCBhbmQgcmV0dXJucyB0aGUgYXJyYXlcbiAqXG4gKiBfLmZvckVhY2goeyAnYSc6IDEsICdiJzogMiB9LCBmdW5jdGlvbihuLCBrZXkpIHtcbiAqICAgY29uc29sZS5sb2cobiwga2V5KTtcbiAqIH0pO1xuICogLy8gPT4gbG9ncyBlYWNoIHZhbHVlLWtleSBwYWlyIGFuZCByZXR1cm5zIHRoZSBvYmplY3QgKGl0ZXJhdGlvbiBvcmRlciBpcyBub3QgZ3VhcmFudGVlZClcbiAqL1xudmFyIGZvckVhY2ggPSBjcmVhdGVGb3JFYWNoKGFycmF5RWFjaCwgYmFzZUVhY2gpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZvckVhY2g7XG4iLCJ2YXIgYXJyYXlNYXAgPSByZXF1aXJlKCcuLi9pbnRlcm5hbC9hcnJheU1hcCcpLFxuICAgIGJhc2VDYWxsYmFjayA9IHJlcXVpcmUoJy4uL2ludGVybmFsL2Jhc2VDYWxsYmFjaycpLFxuICAgIGJhc2VNYXAgPSByZXF1aXJlKCcuLi9pbnRlcm5hbC9iYXNlTWFwJyksXG4gICAgaXNBcnJheSA9IHJlcXVpcmUoJy4uL2xhbmcvaXNBcnJheScpO1xuXG4vKipcbiAqIENyZWF0ZXMgYW4gYXJyYXkgb2YgdmFsdWVzIGJ5IHJ1bm5pbmcgZWFjaCBlbGVtZW50IGluIGBjb2xsZWN0aW9uYCB0aHJvdWdoXG4gKiBgaXRlcmF0ZWVgLiBUaGUgYGl0ZXJhdGVlYCBpcyBib3VuZCB0byBgdGhpc0FyZ2AgYW5kIGludm9rZWQgd2l0aCB0aHJlZVxuICogYXJndW1lbnRzOiAodmFsdWUsIGluZGV4fGtleSwgY29sbGVjdGlvbikuXG4gKlxuICogSWYgYSBwcm9wZXJ0eSBuYW1lIGlzIHByb3ZpZGVkIGZvciBgaXRlcmF0ZWVgIHRoZSBjcmVhdGVkIGBfLnByb3BlcnR5YFxuICogc3R5bGUgY2FsbGJhY2sgcmV0dXJucyB0aGUgcHJvcGVydHkgdmFsdWUgb2YgdGhlIGdpdmVuIGVsZW1lbnQuXG4gKlxuICogSWYgYSB2YWx1ZSBpcyBhbHNvIHByb3ZpZGVkIGZvciBgdGhpc0FyZ2AgdGhlIGNyZWF0ZWQgYF8ubWF0Y2hlc1Byb3BlcnR5YFxuICogc3R5bGUgY2FsbGJhY2sgcmV0dXJucyBgdHJ1ZWAgZm9yIGVsZW1lbnRzIHRoYXQgaGF2ZSBhIG1hdGNoaW5nIHByb3BlcnR5XG4gKiB2YWx1ZSwgZWxzZSBgZmFsc2VgLlxuICpcbiAqIElmIGFuIG9iamVjdCBpcyBwcm92aWRlZCBmb3IgYGl0ZXJhdGVlYCB0aGUgY3JlYXRlZCBgXy5tYXRjaGVzYCBzdHlsZVxuICogY2FsbGJhY2sgcmV0dXJucyBgdHJ1ZWAgZm9yIGVsZW1lbnRzIHRoYXQgaGF2ZSB0aGUgcHJvcGVydGllcyBvZiB0aGUgZ2l2ZW5cbiAqIG9iamVjdCwgZWxzZSBgZmFsc2VgLlxuICpcbiAqIE1hbnkgbG9kYXNoIG1ldGhvZHMgYXJlIGd1YXJkZWQgdG8gd29yayBhcyBpbnRlcmF0ZWVzIGZvciBtZXRob2RzIGxpa2VcbiAqIGBfLmV2ZXJ5YCwgYF8uZmlsdGVyYCwgYF8ubWFwYCwgYF8ubWFwVmFsdWVzYCwgYF8ucmVqZWN0YCwgYW5kIGBfLnNvbWVgLlxuICpcbiAqIFRoZSBndWFyZGVkIG1ldGhvZHMgYXJlOlxuICogYGFyeWAsIGBjYWxsYmFja2AsIGBjaHVua2AsIGBjbG9uZWAsIGBjcmVhdGVgLCBgY3VycnlgLCBgY3VycnlSaWdodGAsIGBkcm9wYCxcbiAqIGBkcm9wUmlnaHRgLCBgZXZlcnlgLCBgZmlsbGAsIGBmbGF0dGVuYCwgYGludmVydGAsIGBtYXhgLCBgbWluYCwgYHBhcnNlSW50YCxcbiAqIGBzbGljZWAsIGBzb3J0QnlgLCBgdGFrZWAsIGB0YWtlUmlnaHRgLCBgdGVtcGxhdGVgLCBgdHJpbWAsIGB0cmltTGVmdGAsXG4gKiBgdHJpbVJpZ2h0YCwgYHRydW5jYCwgYHJhbmRvbWAsIGByYW5nZWAsIGBzYW1wbGVgLCBgc29tZWAsIGB1bmlxYCwgYW5kIGB3b3Jkc2BcbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQGFsaWFzIGNvbGxlY3RcbiAqIEBjYXRlZ29yeSBDb2xsZWN0aW9uXG4gKiBAcGFyYW0ge0FycmF5fE9iamVjdHxzdHJpbmd9IGNvbGxlY3Rpb24gVGhlIGNvbGxlY3Rpb24gdG8gaXRlcmF0ZSBvdmVyLlxuICogQHBhcmFtIHtGdW5jdGlvbnxPYmplY3R8c3RyaW5nfSBbaXRlcmF0ZWU9Xy5pZGVudGl0eV0gVGhlIGZ1bmN0aW9uIGludm9rZWRcbiAqICBwZXIgaXRlcmF0aW9uLlxuICogIGNyZWF0ZSBhIGBfLnByb3BlcnR5YCBvciBgXy5tYXRjaGVzYCBzdHlsZSBjYWxsYmFjayByZXNwZWN0aXZlbHkuXG4gKiBAcGFyYW0geyp9IFt0aGlzQXJnXSBUaGUgYHRoaXNgIGJpbmRpbmcgb2YgYGl0ZXJhdGVlYC5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgbmV3IG1hcHBlZCBhcnJheS5cbiAqIEBleGFtcGxlXG4gKlxuICogZnVuY3Rpb24gdGltZXNUaHJlZShuKSB7XG4gKiAgIHJldHVybiBuICogMztcbiAqIH1cbiAqXG4gKiBfLm1hcChbMSwgMl0sIHRpbWVzVGhyZWUpO1xuICogLy8gPT4gWzMsIDZdXG4gKlxuICogXy5tYXAoeyAnYSc6IDEsICdiJzogMiB9LCB0aW1lc1RocmVlKTtcbiAqIC8vID0+IFszLCA2XSAoaXRlcmF0aW9uIG9yZGVyIGlzIG5vdCBndWFyYW50ZWVkKVxuICpcbiAqIHZhciB1c2VycyA9IFtcbiAqICAgeyAndXNlcic6ICdiYXJuZXknIH0sXG4gKiAgIHsgJ3VzZXInOiAnZnJlZCcgfVxuICogXTtcbiAqXG4gKiAvLyB1c2luZyB0aGUgYF8ucHJvcGVydHlgIGNhbGxiYWNrIHNob3J0aGFuZFxuICogXy5tYXAodXNlcnMsICd1c2VyJyk7XG4gKiAvLyA9PiBbJ2Jhcm5leScsICdmcmVkJ11cbiAqL1xuZnVuY3Rpb24gbWFwKGNvbGxlY3Rpb24sIGl0ZXJhdGVlLCB0aGlzQXJnKSB7XG4gIHZhciBmdW5jID0gaXNBcnJheShjb2xsZWN0aW9uKSA/IGFycmF5TWFwIDogYmFzZU1hcDtcbiAgaXRlcmF0ZWUgPSBiYXNlQ2FsbGJhY2soaXRlcmF0ZWUsIHRoaXNBcmcsIDMpO1xuICByZXR1cm4gZnVuYyhjb2xsZWN0aW9uLCBpdGVyYXRlZSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gbWFwO1xuIiwidmFyIGlzTGVuZ3RoID0gcmVxdWlyZSgnLi4vaW50ZXJuYWwvaXNMZW5ndGgnKSxcbiAgICBrZXlzID0gcmVxdWlyZSgnLi4vb2JqZWN0L2tleXMnKTtcblxuLyoqXG4gKiBHZXRzIHRoZSBzaXplIG9mIGBjb2xsZWN0aW9uYCBieSByZXR1cm5pbmcgaXRzIGxlbmd0aCBmb3IgYXJyYXktbGlrZVxuICogdmFsdWVzIG9yIHRoZSBudW1iZXIgb2Ygb3duIGVudW1lcmFibGUgcHJvcGVydGllcyBmb3Igb2JqZWN0cy5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IENvbGxlY3Rpb25cbiAqIEBwYXJhbSB7QXJyYXl8T2JqZWN0fHN0cmluZ30gY29sbGVjdGlvbiBUaGUgY29sbGVjdGlvbiB0byBpbnNwZWN0LlxuICogQHJldHVybnMge251bWJlcn0gUmV0dXJucyB0aGUgc2l6ZSBvZiBgY29sbGVjdGlvbmAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uc2l6ZShbMSwgMiwgM10pO1xuICogLy8gPT4gM1xuICpcbiAqIF8uc2l6ZSh7ICdhJzogMSwgJ2InOiAyIH0pO1xuICogLy8gPT4gMlxuICpcbiAqIF8uc2l6ZSgncGViYmxlcycpO1xuICogLy8gPT4gN1xuICovXG5mdW5jdGlvbiBzaXplKGNvbGxlY3Rpb24pIHtcbiAgdmFyIGxlbmd0aCA9IGNvbGxlY3Rpb24gPyBjb2xsZWN0aW9uLmxlbmd0aCA6IDA7XG4gIHJldHVybiBpc0xlbmd0aChsZW5ndGgpID8gbGVuZ3RoIDoga2V5cyhjb2xsZWN0aW9uKS5sZW5ndGg7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc2l6ZTtcbiIsInZhciBjYWNoZVB1c2ggPSByZXF1aXJlKCcuL2NhY2hlUHVzaCcpLFxuICAgIGlzTmF0aXZlID0gcmVxdWlyZSgnLi4vbGFuZy9pc05hdGl2ZScpO1xuXG4vKiogTmF0aXZlIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIFNldCA9IGlzTmF0aXZlKFNldCA9IGdsb2JhbC5TZXQpICYmIFNldDtcblxuLyogTmF0aXZlIG1ldGhvZCByZWZlcmVuY2VzIGZvciB0aG9zZSB3aXRoIHRoZSBzYW1lIG5hbWUgYXMgb3RoZXIgYGxvZGFzaGAgbWV0aG9kcy4gKi9cbnZhciBuYXRpdmVDcmVhdGUgPSBpc05hdGl2ZShuYXRpdmVDcmVhdGUgPSBPYmplY3QuY3JlYXRlKSAmJiBuYXRpdmVDcmVhdGU7XG5cbi8qKlxuICpcbiAqIENyZWF0ZXMgYSBjYWNoZSBvYmplY3QgdG8gc3RvcmUgdW5pcXVlIHZhbHVlcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheX0gW3ZhbHVlc10gVGhlIHZhbHVlcyB0byBjYWNoZS5cbiAqL1xuZnVuY3Rpb24gU2V0Q2FjaGUodmFsdWVzKSB7XG4gIHZhciBsZW5ndGggPSB2YWx1ZXMgPyB2YWx1ZXMubGVuZ3RoIDogMDtcblxuICB0aGlzLmRhdGEgPSB7ICdoYXNoJzogbmF0aXZlQ3JlYXRlKG51bGwpLCAnc2V0JzogbmV3IFNldCB9O1xuICB3aGlsZSAobGVuZ3RoLS0pIHtcbiAgICB0aGlzLnB1c2godmFsdWVzW2xlbmd0aF0pO1xuICB9XG59XG5cbi8vIEFkZCBmdW5jdGlvbnMgdG8gdGhlIGBTZXRgIGNhY2hlLlxuU2V0Q2FjaGUucHJvdG90eXBlLnB1c2ggPSBjYWNoZVB1c2g7XG5cbm1vZHVsZS5leHBvcnRzID0gU2V0Q2FjaGU7XG4iLCIvKipcbiAqIENvcGllcyB0aGUgdmFsdWVzIG9mIGBzb3VyY2VgIHRvIGBhcnJheWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IHNvdXJjZSBUaGUgYXJyYXkgdG8gY29weSB2YWx1ZXMgZnJvbS5cbiAqIEBwYXJhbSB7QXJyYXl9IFthcnJheT1bXV0gVGhlIGFycmF5IHRvIGNvcHkgdmFsdWVzIHRvLlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIGBhcnJheWAuXG4gKi9cbmZ1bmN0aW9uIGFycmF5Q29weShzb3VyY2UsIGFycmF5KSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgbGVuZ3RoID0gc291cmNlLmxlbmd0aDtcblxuICBhcnJheSB8fCAoYXJyYXkgPSBBcnJheShsZW5ndGgpKTtcbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICBhcnJheVtpbmRleF0gPSBzb3VyY2VbaW5kZXhdO1xuICB9XG4gIHJldHVybiBhcnJheTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBhcnJheUNvcHk7XG4iLCIvKipcbiAqIEEgc3BlY2lhbGl6ZWQgdmVyc2lvbiBvZiBgXy5mb3JFYWNoYCBmb3IgYXJyYXlzIHdpdGhvdXQgc3VwcG9ydCBmb3IgY2FsbGJhY2tcbiAqIHNob3J0aGFuZHMgYW5kIGB0aGlzYCBiaW5kaW5nLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheSBUaGUgYXJyYXkgdG8gaXRlcmF0ZSBvdmVyLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gaXRlcmF0ZWUgVGhlIGZ1bmN0aW9uIGludm9rZWQgcGVyIGl0ZXJhdGlvbi5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyBgYXJyYXlgLlxuICovXG5mdW5jdGlvbiBhcnJheUVhY2goYXJyYXksIGl0ZXJhdGVlKSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgbGVuZ3RoID0gYXJyYXkubGVuZ3RoO1xuXG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgaWYgKGl0ZXJhdGVlKGFycmF5W2luZGV4XSwgaW5kZXgsIGFycmF5KSA9PT0gZmFsc2UpIHtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuICByZXR1cm4gYXJyYXk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYXJyYXlFYWNoO1xuIiwiLyoqXG4gKiBBIHNwZWNpYWxpemVkIHZlcnNpb24gb2YgYF8ubWFwYCBmb3IgYXJyYXlzIHdpdGhvdXQgc3VwcG9ydCBmb3IgY2FsbGJhY2tcbiAqIHNob3J0aGFuZHMgYW5kIGB0aGlzYCBiaW5kaW5nLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheSBUaGUgYXJyYXkgdG8gaXRlcmF0ZSBvdmVyLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gaXRlcmF0ZWUgVGhlIGZ1bmN0aW9uIGludm9rZWQgcGVyIGl0ZXJhdGlvbi5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgbmV3IG1hcHBlZCBhcnJheS5cbiAqL1xuZnVuY3Rpb24gYXJyYXlNYXAoYXJyYXksIGl0ZXJhdGVlKSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgbGVuZ3RoID0gYXJyYXkubGVuZ3RoLFxuICAgICAgcmVzdWx0ID0gQXJyYXkobGVuZ3RoKTtcblxuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIHJlc3VsdFtpbmRleF0gPSBpdGVyYXRlZShhcnJheVtpbmRleF0sIGluZGV4LCBhcnJheSk7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBhcnJheU1hcDtcbiIsInZhciBiYXNlTWF0Y2hlcyA9IHJlcXVpcmUoJy4vYmFzZU1hdGNoZXMnKSxcbiAgICBiYXNlTWF0Y2hlc1Byb3BlcnR5ID0gcmVxdWlyZSgnLi9iYXNlTWF0Y2hlc1Byb3BlcnR5JyksXG4gICAgYmFzZVByb3BlcnR5ID0gcmVxdWlyZSgnLi9iYXNlUHJvcGVydHknKSxcbiAgICBiaW5kQ2FsbGJhY2sgPSByZXF1aXJlKCcuL2JpbmRDYWxsYmFjaycpLFxuICAgIGlkZW50aXR5ID0gcmVxdWlyZSgnLi4vdXRpbGl0eS9pZGVudGl0eScpO1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLmNhbGxiYWNrYCB3aGljaCBzdXBwb3J0cyBzcGVjaWZ5aW5nIHRoZVxuICogbnVtYmVyIG9mIGFyZ3VtZW50cyB0byBwcm92aWRlIHRvIGBmdW5jYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSBbZnVuYz1fLmlkZW50aXR5XSBUaGUgdmFsdWUgdG8gY29udmVydCB0byBhIGNhbGxiYWNrLlxuICogQHBhcmFtIHsqfSBbdGhpc0FyZ10gVGhlIGB0aGlzYCBiaW5kaW5nIG9mIGBmdW5jYC5cbiAqIEBwYXJhbSB7bnVtYmVyfSBbYXJnQ291bnRdIFRoZSBudW1iZXIgb2YgYXJndW1lbnRzIHRvIHByb3ZpZGUgdG8gYGZ1bmNgLlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBjYWxsYmFjay5cbiAqL1xuZnVuY3Rpb24gYmFzZUNhbGxiYWNrKGZ1bmMsIHRoaXNBcmcsIGFyZ0NvdW50KSB7XG4gIHZhciB0eXBlID0gdHlwZW9mIGZ1bmM7XG4gIGlmICh0eXBlID09ICdmdW5jdGlvbicpIHtcbiAgICByZXR1cm4gdHlwZW9mIHRoaXNBcmcgPT0gJ3VuZGVmaW5lZCdcbiAgICAgID8gZnVuY1xuICAgICAgOiBiaW5kQ2FsbGJhY2soZnVuYywgdGhpc0FyZywgYXJnQ291bnQpO1xuICB9XG4gIGlmIChmdW5jID09IG51bGwpIHtcbiAgICByZXR1cm4gaWRlbnRpdHk7XG4gIH1cbiAgaWYgKHR5cGUgPT0gJ29iamVjdCcpIHtcbiAgICByZXR1cm4gYmFzZU1hdGNoZXMoZnVuYyk7XG4gIH1cbiAgcmV0dXJuIHR5cGVvZiB0aGlzQXJnID09ICd1bmRlZmluZWQnXG4gICAgPyBiYXNlUHJvcGVydHkoZnVuYyArICcnKVxuICAgIDogYmFzZU1hdGNoZXNQcm9wZXJ0eShmdW5jICsgJycsIHRoaXNBcmcpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJhc2VDYWxsYmFjaztcbiIsInZhciBhcnJheUNvcHkgPSByZXF1aXJlKCcuL2FycmF5Q29weScpLFxuICAgIGFycmF5RWFjaCA9IHJlcXVpcmUoJy4vYXJyYXlFYWNoJyksXG4gICAgYmFzZUNvcHkgPSByZXF1aXJlKCcuL2Jhc2VDb3B5JyksXG4gICAgYmFzZUZvck93biA9IHJlcXVpcmUoJy4vYmFzZUZvck93bicpLFxuICAgIGluaXRDbG9uZUFycmF5ID0gcmVxdWlyZSgnLi9pbml0Q2xvbmVBcnJheScpLFxuICAgIGluaXRDbG9uZUJ5VGFnID0gcmVxdWlyZSgnLi9pbml0Q2xvbmVCeVRhZycpLFxuICAgIGluaXRDbG9uZU9iamVjdCA9IHJlcXVpcmUoJy4vaW5pdENsb25lT2JqZWN0JyksXG4gICAgaXNBcnJheSA9IHJlcXVpcmUoJy4uL2xhbmcvaXNBcnJheScpLFxuICAgIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi4vbGFuZy9pc09iamVjdCcpLFxuICAgIGtleXMgPSByZXF1aXJlKCcuLi9vYmplY3Qva2V5cycpO1xuXG4vKiogYE9iamVjdCN0b1N0cmluZ2AgcmVzdWx0IHJlZmVyZW5jZXMuICovXG52YXIgYXJnc1RhZyA9ICdbb2JqZWN0IEFyZ3VtZW50c10nLFxuICAgIGFycmF5VGFnID0gJ1tvYmplY3QgQXJyYXldJyxcbiAgICBib29sVGFnID0gJ1tvYmplY3QgQm9vbGVhbl0nLFxuICAgIGRhdGVUYWcgPSAnW29iamVjdCBEYXRlXScsXG4gICAgZXJyb3JUYWcgPSAnW29iamVjdCBFcnJvcl0nLFxuICAgIGZ1bmNUYWcgPSAnW29iamVjdCBGdW5jdGlvbl0nLFxuICAgIG1hcFRhZyA9ICdbb2JqZWN0IE1hcF0nLFxuICAgIG51bWJlclRhZyA9ICdbb2JqZWN0IE51bWJlcl0nLFxuICAgIG9iamVjdFRhZyA9ICdbb2JqZWN0IE9iamVjdF0nLFxuICAgIHJlZ2V4cFRhZyA9ICdbb2JqZWN0IFJlZ0V4cF0nLFxuICAgIHNldFRhZyA9ICdbb2JqZWN0IFNldF0nLFxuICAgIHN0cmluZ1RhZyA9ICdbb2JqZWN0IFN0cmluZ10nLFxuICAgIHdlYWtNYXBUYWcgPSAnW29iamVjdCBXZWFrTWFwXSc7XG5cbnZhciBhcnJheUJ1ZmZlclRhZyA9ICdbb2JqZWN0IEFycmF5QnVmZmVyXScsXG4gICAgZmxvYXQzMlRhZyA9ICdbb2JqZWN0IEZsb2F0MzJBcnJheV0nLFxuICAgIGZsb2F0NjRUYWcgPSAnW29iamVjdCBGbG9hdDY0QXJyYXldJyxcbiAgICBpbnQ4VGFnID0gJ1tvYmplY3QgSW50OEFycmF5XScsXG4gICAgaW50MTZUYWcgPSAnW29iamVjdCBJbnQxNkFycmF5XScsXG4gICAgaW50MzJUYWcgPSAnW29iamVjdCBJbnQzMkFycmF5XScsXG4gICAgdWludDhUYWcgPSAnW29iamVjdCBVaW50OEFycmF5XScsXG4gICAgdWludDhDbGFtcGVkVGFnID0gJ1tvYmplY3QgVWludDhDbGFtcGVkQXJyYXldJyxcbiAgICB1aW50MTZUYWcgPSAnW29iamVjdCBVaW50MTZBcnJheV0nLFxuICAgIHVpbnQzMlRhZyA9ICdbb2JqZWN0IFVpbnQzMkFycmF5XSc7XG5cbi8qKiBVc2VkIHRvIGlkZW50aWZ5IGB0b1N0cmluZ1RhZ2AgdmFsdWVzIHN1cHBvcnRlZCBieSBgXy5jbG9uZWAuICovXG52YXIgY2xvbmVhYmxlVGFncyA9IHt9O1xuY2xvbmVhYmxlVGFnc1thcmdzVGFnXSA9IGNsb25lYWJsZVRhZ3NbYXJyYXlUYWddID1cbmNsb25lYWJsZVRhZ3NbYXJyYXlCdWZmZXJUYWddID0gY2xvbmVhYmxlVGFnc1tib29sVGFnXSA9XG5jbG9uZWFibGVUYWdzW2RhdGVUYWddID0gY2xvbmVhYmxlVGFnc1tmbG9hdDMyVGFnXSA9XG5jbG9uZWFibGVUYWdzW2Zsb2F0NjRUYWddID0gY2xvbmVhYmxlVGFnc1tpbnQ4VGFnXSA9XG5jbG9uZWFibGVUYWdzW2ludDE2VGFnXSA9IGNsb25lYWJsZVRhZ3NbaW50MzJUYWddID1cbmNsb25lYWJsZVRhZ3NbbnVtYmVyVGFnXSA9IGNsb25lYWJsZVRhZ3Nbb2JqZWN0VGFnXSA9XG5jbG9uZWFibGVUYWdzW3JlZ2V4cFRhZ10gPSBjbG9uZWFibGVUYWdzW3N0cmluZ1RhZ10gPVxuY2xvbmVhYmxlVGFnc1t1aW50OFRhZ10gPSBjbG9uZWFibGVUYWdzW3VpbnQ4Q2xhbXBlZFRhZ10gPVxuY2xvbmVhYmxlVGFnc1t1aW50MTZUYWddID0gY2xvbmVhYmxlVGFnc1t1aW50MzJUYWddID0gdHJ1ZTtcbmNsb25lYWJsZVRhZ3NbZXJyb3JUYWddID0gY2xvbmVhYmxlVGFnc1tmdW5jVGFnXSA9XG5jbG9uZWFibGVUYWdzW21hcFRhZ10gPSBjbG9uZWFibGVUYWdzW3NldFRhZ10gPVxuY2xvbmVhYmxlVGFnc1t3ZWFrTWFwVGFnXSA9IGZhbHNlO1xuXG4vKiogVXNlZCBmb3IgbmF0aXZlIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqXG4gKiBVc2VkIHRvIHJlc29sdmUgdGhlIFtgdG9TdHJpbmdUYWdgXShodHRwczovL3Blb3BsZS5tb3ppbGxhLm9yZy9+am9yZW5kb3JmZi9lczYtZHJhZnQuaHRtbCNzZWMtb2JqZWN0LnByb3RvdHlwZS50b3N0cmluZylcbiAqIG9mIHZhbHVlcy5cbiAqL1xudmFyIG9ialRvU3RyaW5nID0gb2JqZWN0UHJvdG8udG9TdHJpbmc7XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8uY2xvbmVgIHdpdGhvdXQgc3VwcG9ydCBmb3IgYXJndW1lbnQganVnZ2xpbmdcbiAqIGFuZCBgdGhpc2AgYmluZGluZyBgY3VzdG9taXplcmAgZnVuY3Rpb25zLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjbG9uZS5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW2lzRGVlcF0gU3BlY2lmeSBhIGRlZXAgY2xvbmUuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY3VzdG9taXplcl0gVGhlIGZ1bmN0aW9uIHRvIGN1c3RvbWl6ZSBjbG9uaW5nIHZhbHVlcy5cbiAqIEBwYXJhbSB7c3RyaW5nfSBba2V5XSBUaGUga2V5IG9mIGB2YWx1ZWAuXG4gKiBAcGFyYW0ge09iamVjdH0gW29iamVjdF0gVGhlIG9iamVjdCBgdmFsdWVgIGJlbG9uZ3MgdG8uXG4gKiBAcGFyYW0ge0FycmF5fSBbc3RhY2tBPVtdXSBUcmFja3MgdHJhdmVyc2VkIHNvdXJjZSBvYmplY3RzLlxuICogQHBhcmFtIHtBcnJheX0gW3N0YWNrQj1bXV0gQXNzb2NpYXRlcyBjbG9uZXMgd2l0aCBzb3VyY2UgY291bnRlcnBhcnRzLlxuICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIGNsb25lZCB2YWx1ZS5cbiAqL1xuZnVuY3Rpb24gYmFzZUNsb25lKHZhbHVlLCBpc0RlZXAsIGN1c3RvbWl6ZXIsIGtleSwgb2JqZWN0LCBzdGFja0EsIHN0YWNrQikge1xuICB2YXIgcmVzdWx0O1xuICBpZiAoY3VzdG9taXplcikge1xuICAgIHJlc3VsdCA9IG9iamVjdCA/IGN1c3RvbWl6ZXIodmFsdWUsIGtleSwgb2JqZWN0KSA6IGN1c3RvbWl6ZXIodmFsdWUpO1xuICB9XG4gIGlmICh0eXBlb2YgcmVzdWx0ICE9ICd1bmRlZmluZWQnKSB7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuICBpZiAoIWlzT2JqZWN0KHZhbHVlKSkge1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxuICB2YXIgaXNBcnIgPSBpc0FycmF5KHZhbHVlKTtcbiAgaWYgKGlzQXJyKSB7XG4gICAgcmVzdWx0ID0gaW5pdENsb25lQXJyYXkodmFsdWUpO1xuICAgIGlmICghaXNEZWVwKSB7XG4gICAgICByZXR1cm4gYXJyYXlDb3B5KHZhbHVlLCByZXN1bHQpO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICB2YXIgdGFnID0gb2JqVG9TdHJpbmcuY2FsbCh2YWx1ZSksXG4gICAgICAgIGlzRnVuYyA9IHRhZyA9PSBmdW5jVGFnO1xuXG4gICAgaWYgKHRhZyA9PSBvYmplY3RUYWcgfHwgdGFnID09IGFyZ3NUYWcgfHwgKGlzRnVuYyAmJiAhb2JqZWN0KSkge1xuICAgICAgcmVzdWx0ID0gaW5pdENsb25lT2JqZWN0KGlzRnVuYyA/IHt9IDogdmFsdWUpO1xuICAgICAgaWYgKCFpc0RlZXApIHtcbiAgICAgICAgcmV0dXJuIGJhc2VDb3B5KHZhbHVlLCByZXN1bHQsIGtleXModmFsdWUpKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGNsb25lYWJsZVRhZ3NbdGFnXVxuICAgICAgICA/IGluaXRDbG9uZUJ5VGFnKHZhbHVlLCB0YWcsIGlzRGVlcClcbiAgICAgICAgOiAob2JqZWN0ID8gdmFsdWUgOiB7fSk7XG4gICAgfVxuICB9XG4gIC8vIENoZWNrIGZvciBjaXJjdWxhciByZWZlcmVuY2VzIGFuZCByZXR1cm4gY29ycmVzcG9uZGluZyBjbG9uZS5cbiAgc3RhY2tBIHx8IChzdGFja0EgPSBbXSk7XG4gIHN0YWNrQiB8fCAoc3RhY2tCID0gW10pO1xuXG4gIHZhciBsZW5ndGggPSBzdGFja0EubGVuZ3RoO1xuICB3aGlsZSAobGVuZ3RoLS0pIHtcbiAgICBpZiAoc3RhY2tBW2xlbmd0aF0gPT0gdmFsdWUpIHtcbiAgICAgIHJldHVybiBzdGFja0JbbGVuZ3RoXTtcbiAgICB9XG4gIH1cbiAgLy8gQWRkIHRoZSBzb3VyY2UgdmFsdWUgdG8gdGhlIHN0YWNrIG9mIHRyYXZlcnNlZCBvYmplY3RzIGFuZCBhc3NvY2lhdGUgaXQgd2l0aCBpdHMgY2xvbmUuXG4gIHN0YWNrQS5wdXNoKHZhbHVlKTtcbiAgc3RhY2tCLnB1c2gocmVzdWx0KTtcblxuICAvLyBSZWN1cnNpdmVseSBwb3B1bGF0ZSBjbG9uZSAoc3VzY2VwdGlibGUgdG8gY2FsbCBzdGFjayBsaW1pdHMpLlxuICAoaXNBcnIgPyBhcnJheUVhY2ggOiBiYXNlRm9yT3duKSh2YWx1ZSwgZnVuY3Rpb24oc3ViVmFsdWUsIGtleSkge1xuICAgIHJlc3VsdFtrZXldID0gYmFzZUNsb25lKHN1YlZhbHVlLCBpc0RlZXAsIGN1c3RvbWl6ZXIsIGtleSwgdmFsdWUsIHN0YWNrQSwgc3RhY2tCKTtcbiAgfSk7XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYmFzZUNsb25lO1xuIiwiLyoqXG4gKiBDb3BpZXMgdGhlIHByb3BlcnRpZXMgb2YgYHNvdXJjZWAgdG8gYG9iamVjdGAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBzb3VyY2UgVGhlIG9iamVjdCB0byBjb3B5IHByb3BlcnRpZXMgZnJvbS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbb2JqZWN0PXt9XSBUaGUgb2JqZWN0IHRvIGNvcHkgcHJvcGVydGllcyB0by5cbiAqIEBwYXJhbSB7QXJyYXl9IHByb3BzIFRoZSBwcm9wZXJ0eSBuYW1lcyB0byBjb3B5LlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyBgb2JqZWN0YC5cbiAqL1xuZnVuY3Rpb24gYmFzZUNvcHkoc291cmNlLCBvYmplY3QsIHByb3BzKSB7XG4gIGlmICghcHJvcHMpIHtcbiAgICBwcm9wcyA9IG9iamVjdDtcbiAgICBvYmplY3QgPSB7fTtcbiAgfVxuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGxlbmd0aCA9IHByb3BzLmxlbmd0aDtcblxuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIHZhciBrZXkgPSBwcm9wc1tpbmRleF07XG4gICAgb2JqZWN0W2tleV0gPSBzb3VyY2Vba2V5XTtcbiAgfVxuICByZXR1cm4gb2JqZWN0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJhc2VDb3B5O1xuIiwidmFyIGJhc2VGb3JPd24gPSByZXF1aXJlKCcuL2Jhc2VGb3JPd24nKSxcbiAgICBjcmVhdGVCYXNlRWFjaCA9IHJlcXVpcmUoJy4vY3JlYXRlQmFzZUVhY2gnKTtcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5mb3JFYWNoYCB3aXRob3V0IHN1cHBvcnQgZm9yIGNhbGxiYWNrXG4gKiBzaG9ydGhhbmRzIGFuZCBgdGhpc2AgYmluZGluZy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheXxPYmplY3R8c3RyaW5nfSBjb2xsZWN0aW9uIFRoZSBjb2xsZWN0aW9uIHRvIGl0ZXJhdGUgb3Zlci5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGl0ZXJhdGVlIFRoZSBmdW5jdGlvbiBpbnZva2VkIHBlciBpdGVyYXRpb24uXG4gKiBAcmV0dXJucyB7QXJyYXl8T2JqZWN0fHN0cmluZ30gUmV0dXJucyBgY29sbGVjdGlvbmAuXG4gKi9cbnZhciBiYXNlRWFjaCA9IGNyZWF0ZUJhc2VFYWNoKGJhc2VGb3JPd24pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGJhc2VFYWNoO1xuIiwiLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5maW5kYCwgYF8uZmluZExhc3RgLCBgXy5maW5kS2V5YCwgYW5kIGBfLmZpbmRMYXN0S2V5YCxcbiAqIHdpdGhvdXQgc3VwcG9ydCBmb3IgY2FsbGJhY2sgc2hvcnRoYW5kcyBhbmQgYHRoaXNgIGJpbmRpbmcsIHdoaWNoIGl0ZXJhdGVzXG4gKiBvdmVyIGBjb2xsZWN0aW9uYCB1c2luZyB0aGUgcHJvdmlkZWQgYGVhY2hGdW5jYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheXxPYmplY3R8c3RyaW5nfSBjb2xsZWN0aW9uIFRoZSBjb2xsZWN0aW9uIHRvIHNlYXJjaC5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IHByZWRpY2F0ZSBUaGUgZnVuY3Rpb24gaW52b2tlZCBwZXIgaXRlcmF0aW9uLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZWFjaEZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGl0ZXJhdGUgb3ZlciBgY29sbGVjdGlvbmAuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtyZXRLZXldIFNwZWNpZnkgcmV0dXJuaW5nIHRoZSBrZXkgb2YgdGhlIGZvdW5kIGVsZW1lbnRcbiAqICBpbnN0ZWFkIG9mIHRoZSBlbGVtZW50IGl0c2VsZi5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSBmb3VuZCBlbGVtZW50IG9yIGl0cyBrZXksIGVsc2UgYHVuZGVmaW5lZGAuXG4gKi9cbmZ1bmN0aW9uIGJhc2VGaW5kKGNvbGxlY3Rpb24sIHByZWRpY2F0ZSwgZWFjaEZ1bmMsIHJldEtleSkge1xuICB2YXIgcmVzdWx0O1xuICBlYWNoRnVuYyhjb2xsZWN0aW9uLCBmdW5jdGlvbih2YWx1ZSwga2V5LCBjb2xsZWN0aW9uKSB7XG4gICAgaWYgKHByZWRpY2F0ZSh2YWx1ZSwga2V5LCBjb2xsZWN0aW9uKSkge1xuICAgICAgcmVzdWx0ID0gcmV0S2V5ID8ga2V5IDogdmFsdWU7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9KTtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBiYXNlRmluZDtcbiIsInZhciBjcmVhdGVCYXNlRm9yID0gcmVxdWlyZSgnLi9jcmVhdGVCYXNlRm9yJyk7XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYGJhc2VGb3JJbmAgYW5kIGBiYXNlRm9yT3duYCB3aGljaCBpdGVyYXRlc1xuICogb3ZlciBgb2JqZWN0YCBwcm9wZXJ0aWVzIHJldHVybmVkIGJ5IGBrZXlzRnVuY2AgaW52b2tpbmcgYGl0ZXJhdGVlYCBmb3JcbiAqIGVhY2ggcHJvcGVydHkuIEl0ZXJhdG9yIGZ1bmN0aW9ucyBtYXkgZXhpdCBpdGVyYXRpb24gZWFybHkgYnkgZXhwbGljaXRseVxuICogcmV0dXJuaW5nIGBmYWxzZWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBpdGVyYXRlIG92ZXIuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBpdGVyYXRlZSBUaGUgZnVuY3Rpb24gaW52b2tlZCBwZXIgaXRlcmF0aW9uLlxuICogQHBhcmFtIHtGdW5jdGlvbn0ga2V5c0Z1bmMgVGhlIGZ1bmN0aW9uIHRvIGdldCB0aGUga2V5cyBvZiBgb2JqZWN0YC5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgYG9iamVjdGAuXG4gKi9cbnZhciBiYXNlRm9yID0gY3JlYXRlQmFzZUZvcigpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGJhc2VGb3I7XG4iLCJ2YXIgYmFzZUZvciA9IHJlcXVpcmUoJy4vYmFzZUZvcicpLFxuICAgIGtleXMgPSByZXF1aXJlKCcuLi9vYmplY3Qva2V5cycpO1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLmZvck93bmAgd2l0aG91dCBzdXBwb3J0IGZvciBjYWxsYmFja1xuICogc2hvcnRoYW5kcyBhbmQgYHRoaXNgIGJpbmRpbmcuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBpdGVyYXRlIG92ZXIuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBpdGVyYXRlZSBUaGUgZnVuY3Rpb24gaW52b2tlZCBwZXIgaXRlcmF0aW9uLlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyBgb2JqZWN0YC5cbiAqL1xuZnVuY3Rpb24gYmFzZUZvck93bihvYmplY3QsIGl0ZXJhdGVlKSB7XG4gIHJldHVybiBiYXNlRm9yKG9iamVjdCwgaXRlcmF0ZWUsIGtleXMpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJhc2VGb3JPd247XG4iLCJ2YXIgaW5kZXhPZk5hTiA9IHJlcXVpcmUoJy4vaW5kZXhPZk5hTicpO1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLmluZGV4T2ZgIHdpdGhvdXQgc3VwcG9ydCBmb3IgYmluYXJ5IHNlYXJjaGVzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheSBUaGUgYXJyYXkgdG8gc2VhcmNoLlxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gc2VhcmNoIGZvci5cbiAqIEBwYXJhbSB7bnVtYmVyfSBmcm9tSW5kZXggVGhlIGluZGV4IHRvIHNlYXJjaCBmcm9tLlxuICogQHJldHVybnMge251bWJlcn0gUmV0dXJucyB0aGUgaW5kZXggb2YgdGhlIG1hdGNoZWQgdmFsdWUsIGVsc2UgYC0xYC5cbiAqL1xuZnVuY3Rpb24gYmFzZUluZGV4T2YoYXJyYXksIHZhbHVlLCBmcm9tSW5kZXgpIHtcbiAgaWYgKHZhbHVlICE9PSB2YWx1ZSkge1xuICAgIHJldHVybiBpbmRleE9mTmFOKGFycmF5LCBmcm9tSW5kZXgpO1xuICB9XG4gIHZhciBpbmRleCA9IGZyb21JbmRleCAtIDEsXG4gICAgICBsZW5ndGggPSBhcnJheS5sZW5ndGg7XG5cbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICBpZiAoYXJyYXlbaW5kZXhdID09PSB2YWx1ZSkge1xuICAgICAgcmV0dXJuIGluZGV4O1xuICAgIH1cbiAgfVxuICByZXR1cm4gLTE7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYmFzZUluZGV4T2Y7XG4iLCJ2YXIgYmFzZUlzRXF1YWxEZWVwID0gcmVxdWlyZSgnLi9iYXNlSXNFcXVhbERlZXAnKTtcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5pc0VxdWFsYCB3aXRob3V0IHN1cHBvcnQgZm9yIGB0aGlzYCBiaW5kaW5nXG4gKiBgY3VzdG9taXplcmAgZnVuY3Rpb25zLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjb21wYXJlLlxuICogQHBhcmFtIHsqfSBvdGhlciBUaGUgb3RoZXIgdmFsdWUgdG8gY29tcGFyZS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtjdXN0b21pemVyXSBUaGUgZnVuY3Rpb24gdG8gY3VzdG9taXplIGNvbXBhcmluZyB2YWx1ZXMuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtpc0xvb3NlXSBTcGVjaWZ5IHBlcmZvcm1pbmcgcGFydGlhbCBjb21wYXJpc29ucy5cbiAqIEBwYXJhbSB7QXJyYXl9IFtzdGFja0FdIFRyYWNrcyB0cmF2ZXJzZWQgYHZhbHVlYCBvYmplY3RzLlxuICogQHBhcmFtIHtBcnJheX0gW3N0YWNrQl0gVHJhY2tzIHRyYXZlcnNlZCBgb3RoZXJgIG9iamVjdHMuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIHZhbHVlcyBhcmUgZXF1aXZhbGVudCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBiYXNlSXNFcXVhbCh2YWx1ZSwgb3RoZXIsIGN1c3RvbWl6ZXIsIGlzTG9vc2UsIHN0YWNrQSwgc3RhY2tCKSB7XG4gIC8vIEV4aXQgZWFybHkgZm9yIGlkZW50aWNhbCB2YWx1ZXMuXG4gIGlmICh2YWx1ZSA9PT0gb3RoZXIpIHtcbiAgICAvLyBUcmVhdCBgKzBgIHZzLiBgLTBgIGFzIG5vdCBlcXVhbC5cbiAgICByZXR1cm4gdmFsdWUgIT09IDAgfHwgKDEgLyB2YWx1ZSA9PSAxIC8gb3RoZXIpO1xuICB9XG4gIHZhciB2YWxUeXBlID0gdHlwZW9mIHZhbHVlLFxuICAgICAgb3RoVHlwZSA9IHR5cGVvZiBvdGhlcjtcblxuICAvLyBFeGl0IGVhcmx5IGZvciB1bmxpa2UgcHJpbWl0aXZlIHZhbHVlcy5cbiAgaWYgKCh2YWxUeXBlICE9ICdmdW5jdGlvbicgJiYgdmFsVHlwZSAhPSAnb2JqZWN0JyAmJiBvdGhUeXBlICE9ICdmdW5jdGlvbicgJiYgb3RoVHlwZSAhPSAnb2JqZWN0JykgfHxcbiAgICAgIHZhbHVlID09IG51bGwgfHwgb3RoZXIgPT0gbnVsbCkge1xuICAgIC8vIFJldHVybiBgZmFsc2VgIHVubGVzcyBib3RoIHZhbHVlcyBhcmUgYE5hTmAuXG4gICAgcmV0dXJuIHZhbHVlICE9PSB2YWx1ZSAmJiBvdGhlciAhPT0gb3RoZXI7XG4gIH1cbiAgcmV0dXJuIGJhc2VJc0VxdWFsRGVlcCh2YWx1ZSwgb3RoZXIsIGJhc2VJc0VxdWFsLCBjdXN0b21pemVyLCBpc0xvb3NlLCBzdGFja0EsIHN0YWNrQik7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYmFzZUlzRXF1YWw7XG4iLCJ2YXIgZXF1YWxBcnJheXMgPSByZXF1aXJlKCcuL2VxdWFsQXJyYXlzJyksXG4gICAgZXF1YWxCeVRhZyA9IHJlcXVpcmUoJy4vZXF1YWxCeVRhZycpLFxuICAgIGVxdWFsT2JqZWN0cyA9IHJlcXVpcmUoJy4vZXF1YWxPYmplY3RzJyksXG4gICAgaXNBcnJheSA9IHJlcXVpcmUoJy4uL2xhbmcvaXNBcnJheScpLFxuICAgIGlzVHlwZWRBcnJheSA9IHJlcXVpcmUoJy4uL2xhbmcvaXNUeXBlZEFycmF5Jyk7XG5cbi8qKiBgT2JqZWN0I3RvU3RyaW5nYCByZXN1bHQgcmVmZXJlbmNlcy4gKi9cbnZhciBhcmdzVGFnID0gJ1tvYmplY3QgQXJndW1lbnRzXScsXG4gICAgYXJyYXlUYWcgPSAnW29iamVjdCBBcnJheV0nLFxuICAgIGZ1bmNUYWcgPSAnW29iamVjdCBGdW5jdGlvbl0nLFxuICAgIG9iamVjdFRhZyA9ICdbb2JqZWN0IE9iamVjdF0nO1xuXG4vKiogVXNlZCBmb3IgbmF0aXZlIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqIFVzZWQgdG8gY2hlY2sgb2JqZWN0cyBmb3Igb3duIHByb3BlcnRpZXMuICovXG52YXIgaGFzT3duUHJvcGVydHkgPSBvYmplY3RQcm90by5oYXNPd25Qcm9wZXJ0eTtcblxuLyoqXG4gKiBVc2VkIHRvIHJlc29sdmUgdGhlIFtgdG9TdHJpbmdUYWdgXShodHRwczovL3Blb3BsZS5tb3ppbGxhLm9yZy9+am9yZW5kb3JmZi9lczYtZHJhZnQuaHRtbCNzZWMtb2JqZWN0LnByb3RvdHlwZS50b3N0cmluZylcbiAqIG9mIHZhbHVlcy5cbiAqL1xudmFyIG9ialRvU3RyaW5nID0gb2JqZWN0UHJvdG8udG9TdHJpbmc7XG5cbi8qKlxuICogQSBzcGVjaWFsaXplZCB2ZXJzaW9uIG9mIGBiYXNlSXNFcXVhbGAgZm9yIGFycmF5cyBhbmQgb2JqZWN0cyB3aGljaCBwZXJmb3Jtc1xuICogZGVlcCBjb21wYXJpc29ucyBhbmQgdHJhY2tzIHRyYXZlcnNlZCBvYmplY3RzIGVuYWJsaW5nIG9iamVjdHMgd2l0aCBjaXJjdWxhclxuICogcmVmZXJlbmNlcyB0byBiZSBjb21wYXJlZC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIGNvbXBhcmUuXG4gKiBAcGFyYW0ge09iamVjdH0gb3RoZXIgVGhlIG90aGVyIG9iamVjdCB0byBjb21wYXJlLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZXF1YWxGdW5jIFRoZSBmdW5jdGlvbiB0byBkZXRlcm1pbmUgZXF1aXZhbGVudHMgb2YgdmFsdWVzLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gW2N1c3RvbWl6ZXJdIFRoZSBmdW5jdGlvbiB0byBjdXN0b21pemUgY29tcGFyaW5nIG9iamVjdHMuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtpc0xvb3NlXSBTcGVjaWZ5IHBlcmZvcm1pbmcgcGFydGlhbCBjb21wYXJpc29ucy5cbiAqIEBwYXJhbSB7QXJyYXl9IFtzdGFja0E9W11dIFRyYWNrcyB0cmF2ZXJzZWQgYHZhbHVlYCBvYmplY3RzLlxuICogQHBhcmFtIHtBcnJheX0gW3N0YWNrQj1bXV0gVHJhY2tzIHRyYXZlcnNlZCBgb3RoZXJgIG9iamVjdHMuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIG9iamVjdHMgYXJlIGVxdWl2YWxlbnQsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gYmFzZUlzRXF1YWxEZWVwKG9iamVjdCwgb3RoZXIsIGVxdWFsRnVuYywgY3VzdG9taXplciwgaXNMb29zZSwgc3RhY2tBLCBzdGFja0IpIHtcbiAgdmFyIG9iaklzQXJyID0gaXNBcnJheShvYmplY3QpLFxuICAgICAgb3RoSXNBcnIgPSBpc0FycmF5KG90aGVyKSxcbiAgICAgIG9ialRhZyA9IGFycmF5VGFnLFxuICAgICAgb3RoVGFnID0gYXJyYXlUYWc7XG5cbiAgaWYgKCFvYmpJc0Fycikge1xuICAgIG9ialRhZyA9IG9ialRvU3RyaW5nLmNhbGwob2JqZWN0KTtcbiAgICBpZiAob2JqVGFnID09IGFyZ3NUYWcpIHtcbiAgICAgIG9ialRhZyA9IG9iamVjdFRhZztcbiAgICB9IGVsc2UgaWYgKG9ialRhZyAhPSBvYmplY3RUYWcpIHtcbiAgICAgIG9iaklzQXJyID0gaXNUeXBlZEFycmF5KG9iamVjdCk7XG4gICAgfVxuICB9XG4gIGlmICghb3RoSXNBcnIpIHtcbiAgICBvdGhUYWcgPSBvYmpUb1N0cmluZy5jYWxsKG90aGVyKTtcbiAgICBpZiAob3RoVGFnID09IGFyZ3NUYWcpIHtcbiAgICAgIG90aFRhZyA9IG9iamVjdFRhZztcbiAgICB9IGVsc2UgaWYgKG90aFRhZyAhPSBvYmplY3RUYWcpIHtcbiAgICAgIG90aElzQXJyID0gaXNUeXBlZEFycmF5KG90aGVyKTtcbiAgICB9XG4gIH1cbiAgdmFyIG9iaklzT2JqID0gKG9ialRhZyA9PSBvYmplY3RUYWcgfHwgKGlzTG9vc2UgJiYgb2JqVGFnID09IGZ1bmNUYWcpKSxcbiAgICAgIG90aElzT2JqID0gKG90aFRhZyA9PSBvYmplY3RUYWcgfHwgKGlzTG9vc2UgJiYgb3RoVGFnID09IGZ1bmNUYWcpKSxcbiAgICAgIGlzU2FtZVRhZyA9IG9ialRhZyA9PSBvdGhUYWc7XG5cbiAgaWYgKGlzU2FtZVRhZyAmJiAhKG9iaklzQXJyIHx8IG9iaklzT2JqKSkge1xuICAgIHJldHVybiBlcXVhbEJ5VGFnKG9iamVjdCwgb3RoZXIsIG9ialRhZyk7XG4gIH1cbiAgaWYgKGlzTG9vc2UpIHtcbiAgICBpZiAoIWlzU2FtZVRhZyAmJiAhKG9iaklzT2JqICYmIG90aElzT2JqKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICB2YXIgdmFsV3JhcHBlZCA9IG9iaklzT2JqICYmIGhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCAnX193cmFwcGVkX18nKSxcbiAgICAgICAgb3RoV3JhcHBlZCA9IG90aElzT2JqICYmIGhhc093blByb3BlcnR5LmNhbGwob3RoZXIsICdfX3dyYXBwZWRfXycpO1xuXG4gICAgaWYgKHZhbFdyYXBwZWQgfHwgb3RoV3JhcHBlZCkge1xuICAgICAgcmV0dXJuIGVxdWFsRnVuYyh2YWxXcmFwcGVkID8gb2JqZWN0LnZhbHVlKCkgOiBvYmplY3QsIG90aFdyYXBwZWQgPyBvdGhlci52YWx1ZSgpIDogb3RoZXIsIGN1c3RvbWl6ZXIsIGlzTG9vc2UsIHN0YWNrQSwgc3RhY2tCKTtcbiAgICB9XG4gICAgaWYgKCFpc1NhbWVUYWcpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cbiAgLy8gQXNzdW1lIGN5Y2xpYyB2YWx1ZXMgYXJlIGVxdWFsLlxuICAvLyBGb3IgbW9yZSBpbmZvcm1hdGlvbiBvbiBkZXRlY3RpbmcgY2lyY3VsYXIgcmVmZXJlbmNlcyBzZWUgaHR0cHM6Ly9lczUuZ2l0aHViLmlvLyNKTy5cbiAgc3RhY2tBIHx8IChzdGFja0EgPSBbXSk7XG4gIHN0YWNrQiB8fCAoc3RhY2tCID0gW10pO1xuXG4gIHZhciBsZW5ndGggPSBzdGFja0EubGVuZ3RoO1xuICB3aGlsZSAobGVuZ3RoLS0pIHtcbiAgICBpZiAoc3RhY2tBW2xlbmd0aF0gPT0gb2JqZWN0KSB7XG4gICAgICByZXR1cm4gc3RhY2tCW2xlbmd0aF0gPT0gb3RoZXI7XG4gICAgfVxuICB9XG4gIC8vIEFkZCBgb2JqZWN0YCBhbmQgYG90aGVyYCB0byB0aGUgc3RhY2sgb2YgdHJhdmVyc2VkIG9iamVjdHMuXG4gIHN0YWNrQS5wdXNoKG9iamVjdCk7XG4gIHN0YWNrQi5wdXNoKG90aGVyKTtcblxuICB2YXIgcmVzdWx0ID0gKG9iaklzQXJyID8gZXF1YWxBcnJheXMgOiBlcXVhbE9iamVjdHMpKG9iamVjdCwgb3RoZXIsIGVxdWFsRnVuYywgY3VzdG9taXplciwgaXNMb29zZSwgc3RhY2tBLCBzdGFja0IpO1xuXG4gIHN0YWNrQS5wb3AoKTtcbiAgc3RhY2tCLnBvcCgpO1xuXG4gIHJldHVybiByZXN1bHQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYmFzZUlzRXF1YWxEZWVwO1xuIiwiLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5pc0Z1bmN0aW9uYCB3aXRob3V0IHN1cHBvcnQgZm9yIGVudmlyb25tZW50c1xuICogd2l0aCBpbmNvcnJlY3QgYHR5cGVvZmAgcmVzdWx0cy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBjb3JyZWN0bHkgY2xhc3NpZmllZCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBiYXNlSXNGdW5jdGlvbih2YWx1ZSkge1xuICAvLyBBdm9pZCBhIENoYWtyYSBKSVQgYnVnIGluIGNvbXBhdGliaWxpdHkgbW9kZXMgb2YgSUUgMTEuXG4gIC8vIFNlZSBodHRwczovL2dpdGh1Yi5jb20vamFzaGtlbmFzL3VuZGVyc2NvcmUvaXNzdWVzLzE2MjEgZm9yIG1vcmUgZGV0YWlscy5cbiAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PSAnZnVuY3Rpb24nIHx8IGZhbHNlO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJhc2VJc0Z1bmN0aW9uO1xuIiwidmFyIGJhc2VJc0VxdWFsID0gcmVxdWlyZSgnLi9iYXNlSXNFcXVhbCcpO1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLmlzTWF0Y2hgIHdpdGhvdXQgc3VwcG9ydCBmb3IgY2FsbGJhY2tcbiAqIHNob3J0aGFuZHMgYW5kIGB0aGlzYCBiaW5kaW5nLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gaW5zcGVjdC5cbiAqIEBwYXJhbSB7QXJyYXl9IHByb3BzIFRoZSBzb3VyY2UgcHJvcGVydHkgbmFtZXMgdG8gbWF0Y2guXG4gKiBAcGFyYW0ge0FycmF5fSB2YWx1ZXMgVGhlIHNvdXJjZSB2YWx1ZXMgdG8gbWF0Y2guXG4gKiBAcGFyYW0ge0FycmF5fSBzdHJpY3RDb21wYXJlRmxhZ3MgU3RyaWN0IGNvbXBhcmlzb24gZmxhZ3MgZm9yIHNvdXJjZSB2YWx1ZXMuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY3VzdG9taXplcl0gVGhlIGZ1bmN0aW9uIHRvIGN1c3RvbWl6ZSBjb21wYXJpbmcgb2JqZWN0cy5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgb2JqZWN0YCBpcyBhIG1hdGNoLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGJhc2VJc01hdGNoKG9iamVjdCwgcHJvcHMsIHZhbHVlcywgc3RyaWN0Q29tcGFyZUZsYWdzLCBjdXN0b21pemVyKSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgbGVuZ3RoID0gcHJvcHMubGVuZ3RoLFxuICAgICAgbm9DdXN0b21pemVyID0gIWN1c3RvbWl6ZXI7XG5cbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICBpZiAoKG5vQ3VzdG9taXplciAmJiBzdHJpY3RDb21wYXJlRmxhZ3NbaW5kZXhdKVxuICAgICAgICAgID8gdmFsdWVzW2luZGV4XSAhPT0gb2JqZWN0W3Byb3BzW2luZGV4XV1cbiAgICAgICAgICA6ICEocHJvcHNbaW5kZXhdIGluIG9iamVjdClcbiAgICAgICAgKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG4gIGluZGV4ID0gLTE7XG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgdmFyIGtleSA9IHByb3BzW2luZGV4XSxcbiAgICAgICAgb2JqVmFsdWUgPSBvYmplY3Rba2V5XSxcbiAgICAgICAgc3JjVmFsdWUgPSB2YWx1ZXNbaW5kZXhdO1xuXG4gICAgaWYgKG5vQ3VzdG9taXplciAmJiBzdHJpY3RDb21wYXJlRmxhZ3NbaW5kZXhdKSB7XG4gICAgICB2YXIgcmVzdWx0ID0gdHlwZW9mIG9ialZhbHVlICE9ICd1bmRlZmluZWQnIHx8IChrZXkgaW4gb2JqZWN0KTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmVzdWx0ID0gY3VzdG9taXplciA/IGN1c3RvbWl6ZXIob2JqVmFsdWUsIHNyY1ZhbHVlLCBrZXkpIDogdW5kZWZpbmVkO1xuICAgICAgaWYgKHR5cGVvZiByZXN1bHQgPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgcmVzdWx0ID0gYmFzZUlzRXF1YWwoc3JjVmFsdWUsIG9ialZhbHVlLCBjdXN0b21pemVyLCB0cnVlKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKCFyZXN1bHQpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHRydWU7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYmFzZUlzTWF0Y2g7XG4iLCJ2YXIgYmFzZUVhY2ggPSByZXF1aXJlKCcuL2Jhc2VFYWNoJyk7XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8ubWFwYCB3aXRob3V0IHN1cHBvcnQgZm9yIGNhbGxiYWNrIHNob3J0aGFuZHNcbiAqIGFuZCBgdGhpc2AgYmluZGluZy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheXxPYmplY3R8c3RyaW5nfSBjb2xsZWN0aW9uIFRoZSBjb2xsZWN0aW9uIHRvIGl0ZXJhdGUgb3Zlci5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGl0ZXJhdGVlIFRoZSBmdW5jdGlvbiBpbnZva2VkIHBlciBpdGVyYXRpb24uXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIG5ldyBtYXBwZWQgYXJyYXkuXG4gKi9cbmZ1bmN0aW9uIGJhc2VNYXAoY29sbGVjdGlvbiwgaXRlcmF0ZWUpIHtcbiAgdmFyIHJlc3VsdCA9IFtdO1xuICBiYXNlRWFjaChjb2xsZWN0aW9uLCBmdW5jdGlvbih2YWx1ZSwga2V5LCBjb2xsZWN0aW9uKSB7XG4gICAgcmVzdWx0LnB1c2goaXRlcmF0ZWUodmFsdWUsIGtleSwgY29sbGVjdGlvbikpO1xuICB9KTtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBiYXNlTWFwO1xuIiwidmFyIGJhc2VJc01hdGNoID0gcmVxdWlyZSgnLi9iYXNlSXNNYXRjaCcpLFxuICAgIGNvbnN0YW50ID0gcmVxdWlyZSgnLi4vdXRpbGl0eS9jb25zdGFudCcpLFxuICAgIGlzU3RyaWN0Q29tcGFyYWJsZSA9IHJlcXVpcmUoJy4vaXNTdHJpY3RDb21wYXJhYmxlJyksXG4gICAga2V5cyA9IHJlcXVpcmUoJy4uL29iamVjdC9rZXlzJyksXG4gICAgdG9PYmplY3QgPSByZXF1aXJlKCcuL3RvT2JqZWN0Jyk7XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8ubWF0Y2hlc2Agd2hpY2ggZG9lcyBub3QgY2xvbmUgYHNvdXJjZWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBzb3VyY2UgVGhlIG9iamVjdCBvZiBwcm9wZXJ0eSB2YWx1ZXMgdG8gbWF0Y2guXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gYmFzZU1hdGNoZXMoc291cmNlKSB7XG4gIHZhciBwcm9wcyA9IGtleXMoc291cmNlKSxcbiAgICAgIGxlbmd0aCA9IHByb3BzLmxlbmd0aDtcblxuICBpZiAoIWxlbmd0aCkge1xuICAgIHJldHVybiBjb25zdGFudCh0cnVlKTtcbiAgfVxuICBpZiAobGVuZ3RoID09IDEpIHtcbiAgICB2YXIga2V5ID0gcHJvcHNbMF0sXG4gICAgICAgIHZhbHVlID0gc291cmNlW2tleV07XG5cbiAgICBpZiAoaXNTdHJpY3RDb21wYXJhYmxlKHZhbHVlKSkge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uKG9iamVjdCkge1xuICAgICAgICByZXR1cm4gb2JqZWN0ICE9IG51bGwgJiYgb2JqZWN0W2tleV0gPT09IHZhbHVlICYmXG4gICAgICAgICAgKHR5cGVvZiB2YWx1ZSAhPSAndW5kZWZpbmVkJyB8fCAoa2V5IGluIHRvT2JqZWN0KG9iamVjdCkpKTtcbiAgICAgIH07XG4gICAgfVxuICB9XG4gIHZhciB2YWx1ZXMgPSBBcnJheShsZW5ndGgpLFxuICAgICAgc3RyaWN0Q29tcGFyZUZsYWdzID0gQXJyYXkobGVuZ3RoKTtcblxuICB3aGlsZSAobGVuZ3RoLS0pIHtcbiAgICB2YWx1ZSA9IHNvdXJjZVtwcm9wc1tsZW5ndGhdXTtcbiAgICB2YWx1ZXNbbGVuZ3RoXSA9IHZhbHVlO1xuICAgIHN0cmljdENvbXBhcmVGbGFnc1tsZW5ndGhdID0gaXNTdHJpY3RDb21wYXJhYmxlKHZhbHVlKTtcbiAgfVxuICByZXR1cm4gZnVuY3Rpb24ob2JqZWN0KSB7XG4gICAgcmV0dXJuIG9iamVjdCAhPSBudWxsICYmIGJhc2VJc01hdGNoKHRvT2JqZWN0KG9iamVjdCksIHByb3BzLCB2YWx1ZXMsIHN0cmljdENvbXBhcmVGbGFncyk7XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYmFzZU1hdGNoZXM7XG4iLCJ2YXIgYmFzZUlzRXF1YWwgPSByZXF1aXJlKCcuL2Jhc2VJc0VxdWFsJyksXG4gICAgaXNTdHJpY3RDb21wYXJhYmxlID0gcmVxdWlyZSgnLi9pc1N0cmljdENvbXBhcmFibGUnKSxcbiAgICB0b09iamVjdCA9IHJlcXVpcmUoJy4vdG9PYmplY3QnKTtcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5tYXRjaGVzUHJvcGVydHlgIHdoaWNoIGRvZXMgbm90IGNvZXJjZSBga2V5YFxuICogdG8gYSBzdHJpbmcuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgcHJvcGVydHkgdG8gZ2V0LlxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY29tcGFyZS5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiBiYXNlTWF0Y2hlc1Byb3BlcnR5KGtleSwgdmFsdWUpIHtcbiAgaWYgKGlzU3RyaWN0Q29tcGFyYWJsZSh2YWx1ZSkpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24ob2JqZWN0KSB7XG4gICAgICByZXR1cm4gb2JqZWN0ICE9IG51bGwgJiYgb2JqZWN0W2tleV0gPT09IHZhbHVlICYmXG4gICAgICAgICh0eXBlb2YgdmFsdWUgIT0gJ3VuZGVmaW5lZCcgfHwgKGtleSBpbiB0b09iamVjdChvYmplY3QpKSk7XG4gICAgfTtcbiAgfVxuICByZXR1cm4gZnVuY3Rpb24ob2JqZWN0KSB7XG4gICAgcmV0dXJuIG9iamVjdCAhPSBudWxsICYmIGJhc2VJc0VxdWFsKHZhbHVlLCBvYmplY3Rba2V5XSwgbnVsbCwgdHJ1ZSk7XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYmFzZU1hdGNoZXNQcm9wZXJ0eTtcbiIsIi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8ucHJvcGVydHlgIHdoaWNoIGRvZXMgbm90IGNvZXJjZSBga2V5YCB0byBhIHN0cmluZy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSBwcm9wZXJ0eSB0byBnZXQuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gYmFzZVByb3BlcnR5KGtleSkge1xuICByZXR1cm4gZnVuY3Rpb24ob2JqZWN0KSB7XG4gICAgcmV0dXJuIG9iamVjdCA9PSBudWxsID8gdW5kZWZpbmVkIDogb2JqZWN0W2tleV07XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYmFzZVByb3BlcnR5O1xuIiwiLyoqXG4gKiBDb252ZXJ0cyBgdmFsdWVgIHRvIGEgc3RyaW5nIGlmIGl0IGlzIG5vdCBvbmUuIEFuIGVtcHR5IHN0cmluZyBpcyByZXR1cm5lZFxuICogZm9yIGBudWxsYCBvciBgdW5kZWZpbmVkYCB2YWx1ZXMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHByb2Nlc3MuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSBzdHJpbmcuXG4gKi9cbmZ1bmN0aW9uIGJhc2VUb1N0cmluZyh2YWx1ZSkge1xuICBpZiAodHlwZW9mIHZhbHVlID09ICdzdHJpbmcnKSB7XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG4gIHJldHVybiB2YWx1ZSA9PSBudWxsID8gJycgOiAodmFsdWUgKyAnJyk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYmFzZVRvU3RyaW5nO1xuIiwidmFyIGJhc2VJbmRleE9mID0gcmVxdWlyZSgnLi9iYXNlSW5kZXhPZicpLFxuICAgIGNhY2hlSW5kZXhPZiA9IHJlcXVpcmUoJy4vY2FjaGVJbmRleE9mJyksXG4gICAgY3JlYXRlQ2FjaGUgPSByZXF1aXJlKCcuL2NyZWF0ZUNhY2hlJyk7XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8udW5pcWAgd2l0aG91dCBzdXBwb3J0IGZvciBjYWxsYmFjayBzaG9ydGhhbmRzXG4gKiBhbmQgYHRoaXNgIGJpbmRpbmcuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IFRoZSBhcnJheSB0byBpbnNwZWN0LlxuICogQHBhcmFtIHtGdW5jdGlvbn0gW2l0ZXJhdGVlXSBUaGUgZnVuY3Rpb24gaW52b2tlZCBwZXIgaXRlcmF0aW9uLlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBuZXcgZHVwbGljYXRlLXZhbHVlLWZyZWUgYXJyYXkuXG4gKi9cbmZ1bmN0aW9uIGJhc2VVbmlxKGFycmF5LCBpdGVyYXRlZSkge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGluZGV4T2YgPSBiYXNlSW5kZXhPZixcbiAgICAgIGxlbmd0aCA9IGFycmF5Lmxlbmd0aCxcbiAgICAgIGlzQ29tbW9uID0gdHJ1ZSxcbiAgICAgIGlzTGFyZ2UgPSBpc0NvbW1vbiAmJiBsZW5ndGggPj0gMjAwLFxuICAgICAgc2VlbiA9IGlzTGFyZ2UgPyBjcmVhdGVDYWNoZSgpIDogbnVsbCxcbiAgICAgIHJlc3VsdCA9IFtdO1xuXG4gIGlmIChzZWVuKSB7XG4gICAgaW5kZXhPZiA9IGNhY2hlSW5kZXhPZjtcbiAgICBpc0NvbW1vbiA9IGZhbHNlO1xuICB9IGVsc2Uge1xuICAgIGlzTGFyZ2UgPSBmYWxzZTtcbiAgICBzZWVuID0gaXRlcmF0ZWUgPyBbXSA6IHJlc3VsdDtcbiAgfVxuICBvdXRlcjpcbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICB2YXIgdmFsdWUgPSBhcnJheVtpbmRleF0sXG4gICAgICAgIGNvbXB1dGVkID0gaXRlcmF0ZWUgPyBpdGVyYXRlZSh2YWx1ZSwgaW5kZXgsIGFycmF5KSA6IHZhbHVlO1xuXG4gICAgaWYgKGlzQ29tbW9uICYmIHZhbHVlID09PSB2YWx1ZSkge1xuICAgICAgdmFyIHNlZW5JbmRleCA9IHNlZW4ubGVuZ3RoO1xuICAgICAgd2hpbGUgKHNlZW5JbmRleC0tKSB7XG4gICAgICAgIGlmIChzZWVuW3NlZW5JbmRleF0gPT09IGNvbXB1dGVkKSB7XG4gICAgICAgICAgY29udGludWUgb3V0ZXI7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChpdGVyYXRlZSkge1xuICAgICAgICBzZWVuLnB1c2goY29tcHV0ZWQpO1xuICAgICAgfVxuICAgICAgcmVzdWx0LnB1c2godmFsdWUpO1xuICAgIH1cbiAgICBlbHNlIGlmIChpbmRleE9mKHNlZW4sIGNvbXB1dGVkLCAwKSA8IDApIHtcbiAgICAgIGlmIChpdGVyYXRlZSB8fCBpc0xhcmdlKSB7XG4gICAgICAgIHNlZW4ucHVzaChjb21wdXRlZCk7XG4gICAgICB9XG4gICAgICByZXN1bHQucHVzaCh2YWx1ZSk7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYmFzZVVuaXE7XG4iLCJ2YXIgaWRlbnRpdHkgPSByZXF1aXJlKCcuLi91dGlsaXR5L2lkZW50aXR5Jyk7XG5cbi8qKlxuICogQSBzcGVjaWFsaXplZCB2ZXJzaW9uIG9mIGBiYXNlQ2FsbGJhY2tgIHdoaWNoIG9ubHkgc3VwcG9ydHMgYHRoaXNgIGJpbmRpbmdcbiAqIGFuZCBzcGVjaWZ5aW5nIHRoZSBudW1iZXIgb2YgYXJndW1lbnRzIHRvIHByb3ZpZGUgdG8gYGZ1bmNgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byBiaW5kLlxuICogQHBhcmFtIHsqfSB0aGlzQXJnIFRoZSBgdGhpc2AgYmluZGluZyBvZiBgZnVuY2AuXG4gKiBAcGFyYW0ge251bWJlcn0gW2FyZ0NvdW50XSBUaGUgbnVtYmVyIG9mIGFyZ3VtZW50cyB0byBwcm92aWRlIHRvIGBmdW5jYC5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgY2FsbGJhY2suXG4gKi9cbmZ1bmN0aW9uIGJpbmRDYWxsYmFjayhmdW5jLCB0aGlzQXJnLCBhcmdDb3VudCkge1xuICBpZiAodHlwZW9mIGZ1bmMgIT0gJ2Z1bmN0aW9uJykge1xuICAgIHJldHVybiBpZGVudGl0eTtcbiAgfVxuICBpZiAodHlwZW9mIHRoaXNBcmcgPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICByZXR1cm4gZnVuYztcbiAgfVxuICBzd2l0Y2ggKGFyZ0NvdW50KSB7XG4gICAgY2FzZSAxOiByZXR1cm4gZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgIHJldHVybiBmdW5jLmNhbGwodGhpc0FyZywgdmFsdWUpO1xuICAgIH07XG4gICAgY2FzZSAzOiByZXR1cm4gZnVuY3Rpb24odmFsdWUsIGluZGV4LCBjb2xsZWN0aW9uKSB7XG4gICAgICByZXR1cm4gZnVuYy5jYWxsKHRoaXNBcmcsIHZhbHVlLCBpbmRleCwgY29sbGVjdGlvbik7XG4gICAgfTtcbiAgICBjYXNlIDQ6IHJldHVybiBmdW5jdGlvbihhY2N1bXVsYXRvciwgdmFsdWUsIGluZGV4LCBjb2xsZWN0aW9uKSB7XG4gICAgICByZXR1cm4gZnVuYy5jYWxsKHRoaXNBcmcsIGFjY3VtdWxhdG9yLCB2YWx1ZSwgaW5kZXgsIGNvbGxlY3Rpb24pO1xuICAgIH07XG4gICAgY2FzZSA1OiByZXR1cm4gZnVuY3Rpb24odmFsdWUsIG90aGVyLCBrZXksIG9iamVjdCwgc291cmNlKSB7XG4gICAgICByZXR1cm4gZnVuYy5jYWxsKHRoaXNBcmcsIHZhbHVlLCBvdGhlciwga2V5LCBvYmplY3QsIHNvdXJjZSk7XG4gICAgfTtcbiAgfVxuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIGZ1bmMuYXBwbHkodGhpc0FyZywgYXJndW1lbnRzKTtcbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBiaW5kQ2FsbGJhY2s7XG4iLCJ2YXIgY29uc3RhbnQgPSByZXF1aXJlKCcuLi91dGlsaXR5L2NvbnN0YW50JyksXG4gICAgaXNOYXRpdmUgPSByZXF1aXJlKCcuLi9sYW5nL2lzTmF0aXZlJyk7XG5cbi8qKiBOYXRpdmUgbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgQXJyYXlCdWZmZXIgPSBpc05hdGl2ZShBcnJheUJ1ZmZlciA9IGdsb2JhbC5BcnJheUJ1ZmZlcikgJiYgQXJyYXlCdWZmZXIsXG4gICAgYnVmZmVyU2xpY2UgPSBpc05hdGl2ZShidWZmZXJTbGljZSA9IEFycmF5QnVmZmVyICYmIG5ldyBBcnJheUJ1ZmZlcigwKS5zbGljZSkgJiYgYnVmZmVyU2xpY2UsXG4gICAgZmxvb3IgPSBNYXRoLmZsb29yLFxuICAgIFVpbnQ4QXJyYXkgPSBpc05hdGl2ZShVaW50OEFycmF5ID0gZ2xvYmFsLlVpbnQ4QXJyYXkpICYmIFVpbnQ4QXJyYXk7XG5cbi8qKiBVc2VkIHRvIGNsb25lIGFycmF5IGJ1ZmZlcnMuICovXG52YXIgRmxvYXQ2NEFycmF5ID0gKGZ1bmN0aW9uKCkge1xuICAvLyBTYWZhcmkgNSBlcnJvcnMgd2hlbiB1c2luZyBhbiBhcnJheSBidWZmZXIgdG8gaW5pdGlhbGl6ZSBhIHR5cGVkIGFycmF5XG4gIC8vIHdoZXJlIHRoZSBhcnJheSBidWZmZXIncyBgYnl0ZUxlbmd0aGAgaXMgbm90IGEgbXVsdGlwbGUgb2YgdGhlIHR5cGVkXG4gIC8vIGFycmF5J3MgYEJZVEVTX1BFUl9FTEVNRU5UYC5cbiAgdHJ5IHtcbiAgICB2YXIgZnVuYyA9IGlzTmF0aXZlKGZ1bmMgPSBnbG9iYWwuRmxvYXQ2NEFycmF5KSAmJiBmdW5jLFxuICAgICAgICByZXN1bHQgPSBuZXcgZnVuYyhuZXcgQXJyYXlCdWZmZXIoMTApLCAwLCAxKSAmJiBmdW5jO1xuICB9IGNhdGNoKGUpIHt9XG4gIHJldHVybiByZXN1bHQ7XG59KCkpO1xuXG4vKiogVXNlZCBhcyB0aGUgc2l6ZSwgaW4gYnl0ZXMsIG9mIGVhY2ggYEZsb2F0NjRBcnJheWAgZWxlbWVudC4gKi9cbnZhciBGTE9BVDY0X0JZVEVTX1BFUl9FTEVNRU5UID0gRmxvYXQ2NEFycmF5ID8gRmxvYXQ2NEFycmF5LkJZVEVTX1BFUl9FTEVNRU5UIDogMDtcblxuLyoqXG4gKiBDcmVhdGVzIGEgY2xvbmUgb2YgdGhlIGdpdmVuIGFycmF5IGJ1ZmZlci5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheUJ1ZmZlcn0gYnVmZmVyIFRoZSBhcnJheSBidWZmZXIgdG8gY2xvbmUuXG4gKiBAcmV0dXJucyB7QXJyYXlCdWZmZXJ9IFJldHVybnMgdGhlIGNsb25lZCBhcnJheSBidWZmZXIuXG4gKi9cbmZ1bmN0aW9uIGJ1ZmZlckNsb25lKGJ1ZmZlcikge1xuICByZXR1cm4gYnVmZmVyU2xpY2UuY2FsbChidWZmZXIsIDApO1xufVxuaWYgKCFidWZmZXJTbGljZSkge1xuICAvLyBQaGFudG9tSlMgaGFzIGBBcnJheUJ1ZmZlcmAgYW5kIGBVaW50OEFycmF5YCBidXQgbm90IGBGbG9hdDY0QXJyYXlgLlxuICBidWZmZXJDbG9uZSA9ICEoQXJyYXlCdWZmZXIgJiYgVWludDhBcnJheSkgPyBjb25zdGFudChudWxsKSA6IGZ1bmN0aW9uKGJ1ZmZlcikge1xuICAgIHZhciBieXRlTGVuZ3RoID0gYnVmZmVyLmJ5dGVMZW5ndGgsXG4gICAgICAgIGZsb2F0TGVuZ3RoID0gRmxvYXQ2NEFycmF5ID8gZmxvb3IoYnl0ZUxlbmd0aCAvIEZMT0FUNjRfQllURVNfUEVSX0VMRU1FTlQpIDogMCxcbiAgICAgICAgb2Zmc2V0ID0gZmxvYXRMZW5ndGggKiBGTE9BVDY0X0JZVEVTX1BFUl9FTEVNRU5ULFxuICAgICAgICByZXN1bHQgPSBuZXcgQXJyYXlCdWZmZXIoYnl0ZUxlbmd0aCk7XG5cbiAgICBpZiAoZmxvYXRMZW5ndGgpIHtcbiAgICAgIHZhciB2aWV3ID0gbmV3IEZsb2F0NjRBcnJheShyZXN1bHQsIDAsIGZsb2F0TGVuZ3RoKTtcbiAgICAgIHZpZXcuc2V0KG5ldyBGbG9hdDY0QXJyYXkoYnVmZmVyLCAwLCBmbG9hdExlbmd0aCkpO1xuICAgIH1cbiAgICBpZiAoYnl0ZUxlbmd0aCAhPSBvZmZzZXQpIHtcbiAgICAgIHZpZXcgPSBuZXcgVWludDhBcnJheShyZXN1bHQsIG9mZnNldCk7XG4gICAgICB2aWV3LnNldChuZXcgVWludDhBcnJheShidWZmZXIsIG9mZnNldCkpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJ1ZmZlckNsb25lO1xuIiwidmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi4vbGFuZy9pc09iamVjdCcpO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGluIGBjYWNoZWAgbWltaWNraW5nIHRoZSByZXR1cm4gc2lnbmF0dXJlIG9mXG4gKiBgXy5pbmRleE9mYCBieSByZXR1cm5pbmcgYDBgIGlmIHRoZSB2YWx1ZSBpcyBmb3VuZCwgZWxzZSBgLTFgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gY2FjaGUgVGhlIGNhY2hlIHRvIHNlYXJjaC5cbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHNlYXJjaCBmb3IuXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBSZXR1cm5zIGAwYCBpZiBgdmFsdWVgIGlzIGZvdW5kLCBlbHNlIGAtMWAuXG4gKi9cbmZ1bmN0aW9uIGNhY2hlSW5kZXhPZihjYWNoZSwgdmFsdWUpIHtcbiAgdmFyIGRhdGEgPSBjYWNoZS5kYXRhLFxuICAgICAgcmVzdWx0ID0gKHR5cGVvZiB2YWx1ZSA9PSAnc3RyaW5nJyB8fCBpc09iamVjdCh2YWx1ZSkpID8gZGF0YS5zZXQuaGFzKHZhbHVlKSA6IGRhdGEuaGFzaFt2YWx1ZV07XG5cbiAgcmV0dXJuIHJlc3VsdCA/IDAgOiAtMTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBjYWNoZUluZGV4T2Y7XG4iLCJ2YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuLi9sYW5nL2lzT2JqZWN0Jyk7XG5cbi8qKlxuICogQWRkcyBgdmFsdWVgIHRvIHRoZSBjYWNoZS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgcHVzaFxuICogQG1lbWJlck9mIFNldENhY2hlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjYWNoZS5cbiAqL1xuZnVuY3Rpb24gY2FjaGVQdXNoKHZhbHVlKSB7XG4gIHZhciBkYXRhID0gdGhpcy5kYXRhO1xuICBpZiAodHlwZW9mIHZhbHVlID09ICdzdHJpbmcnIHx8IGlzT2JqZWN0KHZhbHVlKSkge1xuICAgIGRhdGEuc2V0LmFkZCh2YWx1ZSk7XG4gIH0gZWxzZSB7XG4gICAgZGF0YS5oYXNoW3ZhbHVlXSA9IHRydWU7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBjYWNoZVB1c2g7XG4iLCJ2YXIgaXNMZW5ndGggPSByZXF1aXJlKCcuL2lzTGVuZ3RoJyksXG4gICAgdG9PYmplY3QgPSByZXF1aXJlKCcuL3RvT2JqZWN0Jyk7XG5cbi8qKlxuICogQ3JlYXRlcyBhIGBiYXNlRWFjaGAgb3IgYGJhc2VFYWNoUmlnaHRgIGZ1bmN0aW9uLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBlYWNoRnVuYyBUaGUgZnVuY3Rpb24gdG8gaXRlcmF0ZSBvdmVyIGEgY29sbGVjdGlvbi5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW2Zyb21SaWdodF0gU3BlY2lmeSBpdGVyYXRpbmcgZnJvbSByaWdodCB0byBsZWZ0LlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgYmFzZSBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gY3JlYXRlQmFzZUVhY2goZWFjaEZ1bmMsIGZyb21SaWdodCkge1xuICByZXR1cm4gZnVuY3Rpb24oY29sbGVjdGlvbiwgaXRlcmF0ZWUpIHtcbiAgICB2YXIgbGVuZ3RoID0gY29sbGVjdGlvbiA/IGNvbGxlY3Rpb24ubGVuZ3RoIDogMDtcbiAgICBpZiAoIWlzTGVuZ3RoKGxlbmd0aCkpIHtcbiAgICAgIHJldHVybiBlYWNoRnVuYyhjb2xsZWN0aW9uLCBpdGVyYXRlZSk7XG4gICAgfVxuICAgIHZhciBpbmRleCA9IGZyb21SaWdodCA/IGxlbmd0aCA6IC0xLFxuICAgICAgICBpdGVyYWJsZSA9IHRvT2JqZWN0KGNvbGxlY3Rpb24pO1xuXG4gICAgd2hpbGUgKChmcm9tUmlnaHQgPyBpbmRleC0tIDogKytpbmRleCA8IGxlbmd0aCkpIHtcbiAgICAgIGlmIChpdGVyYXRlZShpdGVyYWJsZVtpbmRleF0sIGluZGV4LCBpdGVyYWJsZSkgPT09IGZhbHNlKSB7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gY29sbGVjdGlvbjtcbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBjcmVhdGVCYXNlRWFjaDtcbiIsInZhciB0b09iamVjdCA9IHJlcXVpcmUoJy4vdG9PYmplY3QnKTtcblxuLyoqXG4gKiBDcmVhdGVzIGEgYmFzZSBmdW5jdGlvbiBmb3IgYF8uZm9ySW5gIG9yIGBfLmZvckluUmlnaHRgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtmcm9tUmlnaHRdIFNwZWNpZnkgaXRlcmF0aW5nIGZyb20gcmlnaHQgdG8gbGVmdC5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IGJhc2UgZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZUJhc2VGb3IoZnJvbVJpZ2h0KSB7XG4gIHJldHVybiBmdW5jdGlvbihvYmplY3QsIGl0ZXJhdGVlLCBrZXlzRnVuYykge1xuICAgIHZhciBpdGVyYWJsZSA9IHRvT2JqZWN0KG9iamVjdCksXG4gICAgICAgIHByb3BzID0ga2V5c0Z1bmMob2JqZWN0KSxcbiAgICAgICAgbGVuZ3RoID0gcHJvcHMubGVuZ3RoLFxuICAgICAgICBpbmRleCA9IGZyb21SaWdodCA/IGxlbmd0aCA6IC0xO1xuXG4gICAgd2hpbGUgKChmcm9tUmlnaHQgPyBpbmRleC0tIDogKytpbmRleCA8IGxlbmd0aCkpIHtcbiAgICAgIHZhciBrZXkgPSBwcm9wc1tpbmRleF07XG4gICAgICBpZiAoaXRlcmF0ZWUoaXRlcmFibGVba2V5XSwga2V5LCBpdGVyYWJsZSkgPT09IGZhbHNlKSB7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gb2JqZWN0O1xuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGNyZWF0ZUJhc2VGb3I7XG4iLCJ2YXIgU2V0Q2FjaGUgPSByZXF1aXJlKCcuL1NldENhY2hlJyksXG4gICAgY29uc3RhbnQgPSByZXF1aXJlKCcuLi91dGlsaXR5L2NvbnN0YW50JyksXG4gICAgaXNOYXRpdmUgPSByZXF1aXJlKCcuLi9sYW5nL2lzTmF0aXZlJyk7XG5cbi8qKiBOYXRpdmUgbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgU2V0ID0gaXNOYXRpdmUoU2V0ID0gZ2xvYmFsLlNldCkgJiYgU2V0O1xuXG4vKiBOYXRpdmUgbWV0aG9kIHJlZmVyZW5jZXMgZm9yIHRob3NlIHdpdGggdGhlIHNhbWUgbmFtZSBhcyBvdGhlciBgbG9kYXNoYCBtZXRob2RzLiAqL1xudmFyIG5hdGl2ZUNyZWF0ZSA9IGlzTmF0aXZlKG5hdGl2ZUNyZWF0ZSA9IE9iamVjdC5jcmVhdGUpICYmIG5hdGl2ZUNyZWF0ZTtcblxuLyoqXG4gKiBDcmVhdGVzIGEgYFNldGAgY2FjaGUgb2JqZWN0IHRvIG9wdGltaXplIGxpbmVhciBzZWFyY2hlcyBvZiBsYXJnZSBhcnJheXMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IFt2YWx1ZXNdIFRoZSB2YWx1ZXMgdG8gY2FjaGUuXG4gKiBAcmV0dXJucyB7bnVsbHxPYmplY3R9IFJldHVybnMgdGhlIG5ldyBjYWNoZSBvYmplY3QgaWYgYFNldGAgaXMgc3VwcG9ydGVkLCBlbHNlIGBudWxsYC5cbiAqL1xudmFyIGNyZWF0ZUNhY2hlID0gIShuYXRpdmVDcmVhdGUgJiYgU2V0KSA/IGNvbnN0YW50KG51bGwpIDogZnVuY3Rpb24odmFsdWVzKSB7XG4gIHJldHVybiBuZXcgU2V0Q2FjaGUodmFsdWVzKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gY3JlYXRlQ2FjaGU7XG4iLCJ2YXIgYmFzZUNhbGxiYWNrID0gcmVxdWlyZSgnLi9iYXNlQ2FsbGJhY2snKSxcbiAgICBiYXNlRmluZCA9IHJlcXVpcmUoJy4vYmFzZUZpbmQnKTtcblxuLyoqXG4gKiBDcmVhdGVzIGEgYF8uZmluZEtleWAgb3IgYF8uZmluZExhc3RLZXlgIGZ1bmN0aW9uLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBvYmplY3RGdW5jIFRoZSBmdW5jdGlvbiB0byBpdGVyYXRlIG92ZXIgYW4gb2JqZWN0LlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgZmluZCBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gY3JlYXRlRmluZEtleShvYmplY3RGdW5jKSB7XG4gIHJldHVybiBmdW5jdGlvbihvYmplY3QsIHByZWRpY2F0ZSwgdGhpc0FyZykge1xuICAgIHByZWRpY2F0ZSA9IGJhc2VDYWxsYmFjayhwcmVkaWNhdGUsIHRoaXNBcmcsIDMpO1xuICAgIHJldHVybiBiYXNlRmluZChvYmplY3QsIHByZWRpY2F0ZSwgb2JqZWN0RnVuYywgdHJ1ZSk7XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gY3JlYXRlRmluZEtleTtcbiIsInZhciBiaW5kQ2FsbGJhY2sgPSByZXF1aXJlKCcuL2JpbmRDYWxsYmFjaycpLFxuICAgIGlzQXJyYXkgPSByZXF1aXJlKCcuLi9sYW5nL2lzQXJyYXknKTtcblxuLyoqXG4gKiBDcmVhdGVzIGEgZnVuY3Rpb24gZm9yIGBfLmZvckVhY2hgIG9yIGBfLmZvckVhY2hSaWdodGAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGFycmF5RnVuYyBUaGUgZnVuY3Rpb24gdG8gaXRlcmF0ZSBvdmVyIGFuIGFycmF5LlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZWFjaEZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGl0ZXJhdGUgb3ZlciBhIGNvbGxlY3Rpb24uXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBlYWNoIGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiBjcmVhdGVGb3JFYWNoKGFycmF5RnVuYywgZWFjaEZ1bmMpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKGNvbGxlY3Rpb24sIGl0ZXJhdGVlLCB0aGlzQXJnKSB7XG4gICAgcmV0dXJuICh0eXBlb2YgaXRlcmF0ZWUgPT0gJ2Z1bmN0aW9uJyAmJiB0eXBlb2YgdGhpc0FyZyA9PSAndW5kZWZpbmVkJyAmJiBpc0FycmF5KGNvbGxlY3Rpb24pKVxuICAgICAgPyBhcnJheUZ1bmMoY29sbGVjdGlvbiwgaXRlcmF0ZWUpXG4gICAgICA6IGVhY2hGdW5jKGNvbGxlY3Rpb24sIGJpbmRDYWxsYmFjayhpdGVyYXRlZSwgdGhpc0FyZywgMykpO1xuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGNyZWF0ZUZvckVhY2g7XG4iLCJ2YXIgYmluZENhbGxiYWNrID0gcmVxdWlyZSgnLi9iaW5kQ2FsbGJhY2snKTtcblxuLyoqXG4gKiBDcmVhdGVzIGEgZnVuY3Rpb24gZm9yIGBfLmZvck93bmAgb3IgYF8uZm9yT3duUmlnaHRgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBvYmplY3RGdW5jIFRoZSBmdW5jdGlvbiB0byBpdGVyYXRlIG92ZXIgYW4gb2JqZWN0LlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgZWFjaCBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gY3JlYXRlRm9yT3duKG9iamVjdEZ1bmMpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKG9iamVjdCwgaXRlcmF0ZWUsIHRoaXNBcmcpIHtcbiAgICBpZiAodHlwZW9mIGl0ZXJhdGVlICE9ICdmdW5jdGlvbicgfHwgdHlwZW9mIHRoaXNBcmcgIT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIGl0ZXJhdGVlID0gYmluZENhbGxiYWNrKGl0ZXJhdGVlLCB0aGlzQXJnLCAzKTtcbiAgICB9XG4gICAgcmV0dXJuIG9iamVjdEZ1bmMob2JqZWN0LCBpdGVyYXRlZSk7XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gY3JlYXRlRm9yT3duO1xuIiwiLyoqXG4gKiBBIHNwZWNpYWxpemVkIHZlcnNpb24gb2YgYGJhc2VJc0VxdWFsRGVlcGAgZm9yIGFycmF5cyB3aXRoIHN1cHBvcnQgZm9yXG4gKiBwYXJ0aWFsIGRlZXAgY29tcGFyaXNvbnMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IFRoZSBhcnJheSB0byBjb21wYXJlLlxuICogQHBhcmFtIHtBcnJheX0gb3RoZXIgVGhlIG90aGVyIGFycmF5IHRvIGNvbXBhcmUuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBlcXVhbEZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGRldGVybWluZSBlcXVpdmFsZW50cyBvZiB2YWx1ZXMuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY3VzdG9taXplcl0gVGhlIGZ1bmN0aW9uIHRvIGN1c3RvbWl6ZSBjb21wYXJpbmcgYXJyYXlzLlxuICogQHBhcmFtIHtib29sZWFufSBbaXNMb29zZV0gU3BlY2lmeSBwZXJmb3JtaW5nIHBhcnRpYWwgY29tcGFyaXNvbnMuXG4gKiBAcGFyYW0ge0FycmF5fSBbc3RhY2tBXSBUcmFja3MgdHJhdmVyc2VkIGB2YWx1ZWAgb2JqZWN0cy5cbiAqIEBwYXJhbSB7QXJyYXl9IFtzdGFja0JdIFRyYWNrcyB0cmF2ZXJzZWQgYG90aGVyYCBvYmplY3RzLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIHRoZSBhcnJheXMgYXJlIGVxdWl2YWxlbnQsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gZXF1YWxBcnJheXMoYXJyYXksIG90aGVyLCBlcXVhbEZ1bmMsIGN1c3RvbWl6ZXIsIGlzTG9vc2UsIHN0YWNrQSwgc3RhY2tCKSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgYXJyTGVuZ3RoID0gYXJyYXkubGVuZ3RoLFxuICAgICAgb3RoTGVuZ3RoID0gb3RoZXIubGVuZ3RoLFxuICAgICAgcmVzdWx0ID0gdHJ1ZTtcblxuICBpZiAoYXJyTGVuZ3RoICE9IG90aExlbmd0aCAmJiAhKGlzTG9vc2UgJiYgb3RoTGVuZ3RoID4gYXJyTGVuZ3RoKSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICAvLyBEZWVwIGNvbXBhcmUgdGhlIGNvbnRlbnRzLCBpZ25vcmluZyBub24tbnVtZXJpYyBwcm9wZXJ0aWVzLlxuICB3aGlsZSAocmVzdWx0ICYmICsraW5kZXggPCBhcnJMZW5ndGgpIHtcbiAgICB2YXIgYXJyVmFsdWUgPSBhcnJheVtpbmRleF0sXG4gICAgICAgIG90aFZhbHVlID0gb3RoZXJbaW5kZXhdO1xuXG4gICAgcmVzdWx0ID0gdW5kZWZpbmVkO1xuICAgIGlmIChjdXN0b21pemVyKSB7XG4gICAgICByZXN1bHQgPSBpc0xvb3NlXG4gICAgICAgID8gY3VzdG9taXplcihvdGhWYWx1ZSwgYXJyVmFsdWUsIGluZGV4KVxuICAgICAgICA6IGN1c3RvbWl6ZXIoYXJyVmFsdWUsIG90aFZhbHVlLCBpbmRleCk7XG4gICAgfVxuICAgIGlmICh0eXBlb2YgcmVzdWx0ID09ICd1bmRlZmluZWQnKSB7XG4gICAgICAvLyBSZWN1cnNpdmVseSBjb21wYXJlIGFycmF5cyAoc3VzY2VwdGlibGUgdG8gY2FsbCBzdGFjayBsaW1pdHMpLlxuICAgICAgaWYgKGlzTG9vc2UpIHtcbiAgICAgICAgdmFyIG90aEluZGV4ID0gb3RoTGVuZ3RoO1xuICAgICAgICB3aGlsZSAob3RoSW5kZXgtLSkge1xuICAgICAgICAgIG90aFZhbHVlID0gb3RoZXJbb3RoSW5kZXhdO1xuICAgICAgICAgIHJlc3VsdCA9IChhcnJWYWx1ZSAmJiBhcnJWYWx1ZSA9PT0gb3RoVmFsdWUpIHx8IGVxdWFsRnVuYyhhcnJWYWx1ZSwgb3RoVmFsdWUsIGN1c3RvbWl6ZXIsIGlzTG9vc2UsIHN0YWNrQSwgc3RhY2tCKTtcbiAgICAgICAgICBpZiAocmVzdWx0KSB7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlc3VsdCA9IChhcnJWYWx1ZSAmJiBhcnJWYWx1ZSA9PT0gb3RoVmFsdWUpIHx8IGVxdWFsRnVuYyhhcnJWYWx1ZSwgb3RoVmFsdWUsIGN1c3RvbWl6ZXIsIGlzTG9vc2UsIHN0YWNrQSwgc3RhY2tCKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuICEhcmVzdWx0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGVxdWFsQXJyYXlzO1xuIiwiLyoqIGBPYmplY3QjdG9TdHJpbmdgIHJlc3VsdCByZWZlcmVuY2VzLiAqL1xudmFyIGJvb2xUYWcgPSAnW29iamVjdCBCb29sZWFuXScsXG4gICAgZGF0ZVRhZyA9ICdbb2JqZWN0IERhdGVdJyxcbiAgICBlcnJvclRhZyA9ICdbb2JqZWN0IEVycm9yXScsXG4gICAgbnVtYmVyVGFnID0gJ1tvYmplY3QgTnVtYmVyXScsXG4gICAgcmVnZXhwVGFnID0gJ1tvYmplY3QgUmVnRXhwXScsXG4gICAgc3RyaW5nVGFnID0gJ1tvYmplY3QgU3RyaW5nXSc7XG5cbi8qKlxuICogQSBzcGVjaWFsaXplZCB2ZXJzaW9uIG9mIGBiYXNlSXNFcXVhbERlZXBgIGZvciBjb21wYXJpbmcgb2JqZWN0cyBvZlxuICogdGhlIHNhbWUgYHRvU3RyaW5nVGFnYC5cbiAqXG4gKiAqKk5vdGU6KiogVGhpcyBmdW5jdGlvbiBvbmx5IHN1cHBvcnRzIGNvbXBhcmluZyB2YWx1ZXMgd2l0aCB0YWdzIG9mXG4gKiBgQm9vbGVhbmAsIGBEYXRlYCwgYEVycm9yYCwgYE51bWJlcmAsIGBSZWdFeHBgLCBvciBgU3RyaW5nYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IHZhbHVlIFRoZSBvYmplY3QgdG8gY29tcGFyZS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBvdGhlciBUaGUgb3RoZXIgb2JqZWN0IHRvIGNvbXBhcmUuXG4gKiBAcGFyYW0ge3N0cmluZ30gdGFnIFRoZSBgdG9TdHJpbmdUYWdgIG9mIHRoZSBvYmplY3RzIHRvIGNvbXBhcmUuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIG9iamVjdHMgYXJlIGVxdWl2YWxlbnQsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gZXF1YWxCeVRhZyhvYmplY3QsIG90aGVyLCB0YWcpIHtcbiAgc3dpdGNoICh0YWcpIHtcbiAgICBjYXNlIGJvb2xUYWc6XG4gICAgY2FzZSBkYXRlVGFnOlxuICAgICAgLy8gQ29lcmNlIGRhdGVzIGFuZCBib29sZWFucyB0byBudW1iZXJzLCBkYXRlcyB0byBtaWxsaXNlY29uZHMgYW5kIGJvb2xlYW5zXG4gICAgICAvLyB0byBgMWAgb3IgYDBgIHRyZWF0aW5nIGludmFsaWQgZGF0ZXMgY29lcmNlZCB0byBgTmFOYCBhcyBub3QgZXF1YWwuXG4gICAgICByZXR1cm4gK29iamVjdCA9PSArb3RoZXI7XG5cbiAgICBjYXNlIGVycm9yVGFnOlxuICAgICAgcmV0dXJuIG9iamVjdC5uYW1lID09IG90aGVyLm5hbWUgJiYgb2JqZWN0Lm1lc3NhZ2UgPT0gb3RoZXIubWVzc2FnZTtcblxuICAgIGNhc2UgbnVtYmVyVGFnOlxuICAgICAgLy8gVHJlYXQgYE5hTmAgdnMuIGBOYU5gIGFzIGVxdWFsLlxuICAgICAgcmV0dXJuIChvYmplY3QgIT0gK29iamVjdClcbiAgICAgICAgPyBvdGhlciAhPSArb3RoZXJcbiAgICAgICAgLy8gQnV0LCB0cmVhdCBgLTBgIHZzLiBgKzBgIGFzIG5vdCBlcXVhbC5cbiAgICAgICAgOiAob2JqZWN0ID09IDAgPyAoKDEgLyBvYmplY3QpID09ICgxIC8gb3RoZXIpKSA6IG9iamVjdCA9PSArb3RoZXIpO1xuXG4gICAgY2FzZSByZWdleHBUYWc6XG4gICAgY2FzZSBzdHJpbmdUYWc6XG4gICAgICAvLyBDb2VyY2UgcmVnZXhlcyB0byBzdHJpbmdzIGFuZCB0cmVhdCBzdHJpbmdzIHByaW1pdGl2ZXMgYW5kIHN0cmluZ1xuICAgICAgLy8gb2JqZWN0cyBhcyBlcXVhbC4gU2VlIGh0dHBzOi8vZXM1LmdpdGh1Yi5pby8jeDE1LjEwLjYuNCBmb3IgbW9yZSBkZXRhaWxzLlxuICAgICAgcmV0dXJuIG9iamVjdCA9PSAob3RoZXIgKyAnJyk7XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGVxdWFsQnlUYWc7XG4iLCJ2YXIga2V5cyA9IHJlcXVpcmUoJy4uL29iamVjdC9rZXlzJyk7XG5cbi8qKiBVc2VkIGZvciBuYXRpdmUgbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKiogVXNlZCB0byBjaGVjayBvYmplY3RzIGZvciBvd24gcHJvcGVydGllcy4gKi9cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IG9iamVjdFByb3RvLmhhc093blByb3BlcnR5O1xuXG4vKipcbiAqIEEgc3BlY2lhbGl6ZWQgdmVyc2lvbiBvZiBgYmFzZUlzRXF1YWxEZWVwYCBmb3Igb2JqZWN0cyB3aXRoIHN1cHBvcnQgZm9yXG4gKiBwYXJ0aWFsIGRlZXAgY29tcGFyaXNvbnMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBjb21wYXJlLlxuICogQHBhcmFtIHtPYmplY3R9IG90aGVyIFRoZSBvdGhlciBvYmplY3QgdG8gY29tcGFyZS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGVxdWFsRnVuYyBUaGUgZnVuY3Rpb24gdG8gZGV0ZXJtaW5lIGVxdWl2YWxlbnRzIG9mIHZhbHVlcy5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtjdXN0b21pemVyXSBUaGUgZnVuY3Rpb24gdG8gY3VzdG9taXplIGNvbXBhcmluZyB2YWx1ZXMuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtpc0xvb3NlXSBTcGVjaWZ5IHBlcmZvcm1pbmcgcGFydGlhbCBjb21wYXJpc29ucy5cbiAqIEBwYXJhbSB7QXJyYXl9IFtzdGFja0FdIFRyYWNrcyB0cmF2ZXJzZWQgYHZhbHVlYCBvYmplY3RzLlxuICogQHBhcmFtIHtBcnJheX0gW3N0YWNrQl0gVHJhY2tzIHRyYXZlcnNlZCBgb3RoZXJgIG9iamVjdHMuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIG9iamVjdHMgYXJlIGVxdWl2YWxlbnQsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gZXF1YWxPYmplY3RzKG9iamVjdCwgb3RoZXIsIGVxdWFsRnVuYywgY3VzdG9taXplciwgaXNMb29zZSwgc3RhY2tBLCBzdGFja0IpIHtcbiAgdmFyIG9ialByb3BzID0ga2V5cyhvYmplY3QpLFxuICAgICAgb2JqTGVuZ3RoID0gb2JqUHJvcHMubGVuZ3RoLFxuICAgICAgb3RoUHJvcHMgPSBrZXlzKG90aGVyKSxcbiAgICAgIG90aExlbmd0aCA9IG90aFByb3BzLmxlbmd0aDtcblxuICBpZiAob2JqTGVuZ3RoICE9IG90aExlbmd0aCAmJiAhaXNMb29zZSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICB2YXIgc2tpcEN0b3IgPSBpc0xvb3NlLFxuICAgICAgaW5kZXggPSAtMTtcblxuICB3aGlsZSAoKytpbmRleCA8IG9iakxlbmd0aCkge1xuICAgIHZhciBrZXkgPSBvYmpQcm9wc1tpbmRleF0sXG4gICAgICAgIHJlc3VsdCA9IGlzTG9vc2UgPyBrZXkgaW4gb3RoZXIgOiBoYXNPd25Qcm9wZXJ0eS5jYWxsKG90aGVyLCBrZXkpO1xuXG4gICAgaWYgKHJlc3VsdCkge1xuICAgICAgdmFyIG9ialZhbHVlID0gb2JqZWN0W2tleV0sXG4gICAgICAgICAgb3RoVmFsdWUgPSBvdGhlcltrZXldO1xuXG4gICAgICByZXN1bHQgPSB1bmRlZmluZWQ7XG4gICAgICBpZiAoY3VzdG9taXplcikge1xuICAgICAgICByZXN1bHQgPSBpc0xvb3NlXG4gICAgICAgICAgPyBjdXN0b21pemVyKG90aFZhbHVlLCBvYmpWYWx1ZSwga2V5KVxuICAgICAgICAgIDogY3VzdG9taXplcihvYmpWYWx1ZSwgb3RoVmFsdWUsIGtleSk7XG4gICAgICB9XG4gICAgICBpZiAodHlwZW9mIHJlc3VsdCA9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAvLyBSZWN1cnNpdmVseSBjb21wYXJlIG9iamVjdHMgKHN1c2NlcHRpYmxlIHRvIGNhbGwgc3RhY2sgbGltaXRzKS5cbiAgICAgICAgcmVzdWx0ID0gKG9ialZhbHVlICYmIG9ialZhbHVlID09PSBvdGhWYWx1ZSkgfHwgZXF1YWxGdW5jKG9ialZhbHVlLCBvdGhWYWx1ZSwgY3VzdG9taXplciwgaXNMb29zZSwgc3RhY2tBLCBzdGFja0IpO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoIXJlc3VsdCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBza2lwQ3RvciB8fCAoc2tpcEN0b3IgPSBrZXkgPT0gJ2NvbnN0cnVjdG9yJyk7XG4gIH1cbiAgaWYgKCFza2lwQ3Rvcikge1xuICAgIHZhciBvYmpDdG9yID0gb2JqZWN0LmNvbnN0cnVjdG9yLFxuICAgICAgICBvdGhDdG9yID0gb3RoZXIuY29uc3RydWN0b3I7XG5cbiAgICAvLyBOb24gYE9iamVjdGAgb2JqZWN0IGluc3RhbmNlcyB3aXRoIGRpZmZlcmVudCBjb25zdHJ1Y3RvcnMgYXJlIG5vdCBlcXVhbC5cbiAgICBpZiAob2JqQ3RvciAhPSBvdGhDdG9yICYmXG4gICAgICAgICgnY29uc3RydWN0b3InIGluIG9iamVjdCAmJiAnY29uc3RydWN0b3InIGluIG90aGVyKSAmJlxuICAgICAgICAhKHR5cGVvZiBvYmpDdG9yID09ICdmdW5jdGlvbicgJiYgb2JqQ3RvciBpbnN0YW5jZW9mIG9iakN0b3IgJiZcbiAgICAgICAgICB0eXBlb2Ygb3RoQ3RvciA9PSAnZnVuY3Rpb24nICYmIG90aEN0b3IgaW5zdGFuY2VvZiBvdGhDdG9yKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuICByZXR1cm4gdHJ1ZTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBlcXVhbE9iamVjdHM7XG4iLCIvKipcbiAqIEdldHMgdGhlIGluZGV4IGF0IHdoaWNoIHRoZSBmaXJzdCBvY2N1cnJlbmNlIG9mIGBOYU5gIGlzIGZvdW5kIGluIGBhcnJheWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IFRoZSBhcnJheSB0byBzZWFyY2guXG4gKiBAcGFyYW0ge251bWJlcn0gZnJvbUluZGV4IFRoZSBpbmRleCB0byBzZWFyY2ggZnJvbS5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW2Zyb21SaWdodF0gU3BlY2lmeSBpdGVyYXRpbmcgZnJvbSByaWdodCB0byBsZWZ0LlxuICogQHJldHVybnMge251bWJlcn0gUmV0dXJucyB0aGUgaW5kZXggb2YgdGhlIG1hdGNoZWQgYE5hTmAsIGVsc2UgYC0xYC5cbiAqL1xuZnVuY3Rpb24gaW5kZXhPZk5hTihhcnJheSwgZnJvbUluZGV4LCBmcm9tUmlnaHQpIHtcbiAgdmFyIGxlbmd0aCA9IGFycmF5Lmxlbmd0aCxcbiAgICAgIGluZGV4ID0gZnJvbUluZGV4ICsgKGZyb21SaWdodCA/IDAgOiAtMSk7XG5cbiAgd2hpbGUgKChmcm9tUmlnaHQgPyBpbmRleC0tIDogKytpbmRleCA8IGxlbmd0aCkpIHtcbiAgICB2YXIgb3RoZXIgPSBhcnJheVtpbmRleF07XG4gICAgaWYgKG90aGVyICE9PSBvdGhlcikge1xuICAgICAgcmV0dXJuIGluZGV4O1xuICAgIH1cbiAgfVxuICByZXR1cm4gLTE7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaW5kZXhPZk5hTjtcbiIsIi8qKiBVc2VkIGZvciBuYXRpdmUgbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKiogVXNlZCB0byBjaGVjayBvYmplY3RzIGZvciBvd24gcHJvcGVydGllcy4gKi9cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IG9iamVjdFByb3RvLmhhc093blByb3BlcnR5O1xuXG4vKipcbiAqIEluaXRpYWxpemVzIGFuIGFycmF5IGNsb25lLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheSBUaGUgYXJyYXkgdG8gY2xvbmUuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIGluaXRpYWxpemVkIGNsb25lLlxuICovXG5mdW5jdGlvbiBpbml0Q2xvbmVBcnJheShhcnJheSkge1xuICB2YXIgbGVuZ3RoID0gYXJyYXkubGVuZ3RoLFxuICAgICAgcmVzdWx0ID0gbmV3IGFycmF5LmNvbnN0cnVjdG9yKGxlbmd0aCk7XG5cbiAgLy8gQWRkIGFycmF5IHByb3BlcnRpZXMgYXNzaWduZWQgYnkgYFJlZ0V4cCNleGVjYC5cbiAgaWYgKGxlbmd0aCAmJiB0eXBlb2YgYXJyYXlbMF0gPT0gJ3N0cmluZycgJiYgaGFzT3duUHJvcGVydHkuY2FsbChhcnJheSwgJ2luZGV4JykpIHtcbiAgICByZXN1bHQuaW5kZXggPSBhcnJheS5pbmRleDtcbiAgICByZXN1bHQuaW5wdXQgPSBhcnJheS5pbnB1dDtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGluaXRDbG9uZUFycmF5O1xuIiwidmFyIGJ1ZmZlckNsb25lID0gcmVxdWlyZSgnLi9idWZmZXJDbG9uZScpO1xuXG4vKiogYE9iamVjdCN0b1N0cmluZ2AgcmVzdWx0IHJlZmVyZW5jZXMuICovXG52YXIgYm9vbFRhZyA9ICdbb2JqZWN0IEJvb2xlYW5dJyxcbiAgICBkYXRlVGFnID0gJ1tvYmplY3QgRGF0ZV0nLFxuICAgIG51bWJlclRhZyA9ICdbb2JqZWN0IE51bWJlcl0nLFxuICAgIHJlZ2V4cFRhZyA9ICdbb2JqZWN0IFJlZ0V4cF0nLFxuICAgIHN0cmluZ1RhZyA9ICdbb2JqZWN0IFN0cmluZ10nO1xuXG52YXIgYXJyYXlCdWZmZXJUYWcgPSAnW29iamVjdCBBcnJheUJ1ZmZlcl0nLFxuICAgIGZsb2F0MzJUYWcgPSAnW29iamVjdCBGbG9hdDMyQXJyYXldJyxcbiAgICBmbG9hdDY0VGFnID0gJ1tvYmplY3QgRmxvYXQ2NEFycmF5XScsXG4gICAgaW50OFRhZyA9ICdbb2JqZWN0IEludDhBcnJheV0nLFxuICAgIGludDE2VGFnID0gJ1tvYmplY3QgSW50MTZBcnJheV0nLFxuICAgIGludDMyVGFnID0gJ1tvYmplY3QgSW50MzJBcnJheV0nLFxuICAgIHVpbnQ4VGFnID0gJ1tvYmplY3QgVWludDhBcnJheV0nLFxuICAgIHVpbnQ4Q2xhbXBlZFRhZyA9ICdbb2JqZWN0IFVpbnQ4Q2xhbXBlZEFycmF5XScsXG4gICAgdWludDE2VGFnID0gJ1tvYmplY3QgVWludDE2QXJyYXldJyxcbiAgICB1aW50MzJUYWcgPSAnW29iamVjdCBVaW50MzJBcnJheV0nO1xuXG4vKiogVXNlZCB0byBtYXRjaCBgUmVnRXhwYCBmbGFncyBmcm9tIHRoZWlyIGNvZXJjZWQgc3RyaW5nIHZhbHVlcy4gKi9cbnZhciByZUZsYWdzID0gL1xcdyokLztcblxuLyoqXG4gKiBJbml0aWFsaXplcyBhbiBvYmplY3QgY2xvbmUgYmFzZWQgb24gaXRzIGB0b1N0cmluZ1RhZ2AuXG4gKlxuICogKipOb3RlOioqIFRoaXMgZnVuY3Rpb24gb25seSBzdXBwb3J0cyBjbG9uaW5nIHZhbHVlcyB3aXRoIHRhZ3Mgb2ZcbiAqIGBCb29sZWFuYCwgYERhdGVgLCBgRXJyb3JgLCBgTnVtYmVyYCwgYFJlZ0V4cGAsIG9yIGBTdHJpbmdgLlxuICpcbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIGNsb25lLlxuICogQHBhcmFtIHtzdHJpbmd9IHRhZyBUaGUgYHRvU3RyaW5nVGFnYCBvZiB0aGUgb2JqZWN0IHRvIGNsb25lLlxuICogQHBhcmFtIHtib29sZWFufSBbaXNEZWVwXSBTcGVjaWZ5IGEgZGVlcCBjbG9uZS5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgdGhlIGluaXRpYWxpemVkIGNsb25lLlxuICovXG5mdW5jdGlvbiBpbml0Q2xvbmVCeVRhZyhvYmplY3QsIHRhZywgaXNEZWVwKSB7XG4gIHZhciBDdG9yID0gb2JqZWN0LmNvbnN0cnVjdG9yO1xuICBzd2l0Y2ggKHRhZykge1xuICAgIGNhc2UgYXJyYXlCdWZmZXJUYWc6XG4gICAgICByZXR1cm4gYnVmZmVyQ2xvbmUob2JqZWN0KTtcblxuICAgIGNhc2UgYm9vbFRhZzpcbiAgICBjYXNlIGRhdGVUYWc6XG4gICAgICByZXR1cm4gbmV3IEN0b3IoK29iamVjdCk7XG5cbiAgICBjYXNlIGZsb2F0MzJUYWc6IGNhc2UgZmxvYXQ2NFRhZzpcbiAgICBjYXNlIGludDhUYWc6IGNhc2UgaW50MTZUYWc6IGNhc2UgaW50MzJUYWc6XG4gICAgY2FzZSB1aW50OFRhZzogY2FzZSB1aW50OENsYW1wZWRUYWc6IGNhc2UgdWludDE2VGFnOiBjYXNlIHVpbnQzMlRhZzpcbiAgICAgIHZhciBidWZmZXIgPSBvYmplY3QuYnVmZmVyO1xuICAgICAgcmV0dXJuIG5ldyBDdG9yKGlzRGVlcCA/IGJ1ZmZlckNsb25lKGJ1ZmZlcikgOiBidWZmZXIsIG9iamVjdC5ieXRlT2Zmc2V0LCBvYmplY3QubGVuZ3RoKTtcblxuICAgIGNhc2UgbnVtYmVyVGFnOlxuICAgIGNhc2Ugc3RyaW5nVGFnOlxuICAgICAgcmV0dXJuIG5ldyBDdG9yKG9iamVjdCk7XG5cbiAgICBjYXNlIHJlZ2V4cFRhZzpcbiAgICAgIHZhciByZXN1bHQgPSBuZXcgQ3RvcihvYmplY3Quc291cmNlLCByZUZsYWdzLmV4ZWMob2JqZWN0KSk7XG4gICAgICByZXN1bHQubGFzdEluZGV4ID0gb2JqZWN0Lmxhc3RJbmRleDtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGluaXRDbG9uZUJ5VGFnO1xuIiwiLyoqXG4gKiBJbml0aWFsaXplcyBhbiBvYmplY3QgY2xvbmUuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBjbG9uZS5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgdGhlIGluaXRpYWxpemVkIGNsb25lLlxuICovXG5mdW5jdGlvbiBpbml0Q2xvbmVPYmplY3Qob2JqZWN0KSB7XG4gIHZhciBDdG9yID0gb2JqZWN0LmNvbnN0cnVjdG9yO1xuICBpZiAoISh0eXBlb2YgQ3RvciA9PSAnZnVuY3Rpb24nICYmIEN0b3IgaW5zdGFuY2VvZiBDdG9yKSkge1xuICAgIEN0b3IgPSBPYmplY3Q7XG4gIH1cbiAgcmV0dXJuIG5ldyBDdG9yO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGluaXRDbG9uZU9iamVjdDtcbiIsIi8qKlxuICogVXNlZCBhcyB0aGUgW21heGltdW0gbGVuZ3RoXShodHRwczovL3Blb3BsZS5tb3ppbGxhLm9yZy9+am9yZW5kb3JmZi9lczYtZHJhZnQuaHRtbCNzZWMtbnVtYmVyLm1heF9zYWZlX2ludGVnZXIpXG4gKiBvZiBhbiBhcnJheS1saWtlIHZhbHVlLlxuICovXG52YXIgTUFYX1NBRkVfSU5URUdFUiA9IE1hdGgucG93KDIsIDUzKSAtIDE7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgYSB2YWxpZCBhcnJheS1saWtlIGluZGV4LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEBwYXJhbSB7bnVtYmVyfSBbbGVuZ3RoPU1BWF9TQUZFX0lOVEVHRVJdIFRoZSB1cHBlciBib3VuZHMgb2YgYSB2YWxpZCBpbmRleC5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgdmFsaWQgaW5kZXgsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNJbmRleCh2YWx1ZSwgbGVuZ3RoKSB7XG4gIHZhbHVlID0gK3ZhbHVlO1xuICBsZW5ndGggPSBsZW5ndGggPT0gbnVsbCA/IE1BWF9TQUZFX0lOVEVHRVIgOiBsZW5ndGg7XG4gIHJldHVybiB2YWx1ZSA+IC0xICYmIHZhbHVlICUgMSA9PSAwICYmIHZhbHVlIDwgbGVuZ3RoO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzSW5kZXg7XG4iLCJ2YXIgaXNJbmRleCA9IHJlcXVpcmUoJy4vaXNJbmRleCcpLFxuICAgIGlzTGVuZ3RoID0gcmVxdWlyZSgnLi9pc0xlbmd0aCcpLFxuICAgIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi4vbGFuZy9pc09iamVjdCcpO1xuXG4vKipcbiAqIENoZWNrcyBpZiB0aGUgcHJvdmlkZWQgYXJndW1lbnRzIGFyZSBmcm9tIGFuIGl0ZXJhdGVlIGNhbGwuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHBvdGVudGlhbCBpdGVyYXRlZSB2YWx1ZSBhcmd1bWVudC5cbiAqIEBwYXJhbSB7Kn0gaW5kZXggVGhlIHBvdGVudGlhbCBpdGVyYXRlZSBpbmRleCBvciBrZXkgYXJndW1lbnQuXG4gKiBAcGFyYW0geyp9IG9iamVjdCBUaGUgcG90ZW50aWFsIGl0ZXJhdGVlIG9iamVjdCBhcmd1bWVudC5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgYXJndW1lbnRzIGFyZSBmcm9tIGFuIGl0ZXJhdGVlIGNhbGwsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNJdGVyYXRlZUNhbGwodmFsdWUsIGluZGV4LCBvYmplY3QpIHtcbiAgaWYgKCFpc09iamVjdChvYmplY3QpKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHZhciB0eXBlID0gdHlwZW9mIGluZGV4O1xuICBpZiAodHlwZSA9PSAnbnVtYmVyJykge1xuICAgIHZhciBsZW5ndGggPSBvYmplY3QubGVuZ3RoLFxuICAgICAgICBwcmVyZXEgPSBpc0xlbmd0aChsZW5ndGgpICYmIGlzSW5kZXgoaW5kZXgsIGxlbmd0aCk7XG4gIH0gZWxzZSB7XG4gICAgcHJlcmVxID0gdHlwZSA9PSAnc3RyaW5nJyAmJiBpbmRleCBpbiBvYmplY3Q7XG4gIH1cbiAgaWYgKHByZXJlcSkge1xuICAgIHZhciBvdGhlciA9IG9iamVjdFtpbmRleF07XG4gICAgcmV0dXJuIHZhbHVlID09PSB2YWx1ZSA/ICh2YWx1ZSA9PT0gb3RoZXIpIDogKG90aGVyICE9PSBvdGhlcik7XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzSXRlcmF0ZWVDYWxsO1xuIiwiLyoqXG4gKiBVc2VkIGFzIHRoZSBbbWF4aW11bSBsZW5ndGhdKGh0dHBzOi8vcGVvcGxlLm1vemlsbGEub3JnL35qb3JlbmRvcmZmL2VzNi1kcmFmdC5odG1sI3NlYy1udW1iZXIubWF4X3NhZmVfaW50ZWdlcilcbiAqIG9mIGFuIGFycmF5LWxpa2UgdmFsdWUuXG4gKi9cbnZhciBNQVhfU0FGRV9JTlRFR0VSID0gTWF0aC5wb3coMiwgNTMpIC0gMTtcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBhIHZhbGlkIGFycmF5LWxpa2UgbGVuZ3RoLlxuICpcbiAqICoqTm90ZToqKiBUaGlzIGZ1bmN0aW9uIGlzIGJhc2VkIG9uIFtgVG9MZW5ndGhgXShodHRwczovL3Blb3BsZS5tb3ppbGxhLm9yZy9+am9yZW5kb3JmZi9lczYtZHJhZnQuaHRtbCNzZWMtdG9sZW5ndGgpLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgdmFsaWQgbGVuZ3RoLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGlzTGVuZ3RoKHZhbHVlKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsdWUgPT0gJ251bWJlcicgJiYgdmFsdWUgPiAtMSAmJiB2YWx1ZSAlIDEgPT0gMCAmJiB2YWx1ZSA8PSBNQVhfU0FGRV9JTlRFR0VSO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzTGVuZ3RoO1xuIiwiLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBvYmplY3QtbGlrZS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBvYmplY3QtbGlrZSwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBpc09iamVjdExpa2UodmFsdWUpIHtcbiAgcmV0dXJuICEhdmFsdWUgJiYgdHlwZW9mIHZhbHVlID09ICdvYmplY3QnO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzT2JqZWN0TGlrZTtcbiIsInZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4uL2xhbmcvaXNPYmplY3QnKTtcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBzdWl0YWJsZSBmb3Igc3RyaWN0IGVxdWFsaXR5IGNvbXBhcmlzb25zLCBpLmUuIGA9PT1gLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlmIHN1aXRhYmxlIGZvciBzdHJpY3RcbiAqICBlcXVhbGl0eSBjb21wYXJpc29ucywgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBpc1N0cmljdENvbXBhcmFibGUodmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlID09PSB2YWx1ZSAmJiAodmFsdWUgPT09IDAgPyAoKDEgLyB2YWx1ZSkgPiAwKSA6ICFpc09iamVjdCh2YWx1ZSkpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzU3RyaWN0Q29tcGFyYWJsZTtcbiIsInZhciBpc0FyZ3VtZW50cyA9IHJlcXVpcmUoJy4uL2xhbmcvaXNBcmd1bWVudHMnKSxcbiAgICBpc0FycmF5ID0gcmVxdWlyZSgnLi4vbGFuZy9pc0FycmF5JyksXG4gICAgaXNJbmRleCA9IHJlcXVpcmUoJy4vaXNJbmRleCcpLFxuICAgIGlzTGVuZ3RoID0gcmVxdWlyZSgnLi9pc0xlbmd0aCcpLFxuICAgIGtleXNJbiA9IHJlcXVpcmUoJy4uL29iamVjdC9rZXlzSW4nKSxcbiAgICBzdXBwb3J0ID0gcmVxdWlyZSgnLi4vc3VwcG9ydCcpO1xuXG4vKiogVXNlZCBmb3IgbmF0aXZlIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqIFVzZWQgdG8gY2hlY2sgb2JqZWN0cyBmb3Igb3duIHByb3BlcnRpZXMuICovXG52YXIgaGFzT3duUHJvcGVydHkgPSBvYmplY3RQcm90by5oYXNPd25Qcm9wZXJ0eTtcblxuLyoqXG4gKiBBIGZhbGxiYWNrIGltcGxlbWVudGF0aW9uIG9mIGBPYmplY3Qua2V5c2Agd2hpY2ggY3JlYXRlcyBhbiBhcnJheSBvZiB0aGVcbiAqIG93biBlbnVtZXJhYmxlIHByb3BlcnR5IG5hbWVzIG9mIGBvYmplY3RgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gaW5zcGVjdC5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgYXJyYXkgb2YgcHJvcGVydHkgbmFtZXMuXG4gKi9cbmZ1bmN0aW9uIHNoaW1LZXlzKG9iamVjdCkge1xuICB2YXIgcHJvcHMgPSBrZXlzSW4ob2JqZWN0KSxcbiAgICAgIHByb3BzTGVuZ3RoID0gcHJvcHMubGVuZ3RoLFxuICAgICAgbGVuZ3RoID0gcHJvcHNMZW5ndGggJiYgb2JqZWN0Lmxlbmd0aDtcblxuICB2YXIgYWxsb3dJbmRleGVzID0gbGVuZ3RoICYmIGlzTGVuZ3RoKGxlbmd0aCkgJiZcbiAgICAoaXNBcnJheShvYmplY3QpIHx8IChzdXBwb3J0Lm5vbkVudW1BcmdzICYmIGlzQXJndW1lbnRzKG9iamVjdCkpKTtcblxuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIHJlc3VsdCA9IFtdO1xuXG4gIHdoaWxlICgrK2luZGV4IDwgcHJvcHNMZW5ndGgpIHtcbiAgICB2YXIga2V5ID0gcHJvcHNbaW5kZXhdO1xuICAgIGlmICgoYWxsb3dJbmRleGVzICYmIGlzSW5kZXgoa2V5LCBsZW5ndGgpKSB8fCBoYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwga2V5KSkge1xuICAgICAgcmVzdWx0LnB1c2goa2V5KTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzaGltS2V5cztcbiIsIi8qKlxuICogQW4gaW1wbGVtZW50YXRpb24gb2YgYF8udW5pcWAgb3B0aW1pemVkIGZvciBzb3J0ZWQgYXJyYXlzIHdpdGhvdXQgc3VwcG9ydFxuICogZm9yIGNhbGxiYWNrIHNob3J0aGFuZHMgYW5kIGB0aGlzYCBiaW5kaW5nLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheSBUaGUgYXJyYXkgdG8gaW5zcGVjdC5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtpdGVyYXRlZV0gVGhlIGZ1bmN0aW9uIGludm9rZWQgcGVyIGl0ZXJhdGlvbi5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgbmV3IGR1cGxpY2F0ZS12YWx1ZS1mcmVlIGFycmF5LlxuICovXG5mdW5jdGlvbiBzb3J0ZWRVbmlxKGFycmF5LCBpdGVyYXRlZSkge1xuICB2YXIgc2VlbixcbiAgICAgIGluZGV4ID0gLTEsXG4gICAgICBsZW5ndGggPSBhcnJheS5sZW5ndGgsXG4gICAgICByZXNJbmRleCA9IC0xLFxuICAgICAgcmVzdWx0ID0gW107XG5cbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICB2YXIgdmFsdWUgPSBhcnJheVtpbmRleF0sXG4gICAgICAgIGNvbXB1dGVkID0gaXRlcmF0ZWUgPyBpdGVyYXRlZSh2YWx1ZSwgaW5kZXgsIGFycmF5KSA6IHZhbHVlO1xuXG4gICAgaWYgKCFpbmRleCB8fCBzZWVuICE9PSBjb21wdXRlZCkge1xuICAgICAgc2VlbiA9IGNvbXB1dGVkO1xuICAgICAgcmVzdWx0WysrcmVzSW5kZXhdID0gdmFsdWU7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc29ydGVkVW5pcTtcbiIsInZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4uL2xhbmcvaXNPYmplY3QnKTtcblxuLyoqXG4gKiBDb252ZXJ0cyBgdmFsdWVgIHRvIGFuIG9iamVjdCBpZiBpdCBpcyBub3Qgb25lLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBwcm9jZXNzLlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyB0aGUgb2JqZWN0LlxuICovXG5mdW5jdGlvbiB0b09iamVjdCh2YWx1ZSkge1xuICByZXR1cm4gaXNPYmplY3QodmFsdWUpID8gdmFsdWUgOiBPYmplY3QodmFsdWUpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHRvT2JqZWN0O1xuIiwidmFyIGJhc2VDbG9uZSA9IHJlcXVpcmUoJy4uL2ludGVybmFsL2Jhc2VDbG9uZScpLFxuICAgIGJpbmRDYWxsYmFjayA9IHJlcXVpcmUoJy4uL2ludGVybmFsL2JpbmRDYWxsYmFjaycpLFxuICAgIGlzSXRlcmF0ZWVDYWxsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWwvaXNJdGVyYXRlZUNhbGwnKTtcblxuLyoqXG4gKiBDcmVhdGVzIGEgY2xvbmUgb2YgYHZhbHVlYC4gSWYgYGlzRGVlcGAgaXMgYHRydWVgIG5lc3RlZCBvYmplY3RzIGFyZSBjbG9uZWQsXG4gKiBvdGhlcndpc2UgdGhleSBhcmUgYXNzaWduZWQgYnkgcmVmZXJlbmNlLiBJZiBgY3VzdG9taXplcmAgaXMgcHJvdmlkZWQgaXQgaXNcbiAqIGludm9rZWQgdG8gcHJvZHVjZSB0aGUgY2xvbmVkIHZhbHVlcy4gSWYgYGN1c3RvbWl6ZXJgIHJldHVybnMgYHVuZGVmaW5lZGBcbiAqIGNsb25pbmcgaXMgaGFuZGxlZCBieSB0aGUgbWV0aG9kIGluc3RlYWQuIFRoZSBgY3VzdG9taXplcmAgaXMgYm91bmQgdG9cbiAqIGB0aGlzQXJnYCBhbmQgaW52b2tlZCB3aXRoIHR3byBhcmd1bWVudDsgKHZhbHVlIFssIGluZGV4fGtleSwgb2JqZWN0XSkuXG4gKlxuICogKipOb3RlOioqIFRoaXMgbWV0aG9kIGlzIGxvb3NlbHkgYmFzZWQgb24gdGhlXG4gKiBbc3RydWN0dXJlZCBjbG9uZSBhbGdvcml0aG1dKGh0dHA6Ly93d3cudzMub3JnL1RSL2h0bWw1L2luZnJhc3RydWN0dXJlLmh0bWwjaW50ZXJuYWwtc3RydWN0dXJlZC1jbG9uaW5nLWFsZ29yaXRobSkuXG4gKiBUaGUgZW51bWVyYWJsZSBwcm9wZXJ0aWVzIG9mIGBhcmd1bWVudHNgIG9iamVjdHMgYW5kIG9iamVjdHMgY3JlYXRlZCBieVxuICogY29uc3RydWN0b3JzIG90aGVyIHRoYW4gYE9iamVjdGAgYXJlIGNsb25lZCB0byBwbGFpbiBgT2JqZWN0YCBvYmplY3RzLiBBblxuICogZW1wdHkgb2JqZWN0IGlzIHJldHVybmVkIGZvciB1bmNsb25lYWJsZSB2YWx1ZXMgc3VjaCBhcyBmdW5jdGlvbnMsIERPTSBub2RlcyxcbiAqIE1hcHMsIFNldHMsIGFuZCBXZWFrTWFwcy5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNsb25lLlxuICogQHBhcmFtIHtib29sZWFufSBbaXNEZWVwXSBTcGVjaWZ5IGEgZGVlcCBjbG9uZS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtjdXN0b21pemVyXSBUaGUgZnVuY3Rpb24gdG8gY3VzdG9taXplIGNsb25pbmcgdmFsdWVzLlxuICogQHBhcmFtIHsqfSBbdGhpc0FyZ10gVGhlIGB0aGlzYCBiaW5kaW5nIG9mIGBjdXN0b21pemVyYC5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSBjbG9uZWQgdmFsdWUuXG4gKiBAZXhhbXBsZVxuICpcbiAqIHZhciB1c2VycyA9IFtcbiAqICAgeyAndXNlcic6ICdiYXJuZXknIH0sXG4gKiAgIHsgJ3VzZXInOiAnZnJlZCcgfVxuICogXTtcbiAqXG4gKiB2YXIgc2hhbGxvdyA9IF8uY2xvbmUodXNlcnMpO1xuICogc2hhbGxvd1swXSA9PT0gdXNlcnNbMF07XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogdmFyIGRlZXAgPSBfLmNsb25lKHVzZXJzLCB0cnVlKTtcbiAqIGRlZXBbMF0gPT09IHVzZXJzWzBdO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiAvLyB1c2luZyBhIGN1c3RvbWl6ZXIgY2FsbGJhY2tcbiAqIHZhciBlbCA9IF8uY2xvbmUoZG9jdW1lbnQuYm9keSwgZnVuY3Rpb24odmFsdWUpIHtcbiAqICAgaWYgKF8uaXNFbGVtZW50KHZhbHVlKSkge1xuICogICAgIHJldHVybiB2YWx1ZS5jbG9uZU5vZGUoZmFsc2UpO1xuICogICB9XG4gKiB9KTtcbiAqXG4gKiBlbCA9PT0gZG9jdW1lbnQuYm9keVxuICogLy8gPT4gZmFsc2VcbiAqIGVsLm5vZGVOYW1lXG4gKiAvLyA9PiBCT0RZXG4gKiBlbC5jaGlsZE5vZGVzLmxlbmd0aDtcbiAqIC8vID0+IDBcbiAqL1xuZnVuY3Rpb24gY2xvbmUodmFsdWUsIGlzRGVlcCwgY3VzdG9taXplciwgdGhpc0FyZykge1xuICBpZiAoaXNEZWVwICYmIHR5cGVvZiBpc0RlZXAgIT0gJ2Jvb2xlYW4nICYmIGlzSXRlcmF0ZWVDYWxsKHZhbHVlLCBpc0RlZXAsIGN1c3RvbWl6ZXIpKSB7XG4gICAgaXNEZWVwID0gZmFsc2U7XG4gIH1cbiAgZWxzZSBpZiAodHlwZW9mIGlzRGVlcCA9PSAnZnVuY3Rpb24nKSB7XG4gICAgdGhpc0FyZyA9IGN1c3RvbWl6ZXI7XG4gICAgY3VzdG9taXplciA9IGlzRGVlcDtcbiAgICBpc0RlZXAgPSBmYWxzZTtcbiAgfVxuICBjdXN0b21pemVyID0gdHlwZW9mIGN1c3RvbWl6ZXIgPT0gJ2Z1bmN0aW9uJyAmJiBiaW5kQ2FsbGJhY2soY3VzdG9taXplciwgdGhpc0FyZywgMSk7XG4gIHJldHVybiBiYXNlQ2xvbmUodmFsdWUsIGlzRGVlcCwgY3VzdG9taXplcik7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gY2xvbmU7XG4iLCJ2YXIgaXNMZW5ndGggPSByZXF1aXJlKCcuLi9pbnRlcm5hbC9pc0xlbmd0aCcpLFxuICAgIGlzT2JqZWN0TGlrZSA9IHJlcXVpcmUoJy4uL2ludGVybmFsL2lzT2JqZWN0TGlrZScpO1xuXG4vKiogYE9iamVjdCN0b1N0cmluZ2AgcmVzdWx0IHJlZmVyZW5jZXMuICovXG52YXIgYXJnc1RhZyA9ICdbb2JqZWN0IEFyZ3VtZW50c10nO1xuXG4vKiogVXNlZCBmb3IgbmF0aXZlIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqXG4gKiBVc2VkIHRvIHJlc29sdmUgdGhlIFtgdG9TdHJpbmdUYWdgXShodHRwczovL3Blb3BsZS5tb3ppbGxhLm9yZy9+am9yZW5kb3JmZi9lczYtZHJhZnQuaHRtbCNzZWMtb2JqZWN0LnByb3RvdHlwZS50b3N0cmluZylcbiAqIG9mIHZhbHVlcy5cbiAqL1xudmFyIG9ialRvU3RyaW5nID0gb2JqZWN0UHJvdG8udG9TdHJpbmc7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgY2xhc3NpZmllZCBhcyBhbiBgYXJndW1lbnRzYCBvYmplY3QuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGNvcnJlY3RseSBjbGFzc2lmaWVkLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNBcmd1bWVudHMoZnVuY3Rpb24oKSB7IHJldHVybiBhcmd1bWVudHM7IH0oKSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0FyZ3VtZW50cyhbMSwgMiwgM10pO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNBcmd1bWVudHModmFsdWUpIHtcbiAgdmFyIGxlbmd0aCA9IGlzT2JqZWN0TGlrZSh2YWx1ZSkgPyB2YWx1ZS5sZW5ndGggOiB1bmRlZmluZWQ7XG4gIHJldHVybiBpc0xlbmd0aChsZW5ndGgpICYmIG9ialRvU3RyaW5nLmNhbGwodmFsdWUpID09IGFyZ3NUYWc7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNBcmd1bWVudHM7XG4iLCJ2YXIgaXNMZW5ndGggPSByZXF1aXJlKCcuLi9pbnRlcm5hbC9pc0xlbmd0aCcpLFxuICAgIGlzTmF0aXZlID0gcmVxdWlyZSgnLi9pc05hdGl2ZScpLFxuICAgIGlzT2JqZWN0TGlrZSA9IHJlcXVpcmUoJy4uL2ludGVybmFsL2lzT2JqZWN0TGlrZScpO1xuXG4vKiogYE9iamVjdCN0b1N0cmluZ2AgcmVzdWx0IHJlZmVyZW5jZXMuICovXG52YXIgYXJyYXlUYWcgPSAnW29iamVjdCBBcnJheV0nO1xuXG4vKiogVXNlZCBmb3IgbmF0aXZlIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqXG4gKiBVc2VkIHRvIHJlc29sdmUgdGhlIFtgdG9TdHJpbmdUYWdgXShodHRwczovL3Blb3BsZS5tb3ppbGxhLm9yZy9+am9yZW5kb3JmZi9lczYtZHJhZnQuaHRtbCNzZWMtb2JqZWN0LnByb3RvdHlwZS50b3N0cmluZylcbiAqIG9mIHZhbHVlcy5cbiAqL1xudmFyIG9ialRvU3RyaW5nID0gb2JqZWN0UHJvdG8udG9TdHJpbmc7XG5cbi8qIE5hdGl2ZSBtZXRob2QgcmVmZXJlbmNlcyBmb3IgdGhvc2Ugd2l0aCB0aGUgc2FtZSBuYW1lIGFzIG90aGVyIGBsb2Rhc2hgIG1ldGhvZHMuICovXG52YXIgbmF0aXZlSXNBcnJheSA9IGlzTmF0aXZlKG5hdGl2ZUlzQXJyYXkgPSBBcnJheS5pc0FycmF5KSAmJiBuYXRpdmVJc0FycmF5O1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGNsYXNzaWZpZWQgYXMgYW4gYEFycmF5YCBvYmplY3QuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGNvcnJlY3RseSBjbGFzc2lmaWVkLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNBcnJheShbMSwgMiwgM10pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNBcnJheShmdW5jdGlvbigpIHsgcmV0dXJuIGFyZ3VtZW50czsgfSgpKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbnZhciBpc0FycmF5ID0gbmF0aXZlSXNBcnJheSB8fCBmdW5jdGlvbih2YWx1ZSkge1xuICByZXR1cm4gaXNPYmplY3RMaWtlKHZhbHVlKSAmJiBpc0xlbmd0aCh2YWx1ZS5sZW5ndGgpICYmIG9ialRvU3RyaW5nLmNhbGwodmFsdWUpID09IGFycmF5VGFnO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBpc0FycmF5O1xuIiwidmFyIGJhc2VJc0Z1bmN0aW9uID0gcmVxdWlyZSgnLi4vaW50ZXJuYWwvYmFzZUlzRnVuY3Rpb24nKSxcbiAgICBpc05hdGl2ZSA9IHJlcXVpcmUoJy4vaXNOYXRpdmUnKTtcblxuLyoqIGBPYmplY3QjdG9TdHJpbmdgIHJlc3VsdCByZWZlcmVuY2VzLiAqL1xudmFyIGZ1bmNUYWcgPSAnW29iamVjdCBGdW5jdGlvbl0nO1xuXG4vKiogVXNlZCBmb3IgbmF0aXZlIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqXG4gKiBVc2VkIHRvIHJlc29sdmUgdGhlIFtgdG9TdHJpbmdUYWdgXShodHRwczovL3Blb3BsZS5tb3ppbGxhLm9yZy9+am9yZW5kb3JmZi9lczYtZHJhZnQuaHRtbCNzZWMtb2JqZWN0LnByb3RvdHlwZS50b3N0cmluZylcbiAqIG9mIHZhbHVlcy5cbiAqL1xudmFyIG9ialRvU3RyaW5nID0gb2JqZWN0UHJvdG8udG9TdHJpbmc7XG5cbi8qKiBOYXRpdmUgbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgVWludDhBcnJheSA9IGlzTmF0aXZlKFVpbnQ4QXJyYXkgPSBnbG9iYWwuVWludDhBcnJheSkgJiYgVWludDhBcnJheTtcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBjbGFzc2lmaWVkIGFzIGEgYEZ1bmN0aW9uYCBvYmplY3QuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGNvcnJlY3RseSBjbGFzc2lmaWVkLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNGdW5jdGlvbihfKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzRnVuY3Rpb24oL2FiYy8pO1xuICogLy8gPT4gZmFsc2VcbiAqL1xudmFyIGlzRnVuY3Rpb24gPSAhKGJhc2VJc0Z1bmN0aW9uKC94LykgfHwgKFVpbnQ4QXJyYXkgJiYgIWJhc2VJc0Z1bmN0aW9uKFVpbnQ4QXJyYXkpKSkgPyBiYXNlSXNGdW5jdGlvbiA6IGZ1bmN0aW9uKHZhbHVlKSB7XG4gIC8vIFRoZSB1c2Ugb2YgYE9iamVjdCN0b1N0cmluZ2AgYXZvaWRzIGlzc3VlcyB3aXRoIHRoZSBgdHlwZW9mYCBvcGVyYXRvclxuICAvLyBpbiBvbGRlciB2ZXJzaW9ucyBvZiBDaHJvbWUgYW5kIFNhZmFyaSB3aGljaCByZXR1cm4gJ2Z1bmN0aW9uJyBmb3IgcmVnZXhlc1xuICAvLyBhbmQgU2FmYXJpIDggZXF1aXZhbGVudHMgd2hpY2ggcmV0dXJuICdvYmplY3QnIGZvciB0eXBlZCBhcnJheSBjb25zdHJ1Y3RvcnMuXG4gIHJldHVybiBvYmpUb1N0cmluZy5jYWxsKHZhbHVlKSA9PSBmdW5jVGFnO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBpc0Z1bmN0aW9uO1xuIiwidmFyIGVzY2FwZVJlZ0V4cCA9IHJlcXVpcmUoJy4uL3N0cmluZy9lc2NhcGVSZWdFeHAnKSxcbiAgICBpc09iamVjdExpa2UgPSByZXF1aXJlKCcuLi9pbnRlcm5hbC9pc09iamVjdExpa2UnKTtcblxuLyoqIGBPYmplY3QjdG9TdHJpbmdgIHJlc3VsdCByZWZlcmVuY2VzLiAqL1xudmFyIGZ1bmNUYWcgPSAnW29iamVjdCBGdW5jdGlvbl0nO1xuXG4vKiogVXNlZCB0byBkZXRlY3QgaG9zdCBjb25zdHJ1Y3RvcnMgKFNhZmFyaSA+IDUpLiAqL1xudmFyIHJlSG9zdEN0b3IgPSAvXlxcW29iamVjdCAuKz9Db25zdHJ1Y3RvclxcXSQvO1xuXG4vKiogVXNlZCBmb3IgbmF0aXZlIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqIFVzZWQgdG8gcmVzb2x2ZSB0aGUgZGVjb21waWxlZCBzb3VyY2Ugb2YgZnVuY3Rpb25zLiAqL1xudmFyIGZuVG9TdHJpbmcgPSBGdW5jdGlvbi5wcm90b3R5cGUudG9TdHJpbmc7XG5cbi8qKlxuICogVXNlZCB0byByZXNvbHZlIHRoZSBbYHRvU3RyaW5nVGFnYF0oaHR0cHM6Ly9wZW9wbGUubW96aWxsYS5vcmcvfmpvcmVuZG9yZmYvZXM2LWRyYWZ0Lmh0bWwjc2VjLW9iamVjdC5wcm90b3R5cGUudG9zdHJpbmcpXG4gKiBvZiB2YWx1ZXMuXG4gKi9cbnZhciBvYmpUb1N0cmluZyA9IG9iamVjdFByb3RvLnRvU3RyaW5nO1xuXG4vKiogVXNlZCB0byBkZXRlY3QgaWYgYSBtZXRob2QgaXMgbmF0aXZlLiAqL1xudmFyIHJlTmF0aXZlID0gUmVnRXhwKCdeJyArXG4gIGVzY2FwZVJlZ0V4cChvYmpUb1N0cmluZylcbiAgLnJlcGxhY2UoL3RvU3RyaW5nfChmdW5jdGlvbikuKj8oPz1cXFxcXFwoKXwgZm9yIC4rPyg/PVxcXFxcXF0pL2csICckMS4qPycpICsgJyQnXG4pO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGEgbmF0aXZlIGZ1bmN0aW9uLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIG5hdGl2ZSBmdW5jdGlvbiwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzTmF0aXZlKEFycmF5LnByb3RvdHlwZS5wdXNoKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzTmF0aXZlKF8pO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNOYXRpdmUodmFsdWUpIHtcbiAgaWYgKHZhbHVlID09IG51bGwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgaWYgKG9ialRvU3RyaW5nLmNhbGwodmFsdWUpID09IGZ1bmNUYWcpIHtcbiAgICByZXR1cm4gcmVOYXRpdmUudGVzdChmblRvU3RyaW5nLmNhbGwodmFsdWUpKTtcbiAgfVxuICByZXR1cm4gaXNPYmplY3RMaWtlKHZhbHVlKSAmJiByZUhvc3RDdG9yLnRlc3QodmFsdWUpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzTmF0aXZlO1xuIiwiLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyB0aGUgW2xhbmd1YWdlIHR5cGVdKGh0dHBzOi8vZXM1LmdpdGh1Yi5pby8jeDgpIG9mIGBPYmplY3RgLlxuICogKGUuZy4gYXJyYXlzLCBmdW5jdGlvbnMsIG9iamVjdHMsIHJlZ2V4ZXMsIGBuZXcgTnVtYmVyKDApYCwgYW5kIGBuZXcgU3RyaW5nKCcnKWApXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGFuIG9iamVjdCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzT2JqZWN0KHt9KTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0KFsxLCAyLCAzXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdCgxKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzT2JqZWN0KHZhbHVlKSB7XG4gIC8vIEF2b2lkIGEgVjggSklUIGJ1ZyBpbiBDaHJvbWUgMTktMjAuXG4gIC8vIFNlZSBodHRwczovL2NvZGUuZ29vZ2xlLmNvbS9wL3Y4L2lzc3Vlcy9kZXRhaWw/aWQ9MjI5MSBmb3IgbW9yZSBkZXRhaWxzLlxuICB2YXIgdHlwZSA9IHR5cGVvZiB2YWx1ZTtcbiAgcmV0dXJuIHR5cGUgPT0gJ2Z1bmN0aW9uJyB8fCAoISF2YWx1ZSAmJiB0eXBlID09ICdvYmplY3QnKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc09iamVjdDtcbiIsInZhciBpc0xlbmd0aCA9IHJlcXVpcmUoJy4uL2ludGVybmFsL2lzTGVuZ3RoJyksXG4gICAgaXNPYmplY3RMaWtlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWwvaXNPYmplY3RMaWtlJyk7XG5cbi8qKiBgT2JqZWN0I3RvU3RyaW5nYCByZXN1bHQgcmVmZXJlbmNlcy4gKi9cbnZhciBhcmdzVGFnID0gJ1tvYmplY3QgQXJndW1lbnRzXScsXG4gICAgYXJyYXlUYWcgPSAnW29iamVjdCBBcnJheV0nLFxuICAgIGJvb2xUYWcgPSAnW29iamVjdCBCb29sZWFuXScsXG4gICAgZGF0ZVRhZyA9ICdbb2JqZWN0IERhdGVdJyxcbiAgICBlcnJvclRhZyA9ICdbb2JqZWN0IEVycm9yXScsXG4gICAgZnVuY1RhZyA9ICdbb2JqZWN0IEZ1bmN0aW9uXScsXG4gICAgbWFwVGFnID0gJ1tvYmplY3QgTWFwXScsXG4gICAgbnVtYmVyVGFnID0gJ1tvYmplY3QgTnVtYmVyXScsXG4gICAgb2JqZWN0VGFnID0gJ1tvYmplY3QgT2JqZWN0XScsXG4gICAgcmVnZXhwVGFnID0gJ1tvYmplY3QgUmVnRXhwXScsXG4gICAgc2V0VGFnID0gJ1tvYmplY3QgU2V0XScsXG4gICAgc3RyaW5nVGFnID0gJ1tvYmplY3QgU3RyaW5nXScsXG4gICAgd2Vha01hcFRhZyA9ICdbb2JqZWN0IFdlYWtNYXBdJztcblxudmFyIGFycmF5QnVmZmVyVGFnID0gJ1tvYmplY3QgQXJyYXlCdWZmZXJdJyxcbiAgICBmbG9hdDMyVGFnID0gJ1tvYmplY3QgRmxvYXQzMkFycmF5XScsXG4gICAgZmxvYXQ2NFRhZyA9ICdbb2JqZWN0IEZsb2F0NjRBcnJheV0nLFxuICAgIGludDhUYWcgPSAnW29iamVjdCBJbnQ4QXJyYXldJyxcbiAgICBpbnQxNlRhZyA9ICdbb2JqZWN0IEludDE2QXJyYXldJyxcbiAgICBpbnQzMlRhZyA9ICdbb2JqZWN0IEludDMyQXJyYXldJyxcbiAgICB1aW50OFRhZyA9ICdbb2JqZWN0IFVpbnQ4QXJyYXldJyxcbiAgICB1aW50OENsYW1wZWRUYWcgPSAnW29iamVjdCBVaW50OENsYW1wZWRBcnJheV0nLFxuICAgIHVpbnQxNlRhZyA9ICdbb2JqZWN0IFVpbnQxNkFycmF5XScsXG4gICAgdWludDMyVGFnID0gJ1tvYmplY3QgVWludDMyQXJyYXldJztcblxuLyoqIFVzZWQgdG8gaWRlbnRpZnkgYHRvU3RyaW5nVGFnYCB2YWx1ZXMgb2YgdHlwZWQgYXJyYXlzLiAqL1xudmFyIHR5cGVkQXJyYXlUYWdzID0ge307XG50eXBlZEFycmF5VGFnc1tmbG9hdDMyVGFnXSA9IHR5cGVkQXJyYXlUYWdzW2Zsb2F0NjRUYWddID1cbnR5cGVkQXJyYXlUYWdzW2ludDhUYWddID0gdHlwZWRBcnJheVRhZ3NbaW50MTZUYWddID1cbnR5cGVkQXJyYXlUYWdzW2ludDMyVGFnXSA9IHR5cGVkQXJyYXlUYWdzW3VpbnQ4VGFnXSA9XG50eXBlZEFycmF5VGFnc1t1aW50OENsYW1wZWRUYWddID0gdHlwZWRBcnJheVRhZ3NbdWludDE2VGFnXSA9XG50eXBlZEFycmF5VGFnc1t1aW50MzJUYWddID0gdHJ1ZTtcbnR5cGVkQXJyYXlUYWdzW2FyZ3NUYWddID0gdHlwZWRBcnJheVRhZ3NbYXJyYXlUYWddID1cbnR5cGVkQXJyYXlUYWdzW2FycmF5QnVmZmVyVGFnXSA9IHR5cGVkQXJyYXlUYWdzW2Jvb2xUYWddID1cbnR5cGVkQXJyYXlUYWdzW2RhdGVUYWddID0gdHlwZWRBcnJheVRhZ3NbZXJyb3JUYWddID1cbnR5cGVkQXJyYXlUYWdzW2Z1bmNUYWddID0gdHlwZWRBcnJheVRhZ3NbbWFwVGFnXSA9XG50eXBlZEFycmF5VGFnc1tudW1iZXJUYWddID0gdHlwZWRBcnJheVRhZ3Nbb2JqZWN0VGFnXSA9XG50eXBlZEFycmF5VGFnc1tyZWdleHBUYWddID0gdHlwZWRBcnJheVRhZ3Nbc2V0VGFnXSA9XG50eXBlZEFycmF5VGFnc1tzdHJpbmdUYWddID0gdHlwZWRBcnJheVRhZ3Nbd2Vha01hcFRhZ10gPSBmYWxzZTtcblxuLyoqIFVzZWQgZm9yIG5hdGl2ZSBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKlxuICogVXNlZCB0byByZXNvbHZlIHRoZSBbYHRvU3RyaW5nVGFnYF0oaHR0cHM6Ly9wZW9wbGUubW96aWxsYS5vcmcvfmpvcmVuZG9yZmYvZXM2LWRyYWZ0Lmh0bWwjc2VjLW9iamVjdC5wcm90b3R5cGUudG9zdHJpbmcpXG4gKiBvZiB2YWx1ZXMuXG4gKi9cbnZhciBvYmpUb1N0cmluZyA9IG9iamVjdFByb3RvLnRvU3RyaW5nO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGNsYXNzaWZpZWQgYXMgYSB0eXBlZCBhcnJheS5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgY29ycmVjdGx5IGNsYXNzaWZpZWQsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc1R5cGVkQXJyYXkobmV3IFVpbnQ4QXJyYXkpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNUeXBlZEFycmF5KFtdKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzVHlwZWRBcnJheSh2YWx1ZSkge1xuICByZXR1cm4gaXNPYmplY3RMaWtlKHZhbHVlKSAmJiBpc0xlbmd0aCh2YWx1ZS5sZW5ndGgpICYmICEhdHlwZWRBcnJheVRhZ3Nbb2JqVG9TdHJpbmcuY2FsbCh2YWx1ZSldO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzVHlwZWRBcnJheTtcbiIsInZhciBiYXNlRm9yT3duID0gcmVxdWlyZSgnLi4vaW50ZXJuYWwvYmFzZUZvck93bicpLFxuICAgIGNyZWF0ZUZpbmRLZXkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbC9jcmVhdGVGaW5kS2V5Jyk7XG5cbi8qKlxuICogVGhpcyBtZXRob2QgaXMgbGlrZSBgXy5maW5kYCBleGNlcHQgdGhhdCBpdCByZXR1cm5zIHRoZSBrZXkgb2YgdGhlIGZpcnN0XG4gKiBlbGVtZW50IGBwcmVkaWNhdGVgIHJldHVybnMgdHJ1dGh5IGZvciBpbnN0ZWFkIG9mIHRoZSBlbGVtZW50IGl0c2VsZi5cbiAqXG4gKiBJZiBhIHByb3BlcnR5IG5hbWUgaXMgcHJvdmlkZWQgZm9yIGBwcmVkaWNhdGVgIHRoZSBjcmVhdGVkIGBfLnByb3BlcnR5YFxuICogc3R5bGUgY2FsbGJhY2sgcmV0dXJucyB0aGUgcHJvcGVydHkgdmFsdWUgb2YgdGhlIGdpdmVuIGVsZW1lbnQuXG4gKlxuICogSWYgYSB2YWx1ZSBpcyBhbHNvIHByb3ZpZGVkIGZvciBgdGhpc0FyZ2AgdGhlIGNyZWF0ZWQgYF8ubWF0Y2hlc1Byb3BlcnR5YFxuICogc3R5bGUgY2FsbGJhY2sgcmV0dXJucyBgdHJ1ZWAgZm9yIGVsZW1lbnRzIHRoYXQgaGF2ZSBhIG1hdGNoaW5nIHByb3BlcnR5XG4gKiB2YWx1ZSwgZWxzZSBgZmFsc2VgLlxuICpcbiAqIElmIGFuIG9iamVjdCBpcyBwcm92aWRlZCBmb3IgYHByZWRpY2F0ZWAgdGhlIGNyZWF0ZWQgYF8ubWF0Y2hlc2Agc3R5bGVcbiAqIGNhbGxiYWNrIHJldHVybnMgYHRydWVgIGZvciBlbGVtZW50cyB0aGF0IGhhdmUgdGhlIHByb3BlcnRpZXMgb2YgdGhlIGdpdmVuXG4gKiBvYmplY3QsIGVsc2UgYGZhbHNlYC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IE9iamVjdFxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHNlYXJjaC5cbiAqIEBwYXJhbSB7RnVuY3Rpb258T2JqZWN0fHN0cmluZ30gW3ByZWRpY2F0ZT1fLmlkZW50aXR5XSBUaGUgZnVuY3Rpb24gaW52b2tlZFxuICogIHBlciBpdGVyYXRpb24uXG4gKiBAcGFyYW0geyp9IFt0aGlzQXJnXSBUaGUgYHRoaXNgIGJpbmRpbmcgb2YgYHByZWRpY2F0ZWAuXG4gKiBAcmV0dXJucyB7c3RyaW5nfHVuZGVmaW5lZH0gUmV0dXJucyB0aGUga2V5IG9mIHRoZSBtYXRjaGVkIGVsZW1lbnQsIGVsc2UgYHVuZGVmaW5lZGAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIHZhciB1c2VycyA9IHtcbiAqICAgJ2Jhcm5leSc6ICB7ICdhZ2UnOiAzNiwgJ2FjdGl2ZSc6IHRydWUgfSxcbiAqICAgJ2ZyZWQnOiAgICB7ICdhZ2UnOiA0MCwgJ2FjdGl2ZSc6IGZhbHNlIH0sXG4gKiAgICdwZWJibGVzJzogeyAnYWdlJzogMSwgICdhY3RpdmUnOiB0cnVlIH1cbiAqIH07XG4gKlxuICogXy5maW5kS2V5KHVzZXJzLCBmdW5jdGlvbihjaHIpIHtcbiAqICAgcmV0dXJuIGNoci5hZ2UgPCA0MDtcbiAqIH0pO1xuICogLy8gPT4gJ2Jhcm5leScgKGl0ZXJhdGlvbiBvcmRlciBpcyBub3QgZ3VhcmFudGVlZClcbiAqXG4gKiAvLyB1c2luZyB0aGUgYF8ubWF0Y2hlc2AgY2FsbGJhY2sgc2hvcnRoYW5kXG4gKiBfLmZpbmRLZXkodXNlcnMsIHsgJ2FnZSc6IDEsICdhY3RpdmUnOiB0cnVlIH0pO1xuICogLy8gPT4gJ3BlYmJsZXMnXG4gKlxuICogLy8gdXNpbmcgdGhlIGBfLm1hdGNoZXNQcm9wZXJ0eWAgY2FsbGJhY2sgc2hvcnRoYW5kXG4gKiBfLmZpbmRLZXkodXNlcnMsICdhY3RpdmUnLCBmYWxzZSk7XG4gKiAvLyA9PiAnZnJlZCdcbiAqXG4gKiAvLyB1c2luZyB0aGUgYF8ucHJvcGVydHlgIGNhbGxiYWNrIHNob3J0aGFuZFxuICogXy5maW5kS2V5KHVzZXJzLCAnYWN0aXZlJyk7XG4gKiAvLyA9PiAnYmFybmV5J1xuICovXG52YXIgZmluZEtleSA9IGNyZWF0ZUZpbmRLZXkoYmFzZUZvck93bik7XG5cbm1vZHVsZS5leHBvcnRzID0gZmluZEtleTtcbiIsInZhciBiYXNlRm9yT3duID0gcmVxdWlyZSgnLi4vaW50ZXJuYWwvYmFzZUZvck93bicpLFxuICAgIGNyZWF0ZUZvck93biA9IHJlcXVpcmUoJy4uL2ludGVybmFsL2NyZWF0ZUZvck93bicpO1xuXG4vKipcbiAqIEl0ZXJhdGVzIG92ZXIgb3duIGVudW1lcmFibGUgcHJvcGVydGllcyBvZiBhbiBvYmplY3QgaW52b2tpbmcgYGl0ZXJhdGVlYFxuICogZm9yIGVhY2ggcHJvcGVydHkuIFRoZSBgaXRlcmF0ZWVgIGlzIGJvdW5kIHRvIGB0aGlzQXJnYCBhbmQgaW52b2tlZCB3aXRoXG4gKiB0aHJlZSBhcmd1bWVudHM6ICh2YWx1ZSwga2V5LCBvYmplY3QpLiBJdGVyYXRvciBmdW5jdGlvbnMgbWF5IGV4aXQgaXRlcmF0aW9uXG4gKiBlYXJseSBieSBleHBsaWNpdGx5IHJldHVybmluZyBgZmFsc2VgLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAY2F0ZWdvcnkgT2JqZWN0XG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gaXRlcmF0ZSBvdmVyLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gW2l0ZXJhdGVlPV8uaWRlbnRpdHldIFRoZSBmdW5jdGlvbiBpbnZva2VkIHBlciBpdGVyYXRpb24uXG4gKiBAcGFyYW0geyp9IFt0aGlzQXJnXSBUaGUgYHRoaXNgIGJpbmRpbmcgb2YgYGl0ZXJhdGVlYC5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgYG9iamVjdGAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIGZ1bmN0aW9uIEZvbygpIHtcbiAqICAgdGhpcy5hID0gMTtcbiAqICAgdGhpcy5iID0gMjtcbiAqIH1cbiAqXG4gKiBGb28ucHJvdG90eXBlLmMgPSAzO1xuICpcbiAqIF8uZm9yT3duKG5ldyBGb28sIGZ1bmN0aW9uKHZhbHVlLCBrZXkpIHtcbiAqICAgY29uc29sZS5sb2coa2V5KTtcbiAqIH0pO1xuICogLy8gPT4gbG9ncyAnYScgYW5kICdiJyAoaXRlcmF0aW9uIG9yZGVyIGlzIG5vdCBndWFyYW50ZWVkKVxuICovXG52YXIgZm9yT3duID0gY3JlYXRlRm9yT3duKGJhc2VGb3JPd24pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZvck93bjtcbiIsInZhciBpc0xlbmd0aCA9IHJlcXVpcmUoJy4uL2ludGVybmFsL2lzTGVuZ3RoJyksXG4gICAgaXNOYXRpdmUgPSByZXF1aXJlKCcuLi9sYW5nL2lzTmF0aXZlJyksXG4gICAgaXNPYmplY3QgPSByZXF1aXJlKCcuLi9sYW5nL2lzT2JqZWN0JyksXG4gICAgc2hpbUtleXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbC9zaGltS2V5cycpO1xuXG4vKiBOYXRpdmUgbWV0aG9kIHJlZmVyZW5jZXMgZm9yIHRob3NlIHdpdGggdGhlIHNhbWUgbmFtZSBhcyBvdGhlciBgbG9kYXNoYCBtZXRob2RzLiAqL1xudmFyIG5hdGl2ZUtleXMgPSBpc05hdGl2ZShuYXRpdmVLZXlzID0gT2JqZWN0LmtleXMpICYmIG5hdGl2ZUtleXM7XG5cbi8qKlxuICogQ3JlYXRlcyBhbiBhcnJheSBvZiB0aGUgb3duIGVudW1lcmFibGUgcHJvcGVydHkgbmFtZXMgb2YgYG9iamVjdGAuXG4gKlxuICogKipOb3RlOioqIE5vbi1vYmplY3QgdmFsdWVzIGFyZSBjb2VyY2VkIHRvIG9iamVjdHMuIFNlZSB0aGVcbiAqIFtFUyBzcGVjXShodHRwczovL3Blb3BsZS5tb3ppbGxhLm9yZy9+am9yZW5kb3JmZi9lczYtZHJhZnQuaHRtbCNzZWMtb2JqZWN0LmtleXMpXG4gKiBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAY2F0ZWdvcnkgT2JqZWN0XG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gaW5zcGVjdC5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgYXJyYXkgb2YgcHJvcGVydHkgbmFtZXMuXG4gKiBAZXhhbXBsZVxuICpcbiAqIGZ1bmN0aW9uIEZvbygpIHtcbiAqICAgdGhpcy5hID0gMTtcbiAqICAgdGhpcy5iID0gMjtcbiAqIH1cbiAqXG4gKiBGb28ucHJvdG90eXBlLmMgPSAzO1xuICpcbiAqIF8ua2V5cyhuZXcgRm9vKTtcbiAqIC8vID0+IFsnYScsICdiJ10gKGl0ZXJhdGlvbiBvcmRlciBpcyBub3QgZ3VhcmFudGVlZClcbiAqXG4gKiBfLmtleXMoJ2hpJyk7XG4gKiAvLyA9PiBbJzAnLCAnMSddXG4gKi9cbnZhciBrZXlzID0gIW5hdGl2ZUtleXMgPyBzaGltS2V5cyA6IGZ1bmN0aW9uKG9iamVjdCkge1xuICBpZiAob2JqZWN0KSB7XG4gICAgdmFyIEN0b3IgPSBvYmplY3QuY29uc3RydWN0b3IsXG4gICAgICAgIGxlbmd0aCA9IG9iamVjdC5sZW5ndGg7XG4gIH1cbiAgaWYgKCh0eXBlb2YgQ3RvciA9PSAnZnVuY3Rpb24nICYmIEN0b3IucHJvdG90eXBlID09PSBvYmplY3QpIHx8XG4gICAgICAodHlwZW9mIG9iamVjdCAhPSAnZnVuY3Rpb24nICYmIChsZW5ndGggJiYgaXNMZW5ndGgobGVuZ3RoKSkpKSB7XG4gICAgcmV0dXJuIHNoaW1LZXlzKG9iamVjdCk7XG4gIH1cbiAgcmV0dXJuIGlzT2JqZWN0KG9iamVjdCkgPyBuYXRpdmVLZXlzKG9iamVjdCkgOiBbXTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0ga2V5cztcbiIsInZhciBpc0FyZ3VtZW50cyA9IHJlcXVpcmUoJy4uL2xhbmcvaXNBcmd1bWVudHMnKSxcbiAgICBpc0FycmF5ID0gcmVxdWlyZSgnLi4vbGFuZy9pc0FycmF5JyksXG4gICAgaXNJbmRleCA9IHJlcXVpcmUoJy4uL2ludGVybmFsL2lzSW5kZXgnKSxcbiAgICBpc0xlbmd0aCA9IHJlcXVpcmUoJy4uL2ludGVybmFsL2lzTGVuZ3RoJyksXG4gICAgaXNPYmplY3QgPSByZXF1aXJlKCcuLi9sYW5nL2lzT2JqZWN0JyksXG4gICAgc3VwcG9ydCA9IHJlcXVpcmUoJy4uL3N1cHBvcnQnKTtcblxuLyoqIFVzZWQgZm9yIG5hdGl2ZSBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKiBVc2VkIHRvIGNoZWNrIG9iamVjdHMgZm9yIG93biBwcm9wZXJ0aWVzLiAqL1xudmFyIGhhc093blByb3BlcnR5ID0gb2JqZWN0UHJvdG8uaGFzT3duUHJvcGVydHk7XG5cbi8qKlxuICogQ3JlYXRlcyBhbiBhcnJheSBvZiB0aGUgb3duIGFuZCBpbmhlcml0ZWQgZW51bWVyYWJsZSBwcm9wZXJ0eSBuYW1lcyBvZiBgb2JqZWN0YC5cbiAqXG4gKiAqKk5vdGU6KiogTm9uLW9iamVjdCB2YWx1ZXMgYXJlIGNvZXJjZWQgdG8gb2JqZWN0cy5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IE9iamVjdFxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIGluc3BlY3QuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIGFycmF5IG9mIHByb3BlcnR5IG5hbWVzLlxuICogQGV4YW1wbGVcbiAqXG4gKiBmdW5jdGlvbiBGb28oKSB7XG4gKiAgIHRoaXMuYSA9IDE7XG4gKiAgIHRoaXMuYiA9IDI7XG4gKiB9XG4gKlxuICogRm9vLnByb3RvdHlwZS5jID0gMztcbiAqXG4gKiBfLmtleXNJbihuZXcgRm9vKTtcbiAqIC8vID0+IFsnYScsICdiJywgJ2MnXSAoaXRlcmF0aW9uIG9yZGVyIGlzIG5vdCBndWFyYW50ZWVkKVxuICovXG5mdW5jdGlvbiBrZXlzSW4ob2JqZWN0KSB7XG4gIGlmIChvYmplY3QgPT0gbnVsbCkge1xuICAgIHJldHVybiBbXTtcbiAgfVxuICBpZiAoIWlzT2JqZWN0KG9iamVjdCkpIHtcbiAgICBvYmplY3QgPSBPYmplY3Qob2JqZWN0KTtcbiAgfVxuICB2YXIgbGVuZ3RoID0gb2JqZWN0Lmxlbmd0aDtcbiAgbGVuZ3RoID0gKGxlbmd0aCAmJiBpc0xlbmd0aChsZW5ndGgpICYmXG4gICAgKGlzQXJyYXkob2JqZWN0KSB8fCAoc3VwcG9ydC5ub25FbnVtQXJncyAmJiBpc0FyZ3VtZW50cyhvYmplY3QpKSkgJiYgbGVuZ3RoKSB8fCAwO1xuXG4gIHZhciBDdG9yID0gb2JqZWN0LmNvbnN0cnVjdG9yLFxuICAgICAgaW5kZXggPSAtMSxcbiAgICAgIGlzUHJvdG8gPSB0eXBlb2YgQ3RvciA9PSAnZnVuY3Rpb24nICYmIEN0b3IucHJvdG90eXBlID09PSBvYmplY3QsXG4gICAgICByZXN1bHQgPSBBcnJheShsZW5ndGgpLFxuICAgICAgc2tpcEluZGV4ZXMgPSBsZW5ndGggPiAwO1xuXG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgcmVzdWx0W2luZGV4XSA9IChpbmRleCArICcnKTtcbiAgfVxuICBmb3IgKHZhciBrZXkgaW4gb2JqZWN0KSB7XG4gICAgaWYgKCEoc2tpcEluZGV4ZXMgJiYgaXNJbmRleChrZXksIGxlbmd0aCkpICYmXG4gICAgICAgICEoa2V5ID09ICdjb25zdHJ1Y3RvcicgJiYgKGlzUHJvdG8gfHwgIWhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBrZXkpKSkpIHtcbiAgICAgIHJlc3VsdC5wdXNoKGtleSk7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ga2V5c0luO1xuIiwidmFyIGJhc2VDYWxsYmFjayA9IHJlcXVpcmUoJy4uL2ludGVybmFsL2Jhc2VDYWxsYmFjaycpLFxuICAgIGJhc2VGb3JPd24gPSByZXF1aXJlKCcuLi9pbnRlcm5hbC9iYXNlRm9yT3duJyk7XG5cbi8qKlxuICogQ3JlYXRlcyBhbiBvYmplY3Qgd2l0aCB0aGUgc2FtZSBrZXlzIGFzIGBvYmplY3RgIGFuZCB2YWx1ZXMgZ2VuZXJhdGVkIGJ5XG4gKiBydW5uaW5nIGVhY2ggb3duIGVudW1lcmFibGUgcHJvcGVydHkgb2YgYG9iamVjdGAgdGhyb3VnaCBgaXRlcmF0ZWVgLiBUaGVcbiAqIGl0ZXJhdGVlIGZ1bmN0aW9uIGlzIGJvdW5kIHRvIGB0aGlzQXJnYCBhbmQgaW52b2tlZCB3aXRoIHRocmVlIGFyZ3VtZW50czpcbiAqICh2YWx1ZSwga2V5LCBvYmplY3QpLlxuICpcbiAqIElmIGEgcHJvcGVydHkgbmFtZSBpcyBwcm92aWRlZCBmb3IgYGl0ZXJhdGVlYCB0aGUgY3JlYXRlZCBgXy5wcm9wZXJ0eWBcbiAqIHN0eWxlIGNhbGxiYWNrIHJldHVybnMgdGhlIHByb3BlcnR5IHZhbHVlIG9mIHRoZSBnaXZlbiBlbGVtZW50LlxuICpcbiAqIElmIGEgdmFsdWUgaXMgYWxzbyBwcm92aWRlZCBmb3IgYHRoaXNBcmdgIHRoZSBjcmVhdGVkIGBfLm1hdGNoZXNQcm9wZXJ0eWBcbiAqIHN0eWxlIGNhbGxiYWNrIHJldHVybnMgYHRydWVgIGZvciBlbGVtZW50cyB0aGF0IGhhdmUgYSBtYXRjaGluZyBwcm9wZXJ0eVxuICogdmFsdWUsIGVsc2UgYGZhbHNlYC5cbiAqXG4gKiBJZiBhbiBvYmplY3QgaXMgcHJvdmlkZWQgZm9yIGBpdGVyYXRlZWAgdGhlIGNyZWF0ZWQgYF8ubWF0Y2hlc2Agc3R5bGVcbiAqIGNhbGxiYWNrIHJldHVybnMgYHRydWVgIGZvciBlbGVtZW50cyB0aGF0IGhhdmUgdGhlIHByb3BlcnRpZXMgb2YgdGhlIGdpdmVuXG4gKiBvYmplY3QsIGVsc2UgYGZhbHNlYC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IE9iamVjdFxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIGl0ZXJhdGUgb3Zlci5cbiAqIEBwYXJhbSB7RnVuY3Rpb258T2JqZWN0fHN0cmluZ30gW2l0ZXJhdGVlPV8uaWRlbnRpdHldIFRoZSBmdW5jdGlvbiBpbnZva2VkXG4gKiAgcGVyIGl0ZXJhdGlvbi5cbiAqIEBwYXJhbSB7Kn0gW3RoaXNBcmddIFRoZSBgdGhpc2AgYmluZGluZyBvZiBgaXRlcmF0ZWVgLlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyB0aGUgbmV3IG1hcHBlZCBvYmplY3QuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8ubWFwVmFsdWVzKHsgJ2EnOiAxLCAnYic6IDIgfSwgZnVuY3Rpb24obikge1xuICogICByZXR1cm4gbiAqIDM7XG4gKiB9KTtcbiAqIC8vID0+IHsgJ2EnOiAzLCAnYic6IDYgfVxuICpcbiAqIHZhciB1c2VycyA9IHtcbiAqICAgJ2ZyZWQnOiAgICB7ICd1c2VyJzogJ2ZyZWQnLCAgICAnYWdlJzogNDAgfSxcbiAqICAgJ3BlYmJsZXMnOiB7ICd1c2VyJzogJ3BlYmJsZXMnLCAnYWdlJzogMSB9XG4gKiB9O1xuICpcbiAqIC8vIHVzaW5nIHRoZSBgXy5wcm9wZXJ0eWAgY2FsbGJhY2sgc2hvcnRoYW5kXG4gKiBfLm1hcFZhbHVlcyh1c2VycywgJ2FnZScpO1xuICogLy8gPT4geyAnZnJlZCc6IDQwLCAncGViYmxlcyc6IDEgfSAoaXRlcmF0aW9uIG9yZGVyIGlzIG5vdCBndWFyYW50ZWVkKVxuICovXG5mdW5jdGlvbiBtYXBWYWx1ZXMob2JqZWN0LCBpdGVyYXRlZSwgdGhpc0FyZykge1xuICB2YXIgcmVzdWx0ID0ge307XG4gIGl0ZXJhdGVlID0gYmFzZUNhbGxiYWNrKGl0ZXJhdGVlLCB0aGlzQXJnLCAzKTtcblxuICBiYXNlRm9yT3duKG9iamVjdCwgZnVuY3Rpb24odmFsdWUsIGtleSwgb2JqZWN0KSB7XG4gICAgcmVzdWx0W2tleV0gPSBpdGVyYXRlZSh2YWx1ZSwga2V5LCBvYmplY3QpO1xuICB9KTtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBtYXBWYWx1ZXM7XG4iLCJ2YXIgYmFzZVRvU3RyaW5nID0gcmVxdWlyZSgnLi4vaW50ZXJuYWwvYmFzZVRvU3RyaW5nJyk7XG5cbi8qKlxuICogVXNlZCB0byBtYXRjaCBgUmVnRXhwYCBbc3BlY2lhbCBjaGFyYWN0ZXJzXShodHRwOi8vd3d3LnJlZ3VsYXItZXhwcmVzc2lvbnMuaW5mby9jaGFyYWN0ZXJzLmh0bWwjc3BlY2lhbCkuXG4gKiBJbiBhZGRpdGlvbiB0byBzcGVjaWFsIGNoYXJhY3RlcnMgdGhlIGZvcndhcmQgc2xhc2ggaXMgZXNjYXBlZCB0byBhbGxvdyBmb3JcbiAqIGVhc2llciBgZXZhbGAgdXNlIGFuZCBgRnVuY3Rpb25gIGNvbXBpbGF0aW9uLlxuICovXG52YXIgcmVSZWdFeHBDaGFycyA9IC9bLiorP14ke30oKXxbXFxdXFwvXFxcXF0vZyxcbiAgICByZUhhc1JlZ0V4cENoYXJzID0gUmVnRXhwKHJlUmVnRXhwQ2hhcnMuc291cmNlKTtcblxuLyoqXG4gKiBFc2NhcGVzIHRoZSBgUmVnRXhwYCBzcGVjaWFsIGNoYXJhY3RlcnMgXCJcXFwiLCBcIi9cIiwgXCJeXCIsIFwiJFwiLCBcIi5cIiwgXCJ8XCIsIFwiP1wiLFxuICogXCIqXCIsIFwiK1wiLCBcIihcIiwgXCIpXCIsIFwiW1wiLCBcIl1cIiwgXCJ7XCIgYW5kIFwifVwiIGluIGBzdHJpbmdgLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAY2F0ZWdvcnkgU3RyaW5nXG4gKiBAcGFyYW0ge3N0cmluZ30gW3N0cmluZz0nJ10gVGhlIHN0cmluZyB0byBlc2NhcGUuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSBlc2NhcGVkIHN0cmluZy5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5lc2NhcGVSZWdFeHAoJ1tsb2Rhc2hdKGh0dHBzOi8vbG9kYXNoLmNvbS8pJyk7XG4gKiAvLyA9PiAnXFxbbG9kYXNoXFxdXFwoaHR0cHM6XFwvXFwvbG9kYXNoXFwuY29tXFwvXFwpJ1xuICovXG5mdW5jdGlvbiBlc2NhcGVSZWdFeHAoc3RyaW5nKSB7XG4gIHN0cmluZyA9IGJhc2VUb1N0cmluZyhzdHJpbmcpO1xuICByZXR1cm4gKHN0cmluZyAmJiByZUhhc1JlZ0V4cENoYXJzLnRlc3Qoc3RyaW5nKSlcbiAgICA/IHN0cmluZy5yZXBsYWNlKHJlUmVnRXhwQ2hhcnMsICdcXFxcJCYnKVxuICAgIDogc3RyaW5nO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGVzY2FwZVJlZ0V4cDtcbiIsIi8qKiBVc2VkIGZvciBuYXRpdmUgbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKiogVXNlZCB0byBkZXRlY3QgRE9NIHN1cHBvcnQuICovXG52YXIgZG9jdW1lbnQgPSAoZG9jdW1lbnQgPSBnbG9iYWwud2luZG93KSAmJiBkb2N1bWVudC5kb2N1bWVudDtcblxuLyoqIE5hdGl2ZSBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBwcm9wZXJ0eUlzRW51bWVyYWJsZSA9IG9iamVjdFByb3RvLnByb3BlcnR5SXNFbnVtZXJhYmxlO1xuXG4vKipcbiAqIEFuIG9iamVjdCBlbnZpcm9ubWVudCBmZWF0dXJlIGZsYWdzLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAdHlwZSBPYmplY3RcbiAqL1xudmFyIHN1cHBvcnQgPSB7fTtcblxuKGZ1bmN0aW9uKHgpIHtcblxuICAvKipcbiAgICogRGV0ZWN0IGlmIGZ1bmN0aW9ucyBjYW4gYmUgZGVjb21waWxlZCBieSBgRnVuY3Rpb24jdG9TdHJpbmdgXG4gICAqIChhbGwgYnV0IEZpcmVmb3ggT1MgY2VydGlmaWVkIGFwcHMsIG9sZGVyIE9wZXJhIG1vYmlsZSBicm93c2VycywgYW5kXG4gICAqIHRoZSBQbGF5U3RhdGlvbiAzOyBmb3JjZWQgYGZhbHNlYCBmb3IgV2luZG93cyA4IGFwcHMpLlxuICAgKlxuICAgKiBAbWVtYmVyT2YgXy5zdXBwb3J0XG4gICAqIEB0eXBlIGJvb2xlYW5cbiAgICovXG4gIHN1cHBvcnQuZnVuY0RlY29tcCA9IC9cXGJ0aGlzXFxiLy50ZXN0KGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpczsgfSk7XG5cbiAgLyoqXG4gICAqIERldGVjdCBpZiBgRnVuY3Rpb24jbmFtZWAgaXMgc3VwcG9ydGVkIChhbGwgYnV0IElFKS5cbiAgICpcbiAgICogQG1lbWJlck9mIF8uc3VwcG9ydFxuICAgKiBAdHlwZSBib29sZWFuXG4gICAqL1xuICBzdXBwb3J0LmZ1bmNOYW1lcyA9IHR5cGVvZiBGdW5jdGlvbi5uYW1lID09ICdzdHJpbmcnO1xuXG4gIC8qKlxuICAgKiBEZXRlY3QgaWYgdGhlIERPTSBpcyBzdXBwb3J0ZWQuXG4gICAqXG4gICAqIEBtZW1iZXJPZiBfLnN1cHBvcnRcbiAgICogQHR5cGUgYm9vbGVhblxuICAgKi9cbiAgdHJ5IHtcbiAgICBzdXBwb3J0LmRvbSA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKS5ub2RlVHlwZSA9PT0gMTE7XG4gIH0gY2F0Y2goZSkge1xuICAgIHN1cHBvcnQuZG9tID0gZmFsc2U7XG4gIH1cblxuICAvKipcbiAgICogRGV0ZWN0IGlmIGBhcmd1bWVudHNgIG9iamVjdCBpbmRleGVzIGFyZSBub24tZW51bWVyYWJsZS5cbiAgICpcbiAgICogSW4gRmlyZWZveCA8IDQsIElFIDwgOSwgUGhhbnRvbUpTLCBhbmQgU2FmYXJpIDwgNS4xIGBhcmd1bWVudHNgIG9iamVjdFxuICAgKiBpbmRleGVzIGFyZSBub24tZW51bWVyYWJsZS4gQ2hyb21lIDwgMjUgYW5kIE5vZGUuanMgPCAwLjExLjAgdHJlYXRcbiAgICogYGFyZ3VtZW50c2Agb2JqZWN0IGluZGV4ZXMgYXMgbm9uLWVudW1lcmFibGUgYW5kIGZhaWwgYGhhc093blByb3BlcnR5YFxuICAgKiBjaGVja3MgZm9yIGluZGV4ZXMgdGhhdCBleGNlZWQgdGhlaXIgZnVuY3Rpb24ncyBmb3JtYWwgcGFyYW1ldGVycyB3aXRoXG4gICAqIGFzc29jaWF0ZWQgdmFsdWVzIG9mIGAwYC5cbiAgICpcbiAgICogQG1lbWJlck9mIF8uc3VwcG9ydFxuICAgKiBAdHlwZSBib29sZWFuXG4gICAqL1xuICB0cnkge1xuICAgIHN1cHBvcnQubm9uRW51bUFyZ3MgPSAhcHJvcGVydHlJc0VudW1lcmFibGUuY2FsbChhcmd1bWVudHMsIDEpO1xuICB9IGNhdGNoKGUpIHtcbiAgICBzdXBwb3J0Lm5vbkVudW1BcmdzID0gdHJ1ZTtcbiAgfVxufSgwLCAwKSk7XG5cbm1vZHVsZS5leHBvcnRzID0gc3VwcG9ydDtcbiIsIi8qKlxuICogQ3JlYXRlcyBhIGZ1bmN0aW9uIHRoYXQgcmV0dXJucyBgdmFsdWVgLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAY2F0ZWdvcnkgVXRpbGl0eVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gcmV0dXJuIGZyb20gdGhlIG5ldyBmdW5jdGlvbi5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IGZ1bmN0aW9uLlxuICogQGV4YW1wbGVcbiAqXG4gKiB2YXIgb2JqZWN0ID0geyAndXNlcic6ICdmcmVkJyB9O1xuICogdmFyIGdldHRlciA9IF8uY29uc3RhbnQob2JqZWN0KTtcbiAqXG4gKiBnZXR0ZXIoKSA9PT0gb2JqZWN0O1xuICogLy8gPT4gdHJ1ZVxuICovXG5mdW5jdGlvbiBjb25zdGFudCh2YWx1ZSkge1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGNvbnN0YW50O1xuIiwiLyoqXG4gKiBUaGlzIG1ldGhvZCByZXR1cm5zIHRoZSBmaXJzdCBhcmd1bWVudCBwcm92aWRlZCB0byBpdC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IFV0aWxpdHlcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgQW55IHZhbHVlLlxuICogQHJldHVybnMgeyp9IFJldHVybnMgYHZhbHVlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogdmFyIG9iamVjdCA9IHsgJ3VzZXInOiAnZnJlZCcgfTtcbiAqXG4gKiBfLmlkZW50aXR5KG9iamVjdCkgPT09IG9iamVjdDtcbiAqIC8vID0+IHRydWVcbiAqL1xuZnVuY3Rpb24gaWRlbnRpdHkodmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlkZW50aXR5O1xuIiwiKGZ1bmN0aW9uKCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuICAgIGZ1bmN0aW9uICQkcm91dGUkcmVjb2duaXplciRkc2wkJFRhcmdldChwYXRoLCBtYXRjaGVyLCBkZWxlZ2F0ZSkge1xuICAgICAgdGhpcy5wYXRoID0gcGF0aDtcbiAgICAgIHRoaXMubWF0Y2hlciA9IG1hdGNoZXI7XG4gICAgICB0aGlzLmRlbGVnYXRlID0gZGVsZWdhdGU7XG4gICAgfVxuXG4gICAgJCRyb3V0ZSRyZWNvZ25pemVyJGRzbCQkVGFyZ2V0LnByb3RvdHlwZSA9IHtcbiAgICAgIHRvOiBmdW5jdGlvbih0YXJnZXQsIGNhbGxiYWNrKSB7XG4gICAgICAgIHZhciBkZWxlZ2F0ZSA9IHRoaXMuZGVsZWdhdGU7XG5cbiAgICAgICAgaWYgKGRlbGVnYXRlICYmIGRlbGVnYXRlLndpbGxBZGRSb3V0ZSkge1xuICAgICAgICAgIHRhcmdldCA9IGRlbGVnYXRlLndpbGxBZGRSb3V0ZSh0aGlzLm1hdGNoZXIudGFyZ2V0LCB0YXJnZXQpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5tYXRjaGVyLmFkZCh0aGlzLnBhdGgsIHRhcmdldCk7XG5cbiAgICAgICAgaWYgKGNhbGxiYWNrKSB7XG4gICAgICAgICAgaWYgKGNhbGxiYWNrLmxlbmd0aCA9PT0gMCkgeyB0aHJvdyBuZXcgRXJyb3IoXCJZb3UgbXVzdCBoYXZlIGFuIGFyZ3VtZW50IGluIHRoZSBmdW5jdGlvbiBwYXNzZWQgdG8gYHRvYFwiKTsgfVxuICAgICAgICAgIHRoaXMubWF0Y2hlci5hZGRDaGlsZCh0aGlzLnBhdGgsIHRhcmdldCwgY2FsbGJhY2ssIHRoaXMuZGVsZWdhdGUpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBmdW5jdGlvbiAkJHJvdXRlJHJlY29nbml6ZXIkZHNsJCRNYXRjaGVyKHRhcmdldCkge1xuICAgICAgdGhpcy5yb3V0ZXMgPSB7fTtcbiAgICAgIHRoaXMuY2hpbGRyZW4gPSB7fTtcbiAgICAgIHRoaXMudGFyZ2V0ID0gdGFyZ2V0O1xuICAgIH1cblxuICAgICQkcm91dGUkcmVjb2duaXplciRkc2wkJE1hdGNoZXIucHJvdG90eXBlID0ge1xuICAgICAgYWRkOiBmdW5jdGlvbihwYXRoLCBoYW5kbGVyKSB7XG4gICAgICAgIHRoaXMucm91dGVzW3BhdGhdID0gaGFuZGxlcjtcbiAgICAgIH0sXG5cbiAgICAgIGFkZENoaWxkOiBmdW5jdGlvbihwYXRoLCB0YXJnZXQsIGNhbGxiYWNrLCBkZWxlZ2F0ZSkge1xuICAgICAgICB2YXIgbWF0Y2hlciA9IG5ldyAkJHJvdXRlJHJlY29nbml6ZXIkZHNsJCRNYXRjaGVyKHRhcmdldCk7XG4gICAgICAgIHRoaXMuY2hpbGRyZW5bcGF0aF0gPSBtYXRjaGVyO1xuXG4gICAgICAgIHZhciBtYXRjaCA9ICQkcm91dGUkcmVjb2duaXplciRkc2wkJGdlbmVyYXRlTWF0Y2gocGF0aCwgbWF0Y2hlciwgZGVsZWdhdGUpO1xuXG4gICAgICAgIGlmIChkZWxlZ2F0ZSAmJiBkZWxlZ2F0ZS5jb250ZXh0RW50ZXJlZCkge1xuICAgICAgICAgIGRlbGVnYXRlLmNvbnRleHRFbnRlcmVkKHRhcmdldCwgbWF0Y2gpO1xuICAgICAgICB9XG5cbiAgICAgICAgY2FsbGJhY2sobWF0Y2gpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBmdW5jdGlvbiAkJHJvdXRlJHJlY29nbml6ZXIkZHNsJCRnZW5lcmF0ZU1hdGNoKHN0YXJ0aW5nUGF0aCwgbWF0Y2hlciwgZGVsZWdhdGUpIHtcbiAgICAgIHJldHVybiBmdW5jdGlvbihwYXRoLCBuZXN0ZWRDYWxsYmFjaykge1xuICAgICAgICB2YXIgZnVsbFBhdGggPSBzdGFydGluZ1BhdGggKyBwYXRoO1xuXG4gICAgICAgIGlmIChuZXN0ZWRDYWxsYmFjaykge1xuICAgICAgICAgIG5lc3RlZENhbGxiYWNrKCQkcm91dGUkcmVjb2duaXplciRkc2wkJGdlbmVyYXRlTWF0Y2goZnVsbFBhdGgsIG1hdGNoZXIsIGRlbGVnYXRlKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIG5ldyAkJHJvdXRlJHJlY29nbml6ZXIkZHNsJCRUYXJnZXQoc3RhcnRpbmdQYXRoICsgcGF0aCwgbWF0Y2hlciwgZGVsZWdhdGUpO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uICQkcm91dGUkcmVjb2duaXplciRkc2wkJGFkZFJvdXRlKHJvdXRlQXJyYXksIHBhdGgsIGhhbmRsZXIpIHtcbiAgICAgIHZhciBsZW4gPSAwO1xuICAgICAgZm9yICh2YXIgaT0wLCBsPXJvdXRlQXJyYXkubGVuZ3RoOyBpPGw7IGkrKykge1xuICAgICAgICBsZW4gKz0gcm91dGVBcnJheVtpXS5wYXRoLmxlbmd0aDtcbiAgICAgIH1cblxuICAgICAgcGF0aCA9IHBhdGguc3Vic3RyKGxlbik7XG4gICAgICB2YXIgcm91dGUgPSB7IHBhdGg6IHBhdGgsIGhhbmRsZXI6IGhhbmRsZXIgfTtcbiAgICAgIHJvdXRlQXJyYXkucHVzaChyb3V0ZSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gJCRyb3V0ZSRyZWNvZ25pemVyJGRzbCQkZWFjaFJvdXRlKGJhc2VSb3V0ZSwgbWF0Y2hlciwgY2FsbGJhY2ssIGJpbmRpbmcpIHtcbiAgICAgIHZhciByb3V0ZXMgPSBtYXRjaGVyLnJvdXRlcztcblxuICAgICAgZm9yICh2YXIgcGF0aCBpbiByb3V0ZXMpIHtcbiAgICAgICAgaWYgKHJvdXRlcy5oYXNPd25Qcm9wZXJ0eShwYXRoKSkge1xuICAgICAgICAgIHZhciByb3V0ZUFycmF5ID0gYmFzZVJvdXRlLnNsaWNlKCk7XG4gICAgICAgICAgJCRyb3V0ZSRyZWNvZ25pemVyJGRzbCQkYWRkUm91dGUocm91dGVBcnJheSwgcGF0aCwgcm91dGVzW3BhdGhdKTtcblxuICAgICAgICAgIGlmIChtYXRjaGVyLmNoaWxkcmVuW3BhdGhdKSB7XG4gICAgICAgICAgICAkJHJvdXRlJHJlY29nbml6ZXIkZHNsJCRlYWNoUm91dGUocm91dGVBcnJheSwgbWF0Y2hlci5jaGlsZHJlbltwYXRoXSwgY2FsbGJhY2ssIGJpbmRpbmcpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjYWxsYmFjay5jYWxsKGJpbmRpbmcsIHJvdXRlQXJyYXkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHZhciAkJHJvdXRlJHJlY29nbml6ZXIkZHNsJCRkZWZhdWx0ID0gZnVuY3Rpb24oY2FsbGJhY2ssIGFkZFJvdXRlQ2FsbGJhY2spIHtcbiAgICAgIHZhciBtYXRjaGVyID0gbmV3ICQkcm91dGUkcmVjb2duaXplciRkc2wkJE1hdGNoZXIoKTtcblxuICAgICAgY2FsbGJhY2soJCRyb3V0ZSRyZWNvZ25pemVyJGRzbCQkZ2VuZXJhdGVNYXRjaChcIlwiLCBtYXRjaGVyLCB0aGlzLmRlbGVnYXRlKSk7XG5cbiAgICAgICQkcm91dGUkcmVjb2duaXplciRkc2wkJGVhY2hSb3V0ZShbXSwgbWF0Y2hlciwgZnVuY3Rpb24ocm91dGUpIHtcbiAgICAgICAgaWYgKGFkZFJvdXRlQ2FsbGJhY2spIHsgYWRkUm91dGVDYWxsYmFjayh0aGlzLCByb3V0ZSk7IH1cbiAgICAgICAgZWxzZSB7IHRoaXMuYWRkKHJvdXRlKTsgfVxuICAgICAgfSwgdGhpcyk7XG4gICAgfTtcblxuICAgIHZhciAkJHJvdXRlJHJlY29nbml6ZXIkJHNwZWNpYWxzID0gW1xuICAgICAgJy8nLCAnLicsICcqJywgJysnLCAnPycsICd8JyxcbiAgICAgICcoJywgJyknLCAnWycsICddJywgJ3snLCAnfScsICdcXFxcJ1xuICAgIF07XG5cbiAgICB2YXIgJCRyb3V0ZSRyZWNvZ25pemVyJCRlc2NhcGVSZWdleCA9IG5ldyBSZWdFeHAoJyhcXFxcJyArICQkcm91dGUkcmVjb2duaXplciQkc3BlY2lhbHMuam9pbignfFxcXFwnKSArICcpJywgJ2cnKTtcblxuICAgIGZ1bmN0aW9uICQkcm91dGUkcmVjb2duaXplciQkaXNBcnJheSh0ZXN0KSB7XG4gICAgICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHRlc3QpID09PSBcIltvYmplY3QgQXJyYXldXCI7XG4gICAgfVxuXG4gICAgLy8gQSBTZWdtZW50IHJlcHJlc2VudHMgYSBzZWdtZW50IGluIHRoZSBvcmlnaW5hbCByb3V0ZSBkZXNjcmlwdGlvbi5cbiAgICAvLyBFYWNoIFNlZ21lbnQgdHlwZSBwcm92aWRlcyBhbiBgZWFjaENoYXJgIGFuZCBgcmVnZXhgIG1ldGhvZC5cbiAgICAvL1xuICAgIC8vIFRoZSBgZWFjaENoYXJgIG1ldGhvZCBpbnZva2VzIHRoZSBjYWxsYmFjayB3aXRoIG9uZSBvciBtb3JlIGNoYXJhY3RlclxuICAgIC8vIHNwZWNpZmljYXRpb25zLiBBIGNoYXJhY3RlciBzcGVjaWZpY2F0aW9uIGNvbnN1bWVzIG9uZSBvciBtb3JlIGlucHV0XG4gICAgLy8gY2hhcmFjdGVycy5cbiAgICAvL1xuICAgIC8vIFRoZSBgcmVnZXhgIG1ldGhvZCByZXR1cm5zIGEgcmVnZXggZnJhZ21lbnQgZm9yIHRoZSBzZWdtZW50LiBJZiB0aGVcbiAgICAvLyBzZWdtZW50IGlzIGEgZHluYW1pYyBvZiBzdGFyIHNlZ21lbnQsIHRoZSByZWdleCBmcmFnbWVudCBhbHNvIGluY2x1ZGVzXG4gICAgLy8gYSBjYXB0dXJlLlxuICAgIC8vXG4gICAgLy8gQSBjaGFyYWN0ZXIgc3BlY2lmaWNhdGlvbiBjb250YWluczpcbiAgICAvL1xuICAgIC8vICogYHZhbGlkQ2hhcnNgOiBhIFN0cmluZyB3aXRoIGEgbGlzdCBvZiBhbGwgdmFsaWQgY2hhcmFjdGVycywgb3JcbiAgICAvLyAqIGBpbnZhbGlkQ2hhcnNgOiBhIFN0cmluZyB3aXRoIGEgbGlzdCBvZiBhbGwgaW52YWxpZCBjaGFyYWN0ZXJzXG4gICAgLy8gKiBgcmVwZWF0YDogdHJ1ZSBpZiB0aGUgY2hhcmFjdGVyIHNwZWNpZmljYXRpb24gY2FuIHJlcGVhdFxuXG4gICAgZnVuY3Rpb24gJCRyb3V0ZSRyZWNvZ25pemVyJCRTdGF0aWNTZWdtZW50KHN0cmluZykgeyB0aGlzLnN0cmluZyA9IHN0cmluZzsgfVxuICAgICQkcm91dGUkcmVjb2duaXplciQkU3RhdGljU2VnbWVudC5wcm90b3R5cGUgPSB7XG4gICAgICBlYWNoQ2hhcjogZnVuY3Rpb24oY2FsbGJhY2spIHtcbiAgICAgICAgdmFyIHN0cmluZyA9IHRoaXMuc3RyaW5nLCBjaDtcblxuICAgICAgICBmb3IgKHZhciBpPTAsIGw9c3RyaW5nLmxlbmd0aDsgaTxsOyBpKyspIHtcbiAgICAgICAgICBjaCA9IHN0cmluZy5jaGFyQXQoaSk7XG4gICAgICAgICAgY2FsbGJhY2soeyB2YWxpZENoYXJzOiBjaCB9KTtcbiAgICAgICAgfVxuICAgICAgfSxcblxuICAgICAgcmVnZXg6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zdHJpbmcucmVwbGFjZSgkJHJvdXRlJHJlY29nbml6ZXIkJGVzY2FwZVJlZ2V4LCAnXFxcXCQxJyk7XG4gICAgICB9LFxuXG4gICAgICBnZW5lcmF0ZTogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnN0cmluZztcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gJCRyb3V0ZSRyZWNvZ25pemVyJCREeW5hbWljU2VnbWVudChuYW1lKSB7IHRoaXMubmFtZSA9IG5hbWU7IH1cbiAgICAkJHJvdXRlJHJlY29nbml6ZXIkJER5bmFtaWNTZWdtZW50LnByb3RvdHlwZSA9IHtcbiAgICAgIGVhY2hDaGFyOiBmdW5jdGlvbihjYWxsYmFjaykge1xuICAgICAgICBjYWxsYmFjayh7IGludmFsaWRDaGFyczogXCIvXCIsIHJlcGVhdDogdHJ1ZSB9KTtcbiAgICAgIH0sXG5cbiAgICAgIHJlZ2V4OiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIFwiKFteL10rKVwiO1xuICAgICAgfSxcblxuICAgICAgZ2VuZXJhdGU6IGZ1bmN0aW9uKHBhcmFtcykge1xuICAgICAgICByZXR1cm4gcGFyYW1zW3RoaXMubmFtZV07XG4gICAgICB9XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uICQkcm91dGUkcmVjb2duaXplciQkU3RhclNlZ21lbnQobmFtZSkgeyB0aGlzLm5hbWUgPSBuYW1lOyB9XG4gICAgJCRyb3V0ZSRyZWNvZ25pemVyJCRTdGFyU2VnbWVudC5wcm90b3R5cGUgPSB7XG4gICAgICBlYWNoQ2hhcjogZnVuY3Rpb24oY2FsbGJhY2spIHtcbiAgICAgICAgY2FsbGJhY2soeyBpbnZhbGlkQ2hhcnM6IFwiXCIsIHJlcGVhdDogdHJ1ZSB9KTtcbiAgICAgIH0sXG5cbiAgICAgIHJlZ2V4OiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIFwiKC4rKVwiO1xuICAgICAgfSxcblxuICAgICAgZ2VuZXJhdGU6IGZ1bmN0aW9uKHBhcmFtcykge1xuICAgICAgICByZXR1cm4gcGFyYW1zW3RoaXMubmFtZV07XG4gICAgICB9XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uICQkcm91dGUkcmVjb2duaXplciQkRXBzaWxvblNlZ21lbnQoKSB7fVxuICAgICQkcm91dGUkcmVjb2duaXplciQkRXBzaWxvblNlZ21lbnQucHJvdG90eXBlID0ge1xuICAgICAgZWFjaENoYXI6IGZ1bmN0aW9uKCkge30sXG4gICAgICByZWdleDogZnVuY3Rpb24oKSB7IHJldHVybiBcIlwiOyB9LFxuICAgICAgZ2VuZXJhdGU6IGZ1bmN0aW9uKCkgeyByZXR1cm4gXCJcIjsgfVxuICAgIH07XG5cbiAgICBmdW5jdGlvbiAkJHJvdXRlJHJlY29nbml6ZXIkJHBhcnNlKHJvdXRlLCBuYW1lcywgdHlwZXMpIHtcbiAgICAgIC8vIG5vcm1hbGl6ZSByb3V0ZSBhcyBub3Qgc3RhcnRpbmcgd2l0aCBhIFwiL1wiLiBSZWNvZ25pdGlvbiB3aWxsXG4gICAgICAvLyBhbHNvIG5vcm1hbGl6ZS5cbiAgICAgIGlmIChyb3V0ZS5jaGFyQXQoMCkgPT09IFwiL1wiKSB7IHJvdXRlID0gcm91dGUuc3Vic3RyKDEpOyB9XG5cbiAgICAgIHZhciBzZWdtZW50cyA9IHJvdXRlLnNwbGl0KFwiL1wiKSwgcmVzdWx0cyA9IFtdO1xuXG4gICAgICBmb3IgKHZhciBpPTAsIGw9c2VnbWVudHMubGVuZ3RoOyBpPGw7IGkrKykge1xuICAgICAgICB2YXIgc2VnbWVudCA9IHNlZ21lbnRzW2ldLCBtYXRjaDtcblxuICAgICAgICBpZiAobWF0Y2ggPSBzZWdtZW50Lm1hdGNoKC9eOihbXlxcL10rKSQvKSkge1xuICAgICAgICAgIHJlc3VsdHMucHVzaChuZXcgJCRyb3V0ZSRyZWNvZ25pemVyJCREeW5hbWljU2VnbWVudChtYXRjaFsxXSkpO1xuICAgICAgICAgIG5hbWVzLnB1c2gobWF0Y2hbMV0pO1xuICAgICAgICAgIHR5cGVzLmR5bmFtaWNzKys7XG4gICAgICAgIH0gZWxzZSBpZiAobWF0Y2ggPSBzZWdtZW50Lm1hdGNoKC9eXFwqKFteXFwvXSspJC8pKSB7XG4gICAgICAgICAgcmVzdWx0cy5wdXNoKG5ldyAkJHJvdXRlJHJlY29nbml6ZXIkJFN0YXJTZWdtZW50KG1hdGNoWzFdKSk7XG4gICAgICAgICAgbmFtZXMucHVzaChtYXRjaFsxXSk7XG4gICAgICAgICAgdHlwZXMuc3RhcnMrKztcbiAgICAgICAgfSBlbHNlIGlmKHNlZ21lbnQgPT09IFwiXCIpIHtcbiAgICAgICAgICByZXN1bHRzLnB1c2gobmV3ICQkcm91dGUkcmVjb2duaXplciQkRXBzaWxvblNlZ21lbnQoKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmVzdWx0cy5wdXNoKG5ldyAkJHJvdXRlJHJlY29nbml6ZXIkJFN0YXRpY1NlZ21lbnQoc2VnbWVudCkpO1xuICAgICAgICAgIHR5cGVzLnN0YXRpY3MrKztcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gcmVzdWx0cztcbiAgICB9XG5cbiAgICAvLyBBIFN0YXRlIGhhcyBhIGNoYXJhY3RlciBzcGVjaWZpY2F0aW9uIGFuZCAoYGNoYXJTcGVjYCkgYW5kIGEgbGlzdCBvZiBwb3NzaWJsZVxuICAgIC8vIHN1YnNlcXVlbnQgc3RhdGVzIChgbmV4dFN0YXRlc2ApLlxuICAgIC8vXG4gICAgLy8gSWYgYSBTdGF0ZSBpcyBhbiBhY2NlcHRpbmcgc3RhdGUsIGl0IHdpbGwgYWxzbyBoYXZlIHNldmVyYWwgYWRkaXRpb25hbFxuICAgIC8vIHByb3BlcnRpZXM6XG4gICAgLy9cbiAgICAvLyAqIGByZWdleGA6IEEgcmVndWxhciBleHByZXNzaW9uIHRoYXQgaXMgdXNlZCB0byBleHRyYWN0IHBhcmFtZXRlcnMgZnJvbSBwYXRoc1xuICAgIC8vICAgdGhhdCByZWFjaGVkIHRoaXMgYWNjZXB0aW5nIHN0YXRlLlxuICAgIC8vICogYGhhbmRsZXJzYDogSW5mb3JtYXRpb24gb24gaG93IHRvIGNvbnZlcnQgdGhlIGxpc3Qgb2YgY2FwdHVyZXMgaW50byBjYWxsc1xuICAgIC8vICAgdG8gcmVnaXN0ZXJlZCBoYW5kbGVycyB3aXRoIHRoZSBzcGVjaWZpZWQgcGFyYW1ldGVyc1xuICAgIC8vICogYHR5cGVzYDogSG93IG1hbnkgc3RhdGljLCBkeW5hbWljIG9yIHN0YXIgc2VnbWVudHMgaW4gdGhpcyByb3V0ZS4gVXNlZCB0b1xuICAgIC8vICAgZGVjaWRlIHdoaWNoIHJvdXRlIHRvIHVzZSBpZiBtdWx0aXBsZSByZWdpc3RlcmVkIHJvdXRlcyBtYXRjaCBhIHBhdGguXG4gICAgLy9cbiAgICAvLyBDdXJyZW50bHksIFN0YXRlIGlzIGltcGxlbWVudGVkIG5haXZlbHkgYnkgbG9vcGluZyBvdmVyIGBuZXh0U3RhdGVzYCBhbmRcbiAgICAvLyBjb21wYXJpbmcgYSBjaGFyYWN0ZXIgc3BlY2lmaWNhdGlvbiBhZ2FpbnN0IGEgY2hhcmFjdGVyLiBBIG1vcmUgZWZmaWNpZW50XG4gICAgLy8gaW1wbGVtZW50YXRpb24gd291bGQgdXNlIGEgaGFzaCBvZiBrZXlzIHBvaW50aW5nIGF0IG9uZSBvciBtb3JlIG5leHQgc3RhdGVzLlxuXG4gICAgZnVuY3Rpb24gJCRyb3V0ZSRyZWNvZ25pemVyJCRTdGF0ZShjaGFyU3BlYykge1xuICAgICAgdGhpcy5jaGFyU3BlYyA9IGNoYXJTcGVjO1xuICAgICAgdGhpcy5uZXh0U3RhdGVzID0gW107XG4gICAgfVxuXG4gICAgJCRyb3V0ZSRyZWNvZ25pemVyJCRTdGF0ZS5wcm90b3R5cGUgPSB7XG4gICAgICBnZXQ6IGZ1bmN0aW9uKGNoYXJTcGVjKSB7XG4gICAgICAgIHZhciBuZXh0U3RhdGVzID0gdGhpcy5uZXh0U3RhdGVzO1xuXG4gICAgICAgIGZvciAodmFyIGk9MCwgbD1uZXh0U3RhdGVzLmxlbmd0aDsgaTxsOyBpKyspIHtcbiAgICAgICAgICB2YXIgY2hpbGQgPSBuZXh0U3RhdGVzW2ldO1xuXG4gICAgICAgICAgdmFyIGlzRXF1YWwgPSBjaGlsZC5jaGFyU3BlYy52YWxpZENoYXJzID09PSBjaGFyU3BlYy52YWxpZENoYXJzO1xuICAgICAgICAgIGlzRXF1YWwgPSBpc0VxdWFsICYmIGNoaWxkLmNoYXJTcGVjLmludmFsaWRDaGFycyA9PT0gY2hhclNwZWMuaW52YWxpZENoYXJzO1xuXG4gICAgICAgICAgaWYgKGlzRXF1YWwpIHsgcmV0dXJuIGNoaWxkOyB9XG4gICAgICAgIH1cbiAgICAgIH0sXG5cbiAgICAgIHB1dDogZnVuY3Rpb24oY2hhclNwZWMpIHtcbiAgICAgICAgdmFyIHN0YXRlO1xuXG4gICAgICAgIC8vIElmIHRoZSBjaGFyYWN0ZXIgc3BlY2lmaWNhdGlvbiBhbHJlYWR5IGV4aXN0cyBpbiBhIGNoaWxkIG9mIHRoZSBjdXJyZW50XG4gICAgICAgIC8vIHN0YXRlLCBqdXN0IHJldHVybiB0aGF0IHN0YXRlLlxuICAgICAgICBpZiAoc3RhdGUgPSB0aGlzLmdldChjaGFyU3BlYykpIHsgcmV0dXJuIHN0YXRlOyB9XG5cbiAgICAgICAgLy8gTWFrZSBhIG5ldyBzdGF0ZSBmb3IgdGhlIGNoYXJhY3RlciBzcGVjXG4gICAgICAgIHN0YXRlID0gbmV3ICQkcm91dGUkcmVjb2duaXplciQkU3RhdGUoY2hhclNwZWMpO1xuXG4gICAgICAgIC8vIEluc2VydCB0aGUgbmV3IHN0YXRlIGFzIGEgY2hpbGQgb2YgdGhlIGN1cnJlbnQgc3RhdGVcbiAgICAgICAgdGhpcy5uZXh0U3RhdGVzLnB1c2goc3RhdGUpO1xuXG4gICAgICAgIC8vIElmIHRoaXMgY2hhcmFjdGVyIHNwZWNpZmljYXRpb24gcmVwZWF0cywgaW5zZXJ0IHRoZSBuZXcgc3RhdGUgYXMgYSBjaGlsZFxuICAgICAgICAvLyBvZiBpdHNlbGYuIE5vdGUgdGhhdCB0aGlzIHdpbGwgbm90IHRyaWdnZXIgYW4gaW5maW5pdGUgbG9vcCBiZWNhdXNlIGVhY2hcbiAgICAgICAgLy8gdHJhbnNpdGlvbiBkdXJpbmcgcmVjb2duaXRpb24gY29uc3VtZXMgYSBjaGFyYWN0ZXIuXG4gICAgICAgIGlmIChjaGFyU3BlYy5yZXBlYXQpIHtcbiAgICAgICAgICBzdGF0ZS5uZXh0U3RhdGVzLnB1c2goc3RhdGUpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gUmV0dXJuIHRoZSBuZXcgc3RhdGVcbiAgICAgICAgcmV0dXJuIHN0YXRlO1xuICAgICAgfSxcblxuICAgICAgLy8gRmluZCBhIGxpc3Qgb2YgY2hpbGQgc3RhdGVzIG1hdGNoaW5nIHRoZSBuZXh0IGNoYXJhY3RlclxuICAgICAgbWF0Y2g6IGZ1bmN0aW9uKGNoKSB7XG4gICAgICAgIC8vIERFQlVHIFwiUHJvY2Vzc2luZyBgXCIgKyBjaCArIFwiYDpcIlxuICAgICAgICB2YXIgbmV4dFN0YXRlcyA9IHRoaXMubmV4dFN0YXRlcyxcbiAgICAgICAgICAgIGNoaWxkLCBjaGFyU3BlYywgY2hhcnM7XG5cbiAgICAgICAgLy8gREVCVUcgXCIgIFwiICsgZGVidWdTdGF0ZSh0aGlzKVxuICAgICAgICB2YXIgcmV0dXJuZWQgPSBbXTtcblxuICAgICAgICBmb3IgKHZhciBpPTAsIGw9bmV4dFN0YXRlcy5sZW5ndGg7IGk8bDsgaSsrKSB7XG4gICAgICAgICAgY2hpbGQgPSBuZXh0U3RhdGVzW2ldO1xuXG4gICAgICAgICAgY2hhclNwZWMgPSBjaGlsZC5jaGFyU3BlYztcblxuICAgICAgICAgIGlmICh0eXBlb2YgKGNoYXJzID0gY2hhclNwZWMudmFsaWRDaGFycykgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICBpZiAoY2hhcnMuaW5kZXhPZihjaCkgIT09IC0xKSB7IHJldHVybmVkLnB1c2goY2hpbGQpOyB9XG4gICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgKGNoYXJzID0gY2hhclNwZWMuaW52YWxpZENoYXJzKSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIGlmIChjaGFycy5pbmRleE9mKGNoKSA9PT0gLTEpIHsgcmV0dXJuZWQucHVzaChjaGlsZCk7IH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcmV0dXJuZWQ7XG4gICAgICB9XG5cbiAgICAgIC8qKiBJRiBERUJVR1xuICAgICAgLCBkZWJ1ZzogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBjaGFyU3BlYyA9IHRoaXMuY2hhclNwZWMsXG4gICAgICAgICAgICBkZWJ1ZyA9IFwiW1wiLFxuICAgICAgICAgICAgY2hhcnMgPSBjaGFyU3BlYy52YWxpZENoYXJzIHx8IGNoYXJTcGVjLmludmFsaWRDaGFycztcblxuICAgICAgICBpZiAoY2hhclNwZWMuaW52YWxpZENoYXJzKSB7IGRlYnVnICs9IFwiXlwiOyB9XG4gICAgICAgIGRlYnVnICs9IGNoYXJzO1xuICAgICAgICBkZWJ1ZyArPSBcIl1cIjtcblxuICAgICAgICBpZiAoY2hhclNwZWMucmVwZWF0KSB7IGRlYnVnICs9IFwiK1wiOyB9XG5cbiAgICAgICAgcmV0dXJuIGRlYnVnO1xuICAgICAgfVxuICAgICAgRU5EIElGICoqL1xuICAgIH07XG5cbiAgICAvKiogSUYgREVCVUdcbiAgICBmdW5jdGlvbiBkZWJ1Zyhsb2cpIHtcbiAgICAgIGNvbnNvbGUubG9nKGxvZyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZGVidWdTdGF0ZShzdGF0ZSkge1xuICAgICAgcmV0dXJuIHN0YXRlLm5leHRTdGF0ZXMubWFwKGZ1bmN0aW9uKG4pIHtcbiAgICAgICAgaWYgKG4ubmV4dFN0YXRlcy5sZW5ndGggPT09IDApIHsgcmV0dXJuIFwiKCBcIiArIG4uZGVidWcoKSArIFwiIFthY2NlcHRpbmddIClcIjsgfVxuICAgICAgICByZXR1cm4gXCIoIFwiICsgbi5kZWJ1ZygpICsgXCIgPHRoZW4+IFwiICsgbi5uZXh0U3RhdGVzLm1hcChmdW5jdGlvbihzKSB7IHJldHVybiBzLmRlYnVnKCkgfSkuam9pbihcIiBvciBcIikgKyBcIiApXCI7XG4gICAgICB9KS5qb2luKFwiLCBcIilcbiAgICB9XG4gICAgRU5EIElGICoqL1xuXG4gICAgLy8gVGhpcyBpcyBhIHNvbWV3aGF0IG5haXZlIHN0cmF0ZWd5LCBidXQgc2hvdWxkIHdvcmsgaW4gYSBsb3Qgb2YgY2FzZXNcbiAgICAvLyBBIGJldHRlciBzdHJhdGVneSB3b3VsZCBwcm9wZXJseSByZXNvbHZlIC9wb3N0cy86aWQvbmV3IGFuZCAvcG9zdHMvZWRpdC86aWQuXG4gICAgLy9cbiAgICAvLyBUaGlzIHN0cmF0ZWd5IGdlbmVyYWxseSBwcmVmZXJzIG1vcmUgc3RhdGljIGFuZCBsZXNzIGR5bmFtaWMgbWF0Y2hpbmcuXG4gICAgLy8gU3BlY2lmaWNhbGx5LCBpdFxuICAgIC8vXG4gICAgLy8gICogcHJlZmVycyBmZXdlciBzdGFycyB0byBtb3JlLCB0aGVuXG4gICAgLy8gICogcHJlZmVycyB1c2luZyBzdGFycyBmb3IgbGVzcyBvZiB0aGUgbWF0Y2ggdG8gbW9yZSwgdGhlblxuICAgIC8vICAqIHByZWZlcnMgZmV3ZXIgZHluYW1pYyBzZWdtZW50cyB0byBtb3JlLCB0aGVuXG4gICAgLy8gICogcHJlZmVycyBtb3JlIHN0YXRpYyBzZWdtZW50cyB0byBtb3JlXG4gICAgZnVuY3Rpb24gJCRyb3V0ZSRyZWNvZ25pemVyJCRzb3J0U29sdXRpb25zKHN0YXRlcykge1xuICAgICAgcmV0dXJuIHN0YXRlcy5zb3J0KGZ1bmN0aW9uKGEsIGIpIHtcbiAgICAgICAgaWYgKGEudHlwZXMuc3RhcnMgIT09IGIudHlwZXMuc3RhcnMpIHsgcmV0dXJuIGEudHlwZXMuc3RhcnMgLSBiLnR5cGVzLnN0YXJzOyB9XG5cbiAgICAgICAgaWYgKGEudHlwZXMuc3RhcnMpIHtcbiAgICAgICAgICBpZiAoYS50eXBlcy5zdGF0aWNzICE9PSBiLnR5cGVzLnN0YXRpY3MpIHsgcmV0dXJuIGIudHlwZXMuc3RhdGljcyAtIGEudHlwZXMuc3RhdGljczsgfVxuICAgICAgICAgIGlmIChhLnR5cGVzLmR5bmFtaWNzICE9PSBiLnR5cGVzLmR5bmFtaWNzKSB7IHJldHVybiBiLnR5cGVzLmR5bmFtaWNzIC0gYS50eXBlcy5keW5hbWljczsgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGEudHlwZXMuZHluYW1pY3MgIT09IGIudHlwZXMuZHluYW1pY3MpIHsgcmV0dXJuIGEudHlwZXMuZHluYW1pY3MgLSBiLnR5cGVzLmR5bmFtaWNzOyB9XG4gICAgICAgIGlmIChhLnR5cGVzLnN0YXRpY3MgIT09IGIudHlwZXMuc3RhdGljcykgeyByZXR1cm4gYi50eXBlcy5zdGF0aWNzIC0gYS50eXBlcy5zdGF0aWNzOyB9XG5cbiAgICAgICAgcmV0dXJuIDA7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiAkJHJvdXRlJHJlY29nbml6ZXIkJHJlY29nbml6ZUNoYXIoc3RhdGVzLCBjaCkge1xuICAgICAgdmFyIG5leHRTdGF0ZXMgPSBbXTtcblxuICAgICAgZm9yICh2YXIgaT0wLCBsPXN0YXRlcy5sZW5ndGg7IGk8bDsgaSsrKSB7XG4gICAgICAgIHZhciBzdGF0ZSA9IHN0YXRlc1tpXTtcblxuICAgICAgICBuZXh0U3RhdGVzID0gbmV4dFN0YXRlcy5jb25jYXQoc3RhdGUubWF0Y2goY2gpKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIG5leHRTdGF0ZXM7XG4gICAgfVxuXG4gICAgdmFyICQkcm91dGUkcmVjb2duaXplciQkb0NyZWF0ZSA9IE9iamVjdC5jcmVhdGUgfHwgZnVuY3Rpb24ocHJvdG8pIHtcbiAgICAgIGZ1bmN0aW9uIEYoKSB7fVxuICAgICAgRi5wcm90b3R5cGUgPSBwcm90bztcbiAgICAgIHJldHVybiBuZXcgRigpO1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiAkJHJvdXRlJHJlY29nbml6ZXIkJFJlY29nbml6ZVJlc3VsdHMocXVlcnlQYXJhbXMpIHtcbiAgICAgIHRoaXMucXVlcnlQYXJhbXMgPSBxdWVyeVBhcmFtcyB8fCB7fTtcbiAgICB9XG4gICAgJCRyb3V0ZSRyZWNvZ25pemVyJCRSZWNvZ25pemVSZXN1bHRzLnByb3RvdHlwZSA9ICQkcm91dGUkcmVjb2duaXplciQkb0NyZWF0ZSh7XG4gICAgICBzcGxpY2U6IEFycmF5LnByb3RvdHlwZS5zcGxpY2UsXG4gICAgICBzbGljZTogIEFycmF5LnByb3RvdHlwZS5zbGljZSxcbiAgICAgIHB1c2g6ICAgQXJyYXkucHJvdG90eXBlLnB1c2gsXG4gICAgICBsZW5ndGg6IDAsXG4gICAgICBxdWVyeVBhcmFtczogbnVsbFxuICAgIH0pO1xuXG4gICAgZnVuY3Rpb24gJCRyb3V0ZSRyZWNvZ25pemVyJCRmaW5kSGFuZGxlcihzdGF0ZSwgcGF0aCwgcXVlcnlQYXJhbXMpIHtcbiAgICAgIHZhciBoYW5kbGVycyA9IHN0YXRlLmhhbmRsZXJzLCByZWdleCA9IHN0YXRlLnJlZ2V4O1xuICAgICAgdmFyIGNhcHR1cmVzID0gcGF0aC5tYXRjaChyZWdleCksIGN1cnJlbnRDYXB0dXJlID0gMTtcbiAgICAgIHZhciByZXN1bHQgPSBuZXcgJCRyb3V0ZSRyZWNvZ25pemVyJCRSZWNvZ25pemVSZXN1bHRzKHF1ZXJ5UGFyYW1zKTtcblxuICAgICAgZm9yICh2YXIgaT0wLCBsPWhhbmRsZXJzLmxlbmd0aDsgaTxsOyBpKyspIHtcbiAgICAgICAgdmFyIGhhbmRsZXIgPSBoYW5kbGVyc1tpXSwgbmFtZXMgPSBoYW5kbGVyLm5hbWVzLCBwYXJhbXMgPSB7fTtcblxuICAgICAgICBmb3IgKHZhciBqPTAsIG09bmFtZXMubGVuZ3RoOyBqPG07IGorKykge1xuICAgICAgICAgIHBhcmFtc1tuYW1lc1tqXV0gPSBjYXB0dXJlc1tjdXJyZW50Q2FwdHVyZSsrXTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJlc3VsdC5wdXNoKHsgaGFuZGxlcjogaGFuZGxlci5oYW5kbGVyLCBwYXJhbXM6IHBhcmFtcywgaXNEeW5hbWljOiAhIW5hbWVzLmxlbmd0aCB9KTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiAkJHJvdXRlJHJlY29nbml6ZXIkJGFkZFNlZ21lbnQoY3VycmVudFN0YXRlLCBzZWdtZW50KSB7XG4gICAgICBzZWdtZW50LmVhY2hDaGFyKGZ1bmN0aW9uKGNoKSB7XG4gICAgICAgIHZhciBzdGF0ZTtcblxuICAgICAgICBjdXJyZW50U3RhdGUgPSBjdXJyZW50U3RhdGUucHV0KGNoKTtcbiAgICAgIH0pO1xuXG4gICAgICByZXR1cm4gY3VycmVudFN0YXRlO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uICQkcm91dGUkcmVjb2duaXplciQkZGVjb2RlUXVlcnlQYXJhbVBhcnQocGFydCkge1xuICAgICAgLy8gaHR0cDovL3d3dy53My5vcmcvVFIvaHRtbDQwMS9pbnRlcmFjdC9mb3Jtcy5odG1sI2gtMTcuMTMuNC4xXG4gICAgICBwYXJ0ID0gcGFydC5yZXBsYWNlKC9cXCsvZ20sICclMjAnKTtcbiAgICAgIHJldHVybiBkZWNvZGVVUklDb21wb25lbnQocGFydCk7XG4gICAgfVxuXG4gICAgLy8gVGhlIG1haW4gaW50ZXJmYWNlXG5cbiAgICB2YXIgJCRyb3V0ZSRyZWNvZ25pemVyJCRSb3V0ZVJlY29nbml6ZXIgPSBmdW5jdGlvbigpIHtcbiAgICAgIHRoaXMucm9vdFN0YXRlID0gbmV3ICQkcm91dGUkcmVjb2duaXplciQkU3RhdGUoKTtcbiAgICAgIHRoaXMubmFtZXMgPSB7fTtcbiAgICB9O1xuXG5cbiAgICAkJHJvdXRlJHJlY29nbml6ZXIkJFJvdXRlUmVjb2duaXplci5wcm90b3R5cGUgPSB7XG4gICAgICBhZGQ6IGZ1bmN0aW9uKHJvdXRlcywgb3B0aW9ucykge1xuICAgICAgICB2YXIgY3VycmVudFN0YXRlID0gdGhpcy5yb290U3RhdGUsIHJlZ2V4ID0gXCJeXCIsXG4gICAgICAgICAgICB0eXBlcyA9IHsgc3RhdGljczogMCwgZHluYW1pY3M6IDAsIHN0YXJzOiAwIH0sXG4gICAgICAgICAgICBoYW5kbGVycyA9IFtdLCBhbGxTZWdtZW50cyA9IFtdLCBuYW1lO1xuXG4gICAgICAgIHZhciBpc0VtcHR5ID0gdHJ1ZTtcblxuICAgICAgICBmb3IgKHZhciBpPTAsIGw9cm91dGVzLmxlbmd0aDsgaTxsOyBpKyspIHtcbiAgICAgICAgICB2YXIgcm91dGUgPSByb3V0ZXNbaV0sIG5hbWVzID0gW107XG5cbiAgICAgICAgICB2YXIgc2VnbWVudHMgPSAkJHJvdXRlJHJlY29nbml6ZXIkJHBhcnNlKHJvdXRlLnBhdGgsIG5hbWVzLCB0eXBlcyk7XG5cbiAgICAgICAgICBhbGxTZWdtZW50cyA9IGFsbFNlZ21lbnRzLmNvbmNhdChzZWdtZW50cyk7XG5cbiAgICAgICAgICBmb3IgKHZhciBqPTAsIG09c2VnbWVudHMubGVuZ3RoOyBqPG07IGorKykge1xuICAgICAgICAgICAgdmFyIHNlZ21lbnQgPSBzZWdtZW50c1tqXTtcblxuICAgICAgICAgICAgaWYgKHNlZ21lbnQgaW5zdGFuY2VvZiAkJHJvdXRlJHJlY29nbml6ZXIkJEVwc2lsb25TZWdtZW50KSB7IGNvbnRpbnVlOyB9XG5cbiAgICAgICAgICAgIGlzRW1wdHkgPSBmYWxzZTtcblxuICAgICAgICAgICAgLy8gQWRkIGEgXCIvXCIgZm9yIHRoZSBuZXcgc2VnbWVudFxuICAgICAgICAgICAgY3VycmVudFN0YXRlID0gY3VycmVudFN0YXRlLnB1dCh7IHZhbGlkQ2hhcnM6IFwiL1wiIH0pO1xuICAgICAgICAgICAgcmVnZXggKz0gXCIvXCI7XG5cbiAgICAgICAgICAgIC8vIEFkZCBhIHJlcHJlc2VudGF0aW9uIG9mIHRoZSBzZWdtZW50IHRvIHRoZSBORkEgYW5kIHJlZ2V4XG4gICAgICAgICAgICBjdXJyZW50U3RhdGUgPSAkJHJvdXRlJHJlY29nbml6ZXIkJGFkZFNlZ21lbnQoY3VycmVudFN0YXRlLCBzZWdtZW50KTtcbiAgICAgICAgICAgIHJlZ2V4ICs9IHNlZ21lbnQucmVnZXgoKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB2YXIgaGFuZGxlciA9IHsgaGFuZGxlcjogcm91dGUuaGFuZGxlciwgbmFtZXM6IG5hbWVzIH07XG4gICAgICAgICAgaGFuZGxlcnMucHVzaChoYW5kbGVyKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpc0VtcHR5KSB7XG4gICAgICAgICAgY3VycmVudFN0YXRlID0gY3VycmVudFN0YXRlLnB1dCh7IHZhbGlkQ2hhcnM6IFwiL1wiIH0pO1xuICAgICAgICAgIHJlZ2V4ICs9IFwiL1wiO1xuICAgICAgICB9XG5cbiAgICAgICAgY3VycmVudFN0YXRlLmhhbmRsZXJzID0gaGFuZGxlcnM7XG4gICAgICAgIGN1cnJlbnRTdGF0ZS5yZWdleCA9IG5ldyBSZWdFeHAocmVnZXggKyBcIiRcIik7XG4gICAgICAgIGN1cnJlbnRTdGF0ZS50eXBlcyA9IHR5cGVzO1xuXG4gICAgICAgIGlmIChuYW1lID0gb3B0aW9ucyAmJiBvcHRpb25zLmFzKSB7XG4gICAgICAgICAgdGhpcy5uYW1lc1tuYW1lXSA9IHtcbiAgICAgICAgICAgIHNlZ21lbnRzOiBhbGxTZWdtZW50cyxcbiAgICAgICAgICAgIGhhbmRsZXJzOiBoYW5kbGVyc1xuICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgIH0sXG5cbiAgICAgIGhhbmRsZXJzRm9yOiBmdW5jdGlvbihuYW1lKSB7XG4gICAgICAgIHZhciByb3V0ZSA9IHRoaXMubmFtZXNbbmFtZV0sIHJlc3VsdCA9IFtdO1xuICAgICAgICBpZiAoIXJvdXRlKSB7IHRocm93IG5ldyBFcnJvcihcIlRoZXJlIGlzIG5vIHJvdXRlIG5hbWVkIFwiICsgbmFtZSk7IH1cblxuICAgICAgICBmb3IgKHZhciBpPTAsIGw9cm91dGUuaGFuZGxlcnMubGVuZ3RoOyBpPGw7IGkrKykge1xuICAgICAgICAgIHJlc3VsdC5wdXNoKHJvdXRlLmhhbmRsZXJzW2ldKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICB9LFxuXG4gICAgICBoYXNSb3V0ZTogZnVuY3Rpb24obmFtZSkge1xuICAgICAgICByZXR1cm4gISF0aGlzLm5hbWVzW25hbWVdO1xuICAgICAgfSxcblxuICAgICAgZ2VuZXJhdGU6IGZ1bmN0aW9uKG5hbWUsIHBhcmFtcykge1xuICAgICAgICB2YXIgcm91dGUgPSB0aGlzLm5hbWVzW25hbWVdLCBvdXRwdXQgPSBcIlwiO1xuICAgICAgICBpZiAoIXJvdXRlKSB7IHRocm93IG5ldyBFcnJvcihcIlRoZXJlIGlzIG5vIHJvdXRlIG5hbWVkIFwiICsgbmFtZSk7IH1cblxuICAgICAgICB2YXIgc2VnbWVudHMgPSByb3V0ZS5zZWdtZW50cztcblxuICAgICAgICBmb3IgKHZhciBpPTAsIGw9c2VnbWVudHMubGVuZ3RoOyBpPGw7IGkrKykge1xuICAgICAgICAgIHZhciBzZWdtZW50ID0gc2VnbWVudHNbaV07XG5cbiAgICAgICAgICBpZiAoc2VnbWVudCBpbnN0YW5jZW9mICQkcm91dGUkcmVjb2duaXplciQkRXBzaWxvblNlZ21lbnQpIHsgY29udGludWU7IH1cblxuICAgICAgICAgIG91dHB1dCArPSBcIi9cIjtcbiAgICAgICAgICBvdXRwdXQgKz0gc2VnbWVudC5nZW5lcmF0ZShwYXJhbXMpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG91dHB1dC5jaGFyQXQoMCkgIT09ICcvJykgeyBvdXRwdXQgPSAnLycgKyBvdXRwdXQ7IH1cblxuICAgICAgICBpZiAocGFyYW1zICYmIHBhcmFtcy5xdWVyeVBhcmFtcykge1xuICAgICAgICAgIG91dHB1dCArPSB0aGlzLmdlbmVyYXRlUXVlcnlTdHJpbmcocGFyYW1zLnF1ZXJ5UGFyYW1zLCByb3V0ZS5oYW5kbGVycyk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gb3V0cHV0O1xuICAgICAgfSxcblxuICAgICAgZ2VuZXJhdGVRdWVyeVN0cmluZzogZnVuY3Rpb24ocGFyYW1zLCBoYW5kbGVycykge1xuICAgICAgICB2YXIgcGFpcnMgPSBbXTtcbiAgICAgICAgdmFyIGtleXMgPSBbXTtcbiAgICAgICAgZm9yKHZhciBrZXkgaW4gcGFyYW1zKSB7XG4gICAgICAgICAgaWYgKHBhcmFtcy5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgICAgICBrZXlzLnB1c2goa2V5KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAga2V5cy5zb3J0KCk7XG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBsZW4gPSBrZXlzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAga2V5ID0ga2V5c1tpXTtcbiAgICAgICAgICB2YXIgdmFsdWUgPSBwYXJhbXNba2V5XTtcbiAgICAgICAgICBpZiAodmFsdWUgPT0gbnVsbCkge1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgfVxuICAgICAgICAgIHZhciBwYWlyID0gZW5jb2RlVVJJQ29tcG9uZW50KGtleSk7XG4gICAgICAgICAgaWYgKCQkcm91dGUkcmVjb2duaXplciQkaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAgICAgICAgIGZvciAodmFyIGogPSAwLCBsID0gdmFsdWUubGVuZ3RoOyBqIDwgbDsgaisrKSB7XG4gICAgICAgICAgICAgIHZhciBhcnJheVBhaXIgPSBrZXkgKyAnW10nICsgJz0nICsgZW5jb2RlVVJJQ29tcG9uZW50KHZhbHVlW2pdKTtcbiAgICAgICAgICAgICAgcGFpcnMucHVzaChhcnJheVBhaXIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBwYWlyICs9IFwiPVwiICsgZW5jb2RlVVJJQ29tcG9uZW50KHZhbHVlKTtcbiAgICAgICAgICAgIHBhaXJzLnB1c2gocGFpcik7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHBhaXJzLmxlbmd0aCA9PT0gMCkgeyByZXR1cm4gJyc7IH1cblxuICAgICAgICByZXR1cm4gXCI/XCIgKyBwYWlycy5qb2luKFwiJlwiKTtcbiAgICAgIH0sXG5cbiAgICAgIHBhcnNlUXVlcnlTdHJpbmc6IGZ1bmN0aW9uKHF1ZXJ5U3RyaW5nKSB7XG4gICAgICAgIHZhciBwYWlycyA9IHF1ZXJ5U3RyaW5nLnNwbGl0KFwiJlwiKSwgcXVlcnlQYXJhbXMgPSB7fTtcbiAgICAgICAgZm9yKHZhciBpPTA7IGkgPCBwYWlycy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIHZhciBwYWlyICAgICAgPSBwYWlyc1tpXS5zcGxpdCgnPScpLFxuICAgICAgICAgICAgICBrZXkgICAgICAgPSAkJHJvdXRlJHJlY29nbml6ZXIkJGRlY29kZVF1ZXJ5UGFyYW1QYXJ0KHBhaXJbMF0pLFxuICAgICAgICAgICAgICBrZXlMZW5ndGggPSBrZXkubGVuZ3RoLFxuICAgICAgICAgICAgICBpc0FycmF5ID0gZmFsc2UsXG4gICAgICAgICAgICAgIHZhbHVlO1xuICAgICAgICAgIGlmIChwYWlyLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgICAgdmFsdWUgPSAndHJ1ZSc7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vSGFuZGxlIGFycmF5c1xuICAgICAgICAgICAgaWYgKGtleUxlbmd0aCA+IDIgJiYga2V5LnNsaWNlKGtleUxlbmd0aCAtMikgPT09ICdbXScpIHtcbiAgICAgICAgICAgICAgaXNBcnJheSA9IHRydWU7XG4gICAgICAgICAgICAgIGtleSA9IGtleS5zbGljZSgwLCBrZXlMZW5ndGggLSAyKTtcbiAgICAgICAgICAgICAgaWYoIXF1ZXJ5UGFyYW1zW2tleV0pIHtcbiAgICAgICAgICAgICAgICBxdWVyeVBhcmFtc1trZXldID0gW107XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhbHVlID0gcGFpclsxXSA/ICQkcm91dGUkcmVjb2duaXplciQkZGVjb2RlUXVlcnlQYXJhbVBhcnQocGFpclsxXSkgOiAnJztcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKGlzQXJyYXkpIHtcbiAgICAgICAgICAgIHF1ZXJ5UGFyYW1zW2tleV0ucHVzaCh2YWx1ZSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHF1ZXJ5UGFyYW1zW2tleV0gPSB2YWx1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHF1ZXJ5UGFyYW1zO1xuICAgICAgfSxcblxuICAgICAgcmVjb2duaXplOiBmdW5jdGlvbihwYXRoKSB7XG4gICAgICAgIHZhciBzdGF0ZXMgPSBbIHRoaXMucm9vdFN0YXRlIF0sXG4gICAgICAgICAgICBwYXRoTGVuLCBpLCBsLCBxdWVyeVN0YXJ0LCBxdWVyeVBhcmFtcyA9IHt9LFxuICAgICAgICAgICAgaXNTbGFzaERyb3BwZWQgPSBmYWxzZTtcblxuICAgICAgICBxdWVyeVN0YXJ0ID0gcGF0aC5pbmRleE9mKCc/Jyk7XG4gICAgICAgIGlmIChxdWVyeVN0YXJ0ICE9PSAtMSkge1xuICAgICAgICAgIHZhciBxdWVyeVN0cmluZyA9IHBhdGguc3Vic3RyKHF1ZXJ5U3RhcnQgKyAxLCBwYXRoLmxlbmd0aCk7XG4gICAgICAgICAgcGF0aCA9IHBhdGguc3Vic3RyKDAsIHF1ZXJ5U3RhcnQpO1xuICAgICAgICAgIHF1ZXJ5UGFyYW1zID0gdGhpcy5wYXJzZVF1ZXJ5U3RyaW5nKHF1ZXJ5U3RyaW5nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHBhdGggPSBkZWNvZGVVUkkocGF0aCk7XG5cbiAgICAgICAgLy8gREVCVUcgR1JPVVAgcGF0aFxuXG4gICAgICAgIGlmIChwYXRoLmNoYXJBdCgwKSAhPT0gXCIvXCIpIHsgcGF0aCA9IFwiL1wiICsgcGF0aDsgfVxuXG4gICAgICAgIHBhdGhMZW4gPSBwYXRoLmxlbmd0aDtcbiAgICAgICAgaWYgKHBhdGhMZW4gPiAxICYmIHBhdGguY2hhckF0KHBhdGhMZW4gLSAxKSA9PT0gXCIvXCIpIHtcbiAgICAgICAgICBwYXRoID0gcGF0aC5zdWJzdHIoMCwgcGF0aExlbiAtIDEpO1xuICAgICAgICAgIGlzU2xhc2hEcm9wcGVkID0gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAoaT0wLCBsPXBhdGgubGVuZ3RoOyBpPGw7IGkrKykge1xuICAgICAgICAgIHN0YXRlcyA9ICQkcm91dGUkcmVjb2duaXplciQkcmVjb2duaXplQ2hhcihzdGF0ZXMsIHBhdGguY2hhckF0KGkpKTtcbiAgICAgICAgICBpZiAoIXN0YXRlcy5sZW5ndGgpIHsgYnJlYWs7IH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEVORCBERUJVRyBHUk9VUFxuXG4gICAgICAgIHZhciBzb2x1dGlvbnMgPSBbXTtcbiAgICAgICAgZm9yIChpPTAsIGw9c3RhdGVzLmxlbmd0aDsgaTxsOyBpKyspIHtcbiAgICAgICAgICBpZiAoc3RhdGVzW2ldLmhhbmRsZXJzKSB7IHNvbHV0aW9ucy5wdXNoKHN0YXRlc1tpXSk7IH1cbiAgICAgICAgfVxuXG4gICAgICAgIHN0YXRlcyA9ICQkcm91dGUkcmVjb2duaXplciQkc29ydFNvbHV0aW9ucyhzb2x1dGlvbnMpO1xuXG4gICAgICAgIHZhciBzdGF0ZSA9IHNvbHV0aW9uc1swXTtcblxuICAgICAgICBpZiAoc3RhdGUgJiYgc3RhdGUuaGFuZGxlcnMpIHtcbiAgICAgICAgICAvLyBpZiBhIHRyYWlsaW5nIHNsYXNoIHdhcyBkcm9wcGVkIGFuZCBhIHN0YXIgc2VnbWVudCBpcyB0aGUgbGFzdCBzZWdtZW50XG4gICAgICAgICAgLy8gc3BlY2lmaWVkLCBwdXQgdGhlIHRyYWlsaW5nIHNsYXNoIGJhY2tcbiAgICAgICAgICBpZiAoaXNTbGFzaERyb3BwZWQgJiYgc3RhdGUucmVnZXguc291cmNlLnNsaWNlKC01KSA9PT0gXCIoLispJFwiKSB7XG4gICAgICAgICAgICBwYXRoID0gcGF0aCArIFwiL1wiO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gJCRyb3V0ZSRyZWNvZ25pemVyJCRmaW5kSGFuZGxlcihzdGF0ZSwgcGF0aCwgcXVlcnlQYXJhbXMpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcblxuICAgICQkcm91dGUkcmVjb2duaXplciQkUm91dGVSZWNvZ25pemVyLnByb3RvdHlwZS5tYXAgPSAkJHJvdXRlJHJlY29nbml6ZXIkZHNsJCRkZWZhdWx0O1xuXG4gICAgJCRyb3V0ZSRyZWNvZ25pemVyJCRSb3V0ZVJlY29nbml6ZXIuVkVSU0lPTiA9ICcwLjEuNSc7XG5cbiAgICB2YXIgJCRyb3V0ZSRyZWNvZ25pemVyJCRkZWZhdWx0ID0gJCRyb3V0ZSRyZWNvZ25pemVyJCRSb3V0ZVJlY29nbml6ZXI7XG5cbiAgICAvKiBnbG9iYWwgZGVmaW5lOnRydWUgbW9kdWxlOnRydWUgd2luZG93OiB0cnVlICovXG4gICAgaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lWydhbWQnXSkge1xuICAgICAgZGVmaW5lKGZ1bmN0aW9uKCkgeyByZXR1cm4gJCRyb3V0ZSRyZWNvZ25pemVyJCRkZWZhdWx0OyB9KTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnICYmIG1vZHVsZVsnZXhwb3J0cyddKSB7XG4gICAgICBtb2R1bGVbJ2V4cG9ydHMnXSA9ICQkcm91dGUkcmVjb2duaXplciQkZGVmYXVsdDtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiB0aGlzICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgdGhpc1snUm91dGVSZWNvZ25pemVyJ10gPSAkJHJvdXRlJHJlY29nbml6ZXIkJGRlZmF1bHQ7XG4gICAgfVxufSkuY2FsbCh0aGlzKTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9cm91dGUtcmVjb2duaXplci5qcy5tYXAiXX0=
