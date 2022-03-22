const config = require("config");
const jwt = require("jsonwebtoken");

function admin(req, res, next) {
  //   console.log(req.user);s
  if (req.user.roleId != 2) {
    return res.status(403).send("Access Denied");
  }

  next();
}

module.exports = admin;
