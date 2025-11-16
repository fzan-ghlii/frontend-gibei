<script setup>
defineProps({
  member: Object
})
</script>

<template>
  <!-- 
    Komponen Kartu Profil (Reusable)
    Untuk WDD 3.0 - Struktur Organisasi
  -->
  <div 
    v-motion
    :initial="{ opacity: 0, y: 50 }"
    :visibleOnce="{ opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, delay: member.delay } }"
    class="bg-white rounded-lg shadow-lg p-6 text-center group"
  >
    <!-- Placeholder Gambar -->
    <div class="w-32 h-32 rounded-full bg-gibei-secondary mx-auto mb-4 flex items-center justify-center overflow-hidden transform transition-transform duration-300 group-hover:scale-110">
      <img 
        :src="member.imageUrl" 
        :alt="'Foto ' + member.name" 
        class="w-full h-full object-cover"
        onerror="this.src='https://placehold.co/128x128/e6d9c6/333333?text=Foto'"
      >
    </div>
    
    <!-- Nama -->
    <h3 class="font-poppins font-bold text-xl text-gibei-primary">
      {{ member.name }}
    </h3>
    
    <!-- Jabatan -->
    <p class="font-inter text-gibei-text text-base">
      {{ member.title }}
    </p>
  </div>
</template>