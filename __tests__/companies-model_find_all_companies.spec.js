const {createCompany, createReview, resetTable} = require('./utils/');
const db = require('../data/dbConfig');
const Company = require('../helpers/companies-model');


const company = createCompany();
const review = createReview();


describe('Models Companies', () => {
  beforeAll(async () => {
    await resetTable('companies', 'reviews');
    await db('companies').insert(company);
    await db('reviews').insert(review);
  });

  describe('findCompanies()', () => {
    it('Gets all companies', async () => {
      const companies = await Company.findCompanies();

      expect(companies).toHaveLength(1);
      expect(companies[0]).toMatchObject(company);
    });
  });
});
