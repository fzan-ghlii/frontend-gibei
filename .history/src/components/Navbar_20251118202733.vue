<script setup>
// UPGRADE 2 & 3: Import 'computed' dan 'useWindowScroll' untuk glassmorphism
// dan 'isLoggedIn' untuk state login
import { ref, computed, watch } from 'vue'
import { useWindowScroll } from '@vueuse/core'
import { isLoggedIn } from '../store/auth.js' // UPGRADE 3
import { useRoute } from 'vue-router'

const isMobileMenuOpen = ref(false)
const route = useRoute()

// Tutup menu mobile setiap kali rute berubah (pindah halaman)
watch(() => route.path, () => {
  isMobileMenuOpen.value = false
})

// Daftar menu
const navLinks = [
  { name: 'Home', to: '/' },
  { name: 'About Us', to: '/about' },
  { name: 'Events', to: '/events' },
  { name: 'SPM', to: '/spm' },
  { name: 'Artikel', to: '/artikel' },
  { name: 'Gallery', to: '/gallery' },
  { name: 'Kontak', to: '/kontak' },
]

// UPGRADE 2: Logika untuk Glassmorphism
// Navbar akan berubah style jika di-scroll lebih dari 20px
const { y } = useWindowScroll()
const isScrolled = computed(() => y.value > 20)
</script>

<template>
  <!-- 
    UPGRADE 2: 
    - Menghapus 'bg-gibei-primary' dari class utama.
    - Menambahkan 'transition-all duration-300'.
    - Menambahkan :class binding untuk style 'isScrolled'.
  -->
  <nav 
    class="sticky top-0 z-50 shadow-md transition-all duration-300"
    :class="isScrolled ? 'bg-gibei-primary/90 backdrop-blur-lg' : 'bg-gibei-primary'"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        
        <!-- Logo (Kiri) -->
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <router-link to="/" class="text-white font-poppins font-bold text-xl flex items-center gap-2">
              <!-- Optional: Bisa tambah logo img kecil di sini jika ada -->
              GIBEI UNIMED
            </router-link>
          </div>
          <!-- Menu Desktop (Kiri) -->
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

        <!-- Tombol Login (Kanan, Desktop) - (WDD 4.4) -->
        <div class="hidden md:block">
          <!-- 
            UPGRADE 3: Tombol Login / Dashboard
            Menggunakan v-if dan v-else untuk beralih tampilan
          -->
          <router-link
            v-if="!isLoggedIn"
            to="/login"
            class="bg-white text-gibei-primary font-poppins font-semibold px-5 py-2 rounded-full text-sm hover:bg-gibei-secondary transition-colors duration-300 transform hover:scale-105"
          >
            Login / Daftar
          </router-link>
          <router-link
            v-else
            to="/dashboard"
            class="bg-gibei-secondary text-gibei-primary font-poppins font-semibold px-5 py-2 rounded-full text-sm hover:bg-white transition-colors duration-300 transform hover:scale-105"
          >
            Dashboard
          </router-link>
        </div>

        <!-- Tombol Hamburger (Mobile) -->
        <div class="-mr-2 flex md:hidden">
          <button 
            @click="isMobileMenuOpen = true"
            type="button" 
            class="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-white hover:bg-opacity-20 focus:outline-none transition transform active:scale-95"
          >
            <span class="sr-only">Buka menu utama</span>
            <svg class="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

      </div>
    </div>
  </nav>

  <!-- 
    MOBILE MENU OVERLAY & DRAWER (NEW DESIGN) 
    Muncul dari samping kanan dengan animasi halus dan gradien
  -->
  
  <!-- 1. Backdrop Gelap -->
  <transition
    enter-active-class="transition-opacity ease-linear duration-300"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition-opacity ease-linear duration-300"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div 
      v-if="isMobileMenuOpen" 
      class="fixed inset-0 z-[60] bg-black bg-opacity-50 backdrop-blur-sm md:hidden"
      @click="isMobileMenuOpen = false"
    ></div>
  </transition>

  <!-- 2. Sliding Drawer -->
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
      <!-- Header Drawer -->
      <div class="flex items-center justify-between p-6 border-b border-white/10">
        <h2 class="text-white font-poppins font-bold text-lg tracking-wide">MENU</h2>
        <button 
          @click="isMobileMenuOpen = false"
          class="text-white hover:text-gibei-secondary transition-colors p-1 rounded-full hover:bg-white/10"
        >
          <span class="sr-only">Tutup menu</span>
          <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Links List -->
      <div class="py-6 px-4 space-y-2">
        <router-link
          v-for="link in navLinks" 
          :key="link.name"
          :to="link.to" 
          class="block px-4 py-3 rounded-lg text-white text-base font-inter font-medium hover:bg-white/10 hover:translate-x-2 transition-all duration-300"
          active-class="bg-white/20 font-bold shadow-inner"
        >
          {{ link.name }}
        </router-link>

        <!-- Divider -->
        <div class="border-t border-white/10 my-4 mx-2"></div>

        <!-- Tombol Login Mobile -->
        <div class="px-2 pt-2">
          <router-link
            v-if="!isLoggedIn"
            to="/login"
            class="block w-full bg-gibei-secondary text-gibei-primary text-center px-4 py-3 rounded-lg text-base font-poppins font-bold shadow-lg active:scale-95 transition-transform"
          >
            Login / Daftar
          </router-link>
          <router-link
            v-else
            to="/dashboard"
            class="block w-full bg-white text-gibei-primary text-center px-4 py-3 rounded-lg text-base font-poppins font-bold shadow-lg active:scale-95 transition-transform"
          >
            Dashboard Saya
          </router-link>
        </div>
      </div>

      <!-- Hiasan Footer Drawer -->
      <div class="absolute bottom-0 w-full p-6 text-center text-white/30 text-xs font-inter">
        <p>GIBEI UNIMED &copy; {{ new Date().getFullYear() }}</p>
      </div>
    </div>
  </transition>
</template>