console.log('server.js loadind...');
var fs = require('fs');
var path = require('path');
var express = require('express'),
	products = require('./routes/products');
var bodyParser = require('body-parser');
var app = express();

app.set('port', (process.env.PORT || 3000));

app.use('/', express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/products', products.findAll);
app.post('/products', products.addProduct);
app.post('/products/:id', products.deleteProduct);

var server = app.listen(app.get('port'), function() {
	console.log('Server started: http://localhost:' + app.get('port') + '/');
});

module.exports = server;