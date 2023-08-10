import { defineStore } from 'pinia'
import { supabase } from '@/lib/superbase'
import type { Match } from '@/types/interfaces'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { uppercaseFirstLetter } from '@/utils/string'

export const useMatchStore = defineStore('match', () => {
  const allMatchs = ref<Match[]>([])
  const hasFetchMatchs = ref(false)
  const { d } = useI18n()

  async function getMatchs() {
    if (hasFetchMatchs.value) return
    const { data, error } = await supabase
      .from('matchs')
      .select('*')
      .gte('date', new Date().toISOString())
      .order('date')

    if (error) throw error

    allMatchs.value = data.map((match) => {
      return {
        ...match,
        match: match.team_a + ' - ' + match.team_b,
        day: uppercaseFirstLetter(d(match.date, 'date')),
      }
    })
    hasFetchMatchs.value = true
  }

  async function getMatch(id: number): Promise<Match | undefined> {
    if (!hasFetchMatchs.value) await getMatchs()
    return allMatchs.value.find((match) => match.id === id)
  }

  return {
    allMatchs,
    getMatchs,
    getMatch,
  }
})
