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
  });

  describe('addReview()', () => {
    it('Adds review', async () => {
      await Review.addReview(review);

      const reviews = await db('reviews');

      expect(reviews).toHaveLength(1);
    });
  });
});
