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

function restricted({headers: {authorization}}, res, next) {
  if (!authorization) return res.status(401).json({errorMessage: 'Must be an authorized user / token is missing'});

  jwt.verify(authorization, jwtSecret, (err, decodedToken) => {
    if (err) return res.status(401).json({errorMessage: 'The provided token is invalid / expired'});

    res.locals.authorizedUser = {id: decodedToken.id, email: decodedToken.email, admin: decodedToken.admin};
    next();
  });
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
    res.locals.newUser = req.body;
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
    res.locals.newUser = req.body;
    next();
  }
}

// Users Router

function validateUserId({params: {userId}}, res, next) {
  Users.findUserById(userId)
    .then(user => {
      if (!user) return res.status(404).json({errorMessage: 'The user with the specified ID does not exist.'});

      res.locals.user = user;
      next();
    })
    .catch(() => res.status(500).json({errorMessage: 'Could not validate user information for the specified ID.'}));
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
    res.locals.newCompany = req.body;
    next();
  }
}

function validateCompanyId({params: {companyId}}, res, next) {
  Companies.findCompanyById(companyId)
    .then(company => {
      if (!company) return res.status(404).json({errorMessage: 'The company with the specified ID does not exist'});

      res.locals.company = company;
      next();
    })
    .catch(() => res.status(500).json({errorMessage: 'Could not validate company information for the specified ID'}));
}

// Reviews Router

function validateReviewId({params: {revId}}, res, next) {
  Revs.findReviewsById(revId)
    .then(review => {
      if (!review) return res.status(404).json({errorMessage: 'The review with the specified ID does not exist'});

      res.locals.review = review;
      next();
    })
    .catch(() => res.status(500).json({errorMessage: 'Could not validate review information for the specified ID'}));
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
  if (!res.locals.authorizedUser.admin) return res.status(403).json({errorMessage: 'not authorized to access'});

  next()
}
