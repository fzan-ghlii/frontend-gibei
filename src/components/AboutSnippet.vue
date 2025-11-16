<script setup>
// UPGRADE 1: Import 'computed' dan 'useWindowScroll' untuk parallax
import { computed } from 'vue'
import { useWindowScroll } from '@vueuse/core'

// --- UPGRADE 1: Logika Parallax ---
const { y } = useWindowScroll()

// Menghitung style transform untuk gambar
// Gambar akan bergerak ke atas 0.1x lebih lambat dari scroll
// Ini akan menciptakan ilusi kedalaman (depth)
const parallaxStyle = computed(() => ({
  transform: `translateY(-${y.value * 0.05}px)`
}))
// --- Akhir Upgrade 1 ---
</script>

<template>
  <section class="bg-white py-20 md:py-28 overflow-hidden">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <div class="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
        
        <!-- Kolom Kiri: Teks Konten -->
        <div 
          v-motion
          :initial="{ opacity: 0, x: -100 }"
          :visibleOnce="{ opacity: 1, x: 0, transition: { type: 'spring', stiffness: 100, delay: 100 } }"
          class="space-y-6 z-10"
        >
          <span class="inline-block px-4 py-1 bg-gibei-secondary text-gibei-primary font-poppins font-semibold text-sm rounded-full">
            Tentang Kami
          </span>
          <h2 class="font-poppins text-4xl md:text-5xl font-extrabold text-gibei-primary">
            Mengenal GIBEI UNIMED
          </h2>
          <p class="font-inter text-lg text-gibei-text leading-relaxed">
            Galeri Investasi BEI Universitas Negeri Medan (GIBEI UNIMED) adalah pusat edukasi dan literasi pasar modal bagi seluruh civitas akademika UNIMED dan masyarakat umum.
          </p>
          <p class="font-inter text-lg text-gibei-text leading-relaxed">
            Kami berkomitmen untuk membangun generasi muda yang melek investasi, profesional, dan berintegritas.
          </p>
          <div>
            <router-link 
              to="/about" 
              class="inline-block bg-gibei-primary text-white font-poppins font-semibold px-8 py-3 rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-xl"
            >
              Pelajari Lebih Lanjut
            </router-link>
          </div>
        </div>
        
        <!-- Kolom Kanan: Placeholder Gambar/Visual -->
        <div
          v-motion
          :initial="{ opacity: 0, x: 100 }"
          :visibleOnce="{ opacity: 1, x: 0, transition: { type: 'spring', stiffness: 100, delay: 200 } }"
          class="flex justify-center items-center"
        >
          <!-- 
            PERBAIKAN: Mengganti h-96 (fixed height) menjadi h-full (fill height).
            Ini akan membuat gambar meregang setinggi kolom teks,
            sehingga tata letaknya simetris.
          -->
          <img 
            src="https://source.unsplash.com/800x600/?team,meeting,professional" 
            alt="Tim GIBEI UNIMED"
            class="w-full h-full object-cover rounded-lg shadow-xl"
            :style="parallaxStyle"
          >
        </div>

      </div>

    </div>
  </section>
</template>