const express = require("express");
const router = express.Router();
const con = require("../lib/dbConnection");
const jwt = require("jsonwebtoken");
const middleware = require("../middleware/auth");
const AuthController = require("../controller/Auth/index");
const adminController = require("../controller/admin/index");

// All Profile Details

router.get("/", (req, res) => {
  try {
    con.query("SELECT * FROM profile_details", (err, result) => {
      if (err) throw err;
      res.send(result);
    });
  } catch (error) {
    console.log(error);
  }
});

// Single Profile Details

router.get("/:id", (req, res) => {
  id = req.params.id;
  try {
    con.query(
      `SELECT * FROM profile_details WHERE profile_details.bank_id = ${id}`,
      (err, result) => {
        if (err) throw err;
        res.send(result);
      }
    );
  } catch (error) {
    console.log(error);
  }
});

// Add Profile Details

router.post("/", middleware, (req, res) => {
  return adminController.addProfileDetails(req, res);
});

// Edit Profile Details

router.put("/:id", middleware, (req, res) => {
  return adminController.editProfileDetails(req, res);
});

// Delete Profile Details

router.delete("/:id", middleware, (req, res) => {
  return adminController.deleteProfileDetails(req, res);
});

module.exports = router;
