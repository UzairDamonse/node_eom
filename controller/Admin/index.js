// const bcrypt = require("bcryptjs");
const con = require("../../lib/dbConnection");
// const jwt = require("jsonwebtoken");
require("dotenv").config();

// Add functions

async function addProduct(req, res) {
  if (req.user.type === "admin") {
    const { name, pay_by, description, price, img_url, user_id } = req.body;

    try {
      con.query(
        `INSERT INTO products (name, pay_by, description, price, img_url, user_id) VALUES ("${name}","${pay_by}","${description}","${price}","${img_url}","${user_id}")`,
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
async function addOrder(req, res) {
  if (req.user.type === "admin") {
    const { user_id, amount, shipping_address, order_email, order_status } =
      req.body;

    const order_date = new Date().toISOString().slice(0, 19).replace("T", " ");

    try {
      con.query(
        `INSERT INTO orders (user_id,amount,shipping_address,order_email,order_date,order_status) VALUES ("${user_id}","${amount}","${shipping_address}","${order_email}","${order_date}","${order_status}")`,
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
    const { name, price, description, img_url, user_id } = req.body;

    let id = req.params.id;

    try {
      con.query(
        `UPDATE products SET name="${name}",price="${price}",description="${description}",img_url="${img_url}",user_id="${user_id}" WHERE products.product_id = "${id}"`,
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
async function editOrder(req, res) {
  if (req.user.type === "admin") {
    const { user_id, amount, shipping_address, order_email, order_status } =
      req.body;

    const order_date = new Date().toISOString().slice(0, 19).replace("T", " ");

    let id = req.params.id;

    try {
      con.query(
        `UPDATE orders SET user_id="${user_id}",amount="${amount}",shipping_address="${shipping_address}",order_email="${order_email}",order_date="${order_date}",order_status="${order_status}" WHERE order_id = "${id}"`,
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
async function deleteOrder(req, res) {
  if (req.user.type === "admin") {
    let id = req.params.id;

    try {
      con.query(
        `DELETE FROM orders WHERE orders.order_id = "${id}"`,
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
  addOrder,
  editProduct,
  editProfileDetails,
  editOrder,
  deleteProduct,
  deleteProfileDetails,
  deleteOrder,
};
