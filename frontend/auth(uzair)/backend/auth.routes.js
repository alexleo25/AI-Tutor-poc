const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const pool = require("./db");
const auth = require("./auth.middleware");

const router = express.Router();

// Register
router.post("/register", async (req, res) => {
  const { email, password } = req.body;
  const hash = await bcrypt.hash(password, 10);

  await pool.query(
    "INSERT INTO users(email, password) VALUES($1,$2)",
    [email, hash]
  );

  res.json({ message: "User registered" });
});

// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const result = await pool.query(
    "SELECT * FROM users WHERE email=$1",
    [email]
  );

  if (!result.rows.length)
    return res.status(401).json({ error: "Invalid login" });

  const valid = await bcrypt.compare(password, result.rows[0].password);
  if (!valid)
    return res.status(401).json({ error: "Invalid login" });

  const token = jwt.sign(
    { id: result.rows[0].id },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  res.json({ token });
});

// Protected route
router.get("/me", auth, (req, res) => {
  res.json({ userId: req.user.id });
});

module.exports = router;
