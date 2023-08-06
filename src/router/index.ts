import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import ListingEventsView from '@/views/ListingEventsView.vue'
import MyBetsView from '@/views/MyBetsView.vue'
import EventView from '@/views/EventView.vue'
import { APP_ROUTES } from '@/constants'

const { HOME, LOGIN, LISTING_EVENTS, EVENT, MY_BETS } = APP_ROUTES

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
    },
    {
      path: LISTING_EVENTS,
      name: 'Évènements',
      component: ListingEventsView,
    },
    {
      path: `${EVENT}/:id`,
      name: 'Évènement',
      component: EventView,
    },
    {
      path: MY_BETS,
      name: 'Mes paris',
      component: MyBetsView,
    },
  ],
})

router.beforeEach(async (to) => {
  if (to.path === HOME) {
    document.title = 'Chouquette Bet'
  } else if (to) {
    document.title = to.name?.toString() + ' | Chouquette Bet'
  }
})

export default router
