'use strict';

function validator(request, response, next) {
  if (request.query.name && request.query.quantity)
    next();
  if (!request.query.name || request.query.quantity)
    next('No name on request');
}

module.exports = validator;
