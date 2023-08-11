import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/LoginView.vue'
import { APP_ROUTES } from '@/constants'
import { useAuthStore } from '@/stores/auth'
import i18n from '@/lang'

const { HOME, LOGIN, EVENT, MY_BETS, MATCHS, FAQ, CREATE, INVITE, OFFLINE } = APP_ROUTES

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: HOME,
      name: 'Accueil',
      component: () => import('@/views/HomeView.vue'),
      meta: {
        availableOffline: true,
      },
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
    {
      path: FAQ,
      name: 'FAQ',
      component: () => import('@/views/FAQView.vue'),
      meta: {
        availableOffline: true,
      },
    },
    {
      path: MATCHS,
      name: 'Matchs',
      component: () => import('@/views/MatchView.vue'),
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
      path: INVITE + '/:code',
      name: 'Invitation',
      component: LoginView,
    },
    {
      path: OFFLINE,
      name: 'Hors ligne',
      component: () => import('@/views/OfflineView.vue'),
      meta: {
        availableOffline: true,
      },
    },
    {
      path: '/:pathMatch(.*)*',
      name: '404',
      component: () => import('@/views/ErrorView.vue'),
      meta: {
        availableOffline: true,
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
    document.title = i18n.global.t('Home.title')
  } else {
    if (!navigator.onLine && !to.meta.availableOffline && to.path !== OFFLINE) {
      next({
        path: OFFLINE,
        query: {
          redirect: to.path,
        },
      })
    }
    document.title = to.name?.toString() + ' | ' + i18n.global.t('Home.title')
  }
  next()
})

export default router
