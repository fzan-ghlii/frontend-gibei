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
      PERBAIKAN: 
      Wrapper <transition> dihapus untuk memperbaiki bug
      halaman kosong saat navigasi.
    -->
    <router-view />
  </main>

  <Footer />
</template>

<style>
/* PERBAIKAN: 
  Class .fade-* telah dihapus dari sini.
*/
</style>