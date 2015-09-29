
# Pinterest API Demo

A client for saving Instagram posts to Pinterest.

View the [demo here](http://pinterest.github.io/pinterest-api-demo/)

It is really simple to interact with the new developer API by using the [Pinterest Javascript SDK](http://assets.pinterest.com/sdk/sdk.js). It provides shorthands for accessing endpoints, and more importantly, provides one-line solutions for oauth authentication with Pinterest.

```javascript
PDK.login({ scope : PIN_SCOPE }, callback);
PDK.logout();
```

The callback contains a `session` object that can also be accessed via `PDK.getSession()`. If a user is not authenticated, the function returns `undefined`. The scope is related to what kind of access your app would like (read_public, write_public, read_relationships, write_relationships). Scope is a comma-delimited list of requested types.

### Demo functions
Here are the methods being used in this demo application:

| Code          | Response      | Description  |
| ------------- |:-------------:| ------------:|
| PDK.login({ scope : PIN_SCOPE }, callback)         | { accessToken }            | Opens an oauth login popup |
| PDK.logout()                                       | none                       | Deletes the session/cookie |
| PDK.request('/pins/', 'POST', data, callback)      | { data: {id,link,note,url }| Creates a new pin object   |
| PDK.me('boards', { fields: PIN_FIELDS }, callback) | { data: [board, ...] }     | Fetches the current user's boards |

### Examples
Here is code found directly in `/src/js/util/pinterest.js` of the demo app. They are clear examples of how to use the SDK to interact with the developer API.

```javascript
/*
 *  Use SDK to create a new Pin
 *  @param {Object}   data     - {board, note, link, image_url}
 *  @param {Function} callback - function fired on completion
 */
createPin: function(data, callback) {
    PDK.request('/pins/', 'POST', data, callback);
}
```

```javascript
/*
 *  Use SDK to request current users boards
 *  @param {Function} callback - function fired on completion
 */
myBoards: function(callback) {
    PDK.me('boards', { fields: Const.PIN_FIELDS }, callback);
}
```
