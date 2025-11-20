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

// --- 1. Fetch Data Jadwal SPM (Saat halaman dimuat) ---
onMounted(async () => {
  try {
    // Kita ambil daftar SPM yang tersedia
    const response = await api.get('/spm')
    
    // Logika sederhana: Ambil SPM yang paling baru (index terakhir atau pertama tergantung sort BE)
    // Di backend kita sort asc (terlama), jadi kita ambil yang paling relevan atau kita cari yang kuotanya masih ada
    if (response.data && response.data.length > 0) {
      activeSpm.value = response.data[0] // Mengambil SPM pertama sebagai target pendaftaran
    }
  } catch (error) {
    console.error("Gagal mengambil jadwal SPM:", error)
  } finally {
    isLoadingPage.value = false
  }

  // Auto-fill jika user sudah login (Opsional, visual saja karena backend pakai token)
  if (isLoggedIn.value && currentUser.value) {
    // Kita tidak perlu simpan nama/email di formData untuk dikirim ke API registrasi SPM
    // API hanya butuh nim, origin, phone. Nama/email diambil dari Token.
  }
})

// --- Logika UI: Penentuan Level SPM ---
watch(() => formData.value.origin, (newOrigin) => {
  if (newOrigin.includes('UNIMED')) {
    formData.value.spmLevel = 'Paket Lengkap (Level 1-4)';
  } else if (newOrigin.includes('Publik')) {
    formData.value.spmLevel = 'Publik (Level 1)';
  } else {
    formData.value.spmLevel = null;
  }
})

// --- 2. Handle Submit (Integrasi Backend) ---
const handleSubmit = async () => {
  // Cek Login
  if (!isLoggedIn.value) {
    alert('Silakan login terlebih dahulu untuk mendaftar event.')
    router.push('/login')
    return
  }

  if (!activeSpm.value) {
    alert('Maaf, belum ada jadwal SPM yang dibuka saat ini.')
    return
  }

  isSubmitting.value = true
  errorMessage.value = ''

  try {
    // Payload sesuai DTO RegisterSpmDto di Backend
    const payload = {
      nim: formData.value.nim,
      origin: formData.value.origin,
      phone: formData.value.phone
    }

    // POST ke /registrations/spm/:spmId
    await api.post(`/registrations/spm/${activeSpm.value.id}`, payload)

    // Jika sukses
    isSuccess.value = true
    window.scrollTo({ top: 0, behavior: 'smooth' })

  } catch (error) {
    console.error(error)
    // Handle Error (misal: ConflictException - Sudah terdaftar)
    if (error.response && error.response.status === 409) {
      errorMessage.value = 'Anda sudah terdaftar di jadwal SPM ini.'
    } else {
      errorMessage.value = 'Terjadi kesalahan saat mendaftar. Silakan coba lagi.'
    }
    alert(errorMessage.value)
  } finally {
    isSubmitting.value = false
  }
}

const resetForm = () => {
  isSuccess.value = false
  formData.value.nim = ''
  formData.value.origin = ''
  formData.value.phone = ''
}

// Data statis untuk UI (Info Level)
const spmLevels = ref([
  { title: 'SPM Level 1', description: 'Pengenalan dasar investasi dan mekanisme pasar modal.', delay: 100 },
  { title: 'SPM Level 2', description: 'Membahas produk-produk pasar modal, terutama saham.', delay: 200 },
  { title: 'SPM Level 3', description: 'Mendalami strategi dan praktik Analisis Fundamental.', delay: 300 },
  { title: 'SPM Level 4', description: 'Mendalami strategi dan praktik Analisis Teknikal.', delay: 400 },
])

const registrationSteps = ref([
  { step: 1, title: 'Isi Formulir', description: 'Lengkapi data diri Anda pada formulir di bawah ini.', delay: 100 },
  { step: 2, title: 'Konfirmasi Data', description: 'Tim kami akan memverifikasi data Anda.', delay: 200 },
  { step: 3, title: 'Pelaksanaan', description: 'Hadirilah SPM sesuai jadwal yang telah ditentukan.', delay: 300 },
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
          Sekolah Pasar Modal
        </h1>
        <!-- Menampilkan Jadwal Aktif jika ada -->
        <p 
          v-if="activeSpm"
          v-motion
          :initial="{ opacity: 0 }"
          :enter="{ opacity: 1, transition: { delay: 200 } }"
          class="mt-4 text-xl font-bold text-blue-600 bg-blue-100 inline-block px-4 py-2 rounded-full"
        >
          Sedang Dibuka: {{ activeSpm.title }}
        </p>
        <p v-else class="mt-4 text-xl text-gray-500">
          Belum ada jadwal dibuka saat ini.
        </p>
      </div>
    </section>

    <!-- Section 2: Informasi SPM (UI Only) -->
    <section class="bg-white py-20 md:py-28 overflow-hidden">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="font-poppins text-4xl md:text-5xl font-extrabold text-gibei-primary">
            Apa itu SPM?
          </h2>
          <p class="mt-4 text-lg text-gibei-text max-w-3xl mx-auto">
            Sekolah Pasar Modal (SPM) adalah program edukasi berjenjang.
          </p>
        </div>
        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div
            v-for="level in spmLevels"
            :key="level.title"
            v-motion
            :initial="{ opacity: 0, y: 50 }"
            :visibleOnce="{ opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, delay: level.delay } }"
            class="bg-gibei-secondary p-8 rounded-lg shadow-lg flex flex-col"
          >
            <h3 class="font-poppins text-2xl font-bold text-gibei-primary mb-4">{{ level.title }}</h3>
            <p class="font-inter text-gibei-text leading-relaxed flex-grow">{{ level.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Section 3: Alur Pendaftaran (UI Only) -->
    <section class="bg-gibei-secondary py-20 md:py-28 overflow-hidden">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="font-poppins text-4xl md:text-5xl font-extrabold text-gibei-primary">Alur Pendaftaran</h2>
        </div>
        <div class="grid md:grid-cols-3 gap-8 text-center">
          <div v-for="step in registrationSteps" :key="step.step" class="p-6">
            <div class="w-16 h-16 bg-gibei-primary text-white font-poppins font-bold text-3xl rounded-full flex items-center justify-center mx-auto mb-6">{{ step.step }}</div>
            <h3 class="font-poppins text-2xl font-bold text-gibei-primary mb-3">{{ step.title }}</h3>
            <p class="font-inter text-gibei-text leading-relaxed">{{ step.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Section 4: Formulir Pendaftaran -->
    <section class="bg-white py-20 md:py-28">
      <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <!-- Loading State saat fetch jadwal -->
        <div v-if="isLoadingPage" class="text-center py-10">
          <p class="text-lg text-gray-500">Memuat jadwal...</p>
        </div>

        <!-- Tampilan Sukses -->
        <div v-else-if="isSuccess" class="text-center bg-gibei-secondary p-12 rounded-lg shadow-xl">
          <svg class="w-20 h-20 text-green-600 mx-auto mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          <h2 class="font-poppins text-4xl font-extrabold text-gibei-primary mb-4">Pendaftaran Berhasil!</h2>
          <p class="font-inter text-lg text-gibei-text max-w-lg mx-auto">
            Status pendaftaran Anda saat ini: <strong>PENDING</strong>. Silakan cek dashboard Anda secara berkala.
          </p>
          <div class="mt-8 flex justify-center gap-4">
            <button @click="resetForm" class="bg-gray-200 text-gibei-text font-poppins font-semibold px-6 py-3 rounded-lg">Daftar Lagi</button>
            <router-link to="/dashboard" class="bg-gibei-primary text-white font-poppins font-semibold px-6 py-3 rounded-lg">Ke Dashboard</router-link>
          </div>
        </div>
        
        <!-- Formulir -->
        <div v-else>
          <div class="text-center mb-12">
            <h2 class="font-poppins text-4xl md:text-5xl font-extrabold text-gibei-primary">Formulir Pendaftaran</h2>
            <p v-if="!isLoggedIn" class="mt-4 text-red-500 font-semibold">
              Anda harus login untuk mengisi formulir ini.
            </p>
          </div>

          <form @submit.prevent="handleSubmit" class="space-y-6" :class="{ 'opacity-50 pointer-events-none': !isLoggedIn || !activeSpm }">
            
            <!-- Info User (Readonly) -->
            <div v-if="isLoggedIn" class="bg-blue-50 p-4 rounded-lg border border-blue-100 mb-6">
              <p class="text-sm text-blue-800">Mendaftar sebagai: <strong>{{ currentUser?.email }}</strong></p>
            </div>

            <!-- Input NIM -->
            <div>
              <label for="nim" class="block text-sm font-poppins font-medium text-gibei-primary">NIM / NIK</label>
              <input v-model="formData.nim" type="text" id="nim" required class="mt-1 block w-full font-inter px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-gibei-primary">
            </div>

            <!-- Select Asal Pendaftar -->
            <div>
              <label for="origin" class="block text-sm font-poppins font-medium text-gibei-primary">Asal Pendaftar</label>
              <select v-model="formData.origin" id="origin" required class="mt-1 block w-full font-inter px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-gibei-primary bg-white">
                <option value="" disabled>Pilih Asal Pendaftar</option>
                <option v-for="origin in origins" :key="origin" :value="origin">{{ origin }}</option>
              </select>
            </div>
            
            <!-- Info Paket Otomatis -->
            <div v-if="formData.origin" class="p-4 bg-gibei-secondary rounded-lg border border-gray-200">
              <h4 class="font-poppins font-semibold text-gibei-primary">Paket SPM Anda:</h4>
              <p class="font-inter text-gibei-text text-sm">{{ formData.spmLevel }}</p>
            </div>

            <!-- Input No. HP -->
            <div>
              <label for="phone" class="block text-sm font-poppins font-medium text-gibei-primary">No. WhatsApp</label>
              <input v-model="formData.phone" type="tel" id="phone" required class="mt-1 block w-full font-inter px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-gibei-primary">
            </div>

            <!-- Tombol Submit -->
            <div class="pt-4">
              <button 
                type="submit" 
                :disabled="isSubmitting || !activeSpm || !isLoggedIn"
                class="w-full flex justify-center bg-gibei-primary text-white font-poppins font-semibold px-8 py-4 rounded-lg shadow-lg hover:scale-105 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span v-if="isSubmitting">Mengirim...</span>
                <span v-else-if="!isLoggedIn">Silakan Login Dulu</span>
                <span v-else-if="!activeSpm">Jadwal Tutup</span>
                <span v-else>Daftar Sekarang</span>
              </button>
            </div>
            
            <!-- Link Login Alternatif -->
            <div v-if="!isLoggedIn" class="text-center mt-4">
              <router-link to="/login" class="text-gibei-primary underline hover:text-blue-800">Klik di sini untuk Login</router-link>
            </div>

          </form>
        </div>
      </div>
    </section>
  </div>
</template>