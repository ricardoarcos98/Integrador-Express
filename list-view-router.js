// list-view-router.js
const express = require('express');
const router = express.Router();

// Middleware para validar el parámetro taskId
function validateTaskId(req, res, next) {
    const taskId = req.params.taskId;
    const taskExists = global.tasks.some(task => task.id === taskId);
    if (!taskExists) {
        res.status(400).send('El taskId proporcionado no es válido');
    } else {
        next();
    }
}

// Ruta para obtener una tarea específica
router.get('/task/:taskId', validateTaskId, (req, res) => {
    const taskId = req.params.taskId;
    const task = global.tasks.find(task => task.id === taskId);
    res.json(task);
});


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