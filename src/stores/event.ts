import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { supabase } from '@/lib/superbase'
import { useAuthStore } from '@/stores/auth'
import type { Event, Bet, Result } from '@/types/interfaces'
import { UserResults } from '@/types/enums'
import { ERROR } from '@/constants'
import config from '@/config.json'

export const useEventStore = defineStore('event', () => {
  const auth = useAuthStore()

  const allEvents = ref<Event[] | null>(null)
  const event = ref<Event | null>(null)
  const userBet = ref<Bet | null | undefined>(null)
  const dispatchResults = ref<Result[] | null>(null)
  const userResult = ref<string | null>(null)

  const isMyEvent = computed(() => event.value?.author.user_id === auth.userId)
  const nbBet = computed(() => Object.values(event.value?.countBet ?? 0).reduce((a, b) => a + b, 0))

  const recentlyFinishedEvents = computed(() => {
    if (!allEvents.value) return []

    const oneDayAgo = new Date().getTime() - 1000 * 60 * 60 * 24
    return allEvents.value.filter((event) => event.date_finish && new Date(event.date_finish).getTime() > oneDayAgo)
  })

  const isRecentlyFinishedEvents = computed(() => recentlyFinishedEvents.value.length > 0)

  const isTargetEventRecentlyFinished = computed(
    () => (id: number) => !!recentlyFinishedEvents.value.find((event) => event.id === id),
  )

  async function setAllEvents() {
    const { data: eventsData, error: eventsError } = await supabase
      .from('events')
      .select('*, author(*)')
      .eq('unit', config.unit)
      .order('date')

    if (eventsError) throw eventsError
    allEvents.value = eventsData || []
  }

  async function setEvent(id: string) {
    const currentLocalEvent = allEvents.value?.find((event) => event.id === Number(id))

    if (currentLocalEvent) {
      event.value = currentLocalEvent
    } else {
      const { data: currentServerEvent } = await supabase.from('events').select('*, author(*)').eq('id', id)
      if (!currentServerEvent?.[0]) {
        console.error('Event not found')
        return ERROR
      }
      event.value = currentServerEvent[0]
    }

    if (!auth.userId) return
    const { data: userBetData, error: userBetError } = await supabase
      .from('bets')
      .select('*')
      .eq('event_id', id)
      .eq('user_id', auth.userId)
    if (userBetError) throw userBetError

    userBet.value = userBetData[0]

    await setCountBet()

    await setDispatchResults()
  }

  async function setCountBet() {
    if (!event.value) return

    const { data: counts, error: errorCount } = await supabase.rpc('count_guess_for_event', { eventid: event.value.id })
    if (errorCount) throw errorCount

    const countBet: Record<string, number> = {}

    event.value.propositions.forEach((proposition) => {
      countBet[proposition] = counts.find(({ guess }: { guess: string }) => guess === proposition)?.sum ?? 0
    })
    event.value.countBet = countBet
  }

  async function setDispatchResults() {
    if (!auth.userId || !event.value) return
    const { data: dispatchResultsData, error: dispatchResultsError } = await supabase
      .from('results')
      .select('*, from:from_id(*), to:to_id(*)')
      .eq('event_id', event.value.id)
      .or('to_id.eq.' + auth.userId + ',from_id.eq.' + auth.userId + ',from_id.is.null')

    if (dispatchResultsError) throw dispatchResultsError
    dispatchResults.value = dispatchResultsData
    setUserResult()
  }

  function setUserResult() {
    const { Victory, Defeat } = UserResults
    if (!userBet.value || !event.value) return
    const isWinner = userBet.value.guess === event.value.winner
    userResult.value = isWinner ? Victory : Defeat
  }

  async function setBettors() {
    if (!event.value) return
    const { count: bettorsCount, error: bettorsError } = await supabase
      .from('bets')
      .select('*', { count: 'exact', head: true })
      .eq('event_id', event.value.id)
    if (bettorsError) throw bettorsError
    event.value.bettors = bettorsCount
  }

  async function updateBet(number: number, guess: string) {
    if (number === 0) await deleteBet()
    else await addBet(number, guess)
    await setCountBet()
  }

  async function addBet(number: number, guess: string) {
    if (!auth.userId || !event.value) return
    const bet = { number, event_id: event.value.id, user_id: auth.userId, guess }
    const { error: userBetError } = await supabase
      .from('bets')
      .upsert(bet)
      .eq('event_id', event.value.id)
      .eq('user_id', auth.userId)

    if (userBetError) throw userBetError

    userBet.value = bet
  }

  async function deleteBet() {
    if (!auth.userId || !event.value) return
    const { error: userBetError } = await supabase
      .from('bets')
      .delete()
      .eq('event_id', event.value.id)
      .eq('user_id', auth.userId)

    if (userBetError) throw userBetError
    if (userBet.value) userBet.value = null
  }

  async function endBet(winner: string) {
    if (!auth.userId || !event.value) return
    const { error: endBetError } = await supabase.functions.invoke('end-bet/' + event.value.id, {
      body: { winner },
    })
    if (endBetError) throw endBetError
    await setAllEvents()
  }

  function resetEventStore() {
    allEvents.value = null
    resetCurrentEvent()
  }

  function resetCurrentEvent() {
    event.value = null
    userBet.value = null
    dispatchResults.value = null
    userResult.value = null
  }

  async function deleteEvent() {
    if (!event.value || !auth.userId || !isMyEvent.value) return
    const { error: errorBet } = await supabase.from('bets').delete().eq('event_id', event.value.id)
    if (errorBet) throw errorBet
    const { error: errorEvent } = await supabase.from('events').delete().eq('id', event.value.id)
    if (errorEvent) throw errorEvent

    // remove event from allEvents
    const eventIndex = allEvents.value?.findIndex((e) => e.id === event.value?.id)
    if (eventIndex) allEvents.value?.splice(eventIndex, 1)
  }

  return {
    allEvents,
    event,
    userBet,
    dispatchResults,
    userResult,
    recentlyFinishedEvents,
    isRecentlyFinishedEvents,
    isTargetEventRecentlyFinished,
    isMyEvent,
    nbBet,
    setAllEvents,
    setEvent,
    setBettors,
    updateBet,
    endBet,
    resetEventStore,
    resetCurrentEvent,
    deleteEvent,
  }
})
