import { useEffect } from 'react'
import { View } from 'react-native'
import { Stack, useRouter } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { secureStorage } from '@/lib/storage/secureStorage'
import { TutorialOverlay } from '@/components/shared/TutorialOverlay'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      retry: 2,
      refetchOnWindowFocus: false,
    },
  },
})

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <QueryClientProvider client={queryClient}>
          <View style={{ flex: 1 }}>
            <StatusBar style="light" backgroundColor="#002959" />
            <RootNavigator />
            <TutorialOverlay />
          </View>
        </QueryClientProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  )
}

function RootNavigator() {
  const router = useRouter()

  useEffect(() => {
    secureStorage.get('onboarding_seen').then(val => {
      if (val !== 'true') {
        router.replace('/onboarding')
      }
    })
  }, [])

  return <Stack screenOptions={{ headerShown: false }} />
}
