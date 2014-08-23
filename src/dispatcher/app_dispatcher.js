var Dispatcher = require('dispatcher/dispatcher_base'),
  merge = require('react/lib/merge'),
  AppDispatcher = merge(Dispatcher.prototype, {
  /**
   * Handles data coming from the view
   * marking it as view data.
   * Another variation could be
   * handleServerAction.
   * @param {Object} action The data coming from the view.
   */
    handleViewAction: function(action) {
      this.dispatch({
        source: 'VIEW_ACTION',
        action: action
      });
    },

    /**
     * Handles data coming from the server
     * marking it as server data.
     * @param {object} action
     */
    handleServerAction: function(action) {
      this.dispatch({
        source: 'SERVER_ACTION',
        action: action
      });
    }
});

module.exports = AppDispatcher;
