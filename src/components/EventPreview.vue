<script setup lang="ts">
  import Card from 'primevue/card'
  import { APP_ROUTES } from '@/constants'

  interface Props {
    id?: number | null
    imageUrl: string
    title: string
    subtitle?: string
    date: string
    isFinished?: boolean
    isRecentlyFinished?: boolean
  }

  const props = withDefaults(defineProps<Props>(), {
    id: null,
    subtitle: '',
    isFinished: false,
    isRecentlyFinished: false,
  })
</script>

<template>
  <RouterLink :to="id ? `${APP_ROUTES.EVENT}/${id}` : '#'">
    <Card class="event-preview" :class="{ 'event-preview--recently-finished': isRecentlyFinished }">
      <template #header>
        <img v-if="imageUrl" :src="imageUrl" class="event-preview__image" alt="event preview" />
        <div v-if="isFinished" class="event-preview__finished-flag">
          <h5>{{ isRecentlyFinished ? $t('EventPreview.eventRecentEnded') : $t('EventPreview.eventEnded') }}</h5>
        </div>
        <div v-if="isRecentlyFinished" class="event-preview__see-results-flag-wrapper">
          <div class="event-preview__see-results-flag">
            <h5>{{ $t('EventResults.seeResult') }}</h5>
          </div>
        </div>
      </template>
      <template #title>{{ $d(new Date(props.date)) }} • {{ title }}</template>
      <template v-if="subtitle" #subtitle>{{ subtitle }}</template>
    </Card>
  </RouterLink>
</template>

<style scoped lang="scss">
  .event-preview {
    transition: all 0.15s ease-in-out;
    position: relative;

    &:hover {
      cursor: pointer;
      opacity: 0.95;
      scale: 1.01;
      box-shadow: rgba(5, 5, 5, 0.25) 0 12px 24px, rgba(5, 5, 5, 0.22) 0 10px 10px;
    }

    &--recently-finished {
      ::v-deep(.p-card-body) {
        background: radial-gradient(circle farthest-side, #fceabb, #f8b500);
        color: var(--surface-a);
      }

      ::v-deep(.p-card-subtitle) {
        color: var(--surface-a);
      }

      .event-preview__finished-flag {
        background: radial-gradient(circle farthest-side, #fceabb, #f8b500);
        color: var(--surface-a);

        h5 {
          font-weight: 600;
        }
      }
    }

    &__image {
      width: 100%;
      height: 9rem;
      object-fit: cover;
    }

    &__finished-flag {
      position: absolute;
      top: 1.4rem;
      right: 0;
      background: rgba(255, 255, 255, 0.9);
      box-shadow: $ch-box-shadow;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0.5rem 1rem;
      color: var(--surface-a);

      h5 {
        font-size: 0.73rem;
        font-weight: 500;
        text-transform: uppercase;
        font-style: italic;
        margin-top: 0.1rem;
      }
    }

    &__see-results-flag-wrapper {
      position: absolute;
      left: 50%;
      top: 6.2rem;
      transform: translate(-50%, -50%);
    }

    &__see-results-flag {
      background: rgba(31, 45, 64, 1);
      color: #ecc45d;
      border-radius: 50px;
      box-shadow: $ch-box-shadow;
      display: flex;
      justify-content: center;
      align-items: center;
      width: max-content;
      padding: 0.5rem 1rem;
      animation: shake-animation 3.3s ease 1s infinite;

      h5 {
        font-size: 1rem;
        text-transform: uppercase;
        margin-top: 0.1rem;
        letter-spacing: 0.075rem;
      }
    }
  }

  ::v-deep(.p-card-content) {
    display: none;
  }
</style>
