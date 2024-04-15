const otpMailSender = require("../../utils/otpMailSender");
const sequelize = require("../../utils/sequelize");
const { QueryTypes } = require("sequelize");
const crypto = require("crypto");

const generateSixDigitOTP = () => {
  return crypto.randomInt(100000, 999999);
};

const emailSendOTP = async (req, res) => {
  const email = req.user.email;
  const firstName = req.user.firstName;
  // Check if the user already exists
  const [existingUser] = await sequelize.query(
    `SELECT email FROM users WHERE email = :email`,
    {
      replacements: { email },
      type: QueryTypes.SELECT,
    }
  );

  if (!existingUser) {
    return res.status(400).json({ message: "User Does Not Exist" });
  }

  if (existingUser.verified == 1) {
    return res.status(200).json({ message: "You are Already Verified" });
  }

  const otp = generateSixDigitOTP();

  await sequelize.query(`INSERT INTO otps (email, otp) VALUES (?, ?)`, {
    replacements: [email, otp],
    type: QueryTypes.INSERT,
  });

  otpMailSender(firstName, email, otp, (error) => {
    console.log("In Mails send");
    if (error) {
      console.error("Error sending email:", error);
      return res.status(500).json({ message: "Error sending email" });
    }
    console.log("Email sent successfully");
    return res.status(200).json({ message: "OTP Sent in your Email" });
  });
};

module.exports = emailSendOTP;
