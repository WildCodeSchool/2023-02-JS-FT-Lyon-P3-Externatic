const SendEmailManager = require("../models/SendEmailManager");

const send = (req, res) => {
  const data = req.body;

  SendEmailManager.sendMail(data)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

module.exports = {
  send,
};
