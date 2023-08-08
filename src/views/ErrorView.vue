<script lang="ts" setup>
  import ChouquettesFallAnim from '@/components/ChouquettesFallAnim.vue'
  import { APP_ROUTES } from '@/constants'
</script>

<template>
  <div class="page-not-found">
    <h1>{{ $t('ErrorView.title') }}</h1>
    <h3>{{ $t('ErrorView.subtitle') }}</h3>
    <p>
      {{ $t('ErrorView.helpers') }}
    </p>
    <RouterLink :to="APP_ROUTES.HOME">
      <PButton :label="$t('ErrorView.returnBtn')" class="page-not-found__button" icon="pi pi-home" />
    </RouterLink>
    <ChouquettesFallAnim />
  </div>
</template>

<style lang="scss" scoped>
  .page-not-found {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    h3 {
      margin-top: 1rem;
    }

    &__button {
      margin-top: 1rem;
      min-width: 12rem;
      z-index: 1;
    }
  }
</style>
