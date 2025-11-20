<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
// UPGRADE: Import action login & register dari store auth kita
import { login, register } from '../store/auth.js'

const router = useRouter()

// State untuk beralih antara 'login' dan 'register'
const currentView = ref('login') // 'login' or 'register'

// Data Form
const loginData = ref({ email: '', password: '' })
const registerData = ref({ name: '', email: '', password: '', confirmPassword: '' })

// State Loading
const isLoading = ref(false)

// --- FUNGSI LOGIN (Integrasi Backend) ---
const handleLogin = async () => {
  // Validasi sederhana
  if (!loginData.value.email || !loginData.value.password) {
    alert('Mohon isi semua kolom.')
    return
  }

  isLoading.value = true

  try {
    // Panggil fungsi login dari store/auth.js
    // Ini akan mengirim POST ke /auth/login dan menyimpan token
    await login(loginData.value.email, loginData.value.password)
    
    // Jika sukses, arahkan ke dashboard
    // alert('Login Berhasil!') // Opsional, bisa dihapus agar langsung masuk
    router.push('/dashboard')

  } catch (error) {
    // Tangkap error dari backend (misal: Password salah)
    // Kita coba akses pesan error dari response backend jika ada
    const msg = error.response?.data?.message || 'Gagal login. Periksa email atau password Anda.'
    alert(msg)
  } finally {
    isLoading.value = false
  }
}

// --- FUNGSI REGISTER (Integrasi Backend) ---
const handleRegister = async () => {
  // 1. Validasi dasar
  if (!registerData.value.name || !registerData.value.email || !registerData.value.password) {
    alert('Mohon lengkapi data pendaftaran.')
    return
  }

  // 2. Validasi password match
  if (registerData.value.password !== registerData.value.confirmPassword) {
    alert('Konfirmasi password tidak cocok!')
    return
  }

  isLoading.value = true

  try {
    // Panggil fungsi register dari store/auth.js
    // Parameternya: (nama, email, password) -> sesuaikan dengan DTO backend yang meminta 'nama'
    await register(
      registerData.value.name, 
      registerData.value.email, 
      registerData.value.password
    )

    // Jika sukses, beri notifikasi dan pindah ke tab Login
    alert('Registrasi Berhasil! Silakan login dengan akun baru Anda.')
    currentView.value = 'login'
    
    // Reset form register agar bersih saat user kembali
    registerData.value = { name: '', email: '', password: '', confirmPassword: '' }

  } catch (error) {
    // Tangkap error (misal: Email sudah terdaftar)
    const msg = error.response?.data?.message || 'Gagal mendaftar. Silakan coba lagi.'
    alert(msg)
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="bg-gibei-secondary">
    <div class="min-h-screen flex items-center justify-center py-24 px-4 sm:px-6 lg:px-8">
      
      <!-- Kartu utama -->
      <div 
        class="max-w-md w-full bg-white p-8 md:p-10 rounded-2xl shadow-2xl overflow-hidden"
        v-motion
        :initial="{ opacity: 0, y: 50 }"
        :enter="{ opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, delay: 200 } }"
      >

        <!-- 1. Tab Switcher (Masuk / Daftar) -->
        <div class="mb-8">
          <div class="flex justify-center bg-gray-100 rounded-lg p-1.5">
            <button
              @click="currentView = 'login'"
              type="button"
              :class="[
                'w-1/2 py-2.5 rounded-md font-poppins font-semibold transition-all duration-300',
                currentView === 'login' ? 'bg-white shadow-md text-gibei-primary' : 'text-gray-500 hover:text-gray-700'
              ]"
            >
              Masuk
            </button>
            <button
              @click="currentView = 'register'"
              type="button"
              :class="[
                'w-1/2 py-2.5 rounded-md font-poppins font-semibold transition-all duration-300',
                currentView === 'register' ? 'bg-white shadow-md text-gibei-primary' : 'text-gray-500 hover:text-gray-700'
              ]"
            >
              Daftar
            </button>
          </div>
        </div>

        <!-- Wrapper Form -->
        <div class="relative min-h-[400px]">
          
          <!-- 2. Formulir Login -->
          <div
            v-if="currentView === 'login'"
            key="login-form"
            v-motion
            :initial="{ opacity: 0, y: 20 }"
            :enter="{ opacity: 1, y: 0, transition: { delay: 150 } }"
            class="absolute w-full"
          >
            <h2 class="text-center text-3xl font-poppins font-extrabold text-gibei-primary mb-6">
              Selamat Datang Kembali
            </h2>
            <form class="space-y-6" @submit.prevent="handleLogin">
              <div class="rounded-md shadow-sm space-y-4">
                <div>
                  <label for="login-email" class="sr-only">Alamat Email</label>
                  <input v-model="loginData.email" id="login-email" type="email" required class="appearance-none rounded-lg relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gibei-text focus:outline-none focus:ring-gibei-primary focus:border-gibei-primary focus:z-10 sm:text-sm font-inter" placeholder="Alamat Email">
                </div>
                <div>
                  <label for="login-password" class="sr-only">Password</label>
                  <input v-model="loginData.password" id="login-password" type="password" required class="appearance-none rounded-lg relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gibei-text focus:outline-none focus:ring-gibei-primary focus:border-gibei-primary focus:z-10 sm:text-sm font-inter" placeholder="Password">
                </div>
              </div>
              
              <div class="flex items-center justify-between">
                <div class="text-sm">
                  <a href="#" class="font-medium font-inter text-gibei-primary hover:text-blue-800">
                    Lupa password?
                  </a>
                </div>
              </div>

              <div>
                <button 
                  type="submit" 
                  :disabled="isLoading" 
                  class="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-poppins font-medium rounded-lg text-white bg-gibei-primary hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gibei-primary transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span v-if="isLoading" class="absolute left-0 inset-y-0 flex items-center pl-3">
                    <!-- Icon Loading Sederhana -->
                    <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  </span>
                  {{ isLoading ? 'Memproses...' : 'Masuk' }}
                </button>
              </div>
            </form>
          </div>

          <!-- 3. Formulir Register -->
          <div
            v-if="currentView === 'register'"
            key="register-form"
            v-motion
            :initial="{ opacity: 0, y: 20 }"
            :enter="{ opacity: 1, y: 0, transition: { delay: 150 } }"
            class="absolute w-full"
          >
            <h2 class="text-center text-3xl font-poppins font-extrabold text-gibei-primary mb-6">
              Buat Akun Baru
            </h2>
            <form class="space-y-5" @submit.prevent="handleRegister">
              <div>
                <label for="register-name" class="sr-only">Nama Lengkap</label>
                <input v-model="registerData.name" id="register-name" type="text" required class="appearance-none rounded-lg relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gibei-text focus:outline-none focus:ring-gibei-primary focus:border-gibei-primary focus:z-10 sm:text-sm font-inter" placeholder="Nama Lengkap">
              </div>
              <div>
                <label for="register-email" class="sr-only">Alamat Email</label>
                <input v-model="registerData.email" id="register-email" type="email" required class="appearance-none rounded-lg relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gibei-text focus:outline-none focus:ring-gibei-primary focus:border-gibei-primary focus:z-10 sm:text-sm font-inter" placeholder="Alamat Email">
              </div>
              <div>
                <label for="register-password" class="sr-only">Password</label>
                <input v-model="registerData.password" id="register-password" type="password" required class="appearance-none rounded-lg relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gibei-text focus:outline-none focus:ring-gibei-primary focus:border-gibei-primary focus:z-10 sm:text-sm font-inter" placeholder="Password (Min. 6 Karakter)">
              </div>
              <div>
                <label for="confirm-password" class="sr-only">Konfirmasi Password</label>
                <input v-model="registerData.confirmPassword" id="confirm-password" type="password" required class="appearance-none rounded-lg relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gibei-text focus:outline-none focus:ring-gibei-primary focus:border-gibei-primary focus:z-10 sm:text-sm font-inter" placeholder="Konfirmasi Password">
              </div>
              <div class="pt-2">
                <button 
                  type="submit" 
                  :disabled="isLoading" 
                  class="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-poppins font-medium rounded-lg text-white bg-gibei-primary hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gibei-primary transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                   <span v-if="isLoading" class="absolute left-0 inset-y-0 flex items-center pl-3">
                    <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  </span>
                  {{ isLoading ? 'Mendaftarkan...' : 'Daftar' }}
                </button>
              </div>
            </form>
          </div>
        </div>

        <!-- 4. Link Footer Dinamis -->
        <div class="text-center text-sm font-inter text-gibei-text pt-6 border-t border-gray-200 mt-6">
          <div v-if="currentView === 'login'">
            Belum punya akun? 
            <button @click="currentView = 'register'" class="font-medium text-gibei-primary hover:text-blue-800 focus:outline-none transition-colors">
              Daftar di sini
            </button>
          </div>
          <div v-else>
            Sudah punya akun? 
            <button @click="currentView = 'login'" class="font-medium text-gibei-primary hover:text-blue-800 focus:outline-none transition-colors">
              Masuk di sini
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>