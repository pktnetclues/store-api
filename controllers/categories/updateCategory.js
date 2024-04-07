const sequelize = require("../../utils/sequelize");

const updateCategory = async (req, res) => {
  //Get the categoryName from the request
  const { categoryName } = req.body;

  //Get the categoryId from the request
  const { categoryId } = req.params;

  //Get the userId from the request
  const createdBy = req.user.userId;

  //Get the role of the user from  the request
  const userRole = req.user.roleName;

  if (!categoryName) {
    return res.status(400).json({ message: "categoryName is required" });
  }

  try {
    const category = await sequelize.query(
      `SELECT * FROM categories WHERE categoryId = :categoryId`,
      {
        replacements: { categoryId },
        type: sequelize.QueryTypes.SELECT,
      }
    );

    if (category.length === 0) {
      return res.status(404).json({ message: "Category not found" });
    }

    if (userRole !== "admin" && category[0].createdBy !== createdBy) {
      return res.status(403).json({ message: "Not Authorized" });
    }

    await sequelize.query(
      `UPDATE categories SET categoryName = :categoryName WHERE categoryId = :categoryId`,
      {
        replacements: { categoryName, categoryId },
        type: sequelize.QueryTypes.UPDATE,
      }
    );

    return res.status(200).json({ message: "success" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = updateCategory;
