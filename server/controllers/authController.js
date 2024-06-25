const db = require("../config/db");

const signIn = (req, res) => {
  const { email, password } = req.body;
  const sqlSelect = "SELECT * FROM user_auth WHERE email = ? AND password = ?";

  db.query(sqlSelect, [email, password], (err, result) => {
    if (err) {
      res.status(500).json({ message: "Internal Server Error" });
      return;
    }

    if (email.length === 0 || password.length === 0) {
      res.status(400).json({ message: "Enter email and password" });
    }

    if (result.length === 0) {
      res.status(400).json({ message: "Incorrect email or password" });
    } else {
      const user = result[0];
      res.status(200).json({
        userId: user.userId,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      });
    }
  });
};

const signUp = (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  const userExists = "SELECT * FROM user_auth WHERE email = ?";
  db.query(userExists, [email], (err, response) => {
    if (err) {
      res.status(500).json({ message: "Internal Server Error" });
      return;
    }

    if (
      email.length === 0 ||
      password.length === 0 ||
      firstName.length === 0 ||
      lastName.length === 0
    ) {
      res.status(400).json({ message: "All fields are required" });
    }

    if (response.length > 0) {
      res.status(400).json({ message: "User already exists" });
    } else {
      const sqlInsert =
        "INSERT INTO user_auth (firstName, lastName, email, password) VALUES (?,?,?,?)";
      db.query(
        sqlInsert,
        [firstName, lastName, email, password],
        (err, result) => {
          if (err) {
            res.status(500).json({ message: "Failed to create an account" });
          } else {
            res.status(200).json({
              userId: result.insertId,
              firstName: firstName,
              lastName: lastName,
              email: email,
            });
          }
        }
      );
    }
  });
};

module.exports = {
  signIn,
  signUp,
};
