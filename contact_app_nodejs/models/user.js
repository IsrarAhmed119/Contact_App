const Joi = require("joi");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  ContactList: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Contact", require: true },
  ],
});

const User = mongoose.model("User", userSchema);

// userSchema.methods.generateAuthToken = function () {
//   const token = jwt.sign({ _id: this._id }, "jwtPrivatekey");
//   return token;
// };

function validateUser(user) {
  // console.log("modal_User------->>", user);

  const schema = {
    name: Joi.string().required(),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  };

  return Joi.validate(user, schema);
}

function validateUpdateUser(user) {
  // console.log("modal_User------->>", user);
  const schema = {
    // name: Joi.string().required(),
    password: Joi.string().required(),
  };

  return Joi.validate(user, schema);
}
exports.User = User;
exports.validate = validateUser;
exports.validateUpdate = validateUpdateUser;
