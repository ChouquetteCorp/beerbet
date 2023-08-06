<script setup lang="ts">
  import NavBar from './components/NavBar.vue'
  import { RouterView } from 'vue-router'
  import { onMounted } from 'vue'
  import { useAuthStore } from '@/stores/auth'
  const auth = useAuthStore()

  onMounted(async () => await auth.updateConnection())
</script>

<template>
  <NavBar />
  <RouterView />
</template>
