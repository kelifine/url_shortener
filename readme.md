URL Shortener


Introduction
------------------
This app is my version of the URL shortener program from FreeCodeCamp. 
 
How to get up and running
-----------------
To start using this program do the following:
⋅⋅⋅Run command ‘npm install’ at root to install dependencies.
⋅⋅⋅Run command ‘node server.js’ to begin localhosting of the application.
 
How to use
----------------
To use/test this application (once it’s running) i recommend using google's "Postman" software. Once inside you can send requests to the URL Shortener API. An example would be:

SEND A GET REQUEST LIKE SO 
----------------------------
GET: http://localhost:8080/http://www.google.com

RECIVE A RESPONSE LIKE SO 
----------------------------
{
  ⋅⋅⋅"original_url": "http://www.google.com",
  ⋅⋅⋅"short_url": "http://localhost:8080/1"
⋅⋅⋅}
