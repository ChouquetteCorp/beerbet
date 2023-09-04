<script setup lang="ts">
  import EventPreview from '@/components/EventPreview.vue'
  import Paginator from 'primevue/paginator'
  import type { Event } from '@/types/interfaces'
  import { computed, ref } from 'vue'

  interface Props {
    events: Event[]
    isRecentlyFinished?: boolean
  }

  const props = withDefaults(defineProps<Props>(), {
    isRecentlyFinished: false,
  })

  const EVENTS_PER_PAGE = 10
  const pageIndex = ref(0)

  const shortenedEvents = computed(() => {
    return props.events.slice(pageIndex.value, pageIndex.value + EVENTS_PER_PAGE)
  })

  function scrollToNavTabs() {
    const tabviewNavContainer = document.querySelector('.p-tabview-nav-container')
    if (tabviewNavContainer) tabviewNavContainer.scrollIntoView()
  }
</script>

<template>
  <EventPreview
    v-for="event of shortenedEvents"
    :id="event.id"
    :key="`event${event.id}`"
    :image-url="event.image_url || ''"
    :title="event.title"
    :subtitle="event?.subtitle"
    :date="event.date"
    :is-finished="event.is_finish"
    :is-recently-finished="isRecentlyFinished" />

  <Paginator
    v-if="events.length > EVENTS_PER_PAGE"
    v-model:first="pageIndex"
    :rows="EVENTS_PER_PAGE"
    :total-records="events.length"
    template="PrevPageLink PageLinks NextPageLink"
    @page="scrollToNavTabs" />
</template>
