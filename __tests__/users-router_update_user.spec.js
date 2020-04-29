const bcrypt = require('bcryptjs');
const request = require('supertest');

const createUser = require('./utils/');
const db = require('../data/dbConfig.js');
const server = require('../api/server.js');
const signToken = require('../config/token');
const User = require('../helpers/users-model.js');


const user = createUser();
const new_password = 'new_password';

// 0 - Column Name
// 1 - New Value
// 2 - Should be allowed to change through endpoint
//                  0,                   1,     2
const userFields = [
  [              'id',                   2, false],
  [           'email',     'new@email.com',  true],
  [        'password',        new_password,  true],
  [        'track_id',                   2,  true],
  [           'admin',                true, false],
  [         'blocked',                true, false],
  [      'first_name',              'Jane',  true],
  [       'last_name',               'Foo',  true],
  [          'cohort',        'New Cohort',  true],
  [   'contact_email', 'contact@email.com',  true],
  [        'location',      'New Location',  true],
  [       'graduated',        '2020-01-01',  true],
  [      'highest_ed',       'High School',  true],
  [  'field_of_study',          'Back End',  true],
  ['prior_experience',                true,  true],
  [ 'tlsl_experience',                true,  true],
  ['employed_company',      'Company Name',  true],
  [  'employed_title',         'Job Title',  true],
  [ 'employed_remote',                true,  true],
  [  'employed_start',        '2020-02-02',  true],
  [          'resume',        'Resume URL',  true],
  [       'linked_in',     'Linked In URL',  true],
  [           'slack',    'Slack Username',  true],
  [          'github',   'Github Username',  true],
  [         'dribble',  'Dribble Username',  true],
  [   'profile_image',         'Image URL',  true]
];

function put(token, column, value) {
  return request(server).put(`/api/users/${user.id}`).send({[column]: value}).set('Authorization', token);
}

describe('Routers Users', () => {
  beforeEach(async () => {
    await db.raw('TRUNCATE TABLE users RESTART IDENTITY CASCADE;');
    await db('users').insert(user);
  });

  describe('PUT /api/users/:userId', () => {
    it('Return 200 on success', async () => {
      const token = signToken(user);

      const res = await put(token, 'password', new_password);

      expect(res.status).toBe(200);
    });

    it('Correctly hashes password', async () => {
      const token = signToken(user);

      const res = await put(token, 'password', new_password);

      expect(res.status).toBe(200);

      const {password} = await db('users').where({id: user.id}).select('password').first();

      expect(await bcrypt.compare(new_password, password)).toBe(true);
    });

    it('Accepts correct user fields', async () => {
      const token = signToken(user);

      for (const [column, value, shouldChange] of userFields) {
        const oldUser = await db('users').where({id: user.id}).first();

        const res = await put(token, column, value);

        expect(res.status).toBe(200);

        const updatedUser = await db('users').where({id: user.id}).first();

        if (shouldChange) {
          expect(oldUser).not.toEqual(updatedUser);

          delete oldUser[column];
          delete updatedUser[column];
        }

        expect(oldUser).toEqual(updatedUser);
      }
    });

    it('Ignores invalid fields', async () => {
      const token = signToken(user);

      const oldUser = await db('users').where({id: user.id}).first();

      const res = await put(token, 'incorrect_field', 'foo');

      expect(res.status).toBe(200);

      const updatedUser = await db('users').where({id: user.id}).first();

      expect(oldUser).toEqual(updatedUser);
    });

    it('Returns correct body', async () => {
      const token = signToken(user);

      const {body, status} = await put(token, 'password', new_password);

      expect(status).toBe(200);

      const newUser = await User.findUserById(user.id);

      expect(body).toEqual(newUser);
    });
  });
});
