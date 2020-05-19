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

  describe('updateReview()', () => {
    it('Updates review', async () => {
      const oldReview = await db('reviews').where({id: review.id}).first();
      const changes = {job_title: 'test'};

      await Review.updateReview(1, changes);

      const updatedReview = await db('reviews').where({id: review.id}).first();

      expect({...oldReview, ...changes}).toEqual(updatedReview);
    });
  });
});
