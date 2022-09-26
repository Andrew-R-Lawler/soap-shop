const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('./strategies/user.strategy');
const session = require('express-session');
const cookieParser = require("cookie-parser");

require('dotenv').config();

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// cookie parser middleware
app.use(cookieParser(process.env.SERVER_SESSION_SECRET));

// Cors middleware
app.use(cors({
  origin: "http://localhost:3000", // location of react app
  credentials: true,
}));

// Session Configuration
app.use(session({
  secret: process.env.SERVER_SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
}));

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

// Route includes
const userRouter = require('./routes/user.router');

// Routes
app.use('/api/user', userRouter);

// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
  });