const request = require('supertest');
const express = require('express');
const authRoutes = require('./auth');
const User = require('../models/User');

// Mock User model
jest.mock('../models/User');

const app = express();
app.use(express.json());
app.use('/api/auth', authRoutes);

describe('Auth Routes', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /api/auth/register', () => {
    test('should register a new user successfully', async () => {
      // Mock User.findOne to return null (user doesn't exist)
      User.findOne.mockResolvedValue(null);
      
      // Mock User.create to return a new user
      const mockUser = {
        _id: 'user123',
        email: 'test@example.com',
        name: 'Test User',
        save: jest.fn().mockResolvedValue(true)
      };
      User.create.mockResolvedValue(mockUser);

      const response = await request(app)
        .post('/api/auth/register')
        .send({
          email: 'test@example.com',
          password: 'password123',
          name: 'Test User'
        });

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('message', 'User registered successfully');
    });

    test('should return 400 if user already exists', async () => {
      // Mock User.findOne to return an existing user
      User.findOne.mockResolvedValue({ email: 'test@example.com' });

      const response = await request(app)
        .post('/api/auth/register')
        .send({
          email: 'test@example.com',
          password: 'password123',
          name: 'Test User'
        });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('message', 'User already exists');
    });
  });

  // Add more tests for login and other auth routes
});