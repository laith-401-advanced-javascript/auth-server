'use strict';
// const users = require('../models/users-schema.js');
const Users = require('../models/users-model');

module.exports = (req, res, next) => {

    if (!req.headers.authorization) {
        return next('invalid Login , no Header !!')
    }
    // console.log('req.headers><><', req.headers);

    let bearer = req.headers.authorization.split(' ');
    console.log('bearerrrrrrrrr', bearer);
    if (bearer[0] == 'Bearer') {
        const token = bearer[1];
        console.log('tototototo', token);

        Users.authenticateToken(token).then(validUser => {

            // console.log('valiiiiid?>?>', validUser);
            req.user = validUser;
            next();
        }).catch(err => next('invalid Token !'))
    } else {
        return next(' INvalid Bearer')
    }

}