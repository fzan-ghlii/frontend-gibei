import { ref, computed } from 'vue';
import api from '../api'; // Import konfigurasi axios kita
import { useRouter } from 'vue-router';

// State Global
const token = ref(localStorage.getItem('token') || null);
const user = ref(JSON.parse(localStorage.getItem('user')) || null);

// Computed: Cek apakah login
export const isLoggedIn = computed(() => !!token.value);
export const currentUser = computed(() => user.value);

// Fungsi Login
export const login = async (email, password) => {
  try {
    const response = await api.post('/auth/login', { email, password });
    
    // Simpan token dan data user (jika ada)
    const accessToken = response.data.access_token;
    token.value = accessToken;
    localStorage.setItem('token', accessToken);
    
    // Opsional: Ambil profil user setelah login untuk disimpan
    // const profile = await api.get('/users/me');
    // user.value = profile.data;
    // localStorage.setItem('user', JSON.stringify(profile.data));

    return true; // Login sukses
  } catch (error) {
    console.error('Login failed:', error);
    throw error; // Lempar error agar bisa ditangkap di UI
  }
};

// Fungsi Register
export const register = async (nama, email, password) => {
  try {
    await api.post('/auth/register', { nama, email, password });
    return true; // Register sukses
  } catch (error) {
    console.error('Register failed:', error);
    throw error;
  }
};

// Fungsi Logout
export const logout = () => {
  token.value = null;
  user.value = null;
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  // Redirect ke login bisa dilakukan di komponen atau di sini jika router di-pass
  window.location.href = '/login'; 
};