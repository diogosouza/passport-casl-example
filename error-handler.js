const { ForbiddenError } = require("@casl/ability");

module.exports = function errorHandler(error, _req, res, _next) {
  if (error instanceof ForbiddenError) {
    return res.render("error", {
      error: `You don't permission to ${error.action} this ${error.subjectType}`,
    });
  }
};
