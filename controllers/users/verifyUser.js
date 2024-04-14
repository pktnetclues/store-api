const { QueryTypes } = require("sequelize");
const sequelize = require("../../utils/sequelize");
const verifiedMailSender = require("../../utils/verifiedMailSender");

const OTP_EXPIRATION_TIME = 10 * 60 * 1000;

const verifyUser = async (req, res) => {
  const { email, otp } = req.body;

  try {
    // Get the user from the database
    const [user] = await sequelize.query(
      `SELECT * FROM users WHERE email = ?`,
      {
        replacements: [email],
        type: QueryTypes.SELECT,
      }
    );

    // Check if the user exists
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // Check if the user is already verified
    if (user.verified === 1) {
      return res.status(400).json({ message: "User already verified" });
    }

    // Query the OTP from the database
    const [storedOTP] = await sequelize.query(
      `SELECT * FROM otps WHERE email = ? ORDER BY createdAt DESC LIMIT 1`,
      {
        replacements: [email],
        type: QueryTypes.SELECT,
      }
    );

    // Check if the OTP exists and is not expired
    if (
      !storedOTP ||
      Date.now() - new Date(storedOTP.createdAt).getTime() > OTP_EXPIRATION_TIME
    ) {
      return res.status(400).json({ message: "OTP expired or not generated" });
    }

    const providedOTP = otp.toString();
    const storedOTPValue = storedOTP.otp.toString();
    // Compare the OTP using strict equality
    if (providedOTP === storedOTPValue) {
      console.log("OTP matched");
      // Update user's verification status to true
      await sequelize.query(`UPDATE users SET verified = 1 WHERE email = ?`, {
        replacements: [email],
        type: QueryTypes.UPDATE,
      });

      // Delete OTP from the database after successful verification
      await sequelize.query(`DELETE FROM otps WHERE email = ?`, {
        replacements: [email],
        type: QueryTypes.DELETE,
      });

      return (
        res.status(200).json({ message: "User verified successfully" }),
        verifiedMailSender(user.email, user.firstName, (error) => {
          if (error) {
            console.error("Error sending email:", error);
          } else {
            console.log("Email sent");
          }
        })
      );
    } else {
      return res.status(400).json({ message: "Invalid OTP" });
    }
  } catch (error) {
    console.error(
      "Error verifying OTP and updating user verification status:",
      error
    );
    return res.status(500).json({
      message: "Failed to verify OTP and update user verification status",
    });
  }
};

module.exports = verifyUser;
