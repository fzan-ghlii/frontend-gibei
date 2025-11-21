<template>
  <div class="flex h-screen bg-gray-100 font-sans">
    <!-- Sidebar -->
    <aside :class="['fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0', mobileMenuOpen ? 'translate-x-0' : '-translate-x-full']">
      <div class="p-6 flex items-center border-b h-20">
        <img src="/logo-gibei.png" alt="Logo" class="h-10 w-10 mr-3" />
        <div>
          <h1 class="text-lg font-bold text-gray-800 tracking-tight">GIBEI Admin</h1>
          <p class="text-xs text-gray-500">Control Panel</p>
        </div>
      </div>
      
      <nav class="flex-1 p-4 space-y-2 overflow-y-auto">
        <div class="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 mt-2 px-4">Menu Utama</div>
        
        <button @click="switchTab('dashboard')" :class="navClass('dashboard')">
          <span class="mr-3">🏠</span> Dashboard
        </button>
        
        <button @click="switchTab('spm')" :class="navClass('spm')">
          <span class="mr-3">🎓</span> Manajemen SPM
        </button>

        <button @click="switchTab('events')" :class="navClass('events')">
          <span class="mr-3">📅</span> Events & Webinar
        </button>
        
        <div class="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 mt-6 px-4">Konten</div>
        
        <button disabled class="w-full text-left px-4 py-3 rounded-lg text-gray-400 cursor-not-allowed flex items-center opacity-60">
          <span class="mr-3">📝</span> Artikel (Soon)
        </button>
        
        <button disabled class="w-full text-left px-4 py-3 rounded-lg text-gray-400 cursor-not-allowed flex items-center opacity-60">
          <span class="mr-3">🖼️</span> Galeri (Soon)
        </button>
      </nav>

      <div class="p-4 border-t bg-gray-50">
        <button @click="handleLogout" class="w-full px-4 py-2 text-red-600 hover:bg-red-100 rounded-lg flex items-center justify-center transition-colors font-medium border border-red-200 hover:border-red-300">
          Logout
        </button>
      </div>
    </aside>

    <!-- Overlay for mobile -->
    <div v-if="mobileMenuOpen" @click="mobileMenuOpen = false" class="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"></div>

    <!-- Main Content Area -->
    <main class="flex-1 overflow-y-auto h-full flex flex-col">
      <!-- Mobile Header -->
      <header class="bg-white shadow-sm p-4 md:hidden flex justify-between items-center sticky top-0 z-30">
        <div class="font-bold text-gray-800">GIBEI Admin Panel</div>
        <button @click="mobileMenuOpen = !mobileMenuOpen" class="text-gray-600 focus:outline-none p-2 bg-gray-100 rounded">
          <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" /></svg>
        </button>
      </header>

      <div class="p-6 md:p-10 flex-1">
        <!-- CONTENT RENDERER -->
        <Transition name="fade" mode="out-in">
          
          <!-- 1. DASHBOARD HOME -->
          <div v-if="activeTab === 'dashboard'" key="dashboard">
            <h2 class="text-3xl font-bold text-gray-800 mb-2">Selamat Datang, Admin! 👋</h2>
            <p class="text-gray-500 mb-8">Berikut adalah ringkasan aktivitas Galeri Investasi hari ini.</p>
            
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div class="bg-gradient-to-br from-indigo-500 to-purple-600 p-6 rounded-2xl shadow-lg text-white">
                <h3 class="text-white/80 text-sm font-medium mb-1">Total Pendaftar SPM</h3>
                <p class="text-4xl font-bold">--</p> <!-- Nanti dihubungkan ke props -->
                <div class="mt-4 text-xs bg-white/20 inline-block px-2 py-1 rounded">Data Realtime</div>
              </div>
              
              <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h3 class="text-gray-500 text-sm font-medium mb-1">Event Aktif</h3>
                <p class="text-4xl font-bold text-gray-800">0</p>
                <p class="text-xs text-green-600 mt-2 flex items-center">
                  <span class="w-2 h-2 bg-green-500 rounded-full mr-1"></span> Berjalan lancar
                </p>
              </div>

              <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h3 class="text-gray-500 text-sm font-medium mb-1">Menunggu Verifikasi</h3>
                <p class="text-4xl font-bold text-yellow-500">--</p>
                <button @click="activeTab = 'spm'" class="text-xs text-indigo-600 mt-2 hover:underline">Lihat detail &rarr;</button>
              </div>
            </div>
          </div>

          <!-- 2. MODULE: SPM MANAGER -->
          <SpmManager v-else-if="activeTab === 'spm'" key="spm" />

          <!-- 3. MODULE: EVENT MANAGER -->
          <EventManager v-else-if="activeTab === 'events'" key="events" />

        </Transition>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import SpmManager from '../components/admin/SpmManager.vue'
import EventManager from '../components/admin/EventManager.vue'

const router = useRouter()
const activeTab = ref('dashboard')
const mobileMenuOpen = ref(false)

const switchTab = (tab) => {
  activeTab.value = tab
  mobileMenuOpen.value = false // Close menu on mobile selection
}

const navClass = (tabName) => {
  const base = 'w-full text-left px-4 py-3 rounded-lg transition-all flex items-center font-medium '
  if (activeTab.value === tabName) {
    return base + 'bg-indigo-50 text-indigo-700 shadow-sm border border-indigo-100'
  }
  return base + 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
}

const handleLogout = () => {
  if(confirm('Yakin ingin keluar?')) {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    router.push('/login')
  }
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>