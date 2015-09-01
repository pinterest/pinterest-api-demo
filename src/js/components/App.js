var React = require('react');
var {RouteHandler} = require('react-router');

require('../../scss/App.scss');
require('../../scss/mobile.scss');

/*
 *  Base App Component for Redirect Handling
 */
class App extends React.Component {
    /*
     *  Return JSX representation of component view
     */
    render () {
        return <RouteHandler/>;
    }
}

module.exports = App;
