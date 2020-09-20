'use strict';

const express = require('express');
const basicAuth = require('./middleware/basic');
const Users = require('./models/users-model.js');
const router = express.Router();


router.post('/signup', signupHandler);
router.post('/signin', basicAuth, signinHandler);
router.get('/users', getUsers);


/**
 * this function response the token to the user if it is not exist
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
function signupHandler(req, res, next) {
  Users.create(req.body).then(async(user) => {
    const token = await Users.generateToken(user);
    res.status(200).json({ token });
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


module.exports = router;