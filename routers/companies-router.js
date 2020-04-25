const router = require('express').Router();

const Co = require('../helpers/companies-model.js');

const {
  GET_ALL_COMPANY_ERROR,
  GET_COMPANY_ERROR,
  ADD_COMPANY_ERROR,
  UPDATE_COMPANY_ERROR,
  DELETE_COMPANY_ERROR
} = require('../config/errors.js');

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
    .catch(err => res.status(500).send({message: GET_ALL_COMPANY_ERROR}));
});

//*************** GET COMPANIES BY FILTER *****************//
router.get('/filter', (req, res) => {
  const filter = req.params.filter;

  Co.findCompaniesBy(filter)
    .then(company => {
      res.json(company);
    })
    .catch(err => res.status(500).send({message: GET_COMPANY_ERROR}));
});

//*************** GET COMPANY BY ID *****************//
router.get('/:companyId', validateCompanyId, (req, res) => {
  res.status(200).json(res.locals.company);
});

//****** GET REVIEWS ASSOCIATED WITH COMPANY NAME ******//

router.get('/:companyId/reviews', validateCompanyId, (req, res) => {
  res.status(200).json(res.locals.company.reviews);
});

//***************** ADD NEW COMPANY *******************//
router.post('/', checkForCompanyData, (req, res) => {
  let company = req.body;

  Co.addCompany(company)
    .then(newCompany => {
      res.status(201).json(newCompany);
    })
    .catch(err => {
      res.status(500).json({message: ADD_COMPANY_ERROR});
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
      res.status(500).json({message: UPDATE_COMPANY_ERROR});
    });
});

//****************** DELETE COMPANY ********************//
router.delete('/:companyId', checkForAdmin, validateCompanyId, async (req, res) => {
  try {
    const deleted = await Co.deleteCompany(res.locals.company.id);
    res.status(200).json(deleted);
  } catch {
    res.status(500).json({message: DELETE_COMPANY_ERROR});
  }
});

/**************************************************************************/

module.exports = router;
