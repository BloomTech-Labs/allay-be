const {createCompany, resetTable} = require('./utils/');
const db = require('../data/dbConfig');
const Company = require('../helpers/companies-model');

const company = createCompany();

describe('Models Companies', () => {
  beforeAll(async () => {
    await resetTable('companies');
    await db('companies').insert(company);
  });

  describe('findCompaniesById()', () => {
    it('Returns user when review found', async () => {
      const foundReview = await Company.findCompanyById(company.id);
      expect(foundReview.id).toEqual(company.id);
    });

    it('Returns null when no review found', async () => {
      const foundReview = await Company.findCompanyById(2);

      expect(foundReview).toBeNull();
    });
  });
});
