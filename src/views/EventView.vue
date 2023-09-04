<script setup lang="ts">
  import { useRoute } from 'vue-router'
  import { useToast } from 'primevue/usetoast'
  import { computed, onMounted, ref, watch } from 'vue'
  import Card from 'primevue/card'
  import type { Bet, Event } from '@/types/interfaces'
  import { useEventStore } from '@/stores/event'
  import { useAuthStore } from '@/stores/auth'
  import { APP_ROUTES, ERROR } from '@/constants'
  import BetModal from '@/components/BetModal.vue'
  import EventResults from '@/components/EventResults.vue'
  import EventActions from '@/components/event/EventActions.vue'
  import ShareModal from '@/components/ShareModal.vue'
  import { useRouter } from 'vue-router'
  import { useI18n } from 'vue-i18n'

  const router = useRouter()
  const toast = useToast()
  const route = useRoute()
  const eventStore = useEventStore()
  const authStore = useAuthStore()
  const { t } = useI18n()

  onMounted(async () => {
    await loadEvent()
    watch(bettors, bettorsWatcher) // trick to watch bettors except the first time
    removeToastIfEventIsFinished()
  })

  function bettorsWatcher() {
    isBettorsUpdated.value = true
    setTimeout(() => (isBettorsUpdated.value = false), 1000)
  }

  function removeToastIfEventIsFinished() {
    if (eventStore.isTargetEventRecentlyFinished(event.value?.id)) toast.removeGroup('recently-finished-event')
  }

  const event = computed(() => eventStore.event as Event)
  const userBet = computed(() => eventStore.userBet as Bet)
  const guesses = computed(() => event.value?.propositions)
  const myBet = computed(() => userBet.value?.number)
  const myGuess = computed(() => userBet.value?.guess)

  const isEventEnded = computed(() => {
    return new Date(event.value.date) < new Date()
  })

  const isBetModalVisible = ref(false)
  const isLoading = ref(true)
  const isBetSending = ref(false)

  const bettors = ref(0)
  const isBettorsUpdated = ref(false)

  async function loadEvent() {
    const eventResponse = await eventStore.setEvent(route.params.id as string)
    if (!authStore.isConnected) return router.push(APP_ROUTES.LOGIN)
    if (eventResponse === ERROR) return router.push(APP_ROUTES.ERROR)

    await eventStore.setBettors()
    if (event.value.bettors) bettors.value = event.value.bettors
    isLoading.value = false
  }

  async function setMyBet({ bet, guess }: { bet: number; guess: string }) {
    const isAlreadyBet = !!userBet.value

    if ((bet === myBet.value && guess === myGuess.value) || (!bet && !myBet.value)) {
      return (isBetModalVisible.value = false)
    }

    isBetSending.value = true
    await eventStore.updateBet(bet, guess)
    isBetModalVisible.value = false
    isBetSending.value = false

    if (bet > 0) {
      if (!isAlreadyBet) bettors.value++
      toast.add({
        severity: 'success',
        summary: t('EventView.betToast.success.title'),
        detail: t('EventView.betToast.success.detail', bet),
        life: 3000,
      })
    } else {
      if (guess) bettors.value--
      toast.add({
        severity: 'error',
        summary: t('EventView.betToast.error.title'),
        detail: t('EventView.betToast.error.detail'),
        life: 3000,
      })
    }
  }
</script>

<template>
  <div class="event">
    <h1>{{ $t('EventView.title') }}</h1>
    <PSkeleton v-if="isLoading" height="50vh" />
    <Card v-else-if="event" :class="{ 'event__content--none': !event.description }">
      <template #header>
        <img :src="event.image_url" class="event__image" alt="event preview" />
      </template>
      <template #title>
        <div class="event__titles-and-useful-infos">
          <div class="event__titles">
            <h3>{{ event.title }}</h3>
            <p v-if="event.subtitle" class="event__subtitle">{{ event.subtitle }}</p>
          </div>
          <div class="event__useful-infos">
            <p>{{ $t('LoginView.prefixDate') }} {{ $d(new Date(event.date), 'long') }}</p>
            <p v-if="event.location" class="event__location">{{ event.location }}</p>
          </div>
        </div>
      </template>
      <template #subtitle>
        <div class="event__share-wrapper">
          <ShareModal v-if="!event.is_finish" class="event__share-wrapper" />
        </div>
      </template>
      <template #content>
        <p class="event__description">{{ event.description }}</p>
      </template>
      <template #footer>
        <div class="event__footer">
          <EventResults v-if="event.is_finish" />
          <RouterLink v-else-if="!authStore.isConnected" :to="APP_ROUTES.LOGIN">
            <PButton class="event__button event__button--wide p-button-info" :label="$t('EventView.loginBtn')" />
          </RouterLink>
          <div v-else>
            <transition name="fade" mode="out-in">
              <div v-if="myBet" class="event__already-bet-wrapper">
                <p class="event__bet-sentence">
                  {{ $t('EventView.btnLabel', { myBet }) }}
                  <span>« {{ myGuess }} »</span>
                </p>
                <PButton
                  v-if="!isEventEnded"
                  class="event__button p-button-secondary"
                  :label="$t('EventView.editBtn')"
                  @click="isBetModalVisible = true"
                />
              </div>
              <PButton
                v-else-if="!isEventEnded"
                class="event__button event__button--wide"
                :label="$t('EventView.betBtn')"
                @click="isBetModalVisible = true"
              />
            </transition>
            <EventActions
              v-if="!eventStore.event?.is_finish && eventStore.isMyEvent"
              :is-event-ended="isEventEnded"
              @close-event="loadEvent()"
            />
            <p v-else-if="isEventEnded" class="event__ended-sentence">
              {{ $t('EventView.eventEnded') }}
            </p>
          </div>
        </div>
        <p v-if="bettors" class="event__bettors" :class="{ 'event__bettors--anim': isBettorsUpdated }">
          {{ $t('EventView.bettorsSentance', bettors) }}
        </p>
      </template>
    </Card>
    <BetModal
      v-if="!isLoading && event"
      :is-visible="isBetModalVisible"
      :my-bet="myBet"
      :my-guess="myGuess"
      :guesses="guesses || []"
      :is-bet-sending="isBetSending"
      @update-visibility="isBetModalVisible = $event"
      @set-my-bet="setMyBet($event)"
    />
  </div>
</template>

<style scoped lang="scss">
  .event {
    h1 {
      margin-bottom: 2rem;
    }

    .p-card {
      overflow: hidden;
    }

    &__image {
      height: 25vh;
      width: 100%;
      object-fit: cover;
    }

    &__titles-and-useful-infos {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 1rem;
    }

    &__subtitle {
      margin-top: 0.5rem;
      color: var(--text-color-secondary);
    }

    &__useful-infos {
      margin-top: 0.25rem;
      margin-bottom: -0.25rem;
      text-align: right;
      min-width: 5.5rem;
    }

    &__location {
      font-size: 1.05rem;
      font-weight: 200;
    }

    &__share-wrapper {
      display: flex;
      justify-content: end;
    }

    &__content--none ::v-deep(.p-card-content) {
      display: none;
    }

    &__description {
      white-space: pre-line;
    }

    &__already-bet-wrapper {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1rem;
    }

    &__bet-sentence {
      font-size: 1.75rem;
      color: var(--primary-color);
      padding: 0.5rem 2rem;
      font-family: $ch-font-family;

      span {
        font-family: inherit;
        display: inline-block;
        font-weight: 600;
      }
    }

    &__ended-sentence {
      font-size: 1.2rem;
      font-weight: 200;
      font-style: italic;
      width: fit-content;
      margin: 1.5rem auto 0;
      padding: 0.25rem 1rem;
      border: 4px dotted white;
    }

    &__footer {
      text-align: center;
      margin-bottom: 1rem;
    }

    &__bettors {
      font-size: 0.9rem;
      font-weight: 200;
      font-style: italic;
      margin-top: 0.5rem;
      text-align: center;

      &--anim {
        animation: bounce-in-delay 0.9s;
      }
    }

    &__button {
      width: 15rem;

      &--wide {
        width: 100%;
      }
    }
  }

  @include sm {
    .event__image {
      height: 30vh;
    }
  }

  @include md {
    .event__image {
      height: 35vh;
    }
  }
</style>
