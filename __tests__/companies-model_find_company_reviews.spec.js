const {
  createCompany,
  createReview,
  createUser,
  resetTable,
} = require('./utils/');
const db = require('../data/dbConfig');
const Company = require('../helpers/companies-model');

const company = createCompany();
const user = createUser();
const review = createReview();

describe('Models Companies', () => {
  beforeAll(async () => {
    await resetTable('reviews', 'companies', 'users');
    await db('companies').insert(company);
    await db('users').insert(user);
    await db('reviews').insert(review);
  });

  describe('findCompanyReviews()', () => {
    it('Gets company reviews', async () => {
      const company_reviews = await Company.findCompanyReviews(
        company.company_name
      );

      expect(company_reviews).toHaveLength(1);
    });
  });
});
