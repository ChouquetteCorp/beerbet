import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { supabase } from '@/lib/superbase'
import type { Session } from '@supabase/supabase-js'
import type { Profile } from '@/types/interfaces'

export const useAuthStore = defineStore('auth', () => {
  const session = ref<Session | null>(null)
  const profile = ref<Profile | null>(null)
  const isLogging = ref(false) // this can't currently be true by default (bug when refresh offline)

  const isConnected = computed(() => {
    return session.value !== null
  })

  const userId = computed(() => {
    return session.value?.user.id
  })

  async function updateConnection() {
    isLogging.value = true

    // Get session
    const {
      data: { session: sessionData },
    } = await supabase.auth.getSession()
    session.value = sessionData
    if (sessionData) {
      // Promise which not need to be await
      setProfile()
    }

    isLogging.value = false

    // Watch session state
    supabase.auth.onAuthStateChange(async (event, sessionData) => {
      session.value = sessionData

      if (sessionData) {
        await setProfile()
      } else {
        resetStore()
      }
    })
  }

  function resetStore() {
    session.value = null
    profile.value = null
  }

  async function logout() {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
    resetStore()
  }

  async function signInWithEmail(email: string, redirect: string = '/') {
    const { data, error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: window.location.origin + redirect,
      },
    })
    if (error) throw error
    return data
  }

  async function setProfile() {
    if (!userId.value) return

    const { data, error } = await supabase.from('profiles').select('*').eq('user_id', userId.value)

    if (error) throw error
    profile.value = data[0]
  }

  async function changeUsername(username: string) {
    if (!userId.value || !profile.value) return

    const { error } = await supabase
      .from('profiles')
      .update({
        username,
      })
      .eq('user_id', userId.value)

    if (error) throw error
    profile.value.username = username
  }

  return {
    profile,
    session,
    userId,
    isConnected,
    isLogging,
    updateConnection,
    logout,
    signInWithEmail,
    changeUsername,
    setProfile,
  }
})
