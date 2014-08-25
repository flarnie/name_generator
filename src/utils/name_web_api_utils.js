var NameServerActions = require('../actions/name_server_actions'),
    faker = require('faker/faker');

module.exports = {
  getNewCurrentName: function() {
    // Simulate getting a new name from the server.
    var firstName = faker.Name.firstName(),
        lastName = faker.Name.lastName(),
        id = Date.now();

    // on success:
    NameServerActions.receiveCurrentName({ id: id, first: firstName, last: lastName });
  }
};
