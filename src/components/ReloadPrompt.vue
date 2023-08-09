<script setup lang="ts">
  import Toast from 'primevue/toast'
  import { useToast } from 'primevue/usetoast'
  import { useRegisterSW } from 'virtual:pwa-register/vue'
  import { watch } from 'vue'

  const toast = useToast()

  const { needRefresh, updateServiceWorker } = useRegisterSW({
    immediate: true,
  })

  function refresh() {
    updateServiceWorker()
  }

  watch(
    needRefresh,
    (refresh) => {
      if (refresh) {
        toast.removeGroup('reload-prompt')
        toast.add({
          severity: 'info',
          group: 'reload-prompt',
          closable: false,
        })
      }
    },
    { immediate: true },
  )
</script>

<template>
  <Toast position="bottom-right" group="reload-prompt" :style="{ width: '28rem', maxWidth: '90%' }">
    <template #message>
      <div class="reload-prompt__content">
        <p>{{ $t('ReloadPrompt.message') }}</p>
        <div>
          <PButton class="p-button-sm p-button-secondary" :label="$t('ReloadPrompt.btn')" @click="refresh" />
        </div>
      </div>
    </template>
  </Toast>
</template>

<style scoped lang="scss">
  .reload-prompt__content {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 0.8rem;
  }
</style>
