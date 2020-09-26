'use strict';

const base64 = require('base-64');
const users = require('../models/users-model');

module.exports = (req, res, next) => {

  let basic = req.headers.authorization.split(' ');
  if (basic[0] == 'Basic') { // to check if the first word is Basic  in (Basic YWhtYWRfc2hlbGEgOjEyMzQ=)
    //take the basic[1]: YWhtYWRfc2hlbGEgOjEyMzQ=
    // after decode ahmad_shela:1234
    // 1st decode auth[1] -> then split it on :
    let [user, pass] = base64.decode(basic[1]).split(':');
    users.authenticate(user, pass)
      .then(valid => {
        req.user = valid;
        if (!valid) {
          return next('Wrong pass or username');
        }
        return users.generateToken(valid);
      }).then(token => {
        req.token = token;

        next();

      }).catch(err => next(err));

  } else {
    next('Invalid Login!! ');
  }


};