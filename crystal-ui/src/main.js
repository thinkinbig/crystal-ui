import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.scss'
import CrystalDashboard from './CrystalDashboard.vue'

createApp(CrystalDashboard)
    .use(createPinia())
    .mount('#app')
