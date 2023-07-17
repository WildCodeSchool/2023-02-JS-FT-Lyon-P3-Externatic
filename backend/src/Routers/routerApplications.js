const express = require("express");

const routerApplication = express.Router();

const { verifyToken } = require("../services/auth");

const applicationControllers = require("../controllers/applicationControllers ");

routerApplication.get("/applications", applicationControllers.browse);
routerApplication.get("/applications/:id", applicationControllers.read);
routerApplication.get(
  "/candidate-applications/:id",
  applicationControllers.browseByCandidateId
);
routerApplication.get(
  "/company-applications/:id",
  applicationControllers.browseByCompanyId
);
routerApplication.put("/applications/:id", applicationControllers.edit);
routerApplication.post("/applications", applicationControllers.add);
routerApplication.delete(
  "/applications/:id",
  verifyToken,
  applicationControllers.destroy
);

module.exports = routerApplication;
