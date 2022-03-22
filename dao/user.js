const User = require("../models/user");

class UserDAO {
  async signUp(name, email, password) {
    return await User.query().insert({
      name: name,
      email: email,
      password: password,
    });
  }

  async findUserByEmail(email) {
    return await User.query().findOne({ email: email });
  }
}

module.exports = new UserDAO();
