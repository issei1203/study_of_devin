import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from './index';

describe('Express App', () => {
  it('should return "Hello world" on GET /', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.text).toBe('Hello world');
  });
});
