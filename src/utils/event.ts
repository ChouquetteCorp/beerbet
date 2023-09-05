import config from '../config.json'

/**
 * Return url image for cover event from DEFAULT_EVENT_IMG_URLS constant
 * @returns string
 */
export function getRandomDefaultImage() {
  return config.defaultEventImgs[Math.floor(Math.random() * config.defaultEventImgs.length)]
}
