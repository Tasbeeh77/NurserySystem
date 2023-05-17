const express = require("express")
const router = express.Router()
const controller = require("../controllers/classController")
const { checkAdmin } = require("../Middlewares/authMiddleware")
router.route("/classes")
      .get(controller.getAllClasses)
      .post(checkAdmin, controller.addClass)
      .put(checkAdmin, controller.UpdateClass)
      .delete(checkAdmin, controller.DeleteClass)
router.route("/classes/:id")
      .get(controller.getClass)
      .delete(checkAdmin, controller.DeleteClass)
router.route("/classChildren/:id")
      .get(controller.getClassChildren)
router.route("/classTeacher/:id")
      .get(controller.getClassTeacher)

module.exports = router