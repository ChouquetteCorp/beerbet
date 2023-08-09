<script setup lang="ts">
  import { APP_ROUTES } from '@/constants'
</script>

<template>
  <slot />
  <RouterLink :to="APP_ROUTES.CREATE" class="my-bets__create-btn-wrapper">
    <PButton :label="$t('Home.createBtn')" class="my-bets__create-btn" />
  </RouterLink>
</template>
