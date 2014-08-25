/** @jsx React.DOM */
var React = require('react/react'),
    NameAppActions = require('../actions/name_app_actions'),
    NameStore = require('../stores/name_stores');

var NameApp = React.createClass({
  getInitialState: function() {
    return {
      currentName: NameStore.getCurrentName()
    };
  },

  componentDidMount: function() {
    NameStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    NameStore.removeChangeListener(this._onChange);
  },

  _onChange: function() {
    this.setState({
      currentName: NameStore.getCurrentName()
    });
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
    NameAppActions.createCurrentName();
  }
});

module.exports = NameApp;
