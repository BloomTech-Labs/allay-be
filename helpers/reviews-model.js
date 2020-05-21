const db = require('../data/dbConfig');

module.exports = {
  findReviews,
  findReviewsBy,
  findReviewsById,
  addReview,
  updateReview,
  deleteReview,
};

// FIND ALL REVIEWS
function findReviews() {
  return db('reviews as r')
    .select(
      'r.id as review_id',
      'u.id as user_id',
      'u.first_name as user_first_name',
      'u.last_name as user_last_name',
      'u.profile_image as user_profile_image',
      't.track_name',
      'rt.review_type',
      'c.company_name',
      'c.domain as logo',
      'ws.work_status ',
      'r.job_title',
      'r.city',
      's.state_name',
      'r.start_date',
      'r.end_date',
      'r.interview_rounds',
      'r.phone_interview',
      'r.resume_review',
      'r.take_home_assignments',
      'r.online_coding_assignments',
      'r.portfolio_review',
      'r.screen_share',
      'r.open_source_contribution',
      'r.side_projects',
      'r.online_coding_assignments',
      'r.comment',
      'r.typical_hours',
      'r.salary',
      'r.difficulty_rating',
      'os.offer_status',
      'r.overall_rating',
      'r.created_at',
      'r.updated_at'
    )
    .join('users as u', 'r.user_id', 'u.id')
    .join('tracks as t', 'u.track_id', 't.id')
    .join('companies as c', 'r.company_name', 'c.company_name')
    .join('work_status as ws', 'r.work_status_id', 'ws.id')
    .join('offer_status as os', 'r.offer_status_id', 'os.id')
    .join('states as s', 'r.state_id', 's.id')
    .join('review_types as rt', 'r.review_type_id', 'rt.id')
    .orderBy('r.created_at', 'desc');
}

// FIND REVIEWS BY A SPECIFIC FILTER
function findReviewsBy(filter) {
  return db('reviews').where(filter);
}

// FIND REVIEW BY ID

function findReviewsById(revId) {
  return db('reviews as r')
    .select(
      'r.id as review_id',
      'u.id as user_id',
      'u.first_name as user_first_name',
      'u.last_name as user_last_name',
      'u.profile_image as user_profile_image',
      't.track_name',
      'rt.review_type',
      'c.company_name',
      'c.domain as logo',
      'ws.work_status ',
      'r.job_title',
      'r.city',
      's.state_name',
      'r.start_date',
      'r.end_date',
      'r.interview_rounds',
      'r.phone_interview',
      'r.resume_review',
      'r.take_home_assignments',
      'r.online_coding_assignments',
      'r.portfolio_review',
      'r.screen_share',
      'r.open_source_contribution',
      'r.side_projects',
      'r.online_coding_assignments',
      'r.comment',
      'r.typical_hours',
      'r.salary',
      'r.difficulty_rating',
      'os.offer_status',
      'r.overall_rating',
      'r.created_at',
      'r.updated_at'
    )
    .join('users as u', 'r.user_id', 'u.id')
    .join('tracks as t', 'u.track_id', 't.id')
    .join('companies as c', 'r.company_name', 'c.company_name')
    .join('work_status as ws', 'r.work_status_id', 'ws.id')
    .join('offer_status as os', 'r.offer_status_id', 'os.id')
    .join('states as s', 'r.state_id', 's.id')
    .join('review_types as rt', 'r.review_type_id', 'rt.id')
    .where('r.id', revId)
    .first();
}

// ADD A NEW REVIEW
function addReview(newReview) {
  return db('reviews')
    .insert(newReview, 'id')
    .then(([id]) => {
      return findReviewsById(id);
    });
}

// UPDATE AN EXISTING REVIEW

function updateReview(id, changes) {
  return db('reviews')
    .where({id})
    .update(changes)
    .then(count => (count > 0 ? findReviewsById(id) : null));
}

// DELETE AN EXISTING REVIEW
function deleteReview(id) {
  return db('reviews').where({id}).del();
}
