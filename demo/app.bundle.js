!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.APP=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"/home/dugokontov/projects/operation-transformation/app/actions/TableActionCreator.js":[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var TableActions = require("./TableActions");

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

},{"./TableActions":"/home/dugokontov/projects/operation-transformation/app/actions/TableActions.js"}],"/home/dugokontov/projects/operation-transformation/app/actions/TableActions.js":[function(require,module,exports){
"use strict";

var TableActions = {
  UPDATE_CELL: "updateCell",
  ADD_ROW: "addRow",
  DELETE_ROW: "deleteRow",
  USER_CHANGE_POSITION: "user-change-position"
};

module.exports = TableActions;

},{}],"/home/dugokontov/projects/operation-transformation/app/app.js":[function(require,module,exports){
"use strict";

var GridView = require("./components/grid/GridView");
var GridController = require("./components/grid/GridController");

var GridActionsView = require("./components/gridActions/GridActionsView");
var GridActionsController = require("./components/gridActions/GridActionsController");

var App = {
  init: function init() {
    var gridView = new GridView(document.body, "#grid");
    new GridController(gridView);

    var actionView = new GridActionsView(document.body, "#actions");
    new GridActionsController(actionView);

    gridView.render();
    actionView.render();
  }
};

module.exports = App;

},{"./components/grid/GridController":"/home/dugokontov/projects/operation-transformation/app/components/grid/GridController.js","./components/grid/GridView":"/home/dugokontov/projects/operation-transformation/app/components/grid/GridView.js","./components/gridActions/GridActionsController":"/home/dugokontov/projects/operation-transformation/app/components/gridActions/GridActionsController.js","./components/gridActions/GridActionsView":"/home/dugokontov/projects/operation-transformation/app/components/gridActions/GridActionsView.js"}],"/home/dugokontov/projects/operation-transformation/app/components/grid/CellViewReact.js":[function(require,module,exports){
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

},{}],"/home/dugokontov/projects/operation-transformation/app/components/grid/GridController.js":[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var TableActions = require("../../actions/TableActions.js");
var TableActionCreator = require("../../actions/TableActionCreator.js");
var TableStore = require("../../stores/TableStore.js");

var GridController = (function (_GLU$ViewController) {
  function GridController(view) {
    _classCallCheck(this, GridController);

    _get(Object.getPrototypeOf(GridController.prototype), "constructor", this).call(this, view);

    TableStore.onChange(this.onStoreChange, this);

    this.view.on(TableActions.UPDATE_CELL, this.onCellUpdate);
    this.view.on(TableActions.USER_CHANGE_POSITION, this.userChangePosition);
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
    }
  });

  return GridController;
})(GLU.ViewController);

module.exports = GridController;

},{"../../actions/TableActionCreator.js":"/home/dugokontov/projects/operation-transformation/app/actions/TableActionCreator.js","../../actions/TableActions.js":"/home/dugokontov/projects/operation-transformation/app/actions/TableActions.js","../../stores/TableStore.js":"/home/dugokontov/projects/operation-transformation/app/stores/TableStore.js"}],"/home/dugokontov/projects/operation-transformation/app/components/grid/GridView.js":[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var data, usersPosition, view;
var GridViewReact = require("./GridViewReact.js");

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
        React.render(React.createElement(GridViewReact, {
          data: data,
          usersPosition: usersPosition,
          view: view }), this.el);
      }
    },
    updateState: {
      value: function updateState(d, up) {
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

},{"./GridViewReact.js":"/home/dugokontov/projects/operation-transformation/app/components/grid/GridViewReact.js"}],"/home/dugokontov/projects/operation-transformation/app/components/grid/GridViewReact.js":[function(require,module,exports){
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
  render: function render() {
    var _this = this;

    var headers = [];
    var rows = [];
    if (this.props.data[0]) {
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
    );
  }
});

module.exports = GridViewReact;

},{"../../actions/TableActions.js":"/home/dugokontov/projects/operation-transformation/app/actions/TableActions.js","./RowViewReact.js":"/home/dugokontov/projects/operation-transformation/app/components/grid/RowViewReact.js"}],"/home/dugokontov/projects/operation-transformation/app/components/grid/RowViewReact.js":[function(require,module,exports){
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

},{"./CellViewReact.js":"/home/dugokontov/projects/operation-transformation/app/components/grid/CellViewReact.js"}],"/home/dugokontov/projects/operation-transformation/app/components/gridActions/GridActionsController.js":[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var TableActions = require("../../actions/TableActions.js");
var TableActionCreator = require("../../actions/TableActionCreator.js");

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
    }
  });

  return GridActionsController;
})(GLU.ViewController);

module.exports = GridActionsController;

},{"../../actions/TableActionCreator.js":"/home/dugokontov/projects/operation-transformation/app/actions/TableActionCreator.js","../../actions/TableActions.js":"/home/dugokontov/projects/operation-transformation/app/actions/TableActions.js"}],"/home/dugokontov/projects/operation-transformation/app/components/gridActions/GridActionsView.js":[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var view;
var GridActionsViewReact = require("./GridActionsViewReact.js");

var GridView = (function (_GLU$View) {
  function GridView(root, selector) {
    _classCallCheck(this, GridView);

    _get(Object.getPrototypeOf(GridView.prototype), "constructor", this).call(this, root, selector);
    view = this;
  }

  _inherits(GridView, _GLU$View);

  _createClass(GridView, {
    render: {
      value: function render() {
        React.render(React.createElement(GridActionsViewReact, { view: view }), this.el);
      }
    }
  });

  return GridView;
})(GLU.View);

module.exports = GridView;

},{"./GridActionsViewReact.js":"/home/dugokontov/projects/operation-transformation/app/components/gridActions/GridActionsViewReact.js"}],"/home/dugokontov/projects/operation-transformation/app/components/gridActions/GridActionsViewReact.js":[function(require,module,exports){
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
      React.createElement("input", { type: "text", defaultValue: "1", ref: "rowPosition" })
    );
  }
});

module.exports = GridViewReact;

},{"../../actions/TableActions.js":"/home/dugokontov/projects/operation-transformation/app/actions/TableActions.js"}],"/home/dugokontov/projects/operation-transformation/app/ot/ot.js":[function(require,module,exports){
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

},{}],"/home/dugokontov/projects/operation-transformation/app/ot/tableChange.js":[function(require,module,exports){
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

},{}],"/home/dugokontov/projects/operation-transformation/app/stores/TableStore.js":[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var TableActions = require("../actions/TableActions");
var OT = require("../ot/ot.js");
var tableChangeRules = require("../ot/tableChange.js");
var socket, ot;

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

},{"../actions/TableActions":"/home/dugokontov/projects/operation-transformation/app/actions/TableActions.js","../ot/ot.js":"/home/dugokontov/projects/operation-transformation/app/ot/ot.js","../ot/tableChange.js":"/home/dugokontov/projects/operation-transformation/app/ot/tableChange.js"}]},{},["/home/dugokontov/projects/operation-transformation/app/app.js"])("/home/dugokontov/projects/operation-transformation/app/app.js")
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi9hcHAvYWN0aW9ucy9UYWJsZUFjdGlvbkNyZWF0b3IuanMiLCIuLi9hcHAvYWN0aW9ucy9UYWJsZUFjdGlvbnMuanMiLCIuLi9hcHAvYXBwLmpzIiwiLi4vYXBwL2NvbXBvbmVudHMvZ3JpZC9DZWxsVmlld1JlYWN0LmpzIiwiLi4vYXBwL2NvbXBvbmVudHMvZ3JpZC9HcmlkQ29udHJvbGxlci5qcyIsIi4uL2FwcC9jb21wb25lbnRzL2dyaWQvR3JpZFZpZXcuanMiLCIuLi9hcHAvY29tcG9uZW50cy9ncmlkL0dyaWRWaWV3UmVhY3QuanMiLCIuLi9hcHAvY29tcG9uZW50cy9ncmlkL1Jvd1ZpZXdSZWFjdC5qcyIsIi4uL2FwcC9jb21wb25lbnRzL2dyaWRBY3Rpb25zL0dyaWRBY3Rpb25zQ29udHJvbGxlci5qcyIsIi4uL2FwcC9jb21wb25lbnRzL2dyaWRBY3Rpb25zL0dyaWRBY3Rpb25zVmlldy5qcyIsIi4uL2FwcC9jb21wb25lbnRzL2dyaWRBY3Rpb25zL0dyaWRBY3Rpb25zVmlld1JlYWN0LmpzIiwiLi4vYXBwL290L290LmpzIiwiLi4vYXBwL290L3RhYmxlQ2hhbmdlLmpzIiwiLi4vYXBwL3N0b3Jlcy9UYWJsZVN0b3JlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUEsWUFBWSxDQUFDOzs7Ozs7QUFFYixJQUFJLFlBQVksR0FBRyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsQ0FBQzs7SUFFdkMsa0JBQWtCO1dBQWxCLGtCQUFrQjswQkFBbEIsa0JBQWtCOzs7ZUFBbEIsa0JBQWtCO0FBQ2YsY0FBVTthQUFBLG9CQUFDLE9BQU8sRUFBRTtBQUN6QixXQUFHLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsV0FBVyxFQUFFLE9BQU8sQ0FBQyxDQUFDO09BQ3ZEOztBQUNNLFVBQU07YUFBQSxn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QUFFLENBQUMsYUFBYSxDQUFDLE1BQU0sRUFBRSxPQUFPLENBQUMsQ0FBQztBQUNoRCxZQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQ2xDLFVBQUUsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDcEIsY0FBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUNyQixZQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7T0FDbkI7O0FBRUQsY0FBVTthQUFBLG9CQUFDLE9BQU8sRUFBRTtBQUNsQixZQUFJLENBQUMsY0FBYyxDQUFDLFlBQVksQ0FBQyxXQUFXLEVBQUUsT0FBTyxDQUFDLENBQUM7T0FDeEQ7O0FBRUQsYUFBUzthQUFBLG1CQUFDLE9BQU8sRUFBRTtBQUNqQixZQUFJLENBQUMsY0FBYyxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUM7T0FDcEQ7O0FBRUQsYUFBUzthQUFBLG1CQUFDLE9BQU8sRUFBRTtBQUNqQixZQUFJLENBQUMsY0FBYyxDQUFDLFlBQVksQ0FBQyxVQUFVLEVBQUUsT0FBTyxDQUFDLENBQUM7T0FDdkQ7O0FBRUQsc0JBQWtCO2FBQUEsNEJBQUMsT0FBTyxFQUFFO0FBQzFCLFlBQUksQ0FBQyxjQUFjLENBQUMsWUFBWSxDQUFDLG9CQUFvQixFQUFFLE9BQU8sQ0FBQyxDQUFDO09BQ2pFOzs7O1NBbEVHLFVBQVU7R0FBUyxHQUFHLENBQUMsS0FBSzs7QUFxRWxDLE1BQU0sQ0FBQyxPQUFPLEdBQUcsSUFBSSxVQUFVLEVBQUUsQ0FBQyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIndXNlIHN0cmljdCc7XG5cbnZhciBUYWJsZUFjdGlvbnMgPSByZXF1aXJlKCcuL1RhYmxlQWN0aW9ucycpO1xuXG5jbGFzcyBUYWJsZUFjdGlvbkNyZWF0b3Ige1xuICBzdGF0aWMgdXBkYXRlQ2VsbChwYXlsb2FkKSB7XG4gICAgR0xVLmJ1cy5lbWl0QWN0aW9uKFRhYmxlQWN0aW9ucy5VUERBVEVfQ0VMTCwgcGF5bG9hZCk7XG4gIH1cbiAgc3RhdGljIGFkZFJvdyhwYXlsb2FkKSB7XG4gICAgR0xVLmJ1cy5lbWl0QWN0aW9uKFRhYmxlQWN0aW9ucy5BRERfUk9XLCBwYXlsb2FkKTtcbiAgfVxuICBzdGF0aWMgZGVsZXRlUm93KHBheWxvYWQpIHtcbiAgICBHTFUuYnVzLmVtaXRBY3Rpb24oVGFibGVBY3Rpb25zLkRFTEVURV9ST1csIHBheWxvYWQpO1xuICB9XG4gIHN0YXRpYyB1c2VyQ2hhbmdlUG9zaXRpb24ocGF5bG9hZCkge1xuICAgIEdMVS5idXMuZW1pdEFjdGlvbihUYWJsZUFjdGlvbnMuVVNFUl9DSEFOR0VfUE9TSVRJT04sIHBheWxvYWQpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gVGFibGVBY3Rpb25DcmVhdG9yOyIsIid1c2Ugc3RyaWN0JztcblxudmFyIFRhYmxlQWN0aW9ucyA9IHtcbiAgVVBEQVRFX0NFTEw6ICd1cGRhdGVDZWxsJyxcbiAgQUREX1JPVzogJ2FkZFJvdycsXG4gIERFTEVURV9ST1c6ICdkZWxldGVSb3cnLFxuICBVU0VSX0NIQU5HRV9QT1NJVElPTjogJ3VzZXItY2hhbmdlLXBvc2l0aW9uJ1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBUYWJsZUFjdGlvbnM7IiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgR3JpZFZpZXcgPSByZXF1aXJlKCcuL2NvbXBvbmVudHMvZ3JpZC9HcmlkVmlldycpO1xudmFyIEdyaWRDb250cm9sbGVyID0gcmVxdWlyZSgnLi9jb21wb25lbnRzL2dyaWQvR3JpZENvbnRyb2xsZXInKTtcblxudmFyIEdyaWRBY3Rpb25zVmlldyA9IHJlcXVpcmUoJy4vY29tcG9uZW50cy9ncmlkQWN0aW9ucy9HcmlkQWN0aW9uc1ZpZXcnKTtcbnZhciBHcmlkQWN0aW9uc0NvbnRyb2xsZXIgPSByZXF1aXJlKCcuL2NvbXBvbmVudHMvZ3JpZEFjdGlvbnMvR3JpZEFjdGlvbnNDb250cm9sbGVyJyk7XG5cbnZhciBBcHAgPSB7XG4gIGluaXQ6IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZ3JpZFZpZXcgPSBuZXcgR3JpZFZpZXcoZG9jdW1lbnQuYm9keSwgJyNncmlkJyk7XG4gICAgbmV3IEdyaWRDb250cm9sbGVyKGdyaWRWaWV3KTtcblxuICAgIHZhciBhY3Rpb25WaWV3ID0gbmV3IEdyaWRBY3Rpb25zVmlldyhkb2N1bWVudC5ib2R5LCAnI2FjdGlvbnMnKTtcbiAgICBuZXcgR3JpZEFjdGlvbnNDb250cm9sbGVyKGFjdGlvblZpZXcpO1xuXG4gICAgZ3JpZFZpZXcucmVuZGVyKCk7XG4gICAgYWN0aW9uVmlldy5yZW5kZXIoKTtcbiAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBBcHA7IiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgQ2VsbFZpZXdSZWFjdCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgb25CbHVyKGUpOiBhbnkge1xuICAgIHRoaXMucHJvcHMudXBkYXRlQ2VsbCh0aGlzLnByb3BzLnJvd0luZGV4LCB0aGlzLnByb3BzLmNvbHVtbkluZGV4LCBlLnRhcmdldC52YWx1ZSwgJ2NoYW5nZScpO1xuICB9LFxuICBvbkNoYW5nZShlKTphbnkge1xuICAgIHRoaXMucHJvcHMudXBkYXRlQ2VsbCh0aGlzLnByb3BzLnJvd0luZGV4LCB0aGlzLnByb3BzLmNvbHVtbkluZGV4LCBlLnRhcmdldC52YWx1ZSk7XG4gIH0sXG4gIG9uRm9jdXMoZSk6YW55IHtcbiAgICB0aGlzLnByb3BzLnVwZGF0ZUNlbGwodGhpcy5wcm9wcy5yb3dJbmRleCwgdGhpcy5wcm9wcy5jb2x1bW5JbmRleCwgZS50YXJnZXQudmFsdWUsICdmb2N1cycpO1xuICB9LFxuICByZW5kZXIoKTogYW55IHtcbiAgICB2YXIgdXAgPSB0aGlzLnByb3BzLnVzZXJzUG9zaXRpb247XG4gICAgdmFyIGFjdGl2ZVVzZXJzSGVyZSA9IE9iamVjdFxuICAgICAgLmtleXModXApXG4gICAgICAuZmlsdGVyKHVzZXJJZCA9PiB1cFt1c2VySWRdLnJvd0luZGV4ID09PSB0aGlzLnByb3BzLnJvd0luZGV4ICYmIHVwW3VzZXJJZF0uY29sdW1uSW5kZXggPT09IHRoaXMucHJvcHMuY29sdW1uSW5kZXgpXG4gICAgICAubWFwKHVzZXJJZCA9PiA8ZGl2IGNsYXNzTmFtZT17J3VzZXItJyArIHVzZXJJZH0+PC9kaXY+KVxuICAgIHJldHVybiA8dGQ+XG4gICAgICA8aW5wdXQgdHlwZT1cInRleHRcIlxuICAgICAgICB2YWx1ZT17dGhpcy5wcm9wcy52YWx1ZX1cbiAgICAgICAgcmVmPVwidmFsdWVcIlxuICAgICAgICBvbkNoYW5nZT17dGhpcy5vbkNoYW5nZX1cbiAgICAgICAgb25Gb2N1cz17dGhpcy5vbkZvY3VzfVxuICAgICAgICBvbkJsdXI9e3RoaXMub25CbHVyfS8+XG4gICAgICB7YWN0aXZlVXNlcnNIZXJlfVxuICAgIDwvdGQ+O1xuICB9XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBDZWxsVmlld1JlYWN0OyIsIid1c2Ugc3RyaWN0JztcbnZhciBUYWJsZUFjdGlvbnMgPSByZXF1aXJlKCcuLi8uLi9hY3Rpb25zL1RhYmxlQWN0aW9ucy5qcycpO1xudmFyIFRhYmxlQWN0aW9uQ3JlYXRvciA9IHJlcXVpcmUoJy4uLy4uL2FjdGlvbnMvVGFibGVBY3Rpb25DcmVhdG9yLmpzJyk7XG52YXIgVGFibGVTdG9yZSA9IHJlcXVpcmUoJy4uLy4uL3N0b3Jlcy9UYWJsZVN0b3JlLmpzJyk7XG5cbmNsYXNzIEdyaWRDb250cm9sbGVyIGV4dGVuZHMgR0xVLlZpZXdDb250cm9sbGVyIHtcbiAgY29uc3RydWN0b3Iodmlldykge1xuICAgIHN1cGVyKHZpZXcpO1xuXG4gICAgVGFibGVTdG9yZS5vbkNoYW5nZSh0aGlzLm9uU3RvcmVDaGFuZ2UsIHRoaXMpO1xuXG4gICAgdGhpcy52aWV3Lm9uKFRhYmxlQWN0aW9ucy5VUERBVEVfQ0VMTCwgdGhpcy5vbkNlbGxVcGRhdGUpO1xuICAgIHRoaXMudmlldy5vbihUYWJsZUFjdGlvbnMuVVNFUl9DSEFOR0VfUE9TSVRJT04sIHRoaXMudXNlckNoYW5nZVBvc2l0aW9uKTtcbiAgfVxuXG4gIG9uU3RvcmVDaGFuZ2UoKSB7XG4gICAgdGhpcy52aWV3LnVwZGF0ZVN0YXRlKFRhYmxlU3RvcmUuZGF0YSwgVGFibGVTdG9yZS51c2Vyc1Bvc2l0aW9uKTtcbiAgfVxuXG4gIG9uQ2VsbFVwZGF0ZShwYXlsb2FkKSB7XG4gICAgVGFibGVBY3Rpb25DcmVhdG9yLnVwZGF0ZUNlbGwocGF5bG9hZCk7XG4gIH1cblxuICB1c2VyQ2hhbmdlUG9zaXRpb24ocGF5bG9hZCkge1xuICAgIFRhYmxlQWN0aW9uQ3JlYXRvci51c2VyQ2hhbmdlUG9zaXRpb24ocGF5bG9hZCk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBHcmlkQ29udHJvbGxlcjsiLCIndXNlIHN0cmljdCc7XG5cbnZhciBkYXRhLCB1c2Vyc1Bvc2l0aW9uLCB2aWV3O1xudmFyIEdyaWRWaWV3UmVhY3QgPSByZXF1aXJlKCcuL0dyaWRWaWV3UmVhY3QuanMnKTtcblxuY2xhc3MgR3JpZFZpZXcgZXh0ZW5kcyBHTFUuVmlldyB7XG4gIGNvbnN0cnVjdG9yKHJvb3QsIHNlbGVjdG9yKSB7XG4gICAgc3VwZXIocm9vdCwgc2VsZWN0b3IpO1xuXG4gICAgZGF0YSA9IFtdO1xuICAgIHVzZXJzUG9zaXRpb24gPSB7fTtcbiAgICB2aWV3ID0gdGhpcztcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBSZWFjdC5yZW5kZXIoPEdyaWRWaWV3UmVhY3RcbiAgICAgIGRhdGE9e2RhdGF9XG4gICAgICB1c2Vyc1Bvc2l0aW9uPXt1c2Vyc1Bvc2l0aW9ufVxuICAgICAgdmlldz17dmlld30vPixcbiAgICAgIHRoaXMuZWwpO1xuICB9XG5cbiAgdXBkYXRlU3RhdGUoZCwgdXApIHtcbiAgICBkYXRhID0gZDtcbiAgICB1c2Vyc1Bvc2l0aW9uID0gdXBcbiAgICB0aGlzLnJlbmRlcigpO1xuICB9XG5cbiAgZ2V0IGRhdGEoKSB7XG4gICAgcmV0dXJuIGRhdGE7XG4gIH1cblxuICBzZXQgZGF0YShkKSB7XG4gICAgZGF0YSA9IGQ7XG4gICAgdGhpcy5yZW5kZXIoKTtcbiAgfVxuXG4gIGdldCB1c2Vyc1Bvc2l0aW9uKCkge1xuICAgIHJldHVybiB1c2Vyc1Bvc2l0aW9uO1xuICB9XG5cbiAgc2V0IHVzZXJzUG9zaXRpb24odXApIHtcbiAgICB1c2Vyc1Bvc2l0aW9uID0gdXA7XG4gICAgdGhpcy5yZW5kZXIoKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEdyaWRWaWV3OyIsIid1c2Ugc3RyaWN0JztcblxudmFyIFJvd1ZpZXdSZWFjdCA9IHJlcXVpcmUoJy4vUm93Vmlld1JlYWN0LmpzJyk7XG52YXIgVGFibGVBY3Rpb25zID0gcmVxdWlyZSgnLi4vLi4vYWN0aW9ucy9UYWJsZUFjdGlvbnMuanMnKTtcblxudmFyIEdyaWRWaWV3UmVhY3QgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gIGdldEluaXRpYWxTdGF0ZSgpOiBhbnkge1xuICAgIHJldHVybiB7ZGF0YTogdGhpcy5wcm9wcy5kYXRhfTtcbiAgfSxcbiAgdXBkYXRlQ2VsbChyb3dJbmRleCwgY29sdW1uSW5kZXgsIHZhbHVlLCBhY3Rpb24pOiBhbnkge1xuICAgIGlmIChhY3Rpb24gPT09ICdmb2N1cycpIHtcbiAgICAgIHRoaXMucHJvcHMudmlldy5lbWl0KFRhYmxlQWN0aW9ucy5VU0VSX0NIQU5HRV9QT1NJVElPTiwge1xuICAgICAgICByb3dJbmRleDogcm93SW5kZXgsXG4gICAgICAgIGNvbHVtbkluZGV4OiBjb2x1bW5JbmRleFxuICAgICAgfSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMucHJvcHMuZGF0YVtyb3dJbmRleF1bY29sdW1uSW5kZXhdID0gdmFsdWU7XG4gICAgdGhpcy5zZXRTdGF0ZSh7ZGF0YTogdGhpcy5wcm9wcy5kYXRhfSk7XG4gICAgaWYgKGFjdGlvbikge1xuICAgICAgdGhpcy5wcm9wcy52aWV3LmVtaXQoVGFibGVBY3Rpb25zLlVQREFURV9DRUxMLCB7XG4gICAgICAgIHJvd0luZGV4OiByb3dJbmRleCxcbiAgICAgICAgY29sdW1uSW5kZXg6IGNvbHVtbkluZGV4LFxuICAgICAgICB2YWx1ZTogdmFsdWVcbiAgICAgIH0pO1xuICAgIH1cbiAgfSxcbiAgcmVuZGVyKCk6IGFueSB7XG4gICAgdmFyIGhlYWRlcnMgPSBbXTtcbiAgICB2YXIgcm93cyA9IFtdO1xuICAgIGlmICh0aGlzLnByb3BzLmRhdGFbMF0pIHtcbiAgICAgIGhlYWRlcnMgPSB0aGlzLnByb3BzLmRhdGFbMF0ubWFwKChuYW1lLCBpbmRleCkgPT4gPHRoPkNvbCB7aW5kZXggKyAxfTwvdGg+KTtcbiAgICAgIHJvd3MgPSB0aGlzLnByb3BzLmRhdGEubWFwKChyb3csIGluZGV4KSA9PiA8Um93Vmlld1JlYWN0XG4gICAgICAgIHJvdz17cm93fVxuICAgICAgICBrZXk9e2luZGV4fVxuICAgICAgICByb3dJbmRleD17aW5kZXh9XG4gICAgICAgIHVzZXJzUG9zaXRpb249e3RoaXMucHJvcHMudXNlcnNQb3NpdGlvbn1cbiAgICAgICAgdXBkYXRlQ2VsbD17dGhpcy51cGRhdGVDZWxsfS8+KTtcbiAgICB9XG4gICAgcmV0dXJuIDx0YWJsZT5cbiAgICAgIDx0aGVhZD5cbiAgICAgICAgPHRyPntoZWFkZXJzfTwvdHI+XG4gICAgICA8L3RoZWFkPlxuICAgICAgPHRib2R5PlxuICAgICAgICB7cm93c31cbiAgICAgIDwvdGJvZHk+XG4gICAgPC90YWJsZT47XG4gIH1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEdyaWRWaWV3UmVhY3Q7IiwiJ3VzZSBzdHJpY3QnO1xudmFyIENlbGxWaWV3UmVhY3QgPSByZXF1aXJlKCcuL0NlbGxWaWV3UmVhY3QuanMnKTtcblxudmFyIFJvd1ZpZXdSZWFjdCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgcmVuZGVyKCk6IGFueSB7XG4gICAgdmFyIGNlbGxzID0gW107XG4gICAgaWYgKHRoaXMucHJvcHMucm93Lmxlbmd0aCkge1xuICAgICAgY2VsbHMgPSB0aGlzLnByb3BzLnJvdy5tYXAoKGNlbGwsIGluZGV4KSA9PiA8Q2VsbFZpZXdSZWFjdFxuICAgICAgICB2YWx1ZT17Y2VsbH1cbiAgICAgICAga2V5PXtpbmRleH1cbiAgICAgICAgY29sdW1uSW5kZXg9e2luZGV4fVxuICAgICAgICByb3dJbmRleD17dGhpcy5wcm9wcy5yb3dJbmRleH1cbiAgICAgICAgdXNlcnNQb3NpdGlvbj17dGhpcy5wcm9wcy51c2Vyc1Bvc2l0aW9ufVxuICAgICAgICB1cGRhdGVDZWxsPXt0aGlzLnByb3BzLnVwZGF0ZUNlbGx9Lz4pO1xuICAgIH1cbiAgICByZXR1cm4gPHRyPntjZWxsc308L3RyPjtcbiAgfVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gUm93Vmlld1JlYWN0OyIsIid1c2Ugc3RyaWN0JztcbnZhciBUYWJsZUFjdGlvbnMgPSByZXF1aXJlKCcuLi8uLi9hY3Rpb25zL1RhYmxlQWN0aW9ucy5qcycpO1xudmFyIFRhYmxlQWN0aW9uQ3JlYXRvciA9IHJlcXVpcmUoJy4uLy4uL2FjdGlvbnMvVGFibGVBY3Rpb25DcmVhdG9yLmpzJyk7XG5cbmNsYXNzIEdyaWRBY3Rpb25zQ29udHJvbGxlciBleHRlbmRzIEdMVS5WaWV3Q29udHJvbGxlciB7XG4gIGNvbnN0cnVjdG9yKHZpZXcpIHtcbiAgICBzdXBlcih2aWV3KTtcblxuICAgIHRoaXMudmlldy5vbihUYWJsZUFjdGlvbnMuQUREX1JPVywgdGhpcy5hZGRSb3cpO1xuICAgIHRoaXMudmlldy5vbihUYWJsZUFjdGlvbnMuREVMRVRFX1JPVywgdGhpcy5kZWxldGVSb3cpO1xuICB9XG5cbiAgYWRkUm93KHBheWxvYWQpIHtcbiAgICBUYWJsZUFjdGlvbkNyZWF0b3IuYWRkUm93KHBheWxvYWQpO1xuICB9XG5cbiAgZGVsZXRlUm93KHBheWxvYWQpIHtcbiAgICBUYWJsZUFjdGlvbkNyZWF0b3IuZGVsZXRlUm93KHBheWxvYWQpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gR3JpZEFjdGlvbnNDb250cm9sbGVyOyIsIid1c2Ugc3RyaWN0JztcblxudmFyIHZpZXc7XG52YXIgR3JpZEFjdGlvbnNWaWV3UmVhY3QgPSByZXF1aXJlKCcuL0dyaWRBY3Rpb25zVmlld1JlYWN0LmpzJyk7XG5cbmNsYXNzIEdyaWRWaWV3IGV4dGVuZHMgR0xVLlZpZXcge1xuICBjb25zdHJ1Y3Rvcihyb290LCBzZWxlY3Rvcikge1xuICAgIHN1cGVyKHJvb3QsIHNlbGVjdG9yKTtcbiAgICB2aWV3ID0gdGhpcztcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBSZWFjdC5yZW5kZXIoPEdyaWRBY3Rpb25zVmlld1JlYWN0IHZpZXc9e3ZpZXd9IC8+LFxuICAgICAgdGhpcy5lbCk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBHcmlkVmlldzsiLCIndXNlIHN0cmljdCc7XG52YXIgVGFibGVBY3Rpb25zID0gcmVxdWlyZSgnLi4vLi4vYWN0aW9ucy9UYWJsZUFjdGlvbnMuanMnKTtcblxudmFyIEdyaWRWaWV3UmVhY3QgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gIGFkZFJvdygpOiBhbnkge1xuICAgIHRoaXMucHJvcHMudmlldy5lbWl0KFRhYmxlQWN0aW9ucy5BRERfUk9XLCB7XG4gICAgICByb3dJbmRleDogK1JlYWN0LmZpbmRET01Ob2RlKHRoaXMucmVmcy5yb3dQb3NpdGlvbikudmFsdWUudHJpbSgpXG4gICAgfSk7XG4gIH0sXG4gIGRlbGV0ZVJvdygpOiBhbnkge1xuICAgIHRoaXMucHJvcHMudmlldy5lbWl0KFRhYmxlQWN0aW9ucy5ERUxFVEVfUk9XLCB7XG4gICAgICByb3dJbmRleDogK1JlYWN0LmZpbmRET01Ob2RlKHRoaXMucmVmcy5yb3dQb3NpdGlvbikudmFsdWUudHJpbSgpXG4gICAgfSk7XG4gIH0sXG4gIHJlbmRlcigpOiBhbnkge1xuICAgIHJldHVybiA8ZGl2PlxuICAgICAgPGJ1dHRvbiBvbkNsaWNrPXt0aGlzLmFkZFJvd30+QWRkIG5ldyByb3c8L2J1dHRvbj5cbiAgICAgIDxidXR0b24gb25DbGljaz17dGhpcy5kZWxldGVSb3d9PlJlbW92ZSByb3c8L2J1dHRvbj5cbiAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIGRlZmF1bHRWYWx1ZT1cIjFcIiByZWY9XCJyb3dQb3NpdGlvblwiIC8+XG4gICAgPC9kaXY+O1xuICB9XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBHcmlkVmlld1JlYWN0OyIsIi8qanNoaW50IGRldmVsOnRydWUqL1xuLypnbG9iYWwgT1Q6dHJ1ZSovXG4ndXNlIHN0cmljdCc7XG52YXIgT1QgPSAoZnVuY3Rpb24gKCkge1xuICB2YXIgcHJpb3JpdHksIGRhdGE7XG4gIHZhciBzdGF0ZXMgPSBbXTtcbiAgdmFyIGxvZyA9IFtdO1xuICB2YXIgZXhlY3V0ZUFjdGlvbnMgPSB7fTtcbiAgdmFyIHRyYW5zZm9ybWF0aW9uTWF0cml4ID0ge307XG4gIHZhciBvcHRpb25zO1xuICB2YXIgb25Nb2RlbENoYW5nZUV2ZW50cyA9IHt9O1xuICB2YXIgdXNlcnNQb3NpdGlvbiA9IHt9O1xuXG4gIHZhciBPVCA9IGZ1bmN0aW9uIChvKSB7XG4gICAgb3B0aW9ucyA9IG8gfHwge307XG4gIH07XG5cbiAgT1QucHJvdG90eXBlLnNldERhdGEgPSBmdW5jdGlvbiAoZCkge1xuICAgIGRhdGEgPSBkO1xuICB9O1xuXG4gIE9ULnByb3RvdHlwZS5nZXREYXRhID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBkYXRhO1xuICB9O1xuXG4gIE9ULnByb3RvdHlwZS5zZXRTdGF0ZXMgPSBmdW5jdGlvbiAocykge1xuICAgIHN0YXRlcyA9IHM7XG4gIH07XG5cbiAgT1QucHJvdG90eXBlLmdldFByaW9yaXR5ID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBwcmlvcml0eTtcbiAgfTtcblxuXG4gIE9ULnByb3RvdHlwZS5nZXRVc2Vyc1Bvc3Rpb24gPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHVzZXJzUG9zaXRpb247XG4gIH07XG5cbiAgT1QucHJvdG90eXBlLnNldEV4ZWN1dGVBY3Rpb25zID0gZnVuY3Rpb24gKGFjdGlvbnMpIHtcbiAgICBleGVjdXRlQWN0aW9ucyA9IGFjdGlvbnM7XG4gIH07XG5cbiAgT1QucHJvdG90eXBlLnNldFRyYW5zZm9ybWF0aW9uTWF0cml4ID0gZnVuY3Rpb24gKG1hdHJpeCkge1xuICAgIHRyYW5zZm9ybWF0aW9uTWF0cml4ID0gbWF0cml4O1xuICB9O1xuXG4gIE9ULnByb3RvdHlwZS5jcmVhdGVNZXNzYWdlID0gZnVuY3Rpb24gKGFjdGlvbiwgdmFsdWUpIHtcbiAgICB2YXIganNvbiA9IHtcbiAgICAgIGFjdGlvbjogYWN0aW9uLFxuICAgICAgc3RhdGVzOiBzdGF0ZXMsXG4gICAgICBwcmlvcml0eTogcHJpb3JpdHksXG4gICAgICB2YWx1ZTogdmFsdWVcbiAgICB9O1xuICAgIHJldHVybiBKU09OLnN0cmluZ2lmeShqc29uKTtcbiAgfTtcblxuICBPVC5wcm90b3R5cGUub25Nb2RlbENoYW5nZSA9IGZ1bmN0aW9uIChhY3Rpb24sIGNhbGxiYWNrKSB7XG4gICAgaWYgKHR5cGVvZiBjYWxsYmFjayAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgdGhyb3cgJ0NhbGxiYWNrIGhhcyB0byBiZSBhIGZ1bmN0aW9uJztcbiAgICB9XG4gICAgaWYgKCFvbk1vZGVsQ2hhbmdlRXZlbnRzW2FjdGlvbl0pIHtcbiAgICAgIG9uTW9kZWxDaGFuZ2VFdmVudHNbYWN0aW9uXSA9IFtdO1xuICAgIH1cbiAgICBvbk1vZGVsQ2hhbmdlRXZlbnRzW2FjdGlvbl0ucHVzaChjYWxsYmFjayk7XG4gIH07XG5cbiAgdmFyIGV4ZWN1dGUgPSBmdW5jdGlvbiAocmVxdWVzdCkge1xuICAgIHZhciBhY3Rpb24gPSBleGVjdXRlQWN0aW9uc1tyZXF1ZXN0LmFjdGlvbl07XG4gICAgaWYgKGFjdGlvbikge1xuICAgICAgYWN0aW9uKHJlcXVlc3QpO1xuICAgIH1cbiAgICB2YXIgb25Nb2RlbENoYW5nZUNhbGxiYWNrID0gb25Nb2RlbENoYW5nZUV2ZW50c1tyZXF1ZXN0LmFjdGlvbl07XG4gICAgaWYgKG9uTW9kZWxDaGFuZ2VDYWxsYmFjaykge1xuICAgICAgb25Nb2RlbENoYW5nZUNhbGxiYWNrLmZvckVhY2goZnVuY3Rpb24gKGNhbGxiYWNrKSB7XG4gICAgICAgIGNhbGxiYWNrKHJlcXVlc3QpO1xuICAgICAgfSk7XG4gICAgfVxuICAgIHN0YXRlc1tyZXF1ZXN0LnByaW9yaXR5XSArPSAxO1xuICAgIGxvZy5wdXNoKHJlcXVlc3QpO1xuICB9O1xuXG4gIE9ULnByb3RvdHlwZS5leGVjdXRlID0gZXhlY3V0ZTtcblxuXG4gIE9ULnByb3RvdHlwZS5tYXJrQXNOb09wID0gZnVuY3Rpb24gKHJlcXVlc3QpIHtcbiAgICByZXF1ZXN0Lm9yaWdpbmFsQWN0aW9uID0gcmVxdWVzdC5hY3Rpb247XG4gICAgcmVxdWVzdC5hY3Rpb24gPSAnbm8tb3AnO1xuICAgIHJldHVybiByZXF1ZXN0O1xuICB9O1xuXG4gIHZhciBjb21wYXJlU3RhdGUgPSBmdW5jdGlvbiAocmVxdWVzdFN0YXRlLCBjdXJyZW50U3RhdGUpIHtcbiAgICB2YXIgc2hvdWxkVHJhbnNmb3JtID0gZmFsc2U7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjdXJyZW50U3RhdGUubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgIGlmIChjdXJyZW50U3RhdGVbaV0gPT09IHJlcXVlc3RTdGF0ZVtpXSkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIGlmIChjdXJyZW50U3RhdGVbaV0gPiByZXF1ZXN0U3RhdGVbaV0pIHtcbiAgICAgICAgc2hvdWxkVHJhbnNmb3JtID0gdHJ1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiAxO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gKHNob3VsZFRyYW5zZm9ybSkgPyAtMSA6IDA7XG4gIH07XG5cbiAgdmFyIHRyYW5zZm9ybSA9IGZ1bmN0aW9uIChuZXdSZXF1ZXN0LCBvbGRSZXF1ZXN0KSB7XG4gICAgaWYgKG5ld1JlcXVlc3QgJiYgdHJhbnNmb3JtYXRpb25NYXRyaXhbbmV3UmVxdWVzdC5hY3Rpb25dICYmIHRyYW5zZm9ybWF0aW9uTWF0cml4W25ld1JlcXVlc3QuYWN0aW9uXVtvbGRSZXF1ZXN0LmFjdGlvbl0pIHtcbiAgICAgIHJldHVybiB0cmFuc2Zvcm1hdGlvbk1hdHJpeFtuZXdSZXF1ZXN0LmFjdGlvbl1bb2xkUmVxdWVzdC5hY3Rpb25dKG5ld1JlcXVlc3QsIG9sZFJlcXVlc3QpO1xuICAgIH1cbiAgICByZXR1cm4gbmV3UmVxdWVzdDtcbiAgfTtcblxuICBPVC5wcm90b3R5cGUucHJvY2Vzc1JlcXVlc3QgPSBmdW5jdGlvbiAocikge1xuICAgIHZhciByZXF1ZXN0ID0gSlNPTi5wYXJzZShyKTtcbiAgICBzd2l0Y2ggKHJlcXVlc3QuYWN0aW9uKSB7XG4gICAgY2FzZSAnaW5pdCc6XG4gICAgICBkYXRhID0gcmVxdWVzdC52YWx1ZS5kYXRhO1xuICAgICAgcHJpb3JpdHkgPSByZXF1ZXN0LnZhbHVlLnByaW9yaXR5O1xuICAgICAgc3RhdGVzID0gcmVxdWVzdC52YWx1ZS5zdGF0ZXM7XG4gICAgICBpZiAodHlwZW9mIG9wdGlvbnMub25Jbml0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIG9wdGlvbnMub25Jbml0KGRhdGEpO1xuICAgICAgfVxuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnbmV3LXVzZXInOlxuICAgICAgc3RhdGVzW3JlcXVlc3QudmFsdWVdID0gMDtcbiAgICAgIGlmICh0eXBlb2Ygb3B0aW9ucy5vbk5ld1VzZXIgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgb3B0aW9ucy5vbk5ld1VzZXIocmVxdWVzdCk7XG4gICAgICB9XG4gICAgICBicmVhaztcbiAgICBjYXNlICd1c2VyLWNoYW5nZS1wb3NpdGlvbic6XG4gICAgICB1c2Vyc1Bvc2l0aW9uW3JlcXVlc3QucHJpb3JpdHldID0gcmVxdWVzdC52YWx1ZTtcbiAgICAgIGlmICh0eXBlb2Ygb3B0aW9ucy5vblVzZXJQb3NpdGlvbkNoYW5nZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBvcHRpb25zLm9uVXNlclBvc2l0aW9uQ2hhbmdlKHJlcXVlc3QpO1xuICAgICAgfVxuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnbm8tb3AnOlxuICAgICAgZXhlY3V0ZShyZXF1ZXN0KTtcbiAgICAgIGJyZWFrO1xuICAgIGRlZmF1bHQ6XG4gICAgICBpZiAocHJpb3JpdHkgIT09IHJlcXVlc3QucHJpb3JpdHkpIHtcbiAgICAgICAgc3dpdGNoIChjb21wYXJlU3RhdGUocmVxdWVzdC5zdGF0ZXMsIHN0YXRlcykpIHtcbiAgICAgICAgY2FzZSAwOlxuICAgICAgICAgIC8vIHdlIGNhbiBleGVjdXRlIHRoaXMgYWN0aW9uIHJpZ2h0IGF3YXlcbiAgICAgICAgICBleGVjdXRlKHJlcXVlc3QpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgLy8gdGhpcyBhY3Rpb24gaGFzIHRvIGJlIHB1dCBpbnRvIHF1ZSwgYW5kIHdhaXQgZm9yIG90aGVyIGFjdGlvbnNcbiAgICAgICAgICAvLyBidXQgc2luY2Ugd2UgdXNlIHdlYiBzb2NrZXQsIHRoaXMgc2hvdWxkbid0IGhhcHBlbiBhbnl3YXlcbiAgICAgICAgICAvLyBxdWUucHVzaChyZXF1ZXN0KTtcbiAgICAgICAgICAvLyBUT0RPOiB3aGVuIHRvIGZpcmUgcXVlP1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIC0xOlxuICAgICAgICAgIC8vIGNyZWF0ZSB0cmFuc2Zvcm1hdGlvbiBmb3IgdGhpcyBhY3Rpb25cbiAgICAgICAgICBmb3IgKHZhciBpID0gbG9nLmxlbmd0aCAtIDE7IGkgPj0gMDsgaSAtPSAxKSB7XG4gICAgICAgICAgICAvLyBmaW5kIGFsbCBsb2dzIHRoYXQgaGFwcGVuZWQgYWZ0ZXIgdGhpcyByZXF1ZXN0IHdhcyBjcmFldGVkXG4gICAgICAgICAgICB2YXIgY29tcGFyZVN0YXRlU3RhdHVzID0gY29tcGFyZVN0YXRlKGxvZ1tpXS5zdGF0ZXMsIHJlcXVlc3Quc3RhdGVzKTtcbiAgICAgICAgICAgIGlmIChjb21wYXJlU3RhdGVTdGF0dXMgPT09IC0xKSB7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICB2YXIgdHJhbnNmb3JtZWRSZXF1ZXN0ID0gcmVxdWVzdDtcbiAgICAgICAgICBmb3IgKHZhciBqID0gaSArIDE7IGogPCBsb2cubGVuZ3RoOyBqICs9IDEpIHtcbiAgICAgICAgICAgIHRyYW5zZm9ybWVkUmVxdWVzdCA9IHRyYW5zZm9ybSh0cmFuc2Zvcm1lZFJlcXVlc3QsIGxvZ1tqXSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGV4ZWN1dGUodHJhbnNmb3JtZWRSZXF1ZXN0KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBjb25zb2xlLmxvZyhyZXF1ZXN0LmFjdGlvbiwgZGF0YSwgc3RhdGVzLCBsb2cpO1xuICB9O1xuXG4gIHJldHVybiBPVDtcbn0oKSk7XG5cbm1vZHVsZS5leHBvcnRzID0gT1Q7IiwiJ3VzZSBzdHJpY3QnO1xudmFyIHRhYmxlQ2hhbmdlUnVsZXMgPSAoZnVuY3Rpb24gKCkge1xuICB2YXIgb3Q7XG5cbiAgdmFyIGV4ZWN1dGVBY3Rpb25zID0ge1xuICAgIHVwZGF0ZUNlbGw6IGZ1bmN0aW9uIChyZXF1ZXN0KSB7XG4gICAgICB2YXIgdmFsdWUgPSByZXF1ZXN0LnZhbHVlO1xuICAgICAgdmFyIGRhdGEgPSBvdC5nZXREYXRhKCk7XG4gICAgICBkYXRhW3ZhbHVlLnJvd0luZGV4XVt2YWx1ZS5jb2x1bW5JbmRleF0gPSByZXF1ZXN0LnZhbHVlLnZhbHVlO1xuICAgIH0sXG4gICAgYWRkUm93OiBmdW5jdGlvbiAocmVxdWVzdCkge1xuICAgICAgdmFyIHZhbHVlID0gcmVxdWVzdC52YWx1ZTtcbiAgICAgIHZhciBkYXRhID0gb3QuZ2V0RGF0YSgpO1xuICAgICAgdmFyIHNvbWVSb3cgPSBkYXRhWzBdIHx8IFtdO1xuICAgICAgdmFyIHJvdyA9IHNvbWVSb3cubWFwKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuICcnO1xuICAgICAgfSk7XG5cbiAgICAgIGRhdGEuc3BsaWNlKHZhbHVlLnJvd0luZGV4LCAwLCByb3cpO1xuICAgIH0sXG4gICAgZGVsZXRlUm93OiBmdW5jdGlvbiAocmVxdWVzdCkge1xuICAgICAgdmFyIHZhbHVlID0gcmVxdWVzdC52YWx1ZTtcbiAgICAgIHZhciBkYXRhID0gb3QuZ2V0RGF0YSgpO1xuICAgICAgZGF0YS5zcGxpY2UodmFsdWUucm93SW5kZXgsIDEpO1xuICAgIH1cbiAgfTtcblxuICB2YXIgdHJhbnNmb3JtYXRpb25NYXRyaXggPSB7XG4gICAgdXBkYXRlQ2VsbDoge1xuICAgICAgdXBkYXRlQ2VsbDogZnVuY3Rpb24gKG5ld1JlcXVlc3QsIG9sZFJlcXVlc3QpIHtcbiAgICAgICAgaWYgKG5ld1JlcXVlc3QudmFsdWUucm93SW5kZXggIT09IG9sZFJlcXVlc3QudmFsdWUucm93SW5kZXggfHwgbmV3UmVxdWVzdC52YWx1ZS5jb2x1bW5JbmRleCAhPT0gb2xkUmVxdWVzdC52YWx1ZS5jb2x1bW5JbmRleCkge1xuICAgICAgICAgIHJldHVybiBuZXdSZXF1ZXN0O1xuICAgICAgICB9XG4gICAgICAgIGlmIChuZXdSZXF1ZXN0LnByaW9yaXR5IDwgb2xkUmVxdWVzdC5wcmlvcml0eSkge1xuICAgICAgICAgIHJldHVybiBuZXdSZXF1ZXN0O1xuICAgICAgICB9XG4gICAgICAgIHZhciB2YWx1ZSA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkob2xkUmVxdWVzdC52YWx1ZSkpO1xuICAgICAgICBuZXdSZXF1ZXN0LnZhbHVlID0gdmFsdWU7XG4gICAgICAgIHJldHVybiBuZXdSZXF1ZXN0O1xuICAgICAgfSxcbiAgICAgIGFkZFJvdzogZnVuY3Rpb24gKG5ld1JlcXVlc3QsIG9sZFJlcXVlc3QpIHtcbiAgICAgICAgaWYgKG5ld1JlcXVlc3QudmFsdWUucm93SW5kZXggPCBvbGRSZXF1ZXN0LnZhbHVlLnJvd0luZGV4KSB7XG4gICAgICAgICAgcmV0dXJuIG5ld1JlcXVlc3Q7XG4gICAgICAgIH1cbiAgICAgICAgbmV3UmVxdWVzdC52YWx1ZS5yb3dJbmRleCArPSAxO1xuICAgICAgICByZXR1cm4gbmV3UmVxdWVzdDtcbiAgICAgIH0sXG4gICAgICBkZWxldGVSb3c6IGZ1bmN0aW9uIChuZXdSZXF1ZXN0LCBvbGRSZXF1ZXN0KSB7XG4gICAgICAgIGlmIChuZXdSZXF1ZXN0LnZhbHVlLnJvd0luZGV4IDwgb2xkUmVxdWVzdC52YWx1ZS5yb3dJbmRleCkge1xuICAgICAgICAgIHJldHVybiBuZXdSZXF1ZXN0O1xuICAgICAgICB9XG4gICAgICAgIGlmICgrbmV3UmVxdWVzdC52YWx1ZS5yb3dJbmRleCA9PT0gK29sZFJlcXVlc3QudmFsdWUucm93SW5kZXgpIHtcbiAgICAgICAgICByZXR1cm4gb3QubWFya0FzTm9PcChuZXdSZXF1ZXN0KTtcbiAgICAgICAgfVxuICAgICAgICBuZXdSZXF1ZXN0LnZhbHVlLnJvd0luZGV4IC09IDE7XG4gICAgICAgIHJldHVybiBuZXdSZXF1ZXN0O1xuICAgICAgfVxuICAgIH0sXG4gICAgYWRkUm93OiB7XG4gICAgICAvLyBubyBuZWVkIGZvciB0cmFuc2Zvcm1hdGlvblxuICAgICAgLy8gdXBkYXRlQ2VsbDogZnVuY3Rpb24gKG5ld1JlcXVlc3QsIG9sZFJlcXVlc3QpIHt9XG4gICAgICBhZGRSb3c6IGZ1bmN0aW9uIChuZXdSZXF1ZXN0LCBvbGRSZXF1ZXN0KSB7XG4gICAgICAgIGlmIChuZXdSZXF1ZXN0LnZhbHVlLnJvd0luZGV4ICE9PSBvbGRSZXF1ZXN0LnZhbHVlLnJvd0luZGV4KSB7XG4gICAgICAgICAgcmV0dXJuIG5ld1JlcXVlc3Q7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG90Lm1hcmtBc05vT3AobmV3UmVxdWVzdCk7XG4gICAgICB9LFxuICAgICAgZGVsZXRlUm93OiBmdW5jdGlvbiAobmV3UmVxdWVzdCwgb2xkUmVxdWVzdCkge1xuICAgICAgICBpZiAobmV3UmVxdWVzdC52YWx1ZS5yb3dJbmRleCA8IG9sZFJlcXVlc3QudmFsdWUucm93SW5kZXgpIHtcbiAgICAgICAgICByZXR1cm4gbmV3UmVxdWVzdDtcbiAgICAgICAgfVxuICAgICAgICBuZXdSZXF1ZXN0LnZhbHVlLnJvd0luZGV4IC09IDE7XG4gICAgICAgIHJldHVybiBuZXdSZXF1ZXN0O1xuICAgICAgfVxuICAgIH0sXG4gICAgZGVsZXRlUm93OiB7XG4gICAgICAvLyBubyBuZWVkIGZvciB0cmFuc2Zvcm1hdGlvblxuICAgICAgLy8gdXBkYXRlQ2VsbDogZnVuY3Rpb24gKG5ld1JlcXVlc3QsIG9sZFJlcXVlc3QpIHt9XG4gICAgICBhZGRSb3c6IGZ1bmN0aW9uIChuZXdSZXF1ZXN0LCBvbGRSZXF1ZXN0KSB7XG4gICAgICAgIGlmIChuZXdSZXF1ZXN0LnZhbHVlLnJvd0luZGV4IDwgb2xkUmVxdWVzdC52YWx1ZS5yb3dJbmRleCkge1xuICAgICAgICAgIHJldHVybiBuZXdSZXF1ZXN0O1xuICAgICAgICB9XG4gICAgICAgIG5ld1JlcXVlc3QudmFsdWUucm93SW5kZXggKz0gMTtcbiAgICAgICAgcmV0dXJuIG5ld1JlcXVlc3Q7XG4gICAgICB9LFxuICAgICAgZGVsZXRlUm93OiBmdW5jdGlvbiAobmV3UmVxdWVzdCwgb2xkUmVxdWVzdCkge1xuICAgICAgICBpZiAobmV3UmVxdWVzdC52YWx1ZS5yb3dJbmRleCAhPT0gb2xkUmVxdWVzdC52YWx1ZS5yb3dJbmRleCkge1xuICAgICAgICAgIHJldHVybiBuZXdSZXF1ZXN0O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBvdC5tYXJrQXNOb09wKG5ld1JlcXVlc3QpO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICByZXR1cm4gZnVuY3Rpb24gKG9wZWFyaW9uVHJhbnNmb3JtYXRpb24pIHtcbiAgICBvdCA9IG9wZWFyaW9uVHJhbnNmb3JtYXRpb247XG4gICAgb3Quc2V0RXhlY3V0ZUFjdGlvbnMoZXhlY3V0ZUFjdGlvbnMpO1xuICAgIG90LnNldFRyYW5zZm9ybWF0aW9uTWF0cml4KHRyYW5zZm9ybWF0aW9uTWF0cml4KTtcbiAgfTtcbn0oKSk7XG5cbm1vZHVsZS5leHBvcnRzID0gdGFibGVDaGFuZ2VSdWxlczsiLCIndXNlIHN0cmljdCc7XG5cbnZhciBUYWJsZUFjdGlvbnMgPSByZXF1aXJlKCcuLi9hY3Rpb25zL1RhYmxlQWN0aW9ucycpO1xudmFyIE9UID0gcmVxdWlyZSgnLi4vb3Qvb3QuanMnKTtcbnZhciB0YWJsZUNoYW5nZVJ1bGVzID0gcmVxdWlyZSgnLi4vb3QvdGFibGVDaGFuZ2UuanMnKTtcbnZhciBzb2NrZXQsIG90O1xuXG5jbGFzcyBUYWJsZVN0b3JlIGV4dGVuZHMgR0xVLlN0b3JlIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMuaW5pdCgpO1xuXG4gICAgdGhpcy5iaW5kQWN0aW9ucyhcbiAgICAgIFRhYmxlQWN0aW9ucy5VUERBVEVfQ0VMTCwgdGhpcy51cGRhdGVDZWxsLCBbXSxcbiAgICAgIFRhYmxlQWN0aW9ucy5BRERfUk9XLCB0aGlzLnVwZGF0ZVJvdywgW10sXG4gICAgICBUYWJsZUFjdGlvbnMuREVMRVRFX1JPVywgdGhpcy5kZWxldGVSb3csIFtdLFxuICAgICAgVGFibGVBY3Rpb25zLlVTRVJfQ0hBTkdFX1BPU0lUSU9OLCB0aGlzLnVzZXJDaGFuZ2VQb3NpdGlvbiwgW11cbiAgICApO1xuICB9XG5cbiAgaW5pdCgpIHtcbiAgICBzb2NrZXQgPSBuZXcgV2ViU29ja2V0KCd3czovL2xvY2FsaG9zdDo4MDgwJywgJ3Byb3RvY29sT25lJyk7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIHZhciBlbWl0Q2hhbmdlID0gZnVuY3Rpb24gKCkge1xuICAgICAgc2VsZi5lbWl0Q2hhbmdlKCk7XG4gICAgfTtcblxuICAgIG90ID0gbmV3IE9UKHtcbiAgICAgIG9uSW5pdDogZW1pdENoYW5nZSxcbiAgICAgIG9uVXNlclBvc2l0aW9uQ2hhbmdlOiBlbWl0Q2hhbmdlXG4gICAgfSk7XG4gICAgdGFibGVDaGFuZ2VSdWxlcyhvdCk7XG5cbiAgICBvdC5vbk1vZGVsQ2hhbmdlKFRhYmxlQWN0aW9ucy5VUERBVEVfQ0VMTCwgZW1pdENoYW5nZSk7XG4gICAgb3Qub25Nb2RlbENoYW5nZShUYWJsZUFjdGlvbnMuQUREX1JPVywgZW1pdENoYW5nZSk7XG4gICAgb3Qub25Nb2RlbENoYW5nZShUYWJsZUFjdGlvbnMuREVMRVRFX1JPVywgZW1pdENoYW5nZSk7XG5cbiAgICBzb2NrZXQub25tZXNzYWdlID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICBvdC5wcm9jZXNzUmVxdWVzdChldmVudC5kYXRhKTtcbiAgICB9O1xuICB9XG5cbiAgZ2V0IGRhdGEoKSB7XG4gICAgcmV0dXJuIG90LmdldERhdGEoKTtcbiAgfVxuXG4gIGdldCB1c2Vyc1Bvc2l0aW9uKCkge1xuICAgIHJldHVybiBvdC5nZXRVc2Vyc1Bvc3Rpb24oKTtcbiAgfVxuXG4gIHRyaWdnZXJSZXF1ZXN0KGFjdGlvbiwgcGF5bG9hZCkge1xuICAgIHZhciBtZXNzYWdlID0gb3QuY3JlYXRlTWVzc2FnZShhY3Rpb24sIHBheWxvYWQpO1xuICAgIHZhciByZXF1ZXN0ID0gSlNPTi5wYXJzZShtZXNzYWdlKTtcbiAgICBvdC5leGVjdXRlKHJlcXVlc3QpO1xuICAgIHNvY2tldC5zZW5kKG1lc3NhZ2UpO1xuICAgIHRoaXMuZW1pdENoYW5nZSgpO1xuICB9XG5cbiAgdXBkYXRlQ2VsbChwYXlsb2FkKSB7XG4gICAgdGhpcy50cmlnZ2VyUmVxdWVzdChUYWJsZUFjdGlvbnMuVVBEQVRFX0NFTEwsIHBheWxvYWQpO1xuICB9XG5cbiAgdXBkYXRlUm93KHBheWxvYWQpIHtcbiAgICB0aGlzLnRyaWdnZXJSZXF1ZXN0KFRhYmxlQWN0aW9ucy5BRERfUk9XLCBwYXlsb2FkKTtcbiAgfVxuXG4gIGRlbGV0ZVJvdyhwYXlsb2FkKSB7XG4gICAgdGhpcy50cmlnZ2VyUmVxdWVzdChUYWJsZUFjdGlvbnMuREVMRVRFX1JPVywgcGF5bG9hZCk7XG4gIH1cblxuICB1c2VyQ2hhbmdlUG9zaXRpb24ocGF5bG9hZCkge1xuICAgIHRoaXMudHJpZ2dlclJlcXVlc3QoVGFibGVBY3Rpb25zLlVTRVJfQ0hBTkdFX1BPU0lUSU9OLCBwYXlsb2FkKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IG5ldyBUYWJsZVN0b3JlKCk7Il19
