<script setup>
// UPGRADE 2: Import 'onMounted'
import { ref, onMounted } from 'vue'
import ArticleCard from './ArticleCard.vue'
// UPGRADE 2: Import 'ArticleCardSkeleton'
import ArticleCardSkeleton from './ArticleCardSkeleton.vue'

// UPGRADE 2: State loading
const isLoading = ref(true)

// PERBAIKAN: Mengganti placeholder gambar (WDD 5.4)
const dummyArticles = ref([
  {
    id: 1,
    title: 'Apa itu Reksadana? Panduan Lengkap untuk Pemula',
    category: 'Dasar Investasi',
    imageUrl: 'https://source.unsplash.com/600x400/?finance,growth',
    link: '/artikel',
    delay: 100,
  },
  {
    id: 2,
    title: 'Memahami Risiko dan Imbal Hasil dalam Investasi Saham',
    category: 'Analisis',
    imageUrl: 'https://source.unsplash.com/600x400/?risk,chart',
    link: '/artikel',
    delay: 200,
  },
  {
    id: 3,
    title: 'Diversifikasi Portofolio: Mengapa Anda Tidak Boleh Menaruh...',
    category: 'Tips & Trik',
    imageUrl: 'https://source.unsplash.com/600x400/?collection,portfolio',
    link: '/artikel',
    delay: 300,
  },
])

// UPGRADE 2: Simulasi data fetch
onMounted(() => {
  setTimeout(() => {
    isLoading.value = false
  }, 1200) // Tampilkan skeleton selama 1.2 detik
})
</script>

<template>
  <section class="bg-gibei-secondary py-20 md:py-28">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <!-- Judul Section -->
      <div 
        v-motion
        :initial="{ opacity: 0, y: 50 }"
        :visibleOnce="{ opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } }"
        class="text-center mb-12"
      >
        <h2 class="font-poppins text-4xl md:text-5xl font-extrabold text-gibei-primary">
          Artikel & Edukasi Terbaru
        </h2>
        <p class="mt-4 text-lg text-gibei-text max-w-2xl mx-auto">
          Perluas wawasan Anda di dunia pasar modal bersama kami.
        </p>
      </div>

      <!-- UPGRADE 2: Grid Skeleton (ditampilkan saat isLoading) -->
      <div v-if="isLoading" class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <ArticleCardSkeleton v-for="n in 3" :key="n" />
      </div>
      
      <!-- Grid untuk Kartu Artikel (ditampilkan setelah loading) -->
      <div v-else class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <ArticleCard 
          v-for="article in dummyArticles" 
          :key="article.id" 
          :article="article" 
        />
      </div>

      <!-- Tombol "Lihat Semua" -->
      <div 
        v-motion
        :initial="{ opacity: 0, y: 50 }"
        :visibleOnce="{ opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, delay: 400 } }"
        class="text-center mt-16"
      >
        <router-link 
          to="/artikel"
          class="inline-block bg-gibei-primary text-white font-poppins font-semibold px-8 py-3 rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-xl"
        >
          Lihat Semua Artikel
        </router-link>
      </div>

    </div>
  </section>
</template>