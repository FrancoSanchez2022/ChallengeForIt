const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const tasksFilePath = path.join(__dirname, '../tasks.json');
let tasks = [];

if (fs.existsSync(tasksFilePath)) {
  const data = fs.readFileSync(tasksFilePath, 'utf-8');
  tasks = JSON.parse(data);
}

function saveTasks() {
  fs.writeFileSync(tasksFilePath, JSON.stringify(tasks, null, 2), 'utf-8');
}

tasks = tasks.filter(task => task.title && task.title.trim() !== '');

router.get('/api/tasks', (req, res) => {
  res.json(tasks);
});

router.post('/api/tasks', (req, res) => {
  if (!req.body.title) {
    return res.status(400).json({ error: 'El título es requerido' });
  }

  const newTask = {
    id: tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) + 1 : 1,
    title: req.body.title,
    description: req.body.description || '',
    completed: false,
    createdAt: new Date()
  };

  tasks.push(newTask);
  saveTasks();
  res.status(201).json(newTask);
});

router.put('/api/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const taskIndex = tasks.findIndex(task => task.id === taskId);

  if (taskIndex === -1) {
    return res.status(404).json({ error: 'Tarea no encontrada' });
  }

  tasks[taskIndex] = {
    ...tasks[taskIndex],
    ...req.body
  };

  saveTasks();
  res.json(tasks[taskIndex]);
});

router.delete('/api/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  tasks = tasks.filter(task => task.id !== taskId);
  saveTasks();
  res.status(204).send();
});

module.exports = router;