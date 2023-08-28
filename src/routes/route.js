const express = require("express");
const { register, login, updateWallet } = require("../controllers/userController");
const router = express.Router();


router.post("/register", register);
router.post("/login", login);
router.put("/updateWallet/:userId", updateWallet);
module.exports = router