const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { authenticateToken } = require('../middleware/auth');
const {
    validateRegister,
    validateLogin,
    handleValidationErrors
} = require('../middleware/validators');

/**
 * @route   POST /api/auth/register
 * @desc    Registrar nuevo usuario
 * @access  Public
 */
router.post(
    '/register',
    validateRegister,
    handleValidationErrors,
    authController.register
);

/**
 * @route   POST /api/auth/login
 * @desc    Iniciar sesión
 * @access  Public
 */
router.post(
    '/login',
    validateLogin,
    handleValidationErrors,
    authController.login
);

/**
 * @route   GET /api/auth/profile
 * @desc    Obtener perfil de usuario autenticado
 * @access  Private
 */
router.get(
    '/profile',
    authenticateToken,
    authController.getProfile
);

/**
 * @route   GET /api/auth/verify
 * @desc    Verificar token JWT
 * @access  Private
 */
router.get(
    '/verify',
    authenticateToken,
    authController.verifyToken
);

module.exports = router;
