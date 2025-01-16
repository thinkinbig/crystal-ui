import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.scss'
import CrystalDashboard from './CrystalDashboard.vue'

const app = createApp(CrystalDashboard)
app.use(createPinia())
app.mount('#app') 