console.log('server.js loadind...');

var fs = require('fs');
var path = require('path');
var express = require('express'),
	products = require('./routes/products');
var bodyParser = require('body-parser');
var app = express();
var cookieParser = require('cookie-parser')
var session = require('express-session')
var uuid = require('node-uuid');

app.use(cookieParser())
app.use(session({
  genid: function(req) {
    return uuid.v4();
  },
  resave: true,
  saveUninitialized: true,
  secret: 'keyboard cat'
}))

app.set('port', (process.env.PORT || 3000));

app.use('/', express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

/**
API Server Funcionalidades do carrinho de compras
*/
app.get('/products/:page', products.findAll);
app.post('/products', products.addProduct);
app.post('/products/:id', products.deleteProduct);
app.post('/cart', products.saveCart);

var server = app.listen(app.get('port'), function() {
	console.log('Server started: http://localhost:' + app.get('port') + '/');
});

module.exports = server;