const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    // Obtener el valor completo del encabezado Authorization (por ejemplo: "Bearer <token>")
    const token = req.headers['authorization'];

    // Verificar si el encabezado está presente
    if (!token) return res.status(403).json({ error: 'Token requerido' });

    // Extraer el token (se asume que el encabezado es "Bearer <token>")
    const tokenPart = token.split(" ")[1]; // Esto extrae el token de la parte "Bearer <token>"

    // Verificar si el token existe
    if (!tokenPart) return res.status(403).json({ error: 'Token requerido' });

    try {
        // Verificar el token con jwt
        const decoded = jwt.verify(tokenPart, 'tu_secreto');
        req.user = decoded; // Guardar la información del usuario decodificado en req.user
        next(); // Continuar con la ejecución del siguiente middleware o ruta
    } catch (error) {
        res.status(401).json({ error: 'Token inválido' });
    }
};

module.exports = verifyToken;
