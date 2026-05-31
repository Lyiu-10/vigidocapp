import { View, ScrollView, StyleSheet, useColorScheme } from 'react-native'
import { useEffect, useState } from 'react'
import { colors } from '@/lib/constants/colors'
import { HomeHeader } from '@/components/home/HomeHeader'
import { DailyProgressCard } from '@/components/home/DailyProgressCard'
import { PainelRotinaDiaria } from '@/components/home/PainelRotinaDiaria'
import { RecentMeasurements } from '@/components/home/RecentMeasurements'
import { ProfileBottomSheet } from '@/components/shared/ProfileBottomSheet'
import { TutorialHighlight } from '@/components/shared/TutorialHighlight'
import { useTutorialStore } from '@/store/tutorial.store'
import { useMeasurementStore } from '@/store/measurement.store'

// Dark mode — mover para colors.ts quando sistema de temas for formalizado
const DARK_BG = '#0F172A'

export default function HomeScreen() {
  const isDark            = useColorScheme() === 'dark'
  const [profileVisible, setProfileVisible] = useState(false)

  const _hydrated          = useTutorialStore((s) => s._hydrated)
  const homeTourCompleted  = useTutorialStore((s) => s.homeTourCompleted)
  const startTour                 = useTutorialStore((s) => s.startTour)

  useEffect(() => {
    if (!_hydrated) return
    if (!homeTourCompleted) {
      const timer = setTimeout(() => startTour('home'), 600)
      return () => clearTimeout(timer)
    }
  }, [_hydrated])

  // TODO: substituir por React Query quando API estiver disponível
  const userName      = 'Claudio Macedo'
  const dailyProgress = { completed: 3, total: 3, nextReminderTime: '22:00' }
  const measurements  = useMeasurementStore((s) => s.records)

  return (
    <View style={[styles.container, { backgroundColor: isDark ? DARK_BG : colors.iceBlue }]}>
      <HomeHeader
        userName={userName}
        measurementCount={dailyProgress.completed}
        onAvatarPress={() => setProfileVisible(true)}
      />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.overlapCard}>
          <TutorialHighlight tourId="home" stepIndex={0} borderRadius={24}>
            <PainelRotinaDiaria
              diasSeguidos={12}
              afericoesFeitas={dailyProgress.completed}
              afericoesTotais={dailyProgress.total}
              horarioProxima={dailyProgress.nextReminderTime}
            />
          </TutorialHighlight>
        </View>
        <View style={styles.overlapCard}>
          <TutorialHighlight tourId="home" stepIndex={2} borderRadius={16}>
            <DailyProgressCard
              completed={dailyProgress.completed}
              total={dailyProgress.total}
              nextReminderTime={dailyProgress.nextReminderTime}
            />
          </TutorialHighlight>
        </View>
        <RecentMeasurements
          measurements={measurements}
          isLoading={false}
          onRefresh={() => {}}
        />
      </ScrollView>

      <ProfileBottomSheet
        visible={profileVisible}
        onClose={() => setProfileVisible(false)}
        userName={userName}
        userEmail="claudio@email.com"
        currentTheme={isDark ? 'dark' : 'light'}
        onThemeChange={() => {}} // TODO: link com sistema de tema real
        onSettingsPress={() => {}}
      />
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
  overlapCard: {
    marginTop: -16,
  },
})
