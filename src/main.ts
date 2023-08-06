import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import PrimeVue from 'primevue/config'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'

import router from './router'

import './assets/style/main.scss'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(PrimeVue)

app.component('PInputText', InputText)
app.component('PButton', Button)

app.mount('#app')
