const router = require("express").Router();

const { verifyToken } = require("../Middleware/auth");
const User = require("../Service/userService");

//Add Users To Database
router.post("/register", User.register);

//Login Users
router.post("/login", User.login);

//Get user by id
router.get("/profile",verifyToken,User.getProfile);

module.exports = router;