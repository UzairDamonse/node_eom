const bcrypt = require("bcryptjs");
const con = require("../../lib/dbConnection");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// Add functions

async function addProduct(req, res) {
  if (req.user.type === "admin") {
    const { name, pay_in, description, price, img_url, user_id } = req.body;

    try {
      con.query(
        `INSERT INTO products (name, pay_in, description, price, img_url, user_id) VALUES ("${name}","${pay_in}","${description}","${price}","${img_url}","${user_id}")`,
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
}
async function addProfileDetails(req, res) {
  if (req.user.type === "admin") {
    const { card_name, account_type, account_number, address, user_id } =
      req.body;

    try {
      con.query(
        `INSERT INTO profile_details (card_name,account_type,account_number,address,user_id) VALUES ("${card_name}","${account_type}","${account_number}","${address}","${user_id}")`,
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
}

// Edit functions

async function editProduct(req, res) {
  if (req.user.type === "admin") {
    const { name, price, pay_in, description, img_url, user_id } = req.body;

    let id = req.params.id;

    try {
      con.query(
        `UPDATE products SET name="${name}",price="${price}",pay_in="${pay_in}",description="${description}",img_url="${img_url}",user_id="${user_id}" WHERE products.product_id = "${id}"`,
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
}
async function editProfileDetails(req, res) {
  if (req.user.type === "admin") {
    const { card_name, account_type, account_number, address, user_id } =
      req.body;

    let id = req.params.id;

    try {
      con.query(
        `UPDATE profile_details SET card_name="${card_name}",account_type="${account_type}",account_number="${account_number}",address="${address}",user_id="${user_id}" WHERE profile_details.bank_id = "${id}"`,
        (err, result) => {
          user_id;
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
}
async function editUser(req, res) {}

// Delete functions

async function deleteProduct(req, res) {
  console.log(req.user.type);

  // if (req.user.type === "admin") {
  //   let id = req.params.id;

  //   try {
  //     con.query(
  //       `DELETE FROM products WHERE products.product_id = "${id}"`,
  //       (err, result) => {
  //         if (err) throw err;
  //         res.send(result);
  //       }
  //     );
  //   } catch (error) {
  //     console.log(error);
  //   }
  // } else {
  //   res.send("Not valid user");
  // }
}
async function deleteProfileDetails(req, res) {
  if (req.user.type === "admin") {
    let id = req.params.id;

    try {
      con.query(
        `DELETE FROM profile_details WHERE profile_details.bank_id = "${id}"`,
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
}
async function deleteUser(req, res) {
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
}

module.exports = {
  addProduct,
  addProfileDetails,
  editProduct,
  editProfileDetails,
  editUser,
  deleteProduct,
  deleteProfileDetails,
  deleteUser,
};
