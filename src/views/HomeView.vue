<script setup lang="ts">
  import { useAuthStore } from '@/stores/auth'
  import { APP_ROUTES } from '@/constants'
  import LeaderBoard from '@/components/leaderboard/LeaderBoard.vue'

  const { LOGIN, CREATE, MY_BETS } = APP_ROUTES

  const auth = useAuthStore()
</script>

<template>
  <div class="home" :class="{ 'home--connected': auth.isConnected }">
    <h1>{{ $t('Home.title') }}</h1>
    <h2>{{ $t('Home.subtitle') }}</h2>
    <transition name="fade" mode="out-in">
      <div v-if="!auth.isConnected" class="home__buttons">
        <RouterLink :to="LOGIN">
          <PButton :label="$t('Home.loginBtn')" class="home__button" />
        </RouterLink>
      </div>
      <div v-else class="home__buttons">
        <RouterLink :to="MY_BETS">
          <PButton :label="$t('Home.myBetsBtn')" class="home__button" />
        </RouterLink>
        <RouterLink :to="CREATE">
          <PButton :label="$t('Home.createBtn')" class="home__button p-button-outlined" />
        </RouterLink>
      </div>
    </transition>

    <div v-if="auth.isConnected" class="home__sections">
      <LeaderBoard class="leaderboard" />
    </div>
  </div>
</template>

<style scoped lang="scss">
  .home {
    margin-top: 16vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;

    transition: 0.5s ease-in-out;
    gap: 4vh;

    &--connected {
      margin-top: 5vh;
      gap: 2vh;
    }

    h1 {
      font-size: 4.5rem;

      @include sm {
        font-size: 5rem;
      }

      @include md {
        font-size: 5.5rem;
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

    &__sections {
      margin-top: 4vh;
      display: flex;
      row-gap: 1.5vh;
      flex-direction: row;
      gap: 1vw;
      & > * {
        width: 100%;
      }
      @include sm {
        flex-direction: column;
        & > * {
          width: 30vw;
        }
      }
    }
  }
</style>
