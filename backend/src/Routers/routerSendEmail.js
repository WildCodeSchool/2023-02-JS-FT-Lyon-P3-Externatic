const express = require("express");

const routerSendEmail = express.Router();

const sendemailControllers = require("../controllers/sendemailControllers");

routerSendEmail.post("/sendemail", sendemailControllers.send);

module.exports = routerSendEmail;
