<script setup>
import { ref, computed, onMounted } from 'vue'
import EventCard from '../components/EventCard.vue'
import EventCardSkeleton from '../components/EventCardSkeleton.vue'
import api from '../api'

// State
const allEvents = ref([])
const isLoading = ref(true)
const error = ref(null)

const searchTerm = ref('')

// --- FETCH DATA ---
const fetchEvents = async () => {
  try {
    isLoading.value = true
    const response = await api.get('/events')
    
    // Mapping data backend ke frontend
    allEvents.value = response.data.map(event => ({
      id: event.id,
      title: event.title,
      // Format tanggal ke format Indonesia (cth: 20 Desember 2025)
      date: new Date(event.date).toLocaleDateString('id-ID', { 
        day: 'numeric', month: 'long', year: 'numeric' 
      }).toUpperCase(),
      description: event.description,
      imageUrl: event.imageUrl || 'https://placehold.co/600x400?text=Event+GIBEI',
      link: '/events', // Bisa diarahkan ke detail page /events/:id nanti
      category: 'event', // Default category
      delay: 100
    }))
  } catch (err) {
    console.error('Gagal mengambil events:', err)
    error.value = 'Gagal memuat daftar event.'
  } finally {
    setTimeout(() => isLoading.value = false, 500)
  }
}

// Filter Pencarian
const filteredEvents = computed(() => {
  if (!searchTerm.value) {
    return allEvents.value
  }
  return allEvents.value.filter(event => 
    event.title.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
    event.description.toLowerCase().includes(searchTerm.value.toLowerCase())
  )
})

// --- LOGIKA KALENDER (Visual Saja) ---
const currentDate = ref(new Date())
const currentMonth = computed(() => currentDate.value.toLocaleString('id-ID', { month: 'long' }))
const currentYear = computed(() => currentDate.value.getFullYear())
const daysOfWeek = ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min']
const calendarDays = ref(Array.from({ length: 35 }, (_, i) => i + 1))
const events = ref([
  { day: 10, title: 'Webinar' },
  { day: 20, title: 'SPM' },
])
const isEventDay = (day) => events.value.some(e => e.day === day)
const getEventTitle = (day) => events.value.find(e => e.day === day)?.title
const isCurrentMonth = (day) => day <= 30 

onMounted(() => {
  fetchEvents()
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
          Temukan dan daftar untuk kegiatan GIBEI UNIMED.
        </p>
      </div>
    </section>

    <!-- Section 2: Kalender (Placeholder Visual) -->
    <section class="bg-white py-20 md:py-28">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="font-poppins text-4xl md:text-5xl font-extrabold text-gibei-primary">
            Jadwal Kegiatan
          </h2>
          <p class="mt-4 text-lg text-gibei-text max-w-2xl mx-auto">
            Pantau jadwal kegiatan kami bulan ini.
          </p>
        </div>
        
        <!-- UI KALENDER -->
        <div class="bg-white p-6 md:p-8 rounded-lg shadow-xl overflow-hidden border border-gray-200">
          <div class="flex justify-between items-center mb-6">
            <h3 class="font-poppins text-2xl font-bold text-gibei-primary">
              {{ currentMonth }} {{ currentYear }}
            </h3>
            <div class="flex space-x-2">
              <button class="w-10 h-10 flex items-center justify-center rounded-full bg-gibei-secondary text-gibei-primary hover:bg-opacity-70">
                &lt;
              </button>
              <button class="w-10 h-10 flex items-center justify-center rounded-full bg-gibei-secondary text-gibei-primary hover:bg-opacity-70">
                &gt;
              </button>
            </div>
          </div>
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
      </div>
    </section>

    <!-- Section 3: Daftar Event -->
    <section class="bg-gibei-secondary py-20 md:py-28">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div class="text-center mb-12">
          <h2 class="font-poppins text-4xl md:text-5xl font-extrabold text-gibei-primary">
            Daftar Event
          </h2>
          
          <!-- Search Bar -->
          <div class="mt-8 max-w-xl mx-auto">
            <input 
              v-model="searchTerm"
              type="text"
              placeholder="Cari event..."
              class="w-full font-inter px-6 py-4 rounded-lg shadow-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gibei-primary"
            >
          </div>
        </div>

        <!-- Loading State -->
        <div v-if="isLoading" class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <EventCardSkeleton v-for="n in 3" :key="n" />
        </div>

        <!-- Error State -->
        <div v-else-if="error" class="text-center py-16 text-red-500">
          {{ error }}
          <button @click="fetchEvents" class="block mx-auto mt-4 underline">Coba Lagi</button>
        </div>

        <!-- Grid Event -->
        <div v-else-if="filteredEvents.length > 0" class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <EventCard 
            v-for="event in filteredEvents" 
            :key="event.id" 
            :event="event" 
          />
        </div>

        <!-- Empty State -->
        <div v-else class="text-center py-16">
          <h3 class="font-poppins text-2xl font-semibold text-gibei-primary">
            Event tidak ditemukan
          </h3>
        </div>

      </div>
    </section>
  </div>
</template>