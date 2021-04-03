const { AbilityBuilder, Ability } = require("@casl/ability");

function defineRulesFor(user) {
  const { can, rules } = new AbilityBuilder(Ability);

  // If no user, no rules
  if (!user) return new Ability(rules);

  switch (user.id) {
    case 1:
      can("manage", "all");
      break;
    case 2:
      can("read", "Profile", {
        id: user.id,
      });
      break;
    default:
      // anonymous users can't do anything
      can();
      break;
  }

  return new Ability(rules);
}

module.exports = {
  defineRulesFor,
};
