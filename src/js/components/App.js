var React = require('react');

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
        return (this.props.children);
    }
}

module.exports = App;
