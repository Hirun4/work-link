const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "your-cloud-name",
  api_key: "your-api-key",
  api_secret: "your-api-secret",
});

module.exports = cloudinary;
