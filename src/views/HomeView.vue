<script setup lang="ts">
  import { useRouter } from 'vue-router'
  import { useAuthStore } from '@/stores/auth'
  import { APP_ROUTES } from '@/constants'
  const { LOGIN, LISTING_EVENTS, MY_BETS } = APP_ROUTES
  const router = useRouter()
  const auth = useAuthStore()

  const goTo = (path: string) => router.push(path)
</script>

<template>
  <div class="home">
    <h1>Beer Bet</h1>
    <h2>Le premier site de paris sportifs en ligne, avec des bières</h2>
    <div v-if="!auth.isConnected" class="home__buttons">
      <PButton label="Connexion" class="home__button" @click="goTo(LOGIN)" />
    </div>
    <div v-else class="home__buttons">
      <PButton label="Les évènements" class="home__button" @click="goTo(LISTING_EVENTS)" />
      <PButton label="Mes paris" class="home__button p-button-secondary" @click="goTo(MY_BETS)" />
    </div>
  </div>
</template>

<style scoped lang="scss">
  @import '@/assets/style/_mixins.scss';

  .home {
    margin-top: 15vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 4vh;
    text-align: center;

    h1 {
      font-family: 'Segoe Script', cursive !important;
      font-size: 4rem;

      @include sm {
        font-size: 4.6rem;
      }
    }

    &__buttons {
      margin-top: 4vh;
      display: flex;
      gap: 5vw;
    }

    &__button {
      width: 12rem;
    }
  }
</style>
