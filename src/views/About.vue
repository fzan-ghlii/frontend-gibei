<script setup>
import { ref } from 'vue'
import ProfileCard from '../components/ProfileCard.vue'

// PERBAIKAN: Mengganti placeholder gambar (WDD 5.4)
const placeholderImg = 'https://placehold.co/128x128/e6d9c6/333333?text=Foto'
const pembina = ref([
  { id: 'p1', name: 'Dita Eka Pertiwi Sirait, S.E., M.Si.', title: 'Pembina GIBEI UNIMED', imageUrl: 'https://source.unsplash.com/128x128/?woman,professional,portrait', delay: 100 },
])
const presidium = ref([
  { id: 'bph1', name: 'Andrian', title: 'Presiden Direktur', imageUrl: 'https://source.unsplash.com/128x128/?man,professional,portrait', delay: 100 },
  { id: 'bph2', name: 'Noubel Putra Nainggolan', title: 'Wakil Direktur', imageUrl: 'https://source.unsplash.com/128x128/?man,portrait,professional', delay: 200 },
  { id: 'bph3', name: 'Suci Ramadani', title: 'Sekretaris Jendral', imageUrl: 'https://source.unsplash.com/128x128/?woman,portrait,professional', delay: 300 },
  { id: 'bph4', name: 'Valentina Rentauli Siringo Ringo', title: 'Bendahara Umum', imageUrl: 'https://source.unsplash.com/128x128/?woman,professional,portrait', delay: 400 },
])
const divisions = ref([
  {
    name: 'Divisi Kegiatan',
    members: [
      { id: 'dk1', name: 'Artika Wulandari', title: 'Kepala Divisi', imageUrl: placeholderImg, delay: 100 },
      { id: 'dk2', name: 'Vailimlim Simamora', title: 'Anggota Divisi', imageUrl: placeholderImg, delay: 200 },
      { id: 'dk3', name: 'Sutria Evi Fania', title: 'Anggota Divisi', imageUrl: placeholderImg, delay: 300 },
      { id: 'dk4', name: 'Saniah Lidiya Hawani', title: 'Anggota Divisi', imageUrl: placeholderImg, delay: 400 },
      { id: 'dk5', name: 'Peter Nov Barus', title: 'Anggota Divisi', imageUrl: placeholderImg, delay: 500 },
      { id: 'dk6', name: 'Ruwinah Rahmanda', title: 'Anggota Divisi', imageUrl: placeholderImg, delay: 600 },
      { id: 'dk7', name: 'Muhammad Ariel', title: 'Anggota Divisi', imageUrl: placeholderImg, delay: 700 },
    ]
  },
  {
    name: 'Divisi Investasi',
    members: [
      { id: 'di1', name: 'Muhammad Ilyas Sapawi', title: 'Kepala Divisi', imageUrl: placeholderImg, delay: 100 },
      { id: 'di2', name: 'Fauzan Al Gholi', title: 'Wakil Kepala Divisi', imageUrl: placeholderImg, delay: 200 },
      { id: 'di3', name: 'Annisa Alfathanasya', title: 'Anggota Divisi', imageUrl: placeholderImg, delay: 300 },
      { id: 'di4', name: 'Desi Afriyani', title: 'Anggota Divisi', imageUrl: placeholderImg, delay: 400 },
      { id: 'di5', name: 'Radhika Narwastu', title: 'Anggota Divisi', imageUrl: placeholderImg, delay: 500 },
      { id: 'di6', name: 'Arief Zaidan Ramadinata', title: 'Anggota Divisi', imageUrl: placeholderImg, delay: 600 },
    ]
  },
  {
    name: 'Divisi Media',
    members: [
      { id: 'dm1', name: 'Joice Omasi Angelita Harefa', title: 'Kepala Divisi', imageUrl: placeholderImg, delay: 100 },
      { id: 'dm2', name: 'Fihrna Karin Br Pinem', title: 'Wakil Kepala Divisi', imageUrl: placeholderImg, delay: 200 },
      { id: 'dm3', name: 'Maya Martiza Sari', title: 'Anggota Divisi', imageUrl: placeholderImg, delay: 300 },
      { id: 'dm4', name: 'Joanna Brigitta, S.', title: 'Anggota Divisi', imageUrl: placeholderImg, delay: 400 },
      { id: 'dm5', name: 'Mismauli Nainggolan', title: 'Anggota Divisi', imageUrl: placeholderImg, delay: 500 },
      { id: 'dm6', name: 'Annisa Handayani', title: 'Anggota Divisi', imageUrl: placeholderImg, delay: 600 },
      { id: 'dm7', name: 'M. Reza Firmansyah', title: 'Anggota Divisi', imageUrl: placeholderImg, delay: 700 },
      { id: 'dm8', name: 'Ribka Intan Marini Sitorus', title: 'Anggota Divisi', imageUrl: placeholderImg, delay: 800 },
    ]
  },
  {
    name: 'Divisi HRD',
    members: [
      { id: 'hrd1', name: 'Andini Aulia', title: 'Kepala Divisi', imageUrl: placeholderImg, delay: 100 },
      { id: 'hrd2', name: 'Fikri Alfahmi Siregar', title: 'Wakil Kepala Divisi', imageUrl: placeholderImg, delay: 200 },
      { id: 'hrd3', name: 'M. Ifrandi Syahputra', title: 'Anggota Divisi', imageUrl: placeholderImg, delay: 300 },
      { id: 'hrd4', name: 'Cecilia Miranda Br. Lumban Gaol', title: 'Anggota Divisi', imageUrl: placeholderImg, delay: 400 },
      { id: 'hrd5', name: 'Vennia Artamevia Br. Sembiring', title: 'Anggota Divisi', imageUrl: placeholderImg, delay: 500 },
      { id: 'hrd6', name: 'Muhammad Zikri', title: 'Anggota Divisi', imageUrl: placeholderImg, delay: 600 },
      { id: 'hrd7', name: 'Vina Lestari Br. Ginting', title: 'Anggota Divisi', imageUrl: placeholderImg, delay: 700 },
    ]
  },
  {
    name: 'Divisi Galeri',
    members: [
      { id: 'dg1', name: 'Fanhas Abdul Rahman', title: 'Kepala Divisi', imageUrl: placeholderImg, delay: 100 },
      { id: 'dg2', name: 'Laoren Valerina Sinaga', title: 'Wakil Kepala Divisi', imageUrl: placeholderImg, delay: 200 },
      { id: 'dg3', name: 'Putri Sandrina Sitompul', title: 'Anggota Divisi', imageUrl: placeholderImg, delay: 300 },
      { id: 'dg4', name: 'Wiko Prayoga', title: 'Anggota Divisi', imageUrl: placeholderImg, delay: 400 },
      { id: 'dg5', name: 'Anita Br Saragih', title: 'Anggota Divisi', imageUrl: placeholderImg, delay: 500 },
      { id: 'dg6', name: 'Aurora Aqma Zahira Batubara', title: 'Anggota Divisi', imageUrl: placeholderImg, delay: 600 },
    ]
  }
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
          :enter="{ opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, delay: 200 } }"
          class="font-poppins text-5xl md:text-7xl font-extrabold text-gibei-primary"
        >
          Tentang Kami
        </h1>
        <p 
          v-motion
          :initial="{ opacity: 0, y: 50 }"
          :enter="{ opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, delay: 300 } }"
          class="mt-4 text-xl text-gibei-text max-w-2xl mx-auto"
        >
          Mengenal lebih dekat GIBEI UNIMED, pusat edukasi dan literasi pasar modal.
        </p>
      </div>
    </section>

    <!-- Section 2: Sejarah & Visi Misi (WDD 3.0) -->
    <section class="py-20 md:py-28 overflow-hidden">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-12 md:gap-16 items-center">
        
        <!-- Kolom Kiri: Teks Konten -->
        <div 
          v-motion
          :initial="{ opacity: 0, x: -100 }"
          :visibleOnce="{ opacity: 1, x: 0, transition: { type: 'spring', stiffness: 100, delay: 100 } }"
          class="space-y-8"
        >
          <div>
            <h2 class="font-poppins text-3xl md:text-4xl font-extrabold text-gibei-primary">
              Sejarah Singkat
            </h2>
            <p class="mt-4 font-inter text-lg text-gibei-text leading-relaxed">
              [Placeholder] GIBEI UNIMED didirikan pada [Tahun] sebagai hasil kerja sama antara Universitas Negeri Medan, Bursa Efek Indonesia, dan [Nama Sekuritas]. Sejak awal, kami berfokus untuk menjadi...
            </p>
          </div>
          
          <div>
            <h2 class="font-poppins text-3xl md:text-4xl font-extrabold text-gibei-primary">
              Visi & Misi
            </h2>
            <p class="mt-4 font-inter text-lg text-gibei-text font-bold">Visi:</p>
            <p class="font-inter text-lg text-gibei-text leading-relaxed">
              "Menjadi pusat informasi, edukasi, dan registrasi digital yang terintegrasi, profesional, dan nyaman digunakan." (WDD 1.1)
            </p>
            <p class="mt-4 font-inter text-lg text-gibei-text font-bold">Misi:</p>
            <ul class="list-disc list-inside mt-2 font-inter text-lg text-gibei-text leading-relaxed space-y-1">
              <li>Membangun citra GIBEI UNIMED yang profesional dan kredibel.</li>
              <li>Menjadi arsip digital terpusat untuk semua kegiatan.</li>
              <li>Meningkatkan kualitas pendaftar SPM dan event lainnya.</li>
            </ul>
          </div>
        </div>
        
        <!-- Kolom Kanan: Placeholder Gambar/Visual -->
        <div
          v-motion
          :initial="{ opacity: 0, x: 100 }"
          :visibleOnce="{ opacity: 1, x: 0, transition: { type: 'spring', stiffness: 100, delay: 200 } }"
          class="flex justify-center items-center"
        >
          <!-- PERBAIKAN: Mengganti placeholder (WDD 5.4) -->
          <img 
            src="https://source.unsplash.com/800x600/?university,building" 
            alt="Gedung Fakultas Ekonomi UNIMED"
            class="w-full h-96 object-cover rounded-lg shadow-xl"
          >
        </div>

      </div>
    </section>

    <!-- Section 3: Struktur Organisasi -->
    <section class="bg-gibei-secondary py-20 md:py-28">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div 
          v-motion
          :initial="{ opacity: 0, y: 50 }"
          :visibleOnce="{ opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } }"
          class="text-center mb-16"
        >
          <h2 class="font-poppins text-4xl md:text-5xl font-extrabold text-gibei-primary">
            Struktur Organisasi
          </h2>
          <p class="mt-4 text-lg text-gibei-text max-w-2xl mx-auto">
            Tim profesional di balik operasional GIBEI UNIMED.
          </p>
        </div>

        <!-- Kategori: Pembina -->
        <div class="mb-16">
          <h3 class="font-poppins text-3xl font-bold text-gibei-primary mb-8 text-center">
            Pembina
          </h3>
          <div class="flex justify-center">
            <div class="w-full max-w-xs">
              <ProfileCard
                v-for="member in pembina"
                :key="member.id"
                :member="member"
              />
            </div>
          </div>
        </div>

        <!-- Kategori: Presidium -->
        <div class="mb-16">
          <h3 class="font-poppins text-3xl font-bold text-gibei-primary mb-8 text-center">
            Presidium
          </h3>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
            <ProfileCard
              v-for="member in presidium"
              :key="member.id"
              :member="member"
            />
          </div>
        </div>
        
        <!-- Kategori: Divisi-Divisi -->
        <div 
          v-for="division in divisions" 
          :key="division.name" 
          class="mb-16"
        >
          <h3 class="font-poppins text-3xl font-bold text-gibei-primary mb-8 text-center">
            {{ division.name }}
          </h3>
          
          <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
            <ProfileCard
              v-for="member in division.members"
              :key="member.id"
              :member="member"
            />
          </div>
        </div>
        
      </div>
    </section>

    <!-- Section 4: Mitra Kami -->
    <section class="bg-white py-20 md:py-28">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div 
          v-motion
          :initial="{ opacity: 0, y: 50 }"
          :visibleOnce="{ opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } }"
          class="text-center mb-16"
        >
          <h2 class="font-poppins text-4xl md:text-5xl font-extrabold text-gibei-primary">
            Mitra Kami
          </h2>
          <p class="mt-4 text-lg text-gibei-text max-w-2xl mx-auto">
            Didukung oleh institusi terpercaya di Indonesia.
          </p>
        </div>

        <!-- PERBAIKAN: Mengganti placeholder <img> dengan SVG placeholder (WDD 5.4) -->
        <div 
          v-motion
          :initial="{ opacity: 0, y: 50 }"
          :visibleOnce="{ opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, delay: 200 } }"
          class="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12 items-center"
        >
          
          <!-- Logo UNIMED Placeholder -->
          <div class="flex justify-center">
            <div class="w-48 h-16 flex items-center justify-center bg-gray-100 rounded text-gray-400 font-poppins font-semibold opacity-70 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0">
              LOGO UNIMED
            </div>
          </div>
          
          <!-- Logo BEI Placeholder -->
          <div class="flex justify-center">
            <div class="w-48 h-16 flex items-center justify-center bg-gray-100 rounded text-gray-400 font-poppins font-semibold opacity-70 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0">
              LOGO BEI
            </div>
          </div>
          
          <!-- Logo Sekuritas Placeholder -->
          <div class="flex justify-center col-span-2 md:col-span-1">
            <div class="w-48 h-16 flex items-center justify-center bg-gray-100 rounded text-gray-400 font-poppins font-semibold opacity-70 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0">
              LOGO SEKURITAS
            </div>
          </div>

        </div>

      </div>
    </section>

  </div>
</template>