const nodemailer = require("nodemailer");

const otpMailSender = (firstName, email, otp, callback) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_ID,
      pass: process.env.GMAIL_PASSWORD,
    },
  });

  const emailContent = `
<html>
<head>
    <title>Verify your login</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body {
    margin: 0;
    padding: 0;
    background-color: #ffffff;
}

table {
    border-collapse: collapse;
}

td {
    padding: 0;
}

img {
    border: none;
    max-width: 100%;
    height: auto;
}

h1, p {
    margin: 0;
    padding: 0;
}

h1 {
    font-size: 24px;
    font-weight: bold;
    color: #2c3e50;
    font-family: Arial, sans-serif;
}

p {
    font-size: 16px;
    color: #2c3e50;
    font-family: Arial, sans-serif;
}

.verification-code {
    background-color: #f5f5f5;
    padding: 20px;
    text-align: center;
    font-size: 32px;
    font-weight: bold;
    color: #2c3e50;
    font-family: Arial, sans-serif;
}

.made-with-love {
    margin-top: 20px;
    text-align: center;
    font-size: 14px;
    color: #2c3e50;
    font-family: Arial, sans-serif;
}

.heart {
    color: #e74c3c;
}
    </style>
</head>
<body>
    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse: collapse;">
        <tr>
            <td align="center" style="background-color: #ffffff; padding: 20px;">
                <h1 style="color: #2c3e50; font-family: Arial, sans-serif; font-size: 24px; font-weight: bold; margin-top: 20px;">
                OTP Verification
                </h1>
                <p style="color: #2c3e50; font-family: Arial, sans-serif; font-size: 16px; margin-top: 20px;">Please use the verification code below to sign in.</p>
                <div style="background-color: #f5f5f5; padding: 20px; margin-top: 20px; text-align: center;">
                    <span style="color: #2c3e50; font-family: Arial, sans-serif; font-size: 32px; font-weight: bold;">
                    ${otp}</span>
                </div>
                <p style="color: #2c3e50; font-family: Arial, sans-serif; font-size: 16px; margin-top: 20px;">This code will expire in 10 minutes.</p>
                <div style="margin-top: 20px; text-align: center;">
                    <span style="color: #2c3e50; font-family: Arial, sans-serif; font-size: 14px;">
                        Made with <span class="heart">❤</span> by Pankaj Thakur
                    </span>
                </div>
            </td>
        </tr>
    </table>
</body>
`;

  const mailOptions = {
    from: "Pankaj Thakur 👻",
    to: email,
    subject: `OTP Verification for ${firstName}`,
    html: emailContent,
  };

  transporter.sendMail(mailOptions, (error) => {
    if (error) {
      console.error("Error sending email:", error);
      callback(error);
    } else {
      console.log("Email sent");
      callback(null);
    }
  });
};

module.exports = otpMailSender;
