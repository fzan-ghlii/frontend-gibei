<script setup>
import { ref } from 'vue'

// Placeholder untuk info kontak
const contactDetails = ref([
  { 
    id: 1, 
    name: 'Alamat', 
    value: 'Gedung Fakultas Ekonomi Lt. 3, Universitas Negeri Medan. Jl. Willem Iskandar, Pasar V, Medan Estate.',
    icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z;M12 11a2 2 0 100-4 2 2 0 000 4z', // Map Pin
    delay: 100
  },
  { 
    id: 2, 
    name: 'Email Resmi', 
    value: 'gibeiunimed@gmail.com',
    icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z', // Mail
    delay: 200
  },
  { 
    id: 3, 
    name: 'Media Sosial', 
    value: '@gibei_unimed (Instagram)',
    icon: 'M13.589 10.589c-.552 2.652-2.385 4.485-5.037 4.937A5.991 5.991 0 013 18.001V21A9 9 0 0012 3a9 9 0 00-9 9c0 2.227.807 4.269 2.152 5.861l.001.001c.52.593 1.1 1.13 1.745 1.583C7.68 20.182 8.79 21 10 21h1a9 9 0 008.816-7.348l.002-.005C19.782 11.231 17.5 8.218 14.5 7c-1.944-.803-3.665-.79-5.111.134a4.408 4.408 0 00-1.8 2.302A4.43 4.43 0 008.118 10a4.43 4.43 0 002.47 1.488A4.41 4.41 0 0013.59 10.59z', // Placeholder icon
    delay: 300
  },
])
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
          Hubungi Kami
        </h1>
        <p 
          v-motion
          :initial="{ opacity: 0, y: 50 }"
          :enter="{ opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, delay: 100 } }"
          class="mt-4 text-xl text-gibei-text max-w-2xl mx-auto"
        >
          Kami siap mendengar dari Anda. Hubungi kami melalui detail di bawah ini.
        </p>
      </div>
    </section>

    <!-- Section 2: Info Kontak & Peta (WDD 7.0) -->
    <section class="py-20 md:py-28 overflow-hidden">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-16">
          
          <!-- Kolom Kiri: Detail Kontak -->
          <div 
            v-motion
            :initial="{ opacity: 0, x: -100 }"
            :visibleOnce="{ opacity: 1, x: 0, transition: { type: 'spring', stiffness: 100, delay: 200 } }"
          >
            <h2 class="font-poppins text-4xl font-extrabold text-gibei-primary mb-8">
              Info Kontak
            </h2>
            <div class="space-y-8">
              <div 
                v-for="detail in contactDetails" 
                :key="detail.id"
                class="flex items-start gap-4"
              >
                <!-- Ikon -->
                <div class="flex-shrink-0 w-12 h-12 bg-gibei-secondary rounded-lg flex items-center justify-center">
                  <svg class="w-6 h-6 text-gibei-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="detail.icon" :fill-rule="detail.id === 1 ? 'evenodd' : 'nonzero'" :clip-rule="detail.id === 1 ? 'evenodd' : 'nonzero'"></path>
                  </svg>
                </div>
                <!-- Teks -->
                <div>
                  <h3 class="font-poppins text-xl font-semibold text-gibei-primary">
                    {{ detail.name }}
                  </h3>
                  <p class="font-inter text-base text-gibei-text mt-1">
                    {{ detail.value }}
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Kolom Kanan: Peta Lokasi (Placeholder) -->
          <div 
            v-motion
            :initial="{ opacity: 0, x: 100 }"
            :visibleOnce="{ opacity: 1, x: 0, transition: { type: 'spring', stiffness: 100, delay: 400 } }"
          >
            <h2 class="font-poppins text-4xl font-extrabold text-gibei-primary mb-8">
              Lokasi Kami
            </h2>
            <div class="w-full h-96 bg-gray-200 rounded-lg shadow-lg overflow-hidden">
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3981.911792581306!2d98.71876687475046!3d3.6076609501635124!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x303131f9c4c9e00b%3A0x28bede3d7025647f!2sGaleri%20Investasi%20FE%20UNIMED!5e0!3m2!1sid!2sid!4v1763281171510!5m2!1sid!2sid" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
              <div class="w-full h-full flex items-center justify-center bg-gibei-secondary">
                <span class="font-poppins text-gibei-primary">[Placeholder Google Maps: Fakultas Ekonomi UNIMED]</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>

  </div>
</template>