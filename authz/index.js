const abilities = require("./abilities");

module.exports = {
  configure(app) {
    app.use((req, _, next) => {
      req.ability = abilities.defineRulesFor(req.user);
      next();
    });
  },
};