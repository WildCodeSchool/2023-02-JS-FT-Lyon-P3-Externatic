require("dotenv").config();
const nodemailer = require("nodemailer");

const { NODE_MAILER_USER, NODE_MAILER_PASS } = process.env;

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: NODE_MAILER_USER,
    pass: NODE_MAILER_PASS,
  },
});

// async..await is not allowed in global scope, must use a wrapper
async function main() {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: "thenomadsp2@gmail.com", // sender address
    to: "marcelooxhenrique@gmail.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
  });

  console.info("Message sent: %s", info.messageId);
}

main().catch(console.error);
