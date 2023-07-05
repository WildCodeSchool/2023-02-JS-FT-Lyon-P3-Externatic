const express = require("express");

const routerJobCategory = express.Router();

const jobCategoryControllers = require("../controllers/jobCategoryControllers");

routerJobCategory.get("/categories", jobCategoryControllers.browse);
routerJobCategory.get("/categories/:id", jobCategoryControllers.read);
routerJobCategory.put("/categories/:id", jobCategoryControllers.edit);
routerJobCategory.post("/categories", jobCategoryControllers.add);
routerJobCategory.delete("/categories/:id", jobCategoryControllers.destroy);

module.exports = routerJobCategory;
