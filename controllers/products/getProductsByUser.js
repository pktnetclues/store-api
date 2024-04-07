const { QueryTypes } = require("sequelize");
const sequelize = require("../../utils/sequelize");

const getProductsByUser = async (req, res) => {
  const createdBy = req.user.userId;
  const userRole = req.user.roleName;
  let productResult;

  try {
    if (userRole === "admin") {
      productResult = await sequelize.query(`SELECT * FROM products`, {
        type: QueryTypes.SELECT,
      });
    } else {
      productResult = await sequelize.query(
        `SELECT * FROM products WHERE createdBy = :createdBy`,
        {
          replacements: { createdBy },
          type: QueryTypes.SELECT,
        }
      );
    }

    if (!productResult.length) {
      return res.status(404).json({ message: "No products found" });
    }

    return res
      .status(200)
      .json({ message: "success", products: productResult });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = getProductsByUser;
