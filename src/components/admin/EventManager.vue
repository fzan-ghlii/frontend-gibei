<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-2xl font-bold text-gray-800">Manajemen Event & Webinar</h2>
      <button @click="alert('Fitur Segera Hadir')" class="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 shadow-sm">
        + Tambah Event
      </button>
    </div>

    <div class="bg-white rounded-xl shadow-sm p-8 text-center border border-gray-100">
      <div class="text-6xl mb-4">📅</div>
      <h3 class="text-xl font-medium text-gray-800 mb-2">Kelola Event Anda Disini</h3>
      <p class="text-gray-500 max-w-md mx-auto">
        Halaman ini akan digunakan untuk membuat event baru, mengupload poster event, dan melihat siapa saja mahasiswa yang mendaftar ke event tersebut.
      </p>
      <div class="mt-6 p-4 bg-yellow-50 text-yellow-700 rounded-lg inline-block text-sm">
        🚧 Modul ini sedang dalam pengembangan tahap selanjutnya.
      </div>
    </div>
  </div>
</template>

<script setup>
// Logic CRUD Event akan ditambahkan di sini nanti
const alert = (msg) => window.alert(msg)
</script>