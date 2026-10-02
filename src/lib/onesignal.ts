import { useOneSignal } from '@onesignal/onesignal-vue3'

export const oneSignalOptions = {
  appId: import.meta.env.VITE_ONESIGNAL_APP_ID,
  safari_web_id: import.meta.env.VITE_ONESIGNAL_SAFARI_WEB_ID,
  serviceWorkerParam: { scope: '/push/onesignal/' },
  serviceWorkerPath: 'push/onesignal/OneSignalSDKWorker.js',
  allowLocalhostAsSecureOrigin: true,
  welcomeNotification: {
    disable: true,
    message: '',
  },
}

export const oneSignal = useOneSignal()

/** Résolu une fois le SDK OneSignal entièrement initialisé (à attendre avant login). */
export const oneSignalReady = oneSignal.init(oneSignalOptions)
