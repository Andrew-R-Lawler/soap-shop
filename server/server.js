const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const passportLocal = require('passport-local');
const session = require('express-session');
const cookieParser= require('cookie-parser');

require('dotenv').config();

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// express session middleware
app.use(session({
  secret: 'secretcode',
  resave: true,
  saveUninitialized: true,
}))

// Cors middleware
app.use(cors({
  origin: "http://localhost:3000", // location of react app
  credentials: true,
}));

// Route includes
const loginRouter = require('./routes/login_router');

// Routes
app.use('/api/login', loginRouter);

// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
  });