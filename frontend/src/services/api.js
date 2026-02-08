import axios from 'axios';

const api = axios.create({
    baseURL: '/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor for token injection
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export const authAPI = {
    login: (credentials) => api.post('/auth/signIn', credentials),
    signup: (userData) => api.post('/auth/signUp', userData),
};

export const emotionAPI = {
    detect: (formData) => api.post('/emotion/detect', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    }),
};

export default api;
