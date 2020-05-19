const {request} = require('./utils/');
const {MISSING_TOKEN_ERROR} = require('../config/errors.js');

describe('Middleware', () => {
  describe('restricted', () => {
    it('Token is needed for endpoints', async () => {
      const {body, status, type} = await request('/api/reviews');

      expect(status).toBe(401);
      expect(type).toBe('application/json');
      expect(body).toEqual({message: MISSING_TOKEN_ERROR});
    });
  });
});
