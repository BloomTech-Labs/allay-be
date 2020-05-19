const {
  createCompany,
  createReview,
  createUser,
  resetTable,
} = require('./utils/');
const db = require('../data/dbConfig');
const Review = require('../helpers/reviews-model');

const company = createCompany();
const user = createUser();
const review = createReview();

describe('Models Reviews', () => {
  beforeAll(async () => {
    await resetTable('reviews', 'users', 'companies');
    await db('companies').insert(company);
    await db('users').insert(user);
    await db('reviews').insert(review);
  });

  describe('findReviewById()', () => {
    it('Returns user when review found', async () => {
      const foundReview = await Review.findReviewsById(review.id);
      expect(foundReview.review_id).toBe(review.id);
    });

    it('Returns null when no review found', async () => {
      const foundReview = await Review.findReviewsById(2);

      expect(foundReview).toBeUndefined();
    });
  });
});
