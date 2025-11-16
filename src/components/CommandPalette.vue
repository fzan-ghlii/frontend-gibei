<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

const emit = defineEmits(['close'])

const router = useRouter()
const search = ref('')

// Daftar perintah statis
const allCommands = ref([
  { id: 'home', name: 'Home', path: '/', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6-4h.01M10 16h.01' },
  { id: 'about', name: 'Tentang Kami', path: '/about', icon: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
  { id: 'events', name: 'Events', path: '/events', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
  { id: 'spm', name: 'Daftar SPM', path: '/spm', icon: 'M12 6.253v11.494m0 0L7.5 12.5m4.5 5.247L16.5 12.5' },
  { id: 'artikel', name: 'Artikel', path: '/artikel', icon: 'M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z' },
  { id: 'gallery', name: 'Galeri', path: '/gallery', icon: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l-1.586-1.586a2 2 0 00-2.828 0L6 14m6-6l.01.01M5 21h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2z' },
  { id: 'kontak', name: 'Kontak', path: '/kontak', icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
])

// Filter perintah berdasarkan input
const filteredCommands = computed(() => {
  if (!search.value) {
    return allCommands.value
  }
  return allCommands.value.filter(cmd => 
    cmd.name.toLowerCase().includes(search.value.toLowerCase())
  )
})

// Fungsi untuk eksekusi perintah (navigasi)
const runCommand = (command) => {
  router.push(command.path)
  emit('close')
}

// Menutup modal jika menekan 'Escape'
const handleKeyDown = (e) => {
  if (e.key === 'Escape') {
    emit('close')
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
  <div 
    class="fixed inset-0 z-50 flex items-start justify-center pt-20"
    v-motion
    :initial="{ opacity: 0 }"
    :enter="{ opacity: 1, transition: { duration: 150 } }"
    :leave="{ opacity: 0, transition: { duration: 150 } }"
  >
    <!-- Overlay -->
    <div class="absolute inset-0 bg-black bg-opacity-60" @click="$emit('close')"></div>

    <!-- Modal Konten -->
    <div 
      class="relative z-10 w-full max-w-lg bg-white rounded-lg shadow-2xl overflow-hidden"
      v-motion
      :initial="{ opacity: 0, scale: 0.95, y: -20 }"
      :enter="{ opacity: 1, scale: 1, y: 0, transition: { duration: 200, ease: 'easeOut' } }"
      :leave="{ opacity: 0, scale: 0.95, transition: { duration: 100, ease: 'easeIn' } }"
      @click.stop
    >
      <!-- Input Pencarian -->
      <div class="p-4 border-b border-gray-200">
        <input 
          v-model="search"
          type="text" 
          placeholder="Ketik perintah atau cari halaman..."
          class="w-full px-4 py-3 font-inter text-lg text-gibei-text bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-gibei-primary"
          v-focus
        >
      </div>

      <!-- Daftar Hasil -->
      <ul class="max-h-96 overflow-y-auto p-2">
        <li v-if="filteredCommands.length === 0" class="p-4 text-center font-inter text-gray-500">
          Tidak ada hasil ditemukan.
        </li>
        <li 
          v-for="cmd in filteredCommands" 
          :key="cmd.id"
          @click="runCommand(cmd)"
          class="flex items-center p-3 rounded-md hover:bg-gibei-secondary cursor-pointer transition-colors"
        >
          <svg class="w-6 h-6 text-gibei-primary mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="cmd.icon"></path>
          </svg>
          <span class="font-poppins font-medium text-gibei-text">{{ cmd.name }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
// Directive kustom sederhana untuk auto-fokus
const focus = {
  mounted: (el) => el.focus()
}
export default {
  directives: {
    focus
  }
}
</script>