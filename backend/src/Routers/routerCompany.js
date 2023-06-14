const express = require("express");

const routerCompany = express.Router();
const companyControllers = require("../controllers/companyControllers");

routerCompany.get("/api/companies", companyControllers.browse);
routerCompany.get("/api/companies/:id", companyControllers.read);
routerCompany.post("/api/companies", companyControllers.edit);
routerCompany.put("/api/companies/:id", companyControllers.add);
routerCompany.delete("/api/companies/:id", companyControllers.destroy);

module.exports = routerCompany;
