const express = require("express");

const routerCompany = express.Router();
const companyControllers = require("../controllers/companyControllers");

routerCompany.get("/companies", companyControllers.browse);
routerCompany.get("/companies/:id", companyControllers.read);
routerCompany.put("/companies/:id", companyControllers.edit);
routerCompany.post("/companies", companyControllers.add);
routerCompany.delete("/companies/:id", companyControllers.destroy);

module.exports = routerCompany;
