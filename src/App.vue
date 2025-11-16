<script setup>
import { useRoute } from 'vue-router'
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
// UPGRADE 4: Import Command Palette
import CommandPalette from './components/CommandPalette.vue'
import { ref, onMounted, onUnmounted } from 'vue'

const route = useRoute()

// UPGRADE 4: State dan listener untuk Command Palette (Ctrl+K / Cmd+K)
const isCommandPaletteOpen = ref(false)
const handleKeyDown = (e) => {
  if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
    e.preventDefault()
    isCommandPaletteOpen.value = !isCommandPaletteOpen.value
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown)
})
onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown)
})
</script>

<template>
  <Navbar />
  <main>
    <!-- 
      Router-view kamu sudah benar. Kita TIDAK akan menambahkan
      transisi global agar v-motion di tiap halaman bekerja sempurna.
    -->
    <router-view :key="route.path" />
  </main>
  <Footer />

  <!-- 
    UPGRADE 4: Render Command Palette di atas segalanya.
    Ia akan menangani visibilitasnya sendiri dengan v-if
    dan transisi v-motion internal.
  -->
  <CommandPalette 
    v-if="isCommandPaletteOpen" 
    @close="isCommandPaletteOpen = false" 
  />
</template>

<style>
/* File style.css sudah menangani font global. 
  Kita biarkan <style> di sini kosong agar tetap clean,
  sesuai file aslimu.
*/
</style>