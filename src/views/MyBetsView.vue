<script setup lang="ts">
  import { computed, ref, watch } from 'vue'
  import type { Event } from '@/types/interfaces'
  import TabView from 'primevue/tabview'
  import TabPanel from 'primevue/tabpanel'
  import EventsPreview from '@/components/EventsPreview.vue'
  import { useToast } from 'primevue/usetoast'
  import { useEventStore } from '@/stores/event'
  import GoCreateABet from '@/components/GoCreateABet.vue'

  const eventStore = useEventStore()

  const toast = useToast()

  const events = ref<Event[]>([])
  const isLoading = ref(true)
  const activeTabIndex = ref(0)

  const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)

  const activeEvents = computed(() =>
    events.value.filter((event) => !event.is_finish && new Date(event.date) > oneWeekAgo),
  )

  const activeEventIds = computed(() => activeEvents.value.map((event) => event.id))

  const finishedEvents = computed(() =>
    events.value.filter((event) => !activeEventIds.value.includes(event.id)).reverse(),
  )

  const finishedEventsButNotRecently = computed(() =>
    finishedEvents.value.filter((event) => !eventStore.recentlyFinishedEvents.includes(event)),
  )

  watch(
    () => eventStore.allEvents,
    (allEvents) => {
      if (allEvents !== null) {
        events.value = allEvents
        toast.removeGroup('recently-finished-event')
        setTimeout(() => (isLoading.value = false), 500) // small trick to see the skeleton at least 0.5s
      }
    },
    { immediate: true },
  )
</script>

<template>
  <div class="my-bets">
    <h1>{{ $t('MyBetsView.title') }}</h1>

    <div v-if="isLoading" class="skeleton-list">
      <PSkeleton v-for="index of 3" :key="`skeleton${index}`" height="20vh" />
    </div>

    <div v-show="!isLoading">
      <div v-if="eventStore.isRecentlyFinishedEvents" class="my-bets__recently-finished">
        <EventsPreview :events="eventStore.recentlyFinishedEvents" is-recently-finished />
      </div>

      <div v-if="events.length === 0" class="my-bets__create-wrapper">
        <GoCreateABet>
          <p>{{ $t('MyBetsView.empty') }}</p>
        </GoCreateABet>
      </div>

      <div v-else-if="finishedEventsButNotRecently.length === 0" class="my-bets__active-only">
        <EventsPreview :events="activeEvents" />
      </div>

      <TabView v-else-if="finishedEventsButNotRecently.length > 0" v-model:activeIndex="activeTabIndex">
        <TabPanel :header="$t('MyBetsView.inProgressTab')">
          <EventsPreview v-if="activeEvents.length > 0" :events="activeEvents" />
          <GoCreateABet v-else>
            <p>
              {{ $t('MyBetsView.noInProgress.0') }}
              <br />
              <br />
              {{ $t('MyBetsView.noInProgress.1') }}
            </p>
          </GoCreateABet>
        </TabPanel>
        <TabPanel :header="$t('MyBetsView.passTab')">
          <EventsPreview v-if="finishedEventsButNotRecently.length > 0" :events="finishedEventsButNotRecently" />
          <GoCreateABet v-else>
            <p>
              {{ $t('MyBetsView.noPass.0') }}
              <br />
              <br />
              {{ $t('MyBetsView.noPass.1') }}
            </p>
          </GoCreateABet>
        </TabPanel>
      </TabView>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .my-bets {
    display: flex;
    flex-direction: column;
    gap: 3rem;

    &__recently-finished,
    &__active-only {
      display: flex;
      flex-direction: column;
      gap: 3rem;
      padding-bottom: 3rem;
    }

    &__create-wrapper {
      display: flex;
      flex-direction: column;
      gap: 2rem;
      align-items: center;
      width: 100%;
      flex: 1;
    }

    &__create-btn-wrapper {
      width: 100%;
    }

    &__create-btn {
      width: 100%;
    }

    ::v-deep(.p-tabview-panels) {
      background: transparent;
      padding: 1.5rem 0 0;
    }

    ::v-deep(.p-tabview-panel) {
      display: flex;
      flex-direction: column;
      gap: 3rem;
    }

    ::v-deep(li:not(.p-highlight) .p-tabview-nav-link) {
      background: unset;
    }
  }
</style>
