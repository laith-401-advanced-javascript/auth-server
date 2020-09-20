'use strict';

/**
 * send 500 status error
 * @param {*} err 
 * @param {*} req 
 * @param {*} res 
 */
module.exports = (err, req, res) => {

  res.status(500);
};