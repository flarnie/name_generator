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

  /**
   * Handles the loading of namesList data from server.
   * @param {object} namesListAttributes
   */
  receiveNamesList: function(namesListAttributes) {
    AppDispatcher.handleServerAction({
      actionType: NameConstants.NAME_RECEIVE,
      attributes: namesListAttributes
    });
  },

  /**
   * Handles successful addition of name to namesList on server.
   * @param {object} attributes the attributes of the new name
   */
  create: function(attributes) {
    AppDispatcher.handleServerAction({
      actionType: NameConstants.NAME_CREATE,
      attributes: attributes
    });
  },

  /**
   * Handles successful deletion of a name from the namesList on server.
   * @param {string} id the id of the name that was deleted.
   */
  index: function(id) {
    AppDispatcher.handleServerAction({
      actionType: NameConstants.NAME_DELETE,
      id: id
    });
  },
};

module.exports = NameServerActions;
