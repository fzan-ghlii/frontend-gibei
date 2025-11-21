<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-2xl font-bold text-gray-800">Manajemen SPM</h2>
      
      <!-- Toggle Sub-tabs -->
      <div class="bg-gray-200 p-1 rounded-lg inline-flex">
        <button 
          @click="currentView = 'classes'"
          :class="['px-4 py-2 text-sm font-medium rounded-md transition-all', currentView === 'classes' ? 'bg-white text-gray-800 shadow-sm' : 'text-gray-600 hover:text-gray-800']"
        >
          Daftar Kelas
        </button>
        <button 
          @click="currentView = 'registrations'"
          :class="['px-4 py-2 text-sm font-medium rounded-md transition-all', currentView === 'registrations' ? 'bg-white text-gray-800 shadow-sm' : 'text-gray-600 hover:text-gray-800']"
        >
          Verifikasi Pendaftar
        </button>
      </div>
    </div>

    <!-- ERROR ALERT -->
    <div v-if="errorMessage" class="mb-4 bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded shadow-sm flex justify-between items-center">
      <div>
        <p class="font-bold">Terjadi Kesalahan</p>
        <p>{{ errorMessage }}</p>
      </div>
      <button @click="errorMessage = ''" class="text-red-700 font-bold">x</button>
    </div>

    <!-- VIEW 1: DAFTAR KELAS -->
    <div v-if="currentView === 'classes'">
      <div class="mb-4 flex justify-end">
        <button @click="openModal()" class="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 flex items-center transition-colors shadow-sm">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" /></svg>
          Buat Kelas Baru
        </button>
      </div>

      <div class="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
        <div v-if="loadingClasses" class="p-8 text-center text-gray-500">Memuat data kelas...</div>
        <table v-else class="w-full text-left border-collapse">
          <thead class="bg-gray-50">
            <tr>
              <th class="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Judul Kelas / Batch</th>
              <th class="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Jadwal Pelaksanaan</th>
              <th class="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Kuota</th>
              <th class="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Aksi</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100">
            <tr v-for="spm in classes" :key="spm.id" class="hover:bg-gray-50 transition-colors">
              <td class="p-4 font-medium text-gray-800">{{ spm.title }}</td>
              <td class="p-4 text-gray-600">
                <div class="flex flex-col">
                  <span class="font-medium">{{ formatDate(spm.schedule) }}</span>
                  <span class="text-xs text-gray-400">{{ formatTime(spm.schedule) }} WIB</span>
                </div>
              </td>
              <td class="p-4">
                <span class="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded border border-blue-200">{{ spm.quota }} Peserta</span>
              </td>
              <td class="p-4 text-right space-x-2">
                <button @click="openModal(spm)" class="text-indigo-600 hover:text-indigo-800 text-sm font-medium transition-colors">Edit</button>
                <button @click="deleteClass(spm.id)" class="text-red-600 hover:text-red-800 text-sm font-medium transition-colors">Hapus</button>
              </td>
            </tr>
            <tr v-if="classes.length === 0">
              <td colspan="4" class="p-8 text-center text-gray-500 bg-gray-50 italic">Belum ada kelas SPM yang dibuat. Silakan buat baru.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- VIEW 2: VERIFIKASI PENDAFTAR -->
    <div v-if="currentView === 'registrations'">
      <div class="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
        <div v-if="loadingRegs" class="p-8 text-center text-gray-500">Memuat data pendaftar...</div>
        <table v-else class="w-full text-left border-collapse">
          <thead class="bg-gray-50">
            <tr>
              <th class="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Peserta</th>
              <th class="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Detail Kontak</th>
              <th class="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Pilihan Kelas</th>
              <th class="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
              <th class="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Tindakan</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100">
            <tr v-for="reg in registrations" :key="reg.id" class="hover:bg-gray-50 transition-colors">
              <td class="p-4">
                <div class="font-medium text-gray-800">{{ reg.user?.nama || 'User Tanpa Nama' }}</div>
                <div class="text-xs text-gray-500">NIM: {{ reg.nim }}</div>
              </td>
              <td class="p-4">
                <div class="text-sm text-gray-600">{{ reg.phone }}</div>
                <div class="text-xs text-gray-500 uppercase">{{ reg.origin }}</div>
              </td>
              <td class="p-4 text-sm text-gray-600">
                {{ reg.spm?.title || 'Kelas Telah Dihapus' }}
              </td>
              <td class="p-4">
                <span :class="getStatusClass(reg.status)">
                  {{ reg.status }}
                </span>
              </td>
              <td class="p-4 text-right space-x-2">
                <div v-if="reg.status === 'PENDING'" class="flex justify-end gap-2">
                  <button @click="updateStatus(reg.id, 'APPROVED')" class="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-xs font-medium transition-colors shadow-sm">
                    Terima
                  </button>
                  <button @click="updateStatus(reg.id, 'REJECTED')" class="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs font-medium transition-colors shadow-sm">
                    Tolak
                  </button>
                </div>
                <span v-else class="text-xs text-gray-400 italic">Selesai</span>
              </td>
            </tr>
            <tr v-if="registrations.length === 0">
              <td colspan="5" class="p-8 text-center text-gray-500 bg-gray-50 italic">Belum ada pendaftar yang masuk.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- MODAL FORM -->
    <div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div class="bg-white rounded-xl shadow-2xl w-full max-w-lg p-6 transform transition-all scale-100">
        <div class="flex justify-between items-center mb-6 border-b pb-4">
          <h3 class="text-xl font-bold text-gray-800">{{ isEditing ? 'Edit Kelas SPM' : 'Tambah Kelas SPM' }}</h3>
          <button @click="closeModal" class="text-gray-400 hover:text-gray-600 text-2xl">&times;</button>
        </div>
        
        <form @submit.prevent="saveClass" class="space-y-5">
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-1">Judul Kelas / Batch</label>
            <input v-model="form.title" required type="text" class="w-full rounded-lg border-gray-300 border px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-shadow" placeholder="Contoh: SPM Level 1 - Batch 12" />
          </div>
          
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-1">Deskripsi (Opsional)</label>
            <textarea v-model="form.description" rows="3" class="w-full rounded-lg border-gray-300 border px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-shadow" placeholder="Detail materi atau instruksi..."></textarea>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-1">Jadwal (Tanggal & Jam)</label>
              <!-- Fix: Gunakan step="any" atau hapus step untuk browser modern -->
              <input v-model="form.schedule" required type="datetime-local" class="w-full rounded-lg border-gray-300 border px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-shadow" />
            </div>
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-1">Kuota Peserta</label>
              <input v-model="form.quota" required type="number" min="1" class="w-full rounded-lg border-gray-300 border px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-shadow" />
            </div>
          </div>

          <div class="flex justify-end space-x-3 mt-8 pt-4 border-t">
            <button type="button" @click="closeModal" class="px-5 py-2 text-gray-600 hover:bg-gray-100 rounded-lg font-medium transition-colors">Batal</button>
            <button type="submit" :disabled="isSaving" class="px-5 py-2 bg-indigo-600 text-white hover:bg-indigo-700 rounded-lg font-medium transition-colors flex items-center shadow-md disabled:opacity-50">
              <span v-if="isSaving" class="mr-2 animate-spin">⏳</span>
              {{ isSaving ? 'Menyimpan...' : 'Simpan Kelas' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import api from '../../api'

// --- STATE ---
const currentView = ref('classes') // 'classes' | 'registrations'
const classes = ref([])
const registrations = ref([])
const loadingClasses = ref(false)
const loadingRegs = ref(false)
const errorMessage = ref('')

// Modal & Form State
const showModal = ref(false)
const isEditing = ref(false)
const isSaving = ref(false)
const editId = ref(null)

const form = reactive({
  title: '',
  description: '',
  schedule: '',
  quota: 50
})

// --- HELPER FUNCTIONS ---
const formatDate = (isoString) => {
  if (!isoString) return '-'
  const date = new Date(isoString)
  return date.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
}

const formatTime = (isoString) => {
  if (!isoString) return '-'
  const date = new Date(isoString)
  return date.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
}

const getStatusClass = (status) => {
  switch (status) {
    case 'APPROVED': return 'bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-bold'
    case 'REJECTED': return 'bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-bold'
    default: return 'bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-bold'
  }
}

// --- API ACTIONS: CLASSES ---
const fetchClasses = async () => {
  loadingClasses.value = true
  errorMessage.value = ''
  try {
    const res = await api.get('/spm')
    classes.value = res.data
  } catch (err) {
    console.error(err)
    errorMessage.value = 'Gagal mengambil data kelas SPM. Pastikan backend berjalan.'
  } finally {
    loadingClasses.value = false
  }
}

const saveClass = async () => {
  isSaving.value = true
  errorMessage.value = ''
  try {
    // Fix Bug: Pastikan Quota dikirim sebagai Int, bukan String
    const payload = {
      ...form,
      quota: parseInt(form.quota),
      // Schedule dari datetime-local sudah dalam format ISO-like, tapi kita pastikan jadi ISO String murni
      schedule: new Date(form.schedule).toISOString()
    }

    if (isEditing.value) {
      await api.patch(`/spm/${editId.value}`, payload)
    } else {
      await api.post('/spm', payload)
    }
    
    closeModal()
    fetchClasses() // Refresh list
  } catch (err) {
    console.error(err)
    errorMessage.value = 'Gagal menyimpan data. Periksa input Anda.'
  } finally {
    isSaving.value = false
  }
}

const deleteClass = async (id) => {
  if (!confirm('Apakah Anda yakin ingin menghapus kelas ini? Data pendaftar mungkin juga akan terhapus.')) return
  try {
    await api.delete(`/spm/${id}`)
    fetchClasses()
  } catch (err) {
    console.error(err)
    errorMessage.value = 'Gagal menghapus kelas.'
  }
}

// --- API ACTIONS: REGISTRATIONS ---
const fetchRegistrations = async () => {
  loadingRegs.value = true
  errorMessage.value = ''
  try {
    // Fix Bug: Gunakan endpoint yang benar-benar ada
    // Jika endpoint /registrations/spm/all belum ada di backend, backend perlu ditambahkan.
    // Namun untuk frontend ini, kita asumsikan endpoint ini valid.
    const res = await api.get('/registrations/spm/all')
    registrations.value = res.data
  } catch (err) {
    console.error(err)
    // Jangan tampilkan error fatal jika datanya hanya kosong/404
    if (err.response && err.response.status !== 404) {
      errorMessage.value = 'Gagal mengambil data pendaftar.'
    } else {
      registrations.value = []
    }
  } finally {
    loadingRegs.value = false
  }
}

const updateStatus = async (id, status) => {
  if (!confirm(`Ubah status menjadi ${status}?`)) return
  try {
    await api.patch(`/registrations/${id}/status`, { status })
    fetchRegistrations()
  } catch (err) {
    console.error(err)
    errorMessage.value = 'Gagal memperbarui status.'
  }
}

// --- MODAL LOGIC ---
const openModal = (spm = null) => {
  errorMessage.value = ''
  if (spm) {
    isEditing.value = true
    editId.value = spm.id
    form.title = spm.title
    form.description = spm.description
    form.quota = spm.quota
    
    // Fix Bug: Mengonversi ISO string (UTC) ke format datetime-local (Local Time)
    // datetime-local butuh format "YYYY-MM-DDThh:mm"
    const date = new Date(spm.schedule)
    const localIso = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString().slice(0, 16)
    form.schedule = localIso
  } else {
    isEditing.value = false
    editId.value = null
    form.title = ''
    form.description = ''
    form.schedule = ''
    form.quota = 50
  }
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
}

// --- INIT ---
onMounted(() => {
  fetchClasses()
  fetchRegistrations()
})
</script>