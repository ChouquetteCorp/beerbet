<script setup lang="ts">
  import ChCard from '@/components/ChCard.vue'
  import { APP_ROUTES } from '@/constants'
  import { onMounted, onUnmounted } from 'vue'
  import { useRoute, useRouter } from 'vue-router'

  const router = useRouter()
  const route = useRoute()

  onMounted(() => {
    window.addEventListener('online', onOnline)
  })

  function onOnline() {
    router.push((route.query?.redirect as string) || APP_ROUTES.HOME)
  }

  onUnmounted(() => {
    window.removeEventListener('online', onOnline)
  })
</script>

<template>
  <ChCard class="offline-container">
    <h3>{{ $t('OfflineView.title') }}</h3>
    <h4>{{ $t('OfflineView.subtitle') }}</h4>
    <p>{{ $t('OfflineView.helper') }}</p>
  </ChCard>
</template>

<style lang="scss" scoped>
  .offline-container {
    text-align: center;

    &__image {
      margin-top: 1rem;
      margin-bottom: 1rem;
      display: flex;
      justify-content: center;
      gap: 2rem;

      @include sm {
        gap: 4rem;
      }
    }
  }
</style>
