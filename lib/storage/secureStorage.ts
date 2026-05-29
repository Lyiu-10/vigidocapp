// Wrapper sobre expo-secure-store
// Nunca use AsyncStorage diretamente para dados sensíveis

import * as SecureStore from 'expo-secure-store'
import { Platform } from 'react-native'

export const secureStorage = {
  async get(key: string): Promise<string | null> {
    if (Platform.OS === 'web') {
      try {
        if (typeof window !== 'undefined') {
          return window.localStorage.getItem(key)
        }
      } catch (e) {
        return null
      }
      return null
    }
    return SecureStore.getItemAsync(key)
  },

  async set(key: string, value: string): Promise<void> {
    if (Platform.OS === 'web') {
      try {
        if (typeof window !== 'undefined') {
          window.localStorage.setItem(key, value)
        }
      } catch (e) {}
      return
    }
    return SecureStore.setItemAsync(key, value)
  },

  async delete(key: string): Promise<void> {
    if (Platform.OS === 'web') {
      try {
        if (typeof window !== 'undefined') {
          window.localStorage.removeItem(key)
        }
      } catch (e) {}
      return
    }
    return SecureStore.deleteItemAsync(key)
  },
}
