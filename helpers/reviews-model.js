const {find, findBy, findById, add, update, remove} = require('./base-model');


function process(method, ...args) {
  return method('reviews', ...args);
}


// FIND ALL REVIEWS
function findReviews() {
  return process(find);
}


// FIND REVIEWS BY A SPECIFIC FILTER
function findReviewsBy(filter, first = false) {
  return process(findBy, filter, first);
}


// FIND REVIEW BY ID
function findReviewsById(id) {
  return process(findById, id);
}


// ADD A NEW REVIEW
function addReview(review) {
  return process(add, review);
}


// UPDATE AN EXISTING REVIEW
function updateReview(id, changes) {
  return process(update, id, changes);
}


// DELETE AN EXISTING REVIEW
function deleteReview(id) {
  return process(remove, id);
}


module.exports = {
  findReviews,
  findReviewsBy,
  findReviewsById,
  addReview,
  updateReview,
  deleteReview
};
