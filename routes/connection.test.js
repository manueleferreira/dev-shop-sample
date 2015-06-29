var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var url = 'mongodb://localhost/myapp-test';
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  assert.ok(db != null);
  console.log("Connected correctly to server.");
  db.close();
});
