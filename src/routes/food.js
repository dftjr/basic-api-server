'use strict';

const express = require('express');
const { Food } = require('../models');
const router = express.Router();

router.get('/food', readFood);
router.get('/food/:id', readOneFood);
router.post('/food', createFood);
router.put('/food/:id', updateFood);
router.delete('/food/:id', deleteFood);

async function readFood(request, response, next) {
  let foodRecords = await Food.findAll();
  response.status(200);
  response.send(foodRecords);
}

async function readOneFood(request, response, next) {
  let foodRecord = await Food.findOne({ where: { id: request.params.id } });
  response.status(200);
  response.send(foodRecord);
}

async function createFood(request, response, next) {
  let foodRecord = await Food.create(request.body);
  response.status(200);
  response.send(foodRecord);
}

async function updateFood(request, response, next) {
  let foodRecord = await Food.update(request.body, { where: { id: request.params.id } });
  response.status(200);
  response.send(foodRecord);
}

async function deleteFood(request, response, next) {
  await Food.destroy({ where: { id: request.params.id } });
  response.status(200);
  response.send(`Id ${request.params.id} deleted`);
}

module.exports = router;
