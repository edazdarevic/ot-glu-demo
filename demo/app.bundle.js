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
  DELETE_ROW: "deleteRow"
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
    this.props.updateCell(this.props.rowIndex, this.props.columnIndex, e.target.value, true);
  },
  onChange: function onChange(e) {
    this.props.updateCell(this.props.rowIndex, this.props.columnIndex, e.target.value);
  },
  render: function render() {
    return React.createElement(
      "td",
      null,
      React.createElement("input", { type: "text",
        value: this.props.value,
        ref: "value",
        onChange: this.onChange,
        onBlur: this.onBlur })
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
  }

  _inherits(GridController, _GLU$ViewController);

  _createClass(GridController, {
    onStoreChange: {
      value: function onStoreChange() {
        console.log(TableStore.data);
        this.view.data = TableStore.data;
      }
    },
    onCellUpdate: {
      value: function onCellUpdate(payload) {
        TableActionCreator.updateCell(payload);
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

var data, view;
var GridViewReact = require("./GridViewReact.js");

var GridView = (function (_GLU$View) {
  function GridView(root, selector) {
    _classCallCheck(this, GridView);

    _get(Object.getPrototypeOf(GridView.prototype), "constructor", this).call(this, root, selector);

    data = [];
    view = this;
  }

  _inherits(GridView, _GLU$View);

  _createClass(GridView, {
    render: {
      value: function render() {
        React.render(React.createElement(GridViewReact, { data: data, view: view }), this.el);
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
  updateCell: function updateCell(rowIndex, columnIndex, value, comit) {
    this.props.data[rowIndex][columnIndex] = value;
    this.setState({ data: this.props.data });
    if (comit) {
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

    this.bindActions(TableActions.UPDATE_CELL, this.updateCell, [], TableActions.ADD_ROW, this.updateRow, [], TableActions.DELETE_ROW, this.deleteRow, []);
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
          onInit: emitChange
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
    triggerRequest: {
      value: function triggerRequest(message) {
        var request = JSON.parse(message);
        ot.execute(request);
        socket.send(message);
      }
    },
    updateCell: {
      value: function updateCell(payload) {
        var message = ot.createMessage(TableActions.UPDATE_CELL, payload);
        this.triggerRequest(message);
        this.emitChange();
      }
    },
    updateRow: {
      value: function updateRow(payload) {
        var message = ot.createMessage(TableActions.ADD_ROW, payload);
        this.triggerRequest(message);
        this.emitChange();
      }
    },
    deleteRow: {
      value: function deleteRow(payload) {
        var message = ot.createMessage(TableActions.DELETE_ROW, payload);
        this.triggerRequest(message);
        this.emitChange();
      }
    }
  });

  return TableStore;
})(GLU.Store);

module.exports = new TableStore();

},{"../actions/TableActions":"/home/dugokontov/projects/operation-transformation/app/actions/TableActions.js","../ot/ot.js":"/home/dugokontov/projects/operation-transformation/app/ot/ot.js","../ot/tableChange.js":"/home/dugokontov/projects/operation-transformation/app/ot/tableChange.js"}]},{},["/home/dugokontov/projects/operation-transformation/app/app.js"])("/home/dugokontov/projects/operation-transformation/app/app.js")
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi9hcHAvYWN0aW9ucy9UYWJsZUFjdGlvbkNyZWF0b3IuanMiLCIuLi9hcHAvYWN0aW9ucy9UYWJsZUFjdGlvbnMuanMiLCIuLi9hcHAvYXBwLmpzIiwiLi4vYXBwL2NvbXBvbmVudHMvZ3JpZC9DZWxsVmlld1JlYWN0LmpzIiwiLi4vYXBwL2NvbXBvbmVudHMvZ3JpZC9HcmlkQ29udHJvbGxlci5qcyIsIi4uL2FwcC9jb21wb25lbnRzL2dyaWQvR3JpZFZpZXcuanMiLCIuLi9hcHAvY29tcG9uZW50cy9ncmlkL0dyaWRWaWV3UmVhY3QuanMiLCIuLi9hcHAvY29tcG9uZW50cy9ncmlkL1Jvd1ZpZXdSZWFjdC5qcyIsIi4uL2FwcC9jb21wb25lbnRzL2dyaWRBY3Rpb25zL0dyaWRBY3Rpb25zQ29udHJvbGxlci5qcyIsIi4uL2FwcC9jb21wb25lbnRzL2dyaWRBY3Rpb25zL0dyaWRBY3Rpb25zVmlldy5qcyIsIi4uL2FwcC9jb21wb25lbnRzL2dyaWRBY3Rpb25zL0dyaWRBY3Rpb25zVmlld1JlYWN0LmpzIiwiLi4vYXBwL290L290LmpzIiwiLi4vYXBwL290L3RhYmxlQ2hhbmdlLmpzIiwiLi4vYXBwL3N0b3Jlcy9UYWJsZVN0b3JlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUEsWUFBWSxDQUFDOzs7Ozs7QUFFYixJQUFJLFlBQVksR0FBRyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsQ0FBQzs7SUFFdkMsa0JBQWtCO1dBQWxCLGtCQUFrQjswQkFBbEIsa0JBQWtCOzs7ZUFBbEIsa0JBQWtCO0FBQ2YsY0FBVTthQUFBLG9CQUFDLE9BQU8sRUFBRTtBQUN6QixXQUFHLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsV0FBVyxFQUFFLE9BQU8sQ0FBQyxDQUFDO09BQ3ZEOztBQUNNLFVBQU07YUFBQSxn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LENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO09BQ3RCOztBQUVELGNBQVU7YUFBQSxvQkFBQyxPQUFPLEVBQUU7QUFDbEIsWUFBSSxPQUFPLEdBQUcsRUFBRSxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUMsV0FBVyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0FBQ2xFLFlBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDN0IsWUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO09BQ25COztBQUVELGFBQVM7YUFBQSxtQkFBQyxPQUFPLEVBQUU7QUFDakIsWUFBSSxPQUFPLEdBQUcsRUFBRSxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0FBQzlELFlBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDN0IsWUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO09BQ25COztBQUVELGFBQVM7YUFBQSxtQkFBQyxPQUFPLEVBQUU7QUFDakIsWUFBSSxPQUFPLEdBQUcsRUFBRSxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUMsVUFBVSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0FBQ2pFLFlBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDN0IsWUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO09BQ25COzs7O1NBNURHLFVBQVU7R0FBUyxHQUFHLENBQUMsS0FBSzs7QUErRGxDLE1BQU0sQ0FBQyxPQUFPLEdBQUcsSUFBSSxVQUFVLEVBQUUsQ0FBQyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIndXNlIHN0cmljdCc7XG5cbnZhciBUYWJsZUFjdGlvbnMgPSByZXF1aXJlKCcuL1RhYmxlQWN0aW9ucycpO1xuXG5jbGFzcyBUYWJsZUFjdGlvbkNyZWF0b3Ige1xuICBzdGF0aWMgdXBkYXRlQ2VsbChwYXlsb2FkKSB7XG4gICAgR0xVLmJ1cy5lbWl0QWN0aW9uKFRhYmxlQWN0aW9ucy5VUERBVEVfQ0VMTCwgcGF5bG9hZCk7XG4gIH1cbiAgc3RhdGljIGFkZFJvdyhwYXlsb2FkKSB7XG4gICAgR0xVLmJ1cy5lbWl0QWN0aW9uKFRhYmxlQWN0aW9ucy5BRERfUk9XLCBwYXlsb2FkKTtcbiAgfVxuICBzdGF0aWMgZGVsZXRlUm93KHBheWxvYWQpIHtcbiAgICBHTFUuYnVzLmVtaXRBY3Rpb24oVGFibGVBY3Rpb25zLkRFTEVURV9ST1csIHBheWxvYWQpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gVGFibGVBY3Rpb25DcmVhdG9yOyIsIid1c2Ugc3RyaWN0JztcblxudmFyIFRhYmxlQWN0aW9ucyA9IHtcbiAgVVBEQVRFX0NFTEw6ICd1cGRhdGVDZWxsJyxcbiAgQUREX1JPVzogJ2FkZFJvdycsXG4gIERFTEVURV9ST1c6ICdkZWxldGVSb3cnXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFRhYmxlQWN0aW9uczsiLCIndXNlIHN0cmljdCc7XG5cbnZhciBHcmlkVmlldyA9IHJlcXVpcmUoJy4vY29tcG9uZW50cy9ncmlkL0dyaWRWaWV3Jyk7XG52YXIgR3JpZENvbnRyb2xsZXIgPSByZXF1aXJlKCcuL2NvbXBvbmVudHMvZ3JpZC9HcmlkQ29udHJvbGxlcicpO1xuXG52YXIgR3JpZEFjdGlvbnNWaWV3ID0gcmVxdWlyZSgnLi9jb21wb25lbnRzL2dyaWRBY3Rpb25zL0dyaWRBY3Rpb25zVmlldycpO1xudmFyIEdyaWRBY3Rpb25zQ29udHJvbGxlciA9IHJlcXVpcmUoJy4vY29tcG9uZW50cy9ncmlkQWN0aW9ucy9HcmlkQWN0aW9uc0NvbnRyb2xsZXInKTtcblxudmFyIEFwcCA9IHtcbiAgaW5pdDogZnVuY3Rpb24gKCkge1xuICAgIHZhciBncmlkVmlldyA9IG5ldyBHcmlkVmlldyhkb2N1bWVudC5ib2R5LCAnI2dyaWQnKTtcbiAgICBuZXcgR3JpZENvbnRyb2xsZXIoZ3JpZFZpZXcpO1xuXG4gICAgdmFyIGFjdGlvblZpZXcgPSBuZXcgR3JpZEFjdGlvbnNWaWV3KGRvY3VtZW50LmJvZHksICcjYWN0aW9ucycpO1xuICAgIG5ldyBHcmlkQWN0aW9uc0NvbnRyb2xsZXIoYWN0aW9uVmlldyk7XG5cbiAgICBncmlkVmlldy5yZW5kZXIoKTtcbiAgICBhY3Rpb25WaWV3LnJlbmRlcigpO1xuICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IEFwcDsiLCIndXNlIHN0cmljdCc7XG5cbnZhciBDZWxsVmlld1JlYWN0ID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICBvbkJsdXIoZSk6IGFueSB7XG4gICAgdGhpcy5wcm9wcy51cGRhdGVDZWxsKHRoaXMucHJvcHMucm93SW5kZXgsIHRoaXMucHJvcHMuY29sdW1uSW5kZXgsIGUudGFyZ2V0LnZhbHVlLCB0cnVlKTtcbiAgfSxcbiAgb25DaGFuZ2UoZSk6YW55IHtcbiAgICB0aGlzLnByb3BzLnVwZGF0ZUNlbGwodGhpcy5wcm9wcy5yb3dJbmRleCwgdGhpcy5wcm9wcy5jb2x1bW5JbmRleCwgZS50YXJnZXQudmFsdWUpO1xuICB9LFxuICByZW5kZXIoKTogYW55IHtcbiAgICByZXR1cm4gPHRkPlxuICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgdmFsdWU9e3RoaXMucHJvcHMudmFsdWV9XG4gICAgICAgIHJlZj1cInZhbHVlXCJcbiAgICAgICAgb25DaGFuZ2U9e3RoaXMub25DaGFuZ2V9XG4gICAgICAgIG9uQmx1cj17dGhpcy5vbkJsdXJ9Lz5cbiAgICA8L3RkPjtcbiAgfVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gQ2VsbFZpZXdSZWFjdDsiLCIndXNlIHN0cmljdCc7XG52YXIgVGFibGVBY3Rpb25zID0gcmVxdWlyZSgnLi4vLi4vYWN0aW9ucy9UYWJsZUFjdGlvbnMuanMnKTtcbnZhciBUYWJsZUFjdGlvbkNyZWF0b3IgPSByZXF1aXJlKCcuLi8uLi9hY3Rpb25zL1RhYmxlQWN0aW9uQ3JlYXRvci5qcycpO1xudmFyIFRhYmxlU3RvcmUgPSByZXF1aXJlKCcuLi8uLi9zdG9yZXMvVGFibGVTdG9yZS5qcycpO1xuXG5jbGFzcyBHcmlkQ29udHJvbGxlciBleHRlbmRzIEdMVS5WaWV3Q29udHJvbGxlciB7XG4gIGNvbnN0cnVjdG9yKHZpZXcpIHtcbiAgICBzdXBlcih2aWV3KTtcblxuICAgIFRhYmxlU3RvcmUub25DaGFuZ2UodGhpcy5vblN0b3JlQ2hhbmdlLCB0aGlzKTtcblxuICAgIHRoaXMudmlldy5vbihUYWJsZUFjdGlvbnMuVVBEQVRFX0NFTEwsIHRoaXMub25DZWxsVXBkYXRlKTtcbiAgfVxuXG4gIG9uU3RvcmVDaGFuZ2UoKSB7XG4gICAgY29uc29sZS5sb2coVGFibGVTdG9yZS5kYXRhKTtcbiAgICB0aGlzLnZpZXcuZGF0YSA9IFRhYmxlU3RvcmUuZGF0YTtcbiAgfVxuXG4gIG9uQ2VsbFVwZGF0ZShwYXlsb2FkKSB7XG4gICAgVGFibGVBY3Rpb25DcmVhdG9yLnVwZGF0ZUNlbGwocGF5bG9hZCk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBHcmlkQ29udHJvbGxlcjsiLCIndXNlIHN0cmljdCc7XG5cbnZhciBkYXRhLCB2aWV3O1xudmFyIEdyaWRWaWV3UmVhY3QgPSByZXF1aXJlKCcuL0dyaWRWaWV3UmVhY3QuanMnKTtcblxuY2xhc3MgR3JpZFZpZXcgZXh0ZW5kcyBHTFUuVmlldyB7XG4gIGNvbnN0cnVjdG9yKHJvb3QsIHNlbGVjdG9yKSB7XG4gICAgc3VwZXIocm9vdCwgc2VsZWN0b3IpO1xuXG4gICAgZGF0YSA9IFtdO1xuICAgIHZpZXcgPSB0aGlzO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIFJlYWN0LnJlbmRlcig8R3JpZFZpZXdSZWFjdCBkYXRhPXtkYXRhfSB2aWV3PXt2aWV3fSAvPixcbiAgICAgIHRoaXMuZWwpO1xuICB9XG4gIGdldCBkYXRhKCkge1xuICAgIHJldHVybiBkYXRhO1xuICB9XG5cbiAgc2V0IGRhdGEoZCkge1xuICAgIGRhdGEgPSBkO1xuICAgIHRoaXMucmVuZGVyKCk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBHcmlkVmlldzsiLCIndXNlIHN0cmljdCc7XG5cbnZhciBSb3dWaWV3UmVhY3QgPSByZXF1aXJlKCcuL1Jvd1ZpZXdSZWFjdC5qcycpO1xudmFyIFRhYmxlQWN0aW9ucyA9IHJlcXVpcmUoJy4uLy4uL2FjdGlvbnMvVGFibGVBY3Rpb25zLmpzJyk7XG5cbnZhciBHcmlkVmlld1JlYWN0ID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICBnZXRJbml0aWFsU3RhdGUoKTogYW55IHtcbiAgICByZXR1cm4ge2RhdGE6IHRoaXMucHJvcHMuZGF0YX07XG4gIH0sXG4gIHVwZGF0ZUNlbGwocm93SW5kZXgsIGNvbHVtbkluZGV4LCB2YWx1ZSwgY29taXQpOiBhbnkge1xuICAgIHRoaXMucHJvcHMuZGF0YVtyb3dJbmRleF1bY29sdW1uSW5kZXhdID0gdmFsdWU7XG4gICAgdGhpcy5zZXRTdGF0ZSh7ZGF0YTogdGhpcy5wcm9wcy5kYXRhfSk7XG4gICAgaWYgKGNvbWl0KSB7XG4gICAgICB0aGlzLnByb3BzLnZpZXcuZW1pdChUYWJsZUFjdGlvbnMuVVBEQVRFX0NFTEwsIHtcbiAgICAgICAgcm93SW5kZXg6IHJvd0luZGV4LFxuICAgICAgICBjb2x1bW5JbmRleDogY29sdW1uSW5kZXgsXG4gICAgICAgIHZhbHVlOiB2YWx1ZVxuICAgICAgfSk7XG4gICAgfVxuICB9LFxuICByZW5kZXIoKTogYW55IHtcbiAgICB2YXIgaGVhZGVycyA9IFtdO1xuICAgIHZhciByb3dzID0gW107XG4gICAgaWYgKHRoaXMucHJvcHMuZGF0YVswXSkge1xuICAgICAgaGVhZGVycyA9IHRoaXMucHJvcHMuZGF0YVswXS5tYXAoKG5hbWUsIGluZGV4KSA9PiA8dGg+Q29sIHtpbmRleCArIDF9PC90aD4pO1xuICAgICAgcm93cyA9IHRoaXMucHJvcHMuZGF0YS5tYXAoKHJvdywgaW5kZXgpID0+IDxSb3dWaWV3UmVhY3RcbiAgICAgICAgcm93PXtyb3d9XG4gICAgICAgIGtleT17aW5kZXh9XG4gICAgICAgIHJvd0luZGV4PXtpbmRleH1cbiAgICAgICAgdXBkYXRlQ2VsbD17dGhpcy51cGRhdGVDZWxsfS8+KTtcbiAgICB9XG4gICAgcmV0dXJuIDx0YWJsZT5cbiAgICAgIDx0aGVhZD5cbiAgICAgICAgPHRyPntoZWFkZXJzfTwvdHI+XG4gICAgICA8L3RoZWFkPlxuICAgICAgPHRib2R5PlxuICAgICAgICB7cm93c31cbiAgICAgIDwvdGJvZHk+XG4gICAgPC90YWJsZT47XG4gIH1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEdyaWRWaWV3UmVhY3Q7IiwiJ3VzZSBzdHJpY3QnO1xudmFyIENlbGxWaWV3UmVhY3QgPSByZXF1aXJlKCcuL0NlbGxWaWV3UmVhY3QuanMnKTtcblxudmFyIFJvd1ZpZXdSZWFjdCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgcmVuZGVyKCk6IGFueSB7XG4gICAgdmFyIGNlbGxzID0gW107XG4gICAgaWYgKHRoaXMucHJvcHMucm93Lmxlbmd0aCkge1xuICAgICAgY2VsbHMgPSB0aGlzLnByb3BzLnJvdy5tYXAoKGNlbGwsIGluZGV4KSA9PiA8Q2VsbFZpZXdSZWFjdFxuICAgICAgICB2YWx1ZT17Y2VsbH1cbiAgICAgICAga2V5PXtpbmRleH1cbiAgICAgICAgY29sdW1uSW5kZXg9e2luZGV4fVxuICAgICAgICByb3dJbmRleD17dGhpcy5wcm9wcy5yb3dJbmRleH1cbiAgICAgICAgdXBkYXRlQ2VsbD17dGhpcy5wcm9wcy51cGRhdGVDZWxsfS8+KTtcbiAgICB9XG4gICAgcmV0dXJuIDx0cj57Y2VsbHN9PC90cj47XG4gIH1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFJvd1ZpZXdSZWFjdDsiLCIndXNlIHN0cmljdCc7XG52YXIgVGFibGVBY3Rpb25zID0gcmVxdWlyZSgnLi4vLi4vYWN0aW9ucy9UYWJsZUFjdGlvbnMuanMnKTtcbnZhciBUYWJsZUFjdGlvbkNyZWF0b3IgPSByZXF1aXJlKCcuLi8uLi9hY3Rpb25zL1RhYmxlQWN0aW9uQ3JlYXRvci5qcycpO1xuXG5jbGFzcyBHcmlkQWN0aW9uc0NvbnRyb2xsZXIgZXh0ZW5kcyBHTFUuVmlld0NvbnRyb2xsZXIge1xuICBjb25zdHJ1Y3Rvcih2aWV3KSB7XG4gICAgc3VwZXIodmlldyk7XG5cbiAgICB0aGlzLnZpZXcub24oVGFibGVBY3Rpb25zLkFERF9ST1csIHRoaXMuYWRkUm93KTtcbiAgICB0aGlzLnZpZXcub24oVGFibGVBY3Rpb25zLkRFTEVURV9ST1csIHRoaXMuZGVsZXRlUm93KTtcbiAgfVxuXG4gIGFkZFJvdyhwYXlsb2FkKSB7XG4gICAgVGFibGVBY3Rpb25DcmVhdG9yLmFkZFJvdyhwYXlsb2FkKTtcbiAgfVxuXG4gIGRlbGV0ZVJvdyhwYXlsb2FkKSB7XG4gICAgVGFibGVBY3Rpb25DcmVhdG9yLmRlbGV0ZVJvdyhwYXlsb2FkKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEdyaWRBY3Rpb25zQ29udHJvbGxlcjsiLCIndXNlIHN0cmljdCc7XG5cbnZhciB2aWV3O1xudmFyIEdyaWRBY3Rpb25zVmlld1JlYWN0ID0gcmVxdWlyZSgnLi9HcmlkQWN0aW9uc1ZpZXdSZWFjdC5qcycpO1xuXG5jbGFzcyBHcmlkVmlldyBleHRlbmRzIEdMVS5WaWV3IHtcbiAgY29uc3RydWN0b3Iocm9vdCwgc2VsZWN0b3IpIHtcbiAgICBzdXBlcihyb290LCBzZWxlY3Rvcik7XG4gICAgdmlldyA9IHRoaXM7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgUmVhY3QucmVuZGVyKDxHcmlkQWN0aW9uc1ZpZXdSZWFjdCB2aWV3PXt2aWV3fSAvPixcbiAgICAgIHRoaXMuZWwpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gR3JpZFZpZXc7IiwiJ3VzZSBzdHJpY3QnO1xudmFyIFRhYmxlQWN0aW9ucyA9IHJlcXVpcmUoJy4uLy4uL2FjdGlvbnMvVGFibGVBY3Rpb25zLmpzJyk7XG5cbnZhciBHcmlkVmlld1JlYWN0ID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICBhZGRSb3coKTogYW55IHtcbiAgICB0aGlzLnByb3BzLnZpZXcuZW1pdChUYWJsZUFjdGlvbnMuQUREX1JPVywge1xuICAgICAgcm93SW5kZXg6ICtSZWFjdC5maW5kRE9NTm9kZSh0aGlzLnJlZnMucm93UG9zaXRpb24pLnZhbHVlLnRyaW0oKVxuICAgIH0pO1xuICB9LFxuICBkZWxldGVSb3coKTogYW55IHtcbiAgICB0aGlzLnByb3BzLnZpZXcuZW1pdChUYWJsZUFjdGlvbnMuREVMRVRFX1JPVywge1xuICAgICAgcm93SW5kZXg6ICtSZWFjdC5maW5kRE9NTm9kZSh0aGlzLnJlZnMucm93UG9zaXRpb24pLnZhbHVlLnRyaW0oKVxuICAgIH0pO1xuICB9LFxuICByZW5kZXIoKTogYW55IHtcbiAgICByZXR1cm4gPGRpdj5cbiAgICAgIDxidXR0b24gb25DbGljaz17dGhpcy5hZGRSb3d9PkFkZCBuZXcgcm93PC9idXR0b24+XG4gICAgICA8YnV0dG9uIG9uQ2xpY2s9e3RoaXMuZGVsZXRlUm93fT5SZW1vdmUgcm93PC9idXR0b24+XG4gICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBkZWZhdWx0VmFsdWU9XCIxXCIgcmVmPVwicm93UG9zaXRpb25cIiAvPlxuICAgIDwvZGl2PjtcbiAgfVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gR3JpZFZpZXdSZWFjdDsiLCIvKmpzaGludCBkZXZlbDp0cnVlKi9cbi8qZ2xvYmFsIE9UOnRydWUqL1xuJ3VzZSBzdHJpY3QnO1xudmFyIE9UID0gKGZ1bmN0aW9uICgpIHtcbiAgdmFyIHByaW9yaXR5LCBkYXRhO1xuICB2YXIgc3RhdGVzID0gW107XG4gIHZhciBsb2cgPSBbXTtcbiAgdmFyIGV4ZWN1dGVBY3Rpb25zID0ge307XG4gIHZhciB0cmFuc2Zvcm1hdGlvbk1hdHJpeCA9IHt9O1xuICB2YXIgb3B0aW9ucztcbiAgdmFyIG9uTW9kZWxDaGFuZ2VFdmVudHMgPSB7fTtcblxuICB2YXIgT1QgPSBmdW5jdGlvbiAobykge1xuICAgIG9wdGlvbnMgPSBvIHx8IHt9O1xuICB9O1xuXG4gIE9ULnByb3RvdHlwZS5zZXREYXRhID0gZnVuY3Rpb24gKGQpIHtcbiAgICBkYXRhID0gZDtcbiAgfTtcblxuICBPVC5wcm90b3R5cGUuZ2V0RGF0YSA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gZGF0YTtcbiAgfTtcblxuICBPVC5wcm90b3R5cGUuc2V0U3RhdGVzID0gZnVuY3Rpb24gKHMpIHtcbiAgICBzdGF0ZXMgPSBzO1xuICB9O1xuXG4gIE9ULnByb3RvdHlwZS5nZXRQcmlvcml0eSA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gcHJpb3JpdHk7XG4gIH07XG5cbiAgT1QucHJvdG90eXBlLnNldEV4ZWN1dGVBY3Rpb25zID0gZnVuY3Rpb24gKGFjdGlvbnMpIHtcbiAgICBleGVjdXRlQWN0aW9ucyA9IGFjdGlvbnM7XG4gIH07XG5cbiAgT1QucHJvdG90eXBlLnNldFRyYW5zZm9ybWF0aW9uTWF0cml4ID0gZnVuY3Rpb24gKG1hdHJpeCkge1xuICAgIHRyYW5zZm9ybWF0aW9uTWF0cml4ID0gbWF0cml4O1xuICB9O1xuXG4gIE9ULnByb3RvdHlwZS5jcmVhdGVNZXNzYWdlID0gZnVuY3Rpb24gKGFjdGlvbiwgdmFsdWUpIHtcbiAgICB2YXIganNvbiA9IHtcbiAgICAgIGFjdGlvbjogYWN0aW9uLFxuICAgICAgc3RhdGVzOiBzdGF0ZXMsXG4gICAgICBwcmlvcml0eTogcHJpb3JpdHksXG4gICAgICB2YWx1ZTogdmFsdWVcbiAgICB9O1xuICAgIHJldHVybiBKU09OLnN0cmluZ2lmeShqc29uKTtcbiAgfTtcblxuICBPVC5wcm90b3R5cGUub25Nb2RlbENoYW5nZSA9IGZ1bmN0aW9uIChhY3Rpb24sIGNhbGxiYWNrKSB7XG4gICAgaWYgKHR5cGVvZiBjYWxsYmFjayAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgdGhyb3cgJ0NhbGxiYWNrIGhhcyB0byBiZSBhIGZ1bmN0aW9uJztcbiAgICB9XG4gICAgaWYgKCFvbk1vZGVsQ2hhbmdlRXZlbnRzW2FjdGlvbl0pIHtcbiAgICAgIG9uTW9kZWxDaGFuZ2VFdmVudHNbYWN0aW9uXSA9IFtdO1xuICAgIH1cbiAgICBvbk1vZGVsQ2hhbmdlRXZlbnRzW2FjdGlvbl0ucHVzaChjYWxsYmFjayk7XG4gIH07XG5cbiAgdmFyIGV4ZWN1dGUgPSBmdW5jdGlvbiAocmVxdWVzdCkge1xuICAgIHZhciBhY3Rpb24gPSBleGVjdXRlQWN0aW9uc1tyZXF1ZXN0LmFjdGlvbl07XG4gICAgaWYgKGFjdGlvbikge1xuICAgICAgYWN0aW9uKHJlcXVlc3QpO1xuICAgIH1cbiAgICB2YXIgb25Nb2RlbENoYW5nZUNhbGxiYWNrID0gb25Nb2RlbENoYW5nZUV2ZW50c1tyZXF1ZXN0LmFjdGlvbl07XG4gICAgaWYgKG9uTW9kZWxDaGFuZ2VDYWxsYmFjaykge1xuICAgICAgb25Nb2RlbENoYW5nZUNhbGxiYWNrLmZvckVhY2goZnVuY3Rpb24gKGNhbGxiYWNrKSB7XG4gICAgICAgIGNhbGxiYWNrKHJlcXVlc3QpO1xuICAgICAgfSk7XG4gICAgfVxuICAgIHN0YXRlc1tyZXF1ZXN0LnByaW9yaXR5XSArPSAxO1xuICAgIGxvZy5wdXNoKHJlcXVlc3QpO1xuICB9O1xuXG4gIE9ULnByb3RvdHlwZS5leGVjdXRlID0gZXhlY3V0ZTtcblxuICBPVC5wcm90b3R5cGUubWFya0FzTm9PcCA9IGZ1bmN0aW9uIChyZXF1ZXN0KSB7XG4gICAgcmVxdWVzdC5vcmlnaW5hbEFjdGlvbiA9IHJlcXVlc3QuYWN0aW9uO1xuICAgIHJlcXVlc3QuYWN0aW9uID0gJ25vLW9wJztcbiAgICByZXR1cm4gcmVxdWVzdDtcbiAgfTtcblxuICB2YXIgY29tcGFyZVN0YXRlID0gZnVuY3Rpb24gKHJlcXVlc3RTdGF0ZSwgY3VycmVudFN0YXRlKSB7XG4gICAgdmFyIHNob3VsZFRyYW5zZm9ybSA9IGZhbHNlO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY3VycmVudFN0YXRlLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICBpZiAoY3VycmVudFN0YXRlW2ldID09PSByZXF1ZXN0U3RhdGVbaV0pIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICBpZiAoY3VycmVudFN0YXRlW2ldID4gcmVxdWVzdFN0YXRlW2ldKSB7XG4gICAgICAgIHNob3VsZFRyYW5zZm9ybSA9IHRydWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gMTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIChzaG91bGRUcmFuc2Zvcm0pID8gLTEgOiAwO1xuICB9O1xuXG4gIHZhciB0cmFuc2Zvcm0gPSBmdW5jdGlvbiAobmV3UmVxdWVzdCwgb2xkUmVxdWVzdCkge1xuICAgIGlmIChuZXdSZXF1ZXN0ICYmIHRyYW5zZm9ybWF0aW9uTWF0cml4W25ld1JlcXVlc3QuYWN0aW9uXSAmJiB0cmFuc2Zvcm1hdGlvbk1hdHJpeFtuZXdSZXF1ZXN0LmFjdGlvbl1bb2xkUmVxdWVzdC5hY3Rpb25dKSB7XG4gICAgICByZXR1cm4gdHJhbnNmb3JtYXRpb25NYXRyaXhbbmV3UmVxdWVzdC5hY3Rpb25dW29sZFJlcXVlc3QuYWN0aW9uXShuZXdSZXF1ZXN0LCBvbGRSZXF1ZXN0KTtcbiAgICB9XG4gICAgcmV0dXJuIG5ld1JlcXVlc3Q7XG4gIH07XG5cbiAgT1QucHJvdG90eXBlLnByb2Nlc3NSZXF1ZXN0ID0gZnVuY3Rpb24gKHIpIHtcbiAgICB2YXIgcmVxdWVzdCA9IEpTT04ucGFyc2Uocik7XG4gICAgc3dpdGNoIChyZXF1ZXN0LmFjdGlvbikge1xuICAgIGNhc2UgJ2luaXQnOlxuICAgICAgZGF0YSA9IHJlcXVlc3QudmFsdWUuZGF0YTtcbiAgICAgIHByaW9yaXR5ID0gcmVxdWVzdC52YWx1ZS5wcmlvcml0eTtcbiAgICAgIHN0YXRlcyA9IHJlcXVlc3QudmFsdWUuc3RhdGVzO1xuICAgICAgaWYgKHR5cGVvZiBvcHRpb25zLm9uSW5pdCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBvcHRpb25zLm9uSW5pdChkYXRhKTtcbiAgICAgIH1cbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ25ldy11c2VyJzpcbiAgICAgIHN0YXRlc1tyZXF1ZXN0LnZhbHVlXSA9IDA7XG4gICAgICBpZiAodHlwZW9mIG9wdGlvbnMub25OZXdVc2VyID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIG9wdGlvbnMub25OZXdVc2VyKHJlcXVlc3QpO1xuICAgICAgfVxuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnbm8tb3AnOlxuICAgICAgZXhlY3V0ZShyZXF1ZXN0KTtcbiAgICAgIGJyZWFrO1xuICAgIGRlZmF1bHQ6XG4gICAgICBpZiAocHJpb3JpdHkgIT09IHJlcXVlc3QucHJpb3JpdHkpIHtcbiAgICAgICAgc3dpdGNoIChjb21wYXJlU3RhdGUocmVxdWVzdC5zdGF0ZXMsIHN0YXRlcykpIHtcbiAgICAgICAgY2FzZSAwOlxuICAgICAgICAgIC8vIHdlIGNhbiBleGVjdXRlIHRoaXMgYWN0aW9uIHJpZ2h0IGF3YXlcbiAgICAgICAgICBleGVjdXRlKHJlcXVlc3QpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgLy8gdGhpcyBhY3Rpb24gaGFzIHRvIGJlIHB1dCBpbnRvIHF1ZSwgYW5kIHdhaXQgZm9yIG90aGVyIGFjdGlvbnNcbiAgICAgICAgICAvLyBidXQgc2luY2Ugd2UgdXNlIHdlYiBzb2NrZXQsIHRoaXMgc2hvdWxkbid0IGhhcHBlbiBhbnl3YXlcbiAgICAgICAgICAvLyBxdWUucHVzaChyZXF1ZXN0KTtcbiAgICAgICAgICAvLyBUT0RPOiB3aGVuIHRvIGZpcmUgcXVlP1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIC0xOlxuICAgICAgICAgIC8vIGNyZWF0ZSB0cmFuc2Zvcm1hdGlvbiBmb3IgdGhpcyBhY3Rpb25cbiAgICAgICAgICBmb3IgKHZhciBpID0gbG9nLmxlbmd0aCAtIDE7IGkgPj0gMDsgaSAtPSAxKSB7XG4gICAgICAgICAgICAvLyBmaW5kIGFsbCBsb2dzIHRoYXQgaGFwcGVuZWQgYWZ0ZXIgdGhpcyByZXF1ZXN0IHdhcyBjcmFldGVkXG4gICAgICAgICAgICB2YXIgY29tcGFyZVN0YXRlU3RhdHVzID0gY29tcGFyZVN0YXRlKGxvZ1tpXS5zdGF0ZXMsIHJlcXVlc3Quc3RhdGVzKTtcbiAgICAgICAgICAgIGlmIChjb21wYXJlU3RhdGVTdGF0dXMgPT09IC0xKSB7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICB2YXIgdHJhbnNmb3JtZWRSZXF1ZXN0ID0gcmVxdWVzdDtcbiAgICAgICAgICBmb3IgKHZhciBqID0gaSArIDE7IGogPCBsb2cubGVuZ3RoOyBqICs9IDEpIHtcbiAgICAgICAgICAgIHRyYW5zZm9ybWVkUmVxdWVzdCA9IHRyYW5zZm9ybSh0cmFuc2Zvcm1lZFJlcXVlc3QsIGxvZ1tqXSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGV4ZWN1dGUodHJhbnNmb3JtZWRSZXF1ZXN0KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBjb25zb2xlLmxvZyhyZXF1ZXN0LmFjdGlvbiwgZGF0YSwgc3RhdGVzLCBsb2cpO1xuICB9O1xuXG4gIHJldHVybiBPVDtcbn0oKSk7XG5cbm1vZHVsZS5leHBvcnRzID0gT1Q7IiwiJ3VzZSBzdHJpY3QnO1xudmFyIHRhYmxlQ2hhbmdlUnVsZXMgPSAoZnVuY3Rpb24gKCkge1xuICB2YXIgb3Q7XG5cbiAgdmFyIGV4ZWN1dGVBY3Rpb25zID0ge1xuICAgIHVwZGF0ZUNlbGw6IGZ1bmN0aW9uIChyZXF1ZXN0KSB7XG4gICAgICB2YXIgdmFsdWUgPSByZXF1ZXN0LnZhbHVlO1xuICAgICAgdmFyIGRhdGEgPSBvdC5nZXREYXRhKCk7XG4gICAgICBkYXRhW3ZhbHVlLnJvd0luZGV4XVt2YWx1ZS5jb2x1bW5JbmRleF0gPSByZXF1ZXN0LnZhbHVlLnZhbHVlO1xuICAgIH0sXG4gICAgYWRkUm93OiBmdW5jdGlvbiAocmVxdWVzdCkge1xuICAgICAgdmFyIHZhbHVlID0gcmVxdWVzdC52YWx1ZTtcbiAgICAgIHZhciBkYXRhID0gb3QuZ2V0RGF0YSgpO1xuICAgICAgdmFyIHNvbWVSb3cgPSBkYXRhWzBdIHx8IFtdO1xuICAgICAgdmFyIHJvdyA9IHNvbWVSb3cubWFwKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuICcnO1xuICAgICAgfSk7XG5cbiAgICAgIGRhdGEuc3BsaWNlKHZhbHVlLnJvd0luZGV4LCAwLCByb3cpO1xuICAgIH0sXG4gICAgZGVsZXRlUm93OiBmdW5jdGlvbiAocmVxdWVzdCkge1xuICAgICAgdmFyIHZhbHVlID0gcmVxdWVzdC52YWx1ZTtcbiAgICAgIHZhciBkYXRhID0gb3QuZ2V0RGF0YSgpO1xuICAgICAgZGF0YS5zcGxpY2UodmFsdWUucm93SW5kZXgsIDEpO1xuICAgIH1cbiAgfTtcblxuICB2YXIgdHJhbnNmb3JtYXRpb25NYXRyaXggPSB7XG4gICAgdXBkYXRlQ2VsbDoge1xuICAgICAgdXBkYXRlQ2VsbDogZnVuY3Rpb24gKG5ld1JlcXVlc3QsIG9sZFJlcXVlc3QpIHtcbiAgICAgICAgaWYgKG5ld1JlcXVlc3QudmFsdWUucm93SW5kZXggIT09IG9sZFJlcXVlc3QudmFsdWUucm93SW5kZXggfHwgbmV3UmVxdWVzdC52YWx1ZS5jb2x1bW5JbmRleCAhPT0gb2xkUmVxdWVzdC52YWx1ZS5jb2x1bW5JbmRleCkge1xuICAgICAgICAgIHJldHVybiBuZXdSZXF1ZXN0O1xuICAgICAgICB9XG4gICAgICAgIGlmIChuZXdSZXF1ZXN0LnByaW9yaXR5IDwgb2xkUmVxdWVzdC5wcmlvcml0eSkge1xuICAgICAgICAgIHJldHVybiBuZXdSZXF1ZXN0O1xuICAgICAgICB9XG4gICAgICAgIHZhciB2YWx1ZSA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkob2xkUmVxdWVzdC52YWx1ZSkpO1xuICAgICAgICBuZXdSZXF1ZXN0LnZhbHVlID0gdmFsdWU7XG4gICAgICAgIHJldHVybiBuZXdSZXF1ZXN0O1xuICAgICAgfSxcbiAgICAgIGFkZFJvdzogZnVuY3Rpb24gKG5ld1JlcXVlc3QsIG9sZFJlcXVlc3QpIHtcbiAgICAgICAgaWYgKG5ld1JlcXVlc3QudmFsdWUucm93SW5kZXggPCBvbGRSZXF1ZXN0LnZhbHVlLnJvd0luZGV4KSB7XG4gICAgICAgICAgcmV0dXJuIG5ld1JlcXVlc3Q7XG4gICAgICAgIH1cbiAgICAgICAgbmV3UmVxdWVzdC52YWx1ZS5yb3dJbmRleCArPSAxO1xuICAgICAgICByZXR1cm4gbmV3UmVxdWVzdDtcbiAgICAgIH0sXG4gICAgICBkZWxldGVSb3c6IGZ1bmN0aW9uIChuZXdSZXF1ZXN0LCBvbGRSZXF1ZXN0KSB7XG4gICAgICAgIGlmIChuZXdSZXF1ZXN0LnZhbHVlLnJvd0luZGV4IDwgb2xkUmVxdWVzdC52YWx1ZS5yb3dJbmRleCkge1xuICAgICAgICAgIHJldHVybiBuZXdSZXF1ZXN0O1xuICAgICAgICB9XG4gICAgICAgIGlmICgrbmV3UmVxdWVzdC52YWx1ZS5yb3dJbmRleCA9PT0gK29sZFJlcXVlc3QudmFsdWUucm93SW5kZXgpIHtcbiAgICAgICAgICByZXR1cm4gb3QubWFya0FzTm9PcChuZXdSZXF1ZXN0KTtcbiAgICAgICAgfVxuICAgICAgICBuZXdSZXF1ZXN0LnZhbHVlLnJvd0luZGV4IC09IDE7XG4gICAgICAgIHJldHVybiBuZXdSZXF1ZXN0O1xuICAgICAgfVxuICAgIH0sXG4gICAgYWRkUm93OiB7XG4gICAgICAvLyBubyBuZWVkIGZvciB0cmFuc2Zvcm1hdGlvblxuICAgICAgLy8gdXBkYXRlQ2VsbDogZnVuY3Rpb24gKG5ld1JlcXVlc3QsIG9sZFJlcXVlc3QpIHt9XG4gICAgICBhZGRSb3c6IGZ1bmN0aW9uIChuZXdSZXF1ZXN0LCBvbGRSZXF1ZXN0KSB7XG4gICAgICAgIGlmIChuZXdSZXF1ZXN0LnZhbHVlLnJvd0luZGV4ICE9PSBvbGRSZXF1ZXN0LnZhbHVlLnJvd0luZGV4KSB7XG4gICAgICAgICAgcmV0dXJuIG5ld1JlcXVlc3Q7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG90Lm1hcmtBc05vT3AobmV3UmVxdWVzdCk7XG4gICAgICB9LFxuICAgICAgZGVsZXRlUm93OiBmdW5jdGlvbiAobmV3UmVxdWVzdCwgb2xkUmVxdWVzdCkge1xuICAgICAgICBpZiAobmV3UmVxdWVzdC52YWx1ZS5yb3dJbmRleCA8IG9sZFJlcXVlc3QudmFsdWUucm93SW5kZXgpIHtcbiAgICAgICAgICByZXR1cm4gbmV3UmVxdWVzdDtcbiAgICAgICAgfVxuICAgICAgICBuZXdSZXF1ZXN0LnZhbHVlLnJvd0luZGV4IC09IDE7XG4gICAgICAgIHJldHVybiBuZXdSZXF1ZXN0O1xuICAgICAgfVxuICAgIH0sXG4gICAgZGVsZXRlUm93OiB7XG4gICAgICAvLyBubyBuZWVkIGZvciB0cmFuc2Zvcm1hdGlvblxuICAgICAgLy8gdXBkYXRlQ2VsbDogZnVuY3Rpb24gKG5ld1JlcXVlc3QsIG9sZFJlcXVlc3QpIHt9XG4gICAgICBhZGRSb3c6IGZ1bmN0aW9uIChuZXdSZXF1ZXN0LCBvbGRSZXF1ZXN0KSB7XG4gICAgICAgIGlmIChuZXdSZXF1ZXN0LnZhbHVlLnJvd0luZGV4IDwgb2xkUmVxdWVzdC52YWx1ZS5yb3dJbmRleCkge1xuICAgICAgICAgIHJldHVybiBuZXdSZXF1ZXN0O1xuICAgICAgICB9XG4gICAgICAgIG5ld1JlcXVlc3QudmFsdWUucm93SW5kZXggKz0gMTtcbiAgICAgICAgcmV0dXJuIG5ld1JlcXVlc3Q7XG4gICAgICB9LFxuICAgICAgZGVsZXRlUm93OiBmdW5jdGlvbiAobmV3UmVxdWVzdCwgb2xkUmVxdWVzdCkge1xuICAgICAgICBpZiAobmV3UmVxdWVzdC52YWx1ZS5yb3dJbmRleCAhPT0gb2xkUmVxdWVzdC52YWx1ZS5yb3dJbmRleCkge1xuICAgICAgICAgIHJldHVybiBuZXdSZXF1ZXN0O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBvdC5tYXJrQXNOb09wKG5ld1JlcXVlc3QpO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICByZXR1cm4gZnVuY3Rpb24gKG9wZWFyaW9uVHJhbnNmb3JtYXRpb24pIHtcbiAgICBvdCA9IG9wZWFyaW9uVHJhbnNmb3JtYXRpb247XG4gICAgb3Quc2V0RXhlY3V0ZUFjdGlvbnMoZXhlY3V0ZUFjdGlvbnMpO1xuICAgIG90LnNldFRyYW5zZm9ybWF0aW9uTWF0cml4KHRyYW5zZm9ybWF0aW9uTWF0cml4KTtcbiAgfTtcbn0oKSk7XG5cbm1vZHVsZS5leHBvcnRzID0gdGFibGVDaGFuZ2VSdWxlczsiLCIndXNlIHN0cmljdCc7XG5cbnZhciBUYWJsZUFjdGlvbnMgPSByZXF1aXJlKCcuLi9hY3Rpb25zL1RhYmxlQWN0aW9ucycpO1xudmFyIE9UID0gcmVxdWlyZSgnLi4vb3Qvb3QuanMnKTtcbnZhciB0YWJsZUNoYW5nZVJ1bGVzID0gcmVxdWlyZSgnLi4vb3QvdGFibGVDaGFuZ2UuanMnKTtcbnZhciBzb2NrZXQsIG90O1xuXG5jbGFzcyBUYWJsZVN0b3JlIGV4dGVuZHMgR0xVLlN0b3JlIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMuaW5pdCgpO1xuXG4gICAgdGhpcy5iaW5kQWN0aW9ucyhcbiAgICAgIFRhYmxlQWN0aW9ucy5VUERBVEVfQ0VMTCwgdGhpcy51cGRhdGVDZWxsLCBbXSxcbiAgICAgIFRhYmxlQWN0aW9ucy5BRERfUk9XLCB0aGlzLnVwZGF0ZVJvdywgW10sXG4gICAgICBUYWJsZUFjdGlvbnMuREVMRVRFX1JPVywgdGhpcy5kZWxldGVSb3csIFtdXG4gICAgKTtcbiAgfVxuXG4gIGluaXQoKSB7XG4gICAgc29ja2V0ID0gbmV3IFdlYlNvY2tldCgnd3M6Ly9sb2NhbGhvc3Q6ODA4MCcsICdwcm90b2NvbE9uZScpO1xuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICB2YXIgZW1pdENoYW5nZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHNlbGYuZW1pdENoYW5nZSgpO1xuICAgIH07XG5cbiAgICBvdCA9IG5ldyBPVCh7XG4gICAgICBvbkluaXQ6IGVtaXRDaGFuZ2VcbiAgICB9KTtcbiAgICB0YWJsZUNoYW5nZVJ1bGVzKG90KTtcblxuICAgIG90Lm9uTW9kZWxDaGFuZ2UoVGFibGVBY3Rpb25zLlVQREFURV9DRUxMLCBlbWl0Q2hhbmdlKTtcbiAgICBvdC5vbk1vZGVsQ2hhbmdlKFRhYmxlQWN0aW9ucy5BRERfUk9XLCBlbWl0Q2hhbmdlKTtcbiAgICBvdC5vbk1vZGVsQ2hhbmdlKFRhYmxlQWN0aW9ucy5ERUxFVEVfUk9XLCBlbWl0Q2hhbmdlKTtcblxuICAgIHNvY2tldC5vbm1lc3NhZ2UgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgIG90LnByb2Nlc3NSZXF1ZXN0KGV2ZW50LmRhdGEpO1xuICAgIH07XG4gIH1cblxuICBnZXQgZGF0YSgpIHtcbiAgICByZXR1cm4gb3QuZ2V0RGF0YSgpO1xuICB9XG5cbiAgdHJpZ2dlclJlcXVlc3QobWVzc2FnZSkge1xuICAgIHZhciByZXF1ZXN0ID0gSlNPTi5wYXJzZShtZXNzYWdlKTtcbiAgICBvdC5leGVjdXRlKHJlcXVlc3QpO1xuICAgIHNvY2tldC5zZW5kKG1lc3NhZ2UpO1xuICB9XG5cbiAgdXBkYXRlQ2VsbChwYXlsb2FkKSB7XG4gICAgdmFyIG1lc3NhZ2UgPSBvdC5jcmVhdGVNZXNzYWdlKFRhYmxlQWN0aW9ucy5VUERBVEVfQ0VMTCwgcGF5bG9hZCk7XG4gICAgdGhpcy50cmlnZ2VyUmVxdWVzdChtZXNzYWdlKTtcbiAgICB0aGlzLmVtaXRDaGFuZ2UoKTtcbiAgfVxuXG4gIHVwZGF0ZVJvdyhwYXlsb2FkKSB7XG4gICAgdmFyIG1lc3NhZ2UgPSBvdC5jcmVhdGVNZXNzYWdlKFRhYmxlQWN0aW9ucy5BRERfUk9XLCBwYXlsb2FkKTtcbiAgICB0aGlzLnRyaWdnZXJSZXF1ZXN0KG1lc3NhZ2UpO1xuICAgIHRoaXMuZW1pdENoYW5nZSgpO1xuICB9XG5cbiAgZGVsZXRlUm93KHBheWxvYWQpIHtcbiAgICB2YXIgbWVzc2FnZSA9IG90LmNyZWF0ZU1lc3NhZ2UoVGFibGVBY3Rpb25zLkRFTEVURV9ST1csIHBheWxvYWQpO1xuICAgIHRoaXMudHJpZ2dlclJlcXVlc3QobWVzc2FnZSk7XG4gICAgdGhpcy5lbWl0Q2hhbmdlKCk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBuZXcgVGFibGVTdG9yZSgpOyJdfQ==
