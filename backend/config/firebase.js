const admin = require('firebase-admin');
require('dotenv').config();

let db;

try {
    // Check if we have valid credentials
    if (!process.env.FIREBASE_PRIVATE_KEY || process.env.FIREBASE_PRIVATE_KEY.length < 100) {
        throw new Error('Invalid or missing FIREBASE_PRIVATE_KEY');
    }

    // Inicializar Firebase Admin SDK
    const serviceAccount = {
        type: "service_account",
        project_id: process.env.FIREBASE_PROJECT_ID,
        private_key: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
        client_email: process.env.FIREBASE_CLIENT_EMAIL,
    };

    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });

    db = admin.firestore();
    console.log('[Firebase] Connected successfully');

} catch (error) {
    console.warn('[Firebase] Warning: Could not connect to Firebase.', error.message);
    console.warn('[Firebase] Running in MOCK mode with in-memory database');

    // Mock Database for development
    const mockData = {
        users: []
    };

    db = {
        collection: (name) => ({
            where: (field, op, value) => ({
                get: async () => {
                    const results = (mockData[name] || []).filter(item => {
                        if (op === '==') return item[field] === value;
                        return false;
                    });

                    return {
                        empty: results.length === 0,
                        docs: results.map(data => ({
                            id: data.id || 'mock-id-' + Math.random().toString(36).substr(2, 9),
                            data: () => data,
                            exists: true
                        }))
                    };
                }
            }),
            add: async (data) => {
                if (!mockData[name]) mockData[name] = [];
                const id = 'mock-id-' + Math.random().toString(36).substr(2, 9);
                const newItem = { ...data, id };
                mockData[name].push(newItem);
                return { id };
            },
            doc: (id) => ({
                get: async () => {
                    const item = (mockData[name] || []).find(i => i.id === id);
                    return {
                        exists: !!item,
                        data: () => item,
                        id
                    };
                },
                update: async (data) => {
                    const index = (mockData[name] || []).findIndex(i => i.id === id);
                    if (index !== -1) {
                        mockData[name][index] = { ...mockData[name][index], ...data };
                    }
                },
                set: async (data) => {
                    const index = (mockData[name] || []).findIndex(i => i.id === id);
                    if (index !== -1) {
                        mockData[name][index] = { ...data, id };
                    } else {
                        if (!mockData[name]) mockData[name] = [];
                        mockData[name].push({ ...data, id });
                    }
                }
            })
        })
    };
}

module.exports = { admin, db };
