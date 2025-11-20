<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import api from '../api'
import { isLoggedIn, currentUser, logout } from '../store/auth'

const router = useRouter()

// State
const activeTab = ref('article') // 'article', 'event', 'spm'
const isLoading = ref(false)
const uploadUrl = ref('')
const successMessage = ref('')
const errorMessage = ref('')

// Forms Data
const articleForm = ref({ title: '', content: '', imageUrl: '', category: 'Edukasi' })
const eventForm = ref({ title: '', description: '', date: '', location: '', imageUrl: '' })
const spmForm = ref({ title: '', description: '', schedule: '', quota: 100 })

// Cek Akses Admin saat dimuat
onMounted(() => {
  if (!isLoggedIn.value || (currentUser.value?.role !== 'ADMIN' && currentUser.value?.role !== 'MASTER_ADMIN')) {
    alert('Akses Ditolak. Halaman ini khusus Admin.')
    router.push('/')
  }
})

// --- FUNGSI UPLOAD GAMBAR ---
const handleFileUpload = async (event) => {
  const file = event.target.files[0]
  if (!file) return

  const formData = new FormData()
  formData.append('file', file)

  try {
    isLoading.value = true
    // POST ke /uploads
    const response = await api.post('/uploads', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
    uploadUrl.value = response.data.url
    
    // Auto-fill URL ke form yang aktif
    if (activeTab.value === 'article') articleForm.value.imageUrl = uploadUrl.value
    if (activeTab.value === 'event') eventForm.value.imageUrl = uploadUrl.value
    
    alert('Upload Berhasil!')
  } catch (error) {
    console.error(error)
    alert('Gagal upload gambar.')
  } finally {
    isLoading.value = false
  }
}

// --- FUNGSI SUBMIT ---

const submitArticle = async () => {
  try {
    isLoading.value = true
    await api.post('/articles', articleForm.value)
    successMessage.value = 'Artikel Berhasil Dibuat!'
    articleForm.value = { title: '', content: '', imageUrl: '', category: 'Edukasi' }
    uploadUrl.value = ''
  } catch (error) {
    errorMessage.value = 'Gagal membuat artikel.'
  } finally {
    isLoading.value = false
  }
}

const submitEvent = async () => {
  try {
    isLoading.value = true
    // Pastikan format date ISO-8601
    const payload = { ...eventForm.value, date: new Date(eventForm.value.date).toISOString() }
    await api.post('/events', payload)
    successMessage.value = 'Event Berhasil Dibuat!'
    eventForm.value = { title: '', description: '', date: '', location: '', imageUrl: '' }
    uploadUrl.value = ''
  } catch (error) {
    errorMessage.value = 'Gagal membuat event.'
  } finally {
    isLoading.value = false
  }
}

const submitSpm = async () => {
  try {
    isLoading.value = true
    const payload = { ...spmForm.value, schedule: new Date(spmForm.value.schedule).toISOString() }
    await api.post('/spm', payload)
    successMessage.value = 'Jadwal SPM Berhasil Dibuat!'
    spmForm.value = { title: '', description: '', schedule: '', quota: 100 }
  } catch (error) {
    errorMessage.value = 'Gagal membuat SPM.'
  } finally {
    isLoading.value = false
  }
}

const handleLogout = () => {
  logout()
  router.push('/')
}
</script>

<template>
  <div class="min-h-screen bg-gray-100 font-inter">
    
    <!-- Sidebar / Header Sederhana -->
    <header class="bg-gray-800 text-white p-4 flex justify-between items-center shadow-md">
      <div class="flex items-center gap-4">
        <h1 class="font-poppins font-bold text-xl">Admin Panel GIBEI</h1>
        <span class="bg-gray-700 px-3 py-1 rounded text-xs">Logged as: {{ currentUser?.nama }}</span>
      </div>
      <button @click="handleLogout" class="text-sm bg-red-600 hover:bg-red-700 px-4 py-2 rounded transition">Logout</button>
    </header>

    <div class="max-w-6xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-4 gap-6">
      
      <!-- Sidebar Menu -->
      <aside class="bg-white p-4 rounded-lg shadow h-fit">
        <nav class="space-y-2">
          <button 
            @click="activeTab = 'article'; successMessage=''; errorMessage=''"
            :class="['w-full text-left px-4 py-2 rounded transition', activeTab === 'article' ? 'bg-blue-100 text-blue-700 font-bold' : 'hover:bg-gray-100']"
          >
            📝 Kelola Artikel
          </button>
          <button 
            @click="activeTab = 'event'; successMessage=''; errorMessage=''"
            :class="['w-full text-left px-4 py-2 rounded transition', activeTab === 'event' ? 'bg-blue-100 text-blue-700 font-bold' : 'hover:bg-gray-100']"
          >
            📅 Kelola Event
          </button>
          <button 
            @click="activeTab = 'spm'; successMessage=''; errorMessage=''"
            :class="['w-full text-left px-4 py-2 rounded transition', activeTab === 'spm' ? 'bg-blue-100 text-blue-700 font-bold' : 'hover:bg-gray-100']"
          >
            🎓 Kelola SPM
          </button>
        </nav>
      </aside>

      <!-- Main Content Form -->
      <main class="lg:col-span-3 bg-white p-8 rounded-lg shadow">
        
        <!-- Pesan Sukses/Error -->
        <div v-if="successMessage" class="mb-4 p-4 bg-green-100 text-green-700 rounded">{{ successMessage }}</div>
        <div v-if="errorMessage" class="mb-4 p-4 bg-red-100 text-red-700 rounded">{{ errorMessage }}</div>

        <!-- FORM ARTIKEL -->
        <div v-if="activeTab === 'article'">
          <h2 class="text-2xl font-bold mb-6">Buat Artikel Baru</h2>
          <form @submit.prevent="submitArticle" class="space-y-4">
            <!-- Upload Image -->
            <div class="border-2 border-dashed border-gray-300 p-4 rounded text-center">
              <p class="mb-2 text-sm text-gray-500">Upload Gambar Artikel</p>
              <input type="file" @change="handleFileUpload" accept="image/*" class="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"/>
              <p v-if="uploadUrl" class="mt-2 text-xs text-green-600 break-all">URL: {{ uploadUrl }}</p>
            </div>
            
            <input v-model="articleForm.title" type="text" placeholder="Judul Artikel" class="w-full border p-2 rounded" required>
            <select v-model="articleForm.category" class="w-full border p-2 rounded">
              <option value="Edukasi">Edukasi</option>
              <option value="Berita">Berita</option>
              <option value="Analisis">Analisis</option>
            </select>
            <textarea v-model="articleForm.content" rows="6" placeholder="Isi Artikel..." class="w-full border p-2 rounded" required></textarea>
            <input v-model="articleForm.imageUrl" type="text" placeholder="URL Gambar (Otomatis terisi setelah upload)" class="w-full border p-2 rounded bg-gray-50" readonly required>
            
            <button type="submit" :disabled="isLoading" class="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-50">Simpan Artikel</button>
          </form>
        </div>

        <!-- FORM EVENT -->
        <div v-if="activeTab === 'event'">
          <h2 class="text-2xl font-bold mb-6">Buat Event Baru</h2>
          <form @submit.prevent="submitEvent" class="space-y-4">
            <div class="border-2 border-dashed border-gray-300 p-4 rounded text-center">
              <p class="mb-2 text-sm text-gray-500">Upload Poster Event</p>
              <input type="file" @change="handleFileUpload" accept="image/*" class="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"/>
              <p v-if="uploadUrl" class="mt-2 text-xs text-green-600 break-all">URL: {{ uploadUrl }}</p>
            </div>

            <input v-model="eventForm.title" type="text" placeholder="Nama Event" class="w-full border p-2 rounded" required>
            <textarea v-model="eventForm.description" rows="4" placeholder="Deskripsi Event" class="w-full border p-2 rounded" required></textarea>
            <div class="grid grid-cols-2 gap-4">
              <input v-model="eventForm.date" type="datetime-local" class="w-full border p-2 rounded" required>
              <input v-model="eventForm.location" type="text" placeholder="Lokasi (Zoom / Gedung X)" class="w-full border p-2 rounded" required>
            </div>
            <input v-model="eventForm.imageUrl" type="text" placeholder="URL Poster" class="w-full border p-2 rounded bg-gray-50" readonly required>

            <button type="submit" :disabled="isLoading" class="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-50">Simpan Event</button>
          </form>
        </div>

        <!-- FORM SPM -->
        <div v-if="activeTab === 'spm'">
          <h2 class="text-2xl font-bold mb-6">Buka Jadwal SPM Baru</h2>
          <form @submit.prevent="submitSpm" class="space-y-4">
            <input v-model="spmForm.title" type="text" placeholder="Judul (cth: SPM Batch 10)" class="w-full border p-2 rounded" required>
            <textarea v-model="spmForm.description" rows="3" placeholder="Deskripsi singkat..." class="w-full border p-2 rounded" required></textarea>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="text-xs text-gray-500">Jadwal Pelaksanaan</label>
                <input v-model="spmForm.schedule" type="datetime-local" class="w-full border p-2 rounded" required>
              </div>
              <div>
                <label class="text-xs text-gray-500">Kuota Peserta</label>
                <input v-model="spmForm.quota" type="number" class="w-full border p-2 rounded" required>
              </div>
            </div>
            <button type="submit" :disabled="isLoading" class="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-50">Buka Pendaftaran SPM</button>
          </form>
        </div>

      </main>
    </div>
  </div>
</template>