'use strict';

const app = require('../src/server');
const supertest = require('supertest');
const request = supertest(app);

describe('Testing Validator', () => {
  test('Should respond with 200 if the name is in the query string', async () => {
    const response = await request.get('/food?name=Banana&quantity=1');
    expect(response.status).toEqual(200);
    expect(response.body.name).toEqual('Banana');
    expect(response.body.quantity).toEqual('1');
  });
  test('Should respond with 500 if no name in the query string', async () => {
    const response = await request.get('/food');
    expect(response.status).toEqual(500);
  });
});
