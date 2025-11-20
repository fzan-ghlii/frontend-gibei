<script setup>
import { ref, computed, onMounted } from 'vue'
import api from '../api' // Import konfigurasi Axios
import ArticleCard from '../components/ArticleCard.vue'
import ArticleCardSkeleton from '../components/ArticleCardSkeleton.vue'

// State
const allArticles = ref([])
const isLoading = ref(true)
const selectedCategory = ref('Semua')

// Daftar kategori (bisa statis atau diambil dari backend jika ada endpoint kategori)
const categories = ref([
  'Semua',
  'Dasar Investasi',
  'Analisis',
  'Tips & Trik',
])

// Fetch Data Artikel
onMounted(async () => {
  try {
    // Panggil endpoint GET /articles (Public)
    const response = await api.get('/articles')
    
    // Mapping data dari backend agar sesuai dengan props ArticleCard
    // Backend: { id, title, imageUrl, category, createdAt, author: { nama } }
    // Frontend butuh: { id, title, imageUrl, category, link, delay }
    allArticles.value = response.data.map((article, index) => ({
      id: article.id,
      title: article.title,
      category: article.category,
      imageUrl: article.imageUrl,
      // Link sementara ke halaman detail (nanti kita buat view-nya)
      link: `/artikel/${article.id}`, 
      // Efek delay animasi berurutan
      delay: (index % 6) * 100 
    }))
  } catch (error) {
    console.error("Gagal memuat artikel:", error)
  } finally {
    // Beri sedikit delay agar skeleton tidak kedip terlalu cepat
    setTimeout(() => {
      isLoading.value = false
    }, 500)
  }
})

// Logika Filter
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

        <!-- Grid Artikel (Data Asli) -->
        <div v-else class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <ArticleCard 
            v-for="article in filteredArticles" 
            :key="article.id" 
            :article="article" 
          />
        </div>
        
        <!-- Empty State (Jika tidak ada artikel) -->
        <div 
          v-if="!isLoading && filteredArticles.length === 0" 
          class="text-center py-16"
          v-motion
          :initial="{ opacity: 0 }"
          :enter="{ opacity: 1 }"
        >
          <svg class="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
          <h3 class="font-poppins text-2xl font-semibold text-gibei-primary">
            Belum ada artikel
          </h3>
          <p class="font-inter text-gibei-text mt-2">
            Tidak ada artikel dalam kategori '{{ selectedCategory }}' saat ini.
          </p>
        </div>
        
      </div>
    </section>
  </div>
</template>