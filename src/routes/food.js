'use strict';

const express = require('express');
const router = express.Router();
const { Food } = require('../models');

router.get('/food', getFood);
router.get('/food/:id', getOneFood);
router.post('/food', createFood);
router.put('/food/:id', updateFood);
router.delete('/food/:id', deleteFood);

async function getFood(request, response, next) {
  let foodRecords = await Food.read();
  response.status(200);
  response.send(foodRecords);
}

async function getOneFood(request, response, next) {
  let foodRecord = await Food.read(request.params.id);
  response.status(200);
  response.send(foodRecord);
}

async function createFood(request, response, next) {
  let foodRecord = await Food.create(request.body);
  response.status(200);
  response.send(foodRecord);
}

async function updateFood(request, response, next) {
  let foodRecord = await Food.update(request.params.id);
  response.status(200);
  response.send(foodRecord);
}

async function deleteFood(request, response, next) {
  let foodRecord = await Food.delete(request.params.id);
  response.status(200);
  response.send(foodRecord);
}

module.exports = router;
