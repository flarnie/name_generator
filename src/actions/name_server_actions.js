var AppDispatcher = require('../dispatcher/app_dispatcher'),
    NameConstants = require('../constants/name_constants');

var NameServerActions = {
  /**
   * @param {object} currenNameAttrs the attributes of the current name
   */
  receiveCurrentName: function(currentNameAttrs) {
    AppDispatcher.handleServerAction({
      actionType: NameConstants.CURRENT_NAME_RECEIVE,
      attributes: currentNameAttrs
    });
  }
};

module.exports = NameServerActions;
