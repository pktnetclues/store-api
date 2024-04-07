const { QueryTypes } = require("sequelize");
const bcrypt = require("bcrypt");
const emailvalidator = require("email-validator");
const sequelize = require("../../utils/sequelize");

const registerUser = async (req, res) => {
  const { firstName, lastName, email, password, gender, hobbies } = req.body;

  // Check if the file is uploaded
  let profilePic = null;
  if (req.file) {
    profilePic = req.file.filename;
  }

  if (
    !firstName ||
    !lastName ||
    !email ||
    !password ||
    !gender ||
    !hobbies ||
    !profilePic
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    if (!emailvalidator.validate(email)) {
      return res.status(400).json({ message: "Invalid Email" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be atleast 6 characters" });
    }

    // Checking if the user already exists
    const getAuther = await sequelize.query(
      `SELECT * FROM users WHERE email = '${email}'`,
      { type: QueryTypes.SELECT }
    );

    if (getAuther.length) {
      return res.status(400).json({ message: "email already exists" });
    }

    // Hashing the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const roleName = "user";
    // Inserting data into the users database

    await sequelize.query(
      `INSERT INTO users (firstName, lastName, email, password, gender, hobbies, roleName, profilePic) VALUES ('${firstName}', '${lastName}', '${email}', '${hashedPassword}', '${gender}', '${hobbies}', '${roleName}', '${profilePic}')`,
      { type: QueryTypes.INSERT }
    );

    const getUser = await sequelize.query(
      `SELECT userId FROM users WHERE email = '${email}'`,
      {
        type: QueryTypes.SELECT,
      }
    );

    const userId = getUser[0].userId;

    await sequelize.query(
      `INSERT INTO roles (roleName, userId) VALUES ('${roleName}', '${userId}')`,
      { type: QueryTypes.INSERT }
    );

    return res.status(200).json({ message: "success" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = registerUser;
