!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.APP=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"/home/dugokontov/projects/operation-transformation/app/app.js":[function(require,module,exports){
"use strict";

var GridView = require("./components/grid/GridView");
var GridController = require("./components/grid/GridController");

var App = {
  init: function init() {
    var view = new GridView(document.body);
    new GridController(view);

    view.render();
  }
};

module.exports = App;

},{"./components/grid/GridController":"/home/dugokontov/projects/operation-transformation/app/components/grid/GridController.js","./components/grid/GridView":"/home/dugokontov/projects/operation-transformation/app/components/grid/GridView.js"}],"/home/dugokontov/projects/operation-transformation/app/components/grid/CellViewReact.js":[function(require,module,exports){
"use strict";

var CellViewReact = React.createClass({
  displayName: "CellViewReact",

  onBlur: function onBlur(e) {
    this.props.view.emit("updateCell", {
      rowIndex: this.props.rowIndex,
      columnIndex: this.props.columnIndex,
      value: this.refs.value
    });
  },
  render: function render() {
    return React.createElement(
      "td",
      null,
      React.createElement("input", { type: "text", value: this.props.value, ref: "value", onBlur: this.onBlur })
    );
  }
});

module.exports = CellViewReact;

},{}],"/home/dugokontov/projects/operation-transformation/app/components/grid/GridController.js":[function(require,module,exports){
"use strict";

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var GridController = (function (_GLU$ViewController) {
  function GridController(view) {
    _classCallCheck(this, GridController);

    _get(Object.getPrototypeOf(GridController.prototype), "constructor", this).call(this, view);
  }

  _inherits(GridController, _GLU$ViewController);

  return GridController;
})(GLU.ViewController);

module.exports = GridController;

},{}],"/home/dugokontov/projects/operation-transformation/app/components/grid/GridView.js":[function(require,module,exports){
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

    data = [["asdf", "mujo"], ["bfs", 123]];
    view = this;
  }

  _inherits(GridView, _GLU$View);

  _createClass(GridView, {
    render: {
      value: function render() {
        React.render(React.createElement(GridViewReact, { data: data, view: view }), this.el);
      }
    }
  });

  return GridView;
})(GLU.View);

module.exports = GridView;

},{"./GridViewReact.js":"/home/dugokontov/projects/operation-transformation/app/components/grid/GridViewReact.js"}],"/home/dugokontov/projects/operation-transformation/app/components/grid/GridViewReact.js":[function(require,module,exports){
"use strict";

var RowViewReact = require("./RowViewReact.js");

var GridViewReact = React.createClass({
  displayName: "GridViewReact",

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
          view: _this.props.view });
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

},{"./RowViewReact.js":"/home/dugokontov/projects/operation-transformation/app/components/grid/RowViewReact.js"}],"/home/dugokontov/projects/operation-transformation/app/components/grid/RowViewReact.js":[function(require,module,exports){
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
          view: _this.props.view });
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

},{"./CellViewReact.js":"/home/dugokontov/projects/operation-transformation/app/components/grid/CellViewReact.js"}]},{},["/home/dugokontov/projects/operation-transformation/app/app.js"])("/home/dugokontov/projects/operation-transformation/app/app.js")
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi9hcHAvYXBwLmpzIiwiLi4vYXBwL2NvbXBvbmVudHMvZ3JpZC9DZWxsVmlld1JlYWN0LmpzIiwiLi4vYXBwL2NvbXBvbmVudHMvZ3JpZC9HcmlkQ29udHJvbGxlci5qcyIsIi4uL2FwcC9jb21wb25lbnRzL2dyaWQvR3JpZFZpZXcuanMiLCIuLi9hcHAvY29tcG9uZW50cy9ncmlkL0dyaWRWaWV3UmVhY3QuanMiLCIuLi9hcHAvY29tcG9uZW50cy9ncmlkL1Jvd1ZpZXdSZWFjdC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBLFlBQVksQ0FBQzs7QUFFYixJQUFJLFFBQVEsR0FBRyxPQUFPLENBQUMsNEJBQTRCLENBQUMsQ0FBQztBQUNyRCxJQUFJLGNBQWMsR0FBRyxPQUFPLENBQUMsa0NBQWtDLENBQUMsQ0FBQzs7QUFFakUsSUFBSSxHQUFHLEdBQUc7QUFDUixNQUFJLEVBQUUsZ0JBQVk7QUFDaEIsUUFBSSxJQUFJLEdBQUcsSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3ZDLFFBQUksY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDOztBQUV6QixRQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7R0FDZjtDQUNGLENBQUM7O0FBRUYsTUFBTSxDQUFDLE9BQU8sR0FBRyxHQUFHLENBQUM7OztBQ2RyQixZQUFZLENBQUM7O0FBRWIsSUFBSSxhQUFhLEdBQUcsS0FBSyxDQUFDLFdBQVcsQ0FBQzs7O0FBQ3BDLFFBQU0sRUFBQSxnQkFBQyxDQUFDLEVBQU87QUFDYixRQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFO0FBQ2pDLGNBQVEsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVE7QUFDN0IsaUJBQVcsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFD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QyxPQUFPLEdBQUcsYUFBYSxDQUFDOzs7QUMzQi9CLFlBQVksQ0FBQztBQUNiLElBQUksYUFBYSxHQUFHLE9BQU8sQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDOztBQUVsRCxJQUFJLFlBQVksR0FBRyxLQUFLLENBQUMsV0FBVyxDQUFDOzs7QUFDbkMsUUFBTSxFQUFBLGtCQUFROzs7QUFDWixRQUFJLEtBQUssR0FBRyxFQUFFLENBQUM7QUFDZixRQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRTtBQUN6QixXQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLFVBQUMsSUFBSSxFQUFFLEtBQUs7ZUFBSyxvQkFBQyxhQUFhO0FBQ3hELGVBQUssRUFBRSxJQUFJLEFBQUM7QUFDWixhQUFHLEVBQUUsS0FBSyxBQUFDO0FBQ1gscUJBQVcsRUFBRSxLQUFLLEFBQUM7QUFDbkIsa0JBQVEsRUFBRSxNQUFLLEtBQUssQ0FBQyxRQUFRLEFBQUM7QUFDOUIsY0FBSSxFQUFFLE1BQUssS0FBSyxDQUFDLElBQUksQUFBQyxHQUFFO09BQUEsQ0FBQyxDQUFDO0tBQzdCO0FBQ0QsV0FBTzs7O01BQUssS0FBSztLQUFNLENBQUM7R0FDekI7Q0FDRixDQUFDLENBQUM7O0FBRUgsTUFBTSxDQUFDLE9BQU8sR0FBRyxZQUFZLENBQUMiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgR3JpZFZpZXcgPSByZXF1aXJlKCcuL2NvbXBvbmVudHMvZ3JpZC9HcmlkVmlldycpO1xudmFyIEdyaWRDb250cm9sbGVyID0gcmVxdWlyZSgnLi9jb21wb25lbnRzL2dyaWQvR3JpZENvbnRyb2xsZXInKTtcblxudmFyIEFwcCA9IHtcbiAgaW5pdDogZnVuY3Rpb24gKCkge1xuICAgIHZhciB2aWV3ID0gbmV3IEdyaWRWaWV3KGRvY3VtZW50LmJvZHkpO1xuICAgIG5ldyBHcmlkQ29udHJvbGxlcih2aWV3KTtcblxuICAgIHZpZXcucmVuZGVyKCk7XG4gIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gQXBwOyIsIid1c2Ugc3RyaWN0JztcblxudmFyIENlbGxWaWV3UmVhY3QgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gIG9uQmx1cihlKTogYW55IHtcbiAgICB0aGlzLnByb3BzLnZpZXcuZW1pdCgndXBkYXRlQ2VsbCcsIHtcbiAgICAgIHJvd0luZGV4OiB0aGlzLnByb3BzLnJvd0luZGV4LFxuICAgICAgY29sdW1uSW5kZXg6IHRoaXMucHJvcHMuY29sdW1uSW5kZXgsXG4gICAgICB2YWx1ZTogdGhpcy5yZWZzLnZhbHVlXG4gICAgfSk7XG4gIH0sXG4gIHJlbmRlcigpOiBhbnkge1xuICAgIHJldHVybiA8dGQ+PGlucHV0IHR5cGU9XCJ0ZXh0XCIgdmFsdWU9e3RoaXMucHJvcHMudmFsdWV9IHJlZj1cInZhbHVlXCIgb25CbHVyPXt0aGlzLm9uQmx1cn0gLz48L3RkPjtcbiAgfVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gQ2VsbFZpZXdSZWFjdDsiLCIndXNlIHN0cmljdCc7XG5cbmNsYXNzIEdyaWRDb250cm9sbGVyIGV4dGVuZHMgR0xVLlZpZXdDb250cm9sbGVyIHtcbiAgY29uc3RydWN0b3Iodmlldykge1xuICAgIHN1cGVyKHZpZXcpO1xuXG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBHcmlkQ29udHJvbGxlcjsiLCIndXNlIHN0cmljdCc7XG5cbnZhciBkYXRhLCB2aWV3O1xudmFyIEdyaWRWaWV3UmVhY3QgPSByZXF1aXJlKCcuL0dyaWRWaWV3UmVhY3QuanMnKTtcblxuY2xhc3MgR3JpZFZpZXcgZXh0ZW5kcyBHTFUuVmlldyB7XG4gIGNvbnN0cnVjdG9yKHJvb3QsIHNlbGVjdG9yKSB7XG4gICAgc3VwZXIocm9vdCwgc2VsZWN0b3IpO1xuXG4gICAgZGF0YSA9IFtbJ2FzZGYnLCAnbXVqbyddLFsnYmZzJywgMTIzXV07XG4gICAgdmlldyA9IHRoaXM7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgUmVhY3QucmVuZGVyKDxHcmlkVmlld1JlYWN0IGRhdGE9e2RhdGF9IHZpZXc9e3ZpZXd9IC8+LFxuICAgICAgdGhpcy5lbCk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBHcmlkVmlldzsiLCIndXNlIHN0cmljdCc7XG5cbnZhciBSb3dWaWV3UmVhY3QgPSByZXF1aXJlKCcuL1Jvd1ZpZXdSZWFjdC5qcycpO1xuXG52YXIgR3JpZFZpZXdSZWFjdCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgcmVuZGVyKCk6IGFueSB7XG4gICAgdmFyIGhlYWRlcnMgPSBbXTtcbiAgICB2YXIgcm93cyA9IFtdO1xuICAgIGlmICh0aGlzLnByb3BzLmRhdGFbMF0pIHtcbiAgICAgIGhlYWRlcnMgPSB0aGlzLnByb3BzLmRhdGFbMF0ubWFwKChuYW1lLCBpbmRleCkgPT4gPHRoPkNvbCB7aW5kZXggKyAxfTwvdGg+KTtcbiAgICAgIHJvd3MgPSB0aGlzLnByb3BzLmRhdGEubWFwKChyb3csIGluZGV4KSA9PiA8Um93Vmlld1JlYWN0XG4gICAgICAgIHJvdz17cm93fVxuICAgICAgICBrZXk9e2luZGV4fVxuICAgICAgICByb3dJbmRleD17aW5kZXh9XG4gICAgICAgIHZpZXc9e3RoaXMucHJvcHMudmlld30vPik7XG4gICAgfVxuICAgIHJldHVybiA8dGFibGU+XG4gICAgICA8dGhlYWQ+XG4gICAgICAgIDx0cj57aGVhZGVyc308L3RyPlxuICAgICAgPC90aGVhZD5cbiAgICAgIDx0Ym9keT5cbiAgICAgICAge3Jvd3N9XG4gICAgICA8L3Rib2R5PlxuICAgIDwvdGFibGU+O1xuICB9XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBHcmlkVmlld1JlYWN0OyIsIid1c2Ugc3RyaWN0JztcbnZhciBDZWxsVmlld1JlYWN0ID0gcmVxdWlyZSgnLi9DZWxsVmlld1JlYWN0LmpzJyk7XG5cbnZhciBSb3dWaWV3UmVhY3QgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gIHJlbmRlcigpOiBhbnkge1xuICAgIHZhciBjZWxscyA9IFtdO1xuICAgIGlmICh0aGlzLnByb3BzLnJvdy5sZW5ndGgpIHtcbiAgICAgIGNlbGxzID0gdGhpcy5wcm9wcy5yb3cubWFwKChjZWxsLCBpbmRleCkgPT4gPENlbGxWaWV3UmVhY3RcbiAgICAgICAgdmFsdWU9e2NlbGx9XG4gICAgICAgIGtleT17aW5kZXh9XG4gICAgICAgIGNvbHVtbkluZGV4PXtpbmRleH1cbiAgICAgICAgcm93SW5kZXg9e3RoaXMucHJvcHMucm93SW5kZXh9XG4gICAgICAgIHZpZXc9e3RoaXMucHJvcHMudmlld30vPik7XG4gICAgfVxuICAgIHJldHVybiA8dHI+e2NlbGxzfTwvdHI+O1xuICB9XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBSb3dWaWV3UmVhY3Q7Il19
