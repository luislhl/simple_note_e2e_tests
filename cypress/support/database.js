const AWS = require('aws-sdk');

console.log('Cypress Env: ', Cypress.env());

AWS.config.update({
  region: Cypress.env('DYNAMODB_REGION') || 'us-east-1',
  endpoint: Cypress.env('DYNAMODB_ADDRESS') || 'http://localhost:8000',
  accessKeyId: Cypress.env('AWS_ACCESS_KEY_ID') || 'FakeAccessKeyId',
  secretAccessKey: Cypress.env('AWS_SECRET_ACCESS_KEY') || 'FakeSecretAccessKey',
});

const dynamodb = new AWS.DynamoDB();
const docClient = new AWS.DynamoDB.DocumentClient();

const notesTable = Cypress.env('DYNAMODB_NOTES_TABLE') || 'Notes-Test';

function feedNotes(notes) {
  const promises = [];

  notes.forEach((note) => {
    const params = {
      TableName: notesTable,
      Item: {
        "id": note.id,
        "content": note.content,
      }
    };

    promises.push(new Promise((resolve, reject) => {
      docClient.put(params, function (err, data) {
        if (err) {
          reject(new Error(`Unable to add note ${note.id}. Error JSON ${JSON.stringify(err, null, 2)}`));
        } else {
          resolve(`PutItem succeeded: ${note.id}`);
        }
      });
    }));
  });

  return Promise.all(promises);
}

function createNotesTable() {
  const params = {
    TableName: notesTable,
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

  return new Promise((resolve, reject) => {
    dynamodb.createTable(params, function(err, data) {
      if (err) {
        console.log(`Unable to create table. Error JSON: ${JSON.stringify(err, null, 2)}`);
        reject(new Error(`Unable to create table. Error JSON: ${JSON.stringify(err, null, 2)}`));
      } else {
        console.log(`Created table. Table description JSON: ${JSON.stringify(data, null, 2)}`);
        resolve(`Created table. Table description JSON: ${JSON.stringify(data, null, 2)}`);
      }
    });
  });
}

function deleteNotesTable() {
  const params = {
    TableName: notesTable
  };

  console.log('On verge of deleting table');
  return new Promise((resolve, reject) => {
    dynamodb.deleteTable(params, function (err, data) {
      if (err) {
        console.log(`Unable to delete table. Error JSON: ${JSON.stringify(err, null, 2)}`)
        resolve(`Unable to delete table. Error JSON: ${JSON.stringify(err, null, 2)}`);
      } else {
        console.log(`Deleted table. Table description JSON: ${JSON.stringify(data, null, 2)}`);
        resolve(`Deleted table. Table description JSON: ${JSON.stringify(data, null, 2)}`);
      }
    });
  });
}

function resetDatabase() {
  return deleteNotesTable().then(() => {
    return createNotesTable();
  });
}

export default {
  feedNotes,
  resetDatabase
};
