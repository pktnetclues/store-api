const { QueryTypes } = require("sequelize");
const sequelize = require("../../utils/sequelize");

const getCategoryByUser = async (req, res) => {
  const createdBy = req.user.userId;
  const userRole = req.user.roleName;
  let categoryResult;

  try {
    if (userRole === "admin") {
      categoryResult = await sequelize.query(`SELECT * FROM categories`, {
        type: QueryTypes.SELECT,
      });
    } else {
      categoryResult = await sequelize.query(
        `SELECT * FROM categories WHERE createdBy = :createdBy`,
        {
          replacements: { createdBy },
          type: QueryTypes.SELECT,
        }
      );
    }

    if (!categoryResult.length) {
      return res.status(404).json({ message: "No categories found" });
    }

    return res
      .status(200)
      .json({ message: "success", categories: categoryResult });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = getCategoryByUser;
