const nodemailer = require("nodemailer");
const path = require("path");

const MailSend = async (req, res) => {
  const { name, email } = req.body;
  const pdf = req.file;

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_ID,
        pass: process.env.GMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.GMAIL_ID,
      to: email,
      subject: `Hello, ${name}! Your Data is submitted successfully!`,
      attachments: [
        {
          filename: pdf.originalname,
          path: path.join(__dirname, "../../", pdf.path),
        },
      ],
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        res.status(500).json({ message: "error", error });
      } else {
        res.status(200).json({ message: "success" });
      }
    });
  } catch (error) {
    res.status(500).json({ message: "error", error });
  }
};

module.exports = MailSend;
