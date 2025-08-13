const request = require('supertest');
const app = require('../app');
const db = require('../db');

beforeAll(async () => {
  await db.connect();
});

afterAll(async () => {
  await db.close();
});

beforeEach(async () => {
  await db.clear();
});

describe('Member API', () => {
  describe('POST /api/members', () => {
    it('should register a new member', async () => {
      const response = await request(app)
        .post('/api/members')
        .send({
          name: 'John Doe',
          email: 'john@example.com',
          address: '123 Library St'
        });
      
      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('id');
      expect(response.body.name).toBe('John Doe');
    });

    it('should validate required fields', async () => {
      const response = await request(app)
        .post('/api/members')
        .send({
          name: 'John Doe'
        });
      
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
    });
  });
});

describe('Book API', () => {
  let memberId;
  let bookId;

  beforeEach(async () => {
    // Create test member and book
    const memberResponse = await request(app)
      .post('/api/members')
      .send({
        name: 'Test User',
        email: 'test@example.com',
        address: '123 Test St'
      });
    memberId = memberResponse.body.id;

    const bookResponse = await request(app)
      .post('/api/books')
      .send({
        title: 'Test Book',
        isbn: '1234567890',
        quantity: 1
      });
    bookId = bookResponse.body.id;
  });

  describe('POST /api/checkouts', () => {
    it('should checkout a book successfully', async () => {
      const response = await request(app)
        .post('/api/checkouts')
        .send({
          memberId,
          bookId
        });
      
      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('dueDate');
    });

    it('should not allow checkout if book is unavailable', async () => {
      // First checkout
      await request(app)
        .post('/api/checkouts')
        .send({ memberId, bookId });

      // Second checkout attempt
      const response = await request(app)
        .post('/api/checkouts')
        .send({ memberId, bookId });
      
      expect(response.status).toBe(400);
      expect(response.body.error).toMatch(/not available/i);
    });
  });

  describe('POST /api/returns', () => {
    beforeEach(async () => {
      // Checkout a book first
      await request(app)
        .post('/api/checkouts')
        .send({ memberId, bookId });
    });

    it('should return a book successfully', async () => {
      const response = await request(app)
        .post('/api/returns')
        .send({
          memberId,
          bookId
        });
      
      expect(response.status).toBe(200);
      expect(response.body.status).toBe('returned');
    });

    it('should calculate late fees if applicable', async () => {
      // Mock date to simulate late return
      jest.useFakeTimers();
      jest.setSystemTime(Date.now() + 31 * 24 * 60 * 60 * 1000); // 31 days later

      const response = await request(app)
        .post('/api/returns')
        .send({
          memberId,
          bookId
        });
      
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('lateFee');
      expect(response.body.lateFee).toBeGreaterThan(0);

      jest.useRealTimers();
    });
  });
});
