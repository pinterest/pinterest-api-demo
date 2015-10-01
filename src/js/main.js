var React = require('react');
var Router = require('react-router');
var App = require('./components/App');
var HomeFeed = require('./components/HomeFeed');
var Login = require('./components/Login');

var Route = Router.Route;
var IndexRoute = Router.IndexRoute;
var Router = Router.Router;

/*
 *  Client Side Route Handler
 */
var routes = (
    <Route path= "/" component={App}>
        <IndexRoute component={Login} />
        <Route path="feed" component={HomeFeed} />
    </Route>
);

if (window.location.hash.indexOf('access_token') !== -1) {
    var token = window.location.hash.split('=')[1];
    window.opener._instaLogin(token);
} else {
    React.render(<Router routes={routes} />, document.getElementById('content'));
}
