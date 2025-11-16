<script setup>
import { ref } from 'vue'
// UPGRADE 3: Import state login dan router
import { isLoggedIn } from '../store/auth.js'
import { useRouter } from 'vue-router'

// State untuk beralih antara 'login' dan 'register'
const currentView = ref('login') // 'login' or 'register'

// Placeholder data (kita tidak akan kirim data, hanya UI)
const loginData = ref({ email: '', password: '' })
const registerData = ref({ name: '', email: '', password: '', confirmPassword: '' })

// Placeholder untuk notifikasi (jika diperlukan nanti)
const isLoading = ref(false)

// UPGRADE 3: Inisialisasi router
const router = useRouter()

const handleLogin = () => {
  isLoading.value = true
  console.log('Login attempt:', loginData.value)
  setTimeout(() => { 
    isLoading.value = false
    // UPGRADE 3: Set state login ke true dan redirect ke dashboard
    isLoggedIn.value = true
    router.push('/dashboard')
  }, 1500)
}

const handleRegister = () => {
  isLoading.value = true
  console.log('Register attempt:', registerData.value)
  // Simulasi register, lalu ganti ke view login
  setTimeout(() => { 
    isLoading.value = false
    currentView.value = 'login'
    // Di aplikasi nyata, kita juga akan login dan redirect
    // isLoggedIn.value = true
    // router.push('/dashboard')
  }, 1500)
}
</script>

<template>
  <div class="bg-gibei-secondary">
    <div class="min-h-screen flex items-center justify-center py-24 px-4 sm:px-6 lg:px-8">
      
      <!-- 
        Kartu utama
        Animasi :enter (delay 200ms) ini penting untuk
        sinkronisasi dengan transisi halaman (style.css)
      -->
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
              :class="[
                'w-1/2 py-2.5 rounded-md font-poppins font-semibold transition-all duration-300',
                currentView === 'login' ? 'bg-white shadow-md text-gibei-primary' : 'text-gray-500 hover:text-gray-700'
              ]"
            >
              Masuk
            </button>
            <button
              @click="currentView = 'register'"
              :class="[
                'w-1/2 py-2.5 rounded-md font-poppins font-semibold transition-all duration-300',
                currentView === 'register' ? 'bg-white shadow-md text-gibei-primary' : 'text-gray-500 hover:text-gray-700'
              ]"
            >
              Daftar
            </button>
          </div>
        </div>

        <!-- 
          Wrapper untuk animasi transisi antar formulir 
          Kita gunakan :key untuk memicu v-motion
        -->
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
              <div class="rounded-md shadow-sm -space-y-px">
                <div>
                  <label for="login-email" class="sr-only">Alamat Email</label>
                  <input v-model="loginData.email" id="login-email" type="email" required class="appearance-none rounded-t-lg relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gibei-text focus:outline-none focus:ring-gibei-primary focus:border-gibei-primary focus:z-10 sm:text-sm font-inter" placeholder="Alamat Email">
                </div>
                <div>
                  <label for="login-password" class="sr-only">Password</label>
                  <input v-model="loginData.password" id="login-password" type="password" required class="appearance-none rounded-b-lg relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gibei-text focus:outline-none focus:ring-gibei-primary focus:border-gibei-primary focus:z-10 sm:text-sm font-inter" placeholder="Password">
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
                <button type="submit" :disabled="isLoading" class="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-poppins font-medium rounded-lg text-white bg-gibei-primary hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gibei-primary transition duration-300 disabled:opacity-50">
                  {{ isLoading ? 'Memproses...' : 'Masuk' }}
                </button>
              </div>
            </form>
          </div>

          <!-- 3. Formulir Register (Baru) -->
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
                <input v-model="registerData.password" id="register-password" type="password" required class="appearance-none rounded-lg relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gibei-text focus:outline-none focus:ring-gibei-primary focus:border-gibei-primary focus:z-10 sm:text-sm font-inter" placeholder="Password">
              </div>
              <div>
                <label for="confirm-password" class="sr-only">Konfirmasi Password</label>
                <input v-model="registerData.confirmPassword" id="confirm-password" type="password" required class="appearance-none rounded-lg relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gibei-text focus:outline-none focus:ring-gibei-primary focus:border-gibei-primary focus:z-10 sm:text-sm font-inter" placeholder="Konfirmasi Password">
              </div>
              <div class="pt-2">
                <button type="submit" :disabled="isLoading" class="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-poppins font-medium rounded-lg text-white bg-gibei-primary hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gibei-primary transition duration-300 disabled:opacity-50">
                  {{ isLoading ? 'Memproses...' : 'Daftar' }}
                </button>
              </div>
            </form>
          </div>
        </div>

        <!-- 4. Link Footer Dinamis -->
        <div class="text-center text-sm font-inter text-gibei-text pt-6 border-t border-gray-200 mt-6">
          <div v-if="currentView === 'login'">
            Belum punya akun? 
            <button @click="currentView = 'register'" class="font-medium text-gibei-primary hover:text-blue-800 focus:outline-none">
              Daftar di sini
            </button>
          </div>
          <div v-if="currentView === 'register'">
            Sudah punya akun? 
            <button @click="currentView = 'login'" class="font-medium text-gibei-primary hover:text-blue-800 focus:outline-none">
              Masuk di sini
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>