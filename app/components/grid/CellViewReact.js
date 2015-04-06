'use strict';

var CellViewReact = React.createClass({
  onBlur(e): any {
    this.props.updateCell(this.props.rowIndex, this.props.columnIndex, e.target.value, true);
  },
  onChange(e):any {
    this.props.updateCell(this.props.rowIndex, this.props.columnIndex, e.target.value);
  },
  render(): any {
    return <td>
      <input type="text"
        value={this.props.value}
        ref="value"
        onChange={this.onChange}
        onBlur={this.onBlur}/>
    </td>;
  }
});

module.exports = CellViewReact;