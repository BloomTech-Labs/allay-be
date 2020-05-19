const router = require('express').Router();

const Co = require('../helpers/companies-model.js');

const {
  GET_ALL_COMPANY_ERROR,
  GET_COMPANY_ERROR,
  ADD_COMPANY_ERROR,
  UPDATE_COMPANY_ERROR,
  DELETE_COMPANY_ERROR,
} = require('../config/errors.js');

const {
  checkForCompanyData,
  validateCompanyId,
  checkForAdmin,
} = require('../middleware/index.js');

/**************************************************************************/

//                for endpoints beginning with /companies                 //

/**************************************************************************/

//************** GET ALL COMPANIES ****************//
router.get('/', async (req, res) => {
  try {
    const companies = await Co.findCompanies();
    res.json(companies);
  } catch (e) {
    console.log(e);
    res.status(500).send({message: GET_ALL_COMPANY_ERROR});
  }
});

//*************** GET COMPANIES BY FILTER *****************//
router.get('/filter', (req, res) => {
  const filter = req.params.filter;

  Co.findCompaniesBy(filter)
    .then(company => {
      res.json(company);
    })
    .catch(err => {
      console.log(err);
      res.status(500).send({message: GET_COMPANY_ERROR});
    });
});

//*************** GET COMPANY BY ID *****************//
router.get('/:companyId', validateCompanyId, (req, res) => {
  res.json(res.locals.company);
});

//****** GET REVIEWS ASSOCIATED WITH COMPANY NAME ******//
router.get('/:companyId/reviews', validateCompanyId, (req, res) => {
  res.json(res.locals.company.reviews);
});

//***************** ADD NEW COMPANY *******************//
router.post('/', checkForCompanyData, async (req, res) => {
  let company = req.body;

  try {
    const newCompany = await Co.addCompany(company);
    res.status(201).json(newCompany);
  } catch (e) {
    console.log(e);
    res.status(500).json({message: ADD_COMPANY_ERROR});
  }
});

//************* UPDATE COMPANY INFO ****************//
router.put(
  '/:companyId',
  checkForCompanyData,
  validateCompanyId,
  async (req, res) => {
    const changes = req.body;

    try {
      await Co.updateCompany(res.locals.company.id, changes);
      res.json({info: changes});
    } catch (e) {
      console.log(e);
      res.status(500).json({message: UPDATE_COMPANY_ERROR});
    }
  }
);

//****************** DELETE COMPANY ********************//
router.delete(
  '/:companyId',
  checkForAdmin,
  validateCompanyId,
  async (req, res) => {
    try {
      const deleted = await Co.deleteCompany(res.locals.company.id);
      res.json(deleted);
    } catch (e) {
      console.log(e);
      res.status(500).json({message: DELETE_COMPANY_ERROR});
    }
  }
);

/**************************************************************************/

module.exports = router;
