'use strict';
const app = require('../src/server');
const supertest = require('supertest');
const request = supertest(app);
const { Food, db } = require('../src/models');

beforeAll(async () => {
  await db.sync();
});


describe('Testing Validator', () => {
  test('Should respond with 200 if the name is in the query string', async () => {
    const response = await request.get('/food?name=Beef');
    expect(response.status).toEqual(200);
    expect(response.body.name).toEqual('Beef');
  });
  test('Should respond with 500 if no name in the query string', async () => {
    const response = await request.get('/food');
    expect(response.status).toEqual(500);
  });
});

describe('Testing POST models', () => {
  test('Should create a single food', async () => {
    let food = await Food.create({
      name: 'Beef',
    });
    expect(food.id).toBeTruthy();
    expect(food.name).toEqual('Beef');
  });
});

describe('Testing GET models', () => {
  test('Should read from our food table', async () => {
    let food = await Food.findAll();
    console.log(food);
    expect(food.length).toBeTruthy();
  });

  test('Should read a single food', async () => {
    let food = await Food.findOne({ where: { id: 1 }});
    expect(food.name).toEqual('Beef');
  });
});

describe('Testing PUT models', () => {
  test('Should update a single food', async () => {
    await Food.update({ name: 'Beef' },{ where: { id: 1 }});
    let food = await Food.findOne({ where: { id: 1 }});
    expect(food.name).toEqual('Beef');
  });
});

describe('Testing DELETE models', () => {
  test('Should be able to destroy a food', async () => {
    await Food.destroy({ where: { id: 1 }});
    let food = await Food.findOne({ where: { id: 1 }});
    expect(food).not.toBeTruthy();
  });
});
