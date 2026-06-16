const express = require("express");
const fs = require("fs");
const bcrypt = require("bcryptjs");

const router = express.Router();

const USERS_FILE = "./data/users.json";

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  const users = JSON.parse(
    fs.readFileSync(USERS_FILE)
  );

  const exists = users.find(
    (u) => u.email === email
  );

  if (exists) {
    return res.json({
      message: "User already exists"
    });
  }

  const hashedPassword =
    await bcrypt.hash(password, 10);

  users.push({
    name,
    email,
    password: hashedPassword
  });

  fs.writeFileSync(
    USERS_FILE,
    JSON.stringify(users, null, 2)
  );

  res.json({
    message: "Registration Successful"
  });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const users = JSON.parse(
    fs.readFileSync(USERS_FILE)
  );

  const user = users.find(
    (u) => u.email === email
  );

  if (!user) {
    return res.json({
      message: "User not found"
    });
  }

  const valid =
    await bcrypt.compare(
      password,
      user.password
    );

  if (!valid) {
    return res.json({
      message: "Invalid Password"
    });
  }

  res.json({
    message: "Login Successful",
    user: user.name
  });
});

module.exports = router;