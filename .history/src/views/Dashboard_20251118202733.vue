<script setup>
import { ref } from 'vue'

// Placeholder untuk nama user
const userName = ref('Investor Muda')

// Placeholder untuk progres dan lencana
const investorProgress = ref(40) // Persentase progres
const badges = ref([
  { id: 1, name: 'Pendaftar Pertama', icon: 'M12 12l-8-4.5 8-4.5 8 4.5-8 4.5zM12 12v9', color: 'text-blue-500', achieved: true },
  { id: 2, name: 'Lulus SPM Level 1', icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z', color: 'text-green-500', achieved: true },
  { id: 3, name: 'Investor Aktif', icon: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6', color: 'text-gray-400', achieved: false },
  { id: 4, name: 'Pecinta Analisis', icon: 'M3 10h18M7 15h1m4 0h1m4 0h1M3 4h18M7 9h1m4 0h1m4 0h1', color: 'text-gray-400', achieved: false },
])

// Placeholder rekomendasi artikel
const recommendations = ref([
  { id: 1, title: 'Memahami Risiko dan Imbal Hasil', category: 'Analisis', link: '/artikel' },
  { id: 2, title: 'Psikologi Trading: Mengelola Emosi', category: 'Tips & Trik', link: '/artikel' },
])
</script>

<template>
  <div class="bg-white">
    <!-- Section 1: Page Header -->
    <section class="bg-gibei-secondary py-20 md:py-32">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 
          v-motion
          :initial="{ opacity: 0, y: 50 }"
          :enter="{ opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, delay: 200 } }"
          class="font-poppins text-5xl md:text-7xl font-extrabold text-gibei-primary"
        >
          Selamat Datang, {{ userName }}
        </h1>
        <p 
          v-motion
          :initial="{ opacity: 0, y: 50 }"
          :enter="{ opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, delay: 300 } }"
          class="mt-4 text-xl text-gibei-text max-w-2xl"
        >
          Ini adalah pusat kendali untuk perjalanan investasi Anda bersama GIBEI UNIMED.
        </p>
      </div>
    </section>

    <!-- Section 2: Konten Dashboard (Progress, Lencana, Rekomendasi) -->
    <section class="py-20 md:py-28">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-3 gap-12">
        
        <!-- Kolom Kiri: Progress & Lencana -->
        <div class="lg:col-span-2 space-y-12">
          
          <!-- Perjalanan Investor (Progress Bar) -->
          <div 
            v-motion
            :initial="{ opacity: 0, y: 50 }"
            :visibleOnce="{ opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, delay: 100 } }"
            class="bg-white p-8 rounded-lg shadow-xl border border-gray-200"
          >
            <h2 class="font-poppins text-3xl font-extrabold text-gibei-primary mb-6">
              Perjalanan Investor Anda
            </h2>
            <p class="font-inter text-gibei-text mb-4">
              Anda telah menyelesaikan <strong class="text-gibei-primary">{{ investorProgress }}%</strong> dari kurikulum dasar kami.
            </p>
            <div class="w-full bg-gibei-secondary rounded-full h-4 overflow-hidden">
              <div 
                class="bg-gibei-primary h-4 rounded-full transition-all duration-1000 ease-out" 
                :style="{ width: investorProgress + '%' }"
              ></div>
            </div>
            <p class="font-inter text-sm text-gibei-text mt-3">
              Langkah selanjutnya: Selesaikan <strong class="text-gibei-primary">Workshop Analisis Teknikal</strong>.
            </p>
          </div>

          <!-- Lencana Anda (Badges) -->
          <div 
            v-motion
            :initial="{ opacity: 0, y: 50 }"
            :visibleOnce="{ opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, delay: 200 } }"
          >
            <h2 class="font-poppins text-3xl font-extrabold text-gibei-primary mb-6">
              Lencana Anda
            </h2>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div 
                v-for="badge in badges" 
                :key="badge.id"
                :class="[
                  'text-center p-6 rounded-lg shadow-lg transition-all duration-300',
                  badge.achieved ? 'bg-white border-gibei-primary border-2' : 'bg-gray-100 opacity-60'
                ]"
              >
                <svg 
                  :class="['w-16 h-16 mx-auto mb-3', badge.achieved ? badge.color : 'text-gray-400']"
                  fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="badge.icon"></path>
                </svg>
                <h3 class="font-poppins font-semibold text-gibei-primary">
                  {{ badge.name }}
                </h3>
              </div>
            </div>
          </div>
        </div>

        <!-- Kolom Kanan: Rekomendasi -->
        <div 
          v-motion
          :initial="{ opacity: 0, y: 50 }"
          :visibleOnce="{ opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, delay: 300 } }"
          class="bg-gibei-secondary p-8 rounded-lg shadow-xl"
        >
          <h2 class="font-poppins text-3xl font-extrabold text-gibei-primary mb-6">
            Rekomendasi Untukmu
          </h2>
          <div class="space-y-6">
            <router-link 
              v-for="rec in recommendations" 
              :key="rec.id" 
              :to="rec.link"
              class="block p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow group"
            >
              <span class="block font-poppins text-xs font-semibold text-gibei-primary uppercase tracking-wide">
                {{ rec.category }}
              </span>
              <h4 class="font-poppins font-bold text-lg text-gibei-primary group-hover:underline">
                {{ rec.title }}
              </h4>
            </router-link>
            
            <router-link 
              to="/artikel" 
              class="inline-block mt-4 font-inter font-semibold text-gibei-primary hover:underline"
            >
              Lihat semua artikel &rarr;
            </router-link>
          </div>
        </div>

      </div>
    </section>
  </div>
</template>