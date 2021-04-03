var users = [
  {
    id: 1,
    username: "brad",
    password: "admin",
    name: {
      first: "Brad",
      last: "Gibson",
    },
    address: {
      street: { number: 12, name: "Start St" },
      city: "Kilcoole",
      postcode: "93027",
    },
    email: "brad.gibson@example.com",
    phone: "011-962-7516",
    picture: "https://randomuser.me/api/portraits/men/75.jpg",
  },
  {
    id: 2,
    username: "zach",
    password: "admin",
    name: { first: "Zachary", last: "Wilson" },
    address: {
      street: { number: 5189, name: "Simcoe St" },
      city: "Springfield",
      postcode: "98448",
    },
    email: "zachary.wilson@example.com",
    phone: "600-887-7510",
    picture: "https://randomuser.me/api/portraits/men/4.jpg",
  },
  {
    id: 3,
    username: "anonymous",
    password: "anonymous",
    name: {
      first: "Anonymous",
    },
  },
];

exports.findUser = function (id, callback) {
  process.nextTick(function () {
    var idx = id - 1;
    if (users[idx]) {
      callback(null, users[idx]);
    } else {
      callback(new Error(`User ${id} does not exist`));
    }
  });
};

exports.findUserByUsername = function (username, callback) {
  process.nextTick(function () {
    for (var i = 0, len = users.length; i < len; i++) {
      var user = users[i];
      if (user.username === username) {
        return callback(null, user);
      }
    }
    return callback(null, null);
  });
};
