import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import Toast, { POSITION, type PluginOptions } from 'vue-toastification'
import 'vue-toastification/dist/index.css'
import router from './router'

const options: PluginOptions = {
  position: POSITION.TOP_RIGHT,
  timeout: 2000,
}

const app = createApp(App)

app.use(Toast, options)
app.use(router)

app.mount('#app')
