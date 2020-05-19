const jwt = require('jsonwebtoken');
const {jwtSecret} = require('./secret.js');

function signToken({id, email, admin}) {
  const payload = {id, email, admin};

  const options = {
    expiresIn: '8h',
  };

  return jwt.sign(payload, jwtSecret, options);
}

module.exports = signToken;
