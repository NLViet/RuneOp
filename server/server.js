/**
 * Created by Viet on 04.08.2015.
 */
console.log('Hello Node');
var connect = require('connect');
var http = require('http');
var serveStatic = require('serve-static');

var app = connect();

app.use(serveStatic("../client"));
app.listen(5000);


console.log("Server started and listen to http://127.0.0.1:5000");
