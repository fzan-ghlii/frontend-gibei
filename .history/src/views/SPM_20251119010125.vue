<script setup>
import { ref, watch, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import api from '../api' // Import konfigurasi Axios kita
import { isLoggedIn, currentUser } from '../store/auth' // Import store auth

const router = useRouter()

// --- State ---
const activeSpm = ref(null) // Menyimpan data jadwal SPM yang aktif dari DB
const isLoadingPage = ref(true)
const isSubmitting = ref(false)
const isSuccess = ref(false)
const errorMessage = ref('')

// Form Data
const formData = ref({
  // Nama & Email kita ambil dari user yang login (readonly)
  nim: '',
  origin: '', 
  phone: '',
  spmLevel: null // UI Only (Logika frontend)
})

// Opsi Asal Pendaftar
const origins = ref([
  'Fakultas Ekonomi (UNIMED)',
  'Fakultas Lain (UNIMED)',
  'Publik / Umum (Luar UNIMED)'
])

// Data UI: Alur Pendaftaran (Untuk Desain)
const registrationSteps = [
  { step: 1, title: 'Isi Formulir', description: 'Lengkapi data diri Anda pada formulir di bawah ini.', delay: 100 },
  { step: 2, title: 'Verifikasi', description: 'Tim kami akan memverifikasi data pendaftaran Anda.', delay: 200 },
  { step: 3, title: 'Pelaksanaan', description: 'Hadirilah SPM sesuai jadwal yang telah ditentukan.', delay: 300 },
]

// --- 1. Fetch Data Jadwal SPM (Saat halaman dimuat) ---
onMounted(async () => {
  try {
    // Kita ambil daftar SPM yang tersedia
    const response = await api.get('/spm')
    
    // Logika sederhana: Ambil SPM yang paling baru (index terakhir atau pertama tergantung sort BE)
    // Di backend kita sort asc (terlama), jadi kita ambil yang paling relevan atau kita cari yg kuota > 0
    // Di sini kita ambil element pertama sebagai contoh "Active Batch"
    if (response.data && response.data.length > 0) {
      activeSpm.value = response.data[0] 
    }

  } catch (error) {
    console.error("Gagal load SPM:", error)
  } finally {
    isLoadingPage.value = false
  }

  // Jika user sudah login, kita tidak perlu isi formData.name/email
  // karena nanti di Template kita ambil langsung dari `currentUser`
  if (isLoggedIn.value && currentUser.value) {
    // console.log('User:', currentUser.value)
  }
})

// --- 2. Logika UI: Tentukan Level SPM berdasarkan Origin ---
watch(() => formData.value.origin, (val) => {
  if (val && val.includes('UNIMED')) {
    formData.value.spmLevel = 'Paket Lengkap (Level 1-4)'
  } else if (val && val.includes('Publik')) {
    formData.value.spmLevel = 'SPM Level 1 (Umum)'
  } else {
    formData.value.spmLevel = null
  }
})

// --- 3. Submit Pendaftaran ---
const handleSubmit = async () => {
  if (!activeSpm.value) return

  isSubmitting.value = true
  errorMessage.value = ''

  try {
    // Payload ke Backend
    const payload = {
      spmId: activeSpm.value.id, // ID dari SPM yang sedang aktif
      nim: formData.value.nim,
      origin: formData.value.origin,
      phone: formData.value.phone
    }

    await api.post('/registrations/spm', payload)

    isSuccess.value = true
    // Scroll ke atas agar pesan sukses terlihat
    window.scrollTo({ top: 0, behavior: 'smooth' })

  } catch (error) {
    console.error(error)
    // Tampilkan pesan error dari backend jika ada
    errorMessage.value = error.response?.data?.message || 'Terjadi kesalahan saat mendaftar.'
  } finally {
    isSubmitting.value = false
  }
}

// Data UI: Level SPM (Untuk Desain)
const spmLevels = [
  { title: 'Level 1', description: 'Pengenalan dasar investasi & mekanisme pasar modal.', delay: 100 },
  { title: 'Level 2', description: 'Produk pasar modal & saham.', delay: 200 },
  { title: 'Level 3', description: 'Analisis Fundamental.', delay: 300 },
  { title: 'Level 4', description: 'Analisis Teknikal.', delay: 400 },
]
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

    <!-- Section 2: Informasi Level SPM -->
    <section class="bg-white py-20 md:py-28 overflow-hidden">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="font-poppins text-4xl md:text-5xl font-extrabold text-gibei-primary">
            Kurikulum Berjenjang
          </h2>
          <p class="mt-4 text-lg text-gibei-text max-w-3xl mx-auto">
            Materi disusun secara sistematis mulai dari pemula hingga mahir.
          </p>
        </div>
        
        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div
            v-for="level in spmLevels"
            :key="level.title"
            v-motion
            :initial="{ opacity: 0, y: 50 }"
            :visibleOnce="{ opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, delay: level.delay } }"
            class="bg-gibei-secondary p-8 rounded-lg shadow-lg flex flex-col border-t-4 border-gibei-primary"
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

    <!-- Section 3: Alur Pendaftaran -->
    <section class="bg-gibei-secondary py-20 md:py-28 overflow-hidden">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="font-poppins text-4xl md:text-5xl font-extrabold text-gibei-primary">
            Alur Pendaftaran
          </h2>
          <p class="mt-4 text-lg text-gibei-text max-w-3xl mx-auto">
            3 langkah mudah memulai perjalanan investasi Anda.
          </p>
        </div>
        
        <div class="grid md:grid-cols-3 gap-8 text-center">
          <div
            v-for="step in registrationSteps"
            :key="step.step"
            v-motion
            :initial="{ opacity: 0, y: 50 }"
            :visibleOnce="{ opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, delay: step.delay } }"
            class="p-6"
          >
            <div class="w-16 h-16 bg-gibei-primary text-white font-poppins font-bold text-3xl rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
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

    <!-- Section 4: Formulir Registrasi (Inti Fitur) -->
    <section class="bg-white py-20 md:py-28">
      <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <!-- A. Tampilan SUKSES -->
        <div
          v-if="isSuccess"
          v-motion
          :initial="{ opacity: 0, scale: 0.9 }"
          :enter="{ opacity: 1, scale: 1 }"
          class="text-center bg-green-50 border border-green-200 p-12 rounded-2xl shadow-xl"
        >
          <div class="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
          </div>
          <h2 class="font-poppins text-4xl font-extrabold text-gibei-primary mb-4">
            Pendaftaran Berhasil!
          </h2>
          <p class="font-inter text-lg text-gibei-text max-w-lg mx-auto mb-8">
            Terima kasih, <strong>{{ currentUser?.nama }}</strong>. Data Anda telah kami terima. Silakan cek Dashboard secara berkala untuk status persetujuan.
          </p>
          <router-link 
            to="/dashboard"
            class="inline-block bg-gibei-primary text-white font-poppins font-semibold px-8 py-3 rounded-lg shadow-lg hover:bg-blue-900 transition-colors"
          >
            Cek Dashboard Saya
          </router-link>
        </div>
        
        <!-- B. Tampilan FORMULIR -->
        <div v-else>
          <div class="text-center mb-10">
            <h2 class="font-poppins text-3xl md:text-4xl font-extrabold text-gibei-primary">
              Formulir Registrasi
            </h2>
            <p class="mt-3 text-gibei-text">
              Pastikan data diri Anda sesuai dengan kartu identitas.
            </p>
          </div>

          <!-- Notifikasi Error -->
          <div v-if="errorMessage" class="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded">
            <div class="flex">
              <div class="flex-shrink-0">
                <svg class="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                </svg>
              </div>
              <div class="ml-3">
                <p class="text-sm text-red-700 font-inter">{{ errorMessage }}</p>
              </div>
            </div>
          </div>

          <form @submit.prevent="handleSubmit" class="bg-white border border-gray-200 p-8 md:p-10 rounded-2xl shadow-lg space-y-6 relative overflow-hidden">
            
            <!-- Overlay Loading -->
            <div v-if="isLoadingPage" class="absolute inset-0 bg-white bg-opacity-90 z-10 flex flex-col items-center justify-center">
              <svg class="animate-spin h-10 w-10 text-gibei-primary mb-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span class="text-gibei-primary font-semibold">Memuat Jadwal...</span>
            </div>

            <!-- Jadwal SPM (Otomatis) -->
            <div class="bg-blue-50 p-4 rounded-lg border border-blue-100">
              <label class="block text-sm font-bold text-gibei-primary mb-1">Jadwal yang Dipilih:</label>
              <div v-if="activeSpm" class="flex justify-between items-center">
                <div>
                  <p class="font-poppins font-bold text-lg text-blue-900">{{ activeSpm.title }}</p>
                  <p class="text-sm text-blue-700">
                    {{ new Date(activeSpm.schedule).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }) }}
                  </p>
                </div>
                <span class="bg-blue-200 text-blue-800 text-xs px-2 py-1 rounded font-bold">
                  Kuota: {{ activeSpm.quota }}
                </span>
              </div>
              <div v-else class="text-red-500 text-sm font-medium">
                Mohon maaf, belum ada jadwal SPM yang dibuka saat ini.
              </div>
            </div>

            <!-- Nama & Email (Readonly dari Login) -->
            <div class="grid md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-poppins font-medium text-gibei-primary mb-1">Nama Lengkap</label>
                <input 
                  :value="currentUser?.nama || '-'" 
                  type="text" 
                  readonly 
                  class="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg text-gray-500 cursor-not-allowed font-inter"
                >
              </div>
              <div>
                <label class="block text-sm font-poppins font-medium text-gibei-primary mb-1">Email</label>
                <input 
                  :value="currentUser?.email || '-'" 
                  type="email" 
                  readonly 
                  class="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg text-gray-500 cursor-not-allowed font-inter"
                >
              </div>
            </div>

            <!-- NIM -->
            <div>
              <label for="nim" class="block text-sm font-poppins font-medium text-gibei-primary mb-1">NIM / NIK</label>
              <input v-model="formData.nim" type="text" id="nim" required placeholder="Masukkan Nomor Induk Mahasiswa" class="mt-1 block w-full font-inter px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gibei-primary transition-colors">
            </div>

            <!-- Asal Pendaftar -->
            <div>
              <label for="origin" class="block text-sm font-poppins font-medium text-gibei-primary mb-1">Asal Pendaftar</label>
              <select v-model="formData.origin" id="origin" required class="mt-1 block w-full font-inter px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gibei-primary bg-white transition-colors">
                <option value="" disabled>Pilih Asal Pendaftar</option>
                <option v-for="origin in origins" :key="origin" :value="origin">{{ origin }}</option>
              </select>
            </div>

            <!-- Info Paket Otomatis -->
            <div 
              v-if="formData.spmLevel" 
              class="p-4 bg-gibei-secondary bg-opacity-50 rounded-lg border border-gibei-secondary"
              v-motion 
              :initial="{ opacity: 0, height: 0 }" 
              :enter="{ opacity: 1, height: 'auto' }"
            >
              <h4 class="font-poppins font-semibold text-gibei-primary text-sm">Paket SPM Anda:</h4>
              <p class="font-inter text-gibei-text text-sm mt-1 font-medium">
                {{ formData.spmLevel }}
              </p>
            </div>

            <!-- Input No. HP -->
            <div>
              <label for="phone" class="block text-sm font-poppins font-medium text-gibei-primary mb-1">No. WhatsApp</label>
              <input v-model="formData.phone" type="tel" id="phone" required placeholder="08xxxxxxxxxx" class="mt-1 block w-full font-inter px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gibei-primary transition-colors">
            </div>

            <!-- Tombol Submit -->
            <div class="pt-4">
              <button 
                type="submit" 
                :disabled="isSubmitting || !activeSpm || !isLoggedIn"
                class="w-full flex justify-center bg-gibei-primary text-white font-poppins font-semibold px-8 py-4 rounded-lg shadow-lg hover:scale-105 transition transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                <span v-if="isSubmitting" class="flex items-center">
                  <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Mengirim...
                </span>
                <span v-else-if="!isLoggedIn">Silakan Login Dulu</span>
                <span v-else-if="!activeSpm">Jadwal Tutup</span>
                <span v-else>Daftar Sekarang</span>
              </button>
            </div>
            
            <!-- Link Login Alternatif -->
            <div v-if="!isLoggedIn" class="text-center mt-4">
              <router-link to="/login" class="text-gibei-primary underline font-semibold hover:text-blue-800 transition">
                Login di sini
              </router-link>
            </div>

          </form>
        </div>
      </div>
    </section>
  </div>
</template>