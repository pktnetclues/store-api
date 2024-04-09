const express = require("express");
const fileHandleMiddleware = require("../middleware/fileHandleMiddleware");
const registerUser = require("../controllers/users/registerUser");
const loginUser = require("../controllers/users/loginUser");
const authMiddleware = require("../middleware/authMiddleware");
const deleteUser = require("../controllers/users/deleteUser");

const userRoutes = express.Router();

// Register Admin
userRoutes.post(
  "/register/user",
  fileHandleMiddleware.single("profilePic"),
  registerUser
);

// Login User
userRoutes.post("/login/user", loginUser);

userRoutes.delete("/delete/user/:id", authMiddleware, deleteUser);

// Get User Profile
userRoutes.get("/profile/user", authMiddleware, (req, res) => {
  res.status(200).json({ message: "success", user: req.user });
});

module.exports = userRoutes;
