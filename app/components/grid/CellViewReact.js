'use strict';

var CellViewReact = React.createClass({
  onBlur(e): any {
    this.props.updateCell(this.props.rowIndex, this.props.columnIndex, e.target.value, 'change');
  },
  onChange(e):any {
    this.props.updateCell(this.props.rowIndex, this.props.columnIndex, e.target.value);
  },
  onFocus(e):any {
    this.props.updateCell(this.props.rowIndex, this.props.columnIndex, e.target.value, 'focus');
  },
  render(): any {
    var up = this.props.usersPosition;
    var activeUsersHere = Object
      .keys(up)
      .filter(userId => up[userId].rowIndex === this.props.rowIndex && up[userId].columnIndex === this.props.columnIndex)
      .map(userId => <div className={'user-' + userId}></div>)
    return <td>
      <input type="text"
        value={this.props.value}
        ref="value"
        onChange={this.onChange}
        onFocus={this.onFocus}
        onBlur={this.onBlur}/>
      {activeUsersHere}
    </td>;
  }
});

module.exports = CellViewReact;