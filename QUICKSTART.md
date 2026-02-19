# 🚀 GOTI - Guía de Inicio Rápido

## ⚡ Instalación Rápida (5 minutos)

### 1. Instalar dependencias del backend

```bash
cd backend
npm install
```

### 2. Configurar Firebase

1. Ve a https://console.firebase.google.com/
2. Crea un proyecto nuevo llamado "goti-app"
3. Activa **Firestore Database** (modo prueba está bien para desarrollo)
4. Ve a **Configuración** > **Cuentas de servicio**
5. Clic en **Generar nueva clave privada**
6. Descarga el archivo JSON

### 3. Configurar variables de entorno

```bash
# En la carpeta backend/
copy .env.example .env
```

Edita `.env` y completa con los datos del JSON de Firebase:

```env
PORT=3000
JWT_SECRET=mi_secreto_super_seguro_12345
JWT_EXPIRES_IN=7d

FIREBASE_PROJECT_ID=goti-app
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@goti-app.iam.gserviceaccount.com

CORS_ORIGINS=http://localhost:5500,http://127.0.0.1:5500
NODE_ENV=development
```

### 4. Iniciar el servidor

```bash
npm run dev
```

Deberías ver:

```
╔════════════════════════════════════════╗
║     🚀 GOTI Backend API Server        ║
╠════════════════════════════════════════╣
║  Puerto: 3000                          ║
║  Entorno: development                  ║
║  URL: http://localhost:3000            ║
╚════════════════════════════════════════╝
```

### 5. Probar el backend

Abre otra terminal y ejecuta:

```bash
curl http://localhost:3000/health
```

Deberías ver:

```json
{
  "success": true,
  "message": "GOTI Backend API está funcionando",
  "timestamp": "2026-02-17T10:20:41.000Z",
  "environment": "development"
}
```

### 6. Abrir el frontend

1. Abre VS Code Live Server o cualquier servidor local
2. Navega a `stitch_goti_welcome_screen/crear_cuenta/code.html`
3. Prueba crear una cuenta
4. Luego prueba iniciar sesión en `stitch_goti_welcome_screen/login/code.html`

## 🎯 Flujo de Autenticación

```
1. Usuario abre "Crear Cuenta"
   ↓
2. Completa email, contraseña, confirma contraseña
   ↓
3. Frontend valida en tiempo real
   ↓
4. Al hacer clic en "Crear Cuenta":
   - Se envía POST a /api/auth/register
   - Backend valida y crea usuario en Firestore
   - Backend genera JWT token
   - Frontend guarda token en localStorage
   ↓
5. Usuario es redirigido al dashboard
   ↓
6. En futuras visitas:
   - Frontend verifica token con /api/auth/verify
   - Si es válido, accede directamente
   - Si no, redirige a login
```

## 🔐 Estructura de Seguridad

### Contraseñas

- **Mínimo**: 8 caracteres
- **Requerido**: Mayúsculas, minúsculas y números
- **Hash**: bcrypt con 10 rounds
- **Indicador**: Débil / Medio / Fuerte / Muy Fuerte

### Tokens JWT

- **Algoritmo**: HS256
- **Expiración**: 7 días (configurable)
- **Almacenamiento**: localStorage (frontend)
- **Transmisión**: Header Authorization: Bearer <token>

### Rate Limiting

- **General**: 100 requests / 15 minutos
- **Autenticación**: 5 intentos / 15 minutos

## 📱 Pantallas Disponibles

### ✅ Crear Cuenta
- Ruta: `stitch_goti_welcome_screen/crear_cuenta/code.html`
- Validación en tiempo real
- Indicador de seguridad de contraseña
- Toggle de visibilidad de contraseña
- Integración completa con backend

### ✅ Iniciar Sesión
- Ruta: `stitch_goti_welcome_screen/login/code.html`
- Validación de email
- Toggle de visibilidad de contraseña
- Manejo de errores
- Integración completa con backend

### ✅ Dashboard
- Ruta: `stitch_goti_welcome_screen/inicio/code.html`
- Protección con autenticación (próximamente)
- Datos del usuario autenticado

## 🧪 Pruebas Rápidas

### Test 1: Registro exitoso

```javascript
// En la consola del navegador (crear_cuenta/code.html)
await window.gotiAuth.register(
  'test@ejemplo.com',
  'Test1234',
  'Test1234',
  true
);
```

### Test 2: Login exitoso

```javascript
// En la consola del navegador (login/code.html)
await window.gotiAuth.login(
  'test@ejemplo.com',
  'Test1234'
);
```

### Test 3: Obtener perfil

```javascript
// Después de hacer login
await window.gotiAuth.getProfile();
```

### Test 4: Verificar autenticación

```javascript
console.log(window.gotiAuth.isAuthenticated());
// true si hay token, false si no
```

## 🐛 Problemas Comunes

### ❌ "Failed to fetch"

**Causa**: El backend no está corriendo
**Solución**: Ejecuta `npm run dev` en la carpeta backend

### ❌ "CORS policy"

**Causa**: El origen del frontend no está en CORS_ORIGINS
**Solución**: Agrega tu URL a `.env` en CORS_ORIGINS

### ❌ "Missing or insufficient permissions"

**Causa**: Reglas de Firestore muy restrictivas
**Solución**: En Firebase Console > Firestore > Reglas, usa modo prueba temporalmente

### ❌ "Token inválido"

**Causa**: Token expirado o JWT_SECRET incorrecto
**Solución**: Haz logout y login nuevamente

## 📊 Datos de Prueba

Puedes usar estos datos para pruebas:

```
Email: demo@goti.com
Password: Demo1234
```

## 🎨 Personalización

### Cambiar colores del tema

Edita `goti_core.js` o los archivos HTML:

```javascript
colors: {
  "primary": "#13ec5b",  // Verde GOTI
  "background-dark": "#102216",
  "surface-dark": "#1c271f",
}
```

### Cambiar duración del token

Edita `.env`:

```env
JWT_EXPIRES_IN=30d  # 30 días
```

### Cambiar límites de rate limiting

Edita `backend/server.js`:

```javascript
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200  // Aumentar a 200 requests
});
```

## 📚 Recursos

- [Documentación completa del backend](backend/README.md)
- [Firebase Console](https://console.firebase.google.com/)
- [JWT.io](https://jwt.io/) - Decodificar tokens
- [Postman](https://www.postman.com/) - Probar API

## ✨ Próximos Pasos

1. ✅ Sistema de autenticación básico
2. 🔄 Proteger rutas del dashboard
3. 🔄 Verificación de email
4. 🔄 Recuperación de contraseña
5. 🔄 Perfil de usuario editable
6. 🔄 Autenticación de dos factores

## 💡 Tips

- Usa **Chrome DevTools** > **Application** > **Local Storage** para ver el token guardado
- Usa **Network** tab para ver las peticiones al backend
- Usa **Console** para ver errores de JavaScript
- El backend muestra logs en la terminal para debugging

¡Listo! 🎉 Ya tienes un sistema de autenticación completo funcionando.
