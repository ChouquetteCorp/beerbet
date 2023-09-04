<script lang="ts" setup>
  import { useEventStore } from '@/stores/event'
  import ConfirmDialog from 'primevue/confirmdialog'
  import { useConfirm } from 'primevue/useconfirm'
  import { APP_ROUTES } from '@/constants'
  import { EventActions } from '@/types/enums'
  import { useRouter } from 'vue-router'
  import { useToast } from 'primevue/usetoast'
  import SpeedDial from 'primevue/speeddial'
  import RadioButton from 'primevue/radiobutton'
  import { ref } from 'vue'
  import { useI18n } from 'vue-i18n'

  const { MY_BETS, CREATE } = APP_ROUTES

  const router = useRouter()
  const toast = useToast()
  const confirm = useConfirm()
  const eventStore = useEventStore()
  const { t } = useI18n()

  const emit = defineEmits<{
    (event: 'close-event'): void
  }>()

  interface Props {
    isEventEnded: boolean
  }

  defineProps<Props>()

  const guesses = eventStore.event?.propositions

  const choice = ref(null)
  const isLoading = ref(false)
  const loadingAction = ref<EventActions | null>(null)

  function deleteEvent() {
    loadingAction.value = EventActions.Delete
    confirm.require({
      group: 'deleteEvent',
      header: t('EventActions.deleteEvent.title'),
      message: t('EventActions.deleteEvent.message'),
      accept: async () => {
        isLoading.value = true
        try {
          await eventStore.deleteEvent()
          router.push(MY_BETS)
        } catch (e) {
          toast.add({ severity: 'error', summary: t('error'), detail: t('errorMessage'), life: 3000 })
        } finally {
          isLoading.value = false
          loadingAction.value = null
        }
      },
    })
  }

  function closeEvent() {
    confirm.require({
      group: 'endBet',
      header: t('EventActions.closeEvent.title'),
      accept: async () => {
        isLoading.value = true
        loadingAction.value = EventActions.Close
        if (choice.value) {
          try {
            await eventStore.endBet(choice.value)
            toast.add({
              severity: 'success',
              summary: t('EventActions.closeEvent.endedTitle'),
              detail: t('EventActions.closeEvent.endedMessage'),
              life: 3000,
            })
            emit('close-event')
          } catch (e) {
            toast.add({ severity: 'error', summary: t('error'), detail: t('errorMessage'), life: 3000 })
          } finally {
            isLoading.value = false
            loadingAction.value = null
          }
        } else {
          toast.add({
            severity: 'error',
            summary: t('error'),
            detail: t('EventActions.closeEvent.errorSelect'),
            life: 3000,
          })
        }
      },
    })
  }

  const actions = [
    {
      label: t('EventActions.closeEvent.title'),
      icon: 'pi pi-bell',
      command: () => closeEvent(),
    },
    {
      label: t('CreateView.editTitle'),
      icon: 'pi pi-pencil',
      class: 'p-button-success',
      command: () => {
        router.push({ path: CREATE + '/' + eventStore.event?.id })
      },
    },
    {
      label: t('EventActions.deleteEvent.title'),
      icon: 'pi pi-trash',
      command: () => deleteEvent(),
    },
  ]
</script>

<template>
  <PButton v-if="isEventEnded" class="p-button-success action__btn-end" :disabled="isLoading" @click="closeEvent">
    <span>
      <i :class="`pi ${isLoading && loadingAction === EventActions.Close ? 'pi-spin pi-spinner' : 'pi-bell'}`" />
      {{ $t('EventActions.closeEvent.title') }}
    </span>
  </PButton>

  <div class="action__menu">
    <SpeedDial
      button-class="p-button-warning"
      :model="actions"
      direction="up"
      :show-icon="`pi ${isLoading && loadingAction === EventActions.Delete ? 'pi-spin pi-spinner' : 'pi-cog'}`"
      :disabled="isLoading"
      :tooltip-options="{ position: 'left', event: 'hover' }"
    />
  </div>
  <ConfirmDialog group="deleteEvent" :breakpoints="{ '992px': '60vw', '768px': '70vw', '576px': '90vw' }" />
  <ConfirmDialog group="endBet" :breakpoints="{ '992px': '60vw', '768px': '70vw', '576px': '90vw' }">
    <template #message>
      <div v-if="eventStore.event">
        <p>{{ $t('EventActions.closeEvent.selectOption') }}</p>
        <label v-for="guess of guesses" :key="`guess-${guess}`" class="guess-radio-button">
          <RadioButton v-model="choice" :name="guess" :value="guess" />
          {{ guess }}
        </label>
      </div>
    </template>
  </ConfirmDialog>
</template>

<style scoped lang="scss">
  .action {
    &__btn-end {
      width: 100%;
      span {
        margin: auto;
        font-weight: 500;
        i {
          margin: 0.5rem;
        }
      }
    }

    &__menu {
      position: fixed;
      bottom: 5.5rem;
      right: 2rem;
      width: 3.75rem;
      height: 10rem;
      z-index: 3;
    }
  }

  .guess-radio-button {
    margin-top: 1rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    word-break: break-word;
  }
</style>
