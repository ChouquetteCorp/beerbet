<script lang="ts" setup>
  import Dialog from 'primevue/dialog'
  import { computed, ref, onMounted } from 'vue'
  import { useEventStore } from '@/stores/event'
  import { APP_ROUTES } from '@/constants'
  import { useToast } from 'primevue/usetoast'
  import { useI18n } from 'vue-i18n'

  const eventStore = useEventStore()
  const toast = useToast()
  const { t } = useI18n()

  const isOpen = ref(false)
  const canShare = ref(false)

  const url = computed(() => {
    return window.origin + APP_ROUTES.INVITE + '/' + (eventStore.event?.invite_code || '')
  })

  const dataShare = {
    title: t('ShareModal.shareApiTitle'),
    text: eventStore.event?.title,
    url: url.value,
  }

  onMounted(() => {
    canShare.value = navigator.canShare && navigator.canShare(dataShare)
  })

  async function copy() {
    try {
      await navigator.clipboard.writeText(url.value)
      toast.add({ severity: 'success', detail: t('ShareModal.copyToast'), life: 3000 })
    } catch (ex) {
      toast.add({ severity: 'error', detail: t('error'), life: 3000 })
    }
  }

  function open() {
    isOpen.value = true
  }

  async function share() {
    await navigator.share(dataShare)
  }
</script>

<template>
  <PButton icon="pi pi-user-plus" :label="$t('ShareModal.btn')" class="p-button-help" @click="open" />
  <Dialog
    v-model:visible="isOpen"
    :breakpoints="{ '992px': '60vw', '768px': '70vw', '576px': '90vw' }"
    :style="{ width: '50vw' }"
    :header="$t('ShareModal.title')"
    :draggable="false"
    dismissable-mask
    modal>
    <div class="p-inputgroup">
      <PInputText type="url" readonly :value="url" />
      <PButton icon="pi pi-copy" class="p-button-info" @click="copy" />
    </div>
    <div>
      <PButton
        v-if="canShare"
        class="p-button-help share-modal__share-btn"
        icon="pi pi-share-alt"
        :label="$t('ShareModal.shareBtn')"
        @click="share" />
    </div>
  </Dialog>
</template>

<style lang="scss" scoped>
  div {
    text-align: center;
  }

  .share-modal__share-btn {
    margin: 1rem auto auto;
  }
</style>
