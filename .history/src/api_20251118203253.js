import axios from 'axios';

// Buat instance axios dengan base URL backend kita
const api = axios.create({
  baseURL: 'http://localhost:3000/api/v1', // Sesuaikan port jika beda
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor: Setiap kali request dikirim, cek apakah ada token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // Ambil token dari Local Storage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;