<script setup>
// Daftar menu untuk footer, bisa disesuaikan
const footerLinks = {
  jelajahi: [
    { name: 'Events', href: '#' },
    { name: 'Artikel', href: '#' },
    { name: 'SPM', href: '#' },
    { name: 'Galeri', href: '#' },
  ],
  organisasi: [
    { name: 'Tentang Kami', href: '#' },
    { name: 'Struktur Organisasi', href: '#' },
    { name: 'Mitra Kami', href: '#' },
  ],
  kontak: [
    { name: 'Kontak', href: '#' },
    { name: 'Lokasi', href: '#' },
  ],
}

const socialLinks = [
  { name: 'Instagram', href: '#', icon: 'M12 3C8.1 3 7.8 2.97 6.6 2.9C5.4 2.8 4.6 2.6 3.9 2.3C3.2 2 2.6 1.6 2 1C1.4 0.4 1  -0.2 0.7 -0.9C0.4 -1.6 0.2 -2.4 0.1 -3.6C0 -4.8 -0.03 -5.1 -0.03 -9S-0 -13.2 0.1 -14.4C0.2 -15.6 0.4 -16.4 0.7 -17.1C1 -17.8 1.4 -18.4 2 -19C2.6 -19.6 3.2 -20 3.9 -20.3C4.6 -20.6 5.4 -20.8 6.6 -20.9C7.8 -21 8.1 -21.03 12 -21.03S16.2 -21 17.4 -20.9C18.6 -20.8 19.4 -20.6 20.1 -20.3C20.8 -20 21.4 -19.6 22 -19C22.6 -18.4 23 -17.8 23.3 -17.1C23.6 -16.4 23.8 -15.6 23.9 -14.4C24 -13.2 24.03 -12.9 24.03 -9S24 -4.8 23.9 -3.6C23.8 -2.4 23.6 -1.6 23.3 -0.9C23 -0.2 22.6 0.4 22 1C21.4 1.6 20.8 2 20.1 2.3C19.4 2.6 18.6 2.8 17.4 2.9C16.2 2.97 15.9 3 12 3ZM12 -2.1C16.1 -2.1 16.4 -2.13 17.6 -2.19C18.7 -2.25 19.3 -2.4 19.8 -2.6C20.3 -2.8 20.7 -3.1 21.1 -3.5C21.5 -3.9 21.8 -4.3 22 -4.8C22.2 -5.3 22.4 -5.9 22.5 -7C22.6 -8.2 22.6 -8.5 22.6 -12S22.6 -15.8 22.5 -17C22.4 -18.1 22.2 -18.7 22 -19.2C21.8 -19.7 21.5 -20.1 21.1 -20.5C20.7 -20.9 20.3 -21.2 19.8 -21.4C19.3 -21.6 18.7 -21.7 17.6 -21.8C16.4 -21.9 16.1 -21.9 12 -21.9S7.6 -21.9 6.4 -21.8C5.3 -21.7 4.7 -21.6 4.2 -21.4C3.7 -21.2 3.3 -20.9 2.9 -20.5C2.5 -20.1 2.2 -19.7 2 -19.2C1.8 -18.7 1.6 -18.1 1.5 -17C1.4 -15.8 1.4 -15.5 1.4 -12S1.4 -8.2 1.5 -7C1.6 -5.9 1.8 -5.3 2 -4.8C2.2 -4.3 2.5 -3.9 2.9 -3.5C3.3 -3.1 3.7 -2.8 4.2 -2.6C4.7 -2.4 5.3 -2.2 6.4 -2.1C7.6 -2.1 7.9 -2.1 12 -2.1ZM12 -16.8C9.3 -16.8 7.2 -14.7 7.2 -12C7.2 -9.3 9.3 -7.2 12 -7.2C14.7 -7.2 16.8 -9.3 16.8 -12C16.8 -14.7 14.7 -16.8 12 -16.8ZM12 -9.3C10.7 -9.3 9.3 -10.7 9.3 -12C9.3 -13.3 10.7 -14.7 12 -14.7C13.3 -14.7 14.7 -13.3 14.7 -12C14.7 -10.7 13.3 -9.3 12 -9.3ZM19.6 -6.1C19.6 -6.8 19 -7.4 18.3 -7.4C17.6 -7.4 17 -6.8 17 -6.1C17 -5.4 17.6 -4.8 18.3 -4.8C19 -4.8 19.6 -5.4 19.6 -6.1Z' }, // Path data untuk ikon Instagram
  // Tambahkan path ikon lain di sini (misal: TikTok, YouTube)
]
</script>

<template>
  <!-- 
    Footer Utama (WDD 5.2)
    Menggunakan warna primer (biru)
  -->
  <footer class="bg-gibei-primary text-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      
      <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12">
        
        <!-- Kolom 1: Logo & Deskripsi -->
        <div class="col-span-2 lg:col-span-2">
          <a href="#" class="text-white font-poppins font-bold text-2xl">
            GIBEI UNIMED
          </a>
          <p class="mt-4 text-gray-300 font-inter text-base max-w-xs">
            Pusat informasi, edukasi, dan registrasi digital GIBEI UNIMED.
          </p>
          <p class="mt-2 text-gray-300 font-inter text-sm">
            "Fortis Fortuna Adiuvat"
          </p>
        </div>

        <!-- Kolom 2: Jelajahi -->
        <div>
          <h4 class="font-poppins font-semibold text-lg mb-4">Jelajahi</h4>
          <ul class="space-y-3">
            <li v-for="link in footerLinks.jelajahi" :key="link.name">
              <a :href="link.href" class="font-inter text-gray-300 hover:text-white transition-colors">
                {{ link.name }}
              </a>
            </li>
          </ul>
        </div>
        
        <!-- Kolom 3: Organisasi -->
        <div>
          <h4 class="font-poppins font-semibold text-lg mb-4">Organisasi</h4>
          <ul class="space-y-3">
            <li v-for="link in footerLinks.organisasi" :key="link.name">
              <a :href="link.href" class="font-inter text-gray-300 hover:text-white transition-colors">
                {{ link.name }}
              </a>
            </li>
          </ul>
        </div>
        
        <!-- Kolom 4: Kontak -->
        <div>
          <h4 class="font-poppins font-semibold text-lg mb-4">Kontak</h4>
          <ul class="space-y-3">
            <li v-for="link in footerLinks.kontak" :key="link.name">
              <a :href="link.href" class="font-inter text-gray-300 hover:text-white transition-colors">
                {{ link.name }}
              </a>
            </li>
          </ul>
        </div>

      </div>

      <!-- Bagian Bawah: Copyright & Social Media -->
      <div class="mt-12 pt-8 border-t border-white border-opacity-20 flex flex-col md:flex-row justify-between items-center">
        <p class="font-inter text-gray-400 text-sm order-2 md:order-1 mt-4 md:mt-0">
          © {{ new Date().getFullYear() }} GIBEI UNIMED. All rights reserved.
        </p>
        
        <div class="flex space-x-6 order-1 md:order-2">
          <a v-for="social in socialLinks" :key="social.name" :href="social.href" class="text-gray-300 hover:text-white transition-colors">
            <span class="sr-only">{{ social.name }}</span>
            <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <!-- Path data untuk ikon (Instagram) -->
              <path :d="social.icon" transform="translate(0, 24) scale(1, -1) translate(0, -24) translate(12, -12)" />
            </svg>
          </a>
        </div>
      </div>

    </div>
  </footer>
</template>