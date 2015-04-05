'use strict';

var RowViewReact = require('./RowViewReact.js');

var GridViewReact = React.createClass({
  render(): any {
    var headers = [];
    var rows = [];
    if (this.props.data[0]) {
      headers = this.props.data[0].map((name, index) => <th>Col {index + 1}</th>);
      rows = this.props.data.map((row, index) => <RowViewReact
        row={row}
        key={index}
        rowIndex={index}
        view={this.props.view}/>);
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