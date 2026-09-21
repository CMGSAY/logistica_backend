const request = require('supertest');
const { app } = require('../../index');

describe('API Endpoints Testing', () => {
  
  test('GET /api/roles debe retornar estado 200 y un array', async () => {
    const res = await request(app).get('/api/roles');
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBeTruthy();
  });

  test('GET /api/usuarios debe retornar estado 200 y un array', async () => {
    const res = await request(app).get('/api/usuarios');
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBeTruthy();
  });

  test('GET /api/vehiculos debe retornar estado 200 y un array', async () => {
    const res = await request(app).get('/api/vehiculos');
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBeTruthy();
  });

});
