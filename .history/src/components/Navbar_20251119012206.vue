<script setup>
import { ref, computed, watch } from 'vue'
import { useWindowScroll } from '@vueuse/core'
// Import auth store
import { isLoggedIn, logout } from '../store/auth.js' 
import { useRoute, useRouter } from 'vue-router'

const isMobileMenuOpen = ref(false)
const route = useRoute()
const router = useRouter()

// Tutup menu mobile saat pindah halaman
watch(() => route.path, () => {
  isMobileMenuOpen.value = false
})

const navLinks = [
  { name: 'Home', to: '/' },
  { name: 'About Us', to: '/about' },
  { name: 'Events', to: '/events' },
  { name: 'SPM', to: '/spm' },
  { name: 'Artikel', to: '/artikel' },
  { name: 'Gallery', to: '/gallery' },
  { name: 'Kontak', to: '/kontak' },
]

// Efek Glassmorphism
const { y } = useWindowScroll()
const isScrolled = computed(() => y.value > 20)

// Fungsi Logout di Navbar
const handleLogout = () => {
  if (confirm('Yakin ingin keluar?')) {
    logout()
  }
}
</script>

<template>
  <nav 
    class="sticky top-0 z-50 shadow-md transition-all duration-300"
    :class="isScrolled ? 'bg-gibei-primary/90 backdrop-blur-lg' : 'bg-gibei-primary'"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        
        <!-- Logo -->
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <router-link to="/" class="text-white font-poppins font-bold text-xl flex items-center gap-2">
              GIBEI UNIMED
            </router-link>
          </div>
          <!-- Menu Desktop -->
          <div class="hidden md:block">
            <ul class="ml-10 flex items-baseline space-x-4">
              <li v-for="link in navLinks" :key="link.name">
                <router-link
                  :to="link.to" 
                  class="text-white hover:bg-white hover:bg-opacity-20 px-3 py-2 rounded-md text-sm font-poppins font-medium transition-colors duration-300"
                  active-class="bg-white bg-opacity-10 font-semibold"
                >
                  {{ link.name }}
                </router-link>
              </li>
            </ul>
          </div>
        </div>

        <!-- Tombol Kanan (Login/Dashboard/Logout) -->
        <div class="hidden md:flex items-center gap-3">
          <!-- Jika Belum Login -->
          <router-link
            v-if="!isLoggedIn"
            to="/login"
            class="bg-white text-gibei-primary font-poppins font-semibold px-5 py-2 rounded-full text-sm hover:bg-gibei-secondary transition-colors duration-300 transform hover:scale-105"
          >
            Login / Daftar
          </router-link>

          <!-- Jika Sudah Login -->
          <template v-else>
            <router-link
              to="/dashboard"
              class="bg-gibei-secondary text-gibei-primary font-poppins font-semibold px-5 py-2 rounded-full text-sm hover:bg-white transition-colors duration-300"
            >
              Dashboard
            </router-link>
            <!-- Tombol Logout Kecil -->
            <button 
              @click="handleLogout"
              class="text-white hover:text-red-300 transition p-2"
              title="Keluar"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </button>
          </template>
        </div>

        <!-- Tombol Hamburger (Mobile) -->
        <div class="-mr-2 flex md:hidden">
          <button 
            @click="isMobileMenuOpen = true"
            type="button" 
            class="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-white hover:bg-opacity-20 focus:outline-none transition"
          >
            <span class="sr-only">Buka menu</span>
            <svg class="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

      </div>
    </div>
  </nav>

  <!-- Mobile Menu (Drawer) -->
  <transition
    enter-active-class="transition ease-out duration-300 transform"
    enter-from-class="translate-x-full"
    enter-to-class="translate-x-0"
    leave-active-class="transition ease-in duration-300 transform"
    leave-from-class="translate-x-0"
    leave-to-class="translate-x-full"
  >
    <div 
      v-if="isMobileMenuOpen" 
      class="fixed top-0 right-0 z-[70] h-full w-[80%] max-w-xs bg-gradient-to-b from-gibei-primary to-blue-900 shadow-2xl md:hidden overflow-y-auto"
    >
      <div class="flex items-center justify-between p-6 border-b border-white/10">
        <h2 class="text-white font-poppins font-bold text-lg">MENU</h2>
        <button @click="isMobileMenuOpen = false" class="text-white">
          <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
      </div>
      <div class="py-6 px-4 space-y-2">
        <router-link v-for="link in navLinks" :key="link.name" :to="link.to" class="block px-4 py-3 text-white font-inter hover:bg-white/10 rounded-lg">
          {{ link.name }}
        </router-link>
        <div class="border-t border-white/10 my-4"></div>
        
        <div v-if="!isLoggedIn">
          <router-link to="/login" class="block w-full bg-gibei-secondary text-gibei-primary text-center px-4 py-3 rounded-lg font-bold">Login / Daftar</router-link>
        </div>
        <div v-else class="space-y-3">
          <router-link to="/dashboard" class="block w-full bg-white text-gibei-primary text-center px-4 py-3 rounded-lg font-bold">Dashboard</router-link>
          <button @click="handleLogout" class="block w-full bg-red-600 text-white text-center px-4 py-3 rounded-lg font-bold">Logout</button>
        </div>
      </div>
    </div>
  </transition>
</template>