const config = require("config");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Joi = require("joi");
const userDAO = require("../dao/user");
const User = require("../models/user");
const generateAuthToken = require("../helper/generateAuthToken");

class UserService {
  async signUp(name, email, password) {
    const user = await userDAO.signUp(name, email, password);

    const token = generateAuthToken(user);
    return token;
  }

  async findUserByEmail(email) {
    const user = await userDAO.findUserByEmail(email);
    return user;
  }

  async login(email, password) {
    try {
      const loginSchema = Joi.object({
        email: Joi.string().min(4).max(255).required().email(),
        password: Joi.string().min(4).max(20).required(),
      });
      const { error, value } = loginSchema.validate({ email, password });
      //   console.log(error);
      if (error) {
        return null;
      } else if (value) {
        // console.log(value);
        let user = await userDAO.findUserByEmail(email);
        if (!user) {
          return null;
        } else {
          const validPassword = await bcrypt.compare(password, user.password);
          if (!validPassword) {
            return null;
          } else {
            const token = generateAuthToken(user);
            return token;
          }
        }
      }
    } catch (err) {
      console.error(err);
      res.status(400).json(err);
    }
  }
}

module.exports = new UserService();
