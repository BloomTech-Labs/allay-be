const jwt = require('jsonwebtoken');
const {jwtSecret} = require('../config/secret.js');
const Users = require('../helpers/users-model.js');
const Companies = require('../helpers/companies-model.js');
const Revs = require('../helpers/reviews-model.js');

const {
  UNAUTHORIZED_ERROR,
  MISSING_TOKEN_ERROR,
  INVALID_TOKEN_ERROR,
  MISSING_BODY_INFO_ERROR,
  MISSING_REQUIRED_BODY_FIELD,
  GET_USER_ERROR,
  USER_NOT_FOUND_ERROR,
  GET_REVIEW_ERROR,
  REVIEW_NOT_FOUND_ERROR,
  GET_COMPANY_ERROR,
  COMPANY_NOT_FOUND_ERROR,
} = require('../config/errors.js');

module.exports = {
  restricted,
  checkForRegisterData,
  checkForLoginData,
  validateUserId,
  checkForCompanyData,
  validateCompanyId,
  checkForReviewData,
  validateReviewId,
  checkForAdmin,
};

// Auth Router

function restricted({headers: {authorization}}, res, next) {
  if (!authorization)
    return res.status(401).json({message: MISSING_TOKEN_ERROR});

  jwt.verify(authorization, jwtSecret, (err, decodedToken) => {
    if (err) return res.status(401).json({message: INVALID_TOKEN_ERROR});

    res.locals.authorizedUser = {
      id: decodedToken.id,
      email: decodedToken.email,
      admin: decodedToken.admin,
    };
    next();
  });
}

function checkForRegisterData(req, res, next) {
  if (Object.keys(req.body).length === 0) {
    res.status(400).json({message: MISSING_BODY_INFO_ERROR});
  } else if (
    !req.body.password ||
    !req.body.email ||
    !req.body.track_id ||
    !req.body.first_name ||
    !req.body.last_name ||
    !req.body.cohort
  ) {
    res.status(400).json({message: MISSING_REQUIRED_BODY_FIELD});
  } else {
    res.locals.newUser = req.body;
    next();
  }
}

function checkForLoginData(req, res, next) {
  if (Object.keys(req.body).length === 0) {
    res.status(400).json({message: MISSING_BODY_INFO_ERROR});
  } else if (!req.body.email || !req.body.password) {
    res.status(400).json({message: MISSING_REQUIRED_BODY_FIELD});
  } else {
    res.locals.newUser = req.body;
    next();
  }
}

// Users Router

async function validateUserId({params: {userId}}, res, next) {
  try {
    const user = await Users.findUserById(userId);
    if (!user) return res.status(404).json({message: USER_NOT_FOUND_ERROR});

    res.locals.user = user;
    next();
  } catch (e) {
    console.log(e);
    res.status(500).json({message: GET_USER_ERROR});
  }
}

// Companies Router

function checkForCompanyData(req, res, next) {
  if (Object.keys(req.body).length === 0) {
    res.status(400).json({message: MISSING_BODY_INFO_ERROR});
  } else if (!req.body.company_name || !req.body.state_id) {
    res.status(400).json({message: MISSING_REQUIRED_BODY_FIELD});
  } else {
    res.locals.newCompany = req.body;
    next();
  }
}

async function validateCompanyId({params: {companyId}}, res, next) {
  try {
    const company = await Companies.findCompanyById(companyId);
    if (!company)
      return res.status(404).json({message: COMPANY_NOT_FOUND_ERROR});

    res.locals.company = company;
    next();
  } catch (e) {
    console.log(e);
    res.status(500).json({message: GET_COMPANY_ERROR});
  }
}

// Reviews Router

async function validateReviewId({params: {revId}}, res, next) {
  try {
    const review = await Revs.findReviewsById(revId);
    if (!review) return res.status(404).json({message: REVIEW_NOT_FOUND_ERROR});

    res.locals.review = review;
    next();
  } catch (e) {
    console.log(e);
    res.status(500).json({message: GET_REVIEW_ERROR});
  }
}

function checkForReviewData(req, res, next) {
  if (Object.keys(req.body).length === 0) {
    res.status(400).json({message: MISSING_BODY_INFO_ERROR});
  } else {
    res.locals.newReview = req.body;
    next();
  }
}

//Admin Middleware
function checkForAdmin(req, res, next) {
  if (!res.locals.authorizedUser.admin)
    return res.status(403).json({message: UNAUTHORIZED_ERROR});

  next();
}
