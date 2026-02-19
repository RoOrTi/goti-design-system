/**
 * GOTI Auth Client
 * Cliente JavaScript para integración con el backend de autenticación
 */

class GotiAuthClient {
    constructor(baseURL = window.GOTI_CONFIG?.API_URL || 'http://localhost:3000/api') {
        this.baseURL = baseURL;
        this.token = localStorage.getItem('goti_token');
    }

    /**
     * Realizar petición HTTP
     */
    async request(endpoint, options = {}) {
        const url = `${this.baseURL}${endpoint}`;
        const headers = {
            'Content-Type': 'application/json',
            ...options.headers
        };

        // Agregar token si existe
        if (this.token) {
            headers['Authorization'] = `Bearer ${this.token}`;
        }

        try {
            const response = await fetch(url, {
                ...options,
                headers
            });

            const data = await response.json();

            if (!response.ok) {
                const errorMessage = data.message ||
                    (data.errors ? data.errors.map(e => e.msg).join(', ') : 'Error en la petición');
                throw new Error(errorMessage);
            }

            return data;
        } catch (error) {
            console.error('Error en petición:', error);
            throw error;
        }
    }

    /**
     * Registrar nuevo usuario
     */
    async register(email, password, confirmPassword, acceptTerms = true) {
        try {
            const data = await this.request('/auth/register', {
                method: 'POST',
                body: JSON.stringify({
                    email,
                    password,
                    confirmPassword,
                    acceptTerms: acceptTerms.toString()
                })
            });

            // Guardar token
            if (data.data?.token) {
                this.setToken(data.data.token);
            }

            return data;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Iniciar sesión
     */
    async login(email, password) {
        try {
            const data = await this.request('/auth/login', {
                method: 'POST',
                body: JSON.stringify({ email, password })
            });

            // Guardar token
            if (data.data?.token) {
                this.setToken(data.data.token);
            }

            return data;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Obtener perfil de usuario
     */
    async getProfile() {
        try {
            return await this.request('/auth/profile', {
                method: 'GET'
            });
        } catch (error) {
            throw error;
        }
    }

    /**
     * Verificar token
     */
    async verifyToken() {
        try {
            return await this.request('/auth/verify', {
                method: 'GET'
            });
        } catch (error) {
            throw error;
        }
    }

    /**
     * Cerrar sesión
     */
    logout() {
        this.token = null;
        localStorage.removeItem('goti_token');
        localStorage.removeItem('goti_user');
    }

    /**
     * Guardar token
     */
    setToken(token) {
        this.token = token;
        localStorage.setItem('goti_token', token);
    }

    /**
     * Verificar si está autenticado
     */
    isAuthenticated() {
        return !!this.token;
    }

    /**
     * Calcular nivel de seguridad de contraseña
     */
    calculatePasswordStrength(password) {
        let strength = 0;
        let level = 'Débil';
        let percentage = 0;

        if (password.length >= 8) strength++;
        if (password.length >= 12) strength++;
        if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
        if (/\d/.test(password)) strength++;
        if (/[^a-zA-Z0-9]/.test(password)) strength++;

        if (strength <= 2) {
            level = 'Débil';
            percentage = 25;
        } else if (strength <= 3) {
            level = 'Medio';
            percentage = 50;
        } else if (strength <= 4) {
            level = 'Fuerte';
            percentage = 75;
        } else {
            level = 'Muy Fuerte';
            percentage = 100;
        }

        return { level, percentage, strength };
    }
}

// Exportar instancia global
window.gotiAuth = new GotiAuthClient();
