const { Contact, validate } = require("../models/contactList");
const { User } = require("../models/user");
const auth = require("../middleware/auth");
const multer = require("multer");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
    // "http://localhost:5000/" +
  },
});

const upload = multer({ storage: storage });

router.post(
  "/addcontact",
  upload.single("contactImage"),
  auth,
  async (req, res) => {
    console.log("addcontact------->>", req.body);
    console.log("addcontact_contactNo------->>", req.body.contactNo);
    // console.log("contactImage------->>", req.file);

    // String colonDelimited = "1:2:3:4:5";
    var arr = [];
    arr = req.body.contactNo.split(",");
    // console.log("arr-------->>", arr);

    // find a user
    const finduser = await User.findOne({ _id: req.user._id });
    // validate  data
    var validateObj = {
      name: req.body.name,
      address: req.body.address,
      contactNo: arr,
    };
    const { error } = validate(validateObj);
    if (error) return res.status(400).send(error.details[0].message);

    contact = new Contact({
      name: req.body.name,
      address: req.body.address,
      contactNo: arr,
      created_at: Date.now(),
      contactImage: "http://localhost:5000/" + req.file.path,
      user: finduser._id,
    });
    await contact.save();
    // associate contact with user
    finduser.ContactList.push(contact._id);
    await finduser.save();

    let obj = {
      contact,
      status: true,
    };
    res.send(obj);
  }
);

// update contact
router.put(
  "/:contactId",
  upload.single("contactImage"),
  auth,
  async (req, res) => {
    console.log("put_contact------->>", req.body);
    // console.log("contactImage------->>", req.file);
    var arr = [];
    arr = req.body.contactNo.split(",");
    // console.log("arr-------->>", arr);
    var validateObj = {
      name: req.body.name,
      address: req.body.address,
      contactNo: arr,
    };
    const { error } = validate(validateObj);
    if (error) return res.status(400).send(error.details[0].message);

    const contact = await Contact.findById(req.params.contactId);
    if (!contact)
      return res
        .status(404)
        .send("The contact with the given ID was not found.");

    contact.name = req.body.name;
    contact.address = req.body.address;
    contact.contactNo = arr;
    contact.contactImage = "http://localhost:5000/" + req.file.path;

    const updated = await contact.save();
    // console.log("updated_contact----->>", updated);

    let obj = {
      updated,
      status: true,
    };
    res.send(obj);
  }
);

router.get("/getall", auth, async (req, res) => {
  // console.log("get_all_Task------->>");
  // const user = await User.findById(req.user._id);
  const contact = await User.findOne({ _id: req.user._id }).populate(
    "ContactList"
  );
  // console.log("getall__contact------->>", contact.ContactList);
  var contacts = contact.ContactList;
  let obj = {
    contacts,
    status: true,
  };
  res.send(obj);
});

router.delete("/:contactId", auth, async (req, res) => {
  //   console.log("delete_task----->>", req.body);

  const contact = await Contact.findByIdAndRemove(req.params.contactId);

  if (!contact)
    return res.status(404).send("The contact with the given ID was not found.");

  let obj = {
    contact,
    status: true,
  };
  res.send(obj);
});

router.get("/:contactId", auth, async (req, res) => {
  //   console.log("get_by_id_task----->>", req.body);
  const contact = await Contact.findById(req.params.contactId);

  if (!contact)
    return res.status(404).send("The contact with the given ID was not found.");

  let obj = {
    contact,
    status: true,
  };
  res.send(obj);
});

module.exports = router;
