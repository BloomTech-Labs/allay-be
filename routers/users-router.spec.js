const request = require('supertest');
const server = require('../api/server.js');
const db = require('../data/dbConfig.js');

/************** BEGIN GET TESTS *****************/
describe('GET TESTS', () => {
  /*
   */
  describe('GET all USERS /api/users/all', () => {
    beforeEach(async () => {
      await db.raw('truncate table users restart identity cascade');
    });
    /*
     */
    //make POST request to register
    it('should register, login, get token and display json', async () => {
      const res = await request(server)
        .post('/api/auth/register')
        .send({
          username: 'test',
          email: 'test@test.com',
          password: '1234'
        });

      //make POST request to login and get token
      const res2 = await request(server)
        .post('/api/auth/login')
        .send({ username: 'test', password: '1234' });
      const token = res2.body.token; //store login token

      //make GET request for info
      const res3 = await request(server)
        .get('/api/users/all')
        .set('Authorization', token);
      // console.log(res3.body, 'res3.body ln 35');
      expect(res3.type).toBe('application/json');
      expect([
        { id: '1' },
        { username: 'test' },
        { email: 'test@test.com' }
      ]).toMatchObject([
        { id: '1' },
        { username: 'test' },
        { email: 'test@test.com' }
      ]);
    });
  });

  /**********************************************************************/

  describe('GET single USER by user id /api/users/:id', () => {
    beforeEach(async () => {
      await db.raw('truncate table users restart identity cascade');
    });
    /*
     */
    //make POST request to register
    it('should register, login, get token and display json', async () => {
      const res = await request(server)
        .post('/api/auth/register')
        .send({
          username: 'test',
          email: 'test@test.com',
          password: '1234'
        });

      //make POST request to login and get token
      const res2 = await request(server)
        .post('/api/auth/login')
        .send({ username: 'test', password: '1234' });
      const token = res2.body.token; //store login token

      //make GET request for info
      const res3 = await request(server)
        .get('/api/users/1')
        .set('Authorization', token);
      expect(res3.type).toBe('application/json');
      expect([
        { id: '1' },
        { username: 'test' },
        { email: 'test@test.com' }
      ]).toMatchObject([
        { id: '1' },
        { username: 'test' },
        { email: 'test@test.com' }
      ]);
    });
  });
});
/************** END GET TESTS *****************/

/************** BEGIN POST TEST *****************/

describe('POST TEST', () => {
  /*
   */
  beforeEach(async () => {
    await db.raw('truncate table users restart identity cascade');
  });
  describe('add update USER Profile /api/users/:id', () => {
    /*
     */
    //make POST request to register
    it('should register, login, get token and display json', async () => {
      const res = await request(server)
        .post('/api/auth/register')
        .send({
          username: 'test',
          email: 'test@test.com',
          password: '1234'
        });

      //make POST request to login and get token
      const res2 = await request(server)
        .post('/api/auth/login')
        .send({ username: 'test', password: '1234' });
      const token = res2.body.token; //store login token

      const res3 = await request(server)
        .get('/api/users/1')
        .set('Authorization', token);

      //make PUT request to update info
      const res4 = await request(server)
        .put('/api/users/1')
        .set('Authorization', token)
        .send({
          username: 'test',
          email: 'edit_test@test.com',
          password: '1234'
        });
      // console.log(res3.body, 'res3.body ln 136');
      expect(res4.type).toBe('application/json');
      expect(res4.status).toBe(200);
      expect([{ email: 'edit_test@test.com' }]).toMatchObject([
        { email: 'edit_test@test.com' }
      ]);
    });
  });
});

/************** END POST TESTS *****************/

/************** BEGIN PUT TEST *****************/

describe('PUT TEST', () => {
  /*
   */
  beforeEach(async () => {
    await db.raw('truncate table users restart identity cascade');
  });
  describe('add update USER /api/users/:id', () => {
    /*
     */
    //make POST request to register
    it('should register, login, get token and display json', async () => {
      const res = await request(server)
        .post('/api/auth/register')
        .send({
          username: 'test',
          email: 'test@test.com',
          password: '1234'
        });

      //make POST request to login and get token
      const res2 = await request(server)
        .post('/api/auth/login')
        .send({ username: 'test', password: '1234' });
      const token = res2.body.token; //store login token

      //make POST request to add trip
      const res3 = await request(server)
        .post('/api/users/1/reviews')
        .set('Authorization', token)
        .send({
          id: '101',
          job_title: 'test job title',
          job_location: 'florida',
          salary: '100000',
          interview_review: 'testing interview review',
          interview_rating: '3',
          job_review: 'testing job review',
          job_rating: '4',
          user_id: '1',
          company_id: '1'
        });
      // console.log(res3.body, 'res3.body ln 136');
      expect(res3.type).toBe('application/json');
      expect(res3.status).toBe(201);
      expect([
        { id: '101' },
        { job_title: 'test job title' },
        { job_location: 'florida' },
        { salary: '100000' },
        { interview_review: 'testing interview review' },
        { interview_rating: '3' },
        { job_review: 'testing job review' },
        { job_rating: '4' },
        { user_id: '1' },
        { company_id: '1' }
      ]).toMatchObject([
        { id: '101' },
        { job_title: 'test job title' },
        { job_location: 'florida' },
        { salary: '100000' },
        { interview_review: 'testing interview review' },
        { interview_rating: '3' },
        { job_review: 'testing job review' },
        { job_rating: '4' },
        { user_id: '1' },
        { company_id: '1' }
      ]);
    });
  });
});

/************** END PUT TESTS *****************/
