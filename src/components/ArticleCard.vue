<script setup>
// Menerima data artikel sebagai props
defineProps({
  article: Object,
})
</script>

<template>
  <!-- 
    Komponen Kartu Artikel (Reusable)
    Dibuat dengan style 'bersih' (WDD 5.1)
  -->
  <div 
    v-motion
    :initial="{ opacity: 0, y: 50 }"
    :visibleOnce="{ opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, delay: article.delay } }"
    class="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col group"
  >
    <!-- Gambar Artikel -->
    <div class="overflow-hidden relative">
      <img 
        :src="article.imageUrl" 
        :alt="'Gambar ' + article.title" 
        class="w-full h-48 object-cover transform transition-transform duration-500 ease-in-out group-hover:scale-110"
      >
      <!-- Kategori di atas gambar -->
      <span class="absolute top-4 left-4 bg-gibei-secondary text-gibei-primary font-poppins font-semibold text-xs px-3 py-1 rounded-full uppercase">
        {{ article.category }}
      </span>
    </div>

    <!-- Konten Teks -->
    <div class="p-6 flex flex-col flex-grow">
      <!-- Judul Artikel -->
      <h3 class="font-poppins font-bold text-xl text-gibei-primary mb-4 leading-tight group-hover:text-blue-800 transition-colors">
        {{ article.title }}
      </h3>
      
      <!-- Link "Baca Selengkapnya" -->
      <div class="mt-auto">
        <a 
          :href="article.link"
          class="inline-flex items-center font-inter font-semibold text-gibei-primary group-hover:underline"
        >
          Baca Selengkapnya
          <!-- Ikon panah (animasi saat hover) -->
          <svg class="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </a>
      </div>
    </div>
  </div>
</template>