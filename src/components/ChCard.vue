<template>
  <section>
    <slot />
  </section>
</template>

<style lang="scss" scoped>
  section {
    border-radius: 5px;
    box-shadow: $ch-box-shadow;
    background: var(--surface-a);
    padding: 5%;
  }
</style>
