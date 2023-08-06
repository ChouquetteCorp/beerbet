import { ref } from 'vue'
import { defineStore } from 'pinia'
import { supabase } from '@/lib/superbase'

export const useAuthStore = defineStore('auth', () => {
  const isConnected = ref(false)

  const updateConnection = async () => {
    const { data } = await supabase.auth.getSession()
    isConnected.value = data.session !== null
  }

  const logout = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
    isConnected.value = false
  }

  const signInWithEmail = async (email: string) => {
    const { data, error } = await supabase.auth.signInWithOtp({ email })
    if (error) throw error
    return data
  }

  return { isConnected, updateConnection, logout, signInWithEmail }
})
