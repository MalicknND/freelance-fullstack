const nodemailer = require("nodemailer");

const sendEmail = async (mail, subject, text, html) => {

  let transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  transporter.verify(function (error, success) {
    if (error) {
      console.log(error);
    } else {
      console.log("SMTP Server is ready");
    }
  });

  let info = await transporter.sendMail({
    from: process.env.ADMIN_EMAIL,
    to: mail, 
    subject: subject,
    text: text, 
    html: html
  });

  return info;

}

module.exports = sendEmail;