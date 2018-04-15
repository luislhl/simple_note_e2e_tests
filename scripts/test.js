'use strict';

process.env.NODE_ENV = 'test';

const cypress = require('cypress');

return cypress.run({
  config: {
    baseUrl: process.env.FRONTEND_URL || 'http://localhost:3000'
  }
});
