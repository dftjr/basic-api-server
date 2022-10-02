'use strict';

const app = require('./../src/server');
const supertest = require('supertest');
const request = supertest(app);

describe('Testing server', () => {
  test('Should respond with 404 on bad routes', async () => {
    const response = await request.get('/badroute');
    expect(response.status).toEqual(404);
  });
  test('Should respond with 404 on bad method', async () => {
    const response = await request.patch('/badmethod');
    expect(response.status).toEqual(404);
  });
});

describe('Testing GET', () => {
  test('Should show a single food', async () => {
    const response = await request.get('/food/?name=Apple&quantity=1');
    expect(response.status).toEqual(200);
    expect(response.body.name).toEqual('Apple');
    expect(response.body.quantity).toEqual('1');
  });
  test('Should show all food', async () => {
    const response = await request.get('/food/');
    expect(response.status).toEqual(200);
    expect(Array.isArray(response.body)).toEqual(true);
  });
  test('Should create a food', async () => {
    const response = await (await request.post('/food')).send({
      name: 'Apple',
      quantity: 1,
    });
    expect(response.status).toEqual(200);
    expect(response.body.name).toEqual('Apple');
    expect(response.body.quantity).toEqual('1');
  });
  test('Should update a food', async () => {
    const response = await request.put('/food/1');
    expect(response.status).toEqual(200);
    expect(Array.isArray(response.body)).toEqual(true);
  });
  test('Should delete a food', async () => {
    const response = await request.delete('/food/1');
    expect(response.status).toEqual(200);
    expect(Array.isArray(response.body)).toEqual(true);
  });
});
