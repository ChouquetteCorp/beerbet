import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { supabase } from '@/lib/superbase'
import { useAuthStore } from '@/stores/auth'
import type { Event, Bet, Result } from '@/types/interfaces'
import { ERROR } from '@/constants'

export const useEventStore = defineStore('event', () => {
  const auth = useAuthStore()

  const allEvents = ref<Event[] | null>(null)
  const event = ref<Event | null>(null)
  const userBet = ref<Bet | null | undefined>(null)
  const dispatchResults = ref<Result[] | null>(null)
  const userResult = ref<string | null>(null)

  const isMyEvent = computed(() => event.value?.author.user_id === auth.userId)

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
      .eq('unit', 'beer')
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
    setAllEvents,
    setEvent,
  }
})
