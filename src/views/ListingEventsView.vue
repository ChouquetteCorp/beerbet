<script setup lang="ts">
  import EventPreview from '@/components/EventPreview.vue'
  import { EventsMock } from '@/mocks/EventsMock'
</script>

<template>
  <div class="listing-events">
    <h1>Les évènements</h1>
    <EventPreview
      v-for="event of EventsMock"
      :id="event.id"
      :key="event.id"
      :image="event.image"
      :title="event.title"
      :subtitle="event.subtitle"
      :date="event.date" />
  </div>
</template>

<style scoped lang="scss">
  .listing-events {
    display: flex;
    flex-direction: column;
    gap: 3rem;
  }
</style>
