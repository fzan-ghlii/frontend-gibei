import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Events from '../views/Events.vue'
import SPM from '../views/SPM.vue'
import Articles from '../views/Articles.vue'
import Gallery from '../views/Gallery.vue'
import Contact from '../views/Contact.vue'
import Login from '../views/Login.vue'
// UPGRADE 3: Impor Halaman Dashboard baru
import Dashboard from '../views/Dashboard.vue'
import AdminDashboard from '../views/AdminDashboard.vue'


const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/about', name: 'About', component: About },
  { path: '/events', name: 'Events', component: Events },
  { path: '/spm', name: 'SPM', component: SPM },
  { path: '/artikel', name: 'Artikel', component: Articles },
  { path: '/gallery', name: 'Gallery', component: Gallery },
  { path: '/kontak', name: 'Kontak', component: Contact },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  // UPGRADE 3: Tambahkan Rute Dashboard (WDD 8.0)
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    // Nanti kita bisa tambahkan 'meta: { requiresAuth: true }'
    // jika sudah ada sistem login backend
  },
  { 
    path: '/admin', 
    name: 'AdminDashboard', 
    component: AdminDashboard 
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