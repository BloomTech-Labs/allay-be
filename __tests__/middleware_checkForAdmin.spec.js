const request = require('supertest');
const server = require('../api/server');
const jwt = require('jsonwebtoken');
const {jwtSecret} = require('../config/secret');

const methods = [
  ['/api/users/all', 'get'],
  ['/api/users/1/bind', 'put'],
  ['/api/companies/1', 'delete']
];

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

async function getResponse(url, method, token) {
  return request(server)[method](url).set('Authorization', token);
}

describe('server.js', () => {
  describe('Admin Restriction Middleware', () => {
    it('Should return 403 if not admin', async () => {
      const token = signToken({id: '1', email: 'test@test.com', admin: false});

      for (const [url, method] of methods) {
        const res = await getResponse(url, method, token);

        expect(res.status).toEqual(403);
      }
    });

    it('Should not return 403 if admin', async () => {
      const token = signToken({id: '1', email: 'test@test.com', admin: true});

      for (const [url, method] of methods) {
        const res = await getResponse(url, method, token);

        expect(res.status).not.toEqual(403);
      }
    });
  });
});
