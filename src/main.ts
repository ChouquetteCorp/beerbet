import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import PrimeVue from 'primevue/config'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import Skeleton from 'primevue/skeleton'
import ToastService from 'primevue/toastservice'
import ConfirmationService from 'primevue/confirmationservice'
import DialogService from 'primevue/dialogservice'
import router from './router'
import OneSignalVuePlugin from '@onesignal/onesignal-vue3'
import Tooltip from 'primevue/tooltip'
import i18n from './lang'

import './assets/style/main.scss'

const app = createApp(App)

app.use(i18n)
app.use(createPinia())
app.use(router)
app.use(PrimeVue)
app.use(ToastService)
app.use(ConfirmationService)
app.use(DialogService)
app.use(OneSignalVuePlugin, {
  appId: import.meta.env.VITE_ONESIGNAL_APP_ID,
  safari_web_id: import.meta.env.VITE_ONESIGNAL_SAFARI_WEB_ID,
  serviceWorkerParam: { scope: '/push/onesignal/' },
  serviceWorkerPath: 'push/onesignal/OneSignalSDKWorker.js',
  serviceWorkerUpdaterPath: 'push/onesignal/OneSignalSDKWorker.js',
  allowLocalhostAsSecureOrigin: true,
  welcomeNotification: {
    disable: true,
  },
})
app.directive('tooltip', Tooltip)

app.component('PInputText', InputText)
app.component('PButton', Button)
app.component('PSkeleton', Skeleton)

app.mount('#app')
