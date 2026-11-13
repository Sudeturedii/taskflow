const express = require("express");
const router = express.Router();
const controller = require("../controllers/taskController");

// /tasks
router.get("/", controller.getAllTasks);
router.post("/", controller.createTask);

// /tasks/:id
router.get("/:id", controller.getTaskById);
router.put("/:id", controller.updateTask);
router.delete("/:id", controller.deleteTask);

module.exports = router;
