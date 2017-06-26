URL Shortener


Introduction
------------------
This app is my version of the URL shortener program from FreeCodeCamp. 
 
How to get up and running
-----------------
To start using this program do the following:  
1. Run command ‘npm install’ at root to install dependencies.  
2. Run command ‘node server.js’ to begin localhosting of the application.  
 
How to use
----------------
To use/test this application (once it’s running) I recommend using google's "Postman" software. Once inside you can send requests to the URL Shortener API. An example would be:

Send a GET request like so 
----------------------------
GET: https://kelifine-url-shortener.herokuapp.com/http://www.google.com

{ original_url: "https://kelifine-url-shortener.herokuapp.com/http://www.google.com", short_url: "https://kelifine-url-shortener.herokuapp.com/
1" }

Response you will recive 
----------------------------
{  
  "original_url": "http://www.google.com",  
  "short_url": "http://localhost:8080/1"  
}

