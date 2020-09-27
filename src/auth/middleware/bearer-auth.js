'use strict';
// const users = require('../models/users-schema.js');
const Users = require('../models/users-model');

module.exports = (req, res, next) => {

  if (!req.headers.authorization) {
    return next('invalid Login , no Header !!');
  }

  let bearer = req.headers.authorization.split(' ');
  if (bearer[0] == 'Bearer') {
    const token = bearer[1];

    Users.authenticateToken(token).then(validUser => {
      req.user = { validUser, token };
      next();
    }).catch(err => next('invalid Token !'));
  } else {
    return next(' INvalid Bearer');
  }

};