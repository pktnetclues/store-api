const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const createCategory = require("../controllers/categories/createCategory");
const getCategoryByUser = require("../controllers/categories/getCategoryByUser");
const updateCategory = require("../controllers/categories/updateCategory");
const deleteCategory = require("../controllers/categories/deleteCategory");

const categoryRoutes = express.Router();

// Create Category
categoryRoutes.post("/create/category", authMiddleware, createCategory);

//Get categories by user
categoryRoutes.get("/get/category", authMiddleware, getCategoryByUser);

//Update category
categoryRoutes.post(
  "/update/category/:categoryId",
  authMiddleware,
  updateCategory
);

//Delete category
categoryRoutes.delete(
  "/delete/category/:categoryId",
  authMiddleware,
  deleteCategory
);
module.exports = categoryRoutes;
