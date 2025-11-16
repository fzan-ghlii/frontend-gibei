<script setup>
import { ref, computed } from 'vue'
import ArticleCard from '../components/ArticleCard.vue'

// --- Data Placeholder (Lebih banyak data) ---
// (Nanti ini akan datang dari API/CMS)
const allArticles = ref([
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
    title: 'Diversifikasi Portofolio: Mengapa Anda Tidak Boleh Menaruh...',
    category: 'Tips & Trik',
    imageUrl: 'https://placehold.co/600x400/1a4162/ffffff?text=Diversifikasi',
    link: '#',
    delay: 300,
  },
  {
    id: 4,
    title: 'Pengenalan Analisis Fundamental: Membaca Laporan Keuangan',
    category: 'Analisis',
    imageUrl: 'https://placehold.co/600x400/1a4162/ffffff?text=Fundamental',
    link: '#',
    delay: 100,
  },
  {
    id: 5,
    title: 'Psikologi Trading: Mengelola Emosi Saat Berinvestasi',
    category: 'Tips & Trik',
    imageUrl: 'https://placehold.co/600x400/e6d9c6/333333?text=Psikologi',
    link: '#',
    delay: 200,
  },
  {
    id: 6,
    title: 'Mengenal Obligasi: Pendapatan Tetap yang Stabil',
    category: 'Dasar Investasi',
    imageUrl: 'https://placehold.co/600x400/1a4162/ffffff?text=Obligasi',
    link: '#',
    delay: 300,
  },
  {
    id: 7,
    title: 'Panduan Analisis Teknikal: Pola Candlestick',
    category: 'Analisis',
    imageUrl: 'https://placehold.co/600x400/e6d9c6/333333?text=Teknikal',
    link: '#',
    delay: 100,
  },
  {
    id: 8,
    title: 'Menyusun Rencana Investasi Jangka Panjang',
    category: 'Tips & Trik',
    imageUrl: 'https://placehold.co/600x400/1a4162/ffffff?text=Rencana',
    link: '#',
    delay: 200,
  },
])

// --- Logika Filter Kategori (WDD 5.0) ---
const categories = ref([
  'Semua',
  'Dasar Investasi',
  'Analisis',
  'Tips & Trik'
])
const selectedCategory = ref('Semua')

// Filter artikel berdasarkan kategori yang dipilih
const filteredArticles = computed(() => {
  if (selectedCategory.value === 'Semua') {
    return allArticles.value
  }
  return allArticles.value.filter(article => {
    return article.category === selectedCategory.value
  })
})
</script>

<template>
  <div class="bg-white">
    <!-- Section 1: Page Header -->
    <section class="bg-gibei-secondary py-20 md:py-32">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 
          v-motion
          :initial="{ opacity: 0, y: 50 }"
          :enter="{ opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } }"
          class="font-poppins text-5xl md:text-7xl font-extrabold text-gibei-primary"
        >
          Artikel & Edukasi
        </h1>
        <p 
          v-motion
          :initial="{ opacity: 0, y: 50 }"
          :enter="{ opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, delay: 100 } }"
          class="mt-4 text-xl text-gibei-text max-w-2xl mx-auto"
        >
          Pusat materi edukasi GIBEI UNIMED yang tersusun rapi (WDD 5.0).
        </p>
      </div>
    </section>

    <!-- Section 2: Filter Kategori & Grid (WDD 5.0) -->
    <section class="py-20 md:py-28">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <!-- Filter Kategori -->
        <div 
          v-motion
          :initial="{ opacity: 0, y: 50 }"
          :enter="{ opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, delay: 200 } }"
          class="flex flex-wrap justify-center gap-4 mb-16"
        >
          <button
            v-for="category in categories"
            :key="category"
            @click="selectedCategory = category"
            :class="[
              'font-poppins font-semibold px-6 py-3 rounded-lg shadow-md transition-all duration-300 transform hover:scale-105',
              selectedCategory === category 
                ? 'bg-gibei-primary text-white' 
                : 'bg-white text-gibei-primary border border-gray-300 hover:bg-gray-100'
            ]"
          >
            {{ category }}
          </button>
        </div>

        <!-- Grid untuk Kartu Artikel -->
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <ArticleCard 
            v-for="article in filteredArticles" 
            :key="article.id" 
            :article="article" 
          />
        </div>
        
        <!-- Pesan jika tidak ada hasil -->
        <div 
          v-if="filteredArticles.length === 0" 
          class="text-center py-16"
          v-motion
          :initial="{ opacity: 0 }"
          :enter="{ opacity: 1 }"
        >
          <h3 class="font-poppins text-2xl font-semibold text-gibei-primary">
            Artikel tidak ditemukan
          </h3>
          <p class="font-inter text-gibei-text mt-2">
            Tidak ada artikel dalam kategori '{{ selectedCategory }}' saat ini.
          </p>
        </div>

      </div>
    </section>

  </div>
</template>