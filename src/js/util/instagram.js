var Cookie = require('react-cookie');
var Const = require('./const');

/*
 *  Wrapper for all Instagram API interactions
 */
var Instagram = {
    /*
     *  Open an Instagram OAuth window and catch the redirect callback from OAuth.js
     *  @param {Function} callback - function fired on completion
     */
    login: function(callback) {
        var popup = window.open(Const.IG_OAUTH, null, Const.POPUP_OPTIONS);
        window._instaLogin = (token) => {
            Cookie.save(Const.IG_COOKIE, token);
            popup.close();
            callback();
        };
    },
    /*
     *  Remove the Instagram cookie
     */
    logout: function() {
        Cookie.remove(Const.IG_COOKIE);
    },
    /*
     *  Check to see if there is a cookie set. In the future it may
     *  be nice to attempt a request to verify token is valid
     *  @returns {Boolean}
     */
    loggedIn: function() {
        return !!Cookie.load(Const.IG_COOKIE);
    },
    /*
     *  JSONP request feed data. 
     *  @param {String}   url      - contains base url and pagination data
     *  @param {Function} callback - function fired on completion
     */
    myFeed: function(url, callback) {
        var script = document.createElement('SCRIPT');
        script.src = url || Const.IG_FEED + Cookie.load(Const.IG_COOKIE);

        // this callback is pointed to in the IG_FEED const
        window._instaFeed = (response) => {
            callback(response);
            document.head.removeChild(script);
        }
        document.head.appendChild(script);
    }
};

module.exports = Instagram;