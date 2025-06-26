const { User } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

module.exports = {
  async login(req, res) {
    const { username, password } = req.body;

    try {
      const user = await User.findOne({ where: { username } });

      // Gunakan 401 untuk semua kesalahan autentikasi agar tidak bocor informasi
      if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const token = jwt.sign(
        {
          id: user.id,
          username: user.username,
        },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );

      return res.status(200).json({
        token,
        username: user.username,
      });
    } catch (err) {
      return res.status(500).json({ message: "Internal server error" });
    }
  },
  async register(req, res) {
    const { username, password, email } = req.body;

    try {
      // Basic validation
      if (!username || !password || !email) {
        return res
          .status(400)
          .json({ message: "Username, email and password are required." });
      }

       // Email format validation
      if (!isValidEmail(email)) {
        return res
          .status(400)
          .json({ message: "Email format is not valid." });
      }

      // Check if username already exists
      const existing = await User.findOne({ where: { username } });
      if (existing) {
        return res.status(409).json({ message: "Username already exists" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await User.create({
        username,
        email,
        password: hashedPassword,
      });

      return res.status(201).json({
        message: "User registered successfully",
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
        },
      });
    } catch (err) {
      console.error("Register error:", err);
      return res.status(500).json({ message: "Internal server error" });
    }
  },
};
