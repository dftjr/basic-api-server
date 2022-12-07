'use strict';

function validator(request, response, next) {
  if (request.body.foodName)
    next();
  if (!request.body.foodName)
    next('No name on request');
}

module.exports = validator;
