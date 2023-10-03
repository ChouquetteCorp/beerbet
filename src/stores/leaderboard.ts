import config from '@/config.json'
import type { Leaderboard } from '@/types/interfaces'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { supabase } from '@/lib/superbase'
import { useAuthStore } from '@/stores/auth'

export const useLeaderboardStore = defineStore('leaderboard', () => {
  const auth = useAuthStore()

  const leaderboard = ref<Leaderboard | null>(null)

  async function setLeaderboard() {
    const { data, error } = await supabase.rpc('get_leaderboard', {
      _unit: config.unit,
      userid: auth.userId,
      dateend: new Date().toISOString(),
      datestart: new Date(0).toISOString(),
    })

    if (error) throw error

    leaderboard.value = data || []
  }

  return {
    leaderboard,
    setLeaderboard,
  }
})
