import { View, ScrollView, StyleSheet, useColorScheme } from 'react-native'
import { colors } from '@/lib/constants/colors'
import { HomeHeader } from '@/components/home/HomeHeader'
import { PainelRotinaDiaria } from '@/components/home/PainelRotinaDiaria'
import { RecentMeasurements } from '@/components/home/RecentMeasurements'
import type { HealthMeasurement } from '@/types/domain'

// Dark mode — mover para colors.ts quando sistema de temas for formalizado
const DARK_BG = '#0F172A'

export default function HomeScreen() {
  const isDark = useColorScheme() === 'dark'

  // TODO: substituir por React Query quando API estiver disponível
  const userName      = 'Pedro Rikelme'
  const dailyProgress = { completed: 0, total: 3, nextReminderTime: '22:00' }
  const measurements: HealthMeasurement[] = []

  return (
    <View style={[styles.container, { backgroundColor: isDark ? DARK_BG : colors.iceBlue }]}>
      <HomeHeader
        userName={userName}
        measurementCount={dailyProgress.completed}
        onAvatarPress={() => {}} // TODO: abrir ProfileBottomSheet quando for extraído de AppHeader
      />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <PainelRotinaDiaria
          diasSeguidos={12}
          afericoesFeitas={dailyProgress.completed}
          afericoesTotais={dailyProgress.total}
          horarioProxima={dailyProgress.nextReminderTime}
        />
        <RecentMeasurements
          measurements={measurements}
          isLoading={false}
          onRefresh={() => {}}
        />
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
})
