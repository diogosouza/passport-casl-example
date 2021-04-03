const Strategy = require("passport-local").Strategy;
const passport = require("passport");
const db = require("../db");

// Passport local strategy
passport.use(
  new Strategy(function (username, password, callback) {
    db.users.findUserByUsername(username, function (err, user) {
      if (err) {
        return callback(err);
      }
      if (!user) {
        return callback(null, false);
      }
      if (user.password != password) {
        return callback(null, false);
      }
      return callback(null, user);
    });
  })
);

// Passport authenticated session.
passport.serializeUser(function (user, callback) {
  callback(null, user.id);
});

passport.deserializeUser(function (id, callback) {
  db.users.findUser(id, function (err, user) {
    if (err) {
      return callback(err);
    }
    callback(null, user);
  });
});

module.exports = {
  configure(app) {
    // Init Passport and restore auth
    app.use(passport.initialize());
    app.use(passport.session());

    return passport;
  },
};
