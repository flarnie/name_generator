var NameServerActions = require('../actions/name_server_actions'),
    faker = require('faker/faker');

/**
 * Here is where we seriously would use ajax if we were interacting with a real
 * server, and not a mock using localStorage.
 */
module.exports = {
  // CurrentName helpers
  getNewCurrentName: function() {
    // Simulate getting a new name from the server.
    var firstName = faker.Name.firstName(),
        lastName = faker.Name.lastName(),
        id = Date.now();

    // on success:
    NameServerActions.receiveCurrentName({ id: id, first: firstName, last: lastName });
  },

  // NamesList helpers
  getAllNames: function() {
    // Simulate getting 'show' of namesList or 'index' of names from server
    var namesList = localStorage.getItem('namesList');
    // on success:
    NameServerActions.receiveNamesList(JSON.parse(namesList));
  },

  createName: function(attributes) {
    var id = Date.now(),
        namesList = JSON.parse(localStorage.getItem('namesList'));

    attributes[id] = id;
    // persist to "server"
    namesList[id] = attributes;
    localStorage.setItem('namesList', JSON.stringify(namesList));

    // on success:
    NameServerActions.receiveNamesList(namesList);
  },

  deleteName: function(id) {
    var namesList = JSON.parse(localStorage.getItem('namesList'));

    // delete from "server"
    delete namesList[id];
    localStorage.setItem('namesList', JSON.stringify(namesList));

    // on success:
    NameServerActions.receiveNamesList(namesList);
  }
};
