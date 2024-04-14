const bcrypt = require("bcrypt");
const Yup = require("yup");
const jwt = require("jsonwebtoken");
const { QueryTypes } = require("sequelize");
const sequelize = require("../../utils/sequelize");

// Validation schema
const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const loginUser = async (req, res) => {
  try {
    await validationSchema.validate(req.body, { abortEarly: false });
    const { email, password } = req.body;

    // Checking if the user exists
    const [getUser] = await sequelize.query(
      "SELECT users.*, roles.roleName FROM users INNER JOIN roles ON users.roleId = roles.roleId WHERE users.email = ?",
      {
        replacements: [email],
        type: QueryTypes.SELECT,
      }
    );

    console.log(getUser);

    if (!getUser) {
      return res.status(400).json({ message: "Wrong email" });
    }

    // Comparing the password
    const validPassword = await bcrypt.compare(password, getUser.password);

    if (!validPassword) {
      return res.status(400).json({ message: "Wrong password" });
    }

    const token = jwt.sign(
      {
        userId: getUser.userId,
        email: getUser.email,
        firstName: getUser.firstName,
        lastName: getUser.lastName,
        gender: getUser.gender,
        hobbies: getUser.hobbies,
        profilePic: getUser.profilePic,
        roleName: getUser.roleName,
        verified: getUser.verified,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res.status(200).json({ message: "success", token });
  } catch (error) {
    if (error instanceof Yup.ValidationError) {
      return res.status(400).json({ message: error.message });
    }
    return res.status(500).json({ message: error.message });
  }
};

module.exports = loginUser;
