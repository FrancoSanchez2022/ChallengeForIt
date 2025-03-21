const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

// Ruta al archivo JSON
const tasksFilePath = path.join(__dirname, '../tasks.json');

// Leer tareas desde el archivo JSON
let tasks = [];
if (fs.existsSync(tasksFilePath)) {
  tasks = JSON.parse(fs.readFileSync(tasksFilePath, 'utf-8'));
}

// Función para guardar tareas en el archivo JSON
function saveTasks() {
  console.log("Guardando tareas:", tasks);
  fs.writeFileSync(tasksFilePath, JSON.stringify(tasks, null, 2), 'utf-8');
}

// Obtener todas las tareas
router.get('/api/tasks', (req, res) => {
  res.json(tasks);
});

// Crear una nueva tarea
router.post('/api/tasks', (req, res) => {
  const newTask = {
    id: tasks.length + 1,
    title: req.body.title,
    description: req.body.description || '',
    completed: false,
    createdAt: new Date(),
  };
  tasks.push(newTask);
  saveTasks();
  res.status(201).json(newTask);
});


// Actualizar una tarea
router.put('/api/tasks/:id', (req, res) => {
  const taskId = req.params.id;
  const updatedTask = req.body;

  const taskIndex = tasks.findIndex(task => task.id === taskId);
  if (taskIndex === -1) {
    return res.status(404).json({ error: 'Tarea no encontrada' });
  }

  tasks[taskIndex] = { ...tasks[taskIndex], ...updatedTask };
  saveTasks();
  res.json(tasks[taskIndex]);
});

// Eliminar una tarea
router.delete('/api/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const taskIndex = tasks.findIndex((t) => t.id === taskId);

  if (taskIndex === -1) {
    return res.status(404).json({ error: 'Tarea no encontrada' });
  }

  tasks.splice(taskIndex, 1);
  saveTasks(); // Guardar en el archivo JSON
  res.status(204).send();
});

module.exports = router;