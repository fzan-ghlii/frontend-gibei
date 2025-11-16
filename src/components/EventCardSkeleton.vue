<template>
  <!-- Skeleton loader untuk EventCard -->
  <div class="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col">
    <!-- Gambar Skeleton -->
    <div class="w-full h-48 bg-gray-200 animate-pulse"></div>

    <!-- Konten Teks Skeleton -->
    <div class="p-6 flex flex-col flex-grow">
      <!-- Tanggal -->
      <div class="h-4 w-1/3 bg-gray-200 rounded animate-pulse mb-3"></div>
      <!-- Judul -->
      <div class="h-6 w-full bg-gray-200 rounded animate-pulse mb-3"></div>
      <!-- Deskripsi -->
      <div class="h-4 w-full bg-gray-200 rounded animate-pulse mb-2"></div>
      <div class="h-4 w-5/6 bg-gray-200 rounded animate-pulse mb-6"></div>

      <!-- Tombol Skeleton -->
      <div class="mt-auto">
        <div class="h-10 w-32 bg-gray-200 rounded-md animate-pulse"></div>
      </div>
    </div>
  </div>
</template>