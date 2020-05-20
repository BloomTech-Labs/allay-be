const bcrypt = require('bcryptjs');

const {createUser, resetTable, request} = require('./utils/');
const db = require('../data/dbConfig');
const signToken = require('../config/token');
const User = require('../helpers/users-model');

const user = createUser();
const new_password = 'new_password';

// 0 - Column Name
// 1 - New Value
// 2 - Should be allowed to change through endpoint
//                  0,                   1,     2
const userFields = [
  ['id', 2, false],
  ['email', 'new@email.com', true],
  ['password', new_password, true],
  ['track_id', 2, true],
  ['admin', true, false],
  ['blocked', true, false],
  ['first_name', 'Jane', true],
  ['last_name', 'Foo', true],
  ['cohort', 'New Cohort', true],
  ['contact_email', 'contact@email.com', true],
  ['location', 'New Location', true],
  ['graduated', '2020-01-01', true],
  ['highest_ed', 'High School', true],
  ['field_of_study', 'Back End', true],
  ['prior_experience', true, true],
  ['tlsl_experience', true, true],
  ['employed_company', 'Company Name', true],
  ['employed_title', 'Job Title', true],
  ['employed_remote', true, true],
  ['employed_start', '2020-02-02', true],
  ['resume', 'Resume URL', true],
  ['linked_in', 'Linked In URL', true],
  ['slack', 'Slack Username', true],
  ['github', 'Github Username', true],
  ['dribble', 'Dribble Username', true],
  ['profile_image', 'Image URL', true],
];

const url = `/api/users/${user.id}`;
const method = 'put';
const token = signToken(user);

describe('Routers Users', () => {
  beforeEach(async () => {
    await resetTable('users');
    await db('users').insert(user);
  });

  describe('PUT /api/users/:userId', () => {
    it('Correctly hashes password', async () => {
      const {status, type} = await request(url, {
        method,
        token,
        body: {password: new_password},
      });

      expect(status).toBe(200);
      expect(type).toBe('application/json');

      const {password} = await db('users')
        .where({id: user.id})
        .select('password')
        .first();

      expect(await bcrypt.compare(new_password, password)).toBe(true);
    });

    it('Accepts correct user fields', async () => {
      for (const [column, value, shouldChange] of userFields) {
        const oldUser = await db('users').where({id: user.id}).first();

        const {status, type} = await request(url, {
          method,
          token,
          body: {[column]: value},
        });

        expect(status).toBe(200);
        expect(type).toBe('application/json');

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
      const oldUser = await db('users').where({id: user.id}).first();

      const {status, type} = await request(url, {
        method,
        token,
        body: {incorrect_field: 'foo'},
      });

      expect(status).toBe(200);
      expect(type).toBe('application/json');

      const updatedUser = await db('users').where({id: user.id}).first();

      expect(oldUser).toEqual(updatedUser);
    });

    it('Returns correct body', async () => {
      const {body, status, type} = await request(url, {
        method,
        token,
        body: {password: new_password},
      });

      expect(status).toBe(200);
      expect(type).toBe('application/json');

      const newUser = await User.findUserById(user.id);

      expect(body).toEqual(newUser);
    });

    it('Return 409 on duplicate', async () => {
      const newUser = createUser({id: 2, email: 'fake@email.com'});
      await db('users').insert(newUser);

      const {status, type} = await request(`/api/users/${newUser.id}`, {
        method,
        token,
        body: {email: user.email},
      });

      expect(status).toEqual(409);
      expect(type).toEqual('application/json');
    });
  });
});
