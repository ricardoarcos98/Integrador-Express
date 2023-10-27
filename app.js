// app.js
require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');
const port = 3000;
const app = express();

app.use(express.json());

// Usuarios predefinidos
const users = [
  { id: 1, username: 'user1', password: 'password1' },
  { id: 2, username: 'user2', password: 'password2' },
];

// Ruta de login
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);

  if (user) {
    const accessToken = jwt.sign({ id: user.id, username: user.username }, process.env.ACCESS_TOKEN_SECRET);
    res.json({ accessToken });
  } else {
    res.status(401).send('Usuario o contraseña incorrectos');
  }
});

// Middleware para validar el token JWT
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).send('Token no proporcionado');

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.status(403).send('Token no válido');
    req.user = user;
    next();
  });
}

// Ruta protegida
app.get('/protected', authenticateToken, (req, res) => {
  res.send('Acceso autorizado');
});

app.listen(port, () => {
  console.log(`El servidor esta corriendo en el puerto ${port}`);
});