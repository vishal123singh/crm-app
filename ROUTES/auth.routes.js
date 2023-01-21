const express = require("express");
const { signUp, signIn } = require("../CONTROLLERS/auth.controller");
const { verifyToken } = require("../MIDDLEWARES/auth.middleware");

const route = express.Router();

route.post("/crm/api/auth/signup", signUp);

route.post("/crm/api/auth/signin", signIn);

route.get("/crm/api/verifytoken", verifyToken);

module.exports = {
  authRoutes: route,
};
