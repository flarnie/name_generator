var NameApp = require('src/components/name_app')
    NameExampleData = require('src/name_example_data'),
    React = require('react/react');

NameExampleData.init();

React.renderComponent(NameApp(), document.getElementById('content'));
