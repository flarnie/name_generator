var AppDispatcher = require('../dispatcher/app_dispatcher'),
    EventEmitter = require('events').EventEmitter,
    NameConstants = require('../constants/name_constants'),
    NameWebAPIUtils = require('../utils/name_web_api_utils'),
    merge = require('react/lib/merge');

var CHANGE_EVENT = 'change',
    // TODO: load data from localstorage here?
_savedNames = {
  '1': {
    id: 1,
    favorite: false,
    first: 'TestFirstName',
    last: 'TestLastName'
   }
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
 * Generates a new current name
 */
function _generateCurrentName() {
  NameWebAPIUtils.getNewCurrentName();
}

/**
 * Updates the whole collection
 * replacing any old version of
 * the data.
 */
function fetchNames() {
  // Normally we would make an ajax request
  // and then in the callback emit the server type
  // update.
  // I'm using localstorage instead of a real server.

  _savedNames = sessionStorage.getItem(NameConstants.NAME_URL);
}

/**
 * Create a Name
 * @param {object} attributes The attributes of the name, without id
 */
function create(attributes) {
  // TODO: save to server and get real id.
  var id = Date.now();
  attributes.id = id;
  _savedNames[id] = attributes;
}

/**
 * Update a Name
 * @param {string} id The id of the Name
 * @param {object} attributes The attributes of a name
 */
function update(id, attributes) {
  // TODO: save to server
  _savedNames[id] = merge(_savedNames[id], attributes);
};

/**
 * Delete a Name
 * @param {number} id The id of the Name
 */
function _delete(id) {
  // TODO: delete from server
  delete _savedNames[id];
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
    case NameConstants.NAME_FETCH:
      fetchNames();
      break;
    case NameConstants.NAME_CREATE:
      create(action.attributes);
      break;
    case NameConstants.NAME_UPDATE:
      id = action.id;
      if (id != '') {
        update(id, action.attributes);
      }
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
