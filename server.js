console.log('server.js loadind...');
var fs = require('fs');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.set('port', (process.env.PORT || 3000));

app.use('/', express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/products.json', function(req, res) {
  fs.readFile('products.json', function(err, data) {
    res.setHeader('Cache-Control', 'no-cache');
    res.json(JSON.parse(data));
  });
});

app.post('/products.json', function(req, res) {
  fs.readFile('products.json', function(err, data) {
    var products = JSON.parse(data);
    products.push(req.body);
    fs.writeFile('products.json', JSON.stringify(products, null, 4), function(err) 
    {
       res.setHeader('Cache-Control', 'no-cache');
       res.json(products);
    });
  });
});


app.listen(app.get('port'), function() {
  console.log('Server started: http://localhost:' + app.get('port') + '/');
});