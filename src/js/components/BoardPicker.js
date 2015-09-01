var React = require('react');
var Spinner = require('./Spinner');
require('../../scss/BoardPicker.scss');

/*
 *  Board Picker View Component
 *  @prop  {Object}   post    - Instagram post object
 *  @prop  {Function} postPin - parent method for creating a new Pin
 *  @state {String}   saving  - the board id used for creating a new Pin
 *  @state {String}   note    - the description of the Pin
 */
class BoardPicker extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            saving: null,
            note: props.post.caption ? props.post.caption.text : ''
        };
    }

    /*
     *  Create pin and show loading bar until closes modal
     *  @param {Object} board - Pinterest board object
     */
    pinit(board) {
        this.props.postPin({
            board: board.id,
            note: this.refs.note.getDOMNode().value,
            link: this.props.post.link,
            image_url: this.props.post.images.standard_resolution.url
        });
        this.setState({ saving: board.id });
    }

    /*
     *  Render helper for a board
     *  @param {Object} board - Pinterest board object to render
     */
    _renderBoard(board) {
        const image = board.image.small;
        return (
            <div className="board" key={board.id}>
                <img src={image.url} width={image.width} height={image.height} />
                <span>{board.name}</span>
                { this.state.saving === board.id ? <Spinner /> : <button className="button button--pinit" onClick={this.pinit.bind(this, board)}>Pin it!</button> }
            </div>
        );
    }

    /*
     *  Return JSX representation of component view
     */
    render () {
        return (
            <div className="BoardPicker" onClick={this.props.close}>
                <div className="content">
                    <header>Pick a Board
                        <div className="close" onClick={this.props.close}>&#10005;</div>
                    </header>
                    <div className="inline imageWrapper">
                        <img className="postImage" src={this.props.post.images.standard_resolution.url} width="290" height="290"/>
                        <textarea ref="note" className="note" defaultValue={this.state.note}></textarea>
                    </div>
                    <div className="inline boards">
                        { this.props.boards.map(this._renderBoard.bind(this)) }
                    </div>
                </div>
            </div>
        );
    }

}

module.exports = BoardPicker;