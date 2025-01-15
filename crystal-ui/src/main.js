import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.scss'
import Dashboard from './Dashboard.vue'

createApp(Dashboard)
    .use(createPinia())
    .mount('#app')
