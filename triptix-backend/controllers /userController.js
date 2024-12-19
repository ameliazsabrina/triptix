const UserModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

class UserController {
  static async register(req, res) {
    try {
      const { username, email, password } = req.body;

      const existingUser = await UserModel.findByEmail(email);
      if (existingUser) {
        return res.status(400).json({ message: "Email already registered" });
      }

      const userId = await UserModel.create({ username, email, password });
      const user = await UserModel.findById(userId);

      res.status(201).json({
        message: "User registered successfully",
        user,
      });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error registering user", error: error.message });
    }
  }

  static async login(req, res) {
    try {
      const { email, password } = req.body;

      const user = await UserModel.findByEmail(email);
      if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const token = jwt.sign(
        { userId: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: "24h" }
      );

      res.json({
        message: "Login successful",
        token,
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
        },
      });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error logging in", error: error.message });
    }
  }
}

module.exports = UserController;
