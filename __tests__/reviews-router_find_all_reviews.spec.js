const {
  createCompany,
  createReview,
  createUser,
  resetTable,
  request,
} = require('./utils/');
const db = require('../data/dbConfig');
const signToken = require('../config/token');
const Review = require('../helpers/reviews-model');

const company = createCompany();
const user = createUser();
const review = createReview();

const token = signToken(user);

describe('Routers Reviews', () => {
  beforeAll(async () => {
    await resetTable('reviews', 'users', 'companies');
    await db('companies').insert(company);
    await db('users').insert(user);
    await db('reviews').insert(review);
  });

  describe('GET /api/reviews', () => {
    it('Returns correct body', async () => {
      const {body, status, type} = await request('/api/reviews', {token});

      expect(status).toEqual(200);
      expect(type).toEqual('application/json');

      const reviews = JSON.parse(JSON.stringify(await Review.findReviews()));

      expect(body).toEqual(reviews);
    });
  });
});
