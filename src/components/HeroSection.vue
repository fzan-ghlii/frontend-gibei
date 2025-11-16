<script setup>
import { ref, onMounted } from 'vue'

// --- Logika Typewriter ---
const sloganDisplay = ref('')
const sloganText = '"Fortis Fortuna Adiuvat"'
const typingSpeed = 100
const deletingSpeed = 50
const pauseDuration = 2000

// Fungsi untuk mengetik
const type = (text, index, callback) => {
  if (index < text.length) {
    sloganDisplay.value = text.substring(0, index + 1)
    setTimeout(() => type(text, index + 1, callback), typingSpeed)
  } else {
    // Selesai mengetik, jeda sebelum menghapus
    setTimeout(callback, pauseDuration)
  }
}

// Fungsi untuk menghapus
const erase = (callback) => {
  const text = sloganDisplay.value
  if (text.length > 0) {
    sloganDisplay.value = text.substring(0, text.length - 1)
    setTimeout(erase, deletingSpeed, callback)
  } else {
    // Selesai menghapus, jeda sebelum mengetik lagi
    setTimeout(callback, 500) 
  }
}

// Fungsi loop
const typeLoop = () => {
  type(sloganText, 0, () => { // Mulai mengetik
    erase(typeLoop) // Setelah selesai, mulai menghapus, lalu loop
  })
}

onMounted(() => {
  // Mulai animasi 1 detik setelah komponen di-mount
  setTimeout(typeLoop, 1000)
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
      <!-- 
        Kita tambahkan 'overflow-hidden' di sini agar 
        animasi 'slide-up' tidak menyebabkan scrollbar saat loading.
      -->
      <div class="min-h-screen flex flex-col justify-center items-center text-center overflow-hidden">
        
        <div class="space-y-6">
          
          <!-- Slogan (WDD 4.1) -->
          <h2 
            class="font-inter text-lg md:text-xl text-gibei-text font-medium tracking-wide uppercase min-h-[1.5em]"
          >
            <!-- 
              Menghapus v-motion, diganti dengan ref sloganDisplay 
              min-h-[1.5em] ditambahkan agar layout tidak 'jiggle' saat teks kosong
            -->
            {{ sloganDisplay }}<span class="blinking-cursor">|</span>
          </h2>

          <!-- Judul Utama (WDD 4.1) -->
          <h1 
            v-motion
            :initial="{ opacity: 0, y: 50 }"
            :enter="{ opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, delay: 200 } }"
            class="font-poppins text-5xl md:text-7xl font-extrabold text-gibei-primary leading-tight"
          >
            Selamat Datang di <br />
            GIBEI UNIMED
          </h1>

          <!-- Deskripsi singkat -->
          <p 
            v-motion
            :initial="{ opacity: 0, y: 50 }"
            :enter="{ opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, delay: 300 } }"
            class="max-w-2xl text-lg md:text-xl text-gibei-text font-inter"
          >
            Pusat informasi, edukasi, dan registrasi digital untuk seluruh kegiatan Galeri Investasi BEI Universitas Negeri Medan.
          </p>

          <!-- CTA Utama (WDD 4.1) -->
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