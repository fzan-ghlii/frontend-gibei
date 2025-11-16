<script setup>
import { ref, watch } from 'vue'

// --- Data untuk Form (WDD 4.2) ---
const formData = ref({
  name: '',
  nim: '',
  origin: '', // Asal Pendaftar
  email: '',
  phone: '',
  spmLevel: null // PERBAIKAN: Akan diisi otomatis
})

const isSubmitted = ref(false)
const isLoading = ref(false)

// Opsi pendaftaran (FE, Unimed, Publik)
const origins = ref([
  'Fakultas Ekonomi (UNIMED)',
  'Fakultas Lain (UNIMED)',
  'Publik / Umum (Luar UNIMED)'
])

// --- Alur Pendaftaran (WDD 4.0) ---
const registrationSteps = ref([
  {
    step: 1,
    title: 'Isi Formulir',
    description: 'Lengkapi data diri Anda pada formulir di bawah ini.',
    delay: 100
  },
  {
    step: 2,
    title: 'Konfirmasi Data',
    description: 'Tim kami akan memverifikasi data Anda (via Email/WA).',
    delay: 200
  },
  {
    step: 3,
    title: 'Pelaksanaan',
    description: 'Hadirilah SPM sesuai jadwal yang telah ditentukan.',
    delay: 300
  },
])

// Informasi Level SPM (4 Level)
const spmLevels = ref([
  {
    title: 'SPM Level 1',
    description: 'Pengenalan dasar investasi dan mekanisme pasar modal.',
    delay: 100
  },
  {
    title: 'SPM Level 2',
    description: 'Membahas produk-produk pasar modal, terutama saham.',
    delay: 200
  },
  {
    title: 'SPM Level 3',
    description: 'Mendalami strategi dan praktik Analisis Fundamental.',
    delay: 300
  },
  {
    title: 'SPM Level 4',
    description: 'Mendalami strategi dan praktik Analisis Teknikal.',
    delay: 400
  },
])

// --- PERBAIKAN: Logika Dinamis untuk Level SPM ---
// Mengawasi perubahan pada 'Asal Pendaftar'
watch(() => formData.value.origin, (newOrigin) => {
  if (newOrigin === 'Fakultas Ekonomi (UNIMED)' || newOrigin === 'Fakultas Lain (UNIMED)') {
    // FE & UNIMED wajib ikut 1-4
    formData.value.spmLevel = 'Paket Lengkap (Level 1-4)';
  } else if (newOrigin === 'Publik / Umum (Luar UNIMED)') {
    // Publik tidak bisa memilih, otomatis dapat Level 1
    formData.value.spmLevel = 'Publik (Level 1)';
  } else {
    // Reset jika tidak ada yang dipilih
    formData.value.spmLevel = null;
  }
})

// --- Fungsi Submit (Simulasi) ---
const handleSubmit = () => {
  isLoading.value = true
  // Simulasi proses backend
  setTimeout(() => {
    console.log('Data Pendaftaran Terkirim:', formData.value)
    isLoading.value = false
    isSubmitted.value = true
  }, 1500) // delay 1.5 detik
}

// Fungsi reset form
const resetForm = () => {
  isSubmitted.value = false;
  formData.value = {
    name: '',
    nim: '',
    origin: '', 
    email: '',
    phone: '',
    spmLevel: null // Reset level
  }
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
          :enter="{ opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } }"
          class="font-poppins text-5xl md:text-7xl font-extrabold text-gibei-primary"
        >
          Sekolah Pasar Modal
        </h1>
        <p 
          v-motion
          :initial="{ opacity: 0, y: 50 }"
          :enter="{ opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, delay: 100 } }"
          class="mt-4 text-xl text-gibei-text max-w-2xl mx-auto"
        >
          Gerbang utama Anda untuk memahami dunia investasi pasar modal secara profesional.
        </p>
      </div>
    </section>

    <!-- Section 2: Informasi SPM (4 Level) -->
    <section class="bg-white py-20 md:py-28 overflow-hidden">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="font-poppins text-4xl md:text-5xl font-extrabold text-gibei-primary">
            Apa itu SPM?
          </h2>
          <p class="mt-4 text-lg text-gibei-text max-w-3xl mx-auto">
            Sekolah Pasar Modal (SPM) adalah program edukasi berjenjang yang dirancang untuk memberikan pemahaman mendalam tentang investasi di pasar modal.
          </p>
        </div>
        
        <!-- Grid 4 kolom untuk 4 level -->
        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div
            v-for="level in spmLevels"
            :key="level.title"
            v-motion
            :initial="{ opacity: 0, y: 50 }"
            :visibleOnce="{ opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, delay: level.delay } }"
            class="bg-gibei-secondary p-8 rounded-lg shadow-lg flex flex-col"
          >
            <h3 class="font-poppins text-2xl font-bold text-gibei-primary mb-4">
              {{ level.title }}
            </h3>
            <p class="font-inter text-gibei-text leading-relaxed flex-grow">
              {{ level.description }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Section 3: Alur & Jadwal (WDD 4.0) -->
    <section class="bg-gibei-secondary py-20 md:py-28 overflow-hidden">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="font-poppins text-4xl md:text-5xl font-extrabold text-gibei-primary">
            Alur Pendaftaran
          </h2>
          <p class="mt-4 text-lg text-gibei-text max-w-3xl mx-auto">
            Hanya 3 langkah mudah untuk memulai perjalanan investasi Anda.
          </p>
        </div>
        
        <!-- Stepper Visual -->
        <div class="grid md:grid-cols-3 gap-8 text-center">
          <div
            v-for="step in registrationSteps"
            :key="step.step"
            v-motion
            :initial="{ opacity: 0, y: 50 }"
            :visibleOnce="{ opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, delay: step.delay } }"
            class="p-6"
          >
            <!-- Nomor Step -->
            <div class="w-16 h-16 bg-gibei-primary text-white font-poppins font-bold text-3xl rounded-full flex items-center justify-center mx-auto mb-6">
              {{ step.step }}
            </div>
            <h3 class="font-poppins text-2xl font-bold text-gibei-primary mb-3">
              {{ step.title }}
            </h3>
            <p class="font-inter text-gibei-text leading-relaxed">
              {{ step.description }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Section 4: Formulir Pendaftaran (PERBAIKAN FORM) -->
    <section class="bg-white py-20 md:py-28">
      <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <!-- Tampilan Sukses (setelah submit) -->
        <div
          v-if="isSubmitted"
          v-motion
          :initial="{ opacity: 0, scale: 0.9 }"
          :enter="{ opacity: 1, scale: 1, transition: { type: 'spring' } }"
          class="text-center bg-gibei-secondary p-12 rounded-lg shadow-xl"
        >
          <svg class="w-20 h-20 text-gibei-primary mx-auto mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          <h2 class="font-poppins text-4xl font-extrabold text-gibei-primary mb-4">
            Pendaftaran Berhasil!
          </h2>
          <p class="font-inter text-lg text-gibei-text max-w-lg mx-auto">
            Terima kasih, {{ formData.name }}. Anda telah terdaftar untuk: <strong class="text-gibei-primary">{{ formData.spmLevel }}</strong>.
          </p>
          <p class="font-inter text-base text-gibei-text max-w-lg mx-auto mt-2">
            Tim kami akan segera menghubungi Anda melalui Email atau WhatsApp untuk konfirmasi data.
          </p>
          <button
            @click="resetForm"
            class="mt-8 inline-block bg-gibei-primary text-white font-poppins font-semibold px-8 py-3 rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105"
          >
            Daftar Lagi
          </button>
        </div>
        
        <!-- Formulir Pendaftaran (sebelum submit) -->
        <div v-else>
          <div 
            v-motion
            :initial="{ opacity: 0, y: 50 }"
            :enter="{ opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } }"
            class="text-center mb-12"
          >
            <h2 class="font-poppins text-4xl md:text-5xl font-extrabold text-gibei-primary">
              Formulir Pendaftaran
            </h2>
            <p class="mt-4 text-lg text-gibei-text max-w-2xl mx-auto">
              Pendaftaran terintegrasi langsung di web dan 100% gratis.
            </p>
          </div>

          <form 
            @submit.prevent="handleSubmit" 
            class="space-y-6"
            v-motion
            :initial="{ opacity: 0, y: 50 }"
            :enter="{ opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, delay: 200 } }"
          >
            
            <!-- Input Nama Lengkap -->
            <div>
              <label for="name" class="block text-sm font-poppins font-medium text-gibei-primary">Nama Lengkap</label>
              <input v-model="formData.name" type="text" id="name" required class="mt-1 block w-full font-inter px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gibei-primary">
            </div>

            <!-- Input NIM -->
            <div>
              <label for="nim" class="block text-sm font-poppins font-medium text-gibei-primary">NIM (Jika Mahasiswa UNIMED) / NIK (Jika Publik)</label>
              <input v-model="formData.nim" type="text" id="nim" required class="mt-1 block w-full font-inter px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gibei-primary">
            </div>

            <!-- Select Asal Pendaftar -->
            <div>
              <label for="origin" class="block text-sm font-poppins font-medium text-gibei-primary">Asal Pendaftar</label>
              <select v-model="formData.origin" id="origin" required class="mt-1 block w-full font-inter px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gibei-primary bg-white">
                <option value="" disabled>Pilih Asal Pendaftar</option>
                <option v-for="origin in origins" :key="origin" :value="origin">{{ origin }}</option>
              </select>
            </div>
            
            <!-- PERBAIKAN: Info Paket Otomatis (Muncul setelah memilih Asal) -->
            <div 
              v-if="formData.origin" 
              class="p-4 bg-gibei-secondary rounded-lg border border-gray-200"
              v-motion 
              :initial="{ opacity: 0, height: 0 }" 
              :enter="{ opacity: 1, height: 'auto', transition: { type: 'spring', stiffness: 300, damping: 20 } }"
            >
              <h4 class="font-poppins font-semibold text-gibei-primary">Paket SPM Anda:</h4>
              <p v-if="formData.origin.includes('UNIMED')" class="font-inter text-gibei-text text-sm">
                Anda akan terdaftar untuk <strong class="font-semibold">Paket Lengkap SPM (Level 1-4)</strong>.
              </p>
              <p v-else class="font-inter text-gibei-text text-sm">
                Anda akan terdaftar untuk <strong class="font-semibold">SPM Level 1 (Pengenalan)</strong>.
              </p>
            </div>

            <!-- Input Email -->
            <div>
              <label for="email" class="block text-sm font-poppins font-medium text-gibei-primary">Alamat Email</label>
              <input v-model="formData.email" type="email" id="email" required class="mt-1 block w-full font-inter px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gibei-primary">
            </div>

            <!-- Input No. HP -->
            <div>
              <label for="phone" class="block text-sm font-poppins font-medium text-gibei-primary">No. WhatsApp Aktif</label>
              <input v-model="formData.phone" type="tel" id="phone" required class="mt-1 block w-full font-inter px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gibei-primary">
            </div>
            
            <!-- PERBAIKAN: Dropdown "Pilih Level SPM" TELAH DIHAPUS -->

            <!-- Tombol Submit -->
            <div class="pt-4">
              <button 
                type="submit" 
                :disabled="isLoading || !formData.origin"
                class="w-full flex justify-center bg-gibei-primary text-white font-poppins font-semibold px-8 py-4 rounded-lg shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg v-if="isLoading" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {{ isLoading ? 'Mengirim...' : 'Daftar Sekarang (Gratis)' }}
              </button>
            </div>

          </form>
        </div>

      </div>
    </section>
  </div>
</template>