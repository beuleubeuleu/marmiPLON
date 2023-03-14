//connect to mongodb
require('dotenv').config();
require("./config/database").connect();

const express     = require("express");
const app         = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

module.exports = app;
