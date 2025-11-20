<script setup>
import { ref, computed } from 'vue'
import ArticleCard from '../components/ArticleCard.vue'

// PERBAIKAN: Mengganti placeholder gambar (WDD 5.4)
const allArticles = ref([
  { id: 1, title: 'Apa itu Reksadana? Panduan Lengkap untuk Pemula', category: 'Dasar Investasi', imageUrl: 'https://source.unsplash.com/600x400/?finance,growth', link: '#', delay: 100, },
  { id: 2, title: 'Memahami Risiko dan Imbal Hasil dalam Investasi Saham', category: 'Analisis', imageUrl: 'https://source.unsplash.com/600x400/?risk,chart', link: '#', delay: 200, },
  { id: 3, title: 'Diversifikasi Portofolio: Mengapa Anda Tidak Boleh Menaruh...', category: 'Tips & Trik', imageUrl: 'https://source.unsplash.com/600x400/?collection,portfolio', link: '#', delay: 300, },
  { id: 4, title: 'Pengenalan Analisis Fundamental: Membaca Laporan Keuangan', category: 'Analisis', imageUrl: 'https://source.unsplash.com/600x400/?financial,report', link: '#', delay: 100, },
  { id: 5, title: 'Psikologi Trading: Mengelola Emosi Saat Berinvestasi', category: 'Tips & Trik', imageUrl: 'https://source.unsplash.com/600x400/?psychology,brain', link: '#', delay: 200, },
  { id: 6, title: 'Mengenal Obligasi: Pendapatan Tetap yang Stabil', category: 'Dasar Investasi', imageUrl: 'https://source.unsplash.com/600x400/?bond,money', link: '#', delay: 300, },
  { id: 7, title: 'Panduan Analisis Teknikal: Pola Candlestick', category: 'Analisis', imageUrl: 'https://source.unsplash.com/600x400/?candlestick,chart', link: '#', delay: 100, },
  { id: 8, title: 'Menyusun Rencana Investasi Jangka Panjang', category: 'Tips & Trik', imageUrl: 'https://source.unsplash.com/600x400/?plan,future', link: '#', delay: 200, },
])

const categories = ref([
  'Semua',
  'Dasar Investasi',
  'Analisis',
  'Tips & Trik',
])

const selectedCategory = ref('Semua')

// Logika filter
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
          :enter="{ opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, delay: 200 } }"
          class="font-poppins text-5xl md:text-7xl font-extrabold text-gibei-primary"
        >
          Artikel & Edukasi
        </h1>
        <p 
          v-motion
          :initial="{ opacity: 0, y: 50 }"
          :enter="{ opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, delay: 300 } }"
          class="mt-4 text-xl text-gibei-text max-w-2xl mx-auto"
        >
          Pusat materi edukasi GIBEI UNIMED yang tersusun rapi (WDD 5.0).
        </p>
      </div>
    </section>

    <!-- Section 2: Filter dan Grid Artikel -->
    <section class="py-20 md:py-28">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <!-- Tombol Filter Kategori -->
        <div 
          v-motion
          :initial="{ opacity: 0, y: 50 }"
          :visibleOnce="{ opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } }"
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
        
        <!-- Tampilan jika tidak ada hasil -->
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