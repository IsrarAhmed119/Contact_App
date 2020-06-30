const { User, validate, validateUpdate } = require("../models/user");
const auth = require("../middleware/auth");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.get("/me", auth, async (req, res) => {
  console.log("getme------->>");

  const user = await User.findById(req.user._id);
  // console.log("getme__user------->>", user);

  let obj = {
    _id: user._id,
    name: user.name,
    email: user.email,
    password: user.password,
    status: true,
  };
  res.send(obj);
});

router.post("/signin", async (req, res) => {
  console.log("postUser------->>", req.body);
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("user already Exists!");

  user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });
  await user.save();

  let obj = {
    user,
    status: true,
  };
  res.send(obj);
});
// chnage password
router.put("/:id", auth, async (req, res) => {
  // console.log("put_User------->>", req.body);
  const { error } = validateUpdate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // let finduser = await User.findOne({ _id: req.params.id });
  // if (!finduser) return res.status(400).send("user not exists!");

  const user = await User.update(
    { _id: req.params.id },
    {
      $set: {
        // name: req.body.name,
        password: req.body.password,
      },
    }
  );

  if (!user)
    return res.status(404).send("The user with the given ID was not found.");

  let obj = {
    user,
    status: true,
  };
  res.send(obj);
});

// chnage photo
router.put("/photo/:userId", auth, async (req, res) => {
  // console.log("put_User------->>", req.body);
  const { error } = validateUpdate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.update(
    { _id: req.params.userId },
    {
      $set: {
        image: req.body.image,
      },
    }
  );

  if (!user)
    return res.status(404).send("The user with the given ID was not found.");

  let obj = {
    user,
    status: true,
  };
  res.send(obj);
});
router.delete("/:id", auth, async (req, res) => {
  const user = await User.findByIdAndRemove(req.params.id);

  if (!user)
    return res.status(404).send("The user with the given ID was not found.");

  let obj = {
    user,
    status: true,
  };
  res.send(obj);
});

module.exports = router;
