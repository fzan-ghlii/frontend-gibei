<script setup>
import { ref, computed, onMounted } from 'vue'
import api from '../api'

const activeTab = ref('foto') // 'foto' atau 'video'
const isModalOpen = ref(false)
const currentImage = ref({ src: '', alt: '' })

const allGalleryItems = ref([])
const isLoading = ref(true)
const error = ref(null)

// --- FETCH DATA ---
const fetchGallery = async () => {
  try {
    isLoading.value = true
    const response = await api.get('/gallery')
    allGalleryItems.value = response.data
  } catch (err) {
    console.error('Gagal mengambil galeri:', err)
    error.value = 'Gagal memuat galeri.'
  } finally {
    isLoading.value = false
  }
}

// --- COMPUTED PROPERTIES ---
// Filter FOTO
const photoGallery = computed(() => {
  return allGalleryItems.value.filter(item => item.category === 'FOTO').map(item => ({
    id: item.id,
    src: item.imageUrl, // Backend: imageUrl
    alt: item.title,
    delay: 100 // Animasi standar
  }))
})

// Filter VIDEO
const videoGallery = computed(() => {
  return allGalleryItems.value.filter(item => item.category === 'VIDEO').map(item => ({
    id: item.id,
    // Pastikan URL video aman untuk embed
    embedUrl: getEmbedUrl(item.videoUrl), 
    title: item.title,
    // Thumbnail video bisa pakai imageUrl yang diupload user, atau placeholder
    thumbnail: item.imageUrl, 
    delay: 100
  }))
})

// Helper: Convert YouTube URL to Embed URL (jika admin salah input link biasa)
const getEmbedUrl = (url) => {
  if (!url) return ''
  if (url.includes('embed')) return url
  // Ubah watch?v= menjadi embed/
  const videoId = url.split('v=')[1]
  if (videoId) {
    const ampersandPosition = videoId.indexOf('&')
    if (ampersandPosition !== -1) {
      return `https://www.youtube.com/embed/${videoId.substring(0, ampersandPosition)}`
    }
    return `https://www.youtube.com/embed/${videoId}`
  }
  return url // Return as is if pattern not matched
}

// Logika Modal Lightbox
const openModal = (image) => {
  currentImage.value = image
  isModalOpen.value = true
}
const closeModal = () => {
  isModalOpen.value = false
}

onMounted(() => {
  fetchGallery()
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
          Galeri Kegiatan
        </h1>
        <p class="mt-4 text-xl text-gibei-text max-w-2xl mx-auto">
          Momen dan dokumentasi dari berbagai kegiatan GIBEI UNIMED.
        </p>
      </div>
    </section>

    <!-- Section 2: Tab dan Konten Galeri -->
    <section class="py-20 md:py-28">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <!-- Tab Switcher -->
        <div 
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

        <!-- Loading -->
        <div v-if="isLoading" class="text-center py-12">
          <svg class="animate-spin h-10 w-10 text-gibei-primary mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p class="mt-4 font-inter text-gibei-text">Memuat galeri...</p>
        </div>

        <!-- Error -->
        <div v-else-if="error" class="text-center py-12 text-red-500">
          {{ error }}
        </div>

        <!-- Konten Foto -->
        <div v-else-if="activeTab === 'foto'">
          <div v-if="photoGallery.length > 0" class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div
              v-for="photo in photoGallery"
              :key="photo.id"
              v-motion
              :initial="{ opacity: 0, y: 50 }"
              :visibleOnce="{ opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, delay: 100 } }"
              @click="openModal(photo)"
              class="bg-gray-200 rounded-lg shadow-lg overflow-hidden group cursor-pointer relative h-64"
            >
              <img 
                :src="photo.src" 
                :alt="photo.alt" 
                class="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
                onerror="this.src='https://placehold.co/600x400?text=Gagal+Muat'"
              >
              <!-- Overlay Judul saat Hover -->
              <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-end p-4">
                <p class="text-white font-poppins font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {{ photo.alt }}
                </p>
              </div>
            </div>
          </div>
          <div v-else class="text-center py-12 text-gibei-text">
            Belum ada foto di galeri.
          </div>
        </div>

        <!-- Konten Video -->
        <div v-else-if="activeTab === 'video'">
          <div v-if="videoGallery.length > 0" class="grid md:grid-cols-2 gap-8">
            <div
              v-for="video in videoGallery"
              :key="video.id"
              v-motion
              :initial="{ opacity: 0, y: 50 }"
              :visibleOnce="{ opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, delay: 100 } }"
              class="rounded-lg shadow-lg overflow-hidden bg-black"
            >
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
              <div class="p-4 bg-white">
                <h3 class="font-poppins font-bold text-lg text-gibei-primary">{{ video.title }}</h3>
              </div>
            </div>
          </div>
          <div v-else class="text-center py-12 text-gibei-text">
            Belum ada video di galeri.
          </div>
        </div>
      </div>
    </section>

    <!-- Modal Lightbox -->
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
        class="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center p-4 backdrop-blur-sm"
      >
        <div 
          class="relative max-w-5xl w-full max-h-full flex flex-col items-center"
          @click.stop
        >
          <button
            @click="closeModal"
            class="absolute -top-10 right-0 md:-right-10 text-white text-4xl font-bold opacity-70 hover:opacity-100 transition"
          >
            &times;
          </button>
          
          <img 
            :src="currentImage.src" 
            :alt="currentImage.alt" 
            class="rounded shadow-2xl max-w-full max-h-[80vh] object-contain"
          >
          <p class="text-white text-center font-inter mt-4 text-lg font-medium">
            {{ currentImage.alt }}
          </p>
        </div>
      </div>
    </transition>
  </div>
</template>

<style>
.aspect-w-16 {
  position: relative;
  width: 100%;
  padding-bottom: 56.25%;
}
.aspect-h-9 {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}
</style>