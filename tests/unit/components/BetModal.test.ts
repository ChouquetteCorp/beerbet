import { describe, expect, it } from 'vitest'
import BetModal from '@/components/BetModal.vue'
import { shallowMount } from '@vue/test-utils'

function factory() {
  return shallowMount(BetModal, {
    props: {
      isVisible: true,
      guesses: [],
      myBet: 3,
      myGuess: '',
      isBetSending: false,
    },
  })
}

describe('BetModal', () => {
  it("sendMyBet() should emit 'set-my-bet' with { bet: tmpBet.value, guess: tmpGuess.value }", () => {
    const expectedBet = 5
    const expectedGuess = 'Johnny Halliday'

    const wrapper = factory()

    wrapper.vm.tmpBet = expectedBet
    wrapper.vm.tmpGuess = expectedGuess

    wrapper.vm.sendMyBet()

    expect(wrapper.emitted('set-my-bet')).toBeTruthy()
    expect(wrapper.emitted('set-my-bet')?.[0]).toEqual([
      {
        bet: expectedBet,
        guess: expectedGuess,
      },
    ])
  })
})
