/** @jsx React.DOM */
var react = require('react/react');

var NamesList = react.createClass({
  _renderNames: function() {
    var namesListItems = [];
    for (var nameDataKey in this.props.names) {
      var nameData = this.props.names[nameDataKey];
      namesListItems.push(
        <li
          className="favorite-names__name"
          key={nameData.id}>
          {nameData.first} {nameData.last}
        </li>
      );
    }
    return namesListItems;
  },

  render: function () {
    return (
      <div className="favorite-names">
        <p>&#9825; Favorite Names:</p>
        <ul className="favorite-names__list">
          {this._renderNames()}
        </ul>
      </div>
    );
  }
});

module.exports = NamesList;
