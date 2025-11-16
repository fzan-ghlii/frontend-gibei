<script setup>
import { ref } from 'vue'
import EventCard from './EventCard.vue'

// PERBAIKAN: Mengganti placeholder gambar (WDD 5.4)
const upcomingEvents = ref([
  {
    id: 1,
    title: 'Sekolah Pasar Modal (SPM) Level 1',
    date: '20 DESEMBER 2025',
    description: 'Pelajari dasar-dasar investasi dan mekanisme pasar modal dari awal.',
    imageUrl: 'https://source.unsplash.com/600x400/?stock-market,study',
    link: '/spm',
    delay: 100,
  },
  {
    id: 2,
    title: 'Workshop Analisis Teknikal',
    date: '25 DESEMBER 2025',
    description: 'Pahami cara membaca grafik dan mengambil keputusan investasi.',
    imageUrl: 'https://source.unsplash.com/600x400/?presentation,workshop',
    link: '/events',
    delay: 200,
  },
  {
    id: 3,
    title: 'Webinar: Investasi Syariah',
    date: '30 DESEMBER 2025',
    description: 'Mengenal produk dan prinsip investasi yang sesuai dengan syariah.',
    imageUrl: 'https://source.unsplash.com/600x400/?islamic,finance',
    link: '/events',
    delay: 300,
  },
])
</script>

<template>
  <section class="bg-white py-20 md:py-28">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <!-- Judul Section -->
      <div 
        v-motion
        :initial="{ opacity: 0, y: 50 }"
        :visibleOnce="{ opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } }"
        class="text-center mb-12"
      >
        <h2 class="font-poppins text-4xl md:text-5xl font-extrabold text-gibei-primary">
          Event Mendatang
        </h2>
        <p class="mt-4 text-lg text-gibei-text max-w-2xl mx-auto">
          Jangan lewatkan kesempatan untuk belajar dan berkembang bersama kami.
        </p>
      </div>

      <!-- Grid untuk Kartu Event -->
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <EventCard 
          v-for="event in upcomingEvents" 
          :key="event.id" 
          :event="event" 
        />
      </div>

      <!-- Tombol "Lihat Semua" -->
      <div 
        v-motion
        :initial="{ opacity: 0, y: 50 }"
        :visibleOnce="{ opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, delay: 400 } }"
        class="text-center mt-16"
      >
        <router-link 
          to="/events"
          class="inline-block bg-gibei-secondary text-gibei-primary font-poppins font-semibold px-8 py-3 rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-xl"
        >
          Lihat Semua Event
        </router-link>
      </div>

    </div>
  </section>
</template>