const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { db } = require('../config/firebase');

/**
 * Generar token JWT
 */
const generateToken = (userId, email) => {
    return jwt.sign(
        { userId, email },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );
};

/**
 * Calcular nivel de seguridad de contraseña
 */
const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (password.length >= 12) strength++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[^a-zA-Z0-9]/.test(password)) strength++;

    if (strength <= 2) return 'Débil';
    if (strength <= 3) return 'Medio';
    if (strength <= 4) return 'Fuerte';
    return 'Muy Fuerte';
};

/**
 * Registro de nuevo usuario
 */
const register = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Verificar si el usuario ya existe
        const usersRef = db.collection('users');
        const existingUser = await usersRef.where('email', '==', email).get();

        if (!existingUser.empty) {
            return res.status(409).json({
                success: false,
                message: 'El email ya está registrado'
            });
        }

        // Hash de la contraseña
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Calcular nivel de seguridad
        const passwordStrength = calculatePasswordStrength(password);

        // Crear nuevo usuario
        const newUser = {
            email,
            password: hashedPassword,
            passwordStrength,
            createdAt: new Date().toISOString(),
            lastLogin: null,
            isEmailVerified: false,
            profile: {
                name: '',
                phone: '',
                avatar: ''
            },
            settings: {
                notifications: true,
                twoFactorAuth: false
            }
        };

        const userDoc = await usersRef.add(newUser);
        const userId = userDoc.id;

        // Generar token
        const token = generateToken(userId, email);

        res.status(201).json({
            success: true,
            message: 'Usuario registrado exitosamente',
            data: {
                userId,
                email,
                token,
                passwordStrength
            }
        });

    } catch (error) {
        console.error('Error en registro:', error);
        res.status(500).json({
            success: false,
            message: 'Error al registrar usuario',
            error: error.message
        });
    }
};

/**
 * Inicio de sesión
 */
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Buscar usuario
        const usersRef = db.collection('users');
        const userSnapshot = await usersRef.where('email', '==', email).get();

        if (userSnapshot.empty) {
            return res.status(401).json({
                success: false,
                message: 'Credenciales inválidas'
            });
        }

        const userDoc = userSnapshot.docs[0];
        const userData = userDoc.data();
        const userId = userDoc.id;

        // Verificar contraseña
        const isPasswordValid = await bcrypt.compare(password, userData.password);

        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: 'Credenciales inválidas'
            });
        }

        // Actualizar último login
        await usersRef.doc(userId).update({
            lastLogin: new Date().toISOString()
        });

        // Generar token
        const token = generateToken(userId, email);

        res.status(200).json({
            success: true,
            message: 'Inicio de sesión exitoso',
            data: {
                userId,
                email,
                token,
                profile: userData.profile
            }
        });

    } catch (error) {
        console.error('Error en login:', error);
        res.status(500).json({
            success: false,
            message: 'Error al iniciar sesión',
            error: error.message
        });
    }
};

/**
 * Obtener perfil de usuario
 */
const getProfile = async (req, res) => {
    try {
        const { userId } = req.user;

        const userDoc = await db.collection('users').doc(userId).get();

        if (!userDoc.exists) {
            return res.status(404).json({
                success: false,
                message: 'Usuario no encontrado'
            });
        }

        const userData = userDoc.data();

        // No enviar la contraseña
        delete userData.password;

        res.status(200).json({
            success: true,
            data: {
                userId,
                ...userData
            }
        });

    } catch (error) {
        console.error('Error al obtener perfil:', error);
        res.status(500).json({
            success: false,
            message: 'Error al obtener perfil',
            error: error.message
        });
    }
};

/**
 * Verificar token
 */
const verifyToken = async (req, res) => {
    try {
        const { userId, email } = req.user;

        res.status(200).json({
            success: true,
            message: 'Token válido',
            data: {
                userId,
                email
            }
        });

    } catch (error) {
        console.error('Error al verificar token:', error);
        res.status(500).json({
            success: false,
            message: 'Error al verificar token',
            error: error.message
        });
    }
};

module.exports = {
    register,
    login,
    getProfile,
    verifyToken
};
