const db = require('../data/dbConfig');


async function users({filter = null, first = false, show_reviews = true} = {}) {
  let query = db('users').select(
    'users.id',
    'users.email',
    'tracks.track_name',
    'users.admin',
    'users.blocked',
    'users.first_name',
    'users.last_name',
    'users.cohort',
    'users.contact_email',
    'users.location',
    'users.graduated',
    'users.highest_ed',
    'users.field_of_study',
    'users.prior_experience',
    'users.tlsl_experience',
    'users.employed_company',
    'users.employed_title',
    'users.employed_remote',
    'users.employed_start',
    'users.resume',
    'users.linked_in',
    'users.slack',
    'users.github',
    'users.dribble',
    'users.profile_image',
    'users.portfolio'
  )
    .join('tracks', 'users.track_id', 'tracks.id');

  if (filter) query = query.where(filter);
  if (first) query = query.limit(1);

  const users = await query;

  if (users.length === 0) return null;

  for (const user of users)
    if (show_reviews) user.reviews = await reviews({filter: {user_id: user.id}, show_users: false});

  return first ? users[0] : users;
}


async function reviews({filter = null, first = false, show_users = true} = {}) {
  let query = db('reviews').select(
    'reviews.id',
    'reviews.user_id',
    'rt.review_type',
    'c.company_name',
    'c.domain as logo',
    'ws.work_status ',
    'reviews.job_title',
    'reviews.city',
    's.state_name',
    'reviews.start_date',
    'reviews.end_date',
    'reviews.interview_rounds',
    'reviews.phone_interview',
    'reviews.resume_review',
    'reviews.take_home_assignments',
    'reviews.online_coding_assignments',
    'reviews.portfolio_review',
    'reviews.screen_share',
    'reviews.open_source_contribution',
    'reviews.side_projects',
    'reviews.online_coding_assignments',
    'reviews.comment',
    'reviews.typical_hours',
    'reviews.salary',
    'reviews.difficulty_rating',
    'os.offer_status',
    'reviews.overall_rating',
    'reviews.created_at',
    'reviews.updated_at'
    )
    .join('companies as c', 'reviews.company_name', 'c.company_name')
    .join('work_status as ws', 'reviews.work_status_id', 'ws.id')
    .join('offer_status as os', 'reviews.offer_status_id', 'os.id')
    .join('states as s', 'reviews.state_id', 's.id')
    .join('review_types as rt', 'reviews.review_type_id', 'rt.id')
    .orderBy('reviews.created_at', 'desc');

  if (filter) query = query.where(filter);
  if (first) query = query.limit(1);

  const reviews = await query;

  if (reviews.length === 0) return null;

  for (const review of reviews) {
    if (show_users) review.user = await users({filter: {'users.id': review.user_id}, first: true, show_reviews: false});
    delete review.user_id;
  }

  return first ? reviews[0] : reviews;
}


async function companies({filter = null, first = false, show_reviews = true} = {}) {
  let query = db('companies').select();

  if (filter) query = query.where(filter);
  if (first) query = query.limit(1);

  const companies = await query;

  if (companies.length === 0) return null;

  for (const company of companies) {
    if (show_reviews) company.reviews = await reviews({filter: {'c.company_name': company.company_name}});
  }

  return first ? companies[0] : companies;
}


function process(table, ...args) {
  const tables = {
    users,
    reviews,
    companies
  };
  return tables[table](...args);
}


function find(table) {
  return process(table);
}


function findBy(table, filter, first = false) {
  const newFilter = {};

  for (const [key, value] of Object.entries(filter)) {
    newFilter[`${table}.${key}`] = value;
  }

  return process(table, {filter: newFilter, first});
}


function findById(table, id) {
  return findBy(table, {id}, true);
}


function add(table, entity) {
  return db(table)
    .insert(entity, 'id')
    .then(([id]) => findById(table, id));
}


function update(table, id, entity) {
  return db(table)
    .where({id})
    .update(entity, 'id')
    .then(([id]) => id ? findById(table, id) : null);
}


function remove(table, id) {
  return db(table)
    .where({id})
    .del();
}


module.exports = {
  users,
  reviews,
  find,
  findBy,
  findById,
  add,
  update,
  remove
};
