<script setup>
import { ref, computed } from 'vue'
import EventCard from '../components/EventCard.vue'

// --- Data Placeholder (Lebih banyak data untuk simulasi) ---
// (Nanti ini akan datang dari API/CMS)
const allEvents = ref([
  {
    id: 1,
    title: 'Sekolah Pasar Modal (SPM) Level 1',
    date: '20 DESEMBER 2025',
    description: 'Pelajari dasar-dasar investasi dan mekanisme pasar modal dari awal.',
    imageUrl: 'https://placehold.co/600x400/1a4162/ffffff?text=SPM+Level+1',
    link: '#',
    delay: 100,
  },
  {
    id: 2,
    title: 'Workshop Analisis Teknikal',
    date: '25 DESEMBER 2025',
    description: 'Pahami cara membaca grafik dan mengambil keputusan investasi.',
    imageUrl: 'https://placehold.co/600x400/e6d9c6/333333?text=Workshop',
    link: '#',
    delay: 200,
  },
  {
    id: 3,
    title: 'Webinar: Investasi Syariah',
    date: '30 DESEMBER 2025',
    description: 'Mengenal produk dan prinsip investasi yang sesuai dengan syariah.',
    imageUrl: 'https://placehold.co/600x400/1a4162/ffffff?text=Investasi+Syariah',
    link: '#',
    delay: 300,
  },
  {
    id: 4,
    title: '(ARSIP) Live IG: Masa Depan Saham Digital',
    date: '15 NOVEMBER 2025',
    description: 'Diskusi santai mengenai tren terbaru di dunia saham digital.',
    imageUrl: 'https://placehold.co/600x400/e6d9c6/333333?text=Live+IG',
    link: '#',
    delay: 100,
  },
  {
    id: 5,
    title: '(ARSIP) Kompetisi Trading GIBEI 2025',
    date: '10 OKTOBER 2025',
    description: 'Ajang kompetisi trading tahunan GIBEI UNIMED.',
    imageUrl: 'https://placehold.co/600x400/1a4162/ffffff?text=Trading+Comp',
    link: '#',
    delay: 200,
  },
  {
    id: 6,
    title: 'Sekolah Pasar Modal (SPM) Level 2',
    date: '10 JANUARI 2026',
    description: 'Lanjutan SPM 1, mendalami analisis fundamental dan lanjutan.',
    imageUrl: 'https://placehold.co/600x400/e6d9c6/333333?text=SPM+Level+2',
    link: '#',
    delay: 300,
  },
])

// --- Logika Search Bar (WDD 4.2) ---
const searchQuery = ref('')

// Filter event berdasarkan judul
const filteredEvents = computed(() => {
  return allEvents.value.filter(event => {
    return event.title.toLowerCase().includes(searchQuery.value.toLowerCase())
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
          :enter="{ opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } }"
          class="font-poppins text-5xl md:text-7xl font-extrabold text-gibei-primary"
        >
          Events & Kegiatan
        </h1>
        <p 
          v-motion
          :initial="{ opacity: 0, y: 50 }"
          :enter="{ opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, delay: 100 } }"
          class="mt-4 text-xl text-gibei-text max-w-2xl mx-auto"
        >
          Temukan arsip dan jadwal kegiatan terbaru kami. Selalu ada hal baru untuk dipelajari.
        </p>
      </div>
    </section>

    <!-- Section 2: Search Bar & Grid (WDD 3.1 & 4.2) -->
    <section class="py-20 md:py-28">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <!-- Search Bar -->
        <div 
          v-motion
          :initial="{ opacity: 0, y: 50 }"
          :enter="{ opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, delay: 200 } }"
          class="max-w-2xl mx-auto mb-16"
        >
          <label for="search" class="sr-only">Cari Event</label>
          <div class="relative">
            <!-- Ikon Search -->
            <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg class="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <!-- Input -->
            <input 
              v-model="searchQuery"
              type="text" 
              name="search" 
              id="search"
              class="block w-full font-inter pl-12 pr-4 py-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gibei-primary focus:border-transparent"
              placeholder="Cari event (cth: SPM, Workshop...)"
            >
          </div>
        </div>

        <!-- Grid untuk Kartu Event -->
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <EventCard 
            v-for="event in filteredEvents" 
            :key="event.id" 
            :event="event" 
          />
        </div>
        
        <!-- Pesan jika tidak ada hasil -->
        <div 
          v-if="filteredEvents.length === 0" 
          class="text-center py-16"
          v-motion
          :initial="{ opacity: 0 }"
          :enter="{ opacity: 1 }"
        >
          <h3 class="font-poppins text-2xl font-semibold text-gibei-primary">
            Event tidak ditemukan
          </h3>
          <p class="font-inter text-gibei-text mt-2">
            Coba gunakan kata kunci lain untuk event '{{ searchQuery }}'.
          </p>
        </div>

      </div>
    </section>

    <!-- 
      Section 3: Kalender (WDD 3.2) 
      (Akan kita tambahkan di iterasi berikutnya)
    -->

  </div>
</template>