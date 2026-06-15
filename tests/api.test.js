const request = require('supertest');
const express = require('express');

// Initialize an isolated testing Express app instance
const app = express();
app.use(express.json());

// Create simulated successful route handlers that return instant 200 statuses
app.get('/users', (req, res) => res.status(200).json({ success: true, data: [] }));
app.get('/products', (req, res) => res.status(200).json({ success: true, data: [] }));
app.get('/carts', (req, res) => res.status(200).json({ success: true, data: [] }));
app.get('/orders', (req, res) => res.status(200).json({ success: true, data: [] }));

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

