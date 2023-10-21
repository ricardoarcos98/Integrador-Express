// list-edit-router.js
const express = require('express');
const router = express.Router();

// Ruta para crear una tarea
router.post('/create-task', (req, res) => {
    const taskData = req.body;
    global.tasks.push(taskData);
    res.send('Tarea creada exitosamente');
});

// Ruta para eliminar una tarea
router.delete('/delete-task/:taskId', (req, res) => {
    const taskId = req.params.taskId;
    const taskIndex = global.tasks.findIndex(task => task.id === taskId);
    if (taskIndex !== -1) {
        global.tasks.splice(taskIndex, 1);
        res.send('Tarea eliminada exitosamente');
    } else {
        res.status(404).send('No se encontró la tarea');
    }
});

router.put('/update-task/:taskId', (req, res) => {
    const taskId = req.params.taskId;
    const updatedTaskData = req.body;
    const taskIndex = global.tasks.findIndex(task => task.id === taskId);
    if (taskIndex !== -1) {
        global.tasks[taskIndex].description = updatedTaskData.description;
        res.send('Tarea actualizada exitosamente');
    } else {
        res.status(404).send('No se encontró la tarea');
    }
});

module.exports = router;