# README.md - Uso de JWT y Protección de Rutas en JavaScript

## Introducción
JSON Web Tokens (JWT) son una forma segura de transmitir información entre partes como un objeto JSON. Se utilizan comúnmente para la autenticación y autorización en aplicaciones web, especialmente en entornos de Node.js.

## Uso de JWT

1. **Generar un Token JWT:**
   - Realiza una petición POST con las credenciales del usuario (usuario y contraseña).
   - Si las credenciales son válidas, genera un token JWT utilizando la biblioteca `jsonwebtoken`.
   - Ejemplo en JavaScript:
     ```javascript
     const jwt = require('jsonwebtoken');
     const secretKey = 'tu_frase_secreta';

     const token = jwt.sign({ username: 'usuario' }, secretKey, { expiresIn: '1h' });
     ```

2. **Enviar el Token:**
   - El cliente debe incluir el token en el encabezado de autorización de las solicitudes HTTP.
   - Formato del encabezado:
     ```
     Authorization: Bearer <token>
     ```

3. **Verificar el Token:**
   - En el servidor, verifica la firma del token para asegurarte de que no ha sido modificado.
   - Ejemplo de verificación en JavaScript:
     ```javascript
     jwt.verify(token, secretKey, (err, user) => {
         if (err) return res.sendStatus(403);
         req.user = user;
         next();
     });
     ```

## Protección de Rutas

- **Control de Acceso:**
  - Asegúrate de que las rutas protegidas solo sean accesibles si el token es válido.
  - Implementa middleware que verifique el token antes de permitir el acceso a las rutas.

- **Ejemplo de Middleware en Express.js:**
  ```javascript
  function authenticateToken(req, res, next) {
      const token = req.headers['authorization']?.split(' ')[1];
      if (!token) return res.sendStatus(401);

      jwt.verify(token, secretKey, (err, user) => {
          if (err) return res.sendStatus(403);
          req.user = user;
          next();
      });
  }