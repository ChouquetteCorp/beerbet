<script lang="ts" setup>
  import { ref } from 'vue'
  import ChCard from '../components/ChCard.vue'
  import { useAuthStore } from '@/stores/auth'
  import { APP_ROUTES } from '@/constants'
  import { useRouter } from 'vue-router'
  const auth = useAuthStore()

  const email = ref('')
  const loading = ref(false)
  const error = ref(false)
  const success = ref(false)

  const router = useRouter()

  const onSubmit = async (e: Event) => {
    e.preventDefault()
    loading.value = true
    error.value = false
    try {
      await auth.signInWithEmail(email.value)
      success.value = true
    } catch (err) {
      error.value = true
    } finally {
      loading.value = false
    }
  }
</script>

<template>
  <ChCard class="login">
    <h1 class="login__title">Chouquette Bet</h1>

    <h2 class="login__subtitle">Connexion</h2>

    <p v-if="success">
      Vous venez de recevoir un email avec un lien de connexion. Cliquez sur ce lien pour vous connecter.
    </p>

    <form v-else @submit="onSubmit">
      <p v-if="error" class="p-error">Echec de la connexion. Veuillez réessayer.</p>
      <div class="field">
        <label>
          Email
          <PInputText v-model="email" type="email" name="email" required :class="{ 'p-invalid': error }" />
        </label>
      </div>
      <PButton
        :icon="`pi ${loading ? 'pi-loading' : 'pi-send'}`"
        type="submit"
        :label="loading ? 'Veuillez patientez...' : 'Envoyer un lien magique'"
        :disabled="loading"
        class="px-1" />
    </form>
  </ChCard>
</template>

<style lang="scss" scoped>
  .login {
    max-width: 420px;
    margin: auto;

    &__title {
      text-align: center;
      font-size: 2rem;
      font-weight: 600;
      border-bottom: 1px solid var(--gray-700);
      margin-bottom: 2rem;
      margin-top: 0;
    }

    &__subtitle {
      text-align: center;
      font-weight: 400;
      margin-bottom: 0.5rem;
    }

    label {
      display: flex;
      flex-direction: column;
      gap: 0.3rem;
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
