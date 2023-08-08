/**
 * Return url image for cover event from DEFAULT_EVENT_IMG_URLS constant
 * @returns string
 */
export function getRandomDefaultImage() {
  const imgs = [
    'https://images.unsplash.com/photo-1597248287487-aeb443f64ddf?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=310&ixid=MnwxfDB8MXxyYW5kb218MHx8YmVlcnx8fHx8fDE2ODA4ODU2MjI&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1025',
    'https://images.unsplash.com/photo-1510067559750-c21e29b0a703?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=310&ixid=MnwxfDB8MXxyYW5kb218MHx8YmVlcnx8fHx8fDE2ODA4ODU2ODA&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1025',
    'https://images.unsplash.com/photo-1586993451228-09818021e309?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=310&ixid=MnwxfDB8MXxyYW5kb218MHx8YmVlcnx8fHx8fDE2ODA4ODU2ODY&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1025',
  ]

  return imgs[Math.floor(Math.random() * imgs.length)]
}
