<script lang="ts" setup>
  import EventResultsItem from './EventResultsItem.vue'
  import { useEventStore } from '@/stores/event'
  import chouquetteLost from '@/assets/images/chouquette-lost.png'
  import partyPopper from '@/assets/images/party-popper.png'
  import { UserResults } from '@/types/enums'
  import { computed } from 'vue'
  import { useI18n } from 'vue-i18n'
  const eventStore = useEventStore()
  const { Victory, Defeat } = UserResults
  const { tm } = useI18n()

  function randomPunchline(punchlines: string[]) {
    return punchlines[Math.floor(Math.random() * punchlines.length)]
  }

  const userResult = computed(() => eventStore.userResult)
  const hasEveryoneBetTheSame = computed(() => eventStore.dispatchResults?.length === 0)

  const punchline = computed(() => {
    if (userResult.value === Victory) {
      return randomPunchline(tm('EventResults.punchlineWin'))
    } else if (userResult.value === Defeat) {
      return randomPunchline(tm('EventResults.punchlineLose'))
    } else {
      return ''
    }
  })
</script>

<template>
  <div
    class="event-results"
    :class="{
      'event-results--win': userResult === Victory,
      'event-results--lose': userResult === Defeat,
    }"
  >
    <div class="event-results__title">
      <h3 v-if="userResult === Victory">
        <img :src="partyPopper" alt="party popper" class="emoji emoji--mirror" />
        {{ $t('EventResults.winTitle') }}
        <img :src="partyPopper" alt="party popper" class="emoji" />
      </h3>
      <h3 v-else-if="userResult === Defeat">
        <img :src="chouquetteLost" alt="chouquette lost" class="emoji emoji--mirror" />
        {{ $t('EventResults.loseTitle') }}
        <img :src="chouquetteLost" alt="chouquette lost" class="emoji" />
      </h3>
      <h3 v-else>{{ $t('EventResults.noneTitle') }}</h3>
      <h6>
        {{ $t('EventResults.rightAnswerIs') }}
        <span class="event-results__good-answer">« {{ eventStore.event?.winner }} »</span>
      </h6>
    </div>

    <div v-if="userResult !== null" class="event-results__list">
      <EventResultsItem
        v-for="(dispatchResult, index) in eventStore.dispatchResults"
        :key="`dispatchResult${index}`"
        class="item"
        :result="dispatchResult"
      />

      <div class="event-results__punchline">
        <div v-if="hasEveryoneBetTheSame">
          <p>
            {{
              userResult === Victory ? $t('EventResults.punchlineSameWin.0') : $t('EventResults.punchlineSameLose.0')
            }}
          </p>
          <p>
            {{
              userResult === Victory ? $t('EventResults.punchlineSameWin.1') : $t('EventResults.punchlineSameLose.1')
            }}
          </p>
          <p>
            {{
              userResult === Victory ? $t('EventResults.punchlineSameWin.2') : $t('EventResults.punchlineSameLose.2')
            }}
          </p>
        </div>
        <p v-else>{{ punchline }}</p>
      </div>

      <p v-if="userResult === Victory && !hasEveryoneBetTheSame" class="event-results__gain-info">
        {{ $t('EventResults.gainInfo') }}
      </p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .event-results {
    background: var(--result-bgcolor);
    border-radius: 3px;
    overflow: hidden;
    margin: 1rem;

    &--win {
      --result-title-bgcolor: #17a842;
      --result-bgcolor: #1a7a41;
    }

    &--lose {
      --result-title-bgcolor: #e74c3c;
      --result-bgcolor: #a73b2f;
    }

    & > * {
      padding: 0.5rem;
    }

    &__title {
      background-color: var(--result-title-bgcolor);
      box-shadow: $ch-box-shadow;

      h3 {
        font-weight: 700;
        font-size: 1.55rem;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 1rem;
        margin-bottom: 0.2rem;
        font-family: $ch-font-family;
      }

      .emoji {
        width: 2.5rem;
        aspect-ratio: 1/1;
        display: inline-block;

        &--mirror {
          transform: scale(-1, 1);
        }
      }
    }

    &__good-answer {
      font-weight: 500;
    }

    &__list {
      margin: 1rem;
      text-align: left;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    &__punchline {
      text-align: center;

      &,
      p {
        font-size: 1.35rem;
        font-family: $ch-font-family;
      }

      p:last-of-type {
        margin-top: 1rem;
      }
    }

    &__gain-info {
      text-align: center;
      font-size: 0.6rem;
    }
  }
</style>
