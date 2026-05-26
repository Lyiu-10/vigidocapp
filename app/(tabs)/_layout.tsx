import { Tabs } from 'expo-router'
import { BottomTabBar } from '@/components/shared/BottomTabBar'

export default function TabsLayout() {
  return (
    <Tabs
      tabBar={(props) => <BottomTabBar {...props} unreadNotifications={0} />}
      screenOptions={{ headerShown: false }}
    >
      <Tabs.Screen
        name="index"
        options={{ title: 'Início', tabBarAccessibilityLabel: 'Ir para a tela inicial' }}
      />
      <Tabs.Screen
        name="history"
        options={{ title: 'Histórico', tabBarAccessibilityLabel: 'Ver histórico de medições' }}
      />
      <Tabs.Screen
        name="notifications"
        options={{ title: 'Notificações', tabBarAccessibilityLabel: 'Ver notificações' }}
      />
      <Tabs.Screen
        name="doctor"
        options={{ title: 'Meu Médico', tabBarAccessibilityLabel: 'Ver informações do meu médico' }}
      />
    </Tabs>
  )
}
