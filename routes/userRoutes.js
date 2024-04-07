const express = require("express");
const fileHandleMiddleware = require("../middleware/fileHandleMiddleware");
const registerUser = require("../controllers/users/registerUser");
const loginUser = require("../controllers/users/loginUser");
const authMiddleware = require("../middleware/authMiddleware");

const userRoutes = express.Router();

// Register Admin
userRoutes.post(
  "/register/user",
  fileHandleMiddleware.single("profilePic"),
  registerUser
);

// Login User
userRoutes.post("/login/user", loginUser);

// userRoutes.get("/logout/admin", logoutAdmin);

// userRoutes.delete("/delete/admin/:id", deleteAdmin);

// userRoutes.get("/profile/admin", authMiddleware, (req, res) => {
//   res.status(200).json({ message: "success", user: req.admin });
// });

module.exports = userRoutes;
