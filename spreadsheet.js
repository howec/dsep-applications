var GoogleSpreadsheet = require('google-spreadsheet');
var creds = require('./GitIgnore/client_secret.json');

// Create a document object using the ID of the spreadsheet - obtained from its URL.
var doc = new GoogleSpreadsheet('1oDulgNWoAIK3oaR8xyiLMyksooe0Qe-44HBi1WIL0BE');

// Authenticate with the Google Spreadsheets API.
doc.useServiceAccountAuth(creds, function (err) {

  // Get all of the rows from the spreadsheet.
  doc.getRows(1, function (err, rows) {
    console.log(rows);
  });
});