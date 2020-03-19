const db = require('../data/dbConfig.js');

module.exports = {
  findUsers,
  findUsersBy,
  findUserById,
  findUserReviews,
  findUserReviewById,
  addUser,
  updateUser,
  deleteUser
};

// FIND ALL USERS
function findUsers() {
  return db('users');
}

// FIND USERS BY A SPECIFIC FILTER (MUST BE A COLUMN IN THE USERS TABLE AND USE {<ARGUMENT>})
function findUsersBy(filter) {
  return db('users').where(filter);
}

// FIND USER BY ID, WILL CONTAIN ANY REVIEWS ASSOCIATED WITH THE USER OR AN EMPTY ARRAY
function findUserById(userId) {
  return db('users as u')
    .where('id', userId)
    .select('u.id', 'u.username', 'u.email', 'u.track_id')
    .first()
    .then(user => {
      return findUserReviews(user.id).then(userReviews => {
        return {
          ...user,
          reviews: userReviews
        };
      });
    });
}

// FIND ONLY THE COMPANY REVIEWS ASSOCIATED WITH A USER

function findUserReviews(userId) {
  return db('reviews as r')
    .select(
      'r.id as review_id',
      'r.job_title',
      'r.overall_rating',
      'r.difficulty_rating',
      'r.start_date',
      'r.end_date',
      'r.comment',
      'r.typical_hours',
      'r.salary',
      'r.job_rating',
      'r.city',
      's.state_name',
      'u.username',
      'c.company_name',
      'c.domain as logo',
      'ws.work_status ',
      'os.offer_status',
      'u.id as user_id',
      'rt.review_type',
      'r.phone_interview',
      'r.resume_review',
      'r.take_home_assignments',
      'r.online_coding_assignments',
      'r.portfolio_review',
      'r.screen_share',
      'r.open_source_contribution',
      'r.side_projects',
      'r.online_coding_assignments',
      'r.interview_rounds',
      'r.created_at',
      'r.updated_at'
    )
    .where('r.user_id', userId)
    .join('users as u', 'r.user_id', 'u.id')
    .join('companies as c', 'r.company_name', 'c.company_name')
    .join('work_status as ws', 'r.work_status_id', 'ws.id')
    .join('offer_status as os', 'r.offer_status_id', 'os.id')
    .join('states as s', 'r.state_id', 's.id')
    .join('review_types as rt', 'r.review_type_id', 'rt.id');
}

// FIND A SINGLE COMPANY REVIEW ASSOCIATED WITH A USER

function findUserReviewById(revId) {
  return db('company_reviews as cr')
    .select(
      'r.id as review_id',
      'r.job_title',
      'r.overall_rating',
      'r.difficulty_rating',
      'r.start_date',
      'r.end_date',
      'r.comment',
      'r.typical_hours',
      'r.salary',
      'r.job_rating',
      'r.city',
      's.state_name',
      'u.username',
      'c.company_name',
      'c.domain as logo',
      'ws.work_status ',
      'os.offer_status',
      'u.id as user_id',
      'rt.review_type',
      'r.phone_interview',
      'r.resume_review',
      'r.take_home_assignments',
      'r.online_coding_assignments',
      'r.portfolio_review',
      'r.screen_share',
      'r.open_source_contribution',
      'r.side_projects',
      'r.online_coding_assignments',
      'r.interview_rounds',
      'r.created_at',
      'r.updated_at'
    )
    .where('r.id', revId)
    .join('users as u', 'r.user_id', 'u.id')
    .join('companies as c', 'r.company_name', 'c.company_name')
    .join('work_status as ws', 'r.work_status_id', 'ws.id')
    .join('offer_status as os', 'r.offer_status_id', 'os.id')
    .join('states as s', 'r.state_id', 's.id')
    .join('review_types as rt', 'r.review_type_id', 'rt.id');
}

// ADD A USER TO THE DATABASE

function addUser(user) {
  return db('users')
    .insert(user, 'id')
    .then(([id]) => {
      return findUserById(id);
    });
}

// UPDATE AN EXISTING USER

function updateUser(id, changes) {
  return db('users')
    .where({ id })
    .update(changes)
    .then(count => (count > 0 ? findUserById(id) : null));
}

// DELETE AN EXISTING USER

function deleteUser(id) {
  return db('users')
    .where({ id })
    .del();
}
