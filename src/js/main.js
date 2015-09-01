var React = require('react');
var Router = require('react-router');
var App = require('./components/App');
var HomeFeed = require('./components/HomeFeed');
var Login = require('./components/Login');

var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;

/*
 *  Client Side Route Handler
 */
var routes = (
    <Route handler={App}>
        <DefaultRoute name="login" handler={Login} />
        <Route name="feed" handler={HomeFeed} />
    </Route>
);

var router = Router.create({ routes: routes });

if (window.location.hash.indexOf('access_token') !== -1) {
    var token = window.location.hash.split('=')[1];
    window.opener._instaLogin(token);
} else {
    router.run((Root) => {
        React.render(<Root/>, document.getElementById('content'));
    });
}