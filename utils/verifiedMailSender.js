const nodemailer = require("nodemailer");

const verifiedMailSender = (email, firstName, callback) => {
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
    <style>
        body {
            margin: 0;
            padding: 0;
            background-color: #f7f7f7;
            font-family: "Helvetica Neue", Arial, sans-serif;
        }
        
        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #ffffff;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }
        
        .content {
            background-color: #f7f7f7;
            padding: 20px;
            border-radius: 8px;
            margin: 0 auto;
        }
        
        h1 {
            color: #333333;
            text-align: center;
            margin-top: 0;
        }
        
        p {
            color: #555555;
            font-size: 16px;
            line-height: 1.5;
        }
        
        .footer {
            margin: 0 auto;
            padding: 20px;
            text-align: center;
            border-radius: 0 0 8px 8px;
            margin-top: 20px;
        }
        
        .footer h4 {
            color: #333333;
            margin: 0;
        }
        
        .footer p {
            color: #888888;
            font-size: 14px;
            margin: 0;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Congratulations, ${firstName}!</h1>
        <div class="content">
            <p>Your account has been verified successfully.</p>
            <p>This is your account information:</p>
            <p>Email: ${email}</p>
        </div>
    </div>
    <div class="footer">
        <h4>www.store.xyz</h4>
        <p>&copy; 2024 Store. All rights reserved.</p>
    </div>
</body>
</html>
`;

  const mailOptions = {
    from: "Pankaj Thakur 👻",
    to: email,
    subject: `Congratulations, ${firstName}! Your account has been verified`,
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

module.exports = verifiedMailSender;
