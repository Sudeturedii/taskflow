const { readTasks, writeTasks } = require("../utils/fileStorage");

const ALLOWED_STATUS = ["todo", "in-progress", "done"];
const ALLOWED_PRIORITY = ["low", "medium", "high"];

// GET /tasks -> tüm görevleri listele
function getAllTasks(req, res) {
  const tasks = readTasks();
  res.status(200).json(tasks);
}

// GET /tasks/:id -> tek bir görevi getir
function getTaskById(req, res) {
  const id = Number(req.params.id);
  const task = readTasks().find((t) => t.id === id);

  if (!task) {
    return res.status(404).json({ error: "Task not found" });
  }
  res.status(200).json(task);
}

// POST /tasks -> yeni görev ekle
function createTask(req, res) {
  const { title, description, status, priority, assignee } = req.body;

  // Temel kontrol: title zorunlu
  if (!title) {
    return res.status(400).json({ error: "title is required" });
  }
  if (status && !ALLOWED_STATUS.includes(status)) {
    return res
      .status(400)
      .json({ error: `status must be one of: ${ALLOWED_STATUS.join(", ")}` });
  }
  if (priority && !ALLOWED_PRIORITY.includes(priority)) {
    return res
      .status(400)
      .json({ error: `priority must be one of: ${ALLOWED_PRIORITY.join(", ")}` });
  }

  const tasks = readTasks();

  // Yeni id: mevcut en büyük id + 1
  const newId = tasks.length > 0 ? Math.max(...tasks.map((t) => t.id)) + 1 : 1;

  const newTask = {
    id: newId,
    title,
    description: description || "",
    status: status || "todo",
    priority: priority || "medium",
    assignee: assignee || "",
  };

  tasks.push(newTask);
  writeTasks(tasks);

  res.status(201).json(newTask);
}

// PUT /tasks/:id -> görevi güncelle
function updateTask(req, res) {
  const id = Number(req.params.id);
  const tasks = readTasks();
  const index = tasks.findIndex((t) => t.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "Task not found" });
  }

  const { title, description, status, priority, assignee } = req.body;

  if (status && !ALLOWED_STATUS.includes(status)) {
    return res
      .status(400)
      .json({ error: `status must be one of: ${ALLOWED_STATUS.join(", ")}` });
  }
  if (priority && !ALLOWED_PRIORITY.includes(priority)) {
    return res
      .status(400)
      .json({ error: `priority must be one of: ${ALLOWED_PRIORITY.join(", ")}` });
  }

  // Sadece gönderilen alanları güncelle, id'yi koru
  const current = tasks[index];
  tasks[index] = {
    id: current.id,
    title: title !== undefined ? title : current.title,
    description: description !== undefined ? description : current.description,
    status: status !== undefined ? status : current.status,
    priority: priority !== undefined ? priority : current.priority,
    assignee: assignee !== undefined ? assignee : current.assignee,
  };

  writeTasks(tasks);
  res.status(200).json(tasks[index]);
}

// DELETE /tasks/:id -> görevi sil
function deleteTask(req, res) {
  const id = Number(req.params.id);
  const tasks = readTasks();
  const index = tasks.findIndex((t) => t.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "Task not found" });
  }

  const [deleted] = tasks.splice(index, 1);
  writeTasks(tasks);

  res.status(200).json({ message: "Task deleted", task: deleted });
}

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
};
