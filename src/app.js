const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const qs = require('querystring');
require('./config/setupModel');
const cors = require('cors');
const initAuthRoutes = require('./routes/auth');
const studentsRoutes = require('./routes/studentsRoutes');

var app = express();

app.use(cors()); // Asegúrate de que CORS se aplique antes de las rutas
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.set('query parse', str => {
    return qs.parse(str);
});

// Aquí es donde necesitas asegurarte de que las rutas sean inicializadas
initAuthRoutes().then(authRoutes => {
    app.use('/api/auth', authRoutes); // Usar el router inicializado
}).catch(error => {
    console.error('Error al inicializar las rutas de auth:', error);
});

app.use('/api/students', studentsRoutes);  // Esta ruta parece estar bien

module.exports = app;
