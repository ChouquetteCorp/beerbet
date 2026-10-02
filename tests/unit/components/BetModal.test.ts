import { describe, expect, it } from 'vitest'
import BetModal from '@/components/BetModal.vue'
import i18n from '@/lang'
import { shallowMount } from '@vue/test-utils'

function factory(props: { myBet?: number; myGuess?: string } = {}) {
  return shallowMount(BetModal, {
    global: {
      plugins: [i18n],
      stubs: {
        Dialog: {
          template: '<div><slot /><slot name="footer" /></div>',
        },
        PButton: true,
      },
    },
    props: {
      isVisible: true,
      guesses: [],
      myBet: 3,
      myGuess: '',
      isBetSending: false,
      ...props,
    },
  })
}

describe('BetModal', () => {
  it("sendMyBet() should emit 'set-my-bet' with { bet: tmpBet.value, guess: tmpGuess.value }", async () => {
    const expectedBet = 5
    const expectedGuess = 'Johnny Halliday'

    const wrapper = factory({
      myBet: expectedBet,
      myGuess: expectedGuess,
    })

    const submit = wrapper
      .findAll('p-button-stub')
      .find((button) => button.attributes('label') === 'BetModal.submitBet')

    expect(submit?.exists()).toBe(true)
    await submit?.trigger('click')

    expect(wrapper.emitted('set-my-bet')).toBeTruthy()
    expect(wrapper.emitted('set-my-bet')?.[0]).toEqual([
      {
        bet: expectedBet,
        guess: expectedGuess,
      },
    ])
  })
})
