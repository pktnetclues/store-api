const nodemailer = require("nodemailer");
const sequelize = require("../../utils/sequelize");
const cron = require("node-cron");

const CronMailSend = async () => {
  try {
    cron.schedule("*/1 * * * *", async () => {
      await sequelize.query(
        "UPDATE emailCount SET emailCountNo = emailCountNo + 1",
        {
          type: sequelize.QueryTypes.UPDATE,
        }
      );

      // Fetch the email count
      const [countNo] = await sequelize.query("SELECT * FROM emailCount", {
        type: sequelize.QueryTypes.SELECT,
      });

      if (countNo) {
        const count = countNo.emailCountNo;

        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: process.env.GMAIL_ID,
            pass: process.env.GMAIL_PASSWORD,
          },
        });

        const mailOptions = {
          from: process.env.GMAIL_ID,
          to: "pthakur.netclues@gmail.com",
          subject: `Hello, Admin Update from node server!`,
          text: `The email count is ${count}`,
        };

        transporter.sendMail(mailOptions, (error) => {
          if (error) {
            console.error("Error sending email:", error);
          } else {
            console.log("Email sent");
          }
        });
      }
    });
  } catch (error) {
    console.error("Error", error);
  }
};

module.exports = CronMailSend;
