const {createUser, resetTable, request} = require('./utils/');
const signToken = require('../config/token');
const {REVIEW_NOT_FOUND_ERROR} = require('../config/errors.js');

const user = createUser();

const token = signToken(user);

describe('Middleware', () => {
  beforeAll(async () => {
    await resetTable('reviews');
  });

  describe('validateReviewId', () => {
    it("Should 404 error if the review doesn't exist", async () => {
      const {body, status, type} = await request('/api/reviews/1', {token});

      expect(status).toBe(404);
      expect(type).toBe('application/json');
      expect(body).toEqual({message: REVIEW_NOT_FOUND_ERROR});
    });
  });
});
