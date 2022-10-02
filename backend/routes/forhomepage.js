const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const Users = require("../configfirebase");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const firebase = require("firebase-admin");
const {
  getFirestore,
  Timestamp,
  FieldValue,
  DocumentReference,
} = require("firebase-admin/firestore");

const db = getFirestore();

const JWT_SECRET = "AKASH";
router.post(
  "/createuser",
  [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "enter a valid").isEmail(),
    body("password", "atleast 3 char").isLength({ min: 3 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { email, password, name } = req.body;
      const data = email;
      const salt = 10;
      console.log(salt);

      const encrypt = await bcrypt.hash(password, salt);
      console.log(encrypt);

      const Users = db.collection("users");

      const user = await Users.add({
        name: name,
        email: email,
        password: encrypt,
      });
      console.log("this is the id " + user.id);

      const jwtdata = {
        user: {
          id: user.id,
        },
      };

      const authtoken = jwt.sign(jwtdata, JWT_SECRET);
      console.log(authtoken);
      res.json({ authtoken });
    } catch (error) {
      res.status(500).send({ msg: error.message });
    }
  }
);

router.post(
  "/login",
  [
    body("email", "enter a valid").isEmail(),
    body("password", "Cannot be blank").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { email, password } = req.body;
      // const check = db.collection('users').doc(email);
      // const doc = await check.get();
      // const compass=doc.data().password
      const snapshot = await db
        .collection("users")
        .where("email", "==", email)
        .get(1);
      var new_pass;
      var new_id;
      if (!snapshot) {
        return res.status(400).json({ error: "Please try to login again " });
      }
      snapshot.forEach((doc) => {
        console.log(doc.data().password);
        new_pass = doc.data().password;
        new_id = doc.id;
      });

      const compare = await bcrypt.compare(password, new_pass);
      if (!compare) {
        return res.status(400).json({ error: "Please try to login again" });
      }
      console.log("logged in ");
      const data = {
        user: {
          id: new_id,
        },
      };
      const authtoken = jwt.sign(data, JWT_SECRET);
      console.log(authtoken);

      res.json({ authtoken });
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  }
);

module.exports = router;
