const express = require("express");
const router = express.Router();
const con = require("../lib/dbConnection");
const jwt = require("jsonwebtoken");
const middleware = require("../middleware/auth");
const AuthController = require("../controller/Auth/index");

// All users

router.get("/", (req, res) => {
  try {
    con.query("SELECT * FROM users", (err, result) => {
      if (err) throw err;
      res.send(result);
    });
  } catch (error) {
    console.log(error);
  }
});

// Single user

router.get("/:id", (req, res) => {
  id = req.params.id;
  try {
    con.query(
      `SELECT * FROM users WHERE users.user_id = ${id}`,
      (err, result) => {
        if (err) throw err;
        res.send(result);
      }
    );
  } catch (error) {
    console.log(error);
  }
});

// Edit user

router.put("/:id", middleware, (req, res) => {
  if (req.user.type === "admin") {
    const { full_name, type, email, password, phone_number } = req.body;

    // Start encrypting
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    let id = req.params.id;

    try {
      con.query(
        `UPDATE users SET full_name="${full_name}",type="${type}",email="${email}",password="${hash}",phone_number="${phone_number}" WHERE users.user_id = "${id}"`,
        (err, result) => {
          if (err) throw err;
          res.send(result);
        }
      );
    } catch (error) {
      console.log(error);
    }
  } else {
    res.send("Not valid user");
  }
});
// Delete user

router.delete("/:id", middleware, (req, res) => {
  if (req.user.type === "admin") {
    let id = req.params.id;

    try {
      con.query(
        `DELETE FROM users WHERE users.user_id = "${id}"`,
        (err, result) => {
          if (err) throw err;
          res.send(result);
        }
      );
    } catch (error) {
      console.log(error);
    }
  } else {
    res.send("Not valid user");
  }
});

// Encryption

const bcrypt = require("bcryptjs");

// Register user

router.post("/register", (req, res) => {
  return AuthController.Register(req, res);
});

// Login user

router.post("/login", (req, res) => {
  return AuthController.Login(req, res);
});

// Verify

router.get("/users/verify", (req, res) => {
  return AuthController.Verify(req, res);
});

module.exports = router;
