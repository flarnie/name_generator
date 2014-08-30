/** @jsx React.DOM */
var react = require('react/react'),
    NameListItem = require('components/name_list_item'),
    NameWebAPIUtils = require('../utils/name_web_api_utils');

var NamesList = react.createClass({

  _renderNames: function() {
    var namesListItems = [];
    for (var nameDataKey in this.props.names) {
      var nameData = this.props.names[nameDataKey];
      namesListItems.push(
        <NameListItem name={nameData} />
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
