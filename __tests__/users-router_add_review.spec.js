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

const method = 'post';
const token = signToken(user);

describe('Routers Users', () => {
  beforeAll(async () => {
    await resetTable('reviews', 'users', 'companies');
    await db('companies').insert(company);
    await db('users').insert(user);
  });

  describe('POST /api/users/:userId/add-review', () => {
    it('Returns correct body', async () => {
      const {body, status, type} = await request(
        `/api/users/${user.id}/add-review`,
        {
          method,
          token,
          body: review,
        }
      );

      expect(status).toBe(201);
      expect(type).toBe('application/json');

      const newReview = JSON.parse(
        JSON.stringify(await Review.findReviewsById(review.id))
      );

      expect(body).toEqual(newReview);
    });
  });
});
