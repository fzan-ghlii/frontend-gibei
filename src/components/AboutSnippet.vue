<script setup>
// Komponen ini akan menampilkan cuplikan "Tentang Kami" di Halaman Utama
</script>

<template>
  <!-- 
    Section "Tentang Kami" (WDD 4.1)
    Menggunakan background putih
  -->
  <section class="bg-white py-20 md:py-28 overflow-hidden">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <div class="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
        
        <!-- Kolom Kiri: Teks Konten -->
        <div 
          v-motion
          :initial="{ opacity: 0, x: -100 }"
          :visibleOnce="{ opacity: 1, x: 0, transition: { type: 'spring', stiffness: 100, delay: 100 } }"
          class="space-y-6"
        >
          <span class="inline-block px-4 py-1 bg-gibei-secondary text-gibei-primary font-poppins font-semibold text-sm rounded-full">
            Tentang Kami
          </span>
          <h2 class="font-poppins text-4xl md:text-5xl font-extrabold text-gibei-primary">
            Mengenal GIBEI UNIMED
          </h2>
          <p class="font-inter text-lg text-gibei-text leading-relaxed">
            Galeri Investasi BEI Universitas Negeri Medan (GIBEI UNIMED) adalah pusat edukasi dan literasi pasar modal bagi seluruh civitas akademika UNIMED dan masyarakat umum.
          </p>
          <p class="font-inter text-lg text-gibei-text leading-relaxed">
            Kami berkomitmen untuk membangun generasi muda yang melek investasi, profesional, dan berintegritas.
          </p>
          <div>
            <a 
              href="#" 
              class="inline-block bg-gibei-primary text-white font-poppins font-semibold px-8 py-3 rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-xl"
            >
              Pelajari Lebih Lanjut
            </a>
          </div>
        </div>
        
        <!-- Kolom Kanan: Placeholder Gambar/Visual -->
        <div
          v-motion
          :initial="{ opacity: 0, x: 100 }"
          :visibleOnce="{ opacity: 1, x: 0, transition: { type: 'spring', stiffness: 100, delay: 200 } }"
          class="flex justify-center items-center"
        >
          <!-- Placeholder untuk gambar tim atau galeri -->
          <div class="w-full h-96 bg-gibei-secondary rounded-lg shadow-xl flex items-center justify-center">
            <span class="font-poppins text-gibei-primary text-2xl font-semibold">
              [Image Placeholder]
            </span>
          </div>
        </div>

      </div>

    </div>
  </section>
</template>