var AppDispatcher = require('../dispatcher/app_dispatcher'),
    EventEmitter = require('events').EventEmitter,
    NameConstants = require('../constants/name_constants'),
    NameWebAPIUtils = require('../utils/name_web_api_utils'),
    merge = require('react/lib/merge');

var CHANGE_EVENT = 'change',
_savedNames = {
};

_currentName = {};

/**
 * Updates the current name
 * @param {object} attributes attributes of the new current name
 */
function _updateCurrentName(attributes) {
  _currentName = attributes;
};

/**
 * Updates the names list
 * @param {object} attributes attributes of the new names list
 */
function _updateNamesList(attributes) {
  _savedNames = attributes;
};

/**
 * Generates a new current name
 */
function _generateCurrentName() {
  NameWebAPIUtils.getNewCurrentName();
}

/**
 * Adds a new name to the namesList
 * @param {object} attributes The attributes of the name, without id
 */
function _create(attributes) {
  NameWebAPIUtils.createName(attributes);
}

/**
 * Delete a Name from the namesList
 * @param {number} id The id of the Name
 */
function _delete(id) {
  NameWebAPIUtils.deleteName(id);
};
// TODO: implement destroyAll

var NameStore = merge(EventEmitter.prototype, {
  /**
   * Get the entire collection of saved names.
   * @return {object}
   */
  getAll: function() {
    return _savedNames;
  },

  getCurrentName: function() {
    return _currentName;
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  /**
   * Add a callback to the CHANGE_EVENT
   * @param {function} callback
   */
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  /**
   * Remove a callback to the CHANGE_EVENT
   * @param {function} callback
   */
  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});


// Register callbacks for each type of update
AppDispatcher.register(function(payload) {
  var action = payload.action,
      attributes,
      id;

  switch(action.actionType) {
    case NameConstants.NAME_CREATE:
      _create(action.attributes);
      break;
    case NameConstants.NAME_DELETE:
      id = action.id;
      if (id != '') {
        _delete(id);
      }
      break;
    case NameConstants.CURRENT_NAME_RECEIVE:
      _updateCurrentName(action.attributes);
      break;
    case NameConstants.NAME_RECEIVE:
      _updateNamesList(action.attributes);
      break;
    case NameConstants.CURRENT_NAME_CREATE:
      _generateCurrentName();
      break;
    default:
      return true;
  };

  // If a UI change was triggered, we need to emit the change event.
  NameStore.emitChange();

  return true; // No errors - needed for promise in Dispatcher.
});

module.exports = NameStore;
