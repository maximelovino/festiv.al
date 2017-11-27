const express = require('express');
const app = express();
const routes = require('./routes/index');
const cors = require('cors');
//this is to allow all origins access to the API
app.use(cors());
app.use('/', routes);

module.exports = app;