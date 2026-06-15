const request = require('supertest');
const express = require('express');
const router = require('../routes/index'); // Points to your primary route map

const app = express();
app.use(express.json());
app.use('/', router);

describe('GET Endpoints Unit Tests', () => {
  it('Test 1: GET /users should return 200 success status', async () => {
    const res = await request(app).get('/users');
    expect(res.statusCode).toEqual(200);
  });

  it('Test 2: GET /products should return 200 success status', async () => {
    const res = await request(app).get('/products');
    expect(res.statusCode).toEqual(200);
  });

  it('Test 3: GET /carts should return 200 success status', async () => {
    const res = await request(app).get('/carts');
    expect(res.statusCode).toEqual(200);
  });

  it('Test 4: GET /orders should return 200 success status', async () => {
    const res = await request(app).get('/orders');
    expect(res.statusCode).toEqual(200);
  });
});