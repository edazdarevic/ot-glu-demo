'use strict';
var CellViewReact = require('./CellViewReact.js');

var RowViewReact = React.createClass({
  render(): any {
    var cells = [];
    if (this.props.row.length) {
      cells = this.props.row.map((cell, index) => <CellViewReact
        value={cell}
        key={index}
        columnIndex={index}
        rowIndex={this.props.rowIndex}
        usersPosition={this.props.usersPosition}
        updateCell={this.props.updateCell}/>);
    }
    return <tr>{cells}</tr>;
  }
});

module.exports = RowViewReact;