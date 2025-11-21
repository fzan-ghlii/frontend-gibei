<template>
  <div class="flex h-screen bg-gray-100 font-sans">
    <!-- Sidebar -->
    <aside class="w-64 bg-white shadow-md hidden md:flex flex-col">
      <div class="p-6 flex items-center border-b">
        <img src="/logo-gibei.png" alt="Logo" class="h-8 w-8 mr-3" />
        <span class="text-lg font-bold text-gray-800">Admin Panel</span>
      </div>
      <nav class="flex-1 p-4 space-y-2">
        <button
          @click="activeTab = 'dashboard'"
          :class="['w-full text-left px-4 py-2 rounded-lg transition-colors flex items-center', activeTab === 'dashboard' ? 'bg-indigo-50 text-indigo-600 font-medium' : 'text-gray-600 hover:bg-gray-50']"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
          Dashboard
        </button>
        
        <button
          @click="activeTab = 'spm'"
          :class="['w-full text-left px-4 py-2 rounded-lg transition-colors flex items-center', activeTab === 'spm' ? 'bg-indigo-50 text-indigo-600 font-medium' : 'text-gray-600 hover:bg-gray-50']"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
          Manajemen SPM
        </button>

        <button disabled class="w-full text-left px-4 py-2 rounded-lg text-gray-400 cursor-not-allowed flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
          Events (Segera)
        </button>
        
        <button disabled class="w-full text-left px-4 py-2 rounded-lg text-gray-400 cursor-not-allowed flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
          Gallery (Segera)
        </button>
      </nav>
      <div class="p-4 border-t">
        <button @click="handleLogout" class="w-full px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg flex items-center transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
          Logout
        </button>
      </div>
    </aside>

    <!-- Main Content -->
    <main class="flex-1 overflow-y-auto p-4 md:p-8">
      <!-- Mobile Menu Toggle -->
      <div class="md:hidden mb-6 flex justify-between items-center">
        <h1 class="text-xl font-bold text-gray-800">Admin Panel</h1>
        <button @click="mobileMenuOpen = !mobileMenuOpen" class="text-gray-600">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" /></svg>
        </button>
      </div>

      <!-- Dashboard Welcome View -->
      <div v-if="activeTab === 'dashboard'">
        <h2 class="text-2xl font-bold text-gray-800 mb-4">Selamat Datang, Admin</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 class="text-gray-500 text-sm font-medium">Total Pendaftar SPM</h3>
            <p class="text-3xl font-bold text-indigo-600 mt-2">{{ spmStats.total }}</p>
          </div>
          <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 class="text-gray-500 text-sm font-medium">Menunggu Verifikasi</h3>
            <p class="text-3xl font-bold text-yellow-500 mt-2">{{ spmStats.pending }}</p>
          </div>
          <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 class="text-gray-500 text-sm font-medium">Kelas Aktif</h3>
            <p class="text-3xl font-bold text-green-600 mt-2">{{ spmList.length }}</p>
          </div>
        </div>
      </div>

      <!-- SPM Management View -->
      <div v-if="activeTab === 'spm'">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-2xl font-bold text-gray-800">Manajemen SPM</h2>
          
          <!-- Toggle Sub-tabs -->
          <div class="bg-gray-200 p-1 rounded-lg inline-flex">
            <button 
              @click="spmSubTab = 'classes'"
              :class="['px-4 py-2 text-sm font-medium rounded-md transition-all', spmSubTab === 'classes' ? 'bg-white text-gray-800 shadow-sm' : 'text-gray-600 hover:text-gray-800']"
            >
              Daftar Kelas
            </button>
            <button 
              @click="spmSubTab = 'registrations'"
              :class="['px-4 py-2 text-sm font-medium rounded-md transition-all', spmSubTab === 'registrations' ? 'bg-white text-gray-800 shadow-sm' : 'text-gray-600 hover:text-gray-800']"
            >
              Verifikasi Pendaftar
            </button>
          </div>
        </div>

        <!-- Sub-tab: Classes List -->
        <div v-if="spmSubTab === 'classes'">
          <div class="mb-4 flex justify-end">
            <button @click="openSpmModal()" class="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 flex items-center transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" /></svg>
              Buat Kelas Baru
            </button>
          </div>

          <div class="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
            <table class="w-full text-left border-collapse">
              <thead class="bg-gray-50">
                <tr>
                  <th class="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Judul Kelas</th>
                  <th class="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Jadwal</th>
                  <th class="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Kuota</th>
                  <th class="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Aksi</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-100">
                <tr v-for="spm in spmList" :key="spm.id" class="hover:bg-gray-50 transition-colors">
                  <td class="p-4 font-medium text-gray-800">{{ spm.title }}</td>
                  <td class="p-4 text-gray-600">{{ formatDate(spm.schedule) }}</td>
                  <td class="p-4 text-gray-600">{{ spm.quota }} Peserta</td>
                  <td class="p-4 text-right space-x-2">
                    <button @click="openSpmModal(spm)" class="text-indigo-600 hover:text-indigo-800 text-sm font-medium">Edit</button>
                    <button @click="deleteSpm(spm.id)" class="text-red-600 hover:text-red-800 text-sm font-medium">Hapus</button>
                  </td>
                </tr>
                <tr v-if="spmList.length === 0">
                  <td colspan="4" class="p-8 text-center text-gray-500">Belum ada kelas SPM yang dibuat.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Sub-tab: Registrations List -->
        <div v-if="spmSubTab === 'registrations'">
          <div class="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
            <table class="w-full text-left border-collapse">
              <thead class="bg-gray-50">
                <tr>
                  <th class="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Nama Peserta</th>
                  <th class="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Info Kontak</th>
                  <th class="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Pilihan Kelas</th>
                  <th class="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                  <th class="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Verifikasi</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-100">
                <tr v-for="reg in spmRegistrations" :key="reg.id" class="hover:bg-gray-50 transition-colors">
                  <td class="p-4">
                    <div class="font-medium text-gray-800">{{ reg.user?.nama || 'User' }}</div>
                    <div class="text-xs text-gray-500">{{ reg.nim }}</div>
                  </td>
                  <td class="p-4">
                    <div class="text-sm text-gray-600">{{ reg.phone }}</div>
                    <div class="text-xs text-gray-500">{{ reg.origin }}</div>
                  </td>
                  <td class="p-4 text-sm text-gray-600">
                    {{ reg.spm?.title || 'Kelas Dihapus' }}
                  </td>
                  <td class="p-4">
                    <span :class="getStatusBadgeClass(reg.status)">
                      {{ reg.status }}
                    </span>
                  </td>
                  <td class="p-4 text-right space-x-2">
                    <button 
                      v-if="reg.status === 'PENDING'" 
                      @click="updateStatus(reg.id, 'APPROVED')" 
                      class="bg-green-100 text-green-700 hover:bg-green-200 px-3 py-1 rounded text-xs font-medium transition-colors"
                    >
                      Approve
                    </button>
                    <button 
                      v-if="reg.status === 'PENDING'" 
                      @click="updateStatus(reg.id, 'REJECTED')" 
                      class="bg-red-100 text-red-700 hover:bg-red-200 px-3 py-1 rounded text-xs font-medium transition-colors"
                    >
                      Reject
                    </button>
                    <span v-else class="text-xs text-gray-400 italic">Selesai</span>
                  </td>
                </tr>
                <tr v-if="spmRegistrations.length === 0">
                  <td colspan="5" class="p-8 text-center text-gray-500">Belum ada pendaftar.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>

    <!-- SPM Modal (Create/Edit) -->
    <div v-if="showSpmModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-xl shadow-xl w-full max-w-md p-6">
        <h3 class="text-xl font-bold text-gray-800 mb-4">{{ isEditing ? 'Edit Kelas SPM' : 'Buat Kelas SPM Baru' }}</h3>
        
        <form @submit.prevent="submitSpmForm" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Judul Kelas / Batch</label>
            <input v-model="spmForm.title" required type="text" class="w-full rounded-lg border-gray-300 border px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none" placeholder="Contoh: SPM Level 1 - Batch 12" />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Deskripsi</label>
            <textarea v-model="spmForm.description" rows="3" class="w-full rounded-lg border-gray-300 border px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"></textarea>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Tanggal & Jam</label>
              <input v-model="spmForm.schedule" required type="datetime-local" class="w-full rounded-lg border-gray-300 border px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Kuota</label>
              <input v-model="spmForm.quota" required type="number" class="w-full rounded-lg border-gray-300 border px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none" />
            </div>
          </div>

          <div class="flex justify-end space-x-3 mt-6">
            <button type="button" @click="showSpmModal = false" class="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg font-medium">Batal</button>
            <button type="submit" class="px-4 py-2 bg-indigo-600 text-white hover:bg-indigo-700 rounded-lg font-medium">Simpan</button>
          </div>
        </form>
      </div>
    </div>

    <!-- Simple Toast Notification -->
    <div v-if="notification.show" :class="['fixed bottom-4 right-4 px-6 py-3 rounded-lg shadow-lg text-white text-sm font-medium z-50 transition-all transform translate-y-0', notification.type === 'error' ? 'bg-red-600' : 'bg-green-600']">
      {{ notification.message }}
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, reactive } from 'vue'
import api from '../api'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../store/auth'

const router = useRouter()
const authStore = useAuthStore()

// --- State Management ---
const activeTab = ref('dashboard') // 'dashboard', 'spm'
const spmSubTab = ref('classes')   // 'classes', 'registrations'
const mobileMenuOpen = ref(false)

// Data State
const spmList = ref([])
const spmRegistrations = ref([])
const loading = ref(false)

// Modal State
const showSpmModal = ref(false)
const isEditing = ref(false)
const editingId = ref(null)

// Form State
const spmForm = reactive({
  title: '',
  description: '',
  schedule: '',
  quota: 100
})

// Notification State
const notification = reactive({
  show: false,
  message: '',
  type: 'success'
})

// --- Computed Stats ---
const spmStats = computed(() => {
  const pending = spmRegistrations.value.filter(r => r.status === 'PENDING').length
  return {
    total: spmRegistrations.value.length,
    pending: pending
  }
})

// --- Methods ---

const showNotification = (msg, type = 'success') => {
  notification.message = msg
  notification.type = type
  notification.show = true
  setTimeout(() => { notification.show = false }, 3000)
}

const handleLogout = () => {
  authStore.logout()
  router.push('/login')
}

// Helper Date
const formatDate = (dateString) => {
  if (!dateString) return '-'
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' }
  return new Date(dateString).toLocaleDateString('id-ID', options)
}

const getStatusBadgeClass = (status) => {
  switch (status) {
    case 'APPROVED': return 'bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-bold'
    case 'REJECTED': return 'bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-bold'
    default: return 'bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-bold'
  }
}

// --- API Calls: SPM Classes ---

const fetchSpmList = async () => {
  try {
    const response = await api.get('/spm')
    spmList.value = response.data
  } catch (error) {
    console.error("Gagal memuat data SPM", error)
  }
}

const openSpmModal = (spm = null) => {
  if (spm) {
    isEditing.value = true
    editingId.value = spm.id
    spmForm.title = spm.title
    spmForm.description = spm.description
    spmForm.quota = spm.quota
    // Format date for input datetime-local (YYYY-MM-DDTHH:mm)
    const d = new Date(spm.schedule)
    d.setMinutes(d.getMinutes() - d.getTimezoneOffset())
    spmForm.schedule = d.toISOString().slice(0, 16)
  } else {
    isEditing.value = false
    editingId.value = null
    spmForm.title = ''
    spmForm.description = ''
    spmForm.schedule = ''
    spmForm.quota = 100
  }
  showSpmModal.value = true
}

const submitSpmForm = async () => {
  try {
    const payload = {
      ...spmForm,
      schedule: new Date(spmForm.schedule).toISOString(),
      quota: parseInt(spmForm.quota)
    }

    if (isEditing.value) {
      await api.patch(`/spm/${editingId.value}`, payload)
      showNotification('Kelas SPM berhasil diperbarui')
    } else {
      await api.post('/spm', payload)
      showNotification('Kelas SPM berhasil dibuat')
    }
    showSpmModal.value = false
    fetchSpmList()
  } catch (error) {
    showNotification('Gagal menyimpan data', 'error')
    console.error(error)
  }
}

const deleteSpm = async (id) => {
  if (!confirm('Apakah Anda yakin ingin menghapus kelas ini?')) return
  try {
    await api.delete(`/spm/${id}`)
    showNotification('Kelas SPM dihapus')
    fetchSpmList()
  } catch (error) {
    showNotification('Gagal menghapus data', 'error')
  }
}

// --- API Calls: Registrations ---

const fetchRegistrations = async () => {
  try {
    // Mengasumsikan endpoint backend untuk mendapatkan semua pendaftar SPM
    // Jika belum ada di backend, perlu dibuat Controller: @Get('spm') di registrations.controller.ts
    const response = await api.get('/registrations/spm/all') 
    spmRegistrations.value = response.data
  } catch (error) {
    console.error("Gagal memuat pendaftar", error)
    // Mock data jika backend belum siap, agar UI terlihat
    // spmRegistrations.value = [
    //   { id: 1, status: 'PENDING', nim: '123456', origin: 'FEB', phone: '08123', user: { nama: 'Budi' }, spm: { title: 'Batch 1' } }
    // ]
  }
}

const updateStatus = async (regId, newStatus) => {
  try {
    // Mengasumsikan endpoint backend: PATCH /registrations/:id/status
    await api.patch(`/registrations/${regId}/status`, { status: newStatus })
    showNotification(`Status berhasil diubah menjadi ${newStatus}`)
    fetchRegistrations() // Refresh data
  } catch (error) {
    showNotification('Gagal mengubah status', 'error')
  }
}

onMounted(() => {
  fetchSpmList()
  fetchRegistrations()
})
</script>