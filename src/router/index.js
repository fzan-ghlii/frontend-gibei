import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Events from '../views/Events.vue'
import SPM from '../views/SPM.vue'
import Articles from '../views/Articles.vue'
import Gallery from '../views/Gallery.vue'
// 1. Impor Halaman Kontak
import Contact from '../views/Contact.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/about', name: 'About', component: About },
  { path: '/events', name: 'Events', component: Events },
  { path: '/spm', name: 'SPM', component: SPM },
  { path: '/artikel', name: 'Artikel', component: Articles },
  { path: '/gallery', name: 'Gallery', component: Gallery },
  // 2. Tambahkan Rute Kontak
  {
    path: '/kontak',
    name: 'Kontak',
    component: Contact,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  // Fungsi ini akan auto-scroll ke atas setiap pindah halaman
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  },
})

export default router