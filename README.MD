
## Conexión con Backend
Para conectar el frontend con el backend, copia la siguiente configuración en tu archivo `vite.config.js`:

```javascript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    cors: true,
    proxy: {
      '/api': {
        target: "http://localhost:3000",
        headers: {
          'content-type': 'application/json; charset=utf-8',
        },
      },
    },
  },
});