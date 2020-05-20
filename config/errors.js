const UNAUTHORIZED_ERROR = 'Unauthorized for this endpoint.';
const MISSING_TOKEN_ERROR = 'No authorization token provided.';
const INVALID_TOKEN_ERROR = 'Invalid authorization token provided.';
const MISSING_BODY_INFO_ERROR = 'Missing body info data.';
const MISSING_REQUIRED_BODY_FIELD = 'Missing required body fields.';

const GET_ALL_USER_ERROR = 'There was an error getting all users.';
const GET_USER_ERROR = 'There was an error getting user.';
const USER_NOT_FOUND_ERROR = 'No user found.';
const USER_NO_CHANGES_ERROR = 'No changes to update.';
const UPDATE_USER_ERROR = 'There was an error updating user.';
const DELETE_USER_ERROR = 'There was an error deleting user.';
const WRONG_USER_ERROR = 'Wrong user.';
const DUPLICATE_USER_ERROR = 'User already exists.';

const GET_ALL_REVIEW_ERROR = 'There was an error getting all reviews.';
const GET_REVIEW_ERROR = 'There was an error getting review.';
const REVIEW_NOT_FOUND_ERROR = 'No review found.';
const ADD_REVIEW_ERROR = 'There was an error adding review.';
const UPDATE_REVIEW_ERROR = 'There was an error updating review.';
const DELETE_REVIEW_ERROR = 'There was an error deleting review.';

const GET_ALL_COMPANY_ERROR = 'There was an error getting all companies.';
const GET_COMPANY_ERROR = 'There was an error getting company.';
const COMPANY_NOT_FOUND_ERROR = 'No company found.';
const ADD_COMPANY_ERROR = 'There was an error adding company.';
const UPDATE_COMPANY_ERROR = 'There was an error updating company.';
const DELETE_COMPANY_ERROR = 'There was an error deleting company.';

module.exports = {
  UNAUTHORIZED_ERROR,
  MISSING_TOKEN_ERROR,
  INVALID_TOKEN_ERROR,
  MISSING_BODY_INFO_ERROR,
  MISSING_REQUIRED_BODY_FIELD,

  GET_ALL_USER_ERROR,
  GET_USER_ERROR,
  USER_NOT_FOUND_ERROR,
  USER_NO_CHANGES_ERROR,
  UPDATE_USER_ERROR,
  DELETE_USER_ERROR,
  WRONG_USER_ERROR,
  DUPLICATE_USER_ERROR,

  GET_ALL_REVIEW_ERROR,
  GET_REVIEW_ERROR,
  REVIEW_NOT_FOUND_ERROR,
  ADD_REVIEW_ERROR,
  UPDATE_REVIEW_ERROR,
  DELETE_REVIEW_ERROR,

  GET_ALL_COMPANY_ERROR,
  GET_COMPANY_ERROR,
  COMPANY_NOT_FOUND_ERROR,
  ADD_COMPANY_ERROR,
  UPDATE_COMPANY_ERROR,
  DELETE_COMPANY_ERROR,
};
