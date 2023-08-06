<script setup lang="ts">
  import Card from 'primevue/card'
  import { computed, defineProps } from 'vue'
  import { APP_ROUTES } from '@/constants'
  import { useRouter } from 'vue-router'

  const router = useRouter()

  const props = defineProps({
    id: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
      required: true,
    },
    date: {
      type: Object,
      required: true,
    },
  })

  const formattedDate = computed(() => formatDateNumber(props.date.day) + '/' + formatDateNumber(props.date.month))

  const formatDateNumber = (value: number) => (value.toString().length < 2 ? `0${value}` : value)

  const goToEvent = (id: number) => router.push(`${APP_ROUTES.EVENT}/${id}`)
</script>

<template>
  <Card class="event-preview">
    <template #header>
      <img :src="image" class="event-preview__image" alt="event preview" />
    </template>
    <template #title>{{ formattedDate }} • {{ title }}</template>
    <template #subtitle>{{ subtitle }}</template>
    <template #footer>
      <PButton label="Parier sur cet évènement !" @click="goToEvent(id)" />
    </template>
  </Card>
</template>

<style scoped lang="scss">
  .event-preview {
    &__image {
      height: 10rem;
      object-fit: cover;
    }
  }

  ::v-deep(.p-card-content) {
    display: none !important;
  }
</style>
