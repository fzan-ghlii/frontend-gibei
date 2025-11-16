<script setup>
import { ref } from 'vue'

// Logika untuk membuka/menutup menu mobile (hamburger)
const isMobileMenuOpen = ref(false)

// Daftar menu sesuai WDD 3.0 (Sitemap)
// Kita ubah 'href' menjadi 'to' (untuk vue-router)
const navLinks = [
  { name: 'Home', to: '/' },
  { name: 'About Us', to: '/about' },
  { name: 'Events', to: '#' },
  { name: 'SPM', to: '#' },
  { name: 'Artikel', to: '#' },
  { name: 'Gallery', to: '#' },
  { name: 'Kontak', to: '#' },
]
</script>

<template>
  <!-- 
    Navigasi Utama
    Sesuai WDD 5.2 (Warna Primer) & 5.3 (Font Poppins)
  -->
  <nav class="bg-gibei-primary sticky top-0 z-50 shadow-md">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        
        <!-- Logo (Kiri) -->
        <div class="flex-shrink-0">
          <!-- 
            MENGGUNAKAN <router-link> untuk Logo
          -->
          <router-link to="/" class="text-white font-poppins font-bold text-xl">
            GIBEI UNIMED
          </router-link>
        </div>

        <!-- Menu Desktop (Kanan) -->
        <div class="hidden md:block">
          <ul class="ml-10 flex items-baseline space-x-4">
            <li v-for="link in navLinks" :key="link.name">
              <!-- 
                MENGGUNAKAN <router-link> untuk Navigasi
                vue-router akan otomatis menambahkan class 'router-link-active'
              -->
              <router-link
                :to="link.to" 
                class="text-white hover:bg-white hover:bg-opacity-20 px-3 py-2 rounded-md text-sm font-poppins font-medium transition-colors"
                active-class="bg-white bg-opacity-10 font-semibold"
              >
                {{ link.name }}
              </router-link>
            </li>
          </ul>
        </div>

        <!-- Tombol Hamburger (Mobile) -->
        <div class="-mr-2 flex md:hidden">
          <button 
            @click="isMobileMenuOpen = !isMobileMenuOpen"
            type="button" 
            class="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-white hover:bg-opacity-20 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white transition"
          >
            <span class="sr-only">Buka menu utama</span>
            <!-- Ikon Hamburger (Garis) -->
            <svg v-if="!isMobileMenuOpen" class="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <!-- Ikon Tutup (X) -->
            <svg v-if="isMobileMenuOpen" class="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

      </div>
    </div>

    <!-- Dropdown Menu Mobile -->
    <transition
      enter-active-class="transition ease-out duration-200 transform"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition ease-in duration-100 transform"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <div v-if="isMobileMenuOpen" class="md:hidden bg-gibei-primary border-t border-white border-opacity-20">
        <ul class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <li v-for="link in navLinks" :key="link.name">
            <!-- 
              MENGGUNAKAN <router-link> untuk Navigasi Mobile
            -->
            <router-link
              :to="link.to" 
              class="text-white hover:bg-white hover:bg-opacity-20 block px-3 py-2 rounded-md text-base font-poppins font-medium transition-colors"
              active-class="bg-white bg-opacity-10"
              @click="isMobileMenuOpen = false"
            >
              {{ link.name }}
            </router-link>
          </li>
        </ul>
      </div>
    </transition>
  </nav>
</template>