const {createUser, request} = require('./utils/');
const signToken = require('../config/token');

const admin = createUser({admin: true});
const user = createUser({id: 2});

const methods = [
  ['/api/users/all', 'get'],
  ['/api/users/1/bind', 'put'],
  ['/api/companies/1', 'delete'],
];

describe('Middleware', () => {
  describe('checkForAdmin', () => {
    it('Should return 403 if not admin', async () => {
      const token = signToken(user);

      for (const [url, method] of methods) {
        const {status, type} = await request(url, {method, token});

        expect(status).toEqual(403);
        expect(type).toEqual('application/json');
      }
    });

    it('Should not return 403 if admin', async () => {
      const token = signToken(admin);

      for (const [url, method] of methods) {
        const {status, type} = await request(url, {method, token});

        expect(status).not.toEqual(403);
        expect(type).toEqual('application/json');
      }
    });
  });
});
