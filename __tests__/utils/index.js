const bcrypt = require('bcryptjs');
const supertest = require('supertest');

const db = require('../../data/dbConfig');
const server = require('../../api/server');

function createCompany({
  id = 1,
  company_name = 'Company',
  hq_city = 'Townsville',
  state_id = 1,
  domain = 'Company Domain',
  industry_name = 'Industry Name',
  size_range = 'Size Range',
  linkedin_url = 'LinkedIn URL',
} = {}) {
  return {
    id,
    company_name,
    hq_city,
    state_id,
    domain,
    industry_name,
    size_range,
    linkedin_url,
  };
}

function createReview({
  id = 1,
  job_title = 'Software Engineer',
  start_date = 1,
  overall_rating = 1,
  end_date = 1,
  comment = null,
  typical_hours = 0,
  salary = 1,
  city = 'Townsville',
  difficulty_rating = 0,
  phone_interview = false,
  resume_review = false,
  take_home_assignments = false,
  online_coding_assignments = false,
  portfolio_review = false,
  screen_share = false,
  open_source_contribution = false,
  side_projects = false,
  interview_rounds = 1,
  user_id = 1,
  review_type_id = 1,
  state_id = 1,
  company_name = 'Company',
  offer_status_id = 1,
  work_status_id = 1,
  created_at = new Date().toISOString(),
  updated_at = new Date().toISOString(),
} = {}) {
  return {
    id,
    job_title,
    start_date,
    overall_rating,
    end_date,
    comment,
    typical_hours,
    salary,
    city,
    difficulty_rating,
    phone_interview,
    resume_review,
    take_home_assignments,
    online_coding_assignments,
    portfolio_review,
    screen_share,
    open_source_contribution,
    side_projects,
    interview_rounds,
    user_id,
    review_type_id,
    state_id,
    company_name,
    offer_status_id,
    work_status_id,
    created_at,
    updated_at,
  };
}

function createUser({
  id = 1,
  email = 'default@default.com',
  password = 'password',
  first_name = 'John',
  last_name = 'Doe',
  cohort = 'Foo',
  track_id = 1,
  admin = false,
  blocked = false,
} = {}) {
  return {
    id,
    password: bcrypt.hashSync(password),
    email,
    first_name,
    last_name,
    cohort,
    track_id,
    admin,
    blocked,
  };
}

function request(endpoint, {method = 'get', token = null, body = null} = {}) {
  let req = supertest(server)[method](endpoint);

  if (body) req = req.send(body);
  if (token) req = req.set('Authorization', token);

  return req;
}

function resetTable(...tables) {
  const query = tables
    .map(table => `TRUNCATE TABLE ${table} RESTART IDENTITY CASCADE;`)
    .join('');
  return db.raw(query);
}

module.exports = {createCompany, createReview, createUser, request, resetTable};
