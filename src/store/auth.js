import { ref } from 'vue'

// State reaktif sederhana untuk status login
// false = Tampilan "Login", true = Tampilan "Dashboard"
export const isLoggedIn = ref(false)