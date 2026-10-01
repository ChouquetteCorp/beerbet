import * as OneSignal from 'https://esm.sh/@onesignal/node-onesignal@5.18'
import { NotificationType, renderMustache } from '../utils.ts'

const PUSH_TEMPLATE = {
  [NotificationType.SEE_RESULTS]: {
    contents: {
      en: 'Le pari "{{eventName}}" vient d\'être clôturé, consultez les résultats !',
    },
    heading: {
      en: 'Résultats du pari "{{eventName}}"',
    },
    url: '{{{eventLink}}}',
    chrome_web_image: '{{{eventImageLink}}}',
    big_picture: '{{{eventImageLink}}}',
  },
}

function getTemplatePushContent(templateName: NotificationType, data: Record<string, string>) {
  const template = PUSH_TEMPLATE[templateName]
  if (!template) {
    throw new Error(`Template ${templateName} not found`)
  }

  return renderMustache(template, data)
}

export function getPushNotification(templateName: NotificationType, contents: Record<string, string>) {
  const template = getTemplatePushContent(templateName, contents)

  const notification = Object.assign(new OneSignal.Notification(), template)

  notification.target_channel = 'push'

  return notification
}
