const { QueryTypes } = require("sequelize");
const sequelize = require("../../utils/sequelize");
const Yup = require("yup");

// Validation schema
const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  gender: Yup.string().oneOf(["Male", "Female"]).required("Gender is required"),
  hobbies: Yup.string().required("Hobbies are required"),
});

const updateUser = async (req, res) => {
  try {
    await validationSchema.validate(req.body, { abortEarly: false });

    const { userId } = req.user;

    if (!userId) {
      return res.status(401).send("Unauthorized");
    }

    await sequelize.query(
      `UPDATE users SET firstName = ?, lastName = ?, email = ?, gender = ?, hobbies = ? WHERE userId = ?`,
      {
        replacements: [
          req.body.firstName,
          req.body.lastName,
          req.body.email,
          req.body.gender,
          req.body.hobbies,
          userId,
        ],
        type: QueryTypes.UPDATE,
      }
    );
    res.status(200).send("User updated successfully");
  } catch (error) {
    if (error instanceof Yup.ValidationError) {
      return res.status(400).json({ message: error.errors });
    }
    return res.status(500).send("Internal Server Error");
  }
};

module.exports = updateUser;
