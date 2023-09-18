const express = require("express")
const Router = express()
const {
  getEvents,
  getFindOneEvents,
  create,
  update,
  destroy,
  changeStatus
} = require("./controller")
const { authenticated, authorizeRoles } = require("../../../middlewares/auth")


Router.get("/events", authenticated, authorizeRoles('organizer'), getEvents)
Router.get(
  "/events/:id",
  authenticated,
  authorizeRoles("organizer"),
  getFindOneEvents
)
Router.post("/events", authenticated, authorizeRoles('organizer'), create)
Router.put("/events/:id", authenticated, authorizeRoles('organizer'), update)
Router.delete(
  "/events/:id",
  authenticated,
  authorizeRoles('organizer'),
  destroy
)
Router.put("/events/:id/status", authenticated, authorizeRoles('organizer'), changeStatus)

module.exports = Router
