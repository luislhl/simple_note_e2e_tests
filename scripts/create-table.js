/* eslint-disable */

var AWS = require("aws-sdk");

AWS.config.update({
  region: process.env.DYNAMODB_REGION || 'us-east-1',
  endpoint: process.env.DYNAMODB_ADDRESS || 'http://localhost:8000',
	accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
});

var dynamodb = new AWS.DynamoDB();

var params = {
  TableName : process.env.DYNAMODB_NOTES_TABLE || 'Notes',
  KeySchema: [
    { AttributeName: "id", KeyType: "HASH" }
  ],
  AttributeDefinitions: [
    { AttributeName: "id", AttributeType: "S" },
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 8,
    WriteCapacityUnits: 8
  }
};

dynamodb.createTable(params, function(err, data) {
  if (err) {
    console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
  } else {
    console.log("Created table. Table description JSON:", JSON.stringify(data, null, 2));
  }
});
