<script setup lang="ts">
  import chouquette from '@/assets/images/chouquette.png'

  defineProps<{
    nbBet: number
  }>()
</script>

<template>
  <div class="bet-counter">
    <div class="bet-counter__number">
      <p>{{ nbBet }}</p>
      <img :src="chouquette" alt="unit" />
    </div>
    <p>{{ $t('EventView.betToast.success.detail', nbBet) }}</p>
  </div>
</template>

<style lang="scss">
  .bet-counter {
    display: flex;
    flex-direction: column;
    align-items: center;
    &__number {
      display: flex;
      justify-content: flex-end;
      align-items: baseline;
      column-gap: 1rem;
      height: 8.5rem;

      p {
        vertical-align: text-bottom;
        font-size: 7rem;
        font-weight: 500;
      }
      img {
        height: 3.75rem;
      }
    }
  }
</style>
