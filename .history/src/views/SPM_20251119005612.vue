<script setup>
import { ref, watch, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import api from '../api'
import { currentUser, isLoggedIn } from '../store/auth'

// State Data
const spmList = ref([]) // Daftar jadwal SPM dari backend
const isLoadingSPM = ref(true)

const formData = ref({
  spmId: null, // ID SPM yang dipilih
  name: '',
  nim: '',
  origin: '', 
  email: '',
  phone: '',
})

const isSubmitted = ref(false)
const isSubmitting = ref(false)
const errorMsg = ref('')

// Opsi
const origins = ref([
  'Fakultas Ekonomi (UNIMED)',
  'Fakultas Lain (UNIMED)',
  'Publik / Umum (Luar UNIMED)'
])

// --- FETCH JADWAL SPM ---
const fetchSpmSchedules = async () => {
  try {
    isLoadingSPM.value = true
    const response = await api.get('/spm') // Endpoint GET /spm harus ada di backend
    spmList.value = response.data
    
    // Otomatis pilih SPM terbaru jika ada
    if (spmList.value.length > 0) {
      formData.value.spmId = spmList.value[0].id
    }
  } catch (err) {
    console.error('Gagal ambil jadwal SPM:', err)
  } finally {
    isLoadingSPM.value = false
  }
}

// --- AUTO-FILL USER DATA ---
onMounted(() => {
  fetchSpmSchedules()
  
  // Jika user login, isi otomatis nama dan email
  if (isLoggedIn.value && currentUser.value) {
    formData.value.name = currentUser.value.nama || ''
    formData.value.email = currentUser.value.email || ''
  }
})

// --- SUBMIT PENDAFTARAN ---
const handleSubmit = async () => {
  if (!isLoggedIn.value) {
    alert('Silakan login terlebih dahulu untuk mendaftar.')
    // Opsional: router.push('/login')
    return
  }

  if (!formData.value.spmId) {
    alert('Mohon pilih jadwal SPM yang tersedia.')
    return
  }

  isSubmitting.value = true
  errorMsg.value = ''

  try {
    // Payload disesuaikan dengan DTO Backend (SpmRegistration)
    const payload = {
      spmId: formData.value.spmId,
      nim: formData.value.nim,
      origin: formData.value.origin,
      phone: formData.value.phone
      // userId diambil otomatis dari Token di Backend
    }

    await api.post('/registrations/spm', payload) // Endpoint POST registrasi
    isSubmitted.value = true
    
  } catch (err) {
    console.error(err)
    errorMsg.value = err.response?.data?.message || 'Gagal mendaftar. Pastikan data benar atau Anda belum terdaftar di batch ini.'
  } finally {
    isSubmitting.value = false
  }
}

const resetForm = () => {
  isSubmitted.value = false
  // Reset field tertentu saja
  formData.value.nim = ''
  formData.value.origin = ''
  formData.value.phone = ''
}

// Info Paket SPM (Frontend logic untuk display)
const spmLevels = [
  { title: 'Level 1', description: 'Pengenalan dasar investasi & mekanisme pasar modal.', delay: 100 },
  { title: 'Level 2', description: 'Produk pasar modal & saham.', delay: 200 },
  { title: 'Level 3', description: 'Analisis Fundamental.', delay: 300 },
  { title: 'Level 4', description: 'Analisis Teknikal.', delay: 400 },
]
</script>

<template>
  <div class="bg-white">
    <!-- Header -->
    <section class="bg-gibei-secondary py-20 md:py-32 text-center">
      <div class="max-w-7xl mx-auto px-4">
        <h1 class="font-poppins text-5xl md:text-7xl font-extrabold text-gibei-primary">
          Sekolah Pasar Modal
        </h1>
        <p class="mt-4 text-xl text-gibei-text max-w-2xl mx-auto">
          Gerbang utama memahami investasi pasar modal secara profesional.
        </p>
      </div>
    </section>

    <!-- Info Level -->
    <section class="bg-white py-16">
      <div class="max-w-7xl mx-auto px-4">
        <div class="grid md:grid-cols-4 gap-6">
          <div v-for="level in spmLevels" :key="level.title" class="bg-gibei-secondary p-6 rounded-lg shadow-md">
            <h3 class="font-bold text-gibei-primary text-xl mb-2">{{ level.title }}</h3>
            <p class="text-sm text-gibei-text">{{ level.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Form Pendaftaran -->
    <section class="bg-gibei-secondary py-20">
      <div class="max-w-3xl mx-auto px-4 sm:px-6">
        
        <!-- Tampilan Sukses -->
        <div v-if="isSubmitted" class="text-center bg-white p-12 rounded-xl shadow-xl">
          <svg class="w-20 h-20 text-green-500 mx-auto mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          <h2 class="font-poppins text-3xl font-bold text-gibei-primary mb-4">Pendaftaran Berhasil!</h2>
          <p class="text-gibei-text">Data Anda telah tersimpan. Tim kami akan memverifikasi data Anda segera.</p>
          <button @click="resetForm" class="mt-8 bg-gibei-primary text-white px-6 py-3 rounded-lg hover:bg-blue-900 transition">Daftar Lagi</button>
        </div>

        <!-- Form -->
        <div v-else>
          <div class="text-center mb-10">
            <h2 class="font-poppins text-3xl font-bold text-gibei-primary">Formulir Pendaftaran</h2>
            <p class="text-gibei-text mt-2">Pastikan Anda sudah login sebelum mendaftar.</p>
          </div>

          <form @submit.prevent="handleSubmit" class="bg-white p-8 rounded-xl shadow-lg space-y-6">
            
            <!-- Warning jika belum login -->
            <div v-if="!isLoggedIn" class="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
              <p class="text-sm text-yellow-700">
                Anda harus <router-link to="/login" class="font-bold underline">Login</router-link> terlebih dahulu untuk mendaftar.
              </p>
            </div>

            <!-- Error Message -->
            <div v-if="errorMsg" class="bg-red-50 border-l-4 border-red-500 p-4">
              <p class="text-sm text-red-700">{{ errorMsg }}</p>
            </div>

            <!-- Pilih Jadwal SPM -->
            <div>
              <label class="block text-sm font-bold text-gibei-primary mb-1">Pilih Jadwal SPM</label>
              <select v-model="formData.spmId" class="w-full p-3 border rounded-lg bg-gray-50" required :disabled="isLoadingSPM">
                <option :value="null" disabled>-- Pilih Jadwal --</option>
                <option v-for="spm in spmList" :key="spm.id" :value="spm.id">
                  {{ spm.title }} - {{ new Date(spm.schedule).toLocaleDateString() }} (Sisa Kuota: {{ spm.quota }})
                </option>
              </select>
              <p v-if="isLoadingSPM" class="text-xs text-gray-500 mt-1">Sedang memuat jadwal...</p>
              <p v-if="!isLoadingSPM && spmList.length === 0" class="text-xs text-red-500 mt-1">Tidak ada jadwal SPM aktif saat ini.</p>
            </div>

            <div class="grid md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-medium text-gibei-primary">Nama Lengkap</label>
                <input v-model="formData.name" type="text" class="w-full p-3 border rounded-lg bg-gray-100 cursor-not-allowed" readonly>
              </div>
              <div>
                <label class="block text-sm font-medium text-gibei-primary">Email</label>
                <input v-model="formData.email" type="email" class="w-full p-3 border rounded-lg bg-gray-100 cursor-not-allowed" readonly>
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gibei-primary">NIM / NIK</label>
              <input v-model="formData.nim" type="text" required class="w-full p-3 border rounded-lg focus:ring-2 focus:ring-gibei-primary" placeholder="Nomor Induk Mahasiswa / KTP">
            </div>

            <div>
              <label class="block text-sm font-medium text-gibei-primary">Asal Pendaftar</label>
              <select v-model="formData.origin" required class="w-full p-3 border rounded-lg bg-white">
                <option value="" disabled>Pilih Asal</option>
                <option v-for="origin in origins" :key="origin" :value="origin">{{ origin }}</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium text-gibei-primary">No. WhatsApp</label>
              <input v-model="formData.phone" type="tel" required class="w-full p-3 border rounded-lg focus:ring-2 focus:ring-gibei-primary" placeholder="0812...">
            </div>

            <button 
              type="submit" 
              :disabled="isSubmitting || !isLoggedIn || !formData.spmId"
              class="w-full bg-gibei-primary text-white font-bold py-4 rounded-lg hover:bg-blue-900 transition disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center"
            >
              <svg v-if="isSubmitting" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {{ isSubmitting ? 'Mendaftar...' : 'Daftar Sekarang' }}
            </button>

          </form>
        </div>
      </div>
    </section>
  </div>
</template>