const express = require("express");
const userController = require("../controllers/user");
const auth = require("../auth"); // Import auth.js

const router = express.Router();

router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);
router.get("/details", auth.verify, userController.getProfile); // Use auth.verify instead of verify

module.exports = router;
