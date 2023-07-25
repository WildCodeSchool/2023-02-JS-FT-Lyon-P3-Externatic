const express = require("express");
const multer = require("multer");

const routerUser = express.Router();
const { verifyToken } = require("../services/auth");

// File type validation for multer
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/gif"
  ) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type."));
  }
};

// File size validation for multer
const maxSize = 5 * 1024 * 1024; // 5MB

const upload = multer({
  dest: "./public/picture/",
  limits: {
    fileSize: maxSize,
  },
  fileFilter,
});

const userControllers = require("../controllers/userControllers");

routerUser.post(
  "/maPhoto",
  verifyToken,
  upload.single("maPhoto"),
  userControllers.uploadPhoto
);

routerUser.get("/users", userControllers.browse);
routerUser.get("/users/:id", userControllers.read);
routerUser.put("/users/:id", userControllers.edit);
routerUser.post("/users", userControllers.add);
routerUser.delete("/users/:id", userControllers.destroy);

module.exports = routerUser;
