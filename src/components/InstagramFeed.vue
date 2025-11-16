<script setup>
// Placeholder untuk feed Instagram
// Integrasi live feed memerlukan API/widget pihak ketiga nanti
</script>

<template>
  <!-- 
    Section "Instagram Feed" (WDD 4.1)
    Menggunakan background sekunder (krim)
  -->
  <section class="bg-gibei-secondary py-20 md:py-28 overflow-hidden">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <!-- Judul Section -->
      <div 
        v-motion
        :initial="{ opacity: 0, y: 50 }"
        :visibleOnce="{ opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } }"
        class="text-center mb-12"
      >
        <h2 class="font-poppins text-4xl md:text-5xl font-extrabold text-gibei-primary">
          Aktivitas Terbaru Kami
        </h2>
        <p class="mt-4 text-lg text-gibei-text max-w-2xl mx-auto">
          Ikuti kami di <a href="#" class="font-semibold text-gibei-primary hover:underline">@gibei_unimed</a> untuk info terkini.
        </p>
      </div>

      <!-- Grid Placeholder untuk 6 Foto Instagram -->
      <div 
        v-motion
        :initial="{ opacity: 0, y: 50 }"
        :visibleOnce="{ opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, delay: 200 } }"
        class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
      >
        <!-- Ini adalah placeholder. Kita bisa ganti dengan <img> nanti -->
        <div class="w-full h-48 md:h-56 bg-white shadow-lg rounded-lg flex items-center justify-center font-poppins text-gibei-primary transform transition-transform duration-300 hover:scale-105">
          [Post 1]
        </div>
        <div class="w-full h-48 md:h-56 bg-white shadow-lg rounded-lg flex items-center justify-center font-poppins text-gibei-primary transform transition-transform duration-300 hover:scale-105">
          [Post 2]
        </div>
        <div class="w-full h-48 md:h-56 bg-white shadow-lg rounded-lg flex items-center justify-center font-poppins text-gibei-primary transform transition-transform duration-300 hover:scale-105">
          [Post 3]
        </div>
        <div class="w-full h-48 md:h-56 bg-white shadow-lg rounded-lg flex items-center justify-center font-poppins text-gibei-primary transform transition-transform duration-300 hover:scale-105">
          [Post 4]
        </div>
        <div class="w-full h-48 md:h-56 bg-white shadow-lg rounded-lg flex items-center justify-center font-poppins text-gibei-primary transform transition-transform duration-300 hover:scale-105">
          [Post 5]
        </div>
        <div class="w-full h-48 md:h-56 bg-white shadow-lg rounded-lg flex items-center justify-center font-poppins text-gibei-primary transform transition-transform duration-300 hover:scale-105">
          [Post 6]
        </div>
      </div>

    </div>
  </section>
</template>