import { render } from 'https://deno.land/x/mustache_ts/mustache.ts'

export enum NotificationType {
  SEE_RESULTS = 'see-results',
}

export function renderMustache(text: string | any, data: Record<string, string>) {
  if (typeof text === 'string') {
    return render(text, data)
  }

  Object.keys(text).map((key) => {
    text[key] = renderMustache(text[key], data)
  })

  return text
}
