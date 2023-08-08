<script lang="ts" setup>
  import { ref } from 'vue'
  import chouquette from '@/assets/images/chouquette.png'

  const chouquetteDirections = ref(new Array(30).fill(0).map(() => [Math.random(), Math.random(), Math.random()]))

  function addChouquettes(chouquettes: number = 20) {
    for (let i = 0; i < chouquettes; i++) {
      chouquetteDirections.value.push([Math.random(), Math.random(), Math.random()])
    }
  }
</script>

<template>
  <div class="chouquettes-fall" @click="addChouquettes()">
    <img
      v-for="([r1, r2, r3], index) in chouquetteDirections"
      :key="`chouquette-${index}`"
      class="chouquettes-fall__chouquette"
      :src="chouquette"
      alt="chouquette"
      draggable="false"
      :style="{
        animationDelay: `${r1 * 1.5}s`,
        left: `${r2 * 100}%`,
        transform: `rotate(${r3 * 60 - 30}deg)`,
      }"
    />
  </div>
</template>

<style scoped lang="scss">
  .chouquettes-fall {
    inset: 0;
    overflow: hidden;
    position: absolute;
    cursor: pointer;

    &__chouquette {
      animation: chouquettes-falling 0.5s ease-in both;
      position: absolute;
      top: 0;
      width: 32px;
      user-select: none;
      pointer-events: none;
      z-index: 2;
    }
  }
</style>
