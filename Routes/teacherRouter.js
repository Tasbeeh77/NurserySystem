const express=require("express");
const router=express.Router();
const controller = require("../controllers/teacherController")
const { checkAdmin,checkTeacher } = require("../Middlewares/authMiddleware")

router.route("/teachers")
      .get(checkAdmin,controller.getAllTeachers)
      .post(checkAdmin,controller.addTeacher)
      .put(checkTeacher,controller.UpdateTeacher)
      .delete(checkAdmin,controller.DeleteTeacher);
router.route("/teachers/:id")
      .get(controller.getTeacher)
      .delete(controller.DeleteTeacher)

module.exports=router;