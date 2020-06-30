const Joi = require("joi");
const { User } = require("../models/user");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

// login route
router.post("/", async (req, res) => {
  // console.log("login_call------->>", req.body);

  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Invalid email or password.");

  if (user.password === req.body.password) {
    // const token = user.generateAuthToken();
    const token = jwt.sign(
      {
        _id: user._id,
        email: user.email,
        name: user.name,
        password: user.password,
      },
      "jwtPrivatekey"
    );
    // console.log("token------->>", token);

    let obj = {
      token,
      status: true,
    };
    return res.header("Authorization", token).send(obj);
  } else {
    return res.status(400).send("Invalid email or password.");
  }
});

function validate(req) {
  const schema = {
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  };

  return Joi.validate(req, schema);
}

module.exports = router;
