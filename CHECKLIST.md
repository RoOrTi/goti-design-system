# ✅ Checklist de Configuración - GOTI Backend

## 📋 Pasos para Poner en Marcha el Sistema

### Fase 1: Preparación del Backend ✅

- [x] **Paso 1.1:** Crear estructura de carpetas del backend
- [x] **Paso 1.2:** Instalar dependencias (259 paquetes)
  ```bash
  cd backend
  npm install
  ```
- [x] **Paso 1.3:** Crear archivos de configuración
  - [x] `server.js`
  - [x] `config/firebase.js`
  - [x] `controllers/authController.js`
  - [x] `middleware/auth.js`
  - [x] `middleware/validators.js`
  - [x] `routes/auth.js`

### Fase 2: Configuración de Firebase ⏳

- [ ] **Paso 2.1:** Crear proyecto en Firebase
  1. Ve a https://console.firebase.google.com/
  2. Haz clic en "Agregar proyecto"
  3. Nombre del proyecto: `goti-app` (o el que prefieras)
  4. Desactiva Google Analytics (opcional)
  5. Haz clic en "Crear proyecto"

- [ ] **Paso 2.2:** Activar Firestore Database
  1. En el menú lateral, ve a "Firestore Database"
  2. Haz clic en "Crear base de datos"
  3. Selecciona "Modo de prueba" (para desarrollo)
  4. Elige ubicación: `us-central` (o la más cercana)
  5. Haz clic en "Habilitar"

- [ ] **Paso 2.3:** Obtener credenciales de servicio
  1. Ve a "Configuración del proyecto" (ícono de engranaje)
  2. Selecciona la pestaña "Cuentas de servicio"
  3. Haz clic en "Generar nueva clave privada"
  4. Se descargará un archivo JSON
  5. **IMPORTANTE:** Guarda este archivo en un lugar seguro

- [ ] **Paso 2.4:** Configurar reglas de seguridad de Firestore
  1. Ve a "Firestore Database" > "Reglas"
  2. Pega las siguientes reglas:
  ```javascript
  rules_version = '2';
  service cloud.firestore {
    match /databases/{database}/documents {
      match /users/{userId} {
        allow read, write: if request.auth != null && request.auth.uid == userId;
      }
    }
  }
  ```
  3. Haz clic en "Publicar"

### Fase 3: Configuración de Variables de Entorno ⏳

- [ ] **Paso 3.1:** Crear archivo `.env`
  ```bash
  cd backend
  copy .env.example .env
  ```

- [ ] **Paso 3.2:** Abrir el archivo JSON descargado de Firebase

- [ ] **Paso 3.3:** Completar `.env` con los datos del JSON
  
  Abre `.env` y completa:
  
  ```env
  PORT=3000
  
  # Generar un secreto seguro (puedes usar: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))")
  JWT_SECRET=PEGA_AQUI_UN_SECRETO_SEGURO_DE_64_CARACTERES
  JWT_EXPIRES_IN=7d
  
  # Del archivo JSON de Firebase:
  FIREBASE_PROJECT_ID=valor_de_project_id
  FIREBASE_PRIVATE_KEY="valor_de_private_key"
  FIREBASE_CLIENT_EMAIL=valor_de_client_email
  
  CORS_ORIGINS=http://localhost:5500,http://127.0.0.1:5500
  NODE_ENV=development
  ```

- [ ] **Paso 3.4:** Verificar que `FIREBASE_PRIVATE_KEY` tenga los saltos de línea correctos
  - Debe empezar con `"-----BEGIN PRIVATE KEY-----\n`
  - Debe terminar con `\n-----END PRIVATE KEY-----\n"`
  - Los `\n` deben estar como texto literal, no como saltos de línea reales

### Fase 4: Iniciar el Backend ⏳

- [ ] **Paso 4.1:** Iniciar el servidor
  ```bash
  npm run dev
  ```

- [ ] **Paso 4.2:** Verificar que el servidor inició correctamente
  
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

- [ ] **Paso 4.3:** Probar el health endpoint
  
  Abre otra terminal y ejecuta:
  ```bash
  curl http://localhost:3000/health
  ```
  
  Deberías ver:
  ```json
  {
    "success": true,
    "message": "GOTI Backend API está funcionando",
    "timestamp": "...",
    "environment": "development"
  }
  ```

### Fase 5: Probar el Sistema Completo ⏳

- [ ] **Paso 5.1:** Abrir el frontend
  1. Abre VS Code Live Server o cualquier servidor local
  2. Navega a `stitch_goti_welcome_screen/crear_cuenta/code.html`

- [ ] **Paso 5.2:** Probar registro de usuario
  1. Completa el formulario:
     - Email: `test@ejemplo.com`
     - Contraseña: `Test1234`
     - Confirmar contraseña: `Test1234`
     - Acepta términos y condiciones
  2. Haz clic en "Crear Cuenta"
  3. Deberías ver un mensaje de éxito y ser redirigido

- [ ] **Paso 5.3:** Verificar en Firestore
  1. Ve a Firebase Console > Firestore Database
  2. Deberías ver una colección `users` con tu usuario

- [ ] **Paso 5.4:** Probar inicio de sesión
  1. Navega a `stitch_goti_welcome_screen/login/code.html`
  2. Ingresa las credenciales del paso 5.2
  3. Haz clic en "Iniciar Sesión"
  4. Deberías ver un mensaje de bienvenida

- [ ] **Paso 5.5:** Verificar token en localStorage
  1. Abre Chrome DevTools (F12)
  2. Ve a Application > Local Storage
  3. Deberías ver `goti_token` y `goti_user`

### Fase 6: Testing Avanzado (Opcional) ⏳

- [ ] **Paso 6.1:** Probar con curl
  
  **Registro:**
  ```bash
  curl -X POST http://localhost:3000/api/auth/register \
    -H "Content-Type: application/json" \
    -d "{\"email\":\"curl@test.com\",\"password\":\"Curl1234\",\"confirmPassword\":\"Curl1234\",\"acceptTerms\":\"true\"}"
  ```
  
  **Login:**
  ```bash
  curl -X POST http://localhost:3000/api/auth/login \
    -H "Content-Type: application/json" \
    -d "{\"email\":\"curl@test.com\",\"password\":\"Curl1234\"}"
  ```

- [ ] **Paso 6.2:** Probar rate limiting
  1. Ejecuta el comando de login 6 veces seguidas
  2. En el 6to intento deberías recibir error 429 (Too Many Requests)

- [ ] **Paso 6.3:** Probar validaciones
  
  **Email inválido:**
  ```bash
  curl -X POST http://localhost:3000/api/auth/register \
    -H "Content-Type: application/json" \
    -d "{\"email\":\"invalido\",\"password\":\"Test1234\",\"confirmPassword\":\"Test1234\",\"acceptTerms\":\"true\"}"
  ```
  
  **Contraseña débil:**
  ```bash
  curl -X POST http://localhost:3000/api/auth/register \
    -H "Content-Type: application/json" \
    -d "{\"email\":\"test2@ejemplo.com\",\"password\":\"123\",\"confirmPassword\":\"123\",\"acceptTerms\":\"true\"}"
  ```

---

## 🎯 Resumen de Estado

### ✅ Completado
- Backend desarrollado
- Frontend desarrollado
- Dependencias instaladas
- Documentación creada

### ⏳ Pendiente (Tu parte)
- Configurar Firebase
- Crear archivo `.env`
- Iniciar servidor
- Probar el sistema

---

## 🆘 Troubleshooting Rápido

### ❌ Error: "Cannot find module"
**Solución:**
```bash
cd backend
npm install
```

### ❌ Error: "Missing or insufficient permissions"
**Solución:**
1. Ve a Firebase Console > Firestore > Reglas
2. Cambia temporalmente a modo prueba:
```javascript
allow read, write: if true;
```

### ❌ Error: "CORS policy"
**Solución:**
Agrega tu URL a `.env`:
```env
CORS_ORIGINS=http://localhost:5500,TU_URL_AQUI
```

### ❌ Error: "Invalid credentials"
**Solución:**
Verifica que copiaste correctamente:
- `FIREBASE_PROJECT_ID`
- `FIREBASE_PRIVATE_KEY` (con `\n` literales)
- `FIREBASE_CLIENT_EMAIL`

### ❌ Error: "Port 3000 already in use"
**Solución:**
Cambia el puerto en `.env`:
```env
PORT=3001
```

---

## 📞 Recursos de Ayuda

- **Documentación completa:** `README.md`
- **Inicio rápido:** `QUICKSTART.md`
- **Deployment:** `backend/DEPLOYMENT.md`
- **Resumen ejecutivo:** `RESUMEN_EJECUTIVO.md`

---

## 🎉 ¡Éxito!

Cuando completes todos los pasos con ✅, tendrás un sistema de autenticación completamente funcional.

**Próximo paso:** Configurar Firebase (Fase 2)

---

**Última actualización:** 17 de Febrero, 2026
