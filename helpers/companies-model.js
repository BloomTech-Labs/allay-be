const {find, findBy, findById, add, update, remove} = require('./base-model');


function process(method, ...args) {
  return method('companies', ...args);
}


// FIND ALL COMPANIES
function findCompanies() {
  return process(find);
}


// FIND COMPANIES BY A SPECIFIC FILTER (MUST BE A COLUMN IN THE USERS TABLE AND USE {<ARGUMENT>})
function findCompaniesBy(filter, first = false) {
  return process(findBy, filter, first);
}


// FIND COMPANY BY ID
function findCompanyById(id) {
  return process(findById, id);
}


// FIND ONLY THE REVIEWS ASSOCIATED WITH A COMPANY BY COMPANY NAME (FK)
function findCompanyReviews(companyName) {
  return findBy('reviews', {company_name: companyName});
}


// ADD A COMPANY TO THE DATABASE
function addCompany(company) {
  return process(add, company);
}


// UPDATE AN EXISTING COMPANY
function updateCompany(id, changes) {
  return process(update, id, changes);
}


// DELETE AN EXISTING COMPANY
function deleteCompany(id) {
  return process(remove, id);
}


module.exports = {
  findCompanies,
  findCompaniesBy,
  findCompanyById,
  findCompanyReviews,
  addCompany,
  updateCompany,
  deleteCompany
};
