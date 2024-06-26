const { QueryTypes } = require("sequelize");
const sequelize = require("../../utils/sequelize");

const searchProduct = async (req, res) => {
  // Get the search query from req.params
  const searchQuery = req.query.search;
  const createdBy = req.user.userId;
  const userRole = req.user.roleName;
  let productResult = [];

  try {
    if (userRole === "admin") {
      productResult = await sequelize.query(
        `SELECT DISTINCT p.productId, p.productName, p.productDesc, p.productPrice, p.productImages, c.categoryName FROM products AS p LEFT JOIN categories AS c ON p.categoryId = c.categoryId WHERE LOWER(p.productName) LIKE :searchQuery OR LOWER(p.productDesc) LIKE :searchQuery`,
        {
          replacements: { searchQuery: `%${searchQuery}%` },
          type: QueryTypes.SELECT,
        }
      );
    } else {
      productResult = await sequelize.query(
        `SELECT DISTINCT p.productId, p.productName, p.productDesc, p.productPrice, p.productImages, c.categoryName FROM products AS p LEFT JOIN categories AS c ON p.categoryId = c.categoryId WHERE (LOWER(p.productName) LIKE :searchQuery OR LOWER(p.productDesc) LIKE :searchQuery) AND p.createdBy = :createdBy`,
        {
          replacements: { searchQuery: `%${searchQuery}%`, createdBy },
          type: QueryTypes.SELECT,
        }
      );
    }

    if (productResult.length === 0) {
      return res.status(404).json({ message: "No products found" });
    }

    return res
      .status(200)
      .json({ message: "success", products: productResult });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = searchProduct;
