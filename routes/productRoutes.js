const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const fileHandleMiddleware = require("../middleware/fileHandleMiddleware");
const createProduct = require("../controllers/products/createProduct");
const deleteProduct = require("../controllers/products/deleteProduct");
const getProductsByUser = require("../controllers/products/getProductsByUser");
const updateProduct = require("../controllers/products/updateProduct");
const searchProduct = require("../controllers/products/searchProduct");

const productRoutes = express.Router();

// Create product
productRoutes.post(
  "/create/product",
  authMiddleware,
  fileHandleMiddleware.array("productImages", 5),
  createProduct
);

//Get categories by user
productRoutes.get("/get/products", authMiddleware, getProductsByUser);

//Get categories by user
productRoutes.get("/search/products", authMiddleware, searchProduct);

//Update product
productRoutes.put(
  "/update/product/:productId",
  authMiddleware,
  fileHandleMiddleware.array("productImages", 5),
  updateProduct
);

//Delete product
productRoutes.delete(
  "/delete/product/:productId",
  authMiddleware,
  deleteProduct
);
module.exports = productRoutes;
