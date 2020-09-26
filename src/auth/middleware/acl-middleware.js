'use strict';
const users = require('../models/users-model.js');

module.exports = (action) => {
  return (req, res, next) => {
    console.log('=====>',req.user);
    try {
      if (users.rolesUsers(req.user.validUser.record[0].role, action)) {
        next();
      } else {
        // you have actions but you are trying 
        // to access a route that you dont have access on.
        res.send('Access Denied! ');
      }
    } catch (e) {
      next('Invalid!');
    }
  };
};