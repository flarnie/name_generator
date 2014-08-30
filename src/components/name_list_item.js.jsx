/** @jsx React.DOM */
var NameWebAPIUtils = require('../utils/name_web_api_utils'),
    React = require('react/react');

var NameListItem = React.createClass({
  _handleDelete: function() {
    NameWebAPIUtils.deleteName(this.props.name.id);
  },

  render: function() {
    var nameItem = this.props.name;
    return (
      <li
        className="favorite-names__name"
        key={nameItem.id}>
        <button
          onClick={this._handleDelete}
          className="name__delete">
          &#10007;
        </button>
        {nameItem.first} {nameItem.last}
      </li>
    );
  }
});

module.exports = NameListItem;
