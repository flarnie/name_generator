var NameWebAPIUtils = require('utils/name_web_api_utils'),
    faker = require('faker/faker');

var NameExampleData = {
  // Load an initial name.
  init: function() {
    // We don't need to create a mock server yet since nothing persists between names.
    NameWebAPIUtils.getNewCurrentName();
  }
};

module.exports = NameExampleData;
