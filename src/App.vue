<script setup lang="ts">
  import NavBar from './components/NavBar.vue'
  import { RouterView } from 'vue-router'
  import { onMounted } from 'vue'
  import Toast from 'primevue/toast'
  import { useAuthStore } from '@/stores/auth'

  const auth = useAuthStore()

  onMounted(async () => await auth.updateConnection())
</script>

<template>
  <NavBar />
  <RouterView />
  <Toast position="bottom-right" />
</template>
