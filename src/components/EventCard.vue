<script setup>
// Menerima data event sebagai props
defineProps({
  event: Object,
})
</script>

<template>
  <!-- 
    Komponen Kartu Event (Reusable)
    Dibuat dengan style 'clean' dan 'profesional' (WDD 5.1)
  -->
  <div 
    v-motion
    :initial="{ opacity: 0, y: 50 }"
    :visibleOnce="{ opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, delay: event.delay } }"
    class="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col group"
  >
    <!-- Gambar/Poster Event -->
    <div class="overflow-hidden">
      <img 
        :src="event.imageUrl" 
        :alt="'Poster ' + event.title" 
        class="w-full h-48 object-cover transform transition-transform duration-500 ease-in-out group-hover:scale-110"
      >
    </div>

    <!-- Konten Teks -->
    <div class="p-6 flex flex-col flex-grow">
      <!-- Tanggal (Menggunakan warna sekunder untuk aksen) -->
      <span class="block text-gibei-primary font-inter font-semibold text-sm mb-2">{{ event.date }}</span>
      
      <!-- Judul Event -->
      <h3 class="font-poppins font-bold text-xl text-gibei-primary mb-3 leading-tight group-hover:text-blue-800 transition-colors">
        {{ event.title }}
      </h3>
      
      <!-- Deskripsi Singkat -->
      <p classf="font-inter text-gibei-text text-base mb-6 flex-grow">
        {{ event.description }}
      </p>

      <!-- Tombol Daftar (CTA) -->
      <div class="mt-auto">
        <a 
          :href="event.link"
          class="inline-block bg-gibei-primary text-white font-poppins font-medium px-6 py-2 rounded-md shadow-md transform transition-transform duration-300 hover:scale-105 hover:bg-blue-900"
        >
          Daftar Sekarang
        </a>
      </div>
    </div>
  </div>
</template>