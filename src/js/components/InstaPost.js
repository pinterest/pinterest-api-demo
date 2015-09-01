var React = require('react');

require('../../scss/InstaPost.scss');

/*
 *  Instagram Post View Component
 *  @prop {Function} boardPicker - parent method for opening board picker
 *  @prop {Object}   post        - Instagram Post
 */
class InstaPost extends React.Component {
    /*
     *  Return JSX representation of component view
     */
    render () {
        var post = this.props.post;
        return (
            <div className="InstaPost" onClick={this.props.boardPicker.bind(this, post)}>
                <img src={post.images.standard_resolution.url} height="290" width="290"/>
                <div className="overlay-wrapper">
                    <div className="overlay"></div>
                    <div className="likes"><i></i>{post.likes ? post.likes.count : '0'}</div>
                    <div className="comments"><i></i>{post.comments ? post.comments.count : '0'}</div>
                    <a className="pin"><i></i></a>
                </div>
            </div>
        );
    }

}

module.exports = InstaPost;