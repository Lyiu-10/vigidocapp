import { Tabs } from 'expo-router'
import { Home, Clock, Bell, Stethoscope } from 'lucide-react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const TAB_BAR_HEIGHT = 64

export default function TabsLayout() {
  const insets = useSafeAreaInsets()

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#0A6F97',
        tabBarInactiveTintColor: '#9CA3AF',
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopColor: '#E5E7EB',
          height: TAB_BAR_HEIGHT + insets.bottom,
          paddingBottom: 8 + insets.bottom,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Início',
          tabBarIcon: ({ color, size }) => <Home color={color} size={size} />,
          tabBarAccessibilityLabel: 'Ir para a tela inicial',
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: 'Histórico',
          tabBarIcon: ({ color, size }) => <Clock color={color} size={size} />,
          tabBarAccessibilityLabel: 'Ver histórico de medições',
        }}
      />
      <Tabs.Screen
        name="notifications"
        options={{
          title: 'Notificações',
          tabBarIcon: ({ color, size }) => <Bell color={color} size={size} />,
          tabBarAccessibilityLabel: 'Ver notificações',
        }}
      />
      <Tabs.Screen
        name="doctor"
        options={{
          title: 'Meu Médico',
          tabBarIcon: ({ color, size }) => <Stethoscope color={color} size={size} />,
          tabBarAccessibilityLabel: 'Ver informações do meu médico',
        }}
      />
    </Tabs>
  )
}
