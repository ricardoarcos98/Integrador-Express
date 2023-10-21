// list-view-router.js
const express = require('express');
const router = express.Router();

// Ruta para listar las tareas completas
router.get('/completed-tasks', (req, res) => {
    const completedTasks = global.tasks.filter(task => task.isCompleted);
    res.json(completedTasks);
});

// Ruta para listar las tareas incompletas
router.get('/incomplete-tasks', (req, res) => {
    const incompleteTasks = global.tasks.filter(task => !task.isCompleted);
    res.json(incompleteTasks);
});

module.exports = router;