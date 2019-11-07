//"" -- indicates figures of speech or variable names
//'' -- strings

/*
"Require" the express module and bind it to a variable named "express"
Instantiate it and bind it to a variable named "app"
*/
const express = require('express');
const app = express();

/*
Create a preconfigured requestListener function with the express object.
	This will be executed everytime the "server" gets a request.
Set up socket.io to listen on the same port as whatever the server was configured on.
*/
const server = require('http').createServer(app);
const io = require('socket.io')(server);




const port = process.env.PORT || 3000
server.listen(port, function() {
    console.log("Listening on port", port); //similar to pythonic f-string
	}
);


//Serve the index.html file
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/Webpages/index.html');
});