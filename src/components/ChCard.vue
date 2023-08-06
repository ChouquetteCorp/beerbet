<template>
  <section>
    <slot />
  </section>
</template>

<style lang="scss" scoped>
  section {
    border-radius: 5px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.03), 0 0 2px rgba(0, 0, 0, 0.06), 0 2px 6px rgba(0, 0, 0, 0.12);
    background: var(--surface-a);
    padding: 5%;
  }
</style>
