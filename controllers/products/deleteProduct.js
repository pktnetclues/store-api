const sequelize = require("../../utils/sequelize");

const deleteProduct = async (req, res) => {
  //Get the productId from the params
  const { productId } = req.params;

  //Get the userId from the request
  const createdBy = req.user.userId;

  //Get the role of the user from  the request
  const userRole = req.user.roleName;

  try {
    const product = await sequelize.query(
      `SELECT * FROM products WHERE productId = :productId`,
      {
        replacements: { productId },
        type: sequelize.QueryTypes.SELECT,
      }
    );

    if (product.length === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    //Check if the user is not an admin and the product was not created by the user
    if (userRole !== "admin" && product[0].createdBy !== createdBy) {
      return res.status(403).json({ message: "Not Authorized" });
    }

    //Delete the product
    await sequelize.query(`DELETE FROM products WHERE productId = :productId`, {
      replacements: { productId },
      type: sequelize.QueryTypes.DELETE,
    });

    return res.status(200).json({ message: "success" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = deleteProduct;
