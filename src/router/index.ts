import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import { APP_ROUTES } from '@/constants'
import { useAuthStore } from '@/stores/auth'

const { HOME, LOGIN, LISTING_EVENTS, EVENT, MY_BETS, CREATE } = APP_ROUTES

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: HOME,
      name: 'Accueil',
      component: HomeView,
    },
    {
      path: LOGIN,
      name: 'Connexion',
      component: LoginView,
      beforeEnter(to, from, next) {
        if (!to.query.redirect) {
          next({
            ...to,
            query: {
              redirect: from.path,
            },
          })
          return
        }
        next()
      },
    },
    {
      path: CREATE + '/:id?',
      name: 'Création',
      component: () => import('@/views/CreateView.vue'),
      meta: {
        needAuth: true,
      },
    },
    {
      path: LISTING_EVENTS,
      name: 'Évènements',
      component: () => import('@/views/ListingEventsView.vue'),
    },
    {
      path: `${EVENT}/:id`,
      name: 'Évènement',
      component: () => import('@/views/EventView.vue'),
    },
    {
      path: MY_BETS,
      name: 'Mes paris',
      component: () => import('@/views/MyBetsView.vue'),
      meta: {
        needAuth: true,
      },
    },
  ],
})

router.beforeEach(async (to, _from, next) => {
  if (to.meta.needAuth) {
    const auth = useAuthStore()
    if (!auth.isConnected) {
      next({ path: LOGIN, query: { redirect: to.fullPath } })
    }
  }
  if (to.path === HOME) {
    document.title = 'Beer Bet'
  } else if (to) {
    document.title = to.name?.toString() + ' | Beer Bet'
  }
  next()
})

export default router
