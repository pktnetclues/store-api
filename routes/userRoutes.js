const express = require("express");
const fileHandleMiddleware = require("../middleware/fileHandleMiddleware");
const registerUser = require("../controllers/users/registerUser");
const loginUser = require("../controllers/users/loginUser");
const authMiddleware = require("../middleware/authMiddleware");
const deleteUser = require("../controllers/users/deleteUser");
const updateUser = require("../controllers/users/updateUser");
const verifyUser = require("../controllers/users/verifyUser");

const userRoutes = express.Router();

// Register Admin
userRoutes.post(
  "/register/user",
  fileHandleMiddleware.single("profilePic"),
  registerUser
);

userRoutes.post("/verify/user", verifyUser);

// Login User
userRoutes.post("/login/user", loginUser);

userRoutes.delete("/delete/user/:id", authMiddleware, deleteUser);

userRoutes.patch("/update/user", authMiddleware, updateUser);

// Get User Profile
userRoutes.get("/profile/user", authMiddleware, (req, res) => {
  res.status(200).json({ message: "success", user: req.user });
});

module.exports = userRoutes;
