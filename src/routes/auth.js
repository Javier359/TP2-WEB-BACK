// routes/auth.js
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const initUserModel = require('../model/usersModel');

const initAuthRoutes = async () => {
    const User = await initUserModel();

    // Ruta de registro
    router.post('/register', async (req, res) => {
        const { username, password } = req.body;
        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = await User.create({ username, password: hashedPassword });
            res.status(201).json({ message: 'Usuario registrado', user });
        } catch (error) {
            res.status(500).json({ error: 'Error al registrar usuario' });
        }
    });

    // Ruta de login
    router.post('/login', async (req, res) => {
        const { username, password } = req.body;
        try {
            const user = await User.findOne({ where: { username } });
            if (!user || !(await bcrypt.compare(password, user.password))) {
                return res.status(401).json({ error: 'Credenciales inválidas' });
            }

            const token = jwt.sign({ id: user.id, username: user.username }, 'tu_secreto', { expiresIn: '1h' });
            res.json({ token });
        } catch (error) {
            res.status(500).json({ error: 'Error al iniciar sesión' });
        }
    });

    return router;  // Devuelve el router
};

module.exports = initAuthRoutes;
