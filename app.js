// app.js
const express = require('express');
const app = express();
app.use(express.json());

let tasks = [];

// Ruta para crear una nueva tarea
app.post('/tasks', (req, res) => {
  const task = req.body;
  tasks.push(task);
  res.status(201).json(task);
});

// Ruta para actualizar una tarea
app.put('/tasks/:id', (req, res) => {
  const id = req.params.id;
  const updatedTask = req.body;
  const index = tasks.findIndex(task => task.id === id);
  if (index !== -1) {
    tasks[index] = updatedTask;
    res.json(updatedTask);
  } else {
    res.status(404).send('Tarea no encontrada');
  }
});

// Ruta para eliminar una tarea
app.delete('/tasks/:id', (req, res) => {
  const id = req.params.id;
  const index = tasks.findIndex(task => task.id === id);
  if (index !== -1) {
    tasks.splice(index, 1);
    res.status(204).send();
  } else {
    res.status(404).send('Tarea no encontrada');
  }
});

// Ruta para listar todas las tareas
app.get('/tasks', (req, res) => {
  res.json(tasks);
});

// Ruta para listar las tareas completas
app.get('/tasks/completed', (req, res) => {
  const completedTasks = tasks.filter(task => task.isCompleted);
  res.json(completedTasks);
});

// Ruta para listar las tareas incompletas
app.get('/tasks/incomplete', (req, res) => {
  const incompleteTasks = tasks.filter(task => !task.isCompleted);
  res.json(incompleteTasks);
});

// Ruta para obtener una sola tarea
app.get('/tasks/:id', (req, res) => {
  const id = req.params.id;
  const task = tasks.find(task => task.id === id);
  if (task) {
    res.json(task);
  } else {
    res.status(404).send('Tarea no encontrada');
  }
});

app.listen(3000, () => {
  console.log('El servidor está corriendo en el puerto 3000');
});