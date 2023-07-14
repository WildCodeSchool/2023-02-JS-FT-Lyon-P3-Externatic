const express = require("express");

const {
  hashPassword,
  verifyCompanyPassword,
  verifyToken,
  logout,
} = require("../services/auth");
const {
  getCompanyByEmailMiddleWare,
  registerCompany,
} = require("../controllers/authControllers");

const {
  validateCompany,
  validateUpdateCompany,
} = require("../services/validator");

const routerCompany = express.Router();
const companyControllers = require("../controllers/companyControllers");

routerCompany.post(
  "/register-company",
  validateCompany,
  hashPassword,
  registerCompany
);
routerCompany.post(
  "/login-company",
  getCompanyByEmailMiddleWare,
  verifyCompanyPassword
);
routerCompany.get("/logout-company", logout);
routerCompany.get("/company-profile", verifyToken, companyControllers.profile);

routerCompany.get("/companies", companyControllers.browse);
routerCompany.get("/companies/:id", companyControllers.read);
routerCompany.put(
  "/companies/:id",
  validateUpdateCompany,
  companyControllers.edit
);
routerCompany.delete("/companies/:id", companyControllers.destroy);

module.exports = routerCompany;
