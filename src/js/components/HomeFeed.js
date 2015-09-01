var React = require('react');

var Pinterest = require('../util/pinterest');
var Instagram = require('../util/instagram');

var InstaPost = require('./InstaPost');
var BoardPicker = require('./BoardPicker');
var Spinner = require('./Spinner');

require('../../scss/HomeFeed.scss');

/*
 *  Grid View Component for Instagram Posts
 *  @prop  {Function} onAuthRequired - parent method for redirect
 *  @state {Array}    posts          - list of remote Instagram posts
 *  @state {Object}   selectedPost   - currently selected post object
 */
class HomeFeed extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = { posts: [], boards: [] };
    }

    /*
     *  Fetch remote data from Instagram and Pinterest
     */
    componentDidMount() {
        if (!Instagram.loggedIn() || !Pinterest.loggedIn()) {
            return this.context.router.transitionTo('login');
        }
        this.fetchFeedData();
        this.fetchBoardData();
    }

    /*
     *  Set feed scroll status on update
     */
    componentDidUpdate() {
        document.body.classList.toggle('noscroll', !!this.state.selectedPost);
    }

    /*
     *  Clear cookies and redirect to login view
     */
    logout() {
        Pinterest.logout();
        Instagram.logout();
        this.context.router.transitionTo('login');
    }

    /*
     *  Handle opening/closing of board picker modal
     *  @param {Object} post - Instagram post object, null closes modal
     *  @param {Event}  e    - DOM event object
     */
    showBoardPicker(post, e) {
        if (post || e.target.className === 'BoardPicker' || e.target.className === 'close') {
            this.setState({ selectedPost: post });
        }
    }

    /*
     *  Create remote Pin via Pinterest SDK and close modal
     *  @param {Object} options - data to use for new Pin
     */
    postPin(options) {
        Pinterest.createPin(options, response => {
            this.setState({ selectedPost: null });
        });
    }

    /*
     *  Fetch next page of Instagram feed
     */
    loadMore() {
        this.fetchFeedData(this.state.nextPage);
    }

    /*
     *  Fetch user boards from Pinterest
     */
    fetchBoardData() {
        Pinterest.myBoards(response => {
            this.setState({ boards: response.data.sort((a,b) => a.name > b.name ? 1 : -1) });
        });
    }

    /*
     *  Fetch feed data from Instagram
     *  @param {String} url - paged Instagram feed resource
     */
    fetchFeedData(url) {
        Instagram.myFeed(url, response => {
            this.setState({
                nextPage: response.pagination.next_url,
                posts: this.state.posts.concat(response.data || []),
                user: response.data[0].user
            });
        });
    }

    /*
     *  Render helper for clarity in logic
     *  @param {String} type - internal map to render component
     */
    _render(type) {
        switch (type) {
            case 'Loader':
                return <Spinner className="large" />;
            case 'LoadMore':
                return <div className="load-more" onClick={this.loadMore.bind(this)}>LOAD MORE</div>;
            case 'BoardPicker':
                return <BoardPicker boards={this.state.boards} post={this.state.selectedPost} postPin={this.postPin.bind(this)} close={this.showBoardPicker.bind(this, null)}/>;
            case 'InstaPosts':
                return this.state.posts.map(post => {
                    return <InstaPost post={post} key={post.id} boardPicker={this.showBoardPicker.bind(this)}/>;
                });
            case 'Header':
                return (
                    <div className="header">
                        <a className="logout" onClick={this.logout.bind(this)}>Log out</a>
                        <img src={this.state.user.profile_picture} />
                        <h1>{this.state.user.full_name}</h1>
                        <h3>Select an image and a board to Pin your post!</h3>
                    </div>
                )
        }
    }

    /*
     *  Return JSX representation of component view
     */
    render () {
        const {posts, selectedPost, nextPage} = this.state;
        return (
            <div className='HomeFeed'>
                { posts.length  ? this._render('Header')      : this._render('Loader') }
                { selectedPost  ? this._render('BoardPicker') : null }
                { posts.length  ? this._render('InstaPosts')  : null }
                { nextPage      ? this._render('LoadMore')    : null }
            </div>
        );
    }

}

HomeFeed.contextTypes = {
    router: React.PropTypes.func.isRequired
};

module.exports = HomeFeed;