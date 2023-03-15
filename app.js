//connect to mongodb
require('dotenv').config();
require("./config/database").connect();

const express          = require("express");
const app              = express();
const errorHandler     = require("./controllers/errorController");
const courseRouter     = require("./routes/courseRoute");
const userRouter       = require("./routes/userRoute");
const subscriberRouter = require("./routes/subscriberRoute");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

module.exports = app;

app.use("/api/courses", courseRouter)
app.use("/api/users", userRouter)
app.use("/api/subscribers", subscriberRouter)
app.use("/*", errorHandler)
