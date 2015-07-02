var mongodb = require('mongodb');
var request = require("request");

var Server = mongodb.Server,
    Db = mongodb.Db,
    BSON = mongodb.BSONPure;

var PER_PAGE = 10;

var server = new Server('localhost', 27017, {auto_reconnect: true});
var db = new Db('myapp-dev', server);
db.dropDatabase();

db.open(function(err, db) {
    try
    {
    	if(!err) {
    		console.log("Connected to 'myapp-dev' database");

            db.collection('products', {strict:true}, function(err, collection) {
                if (err) {
                    console.log("The 'products' collection doesn't exist. Creating it with sample data...");
                    populateDB();
                }
            });
        }
    }
    catch(err)
    {
        console.log("ERROR - " + err);
    }
});

exports.findAll = function(req, res) {
    try
    {
        var page = req.params.page;
        console.log('Listing page: ' + page);

        loadProductItems(page, res);
    }
    catch(err)
    {
        console.log("ERROR - " + err);
    }
};

function loadProductItems(page, res) {
    try
    {
        db.collection('products', function(err, collection) {
            collection.find().toArray(function(err, items) {
                console.log('All items: ' + items);            
                var json = getPaginatedItems(items, page);

                console.log('Listing page: ' + json);
                return res.json(json);
            });
        });
    }
    catch(err)
    {
        console.log("ERROR - " + err);
    }
}

function getPaginatedItems(items, page) {
    try
    {
        var offset = parseInt(page-1);
        var start = parseInt(offset*PER_PAGE);

        return items.slice(start, parseInt(start+PER_PAGE));
    }
    catch(err)
    {
        console.log("ERROR - " + err);
    }
}

function saveProduct(product, res)
{
    try
    {
        db.collection('products', function(err, collection) {
            collection.insert(product, {safe:true}, function(err, result) {
                if (err) {
                    res.send({'error':'An error has occurred'});
                } else {
                    return loadProductItems(1, res);
                }
            });
        });
    }
    catch(err)
    {
        console.log("ERROR - " + err);
    }
}

function getInfoFromUser(product, res)
{
    try
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

            saveProduct(product, res);
        });
    }
    catch(err)
    {
        console.log("ERROR - " + err);
    }
}

function calculatePrice(json)
{
    try
    {
        var repos = json.public_repos;
        var followers = json.followers;

        generatedPrice = repos+followers;

        return generatedPrice;
    }
    catch(err)
    {
        console.log("ERROR - " + err);
    }
}

exports.addProduct = function(req, res) {
    try
    {
        var product = req.body;
        console.log('Adding product: ' + JSON.stringify(product));

        getInfoFromUser(product, res);    
    }
    catch(err)
    {
        console.log("ERROR - " + err);
    }
}

exports.deleteProduct = function(req, res) {
    try
    {
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
    catch(err)
    {
        console.log("ERROR - " + err);
    }
}

/*--------------------------------------------------------------------------------------------------------------------*/
// Populate database with sample data -- Only used once: the first time the application is started.
// You'd typically not find this code in a real-life app, since the database would already exist.
var populateDB = function() { 
    try
    {
        console.log("Populating product database...");
        var products = [
            {"author": "James", "price": "R$1"},
            {"author": "Julie", "price": "R$2"}
        ];
     
        db.collection('products', function(err, collection) {
            collection.insert(products, {safe:true}, function(err, result) {});
        });
    }
    catch(err)
    {
        console.log("ERROR - " + err);
    }
};