const express = require("express");

const routerApplication = express.Router();

const applicationControllers = require("../controllers/applicationControllers ");

routerApplication.get("/applications", applicationControllers.browse);
routerApplication.get("/applications/:id", applicationControllers.read);
routerApplication.get(
  "/candidate-applications/:id",
  applicationControllers.browseById
);
routerApplication.put("/applications/:id", applicationControllers.edit);
routerApplication.post("/applications", applicationControllers.add);
routerApplication.delete("/applications/:id", applicationControllers.destroy);

module.exports = routerApplication;
