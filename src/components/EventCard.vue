<script setup>
// Menerima data event sebagai props
defineProps({
  event: Object,
})
</script>

<template>
  <!-- 
    UPGRADE 1: 
    - Menambahkan 'hover:shadow-2xl' untuk efek 'mewah'.
  -->
  <div 
    v-motion
    :initial="{ opacity: 0, y: 50 }"
    :visibleOnce="{ opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, delay: event.delay } }"
    class="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col group transition-all duration-500 hover:shadow-2xl"
  >
    <!-- Gambar/Poster Event -->
    <div class="overflow-hidden">
      <!-- 
        UPGRADE 1:
        - Memindahkan 'group-hover:scale-110' ke <img>.
        - Menambahkan 'duration-500 ease-in-out'.
      -->
      <img 
        :src="event.imageUrl" 
        :alt="'Poster ' + event.title" 
        class="w-full h-48 object-cover transform transition-transform duration-500 ease-in-out group-hover:scale-110"
      >
    </div>

    <!-- Konten Teks -->
    <div class="p-6 flex flex-col flex-grow">
      <span class="block text-gibei-primary font-inter font-semibold text-sm mb-2">{{ event.date }}</span>
      <h3 class="font-poppins font-bold text-xl text-gibei-primary mb-3 leading-tight group-hover:text-blue-800 transition-colors duration-300">
        {{ event.title }}
      </h3>
      <p class="font-inter text-gibei-text text-base mb-6 flex-grow">
        {{ event.description }}
      </p>

      <!-- Tombol Daftar (CTA) -->
      <div class="mt-auto">
        <!-- 
          UPGRADE 1:
          - Menambahkan 'group-hover:-translate-y-1' untuk efek 'mewah'.
          - Menambahkan 'hover:shadow-xl'
        -->
        <router-link 
          :to="event.link"
          class="inline-block bg-gibei-primary text-white font-poppins font-medium px-6 py-2 rounded-md shadow-md transform transition-all duration-300 hover:scale-105 hover:bg-blue-900 group-hover:-translate-y-1 hover:shadow-xl"
        >
          Daftar Sekarang
        </router-link>
      </div>
    </div>
  </div>
</template>