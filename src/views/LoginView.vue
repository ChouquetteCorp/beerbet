<script lang="ts" setup>
  import { ref, watch } from 'vue'
  import ChCard from '../components/ChCard.vue'
  import { useAuthStore } from '@/stores/auth'
  import { APP_ROUTES } from '@/constants'
  import { useRoute, useRouter } from 'vue-router'
  import { storeToRefs } from 'pinia'
  import { supabase } from '@/lib/superbase'
  import { useToast } from 'primevue/usetoast'
  import { useI18n } from 'vue-i18n'

  const auth = useAuthStore()
  const router = useRouter()
  const route = useRoute()
  const toast = useToast()

  const email = ref('')
  const isLoading = ref(false)
  const error = ref(false)
  const success = ref(false)

  const { session } = storeToRefs(auth)
  const { t } = useI18n()

  watch(
    session,
    () => {
      if (auth.session) {
        if (route.path.startsWith(APP_ROUTES.INVITE)) {
          return redirectIfInvitation()
        }
        router.push((route.query?.redirect as string) || APP_ROUTES.HOME)
      }
    },
    { immediate: true },
  )

  async function redirectIfInvitation() {
    try {
      const { error } = await supabase.from('events_users_participation').insert({
        user_id: auth.userId,
        event_code: route.params.code,
      })
      // Error 23505 duplicate insert for user_id, event_code
      if (error && error.code != '23505') {
        throw error
      }

      const { data, error: errorEvent } = await supabase
        .from('events')
        .select('id')
        .eq('invite_code', route.params.code)
      if (errorEvent) {
        throw errorEvent
      }
      router.push({ path: APP_ROUTES.EVENT + '/' + data[0].id })
    } catch (e) {
      toast.add({ severity: 'error', detail: t('LoginView.linkInvalid'), life: 3000 })
      router.push({ path: APP_ROUTES.HOME })
    }
  }

  function getRedirectPath() {
    let redirectPath = (route.query?.redirect as string) || APP_ROUTES.HOME
    if (route.params.code) {
      redirectPath = APP_ROUTES.INVITE + '/' + route.params.code
    }
    return redirectPath
  }

  async function onSubmit(e: Event) {
    e.preventDefault()
    isLoading.value = true
    error.value = false
    try {
      await auth.signInWithEmail(email.value, getRedirectPath())
      success.value = true
    } catch (err) {
      error.value = true
    } finally {
      isLoading.value = false
    }
  }
</script>

<template>
  <ChCard class="login">
    <h1 class="login__title">{{ $t('LoginView.title') }}</h1>

    <div v-if="success" class="login__success">
      <p>{{ $t('LoginView.success.message') }}</p>
      <p class="login__waiting-message">{{ $t('LoginView.success.waitingMessage') }}</p>
      <p class="login__support-message">{{ $t('LoginView.success.supportMessage') }}</p>
      <p class="login__support-message">{{ $t('LoginView.success.checkSpamMessage') }}</p>
      <a href="mailto:chouquette-bet@googlegroups.com">
        <PButton class="p-button-link login__support-btn">
          {{ $t('LoginView.contactMessage') }}
        </PButton>
      </a>
    </div>

    <form v-else @submit="onSubmit">
      <p v-if="error" class="p-error">{{ $t('LoginView.error') }}</p>
      <div class="field">
        <label>
          {{ $t('LoginView.email') }}
          <PInputText
            v-model="email"
            type="email"
            name="email"
            required
            :class="{ 'p-invalid': error }"
            placeholder="beer@email.fr" />
        </label>
      </div>
      <PButton
        class="login__btn-send-link"
        type="submit"
        :label="isLoading ? $t('LoginView.waitMessage') : $t('LoginView.sendLinkMessage')"
        :icon="`pi ${isLoading ? 'pi-spin pi-spinner' : 'pi-send'}`"
        :disabled="isLoading" />
    </form>
  </ChCard>
</template>

<style lang="scss" scoped>
  .login {
    max-width: 420px;
    margin: auto;
    padding-bottom: 2.5%;

    &__advice {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 1rem;
      text-align: center;

      b {
        font-weight: bold;
      }
    }

    &__title {
      font-size: 2rem;
      border-bottom: 1px solid var(--gray-700);
      margin-bottom: 2rem;
    }

    &__success {
      p {
        white-space: break-spaces;
        text-align: center;
      }
    }

    &__waiting-message {
      margin: 1rem 0;
      font-weight: 600;
    }

    &__support-btn,
    &__support-details,
    &__support-message {
      font-size: 0.8rem;
      font-weight: 200;
    }

    & &__support-btn.p-button {
      padding: 0;
      width: fit-content;
      margin: auto;
      display: block;

      &:focus {
        box-shadow: none;
      }
    }

    &__support-details {
      margin-top: 0.5rem;
      opacity: 0;
      transition: opacity 0.3s ease-in-out;

      &--active {
        opacity: 1;
      }
    }

    label {
      display: flex;
      flex-direction: column;
      gap: 0.3rem;
    }

    &__button.p-button {
      --login-btn-color-400: var(--red-400);
      --login-btn-color-600: var(--red-600);
      --login-btn-color-700: var(--red-700);

      transition: background-position 0.5s ease-out;
      padding: 0;
      margin: 1rem auto;
      height: 2.625rem;

      &,
      &:hover {
        background: linear-gradient(to left, var(--login-btn-color-600) 50%, var(--login-btn-color-700) 50%);
        background-size: 200% 100%;
        color: var(--text-color);
        border: none;
        background-position: right bottom;
      }

      &:hover {
        background-position: left bottom;
      }

      &:focus {
        box-shadow: 0 0 0 1px var(--login-btn-color-400);
      }

      & i {
        background-color: var(--login-btn-color-700);
        padding: 0.75rem;
        margin-right: 0.5rem;
        height: 100%;
        display: flex;
        align-items: center;
      }
    }

    &__button--loading {
      background: var(--login-btn-color-700) !important;
    }

    &__btn-send-link {
      margin-bottom: 0.5rem;
    }

    &__privacy-link {
      text-align: center;
      font-size: 0.8rem;
      font-weight: 200;
      margin: 0.5rem;
    }

    &__button--facebook.p-button {
      --login-btn-color-400: var(--blue-400);
      --login-btn-color-600: var(--blue-600);
      --login-btn-color-700: var(--blue-700);
    }

    &__button--mail.p-button {
      --login-btn-color-400: var(--yellow-400);
      --login-btn-color-600: var(--yellow-600);
      --login-btn-color-700: var(--yellow-700);
    }

    .field {
      margin-bottom: 1rem;
    }

    .p-inputtext,
    .p-button {
      width: 100%;
    }
  }
</style>
