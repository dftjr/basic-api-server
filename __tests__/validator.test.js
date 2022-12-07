'use strict';
const app = require('../src/server');
const supertest = require('supertest');
const request = supertest(app);
const { Food, db } = require('../src/models');

beforeAll(async () => {
  await db.sync();
});

describe('Testing the 404 error handling', () => {
  test('Should respond with a 404 for incorrect method', async () => {
    const response = await request.post('/incorrectMethod');
    expect(response.status).toEqual(404);
  });

  test('Should respond with a 404 for incorrect route', async () => {
    const response = await request.get('/incorrectRoute');
    expect(response.status).toEqual(404);
  });
});

describe('Testing POST food route', () => {
  test('Should create a single food item', async () => {
    const response = await request.post('/food').send({
      foodName: 'nameTest1',
    });
    expect(response.status).toEqual(200);
    expect(response.body.foodName).toEqual('nameTest1');
  });
});

describe('Testing GET food routes', () => {
  test('Should read all food items', async () => {
    const response = await request.get('/food');
    expect(response.status).toEqual(200);
    expect(Array.isArray(response.body)).toEqual(true);
  });

  test('Should read a single food item', async () => {
    const response = await request.get('/food/1');
    expect(response.status).toEqual(200);
    expect(response.body.foodName).toEqual('nameTest1');
  });
});


describe('Testing PUT food route', () => {
  test('Should update a single food item', async () => {
    await request.put('/food/1').send({
      foodName: 'nameTest1Updated',
    });
    const response = await request.get('/food/1');
    expect(response.status).toEqual(200);
    expect(response.body.id).toEqual(1);
    expect(response.body.foodName).toEqual('nameTest1Updated');
  });
});

describe('Testing DELETE food route', () => {
  test('Should delete a single food item', async () => {
    await request.delete(`/food/1`);
    const foodRecord = await Food.findOne({ where: { id : 1}});
    expect(foodRecord).not.toBeTruthy();
  });
});

