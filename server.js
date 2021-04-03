const express = require("express");
const app = express();

const errorHandler = require("./error-handler");

// EJS templates
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

// Logging, parsing, session handling
app.use(require("morgan")("combined"));
app.use(require("body-parser").urlencoded({ extended: true }));
app.use(
  require("express-session")({
    secret: "appsignal secret",
    resave: false,
    saveUninitialized: false,
  })
);

// Passport auth
const passport = require(`./auth`).configure(app);
// CASL authz
require(`./authz`).configure(app);
// Models
require(`./routes`).configure(passport, app);

// Must be after the routes
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT);
console.debug(`Server listening on port: ${PORT}`);
