<script setup>
import { ref } from 'vue'
import ArticleCard from './ArticleCard.vue'

// Data placeholder untuk artikel (nanti dari API/CMS)
const dummyArticles = ref([
  {
    id: 1,
    title: 'Apa itu Reksadana? Panduan Lengkap untuk Pemula',
    category: 'Dasar Investasi',
    imageUrl: 'https://placehold.co/600x400/1a4162/ffffff?text=Reksadana',
    link: '#',
    delay: 100,
  },
  {
    id: 2,
    title: 'Memahami Risiko dan Imbal Hasil dalam Investasi Saham',
    category: 'Analisis',
    imageUrl: 'https://placehold.co/600x400/e6d9c6/333333?text=Risiko+Saham',
    link: '#',
    delay: 200,
  },
  {
    id: 3,
    title: 'Diversifikasi Portofolio: Mengapa Anda Tidak Boleh Menaruh Semua Telur...',
    category: 'Tips & Trik',
    imageUrl: 'https://placehold.co/600x400/1a4162/ffffff?text=Diversifikasi',
    link: '#',
    delay: 300,
  },
])
</script>

<template>
  <!-- 
    Section "Artikel Terbaru" (WDD 4.1)
    Menggunakan background sekunder (krim) untuk variasi visual
  -->
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

      <!-- Grid untuk Kartu Artikel -->
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
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
        <a 
          href="#"
          class="inline-block bg-gibei-primary text-white font-poppins font-semibold px-8 py-3 rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-xl"
        >
          Lihat Semua Artikel
        </a>
      </div>

    </div>
  </section>
</template>