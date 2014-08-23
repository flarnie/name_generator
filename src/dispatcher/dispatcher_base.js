var Promise = require('es6-promise/dist/commonjs/main').Promise,
    merge = require('react/lib/merge');

var _callbacks = [],
    _promises = [];

var Dispatcher = function() {};
Dispatcher.prototype = merge(Dispatcher.prototype, {
  /**
   * Register a store's callback so that it may be invoked by an action.
   * @param {function} callback The callback to be registered.
   * @return {number} The index of the callback written within the _callbacks
   * array.
   */
  register: function(callback) {
    _callbacks.push(callback);
    return _callbacks.length - 1; // index
  },

  /**
   * dispatch
   * @param {Object} payload The data from the action
   */
  dispatch: function(payload) {
    // First create an array of promises for callbacks to reference.
    var resolves = [],
        rejects = [],
        _promises = _callbacks.map(function(_, i) {
        return new Promise(function(resolve, reject) {
          resolves[i] = resolve;
          rejects[i] = reject;
        });
      });
      // Dispatch to promises and resolve/reject promises.
      _callbacks.forEach(function(callback, i){
        // Callback can return an obj., to resolve, or a promise, to chain.
        // See waitfor() for why this might be useful.
        Promise.resolve(callback(payload)).then(function() {
          resolves[i](payload);
        }, function() {
          rejects[i](new Error('Dispatcher callback unsuccessful'));
        });
      });
    _promises = [];
  }
});

module.exports = Dispatcher;
