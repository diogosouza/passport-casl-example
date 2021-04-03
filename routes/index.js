const { ForbiddenError } = require("@casl/ability");
const Profile = require("../models/profile");

module.exports = {
  configure(passport, app) {
    app.get("/", function (req, res) {
      res.render("home", { user: req.user });
    });

    app.get("/login", function (req, res) {
      res.render("login");
    });

    app.post(
      "/login",
      passport.authenticate("local", { failureRedirect: "/login" }),
      function (_req, res) {
        res.redirect("/");
      }
    );

    app.get("/logout", function (req, res) {
      req.logout();
      res.redirect("/");
    });

    app.get(
      "/profile",
      require("connect-ensure-login").ensureLoggedIn(),
      function (req, res) {
        const profile = new Profile({
          ...req.user,
        });

        ForbiddenError.from(req.ability).throwUnlessCan("read", profile);

        res.render("profile", profile);
      }
    );

    app.put(
      "/profile",
      require("connect-ensure-login").ensureLoggedIn(),
      function (req, res) {
        const profile = new Profile({
          ...req.user,
        });

        ForbiddenError.from(req.ability).throwUnlessCan("update", profile);

        res.render("profile", profile);
      }
    );
  },
};
