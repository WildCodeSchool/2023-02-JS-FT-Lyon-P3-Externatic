const nodemailer = require("nodemailer");

require("dotenv").config();

const { NODE_MAILER_USER, NODE_MAILER_PASS } = process.env;

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: NODE_MAILER_USER,
    pass: NODE_MAILER_PASS,
  },
});

const SendEmailManager = {
  // send mail with defined transport object
  sendMail: async (data) => {
    try {
      const info = await transporter.sendMail({
        from: data.from, // sender address
        to: data.to, // list of receivers
        subject: data.subject, // Subject line
        text: data.text, // plain text body
        html: data.html, // html body
      });
      console.info("Message sent: %s", info.messageId);
    } catch (error) {
      console.error(error);
    }
  },
  // async..await is not allowed in global scope, must use a wrapper
};

module.exports = SendEmailManager;
