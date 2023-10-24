// app.js
const express = require('express');
const port = 3000;
const app = express();

app.use(express.json()); // Para poder parsear JSON en el cuerpo de las solicitudes

// Almacenamiento de tareas
global.tasks = [
    {
        id: "123456",
        isCompleted: false,
        description: "study phyton"
    },
    {
        id: "123457",
        isCompleted: true,
        description: "study sql"
    },
    {
        id: "123458",
        isCompleted: false,
        description: "study java"
    }
];

// Ruta para obtener la lista de tareas
app.get('/tasks', (req, res) => {
    res.send(global.tasks);
});

// Ruta para ver la lista de tareas
app.use('/list-view', require('./list-view-router'));

// Ruta para editar la lista de tareas
app.use('/list-edit', require('./list-edit-router'));

// Iniciar el servidor
app.listen(port, () => {
    console.log(`El servidor esta corriendo en el puerto ${port}`);
});


