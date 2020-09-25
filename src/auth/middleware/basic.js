'use strict';

const base64 = require('base-64');
const users = require('../models/users-model');

module.exports = (req, res, next) => {
  // the type of header is basic Auth  , 
  // pass the username and password to this method;
  // Basic Authentication (HTTP Headers)
  // we expect to have req headers 
  // Basic YWhtYWRfc2hlbGEgOjEyMzQ=
  console.log('req.headers', req.headers);
  let basic = req.headers.authorization.split(' ');
  if (basic[0] == 'Basic') { // to check if the first word is Basic  in (Basic YWhtYWRfc2hlbGEgOjEyMzQ=)
    //take the basic[1]: YWhtYWRfc2hlbGEgOjEyMzQ=
    // after decode ahmad_shela:1234
    // 1st decode auth[1] -> then split it on :
    let [user, pass] = base64.decode(basic[1]).split(':');
    users.authenticate(user, pass).then(valid => {
      if (!valid) {
        return next('Wrong pass or username');
      }
      return users.generateToken(valid);
    }).then(token => {
      req.token = token;
      req.user = user;
      console.log('uuuuuuuuuu', user);
      next();

    }).catch(err => next(err));

  } else {
    next('Invalid Login!! ');
  }


};