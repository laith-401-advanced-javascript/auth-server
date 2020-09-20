'use strict';

require('dotenv').config();
const serverModule = require('./src/server');
const mongoose = require('mongoose');
const MONGOOSE_URL = process.env.MONGOOSE_URL;
// MONGOOSE_URL=mongodb://localhost:27017/inventory
const mongooseOptions = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
};
//mongoose_url in the .env
mongoose.connect(MONGOOSE_URL, mongooseOptions);


serverModule.start();