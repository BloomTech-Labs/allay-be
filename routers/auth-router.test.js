const request = require('supertest');
const server = require('../api/server');
const Users = require('../helpers/users-model');
const db = require('../data/dbConfig');

describe('server.js', () => {
  beforeEach(async () => {
    await db('users').truncate(); //clears table for testing purposes before each test
  })

  /*************************** GENERAL *******************************/

  it('runs the tests', () => {
    expect(true).toBe(true);
  })

  /*************************** REGISTER *******************************/

  describe('POST /auth/register', () => {
    it('should add a user to the database', async () => {
      //checks that the database is empty
      const users = await db('users');
      expect(users).toHaveLength(0);
      //adds a user to the database
      await Users.addUser({
        username: 'cloudStrife',
        password: 'midgar',
        email: 'cloud@gaea.com'
      })
      //open the database and see that the new user is there
      const newUsers = await db('users');
      expect(newUsers).toHaveLength(1);
    })
    it('check the name of the added user is correct', async () => {
      //checks that the database is empty
      const users = await db('users');
      expect(users).toHaveLength(0);
      //adds a user to the database
      await Users.addUser({
        username: 'solid snake',
        password: 'FOXDIE',
        email: 'snake@shadowmoses.com'
      })
      //open the database and see that the new user is there
      const newUsers = await db('users');
      expect(newUsers[0].username).toBe('solid snake');
    })
    it('should return 201 OK status when adding a user', () => {
      return request(server).post('/api/auth/register')
        .send({
          username: 'joker',
          password: 'phantomthieves',
          email: 'joker@shibuya.com'
        })
        .expect(201);
    })
    it('should return 500 error status if username is not unique / already exists in the database', async () => {
      //adding a user
      res = await request(server)
        .post('/api/auth/register')
        .send({
          username: 'link',
          password: 'triforce',
          email: 'link@hyrule.com'
        })
        .expect(201);
      //adding a second user with the same username as the first
      res = await request(server)
        .post('/api/auth/register')
        .send({
          username: 'link',
          password: 'mastersword',
          email: 'link@lorule.com'
        })
        .expect(500);
    })
    it('should return 500 error status if email is not unique / already exists in the database', async () => {
      //adding a user
      res = await request(server)
        .post('/api/auth/register')
        .send({
          username: 'mario',
          password: 'mushroom',
          email: 'mario@mushroomkingdom.com'
        })
        .expect(201);
      //adding a second user with the same email as the first
      res = await request(server)
        .post('/api/auth/register')
        .send({
          username: 'drMario',
          password: 'mushroom',
          email: 'mario@mushroomkingdom.com'
        })
        .expect(500);
    })
  })

  /*************************** LOGIN *******************************/

  describe('POST /auth/login', () => {
    it('should return JSON', async () => {
      return request(server).post('/api/auth/login')
        .then(res => {
          //check that request returns JSON
          expect(res.type).toMatch(/json/i)
        })
    })
    it('should return 200 OK status when logged in successfully', async () => {
      // register a new user
      res = await request(server)
        .post('/api/auth/register')
        .send({
          username: 'banjo-kazooie',
          password: 'jiggy',
          email: 'banjo64@spiralmountain.com'
        });
      expect(res.status).toEqual(201);
      // login with the newly created user
      res = await request(server)
        .post('/api/auth/login')
        .send({
          username: 'banjo-kazooie',
          password: 'jiggy'
        });
      //open the database and see that the new user is there
      const newUsers = await db('users');
      //check that the username is spelled correctly
      expect(newUsers[0].username).toBe('banjo-kazooie');
      //checks response to see if login was successful
      expect(res.status).toEqual(200);
    })
    it('should return 500 error status when password is incorrect', async () => {
      // register a new user
      res = await request(server)
        .post('/api/auth/register')
        .send({
          username: 'samus',
          password: 'metroid',
          email: 'samus@zebes.com'
        });
      expect(res.status).toEqual(201);
      // login with the newly created user
      res = await request(server)
        .post('/api/auth/login')
        .send({
          username: 'samus',
          password: 'ridley'
        });
      expect(res.status).toEqual(401);
    })
    it('should return 500 error status when username is incorrect', async () => {
      // register a new user
      res = await request(server)
        .post('/api/auth/register')
        .send({
          username: 'kirby',
          password: 'food',
          email: 'kirby@planetpopstar.com'
        });
      expect(res.status).toEqual(201);
      // login with the newly created user
      res = await request(server)
        .post('/api/auth/login')
        .send({
          username: 'kirby',
          password: 'allTheFood'
        });
      expect(res.status).toEqual(401);
    })
    it('should generate a token on successful login', async () => {
      // register a new user
      res = await request(server)
        .post('/api/auth/register')
        .send({
          username: 'megaman',
          password: 'rush',
          email: 'megaman@20XX.com'
        });
      expect(res.status).toEqual(201);
      // login with the newly created user
      res = await request(server)
        .post('/api/auth/login')
        .send({
          username: 'megaman',
          password: 'rush'
        });
      expect(res.status).toEqual(200);
      // handle the token
      const token = res.body.token;
      expect(token.length).toBeGreaterThan(20);
    })
    it('should get a list of reviews on successful login with token', async () => {
      // register a new user
      res = await request(server)
        .post('/api/auth/register')
        .send({
          username: 'papyrus',
          password: 'spaghetti',
          email: 'papyrus@snowdin.com'
        });
      expect(res.status).toEqual(201);
      // login with the newly created user
      res = await request(server)
        .post('/api/auth/login')
        .send({
          username: 'papyrus',
          password: 'spaghetti'
        });
      expect(res.status).toEqual(200);
      // handle the token
      const token = res.body.token;
      expect(token.length).toBeGreaterThan(20);
      // grant access to users with token
      res = await request(server)
        .get('/api/reviews')
        .set({ authorization: token, Accept: 'application/json' });
      expect(res.body).toBeInstanceOf(Array);
      expect(res.status).toBe(200);
    })
  })
})