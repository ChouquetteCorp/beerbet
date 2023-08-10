<script lang="ts" setup>
  import { useAuthStore } from '@/stores/auth'
  import { ref, inject } from 'vue'

  const dialogRef = inject<{ value: { close: () => {} } }>('dialogRef')
  const auth = useAuthStore()

  const username = ref(auth.profile?.username ?? '')

  function onSubmit(e: Event) {
    e.preventDefault()
    auth.changeUsername(username.value)
    if (dialogRef) dialogRef.value.close()
  }
</script>

<template>
  <form class="profile-edition" @submit="onSubmit">
    <div class="profile-edition__field">
      <label for="username">
        {{ $t('ProfileEdition.username') }}
        <span>*</span>
      </label>
      <PInputText id="username" v-model="username" name="username" type="text" required />
    </div>

    <PButton
      class="p-button-success profile-edition__save"
      type="submit"
      icon="pi pi-check"
      :label="$t('ProfileEdition.save')"
      :disabled="!username"
    />
  </form>
</template>

<style lang="scss" scoped>
  .profile-edition {
    display: flex;
    flex-direction: column;

    &__field {
      display: flex;
      flex-direction: column;
      margin-bottom: 1rem;

      label span {
        color: var(--red-300);
      }
    }

    &__save {
      align-self: flex-end;
    }
  }
</style>
