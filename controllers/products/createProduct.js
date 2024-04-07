const { QueryTypes } = require("sequelize");
const sequelize = require("../../utils/sequelize");

const createProduct = async (req, res) => {
  try {
    const { productName, productDesc, productPrice, categoryName } = req.body;
    const createdBy = req.user.userId;
    const productImages = req.files
      ? req.files.map((file) => file.filename)
      : null;

    console.log(req.files);

    // Validate required fields
    if (
      !productName ||
      !productDesc ||
      !productPrice ||
      !createdBy ||
      !productImages
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Find or create category
    const [category] = await sequelize.query(
      `SELECT categoryId FROM categories WHERE categoryName = :categoryName AND createdBy = :createdBy`,
      {
        replacements: { categoryName, createdBy },
        type: QueryTypes.SELECT,
      }
    );

    let categoryId = category?.categoryId;

    if (!categoryId) {
      // Create new category if not found
      await sequelize
        .query(
          `INSERT INTO categories (categoryName, createdBy) VALUES (:categoryName, :createdBy)`,
          {
            replacements: { categoryName, createdBy },
            type: QueryTypes.INSERT,
          }
        )
        .then(([results, metadata]) => {
          categoryId = metadata.lastInsertId;
        });
    }

    // Create product
    await sequelize.query(
      `INSERT INTO products (productName, productDesc, productPrice, categoryId, createdBy, productImages) VALUES (:productName, :productDesc, :productPrice, :categoryId, :createdBy, :productImages)`,
      {
        replacements: {
          productName,
          productDesc,
          productPrice,
          categoryId,
          createdBy,
          productImages: JSON.stringify(productImages),
        },
        type: QueryTypes.INSERT,
      }
    );

    return res.status(200).json({ message: "success" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = createProduct;
