const route = require("express").Router();

const { findAll, findById, updateUser } = require("../CONTROLLERS/user.controller");
const { verifyToken, isAdmin } = require("../MIDDLEWARES/auth.middleware");

route.get("/crm/api/users", verifyToken, isAdmin, findAll);

route.get("/crm/api/user/:id", verifyToken, isAdmin, findById);

route.post("/crm/api/user/:userId", verifyToken, isAdmin, updateUser);

module.exports = {
  userRoutes: route,
};
