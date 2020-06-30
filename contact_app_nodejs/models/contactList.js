const Joi = require("joi");
const mongoose = require("mongoose");

const Contact = mongoose.model(
  "Contact",
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    contactNo: [],
    created_at: {
      type: Date,
      default: Date.now,
    },
    contactImage: {
      type: String,
      required: false,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  })
);

function validateContact(data) {
  console.log("modal_contact------->>", data);

  const schema = {
    name: Joi.string().required(),
    address: Joi.string().required(),
    contactNo: Joi.array(),
    // contactNo: Joi.number().required(),
  };

  return Joi.validate(data, schema);
}

exports.Contact = Contact;
exports.validate = validateContact;
