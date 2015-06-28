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


//app.get('/comments.json', function(req, res) {
//  fs.readFile('comments.json', function(err, data) {
//    res.setHeader('Cache-Control', 'no-cache');
//    res.json(JSON.parse(data));
//  });
//});

//app.post('/comments.json', function(req, res) {
//  fs.readFile('comments.json', function(err, data) {
//    var comments = JSON.parse(data);
//    comments.push(req.body);
//    fs.writeFile('comments.json', JSON.stringify(comments, null, 4), function(err) {
//      res.setHeader('Cache-Control', 'no-cache');
//      res.json(comments);
//    });
//  });
//});


app.listen(app.get('port'), function() {
  console.log('Server started: http://localhost:' + app.get('port') + '/');
});