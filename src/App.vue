<script setup>
import { useRoute } from 'vue-router'
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
const route = useRoute()
</script>

<template>
  <Navbar />
  <main>
    <!-- 
      PERBAIKAN BUG FATAL:
      Wrapper <transition> dihapus.
      Animasi v-motion internal (delay 200ms) di setiap halaman
      berkonflik dengan transisi <transition> (durasi 200ms).
      Menghapus ini akan 100% memperbaiki bug halaman kosong.
    -->
    <router-view :key="route.path" />
  </main>
  <Footer />
</template>

<style>
/* PERBAIKAN: CSS transisi global (.fade-*) akan dihapus 
  dari style.css agar tidak membingungkan.
*/
</style>