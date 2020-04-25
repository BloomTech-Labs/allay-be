const router = require('express').Router();

const Co = require('../helpers/companies-model.js');
const {
  checkForCompanyData,
  validateCompanyId,
  checkForAdmin
} = require('../middleware/index.js');

/**************************************************************************/

//                for endpoints beginning with /companies                 //

/**************************************************************************/

//************** GET ALL COMPANIES ****************//
router.get('/', (req, res) => {
  Co.findCompanies()
    .then(company => {
      res.json(company);
    })
    .catch(err => res.send(err));
});

//*************** GET COMPANIES BY FILTER *****************//
router.get('/filter', (req, res) => {
  const filter = req.params.filter;

  Co.findCompaniesBy(filter)
    .then(company => {
      res.json(company);
    })
    .catch(err => res.send(err));
});

//*************** GET COMPANY BY ID *****************//
router.get('/:companyId', validateCompanyId, (req, res) => {
  res.status(200).json(res.locals.company);
});

//****** GET REVIEWS ASSOCIATED WITH COMPANY NAME ******//

router.get('/:companyId/reviews', validateCompanyId, (req, res) => {
  const {reviews} = res.locals.company;

  if (reviews.length > 0) {
    res.status(200).json(reviews);
  } else {
    res
      .status(404)
      .json({ error: 'Can not find any reviews for this company' });
  }
});

//***************** ADD NEW COMPANY *******************//
router.post('/', checkForCompanyData, (req, res) => {
  let company = req.body;

  Co.addCompany(company)
    .then(newCompany => {
      res.status(201).json(newCompany);
    })
    .catch(err => {
      res.status(500).json({ error: 'There was an error adding a company' });
    });
});

//************* UPDATE COMPANY INFO ****************//
router.put('/:companyId', checkForCompanyData, validateCompanyId, (req, res) => {
  const changes = req.body;

  Co.updateCompany(res.locals.company.id, changes)
    .then(info => {
      res.status(200).json({ info: changes });
    })
    .catch(err => {
      res.status(500).json({ message: 'Error updating company info' });
    });
});

//****************** DELETE COMPANY ********************//
router.delete('/:companyId', checkForAdmin, validateCompanyId, async (req, res) => {
  try {
    const deleted = await Co.deleteCompany(res.locals.company.id);
    res.status(200).json(deleted);
  } catch {
    res
      .status(500)
      .json({ message: 'There was an error deleting company account.' });
  }
});

/**************************************************************************/

module.exports = router;
