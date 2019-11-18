//"" -- indicates figures of speech or variable names
//'' -- strings

/*
"Require" the express module and bind it to a variable named "express"
Instantiate it and bind it to a variable named "app"
*/
const express = require('express');
const app = express();


//app.use(express.static(.));
/*
this command configures where your webpages are being served from... if the app.js (or server file)
isn't in the same directory as your .html or .css files, then it will look for those kind of files
within the current directory of where your app.s (or server file) is stored!

this command essentially sets the default location as wherever you specify within the .static() method.
*/

// app.use(express.static(__dirname + '/node_modules'));
//must remember to send js and css files
/*
Following function calls establish webpages that you can visit

function(request, response)
*/
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/Webpages/index.html');
});

//CHANGE THIS TO USE AND DIRECTORIES OF PAGES
app.get('/index.html', function(req, res) {
    res.sendFile(__dirname + '/Webpages/index.html');
});

app.get('/students.html', function(req, res) {
    res.sendFile(__dirname + '/Webpages/students.html');
});

app.get('/partners.html', function(req, res) {
    res.sendFile(__dirname + '/Webpages/partners.html');
});

app.get('/dsep.html', function(req, res) {
    res.sendFile(__dirname + '/Webpages/dsep.html');
});


/*
Create a preconfigured requestListener function with the express object.
	This will be executed everytime the "server" gets a request.
Set up socket.io to listen on the same port as whatever the server was configured on.
*/
const server = require('http').createServer(app);
const io = require('socket.io')(server);

io.on('connection', function(socket){
  console.log('a user connected');
  console.log('user socket id is: ' + socket.id);

	socket.on('disconnect', function(){
	    console.log('user disconnected');
	  });

	socket.emit('test2', {a:0});

});


// io.emit('test', {data: "nothingyet2"});

/*
TODO: Figure out how to modularize node.js code
Spreadsheets Functionality
*/

let temp1 = '1oDulgNWoAIK3oaR8xyiLMyksooe0Qe-44HBi1WIL0BE';
let temp2 = '';

const Spreadsheet = require('./Spreadsheet.js')

var partnerSheet = new Spreadsheet(temp1, io);

// console.log(partnerSheet.getRows());

partnerSheet.getRows();

// var x = partnerSheet.getRows();
// console.log(x)

// test();




const port = process.env.PORT || 3000
server.listen(port, function() {
    console.log("Listening on port", port); //similar to pythonic f-string
	}
);



