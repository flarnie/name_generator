var AppDispatcher = require('../dispatcher/app_dispatcher'),
    NameConstants = require('../constants/name_constants');

var NameAppActions = {
  createCurrentName: function() {
    AppDispatcher.handleViewAction({
      actionType: NameConstants.CURRENT_NAME_CREATE
    });
  },

  /**
   * @param {object} attributes the attributes of the new name
   */
  create: function(attributes) {
    AppDispatcher.handleViewAction({
      actionType: NameConstants.NAME_CREATE,
      attributes: attributes
    });
  },

  /**
   * @param {string} id the id of the existing name
   * @param {object} attributes the updated attributes of the name
   */
  update: function(id, attributes) {
    AppDispatcher.handleViewAction({
      actionType: NameConstants.NAME_UPDATE,
      id: id,
      attributes: attributes
    });
  },

  /**
   * @param {string} id the id of the existing name
   */
  delete: function(id) {
    AppDispatcher.handleViewAction({
      actionType: NameConstants.NAME_DELETE,
      id: id
    });
  }
};

module.exports = NameAppActions;
