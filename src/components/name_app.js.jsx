/** @jsx React.DOM */
var React = require('react/react'),
    NameStore = require('../stores/name_stores'),
    faker = require('faker/faker');

var NameApp = React.createClass({
  getInitialState: function() {
    return {
      currentName: this._generateName()
    };
  },

  /**
   * @return {Object}
   */
  render: function() {
    return (
      <div className="name-app">
        <p>Current Name:</p>
        <p>
          <h3 className="name-app__name">
            {this.state.currentName.first} {this.state.currentName.last}
          </h3>
        </p>
        <button className="name-app__new-name" onClick={this._handleClick}>New Name</button>
      </div>
    );
  },

  /**
   * @return {object} new set of name attributes
   */
  _generateName: function() {
    //TODO: make this a method of the stores?
    var firstName = faker.Name.firstName(),
        lastName = faker.Name.lastName();
    return { first: firstName, last: lastName };
  },

  _handleClick: function() {
    this.setState({
      currentName: this._generateName()
    });
  }
});

module.exports = NameApp;
