<script setup lang="ts">
  import NavBar from './components/NavBar.vue'
  import Toast from 'primevue/toast'
  import FooterBar from './components/FooterBar.vue'
  import { RouterView } from 'vue-router'
  import { onMounted, onUnmounted, watch } from 'vue'
  import { useAuthStore } from '@/stores/auth'
  import { useToast } from 'primevue/usetoast'
  import ReloadPrompt from '@/components/ReloadPrompt.vue'
  import { useI18n } from 'vue-i18n'
  import { useEventStore } from '@/stores/event'
  import ToastRecentlyFinishedEvents from '@/components/ToastRecentlyFinishedEvents.vue'

  const auth = useAuthStore()
  const eventStore = useEventStore()
  const toast = useToast()
  const { t } = useI18n()

  onMounted(async () => {
    await auth.updateConnection()
    window.addEventListener('offline', onOffline)
    window.addEventListener('online', onOnline)
  })

  watch(
    () => auth.isConnected,
    async (isConnected) => {
      if (!isConnected) return toast.removeGroup('recently-finished-event')

      await eventStore.setAllEvents()
      if (eventStore.isRecentlyFinishedEvents) sendRecentlyFinishedEventToast()
    },
  )

  function onOffline() {
    toast.add({
      severity: 'warn',
      summary: t('OfflineView.title'),
      detail: t('OfflineView.toastDetails'),
      group: 'offline',
      closable: false,
    })
  }

  function sendRecentlyFinishedEventToast() {
    toast.add({
      severity: 'success',
      group: 'recently-finished-event',
      life: 10000,
    })
  }

  function onOnline() {
    toast.removeGroup('offline')
  }

  onUnmounted(() => {
    window.removeEventListener('offline', onOffline)
    window.removeEventListener('online', onOnline)
  })
</script>

<template>
  <div class="main-layout">
    <NavBar />
    <div v-if="!auth.isLogging" class="router-wrapper">
      <RouterView v-slot="{ Component }">
        <transition name="fade-fast" mode="out-in">
          <component :is="Component" />
        </transition>
      </RouterView>
    </div>
  </div>
  <ReloadPrompt />
  <Toast position="bottom-right" />
  <Toast position="bottom-right" group="offline" />
  <ToastRecentlyFinishedEvents />
  <FooterBar />
</template>

<style scoped lang="scss">
  .router-wrapper {
    animation: fade-in 1s ease-in-out;
  }
</style>
