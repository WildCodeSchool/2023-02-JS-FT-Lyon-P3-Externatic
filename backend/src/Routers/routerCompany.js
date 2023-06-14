const express = require("express");


const routerCompany = express.Router();
const companyControllers = require("../controllers/companyControllers");

routerCompany.get("/api/movies", companyControllers.browse);
routerCompany.get("/api/movies/:id", companyControllers.read);
routerCompany.post("/api/movies", companyControllers.edit);
routerCompany.put("/api/movies/:id", companyControllers.add);
routerCompany.delete("/api/movies/:id", companyControllers.destroy);


module.exports = routerCompany;
