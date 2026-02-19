/**
 * GOTI Client Configuration
 * Configurations for different environments (Development vs Production)
 */

window.GOTI_CONFIG = {
    // API URL - Change this to your production URL when deploying
    // Example: 'https://api.goti-app.com/api'
    API_URL: window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' || window.location.hostname === ''
        ? 'http://localhost:3000/api'
        : 'https://YOUR_PRODUCTION_API_URL/api',

    // Firebase Config (if needed on client side)
    FIREBASE: {
        // Add public firebase config here if needed
    },

    // Feature Flags
    FEATURES: {
        ENABLE_REAL_AUTH: true,
        ENABLE_ANALYTICS: false
    }
};

console.log('[GOTI] Config loaded:', window.GOTI_CONFIG.API_URL);
