const db = require('../data/dbConfig.js');

module.exports = {
  findCompanies,
  findCompaniesBy,
  findCompanyById,
  findCompanyReviews,
  addCompany,
  updateCompany,
  deleteCompany,
};

// FIND ALL COMPANIES
function findCompanies() {
  return db('companies');
}

// FIND COMPANIES BY A SPECIFIC FILTER (MUST BE A COLUMN IN THE USERS TABLE AND USE {<ARGUMENT>})
function findCompaniesBy(filter) {
  return db('companies').where(filter);
}

// FIND COMPANY BY ID
function findCompanyById(id) {
  return db('companies')
    .where({id})
    .first()
    .then(company => {
      if (!company) return null;

      return findCompanyReviews(company.company_name).then(companyReviews => {
        return {
          ...company,
          reviews: companyReviews,
        };
      });
    });
}

// FIND ONLY THE REVIEWS ASSOCIATED WITH A COMPANY BY COMPANY NAME (FK)
function findCompanyReviews(companyName) {
  return db('reviews as r').where('r.company_name', companyName);
}

// ADD A COMPANY TO THE DATABASE
function addCompany(company) {
  return db('companies')
    .insert(company, 'id')
    .then(ids => {
      const [id] = ids;
      return findCompanyById(id);
    });
}

// UPDATE AN EXISTING COMPANY
function updateCompany(id, changes) {
  return db('companies')
    .where({id})
    .update(changes)
    .then(count => (count > 0 ? findCompanyById(id) : null));
}

// DELETE AN EXISTING COMPANY
function deleteCompany(id) {
  return db('companies').where({id}).del();
}
