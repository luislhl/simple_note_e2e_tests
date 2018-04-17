'use strict';

process.env.NODE_ENV = 'test';

const cypress = require('cypress');

console.log('Process Env', process.env);

return cypress.run({
  config: {
    baseUrl: process.env.FRONTEND_URL || 'http://localhost:3000'
  },
  env: {
    DYNAMODB_REGION: process.env.DYNAMODB_REGION,
    DYNAMODB_ADDRESS: process.env.DYNAMODB_ADDRESS,
    DYNAMODB_NOTES_TABLE: process.env.DYNAMODB_NOTES_TABLE,
    AWS_ACCESS_KEY_ID:  process.env.AWS_ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY
  }
});
