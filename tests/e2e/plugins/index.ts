import { getUserSession } from './tasks'

export default (on, config) => {
  on('task', {
    getUserSession,
  })

  return config
}
