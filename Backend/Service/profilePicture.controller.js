const ProfilePicture = require("../Models/profilePicture.model.js");

const uploadProfilePicture = async (req, res) => {
  try {
    const { userId } = req.body;
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const existingPicture = await ProfilePicture.findOne({ userId });
    if (existingPicture) {
      existingPicture.imageUrl = req.file.path;
      await existingPicture.save();
    } else {
      await ProfilePicture.create({
        userId,
        imageUrl: req.file.path,
      });
    }

    res.status(200).json({ message: "Profile picture uploaded successfully", imageUrl: req.file.path });
  } catch (error) {
    res.status(500).json({ message: "Failed to upload profile picture", error });
  }
};

const getProfilePicture = async (req, res) => {
  try {
    const { userId } = req.params;
    const profilePicture = await ProfilePicture.findOne({ userId });
    if (!profilePicture) {
      return res.status(404).json({ message: "Profile picture not found" });
    }

    res.status(200).json(profilePicture);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve profile picture", error });
  }
};

module.exports = { uploadProfilePicture, getProfilePicture };
