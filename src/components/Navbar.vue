<script setup>
// UPGRADE 2 & 3: Import 'computed' dan 'useWindowScroll' untuk glassmorphism
// dan 'isLoggedIn' untuk state login
import { ref, computed } from 'vue'
import { useWindowScroll } from '@vueuse/core'
import { isLoggedIn } from '../store/auth.js' // UPGRADE 3

const isMobileMenuOpen = ref(false)

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
            <router-link to="/" class="text-white font-poppins font-bold text-xl">
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
            @click="isMobileMenuOpen = !isMobileMenuOpen"
            type="button" 
            class="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-white hover:bg-opacity-20 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white transition"
          >
            <span class="sr-only">Buka menu utama</span>
            <svg v-if="!isMobileMenuOpen" class="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <svg v-if="isMobileMenuOpen" class="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

      </div>
    </div>

    <!-- 
      Dropdown Menu Mobile
      UPGRADE 2: Transisi warna disamakan dengan style 'isScrolled'
    -->
    <transition
      enter-active-class="transition ease-out duration-200 transform"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition ease-in duration-100 transform"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <div 
        v-if="isMobileMenuOpen" 
        class="md:hidden border-t border-white border-opacity-20 transition-all duration-300"
        :class="isScrolled ? 'bg-gibei-primary/90 backdrop-blur-lg' : 'bg-gibei-primary'"
      >
        <ul class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <li v-for="link in navLinks" :key="link.name">
            <router-link
              :to="link.to" 
              class="text-white hover:bg-white hover:bg-opacity-20 block px-3 py-2 rounded-md text-base font-poppins font-medium transition-colors"
              active-class="bg-white bg-opacity-10"
              @click="isMobileMenuOpen = false"
            >
              {{ link.name }}
            </router-link>
          </li>
          <!-- 
            UPGRADE 3: Tombol Login / Dashboard (Mobile)
          -->
          <li v-if="!isLoggedIn">
            <router-link
              to="/login"
              class="bg-gibei-secondary text-gibei-primary block px-3 py-3 rounded-md text-base font-poppins font-semibold transition-colors mt-3 text-center"
              @click="isMobileMenuOpen = false"
            >
              Login / Daftar
            </router-link>
          </li>
          <li v-else>
            <router-link
              to="/dashboard"
              class="bg-white text-gibei-primary block px-3 py-3 rounded-md text-base font-poppins font-semibold transition-colors mt-3 text-center"
              @click="isMobileMenuOpen = false"
            >
              Dashboard
            </router-link>
          </li>
        </ul>
      </div>
    </transition>
  </nav>
</template>