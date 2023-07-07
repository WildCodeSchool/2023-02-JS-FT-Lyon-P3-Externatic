const express = require("express");

const {
  hashPassword,
  verifyCompanyPassword,
  verifyToken,
  logout,
} = require("../services/auth");
const {
  getCompanyByEmailMiddleWare,
  register,
} = require("../controllers/authControllers");

const routerCompany = express.Router();
const companyControllers = require("../controllers/companyControllers");

routerCompany.post("/register", hashPassword, register);
routerCompany.post(
  "/login",
  getCompanyByEmailMiddleWare,
  verifyCompanyPassword
);
routerCompany.get("/logout", logout);
routerCompany.get("/company-profile", verifyToken, companyControllers.profile);

routerCompany.get("/companies", companyControllers.browse);
routerCompany.get("/companies/:id", companyControllers.read);
routerCompany.put("/companies/:id", companyControllers.edit);
routerCompany.delete("/companies/:id", companyControllers.destroy);

module.exports = routerCompany;
