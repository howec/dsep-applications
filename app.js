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

io.on('connection', function(socket){
	console.log('a user connected');
	console.log('user socket id is: ' + socket.id);

	socket.on('disconnect', function(){
		console.log('a user disconnected');
	});

	socket.on("test", function(data){
		console.log('attempt to send data: ' + data.testing);
		sendPartnerSpreadsheet();

	})
});

/*

Setup Spreadsheets!
=====================================================================================

*/
const GoogleSpreadsheet = require('google-spreadsheet');
const creds = require('./GitIgnore/apis_backend_client_secret.json');

let temp1 = '1oDulgNWoAIK3oaR8xyiLMyksooe0Qe-44HBi1WIL0BE';
let temp2 = '';

var partnerSheet = '';
var studentSheet = '';

setPartnerSpreadsheetURL(temp1);


function parseURL(url){
	//to implement

	return url;
}

function setPartnerSpreadsheetURL(url){
	partnerSheet = new GoogleSpreadsheet(parseURL(url));
}

function setStudentSpreadsheetURL(url){
	studentSheet = new GoogleSpreadsheet(parseURL(url));
}

function sendPartnerSpreadsheet(){
	// Authenticate with the Google Spreadsheets API.
	partnerSheet.useServiceAccountAuth(creds, function (err) {

	  // Get all of the rows from the spreadsheet.
	  partnerSheet.getRows(1, function (err, rows) {
	    // console.log(rows);

	    //HOWE LOOK HERE
	    //TODO: add functionality to send to SPECIFIC socket!!!!
	    //that means I need to know WHO is calling this function

	    // for (var k = 0; k<rows.length; k++){
	    // 	console.log(rows[k]);
	    // }

	    for (const x in rows[0]){
	    	console.log(x);
	    }

	    // console.log(rows[0]["emailaddress"])
	    // console.log(rows[0]);
	    // for (var k = 0; k<rows[0].length;k++)

	    // io.emit("sendingattempt", {attempt: rows[1].emailaddress});


	  });
	});

}

function sendStudentSpreadsheet(){
	// Authenticate with the Google Spreadsheets API.
	studentSheet.useServiceAccountAuth(creds, function (err) {

	  // Get all of the rows from the spreadsheet.
	  studentSheet.getRows(1, function (err, rows) {
	    // console.log(rows);
	  });
	});
} 



//------
var partnerColumns = {}


//to be instantiated during server startup
//then whenever 
function getPartnerColumns(){
	let temp = {}

	// Authenticate with the Google Spreadsheets API.
	partnerSheet.useServiceAccountAuth(creds, function (err) {

	  // Get all of the rows from the spreadsheet.
	  partnerSheet.getRows(1, function (err, rows) {

	  	var count = 0;
	    for (const key in rows[0]){
	    	temp[count] = key;
	    	count = count + 1;
	    }
	    partnerColumns = temp;
		console.log("I've been called");
		// console.log(rows[0][partnerColumns[5]]);
	  });
	});
}

getPartnerColumns();
console.log("LOOK HERE!!!");
console.log("Finally?");
console.log(partnerColumns);
// console.log(typeof staffSelections)
// console.log(staffSelections);
// console.log(staffSelections[0]);

function updatePartnerSheets(){

	// Authenticate with the Google Spreadsheets API.
	partnerSheet.useServiceAccountAuth(creds, function (err) {

	  // Get all of the rows from the spreadsheet.
	  partnerSheet.getInfo(function (err, data) {

	  	function persistenceCreated(wsName){
	  		let headersArray;
	  		if (wsName == "Staff Values"){
	  			headersArray = ["Selected Spreadsheet Columns", "Updates"];
	  		}

	  		if(wsName == "Partner Values"){
	  			headersArray = ["Project", "Lead", "Hash Identifier", "Hashed Username", "Hashed Password", "Interested Apps", "Interviewed Apps", "Accepted Apps", "Waitlisted Apps", "Rejected Apps"]
	  		}

	  		for(const ws of data.worksheets){
	  			if(ws.title == wsName){
	  				return true;
	  			}
	  		}
	  		//need to check if adding rows will automatically expand the spreadsheet, or if the amount of space needs to be specified first
	  		partnerSheet.addWorksheet({title: wsName, headers: headersArray}, function(err){
	  			//fill in code to put 

	  		});
	  		return false;
	  	}

	  	if (persistenceCreated("Staff Values")){
	  		console.log("Should be entered now that it's created");

	  		//fill in code to replace values

	  	}


	  	if (persistenceCreated("Partner Values")){
	  		console.log("Should be entered now that it's created");

	  		//fill in code to replace values

	  	}

	  	console.log(data.worksheets[0].title);

	  });
	});


}

updatePartnerSheets();






const port = process.env.PORT || 3001
server.listen(port, function() {
    console.log("Listening on port", port); //similar to pythonic f-string
	}
);


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

app.get('/staff.html', function(req, res) {
    res.sendFile(__dirname + '/Webpages/staff.html');
});
