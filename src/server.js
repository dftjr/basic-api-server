'use strict';

const express = require('express');
const app = express();
const logger = require('./middleware/logger.js');
const validator = require('./middleware/validator.js');
const throw404 = require('./error-handlers/404');
const throw500 = require('./error-handlers/500');
const cors = require('cors');
const foodRouter = require('./routes/food');

app.use(express.json());
app.use(cors);
app.use(logger);
app.use('*', throw404);
app.use(throw500);
app.use(foodRouter);

app.get('/', (request, response) => {
  response.status(200).send('Welcome to the server!');
});

module.exports = app;
