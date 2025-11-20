<script setup>
import { ref, computed, onMounted } from 'vue'
import ArticleCard from '../components/ArticleCard.vue'
import ArticleCardSkeleton from '../components/ArticleCardSkeleton.vue'
import api from '../api' // Import axios instance

// State Data
const allArticles = ref([])
const isLoading = ref(true)
const error = ref(null)

// Kategori Filter (Bisa dibuat dinamis dari DB nanti, sekarang statis dulu)
const categories = ref([
  'Semua',
  'Dasar Investasi',
  'Analisis',
  'Tips & Trik',
  'Berita Terkini'
])

const selectedCategory = ref('Semua')

// --- FETCH DATA DARI BACKEND ---
const fetchArticles = async () => {
  try {
    isLoading.value = true
    const response = await api.get('/articles')
    
    // Mapping data dari backend agar sesuai dengan properti yang dibutuhkan ArticleCard
    // Backend mengembalikan array objek Article (id, title, content, imageUrl, category, createdAt)
    allArticles.value = response.data.map(article => ({
      id: article.id,
      title: article.title,
      category: article.category,
      imageUrl: article.imageUrl || 'https://placehold.co/600x400?text=No+Image', // Fallback image
      link: `/artikel/${article.id}`, // Link detail (nanti kita buat view-nya)
      delay: 100, // Animasi delay (bisa di-randomize kalau mau)
      createdAt: article.createdAt // Opsional: untuk sorting atau display tanggal
    }))
  } catch (err) {
    console.error('Gagal mengambil artikel:', err)
    error.value = 'Gagal memuat artikel. Silakan coba lagi nanti.'
  } finally {
    // Beri sedikit delay agar skeleton tidak kedip terlalu cepat (estetika)
    setTimeout(() => {
      isLoading.value = false
    }, 500)
  }
}

// Logika filter di sisi Frontend
const filteredArticles = computed(() => {
  if (selectedCategory.value === 'Semua') {
    return allArticles.value
  }
  return allArticles.value.filter(article => {
    // Case insensitive comparison untuk keamanan
    return article.category.toLowerCase() === selectedCategory.value.toLowerCase()
  })
})

// Ambil data saat komponen di-mount
onMounted(() => {
  fetchArticles()
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
          Pusat materi edukasi GIBEI UNIMED yang tersusun rapi.
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

        <!-- Loading State (Skeleton) -->
        <div v-if="isLoading" class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <ArticleCardSkeleton v-for="n in 6" :key="n" />
        </div>

        <!-- Error State -->
        <div v-else-if="error" class="text-center py-16 text-red-500 font-inter">
          {{ error }}
          <button @click="fetchArticles" class="block mx-auto mt-4 text-gibei-primary underline">Coba Lagi</button>
        </div>

        <!-- Grid untuk Kartu Artikel -->
        <div v-else-if="filteredArticles.length > 0" class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <ArticleCard 
            v-for="article in filteredArticles" 
            :key="article.id" 
            :article="article" 
          />
        </div>
        
        <!-- Tampilan jika tidak ada hasil -->
        <div 
          v-else 
          class="text-center py-16"
          v-motion
          :initial="{ opacity: 0 }"
          :enter="{ opacity: 1 }"
        >
          <h3 class="font-poppins text-2xl font-semibold text-gibei-primary">
            Artikel tidak ditemukan
          </h3>
          <p class="font-inter text-gibei-text mt-2">
            Belum ada artikel dalam kategori '{{ selectedCategory }}'.
          </p>
        </div>
        
      </div>
    </section>
  </div>
</template>