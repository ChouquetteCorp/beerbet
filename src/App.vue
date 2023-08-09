<script setup lang="ts">
  import NavBar from './components/NavBar.vue'
  import { RouterView } from 'vue-router'
  import { onMounted, watch } from 'vue'
  import Toast from 'primevue/toast'
  import { useAuthStore } from '@/stores/auth'
  import { useEventStore } from './stores/event'
  import { useToast } from 'primevue/usetoast'

  const auth = useAuthStore()
  const eventStore = useEventStore()
  const toast = useToast()

  onMounted(async () => await auth.updateConnection())

  watch(
    () => auth.isConnected,
    async (isConnected) => {
      if (!isConnected) return toast.removeGroup('recently-finished-event')

      await eventStore.setAllEvents()
      if (eventStore.isRecentlyFinishedEvents) sendRecentlyFinishedEventToast()
    },
  )

  function sendRecentlyFinishedEventToast() {
    toast.add({
      severity: 'success',
      group: 'recently-finished-event',
      life: 10000,
    })
  }
</script>

<template>
  <NavBar />
  <RouterView />
  <Toast position="bottom-right" />
  <ToastRecentlyFinishedEvents />
</template>
