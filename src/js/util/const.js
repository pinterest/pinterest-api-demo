/*
 *  Container for constants
 */
var redirect = window.location.origin + window.location.pathname;

module.exports = {
    ONE_WEEK: 1000 * 60 * 60 * 24 * 7,
    POPUP_OPTIONS: 'status=no,resizable=yes,scrollbars=yes,personalbar=no,directories=no,location=no,toolbar=no,menubar=no,width=700,height=500,left=0,top=0',
    IG_OAUTH: 'https://instagram.com/oauth/authorize/?client_id=886a47a524e14842bb4dde8b4d2823c9&redirect_uri='+ redirect +'&response_type=token',
    IG_FEED: 'https://api.instagram.com/v1/users/self/media/recent/?count=12&callback=_instaFeed&access_token=',
    IG_COOKIE: 'ig_token',
    PIN_APP: '4791914336287198612',
    PIN_FIELDS: 'id,name,image[small]',
    PIN_SCOPE: 'read_public, write_public'
};
