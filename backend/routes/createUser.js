const express = require("express");
const router = express.Router();
const user = require("../models/user");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post(
  "/createuser",
  body("email", "Incorrect Email").isEmail(),
  body("password", "Length must be more then 5").isLength({ min: 5 }),
  body("name", "Length must be more then 3").isLength({ min: 3 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const salt = await bcrypt.genSalt(10)
    let secPsw = await bcrypt.hash(req.body.password,salt)
    try {
      const newUser = new user({
        name: req.body.name,
        email: req.body.email,
        password: secPsw,
        location: req.body.location,
      });

      await newUser.save();
      console.log("New User Created");
      res.json({ success: true });
    } catch (err) {
      console.log(err);
    }
  }
);
const jwtSecret = 'mynameisNaveenganapatiGaonkar014'
router.post(
  "/loginuser",
  body("email", "Incorrect Email").isEmail(),
  body("password", "Length must be more then 5").isLength({ min: 5 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    let email = req.body.email;
    try {
      let userData = await user.findOne({ email });
      if (!userData) return res.status(400).json({ errors: "Incorrect" });
      const comparePsw = bcrypt.compare(req.body.password,userData.password)
      if (!comparePsw) return res.status(400).json({ errors: "Incorrect" });
      const data = {
        user:{
          id : userData.id
        }
      }
      const authToken = jwt.sign(data,jwtSecret)
      console.log("User Loged In");
      res.json({ success: true,authToken:authToken });
    } catch (err) {
      console.log(err);
    }
  }
);

module.exports = router;
