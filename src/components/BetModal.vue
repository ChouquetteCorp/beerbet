<!-- eslint-disable vue/no-setup-props-destructure -->
<script setup lang="ts">
  import { ref } from 'vue'
  import Dialog from 'primevue/dialog'
  import chouquette from '@/assets/images/chouquette.png'
  import cryingBaby from '@/assets/images/crying-baby.png'

  const emit = defineEmits<{
    (event: 'set-my-bet', payload: { bet: number; guess: string }): void
    (event: 'update-visibility', payload: boolean): void
  }>()

  interface Props {
    isVisible: boolean
    guesses: string[]
    myBet?: number | null
    myGuess?: string | null
    isBetSending?: boolean
  }

  const props = withDefaults(defineProps<Props>(), {
    myBet: null,
    myGuess: null,
    isBetSending: false,
  })

  const DEFAULT_TMP_BET: number = 3
  const DEFAULT_TMP_GUESS: string = ''

  const tmpBet = ref(props.myBet || DEFAULT_TMP_BET)
  const tmpGuess = ref(props.myGuess || DEFAULT_TMP_GUESS)

  function sendMyBet() {
    emit('set-my-bet', { bet: tmpBet.value, guess: tmpGuess.value })
    if (tmpBet.value === 0) {
      setTimeout(() => {
        tmpBet.value = DEFAULT_TMP_BET
        tmpGuess.value = DEFAULT_TMP_GUESS
      }, 1000)
    }
  }
</script>

<template>
  <Dialog
    :visible="isVisible"
    class="bet-modal"
    :breakpoints="{ '992px': '60vw', '768px': '70vw', '576px': '90vw' }"
    :style="{ width: '50vw' }"
    :header="$t('BetModal.title')"
    modal
    :draggable="false"
    :closable="!isBetSending"
    @update:visible="emit('update-visibility', $event)">
    <p>{{ $t('BetModal.questionGuess') }}</p>
    <div class="bet-modal__guesses-wrapper">
      <PButton
        v-for="(guess, index) in guesses"
        :key="guess + index"
        class="p-button-warning"
        :class="{ 'p-button-outlined': tmpGuess !== guess }"
        :label="guess"
        :disabled="isBetSending"
        @click="tmpGuess = guess" />
    </div>
    <p>{{ $t('BetModal.questionNumber') }}</p>
    <div class="bet-modal__bet-images-wrapper">
      <transition name="fade" mode="out-in">
        <transition-group v-if="tmpBet > 0" name="bounce" tag="div" class="bet-modal__chouquettes-wrapper">
          <img
            v-for="index of tmpBet"
            :key="`chouquette${index}`"
            :src="chouquette"
            class="bet-modal__chouquette"
            alt="chouquette" />
        </transition-group>
        <img v-else :src="cryingBaby" class="bet-modal__crying-baby" alt="crying baby" />
      </transition>
    </div>
    <template #footer>
      <div class="bet-modal__footer">
        <div class="bet-modal__minus-plus-buttons-wrapper">
          <PButton
            data-test="minus-button"
            class="p-button-rounded p-button-outlined"
            :class="{ 'p-button--disabled': tmpBet <= 0 }"
            icon="pi pi-minus"
            :disabled="isBetSending"
            @click="tmpBet > 0 && tmpBet--" />
          <PButton
            data-test="plus-button"
            class="p-button-rounded"
            :class="{ 'p-button--disabled': tmpBet >= 10 }"
            icon="pi pi-plus"
            :disabled="isBetSending"
            @click="tmpBet < 10 && tmpBet++" />
        </div>
        <div class="bet-modal__submit-wrapper">
          <transition name="bounce-small" mode="out-in">
            <PButton
              v-if="tmpBet > 0"
              :label="$t('BetModal.submitBet')"
              class="p-button-success"
              :icon="`pi ${isBetSending ? 'pi-spin pi-spinner' : 'pi-thumbs-up'}`"
              :disabled="isBetSending || !tmpGuess"
              @click="sendMyBet()" />
            <PButton
              v-else
              :label="$t('BetModal.cancelBet')"
              class="p-button-danger"
              :icon="`pi ${isBetSending ? 'pi-spin pi-spinner' : 'pi-thumbs-down'}`"
              :disabled="isBetSending"
              @click="sendMyBet()" />
          </transition>
        </div>
      </div>
    </template>
  </Dialog>
</template>

<style scoped lang="scss">
  .bet-modal {
    * {
      user-select: none;
    }

    &__guesses-wrapper {
      margin: 1rem 0 1.5rem;
      display: flex;
      justify-content: center;
      gap: 2rem;
      flex-wrap: wrap;

      > .p-button {
        min-width: 10rem;
      }
    }

    &__bet-images-wrapper {
      margin-top: 1.5rem;
      min-height: 3rem;
    }

    &__chouquettes-wrapper {
      display: flex;
      flex-wrap: wrap;
      gap: 1rem;
    }

    &__chouquette,
    &__crying-baby {
      width: 3rem;
      aspect-ratio: 1/1;
    }

    &__crying-baby {
      margin: auto;
    }

    &__footer {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      min-height: 2.6rem;
      gap: 1rem;
    }

    &__minus-plus-buttons-wrapper {
      .p-button {
        aspect-ratio: 1/1;
        transition: opacity 0.1s ease;
      }

      .p-button--disabled {
        opacity: 0.5;
      }

      .p-button--disabled.p-button:focus {
        box-shadow: none;
      }
    }

    &__submit-wrapper {
      margin-right: 0.5rem;
      display: flex;
      justify-content: center;
      align-items: center;

      > .p-button {
        min-width: 8rem;
      }
    }
  }
</style>
