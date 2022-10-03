'use strict';

const express = require('express');
const app = express();
const logger = require('./middleware/logger.js');
const validator = require('./middleware/validator.js');
const throw404 = require('./error-handlers/404');
const throw500 = require('./error-handlers/500');
const foodRouter = require('./routes/food.js');

app.use(logger);
app.use(express.json());
app.use('*', throw404);
app.use(throw500);

app.use(foodRouter);

app.get('/food', validator, (request, response) => {
  response.json({
    name: request.query.name,
  });
});

module.exports = app;
