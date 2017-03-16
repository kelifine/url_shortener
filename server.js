var express = require('express');
var app = express(); 
var path = require('path');
var validUrl = require('valid-url');
var MongoClient = require('mongodb').MongoClient;
var address = 'mongodb://localhost:27017/myUrlsDb';


var object = {}; 
var reqUrl;
var base; 
var count = 0;
var invalid = {
            Error: "Please enter a valid URL"
        };

MongoClient.connect(address, function(err, db) {
    if (err) return console.log(err);
  createValidated(db, function() {
    db.close();
  });
});


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
        if (err) return console.log(err);
      console.log("Collection created.");
      callback();
    }
  );
};



function objectify (input) {
    count+=1;
        object = {
            original_url: input,
            short_url: base.concat('/'+count)
        };
}

function addObject () {
    MongoClient.connect(address, function(err, db) {
        if (err) return console.log(err);
        db.collection('used').insert(object);
        db.close();
    });
}

function check (callback) {
    MongoClient.connect(address, function(err, db) {
        if (err) return console.log(err); 
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
    });
}



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

app.listen(8080);
