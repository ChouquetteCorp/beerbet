<script lang="ts" setup>
  import Panel from 'primevue/panel'
  import Calendar from 'primevue/calendar'
  import { computed, onMounted, onUnmounted, ref } from 'vue'
  import FileUpload from 'primevue/fileupload'
  import Chips from 'primevue/chips'
  import Textarea from 'primevue/textarea'
  import EventPreview from '@/components/EventPreview.vue'
  import { supabase } from '@/lib/superbase'
  import { useAuthStore } from '@/stores/auth'
  import { useRoute, useRouter } from 'vue-router'
  import { APP_ROUTES } from '@/constants'
  import { useEventStore } from '@/stores/event'
  import imageCompression from 'browser-image-compression'
  import { getRandomDefaultImage } from '@/utils/event'
  import { useMatchStore } from '@/stores/match'
  import { useI18n } from 'vue-i18n'

  const { EVENT } = APP_ROUTES
  const auth = useAuthStore()
  const eventStore = useEventStore()
  const matchStore = useMatchStore()
  const router = useRouter()
  const route = useRoute()
  const { t } = useI18n()

  const isLoading = ref(false)
  const isExistingEvent = computed(() => route.params.id as string)

  onMounted(async () => {
    eventStore.resetCurrentEvent()
    if (route.params.id) {
      await eventStore.setEvent(route.params.id as string)

      if (eventStore.event) {
        title.value = eventStore.event.title
        location.value = eventStore.event?.location
        subtitle.value = eventStore.event?.subtitle
        description.value = eventStore.event?.description
        date.value = new Date(eventStore.event.date)
        propositions.value = eventStore.event.propositions
      }
    } else {
      defaultImage.value = getRandomDefaultImage()
    }

    if (route.query.matchId && !Array.isArray(route.query.matchId)) {
      await setMatch(route.query.matchId)
    }
  })

  async function setMatch(id: string) {
    const match = await matchStore.getMatch(Number(id))
    if (match) {
      title.value = match.match
      location.value = match.venue
      date.value = new Date(match.date)
      propositions.value = [match.team_a, t('CreateView.chooseMatchNull'), match.team_b]
    }
  }

  const DEFAULT_DATE = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days from now

  onUnmounted(() => {
    title.value = ''
    location.value = ''
    subtitle.value = ''
    description.value = ''
    date.value = DEFAULT_DATE
    propositions.value = []
    fileCover.value = null
  })

  const title = ref('')
  const location = ref<string | undefined>('')
  const date = ref(DEFAULT_DATE)
  const subtitle = ref<string | undefined>('')
  const description = ref<string | undefined>('')
  const propositions = ref<string[]>([])
  const fileCover = ref<File | null>(null)
  const defaultImage = ref<string>('')

  const hasImg = computed(() => fileCover.value || eventStore.event?.image_url || defaultImage.value)

  const isValidForm = computed(() => {
    return title.value.length > 0 && propositions.value.length > 1
  })

  const imageUrl = computed(() => {
    if (fileCover.value) {
      return URL.createObjectURL(fileCover.value)
    }
    if (eventStore.event?.image_url) {
      return eventStore.event.image_url
    }
    return defaultImage.value
  })

  function selectCover(event: any) {
    defaultImage.value = ''
    fileCover.value = event.files[0]
  }

  async function submit(e: Event) {
    e.preventDefault()
    if (!auth.session?.user.email) {
      return
    }
    isLoading.value = true

    const { error, data } = await supabase
      .from('events')
      .upsert({
        id: eventStore.event?.id,
        title: title.value,
        subtitle: subtitle.value,
        description: description.value,
        propositions: propositions.value,
        date: date.value,
        author: auth.userId,
        location: location.value,
        ...(defaultImage.value ? { image_url: defaultImage.value } : {}),
        unit: 'beer',
      })
      .select()

    if (error) throw error

    if (fileCover.value) {
      const extension = fileCover.value.name.split('.').pop() ?? ''
      const pathFile = `public/event${data[0].id}.${extension}`
      const compressedImage = await imageCompression(fileCover.value, { maxSizeMB: 0.3, useWebWorker: true })

      const { error: errorStorage } = await supabase.storage.from('events').upload(pathFile, compressedImage, {
        cacheControl: '3600',
        upsert: true,
      })
      if (errorStorage) throw errorStorage

      // get public url
      const {
        data: { publicUrl },
      } = await supabase.storage.from('events').getPublicUrl(pathFile)

      // update event with image url
      const { error: errorUpdate } = await supabase
        .from('events')
        .update({
          image_url: publicUrl,
        })
        .eq('id', data[0].id)

      if (errorUpdate) throw errorUpdate
    }

    await eventStore.setAllEvents()

    router.push(`${EVENT}/${data[0].id}`)
    isLoading.value = false
  }
</script>

<template>
  <form @submit="submit">
    <h1>{{ isExistingEvent ? $t('CreateView.editTitle') : $t('CreateView.createTitle') }}</h1>
    <div class="creation__content">
      <div class="creation__forms">
        <Panel header="Général" :toggleable="true">
          <div class="creation__form">
            <div class="field">
              <label for="title">
                {{ $t('CreateView.title') }}
                <span>*</span>
              </label>
              <PInputText id="title" v-model="title" type="text" required :disabled="isLoading" />
            </div>
            <div class="field">
              <label for="subtitle">{{ $t('CreateView.subtitle') }}</label>
              <PInputText id="subtitle" v-model="subtitle" type="text" :disabled="isLoading" />
            </div>
            <div class="field">
              <label for="date">
                {{ $t('CreateView.date') }}
                <span>*</span>
              </label>
              <Calendar
                id="date"
                v-model="date"
                show-time
                show-icon
                date-format="dd/mm/yy à "
                required
                :min-date="new Date()"
                :disabled="isLoading" />
            </div>
            <div class="field">
              <label for="cover">
                {{ $t('CreateView.cover') }}
              </label>
              <FileUpload
                id="cover"
                mode="basic"
                name="cover"
                accept="image/*"
                :max-file-size="10000000"
                :invalid-file-size-message="$t('CreateView.invalidFileSizeMessage')"
                :invalid-file-type-message="$t('CreateView.invalidFileTypeMessage')"
                :choose-label="$t('CreateView.chooseLabel')"
                :disabled="isLoading"
                @select="selectCover" />
            </div>
          </div>
        </Panel>

        <Panel header="Détails" :toggleable="true">
          <div class="creation__form">
            <div class="field">
              <label for="description">{{ $t('CreateView.description') }}</label>
              <Textarea id="description" v-model="description" auto-resize :disabled="isLoading" />
            </div>
            <div class="field">
              <label for="location">{{ $t('CreateView.location') }}</label>
              <PInputText id="location" v-model="location" type="text" :disabled="isLoading" />
            </div>
            <div class="field">
              <label for="propositions">
                {{ $t('CreateView.propositions') }}
                <span>*</span>
              </label>
              <div class="propositions">
                <Chips
                  id="propositions"
                  v-model="propositions"
                  class="propositions__chips p-fluid"
                  add-on-blur
                  required
                  :allow-duplicate="false"
                  :disabled="isLoading" />
                <PButton class="propositions__fake-btn-plus p-button-rounded p-button-outlined" icon="pi pi-plus" />
              </div>
              <small v-if="!isExistingEvent" class="propositions__help">
                {{ $t('CreateView.propositionsHelper') }}
                <kbd>« {{ $t('CreateView.propositionsHelperKey') }} »</kbd>
              </small>
              <small v-else class="propositions__warning">
                <i class="pi pi-exclamation-triangle" />
                {{ $t('CreateView.propositionsWarning') }}
              </small>
            </div>
          </div>
        </Panel>
      </div>

      <EventPreview
        :title="title"
        :subtitle="subtitle"
        :date="date.toString()"
        :image-url="imageUrl"
        class="creation__event-preview"
        :class="{ 'creation__event-preview--visible': title.length > 0 && hasImg }" />
    </div>

    <PButton
      id="btn-validate"
      type="submit"
      class="p-button-success"
      :label="isExistingEvent ? $t('CreateView.editBtn') : $t('CreateView.createBtn')"
      :icon="`pi ${isLoading ? 'pi-spin pi-spinner' : 'pi-check'}`"
      :disabled="!isValidForm || isLoading" />
  </form>
</template>

<style scoped lang="scss">
  h1 {
    margin-bottom: 3rem;
  }

  .p-panel {
    margin-bottom: 1rem;
  }

  .creation {
    &__content {
      display: flex;
      flex-direction: column-reverse;
      gap: 1rem;
    }

    &__forms {
      flex: 1;
    }

    &__form {
      display: flex;
      flex-direction: column;
      gap: 1rem;

      label span {
        color: var(--red-300);
      }
    }

    &__form-scope {
      min-height: 10rem;
    }

    &__public-scope-sentence {
      margin-top: 0.5rem;
    }

    &__event-preview {
      display: none;
      opacity: 0;
      flex: 0.5;
      pointer-events: none;
      transition: opacity 0.3s ease;

      &--visible {
        display: block;
        opacity: 1;
      }
    }
  }

  .propositions {
    display: flex;
    gap: 1rem;

    &__chips {
      flex: 1;
    }

    &__help {
      display: none;
    }

    &__warning {
      margin-top: 0.25rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;

      i {
        color: var(--red-300);
      }
    }
  }

  #btn-validate {
    display: flex;
    margin-left: auto;
  }

  .field {
    display: flex;
    flex-direction: column;
  }

  ::v-deep(.p-fileupload-choose .p-button-label) {
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  @include md {
    .creation {
      &__content {
        flex-direction: row;
      }

      &__event-preview {
        display: block;
      }
    }

    .propositions__help {
      display: unset;
    }
  }

  @include lg {
    .propositions__fake-btn-plus {
      display: none;
    }
  }
</style>
