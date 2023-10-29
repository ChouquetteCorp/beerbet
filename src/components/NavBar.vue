<script setup lang="ts">
  import { computed, ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { useAuthStore } from '@/stores/auth'
  import Menubar from 'primevue/menubar'
  import BeatLoader from 'vue-spinner/src/BeatLoader.vue'
  import { APP_ROUTES } from '@/constants'
  import { useI18n } from 'vue-i18n'
  import { useDialog } from 'primevue/usedialog'
  import DynamicDialog from 'primevue/dynamicdialog'
  import ProfileEdition from './ProfileEdition.vue'
  import { uppercaseFirstLetter } from '@/utils/string'

  const { HOME, LOGIN, MY_BETS, FAQ, CREATE, MATCHS } = APP_ROUTES
  const router = useRouter()
  const auth = useAuthStore()
  const { t, locale, availableLocales } = useI18n({ useScope: 'global' })

  const dialog = useDialog()

  const items = computed(() => [
    { icon: 'pi pi-home', class: 'navbar__home', to: HOME },
    { label: t('MyBetsView.title'), to: MY_BETS, visible: () => auth.isConnected && !isLoading.value },
    {
      label: t('CreateView.createTitle'),
      visible: () => auth.isConnected && !isLoading.value,
      to: CREATE,
    },
    {
      label: t('MatchView.title'),
      to: MATCHS,
    },
    { label: t('FAQView.titleShort'), to: FAQ },
    {
      icon: 'pi pi-language',
      items: (availableLocales as string[]).map((code) => {
        const language = new Intl.DisplayNames([code], { type: 'language' }).of(code) ?? ''

        return {
          label: uppercaseFirstLetter(language),
          class: () => (locale.value === code ? 'navbar__lang--active' : ''),
          command: () => {
            locale.value = code
            localStorage.setItem('locale', code)
          },
        }
      }),
    },
    { class: 'spacer', separator: true },
    {
      label: t('LoginView.title'),
      class: 'navbar__log',
      icon: 'pi pi-fw pi-power-off',
      visible: () => !auth.isConnected && !isLoading.value,
      to: LOGIN,
    },
    {
      label: t('ProfileEdition.titleShort'),
      class: 'navbar__log',
      icon: 'pi pi-user',
      visible: () => auth.isConnected && !isLoading.value,
      command: () => showProfileEdtion(),
    },
    {
      label: t('LogoutView.title'),
      class: 'navbar__log',
      icon: 'pi pi-fw pi-power-off',
      visible: () => auth.isConnected && !isLoading.value,
      command: () => logoutAndGoHome(),
    },
  ])

  const isLoading = ref(false)

  async function logoutAndGoHome() {
    isLoading.value = true
    router.push(HOME)
    await auth.logout()
    isLoading.value = false
  }

  function showProfileEdtion() {
    dialog.open(ProfileEdition, {
      props: {
        header: t('ProfileEdition.title'),
        style: { width: '50vw' },
        breakpoints: { '992px': '60vw', '768px': '70vw', '576px': '90vw' },
        modal: true,
        draggable: false,
      },
    })
  }
</script>

<template>
  <div class="navbar-container">
    <Menubar :model="items" class="navbar" />
    <BeatLoader :loading="isLoading" color="var(--primary-color)" size="0.5rem" />
    <DynamicDialog />
  </div>
</template>

<style scoped lang="scss">
  .navbar-container {
    position: relative;
    z-index: 1;
  }

  .navbar {
    margin-bottom: 5vh;
    position: relative;
  }

  ::v-deep(.p-menubar-root-list) {
    width: 100%;
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

  ::v-deep(.p-menuitem-link:focus :is(.p-menuitem-text, .p-menuitem-icon)),
  ::v-deep(.navbar__lang--active) :is(.p-menuitem-text, .p-menuitem-icon) {
    color: var(--primary-color) !important;
  }

  ::v-deep(.router-link-active :is(.p-menuitem-text, .p-menuitem-icon)) {
    color: var(--primary-color) !important;
    box-shadow: none !important;
  }

  .v-spinner {
    position: absolute;
    right: 1.5rem;
    top: 0.85rem;
  }

  @media (min-width: 960px) {
    ::v-deep(.spacer) {
      flex-grow: 1;
    }

    .v-spinner {
      top: 1.1rem;
    }
  }
</style>
