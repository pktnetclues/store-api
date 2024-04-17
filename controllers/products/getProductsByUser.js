const { QueryTypes } = require("sequelize");
const sequelize = require("../../utils/sequelize");

const getProductsByUser = async (req, res) => {
  const createdBy = req.user.userId;
  const userRole = req.user.roleName;
  let productResult;

  try {
    if (userRole === "admin") {
      productResult = await sequelize.query(
        `SELECT p.productId, p.productName, p.productDesc, p.productPrice, p.productImages, c.categoryName FROM products AS p LEFT JOIN categories AS c ON p.categoryId = c.categoryId`,
        {
          type: QueryTypes.SELECT,
        }
      );
    } else {
      productResult = await sequelize.query(
        `SELECT p.productId, p.productName, p.productDesc, p.productPrice, p.productImages, c.categoryName FROM products AS p LEFT JOIN categories AS c ON p.categoryId = c.categoryId WHERE p.createdBy = :createdBy`,
        {
          replacements: { createdBy },
          type: QueryTypes.SELECT,
        }
      );
    }

    return res
      .status(200)
      .json({ message: "success", products: productResult });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = getProductsByUser;
