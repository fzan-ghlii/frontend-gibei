<script setup>
// File ini sekarang menjadi JAUH LEBIH BERSIH!
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
</script>

<template>
  <!-- Navbar dan Footer ada di SETIAP halaman -->
  <Navbar />
  
  <main>
    <!-- 
      Di sinilah keajaibannya: 
      vue-router akan otomatis menempatkan Halaman Home
      atau Halaman About (atau halaman lain) di sini
      tergantung pada URL.
    -->
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </main>

  <Footer />
</template>

<style>
/* CSS global ditangani oleh src/style.css */

/* Transisi Halaman (Fade) */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>