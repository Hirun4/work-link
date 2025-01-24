const mongoose = require("mongoose");

const ProfilePictureSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  imageUrl: { type: String, required: true },
});

const ProfilePicture = mongoose.model("ProfilePicture", ProfilePictureSchema);

module.exports = ProfilePicture;
