const express = require("express");
const router = express.Router();
const { contactData } = require("../controller/contact-data");

router.route("/contactdata").post(contactData);

module.exports = router;