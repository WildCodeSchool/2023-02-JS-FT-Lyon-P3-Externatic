const express = require("express");

const routerApplication = express.Router();

const applicationControllers = require("../controllers/applicationControllers ");

routerApplication.get("/application", applicationControllers.browse);
routerApplication.get("/application/:id", applicationControllers.read);
routerApplication.put("/application/:id", applicationControllers.edit);
routerApplication.post("/application", applicationControllers.add);
routerApplication.delete("/application/:id", applicationControllers.destroy);

module.exports = routerApplication;
