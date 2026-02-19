# 🚀 GOTI Backend - Sistema de Autenticación

## 📋 Descripción

Sistema completo de autenticación para la aplicación financiera GOTI, implementado con Node.js, Express y Firebase Firestore.

## 🏗️ Arquitectura

```
backend/
├── config/
│   └── firebase.js          # Configuración de Firebase Admin SDK
├── controllers/
│   └── authController.js    # Lógica de autenticación
├── middleware/
│   ├── auth.js              # Middleware de autenticación JWT
│   └── validators.js        # Validadores de entrada
├── routes/
│   └── auth.js              # Rutas de autenticación
├── .env.example             # Ejemplo de variables de entorno
├── package.json             # Dependencias del proyecto
└── server.js                # Servidor Express principal
```

## 🔧 Instalación

### 1. Instalar dependencias

```bash
cd backend
npm install
```

### 2. Configurar Firebase

1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Crea un nuevo proyecto o selecciona uno existente
3. Ve a **Configuración del proyecto** > **Cuentas de servicio**
4. Haz clic en **Generar nueva clave privada**
5. Descarga el archivo JSON

### 3. Configurar variables de entorno

Copia `.env.example` a `.env`:

```bash
copy .env.example .env
```

Edita el archivo `.env` con tus credenciales de Firebase:

```env
PORT=3000
JWT_SECRET=tu_secreto_super_seguro_cambiar_en_produccion
JWT_EXPIRES_IN=7d

# Firebase Admin SDK
FIREBASE_PROJECT_ID=tu-proyecto-firebase
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nTU_CLAVE_PRIVADA_AQUI\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=firebase-adminsdk@tu-proyecto.iam.gserviceaccount.com

# CORS Origins
CORS_ORIGINS=http://localhost:5500,http://127.0.0.1:5500

NODE_ENV=development
```

### 4. Configurar Firestore

1. En Firebase Console, ve a **Firestore Database**
2. Haz clic en **Crear base de datos**
3. Selecciona **Modo de producción** o **Modo de prueba**
4. Elige una ubicación cercana a tus usuarios

### 5. Configurar reglas de seguridad de Firestore

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Usuarios solo pueden leer/escribir sus propios datos
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

## 🚀 Ejecución

### Modo desarrollo (con nodemon)

```bash
npm run dev
```

### Modo producción

```bash
npm start
```

El servidor estará disponible en `http://localhost:3000`

## 📡 API Endpoints

### 1. Health Check

**GET** `/health`

Verifica que el servidor esté funcionando.

**Response:**
```json
{
  "success": true,
  "message": "GOTI Backend API está funcionando",
  "timestamp": "2026-02-17T10:20:41.000Z",
  "environment": "development"
}
```

### 2. Registro de Usuario

**POST** `/api/auth/register`

Registra un nuevo usuario en el sistema.

**Request Body:**
```json
{
  "email": "usuario@ejemplo.com",
  "password": "Password123",
  "confirmPassword": "Password123",
  "acceptTerms": "true"
}
```

**Response (Success):**
```json
{
  "success": true,
  "message": "Usuario registrado exitosamente",
  "data": {
    "userId": "abc123xyz",
    "email": "usuario@ejemplo.com",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "passwordStrength": "Fuerte"
  }
}
```

**Validaciones:**
- Email válido
- Contraseña mínimo 8 caracteres
- Contraseña debe contener mayúsculas, minúsculas y números
- Las contraseñas deben coincidir
- Debe aceptar términos y condiciones

### 3. Inicio de Sesión

**POST** `/api/auth/login`

Inicia sesión con credenciales existentes.

**Request Body:**
```json
{
  "email": "usuario@ejemplo.com",
  "password": "Password123"
}
```

**Response (Success):**
```json
{
  "success": true,
  "message": "Inicio de sesión exitoso",
  "data": {
    "userId": "abc123xyz",
    "email": "usuario@ejemplo.com",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "profile": {
      "name": "",
      "phone": "",
      "avatar": ""
    }
  }
}
```

### 4. Obtener Perfil

**GET** `/api/auth/profile`

Obtiene el perfil del usuario autenticado.

**Headers:**
```
Authorization: Bearer <token>
```

**Response (Success):**
```json
{
  "success": true,
  "data": {
    "userId": "abc123xyz",
    "email": "usuario@ejemplo.com",
    "createdAt": "2026-02-17T10:20:41.000Z",
    "lastLogin": "2026-02-17T10:25:30.000Z",
    "isEmailVerified": false,
    "profile": {
      "name": "",
      "phone": "",
      "avatar": ""
    },
    "settings": {
      "notifications": true,
      "twoFactorAuth": false
    }
  }
}
```

### 5. Verificar Token

**GET** `/api/auth/verify`

Verifica si un token JWT es válido.

**Headers:**
```
Authorization: Bearer <token>
```

**Response (Success):**
```json
{
  "success": true,
  "message": "Token válido",
  "data": {
    "userId": "abc123xyz",
    "email": "usuario@ejemplo.com"
  }
}
```

## 🔒 Seguridad

### Características implementadas:

1. **Helmet**: Protección de headers HTTP
2. **CORS**: Configuración de orígenes permitidos
3. **Rate Limiting**: 
   - 100 requests/15min para endpoints generales
   - 5 requests/15min para autenticación
4. **JWT**: Tokens con expiración configurable
5. **bcrypt**: Hash seguro de contraseñas (10 rounds)
6. **Validación de entrada**: express-validator
7. **SSL**: Recomendación de encriptación 256-bit

## 🧪 Testing

### Probar con curl

**Health Check:**
```bash
curl http://localhost:3000/health
```

**Registro:**
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"test@ejemplo.com\",\"password\":\"Test1234\",\"confirmPassword\":\"Test1234\",\"acceptTerms\":\"true\"}"
```

**Login:**
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"test@ejemplo.com\",\"password\":\"Test1234\"}"
```

**Perfil (reemplaza TOKEN):**
```bash
curl http://localhost:3000/api/auth/profile \
  -H "Authorization: Bearer TOKEN"
```

## 🌐 Integración Frontend

### Incluir el cliente de autenticación

```html
<script src="../../goti_auth.js"></script>
```

### Ejemplos de uso

**Registro:**
```javascript
const response = await window.gotiAuth.register(
  'usuario@ejemplo.com',
  'Password123',
  'Password123',
  true
);
```

**Login:**
```javascript
const response = await window.gotiAuth.login(
  'usuario@ejemplo.com',
  'Password123'
);
```

**Obtener perfil:**
```javascript
const profile = await window.gotiAuth.getProfile();
```

**Verificar autenticación:**
```javascript
if (window.gotiAuth.isAuthenticated()) {
  console.log('Usuario autenticado');
}
```

**Cerrar sesión:**
```javascript
window.gotiAuth.logout();
```

## 📊 Estructura de Datos (Firestore)

### Colección: `users`

```javascript
{
  email: "usuario@ejemplo.com",
  password: "$2a$10$...", // Hash bcrypt
  passwordStrength: "Fuerte",
  createdAt: "2026-02-17T10:20:41.000Z",
  lastLogin: "2026-02-17T10:25:30.000Z",
  isEmailVerified: false,
  profile: {
    name: "",
    phone: "",
    avatar: ""
  },
  settings: {
    notifications: true,
    twoFactorAuth: false
  }
}
```

## 🐛 Troubleshooting

### Error: "Missing or insufficient permissions"

**Solución:** Verifica las reglas de seguridad de Firestore y asegúrate de que el usuario tenga permisos.

### Error: "CORS policy"

**Solución:** Agrega el origen del frontend a `CORS_ORIGINS` en `.env`

### Error: "Token inválido o expirado"

**Solución:** El token JWT ha expirado. Solicita un nuevo token haciendo login nuevamente.

### Error: "Too many requests"

**Solución:** Has excedido el límite de rate limiting. Espera 15 minutos o ajusta los límites en `server.js`

## 📝 Próximas Funcionalidades

- [ ] Verificación de email
- [ ] Recuperación de contraseña
- [ ] Autenticación de dos factores (2FA)
- [ ] OAuth (Google, Facebook)
- [ ] Actualización de perfil
- [ ] Cambio de contraseña
- [ ] Eliminación de cuenta

## 📄 Licencia

MIT

## 👥 Soporte

Para soporte, contacta al equipo de desarrollo de GOTI.
