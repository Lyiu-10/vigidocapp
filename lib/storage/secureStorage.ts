// Wrapper sobre expo-secure-store
// Nunca use AsyncStorage diretamente para dados sensíveis

import * as SecureStore from 'expo-secure-store'

export const secureStorage = {
  async get(key: string): Promise<string | null> {
    return SecureStore.getItemAsync(key)
  },

  async set(key: string, value: string): Promise<void> {
    return SecureStore.setItemAsync(key, value)
  },

  async delete(key: string): Promise<void> {
    return SecureStore.deleteItemAsync(key)
  },
}
