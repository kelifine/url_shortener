var express = require('express');
var app = express(); 
var path = require('path');
var validUrl = require('valid-url');
var MongoClient = require('mongodb').MongoClient;
var address = process.env.MONGOLAB_URI;


var object = {}; 
var reqUrl;
var base; 
var count = 0;
var invalid = {
            Error: "Please enter a valid URL"
        };

//Error handler
function error (){
    return console.log(error);
}


// Require an original url and a short url in each document in a collection
var createValidated = function(db, callback) {
  db.createCollection("used", 
	   {
	      'validator': { '$and':
	         [
	            { 'original_url': { '$type': "string" } },
	            { 'short_url': { '$type': "string"} },
	         ]
	      }
	   },	   
    function(err, results) {
        if (!err) {
      console.log("Collection created.");
      callback();
        }
        else {
            error();
        }
    }
  );
};

//Create validated collection
MongoClient.connect(address, function(err, db) {
    if (!err) {
  createValidated(db, function() {
    db.close();
  });
    }
    else {
        error();
    }
});

//Create object to add to collection
function objectify (input) {
    count+=1;
        object = {
            original_url: input,
            short_url: base.concat('/'+count)
        };
}

//Add object to collection
function addObject () {
    MongoClient.connect(address, function(err, db) {
        if (!err) {
        db.collection('used').insert(object);
        db.close();
        }
        else {
            error();
        }
    });
}

//Check if url already exists in database, if so assign those values to object, if not assign new values to object and add it to the database
function check (callback) {
    MongoClient.connect(address, function(err, db) {
        if (!err) {
        var cursor = db.collection('used').find({original_url: reqUrl}).toArray(function(err, documents) {
            if (err) console.log(err);
            console.log(documents.length);
            console.log(documents);
            if (documents.length>0) {
          object = {
              original_url: documents[0].original_url,
              short_url: documents[0].short_url
          };
          callback();
                db.close();
                return;
        } 
        else if (documents.length===0) {
            objectify(reqUrl);
        console.log(object);
            addObject();
            callback();
            db.close();
            return;
            }
       
        });
        }
        else {
            error();
        }
    });
}


//If url is invalid, return error message, if not check for it in the database and send it
app.get('*', function (req,res) {
    reqUrl = req.originalUrl.substr(1);
    base = req.protocol + '://' + req.get('host');
    if (validUrl.isUri(reqUrl)===undefined) {
        res.send(invalid);
    }
    else {
    check(function () {
        console.log(object);
        res.send(object);
    });
    }
});

app.listen(process.env.PORT||8080);
