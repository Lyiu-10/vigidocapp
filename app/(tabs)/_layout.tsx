import { Tabs } from 'expo-router'
import { BottomTabBar } from '@/components/shared/BottomTabBar'
import { TutorialHighlight } from '@/components/shared/TutorialHighlight'

export default function TabsLayout() {
  return (
    <Tabs
      tabBar={(props) => (
        <TutorialHighlight tourId="home" stepIndex={3} borderRadius={0}>
          <BottomTabBar {...props} unreadNotifications={0} />
        </TutorialHighlight>
      )}
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
        name="more"
        options={{ title: 'Mais', tabBarAccessibilityLabel: 'Ver mais opções' }}
      />
    </Tabs>
  )
}
