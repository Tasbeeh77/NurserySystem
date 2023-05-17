const express = require("express");
const router = express.Router();
const controller = require("../controllers/childController")
const { checkAdmin } = require("../Middlewares/authMiddleware")

router.route("/children")
      .get(controller.getAllChildren)
      .post(checkAdmin, controller.addChild)
      .put(checkAdmin, controller.UpdateChild)
      .delete(checkAdmin, controller.DeleteChild);
router.route("/children/:id")
      .all(checkAdmin)
      .get(controller.getChild)
      .delete(controller.DeleteChild)

module.exports = router;