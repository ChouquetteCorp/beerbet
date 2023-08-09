<script setup lang="ts">
  import chouquette from '@/assets/images/chouquette.png'
  import { ref } from 'vue'

  const isChouquetteModeActive = ref(false)

  function toggleChouquetteMode() {
    if (!isChouquetteModeActive.value) {
      document.body.classList.remove('remove-chouquette-mode')
      document.body.classList.add('chouquette-mode')
      isChouquetteModeActive.value = true
    } else {
      document.body.classList.add('remove-chouquette-mode')
      setTimeout(() => {
        document.body.classList.remove('chouquette-mode')
        document.body.classList.remove('remove-chouquette-mode')
      }, 800)
      isChouquetteModeActive.value = false
    }
  }
</script>
<template>
  <footer>
    <p>ChouquetteCorp {{ new Date().getFullYear() }} |</p>
    <img :src="chouquette" width="32" height="32" alt="logo chouquette" @click="toggleChouquetteMode" />
  </footer>
</template>

<style scoped lang="scss">
  footer {
    position: absolute;
    bottom: 0;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    padding: 0.6rem 0;
    background: var(--surface-a);

    p {
      font-size: 0.8rem;
    }

    img {
      width: 1.8rem;
      height: 1.8rem;
      cursor: pointer;
    }
  }
</style>
