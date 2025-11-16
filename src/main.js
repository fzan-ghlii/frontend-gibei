import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { MotionPlugin } from '@vueuse/motion'

// 1. Impor router kita
import router from './router'

const app = createApp(App)

// 2. Gunakan Motion
app.use(MotionPlugin)

// 3. Gunakan Router
app.use(router)

app.mount('#app')