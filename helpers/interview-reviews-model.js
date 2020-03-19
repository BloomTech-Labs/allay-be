const db = require('../data/dbConfig');

module.exports = {
  findInterviewReviews,
  findInterviewReviewBy,
  findInterviewReviewById,
  addInterviewReview,
  updateInterviewReview,
  deleteInterviewReview
};

// FIND ALL INTERVIEW REVIEWS

function findInterviewReviews() {
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
    .join('users as u', 'ir.user_id', 'u.id')
    .join('companies as c', 'ir.company_name', 'c.company_name')
    .join('offer_status as os', 'ir.offer_status', 'os.offer_status')
    .join('states as s', 'ir.abbreviation', 's.abbreviation');
}

// FIND INTERVIEW REVIEWS BY A SPECIFIC FILTER

function findInterviewReviewBy(filter) {
  return db('interview_reviews').where(filter);
}

// FIND INTERVIEW REVIEW BY ID

function findInterviewReviewById(id) {
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
      'u.id as user_id',
      'ir.created_at',
      'ir.updated_at'
    )
    .where('ir.id', id)
    .join('users as u', 'ir.user_id', 'u.id')
    .join('companies as c', 'ir.company_id', 'c.id')
    .join('offer_status as os', 'ir.offer_status_id', 'os.id')
    .join('states as s', 'ir.state_id', 's.id')
    .first();
}

// ADD A NEW INTERVIEW REVIEW

function addInterviewReview(newReview) {
  return db('interview_reviews')
    .insert(newReview, 'id')
    .then(([id]) => {
      return findInterviewReviewById(id);
    });
}

// UPDATE AN EXISTING INTERVIEW REVIEW

function updateInterviewReview(id, changes) {
  return db('interview_reviews')
    .where({ id })
    .update(changes)
    .then(count => (count > 0 ? findInterviewReviewById(id) : null));
}

// DELETE AN EXISTING INTERVIEW REVIEW

function deleteInterviewReview(id) {
  return db('interview_reviews')
    .where({ id })
    .del();
}
