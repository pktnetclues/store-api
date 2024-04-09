const sequelize = require("../../utils/sequelize");

const deleteUser = async (req, res) => {
  // Get the userId and userRole from the request object
  const { userId, userRole } = req.user;

  try {
    const [user] = await sequelize.query(
      `SELECT * FROM users WHERE userId = :userId`,
      {
        replacements: { userId },
        type: sequelize.QueryTypes.SELECT,
      }
    );

    if (user.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    //Check if the user is not an admin and the product was not created by the user
    if (userRole !== "admin" && user.userId !== userId) {
      return res.status(403).json({ message: "Not Authorized" });
    }

    //Delete the product
    await sequelize.query(`DELETE FROM users WHERE userId = :userId`, {
      replacements: { userId },
      type: sequelize.QueryTypes.DELETE,
    });

    return res.status(200).json({ message: "success" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = deleteUser;
