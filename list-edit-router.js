// list-edit-router.js
const express = require('express');
const router = express.Router();

// Middleware para verificar el cuerpo de las solicitudes POST y PUT
function validateTaskData(req, res, next) {
    const taskData = req.body;
    if (!taskData || !taskData.description || taskData.isCompleted === undefined) {
        res.status(400).send('Datos de la tarea no válidos o incompletos');
    } else {
        next();
    }
}

// Ruta para crear una tarea
router.post('/create-task', validateTaskData, (req, res) => {
    const taskData = req.body;
    global.tasks.push(taskData);
    res.send('Tarea creada exitosamente');
});

// Ruta para actualizar una tarea
router.put('/update-task/:taskId', validateTaskData, (req, res) => {
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