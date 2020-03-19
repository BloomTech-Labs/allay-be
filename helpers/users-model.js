const db = require('../data/dbConfig.js');

module.exports = {
  findUsers,
  findUsersBy,
  findUserById,
  findUserCompanyReviews,
  findUserCompanyReviewById,
  findUserInterviewReviews,
  findUserInterviewReviewById,
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
    .select('u.id', 'u.username', 'u.email', 'u.track_name')
    .first()
    .then(user => {
      return findUserCompanyReviews(user.id).then(userReviews => {
        return {
          ...user,
          company_reviews: userReviews
        };
      });
    })
    .then(user => {
      return findUserInterviewReviews(user.id).then(userReviews => {
        return {
          ...user,
          interview_reviews: userReviews
        };
      });
    });
}

// FIND ONLY THE COMPANY REVIEWS ASSOCIATED WITH A USER

function findUserCompanyReviews(userId) {
  return db('company_reviews as cr')
    .select(
      'cr.id as company_review_id',
      'cr.job_title',
      'cr.start_date',
      'cr.end_date',
      'cr.comment',
      'cr.typical_hours',
      'cr.salary',
      'cr.job_rating',
      'u.username as username',
      'c.company_name',
      'c.domain as logo',
      'ws.work_status ',
      'cr.created_at',
      'cr.updated_at'
    )
    .where('cr.user_id', userId)
    .join('users as u', 'cr.user_id', 'u.id')
    .join('companies as c', 'cr.company_name', 'c.company_name')
    .join('work_status as ws', 'cr.work_status', 'ws.work_status');
}

// FIND A SINGLE COMPANY REVIEW ASSOCIATED WITH A USER

function findUserCompanyReviewById(revId) {
  return db('company_reviews as cr')
    .select(
      'cr.id as company_review_id',
      'cr.job_title',
      'cr.start_date',
      'cr.end_date',
      'cr.comment',
      'cr.typical_hours',
      'cr.salary',
      'cr.job_rating',
      'u.username as username',
      'c.company_name',
      'c.domain as logo',
      'ws.work_status ',
      'cr.created_at',
      'cr.updated_at'
    )
    .where('cr.id', revId)
    .join('users as u', 'cr.user_id', 'u.id')
    .join('companies as c', 'cr.company_name', 'c.company_name')
    .join('work_status as ws', 'cr.work_status', 'ws.work_status');
}

// FIND ONLY THE INTERVIEW REVIEWS ASSOCIATED WITH A USER

function findUserInterviewReviews(userId) {
  return db('interview_reviews as ir')
    .select(
      'ir.id as interview_review_id',
      'ir.job_title',
      'ir.interview_rounds',
      'ir.overall_rating',
      'ir.difficulty_rating',
      'ir.salary',
      'u.username as username',
      'c.company_name',
      'os.offer_status',
      'ir.city',
      's.abbreviation',
      'ir.phone_interview',
      'ir.resume_review',
      'ir.take_home_assignments',
      'ir.online_coding_assignments',
      'ir.portfolio_review',
      'ir.screen_share',
      'ir.open_source_contribution',
      'ir.side_projects',
      'ir.interview_comments',
      'u.id as user_id',
      'ir.created_at',
      'ir.updated_at'
    )
    .where('ir.user_id', userId)
    .join('users as u', 'ir.user_id', 'u.id')
    .join('companies as c', 'ir.company_name', 'c.company_name')
    .join('offer_status as os', 'ir.offer_status', 'os.offer_status')
    .join('states as s', 'ir.abbreviation', 's.abbreviation');
}

// FIND A SINGLE INTERVIEW REVIEW ASSOCIATED WITH A USER

function findUserInterviewReviewById(revId) {
  return db('interview_reviews as ir')
    .select(
      'ir.id as interview_review_id',
      'ir.job_title',
      'ir.interview_rounds',
      'ir.overall_rating',
      'ir.difficulty_rating',
      'ir.salary',
      'u.username as username',
      'c.company_name',
      'os.offer_status',
      'ir.city',
      's.abbreviation',
      'ir.phone_interview',
      'ir.resume_review',
      'ir.take_home_assignments',
      'ir.online_coding_assignments',
      'ir.portfolio_review',
      'ir.screen_share',
      'ir.open_source_contribution',
      'ir.side_projects',
      'ir.interview_comments',
      'u.id as user_id',
      'ir.created_at',
      'ir.updated_at'
    )
    .where('ir.id', revId)
    .join('users as u', 'ir.user_id', 'u.id')
    .join('companies as c', 'ir.company_name', 'c.company_name')
    .join('offer_status as os', 'ir.offer_status', 'os.offer_status')
    .join('states as s', 'ir.abbreviation', 's.abbreviation');
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
