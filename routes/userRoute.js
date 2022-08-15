const express = require("express");
const router = express.Router();
const con = require("../lib/dbConnection");
const jwt = require("jsonwebtoken");
const middleware = require("../middleware/auth");
const AuthController = require("../controller/Auth/index");
const adminController = require("../controller/Admin/index");

// All users

router.get("/", middleware, (req, res) => {
  if (req.user.type === "admin") {
    try {
      con.query("SELECT * FROM users", (err, result) => {
        if (err) throw err;
        res.send(result);
      });
    } catch (error) {
      console.log(error);
    }
  } else {
    res.send("Not valid user");
  }
});

// Single user

router.get("/:id", middleware, (req, res) => {
  if (req.user.type === "admin") {
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
  } else {
    res.send("Not valid user");
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
  return adminController.deleteUser(req, res);
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

// Get all items from cart

router.get("/:id/cart", (req, res) => {
  let cart = [];
  try {
    let sql = "SELECT * FROM cart";
    con.query(sql, (err, result) => {
      if (err) throw err;
      if (result.length === 0) {
        res.send("Cart is empty.");
      } else {
        res.send(result);
      }
    });
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

// Adding to cart

router.post("/:id/cart", (req, res) => {
  try {
    let sql = "INSERT INTO cart SET ?";
    const { user_id, quantity, cart_items } = req.body;
    let jsonCart = JSON.stringify(cart_items);
    let cart = {
      user_id,
      quantity,
      cart_items: jsonCart,
    };
    con.query(sql, cart, (err, result) => {
      if (err) throw err;
      res.send("Added to cart successfully.");
    });
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

// Deleting one item from cart

router.delete("/:id/cart/:id", (req, res) => {
  try {
    let sql = `DELETE FROM cart WHERE cart_id = ${req.params.id}`;
    con.query(sql, (err, result) => {
      if (err) throw err;
      res.send("Item has been successfully removed.");
    });
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

// Clear cart

router.delete("/:id/cart", (req, res) => {
  try {
    let sql = "TRUNCATE TABLE cart";
    con.query(sql, (err, result) => {
      if (err) throw err;
      res.send("Cart has been cleared");
    });
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

// Edit cart

router.patch("/:id/cart/:id", (req, res) => {
  try {
    let sql = "UPDATE cart SET ?";
    let cart = {
      quantity: req.body.quantity,
    };
    con.query(sql, cart, (err, result) => {
      if (err) throw err;
      res.send("Quantity has been updated");
    });
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

module.exports = router;
