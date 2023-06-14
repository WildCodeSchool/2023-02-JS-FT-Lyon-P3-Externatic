const express = require("express");

const routerUser = express.Router();

const userControllers = require("../controllers/userControllers");

routerUser.get("/users", userControllers.browse);
routerUser.get("/users/:id", userControllers.read);
routerUser.put("/users/:id", userControllers.edit);
routerUser.post("/users", userControllers.add);
routerUser.delete("/users/:id", userControllers.destroy);

module.exports = routerUser;
