import * as OneSignal from 'https://esm.sh/@onesignal/node-onesignal@1.0.0-beta7?target=deno&no-check'
import { EventUnit } from '../../end-bet/computes/ComputeInterface.ts'
import { getEmailNotification } from './emails/index.ts'
import { getPushNotification } from './push/index.ts'
import { NotificationType } from './utils.ts'

const USER_AUTH_KEY = Deno.env.get('USER_AUTH_KEY')!
const ONESIGNAL_APP_ID = Deno.env.get('ONESIGNAL_APP_ID')!
const ONESIGNAL_REST_API_KEY = Deno.env.get('ONESIGNAL_REST_API_KEY')!

const ONESIGNAL_APP_ID_BEER = Deno.env.get('ONESIGNAL_APP_ID_BEER')!
const ONESIGNAL_REST_API_KEY_BEER = Deno.env.get('ONESIGNAL_REST_API_KEY_BEER')!

export async function sendNotification(
  notificationType: NotificationType,
  data: Record<string, string>,
  externalUserId: string[],
) {
  ;(await Promise.all([getEmailNotification(notificationType, data), getPushNotification(notificationType, data)])).map(
    async (notification) => {
      let configuration
      if (data.eventType === EventUnit.BEER) {
        configuration = OneSignal.createConfiguration({
          userKey: USER_AUTH_KEY,
          appKey: ONESIGNAL_REST_API_KEY_BEER,
        })
        notification.app_id = ONESIGNAL_APP_ID_BEER
      } else {
        configuration = OneSignal.createConfiguration({
          userKey: USER_AUTH_KEY,
          appKey: ONESIGNAL_REST_API_KEY,
        })

        notification.app_id = ONESIGNAL_APP_ID
      }

      const onesignal = new OneSignal.DefaultApi(configuration)
      notification.include_external_user_ids = externalUserId
      const onesignalApiRes = await onesignal.createNotification(notification)
      return onesignalApiRes
    },
  )
}
