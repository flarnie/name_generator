/** @jsx React.DOM */
var React = require('react/react'),
    NameAppActions = require('../actions/name_app_actions'),
    NameStore = require('../stores/name_stores'),
    NameWebAPIUtils = require('../utils/name_web_api_utils');

var NameApp = React.createClass({
  getInitialState: function() {
    return {
      currentName: NameStore.getCurrentName(),
      namesList: NameStore.getAll()
    };
  },

  componentDidMount: function() {
    NameStore.addChangeListener(this._onChange);
    // fetch the list of names from the server
    // TODO: move this somewhere else?
    NameWebAPIUtils.getAllNames();
  },

  componentWillUnmount: function() {
    NameStore.removeChangeListener(this._onChange);
  },

  _onChange: function() {
    this.setState({
      currentName: NameStore.getCurrentName(),
      namesList: NameStore.getAll()
    });
    console.log('the state: ', this.state);
  },

  /**
   * @return {Object}
   */
  render: function() {
    var namesListItems = [];
    for (var nameDataKey in this.state.namesList) {
      var nameData = this.state.namesList[nameDataKey];
      namesListItems.push(
        <li
          className="favorite-names__name"
          key={nameData.id}>
          {nameData.first} {nameData.last}
        </li>);
    }
    return (
      <div className="name-app">
        <div className="content-main">
          <p>Current Name:</p>
          <p>
            <h3 className="name-app__name">
              {this.state.currentName.first} {this.state.currentName.last}
            </h3>
          </p>
          <button className="name-app__new-name" onClick={this._handleClick}>New Name</button>
        </div>
        <div className="content-side">
          <div className="favorite-names">
            <p>&#9825; Favorite Names:</p>
            <ul className="favorite-names__list">
              {namesListItems}
            </ul>
          </div>
        </div>
      </div>
    );
  },

  _handleClick: function() {
    NameAppActions.createCurrentName();
  }
});

module.exports = NameApp;
