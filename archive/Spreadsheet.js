//This file aims to return DATA from the spreadsheets, relevant to the specific group requesting it...

const GoogleSpreadsheet = require('google-spreadsheet');
const creds = require('./GitIgnore/apis_backend_client_secret.json');


const package = {}

module.exports = package.Spreadsheet = class {

	constructor(arg, socket){
		console.log('Create a document object using the ID of the spreadsheet - obtained from its URL.');
		this.sheet = new GoogleSpreadsheet(arg);
		this.io = socket;
	}


	test(){
		// Authenticate with the Google Spreadsheets API.

		const sheet = this.sheet;
		const io = this.io;

		sheet.useServiceAccountAuth(creds, function (err) {

		  // Get all of the rows from the spreadsheet.
		  sheet.getRows(1, function (err, rows) {
		    console.log(rows);
		  });
		});
	}
	



	getRows(){
		// Authenticate with the Google Spreadsheets API.

		const sheet = this.sheet;
		const io = this.io;

		sheet.useServiceAccountAuth(creds, function (err) {

		  // Get all of the rows from the spreadsheet.
		sheet.getRows(1, function (err, rows) {
		    // console.log(rows.length);

		    var x = rows;
		    // console.log(x[1].emailaddress);

		    io.emit('test', {testdata: "nothingyet"});

		    console.log(x[1].emailaddress);

		  });
		

		});
	}



}




