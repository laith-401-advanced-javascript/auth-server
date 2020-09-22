'use strict';

const express = require('express');
// const { token } = require('morgan');
const basicAuth = require('./middleware/basic');
const bearerMiddleware = require('./middleware/bearer-auth');

const Users = require('./models/users-model.js');
const users = require('./models/users-schema');

const router = express.Router();


router.post('/signup', signupHandler);
router.post('/signin', basicAuth, signinHandler);
router.get('/users', getUsers);
router.get('/secret', bearerMiddleware, getSecret);

/**
 * this function response the token to the user if it is not exist
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
async function signupHandler(req, res, next) {

  let user = new users(req.body);
  let isUserExist = await users.findOne({ username: user.username });
  // console.log('isUserExist', isUserExist);
  if (isUserExist) { // to check if the user is already exist and signup 
    res.status(403).send('user is already exist');
    return;
  }

  Users.create(req.body).then(async(user) => {
    const token = await Users.generateToken(user);
    res.status(200).json({ token });
    console.log('req.tok', token);

  })
    .catch((err) => {
      console.log('Wrong!!');
      res.status(403).send(err.message);
    });

}



/**
 * @route POST /signin to the server and returns a token
 * @returns {token} 200 - a token generated by a generateToken method
 * @returns {Error} 500 - unexpected error
 */

function signinHandler(req, res, next) {
  try {
    res.json({ token: req.token, username: req.username });

  } catch (e) { res.status(403).json('Invalid credentials'); }

}


/**
 * @route GET /Users
 * @returns {Users.model} 200 - An object containing all Users
 * @returns {Error} 403 - invalid login
 * @returns {Error} 500 - unexpected error
 */
async function getUsers(req, res) {
  let allUser = await Users.list();
  res.status(200).json(allUser);

}

function getSecret(req, res) {

  res.status(200).send(req.token);
}

module.exports = router;