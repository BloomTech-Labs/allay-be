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
router.get('/:id', validateCompanyId, (req, res) => {
  const { id } = req.params;

  Co.findCompanyById(id)
    .then(company => {
      res.json(company);
    })
    .catch(err => res.send(err));
});

//****** GET REVIEWS ASSOCIATED WITH COMPANY NAME ******//

router.get('/:id/reviews', validateCompanyId, (req, res) => {
  const { id } = req.params;

  Co.findCompanyReviews(id)
    .then(reviews => {
      if (reviews.length > 0) {
        res.status(200).json(reviews);
      } else {
        res
          .status(404)
          .json({ error: 'Can not find any reviews for this company' });
      }
    })
    .catch(err => res.send(err));
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
router.put('/', checkForCompanyData, (req, res) => {
  const changes = req.body;
  const id = req.company.id;

  Co.updateCompany(id, changes)
    .then(info => {
      if (info) {
        res.status(200).json({ info: changes });
      } else {
        res.status(404).json({ message: 'Error locating company info' });
      }
    })
    .catch(err => {
      res.status(500).json({ message: 'Error updating company info' });
    });
});

//****************** DELETE COMPANY ********************//
router.delete('/:id', validateCompanyId,checkForAdmin, async (req, res) => {
  const { id } = req.params;

  try {
    const user = await Co.findCompanyById(id);
    if (user) {
      const deleted = await Co.deleteCompany(id);
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: 'Error locating company.' });
    }
  } catch {
    res
      .status(500)
      .json({ message: 'There was an error deleting company account.' });
  }
});

/**************************************************************************/

module.exports = router;
