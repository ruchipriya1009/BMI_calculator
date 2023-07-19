const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user.controller");
const userValidator = require("../validators/user.validator");

router.post("/register",UserController.registerUser);
router.post("/login", UserController.login);
router.post("/logout", UserController.logout);


module.exports = router;
