'use strict';

const logger = require('../src/middleware/logger.js');

describe('Testing logger middleware', () => {
  test('Should log something when invoked', () => {
    jest.spyOn(console, 'log');
    let request = {
      method: 'TEST',
      path: 'TEST',
      query: 'TEST',
    };
    const response = {};
    const next = jest.fn();
    logger(request, response, next);
    expect(console.log).toHaveBeenCalledWith('Request method' + request.method, 'Request path' + request.path);
  });
});
