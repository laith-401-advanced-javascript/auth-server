'use strict';

const express = require('express');
const cors = require('cors');
const router = require('./auth/router');
const notFound = require('./auth/middleware/404');
const serverError = require('./auth/middleware/500');
const morgan = require('morgan');

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));
app.use(router);







app.use('*', notFound);
app.use(serverError);

module.exports = {
  server: app,
  start: port => {
    let PORT = port || process.env.PORT || 3000;
    app.listen(PORT, () => console.log(` Listining on ${PORT} `));
  },
};