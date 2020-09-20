'use strict';
/**
 * send a 404 status error
 * @param {*} req 
 * @param {*} res 
 */
module.exports = (req, res) => {
  res.status(404).send('Not-Found');
};