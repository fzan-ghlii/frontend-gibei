<script setup>
// Ini adalah halaman "Tentang Kami" (WDD 3.0)
// Kita mulai dengan section "Sejarah & Visi Misi"
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
          Tentang Kami
        </h1>
        <p 
          v-motion
          :initial="{ opacity: 0, y: 50 }"
          :enter="{ opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, delay: 100 } }"
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
          <div class="w-full h-96 bg-gibei-primary rounded-lg shadow-xl flex items-center justify-center p-8">
            <span class="font-poppins text-white text-2xl font-semibold text-center">
              [Image Placeholder: Gedung FE / Acara Peresmian]
            </span>
          </div>
        </div>

      </div>
    </section>

    <!-- Section "Struktur Organisasi" dan "Mitra Kami" akan ditambahkan di sini nanti -->
  </div>
</template>