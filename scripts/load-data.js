/* eslint-disable */

var AWS = require("aws-sdk");
var fs = require('fs');

AWS.config.update({
  region: process.env.DYNAMODB_REGION || 'us-east-1',
  endpoint: process.env.DYNAMODB_ADDRESS || 'http://localhost:8000',
	accessKeyId: '',
  secretAccessKey: '',
});

var docClient = new AWS.DynamoDB.DocumentClient();

console.log("Importing notes into DynamoDB. Please wait.");

var allNotes = [{
  id: "1",
  content: "Nota 1"
}, {
  id: "2",
  content: "Nota 2"
}, {
  id: "3",
  content: "Nota 3"
}];

allNotes.forEach(function(note) {
	var params = {
  TableName : process.env.DYNAMODB_NOTES_TABLE || 'Notes-Test',
		Item: {
			"id":  note.id,
			"content": note.content,
		}
	};

	docClient.put(params, function(err, data) {
		if (err) {
			console.error("Unable to add note", note.id, ". Error JSON:", JSON.stringify(err, null, 2));
		} else {
			console.log("PutItem succeeded:", note.id);
		}
	});
});
