import { createApp } from 'vue'
import { createMetaManager } from 'vue-meta'

import App from './App.vue'

import './assets/style.css'


const app = createApp(App).use(createMetaManager())

app.mount('#app')