var React = require('react');
require('../../scss/Spinner.scss');

/*
 *  Spinning Loader View Component
 *  @prop {String} ClassName - optional size
 */
class Spinner extends React.Component {
    /*
     *  Return JSX representation of component view
     */
    render () {
        var className = 'spinner wave ' + (this.props.className || '');
        return (
            <div className={className}>
                <div className="rect1"></div>
                <div className="rect2"></div>
                <div className="rect3"></div>
                <div className="rect4"></div>
                <div className="rect5"></div>
            </div>
        );
    }
}

module.exports = Spinner;