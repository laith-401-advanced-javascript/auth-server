'use strict';

const express = require('express');
const cors = require('cors');
const router = require('./auth/router');
const notFound = require('./auth/middleware/404');
const serverError = require('./auth/middleware/500');
const oauth = require('./auth/middleware/oauth.js');

const morgan = require('morgan');

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));
app.use(router);

app.use(express.static('./public'));



// Routes
app.get('/oauth', oauth, (req, res) => {
  console.log('reqqqqq', req.token);
  res.status(200).send(req.token);
});

// app.get('/secret', bearerAuth, (req, res) => {
//     console.log('reqqqqq', req.token);
//     res.status(200).send(req.token);
// });


app.use('*', notFound);
app.use(serverError);

module.exports = {
  server: app,
  start: port => {
    let PORT = port || process.env.PORT || 3000;
    app.listen(PORT, () => console.log(` Listining on ${PORT} `));
  },
};