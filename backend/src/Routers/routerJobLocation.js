const express = require("express");

const routerJobLocation = express.Router();

const jobLocationControllers = require("../controllers/jobLocationControllers");

routerJobLocation.get("/joblocation", jobLocationControllers.browse);
routerJobLocation.get("/joblocation/:id", jobLocationControllers.read);
routerJobLocation.put("/joblocation/:id", jobLocationControllers.edit);
routerJobLocation.post("/joblocation", jobLocationControllers.add);
routerJobLocation.delete("/joblocation/:id", jobLocationControllers.destroy);

module.exports = routerJobLocation;
