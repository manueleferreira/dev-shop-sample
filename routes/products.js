var mongodb = require('mongodb');
var request = require("request");

var Server = mongodb.Server,
    Db = mongodb.Db,
    BSON = mongodb.BSONPure;

var server = new Server('localhost', 27017, {auto_reconnect: true});
var db = new Db('myapp-dev', server);
db.dropDatabase();

db.open(function(err, db) {
	if(!err) {
		console.log("Connected to 'myapp-dev' database");

        db.collection('products', {strict:true}, function(err, collection) {
            if (err) {
                console.log("The 'products' collection doesn't exist. Creating it with sample data...");
                populateDB();
            }
        });
    }
});

exports.findAll = function(req, res) {
    db.collection('products', function(err, collection) {
        collection.find().toArray(function(err, items) {
        	res.send(items);
        });
    });
};

function saveProduct(product)
{
    db.collection('products', function(err, collection) {
        collection.insert(product, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                console.log('Success: ' + JSON.stringify(result[0]));
                res.send(result[0]);
            }
        });
    });
}

function getInfoFromUser(product)
{
    var url = "https://api.github.com/users/"+product.author;
    request({
        uri: url,
        method: "GET",
        timeout: 10000,
        followRedirect: true,
        maxRedirects: 10,
        headers: {'user-agent': 'manueleferreira'}
    }, 
    function(error, response, body) {
        var json = JSON.parse(body);
        product.price = calculatePrice(json);
        
        console.log("price: "+product.price);

        saveProduct(product);
    });
}

function calculatePrice(json)
{
    var repos = json.public_repos;
    var followers = json.followers;

    generatedPrice = repos+followers;

    return generatedPrice;
}

exports.addProduct = function(req, res) {
    var product = req.body;
    console.log('Adding product: ' + JSON.stringify(product));

    getInfoFromUser(product);    
}

exports.deleteProduct = function(req, res) {
    var id = req.params.id;
    console.log('Deleting product: ' + id);
    db.collection('products', function(err, collection) {
        collection.remove({'_id':new BSON.ObjectID(id)}, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred - ' + err});
            } else {
                console.log('' + result + ' document(s) deleted');
                res.send(req.body);
            }
        });
    });
}

/*--------------------------------------------------------------------------------------------------------------------*/
// Populate database with sample data -- Only used once: the first time the application is started.
// You'd typically not find this code in a real-life app, since the database would already exist.
var populateDB = function() { 
    console.log("Populating product database...");
    var products = [
        {"author": "James", "price": "R$1"},
        {"author": "Julie", "price": "R$2"}
    ];
 
    db.collection('products', function(err, collection) {
        collection.insert(products, {safe:true}, function(err, result) {});
    });
};