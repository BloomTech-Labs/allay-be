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

  describe('GET /api/reviews/:reviewId', () => {
    it('Return correct body', async () => {
      const {body, status, type} = await request(`/api/reviews/${review.id}`, {
        token,
      });

      expect(status).toBe(200);
      expect(type).toBe('application/json');

      const reviewInfo = JSON.parse(
        JSON.stringify(await Review.findReviewsById(review.id))
      );

      expect(body).toEqual(reviewInfo);
    });
  });
});
