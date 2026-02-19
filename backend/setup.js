/**
 * Script de configuración inicial para GOTI Backend
 * Ejecuta este script después de instalar las dependencias
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log('╔════════════════════════════════════════╗');
console.log('║   🚀 GOTI Backend - Configuración    ║');
console.log('╚════════════════════════════════════════╝\n');

const questions = [
    {
        key: 'PORT',
        question: 'Puerto del servidor (default: 3000): ',
        default: '3000'
    },
    {
        key: 'JWT_SECRET',
        question: 'JWT Secret (presiona Enter para generar uno aleatorio): ',
        default: () => require('crypto').randomBytes(32).toString('hex')
    },
    {
        key: 'JWT_EXPIRES_IN',
        question: 'Expiración del JWT (default: 7d): ',
        default: '7d'
    },
    {
        key: 'FIREBASE_PROJECT_ID',
        question: 'Firebase Project ID: ',
        required: true
    },
    {
        key: 'FIREBASE_CLIENT_EMAIL',
        question: 'Firebase Client Email: ',
        required: true
    },
    {
        key: 'CORS_ORIGINS',
        question: 'CORS Origins (separados por coma, default: http://localhost:5500): ',
        default: 'http://localhost:5500,http://127.0.0.1:5500'
    },
    {
        key: 'NODE_ENV',
        question: 'Entorno (development/production, default: development): ',
        default: 'development'
    }
];

const config = {};

function askQuestion(index) {
    if (index >= questions.length) {
        // Todas las preguntas respondidas
        console.log('\n⚠️  IMPORTANTE: Debes agregar manualmente FIREBASE_PRIVATE_KEY al archivo .env');
        console.log('   Copia la clave privada del archivo JSON de Firebase\n');

        createEnvFile();
        return;
    }

    const q = questions[index];
    const defaultValue = typeof q.default === 'function' ? q.default() : q.default;

    rl.question(q.question, (answer) => {
        const value = answer.trim() || defaultValue;

        if (q.required && !value) {
            console.log('❌ Este campo es requerido\n');
            askQuestion(index);
            return;
        }

        config[q.key] = value;
        askQuestion(index + 1);
    });
}

function createEnvFile() {
    const envContent = `# Puerto del servidor
PORT=${config.PORT}

# JWT Configuration
JWT_SECRET=${config.JWT_SECRET}
JWT_EXPIRES_IN=${config.JWT_EXPIRES_IN}

# Firebase Admin SDK
FIREBASE_PROJECT_ID=${config.FIREBASE_PROJECT_ID}
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\\nAGREGA_TU_CLAVE_PRIVADA_AQUI\\n-----END PRIVATE KEY-----\\n"
FIREBASE_CLIENT_EMAIL=${config.FIREBASE_CLIENT_EMAIL}

# CORS Origins (separados por coma)
CORS_ORIGINS=${config.CORS_ORIGINS}

# Entorno
NODE_ENV=${config.NODE_ENV}
`;

    const envPath = path.join(__dirname, '.env');

    fs.writeFileSync(envPath, envContent);

    console.log('\n✅ Archivo .env creado exitosamente!');
    console.log('\n📝 Próximos pasos:');
    console.log('   1. Edita .env y agrega tu FIREBASE_PRIVATE_KEY');
    console.log('   2. Ejecuta: npm run dev');
    console.log('   3. Prueba: curl http://localhost:' + config.PORT + '/health\n');

    rl.close();
}

// Verificar si ya existe .env
if (fs.existsSync(path.join(__dirname, '.env'))) {
    rl.question('\n⚠️  Ya existe un archivo .env. ¿Deseas sobrescribirlo? (s/N): ', (answer) => {
        if (answer.toLowerCase() === 's' || answer.toLowerCase() === 'si') {
            console.log('\n');
            askQuestion(0);
        } else {
            console.log('\n❌ Configuración cancelada');
            rl.close();
        }
    });
} else {
    askQuestion(0);
}
