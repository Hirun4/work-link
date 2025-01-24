const express = require("express");
const upload = require("../utils/multer");
const { uploadProfilePicture, getProfilePicture } = require("../Service/profilePicture.controller.js");


const router = express.Router();

router.post("/upload", upload.single("profilePicture"), uploadProfilePicture);
router.get("/:userId", getProfilePicture);

module.exports = router;
