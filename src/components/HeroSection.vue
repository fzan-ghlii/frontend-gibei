<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

// --- Logika Typewriter ---
const sloganDisplay = ref('')
const sloganText = '"Fortis Fortuna Adiuvat"'
const typingSpeed = 100
const deletingSpeed = 50
const pauseDuration = 2000

// PERBAIKAN: Variabel untuk menyimpan semua ID timeout
let timeouts = []

// Fungsi untuk mengetik
const type = (text, index, callback) => {
  if (index < text.length) {
    sloganDisplay.value = text.substring(0, index + 1)
    const timeoutId = setTimeout(() => type(text, index + 1, callback), typingSpeed)
    timeouts.push(timeoutId)
  } else {
    const timeoutId = setTimeout(callback, pauseDuration)
    timeouts.push(timeoutId)
  }
}

// Fungsi untuk menghapus
const erase = (callback) => {
  const text = sloganDisplay.value
  if (text.length > 0) {
    sloganDisplay.value = text.substring(0, text.length - 1)
    const timeoutId = setTimeout(erase, deletingSpeed, callback)
    timeouts.push(timeoutId)
  } else {
    const timeoutId = setTimeout(callback, 500) 
    timeouts.push(timeoutId)
  }
}

// Fungsi loop
const typeLoop = () => {
  type(sloganText, 0, () => { // Mulai mengetik
    erase(typeLoop) // Setelah selesai, mulai menghapus, lalu loop
  })
}

onMounted(() => {
  // Hapus array timeout lama (jika ada) dan mulai loop
  timeouts.forEach(clearTimeout) // Hapus sisa timeout (jika ada)
  timeouts = []
  typeLoop()
})

// PERBAIKAN: Hentikan semua loop saat pindah halaman
onUnmounted(() => {
  timeouts.forEach(clearTimeout)
})
// --- Akhir Logika Typewriter ---
</script>

<template>
  <!-- 
    Hero Section
    Sesuai WDD 4.1 
  -->
  <section class="bg-gibei-secondary">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="min-h-screen flex flex-col justify-center items-center text-center overflow-hidden">
        
        <div class="space-y-6">
          
          <!-- Slogan (WDD 4.1) -->
          <h2 
            class="font-inter text-lg md:text-xl text-gibei-text font-medium tracking-wide uppercase min-h-[1.5em]"
          >
            {{ sloganDisplay }}<span class="blinking-cursor">|</span>
          </h2>

          <!-- 
            PERBAIKAN: Animasi di HeroSection HARUS menggunakan :enter
            karena terlihat saat load, bukan saat scroll.
          -->
          <h1 
            v-motion
            :initial="{ opacity: 0, y: 50 }"
            :enter="{ opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, delay: 200 } }"
            class="font-poppins text-5xl md:text-7xl font-extrabold text-gibei-primary leading-tight"
          >
            Selamat Datang di <br />
            GIBEI UNIMED
          </h1>

          <p 
            v-motion
            :initial="{ opacity: 0, y: 50 }"
            :enter="{ opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, delay: 300 } }"
            class="max-w-2xl text-lg md:text-xl text-gibei-text font-inter"
          >
            Pusat informasi, edukasi, dan registrasi digital untuk seluruh kegiatan Galeri Investasi BEI Universitas Negeri Medan.
          </p>

          <div
            v-motion
            :initial="{ opacity: 0, y: 50 }"
            :enter="{ opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, delay: 400 } }"
          >
            <a 
              href="#" 
              class="inline-block bg-gibei-primary text-white font-poppins font-semibold px-8 py-3 rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-xl"
            >
              Lihat Event Terkini
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Menambahkan style untuk kursor yang berkedip */
.blinking-cursor {
  animation: blink 1s infinite;
  color: #1a4162; /* Sesuaikan dengan warna gibei-primary */
}

@keyframes blink {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
}
</style>