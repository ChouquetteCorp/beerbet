import * as OneSignal from 'https://esm.sh/@onesignal/node-onesignal@5.18'
import { getEmailNotification } from './emails/index.ts'
import { getPushNotification } from './push/index.ts'
import { NotificationType } from './utils.ts'

const USER_AUTH_KEY = Deno.env.get('USER_AUTH_KEY')!
const ONESIGNAL_APP_ID = Deno.env.get('ONESIGNAL_APP_ID')!
const ONESIGNAL_REST_API_KEY = Deno.env.get('ONESIGNAL_REST_API_KEY')!
const ONESIGNAL_APP_ID_BEER = Deno.env.get('ONESIGNAL_APP_ID_BEER')!

const onesignal = new OneSignal.DefaultApi(
  OneSignal.createConfiguration({
    userKey: USER_AUTH_KEY,
    appKey: ONESIGNAL_REST_API_KEY,
  }),
)

export async function sendNotification(
  notificationType: NotificationType,
  data: Record<string, string>,
  externalUserId: string[],
) {
  const notifications = await Promise.all([
    getEmailNotification(notificationType, data),
    getPushNotification(notificationType, data),
  ])

  await Promise.all(
    notifications.map(async (notification) => {
      if (data.eventType === EventUnit.BEER) {
        notification.app_id = ONESIGNAL_APP_ID_BEER
      } else {
        notification.app_id = ONESIGNAL_APP_ID
      }

      notification.include_aliases = { external_id: externalUserId }
      const onesignalApiRes = await onesignal.createNotification(notification)
      return onesignalApiRes
    }),
  )
}
