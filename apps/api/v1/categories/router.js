const express = require("express")
const Router = express()
const {
  createCategory,
  getCategory,
  findOneCategory,
  updateCategory,
  deleteCategory,
} = require("./controller")
const { authenticated, authorizeRoles } = require("../../../middlewares/auth")

Router.get(
  "/categories",
  authenticated,
  authorizeRoles("organizer"),
  getCategory
)
Router.get(
  "/categories/:id",
  authenticated,
  authorizeRoles("organizer"),
  findOneCategory
)
Router.put(
  "/categories/:id",
  authenticated,
  authorizeRoles("organizer"),
  updateCategory
)
Router.delete(
  "/categories/:id",
  authenticated,
  authorizeRoles("organizer"),
  deleteCategory
)
Router.post(
  "/categories",
  authenticated,
  authorizeRoles("organizer"),
  createCategory
)

module.exports = Router
