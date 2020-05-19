const express = require('express'); //importing a CommonJS module
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan'); //for logging middleware
const server = express(); //creates the server
//
//global middleware
server.use(express.json()); //middleware needed to parse JSON
server.use(helmet()); //middleware that adds a layer of security to the server
server.use(cors()); //middleware that allows cross domain communication from the browser
server.use(morgan('tiny')); //logger middleware

//Auth middleware
const {restricted} = require('../middleware/index.js');

//Router Imports
const authRouter = require('../routers/auth-router.js');
const usersRouter = require('../routers/users-router.js');
const reviewsRouter = require('../routers/reviews-router');
const companiesRouter = require('../routers/companies-router.js');

//endpoints
server.get('/', (req, res) => {
  res.status(200).json({
    welcome: `to the testing zone!`,
    environment: process.env.NODE_ENV,
  });
});

//routes with Auth applied
server.use('/api/auth', authRouter);
server.use('/api/users', restricted, usersRouter);
server.use('/api/reviews', restricted, reviewsRouter);
server.use('/api/companies', restricted, companiesRouter);

module.exports = server;
