const config = require("config");
const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) {
    return res.status(401).send("Access Denied. No Token Provided");
  }
  try {
    const decoded = jwt.verify(token, config.get("jwtPrivateKey"));
    // console.log(decoded);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(400).send("Invalid token");
  }
}

module.exports = auth;
