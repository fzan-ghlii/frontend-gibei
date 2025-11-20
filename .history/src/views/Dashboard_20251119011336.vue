<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import api from '../api'
import { currentUser, logout } from '../store/auth'

const router = useRouter()

// --- State ---
const registrations = ref([])
const isLoading = ref(true)
const error = ref(null)

// --- Fetch Data Pendaftaran ---
const fetchRegistrations = async () => {
  try {
    isLoading.value = true
    // Endpoint ini sudah kita siapkan di Backend (GET /registrations/me)
    const response = await api.get('/registrations/me')
    registrations.value = response.data
  } catch (err) {
    console.error('Gagal mengambil data dashboard:', err)
    error.value = 'Gagal memuat data pendaftaran.'
  } finally {
    isLoading.value = false
  }
}

// --- Logout Handler ---
const handleLogout = () => {
  const confirm = window.confirm('Apakah Anda yakin ingin keluar?')
  if (confirm) {
    logout() // Hapus token & user dari store/localStorage
    router.push('/login') // Redirect ke login
  }
}

// Helper untuk warna status
const getStatusColor = (status) => {
  switch (status) {
    case 'APPROVED': return 'bg-green-100 text-green-800 border-green-200'
    case 'REJECTED': return 'bg-red-100 text-red-800 border-red-200'
    default: return 'bg-yellow-100 text-yellow-800 border-yellow-200' // PENDING
  }
}

// Helper untuk label status
const getStatusLabel = (status) => {
  switch (status) {
    case 'APPROVED': return 'Diterima'
    case 'REJECTED': return 'Ditolak'
    default: return 'Menunggu Verifikasi'
  }
}

onMounted(() => {
  // Cek jika user belum login (proteksi ganda selain di router)
  if (!currentUser.value) {
    router.push('/login')
    return
  }
  fetchRegistrations()
})
</script>

<template>
  <div class="min-h-screen bg-gray-50 font-inter pb-20">
    
    <!-- 1. Header Dashboard -->
    <header class="bg-gibei-primary text-white py-12 md:py-16 shadow-lg">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
        
        <!-- Profil User -->
        <div class="flex items-center gap-4">
          <div class="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-2xl font-bold font-poppins border-2 border-white/30">
            {{ currentUser?.nama?.charAt(0).toUpperCase() || 'U' }}
          </div>
          <div>
            <h1 class="text-2xl md:text-3xl font-bold font-poppins">Halo, {{ currentUser?.nama || 'Investor' }}!</h1>
            <p class="text-blue-200">{{ currentUser?.email }}</p>
          </div>
        </div>

        <!-- Tombol Logout -->
        <button 
          @click="handleLogout"
          class="group flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-2.5 rounded-lg font-semibold transition-all shadow-md hover:shadow-xl transform hover:-translate-y-0.5"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          Logout
        </button>

      </div>
    </header>

    <!-- 2. Konten Utama -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
      
      <!-- Statistik Singkat (Placeholder) -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div class="bg-white p-6 rounded-xl shadow-md border-l-4 border-blue-500 flex items-center justify-between">
          <div>
            <p class="text-gray-500 text-sm font-medium">Total Pendaftaran</p>
            <p class="text-2xl font-bold text-gray-800">{{ registrations.length }}</p>
          </div>
          <div class="p-3 bg-blue-50 rounded-full text-blue-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path></svg>
          </div>
        </div>
        <!-- Bisa ditambah statistik lain nanti -->
      </div>

      <!-- Riwayat Pendaftaran -->
      <div class="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
        <div class="p-6 border-b border-gray-100 flex justify-between items-center">
          <h2 class="text-xl font-bold text-gibei-primary font-poppins">Riwayat Pendaftaran</h2>
          <router-link to="/spm" class="text-sm text-blue-600 hover:underline font-medium">+ Daftar Baru</router-link>
        </div>

        <!-- Loading State -->
        <div v-if="isLoading" class="p-12 text-center">
          <div class="animate-spin rounded-full h-10 w-10 border-b-2 border-gibei-primary mx-auto mb-4"></div>
          <p class="text-gray-500">Memuat data...</p>
        </div>

        <!-- Error State -->
        <div v-else-if="error" class="p-12 text-center text-red-500">
          {{ error }}
        </div>

        <!-- Empty State -->
        <div v-else-if="registrations.length === 0" class="p-16 text-center">
          <div class="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
            <svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
          </div>
          <h3 class="text-lg font-semibold text-gray-800 mb-2">Belum Ada Pendaftaran</h3>
          <p class="text-gray-500 mb-6 max-w-md mx-auto">Anda belum mendaftar di event atau SPM manapun. Yuk mulai perjalanan investasi Anda sekarang!</p>
          <router-link to="/spm" class="inline-block bg-gibei-primary text-white px-6 py-2.5 rounded-lg hover:bg-blue-900 transition shadow-lg">
            Daftar SPM Sekarang
          </router-link>
        </div>

        <!-- List Data (Tabel Responsif) -->
        <div v-else class="overflow-x-auto">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="bg-gray-50 text-gray-600 text-sm uppercase tracking-wider border-b border-gray-200">
                <th class="p-4 font-semibold">Kegiatan</th>
                <th class="p-4 font-semibold">Tanggal Daftar</th>
                <th class="p-4 font-semibold">NIM / NIK</th>
                <th class="p-4 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100">
              <tr 
                v-for="reg in registrations" 
                :key="reg.id" 
                class="hover:bg-gray-50 transition-colors"
              >
                <td class="p-4">
                  <div class="font-semibold text-gray-800">{{ reg.spm?.title || 'Event GIBEI' }}</div>
                  <div class="text-xs text-gray-500 mt-1">
                     {{ new Date(reg.spm?.schedule).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) }}
                  </div>
                </td>
                <td class="p-4 text-sm text-gray-600">
                  {{ new Date(reg.createdAt).toLocaleDateString('id-ID') }}
                </td>
                <td class="p-4 text-sm text-gray-600">
                  {{ reg.nim }}
                </td>
                <td class="p-4">
                  <span 
                    :class="['px-3 py-1 rounded-full text-xs font-bold border', getStatusColor(reg.status)]"
                  >
                    {{ getStatusLabel(reg.status) }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

      </div>
    </main>
  </div>
</template>