'use strict';

var RowViewReact = require('./RowViewReact.js');
var TableActions = require('../../actions/TableActions.js');

var GridViewReact = React.createClass({
  getInitialState(): any {
    return {data: this.props.data};
  },
  updateCell(rowIndex, columnIndex, value, action): any {
    if (action === 'focus') {
      this.props.view.emit(TableActions.USER_CHANGE_POSITION, {
        rowIndex: rowIndex,
        columnIndex: columnIndex
      });
      return;
    }
    this.props.data[rowIndex][columnIndex] = value;
    this.setState({data: this.props.data});
    if (action) {
      this.props.view.emit(TableActions.UPDATE_CELL, {
        rowIndex: rowIndex,
        columnIndex: columnIndex,
        value: value
      });
    }
  },
    onHamoClick: function(e) {
        APP.router.navigateTo('/category/new');
        e.preventDefault();
    },
      render(): any {
          var headers = [];
    var rows = [];

    if (this.props.data && this.props.data[0]) {
      headers = this.props.data[0].map((name, index) => <th>Col {index + 1}</th>);
      rows = this.props.data.map((row, index) => <RowViewReact
        row={row}
        key={index}
        rowIndex={index}
        usersPosition={this.props.usersPosition}
        updateCell={this.updateCell}/>);
    }
    return (
        <div>
        ID IS : {this.props.id}
        {(new Date()).toString()}
        <table>
      <thead>
        <tr>{headers}</tr>
      </thead>
      <tbody>
        {rows}
      </tbody>
    </table>
    <a href="/mujo" onClick={this.onHamoClick}>New view(navigate)</a>
    <div id="subtemplate"></div>
    </div>);
  }
});

module.exports = GridViewReact;
