const express = require("express");

const routerJobType = express.Router();

const jobTypeControllers = require("../controllers/jobTypeControllers");

routerJobType.get("/jobtype", jobTypeControllers.browse);
routerJobType.get("/jobtype/:id", jobTypeControllers.read);
routerJobType.put("/jobtype/:id", jobTypeControllers.edit);
routerJobType.post("/jobtype", jobTypeControllers.add);
routerJobType.delete("/jobtype/:id", jobTypeControllers.destroy);

module.exports = routerJobType;
