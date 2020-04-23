const request = require('supertest');
const server = require('../api/server');
const db = require('../data/dbConfig');
const jwt = require('jsonwebtoken');
const {jwtSecret} = require('../config/secret');

const admin = {
  id: 1,
  username: 'admin',
  email: 'admin@test.com',
  password: 'password',
  track_id: 1,
  admin: true,
  blocked: false
};

const user = {
  id: 2,
  username: 'user',
  email: 'user@test.com',
  password: 'password',
  track_id: 1,
  admin: false,
  blocked: false
};

function signToken({id, username, admin}) {
  const payload = {
    id: id,
    email: username,
    admin: admin,
  };

  const options = {
    expiresIn: '8h',
  };

  return jwt.sign(payload, jwtSecret, options);
}

describe('PUT /api/users/:userId/bind', () => {
  beforeEach(async () => {
    await db.raw('truncate table reviews restart identity cascade');
    await db.raw('truncate table companies restart identity cascade');
    await db.raw('truncate table users restart identity cascade');
    await db('users').insert([admin, user]);
  });

  it('Should return 202 status code', async () => {
    const token = signToken(admin);
    const res = await request(server).put('/api/users/2/bind').set('Authorization', token);

    expect(res.status).toEqual(202);
  });

  it('Should bring back same user', async () => {
    const token = signToken(admin);
    const res = await request(server).put('/api/users/2/bind').set('Authorization', token);

    expect(res.body.updatedInfo.id).toEqual(user.id);
  });

  it('Should toggle block', async () => {
    const token = signToken(admin);
    let res = await request(server).put('/api/users/2/bind').set('Authorization', token);

    expect(res.body.updatedInfo.blocked).not.toEqual(user.blocked);

    res = await request(server).put('/api/users/2/bind').set('Authorization', token);
    expect(res.body.updatedInfo.blocked).toEqual(user.blocked);
  });
});
