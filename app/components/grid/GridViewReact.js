'use strict';

var RowViewReact = require('./RowViewReact.js');
var TableActions = require('../../actions/TableActions.js');

var GridViewReact = React.createClass({
  getInitialState(): any {
    return {data: this.props.data};
  },
  updateCell(rowIndex, columnIndex, value, comit): any {
    this.props.data[rowIndex][columnIndex] = value;
    this.setState({data: this.props.data});
    if (comit) {
      this.props.view.emit(TableActions.UPDATE_CELL, {
        rowIndex: rowIndex,
        columnIndex: columnIndex,
        value: value
      });
    }
  },
  render(): any {
    var headers = [];
    var rows = [];
    if (this.props.data[0]) {
      headers = this.props.data[0].map((name, index) => <th>Col {index + 1}</th>);
      rows = this.props.data.map((row, index) => <RowViewReact
        row={row}
        key={index}
        rowIndex={index}
        updateCell={this.updateCell}/>);
    }
    return <table>
      <thead>
        <tr>{headers}</tr>
      </thead>
      <tbody>
        {rows}
      </tbody>
    </table>;
  }
});

module.exports = GridViewReact;