import { ref, computed } from 'vue';
import api from '../api';
import { useRouter } from 'vue-router';

// --- STATE ---
const token = ref(localStorage.getItem('token') || null);
// Pastikan user diparse dengan aman
let storedUser = null;
try {
  storedUser = JSON.parse(localStorage.getItem('user'));
} catch (e) {
  storedUser = null;
}
const user = ref(storedUser);

// --- GETTERS ---
export const isLoggedIn = computed(() => !!token.value);
export const currentUser = computed(() => user.value);

// --- ACTIONS ---

// 1. LOGIN (FIXED)
export const login = async (email, password) => {
  try {
    // A. Request Token
    const response = await api.post('/auth/login', { email, password });
    const accessToken = response.data.access_token;

    // B. Simpan Token
    token.value = accessToken;
    localStorage.setItem('token', accessToken);

    // C. PENTING: Fetch Data User Profile (Fix Masalah Redirect)
    // Kita harus mengambil data 'siapa yang login' agar Dashboard tidak menendang balik
    await fetchUserProfile();

    return true;
  } catch (error) {
    console.error('Login failed:', error);
    throw error;
  }
};

// 2. REGISTER
export const register = async (nama, email, password) => {
  try {
    await api.post('/auth/register', { nama, email, password });
    return true;
  } catch (error) {
    console.error('Register failed:', error);
    throw error;
  }
};

// 3. FETCH USER PROFILE (Helper)
export const fetchUserProfile = async () => {
  try {
    const response = await api.get('/users/me');
    user.value = response.data;
    localStorage.setItem('user', JSON.stringify(response.data));
  } catch (error) {
    // Jika token invalid saat fetch profile, force logout
    logout();
  }
};

// 4. LOGOUT
export const logout = () => {
  token.value = null;
  user.value = null;
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  // Force reload untuk membersihkan state memori
  window.location.href = '/login';
};