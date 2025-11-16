<script setup>
// PENYEMPURNAAN: Menghapus 'computed' yang tidak terpakai
import { ref } from 'vue'

const activeTab = ref('foto') // 'foto' atau 'video'
const isModalOpen = ref(false)
const currentImage = ref({ src: '', alt: '' })

// Data Placeholder
const photoGallery = ref([
  { id: 1, src: 'https://placehold.co/600x400/1a4162/ffffff?text=SPM+2025', alt: 'Galeri Foto SPM 2025', category: 'SPM', delay: 100 },
  { id: 2, src: 'https://placehold.co/600x400/e6d9c6/333333?text=Workshop', alt: 'Galeri Foto Workshop Teknikal', category: 'Workshop', delay: 200 },
  { id: 3, src: 'https://placehold.co/600x400/1a4162/ffffff?text=Kunjungan+BEI', alt: 'Galeri Foto Kunjungan BEI', category: 'Kunjungan', delay: 300 },
  { id: 4, src: 'https://placehold.co/600x400/e6d9c6/333333?text=Webinar+2025', alt: 'Galeri Foto Webinar 2025', category: 'Webinar', delay: 100 },
  { id: 5, src: 'https://placehold.co/600x400/1a4162/ffffff?text=Trading+Comp', alt: 'Galeri Foto Trading Competition', category: 'Kompetisi', delay: 200 },
  { id: 6, src: 'https://placehold.co/600x400/e6d9c6/333333?text=Edukasi+Publik', alt: 'Galeri Foto Edukasi Publik', category: 'Edukasi', delay: 300 },
])

const videoGallery = ref([
  { id: 1, embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', title: 'Video: Apa itu Saham?', delay: 100 },
  { id: 2, embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', title: 'Video: Recap SPM 2025', delay: 200 },
])

// Logika Modal Lightbox
const openModal = (image) => {
  currentImage.value = image
  isModalOpen.value = true
}
const closeModal = () => {
  isModalOpen.value = false
}
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
          Galeri Kegiatan
        </h1>
        <p 
          v-motion
          :initial="{ opacity: 0, y: 50 }"
          :enter="{ opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, delay: 300 } }"
          class="mt-4 text-xl text-gibei-text max-w-2xl mx-auto"
        >
          Momen dan dokumentasi dari berbagai kegiatan GIBEI UNIMED.
        </p>
      </div>
    </section>

    <!-- Section 2: Tab dan Konten Galeri -->
    <section class="py-20 md:py-28">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <!-- Tab Switcher (Foto/Video) -->
        <div 
          v-motion
          :initial="{ opacity: 0, y: 50 }"
          :visibleOnce="{ opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } }"
          class="flex justify-center gap-4 mb-16"
        >
          <button
            @click="activeTab = 'foto'"
            :class="[
              'font-poppins font-semibold text-lg px-8 py-3 rounded-lg shadow-md transition-all duration-300 transform hover:scale-105',
              activeTab === 'foto'
                ? 'bg-gibei-primary text-white'
                : 'bg-white text-gibei-primary border border-gray-300 hover:bg-gray-100'
            ]"
          >
            Galeri Foto
          </button>
          <button
            @click="activeTab = 'video'"
            :class="[
              'font-poppins font-semibold text-lg px-8 py-3 rounded-lg shadow-md transition-all duration-300 transform hover:scale-105',
              activeTab === 'video'
                ? 'bg-gibei-primary text-white'
                : 'bg-white text-gibei-primary border border-gray-300 hover:bg-gray-100'
            ]"
          >
            Galeri Video
          </button>
        </div>

        <!-- Konten Galeri Foto -->
        <div v-if="activeTab === 'foto'">
          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div
              v-for="photo in photoGallery"
              :key="photo.id"
              v-motion
              :initial="{ opacity: 0, y: 50 }"
              :visibleOnce="{ opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, delay: photo.delay } }"
              @click="openModal(photo)"
              class="bg-gray-200 rounded-lg shadow-lg overflow-hidden group cursor-pointer"
            >
              <img 
                :src="photo.src" 
                :alt="photo.alt" 
                class="w-full h-64 object-cover transform transition-transform duration-500 group-hover:scale-110"
              >
            </div>
          </div>
        </div>

        <!-- Konten Galeri Video (WDD 3.0) -->
        <div v-if="activeTab === 'video'">
          <div class="grid md:grid-cols-2 gap-8">
            <div
              v-for="video in videoGallery"
              :key="video.id"
              v-motion
              :initial="{ opacity: 0, y: 50 }"
              :visibleOnce="{ opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, delay: video.delay } }"
              class="rounded-lg shadow-lg overflow-hidden"
            >
              <!-- Wrapper untuk rasio 16:9 -->
              <div class="aspect-w-16 aspect-h-9">
                <iframe 
                  :src="video.embedUrl" 
                  :title="video.title" 
                  frameborder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowfullscreen
                  class="w-full h-full"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Modal Lightbox (untuk Foto) -->
    <transition
      enter-active-class="transition-opacity ease-out duration-300"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity ease-in duration-200"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div 
        v-if="isModalOpen" 
        @click="closeModal" 
        class="fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center p-4"
      >
        <div 
          class="relative max-w-3xl max-h-full"
          @click.stop
        >
          <!-- Tombol Close -->
          <button
            @click="closeModal"
            class="absolute -top-12 right-0 text-white text-4xl font-bold opacity-70 hover:opacity-100 transition"
          >
            &times;
          </button>
          
          <!-- Gambar yang Diperbesar -->
          <img 
            :src="currentImage.src" 
            :alt="currentImage.alt" 
            class="rounded-lg shadow-2xl max-w-full max-h-[80vh] object-contain"
          >
          
          <!-- Keterangan Gambar -->
          <p class="text-white text-center font-inter mt-4 opacity-80">
            {{ currentImage.alt }}
          </p>
        </div>
      </div>
    </transition>
  </div>
</template>

<style>
/* Utility class untuk rasio aspek video (Tailwind tidak punya ini by default) */
.aspect-w-16 {
  position: relative;
  width: 100%;
  padding-bottom: 56.25%; /* 16:9 */
}
.aspect-h-9 {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}
</style>