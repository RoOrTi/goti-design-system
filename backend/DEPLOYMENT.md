# 🚀 Guía de Deployment - GOTI Backend

## 📋 Checklist Pre-Deployment

### Seguridad
- [ ] Cambiar `JWT_SECRET` a un valor seguro y único
- [ ] Configurar reglas de seguridad de Firestore para producción
- [ ] Habilitar HTTPS/SSL
- [ ] Revisar y ajustar límites de rate limiting
- [ ] Configurar CORS solo para dominios de producción
- [ ] Habilitar autenticación de dos factores para cuentas admin de Firebase

### Configuración
- [ ] Crear proyecto de Firebase para producción
- [ ] Configurar variables de entorno de producción
- [ ] Configurar backup automático de Firestore
- [ ] Configurar monitoreo y alertas
- [ ] Configurar logs centralizados

### Testing
- [ ] Ejecutar tests de integración
- [ ] Verificar todos los endpoints
- [ ] Probar rate limiting
- [ ] Verificar manejo de errores
- [ ] Probar con datos reales

## 🌐 Opciones de Deployment

### Opción 1: Google Cloud Run (Recomendado)

**Ventajas:**
- Integración nativa con Firebase
- Escalado automático
- Pay-per-use
- HTTPS automático

**Pasos:**

1. **Instalar Google Cloud SDK**
```bash
# Descargar de https://cloud.google.com/sdk/docs/install
```

2. **Inicializar proyecto**
```bash
gcloud init
gcloud config set project TU_PROJECT_ID
```

3. **Crear Dockerfile**
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 8080
CMD ["node", "server.js"]
```

4. **Deploy**
```bash
gcloud run deploy goti-backend \
  --source . \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated
```

### Opción 2: Heroku

**Ventajas:**
- Configuración simple
- Free tier disponible
- Git-based deployment

**Pasos:**

1. **Instalar Heroku CLI**
```bash
# Descargar de https://devcenter.heroku.com/articles/heroku-cli
```

2. **Crear app**
```bash
heroku create goti-backend
```

3. **Configurar variables de entorno**
```bash
heroku config:set JWT_SECRET=tu_secreto
heroku config:set FIREBASE_PROJECT_ID=tu_proyecto
# ... etc
```

4. **Deploy**
```bash
git push heroku main
```

### Opción 3: Railway

**Ventajas:**
- Deployment automático desde GitHub
- Free tier generoso
- Configuración mínima

**Pasos:**

1. Conectar repositorio en https://railway.app
2. Configurar variables de entorno en el dashboard
3. Deploy automático en cada push

### Opción 4: VPS (DigitalOcean, AWS EC2, etc.)

**Ventajas:**
- Control total
- Costos predecibles
- Personalización completa

**Pasos:**

1. **Conectar al servidor**
```bash
ssh root@tu_servidor_ip
```

2. **Instalar Node.js**
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

3. **Instalar PM2**
```bash
npm install -g pm2
```

4. **Clonar repositorio**
```bash
git clone https://github.com/tu-usuario/goti-backend.git
cd goti-backend/backend
npm install
```

5. **Configurar .env**
```bash
nano .env
# Pegar configuración de producción
```

6. **Iniciar con PM2**
```bash
pm2 start server.js --name goti-backend
pm2 startup
pm2 save
```

7. **Configurar Nginx como reverse proxy**
```nginx
server {
    listen 80;
    server_name api.tudominio.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## 🔒 Configuración de Producción

### Variables de Entorno

```env
# Producción
NODE_ENV=production
PORT=8080

# JWT - CAMBIAR OBLIGATORIAMENTE
JWT_SECRET=GENERAR_SECRETO_SEGURO_AQUI_64_CARACTERES_MINIMO
JWT_EXPIRES_IN=7d

# Firebase
FIREBASE_PROJECT_ID=goti-production
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=firebase-adminsdk@goti-production.iam.gserviceaccount.com

# CORS - Solo dominios de producción
CORS_ORIGINS=https://goti.com,https://www.goti.com,https://app.goti.com

# Rate Limiting (más estricto en producción)
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=50
AUTH_RATE_LIMIT_MAX=3
```

### Reglas de Firestore (Producción)

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Función helper para verificar autenticación
    function isAuthenticated() {
      return request.auth != null;
    }
    
    // Función helper para verificar ownership
    function isOwner(userId) {
      return isAuthenticated() && request.auth.uid == userId;
    }
    
    // Usuarios solo pueden leer/escribir sus propios datos
    match /users/{userId} {
      allow read: if isOwner(userId);
      allow create: if isAuthenticated();
      allow update: if isOwner(userId);
      allow delete: if isOwner(userId);
    }
    
    // Denegar todo lo demás
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

## 📊 Monitoreo

### Google Cloud Monitoring

```bash
# Habilitar Cloud Monitoring
gcloud services enable monitoring.googleapis.com

# Ver logs
gcloud logging read "resource.type=cloud_run_revision" --limit 50
```

### Configurar Alertas

1. Ve a Google Cloud Console > Monitoring > Alerting
2. Crea políticas de alerta para:
   - CPU > 80%
   - Memoria > 80%
   - Errores 5xx > 10/min
   - Latencia > 2s

### Logs Personalizados

Agregar a `server.js`:

```javascript
const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple()
  }));
}
```

## 🔄 CI/CD

### GitHub Actions

Crear `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Cloud Run

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v2
    
    - name: Setup Cloud SDK
      uses: google-github-actions/setup-gcloud@v0
      with:
        project_id: ${{ secrets.GCP_PROJECT_ID }}
        service_account_key: ${{ secrets.GCP_SA_KEY }}
    
    - name: Deploy to Cloud Run
      run: |
        gcloud run deploy goti-backend \
          --source ./backend \
          --platform managed \
          --region us-central1 \
          --allow-unauthenticated
```

## 🧪 Testing en Producción

```bash
# Health check
curl https://api.tudominio.com/health

# Test de autenticación
curl -X POST https://api.tudominio.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@ejemplo.com","password":"Test1234"}'
```

## 📈 Escalado

### Configuración de Auto-scaling (Cloud Run)

```bash
gcloud run services update goti-backend \
  --min-instances=1 \
  --max-instances=10 \
  --concurrency=80
```

### Configuración de PM2 Cluster Mode

```javascript
// ecosystem.config.js
module.exports = {
  apps: [{
    name: 'goti-backend',
    script: './server.js',
    instances: 'max',
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production'
    }
  }]
};
```

## 🔐 SSL/HTTPS

### Opción 1: Let's Encrypt (VPS)

```bash
sudo apt-get install certbot python3-certbot-nginx
sudo certbot --nginx -d api.tudominio.com
```

### Opción 2: Cloud Run (Automático)

Cloud Run proporciona HTTPS automáticamente.

## 💾 Backup

### Backup Automático de Firestore

1. Ve a Firebase Console > Firestore > Backups
2. Configura backup diario
3. Retención: 30 días

### Backup Manual

```bash
gcloud firestore export gs://tu-bucket/backup-$(date +%Y%m%d)
```

## 📝 Checklist Post-Deployment

- [ ] Verificar health endpoint
- [ ] Probar registro de usuario
- [ ] Probar login
- [ ] Verificar logs
- [ ] Configurar monitoreo
- [ ] Configurar alertas
- [ ] Documentar URL de producción
- [ ] Actualizar frontend con URL de producción
- [ ] Probar rate limiting
- [ ] Verificar CORS

## 🆘 Rollback

### Cloud Run

```bash
# Listar revisiones
gcloud run revisions list --service goti-backend

# Rollback a revisión anterior
gcloud run services update-traffic goti-backend \
  --to-revisions REVISION_NAME=100
```

### Heroku

```bash
heroku releases
heroku rollback v123
```

---

**¡Deployment exitoso! 🎉**
