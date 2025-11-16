<script setup>
// PERBAIKAN: Menambahkan 'computed'
import { ref, computed } from 'vue'
import EventCard from '../components/EventCard.vue'

// ... (Logika Search) ...
const allEvents = ref([
  { id: 1, title: 'Sekolah Pasar Modal (SPM) Level 1', date: '20 DESEMBER 2025', description: 'Pelajari dasar-dasar investasi dan mekanisme pasar modal.', imageUrl: 'https://placehold.co/600x400/1a4162/ffffff?text=SPM+Level+1', link: '/spm', category: 'spm', delay: 100 },
  { id: 2, title: 'Workshop Analisis Teknikal', date: '25 DESEMBER 2025', description: 'Pahami cara membaca grafik dan mengambil keputusan investasi.', imageUrl: 'https://placehold.co/600x400/e6d9c6/333333?text=Workshop', link: '/events', category: 'workshop', delay: 200 },
  { id: 3, title: 'Webinar: Investasi Syariah', date: '30 DESEMBER 2025', description: 'Mengenal produk dan prinsip investasi yang sesuai syariah.', imageUrl: 'https://placehold.co/600x400/1a4162/ffffff?text=Investasi+Syariah', link: '/events', category: 'webinar', delay: 300 },
  { id: 4, title: 'Event Arsip: Kunjungan BEI 2024', date: '10 JANUARI 2024', description: 'Melihat langsung lantai bursa dan operasional BEI.', imageUrl: 'https://placehold.co/600x400/e6d9c6/333333?text=Arsip+Event', link: '/events', category: 'arsip', delay: 100 },
  { id: 5, title: 'Event Arsip: Trading Competition 2024', date: '15 FEBRUARI 2024', description: 'Kompetisi trading virtual untuk mahasiswa UNIMED.', imageUrl: 'https://placehold.co/600x400/1a4162/ffffff?text=Arsip+Event', link: '/events', category: 'arsip', delay: 200 },
])
const searchTerm = ref('')
const filteredEvents = computed(() => {
  if (!searchTerm.value) {
    return allEvents.value
  }
  return allEvents.value.filter(event => 
    event.title.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
    event.description.toLowerCase().includes(searchTerm.value.toLowerCase())
  )
})

// --- LOGIKA KALENDER (Dipindahkan ke sini) ---
const currentDate = ref(new Date())
const currentMonth = computed(() => currentDate.value.toLocaleString('id-ID', { month: 'long' }))
const currentYear = computed(() => currentDate.value.getFullYear())
const daysOfWeek = ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min']
const calendarDays = ref(Array.from({ length: 35 }, (_, i) => i + 1))
const events = ref([
  { day: 10, title: 'Webinar' },
  { day: 17, title: 'SPM L1' },
  { day: 25, title: 'Workshop' },
])
const isEventDay = (day) => events.value.some(e => e.day === day)
const getEventTitle = (day) => events.value.find(e => e.day === day)?.title
const isCurrentMonth = (day) => day <= 30 // Asumsi 30 hari
// --- AKHIR LOGIKA KALENDER ---
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
          Event & Kegiatan
        </h1>
        <p 
          v-motion
          :initial="{ opacity: 0, y: 50 }"
          :enter="{ opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, delay: 300 } }"
          class="mt-4 text-xl text-gibei-text max-w-2xl mx-auto"
        >
          Temukan dan daftar untuk kegiatan GIBEI UNIMED (WDD 3.1).
        </p>
      </div>
    </section>

    <!-- Section 2: Kalender Kegiatan (WDD 3.2) -->
    <section class="bg-white py-20 md:py-28">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div 
          v-motion
          :initial="{ opacity: 0, y: 50 }"
          :visibleOnce="{ opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } }"
          class="text-center mb-16"
        >
          <h2 class="font-poppins text-4xl md:text-5xl font-extrabold text-gibei-primary">
            Jadwal Kegiatan
          </h2>
          <p class="mt-4 text-lg text-gibei-text max-w-2xl mx-auto">
            Lihat jadwal lengkap kegiatan kami dalam tampilan kalender (WDD 3.2).
          </p>
        </div>
        
        <!-- UI KALENDER (Dipindahkan ke sini) -->
        <div
          class="bg-white p-6 md:p-8 rounded-lg shadow-xl overflow-hidden border border-gray-200"
          v-motion
          :initial="{ opacity: 0, y: 50 }"
          :visibleOnce="{ opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, delay: 200 } }"
        >
          <!-- Header Kalender -->
          <div class="flex justify-between items-center mb-6">
            <h3 class="font-poppins text-2xl font-bold text-gibei-primary">
              {{ currentMonth }} {{ currentYear }}
            </h3>
            <div class="flex space-x-2">
              <button class="w-10 h-10 flex items-center justify-center rounded-full text-gibei-primary bg-gibei-secondary hover:bg-opacity-70 transition-colors">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg>
              </button>
              <button class="w-10 h-10 flex items-center justify-center rounded-full text-gibei-primary bg-gibei-secondary hover:bg-opacity-70 transition-colors">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
              </button>
            </div>
          </div>
          <!-- Grid Kalender -->
          <div>
            <div class="grid grid-cols-7 gap-2 mb-3">
              <div v-for="day in daysOfWeek" :key="day" class="font-poppins font-semibold text-center text-gibei-primary text-sm uppercase">
                {{ day }}
              </div>
            </div>
            <div class="grid grid-cols-7 gap-2">
              <div
                v-for="day in calendarDays"
                :key="day"
                :class="[
                  'h-20 md:h-24 rounded-lg p-2 flex flex-col transition-all duration-300 border',
                  isCurrentMonth(day) ? 'bg-white border-gray-200' : 'bg-gray-50 border-gray-100 text-gray-400',
                  isEventDay(day) ? 'bg-gibei-secondary border-gibei-primary shadow-md' : ''
                ]"
              >
                <span class="font-inter font-semibold">{{ isCurrentMonth(day) ? day : (day - 30) }}</span>
                <div v-if="isEventDay(day)" class="mt-1 text-xs font-poppins font-medium bg-gibei-primary text-white rounded px-1.5 py-0.5 text-center overflow-hidden whitespace-nowrap text-ellipsis">
                  {{ getEventTitle(day) }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- AKHIR UI KALENDER -->
        
      </div>
    </section>

    <!-- Section 3: Daftar Event (WDD 3.1) -->
    <section class="bg-gibei-secondary py-20 md:py-28">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <!-- Header Section & Search Bar (WDD 4.2) -->
        <div 
          v-motion
          :initial="{ opacity: 0, y: 50 }"
          :visibleOnce="{ opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } }"
          class="text-center mb-12"
        >
          <h2 class="font-poppins text-4xl md:text-5xl font-extrabold text-gibei-primary">
            Daftar Event
          </h2>
          <p class="mt-4 text-lg text-gibei-text max-w-2xl mx-auto">
            Cari event yang Anda minati. Event baru, workshop, dan arsip kegiatan.
          </p>
          
          <!-- Search Bar -->
          <div class="mt-8 max-w-xl mx-auto">
            <input 
              v-model="searchTerm"
              type="text"
              placeholder="Cari event (cth: SPM, Workshop, Arsip...)"
              class="w-full font-inter px-6 py-4 rounded-lg shadow-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gibei-primary"
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

        <!-- Tampilan jika tidak ada hasil -->
        <div 
          v-if="filteredEvents.length === 0" 
          class="text-center py-16"
          v-motion
          :initial="{ opacity: 0 }"
          :enter="{ opacity: 1, transition: { delay: 100 } }"
        >
          <h3 class="font-poppins text-2xl font-semibold text-gibei-primary">
            Event tidak ditemukan
          </h3>
          <p class="font-inter text-gibei-text mt-2">
            Tidak ada event yang cocok dengan kata kunci '{{ searchTerm }}'.
          </p>
        </div>
        
        <!-- PENYEMPURNAAN: Tombol ini sekarang hanya untuk "Arsip" -->
        <div 
          v-motion
          :initial="{ opacity: 0, y: 50 }"
          :visibleOnce="{ opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, delay: 400 } }"
          class="text-center mt-16"
        >
          <button
            @click="searchTerm = 'Arsip'"
            class="inline-block bg-white text-gibei-primary font-poppins font-semibold px-8 py-3 rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-xl"
          >
            Lihat Event Arsip
          </button>
        </div>

      </div>
    </section>
  </div>
</template>