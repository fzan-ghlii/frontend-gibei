<template>
  <!-- Skeleton loader untuk ArticleCard -->
  <div class="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col">
    <!-- Gambar Skeleton -->
    <div class="relative w-full h-48 bg-gray-200 animate-pulse">
      <!-- Kategori -->
      <span class="absolute top-4 left-4 h-5 w-24 bg-gray-300 rounded-full animate-pulse">
      </span>
    </div>

    <!-- Konten Teks Skeleton -->
    <div class="p-6 flex flex-col flex-grow">
      <!-- Judul Artikel -->
      <div class="h-6 w-full bg-gray-200 rounded animate-pulse mb-4"></div>
      <div class="h-6 w-3/4 bg-gray-200 rounded animate-pulse mb-4"></div>
      
      <!-- Link "Baca Selengkapnya" -->
      <div class="mt-auto">
        <div class="h-5 w-36 bg-gray-200 rounded animate-pulse"></div>
      </div>
    </div>
  </div>
</template>