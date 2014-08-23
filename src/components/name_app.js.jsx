/** @jsx React.DOM */
var React = require('react/react'),
    NameStore = require('../stores/name_stores'),
    faker = require('faker/faker');

var NameApp = React.createClass({
  getInitialState: function() {
    return {
      currentName: { first: '???', last: '???' }
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

  _handleClick: function() {
    var firstName = faker.Name.firstName(),
        lastName = faker.Name.lastName();
    this.setState({
      currentName: { first: firstName, last: lastName }
    });
  }
});

module.exports = NameApp;
