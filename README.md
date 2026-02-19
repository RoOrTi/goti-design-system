# 🎯 GOTI - Sistema de Autenticación Completo

## ✅ Estado del Proyecto

### Backend ✅
- [x] Servidor Express configurado
- [x] Firebase Firestore integrado
- [x] Autenticación JWT
- [x] Validación de entrada
- [x] Rate limiting
- [x] Seguridad (Helmet, CORS)
- [x] Dependencias instaladas (259 paquetes)

### Frontend ✅
- [x] Pantalla de Crear Cuenta
- [x] Pantalla de Iniciar Sesión
- [x] Cliente de autenticación (goti_auth.js)
- [x] Validación en tiempo real
- [x] Indicador de seguridad de contraseña
- [x] Feedback visual de errores/éxito

### Documentación ✅
- [x] README completo del backend
- [x] Guía de inicio rápido
- [x] Ejemplos de uso de API
- [x] Troubleshooting

## 📁 Estructura del Proyecto

```
goti/
├── backend/                          # ✅ Backend Node.js
│   ├── config/
│   │   └── firebase.js              # Configuración Firebase
│   ├── controllers/
│   │   └── authController.js        # Lógica de autenticación
│   ├── middleware/
│   │   ├── auth.js                  # Middleware JWT
│   │   └── validators.js            # Validadores
│   ├── routes/
│   │   └── auth.js                  # Rutas de API
│   ├── .env.example                 # Ejemplo de configuración
│   ├── .gitignore                   # Archivos ignorados
│   ├── package.json                 # Dependencias
│   ├── README.md                    # Documentación
│   ├── server.js                    # Servidor principal
│   └── setup.js                     # Script de configuración
│
├── stitch_goti_welcome_screen/      # ✅ Frontend
│   ├── crear_cuenta/
│   │   └── code.html                # Pantalla de registro
│   ├── login/
│   │   └── code.html                # Pantalla de login
│   └── inicio/
│       └── code.html                # Dashboard
│
├── goti_auth.js                     # ✅ Cliente de autenticación
├── goti_core.js                     # Utilidades core
├── QUICKSTART.md                    # ✅ Guía de inicio rápido
└── README.md                        # Documentación principal

```

## 🔐 Flujo de Autenticación

```
┌─────────────┐
│   Usuario   │
└──────┬──────┘
       │
       ▼
┌─────────────────────────────────────────┐
│  1. Abre "Crear Cuenta" o "Login"      │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│  2. Completa formulario                 │
│     - Email                             │
│     - Contraseña                        │
│     - Confirmar contraseña (registro)   │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│  3. Validación Frontend                 │
│     ✓ Email válido                      │
│     ✓ Contraseña segura                 │
│     ✓ Contraseñas coinciden             │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│  4. Envío a Backend                     │
│     POST /api/auth/register             │
│     POST /api/auth/login                │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│  5. Validación Backend                  │
│     ✓ Express-validator                 │
│     ✓ Rate limiting                     │
│     ✓ Verificar duplicados              │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│  6. Procesamiento                       │
│     - Hash de contraseña (bcrypt)       │
│     - Guardar en Firestore              │
│     - Generar JWT token                 │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│  7. Respuesta al Frontend               │
│     {                                   │
│       success: true,                    │
│       data: {                           │
│         userId, email, token            │
│       }                                 │
│     }                                   │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│  8. Guardar en LocalStorage             │
│     - goti_token                        │
│     - goti_user                         │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│  9. Redirigir al Dashboard              │
└─────────────────────────────────────────┘
```

## 🚀 Cómo Iniciar

### Opción 1: Inicio Rápido (Recomendado)

```bash
# 1. Ir a la carpeta backend
cd backend

# 2. Las dependencias ya están instaladas ✅

# 3. Configurar variables de entorno
# Opción A: Manual
copy .env.example .env
# Luego edita .env con tus credenciales de Firebase

# Opción B: Interactivo
node setup.js

# 4. Iniciar servidor
npm run dev
```

### Opción 2: Configuración Manual

Lee la guía completa en [QUICKSTART.md](QUICKSTART.md)

## 📡 Endpoints Disponibles

| Método | Endpoint | Descripción | Auth |
|--------|----------|-------------|------|
| GET | `/health` | Health check | No |
| POST | `/api/auth/register` | Registrar usuario | No |
| POST | `/api/auth/login` | Iniciar sesión | No |
| GET | `/api/auth/profile` | Obtener perfil | Sí |
| GET | `/api/auth/verify` | Verificar token | Sí |

## 🔒 Seguridad Implementada

### ✅ Backend
- **Helmet**: Protección de headers HTTP
- **CORS**: Control de orígenes permitidos
- **Rate Limiting**: 
  - 100 req/15min (general)
  - 5 req/15min (autenticación)
- **bcrypt**: Hash de contraseñas (10 rounds)
- **JWT**: Tokens con expiración
- **express-validator**: Validación de entrada

### ✅ Frontend
- **Validación en tiempo real**: Email, contraseñas
- **Indicador de seguridad**: Nivel de contraseña
- **Toggle de visibilidad**: Ver/ocultar contraseña
- **Feedback visual**: Estados de carga, éxito, error
- **Sanitización**: Trim de inputs

## 🧪 Testing

### Test Backend (Health Check)

```bash
curl http://localhost:3000/health
```

**Respuesta esperada:**
```json
{
  "success": true,
  "message": "GOTI Backend API está funcionando"
}
```

### Test Registro

```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@ejemplo.com","password":"Test1234","confirmPassword":"Test1234","acceptTerms":"true"}'
```

### Test Login

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@ejemplo.com","password":"Test1234"}'
```

## 📊 Datos en Firestore

### Colección: `users`

```javascript
{
  email: "usuario@ejemplo.com",
  password: "$2a$10$...",              // Hash bcrypt
  passwordStrength: "Fuerte",
  createdAt: "2026-02-17T10:20:41Z",
  lastLogin: "2026-02-17T10:25:30Z",
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

## 🎨 Personalización

### Cambiar colores

Edita los archivos HTML o `goti_core.js`:

```javascript
colors: {
  "primary": "#13ec5b",           // Verde GOTI
  "background-dark": "#102216",
  "surface-dark": "#1c271f",
}
```

### Cambiar duración del token

Edita `.env`:

```env
JWT_EXPIRES_IN=30d  # 30 días en lugar de 7
```

## 📚 Recursos

- [Backend README](backend/README.md) - Documentación completa del backend
- [QUICKSTART](QUICKSTART.md) - Guía de inicio rápido
- [Firebase Console](https://console.firebase.google.com/)
- [JWT.io](https://jwt.io/) - Decodificar tokens

## 🐛 Troubleshooting

### Backend no inicia

```bash
# Verificar que las dependencias estén instaladas
cd backend
npm install

# Verificar que .env exista y esté configurado
cat .env  # o type .env en Windows
```

### Error de CORS

Agrega tu URL del frontend a `.env`:

```env
CORS_ORIGINS=http://localhost:5500,http://127.0.0.1:5500,TU_URL_AQUI
```

### Token inválido

El token puede haber expirado. Haz logout y login nuevamente:

```javascript
window.gotiAuth.logout();
```

## ✨ Próximas Funcionalidades

- [ ] Verificación de email
- [ ] Recuperación de contraseña
- [ ] Autenticación de dos factores (2FA)
- [ ] OAuth (Google, Facebook)
- [ ] Actualización de perfil
- [ ] Cambio de contraseña
- [ ] Eliminación de cuenta
- [ ] Dashboard protegido con autenticación

## 📝 Notas Importantes

1. **Seguridad**: Cambia `JWT_SECRET` en producción
2. **Firebase**: Configura reglas de seguridad apropiadas
3. **HTTPS**: Usa HTTPS en producción
4. **Variables de entorno**: Nunca subas `.env` a Git
5. **Rate limiting**: Ajusta según tus necesidades

## 🎉 ¡Listo!

Tu sistema de autenticación está completo y listo para usar. 

**Próximo paso**: Configura Firebase y ejecuta `npm run dev` en la carpeta backend.

---

**Desarrollado con ❤️ para GOTI Financial**
