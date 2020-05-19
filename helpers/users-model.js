const db = require('../data/dbConfig.js');

module.exports = {
  findUsers,
  findUsersBy,
  findUserById,
  findUserReviews,
  findUserReviewsById,
  addUser,
  updateUser,
  deleteUser,
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
    .select(
      'u.id',
      'u.email',
      'u.track_id',
      'u.admin',
      'u.blocked',
      'u.first_name',
      'u.last_name',
      'u.cohort',
      'u.contact_email',
      'u.location',
      'u.graduated',
      'u.highest_ed',
      'u.field_of_study',
      'u.prior_experience',
      'u.tlsl_experience',
      'u.employed_company',
      'u.employed_title',
      'u.employed_remote',
      'u.employed_start',
      'u.resume',
      'u.linked_in',
      'u.slack',
      'u.github',
      'u.dribble',
      'u.profile_image',
      'u.portfolio'
    )
    .first()
    .then(user => {
      if (!user) return null;

      return findUserReviews(user.id).then(userReviews => {
        return {
          ...user,
          reviews: userReviews,
        };
      });
    });
}

// FIND ONLY THE COMPANY REVIEWS ASSOCIATED WITH A USER

function findUserReviews(userId) {
  return db('reviews as r')
    .select(
      'r.id as review_id',
      'u.id as user_id',
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
    .where('r.user_id', userId)
    .join('users as u', 'r.user_id', 'u.id')
    .join('tracks as t', 'u.track_id', 't.id')
    .join('companies as c', 'r.company_name', 'c.company_name')
    .join('work_status as ws', 'r.work_status_id', 'ws.id')
    .join('offer_status as os', 'r.offer_status_id', 'os.id')
    .join('states as s', 'r.state_id', 's.id')
    .join('review_types as rt', 'r.review_type_id', 'rt.id');
}

// FIND A SINGLE COMPANY REVIEW ASSOCIATED WITH A USER

function findUserReviewsById(revId) {
  return db('reviews as r')
    .select(
      'r.id as review_id',
      'u.id as user_id',
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
    .where('r.id', revId)
    .join('users as u', 'r.user_id', 'u.id')
    .join('tracks as t', 'u.track_id', 't.id')
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
    .where({id})
    .update(changes)
    .then(count => (count > 0 ? findUserById(id) : null));
}

// DELETE AN EXISTING USER

function deleteUser(id) {
  return db('users').where({id}).del();
}
