'use strict';

var CellViewReact = React.createClass({
  onBlur(e): any {
    this.props.view.emit('updateCell', {
      rowIndex: this.props.rowIndex,
      columnIndex: this.props.columnIndex,
      value: this.refs.value
    });
  },
  render(): any {
    return <td><input type="text" value={this.props.value} ref="value" onBlur={this.onBlur} /></td>;
  }
});

module.exports = CellViewReact;