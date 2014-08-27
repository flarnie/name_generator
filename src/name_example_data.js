var NameWebAPIUtils = require('utils/name_web_api_utils'),
    faker = require('faker/faker');

/**
 * We are using localStorage to mock up a server interaction.
 * To test things, for now we are putting a dummy name in the namesList.
 */

var NameExampleData = {
  init: function() {
    // Load an initial name.
    NameWebAPIUtils.getNewCurrentName();

    // Load a dummy name into the namesList
    var namesList = {},
        id = Date.now();

    namesList[id] = { id: id, first: 'name1', last: 'lastName1' };
    localStorage.setItem('namesList', JSON.stringify(namesList));
  }
};

module.exports = NameExampleData;
