const {createCompany, resetTable} = require('./utils/');
const db = require('../data/dbConfig');
const Company = require('../helpers/companies-model');

const company = createCompany();

describe('Models Companies', () => {
  beforeAll(async () => {
    await resetTable('companies');
  });

  describe('addCompany()', () => {
    it('Adds company', async () => {
      await Company.addCompany(company);

      const reviews = await db('companies');

      expect(reviews).toHaveLength(1);
    });
  });
});
