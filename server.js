var express = require('express');
var app = express();

app.set('views', __dirname + '/src');
app.set('view engine', 'jade');

app.get('/', function(req, res) {
    res.render('index', { prod: process.env.NODE_ENV === 'production' });
});

// Start server
app.set('port', (process.env.PORT || 5000));
app.listen(app.get('port'));
