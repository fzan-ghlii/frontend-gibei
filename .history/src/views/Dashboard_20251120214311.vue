<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import api from '../api'
import { logout } from '../store/auth'

const router = useRouter()

// State
const userProfile = ref(null)
const myRegistrations = ref({ events: [], spm: [] })
const isLoading = ref(true)

// Fetch Data saat Dashboard dimuat
onMounted(async () => {
  try {
    // 1. Ambil Profil User (untuk mendapatkan Nama asli)
    const profileRes = await api.get('/users/me')
    userProfile.value = profileRes.data

    // 2. Ambil Data Registrasi (Event & SPM)
    const regRes = await api.get('/registrations/me')
    myRegistrations.value = regRes.data
  } catch (error) {
    console.error('Gagal memuat dashboard:', error)
    // Jika error 401 (Unauthorized), berarti token expired/invalid
    if (error.response && error.response.status === 401) {
      logout()
      router.push('/login')
    }
  } finally {
    isLoading.value = false
  }
})

// Helper: Format Tanggal Indonesia
const formatDate = (dateString) => {
  if (!dateString) return '-'
  return new Date(dateString).toLocaleDateString('id-ID', {
    day: 'numeric', month: 'long', year: 'numeric'
  })
}

// Helper: Warna Badge Status
const getStatusColor = (status) => {
  switch (status) {
    case 'APPROVED': return 'bg-green-100 text-green-800 border-green-200'
    case 'REJECTED': return 'bg-red-100 text-red-800 border-red-200'
    default: return 'bg-yellow-100 text-yellow-800 border-yellow-200' // PENDING
  }
}

// Computed Stats
const totalEvents = computed(() => myRegistrations.value.events.length)
const totalSpm = computed(() => myRegistrations.value.spm.length)

const handleLogout = () => {
  logout()
  router.push('/')
}
</script>

<template>
  <div class="bg-gray-50 min-h-screen font-inter">
    
    <!-- Header Dashboard -->
    <header class="bg-gibei-primary text-white pt-24 pb-32">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-end">
          <div v-motion :initial="{ opacity: 0, x: -20 }" :enter="{ opacity: 1, x: 0 }">
            <p class="text-blue-200 font-medium mb-1">Selamat Datang,</p>
            <h1 class="font-poppins text-3xl md:text-4xl font-bold">
              {{ userProfile?.nama || 'Investor' }} 👋
            </h1>
          </div>
          <button 
            @click="handleLogout"
            class="bg-white/10 hover:bg-white/20 text-white px-5 py-2.5 rounded-lg font-medium transition backdrop-blur-sm border border-white/10"
          >
            Logout
          </button>
        </div>
      </div>
    </header>

    <!-- Konten Utama (Overlap Header) -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 pb-20">
      
      <!-- 1. Kartu Statistik -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <!-- Stat Event -->
        <div class="bg-white p-6 rounded-xl shadow-lg border border-gray-100 flex items-center gap-4">
          <div class="p-3 bg-blue-50 text-blue-600 rounded-lg">
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
          </div>
          <div>
            <p class="text-gray-500 text-sm font-medium">Event Diikuti</p>
            <h3 class="text-2xl font-bold text-gray-800">{{ totalEvents }}</h3>
          </div>
        </div>

        <!-- Stat SPM -->
        <div class="bg-white p-6 rounded-xl shadow-lg border border-gray-100 flex items-center gap-4">
          <div class="p-3 bg-purple-50 text-purple-600 rounded-lg">
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v11.494m0 0L7.5 12.5m4.5 5.247L16.5 12.5"></path></svg>
          </div>
          <div>
            <p class="text-gray-500 text-sm font-medium">SPM Terdaftar</p>
            <h3 class="text-2xl font-bold text-gray-800">{{ totalSpm }}</h3>
          </div>
        </div>

        <!-- Stat Akun -->
        <div class="bg-white p-6 rounded-xl shadow-lg border border-gray-100 flex items-center gap-4">
          <div class="p-3 bg-green-50 text-green-600 rounded-lg">
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          </div>
          <div>
            <p class="text-gray-500 text-sm font-medium">Status Akun</p>
            <h3 class="text-2xl font-bold text-gray-800">Aktif</h3>
          </div>
        </div>
      </div>

      <!-- 2. Riwayat Pendaftaran -->
      <div class="grid lg:grid-cols-3 gap-8">
        
        <!-- Kolom Kiri: Tabel Registrasi (Lebar) -->
        <div class="lg:col-span-2 space-y-8">
          
          <!-- List Event -->
          <div class="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
            <div class="px-6 py-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
              <h2 class="font-poppins font-semibold text-gray-800">Event Saya</h2>
            </div>
            
            <!-- Loading / Empty State -->
            <div v-if="isLoading" class="p-8 text-center text-gray-500">Memuat data...</div>
            <div v-else-if="myRegistrations.events.length === 0" class="p-10 text-center">
              <p class="text-gray-500 mb-4">Belum ada event yang diikuti.</p>
              <router-link to="/events" class="inline-block text-sm text-gibei-primary font-semibold hover:underline">
                + Cari Event Baru
              </router-link>
            </div>
            
            <!-- Data Loop -->
            <ul v-else class="divide-y divide-gray-100">
              <li v-for="reg in myRegistrations.events" :key="reg.id" class="p-6 hover:bg-gray-50 transition group">
                <div class="flex flex-col sm:flex-row justify-between sm:items-start gap-4">
                  <div>
                    <h4 class="font-bold text-gibei-primary group-hover:text-blue-800 transition-colors">{{ reg.event.title }}</h4>
                    <div class="text-sm text-gray-500 mt-2 space-y-1">
                      <p class="flex items-center">
                        <svg class="w-4 h-4 mr-2 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                        {{ formatDate(reg.event.date) }}
                      </p>
                      <p class="flex items-center">
                        <svg class="w-4 h-4 mr-2 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                        {{ reg.event.location }}
                      </p>
                    </div>
                  </div>
                  <span :class="['px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase border', getStatusColor(reg.status)]">
                    {{ reg.status }}
                  </span>
                </div>
              </li>
            </ul>
          </div>

          <!-- List SPM -->
          <div class="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
            <div class="px-6 py-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
              <h2 class="font-poppins font-semibold text-gray-800">Jadwal SPM Saya</h2>
            </div>
            
            <div v-if="isLoading" class="p-8 text-center text-gray-500">Memuat data...</div>
            <div v-else-if="myRegistrations.spm.length === 0" class="p-10 text-center">
              <p class="text-gray-500 mb-4">Belum mendaftar SPM.</p>
              <router-link to="/spm" class="inline-block text-sm text-gibei-primary font-semibold hover:underline">
                + Daftar SPM Sekarang
              </router-link>
            </div>

            <ul v-else class="divide-y divide-gray-100">
              <li v-for="reg in myRegistrations.spm" :key="reg.id" class="p-6 hover:bg-gray-50 transition group">
                <div class="flex flex-col sm:flex-row justify-between sm:items-start gap-4">
                  <div>
                    <h4 class="font-bold text-gibei-primary group-hover:text-blue-800 transition-colors">{{ reg.spm.title }}</h4>
                    <p class="text-sm text-gray-500 mt-2 flex items-center mb-3">
                      <svg class="w-4 h-4 mr-2 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                      {{ formatDate(reg.spm.schedule) }}
                    </p>
                    <div class="inline-block bg-gray-100 rounded px-3 py-1 text-xs text-gray-600 border border-gray-200">
                      <span class="font-semibold">Data Pendaftaran:</span> {{ reg.nim }} - {{ reg.origin }}
                    </div>
                  </div>
                  <span :class="['px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase border', getStatusColor(reg.status)]">
                    {{ reg.status }}
                  </span>
                </div>
              </li>
            </ul>
          </div>

        </div>

        <!-- Kolom Kanan: Profile & Promo -->
        <div class="space-y-6">
          
          <!-- Mini Profile Card -->
          <div class="bg-white p-6 rounded-xl shadow-md border border-gray-100">
            <h3 class="font-poppins font-bold text-gray-800 mb-4 border-b pb-2">Profil Saya</h3>
            <div class="space-y-4 text-sm">
              <div>
                <label class="block text-xs text-gray-400 uppercase font-bold tracking-wider mb-1">Nama Lengkap</label>
                <p class="text-gray-800 font-medium">{{ userProfile?.nama || '-' }}</p>
              </div>
              <div>
                <label class="block text-xs text-gray-400 uppercase font-bold tracking-wider mb-1">Email</label>
                <p class="text-gray-800 font-medium truncate">{{ userProfile?.email || '-' }}</p>
              </div>
              <div>
                <label class="block text-xs text-gray-400 uppercase font-bold tracking-wider mb-1">Role</label>
                <span class="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded font-semibold">
                  {{ userProfile?.role || 'USER' }}
                </span>
              </div>
            </div>
          </div>

          <!-- Info Banner -->
          <div class="bg-gradient-to-br from-gibei-primary to-[#2c5c85] rounded-xl shadow-md p-6 text-white text-center relative overflow-hidden">
            <!-- Background pattern decoration -->
            <div class="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-white opacity-10 rounded-full blur-2xl"></div>
            
            <h3 class="font-bold text-lg mb-2 relative z-10">Butuh Bantuan?</h3>
            <p class="text-blue-100 text-sm mb-6 relative z-10 leading-relaxed">
              Jika status pendaftaran Anda tidak berubah lebih dari 3 hari, silakan hubungi admin.
            </p>
            <router-link to="/kontak" class="relative z-10 inline-block bg-white text-gibei-primary px-6 py-2 rounded-lg font-semibold text-sm hover:bg-gray-100 transition shadow-sm">
              Hubungi Admin
            </router-link>
          </div>

        </div>

      </div>
    </main>
  </div>
</template>