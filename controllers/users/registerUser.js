const bcrypt = require("bcrypt");
const Yup = require("yup");
const { QueryTypes } = require("sequelize");
const crypto = require("crypto");
const sequelize = require("../../utils/sequelize");
const otpMailSender = require("../../utils/otpMailSender");

const registerUser = async (req, res) => {
  try {
    // Validate request body
    await validationSchema.validate(req.body, { abortEarly: false });

    const { firstName, lastName, email, password, gender, hobbies } = req.body;

    const profilePic = req.file ? req.file.filename : null;

    // Check if the user already exists
    const [existingUser] = await sequelize.query(
      `SELECT email FROM users WHERE email = :email`,
      {
        replacements: { email },
        type: QueryTypes.SELECT,
      }
    );

    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate OTP
    const otp = generateSixDigitOTP();

    const roleId = 2;

    await sequelize.query(
      `INSERT INTO users (firstName, lastName, email, password, gender, hobbies, roleId, profilePic) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      {
        replacements: [
          firstName,
          lastName,
          email,
          hashedPassword,
          gender,
          hobbies,
          roleId,
          profilePic,
        ],
        type: QueryTypes.INSERT,
      }
    );

    await sequelize.query(`INSERT INTO otps (email, otp) VALUES (?, ?)`, {
      replacements: [email, otp],
      type: QueryTypes.INSERT,
    });

    // Send OTP via email
    otpMailSender(firstName, email, otp, (error) => {
      console.log("In Mails send");
      if (error) {
        console.error("Error sending email:", error);
        return res.status(500).json({ message: "Error sending email" });
      }
      console.log("Email sent successfully");
    });

    // Return success message
    return res.status(200).json({ message: "Success" });
  } catch (error) {
    if (error instanceof Yup.ValidationError) {
      return res.status(400).json({ errors: error.inner });
    }
    return res.status(500).json({ message: error.message });
  }
};

// Validation schema
const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  gender: Yup.string().oneOf(["Male", "Female"]).required("Gender is required"),
  hobbies: Yup.string().required("Hobbies are required"),
});

const generateSixDigitOTP = () => {
  return crypto.randomInt(100000, 999999);
};

module.exports = registerUser;
