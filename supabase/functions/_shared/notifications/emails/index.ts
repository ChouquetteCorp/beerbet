import { render } from 'https://deno.land/x/mustache_ts/mustache.ts'
import * as OneSignal from 'https://esm.sh/@onesignal/node-onesignal@5.18'
import { EventUnit } from '../../../end-bet/computes/ComputeInterface.ts'
import { NotificationType, renderMustache } from '../utils.ts'
import TEMPLATES from './templates/index.ts'

const SUBJECTS: Record<NotificationType, string> = {
  [NotificationType.SEE_RESULTS]: 'Résultats du pari "{{eventName}}"',
}

async function getTemplateEmailContent(templateName: NotificationType, data: Record<string, string>) {
  return await render(TEMPLATES[templateName], {
    ...data,
    year: new Date().getFullYear(),
    primaryColor: data.unit === EventUnit.CHOUQUETTE ? '#64B5F6' : '#ffd54f',
  })
}

export async function getEmailNotification(templateName: NotificationType, data: Record<string, string>) {
  const notification = new OneSignal.Notification()

  notification.email_subject = renderMustache(SUBJECTS[templateName], data)
  notification.email_body = await getTemplateEmailContent(templateName, data)
  notification.email_from_name = 'Cédric'
  notification.email_from_address = 'no-reply@chouquette-bet.netlify.app'

  notification.target_channel = 'email'

  return notification
}
