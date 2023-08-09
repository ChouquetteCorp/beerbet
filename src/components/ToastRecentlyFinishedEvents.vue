<script setup lang="ts">
  import Toast from 'primevue/toast'
  import { APP_ROUTES } from '@/constants'
</script>

<template>
  <Toast position="bottom-right" group="recently-finished-event">
    <template #message>
      <div class="recently-finished-event-toast">
        <span class="p-toast-message-icon pi pi-check"></span>
        <div class="recently-finished-event-toast__text">
          <span class="p-toast-summary">{{ $t('ToastRecentlyFinishedEvents.eventFinish') }}</span>
          <p>
            {{ $t('ToastRecentlyFinishedEvents.eventFinishDetails.0') }}
            <RouterLink :to="APP_ROUTES.MY_BETS">« {{ $t('MyBetsView.title') }} »</RouterLink>
            {{ $t('ToastRecentlyFinishedEvents.eventFinishDetails.1') }}
          </p>
        </div>
      </div>
    </template>
  </Toast>
</template>

<style scoped lang="scss">
  .recently-finished-event-toast {
    display: flex;
    gap: 1rem;
    width: 130%;

    &__text {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;

      a {
        color: var(--blue-700) !important;
        font-weight: 500;
      }
    }
  }
</style>
