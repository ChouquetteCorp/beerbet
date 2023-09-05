export function isWebView() {
  const standalone = (window.navigator as any).standalone,
    userAgent = window.navigator.userAgent.toLowerCase(),
    safari = /safari/.test(userAgent),
    ios = /iphone|ipod|ipad/.test(userAgent)
  return (ios && !standalone && !safari) || userAgent.includes('wv')
}
