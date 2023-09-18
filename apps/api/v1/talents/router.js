const express = require('express')
const Router = express()
const { getAll, getOne, create, update, destroy } = require('./controller')
const { authenticated, authorizeRoles } = require("../../../middlewares/auth")


Router.post("/talents", authenticated, authorizeRoles("organizer"), create)
Router.get("/talents", authenticated, authorizeRoles("organizer"), getAll)
Router.get("/talents/:id", authenticated, authorizeRoles("organizer"), getOne)
Router.put("/talents/:id", authenticated, authorizeRoles("organizer"), update)
Router.delete(
  "/talents/:id",
  authenticated,
  authorizeRoles("organizer"),
  destroy
)

module.exports = Router