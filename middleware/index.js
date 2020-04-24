const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/secret.js');
const Users = require('../helpers/users-model.js');
const Companies = require('../helpers/companies-model.js');
const Revs = require('../helpers/reviews-model.js');

module.exports = {
  restricted,
  checkForRegisterData,
  checkForLoginData,
  validateUserId,
  checkForCompanyData,
  validateCompanyId,
  checkForReviewData,
  validateReviewId,
  checkForAdmin
};

// Auth Router

function restricted(req, res, next) {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, jwtSecret, (err, decodedToken) => {
      if (err) {
        //i.e: the token is not valid
        res
          .status(401)
          .json({ errorMessage: 'The provided token is invalid / expired' });
      } else {
        req.user = { id: decodedToken.id, email: decodedToken.email, admin: decodedToken.admin };
        next();
      }
    });
  } else {
    res
      .status(401)
      .json({ errorMessage: 'Must be an authorized user / token is missing' });
  }
}

function checkForRegisterData(req, res, next) {
  if (Object.keys(req.body).length === 0) {
    res
      .status(400)
      .json({ errorMessage: 'body is empty / missing registration data' });
  } else if (
    !req.body.username ||
    !req.body.password ||
    !req.body.email ||
    !req.body.track_id
  ) {
    res.status(400).json({
      errorMessage: 'username, password, email, and track fields are required'
    });
  } else {
    next();
  }
}

function checkForLoginData(req, res, next) {
  if (Object.keys(req.body).length === 0) {
    res
      .status(400)
      .json({ errorMessage: 'body is empty / missing registration data' });
  } else if (!req.body.username || !req.body.password) {
    res
      .status(400)
      .json({ errorMessage: 'username and password fields are required' });
  } else {
    next();
  }
}

// Users Router

function validateUserId(req, res, next) {
  let { userId } = req.params;
  id = userId;

  Users.findUsersBy({ id })
    .then(user => {
      if (user.length > 0) {
        res.locals.user = user[0];
        next();
      } else {
        res.status(404).json({
          errorMessage: 'The user with the specified ID does not exist.'
        });
      }
    })
    .catch(error => {
      res.status(500).json({
        errorMessage:
          'Could not validate user information for the specified ID.'
      });
    });
}

// Companies Router

function checkForCompanyData(req, res, next) {
  if (Object.keys(req.body).length === 0) {
    res
      .status(400)
      .json({ errorMessage: 'body is empty / missing company data' });
  } else if (!req.body.company_name || !req.body.state_id) {
    res
      .status(400)
      .json({ errorMessage: 'company name and state id is required' });
  } else {
    next();
  }
}

function validateCompanyId(req, res, next) {
  const id = req.params.id;
  Companies.findCompaniesBy({ id })
    .then(company => {
      if (company.length > 0) {
        next();
      } else {
        res.status(404).json({
          errorMessage: 'The company with the specified ID does not exist'
        });
      }
    })
    .catch(erorr => {
      res.status(500).json({
        errorMessage:
          'Could not validate company information for the specified ID'
      });
    });
}

// Reviews Router

function validateReviewId(req, res, next) {
  const { revId } = req.params;
  Revs.findReviewsById(revId)
    .then(review => {
      if (review) {
        res.locals.review = review;
        next();
      } else {
        res.status(404).json({
          errorMessage: 'The review with the specified ID does not exist'
        });
      }
    })
    .catch(erorr => {
      res.status(500).json({
        errorMessage:
          'Could not validate review information for the specified ID'
      });
    });
}

function checkForReviewData(req, res, next) {
  if (Object.keys(req.body).length === 0) {
    res
      .status(400)
      .json({ errorMessage: 'body is empty / missing review data' });
  } else if (
    !req.body.job_title ||
    !req.body.city ||
    !req.body.state_id ||
    !req.body.salary ||
    !req.body.company_name
  ) {
    res.status(400).json({
      errorMessage:
        'job title, job location, salary, and company name are required'
    });
  } else {
    res.locals.newReview = req.body;
    next();
  }
}

//Admin Middleware
function checkForAdmin(req, res, next) {
  if(req.user.admin){
  next()
} else {
  res.status(403).json({ errorMessage: 'not authorized to access'})
  }
}