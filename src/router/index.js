import { createRouter, createWebHistory } from 'vue-router'
// Kita akan memindahkan komponen "halaman" ke folder /views
import Home from '../views/Home.vue'
import About from '../views/About.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    component: About,
  },
  // Rute lain akan ditambahkan di sini nanti
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