const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const authRoutes = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || 3000;

// ===== MIDDLEWARES DE SEGURIDAD =====

// Helmet - Seguridad HTTP headers
app.use(helmet());

// CORS - Configuración
const corsOptions = {
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);

        const allowedOrigins = process.env.CORS_ORIGINS?.split(',') || ['http://localhost:5500', 'http://127.0.0.1:5500', 'null'];

        if (allowedOrigins.indexOf(origin) !== -1 || origin === 'null') {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// Rate Limiting - Prevenir ataques de fuerza bruta
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 100, // Límite de 100 requests por IP
    message: {
        success: false,
        message: 'Demasiadas solicitudes, intenta de nuevo más tarde'
    }
});
app.use('/api/', limiter);

// Auth Rate Limiting - Más estricto para autenticación
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5, // Solo 5 intentos de login por IP
    message: {
        success: false,
        message: 'Demasiados intentos de inicio de sesión, intenta de nuevo en 15 minutos'
    }
});

// ===== MIDDLEWARES GENERALES =====

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging middleware
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
    next();
});

// ===== RUTAS =====

// Health check
app.get('/health', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'GOTI Backend API está funcionando',
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'development'
    });
});

// Rutas de autenticación
app.use('/api/auth', authLimiter, authRoutes);

// Ruta 404
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Ruta no encontrada'
    });
});

// Error handler global
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(err.status || 500).json({
        success: false,
        message: err.message || 'Error interno del servidor',
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
});

// ===== INICIAR SERVIDOR =====

app.listen(PORT, () => {
    console.log('╔════════════════════════════════════════╗');
    console.log('║     🚀 GOTI Backend API Server        ║');
    console.log('╠════════════════════════════════════════╣');
    console.log(`║  Puerto: ${PORT.toString().padEnd(30)}║`);
    console.log(`║  Entorno: ${(process.env.NODE_ENV || 'development').padEnd(28)}║`);
    console.log(`║  URL: http://localhost:${PORT.toString().padEnd(18)}║`);
    console.log('╚════════════════════════════════════════╝');
});

module.exports = app;
