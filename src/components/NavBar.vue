<script setup lang="ts">
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { useAuthStore } from '@/stores/auth'
  import Menubar from 'primevue/menubar'
  import BeatLoader from 'vue-spinner/src/BeatLoader.vue'
  import { APP_ROUTES } from '@/constants'
  const { HOME, LOGIN, LISTING_EVENTS, MY_BETS, CREATE } = APP_ROUTES
  const router = useRouter()
  const auth = useAuthStore()

  const items = ref([
    { icon: 'pi pi-home', class: 'navbar__home', to: HOME },
    { label: 'Les évènements', to: LISTING_EVENTS },
    { label: 'Mes paris', to: MY_BETS },
    {
      label: 'Création',
      visible: () => auth.isConnected && !isLoading.value,
      to: CREATE,
    },
    {
      label: 'Connexion',
      class: 'navbar__log',
      icon: 'pi pi-fw pi-power-off',
      visible: () => !auth.isConnected && !isLoading.value,
      to: LOGIN,
    },
    {
      label: 'Déconnexion',
      class: 'navbar__log',
      icon: 'pi pi-fw pi-power-off',
      visible: () => auth.isConnected && !isLoading.value,
      command: () => logoutAndGoHome(),
    },
  ])

  const isLoading = ref(false)

  const logoutAndGoHome = async () => {
    isLoading.value = true
    await auth.logout()
    isLoading.value = false
    router.push(HOME)
  }
</script>

<template>
  <div class="navbar-container">
    <Menubar :model="items" class="navbar" />
    <BeatLoader :loading="isLoading" color="var(--primary-color)" size="0.5rem" />
  </div>
</template>

<style scoped lang="scss">
  .navbar-container {
    position: relative;
  }

  .navbar {
    margin-bottom: 5vh;
    position: relative;
  }

  ::v-deep(.navbar__home .p-menuitem-icon) {
    margin-right: 0 !important;
  }

  ::v-deep(.p-menuitem-link) {
    box-shadow: none !important;
    text-decoration: inherit !important;
  }

  ::v-deep(.p-menuitem-link:focus) {
    background: rgba(255, 255, 255, 0.03) !important;
  }

  ::v-deep(.p-menuitem-link:focus :is(.p-menuitem-text, .p-menuitem-icon)) {
    color: var(--primary-color) !important;
  }

  ::v-deep(.router-link-active :is(.p-menuitem-text, .p-menuitem-icon)) {
    color: var(--primary-color) !important;
    box-shadow: none !important;
  }

  .v-spinner {
    position: absolute;
    right: 1.5rem;
    top: 1.1rem;
  }

  @media (min-width: 960px) {
    ::v-deep(.navbar__log) {
      position: absolute !important;
      right: 0.5rem;
    }
  }
</style>
